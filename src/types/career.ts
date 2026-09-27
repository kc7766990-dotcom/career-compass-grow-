export type EducationLevel = '10th' | '12th' | 'Diploma' | 'Undergraduate' | 'Graduate';

export type ExperienceLevel = 'Beginner' | 'Student' | 'Fresher' | 'Junior Developer' | 'Experienced';

export type SkillProficiency = 'None' | 'Beginner' | 'Intermediate' | 'Advanced';

export type CareerGoal =
  | 'Software Engineer'
  | 'Full Stack Developer'
  | 'Backend Developer'
  | 'Frontend Developer'
  | 'AI Engineer'
  | 'ML Engineer'
  | 'Data Engineer'
  | 'Cloud Engineer'
  | 'DevOps Engineer'
  | 'Cybersecurity Engineer';

export type StudyHoursPerWeek = '5 hours' | '10 hours' | '15 hours' | '20+ hours';

export type TargetTimeline = '3 months' | '6 months' | '12 months' | '18 months';

export type TargetMarket = 'India' | 'Remote' | 'Global';

export interface UserSkill {
  name: string;
  category: 'Programming' | 'Core' | 'Framework' | 'Backend' | 'Data' | 'Cloud/DevOps' | 'AI' | 'Security';
  level: SkillProficiency;
}

export interface UserProfile {
  name: string;
  email?: string;
  education: EducationLevel;
  experience: ExperienceLevel;
  skills: UserSkill[];
  weakSkills?: string[];
  careerGoal: CareerGoal;
  studyHours: StudyHoursPerWeek;
  targetTimeline: TargetTimeline;
  targetMarket: TargetMarket;
  primaryLanguage: string;
  isAssessmentComplete: boolean;
  savedAt?: string;
}

export interface SkillGapItem {
  id: string;
  skillName: string;
  currentLevel: number; // 0 to 100
  requiredLevel: number; // 0 to 100
  gap: number; // required - current
  priority: 'High' | 'Medium' | 'Low';
  recommendedAction: string;
  phase: string;
  status: 'pending' | 'in_progress' | 'mastered';
}

export interface ReadinessScorePillars {
  technicalSkills: number;
  dsa: number;
  projects: number;
  cloud: number;
  aiSkills: number;
  systemDesign: number;
  github: number;
  interviewPrep: number;
}

export interface ReadinessScoreData {
  overallScore: number;
  grade: string;
  summary: string;
  pillars: ReadinessScorePillars;
}

export interface RoadmapSkillItem {
  name: string;
  tag: string;
  status: 'completed' | 'in_progress' | 'next_up' | 'locked';
  estimatedHours: number;
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  skills: RoadmapSkillItem[];
  learningObjectives: string[];
  practiceTasks: {
    id: string;
    task: string;
    completed: boolean;
  }[];
  project: {
    title: string;
    description: string;
    techStack: string[];
    deliverable: string;
  };
  checkpoint: {
    title: string;
    criteria: string;
  };
}

export interface RoadmapData {
  role: CareerGoal;
  generatedDate: string;
  targetTimeline: string;
  weeklyPace: string;
  immediatePriority: {
    skill: string;
    why: string;
    estimatedTime: string;
    recommendedProject: string;
  };
  phases: RoadmapPhase[];
}

export interface TechTrendItem {
  id: string;
  name: string;
  iconName: string;
  category: string;
  whyItMatters: string;
  skillsRequired: string[];
  recommendedProject: string;
  marketDemand: 'Ultra High' | 'High' | 'Rapidly Growing';
  averageSalaryUplift: string;
  whyForYou: string; // Dynamic based on user role and current skills
  relevantRoles: CareerGoal[];
}

export interface ProjectRecommendation {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technologyStack: string[];
  estimatedDuration: string;
  skillsDeveloped: string[];
  resumeValue: 'High' | 'Elite' | 'Critical';
  overview: string;
  keyFeatures: string[];
  architectureTip: string;
  relevantRoles: CareerGoal[];
}

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface WeeklyTask {
  id: string;
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  topic: string;
  duration: string;
  category: 'DSA' | 'Language' | 'Backend' | 'Frontend' | 'Database' | 'Cloud' | 'Project' | 'System Design' | 'Revision';
  status: TaskStatus;
}

export interface WeeklySchedule {
  weekNumber: number;
  focusTitle: string;
  totalHours: number;
  tasks: WeeklyTask[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'gemini' | 'heuristic' | 'fallback';
}
