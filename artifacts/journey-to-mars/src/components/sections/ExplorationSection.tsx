import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Battery, Wind, Beaker, Radio, ArrowUpRight } from 'lucide-react';

const modules = [
  {
    id: 'power',
    title: 'Kilopower Reactor',
    desc: 'Fission surface power system providing 10 kW of continuous electrical power regardless of dust storms.',
    icon: Battery,
    color: 'text-yellow-400',
    border: 'border-yellow-400/50',
    barColor: 'bg-yellow-400'
  },
  {
    id: 'life',
    title: 'ECLSS Habitat',
    desc: 'Closed-loop environmental control and life support. Recycles 98% of water and generates O2 from CO2.',
    icon: Wind,
    color: 'text-green-400',
    border: 'border-green-400/50',
    barColor: 'bg-green-400'
  },
  {
    id: 'science',
    title: 'Astrobiology Lab',
    desc: 'Pressurized module dedicated to analyzing regolith core samples for microbial biosignatures.',
    icon: Beaker,
    color: 'text-accent',
    border: 'border-accent/50',
    barColor: 'bg-accent'
  },
  {
    id: 'comms',
    title: 'Deep Space Array',
    desc: 'High-bandwidth optical communications terminal linking the Mars base directly to Earth.',
    icon: Radio,
    color: 'text-purple-400',
    border: 'border-purple-400/50',
    barColor: 'bg-purple-400'
  }
];

export function ExplorationSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.2 });
  const [showFinalText, setShowFinalText] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => setShowFinalText(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  const finalText = "END OF TRANSMISSION";

  return (
    <section id="exploration" className="relative min-h-screen pt-0 pb-40 px-6 overflow-hidden">
      
      {/* Mars Horizon at the top */}
      <div className="absolute top-0 left-0 w-full h-[200px] z-0">
        <div className="w-full h-full animate-[horizon-shimmer_8s_infinite]" style={{
          background: 'linear-gradient(180deg, #1a0500 0%, #3d0f00 20%, #8B2500 40%, #c44d0a 50%, #e0791a 55%, #d4622a 60%, #2a0800 80%, #0a0200 100%)'
        }} />
      </div>

      {/* Base gradient background */}
      <div className="absolute inset-0 top-[200px] bg-background z-0 pointer-events-none" />

      {/* Animated Rover SVG driving across the terrain line */}
      <div className="absolute top-[180px] -left-[200px] w-24 h-16 z-10 animate-[rover-drive_40s_linear_infinite]">
        <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Solar Panel */}
          <rect x="20" y="5" width="60" height="5" fill="#3b82f6" />
          <line x1="50" y1="10" x2="50" y2="25" stroke="#94a3b8" strokeWidth="2" />
          {/* Main Body */}
          <rect x="15" y="25" width="70" height="20" rx="4" fill="#e2e8f0" />
          {/* Camera Mast */}
          <line x1="80" y1="25" x2="80" y2="10" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="80" cy="8" r="4" fill="#1e293b" />
          {/* Wheels */}
          <circle cx="25" cy="50" r="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <circle cx="50" cy="50" r="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <circle cx="75" cy="50" r="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full z-20 relative pt-64">
        <div ref={ref} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 bg-background/40 p-8 rounded-2xl backdrop-blur-sm border border-white/5">
          <div className={`reveal-left ${isRevealed ? 'is-revealed' : ''}`}>
            <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">Phase 04: Survive</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Base Operations</h3>
            <p className="text-white/80 max-w-xl text-lg font-light">
              Interact with the deployed habitat modules to explore the infrastructure keeping humanity alive on a hostile world.
            </p>
          </div>
          <div className={`reveal-right delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-sm font-mono text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-30">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div 
                key={mod.id}
                className={`group relative glass-panel bg-background/60 p-8 rounded-3xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 reveal-base border border-white/10 ${isRevealed ? 'is-revealed' : ''}`}
                style={{ transitionDelay: `${200 + idx * 100}ms` }}
              >
                {/* Holographic Scan Line Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent h-[50px] w-full -translate-y-[100%] hidden group-hover:block group-hover:animate-scan-sweep pointer-events-none" />

                {/* Background glow on hover */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 transition-opacity duration-500 ${mod.color}`} />
                
                <div className="flex justify-between items-start mb-12">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border bg-background/80 backdrop-blur-md ${mod.border} z-10`}>
                    <Icon className={`w-7 h-7 ${mod.color}`} />
                  </div>
                </div>

                <h4 className="text-2xl font-display font-semibold text-white mb-3 group-hover:text-primary transition-colors relative z-10">
                  {mod.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed relative z-10 mb-8">
                  {mod.desc}
                </p>

                {/* Data Bars at bottom */}
                <div className="absolute bottom-4 right-8 flex items-end gap-1 h-6 z-10 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className={`w-1.5 rounded-t-sm ${mod.barColor} animate-[data-bar_1s_ease-in-out_infinite]`} />
                  <div className={`w-1.5 rounded-t-sm ${mod.barColor} animate-[data-bar_0.8s_ease-in-out_infinite_0.2s]`} />
                  <div className={`w-1.5 rounded-t-sm ${mod.barColor} animate-[data-bar_1.2s_ease-in-out_infinite_0.4s]`} />
                </div>

                {/* Decorative UI line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 transition-colors">
                  <div className={`h-full w-0 group-hover:w-full transition-all duration-700 ease-out bg-current ${mod.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Text Reveal */}
        <div className="mt-32 text-center h-24 flex items-center justify-center">
          {showFinalText && (
            <div className="inline-block p-6 rounded-lg border border-accent/30 bg-background/50 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(0,210,255,0.2)] animate-in fade-in zoom-in duration-2000">
              <h1 className="text-xl md:text-2xl font-display font-bold text-white tracking-[0.4em] uppercase">
                {finalText.split('').map((char, index) => (
                  <span 
                    key={index}
                    className="inline-block animate-[count-up_0.1s_forwards]"
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
