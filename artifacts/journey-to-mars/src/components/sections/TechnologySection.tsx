import { useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Flame, Zap, Shield, Wind, Cpu, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const TECH = [
  {
    id: 'engine',
    title: 'Raptor 3 Engine',
    category: 'PROPULSION',
    icon: Flame,
    color: 'text-orange-400',
    border: 'border-orange-400/30',
    bg: 'bg-orange-500/10',
    specs: [
      { label: 'Thrust (vac)', val: '2,300 kN' },
      { label: 'Isp (vac)', val: '380 s' },
      { label: 'Chamber Pressure', val: '350 bar' },
      { label: 'Propellant', val: 'CH₄ / LOX' },
      { label: 'Throttle Range', val: '40–100%' },
      { label: 'Restart Capable', val: 'Yes' },
    ],
    desc: 'Full-flow staged combustion cycle engine. The highest chamber pressure of any rocket engine ever flown. Powers both the booster and upper stage of the ARES Heavy Lift Vehicle.',
    highlight: '380s ISP',
  },
  {
    id: 'heatshield',
    title: 'PICA-X Heat Shield',
    category: 'THERMAL PROTECTION',
    icon: Shield,
    color: 'text-red-400',
    border: 'border-red-400/30',
    bg: 'bg-red-500/10',
    specs: [
      { label: 'Peak Temp', val: '1,650 °C' },
      { label: 'Material', val: 'PICA-X v3' },
      { label: 'Thickness', val: '8.5 cm' },
      { label: 'Coverage', val: '100%' },
      { label: 'Reusable', val: 'Yes (10x)' },
      { label: 'Entry G-Load', val: '8.5 G max' },
    ],
    desc: 'Third-generation Phenolic Impregnated Carbon Ablator. Ablates controllably during entry, carrying heat away from the vehicle. Survives Mars entry at 5.4 km/s.',
    highlight: '1,650°C',
  },
  {
    id: 'eclss',
    title: 'ECLSS Life Support',
    category: 'LIFE SUPPORT',
    icon: Wind,
    color: 'text-green-400',
    border: 'border-green-400/30',
    bg: 'bg-green-500/10',
    specs: [
      { label: 'O₂ Generation', val: 'Electrolysis' },
      { label: 'Water Recovery', val: '98.4%' },
      { label: 'CO₂ Removal', val: 'CDRA + Sabatier' },
      { label: 'Pressure', val: '101.3 kPa' },
      { label: 'O₂ Partial Pressure', val: '21.3 kPa' },
      { label: 'Crew Capacity', val: '6 persons' },
    ],
    desc: 'Closed-loop environmental control system. Converts CO₂ back to O₂ via Sabatier reaction. Recycles urine and humidity into potable water. Zero consumables after initial fill.',
    highlight: '98.4% H₂O',
  },
  {
    id: 'kilopower',
    title: 'Kilopower Reactor',
    category: 'POWER SYSTEMS',
    icon: Zap,
    color: 'text-yellow-400',
    border: 'border-yellow-400/30',
    bg: 'bg-yellow-500/10',
    specs: [
      { label: 'Output', val: '10 kWe' },
      { label: 'Fuel', val: 'U-235 (HEU)' },
      { label: 'Coolant', val: 'Sodium Heat Pipe' },
      { label: 'Converter', val: 'Stirling Engine' },
      { label: 'Lifetime', val: '10+ years' },
      { label: 'Mass', val: '1,500 kg' },
    ],
    desc: 'NASA\'s fission surface power system. Immune to Martian dust storms that cripple solar panels. Provides continuous 10 kW regardless of day/night cycle or atmospheric conditions.',
    highlight: '10 kWe',
  },
  {
    id: 'comms',
    title: 'Optical Comms Terminal',
    category: 'COMMUNICATIONS',
    icon: Cpu,
    color: 'text-purple-400',
    border: 'border-purple-400/30',
    bg: 'bg-purple-500/10',
    specs: [
      { label: 'Bandwidth', val: '200 Gbps' },
      { label: 'Wavelength', val: '1,550 nm' },
      { label: 'Aperture', val: '30 cm' },
      { label: 'Range', val: '2.7 AU max' },
      { label: 'Pointing Accuracy', val: '0.1 µrad' },
      { label: 'Protocol', val: 'CCSDS LCT' },
    ],
    desc: 'Deep Space Optical Communications terminal. 100x higher bandwidth than radio. Enables HD video calls, real-time telemetry streaming, and rapid file transfer between Earth and Mars.',
    highlight: '200 Gbps',
  },
  {
    id: 'isru',
    title: 'MOXIE ISRU System',
    category: 'IN-SITU RESOURCES',
    icon: Layers,
    color: 'text-cyan-400',
    border: 'border-cyan-400/30',
    bg: 'bg-cyan-500/10',
    specs: [
      { label: 'O₂ Production', val: '2 kg/hr' },
      { label: 'Input', val: 'CO₂ (95% Mars atm)' },
      { label: 'Process', val: 'SOXE Electrolysis' },
      { label: 'Temp', val: '800 °C' },
      { label: 'Power Required', val: '300 W' },
      { label: 'Purity', val: '99.6%' },
    ],
    desc: 'Mars Oxygen In-Situ Resource Utilization Experiment — scaled to production. Splits CO₂ from the Martian atmosphere into O₂ and CO. Produces propellant and breathable air from local resources.',
    highlight: '2 kg/hr O₂',
  },
];

export function TechnologySection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const [active, setActive] = useState<string>('engine');

  const activeTech = TECH.find(t => t.id === active)!;

  return (
    <section id="technology" className="relative min-h-screen py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050a12]/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className={`mb-12 reveal-base ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary/60" />
            <span className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase">Phase 08 / Technology</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-3">
            The <span className="text-gradient-mars">Tech</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Six breakthrough technologies that make a Mars mission survivable. Each one a decade of engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Tech selector */}
          <div className={`lg:col-span-2 flex flex-col gap-3 reveal-left delay-100 ${isRevealed ? 'is-revealed' : ''}`}>
            {TECH.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <motion.button
                  key={t.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => setActive(t.id)}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border text-left transition-colors duration-200 ${isActive ? `${t.border} ${t.bg}` : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`}
                >
                  <div className={`w-10 h-10 rounded-xl border ${t.border} ${isActive ? t.bg : 'bg-white/5'} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${t.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-white/90 font-semibold truncate">{t.title}</div>
                    <div className="text-[9px] font-mono text-muted-foreground">{t.category}</div>
                  </div>
                  <div className={`text-xs font-display font-bold ${t.color} shrink-0`}>{t.highlight}</div>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className={`lg:col-span-3 reveal-right delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
            <div key={activeTech.id} className={`glass-panel rounded-3xl p-8 border ${activeTech.border} animate-in fade-in duration-300`}>
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl border ${activeTech.border} ${activeTech.bg} flex items-center justify-center shrink-0`}>
                  <activeTech.icon className={`w-7 h-7 ${activeTech.color}`} />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-1">{activeTech.category}</div>
                  <h3 className="text-2xl font-display font-black text-white">{activeTech.title}</h3>
                  <div className={`text-3xl font-display font-black ${activeTech.color} mt-1`}>{activeTech.highlight}</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{activeTech.desc}</p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {activeTech.specs.map((s, i) => (
                  <div key={i} className={`rounded-xl p-3 border ${activeTech.border} bg-white/5`}>
                    <div className="text-[8px] font-mono text-muted-foreground tracking-widest mb-1">{s.label}</div>
                    <div className={`text-sm font-display font-bold ${activeTech.color}`}>{s.val}</div>
                  </div>
                ))}
              </div>

              {/* Visual bar */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-3">PERFORMANCE ENVELOPE</div>
                <div className="flex gap-1 items-end h-12">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const h = 30 + Math.sin(i * 0.7 + activeTech.id.length) * 25 + Math.cos(i * 0.4) * 15;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm bg-current ${activeTech.color} opacity-60 animate-[data-bar_1.5s_ease-in-out_infinite]`}
                        style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
