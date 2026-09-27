import React, { useState, useEffect } from 'react';
import { ReadinessScoreData } from '../types/career';
import {
  Code2,
  Binary,
  FolderGit2,
  Cloud,
  Brain,
  Layers,
  GitBranch,
  UserCheck,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Flame,
  Zap
} from 'lucide-react';

interface CareerReadinessCircularScoreProps {
  readiness: ReadinessScoreData;
  careerGoal: string;
  className?: string;
  onExploreSkills?: () => void;
}

export const CareerReadinessCircularScore: React.FC<CareerReadinessCircularScoreProps> = ({
  readiness,
  careerGoal,
  className = '',
  onExploreSkills
}) => {
  const { overallScore, grade, summary, pillars } = readiness;

  // Animation progress state for smooth counter & SVG transition
  const [animatedScore, setAnimatedScore] = useState(0);
  const [activePillarHover, setActivePillarHover] = useState<string | null>(null);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(ease * overallScore));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [overallScore]);

  // SVG circular gauge metrics
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const pillarItems = [
    {
      id: 'technical',
      label: 'Technical Skills',
      value: pillars.technicalSkills,
      weight: '20%',
      icon: Code2,
      color: 'from-cyan-500 to-teal-400',
      textColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      description: 'Languages, modern syntax, and clean code paradigms'
    },
    {
      id: 'dsa',
      label: 'DSA & Algorithms',
      value: pillars.dsa,
      weight: '18%',
      icon: Binary,
      color: 'from-indigo-500 to-blue-400',
      textColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      description: 'Data structures, pattern problem solving & Big-O'
    },
    {
      id: 'projects',
      label: 'Production Projects',
      value: pillars.projects,
      weight: '18%',
      icon: FolderGit2,
      color: 'from-purple-500 to-pink-400',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      description: 'Architecture, microservices & end-to-end deliverables'
    },
    {
      id: 'cloud',
      label: 'Cloud & Infrastructure',
      value: pillars.cloud,
      weight: '10%',
      icon: Cloud,
      color: 'from-sky-500 to-cyan-400',
      textColor: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/30',
      description: 'AWS/GCP, Docker containerization & CI/CD deployment'
    },
    {
      id: 'aiSkills',
      label: 'AI Skills & Tooling',
      value: pillars.aiSkills,
      weight: '10%',
      icon: Brain,
      color: 'from-emerald-500 to-teal-400',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      description: 'Generative AI, LLM prompting, RAG & AI productivity'
    },
    {
      id: 'systemDesign',
      label: 'System Design',
      value: pillars.systemDesign,
      weight: '10%',
      icon: Layers,
      color: 'from-amber-500 to-orange-400',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      description: 'Scalability, caching (Redis), rate-limiting & DB sharding'
    },
    {
      id: 'github',
      label: 'GitHub & Portfolio',
      value: pillars.github,
      weight: '7%',
      icon: GitBranch,
      color: 'from-violet-500 to-indigo-400',
      textColor: 'text-violet-400',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30',
      description: 'Git branch workflows, documentation & public repositories'
    },
    {
      id: 'interviewPrep',
      label: 'Interview Preparation',
      value: pillars.interviewPrep,
      weight: '7%',
      icon: UserCheck,
      color: 'from-rose-500 to-pink-500',
      textColor: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      description: 'STAR behavioral answers, mock screenings & ATS resume'
    }
  ];

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Dynamic Readiness Benchmark
            </span>
            <span className="text-xs text-slate-400">
              Targeting <strong className="text-white">{careerGoal}</strong>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Career Readiness Score
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Real-time algorithmic index evaluating your preparedness across technical skills, problem solving, production projects, and modern architecture.
          </p>
        </div>

        {/* Grade Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Evaluation Tier</div>
            <div className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300">
              {grade}
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Circular Dial + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 border-b border-slate-800/80 relative z-10">
        {/* Left: The Animated Circular Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center">
            {/* Pulsing Backlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-xl animate-pulse" />

            <svg
              width={size}
              height={size}
              className="-rotate-90 transform relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              <defs>
                <linearGradient id="scoreProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>

              {/* Background Track Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-slate-800/80 fill-none"
              />

              {/* Foreground Animated Value Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#scoreProgressGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="fill-none transition-all duration-300 ease-out"
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute flex flex-col items-center justify-center text-center select-none z-20">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                {animatedScore}%
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 mt-0.5">
                Readiness
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold text-slate-300">
              {overallScore >= 80 ? 'Market Competitive' : overallScore >= 60 ? 'Advancing Well' : 'Building Momentum'}
            </span>
          </div>
        </div>

        {/* Right: Synthesis Summary & High-Yield Recommendations */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
              <Zap className="w-4 h-4" />
              <span>Career Readiness Assessment</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {summary}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Top Competency</div>
              <div className="text-sm font-extrabold text-emerald-400 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Technical & Core</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-mono">{pillars.technicalSkills}% Proficiency</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Priority Skill Gap</div>
              <div className="text-sm font-extrabold text-amber-400 mt-1 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Cloud & System Design</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-mono">{Math.min(pillars.cloud, pillars.systemDesign)}% Proficiency</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Velocity Factor</div>
              <div className="text-sm font-extrabold text-cyan-400 mt-1 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-cyan-400" />
                <span>Active Streak</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">14 Days Consistent</div>
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS BREAKDOWN (Technical, DSA, Projects, Cloud, AI, System Design, GitHub, Interview Prep) */}
      <div className="mt-6 pt-2 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span>Competency Skills Breakdown (8 Core Pillars)</span>
            <span className="text-[11px] font-normal text-slate-400 lowercase">
              — weighted by 2026 tech hiring bars
            </span>
          </h4>
          {onExploreSkills && (
            <button
              onClick={onExploreSkills}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition self-start sm:self-auto"
            >
              <span>View Full Skill Gap Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {pillarItems.map((pillar) => {
            const Icon = pillar.icon;
            const isMastered = pillar.value >= 75;
            const isMedium = pillar.value >= 45;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillarHover(pillar.id)}
                onMouseLeave={() => setActivePillarHover(null)}
                className={`p-4 rounded-xl bg-slate-950/70 border transition-all duration-200 hover:border-slate-700 hover:bg-slate-950 flex flex-col justify-between ${
                  activePillarHover === pillar.id ? pillar.borderColor : 'border-slate-800/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${pillar.bgColor} ${pillar.textColor}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-white truncate">
                        {pillar.label}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">
                      {pillar.value}%
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-3">
                    {pillar.description}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${pillar.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${pillar.value}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-3 pt-2 border-t border-slate-900">
                  <span>Weight: <strong className="text-slate-400">{pillar.weight}</strong></span>
                  <span
                    className={`font-semibold ${
                      isMastered ? 'text-emerald-400' : isMedium ? 'text-cyan-400' : 'text-amber-400'
                    }`}
                  >
                    {isMastered ? 'Interview Ready' : isMedium ? 'Advancing' : 'Needs Practice'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
