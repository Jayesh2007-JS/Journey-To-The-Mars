import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion, useInView } from 'framer-motion';

const MILESTONES = [
  {
    day: 1, pos: 8, title: 'Lunar Gravity Assist',
    desc: 'Slingshot around the Moon adds 1.2 km/s. Last sight of Earth as a full disk.',
    stat: '+1.2 KM/S', color: 'text-cyan-400', border: 'border-cyan-400/40', bg: 'bg-cyan-500/10',
  },
  {
    day: 45, pos: 28, title: 'Solar Storm Evasion',
    desc: 'C-class flare detected. Crew shelters in radiation vault. Shields at maximum.',
    stat: 'C-CLASS', color: 'text-yellow-400', border: 'border-yellow-400/40', bg: 'bg-yellow-500/10',
  },
  {
    day: 90, pos: 50, title: 'Mid-Course Correction',
    desc: '12-second burn corrects trajectory by 0.003°. Ping delay now 8 minutes.',
    stat: '8 MIN LAG', color: 'text-purple-400', border: 'border-purple-400/40', bg: 'bg-purple-500/10',
  },
  {
    day: 180, pos: 72, title: 'Deep Space Comms',
    desc: 'Switching to high-gain optical terminal. 200 Gbps link to Earth established.',
    stat: '200 GBPS', color: 'text-green-400', border: 'border-green-400/40', bg: 'bg-green-500/10',
  },
  {
    day: 210, pos: 92, title: 'Deceleration Burn',
    desc: 'Main engine retro-fire for 22 minutes. Mars capture orbit achieved.',
    stat: '-3.6 KM/S', color: 'text-orange-400', border: 'border-orange-400/40', bg: 'bg-orange-500/10',
  },
];

const SPACE_FACTS = [
  { label: 'Avg Velocity', val: '24,130 m/s' },
  { label: 'Radiation Dose', val: '1.8 mSv/day' },
  { label: 'Temp Outside', val: '-270 °C' },
  { label: 'Distance Covered', val: '225M km' },
];

export function SpaceTravelSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const [active, setActive] = useState(0);
  const [shipPos, setShipPos] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Animate ship to active milestone
  useEffect(() => {
    const target = MILESTONES[active].pos;
    let current = shipPos;
    const step = () => {
      current += (target - current) * 0.08;
      setShipPos(current);
      if (Math.abs(target - current) > 0.1) rafRef.current = requestAnimationFrame(step);
      else setShipPos(target);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  const m = MILESTONES[active];

  return (
    <section id="travel" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden">

      {/* No canvas — use global StarField */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020810]/50 to-transparent pointer-events-none z-0" />
      <div ref={ref} className="max-w-7xl mx-auto w-full z-10 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`mb-16 reveal-base ${isRevealed ? 'is-revealed' : ''}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-[10px] font-mono text-accent tracking-[0.4em] uppercase">Phase 02 / Transit</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-3">
            The <span className="text-gradient-space">Void</span>
          </h2>
          <p className="text-muted-foreground max-w-lg">7 months. 225 million kilometers. Five critical events between Earth and Mars.</p>
        </motion.div>

        {/* Stats row */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 reveal-base delay-100 ${isRevealed ? 'is-revealed' : ''}`}>
          {SPACE_FACTS.map((f, i) => (
            <div key={i} className="glass-panel rounded-xl p-4 border border-white/8">
              <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-1">{f.label}</div>
              <div className="text-lg font-display font-bold text-white">{f.val}</div>
            </div>
          ))}
        </div>

        {/* Timeline track */}
        <div className={`reveal-base delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="relative mb-8">
            {/* Track */}
            <div className="relative h-2 bg-white/5 rounded-full mx-4 overflow-visible">
              {/* Progress fill */}
              <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-700"
                style={{ width: `${shipPos}%`, background: 'linear-gradient(90deg,#3b82f6,#00D2FF)', boxShadow: '0 0 12px rgba(0,210,255,0.6)' }} />

              {/* Milestone dots */}
              {MILESTONES.map((ms, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group outline-none z-10"
                  style={{ left: `${ms.pos}%` }}
                >
                  {active === i && <div className={`absolute inset-0 w-5 h-5 rounded-full border ${ms.border} animate-ping opacity-50 scale-150`} />}
                  <div className={`relative w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${active === i ? `${ms.border} ${ms.bg} scale-125` : 'border-white/20 bg-background hover:border-white/50 hover:scale-110'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${active === i ? `bg-current ${ms.color}` : 'bg-white/30'}`} />
                  </div>
                  <div className={`absolute top-7 left-1/2 -translate-x-1/2 text-[9px] font-mono whitespace-nowrap transition-colors ${active === i ? ms.color : 'text-white/30'}`}>
                    D{ms.day}
                  </div>
                </button>
              ))}

              {/* Spacecraft */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-none"
                style={{ left: `${shipPos}%` }}>
                <div className="relative">
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-1 bg-gradient-to-l from-cyan-400/80 to-transparent rounded-full blur-sm" />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="rotate-90 drop-shadow-[0_0_8px_rgba(0,210,255,0.9)]">
                    <path d="M12 2L4 20L12 16L20 20L12 2Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Earth / Mars labels */}
            <div className="flex justify-between mt-8 px-2 text-[9px] font-mono text-white/30 tracking-widest">
              <span>🌍 EARTH</span>
              <span>MARS 🔴</span>
            </div>
          </div>

          {/* Active milestone card */}
          <div key={active} className="glass-panel rounded-2xl p-6 border border-white/10 animate-in fade-in duration-300 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl border ${m.border} ${m.bg} flex items-center justify-center shrink-0`}>
                <span className={`text-lg font-display font-black ${m.color}`}>{active + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[9px] font-mono text-muted-foreground tracking-widest">DAY {m.day} OF 210</div>
                  <div className={`text-sm font-display font-bold ${m.color}`}>{m.stat}</div>
                </div>
                <h3 className="text-xl font-display font-black text-white mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </div>
            {/* Nav dots */}
            <div className="flex justify-center gap-2 mt-5">
              {MILESTONES.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === active ? 'bg-white scale-125' : 'bg-white/20 hover:bg-white/50'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
