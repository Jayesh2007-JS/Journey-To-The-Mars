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

  const constellations = [
    { x: 10, y: 20 }, { x: 15, y: 30 }, { x: 25, y: 15 },
    { x: 70, y: 80 }, { x: 80, y: 70 }, { x: 85, y: 85 },
    { x: 80, y: 20 }, { x: 90, y: 25 }, { x: 85, y: 35 }
  ];

  return (
    <section id="travel" ref={sectionRef} className={`relative min-h-screen flex flex-col justify-center py-20 px-6 transition-all duration-1000 ${warpSpeed ? 'animate-warp' : ''}`}>
      
      {/* Background Star Map Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Constellation Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-30 animate-pulse">
          <line x1="10%" y1="20%" x2="15%" y2="30%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="15%" y1="30%" x2="25%" y2="15%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="70%" y1="80%" x2="80%" y2="70%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="80%" y1="70%" x2="85%" y2="85%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="80%" y1="20%" x2="90%" y2="25%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="90%" y1="25%" x2="85%" y2="35%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </svg>
        {constellations.map((c, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff]" style={{ top: `${c.y}%`, left: `${c.x}%` }} />
        ))}
      </div>

      {/* Warp Speed Streak Effect */}
      {warpSpeed && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="w-full h-full" style={{
            background: 'radial-gradient(circle, transparent 20%, #000 100%)',
            boxShadow: 'inset 0 0 100px rgba(255,255,255,0.5)'
          }} />
          <div className="absolute w-[200vw] h-[2px] bg-white opacity-50 rotate-45 transform scale-x-[20] transition-transform duration-1000" />
          <div className="absolute w-[200vw] h-[2px] bg-white opacity-50 -rotate-45 transform scale-x-[20] transition-transform duration-1000 delay-100" />
        </div>
      )}

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

          {/* Spacecraft Dot (SVG) */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 z-20 transition-all duration-1000 ease-in-out flex items-center justify-center drop-shadow-[0_0_15px_rgba(0,210,255,0.8)]"
            style={{ left: `calc(${currentPos}% + 40px)` }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white transform rotate-90">
              <path d="M12 2L2 22L12 18L22 22L12 2Z" fill="currentColor" />
            </svg>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-2 bg-blue-500 rounded-full blur-[3px] animate-pulse" />
          </div>

          {/* Nodes */}
          {milestones.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMilestone(idx)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group outline-none z-10"
              style={{ left: `calc(${m.pos}% + 40px)` }}
            >
              <div className="relative">
                {activeMilestone === idx && (
                  <div className="absolute inset-0 w-full h-full rounded-full border border-accent animate-ripple" />
                )}
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  activeMilestone === idx 
                    ? 'bg-background border-accent scale-150 shadow-[0_0_20px_rgba(0,210,255,0.8)]' 
                    : 'bg-background border-white/30 hover:border-white/80 scale-100'
                }`}>
                  {activeMilestone === idx && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
                </div>
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
                
                <div className="text-[10px] font-mono text-accent mb-3 tracking-widest uppercase flex items-center justify-between border-b border-white/10 pb-2">
                  <span>Data Transmission</span>
                  <div className="flex items-end gap-0.5 h-3">
                    <div className="w-1 bg-accent animate-[data-bar_0.8s_ease-in-out_infinite]" />
                    <div className="w-1 bg-accent animate-[data-bar_1.2s_ease-in-out_infinite_0.2s]" />
                    <div className="w-1 bg-accent animate-[data-bar_0.9s_ease-in-out_infinite_0.4s]" />
                    <div className="w-1 bg-accent animate-[data-bar_1.5s_ease-in-out_infinite_0.1s]" />
                  </div>
                </div>

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
