import React from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import { Compass, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useCareerCompass();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 pt-12 pb-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-900">
          {/* Brand Identity */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-slate-950 font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">COMPASS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              AI-Powered Personalized Career & Software Engineering Roadmap
            </p>
          </div>

          {/* Core Mantra / Triad */}
          <div className="text-center md:text-right text-xs space-y-1">
            <div className="font-semibold text-slate-300">Explore your skills.</div>
            <div className="font-semibold text-cyan-400">Discover your path.</div>
            <div className="font-semibold text-indigo-400">Build your future.</div>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 text-xs text-slate-400">
          <button onClick={() => setActiveTab('home')} className="hover:text-cyan-400 transition cursor-pointer">Home</button>
          <button onClick={() => setActiveTab('assessment')} className="hover:text-cyan-400 transition cursor-pointer">Career Assessment</button>
          <button onClick={() => setActiveTab('roadmap')} className="hover:text-cyan-400 transition cursor-pointer">Roadmap</button>
          <button onClick={() => setActiveTab('skill-gap')} className="hover:text-cyan-400 transition cursor-pointer">Skill Gap</button>
          <button onClick={() => setActiveTab('projects')} className="hover:text-cyan-400 transition cursor-pointer">Projects</button>
          <button onClick={() => setActiveTab('trends')} className="hover:text-cyan-400 transition cursor-pointer">Trends</button>
          <button onClick={() => setActiveTab('progress')} className="hover:text-cyan-400 transition cursor-pointer">Progress</button>
          <button onClick={() => setActiveTab('assistant')} className="hover:text-cyan-400 transition cursor-pointer">AI Assistant</button>
          <button onClick={() => setActiveTab('profile')} className="hover:text-cyan-400 transition cursor-pointer">Profile</button>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-slate-400 pt-4">
          © 2026 Career Compass. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
