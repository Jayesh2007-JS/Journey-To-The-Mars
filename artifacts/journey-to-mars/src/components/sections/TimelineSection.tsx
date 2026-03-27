import { useRef, useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Rocket, Globe, Orbit, Flame, MapPin, Home, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const PHASES = [
  {
    id: 'prep',
    phase: '00',
    title: 'Mission Prep',
    subtitle: 'T-24 Months',
    icon: Home,
    color: 'text-white',
    border: 'border-white/30',
    bg: 'bg-white/10',
    glow: 'shadow-[0_0_20px_rgba(255,255,255,0.1)]',
    status: 'COMPLETE',
    date: 'JAN 2024',
    duration: '24 months',
    events: [
      'Crew selection from 12,000 applicants',
      'ARES Heavy Lift Vehicle final assembly',
      'Mars Base Alpha pre-deployment cargo missions',
      'Crew training: 18 months at JSC + analog sites',
      'Kilopower reactor delivered to Mars via cargo Dragon',
    ],
  },
  {
    id: 'launch',
    phase: '01',
    title: 'Launch & Ascent',
    subtitle: 'T+0 to T+9 min',
    icon: Rocket,
    color: 'text-orange-400',
    border: 'border-orange-400/40',
    bg: 'bg-orange-500/10',
    glow: 'shadow-[0_0_20px_rgba(251,146,60,0.15)]',
    status: 'COMPLETE',
    date: 'JAN 15, 2026',
    duration: '9 minutes',
    events: [
      'ARES Heavy Lift ignition — 33 Raptor engines',
      'Max-Q at T+60s — peak aerodynamic pressure',
      'Stage separation at 70km altitude',
      'Upper stage engine ignition',
      'MECO — Main Engine Cut-Off at orbital velocity',
    ],
  },
  {
    id: 'orbit',
    phase: '02',
    title: 'Earth Orbit',
    subtitle: 'T+9 min to T+3 days',
    icon: Orbit,
    color: 'text-cyan-400',
    border: 'border-cyan-400/40',
    bg: 'bg-cyan-500/10',
    glow: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]',
    status: 'COMPLETE',
    date: 'JAN 15–18, 2026',
    duration: '3 days',
    events: [
      'Parking orbit at 408 km — systems checkout',
      'Rendezvous with pre-deployed propellant depot',
      'Full propellant load: 1,200 tonnes CH₄/LOX',
      'Final crew health checks and go/no-go poll',
      'Trans-Mars Injection burn — 3.6 km/s delta-V',
    ],
  },
  {
    id: 'transit',
    phase: '03',
    title: 'Deep Space Transit',
    subtitle: 'T+3 days to T+7 months',
    icon: Globe,
    color: 'text-blue-400',
    border: 'border-blue-400/40',
    bg: 'bg-blue-500/10',
    glow: 'shadow-[0_0_20px_rgba(96,165,250,0.15)]',
    status: 'COMPLETE',
    date: 'JAN–AUG 2026',
    duration: '7 months',
    events: [
      'Continuous 0.38G artificial gravity via rotation',
      'Mid-course correction burns x3',
      'Solar storm shelter protocol activated (Day 45)',
      'Crew science program: 847 experiments logged',
      'Mars approach navigation lock acquired',
    ],
  },
  {
    id: 'entry',
    phase: '04',
    title: 'Mars Entry & Landing',
    subtitle: '7 Minutes of Terror',
    icon: Flame,
    color: 'text-red-400',
    border: 'border-red-400/40',
    bg: 'bg-red-500/10',
    glow: 'shadow-[0_0_20px_rgba(248,113,113,0.15)]',
    status: 'COMPLETE',
    date: 'AUG 22, 2026',
    duration: '7 minutes',
    events: [
      'Atmospheric entry at 5.4 km/s — PICA-X peak heating',
      'Hypersonic aerodynamic deceleration to Mach 2',
      'Supersonic retropropulsion ignition',
      'Terrain-relative navigation final approach',
      'Touchdown at Jezero Crater — 0.3 m/s vertical',
    ],
  },
  {
    id: 'base',
    phase: '05',
    title: 'Base Alpha Operations',
    subtitle: 'Sol 1 — Ongoing',
    icon: MapPin,
    color: 'text-green-400',
    border: 'border-green-400/40',
    bg: 'bg-green-500/10',
    glow: 'shadow-[0_0_20px_rgba(74,222,128,0.15)]',
    status: 'ACTIVE',
    date: 'AUG 2026 — PRESENT',
    duration: 'Ongoing',
    events: [
      'Habitat pressurization and systems activation',
      'First EVA: surface sample collection',
      'Kilopower reactor brought online — 10 kW stable',
      'MOXIE O₂ production: 2 kg/hr operational',
      'Biosignature analysis — results pending',
    ],
  },
];

export function TimelineSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.05 });
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (!isRevealed) return;
    let h = 0;
    const id = setInterval(() => {
      h = Math.min(100, h + 1);
      setLineHeight(h);
      if (h >= 100) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [isRevealed]);

  return (
    <section id="timeline" className="relative min-h-screen py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060810]/70 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className={`mb-16 reveal-base ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary/60" />
            <span className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase">Phase 09 / Timeline</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-3">
            Mission <span className="text-gradient-mars">Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            From Earth to Mars — every critical milestone of the ARES-I mission, from prep to permanent settlement.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2">
            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-orange-500 via-cyan-500 to-green-500 transition-none"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          <div className="space-y-8">
            {PHASES.map((phase, i) => {
              const Icon = phase.icon;
              const isLeft = i % 2 === 0;
              const isActive = activePhase === phase.id;

              return (
                <div
                  key={phase.id}
                  className={`relative flex items-start gap-6 md:gap-0`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Left content (desktop) */}
                  <div className={`hidden md:block md:w-1/2 ${isLeft ? 'pr-12 text-right' : 'order-last pl-12'}`}>
                    {isLeft && (
                      <button
                        onClick={() => setActivePhase(isActive ? null : phase.id)}
                        className={`inline-block text-left group`}
                      >
                        <PhaseCard phase={phase} isActive={isActive} align="right" />
                      </button>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-4">
                    <div className={`w-12 h-12 rounded-full border-2 ${phase.border} ${phase.bg} flex items-center justify-center ${isActive ? phase.glow : ''} transition-all duration-300`}>
                      <Icon className={`w-5 h-5 ${phase.color}`} />
                    </div>
                    {phase.status === 'ACTIVE' && (
                      <div className={`absolute inset-0 rounded-full border-2 ${phase.border} animate-ping opacity-40`} />
                    )}
                  </div>

                  {/* Right content (desktop) / all content (mobile) */}
                  <div className={`flex-1 md:w-1/2 ${!isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <button
                      onClick={() => setActivePhase(isActive ? null : phase.id)}
                      className={`w-full text-left md:${isLeft ? 'hidden' : 'block'}`}
                    >
                      <PhaseCard phase={phase} isActive={isActive} align={isLeft ? 'left' : 'right'} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ phase, isActive, align }: { phase: typeof PHASES[0]; isActive: boolean; align: 'left' | 'right' }) {
  const Icon = phase.icon;
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass-panel rounded-2xl p-5 border transition-colors duration-300 ${isActive ? `${phase.border} ${phase.glow}` : 'border-white/10 hover:border-white/20'}`}
    >
      <div className={`flex items-center gap-2 mb-2 ${align === 'right' ? 'justify-end' : ''}`}>
        <span className="text-[9px] font-mono text-muted-foreground tracking-widest">{phase.date}</span>
        <span className="text-white/20">·</span>
        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${phase.status === 'ACTIVE' ? `${phase.border} ${phase.bg} ${phase.color}` : 'border-white/20 bg-white/5 text-white/50'}`}>
          {phase.status === 'ACTIVE' ? (
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block" />{phase.status}</span>
          ) : (
            <span className="flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" />{phase.status}</span>
          )}
        </span>
      </div>
      <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-1">PHASE {phase.phase} — {phase.subtitle}</div>
      <h3 className={`text-lg font-display font-black text-white mb-1`}>{phase.title}</h3>
      <div className="flex items-center gap-1.5 mb-3">
        <Clock className="w-3 h-3 text-muted-foreground/60" />
        <span className="text-[9px] font-mono text-muted-foreground">{phase.duration}</span>
      </div>
      {isActive && (
        <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5 animate-in fade-in duration-200">
          {phase.events.map((ev, i) => (
            <div key={i} className="flex items-start gap-2 text-[10px] font-mono text-muted-foreground">
              <span className={`${phase.color} shrink-0 mt-0.5`}>›</span>
              <span>{ev}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
