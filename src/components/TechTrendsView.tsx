import React, { useState } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import { TECH_TRENDS_DATA } from '../data/careerData';
import {
  TrendingUp,
  Sparkles,
  Bot,
  Box,
  Cloud,
  Shield,
  Sliders,
  Layers,
  Code,
  ArrowRight,
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const TechTrendsView: React.FC = () => {
  const { userProfile, setActiveTab } = useCareerCompass();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Artificial Intelligence', 'Data & AI', 'Infrastructure', 'DevOps & Tooling', 'Security', 'Architecture'];

  const filteredTrends = TECH_TRENDS_DATA.filter(trend => {
    if (selectedCategory === 'All') return true;
    return trend.category.includes(selectedCategory) || (selectedCategory === 'Infrastructure' && trend.category.includes('Infrastructure'));
  });

  // Dynamic customization for "Why this is recommended for you"
  const getDynamicWhyForYou = (trend: typeof TECH_TRENDS_DATA[0]) => {
    const isRelevantToRole = trend.relevantRoles.includes(userProfile.careerGoal);
    const hasCoreLang = userProfile.skills.some(s => ['Java', 'Python', 'JavaScript'].includes(s.name) && s.level !== 'None');

    if (isRelevantToRole) {
      return `Targeted directly for your ${userProfile.careerGoal} milestone. Mastering this elevates your resume into top salary brackets (${trend.averageSalaryUplift}) and gives you modern 2026 tech differentiation.`;
    }

    if (trend.category.includes('Artificial Intelligence')) {
      return `Even outside pure AI roles, modern ${userProfile.careerGoal}s are expected to integrate LLM features and prompt workflows into product architectures.`;
    }

    return `Provides foundational engineering leverage, improving your architecture and scalability comprehension for ${userProfile.careerGoal}.`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
            Market Intelligence
          </span>
          <span className="text-xs text-slate-400">
            Real-Time Analysis for {userProfile.targetMarket} Market
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Technology Trends Shaping Software Careers
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Curated tech vectors reshaping hiring demand, enterprise software architecture, and developer compensation in 2026.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tech Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrends.map((trend) => {
          const isDirectMatch = trend.relevantRoles.includes(userProfile.careerGoal);

          return (
            <div
              key={trend.id}
              className={`rounded-2xl p-6 bg-slate-900/60 border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
                isDirectMatch
                  ? 'border-cyan-500/40 shadow-sm shadow-cyan-500/5 ring-1 ring-cyan-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header: Trend & Demand */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {trend.category}
                    </span>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                      {trend.name}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                      trend.marketDemand === 'Ultra High'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    }`}
                  >
                    {trend.marketDemand}
                  </span>
                </div>

                {/* Why It Matters */}
                <div className="my-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Why It Matters
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {trend.whyItMatters}
                  </p>
                </div>

                {/* Skills Required */}
                <div className="my-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Skills Required
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {trend.skillsRequired.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Project */}
                <div className="my-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    Recommended Project
                  </span>
                  <div className="text-xs font-semibold text-white">
                    {trend.recommendedProject}
                  </div>
                </div>

                {/* WHY THIS IS RECOMMENDED FOR YOU (Personalized) */}
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-950 border border-cyan-500/30">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-300 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why This is Recommended for You</span>
                  </div>
                  <p className="text-xs text-cyan-100/90 leading-relaxed">
                    {getDynamicWhyForYou(trend)}
                  </p>
                </div>
              </div>

              {/* Bottom Salary Uplift & Action */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-400">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Salary Premium:</span>
                  <span className="font-bold text-emerald-400">{trend.averageSalaryUplift}</span>
                </div>

                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Build Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
