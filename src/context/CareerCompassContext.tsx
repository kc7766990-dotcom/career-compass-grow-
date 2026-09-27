import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import {
  CareerGoal,
  ChatMessage,
  ReadinessScoreData,
  RoadmapData,
  SkillGapItem,
  TaskStatus,
  UserProfile,
  WeeklySchedule
} from '../types/career';
import { DEFAULT_USER_PROFILE } from '../data/careerData';
import {
  calculateCareerReadiness,
  generatePersonalizedRoadmap,
  generateSkillGaps,
  generateWeeklySchedule
} from '../services/recommendationEngine';
import {
  auth,
  testConnection,
  signInWithGoogle,
  logOut,
  syncUserProfileToFirestore,
  fetchUserProfileFromFirestore,
  syncRoadmapToFirestore,
  syncTaskProgressToFirestore,
  fetchUserTaskProgressFromFirestore,
  saveChatMessageToFirestore,
  fetchChatMessagesFromFirestore
} from '../services/firebase';

interface CareerCompassContextType {
  userProfile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  roadmap: RoadmapData;
  skillGaps: SkillGapItem[];
  readinessScore: ReadinessScoreData;
  weeklySchedule: WeeklySchedule;
  updateProfile: (profile: Partial<UserProfile>) => void;
  generateRoadmap: (profileOverride?: UserProfile) => void;
  saveRoadmap: () => void;
  downloadRoadmap: () => void;
  shareRoadmap: () => void;
  togglePracticeTask: (phaseNumber: number, taskId: string) => void;
  updateWeeklyTaskStatus: (taskId: string, status: TaskStatus) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => Promise<void>;
  isChatLoading: boolean;
  toastMessage: string | null;
  setToast: (msg: string | null) => void;
  // Firebase Auth & Cloud Sync
  currentUser: FirebaseUser | null;
  isAuthLoading: boolean;
  isCloudSyncing: boolean;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

const CareerCompassContext = createContext<CareerCompassContextType | undefined>(undefined);

export const CareerCompassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);

  // Load saved state or default
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('career_compass_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return DEFAULT_USER_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize data
  const initialGaps = generateSkillGaps(userProfile);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(initialGaps);
  const [readinessScore, setReadinessScore] = useState<ReadinessScoreData>(() =>
    calculateCareerReadiness(userProfile, initialGaps)
  );
  const [roadmap, setRoadmap] = useState<RoadmapData>(() =>
    generatePersonalizedRoadmap(userProfile, initialGaps)
  );
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule>(() =>
    generateWeeklySchedule(userProfile)
  );

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Welcome to **Career Compass**! 🧭\n\nI have loaded your profile for **${userProfile.careerGoal}**.\n\nYou can ask me:\n- *"What should I learn next?"*\n- *"Why should I learn Docker?"*\n- *"What project should I build?"*\n- *"How can I improve my DSA?"*\n- *"Which skills am I missing?"*\n- *"Create my weekly study plan."*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const showToast = (msg: string | null) => {
    setToastMessage(msg);
    if (msg) {
      setTimeout(() => {
        setToastMessage(null);
      }, 3500);
    }
  };

  // 1. Validate connection to Firestore on boot as mandated by skill
  useEffect(() => {
    testConnection().then((connected) => {
      if (connected) {
        console.log('Connected to Career Compass Cloud Firestore.');
      }
    });
  }, []);

  // 2. Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);

      if (user) {
        setIsCloudSyncing(true);
        try {
          // Check if cloud profile exists
          const cloudProfile = await fetchUserProfileFromFirestore(user.uid);
          if (cloudProfile && cloudProfile.name) {
            setUserProfile((prev) => {
              const merged: UserProfile = {
                ...prev,
                ...cloudProfile,
                email: user.email || cloudProfile.email || prev.email,
                name: cloudProfile.name || user.displayName || prev.name
              };
              regenerateAll(merged);
              return merged;
            });
            showToast(`Welcome back, ${cloudProfile.name || user.displayName}! Profile synced from cloud.`);
          } else {
            // First time login - upload current state to Firestore
            const initialSyncProfile: UserProfile = {
              ...userProfile,
              name: user.displayName || userProfile.name,
              email: user.email || userProfile.email
            };
            setUserProfile(initialSyncProfile);
            await syncUserProfileToFirestore(user.uid, initialSyncProfile);
            await syncRoadmapToFirestore(user.uid, roadmap, readinessScore.overallScore);
            showToast(`Signed in as ${user.displayName || user.email}! Cloud sync enabled.`);
          }

          // Fetch cloud task completions
          const savedProgress = await fetchUserTaskProgressFromFirestore(user.uid);
          if (Object.keys(savedProgress).length > 0) {
            setRoadmap((prev) => ({
              ...prev,
              phases: prev.phases.map((phase) => ({
                ...phase,
                practiceTasks: phase.practiceTasks.map((task) => {
                  const safeId = task.id.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 128);
                  if (savedProgress[safeId] !== undefined) {
                    return { ...task, completed: savedProgress[safeId] };
                  }
                  return task;
                })
              }))
            }));
          }

          // Fetch cloud chat history
          const cloudMsgs = await fetchChatMessagesFromFirestore(user.uid);
          if (cloudMsgs && cloudMsgs.length > 0) {
            setChatMessages((prev) => {
              const combined = [...prev, ...cloudMsgs];
              const unique = Array.from(new Map(combined.map((m) => [m.id, m])).values());
              return unique;
            });
          }
        } catch (err) {
          console.warn('Error syncing cloud user data:', err);
        } finally {
          setIsCloudSyncing(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync roadmap and scores when profile changes significantly
  const regenerateAll = (profile: UserProfile) => {
    const gaps = generateSkillGaps(profile);
    const score = calculateCareerReadiness(profile, gaps);
    const newRoadmap = generatePersonalizedRoadmap(profile, gaps);
    const schedule = generateWeeklySchedule(profile);

    setSkillGaps(gaps);
    setReadinessScore(score);
    setRoadmap(newRoadmap);
    setWeeklySchedule(schedule);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('career_compass_profile', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      regenerateAll(next);

      // Async cloud sync if logged in
      if (currentUser) {
        syncUserProfileToFirestore(currentUser.uid, next).catch((err) =>
          console.warn('Could not sync profile to cloud', err)
        );
      }

      return next;
    });
  };

  const generateRoadmap = (profileOverride?: UserProfile) => {
    const target = profileOverride || userProfile;
    regenerateAll(target);
    showToast(`Personalized roadmap generated for ${target.careerGoal}!`);
    setActiveTab('roadmap');

    if (currentUser) {
      const gaps = generateSkillGaps(target);
      const score = calculateCareerReadiness(target, gaps);
      const newRoadmap = generatePersonalizedRoadmap(target, gaps);
      syncRoadmapToFirestore(currentUser.uid, newRoadmap, score.overallScore).catch(console.warn);
    }
  };

  const saveRoadmap = () => {
    try {
      localStorage.setItem('career_compass_profile', JSON.stringify(userProfile));
      localStorage.setItem('career_compass_saved_at', new Date().toISOString());

      if (currentUser) {
        syncUserProfileToFirestore(currentUser.uid, userProfile);
        syncRoadmapToFirestore(currentUser.uid, roadmap, readinessScore.overallScore);
        showToast('Roadmap securely saved to Career Compass Cloud & local storage!');
      } else {
        showToast('Roadmap saved to browser profile successfully! Sign in to sync across devices.');
      }
    } catch (e) {
      showToast('Could not save roadmap.');
    }
  };

  const downloadRoadmap = () => {
    const exportData = {
      platform: 'Career Compass',
      tagline: 'Your Skills. Your Goal. Your Personalized Path.',
      generatedFor: userProfile.name,
      careerGoal: userProfile.careerGoal,
      readinessScore: readinessScore.overallScore + '%',
      targetTimeline: userProfile.targetTimeline,
      weeklyPace: userProfile.studyHours,
      immediatePriority: roadmap.immediatePriority,
      phases: roadmap.phases.map((p) => ({
        phase: p.title,
        duration: p.duration,
        skills: p.skills.map((s) => s.name),
        project: p.project.title
      })),
      skillGaps: skillGaps.map((g) => ({
        skill: g.skillName,
        current: `${g.currentLevel}%`,
        required: `${g.requiredLevel}%`,
        action: g.recommendedAction
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Career-Compass-Roadmap-${userProfile.careerGoal.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Career Compass Roadmap downloaded successfully!');
  };

  const shareRoadmap = () => {
    const textToShare = `🧭 Check out my Career Compass Roadmap for ${userProfile.careerGoal}!\nReadiness Score: ${readinessScore.overallScore}%\nNext Skill: ${roadmap.immediatePriority.skill}\nTarget: ${userProfile.targetTimeline}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      showToast('Roadmap summary copied to clipboard! Ready to share.');
    } else {
      showToast('Sharing text: ' + textToShare);
    }
  };

  const togglePracticeTask = (phaseNumber: number, taskId: string) => {
    let isCompletedNow = false;
    setRoadmap((prev) => {
      const updatedPhases = prev.phases.map((phase) => {
        if (phase.phaseNumber !== phaseNumber) return phase;
        return {
          ...phase,
          practiceTasks: phase.practiceTasks.map((t) => {
            if (t.id === taskId) {
              isCompletedNow = !t.completed;
              return { ...t, completed: isCompletedNow };
            }
            return t;
          })
        };
      });
      return { ...prev, phases: updatedPhases };
    });

    if (currentUser) {
      syncTaskProgressToFirestore(currentUser.uid, phaseNumber, taskId, isCompletedNow).catch((err) =>
        console.warn('Could not sync task progress to cloud', err)
      );
    }
  };

  const updateWeeklyTaskStatus = (taskId: string, status: TaskStatus) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, status } : t))
    }));
  };

  const sendChatMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    if (currentUser) {
      saveChatMessageToFirestore(currentUser.uid, userMsg).catch(console.warn);
    }

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userProfile,
          roadmapSummary: {
            role: roadmap.role,
            immediatePriority: roadmap.immediatePriority,
            readinessScore: readinessScore.overallScore,
            phases: roadmap.phases.map((p) => ({ title: p.title, skills: p.skills.map((s) => s.name) }))
          }
        })
      });

      if (!res.ok) {
        throw new Error('Server response error');
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I am here to guide your engineering path.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };
      setChatMessages((prev) => [...prev, assistantMsg]);

      if (currentUser) {
        saveChatMessageToFirestore(currentUser.uid, assistantMsg).catch(console.warn);
      }
    } catch (err) {
      console.warn('Assistant request failed, responding with local intelligence', err);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: `Based on your **${userProfile.careerGoal}** goal and current profile:\n\n- **Next Priority Skill**: ${roadmap.immediatePriority.skill}\n- **Why**: ${roadmap.immediatePriority.why}\n- **Estimated Duration**: ${roadmap.immediatePriority.estimatedTime}\n- **Recommended Project**: ${roadmap.immediatePriority.recommendedProject}\n\nYou can view and check off tasks in the **Roadmap** and **Progress** tabs!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'heuristic'
      };
      setChatMessages((prev) => [...prev, assistantMsg]);

      if (currentUser) {
        saveChatMessageToFirestore(currentUser.uid, assistantMsg).catch(console.warn);
      }
    } finally {
      setIsChatLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      showToast('Sign-in cancelled or failed: ' + (err.message || 'Unknown error'));
    }
  };

  const logoutUser = async () => {
    try {
      await logOut();
      showToast('Logged out of Career Compass.');
    } catch (err: any) {
      showToast('Could not sign out: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <CareerCompassContext.Provider
      value={{
        userProfile,
        activeTab,
        setActiveTab,
        roadmap,
        skillGaps,
        readinessScore,
        weeklySchedule,
        updateProfile,
        generateRoadmap,
        saveRoadmap,
        downloadRoadmap,
        shareRoadmap,
        togglePracticeTask,
        updateWeeklyTaskStatus,
        chatMessages,
        sendChatMessage,
        isChatLoading,
        toastMessage,
        setToast: showToast,
        currentUser,
        isAuthLoading,
        isCloudSyncing,
        loginWithGoogle,
        logoutUser
      }}
    >
      {children}
    </CareerCompassContext.Provider>
  );
};

export const useCareerCompass = () => {
  const context = useContext(CareerCompassContext);
  if (!context) {
    throw new Error('useCareerCompass must be used within a CareerCompassProvider');
  }
  return context;
};
