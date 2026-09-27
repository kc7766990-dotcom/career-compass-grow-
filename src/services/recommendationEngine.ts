import {
  CareerGoal,
  ReadinessScoreData,
  RoadmapData,
  RoadmapPhase,
  SkillGapItem,
  UserProfile,
  WeeklySchedule,
  WeeklyTask
} from '../types/career';

// Helper to convert proficiency string to percentage
export function getProficiencyValue(level: string): number {
  switch (level) {
    case 'Advanced':
      return 85;
    case 'Intermediate':
      return 60;
    case 'Beginner':
      return 35;
    default:
      return 0;
  }
}

// Generate Skill Gap Analysis based on Career Goal & User Skills
export function generateSkillGaps(profile: UserProfile): SkillGapItem[] {
  const goal = profile.careerGoal;
  const userSkillMap = new Map<string, number>();

  profile.skills.forEach(s => {
    userSkillMap.set(s.name, getProficiencyValue(s.level));
  });

  // Target requirements by role
  const roleRequirements: Record<CareerGoal, { name: string; req: number; phase: string; rec: string }[]> = {
    'Software Engineer': [
      { name: 'Core Language (Java/Python/C++)', req: 85, phase: 'Phase 1', rec: 'Master OOP, Memory Management & Modern Syntax' },
      { name: 'DSA', req: 85, phase: 'Phase 2', rec: 'Solve 150+ LeetCode medium questions with pattern recognition' },
      { name: 'SQL & Databases', req: 75, phase: 'Phase 2', rec: 'Write complex JOINs, indexing strategies, and query optimization' },
      { name: 'Backend & REST APIs', req: 75, phase: 'Phase 2', rec: 'Build production-ready microservices with validation and logging' },
      { name: 'Git/GitHub', req: 80, phase: 'Phase 1', rec: 'Contribute to open source and master rebasing and branch flows' },
      { name: 'Cloud (AWS/GCP)', req: 65, phase: 'Phase 4', rec: 'Deploy services on ECS/Cloud Run with S3 and RDS' },
      { name: 'System Design', req: 70, phase: 'Phase 4', rec: 'Study rate limiters, caching layers, and database sharding' },
      { name: 'AI-Assisted Development', req: 70, phase: 'Phase 4', rec: 'Integrate LLMs, AI unit test generation, and modern prompt pipelines' }
    ],
    'Full Stack Developer': [
      { name: 'JavaScript / TypeScript', req: 90, phase: 'Phase 1', rec: 'Deep dive into async/await, closures, and static typing' },
      { name: 'React', req: 85, phase: 'Phase 2', rec: 'Master custom hooks, state management, and SSR principles' },
      { name: 'Node.js & Express', req: 85, phase: 'Phase 2', rec: 'Architect RESTful APIs with middleware, JWT auth, and error handling' },
      { name: 'SQL & NoSQL', req: 80, phase: 'Phase 2', rec: 'Design normalized schemas in Postgres and cache with Redis' },
      { name: 'HTML/CSS & Tailwind', req: 90, phase: 'Phase 1', rec: 'Build accessible, fully responsive glassmorphic UI components' },
      { name: 'Docker', req: 70, phase: 'Phase 4', rec: 'Write multi-stage Dockerfiles for frontend and backend containers' },
      { name: 'Cloud Deployment', req: 65, phase: 'Phase 4', rec: 'Deploy full-stack applications with custom domains and SSL' },
      { name: 'System Design', req: 65, phase: 'Phase 4', rec: 'Learn client-side caching, CDNs, and API gateway routing' }
    ],
    'Backend Developer': [
      { name: 'Backend Language (Java/Node/Go)', req: 90, phase: 'Phase 1', rec: 'Deepen knowledge in concurrency, thread safety, and async I/O' },
      { name: 'SQL & Query Optimization', req: 85, phase: 'Phase 2', rec: 'Analyze EXPLAIN plans, B-Tree indexes, and connection pooling' },
      { name: 'REST & GraphQL APIs', req: 85, phase: 'Phase 2', rec: 'Implement contract-first OpenAPI specs and gRPC services' },
      { name: 'DSA & Algorithms', req: 80, phase: 'Phase 2', rec: 'Optimize time and space complexity for high-throughput routines' },
      { name: 'Docker & Microservices', req: 75, phase: 'Phase 4', rec: 'Decompose monolithic apps into containerized event-driven services' },
      { name: 'System Design & Redis', req: 80, phase: 'Phase 4', rec: 'Design distributed locking, caching, and message queues' },
      { name: 'Cloud Infrastructure', req: 70, phase: 'Phase 4', rec: 'Implement resilient cloud deployments with zero-downtime rollouts' }
    ],
    'Frontend Developer': [
      { name: 'HTML5 & Modern CSS', req: 95, phase: 'Phase 1', rec: 'Master CSS Grid, Flexbox, animations, and WCAG accessibility' },
      { name: 'JavaScript & TypeScript', req: 90, phase: 'Phase 1', rec: 'Master ESNext, functional programming, and type safety' },
      { name: 'React & Ecosystem', req: 90, phase: 'Phase 2', rec: 'Build complex component trees, state machines, and performant lists' },
      { name: 'Performance Optimization', req: 80, phase: 'Phase 4', rec: 'Optimize Core Web Vitals, code splitting, and asset bundling' },
      { name: 'REST & WebSockets', req: 75, phase: 'Phase 2', rec: 'Handle real-time updates and optimistic data synchronization' },
      { name: 'Testing (Jest/Playwright)', req: 70, phase: 'Phase 4', rec: 'Write unit, integration, and end-to-end browser tests' }
    ],
    'AI Engineer': [
      { name: 'Python & NumPy/Pandas', req: 90, phase: 'Phase 1', rec: 'Vectorized data manipulation and high-performance numerical routines' },
      { name: 'LLM APIs & Prompting', req: 90, phase: 'Phase 2', rec: 'Master structured outputs, context management, and token optimization' },
      { name: 'RAG & Vector Databases', req: 85, phase: 'Phase 3', rec: 'Build semantic search pipelines with pgvector/Pinecone and rerankers' },
      { name: 'AI Agents & Function Calling', req: 85, phase: 'Phase 3', rec: 'Implement multi-step reasoning agents with tool execution' },
      { name: 'Machine Learning Foundations', req: 75, phase: 'Phase 2', rec: 'Understand loss functions, embeddings, and transformer architectures' },
      { name: 'FastAPI & Microservices', req: 75, phase: 'Phase 2', rec: 'Deploy low-latency AI inference endpoints with token streaming' },
      { name: 'Cloud & GPU Deployment', req: 70, phase: 'Phase 4', rec: 'Host model pipelines and scalable inference containers on Cloud Run' }
    ],
    'ML Engineer': [
      { name: 'Python & PyTorch/TensorFlow', req: 90, phase: 'Phase 1', rec: 'Build and train neural networks and custom loss architectures' },
      { name: 'Linear Algebra & Statistics', req: 85, phase: 'Phase 1', rec: 'Master gradient descent, probability distributions, and matrix math' },
      { name: 'Feature Engineering & ETL', req: 80, phase: 'Phase 2', rec: 'Build automated data cleaning and normalization pipelines' },
      { name: 'Model Evaluation & Tuning', req: 85, phase: 'Phase 2', rec: 'Hyperparameter tuning, cross-validation, and bias-variance tradeoff' },
      { name: 'MLOps & Model Registry', req: 75, phase: 'Phase 4', rec: 'Set up MLflow, automated model tracking, and CI/CD for models' }
    ],
    'Data Engineer': [
      { name: 'SQL & Data Warehousing', req: 95, phase: 'Phase 1', rec: 'Master analytical SQL, window functions, and columnar databases' },
      { name: 'Python & Distributed Data', req: 85, phase: 'Phase 1', rec: 'Write PySpark jobs, data transformations, and batch pipelines' },
      { name: 'Data Streaming (Kafka)', req: 80, phase: 'Phase 3', rec: 'Implement real-time topic partitions and event ingestion' },
      { name: 'Orchestration (Airflow)', req: 75, phase: 'Phase 3', rec: 'Build robust DAGs with retries, alerting, and SLA tracking' },
      { name: 'Cloud Data Lakes (S3/BigQuery)', req: 80, phase: 'Phase 4', rec: 'Design partitioned parquet lakes and access governance' }
    ],
    'Cloud Engineer': [
      { name: 'Cloud Architecture (AWS/GCP)', req: 90, phase: 'Phase 1', rec: 'Deep dive into VPC networking, IAM security, and serverless' },
      { name: 'Infrastructure as Code (Terraform)', req: 85, phase: 'Phase 2', rec: 'Declare and manage stateful cloud resources declaratively' },
      { name: 'Docker & Containerization', req: 85, phase: 'Phase 2', rec: 'Package container images with vulnerability scanning' },
      { name: 'Linux System Administration', req: 80, phase: 'Phase 1', rec: 'Master bash scripting, systemd, SSH keys, and firewall rules' },
      { name: 'Cloud Monitoring & SRE', req: 75, phase: 'Phase 4', rec: 'Set up alerting thresholds, SLI/SLO dashboards, and log aggregation' }
    ],
    'DevOps Engineer': [
      { name: 'CI/CD (GitHub Actions/GitLab)', req: 90, phase: 'Phase 2', rec: 'Build automated test, build, lint, and deployment pipelines' },
      { name: 'Docker & Kubernetes (K8s)', req: 90, phase: 'Phase 3', rec: 'Manage production clusters, Helm charts, and Ingress routing' },
      { name: 'Terraform & Cloud Infra', req: 85, phase: 'Phase 2', rec: 'Write reusable IaC modules across multi-region environments' },
      { name: 'Observability & Prometheus', req: 80, phase: 'Phase 4', rec: 'Collect time-series metrics and configure PagerDuty alerts' },
      { name: 'Security & Secret Management', req: 75, phase: 'Phase 4', rec: 'Integrate HashiCorp Vault, encrypted secrets, and container audits' }
    ],
    'Cybersecurity Engineer': [
      { name: 'Network Security & Protocols', req: 90, phase: 'Phase 1', rec: 'Analyze TCP/IP, DNS, TLS handshakes, and packet flows with Wireshark' },
      { name: 'Application Security & OWASP', req: 90, phase: 'Phase 2', rec: 'Prevent SQL injection, XSS, CSRF, and broken access controls' },
      { name: 'SIEM & Threat Detection', req: 80, phase: 'Phase 3', rec: 'Inspect audit logs and implement rule-based anomaly detection' },
      { name: 'Cryptography & Zero Trust', req: 80, phase: 'Phase 3', rec: 'Master symmetric/asymmetric encryption, PKI, and mTLS' },
      { name: 'Penetration Testing & SAST', req: 75, phase: 'Phase 4', rec: 'Run vulnerability scanners and simulated exploit vectors' }
    ]
  };

  const reqs = roleRequirements[goal] || roleRequirements['Software Engineer'];

  return reqs.map((req, index) => {
    // Map current user proficiency based on matched skill
    let currentScore = 0;
    const lowerName = req.name.toLowerCase();

    if (lowerName.includes('java') || lowerName.includes('language')) {
      const match = profile.skills.find(s => ['Java', 'Python', 'C++', 'JavaScript', 'C#'].includes(s.name) && s.level !== 'None');
      currentScore = match ? getProficiencyValue(match.level) : 30;
    } else if (lowerName.includes('dsa') || lowerName.includes('algorithm')) {
      const match = profile.skills.find(s => s.name === 'DSA');
      currentScore = match ? getProficiencyValue(match.level) : 25;
    } else if (lowerName.includes('sql') || lowerName.includes('database')) {
      const match = profile.skills.find(s => s.name === 'SQL');
      currentScore = match ? getProficiencyValue(match.level) : 30;
    } else if (lowerName.includes('react') || lowerName.includes('frontend')) {
      const match = profile.skills.find(s => s.name === 'React' || s.name === 'HTML/CSS');
      currentScore = match ? getProficiencyValue(match.level) : 20;
    } else if (lowerName.includes('cloud') || lowerName.includes('aws')) {
      const match = profile.skills.find(s => s.name === 'Cloud');
      currentScore = match ? getProficiencyValue(match.level) : 10;
    } else if (lowerName.includes('docker') || lowerName.includes('devops')) {
      const match = profile.skills.find(s => s.name === 'DevOps');
      currentScore = match ? getProficiencyValue(match.level) : 15;
    } else if (lowerName.includes('system design')) {
      const match = profile.skills.find(s => s.name === 'System Design');
      currentScore = match ? getProficiencyValue(match.level) : 10;
    } else if (lowerName.includes('ai') || lowerName.includes('rag') || lowerName.includes('llm')) {
      const match = profile.skills.find(s => s.name === 'AI/ML');
      currentScore = match ? getProficiencyValue(match.level) : 10;
    } else {
      currentScore = 30;
    }

    const gap = Math.max(0, req.req - currentScore);
    let priority: 'High' | 'Medium' | 'Low' = 'Low';
    if (gap >= 40) priority = 'High';
    else if (gap >= 20) priority = 'Medium';

    return {
      id: `gap-${index}`,
      skillName: req.name,
      currentLevel: currentScore,
      requiredLevel: req.req,
      gap,
      priority,
      recommendedAction: req.rec,
      phase: req.phase,
      status: currentScore >= req.req ? 'mastered' : currentScore > 30 ? 'in_progress' : 'pending'
    };
  });
}

// Calculate the 8-Pillar Dynamic Readiness Score
export function calculateCareerReadiness(profile: UserProfile, gaps: SkillGapItem[]): ReadinessScoreData {
  let technicalSkills = 45;
  let dsa = 35;
  let projects = 40;
  let cloud = 20;
  let aiSkills = 25;
  let systemDesign = 20;
  let github = 50;
  let interviewPrep = 30;

  // Enhance scores based on user skills
  profile.skills.forEach(skill => {
    const val = getProficiencyValue(skill.level);
    if (skill.name === 'DSA') dsa = Math.max(dsa, val);
    if (skill.name === 'Git/GitHub') github = Math.max(github, val);
    if (skill.name === 'Cloud') cloud = Math.max(cloud, val);
    if (skill.name === 'AI/ML') aiSkills = Math.max(aiSkills, val);
    if (skill.name === 'System Design') systemDesign = Math.max(systemDesign, val);
    if (['Java', 'Python', 'JavaScript', 'C++', 'SQL'].includes(skill.name)) {
      technicalSkills = Math.max(technicalSkills, Math.min(95, technicalSkills + (val > 50 ? 15 : 5)));
    }
  });

  // Factor in experience level
  if (profile.experience === 'Experienced') {
    projects += 35;
    interviewPrep += 35;
    technicalSkills += 15;
  } else if (profile.experience === 'Junior Developer') {
    projects += 25;
    interviewPrep += 20;
    technicalSkills += 10;
  } else if (profile.experience === 'Fresher') {
    projects += 15;
    interviewPrep += 10;
  }

  // Cap values at 100
  const pillars = {
    technicalSkills: Math.min(100, technicalSkills),
    dsa: Math.min(100, dsa),
    projects: Math.min(100, projects),
    cloud: Math.min(100, cloud),
    aiSkills: Math.min(100, aiSkills),
    systemDesign: Math.min(100, systemDesign),
    github: Math.min(100, github),
    interviewPrep: Math.min(100, interviewPrep)
  };

  const overallScore = Math.round(
    (pillars.technicalSkills * 0.20) +
    (pillars.dsa * 0.18) +
    (pillars.projects * 0.18) +
    (pillars.cloud * 0.10) +
    (pillars.aiSkills * 0.10) +
    (pillars.systemDesign * 0.10) +
    (pillars.github * 0.07) +
    (pillars.interviewPrep * 0.07)
  );

  let grade = 'Foundation Stage';
  let summary = 'You have laid solid initial foundations. Focus on closing core DSA and cloud deployment gaps.';

  if (overallScore >= 80) {
    grade = 'Job Ready';
    summary = 'Your profile is highly competitive for tier-1 engineering interviews and modern product companies.';
  } else if (overallScore >= 65) {
    grade = 'Advancing Well';
    summary = 'Strong core skillset with clear momentum. Completing your milestone projects will tip you into job readiness.';
  } else if (overallScore >= 50) {
    grade = 'Intermediate Momentum';
    summary = 'Good technical foundation. Prioritize system design fundamentals and containerization practice.';
  }

  return {
    overallScore,
    grade,
    summary,
    pillars
  };
}

// Generate Personalized Roadmap based on the User's exact condition
export function generatePersonalizedRoadmap(profile: UserProfile, gaps: SkillGapItem[]): RoadmapData {
  const goal = profile.careerGoal;
  const targetTimeline = profile.targetTimeline;
  const studyHours = profile.studyHours;

  // Determine immediate priority based on profile gaps
  let topGap = gaps.find(g => g.priority === 'High') || gaps[0];
  let immediatePriority = {
    skill: topGap ? topGap.skillName : 'Data Structures & Algorithms',
    why: topGap ? topGap.recommendedAction : 'Essential for passing modern software engineering coding evaluations.',
    estimatedTime: studyHours === '20+ hours' ? '2-3 weeks' : '4-5 weeks',
    recommendedProject: goal === 'AI Engineer' ? 'AI Chatbot with RAG' : 'Full Stack E-Commerce Platform'
  };

  // Build the 5 distinct phases custom to user track
  const phases: RoadmapPhase[] = [];

  // PHASE 1: FOUNDATION
  phases.push({
    phaseNumber: 1,
    title: 'PHASE 1 — FOUNDATION',
    subtitle: 'Programming, Git/GitHub, Problem Solving, Computer Science',
    duration: targetTimeline === '3 months' ? '2-3 Weeks' : '4-6 Weeks',
    skills: [
      { name: profile.primaryLanguage || 'Core Programming', tag: 'Core', status: 'completed', estimatedHours: 25 },
      { name: 'Git & GitHub Workflows', tag: 'Tooling', status: 'completed', estimatedHours: 15 },
      { name: 'Problem Solving & Big-O Notation', tag: 'CS Theory', status: 'in_progress', estimatedHours: 20 },
      { name: 'Basic Computer Science & Memory Models', tag: 'Fundamentals', status: 'in_progress', estimatedHours: 15 }
    ],
    learningObjectives: [
      'Master language syntax, OOP principles, and clean code conventions',
      'Learn multi-branch Git hygiene, merge conflicts resolution, and pull requests',
      'Analyze time and space complexity with Big-O notation',
      'Understand heap vs stack memory and thread execution basics'
    ],
    practiceTasks: [
      { id: 't1', task: 'Implement 5 foundational OOP patterns (Singleton, Factory, Observer, etc.)', completed: true },
      { id: 't2', task: 'Create a GitHub profile repository with dynamic GitHub Actions status badges', completed: true },
      { id: 't3', task: 'Solve 20 Easy LeetCode problems calculating Big-O for each', completed: false }
    ],
    project: {
      title: 'Command-Line Task & Workflow Engine',
      description: 'A modular CLI application that parses arguments, manages persistent JSON storage, and handles errors cleanly.',
      techStack: [profile.primaryLanguage, 'Git', 'CLI'],
      deliverable: 'Tested CLI tool with unit tests and documented GitHub README'
    },
    checkpoint: {
      title: 'Foundation Checkpoint',
      criteria: 'Pass 10 fundamental algorithmic problems and demonstrate clean Git repository structure.'
    }
  });

  // PHASE 2: CORE DEVELOPMENT
  let coreSkillList = [
    { name: 'DSA (Arrays, Linked Lists, Trees, Graphs)', tag: 'Algorithms', status: 'next_up' as const, estimatedHours: 45 },
    { name: 'Object-Oriented Design & Clean Code', tag: 'Architecture', status: 'next_up' as const, estimatedHours: 25 },
    { name: 'SQL & Relational Databases (PostgreSQL)', tag: 'Data', status: 'next_up' as const, estimatedHours: 30 },
    { name: 'REST APIs & HTTP Protocols', tag: 'Networking', status: 'next_up' as const, estimatedHours: 30 }
  ];

  if (goal === 'AI Engineer' || goal === 'ML Engineer') {
    coreSkillList = [
      { name: 'Python, NumPy & Vector Math', tag: 'Data', status: 'next_up', estimatedHours: 35 },
      { name: 'SQL & Feature Extraction Pipelines', tag: 'Data', status: 'next_up', estimatedHours: 25 },
      { name: 'Machine Learning Foundations & Scikit-Learn', tag: 'AI Core', status: 'next_up', estimatedHours: 40 },
      { name: 'FastAPI & Asynchronous REST Services', tag: 'Backend', status: 'next_up', estimatedHours: 25 }
    ];
  } else if (goal === 'Full Stack Developer') {
    coreSkillList = [
      { name: 'React State Management & Hooks', tag: 'Frontend', status: 'next_up', estimatedHours: 35 },
      { name: 'Node.js & Express Architecture', tag: 'Backend', status: 'next_up', estimatedHours: 35 },
      { name: 'PostgreSQL & ORMs (Prisma/Drizzle)', tag: 'Database', status: 'next_up', estimatedHours: 25 },
      { name: 'DSA & Common Coding Patterns', tag: 'Algorithms', status: 'next_up', estimatedHours: 30 }
    ];
  }

  phases.push({
    phaseNumber: 2,
    title: 'PHASE 2 — CORE DEVELOPMENT',
    subtitle: 'DSA, OOP, SQL, APIs, Backend/Frontend Fundamentals',
    duration: targetTimeline === '3 months' ? '3-4 Weeks' : '6-8 Weeks',
    skills: coreSkillList,
    learningObjectives: [
      'Master Two Pointers, Sliding Window, DFS/BFS, and Hash Map problem solving',
      'Design relational schemas with 3NF normalization, foreign keys, and indexes',
      'Build robust CRUD APIs with JWT authentication, validation, and error logging',
      'Implement structured unit and integration tests with mock data stores'
    ],
    practiceTasks: [
      { id: 't4', task: 'Solve 40 LeetCode Mediums covering HashMaps, Binary Search, and Tree traversals', completed: false },
      { id: 't5', task: 'Write complex SQL queries using JOINs, Window Functions, and GROUP BY', completed: false },
      { id: 't6', task: 'Build an authenticated REST API with rate-limiting middleware', completed: false }
    ],
    project: {
      title: goal === 'AI Engineer' ? 'AI Resume Analyzer' : 'Full Stack E-Commerce Platform',
      description: 'End-to-end production application with database persistence, auth security, and robust business logic.',
      techStack: goal === 'AI Engineer' ? ['Python', 'FastAPI', 'Gemini API', 'Postgres'] : ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
      deliverable: 'Live deployed application with CI pipeline and responsive dashboard'
    },
    checkpoint: {
      title: 'Core Development Evaluation',
      criteria: 'Pass a 45-minute timed coding assessment and code-review your API repository.'
    }
  });

  // PHASE 3: SPECIALIZATION
  let specSkills = [
    { name: `${profile.primaryLanguage} Enterprise Framework (Spring Boot/NestJS)`, tag: 'Framework', status: 'locked' as const, estimatedHours: 40 },
    { name: 'Distributed Caching with Redis', tag: 'Performance', status: 'locked' as const, estimatedHours: 20 },
    { name: 'Microservice Communication (REST / gRPC)', tag: 'Protocols', status: 'locked' as const, estimatedHours: 25 },
    { name: 'Asynchronous Event Queues (Kafka/RabbitMQ)', tag: 'Messaging', status: 'locked' as const, estimatedHours: 30 }
  ];

  if (goal === 'AI Engineer') {
    specSkills = [
      { name: 'LLM APIs & Prompt Engineering (Gemini/OpenAI)', tag: 'GenAI', status: 'locked', estimatedHours: 30 },
      { name: 'RAG Architectures & Vector Stores (pgvector/Pinecone)', tag: 'RAG', status: 'locked', estimatedHours: 35 },
      { name: 'AI Agents & Function Calling Orchestration', tag: 'Agents', status: 'locked', estimatedHours: 35 },
      { name: 'Evaluation Metrics & Latency Optimization', tag: 'Optimization', status: 'locked', estimatedHours: 20 }
    ];
  } else if (goal === 'Cloud Engineer' || goal === 'DevOps Engineer') {
    specSkills = [
      { name: 'Docker Containerization & Image Optimization', tag: 'Containers', status: 'locked', estimatedHours: 25 },
      { name: 'Kubernetes Pods, Services & Ingress Deployment', tag: 'K8s', status: 'locked', estimatedHours: 40 },
      { name: 'Infrastructure as Code with Terraform', tag: 'IaC', status: 'locked', estimatedHours: 30 },
      { name: 'Automated CI/CD with GitHub Actions', tag: 'DevOps', status: 'locked', estimatedHours: 25 }
    ];
  } else if (goal === 'Cybersecurity Engineer') {
    specSkills = [
      { name: 'OWASP Top 10 Web Exploitation & Mitigation', tag: 'AppSec', status: 'locked', estimatedHours: 30 },
      { name: 'Network Traffic Analysis & Wireshark', tag: 'NetSec', status: 'locked', estimatedHours: 25 },
      { name: 'Zero-Trust Architecture & IAM Policies', tag: 'Security', status: 'locked', estimatedHours: 25 },
      { name: 'Automated Vulnerability Scanning (SAST/DAST)', tag: 'Audit', status: 'locked', estimatedHours: 20 }
    ];
  }

  phases.push({
    phaseNumber: 3,
    title: 'PHASE 3 — SPECIALIZATION',
    subtitle: `Role-Specific Mastery for ${goal}`,
    duration: targetTimeline === '3 months' ? '3-4 Weeks' : '6-8 Weeks',
    skills: specSkills,
    learningObjectives: [
      `Master production-grade idioms and architectures specific to ${goal}`,
      'Implement real-time features, caching layers, and high-performance throughput',
      'Integrate modern 2026 industry tooling and automated validation',
      'Build end-to-end resilient systems that solve complex domain challenges'
    ],
    practiceTasks: [
      { id: 't7', task: 'Implement multi-tier architecture with separation of concerns', completed: false },
      { id: 't8', task: 'Deploy a resilient microservice with Redis caching & health checks', completed: false },
      { id: 't9', task: 'Implement automated unit & integration testing with >80% coverage', completed: false }
    ],
    project: {
      title: goal === 'AI Engineer' ? 'AI Chatbot with RAG & Semantic Memory' : goal === 'DevOps Engineer' ? 'Cloud Monitoring & Telemetry Dashboard' : 'Real-Time Collaboration Platform',
      description: 'An advanced enterprise-grade system solving high concurrency and complex user interaction.',
      techStack: goal === 'AI Engineer' ? ['FastAPI', 'Gemini API', 'pgvector', 'Docker'] : ['TypeScript', 'WebSockets', 'Redis', 'Docker'],
      deliverable: 'Interactive live prototype with architecture diagram and benchmark report'
    },
    checkpoint: {
      title: 'Specialization Technical Review',
      criteria: 'Demonstrate deep conceptual mastery in your specialization through a system walkthrough.'
    }
  });

  // PHASE 4: ADVANCED SKILLS
  phases.push({
    phaseNumber: 4,
    title: 'PHASE 4 — ADVANCED SKILLS',
    subtitle: 'Cloud, DevOps, System Design, Security, AI-Assisted Dev',
    duration: targetTimeline === '3 months' ? '2-3 Weeks' : '4-6 Weeks',
    skills: [
      { name: 'System Design & Scalability Principles', tag: 'Architecture', status: 'locked', estimatedHours: 35 },
      { name: 'Cloud Computing (AWS / GCP / Cloud Run)', tag: 'Cloud', status: 'locked', estimatedHours: 30 },
      { name: 'Docker & Container Workflows', tag: 'DevOps', status: 'locked', estimatedHours: 25 },
      { name: 'Security, JWT, OAuth2 & OWASP Hardening', tag: 'Security', status: 'locked', estimatedHours: 20 },
      { name: 'AI-Assisted Software Development & Copilots', tag: 'Productivity', status: 'locked', estimatedHours: 15 }
    ],
    learningObjectives: [
      'Design distributed systems handling millions of daily active requests',
      'Understand CAP theorem, consistency models, load balancers, and CDN caching',
      'Containerize applications with multi-stage builds and minimal image attack vectors',
      'Enforce zero-trust security, encrypted environment secrets, and HTTPS termination'
    ],
    practiceTasks: [
      { id: 't10', task: 'Design a distributed URL shortener or rate limiter handling 100K RPS', completed: false },
      { id: 't11', task: 'Deploy your portfolio applications to production cloud containers', completed: false },
      { id: 't12', task: 'Configure SSL certificates, custom DNS, and automated rollback triggers', completed: false }
    ],
    project: {
      title: 'Distributed High-Throughput Rate Limiter & Telemetry Service',
      description: 'A distributed middleware service that uses token bucket algorithms in Redis to enforce per-user API limits.',
      techStack: ['Node.js/Go', 'Redis', 'Docker', 'GCP/AWS'],
      deliverable: 'Load-tested service handling 25,000 requests/sec with Grafana visualization'
    },
    checkpoint: {
      title: 'System Architecture Defense',
      criteria: 'Explain architecture tradeoffs on whiteboard/diagram for high availability and failover.'
    }
  });

  // PHASE 5: JOB READY
  phases.push({
    phaseNumber: 5,
    title: 'PHASE 5 — JOB READY',
    subtitle: 'Resume, GitHub Portfolio, Projects, DSA Prep, Mock Interviews',
    duration: targetTimeline === '3 months' ? '2 Weeks' : '3-4 Weeks',
    skills: [
      { name: 'Impact-Driven Software Resume Writing', tag: 'Career', status: 'locked', estimatedHours: 15 },
      { name: 'Production GitHub Portfolio & README Polish', tag: 'Branding', status: 'locked', estimatedHours: 20 },
      { name: 'DSA Interview Sprints (Blind 75 / Grind 169)', tag: 'Interviews', status: 'locked', estimatedHours: 35 },
      { name: 'System Design Mock Interviews', tag: 'Interviews', status: 'locked', estimatedHours: 25 },
      { name: 'Behavioral & STAR Method Storytelling', tag: 'Soft Skills', status: 'locked', estimatedHours: 15 }
    ],
    learningObjectives: [
      'Format ATS-optimized resume emphasizing business impact, metrics, and technology stacks',
      'Curate 2-3 flagship pinned GitHub repositories with live demo URLs, tests, and documentation',
      'Simulate high-pressure 45-minute technical coding interviews',
      'Formulate compelling STAR responses highlighting leadership, problem-solving, and conflict resolution'
    ],
    practiceTasks: [
      { id: 't13', task: 'Complete ATS resume score evaluation and iterate to >85% score', completed: false },
      { id: 't14', task: 'Record 3 video mock interviews answering behavioral and system design questions', completed: false },
      { id: 't15', task: 'Submit 20 tailored job applications targeting your desired market', completed: false }
    ],
    project: {
      title: 'Career Compass Capstone Portfolio Showcase',
      description: 'A cohesive digital portfolio highlighting your production projects, architecture diagrams, and GitHub metrics.',
      techStack: ['React', 'Tailwind', 'CI/CD', 'Custom Domain'],
      deliverable: 'Published live personal domain with embedded demo videos and verifiable metrics'
    },
    checkpoint: {
      title: 'Final Job-Ready Certification',
      criteria: 'Pass 3 full mock interviews and submit vetted applications to 10 target companies.'
    }
  });

  return {
    role: goal,
    generatedDate: new Date().toISOString().split('T')[0],
    targetTimeline: profile.targetTimeline,
    weeklyPace: profile.studyHours,
    immediatePriority,
    phases
  };
}

// Generate Personalized Weekly Study Plan based on Study Hours
export function generateWeeklySchedule(profile: UserProfile): WeeklySchedule {
  const hours = profile.studyHours;
  const role = profile.careerGoal;

  let totalHours = 15;
  if (hours === '5 hours') totalHours = 5;
  if (hours === '10 hours') totalHours = 10;
  if (hours === '20+ hours') totalHours = 22;

  const isAI = role === 'AI Engineer' || role === 'ML Engineer';
  const isFullStack = role === 'Full Stack Developer';

  let tasks: WeeklyTask[] = [];

  if (hours === '5 hours') {
    tasks = [
      { id: 'w1', day: 'MONDAY', topic: 'Core Concept Deep Dive & Practice', duration: '1 hour', category: 'Language', status: 'In Progress' },
      { id: 'w2', day: 'TUESDAY', topic: 'DSA Pattern Solving (1-2 Problems)', duration: '1 hour', category: 'DSA', status: 'Not Started' },
      { id: 'w3', day: 'WEDNESDAY', topic: 'Milestone Project Feature Build', duration: '1 hour', category: 'Project', status: 'Not Started' },
      { id: 'w4', day: 'FRIDAY', topic: 'Database & API Architecture', duration: '1 hour', category: 'Backend', status: 'Not Started' },
      { id: 'w5', day: 'SUNDAY', topic: 'Weekly Code Review & Revision', duration: '1 hour', category: 'Revision', status: 'Not Started' }
    ];
  } else if (hours === '10 hours') {
    tasks = [
      { id: 'w1', day: 'MONDAY', topic: isAI ? 'Python & Vector Libraries — 1.5 hrs' : 'DSA (Trees & Graphs) — 1.5 hrs', duration: '1.5 hours', category: 'DSA', status: 'Completed' },
      { id: 'w2', day: 'TUESDAY', topic: isAI ? 'LLM API Integration & Prompting' : 'Backend & REST API Design', duration: '1.5 hours', category: 'Backend', status: 'In Progress' },
      { id: 'w3', day: 'WEDNESDAY', topic: 'SQL Queries & Database Indexing', duration: '1.5 hours', category: 'Database', status: 'Not Started' },
      { id: 'w4', day: 'THURSDAY', topic: 'Cloud & Docker Containerization', duration: '1.5 hours', category: 'Cloud', status: 'Not Started' },
      { id: 'w5', day: 'FRIDAY', topic: 'DSA Interview Problem Set', duration: '1.5 hours', category: 'DSA', status: 'Not Started' },
      { id: 'w6', day: 'SATURDAY', topic: 'Hands-on Milestone Project Development', duration: '2 hours', category: 'Project', status: 'Not Started' },
      { id: 'w7', day: 'SUNDAY', topic: 'Revision & GitHub Commit Push', duration: '0.5 hours', category: 'Revision', status: 'Not Started' }
    ];
  } else if (hours === '15 hours') {
    tasks = [
      { id: 'w1', day: 'MONDAY', topic: isAI ? 'Python Math (1h) + Vector Search (1h)' : 'DSA (Sliding Window & Pointers) — 1h + Java/Core — 1h', duration: '2 hours', category: 'DSA', status: 'Completed' },
      { id: 'w2', day: 'TUESDAY', topic: isFullStack ? 'React State Architecture — 2h' : 'Backend & Microservices — 2h', duration: '2 hours', category: 'Backend', status: 'Completed' },
      { id: 'w3', day: 'WEDNESDAY', topic: 'SQL Optimization (1h) + Project Setup (1h)', duration: '2 hours', category: 'Database', status: 'In Progress' },
      { id: 'w4', day: 'THURSDAY', topic: 'Cloud Deployments & Docker — 2h', duration: '2 hours', category: 'Cloud', status: 'Not Started' },
      { id: 'w5', day: 'FRIDAY', topic: 'DSA Medium Speedrun + Interview Review', duration: '2 hours', category: 'DSA', status: 'Not Started' },
      { id: 'w6', day: 'SATURDAY', topic: 'Milestone Project Building (Full Stack / AI)', duration: '3 hours', category: 'Project', status: 'Not Started' },
      { id: 'w7', day: 'SUNDAY', topic: 'Weekly Assessment + System Design Reading', duration: '2 hours', category: 'Revision', status: 'Not Started' }
    ];
  } else {
    // 20+ hours
    tasks = [
      { id: 'w1', day: 'MONDAY', topic: 'DSA Advanced Graph Algorithms (2h) + Core Syntax (1h)', duration: '3 hours', category: 'DSA', status: 'Completed' },
      { id: 'w2', day: 'TUESDAY', topic: 'Backend Microservices Architecture & Unit Tests', duration: '3 hours', category: 'Backend', status: 'In Progress' },
      { id: 'w3', day: 'WEDNESDAY', topic: 'SQL Performance Tuning (1.5h) + Redis Caching (1.5h)', duration: '3 hours', category: 'Database', status: 'Not Started' },
      { id: 'w4', day: 'THURSDAY', topic: 'Cloud Infrastructure & Docker Compose Setup', duration: '3 hours', category: 'Cloud', status: 'Not Started' },
      { id: 'w5', day: 'FRIDAY', topic: 'DSA Timed LeetCode Contest + Interview Simulation', duration: '3 hours', category: 'DSA', status: 'Not Started' },
      { id: 'w6', day: 'SATURDAY', topic: 'Intensive Milestone Project Build & GitHub Push', duration: '4 hours', category: 'Project', status: 'Not Started' },
      { id: 'w7', day: 'SUNDAY', topic: 'System Design Deep-Dive + Weekly Self-Audit', duration: '3 hours', category: 'System Design', status: 'Not Started' }
    ];
  }

  return {
    weekNumber: 3,
    focusTitle: `Week 3 — Mastering Core Mechanics for ${role}`,
    totalHours,
    tasks
  };
}
