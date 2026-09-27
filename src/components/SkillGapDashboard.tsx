import React, { useState } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import { ReadinessScoreCard } from './ReadinessScoreCard';
import {
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Zap,
  Filter,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const SkillGapDashboard: React.FC = () => {
  const { skillGaps, readinessScore, userProfile, setActiveTab } = useCareerCompass();
  const [filterPriority, setFilterPriority] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  const filteredGaps = skillGaps.filter(item => {
    if (filterPriority === 'All') return true;
    return item.priority === filterPriority;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
            Competency Benchmark
          </span>
          <span className="text-xs text-slate-400">
            Targeting {userProfile.careerGoal} Standards
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Skill Gap Analysis & Career Readiness
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Detailed comparison between your current proficiency and tier-1 market requirements.
        </p>
      </div>

      {/* Embedded Dynamic Career Readiness Score */}
      <ReadinessScoreCard readiness={readinessScore} careerGoal={userProfile.careerGoal} />

      {/* Skill Gap Cards Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Target Skill Gap Matrix</span>
          </h3>

          {/* Priority Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
            {(['All', 'High', 'Medium', 'Low'] as const).map((pri) => (
              <button
                key={pri}
                onClick={() => setFilterPriority(pri)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  filterPriority === pri
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {pri} {pri !== 'All' && 'Priority'}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGaps.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 backdrop-blur-xl transition shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Card Header: Skill Name & Priority */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {item.skillName}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Mapped to {item.phase} of Roadmap
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.priority === 'High'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : item.priority === 'Medium'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                </div>

                {/* Comparative Progress Bars */}
                <div className="space-y-3 my-4">
                  {/* Current Level */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Current Level</span>
                      <span className="font-bold text-cyan-400 font-mono">{item.currentLevel}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-700"
                        style={{ width: `${item.currentLevel}%` }}
                      />
                    </div>
                  </div>

                  {/* Required Level */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Required Level for {userProfile.careerGoal}</span>
                      <span className="font-bold text-slate-200 font-mono">{item.requiredLevel}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-slate-600 rounded-full"
                        style={{ width: `${item.requiredLevel}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Skill Gap Delta Metric */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs mb-3">
                  <span className="text-slate-400">Calculated Gap Delta:</span>
                  <span className={`font-bold font-mono ${item.gap > 30 ? 'text-rose-400' : item.gap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {item.gap > 0 ? `-${item.gap}% Gap` : 'Skill Satisfied'}
                  </span>
                </div>

                {/* Recommended Action */}
                <div className="text-xs text-slate-300">
                  <strong className="text-cyan-300">Action: </strong>
                  {item.recommendedAction}
                </div>
              </div>

              {/* Action Link to Roadmap */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice in Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('assistant')}
                  className="text-slate-400 hover:text-white"
                >
                  Ask AI how to study this
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
