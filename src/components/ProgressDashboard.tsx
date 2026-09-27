import React from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import { CareerReadinessCircularScore } from './CareerReadinessCircularScore';
import {
  Activity,
  Flame,
  CheckCircle2,
  Clock,
  Award,
  Layers,
  Sparkles,
  FolderGit2,
  Calendar,
  ArrowRight,
  TrendingUp,
  BarChart2
} from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const { userProfile, roadmap, readinessScore, weeklySchedule, setActiveTab } = useCareerCompass();

  // Metrics calculation
  let totalSkills = 0;
  let completedSkills = 0;
  let inProgressSkills = 0;

  roadmap.phases.forEach((phase) => {
    phase.skills.forEach((skill) => {
      totalSkills++;
      if (skill.status === 'completed') completedSkills++;
      if (skill.status === 'in_progress') inProgressSkills++;
    });
  });

  const remainingSkills = Math.max(0, totalSkills - completedSkills);
  const overallProgressPercentage = Math.round((completedSkills / (totalSkills || 1)) * 100);

  const completedWeeklyTasks = weeklySchedule.tasks.filter((t) => t.status === 'Completed').length;
  const weeklyPercentage = Math.round((completedWeeklyTasks / (weeklySchedule.tasks.length || 1)) * 100);

  const learningStreakDays = 14; // Gamified active streak
  const completedProjectsCount = 1; // Milestone completed in Phase 1

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
            Trajectory Analytics
          </span>
          <span className="text-xs text-slate-400">
            Live telemetry for {userProfile.name}
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Learning Progress & Velocity Dashboard
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Track skill completion, phase advancement, weekly rhythm, and streak consistency.
        </p>
      </div>

      {/* Animated Circular Career Readiness Score & Skills Breakdown Component */}
      <CareerReadinessCircularScore
        readiness={readinessScore}
        careerGoal={userProfile.careerGoal}
        onExploreSkills={() => setActiveTab('skill-gap')}
      />

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Progress */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Overall Progress</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {overallProgressPercentage}%
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full mt-3 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
              style={{ width: `${overallProgressPercentage}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-2 block">
            {completedSkills} of {totalSkills} roadmap skills mastered
          </span>
        </div>

        {/* Current Phase */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Current Phase</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl font-extrabold text-indigo-300 truncate">
            Phase 2: Core Dev
          </div>
          <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
            Active Milestone
          </span>
          <span className="text-[11px] text-slate-500 mt-2 block">
            DSA & API Architecture
          </span>
        </div>

        {/* Learning Streak */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Learning Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300 flex items-center gap-1">
            <span>{learningStreakDays}</span>
            <span className="text-sm font-semibold text-slate-400">Days</span>
          </div>
          <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
            Active Momentum
          </span>
          <span className="text-[11px] text-slate-500 mt-2 block">
            Consistently coding every day
          </span>
        </div>

        {/* Completed Projects */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Completed Projects</span>
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-300">
            {completedProjectsCount}{' '}
            <span className="text-sm font-semibold text-slate-500">/ 5</span>
          </div>
          <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
            Phase 1 CLI Tool Built
          </span>
          <span className="text-[11px] text-slate-500 mt-2 block">
            Next: {roadmap.phases[1]?.project?.title}
          </span>
        </div>
      </div>

      {/* Two-Column Deep Analytics: Skills Inventory & Weekly Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Skills Inventory Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Skills Inventory Status</span>
            </h3>
            <span className="text-xs text-cyan-400 font-mono">
              {totalSkills} Tracked Skills
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center my-4">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-2xl font-bold text-emerald-400">{completedSkills}</div>
              <div className="text-[10px] text-slate-400 uppercase mt-0.5">Completed</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-2xl font-bold text-cyan-400">{inProgressSkills}</div>
              <div className="text-[10px] text-slate-400 uppercase mt-0.5">In Progress</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-2xl font-bold text-slate-400">{remainingSkills}</div>
              <div className="text-[10px] text-slate-400 uppercase mt-0.5">Remaining</div>
            </div>
          </div>

          {/* Quick Skill List by Current Phase */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Phase 2 Active Skills:
            </span>
            {roadmap.phases[1]?.skills.map((sk) => (
              <div
                key={sk.name}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs"
              >
                <span className="text-white font-medium">{sk.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Target: ~{sk.estimatedHours} hrs
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Weekly Study Rhythm & Velocity */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Weekly Velocity & Cadence</span>
            </h3>
            <span className="text-xs text-indigo-400 font-mono">
              {weeklySchedule.totalHours} hrs/week
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Weekly Task Completion</div>
              <div className="text-xl font-bold text-white mt-1">
                {completedWeeklyTasks} of {weeklySchedule.tasks.length} Days Finished
              </div>
            </div>
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">
              {weeklyPercentage}%
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Recent Activity Stream:
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 flex items-center justify-between">
                <span>Completed "Big-O Analysis & Foundation CLI"</span>
                <span className="text-emerald-400 text-[10px]">Verified</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 flex items-center justify-between">
                <span>Updated Weekly Task for Monday (DSA Practice)</span>
                <span className="text-cyan-400 text-[10px]">Logged</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 flex items-center justify-between">
                <span>Synthesized Career Readiness Score ({readinessScore.overallScore}%)</span>
                <span className="text-purple-400 text-[10px]">Active</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('weekly-plan')}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 transition flex items-center justify-center gap-1.5 cursor-pointer mt-4"
          >
            <span>Open Weekly Learning Schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
