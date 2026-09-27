import React, { useState } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import {
  Sparkles,
  ArrowRight,
  Target,
  Compass,
  CheckCircle2,
  Cpu,
  Clock,
  Code2,
  Flame,
  Zap,
  Bot,
  GraduationCap,
  TrendingUp,
  BarChart3,
  BookOpen,
  Rocket,
  Brain,
  Layers,
  ChevronRight
} from 'lucide-react';
import { CAREER_GOALS_LIST } from '../data/careerData';
import robotHeroImage from '../assets/images/robot_ai_guide_1790502851533.jpg';

export const Hero: React.FC = () => {
  const { setActiveTab, userProfile, updateProfile, roadmap, readinessScore } = useCareerCompass();

  return (
    <div className="relative overflow-hidden pt-4 pb-16 lg:pt-8 lg:pb-20">
      {/* Background Cosmic Atmosphere & Ambient Radial Light */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/15 to-purple-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500/10 blur-[110px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none" />

      {/* Cybernetic Digital Grid Backdrop Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334412_1px,transparent_1px),linear-gradient(to_bottom,#08334412_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* HERO MAIN ROW: Two-column layout matching user reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-2 sm:pt-6">

          {/* LEFT COLUMN: Headline, Tagline, Value Pitch, Action CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">

            {/* Pill Tag: ✦ AI Powered Career Guidance */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="text-cyan-400 text-sm">✦</span>
              <span className="tracking-wide">AI Powered Career Guidance</span>
            </div>

            {/* Main Headline: Navigate Your Future with AI */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Navigate Your <br className="hidden sm:inline" />
              Future with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                AI
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed">
              <strong className="text-white font-semibold">Career Compass</strong> helps you discover the right career path and build a personalized roadmap for your future.
            </p>

            {/* Dual Glowing Pill CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('assessment')}
                className="group px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-xl shadow-cyan-500/35 hover:shadow-cyan-500/50 flex items-center gap-2.5 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Compass className="w-3.5 h-3.5 text-white group-hover:rotate-45 transition-transform duration-300" />
                </div>
                <span>Explore Careers</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400/60 hover:bg-slate-800/90 hover:text-cyan-300 flex items-center gap-2.5 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-slate-950/50 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Build My Roadmap</span>
              </button>
            </div>

            {/* Quick Status Sub-metric */}
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Dynamic 2026 Skill Engine</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-semibold">{readinessScore.overallScore}%</span>
                <span>Demo Readiness Score</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Robot Visual & Floating Holographic HUD Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">

            {/* Outer Concentric Glowing Rings */}
            <div className="absolute inset-0 m-auto w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-cyan-500/30 animate-[spin_40s_linear_infinite] pointer-events-none" />
            <div className="absolute inset-0 m-auto w-[310px] h-[310px] sm:w-[400px] sm:h-[400px] rounded-full border border-indigo-500/25 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />

            {/* Center Robot Hero Graphic Container */}
            <div className="relative z-10 w-full max-w-[480px] sm:max-w-[530px] rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20 group">
              {/* Image Frame with Inner Vignette & Glow */}
              <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950">
                <img
                  src={robotHeroImage}
                  alt="Career Compass AI Robotic Guide"
                  className="w-full h-full object-cover object-center select-none transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Cybernetic HUD Overlay Grid */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Animated Scanner Beam */}
                <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none animate-cyber-scan shadow-[0_0_10px_#22d3ee]" />

                {/* Miniature Bottom City Platform Glow Label */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-400/50 backdrop-blur-md text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg shadow-cyan-950/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>NEURAL ROADMAP PLATFORM</span>
                </div>
              </div>
            </div>

            {/* FLOATING HOLOGRAPHIC BADGE 1: [ 🎓 Learn ] (Top Left) */}
            <button
              onClick={() => setActiveTab('assessment')}
              className="absolute -top-2 left-0 sm:left-4 z-20 px-3.5 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800/90 border border-cyan-500/50 text-white text-xs font-semibold shadow-xl shadow-cyan-950/50 backdrop-blur-md flex items-center gap-2 transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer"
              title="Explore Skills & Assessment"
            >
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <span>Learn</span>
            </button>

            {/* FLOATING HOLOGRAPHIC BADGE 2: [ </> Build ] (Mid Left) */}
            <button
              onClick={() => setActiveTab('projects')}
              className="absolute top-1/2 -translate-y-1/2 -left-3 sm:left-1 z-20 px-3.5 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800/90 border border-cyan-500/50 text-white text-xs font-semibold shadow-xl shadow-cyan-950/50 backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-all duration-200 cursor-pointer"
              title="Explore Real Projects"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <span>Build</span>
            </button>

            {/* FLOATING HOLOGRAPHIC BADGE 3: [ 📈 Grow ] (Bottom Left) */}
            <button
              onClick={() => setActiveTab('progress')}
              className="absolute -bottom-3 left-1 sm:left-8 z-20 px-3.5 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800/90 border border-indigo-500/50 text-white text-xs font-semibold shadow-xl shadow-indigo-950/50 backdrop-blur-md flex items-center gap-2 transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer"
              title="Track Engineering Progress"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span>Grow</span>
            </button>

            {/* FLOATING HOLOGRAPHIC BADGE 4: [ 🎯 Your Career / Your Choice ] (Top Right) */}
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="absolute top-4 -right-2 sm:right-2 z-20 p-3 rounded-2xl bg-slate-900/85 hover:bg-slate-800/90 border border-cyan-500/50 text-left shadow-xl shadow-cyan-950/50 backdrop-blur-md flex items-center gap-2.5 transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer"
              title="View Skill Gap Analysis"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white leading-tight">Your Career</p>
                <p className="text-[10px] text-cyan-300 font-medium">Your Choice</p>
              </div>
            </button>

            {/* FLOATING HOLOGRAPHIC BADGE 5: [ 📊 Better Tomorrow ] (Bottom Right) */}
            <button
              onClick={() => setActiveTab('trends')}
              className="absolute bottom-6 -right-3 sm:right-0 z-20 p-3 rounded-2xl bg-slate-900/85 hover:bg-slate-800/90 border border-blue-500/50 text-left shadow-xl shadow-blue-950/50 backdrop-blur-md flex items-center gap-2.5 transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer"
              title="View 2026 Tech Trends"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500/30 to-indigo-600/30 border border-blue-400/50 flex items-center justify-center text-blue-300">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white leading-tight">Better</p>
                <p className="text-[10px] text-blue-300 font-medium">Tomorrow</p>
              </div>
            </button>
          </div>
        </div>

        {/* BOTTOM FEATURE RIBBON (5 Feature items matching screenshot with pixel precision) */}
        <div className="mt-14 sm:mt-18 w-full rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-blue-500/25 to-indigo-500/40 shadow-2xl shadow-cyan-950/50">
          <div className="bg-slate-950/85 backdrop-blur-2xl rounded-2xl sm:rounded-3xl px-4 py-5 sm:px-6 sm:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-2">

            {/* Feature 1: Personalized Roadmaps */}
            <button
              onClick={() => setActiveTab('roadmap')}
              className="group p-3 rounded-xl hover:bg-slate-900/60 transition-all duration-200 flex items-center gap-3.5 text-left cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all flex-shrink-0">
                <Target className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition truncate">
                  Personalized Roadmaps
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  Based on your skills & goals
                </p>
              </div>
            </button>

            {/* Feature 2: Trending Skills */}
            <button
              onClick={() => setActiveTab('trends')}
              className="group p-3 rounded-xl hover:bg-slate-900/60 transition-all duration-200 flex items-center gap-3.5 text-left cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-600/20 border border-blue-400/40 flex items-center justify-center text-blue-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.4)] transition-all flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition truncate">
                  Trending Skills
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  For a better future
                </p>
              </div>
            </button>

            {/* Feature 3: AI Career Assistant */}
            <button
              onClick={() => setActiveTab('assistant')}
              className="group p-3 rounded-xl hover:bg-slate-900/60 transition-all duration-200 flex items-center gap-3.5 text-left cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all flex-shrink-0">
                <Brain className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition truncate">
                  AI Career Assistant
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  Ask. Learn. Grow.
                </p>
              </div>
            </button>

            {/* Feature 4: Real Project Experience */}
            <button
              onClick={() => setActiveTab('projects')}
              className="group p-3 rounded-xl hover:bg-slate-900/60 transition-all duration-200 flex items-center gap-3.5 text-left cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500/20 to-teal-600/20 border border-blue-400/40 flex items-center justify-center text-blue-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all flex-shrink-0">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition truncate">
                  Real Project Experience
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  Build your portfolio
                </p>
              </div>
            </button>

            {/* Feature 5: Interview Preparation */}
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="group p-3 rounded-xl hover:bg-slate-900/60 transition-all duration-200 flex items-center gap-3.5 text-left cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-600/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(129,140,248,0.4)] transition-all flex-shrink-0">
                <Rocket className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition truncate">
                  Interview Preparation
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  Get job ready
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* HERO ROADMAP & QUESTION ENGINE SECTION */}
        <div className="mt-14 max-w-6xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="font-bold text-white text-lg sm:text-xl">
                  Personalized Roadmap: {userProfile.careerGoal}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Calibrated for {userProfile.experience} • {userProfile.studyHours}/week • {userProfile.targetTimeline} timeline
              </p>
            </div>

            {/* Quick Target Role Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 whitespace-nowrap">Switch Goal:</span>
              <select
                value={userProfile.careerGoal}
                onChange={(e) => updateProfile({ careerGoal: e.target.value as any })}
                className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {CAREER_GOALS_LIST.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4 Essential Career Questions Answers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium">1. What to Learn Next</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-base font-bold text-white truncate">
                {roadmap.immediatePriority.skill}
              </div>
              <div className="text-[11px] text-cyan-400 mt-1">Immediate Priority Milestone</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium">2. Why Learn It</span>
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {roadmap.immediatePriority.why}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium">3. How Long It Takes</span>
                <Clock className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <div className="text-base font-bold text-teal-300">
                {roadmap.immediatePriority.estimatedTime}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">At your {userProfile.studyHours}/wk pace</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium">4. Project to Build</span>
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-xs font-bold text-purple-300 truncate">
                {roadmap.immediatePriority.recommendedProject}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">High Resume Impact</div>
            </div>
          </div>

          {/* Interactive Phase Flow Pipeline */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>5-Phase Sequential Roadmap Pipeline</span>
              <span className="text-cyan-400 cursor-pointer hover:underline flex items-center gap-1" onClick={() => setActiveTab('roadmap')}>
                <span>View Full Interactive Roadmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {roadmap.phases.map((phase) => (
                <div
                  key={phase.phaseNumber}
                  onClick={() => setActiveTab('roadmap')}
                  className="group p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer relative"
                >
                  <div className="text-[10px] font-bold text-cyan-400 uppercase mb-1">
                    Phase {phase.phaseNumber}
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                    {phase.title.replace(`PHASE ${phase.phaseNumber} — `, '')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {phase.duration}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {phase.skills.slice(0, 2).map((sk) => (
                      <span
                        key={sk.name}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-300"
                      >
                        {sk.name.split(' ')[0]}
                      </span>
                    ))}
                    {phase.skills.length > 2 && (
                      <span className="text-[9px] px-1 py-0.5 text-slate-500">
                        +{phase.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Live Metric Strip */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Career Readiness:</span>
                <span className="font-bold text-cyan-400">{readinessScore.overallScore}%</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                  {readinessScore.grade}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('assistant')}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI Assistant</span>
              </button>

              <button
                onClick={() => setActiveTab('skill-gap')}
                className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>View Skill Gaps</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
