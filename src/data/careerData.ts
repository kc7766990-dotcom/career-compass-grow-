import {
  CareerGoal,
  EducationLevel,
  ExperienceLevel,
  ProjectRecommendation,
  TechTrendItem,
  UserProfile,
  UserSkill
} from '../types/career';

export const PROGRAMMING_SKILLS = [
  'Java',
  'Python',
  'JavaScript',
  'C++',
  'C#'
];

export const OTHER_SKILLS = [
  'HTML/CSS',
  'React',
  'Node.js',
  'SQL',
  'Git/GitHub',
  'DSA',
  'Backend',
  'Cloud',
  'DevOps',
  'AI/ML',
  'Cybersecurity',
  'System Design'
];

export const ALL_ASSESSMENT_SKILLS: { name: string; category: UserSkill['category'] }[] = [
  { name: 'Java', category: 'Programming' },
  { name: 'Python', category: 'Programming' },
  { name: 'JavaScript', category: 'Programming' },
  { name: 'C++', category: 'Programming' },
  { name: 'C#', category: 'Programming' },
  { name: 'HTML/CSS', category: 'Core' },
  { name: 'React', category: 'Framework' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'SQL', category: 'Data' },
  { name: 'Git/GitHub', category: 'Core' },
  { name: 'DSA', category: 'Core' },
  { name: 'Backend', category: 'Backend' },
  { name: 'Cloud', category: 'Cloud/DevOps' },
  { name: 'DevOps', category: 'Cloud/DevOps' },
  { name: 'AI/ML', category: 'AI' },
  { name: 'Cybersecurity', category: 'Security' },
  { name: 'System Design', category: 'Core' }
];

export const CAREER_GOALS_LIST: { id: CareerGoal; label: string; description: string; icon: string; avgSalary: string }[] = [
  {
    id: 'Software Engineer',
    label: 'Software Engineer',
    description: 'Build robust, scalable software systems, algorithms, and core services.',
    icon: 'Code2',
    avgSalary: '$115,000 - $165,000 / ₹12-28 LPA'
  },
  {
    id: 'Full Stack Developer',
    label: 'Full Stack Developer',
    description: 'Master end-to-end web architecture from interactive UIs to server APIs and databases.',
    icon: 'Layers',
    avgSalary: '$110,000 - $160,000 / ₹10-25 LPA'
  },
  {
    id: 'Backend Developer',
    label: 'Backend Developer',
    description: 'Engineer high-throughput microservices, data models, APIs, and scalable infrastructure.',
    icon: 'Server',
    avgSalary: '$118,000 - $170,000 / ₹12-30 LPA'
  },
  {
    id: 'Frontend Developer',
    label: 'Frontend Developer',
    description: 'Design responsive, accessible, high-performance web applications and UI systems.',
    icon: 'Layout',
    avgSalary: '$105,000 - $150,000 / ₹9-22 LPA'
  },
  {
    id: 'AI Engineer',
    label: 'AI Engineer',
    description: 'Develop generative AI apps, autonomous agents, RAG architectures, and fine-tuned LLM workflows.',
    icon: 'Sparkles',
    avgSalary: '$135,000 - $200,000 / ₹18-45 LPA'
  },
  {
    id: 'ML Engineer',
    label: 'ML Engineer',
    description: 'Train mathematical models, neural networks, feature pipelines, and production MLOps.',
    icon: 'Brain',
    avgSalary: '$130,000 - $190,000 / ₹16-40 LPA'
  },
  {
    id: 'Data Engineer',
    label: 'Data Engineer',
    description: 'Architect distributed data pipelines, lakehouses, ETL streams, and big data stores.',
    icon: 'Database',
    avgSalary: '$120,000 - $175,000 / ₹14-32 LPA'
  },
  {
    id: 'Cloud Engineer',
    label: 'Cloud Engineer',
    description: 'Deploy resilient cloud architectures across AWS/GCP/Azure with Terraform and Docker.',
    icon: 'Cloud',
    avgSalary: '$125,000 - $180,000 / ₹14-35 LPA'
  },
  {
    id: 'DevOps Engineer',
    label: 'DevOps Engineer',
    description: 'Automate CI/CD pipelines, Kubernetes clusters, monitoring, and release reliability.',
    icon: 'Terminal',
    avgSalary: '$125,000 - $185,000 / ₹15-36 LPA'
  },
  {
    id: 'Cybersecurity Engineer',
    label: 'Cybersecurity Engineer',
    description: 'Safeguard infrastructure, threat modeling, vulnerability testing, and zero-trust policies.',
    icon: 'ShieldAlert',
    avgSalary: '$122,000 - $180,000 / ₹13-34 LPA'
  }
];

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  education: 'Undergraduate',
  experience: 'Student',
  skills: [
    { name: 'Java', category: 'Programming', level: 'Intermediate' },
    { name: 'Python', category: 'Programming', level: 'Beginner' },
    { name: 'JavaScript', category: 'Programming', level: 'Beginner' },
    { name: 'HTML/CSS', category: 'Core', level: 'Intermediate' },
    { name: 'Git/GitHub', category: 'Core', level: 'Intermediate' },
    { name: 'SQL', category: 'Data', level: 'Intermediate' },
    { name: 'DSA', category: 'Core', level: 'Beginner' },
    { name: 'Backend', category: 'Backend', level: 'Beginner' },
    { name: 'Cloud', category: 'Cloud/DevOps', level: 'None' },
    { name: 'DevOps', category: 'Cloud/DevOps', level: 'None' },
    { name: 'AI/ML', category: 'AI', level: 'None' },
    { name: 'System Design', category: 'Core', level: 'None' },
    { name: 'Cybersecurity', category: 'Security', level: 'None' },
    { name: 'React', category: 'Framework', level: 'None' }
  ],
  careerGoal: 'Software Engineer',
  studyHours: '15 hours',
  targetTimeline: '6 months',
  targetMarket: 'Global',
  primaryLanguage: 'Java',
  isAssessmentComplete: true,
  savedAt: '2026-09-27'
};

export const TECH_TRENDS_DATA: TechTrendItem[] = [
  {
    id: 'ai-engineering',
    name: 'AI Engineering',
    iconName: 'Cpu',
    category: 'Artificial Intelligence',
    whyItMatters: 'Transition from standalone models to end-to-end cognitive architectures driving $1.3T enterprise spend.',
    skillsRequired: ['Python', 'LLM APIs', 'Vector Embeddings', 'Prompt Engineering', 'LangChain/LlamaIndex'],
    recommendedProject: 'AI Career Advisory & Resume Synthesizer',
    marketDemand: 'Ultra High',
    averageSalaryUplift: '+38%',
    whyForYou: 'Key skill to future-proof your career and automate complex software engineering workflows.',
    relevantRoles: ['AI Engineer', 'Software Engineer', 'Full Stack Developer', 'Backend Developer']
  },
  {
    id: 'generative-ai',
    name: 'Generative AI',
    iconName: 'Sparkles',
    category: 'Artificial Intelligence',
    whyItMatters: 'Revolutionizing creative synthesis, code generation, multimodal reasoning, and dynamic interfaces.',
    skillsRequired: ['Gemini API', 'OpenAI SDK', 'Diffusion Models', 'Token Economics', 'Latency Optimization'],
    recommendedProject: 'Multimodal Interactive Canvas with Real-Time Synthesis',
    marketDemand: 'Ultra High',
    averageSalaryUplift: '+35%',
    whyForYou: 'Allows you to build intelligent user-facing features that set your applications apart.',
    relevantRoles: ['AI Engineer', 'Full Stack Developer', 'Frontend Developer', 'Software Engineer']
  },
  {
    id: 'llm-applications',
    name: 'LLM Applications',
    iconName: 'Bot',
    category: 'Artificial Intelligence',
    whyItMatters: 'Enterprise software is shifting from static CRUD apps to autonomous conversational and analytical engines.',
    skillsRequired: ['Context Window Management', 'Structured JSON Outputs', 'Function Calling', 'Token Streaming'],
    recommendedProject: 'Context-Aware Technical Support & Code Review Copilot',
    marketDemand: 'Ultra High',
    averageSalaryUplift: '+32%',
    whyForYou: 'Gives you the tooling to build adaptive logic that learns from user input.',
    relevantRoles: ['Software Engineer', 'Backend Developer', 'AI Engineer', 'Full Stack Developer']
  },
  {
    id: 'rag',
    name: 'RAG (Retrieval-Augmented Generation)',
    iconName: 'Search',
    category: 'Data & AI',
    whyItMatters: 'Solves LLM hallucinations by grounding generative answers in proprietary databases and vector stores.',
    skillsRequired: ['Vector Databases (Pinecone/Chroma/pgvector)', 'Chunking Strategies', 'Hybrid Search', 'Rerankers'],
    recommendedProject: 'AI Knowledge Base Assistant with Hybrid Vector Search',
    marketDemand: 'Ultra High',
    averageSalaryUplift: '+30%',
    whyForYou: 'Critical for production enterprise deployments where accuracy is paramount.',
    relevantRoles: ['AI Engineer', 'Data Engineer', 'Backend Developer', 'Software Engineer']
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    iconName: 'Network',
    category: 'Autonomous Systems',
    whyItMatters: 'Multi-agent orchestration systems that plan, execute tool calls, and self-correct tasks autonomously.',
    skillsRequired: ['Agentic Workflows', 'Tool Use & Function Calling', 'State Machines', 'Memory Buffers', 'AutoGPT / CrewAI'],
    recommendedProject: 'Autonomous Market Research & GitHub Code Quality Auditor',
    marketDemand: 'Ultra High',
    averageSalaryUplift: '+40%',
    whyForYou: 'The frontier of modern software engineering where agents collaborate with human developers.',
    relevantRoles: ['AI Engineer', 'Software Engineer', 'Backend Developer']
  },
  {
    id: 'ai-assisted-dev',
    name: 'AI-Assisted Software Development',
    iconName: 'Wand2',
    category: 'Productivity & Tooling',
    whyItMatters: 'Developers who leverage AI tools ship 55% faster with higher test coverage and cleaner documentation.',
    skillsRequired: ['Cursor / Copilot', 'Spec-Driven Prompting', 'AI Unit Testing', 'Automated Code Review'],
    recommendedProject: 'Automated CI PR Review Bot with Security Analysis',
    marketDemand: 'High',
    averageSalaryUplift: '+22%',
    whyForYou: 'Multiplies your coding velocity and lets you tackle advanced architecture with confidence.',
    relevantRoles: ['Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer']
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    iconName: 'CloudRain',
    category: 'Infrastructure',
    whyItMatters: 'Over 94% of enterprise workloads now run on hyperscaler cloud platforms (AWS, GCP, Azure).',
    skillsRequired: ['AWS/GCP Services', 'IAM & Security Policies', 'Serverless Functions', 'VPC Networking', 'Blob Storage'],
    recommendedProject: 'Serverless Event-Driven Microservice Pipeline',
    marketDemand: 'High',
    averageSalaryUplift: '+28%',
    whyForYou: 'Essential for running software in production environments accessible to global users.',
    relevantRoles: ['Cloud Engineer', 'DevOps Engineer', 'Backend Developer', 'Software Engineer', 'Data Engineer']
  },
  {
    id: 'docker',
    name: 'Docker',
    iconName: 'Box',
    category: 'DevOps & Tooling',
    whyItMatters: 'Containerization is the non-negotiable packaging standard across microservices and CI/CD pipelines.',
    skillsRequired: ['Dockerfile Optimization', 'Multi-Stage Builds', 'Docker Compose', 'Container Networking', 'Volume Storage'],
    recommendedProject: 'Containerized Microservice Application with Multi-Container Compose',
    marketDemand: 'High',
    averageSalaryUplift: '+24%',
    whyForYou: 'Guarantees reliable local environments and seamless team collaboration.',
    relevantRoles: ['DevOps Engineer', 'Cloud Engineer', 'Backend Developer', 'Software Engineer', 'Full Stack Developer']
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes (K8s)',
    iconName: 'Anchor',
    category: 'DevOps & Infrastructure',
    whyItMatters: 'De-facto container orchestrator handling automated failover, autoscaling, and zero-downtime rollouts.',
    skillsRequired: ['Pods, Deployments, Services', 'Ingress Controllers', 'ConfigMaps & Secrets', 'Helm Charts', 'HPA'],
    recommendedProject: 'High-Availability K8s Cluster with Automated Blue-Green Deployments',
    marketDemand: 'High',
    averageSalaryUplift: '+34%',
    whyForYou: 'Distinguishes junior developers from senior infrastructure and backend architects.',
    relevantRoles: ['DevOps Engineer', 'Cloud Engineer', 'Backend Developer']
  },
  {
    id: 'devops',
    name: 'DevOps & CI/CD',
    iconName: 'RefreshCw',
    category: 'Process & Automation',
    whyItMatters: 'Continuous Integration and Continuous Deployment shorten the delivery lifecycle from months to minutes.',
    skillsRequired: ['GitHub Actions', 'Pipeline Triggers', 'Automated Test Runners', 'Infrastructure as Code (Terraform)'],
    recommendedProject: 'Production GitHub Actions CI/CD Pipeline with Automated Staging & Production Gates',
    marketDemand: 'High',
    averageSalaryUplift: '+27%',
    whyForYou: 'Enables your portfolio projects to deploy automatically with green checks on every commit.',
    relevantRoles: ['DevOps Engineer', 'Cloud Engineer', 'Full Stack Developer', 'Software Engineer']
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    iconName: 'Layers',
    category: 'Data Infrastructure',
    whyItMatters: 'AI models and analytics dashboards are only as good as the underlying data ingestion pipelines.',
    skillsRequired: ['Apache Spark / Kafka', 'SQL Analytics', 'dbt', 'Data Lakehouses', 'Airflow Orchestration'],
    recommendedProject: 'Real-Time Financial Market Stream Processor using Kafka and Postgres',
    marketDemand: 'High',
    averageSalaryUplift: '+30%',
    whyForYou: 'High-impact field bridging software engineering with high-velocity data systems.',
    relevantRoles: ['Data Engineer', 'Backend Developer', 'ML Engineer']
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & AppSec',
    iconName: 'ShieldCheck',
    category: 'Security',
    whyItMatters: 'Cyber attacks cost companies $8 trillion annually; secure coding practices are now mandatory in all tech roles.',
    skillsRequired: ['OWASP Top 10', 'JWT & OAuth2 Flow', 'Role-Based Access Control (RBAC)', 'Encryption at Rest & In-Transit', 'SAST/DAST'],
    recommendedProject: 'Zero-Trust Secure Authentication & Audit Logging Gateway',
    marketDemand: 'High',
    averageSalaryUplift: '+29%',
    whyForYou: 'Writing secure code prevents vulnerabilities and builds immediate trust with engineering leads.',
    relevantRoles: ['Cybersecurity Engineer', 'Backend Developer', 'Software Engineer', 'DevOps Engineer']
  },
  {
    id: 'system-design',
    name: 'System Design & High-Scale Architecture',
    iconName: 'Sliders',
    category: 'Architecture',
    whyItMatters: 'The gold standard interview round determining seniority, salary brackets, and architectural leadership.',
    skillsRequired: ['Caching (Redis)', 'Load Balancing', 'Database Sharding & Replication', 'Rate Limiting', 'Eventual Consistency'],
    recommendedProject: 'Distributed Rate Limiter & URL Shortener Handling 50K Requests/Sec',
    marketDemand: 'Ultra High',
    averageSalaryUplift: '+42%',
    whyForYou: 'Transforms you from a syntax coder into a true software engineer who understands trade-offs.',
    relevantRoles: ['Software Engineer', 'Backend Developer', 'Full Stack Developer', 'Cloud Engineer', 'DevOps Engineer']
  }
];

export const PROJECTS_DATA: ProjectRecommendation[] = [
  {
    id: 'ai-resume-analyzer',
    name: 'AI Resume Analyzer',
    difficulty: 'Intermediate',
    technologyStack: ['React', 'TypeScript', 'Node.js/Express', 'Gemini API', 'Tailwind CSS'],
    estimatedDuration: '3-4 weeks',
    skillsDeveloped: ['LLM Prompt Engineering', 'Structured JSON Output', 'PDF Parsing', 'Clean UI Design'],
    resumeValue: 'High',
    overview: 'An intelligent parsing system that evaluates applicant resumes against job descriptions, identifies skill gaps, and suggests actionable improvements.',
    keyFeatures: [
      'Multi-format resume parsing (PDF, text)',
      'Job description keyword match & semantic similarity scoring',
      'Actionable bullet-point revision suggestions with ATS optimization',
      'Downloadable PDF analysis report'
    ],
    architectureTip: 'Implement client-side caching and rate limiting to manage AI tokens efficiently.',
    relevantRoles: ['Software Engineer', 'AI Engineer', 'Full Stack Developer', 'Frontend Developer']
  },
  {
    id: 'ai-chatbot-rag',
    name: 'AI Chatbot with RAG',
    difficulty: 'Advanced',
    technologyStack: ['Python/FastAPI', 'Vector DB (pgvector/Pinecone)', 'Gemini API', 'React', 'Docker'],
    estimatedDuration: '4-5 weeks',
    skillsDeveloped: ['Retrieval-Augmented Generation', 'Vector Embeddings', 'Chunking Strategies', 'FastAPI'],
    resumeValue: 'Elite',
    overview: 'A production-grade technical support bot grounded in custom engineering documentation, eliminating hallucinations through semantic vector search.',
    keyFeatures: [
      'Document ingestion pipeline with semantic chunking',
      'Cosine similarity retrieval with re-ranking',
      'Real-time streaming token responses',
      'Source citation badges linking to original paragraphs'
    ],
    architectureTip: 'Use a hybrid retrieval mechanism combining BM25 keyword search with dense vector embeddings.',
    relevantRoles: ['AI Engineer', 'Software Engineer', 'Backend Developer', 'Data Engineer']
  },
  {
    id: 'fullstack-ecommerce',
    name: 'Full Stack E-Commerce Platform',
    difficulty: 'Intermediate',
    technologyStack: ['React/Next.js', 'Node.js/Express', 'PostgreSQL', 'Stripe API', 'Redis'],
    estimatedDuration: '4-6 weeks',
    skillsDeveloped: ['Relational Database Modeling', 'JWT & OAuth Auth', 'Payment Gateway Integration', 'Redis Caching'],
    resumeValue: 'High',
    overview: 'A scalable multi-tenant e-commerce system with inventory management, cart synchronization, Stripe checkout, and administrative dashboard.',
    keyFeatures: [
      'ACID transactional inventory reservation preventing overselling',
      'Optimistic UI cart management with Redis session store',
      'Stripe webhook listener for order confirmation & receipt generation',
      'Admin analytics dashboard with revenue charts'
    ],
    architectureTip: 'Use database transactions with row-level locks when decrementing inventory stock.',
    relevantRoles: ['Full Stack Developer', 'Software Engineer', 'Backend Developer', 'Frontend Developer']
  },
  {
    id: 'realtime-collab',
    name: 'Real-Time Collaboration Platform',
    difficulty: 'Advanced',
    technologyStack: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Redis Pub/Sub', 'Docker'],
    estimatedDuration: '5-6 weeks',
    skillsDeveloped: ['WebSockets & Event Protocols', 'CRDTs or Operational Transformation', 'Redis Pub/Sub', 'State Sync'],
    resumeValue: 'Elite',
    overview: 'A Figma/Google Docs inspired real-time workspace where multiple users can collaborate concurrently with live cursor tracking and conflict-free editing.',
    keyFeatures: [
      'Low-latency WebSocket bi-directional event stream',
      'Live multiplayer presence and color-coded cursors',
      'Conflict-free replicated data structures for concurrent edits',
      'Room-based horizontal scaling via Redis Pub/Sub adapter'
    ],
    architectureTip: 'Decouple WebSocket connection handling from application business logic using message brokers.',
    relevantRoles: ['Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer']
  },
  {
    id: 'cloud-monitoring-dashboard',
    name: 'Cloud Monitoring Dashboard',
    difficulty: 'Intermediate',
    technologyStack: ['Go / Node.js', 'Prometheus', 'Grafana API', 'React', 'Docker', 'AWS SDK'],
    estimatedDuration: '3-4 weeks',
    skillsDeveloped: ['Time-Series Metrics', 'Container Telemetry', 'Cloud APIs', 'Real-Time Alerting'],
    resumeValue: 'High',
    overview: 'A centralized observability console that ingests health metrics, CPU/memory usage, and response latency across microservices with proactive threshold alerts.',
    keyFeatures: [
      'Automated health check polling & time-series charting',
      'Configurable alert thresholds dispatching Webhook/Discord notifications',
      'Docker container stats scraper via cgroup metrics',
      'Cloud resource cost estimation widget'
    ],
    architectureTip: 'Buffer incoming telemetry data in memory and write in batches to minimize disk I/O.',
    relevantRoles: ['Cloud Engineer', 'DevOps Engineer', 'Backend Developer', 'Software Engineer']
  },
  {
    id: 'career-recommendation-system',
    name: 'Career Recommendation System',
    difficulty: 'Intermediate',
    technologyStack: ['Python', 'FastAPI', 'Scikit-Learn', 'PostgreSQL', 'React', 'Tailwind'],
    estimatedDuration: '4 weeks',
    skillsDeveloped: ['Collaborative Filtering', 'Content-Based Recommendation', 'Vector Math', 'Full Stack Integration'],
    resumeValue: 'High',
    overview: 'An algorithmic recommendation engine mapping developer skills, educational backgrounds, and target salaries to optimal job roles and learning tracks.',
    keyFeatures: [
      'TF-IDF & cosine similarity for skill-role matching',
      'Skill gap calculation with priority scoring',
      'Dynamic roadmap generator with duration estimates',
      'Interactive skill gap matrix visualization'
    ],
    architectureTip: 'Precompute role vectors to maintain sub-50ms response times on recommendation queries.',
    relevantRoles: ['Software Engineer', 'Data Engineer', 'AI Engineer', 'Backend Developer']
  },
  {
    id: 'data-pipeline-system',
    name: 'Data Pipeline System',
    difficulty: 'Advanced',
    technologyStack: ['Python', 'Apache Kafka / RabbitMQ', 'PostgreSQL', 'Docker', 'Apache Airflow'],
    estimatedDuration: '5-6 weeks',
    skillsDeveloped: ['Stream Ingestion', 'Batch ETL', 'Schema Validation', 'Distributed Systems'],
    resumeValue: 'Critical',
    overview: 'An end-to-end distributed data streaming platform processing clickstream events, transforming unstructured payloads, and loading into an analytics warehouse.',
    keyFeatures: [
      'High-throughput message queue ingestion with dead-letter queue (DLQ)',
      'Schema registry validation using JSON schema/Protobuf',
      'Automated idempotent ETL batch jobs with backfill support',
      'Grafana metrics dashboard monitoring consumer lag'
    ],
    architectureTip: 'Ensure exactly-once or at-least-once processing semantics with idempotent database upserts.',
    relevantRoles: ['Data Engineer', 'Backend Developer', 'Software Engineer', 'Cloud Engineer']
  },
  {
    id: 'cybersecurity-monitoring-dashboard',
    name: 'Cybersecurity Monitoring Dashboard',
    difficulty: 'Advanced',
    technologyStack: ['Python / Node.js', 'React', 'Elasticsearch / Postgres', 'Tailwind CSS', 'Docker'],
    estimatedDuration: '4-5 weeks',
    skillsDeveloped: ['Threat Modeling', 'Log Ingestion & Parsing', 'SIEM Fundamentals', 'Role-Based Security'],
    resumeValue: 'Critical',
    overview: 'A security incident and event management (SIEM) dashboard that inspects server logs, detects brute-force authentication attacks, and flags abnormal traffic.',
    keyFeatures: [
      'Real-time auth log streaming and failed login threshold detection',
      'Geo-IP lookup and anomalous location access warnings',
      'Automated IP blocking rule generator (iptables/firewall)',
      'Exportable compliance audit reports (SOC2 / ISO readiness)'
    ],
    architectureTip: 'Normalize log entries into a unified schema (e.g. Elastic Common Schema) during ingestion.',
    relevantRoles: ['Cybersecurity Engineer', 'DevOps Engineer', 'Backend Developer', 'Cloud Engineer']
  }
];
