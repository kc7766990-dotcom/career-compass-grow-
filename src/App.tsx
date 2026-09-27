/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CareerCompassProvider, useCareerCompass } from './context/CareerCompassContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AssessmentWizard } from './components/AssessmentWizard';
import { RoadmapView } from './components/RoadmapView';
import { SkillGapDashboard } from './components/SkillGapDashboard';
import { ProjectsView } from './components/ProjectsView';
import { TechTrendsView } from './components/TechTrendsView';
import { WeeklyPlanView } from './components/WeeklyPlanView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AIAssistant } from './components/AIAssistant';
import { ProfileView } from './components/ProfileView';
import { Footer } from './components/Footer';
import { BackgroundWatermark } from './components/BackgroundWatermark';
import { Bot, CheckCircle, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, toastMessage } = useCareerCompass();

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      {/* Professional Fixed Diagonal Watermark (Stays BEHIND all content with pointer-events-none) */}
      <BackgroundWatermark />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-4 py-3 rounded-xl bg-slate-900/95 border border-cyan-500/50 text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Top Navigation (relative z-10 to stay strictly in front of watermark) */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Main Page Content (relative z-10 to stay strictly in front of watermark) */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <div>
            <Hero />
          </div>
        )}

        {activeTab === 'assessment' && <AssessmentWizard />}

        {activeTab === 'roadmap' && <RoadmapView />}

        {activeTab === 'skill-gap' && <SkillGapDashboard />}

        {activeTab === 'projects' && <ProjectsView />}

        {activeTab === 'trends' && <TechTrendsView />}

        {activeTab === 'progress' && <ProgressDashboard />}

        {activeTab === 'weekly-plan' && <WeeklyPlanView />}

        {activeTab === 'assistant' && <AIAssistant />}

        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Floating AI Assistant Summon Pill (Visible on other tabs) */}
      {activeTab !== 'assistant' && (
        <button
          onClick={() => setActiveTab('assistant')}
          className="fixed bottom-6 left-6 z-40 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-xl shadow-cyan-950/40 backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="hidden sm:inline">Ask Career Compass AI</span>
          <span className="sm:hidden">AI Advisor</span>
        </button>
      )}

      {/* Master Footer (relative z-10) */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CareerCompassProvider>
      <AppContent />
    </CareerCompassProvider>
  );
}
