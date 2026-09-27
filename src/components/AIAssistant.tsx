import React, { useState, useRef, useEffect } from 'react';
import { useCareerCompass } from '../context/CareerCompassContext';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Clock,
  HelpCircle,
  Lightbulb,
  Cpu,
  CornerDownLeft,
  ArrowRight
} from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const { chatMessages, sendChatMessage, isChatLoading, userProfile, roadmap, readinessScore } = useCareerCompass();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What should I learn next?',
    'Why should I learn Docker?',
    'What project should I build?',
    'How can I improve my DSA?',
    'Which skills am I missing?',
    'Create my weekly study plan.'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isChatLoading) return;
    const msg = inputText;
    setInputText('');
    await sendChatMessage(msg);
  };

  const handleSuggestedClick = async (q: string) => {
    if (isChatLoading) return;
    await sendChatMessage(q);
  };

  // Basic formatting helper for bold and bullets in assistant replies
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('### ')) {
        return (
          <h4 key={index} className="text-sm font-bold text-cyan-300 mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} className="text-base font-bold text-cyan-400 mt-2 mb-1">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
        const content = line.substring(2);
        return (
          <li key={index} className="ml-4 list-disc text-xs text-slate-300 my-0.5 leading-relaxed">
            {parseBold(content)}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <div key={index} className="ml-2 text-xs text-slate-300 my-1 leading-relaxed">
            {parseBold(line)}
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={index} className="h-1.5" />;
      }
      return (
        <p key={index} className="text-xs text-slate-200 leading-relaxed mb-1">
          {parseBold(line)}
        </p>
      );
    });
  };

  const parseBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-white font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono text-[11px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Career Compass AI Advisor
            </span>
            <span className="text-xs text-slate-400">
              Grounded in your {userProfile.careerGoal} Roadmap
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Career Assistant
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Get personalized engineering advice on technology choices, study routines, and project architectures.
          </p>
        </div>

        {/* Profile Context Pill */}
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-right hidden sm:block">
          <div className="text-slate-400">Context: <strong className="text-white">{userProfile.careerGoal}</strong></div>
          <div className="text-cyan-400 font-semibold mt-0.5">{readinessScore.overallScore}% Readiness • {userProfile.studyHours}/wk</div>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Inquiries (click to ask):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSuggestedClick(q)}
              disabled={isChatLoading}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 text-slate-300 hover:text-white transition active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-1"
            >
              <span>{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl flex flex-col h-[520px] shadow-2xl overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-cyan-500/20">
                    <Bot className="w-4 h-4 text-slate-950" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3.5 text-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-medium'
                      : 'bg-slate-950/80 border border-slate-800/80 text-slate-200 shadow-md'
                  }`}
                >
                  {isUser ? (
                    <p className="leading-relaxed font-semibold">{msg.text}</p>
                  ) : (
                    <div>{renderFormattedText(msg.text)}</div>
                  )}

                  <div
                    className={`mt-1.5 text-[9px] flex items-center gap-1 ${
                      isUser ? 'text-slate-900/70 justify-end' : 'text-slate-500'
                    }`}
                  >
                    <Clock className="w-2.5 h-2.5" />
                    <span>{msg.timestamp}</span>
                    {msg.source && (
                      <span className="ml-1 px-1 rounded bg-slate-900 text-cyan-400">
                        {msg.source}
                      </span>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-300">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isChatLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                <Bot className="w-4 h-4 text-slate-950" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Career Compass AI is synthesizing tailored advice...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/90">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (e.g. 'Why should I learn Docker for Full Stack?')..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-24 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              disabled={isChatLoading}
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isChatLoading}
              className="absolute right-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
