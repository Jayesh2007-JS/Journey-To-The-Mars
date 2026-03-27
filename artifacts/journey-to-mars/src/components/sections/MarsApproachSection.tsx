import { useEffect, useRef, useState } from 'react';

const PHASES = [
  { pct: 0,    title: 'Deceleration Burn',    desc: 'Main engine fires for 22 minutes. Velocity drops to capture speed.', stat: '−3.6 KM/S', color: '#00D2FF' },
  { pct: 0.3,  title: 'Mars Orbit Insertion', desc: 'Spacecraft captured by Martian gravity. Elliptical orbit at 500 km.', stat: '500 KM ALT', color: '#7B2FF7' },
  { pct: 0.6,  title: 'EDL Prep',             desc: 'Heat shield armed. Crew in landing positions. 7 minutes of terror begins.', stat: 'ENTRY IN 7 MIN', color: '#FF5A1F' },
  { pct: 0.85, title: 'Atmospheric Entry',    desc: 'Plasma sheath engulfs the capsule. 1,600°C on the heat shield. Comms blackout.', stat: '1,600°C', color: '#FF3D00' },
];

export function MarsApproachSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const [phase, setPhase] = useState(0);
  const [countdown, setCountdown] = useState(420);
  const countdownStarted = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      progressRef.current = p;
      let np = 0;
      for (let i = PHASES.length - 1; i >= 0; i--) {
        if (p >= PHASES[i].pct) { np = i; break; }
      }
      setPhase(np);
      if (np >= 2 && !countdownStarted.current) {
        countdownStarted.current = true;
        const id = setInterval(() => setCountdown(c => { if (c <= 1) { clearInterval(id); return 0; } return c - 1; }), 1000);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Canvas — Mars zoom, throttled to ~30fps
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    let last = 0;
    const draw = (ts: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (ts - last < 33) return; // ~30fps cap
      last = ts;

      const p = progressRef.current;
      ctx.clearRect(0, 0, W, H);

      const minR = Math.min(W, H) * 0.08;
      const maxR = Math.min(W, H) * 1.1;
      const r = minR + (maxR - minR) * Math.pow(p, 1.5);
      const cx = W * 0.5, cy = H * 0.45;

      // Atmosphere glow — simple, no expensive gradient reuse
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,80,20,${0.08 * Math.min(1, p * 3)})`;
      ctx.fill();

      // Planet
      const g = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.25, 0, cx, cy, r);
      g.addColorStop(0, '#d4622a');
      g.addColorStop(0.45, '#a83010');
      g.addColorStop(0.8, '#6b1a06');
      g.addColorStop(1, '#2a0800');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Shadow
      const sg = ctx.createRadialGradient(cx + r * 0.4, cy + r * 0.3, 0, cx, cy, r);
      sg.addColorStop(0.5, 'rgba(0,0,0,0)');
      sg.addColorStop(1, 'rgba(0,0,0,0.8)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = sg;
      ctx.fill();

      // Polar cap — only when close enough
      if (p > 0.25) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, (p - 0.25) / 0.3);
        ctx.beginPath();
        ctx.ellipse(cx + r * 0.05, cy - r * 0.82, r * 0.18, r * 0.07, 0.1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,240,230,0.75)';
        ctx.fill();
        ctx.restore();
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const ph = PHASES[phase];

  return (
    <section id="approach" ref={sectionRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(2,5,12,0.65) 100%)' }} />

        {/* Phase label */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
          <span className="w-8 h-px bg-primary/60" />
          <span className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase">Phase 03 / Approach</span>
        </div>

        {/* Phase dots */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {PHASES.map((_, i) => (
            <div key={i} className="h-1 rounded-full transition-all duration-500"
              style={{ width: i === phase ? '28px' : '8px', background: i <= phase ? ph.color : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>

        {/* Left info */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 max-w-xs">
          <div key={phase} className="animate-in fade-in slide-in-from-left-4 duration-400">
            <div className="text-[9px] font-mono tracking-[0.4em] mb-2" style={{ color: ph.color }}>PHASE {phase + 1} / {PHASES.length}</div>
            <h2 className="text-2xl md:text-3xl font-display font-black text-white mb-3 leading-tight">{ph.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{ph.desc}</p>
            <div className="glass-panel px-4 py-3 rounded-xl border border-white/10 inline-block">
              <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-1">TELEMETRY</div>
              <div className="text-xl font-display font-bold" style={{ color: ph.color }}>{ph.stat}</div>
            </div>
          </div>
        </div>

        {/* Right — countdown */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          <div className="glass-panel p-5 rounded-2xl border border-red-500/30 text-right">
            <div className="text-[9px] font-mono text-red-400 tracking-widest mb-1 animate-pulse">
              {phase >= 2 ? '⚠ EDL ACTIVE' : 'EDL COUNTDOWN'}
            </div>
            <div className={`text-4xl font-display font-black tabular-nums ${phase >= 3 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              {fmt(countdown)}
            </div>
            <div className="text-[9px] font-mono text-muted-foreground mt-1">TO TOUCHDOWN</div>
          </div>
          {[
            { label: 'ENTRY ANGLE', val: '−15.5°', color: 'text-cyan-400' },
            { label: 'VELOCITY', val: '5.5 KM/S', color: 'text-orange-400' },
          ].map((item, i) => (
            <div key={i} className="glass-panel px-4 py-3 rounded-xl border border-white/8 text-right">
              <div className="text-[9px] font-mono text-muted-foreground tracking-widest">{item.label}</div>
              <div className={`text-lg font-display font-bold ${item.color}`}>{item.val}</div>
            </div>
          ))}
        </div>

        {phase >= 3 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-red-500/50 bg-red-500/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-sm font-mono text-red-400 tracking-widest">COMMS BLACKOUT — PLASMA SHEATH</span>
            </div>
          </div>
        )}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30">
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
          <span className="text-[9px] font-mono tracking-widest">SCROLL</span>
        </div>
      </div>
    </section>
  );
}
