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
  RotateCw,
  Play,
  Pause
} from 'lucide-react';
import { CAREER_GOALS_LIST } from '../data/careerData';
import { RoboticAIVisual } from './RoboticAIVisual';

export const Hero: React.FC = () => {
  const { setActiveTab, userProfile, updateProfile, roadmap, readinessScore } = useCareerCompass();
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState<'ultra-slow' | 'slow'>('slow');

  return (
    <div className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag & Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md mb-6 shadow-sm shadow-cyan-500/10">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold tracking-wide text-cyan-300 uppercase">
              Your Skills. Your Goal. Your Personalized Path.
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1]">
            CAREER{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              COMPASS
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl font-medium text-slate-300 max-w-3xl">
            AI-Powered Personalized Career & Software Engineering Roadmap
          </p>

          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            "Discover the right skills, build the right projects, and follow a roadmap designed around your career goal."
          </p>

          {/* Main Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Target className="w-4 h-4 text-slate-950" />
              <span>Start Career Assessment</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800/90 transition-all duration-200 flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explore Roadmap</span>
            </button>
          </div>
        </div>

        {/* ROBOTIC AI CORE SHOWCASE (SLOW ROTATION) */}
        <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/50 via-indigo-500/40 to-purple-500/50 shadow-2xl shadow-cyan-500/10">
          <div className="bg-slate-950/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            {/* Background cybernetic grid light */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* CSS-Animated 3D Robotic AI Visual */}
              <div className="relative flex-shrink-0 flex items-center justify-center">
                <RoboticAIVisual isRotating={isRotating} speed={rotationSpeed} />
              </div>

              {/* Informative Guidance & Interactive Controls */}
              <div className="flex-1 text-center lg:text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Career Compass AI Neural Engine</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  Personalized Engineering Intelligence in Motion
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Career Compass synthesizes your current education, skills, and target goal with live tech trends to tell you precisely:
                </p>

                {/* 4 Core Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">What should I learn next:</strong> Identified skill gaps & prerequisites</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span><strong className="text-white">Why should I learn it:</strong> Market relevance & hiring rationale</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span><strong className="text-white">How long will it take:</strong> Calibrated to your weekly study pace</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">What project to build:</strong> Production-grade resume showcases</span>
                  </div>
                </div>

                {/* Interactive Rotation & AI Action Bar */}
                <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition shadow-sm"
                    title={isRotating ? 'Pause rotation' : 'Resume slow rotation'}
                  >
                    {isRotating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{isRotating ? 'Pause Rotation' : 'Rotate AI Image'}</span>
                  </button>

                  <button
                    onClick={() => setRotationSpeed(rotationSpeed === 'slow' ? 'ultra-slow' : 'slow')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Speed: {rotationSpeed === 'ultra-slow' ? 'Ultra Slow (60s)' : 'Slow (35s)'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('assistant')}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-md shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer transition active:scale-95"
                  >
                    <Bot className="w-3.5 h-3.5 text-slate-950" />
                    <span>Chat with Robotic AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HERO VISUAL: Interactive Career Roadmap & Dashboard Preview */}
        <div className="mt-12 max-w-6xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-8 shadow-2xl shadow-cyan-950/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="font-bold text-white text-lg sm:text-xl">
                  Personalized Roadmap Preview: {userProfile.careerGoal}
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
                className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                {CAREER_GOALS_LIST.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Immediate Answer Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium">1. What to Learn Next</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-base font-bold text-white truncate">
                {roadmap.immediatePriority.skill}
              </div>
              <div className="text-[11px] text-cyan-400 mt-1">Immediate Priority Milestone</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium">2. Why Learn It</span>
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {roadmap.immediatePriority.why}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-medium">3. How Long It Takes</span>
                <Clock className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <div className="text-base font-bold text-teal-300">
                {roadmap.immediatePriority.estimatedTime}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">At your {userProfile.studyHours}/wk pace</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition">
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
              <span>Interactive 5-Phase Roadmap Pipeline</span>
              <span className="text-cyan-400 cursor-pointer hover:underline" onClick={() => setActiveTab('roadmap')}>
                View Full Detailed Roadmap →
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {roadmap.phases.map((phase) => (
                <div
                  key={phase.phaseNumber}
                  onClick={() => setActiveTab('roadmap')}
                  className="group p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer relative"
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
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
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

        {/* Feature Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5 text-cyan-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Dynamic Recommendation Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No generic static curriculums. Career Compass weighs your existing knowledge against 2026 tech trends and builds an adaptive roadmap.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5 text-indigo-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Production-Grade Projects</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Build resume-defining systems like AI Resume Analyzers, RAG Chatbots, and Distributed Rate Limiters that recruiters actually respect.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">In-App AI Career Advisor</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask deep questions about tech choices, study strategies, and weekly scheduling tailored to your exact profile and milestones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
