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
  CloudCheck
} from 'lucide-react';

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

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'assessment', label: 'Career Assessment', icon: Target },
    { id: 'roadmap', label: 'Roadmap', icon: Sparkles },
    { id: 'skill-gap', label: 'Skill Gap', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'progress', label: 'Progress', icon: Activity },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-sans">
                  CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">COMPASS</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                  AI v2.6
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
                Your Skills. Your Goal. Your Personalized Path.
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
                      ? 'text-cyan-400 bg-slate-900 border border-cyan-500/30 shadow-inner shadow-cyan-500/10'
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

          {/* Action Button, Auth & Readiness Pill */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('skill-gap')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs flex items-center gap-2 transition cursor-pointer"
              title="Current Career Readiness Score"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-400">Readiness:</span>
              <span className="font-bold text-cyan-400">{readinessScore.overallScore}%</span>
            </button>

            <button
              onClick={() => generateRoadmap()}
              className="relative group px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-current" />
              <span>Generate My Roadmap</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Google Authentication Pill */}
            {!isAuthLoading && (
              <div className="relative">
                {currentUser ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-500/60 transition cursor-pointer"
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
                      <span className="text-xs font-medium text-slate-200 max-w-[80px] truncate">
                        {currentUser.displayName?.split(' ')[0] || 'Account'}
                      </span>
                      {isCloudSyncing ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" title="Syncing to cloud..." />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Cloud Synced" />
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
                  <button
                    onClick={loginWithGoogle}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 transition cursor-pointer shadow-sm shadow-cyan-950/20"
                    title="Sign in with Google to save progress in cloud"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            {!currentUser && (
              <button
                onClick={loginWithGoogle}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-cyan-300"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => generateRoadmap()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400"
            >
              Generate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
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
            className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            Generate My Roadmap
          </button>
        </div>
      )}
    </header>
  );
};
