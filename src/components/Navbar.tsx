import React, { useState } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import {
  Compass,
  Sparkles,
  Target,
  BarChart3,
  FolderGit2,
  TrendingUp,
  Activity,
  Bot,
  User as UserIcon,
  Menu,
  X,
  ChevronRight,
  LogIn,
  LogOut,
  Cloud,
  ShieldCheck,
  Brain
} from 'lucide-react';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    generateRoadmap,
    readinessScore,
    currentUser,
    isAuthLoading,
    isCloudSyncing,
    loginWithGoogle,
    logoutUser
  } = useCareerCompass();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'assessment', label: 'Career Paths', icon: Target },
    { id: 'roadmap', label: 'Roadmaps', icon: Sparkles },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'skill-gap', label: 'Skill Gap', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'progress', label: 'Progress', icon: Activity },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo & Brand: Robotic AI Head Avatar matching user screenshot */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          >
            {/* Cute Robotic AI Head Icon with Headphone Earpieces */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/50 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                {/* Robot Head Outline */}
                <svg className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Headphone band */}
                  <path d="M4 11a8 8 0 0 1 16 0" />
                  {/* Left earphone */}
                  <rect x="2" y="10" width="3" height="5" rx="1.5" fill="currentColor" fillOpacity="0.2" />
                  {/* Right earphone */}
                  <rect x="19" y="10" width="3" height="5" rx="1.5" fill="currentColor" fillOpacity="0.2" />
                  {/* Head */}
                  <rect x="5" y="7" width="14" height="12" rx="4" />
                  {/* Eyes */}
                  <circle cx="9" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="12" r="1.5" fill="currentColor" />
                  {/* Smile */}
                  <path d="M10 15c.67.67 2 .67 2.67 0" />
                  {/* Top Antenna */}
                  <line x1="12" y1="4" x2="12" y2="7" />
                  <circle cx="12" cy="3.5" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-sans">
                  Career <span className="text-cyan-400">Compass</span>
                </span>
                <span className="text-[10px] font-bold text-sky-400 bg-sky-950/80 border border-sky-800/60 px-1.5 py-0.2 rounded">
                  Grow Youth
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
                Navigate Your Future with AI
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-cyan-400 bg-slate-900 border border-cyan-500/40 shadow-inner shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.id === 'assistant' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Authentication Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Readiness Score Pill */}
            <button
              onClick={() => handleNavClick('skill-gap')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs flex items-center gap-2 transition cursor-pointer"
              title="Current Career Readiness Score"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-400">Score:</span>
              <span className="font-bold text-cyan-400">{readinessScore.overallScore}%</span>
            </button>

            {/* Login & Signup Pill Buttons (matching the screenshot) */}
            {!isAuthLoading && (
              <div className="flex items-center gap-2">
                {currentUser ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 transition cursor-pointer"
                    >
                      {currentUser.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt={currentUser.displayName || 'User'}
                          className="w-6 h-6 rounded-lg object-cover border border-cyan-400/40"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                          {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-xs font-medium text-slate-200 max-w-[85px] truncate">
                        {currentUser.displayName?.split(' ')[0] || 'Account'}
                      </span>
                      {isCloudSyncing ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" title="Syncing..." />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Firestore Connected" />
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 space-y-1">
                        <div className="px-3 py-2 border-b border-slate-800">
                          <p className="text-xs font-bold text-white truncate">{currentUser.displayName || 'User'}</p>
                          <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Firestore Cloud Synced</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleNavClick('profile')}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            logoutUser();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-400" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthModalMode('login');
                        setAuthModalOpen(true);
                      }}
                      className="px-4 py-1.5 rounded-full border border-slate-700/80 hover:border-cyan-500/60 bg-slate-900/80 text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => {
                        setAuthModalMode('signup');
                        setAuthModalOpen(true);
                      }}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-md shadow-cyan-500/25 transition cursor-pointer"
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            {!currentUser && (
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2">
          {currentUser && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 mb-2">
              <div className="flex items-center gap-2.5">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" className="w-7 h-7 rounded-lg" />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                    {(currentUser.displayName || 'U').charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-white">{currentUser.displayName || 'Signed In'}</p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[170px]">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={logoutUser}
                className="px-2.5 py-1 rounded-lg text-[11px] text-rose-400 bg-slate-950 border border-rose-900/50"
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              generateRoadmap();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-white" />
            Build My Roadmap
          </button>
        </div>
      )}

      {/* Auth Modal for Login & Signup */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </header>
  );
};
