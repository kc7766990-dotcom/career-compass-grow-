import React, { useState } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import {
  Sparkles,
  Download,
  Share2,
  Bookmark,
  RefreshCw,
  Clock,
  Target,
  CheckCircle2,
  Circle,
  Code2,
  Flag,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const {
    userProfile,
    roadmap,
    generateRoadmap,
    saveRoadmap,
    downloadRoadmap,
    shareRoadmap,
    togglePracticeTask,
    setActiveTab
  } = useCareerCompass();

  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: false
  });

  const togglePhase = (phaseNum: number) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseNum]: !prev[phaseNum]
    }));
  };

  const expandAll = () => {
    setExpandedPhases({ 1: true, 2: true, 3: true, 4: true, 5: true });
  };

  const collapseAll = () => {
    setExpandedPhases({ 1: false, 2: false, 3: false, 4: false, 5: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Meta Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
              Personalized Pathway
            </span>
            <span className="text-xs text-slate-400">
              Generated for <strong className="text-white">{userProfile.name}</strong> • {roadmap.targetTimeline} target
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {roadmap.role} Engineering Roadmap
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            5 progressive phases customized to your current skills, target timeline, and 2026 tech trends.
          </p>
        </div>

        {/* ROADMAP ACTIONS BAR */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => generateRoadmap()}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            title="Generate My Roadmap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate My Roadmap</span>
          </button>

          <button
            onClick={() => generateRoadmap()}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            title="Regenerate Roadmap"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Regenerate</span>
          </button>

          <button
            onClick={saveRoadmap}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            title="Save Roadmap to Profile"
          >
            <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
            <span>Save</span>
          </button>

          <button
            onClick={downloadRoadmap}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            title="Download Roadmap JSON"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Download</span>
          </button>

          <button
            onClick={shareRoadmap}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            title="Share Roadmap"
          >
            <Share2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* CORE ANSWER BOX: What should I learn next, why, duration, project */}
      <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-xl shadow-cyan-500/10">
        <div className="bg-slate-950 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your Immediate Priority Focus</h3>
                <p className="text-xs text-slate-400">
                  Career Compass answer to: "What should I learn next, why, how long will it take, and what project should I build?"
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('assistant')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500 text-xs font-medium text-cyan-300 flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <span>Ask AI why this is next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                What to Learn Next
              </span>
              <div className="text-lg font-extrabold text-white">
                {roadmap.immediatePriority.skill}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Immediate milestone to bridge foundation gap.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                Why Learn It
              </span>
              <div className="text-xs text-slate-200 leading-relaxed">
                {roadmap.immediatePriority.why}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/30">
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-1">
                How Long It Will Take
              </span>
              <div className="text-lg font-extrabold text-teal-300">
                {roadmap.immediatePriority.estimatedTime}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Based on your {roadmap.weeklyPace} study availability.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block mb-1">
                What Project to Build
              </span>
              <div className="text-sm font-bold text-purple-300">
                {roadmap.immediatePriority.recommendedProject}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Flagship portfolio deliverable to validate mastery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Collapse/Expand Toolbar */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Interactive 5-Phase Roadmap Progression</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={expandAll} className="hover:text-white transition">
            Expand All
          </button>
          <span>•</span>
          <button onClick={collapseAll} className="hover:text-white transition">
            Collapse All
          </button>
        </div>
      </div>

      {/* THE 5 PHASES VISUAL TIMELINE */}
      <div className="space-y-6">
        {roadmap.phases.map((phase) => {
          const isExpanded = expandedPhases[phase.phaseNumber] ?? true;

          return (
            <div
              key={phase.phaseNumber}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden transition-all shadow-md"
            >
              {/* Phase Header */}
              <div
                onClick={() => togglePhase(phase.phaseNumber)}
                className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition select-none"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-950 border border-cyan-500/40 text-cyan-400 font-extrabold text-sm shadow-sm shadow-cyan-500/10">
                    P{phase.phaseNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {phase.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                    <span>{phase.skills.length} skills</span>
                    <span>•</span>
                    <span>{phase.practiceTasks.filter(t => t.completed).length}/{phase.practiceTasks.length} tasks</span>
                  </div>
                  <button className="p-1 rounded-lg text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Phase Content (Expanded) */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-6">
                  {/* Skills Grid */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                      Phase Skills & Est. Hours
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {phase.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">
                              {skill.name}
                            </div>
                            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                              ~{skill.estimatedHours} hrs
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              skill.status === 'completed'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : skill.status === 'in_progress'
                                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 animate-pulse'
                                : skill.status === 'next_up'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-slate-900 text-slate-500'
                            }`}
                          >
                            {skill.status.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Objectives & Practice Tasks Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Learning Objectives */}
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Target className="w-4 h-4" />
                        Learning Objectives
                      </h4>
                      <ul className="space-y-2.5">
                        {phase.learningObjectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Interactive Practice Tasks */}
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Practice Tasks
                        </span>
                        <span className="text-[11px] text-slate-400 lowercase font-normal">
                          (click to mark done)
                        </span>
                      </h4>
                      <div className="space-y-2">
                        {phase.practiceTasks.map((task) => (
                          <div
                            key={task.id}
                            onClick={() => togglePracticeTask(phase.phaseNumber, task.id)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-900 transition cursor-pointer select-none"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={`text-xs ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                              {task.task}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Milestone & Checkpoint */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Project Milestone */}
                    <div className="lg:col-span-2 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-950 border border-cyan-800/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5" />
                          Phase Project Milestone
                        </span>
                        <span className="text-[10px] text-slate-400">Verified Deliverable</span>
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1">
                        {phase.project.title}
                      </h5>
                      <p className="text-xs text-slate-300 mb-3">
                        {phase.project.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 mr-1">Stack:</span>
                        {phase.project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Phase Checkpoint */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                        <Flag className="w-3.5 h-3.5" />
                        <span>{phase.checkpoint.title}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {phase.checkpoint.criteria}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
