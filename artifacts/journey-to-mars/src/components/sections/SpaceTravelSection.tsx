import { useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Info } from 'lucide-react';

const milestones = [
  { day: 1, title: "Lunar Gravity Assist", desc: "Slingshot maneuver around Earth's moon to gain crucial velocity.", pos: "15%" },
  { day: 90, title: "Solar Storm Evasion", desc: "Shields polarized to maximum to protect crew from C-class solar flare.", pos: "40%" },
  { day: 180, title: "Deep Space Comms", desc: "Switching to high-gain antenna network. Ping delay now 12 minutes.", pos: "65%" },
  { day: 210, title: "Deceleration Burn", desc: "Main engine retro-fire to align with Martian orbital insertion window.", pos: "90%" },
];

export function SpaceTravelSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.3 });
  const [activeMilestone, setActiveMilestone] = useState<number | null>(0);

  return (
    <section id="travel" className="relative min-h-screen flex flex-col justify-center py-20 px-6">
      
      {/* Background Ship image - fixed parallax effect inside container */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <img 
          src={`${import.meta.env.BASE_URL}images/spacecraft.png`}
          alt="Spacecraft"
          className="w-full max-w-5xl object-contain animate-float mix-blend-screen opacity-50"
          style={{ transform: 'rotate(-5deg)' }}
        />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto w-full z-10">
        <div className={`text-center mb-24 reveal-base ${isRevealed ? 'is-revealed' : ''}`}>
          <h2 className="text-sm font-mono text-accent tracking-[0.3em] uppercase mb-4">Phase 02: Transit</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-white">The Void Between</h3>
        </div>

        {/* Timeline Visualization */}
        <div className={`relative h-64 md:h-80 reveal-scale delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
          {/* Main Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-border -translate-y-1/2">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent w-[75%] shadow-[0_0_15px_rgba(0,210,255,0.6)]" />
          </div>

          {/* Nodes */}
          {milestones.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMilestone(idx)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group outline-none"
              style={{ left: m.pos }}
            >
              <div className={`w-6 h-6 rounded-full border-4 transition-all duration-300 flex items-center justify-center ${
                activeMilestone === idx 
                  ? 'bg-background border-accent scale-150 shadow-[0_0_20px_rgba(0,210,255,0.8)]' 
                  : 'bg-border border-background hover:border-muted-foreground scale-100'
              }`}>
                {activeMilestone === idx && <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />}
              </div>
              
              {/* Day Label */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-sm font-mono text-muted-foreground whitespace-nowrap">
                DAY {m.day}
              </div>
            </button>
          ))}

          {/* Details Card */}
          {activeMilestone !== null && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 md:px-0 transition-all duration-300">
              <div className="glass-panel p-6 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 slide-in-from-bottom-10">
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white/5 border-b border-r border-white/10 rotate-45 backdrop-blur-md" />
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-xl">
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
