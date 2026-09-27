import React, { useState } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import { CAREER_GOALS_LIST, DEFAULT_USER_PROFILE } from '../data/careerData';
import {
  User,
  GraduationCap,
  Briefcase,
  Target,
  Clock,
  Globe2,
  RefreshCw,
  Save,
  CheckCircle2,
  Award,
  Download,
  Share2,
  Cloud,
  CloudCheck,
  LogIn,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    userProfile,
    updateProfile,
    generateRoadmap,
    downloadRoadmap,
    shareRoadmap,
    readinessScore,
    setActiveTab,
    currentUser,
    loginWithGoogle,
    logoutUser,
    isCloudSyncing,
    saveRoadmap
  } = useCareerCompass();

  const [name, setName] = useState(userProfile.name);
  const [goal, setGoal] = useState(userProfile.careerGoal);
  const [studyHours, setStudyHours] = useState(userProfile.studyHours);
  const [timeline, setTimeline] = useState(userProfile.targetTimeline);
  const [market, setMarket] = useState(userProfile.targetMarket);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      careerGoal: goal,
      studyHours,
      targetTimeline: timeline,
      targetMarket: market
    });
  };

  const handleResetDefaults = () => {
    updateProfile(DEFAULT_USER_PROFILE);
    setName(DEFAULT_USER_PROFILE.name);
    setGoal(DEFAULT_USER_PROFILE.careerGoal);
    setStudyHours(DEFAULT_USER_PROFILE.studyHours);
    setTimeline(DEFAULT_USER_PROFILE.targetTimeline);
    setMarket(DEFAULT_USER_PROFILE.targetMarket);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
              User Profile
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              {currentUser ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Firestore Cloud Connected</span>
                </>
              ) : (
                <span>Saved locally</span>
              )}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Engineering Profile & Preferences
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your personal settings, target goals, and cloud synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadRoadmap}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Roadmap</span>
          </button>
          <button
            onClick={shareRoadmap}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Cloud Account Sync Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="w-12 h-12 rounded-xl object-cover border border-cyan-500/40 shadow-md"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center text-base font-bold text-white shadow-md">
                {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  {currentUser ? currentUser.displayName || 'Google Account' : 'Cloud Sync (Optional)'}
                </h3>
                {currentUser && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentUser ? (
                  <span>
                    {currentUser.email} • UID: <code className="text-[10px] text-cyan-400">{currentUser.uid.slice(0, 10)}...</code>
                  </span>
                ) : (
                  'Sign in with Google to sync your roadmap, tasks, and advisor chats securely to Firebase Cloud Firestore.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <>
                <button
                  type="button"
                  onClick={saveRoadmap}
                  disabled={isCloudSyncing}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 hover:bg-cyan-900/60 flex items-center gap-1.5 cursor-pointer transition"
                >
                  <Cloud className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isCloudSyncing ? 'Syncing...' : 'Sync Cloud Now'}</span>
                </button>
                <button
                  type="button"
                  onClick={logoutUser}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-rose-900/50 text-rose-400 hover:bg-rose-950/30 flex items-center gap-1.5 cursor-pointer transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={loginWithGoogle}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign In with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target Career Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {CAREER_GOALS_LIST.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Weekly Study Availability
            </label>
            <select
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="5 hours">5 hours / week</option>
              <option value="10 hours">10 hours / week</option>
              <option value="15 hours">15 hours / week</option>
              <option value="20+ hours">20+ hours / week</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target Timeline
            </label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="12 months">12 months</option>
              <option value="18 months">18 months</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target Market
            </label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="India">India Tech Market</option>
              <option value="Remote">Global Remote</option>
              <option value="Global">Global Onsite / Relocation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Education & Experience
            </label>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span>{userProfile.education} • {userProfile.experience}</span>
              <button
                type="button"
                onClick={() => setActiveTab('assessment')}
                className="text-cyan-400 hover:underline text-[11px] cursor-pointer"
              >
                Re-assess
              </button>
            </div>
          </div>
        </div>

        {/* Current Active Skills Summary */}
        <div className="pt-4 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Tracked Competencies ({userProfile.skills.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.map((skill) => (
              <span
                key={skill.name}
                className="px-2.5 py-1 rounded-lg text-xs bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5"
              >
                <span className="font-medium text-white">{skill.name}</span>
                <span className="text-[10px] text-cyan-400">({skill.level})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Profile</span>
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save & Apply Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
};
