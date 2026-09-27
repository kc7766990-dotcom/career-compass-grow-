import React, { useState } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import { X, Sparkles, Compass, ShieldCheck, ArrowRight, Bot, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const { loginWithGoogle, currentUser } = useCareerCompass();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen || currentUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Default to Google Sign In
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      console.warn('Auth modal sign-in error', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-indigo-500/40 shadow-2xl shadow-cyan-950/60 z-10 overflow-hidden">
        <div className="relative bg-slate-950/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 overflow-hidden">

          {/* Subtle Inner Diagonal Watermark Pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none select-none opacity-[0.035] overflow-hidden"
          >
            <div className="absolute -inset-10 flex flex-col gap-12 rotate-[-22deg] text-cyan-200">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-16 whitespace-nowrap">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="text-center">
                      <div className="text-[14px] font-bold tracking-[0.25em] text-slate-100 uppercase">
                        CAREER COMPASS
                      </div>
                      <div className="text-[9px] tracking-[0.16em] text-cyan-300">
                        AI Career Guidance Platform
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Brand Header */}
          <div className="text-center relative z-10 pt-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/30 mb-3 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {mode === 'login' ? 'Welcome Back' : 'Get Started with AI'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              {mode === 'login'
                ? 'Sign in to access your saved roadmap, skill gaps, and AI career advisor.'
                : 'Create your account to unlock personalized career roadmaps and real-time guidance.'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex rounded-xl bg-slate-900/90 border border-slate-800/80 p-1 mt-6 relative z-10">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                mode === 'login'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                mode === 'signup'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* One-Click Google Sign In */}
          <div className="mt-6 relative z-10 space-y-4">
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-cyan-500/40 hover:border-cyan-400 text-xs font-semibold text-white shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-3 transition cursor-pointer"
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
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 text-slate-600 text-[11px]">
              <div className="flex-1 h-px bg-slate-800" />
              <span>OR DEMO ACCOUNT</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@careercompass.dev"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <span>{mode === 'login' ? 'Sign In to Career Compass' : 'Create Free Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Footer note with security badge */}
          <div className="mt-6 pt-4 border-t border-slate-900 text-center relative z-10 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure Cloud Sync with Firebase Firestore</span>
          </div>
        </div>
      </div>
    </div>
  );
};
