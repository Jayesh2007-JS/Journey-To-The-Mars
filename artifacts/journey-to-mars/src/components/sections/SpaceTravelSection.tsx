import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Info, Globe, CircleDot } from 'lucide-react';

const milestones = [
  { day: 1, title: "Lunar Gravity Assist", desc: "Slingshot maneuver around Earth's moon to gain crucial velocity.", pos: 15 },
  { day: 90, title: "Solar Storm Evasion", desc: "Shields polarized to maximum to protect crew from C-class solar flare.", pos: 40 },
  { day: 180, title: "Deep Space Comms", desc: "Switching to high-gain antenna network. Ping delay now 12 minutes.", pos: 65 },
  { day: 210, title: "Deceleration Burn", desc: "Main engine retro-fire to align with Martian orbital insertion window.", pos: 90 },
];

export function SpaceTravelSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.3 });
  const [activeMilestone, setActiveMilestone] = useState<number | null>(0);
  const [warpSpeed, setWarpSpeed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger warp speed effect when section comes into view
  useEffect(() => {
    if (isRevealed) {
      setWarpSpeed(true);
      const timer = setTimeout(() => setWarpSpeed(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  const currentPos = activeMilestone !== null ? milestones[activeMilestone].pos : 0;
  const commsDelay = activeMilestone !== null ? (activeMilestone < 2 ? 4 : 12) : 4;

  return (
    <section id="travel" ref={sectionRef} className={`relative min-h-screen flex flex-col justify-center py-20 px-6 transition-all duration-1000 ${warpSpeed ? 'animate-warp' : ''}`}>
      
      {/* Background Star Map Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div ref={ref} className="max-w-6xl mx-auto w-full z-10">
        <div className={`text-center mb-24 reveal-base ${isRevealed ? 'is-revealed' : ''}`}>
          <h2 className="text-sm font-mono text-accent tracking-[0.3em] uppercase mb-4">Phase 02: Transit</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">The Void Between</h3>
          <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-sm font-semibold tracking-wider">
            COMMS DELAY: {commsDelay} MINUTES
          </div>
        </div>

        {/* Milestone Timeline Path */}
        <div className={`relative h-64 md:h-80 reveal-scale delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
          
          <div className="absolute top-1/2 left-0 w-full flex items-center justify-between px-2 -translate-y-1/2 z-0">
             <Globe className="w-8 h-8 text-blue-400 opacity-50" />
             <CircleDot className="w-8 h-8 text-orange-500 opacity-50" />
          </div>

          {/* Main Line */}
          <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-white/10 -translate-y-1/2 rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-accent shadow-[0_0_15px_rgba(0,210,255,0.6)] transition-all duration-1000 ease-in-out" 
              style={{ width: `${currentPos}%` }}
            />
          </div>

          {/* Spacecraft Dot */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 z-20 transition-all duration-1000 ease-in-out"
            style={{ left: `calc(${currentPos}% + 40px)` }}
          >
            <div className="w-full h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] relative">
               <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-2 bg-blue-500 rounded-full blur-[2px] animate-pulse" />
            </div>
          </div>

          {/* Nodes */}
          {milestones.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMilestone(idx)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group outline-none z-10"
              style={{ left: `calc(${m.pos}% + 40px)` }}
            >
              <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                activeMilestone === idx 
                  ? 'bg-background border-accent scale-150 shadow-[0_0_20px_rgba(0,210,255,0.8)]' 
                  : 'bg-background border-white/30 hover:border-white/80 scale-100'
              }`}>
                {activeMilestone === idx && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
              </div>
              
              {/* Day Label */}
              <div className={`absolute top-8 left-1/2 -translate-x-1/2 text-sm font-mono whitespace-nowrap transition-colors ${activeMilestone === idx ? 'text-accent font-bold' : 'text-muted-foreground'}`}>
                DAY {m.day}
              </div>
            </button>
          ))}

          {/* Details Card */}
          {activeMilestone !== null && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 md:px-0 transition-all duration-300">
              <div className="glass-panel p-6 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 slide-in-from-bottom-10 group glitch-hover border-accent/20">
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-background border-b border-r border-accent/20 rotate-45 backdrop-blur-md" />
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                    <Info className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-semibold text-white mb-2">{milestones[activeMilestone].title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {milestones[activeMilestone].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
