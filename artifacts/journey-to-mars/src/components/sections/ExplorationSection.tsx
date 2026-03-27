import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Battery, Wind, Beaker, Radio, Thermometer, Cpu, Users, Signal } from 'lucide-react';

const modules = [
  {
    id: 'power', title: 'Kilopower Reactor', desc: 'Fission surface power providing 10 kW continuous — immune to dust storms.',
    icon: Battery, color: 'text-yellow-400', border: 'border-yellow-400/40', barColor: 'bg-yellow-400',
    stat: '10.2 kW', statLabel: 'OUTPUT', x: 30, y: 40,
  },
  {
    id: 'life', title: 'ECLSS Habitat', desc: 'Closed-loop life support. Recycles 98% of water, generates O₂ from CO₂.',
    icon: Wind, color: 'text-green-400', border: 'border-green-400/40', barColor: 'bg-green-400',
    stat: '21.3%', statLabel: 'O₂ LEVEL', x: 62, y: 28,
  },
  {
    id: 'science', title: 'Astrobiology Lab', desc: 'Pressurized module analyzing regolith core samples for microbial biosignatures.',
    icon: Beaker, color: 'text-cyan-400', border: 'border-cyan-400/40', barColor: 'bg-cyan-400',
    stat: '47 SAMPLES', statLabel: 'ANALYZED', x: 72, y: 62,
  },
  {
    id: 'comms', title: 'Deep Space Array', desc: 'High-bandwidth optical comms terminal linking Mars base directly to Earth.',
    icon: Radio, color: 'text-purple-400', border: 'border-purple-400/40', barColor: 'bg-purple-400',
    stat: '24 MIN', statLabel: 'PING DELAY', x: 20, y: 68,
  },
];

const crew = [
  { name: 'CDR. CHEN', role: 'Commander', status: 'EVA', color: 'text-orange-400' },
  { name: 'DR. OKAFOR', role: 'Science', status: 'LAB', color: 'text-cyan-400' },
  { name: 'ENG. PETROV', role: 'Engineer', status: 'NOMINAL', color: 'text-green-400' },
  { name: 'DR. SANTOS', role: 'Medical', status: 'NOMINAL', color: 'text-green-400' },
  { name: 'PLT. YAMADA', role: 'Pilot', status: 'NOMINAL', color: 'text-green-400' },
  { name: 'SPC. ALI', role: 'Geologist', status: 'EVA', color: 'text-orange-400' },
];

const TRANSMISSION_LINES = [
  "MISSION DAY 247 — SOL 241",
  "BASE ALPHA FULLY OPERATIONAL",
  "CREW HEALTH: ALL NOMINAL",
  "WATER RECLAMATION: 98.4% EFFICIENCY",
  "POWER GRID: STABLE AT 10.2 KW",
  "SAMPLE CACHE: 47 CORES COLLECTED",
  "BIOSIGNATURE ANALYSIS: ONGOING",
  "NEXT RESUPPLY WINDOW: SOL 310",
  "CREW MORALE: HIGH",
  "HUMANITY'S FIRST MARTIAN COLONY",
  "IS NOW A REALITY.",
  "",
  "END OF TRANSMISSION",
];

export function ExplorationSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const { ref: epilogueRef, isRevealed: epilogueRevealed } = useScrollReveal({ threshold: 0.3 });
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [transmissionLines, setTransmissionLines] = useState<string[]>([]);
  const [transmissionDone, setTransmissionDone] = useState(false);
  const [signalStrength, setSignalStrength] = useState(0);
  const [marsTime, setMarsTime] = useState('');
  const [solDay, setSolDay] = useState(241);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Mars clock (1 sol = 24h 39m 35s)
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const mst = new Date(now.getTime() * (86400 / 88775.244));
      setSolDay(241 + Math.floor(now.getTime() / 88775244));
      setMarsTime(mst.toTimeString().slice(0, 8) + ' MST');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Signal strength animation
  useEffect(() => {
    if (!isRevealed) return;
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + 2);
      setSignalStrength(v);
      if (v >= 100) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [isRevealed]);

  // Typewriter transmission
  useEffect(() => {
    if (!epilogueRevealed) return;
    let lineIdx = 0;
    const addLine = () => {
      if (lineIdx >= TRANSMISSION_LINES.length) {
        setTransmissionDone(true);
        return;
      }
      setTransmissionLines(prev => [...prev, TRANSMISSION_LINES[lineIdx]]);
      lineIdx++;
      setTimeout(addLine, lineIdx === TRANSMISSION_LINES.length ? 0 : 280 + Math.random() * 120);
    };
    const t = setTimeout(addLine, 600);
    return () => clearTimeout(t);
  }, [epilogueRevealed]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [transmissionLines]);

  return (
    <section id="exploration" className="relative min-h-screen pt-0 pb-0 overflow-hidden">

      {/* Mars horizon */}
      <div className="absolute top-0 left-0 w-full h-[220px] z-0 overflow-hidden">
        <div className="w-full h-full" style={{
          background: 'linear-gradient(180deg, #0a0200 0%, #1a0500 15%, #4a1200 35%, #8B2500 50%, #c44d0a 58%, #e0791a 63%, #c44d0a 68%, #3d0f00 80%, #0a0200 100%)'
        }} />
        {/* Sun on horizon */}
        <div className="absolute bottom-[30%] left-[15%] w-12 h-12 rounded-full bg-yellow-200/80 blur-sm shadow-[0_0_40px_20px_rgba(255,220,100,0.4)]" />
        {/* Dust haze */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#8B2500]/30 to-transparent" />
      </div>

      {/* Dark base — semi-transparent */}
      <div className="absolute inset-0 top-[220px] bg-background/80 z-0 pointer-events-none" />

      {/* Rover */}
      <div className="absolute top-[196px] -left-[200px] w-28 h-18 z-10 animate-[rover-drive_35s_linear_infinite]">
        <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="4" width="80" height="6" rx="1" fill="#3b82f6" />
          <rect x="22" y="4" width="76" height="2" fill="#60a5fa" opacity="0.5" />
          <line x1="60" y1="10" x2="60" y2="28" stroke="#94a3b8" strokeWidth="2" />
          <rect x="12" y="28" width="96" height="22" rx="5" fill="#cbd5e1" />
          <rect x="12" y="28" width="96" height="8" rx="5" fill="#e2e8f0" />
          <line x1="95" y1="28" x2="95" y2="14" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="95" cy="12" r="5" fill="#1e293b" />
          <circle cx="93" cy="11" r="1.5" fill="#7dd3fc" opacity="0.8" />
          <rect x="30" y="34" width="12" height="8" rx="1" fill="#1e293b" />
          <circle cx="28" cy="56" r="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <circle cx="60" cy="56" r="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <circle cx="92" cy="56" r="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <circle cx="28" cy="56" r="4" fill="#334155" />
          <circle cx="60" cy="56" r="4" fill="#334155" />
          <circle cx="92" cy="56" r="4" fill="#334155" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full z-20 relative pt-60 px-6 pb-0">

        {/* Header */}
        <div ref={ref} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className={`reveal-left ${isRevealed ? 'is-revealed' : ''}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-primary/60" />
              <span className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase">Phase 05 / Survive</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-display font-black text-white leading-none mb-3">
              Base <span className="text-gradient-mars">Alpha</span>
            </h3>
            <p className="text-muted-foreground max-w-lg">
              Sol {solDay} — Humanity's first permanent settlement on another world. All systems nominal.
            </p>
          </div>
          <div className={`flex flex-col gap-3 reveal-right delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
            <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
              <Signal className="w-4 h-4 text-green-400" />
              <div className="flex-1">
                <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-1">EARTH LINK</div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden w-32">
                  <div className="h-full bg-green-400 rounded-full transition-all duration-75 shadow-[0_0_6px_rgba(74,222,128,0.8)]"
                    style={{ width: `${signalStrength}%` }} />
                </div>
              </div>
              <span className="text-xs font-mono text-green-400">{signalStrength}%</span>
            </div>
            <div className="glass-panel px-4 py-2 rounded-xl">
              <div className="text-[9px] font-mono text-muted-foreground tracking-widest">MARS LOCAL TIME</div>
              <div className="text-sm font-mono text-white tabular-nums">{marsTime}</div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-mono text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>
        </div>

        {/* Base map + modules */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12 reveal-base delay-100 ${isRevealed ? 'is-revealed' : ''}`}>

          {/* Base map */}
          <div className="lg:col-span-3 glass-panel rounded-3xl p-6 border border-white/10 relative overflow-hidden min-h-[320px]">
            <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-4 flex items-center justify-between">
              <span>BASE ALPHA — JEZERO CRATER — OVERHEAD MAP</span>
              <span className="text-green-400 animate-pulse">● LIVE</span>
            </div>
            {/* Map grid */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            {/* Terrain blobs */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[20%] left-[10%] w-32 h-20 bg-orange-900/20 rounded-full blur-2xl" />
              <div className="absolute top-[50%] right-[15%] w-24 h-16 bg-red-900/20 rounded-full blur-xl" />
              <div className="absolute bottom-[20%] left-[40%] w-20 h-12 bg-orange-800/15 rounded-full blur-xl" />
            </div>
            {/* Module nodes on map */}
            {modules.map((mod) => {
              const Icon = mod.icon;
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(isActive ? null : mod.id)}
                  className="absolute group outline-none"
                  style={{ left: `${mod.x}%`, top: `${mod.y}%`, transform: 'translate(-50%,-50%)' }}
                >
                  {/* Pulse ring */}
                  <div className={`absolute inset-0 rounded-full border ${mod.border} animate-ping opacity-40 scale-150`} />
                  <div className={`relative w-10 h-10 rounded-full border-2 ${mod.border} bg-background/80 backdrop-blur flex items-center justify-center transition-all duration-200 ${isActive ? 'scale-125 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'hover:scale-110'}`}>
                    <Icon className={`w-4 h-4 ${mod.color}`} />
                  </div>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-mono whitespace-nowrap ${mod.color} opacity-70`}>
                    {mod.id.toUpperCase()}
                  </div>
                  {/* Connector line to center */}
                  <svg className="absolute pointer-events-none opacity-20" style={{ top: '50%', left: '50%', overflow: 'visible' }}>
                    <line x1="0" y1="0" x2={`${50 - mod.x}%`} y2={`${50 - mod.y}%`} stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </button>
              );
            })}
            {/* Central hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-orange-500/30 border border-orange-500/60 flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
              </div>
            </div>
            {/* Active module tooltip */}
            {activeModule && (() => {
              const mod = modules.find(m => m.id === activeModule)!;
              const Icon = mod.icon;
              return (
                <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-4 border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg border ${mod.border} bg-background/80 flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${mod.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-display font-semibold text-white">{mod.title}</span>
                        <span className={`text-xs font-mono font-bold ${mod.color}`}>{mod.stat}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{mod.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Crew manifest */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground tracking-widest">CREW MANIFEST — 6 PERSONNEL</span>
            </div>
            {crew.map((c, i) => (
              <div key={i} className="flex items-center gap-3 group hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-white/60 shrink-0">
                  {c.name.split('.')[1]?.trim()[0] ?? c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-white/90 truncate">{c.name}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">{c.role}</div>
                </div>
                <div className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${c.status === 'EVA' ? 'border-orange-500/40 bg-orange-500/10 text-orange-400' : 'border-green-500/30 bg-green-500/10 text-green-400'}`}>
                  {c.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 mb-0 reveal-base delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className={`group relative glass-panel bg-background/60 p-7 rounded-3xl overflow-hidden cursor-pointer hover:bg-white/8 transition-all duration-500 hover:-translate-y-1 border border-white/8`}
                style={{ transitionDelay: `${idx * 80}ms` }}
                onClick={() => setActiveModule(mod.id)}
              >
                <div className={`absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-[0.07] rounded-full blur-3xl transition-opacity duration-500 bg-current ${mod.color}`} />
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border bg-background/80 ${mod.border}`}>
                    <Icon className={`w-6 h-6 ${mod.color}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-display font-bold ${mod.color}`}>{mod.stat}</div>
                    <div className="text-[9px] font-mono text-muted-foreground tracking-widest">{mod.statLabel}</div>
                  </div>
                </div>
                <h4 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-primary transition-colors">{mod.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{mod.desc}</p>
                <div className="flex items-end gap-1 h-5">
                  {[1,0.8,1.2,0.9,1.1,0.7,1].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm ${mod.barColor} opacity-60 group-hover:opacity-100 transition-opacity`}
                      style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/5">
                  <div className={`h-full w-0 group-hover:w-full transition-all duration-700 ease-out bg-current ${mod.color}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EPILOGUE — full-width cinematic section */}
      <div ref={epilogueRef} className="relative mt-32 min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pb-32">
        {/* Deep space bg — semi-transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020810]/90 to-[#000000]/95" />
        {/* Star field handled by global StarField component */}
        {/* Earth glow far away */}
        <div className="absolute top-[10%] right-[8%] w-16 h-16 rounded-full bg-blue-400/20 blur-xl shadow-[0_0_60px_20px_rgba(96,165,250,0.15)]" />
        <div className="absolute top-[10%] right-[8%] w-8 h-8 rounded-full bg-blue-300/40 blur-sm" style={{ marginTop: '2rem', marginRight: '2rem' }} />

        <div className="relative z-10 w-full max-w-3xl mx-auto">
          {/* Transmission header */}
          <div className={`text-center mb-12 transition-all duration-1000 ${epilogueRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-green-500/30 bg-green-500/5 mb-6">
              <div className="flex gap-0.5 items-end h-4">
                {[0.4,0.7,1,0.6,0.9,0.5,0.8,1,0.7,0.4].map((h, i) => (
                  <div key={i} className="w-1 bg-green-400 rounded-t-sm animate-[data-bar_1s_ease-in-out_infinite]"
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="text-[10px] font-mono text-green-400 tracking-[0.4em]">INCOMING TRANSMISSION — BASE ALPHA</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-wider mb-2">
              Mission <span className="text-gradient-mars">Report</span>
            </h2>
            <p className="text-muted-foreground text-sm font-mono tracking-widest">SOL {solDay} — JEZERO CRATER BASE</p>
          </div>

          {/* Terminal */}
          <div className={`relative transition-all duration-1000 delay-300 ${epilogueRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* CRT scanlines */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-[0.03]"
              style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)' }} />
            <div className="bg-black/80 border border-green-500/20 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,255,100,0.05),inset_0_0_40px_rgba(0,0,0,0.5)]">
              {/* Terminal titlebar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/10 bg-black/40">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-[10px] font-mono text-green-500/50 tracking-widest">ARES-I MISSION CONTROL — SECURE CHANNEL 7</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-green-400/60">ENCRYPTED</span>
                </div>
              </div>
              {/* Log output */}
              <div ref={terminalRef} className="p-6 h-72 overflow-y-auto space-y-1 font-mono text-sm scrollbar-thin">
                {transmissionLines.map((line, i) => {
                  const isLast = i === transmissionLines.length - 1;
                  const isEOT = line === 'END OF TRANSMISSION';
                  const isEmpty = line === '';
                  return (
                    <div key={i} className={`flex gap-3 ${isEOT ? 'text-orange-400 font-bold text-base mt-4' : isEmpty ? 'h-3' : 'text-green-400/80'}`}>
                      {!isEmpty && !isEOT && <span className="text-green-500/30 shrink-0 select-none">&gt;</span>}
                      {!isEmpty && <span className={isEOT ? 'tracking-[0.3em]' : ''}>{line}</span>}
                      {isLast && !transmissionDone && (
                        <span className="inline-block w-2 h-4 bg-green-400 animate-[type-cursor_0.8s_infinite] ml-0.5 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Final EOT reveal */}
          {transmissionDone && (
            <div className="mt-16 text-center animate-in fade-in zoom-in-95 duration-1000">
              <div className="inline-block relative">
                {/* Outer glow rings */}
                <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 animate-ping opacity-20 scale-110" />
                <div className="absolute inset-0 rounded-2xl border border-cyan-500/10 animate-ping opacity-10 scale-125" style={{ animationDelay: '0.3s' }} />
                <div className="relative px-12 py-8 rounded-2xl border border-cyan-500/30 bg-black/60 backdrop-blur-xl shadow-[0_0_80px_rgba(0,210,255,0.1),inset_0_0_40px_rgba(0,210,255,0.03)]">
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                  <div className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
                  <p className="text-[10px] font-mono text-cyan-500/60 tracking-[0.6em] mb-4">ARES-I // MISSION COMPLETE</p>
                  <h1 className="text-4xl md:text-6xl font-display font-black text-white tracking-[0.2em] uppercase mb-3">
                    End of<br /><span className="text-gradient-space">Transmission</span>
                  </h1>
                  <p className="text-xs font-mono text-muted-foreground tracking-widest mt-4">
                    HUMANITY HAS REACHED MARS — SOL {solDay}
                  </p>
                  {/* Signal bars */}
                  <div className="flex justify-center gap-1 mt-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-1.5 rounded-t-sm bg-cyan-400/60 animate-[data-bar_1s_ease-in-out_infinite]"
                        style={{ height: `${8 + Math.sin(i) * 6}px`, animationDelay: `${i * 0.08}s` }} />
                    ))}
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
