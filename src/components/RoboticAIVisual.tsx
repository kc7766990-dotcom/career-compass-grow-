import React from 'react';
import {
  Bot,
  Cpu,
  Brain,
  Sparkles,
  Zap,
  Layers,
  Atom,
  Binary,
  Radio,
  Code2,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface RoboticAIVisualProps {
  isRotating?: boolean;
  speed?: 'normal' | 'slow' | 'ultra-slow';
  className?: string;
}

export const RoboticAIVisual: React.FC<RoboticAIVisualProps> = ({
  isRotating = true,
  speed = 'slow',
  className = ''
}) => {
  // Speed duration mapping
  const spinDuration =
    speed === 'ultra-slow' ? '50s' : speed === 'slow' ? '28s' : '16s';
  const reverseSpinDuration =
    speed === 'ultra-slow' ? '40s' : speed === 'slow' ? '22s' : '12s';
  const gyroDurationH =
    speed === 'ultra-slow' ? '42s' : speed === 'slow' ? '24s' : '14s';
  const gyroDurationV =
    speed === 'ultra-slow' ? '32s' : speed === 'slow' ? '18s' : '10s';

  return (
    <div
      className={`relative flex items-center justify-center select-none perspective-1000 ${className}`}
      style={{ width: '320px', height: '320px' }}
    >
      {/* Dynamic Ambient Glow Field */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-600/25 to-purple-600/20 blur-2xl pointer-events-none animate-pulse-ring" />

      {/* 3D Preserved Plane Container */}
      <div className="relative w-full h-full flex items-center justify-center preserve-3d animate-robot-float">

        {/* 1. HORIZONTAL 3D GYROSCOPE RING (Tilt X 65deg) */}
        <div
          className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 pointer-events-none"
          style={{
            transform: 'rotateX(65deg)',
            animation: isRotating
              ? `gyro-horizontal ${gyroDurationH} linear infinite`
              : 'none'
          }}
        >
          {/* Orbital Satellite Node 1: CPU */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 p-1.5 rounded-lg bg-slate-900/90 border border-cyan-400/60 shadow-lg shadow-cyan-500/40 flex items-center justify-center text-cyan-300">
            <Cpu className="w-3.5 h-3.5" />
          </div>

          {/* Orbital Satellite Node 2: SPARKLES */}
          <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 p-1.5 rounded-lg bg-slate-900/90 border border-purple-400/60 shadow-lg shadow-purple-500/40 flex items-center justify-center text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 2. VERTICAL 3D GYROSCOPE RING (Tilt Y 65deg) */}
        <div
          className="absolute inset-3 rounded-full border border-indigo-400/40 pointer-events-none"
          style={{
            transform: 'rotateY(65deg)',
            animation: isRotating
              ? `gyro-vertical ${gyroDurationV} linear infinite`
              : 'none'
          }}
        >
          {/* Orbital Satellite Node 3: CODE2 */}
          <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 p-1.5 rounded-lg bg-slate-900/90 border border-teal-400/60 shadow-lg shadow-teal-500/40 flex items-center justify-center text-teal-300">
            <Code2 className="w-3.5 h-3.5" />
          </div>

          {/* Orbital Satellite Node 4: LAYERS */}
          <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 p-1.5 rounded-lg bg-slate-900/90 border border-indigo-400/60 shadow-lg shadow-indigo-500/40 flex items-center justify-center text-indigo-300">
            <Layers className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 3. CONCENTRIC REVERSE ORBITAL DATA TRACK */}
        <div
          className="absolute inset-7 rounded-full border border-cyan-500/30 border-t-cyan-300 border-r-indigo-400 pointer-events-none"
          style={{
            animation: isRotating
              ? `spin ${reverseSpinDuration} linear infinite reverse`
              : 'none'
          }}
        >
          <span className="absolute top-1 left-1/4 w-2 h-2 rounded-full bg-cyan-300 shadow-md shadow-cyan-300 animate-ping" />
          <span className="absolute bottom-2 right-1/4 w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </div>

        {/* 4. MAIN ROBOTIC AI CORE CHASSIS (Hexagonal / Circular Android Helm) */}
        <div
          className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-3xl p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-2xl shadow-cyan-500/30 flex items-center justify-center"
          style={{
            animation: isRotating ? `spin ${spinDuration} linear infinite` : 'none',
            transformOrigin: 'center center'
          }}
        >
          {/* Inner Robotic Hull with Metallic Sheen */}
          <div className="w-full h-full rounded-[22px] bg-slate-950/95 border border-cyan-500/40 p-4 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl">

            {/* Glowing Cybernetic Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334415_1px,transparent_1px),linear-gradient(to_bottom,#08334415_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

            {/* Scanning Laser Beam Effect */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none animate-cyber-scan shadow-[0_0_8px_#22d3ee]" />

            {/* Top Micro Antenna Sensor */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                AI.COR.v26
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Central Robotic Face / Cyber Visor */}
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/50 flex items-center justify-center shadow-inner shadow-cyan-500/20 group">
              {/* Dual Glowing Ocular Lenses */}
              <div className="absolute top-3 left-4 w-4 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <div className="absolute top-3 right-4 w-4 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>

              {/* Central Holographic Brain & Bot Icon */}
              <div className="relative flex items-center justify-center mt-3">
                <Brain className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.75)] animate-pulse" />
                <Bot className="w-7 h-7 text-indigo-300 absolute inset-0 m-auto opacity-70" />
              </div>

              {/* Visor Audio Wave / Telemetry Matrix */}
              <div className="absolute bottom-2 flex items-center gap-1">
                <span className="w-1 h-2 rounded-full bg-cyan-400/80 animate-pulse" />
                <span className="w-1 h-3.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="w-1 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="w-1 h-3 rounded-full bg-purple-400 animate-pulse" />
                <span className="w-1 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Lower Cyber Neck / Bus Interface */}
            <div className="mt-2.5 flex items-center gap-2 text-slate-400">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-[8px] font-mono text-slate-300 tracking-wider">NEURAL ROADMAP</span>
              <Compass className="w-3 h-3 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* 5. FLOATING TELEMETRY CHIPS AROUND THE ROBOTIC HEAD */}
        <div className="absolute -top-1 -right-2 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 shadow-xl backdrop-blur-md flex items-center gap-1.5 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>ROADMAP SYNC: 99.4%</span>
        </div>

        <div className="absolute -bottom-2 -left-2 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-indigo-500/40 text-[9px] font-mono text-indigo-300 shadow-xl backdrop-blur-md flex items-center gap-1.5 pointer-events-none">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>CAREER COMPASS AI</span>
        </div>
      </div>
    </div>
  );
};
