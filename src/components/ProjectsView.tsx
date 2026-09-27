import React, { useState } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import { PROJECTS_DATA } from '../data/careerData';
import { ProjectRecommendation } from '../types/career';
import {
  FolderGit2,
  Code2,
  Clock,
  Layers,
  Award,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X,
  FileText,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { userProfile, roadmap, setActiveTab } = useCareerCompass();
  const [selectedProject, setSelectedProject] = useState<ProjectRecommendation | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  // Sort projects so that projects relevant to user's selected role appear first!
  const sortedProjects = [...PROJECTS_DATA].sort((a, b) => {
    const aMatch = a.relevantRoles.includes(userProfile.careerGoal) ? 1 : 0;
    const bMatch = b.relevantRoles.includes(userProfile.careerGoal) ? 1 : 0;
    return bMatch - aMatch;
  });

  const filteredProjects = sortedProjects.filter(p => {
    if (filterDifficulty === 'All') return true;
    return p.difficulty === filterDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
              Portfolio Engineering
            </span>
            <span className="text-xs text-slate-400">
              Prioritized for {userProfile.careerGoal} Trajectory
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Personalized Project Recommendations
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Real-world systems that prove architectural maturity, concurrency handling, and modern 2026 tech stacks on your GitHub profile.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                filterDifficulty === diff
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isDirectRecommendation = project.relevantRoles.includes(userProfile.careerGoal);

          return (
            <div
              key={project.id}
              className={`rounded-2xl p-6 bg-slate-900/60 border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
                isDirectRecommendation
                  ? 'border-cyan-500/40 shadow-sm shadow-cyan-500/5 ring-1 ring-cyan-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header: Name, Direct match badge & Resume Value */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    {isDirectRecommendation && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-cyan-400 mb-1">
                        <Sparkles className="w-3 h-3" /> Recommended for your goal
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {project.name}
                    </h3>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                      project.resumeValue === 'Critical'
                        ? 'bg-purple-950 text-purple-300 border border-purple-800'
                        : project.resumeValue === 'Elite'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {project.resumeValue} Value
                  </span>
                </div>

                {/* Difficulty & Estimated Duration badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      project.difficulty === 'Advanced'
                        ? 'bg-rose-950/60 text-rose-300'
                        : project.difficulty === 'Intermediate'
                        ? 'bg-indigo-950/60 text-indigo-300'
                        : 'bg-emerald-950/60 text-emerald-300'
                    }`}
                  >
                    {project.difficulty}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {project.estimatedDuration}
                  </span>
                </div>

                {/* Overview */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {project.overview}
                </p>

                {/* Technology Stack */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologyStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Developed */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Skills Developed
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skillsDeveloped.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-800/40 text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Detail Modal Trigger */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95"
                >
                  <span>View Architecture & Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {selectedProject.difficulty}
                </span>
                <span className="text-xs text-slate-400">
                  Est. {selectedProject.estimatedDuration}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {selectedProject.name}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedProject.overview}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Key Feature Requirements
              </h4>
              <ul className="space-y-2">
                {selectedProject.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Tip */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Production Architecture Pro-Tip
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedProject.architectureTip}
              </p>
            </div>

            {/* Resume Bullet Point Generation Preview */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-500/30">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Recommended Resume Bullet Format
              </h4>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                "Architected and deployed {selectedProject.name} using {selectedProject.technologyStack.slice(0, 3).join(', ')}, optimizing performance and latency metrics while demonstrating {selectedProject.skillsDeveloped[0]}."
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setActiveTab('assistant');
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Ask AI Assistant for code scaffolding →
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
