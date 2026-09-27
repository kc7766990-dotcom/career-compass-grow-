import React from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import { TaskStatus, StudyHoursPerWeek } from '../types/career';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  Sparkles,
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';

export const WeeklyPlanView: React.FC = () => {
  const { weeklySchedule, updateWeeklyTaskStatus, userProfile, updateProfile } = useCareerCompass();

  const studyHoursOptions: StudyHoursPerWeek[] = ['5 hours', '10 hours', '15 hours', '20+ hours'];

  const completedCount = weeklySchedule.tasks.filter(t => t.status === 'Completed').length;
  const inProgressCount = weeklySchedule.tasks.filter(t => t.status === 'In Progress').length;
  const totalCount = weeklySchedule.tasks.length;
  const weeklyCompletionRate = Math.round((completedCount / (totalCount || 1)) * 100);

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'In Progress':
        return 'bg-cyan-950 text-cyan-300 border-cyan-800 animate-pulse';
      default:
        return 'bg-slate-900 text-slate-400 border-slate-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
              Personalized Rhythm
            </span>
            <span className="text-xs text-slate-400">
              Calibrated to {userProfile.studyHours}/week
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Weekly Personalized Plan
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Dynamic learning cadence designed to balance algorithmic foundations, architecture building, and milestone projects.
          </p>
        </div>

        {/* Change Study Pace Filter */}
        <div className="flex flex-col items-start md:items-end gap-1.5">
          <span className="text-xs text-slate-400">Adjust Study Hours:</span>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {studyHoursOptions.map((hrs) => (
              <button
                key={hrs}
                onClick={() => updateProfile({ studyHours: hrs })}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  userProfile.studyHours === hrs
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {hrs}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Progress Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            {weeklySchedule.focusTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {completedCount} of {totalCount} daily task sessions completed this week • {weeklySchedule.totalHours} target hours
          </p>
        </div>

        <div className="w-full sm:w-64 flex flex-col items-end gap-1.5">
          <div className="flex justify-between w-full text-xs">
            <span className="text-slate-400">Week Completion</span>
            <span className="font-bold text-cyan-400 font-mono">{weeklyCompletionRate}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 rounded-full transition-all duration-500"
              style={{ width: `${weeklyCompletionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Days Breakdown (Monday - Sunday) */}
      <div className="space-y-4">
        {weeklySchedule.tasks.map((task) => (
          <div
            key={task.id}
            className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 backdrop-blur-xl transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
          >
            {/* Day and Topic */}
            <div className="flex items-start md:items-center gap-4">
              <div className="w-28 flex-shrink-0">
                <span className="text-xs font-extrabold text-cyan-400 tracking-wider">
                  {task.day}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{task.duration}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">
                  {task.topic}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                    {task.category}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getStatusBadge(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Task Status Toggles (Not Started, In Progress, Completed) */}
            <div className="flex items-center gap-1.5 self-end md:self-auto">
              {(['Not Started', 'In Progress', 'Completed'] as TaskStatus[]).map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => updateWeeklyTaskStatus(task.id, statusOption)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    task.status === statusOption
                      ? statusOption === 'Completed'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : statusOption === 'In Progress'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {statusOption === 'Completed' && <Check className="w-3.5 h-3.5" />}
                  {statusOption === 'In Progress' && <PlayCircle className="w-3.5 h-3.5" />}
                  <span>{statusOption}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
