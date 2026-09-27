import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ChatMessage, RoadmapData, UserProfile } from '../types/career';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Critical: include firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test on boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or internet connection.");
    }
    return false;
  }
}

// Auth Actions
export async function signInWithGoogle(): Promise<FirebaseUser | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    throw error;
  }
}

export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Sign Out Error:', error);
    throw error;
  }
}

// Firestore Persistence APIs
export async function syncUserProfileToFirestore(userId: string, profile: UserProfile) {
  const userPath = `users/${userId}`;
  try {
    await setDoc(doc(db, 'users', userId), {
      userId,
      name: profile.name.slice(0, 100),
      email: profile.email ? profile.email.slice(0, 150) : (auth.currentUser?.email || ''),
      education: (profile.education || 'Undergraduate').slice(0, 50),
      experience: (profile.experience || 'Student').slice(0, 50),
      careerGoal: profile.careerGoal.slice(0, 80),
      studyHours: profile.studyHours.slice(0, 30),
      targetTimeline: profile.targetTimeline.slice(0, 30),
      targetMarket: profile.targetMarket.slice(0, 50),
      skills: (profile.skills || []).slice(0, 50),
      weakSkills: (profile.weakSkills || []).slice(0, 50),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userPath);
  }
}

export async function fetchUserProfileFromFirestore(userId: string): Promise<Partial<UserProfile> | null> {
  const userPath = `users/${userId}`;
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    if (snap.exists()) {
      return snap.data() as Partial<UserProfile>;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, userPath);
    return null;
  }
}

export async function syncRoadmapToFirestore(userId: string, roadmap: RoadmapData, score: number) {
  const roadmapId = `rm-${roadmap.role.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const path = `users/${userId}/roadmaps/${roadmapId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'roadmaps', roadmapId), {
      id: roadmapId,
      userId,
      role: roadmap.role.slice(0, 80),
      overallScore: score,
      immediatePrioritySkill: roadmap.immediatePriority.skill.slice(0, 100),
      immediatePriorityWhy: (roadmap.immediatePriority.why || '').slice(0, 500),
      immediatePriorityProject: (roadmap.immediatePriority.recommendedProject || '').slice(0, 200),
      phasesCount: roadmap.phases.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function syncTaskProgressToFirestore(userId: string, phaseNumber: number, taskId: string, completed: boolean) {
  // sanitize taskId for firestore doc id
  const safeTaskId = taskId.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 128);
  const path = `users/${userId}/taskProgress/${safeTaskId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'taskProgress', safeTaskId), {
      taskId: safeTaskId,
      userId,
      phaseNumber,
      completed,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function fetchUserTaskProgressFromFirestore(userId: string): Promise<Record<string, boolean>> {
  const path = `users/${userId}/taskProgress`;
  try {
    const q = query(collection(db, 'users', userId, 'taskProgress'));
    const snap = await getDocs(q);
    const progressMap: Record<string, boolean> = {};
    snap.forEach((d) => {
      const data = d.data();
      if (data.taskId) {
        progressMap[data.taskId] = !!data.completed;
      }
    });
    return progressMap;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return {};
  }
}

export async function saveChatMessageToFirestore(userId: string, message: ChatMessage) {
  const safeMsgId = message.id.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 128);
  const path = `users/${userId}/chatMessages/${safeMsgId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'chatMessages', safeMsgId), {
      id: safeMsgId,
      userId,
      sender: message.sender,
      text: message.text.slice(0, 4000),
      timestamp: message.timestamp.slice(0, 30),
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function fetchChatMessagesFromFirestore(userId: string): Promise<ChatMessage[]> {
  const path = `users/${userId}/chatMessages`;
  try {
    const q = query(collection(db, 'users', userId, 'chatMessages'), limit(25));
    const snap = await getDocs(q);
    const msgs: ChatMessage[] = [];
    snap.forEach((d) => {
      const data = d.data();
      msgs.push({
        id: data.id || d.id,
        sender: data.sender || 'assistant',
        text: data.text || '',
        timestamp: data.timestamp || ''
      });
    });
    return msgs;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}
