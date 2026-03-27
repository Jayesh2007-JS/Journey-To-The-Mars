import { useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Heart, Brain, Wrench, FlaskConical, Plane, Mountain, Shield, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const CREW = [
  {
    id: 'chen',
    name: 'CDR. LI CHEN',
    role: 'Mission Commander',
    age: 42,
    nationality: '🇨🇳 China',
    icon: Shield,
    color: 'text-orange-400',
    border: 'border-orange-400/40',
    glow: 'shadow-[0_0_30px_rgba(251,146,60,0.2)]',
    bg: 'bg-orange-500/10',
    missions: 3,
    evaHours: 47,
    specialty: 'Orbital Mechanics',
    bio: 'Veteran of three ISS expeditions. Holds the record for longest single EVA at 9h 22m. Expert in orbital rendezvous and emergency procedures.',
    vitals: { hr: 62, o2: 99, temp: 36.7 },
    skills: [
      { label: 'Leadership', val: 98 },
      { label: 'Piloting', val: 95 },
      { label: 'EVA Ops', val: 92 },
    ],
    status: 'EVA',
  },
  {
    id: 'okafor',
    name: 'DR. AMARA OKAFOR',
    role: 'Chief Science Officer',
    age: 38,
    nationality: '🇳🇬 Nigeria',
    icon: FlaskConical,
    color: 'text-cyan-400',
    border: 'border-cyan-400/40',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.2)]',
    bg: 'bg-cyan-500/10',
    missions: 2,
    evaHours: 28,
    specialty: 'Astrobiology',
    bio: 'PhD in Astrobiology from MIT. Discovered the first confirmed organic molecules in Martian regolith samples during the Perseverance extended mission.',
    vitals: { hr: 68, o2: 98, temp: 36.9 },
    skills: [
      { label: 'Astrobiology', val: 99 },
      { label: 'Chemistry', val: 96 },
      { label: 'Geology', val: 88 },
    ],
    status: 'LAB',
  },
  {
    id: 'petrov',
    name: 'ENG. DMITRI PETROV',
    role: 'Systems Engineer',
    age: 45,
    nationality: '🇷🇺 Russia',
    icon: Wrench,
    color: 'text-yellow-400',
    border: 'border-yellow-400/40',
    glow: 'shadow-[0_0_30px_rgba(250,204,21,0.2)]',
    bg: 'bg-yellow-500/10',
    missions: 4,
    evaHours: 63,
    specialty: 'Life Support Systems',
    bio: 'Former Roscosmos engineer with 4 ISS missions. Designed the ECLSS water reclamation system used on Base Alpha. Holds 12 patents in closed-loop life support.',
    vitals: { hr: 58, o2: 99, temp: 36.5 },
    skills: [
      { label: 'Engineering', val: 99 },
      { label: 'EVA Repair', val: 97 },
      { label: 'Systems', val: 95 },
    ],
    status: 'NOMINAL',
  },
  {
    id: 'santos',
    name: 'DR. ELENA SANTOS',
    role: 'Flight Surgeon',
    age: 36,
    nationality: '🇧🇷 Brazil',
    icon: Heart,
    color: 'text-red-400',
    border: 'border-red-400/40',
    glow: 'shadow-[0_0_30px_rgba(248,113,113,0.2)]',
    bg: 'bg-red-500/10',
    missions: 1,
    evaHours: 14,
    specialty: 'Space Medicine',
    bio: 'Pioneered the Mars Radiation Mitigation Protocol. Her research on long-duration spaceflight physiology is the foundation of the crew health program for ARES-I.',
    vitals: { hr: 71, o2: 98, temp: 37.0 },
    skills: [
      { label: 'Medicine', val: 99 },
      { label: 'Radiation Bio', val: 94 },
      { label: 'Psychology', val: 90 },
    ],
    status: 'NOMINAL',
  },
  {
    id: 'yamada',
    name: 'PLT. KENJI YAMADA',
    role: 'Pilot / Navigator',
    age: 40,
    nationality: '🇯🇵 Japan',
    icon: Plane,
    color: 'text-blue-400',
    border: 'border-blue-400/40',
    glow: 'shadow-[0_0_30px_rgba(96,165,250,0.2)]',
    bg: 'bg-blue-500/10',
    missions: 2,
    evaHours: 31,
    specialty: 'Atmospheric Entry',
    bio: 'Former JAXA test pilot with 4,200 flight hours. Designed the Mars EDL (Entry, Descent, Landing) algorithm used for the ARES-I touchdown. Precision landing specialist.',
    vitals: { hr: 55, o2: 99, temp: 36.6 },
    skills: [
      { label: 'Piloting', val: 99 },
      { label: 'Navigation', val: 97 },
      { label: 'EDL Systems', val: 96 },
    ],
    status: 'NOMINAL',
  },
  {
    id: 'ali',
    name: 'SPC. FATIMA ALI',
    role: 'Geologist / EVA Specialist',
    age: 34,
    nationality: '🇵🇰 Pakistan',
    icon: Mountain,
    color: 'text-green-400',
    border: 'border-green-400/40',
    glow: 'shadow-[0_0_30px_rgba(74,222,128,0.2)]',
    bg: 'bg-green-500/10',
    missions: 1,
    evaHours: 22,
    specialty: 'Planetary Geology',
    bio: 'Youngest crew member. PhD in Planetary Geology from Caltech. Identified the subsurface ice deposits at Jezero Crater that made Base Alpha\'s location viable.',
    vitals: { hr: 65, o2: 99, temp: 36.8 },
    skills: [
      { label: 'Geology', val: 99 },
      { label: 'EVA Ops', val: 91 },
      { label: 'Sample Analysis', val: 97 },
    ],
    status: 'EVA',
  },
];

export function CrewSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
  const [selected, setSelected] = useState<string | null>(null);

  const selectedCrew = CREW.find(c => c.id === selected);

  return (
    <section id="crew" className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Background — semi-transparent so stars show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060d1a]/70 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className={`mb-16 reveal-base ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary/60" />
            <span className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase">Phase 06 / Crew</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-3">
                The <span className="text-gradient-space">Crew</span>
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Six of humanity's finest — selected from 12,000 applicants across 40 nations. Each a world-class expert in their field.
              </p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-3xl font-display font-black text-white">6</div>
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest">CREW</div>
              </div>
              <div>
                <div className="text-3xl font-display font-black text-orange-400">13</div>
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest">MISSIONS</div>
              </div>
              <div>
                <div className="text-3xl font-display font-black text-cyan-400">205</div>
                <div className="text-[10px] font-mono text-muted-foreground tracking-widest">EVA HRS</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Crew cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CREW.map((c, i) => {
              const Icon = c.icon;
              const isActive = selected === c.id;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setSelected(isActive ? null : c.id)}
                  className={`cursor-pointer group relative glass-panel rounded-2xl p-5 border transition-colors duration-300 ${isActive ? `${c.border} ${c.glow}` : 'border-white/10 hover:border-white/20'}`}
                >
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${c.bg}`} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl border ${c.border} ${c.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${c.color}`} />
                      </div>
                      <div className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${c.status === 'EVA' ? 'border-orange-500/40 bg-orange-500/10 text-orange-400' : c.status === 'LAB' ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400' : 'border-green-500/30 bg-green-500/10 text-green-400'}`}>
                        {c.status}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-white/90 font-semibold mb-0.5">{c.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground mb-3">{c.role}</div>
                    <div className="flex items-center gap-3 text-[9px] font-mono text-muted-foreground">
                      <span>{c.nationality}</span>
                      <span className="text-white/20">|</span>
                      <span>{c.missions} missions</span>
                      <span className="text-white/20">|</span>
                      <span>{c.evaHours}h EVA</span>
                    </div>
                    {/* Vitals mini bar */}
                    <div className="mt-3 flex items-center gap-2">
                      <Activity className="w-3 h-3 text-green-400/60" />
                      <div className="flex gap-0.5 items-end h-3">
                        {[0.6,0.8,0.5,0.9,0.7,0.85,0.6,0.75,0.9,0.65].map((h, j) => (
                          <div key={j} className="w-1 bg-green-400/40 rounded-t-sm animate-[data-bar_1.2s_ease-in-out_infinite]"
                            style={{ height: `${h * 100}%`, animationDelay: `${j * 0.12}s` }} />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono text-green-400/60">{c.vitals.hr} BPM</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-1">
            {selectedCrew ? (
              <div className={`glass-panel rounded-2xl p-6 border ${selectedCrew.border} ${selectedCrew.glow} sticky top-24 animate-in fade-in slide-in-from-right-4 duration-300`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl border ${selectedCrew.border} ${selectedCrew.bg} flex items-center justify-center`}>
                    <selectedCrew.icon className={`w-6 h-6 ${selectedCrew.color}`} />
                  </div>
                  <div>
                    <div className="text-sm font-mono text-white font-semibold">{selectedCrew.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">{selectedCrew.role}</div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-5">{selectedCrew.bio}</p>

                {/* Vitals */}
                <div className="mb-5">
                  <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-3">LIVE VITALS</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'HEART RATE', val: `${selectedCrew.vitals.hr}`, unit: 'BPM', icon: Heart },
                      { label: 'O₂ SAT', val: `${selectedCrew.vitals.o2}`, unit: '%', icon: Zap },
                      { label: 'TEMP', val: `${selectedCrew.vitals.temp}`, unit: '°C', icon: Activity },
                    ].map((v, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-2 text-center">
                        <div className={`text-sm font-display font-bold ${selectedCrew.color}`}>{v.val}</div>
                        <div className="text-[8px] font-mono text-muted-foreground">{v.unit}</div>
                        <div className="text-[7px] font-mono text-muted-foreground/60 mt-0.5">{v.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-3">PROFICIENCY</div>
                  <div className="space-y-2">
                    {selectedCrew.skills.map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[9px] font-mono mb-1">
                          <span className="text-white/70">{s.label}</span>
                          <span className={selectedCrew.color}>{s.val}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 bg-current ${selectedCrew.color}`}
                            style={{ width: `${s.val}%`, transitionDelay: `${i * 150}ms` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-muted-foreground">
                  <span>SPECIALTY: {selectedCrew.specialty}</span>
                  <span>AGE {selectedCrew.age}</span>
                </div>
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center min-h-[300px] text-center sticky top-24">
                <Brain className="w-10 h-10 text-white/20 mb-4" />
                <p className="text-sm text-muted-foreground font-mono">Select a crew member<br />to view their profile</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
