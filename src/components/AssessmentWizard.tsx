import React, { useState } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import {
  EducationLevel,
  ExperienceLevel,
  CareerGoal,
  SkillProficiency,
  StudyHoursPerWeek,
  TargetTimeline,
  TargetMarket,
  UserSkill
} from '../types/career';
import {
  PROGRAMMING_SKILLS,
  OTHER_SKILLS,
  CAREER_GOALS_LIST
} from '../data/careerData';
import {
  Target,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Code,
  Clock,
  Globe2,
  Check
} from 'lucide-react';

export const AssessmentWizard: React.FC = () => {
  const { userProfile, updateProfile, generateRoadmap, setActiveTab } = useCareerCompass();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: userProfile.name || 'Engineer',
    education: userProfile.education,
    experience: userProfile.experience,
    skills: [...userProfile.skills],
    careerGoal: userProfile.careerGoal,
    studyHours: userProfile.studyHours,
    targetTimeline: userProfile.targetTimeline,
    targetMarket: userProfile.targetMarket,
    primaryLanguage: userProfile.primaryLanguage
  });

  const educationOptions: EducationLevel[] = ['10th', '12th', 'Diploma', 'Undergraduate', 'Graduate'];
  const experienceOptions: ExperienceLevel[] = ['Beginner', 'Student', 'Fresher', 'Junior Developer', 'Experienced'];
  const studyHoursOptions: StudyHoursPerWeek[] = ['5 hours', '10 hours', '15 hours', '20+ hours'];
  const timelineOptions: TargetTimeline[] = ['3 months', '6 months', '12 months', '18 months'];
  const marketOptions: TargetMarket[] = ['India', 'Remote', 'Global'];

  const getSkillLevel = (skillName: string): SkillProficiency => {
    const found = formData.skills.find(s => s.name === skillName);
    return found ? found.level : 'None';
  };

  const setSkillLevel = (skillName: string, level: SkillProficiency, category: UserSkill['category']) => {
    setFormData(prev => {
      const existing = prev.skills.filter(s => s.name !== skillName);
      if (level === 'None') {
        return { ...prev, skills: existing };
      }
      return {
        ...prev,
        skills: [...existing, { name: skillName, level, category }]
      };
    });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete Assessment & Generate Roadmap
      updateProfile({
        ...formData,
        isAssessmentComplete: true
      });
      generateRoadmap({
        ...userProfile,
        ...formData,
        isAssessmentComplete: true
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Wizard Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-semibold mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Interactive Career Assessment</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Define Your Engineering Profile
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Career Compass analyzes your current skills, goals, available time, and changing technology trends to synthesize a custom roadmap.
        </p>

        {/* Stepper Indicator */}
        <div className="mt-8 flex items-center justify-between max-w-2xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-[2px] bg-slate-800 z-0" />
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />

          {[
            { num: 1, label: 'Personal Info' },
            { num: 2, label: 'Current Skills' },
            { num: 3, label: 'Career Goal' },
            { num: 4, label: 'Preferences' }
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => setStep(s.num)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step === s.num
                    ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/30'
                    : step > s.num
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 border border-slate-700 text-slate-400'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </button>
              <span className={`text-[11px] mt-2 font-medium ${step === s.num ? 'text-cyan-400' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
        {/* STEP 1: PERSONAL INFORMATION */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                STEP 1 — PERSONAL INFORMATION
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tell us about your educational background and hands-on software experience.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Education Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Education Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {educationOptions.map((edu) => (
                  <button
                    key={edu}
                    type="button"
                    onClick={() => setFormData({ ...formData, education: edu })}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      formData.education === edu
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {edu}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                Experience Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {experienceOptions.map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setFormData({ ...formData, experience: exp })}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      formData.experience === exp
                        ? 'bg-indigo-500/15 border-indigo-400 text-indigo-300 shadow-md shadow-indigo-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CURRENT SKILLS */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                STEP 2 — CURRENT SKILLS & PROFICIENCY
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Select your current level for each skill: Beginner, Intermediate, or Advanced. (Leave as None if you haven't started).
              </p>
            </div>

            {/* Primary Language */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Primary Programming Language
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {PROGRAMMING_SKILLS.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setFormData({ ...formData, primaryLanguage: lang })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition text-center ${
                      formData.primaryLanguage === lang
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Programming Languages Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Programming Languages
              </h4>
              <div className="space-y-2.5">
                {PROGRAMMING_SKILLS.map((skillName) => {
                  const currentLevel = getSkillLevel(skillName);
                  return (
                    <div
                      key={skillName}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 gap-3"
                    >
                      <span className="text-xs font-semibold text-white">{skillName}</span>
                      <div className="flex items-center gap-1.5">
                        {(['None', 'Beginner', 'Intermediate', 'Advanced'] as SkillProficiency[]).map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setSkillLevel(skillName, lvl, 'Programming')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                              currentLevel === lvl
                                ? lvl === 'None'
                                  ? 'bg-slate-800 text-slate-300 border border-slate-600'
                                  : 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
                                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Other Engineering Skills Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Core & Architectural Skills
              </h4>
              <div className="space-y-2.5">
                {OTHER_SKILLS.map((skillName) => {
                  const currentLevel = getSkillLevel(skillName);
                  return (
                    <div
                      key={skillName}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 gap-3"
                    >
                      <span className="text-xs font-semibold text-white">{skillName}</span>
                      <div className="flex items-center gap-1.5">
                        {(['None', 'Beginner', 'Intermediate', 'Advanced'] as SkillProficiency[]).map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setSkillLevel(skillName, lvl, 'Core')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                              currentLevel === lvl
                                ? lvl === 'None'
                                  ? 'bg-slate-800 text-slate-300 border border-slate-600'
                                  : 'bg-indigo-500 text-white font-bold shadow-sm shadow-indigo-500/30'
                                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CAREER GOAL */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                STEP 3 — TARGET CAREER GOAL
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Choose the software engineering role you want Career Compass to calibrate your roadmap towards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CAREER_GOALS_LIST.map((goal) => {
                const isSelected = formData.careerGoal === goal.id;
                return (
                  <div
                    key={goal.id}
                    onClick={() => setFormData({ ...formData, careerGoal: goal.id })}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                        {goal.label}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {goal.description}
                    </p>
                    <div className="mt-2 text-[11px] font-semibold text-emerald-400">
                      {goal.avgSalary}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: STUDY PREFERENCES */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                STEP 4 — STUDY PREFERENCES & MARKET TARGET
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Calibrate study schedules and milestones to your real-world availability.
              </p>
            </div>

            {/* Weekly Study Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Weekly Study Time
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {studyHoursOptions.map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setFormData({ ...formData, studyHours: hrs })}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition text-center ${
                      formData.studyHours === hrs
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {hrs}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Timeline */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Target Timeline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timelineOptions.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, targetTimeline: time })}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition text-center ${
                      formData.targetTimeline === time
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Market */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-teal-400" />
                Target Market
              </label>
              <div className="grid grid-cols-3 gap-3">
                {marketOptions.map((mkt) => (
                  <button
                    key={mkt}
                    type="button"
                    onClick={() => setFormData({ ...formData, targetMarket: mkt })}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition text-center ${
                      formData.targetMarket === mkt
                        ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {mkt}
                  </button>
                ))}
              </div>
            </div>

            {/* Ready to Synthesize Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border border-cyan-500/30 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Ready for Personalized Roadmap Synthesis</div>
                <div className="text-slate-400 mt-0.5">
                  We will calibrate 5 roadmap phases, skill gap metrics, and weekly tasks for {formData.careerGoal}.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              step === 1
                ? 'opacity-40 cursor-not-allowed text-slate-600'
                : 'text-slate-300 bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>{step === 4 ? 'Generate My Roadmap' : 'Next Step'}</span>
            {step === 4 ? (
              <Sparkles className="w-4 h-4 text-slate-950 fill-current" />
            ) : (
              <ArrowRight className="w-4 h-4 text-slate-950" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
