import React from 'react';
import { ReadinessScoreData } from '../types/career';
import { ShieldCheck, Award, Zap, CheckCircle2 } from 'lucide-react';

interface ReadinessScoreCardProps {
  readiness: ReadinessScoreData;
  careerGoal: string;
}

export const ReadinessScoreCard: React.FC<ReadinessScoreCardProps> = ({ readiness, careerGoal }) => {
  const { overallScore, grade, summary, pillars } = readiness;

  // SVG circular gauge calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const pillarItems = [
    { label: 'Technical Skills', value: pillars.technicalSkills, weight: '20%' },
    { label: 'DSA', value: pillars.dsa, weight: '18%' },
    { label: 'Projects', value: pillars.projects, weight: '18%' },
    { label: 'Cloud', value: pillars.cloud, weight: '10%' },
    { label: 'AI Skills', value: pillars.aiSkills, weight: '10%' },
    { label: 'System Design', value: pillars.systemDesign, weight: '10%' },
    { label: 'GitHub', value: pillars.github, weight: '7%' },
    { label: 'Interview Preparation', value: pillars.interviewPrep, weight: '7%' }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Animated Circular Score */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-36 -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-800/80 fill-none"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="url(#readinessGradient)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="fill-none transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Score Center Label */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {overallScore}%
              </span>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                Readiness
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Career Readiness
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {grade}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Preparedness for {careerGoal}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed">
              {summary}
            </p>
          </div>
        </div>

        {/* Right: Quick Stat Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Core DSA</div>
            <div className="text-sm font-bold text-cyan-400 mt-0.5">{pillars.dsa}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Projects</div>
            <div className="text-sm font-bold text-indigo-400 mt-0.5">{pillars.projects}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">AI Skills</div>
            <div className="text-sm font-bold text-purple-400 mt-0.5">{pillars.aiSkills}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Cloud & Infra</div>
            <div className="text-sm font-bold text-teal-400 mt-0.5">{pillars.cloud}%</div>
          </div>
        </div>
      </div>

      {/* 8-Pillar Detailed Breakdown */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center justify-between">
          <span>Readiness Score Breakdown (8 Core Pillars)</span>
          <span className="text-[11px] text-slate-400 lowercase font-normal">
            weighted by industry recruitment standards
          </span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillarItems.map((pillar) => (
            <div
              key={pillar.label}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">{pillar.label}</span>
                <span className="font-bold text-white font-mono">{pillar.value}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    pillar.value >= 75
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : pillar.value >= 50
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${pillar.value}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5">
                <span>Weight: {pillar.weight}</span>
                <span className={pillar.value >= 70 ? 'text-emerald-400' : 'text-slate-400'}>
                  {pillar.value >= 70 ? 'Ready' : 'In Progress'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
