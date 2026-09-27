import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI client (server-side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Assistant Endpoint for Career Compass
app.post('/api/assistant/chat', async (req, res) => {
  const { message, userProfile, roadmapSummary } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Fallback heuristic response generator in case API key is absent or rate-limited
  const generateRuleBasedAnswer = (userMsg: string, profile: any, roadmap: any) => {
    const q = userMsg.toLowerCase();
    const role = profile?.careerGoal || 'Software Engineer';
    const skills = profile?.skills || [];
    const weakSkills = profile?.weakSkills || [];
    const nextSkill = roadmap?.phases?.[1]?.skills?.[0]?.name || 'Data Structures & Algorithms';

    if (q.includes('what should i learn next') || q.includes('next skill') || q.includes('learn next')) {
      return `Based on your goal of becoming a **${role}** and your current skill foundation, your immediate priority should be **${nextSkill}**.\n\n### Why Learn It Now?\n- Bridges your current knowledge gap before advancing to complex architecture.\n- Highly prioritized in tech hiring and coding assessments.\n\n### Next Step Action Plan:\n1. Dedicate 60-90 minutes daily.\n2. Implement 3 practical exercises or mini-modules.\n3. Integrate it directly into your recommended roadmap project.`;
    }

    if (q.includes('docker') || q.includes('container')) {
      return `### Why You Should Learn Docker for ${role}:\n\n1. **Environment Parity**: Eliminates the "it works on my machine" problem across team environments.\n2. **Industry Standard**: Modern cloud and microservice deployments in 2026 demand containerization proficiency.\n3. **Portfolio Impact**: Showcasing a Dockerized full-stack project or AI service signals production readiness to recruiters.\n\n**Recommended First Step**: Write a \`Dockerfile\` and a multi-container \`docker-compose.yml\` for your current milestone project.`;
    }

    if (q.includes('project') || q.includes('what project should i build')) {
      return `For your **${role}** trajectory, build a project that proves real-world engineering rigor rather than a generic tutorial clone:\n\n### Recommended Project:\n- **Architecture**: Microservice or modular modular monolith with persistent DB, background queue, and clean REST/gRPC API.\n- **Differentiator**: Add telemetry/logging, Docker deployment, and an AI-enhanced feature (e.g. intelligent caching or automated analysis).\n- **Resume Value**: Highlight latency metrics, test coverage, and deployment pipelines on your GitHub README.`;
    }

    if (q.includes('dsa') || q.includes('algorithm') || q.includes('data structure')) {
      return `### Strategic Plan to Master DSA for ${role}:\n\n1. **Focus on Patterns, Not Quantity**: Master 14 key patterns (Sliding Window, Two Pointers, Fast & Slow Pointers, BFS/DFS, Top K Elements, Dynamic Programming).\n2. **Time Boxing**: Spend maximum 25 minutes trying a problem before reviewing optimal solution analysis.\n3. **Weekly Cadence**: 4-5 problems weekly with active recall in your preferred language (${profile?.primaryLanguage || 'Java/Python'}).`;
    }

    if (q.includes('missing') || q.includes('gap') || q.includes('weak')) {
      return `### Skill Gap Summary for ${role}:\n\nBased on your assessment, key gaps identified:\n- **Core Engineering**: ${weakSkills.slice(0, 3).join(', ') || 'System Design, Cloud Deployments, Production Testing'}\n- **Market Trend Alignment**: AI-Assisted Tooling, CI/CD, Containerization.\n\nAddressing these in Phase 2 & 3 of your Career Compass roadmap will raise your Career Readiness Score past 85%!`;
    }

    if (q.includes('study plan') || q.includes('schedule') || q.includes('weekly')) {
      const hours = profile?.studyHours || '10-15';
      return `### Your Personalized Weekly Study Plan (${hours} hrs/week):\n\n- **Mon & Wed**: Core DSA & Problem Solving (1.5 hrs each)\n- **Tue & Thu**: Role Specialization & Frameworks (2 hrs each)\n- **Fri**: System Architecture & Clean Code Review (1.5 hrs)\n- **Sat**: Milestone Project Building (3 hrs)\n- **Sun**: Weekly Revision & Mock Assessment (1 hr)\n\nTrack your daily completion directly in the **Progress & Weekly Plan** section of Career Compass!`;
    }

    return `Hello! As your Career Compass AI Assistant, I've analyzed your profile targeting **${role}**.\n\nYou have strong potential with your current skills, and by focusing on your identified skill gaps and project milestones, you can achieve job readiness within your target timeline.\n\nFeel free to ask me:\n- *"What should I learn next and why?"*\n- *"Why should I learn Docker or Cloud?"*\n- *"What project should I build for my resume?"*\n- *"How do I improve my DSA efficiently?"*\n- *"Create a customized weekly study plan."*`;
  };

  // If Gemini API Key is available, use Gemini 3.8 Flash
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
    try {
      const systemInstruction = `You are the Career Compass AI Career Advisor.
Career Compass is an advanced AI-powered career guidance platform: "Your Skills. Your Goal. Your Personalized Path."
Your objective is to answer: "What should I learn next, why should I learn it, how long will it take, and what project should I build?"
You are assisting a user with the following profile:
- Career Goal: ${userProfile?.careerGoal || 'Software Engineer'}
- Education: ${userProfile?.education || 'Undergraduate'}
- Experience Level: ${userProfile?.experience || 'Student / Fresher'}
- Current Skills: ${JSON.stringify(userProfile?.skills || [])}
- Target Timeline: ${userProfile?.targetTimeline || '6 months'}
- Available Study Time: ${userProfile?.studyHours || '10-15 hours/week'}
- Target Market: ${userProfile?.targetMarket || 'Global / Remote'}
- Skill Gap Highlights: ${JSON.stringify(userProfile?.skillGaps || [])}

Provide practical, empowering, structured, and modern engineering guidance (referencing 2026 tech trends like AI engineering, cloud, system design, etc.). Keep formatting clean with markdown headings and bullet points. Never hallucinate fake credentials. Always stay aligned with their Career Compass roadmap.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || generateRuleBasedAnswer(message, userProfile, roadmapSummary);
      return res.json({ reply, source: 'gemini' });
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to local reasoning engine:', err.message);
      const fallbackReply = generateRuleBasedAnswer(message, userProfile, roadmapSummary);
      return res.json({ reply: fallbackReply, source: 'fallback' });
    }
  } else {
    // Graceful intelligent fallback when no key is set yet
    const reply = generateRuleBasedAnswer(message, userProfile, roadmapSummary);
    return res.json({ reply, source: 'heuristic' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Career Compass server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
