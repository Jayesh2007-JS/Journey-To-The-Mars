import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const COUNTDOWN_EVENTS = [
  { t: 0,    text: 'T-10 · TERMINAL COUNTDOWN' },
  { t: 1200, text: 'T-5 · ENGINE CHILL-DOWN' },
  { t: 2400, text: 'T-0 · IGNITION SEQUENCE START' },
  { t: 3200, text: 'LIFTOFF — ARES HEAVY' },
];

export function LaunchSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '0px 0px -80px 0px' });
  const sectionRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [altitude, setAltitude] = useState(0);
  const [thrust, setThrust] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [gForce, setGForce] = useState(0);
  const [stageSep, setStageSep] = useState(false);
  const [eventIdx, setEventIdx] = useState(-1);
  const stageSepShownRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !rocketRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const wh = window.innerHeight;
        const p = Math.max(0, Math.min(1, 1 - (rect.bottom / (wh + rect.height))));
        rocketRef.current.style.transform = `translateY(${-(p * 680)}px)`;
        rocketRef.current.style.opacity = String(Math.max(0, p > 0.78 ? 1 - (p - 0.78) / 0.22 : 1));
        if (p > 0.5 && !stageSepShownRef.current) {
          stageSepShownRef.current = true;
          setStageSep(true);
          setTimeout(() => setStageSep(false), 2800);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    if (!isRevealed) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / 3500);
      const e = 1 - Math.pow(1 - p, 3);
      setAltitude(Math.floor(e * 150));
      setThrust(Math.floor(e * 160));
      setVelocity(Math.floor(e * 27600));
      setGForce(+(e * 3.2).toFixed(1));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    COUNTDOWN_EVENTS.forEach((ev, i) => setTimeout(() => setEventIdx(i), ev.t));
  }, [isRevealed]);

  return (
    <section id="launch" ref={sectionRef} className="relative min-h-[260vh] px-6">
      <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/90 via-transparent to-transparent pointer-events-none z-0" />
      <AnimatePresence>
        {stageSep && (
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="px-12 py-8 border border-orange-500/60 bg-black/85 backdrop-blur-xl rounded-2xl text-center">
              <div className="text-[9px] font-mono text-orange-400/70 tracking-[0.5em] mb-3">ARES HEAVY</div>
              <div className="text-5xl md:text-7xl font-display font-black text-orange-400 tracking-widest uppercase">Stage Sep</div>
              <div className="text-[9px] font-mono text-orange-300/50 tracking-[0.3em] mt-3">ALT {altitude} KM · NOMINAL</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="sticky top-0 h-screen flex items-center z-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none z-0">
          <div className="absolute bottom-0 left-[-15%] right-[-15%] h-44 rounded-[50%]"
            style={{ background: 'linear-gradient(180deg,#1a3a6e 0%,#0d2040 50%,#060f20 100%)', boxShadow: '0 -30px 100px rgba(30,80,200,0.18)' }} />
          <div className="absolute bottom-[42px] left-[10%] right-[10%] h-px opacity-25"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(255,220,100,0.8) 30%,rgba(255,200,80,0.5) 60%,rgba(255,220,100,0.8) 80%,transparent)' }} />
        </div>
        <div className="absolute bottom-0 z-10 pointer-events-none" style={{ left: 'calc(50% + 100px)' }}>
          <div className="absolute bottom-0 left-0 w-3 bg-slate-700/50 rounded-t-sm" style={{ height: '240px' }} />
          <div className="absolute w-20 h-1 bg-slate-600/40 rounded" style={{ bottom: '190px', left: '3px' }} />
          <div className="absolute w-14 h-1 bg-slate-600/30 rounded" style={{ bottom: '140px', left: '3px' }} />
        </div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div ref={ref} className="space-y-5 z-10">
            <motion.div ref={headingRef} initial={{ opacity: 0, x: -40 }} animate={headingInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-orange-500/70" />
                <span className="text-[10px] font-mono text-orange-400 tracking-[0.4em] uppercase">Phase 01 / Ascend</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-display font-black text-white mb-4 leading-[0.9]">
                Escaping<br /><span className="text-gradient-mars">Gravity</span>
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
                The Ares Heavy lift vehicle — 16 million pounds of thrust shattering Earth's gravity well. Nine Merlin engines ignite in sequence, building to full power in 3.2 seconds.
              </p>
            </motion.div>
            <div className={`reveal-base delay-100 ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="bg-black/50 border border-white/8 rounded-xl p-4 font-mono text-xs space-y-2">
                <div className="text-[9px] text-muted-foreground tracking-widest mb-2">LAUNCH SEQUENCE LOG</div>
                {COUNTDOWN_EVENTS.map((ev, i) => (
                  <div key={i} className={`flex items-center gap-2 transition-all duration-500 ${i <= eventIdx ? 'opacity-100' : 'opacity-20'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${i <= eventIdx ? 'bg-orange-400' : 'bg-white/20'}`} />
                    <span className={i <= eventIdx ? 'text-orange-300' : 'text-white/30'}>{ev.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-3 reveal-base delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
              {[
                { label: 'Altitude', value: altitude, unit: 'km', accent: '#38bdf8' },
                { label: 'Thrust', value: thrust, unit: 'MN', accent: '#f97316' },
                { label: 'Velocity', value: velocity.toLocaleString(), unit: 'km/h', accent: '#facc15' },
                { label: 'G-Force', value: gForce, unit: 'g', accent: '#00D2FF' },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }} className="glass-panel p-4 rounded-xl border-l-2 hover:bg-white/5 transition-colors" style={{ borderLeftColor: s.accent }}>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1 tracking-widest">{s.label}</div>
                  <div className="text-2xl font-display font-bold text-white tabular-nums">{s.value}<span className="text-xs font-normal text-muted-foreground ml-1">{s.unit}</span></div>
                </motion.div>
              ))}
            </div>
            <div className={`reveal-base delay-300 ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-2 tracking-widest">
                <span>ESCAPE VELOCITY</span><span className="text-orange-400">{Math.round((velocity / 40320) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-300 rounded-full transition-all duration-150" style={{ width: `${Math.min(100, (velocity / 40320) * 100)}%` }} />
              </div>
            </div>
            <div className={`reveal-base delay-400 ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-2">9 MERLIN ENGINES — ALL NOMINAL</div>
              <div className="flex gap-1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="flex-1 h-5 rounded-sm bg-orange-500/15 border border-orange-500/25 relative overflow-hidden">
                    <div className="absolute inset-0 bg-orange-500/25 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    <div className="absolute inset-0 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-orange-400" /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative h-[680px] w-full flex justify-center items-end">
            <div ref={rocketRef} className="relative will-change-transform flex flex-col items-center" style={{ zIndex: 20 }}>
              <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none" style={{ bottom: '-8px', zIndex: -1 }}>
                <div className="w-6 rounded-b-full animate-[exhaust_0.1s_ease-in-out_infinite_alternate]"
                  style={{ height: '100px', background: 'linear-gradient(180deg,#fffde0 0%,#FFD700 25%,#FF6B00 65%,transparent 100%)', opacity: 0.92 }} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full animate-[exhaust_0.16s_ease-in-out_infinite_alternate]"
                  style={{ width: '32px', height: '130px', background: 'linear-gradient(180deg,rgba(255,180,30,0.65) 0%,rgba(255,80,0,0.35) 55%,transparent 100%)', filter: 'blur(5px)' }} />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 rounded-b-full"
                  style={{ width: '70px', height: '90px', background: 'radial-gradient(ellipse at top,rgba(255,120,0,0.22) 0%,transparent 70%)', filter: 'blur(10px)' }} />
              </div>
              <svg width="160" height="420" viewBox="0 0 80 240" fill="none">
                <defs>
                  <linearGradient id="lbody" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#334155"/><stop offset="25%" stopColor="#94a3b8"/>
                    <stop offset="50%" stopColor="#f1f5f9"/><stop offset="75%" stopColor="#94a3b8"/>
                    <stop offset="100%" stopColor="#334155"/>
                  </linearGradient>
                  <linearGradient id="lnose" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0f172a"/><stop offset="50%" stopColor="#334155"/>
                    <stop offset="100%" stopColor="#0f172a"/>
                  </linearGradient>
                  <linearGradient id="lengine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e293b"/><stop offset="100%" stopColor="#0a0f1a"/>
                  </linearGradient>
                  <linearGradient id="lfin" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e293b"/><stop offset="50%" stopColor="#475569"/>
                    <stop offset="100%" stopColor="#1e293b"/>
                  </linearGradient>
                </defs>
                <line x1="40" y1="2" x2="40" y2="-10" stroke="#64748b" strokeWidth="1"/>
                <circle cx="40" cy="-12" r="2" fill="#38bdf8" opacity="0.8"/>
                <path d="M40 2 C40 2 26 22 24 52 L56 52 C54 22 40 2 40 2Z" fill="url(#lnose)"/>
                <rect x="24" y="52" width="32" height="70" rx="1" fill="url(#lbody)"/>
                <rect x="24" y="52" width="7" height="70" fill="rgba(255,255,255,0.05)"/>
                <circle cx="40" cy="76" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5"/>
                <circle cx="40" cy="76" r="4.5" fill="#071428"/>
                <circle cx="37.5" cy="73.5" r="1.8" fill="#7dd3fc" opacity="0.8"/>
                <circle cx="40" cy="96" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2"/>
                <circle cx="40" cy="96" r="3" fill="#071428"/>
                <rect x="37.5" y="106" width="5" height="14" rx="1" fill="#ef4444" opacity="0.9"/>
                <rect x="24" y="122" width="32" height="7" fill="#0f172a"/>
                <rect x="24" y="123.5" width="32" height="2" fill="#0ea5e9" opacity="0.5"/>
                <rect x="24" y="129" width="32" height="60" rx="1" fill="url(#lbody)"/>
                <line x1="24" y1="155" x2="56" y2="155" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                <path d="M24 189 Q18 208 12 224 L24 221 L40 226 L56 221 L68 224 Q62 208 56 189Z" fill="url(#lengine)"/>
                <ellipse cx="40" cy="189" rx="16" ry="4" fill="#1e293b"/>
                <ellipse cx="40" cy="222" rx="12" ry="3.5" fill="#0a0f1a" stroke="#334155" strokeWidth="1"/>
                <path d="M24 155 L4 210 L4 192 L24 172Z" fill="url(#lfin)"/>
                <path d="M56 155 L76 210 L76 192 L56 172Z" fill="url(#lfin)"/>
              </svg>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 pointer-events-none z-10">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
              <div className="flex justify-between px-4 mt-1">
                {[14, 20, 14, 20, 14].map((h, i) => (
                  <div key={i} className="w-px bg-slate-600/35" style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
