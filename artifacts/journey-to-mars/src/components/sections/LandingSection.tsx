import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const EDL_EVENTS = [
  { time: 0,    text: 'ATMOSPHERIC ENTRY INITIATED',   color: '#FF5A1F', icon: '🔥' },
  { time: 1200, text: 'PEAK HEATING — 1,600°C',        color: '#FF3D00', icon: '⚡' },
  { time: 2400, text: 'SUPERSONIC CHUTE DEPLOYED',     color: '#00D2FF', icon: '🪂' },
  { time: 3600, text: 'HEAT SHIELD JETTISONED',        color: '#7B2FF7', icon: '🛡' },
  { time: 4800, text: 'POWERED DESCENT — ENGINES HOT', color: '#FF5A1F', icon: '🚀' },
  { time: 6000, text: 'SKY CRANE ACTIVE',              color: '#F7971E', icon: '🏗' },
  { time: 7200, text: '✓ TOUCHDOWN CONFIRMED',         color: '#22C55E', icon: '🔴' },
];

const SURFACE_STATS = [
  { label: 'Surface Temp', val: '−60°C', color: 'text-cyan-400' },
  { label: 'Pressure',     val: '6.1 mbar', color: 'text-purple-400' },
  { label: 'Gravity',      val: '3.72 m/s²', color: 'text-orange-400' },
  { label: 'Wind Speed',   val: '12 km/h', color: 'text-green-400' },
  { label: 'Sol Day',      val: '001', color: 'text-yellow-400' },
  { label: 'Location',     val: 'Jezero Crater', color: 'text-red-400' },
];

export function LandingSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.2 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [events, setEvents] = useState<number[]>([]);
  const [missionTime, setMissionTime] = useState(0);
  const [shaking, setShaking] = useState(false);
  const landed = events.includes(6);

  // Trigger EDL sequence on reveal
  useEffect(() => {
    if (!isRevealed) return;
    // Screen shake
    setShaking(true);
    setTimeout(() => setShaking(false), 800);

    EDL_EVENTS.forEach((_, i) => {
      setTimeout(() => {
        setEvents(prev => [...prev, i]);
        if (i === 0 || i === 4) {
          setShaking(true);
          setTimeout(() => setShaking(false), 600);
        }
      }, i * 900);
    });
  }, [isRevealed]);

  // Mission elapsed time after landing
  useEffect(() => {
    if (!landed) return;
    const id = setInterval(() => setMissionTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [landed]);

  // Dust particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number; color: string }[] = [];
    const colors = ['#c1440e', '#e77d11', '#fda600', '#a03300', '#d4622a'];

    const spawn = () => {
      if (!isRevealed) return;
      for (let i = 0; i < 1; i++) {  // reduced from 3 to 1
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 3,
          vy: -(Math.random() * 6 + 2),
          r: Math.random() * 4 + 1,
          life: 0,
          maxLife: Math.random() * 80 + 40,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life++;
        p.vy += 0.05; // gravity
        const alpha = (1 - p.life / p.maxLife) * 0.6;
        if (alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isRevealed]);

  const formatTime = (s: number) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `MET ${m}:${sec}`;
  };

  return (
    <section
      id="landing"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center px-6 overflow-hidden ${shaking ? 'animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]' : ''}`}
    >
      {/* Dust canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none mix-blend-screen opacity-60" />

      {/* Mars surface gradient bg — semi-transparent */}
      <div className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #1a0500 20%, #4a1200 45%, #8B2500 60%, #c44d0a 68%, #8B2500 75%, #1a0500 90%, #050810 100%)' }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

      {/* Radial vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

      <div ref={ref} className="relative z-20 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — EDL terminal */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-red-500/60" />
              <span className="text-[10px] font-mono text-red-400 tracking-[0.4em] uppercase">Phase 04 / Touchdown</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-2 uppercase">
              7 Minutes
            </h2>
            <h2 className="text-5xl md:text-7xl font-display font-black leading-none mb-8 uppercase"
              style={{ background: 'linear-gradient(135deg,#FF6B35,#FF3D00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              of Terror
            </h2>

            {/* EDL terminal */}
            <div className="relative bg-black/80 border border-green-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,255,100,0.05)]">
              {/* CRT scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-10"
                style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)' }} />
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/10 bg-black/40">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-[10px] font-mono text-green-500/50 tracking-widest">EDL SEQUENCE LOG</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-green-400/60">LIVE</span>
                </div>
              </div>
              {/* Log */}
              <div className="p-5 space-y-2 min-h-[280px]">
                {EDL_EVENTS.map((ev, i) => {
                  const visible = events.includes(i);
                  if (!visible) return null;
                  const isLast = i === events[events.length - 1];
                  return (
                    <div key={i} className="flex items-center gap-3 animate-in slide-in-from-left-4 fade-in duration-300">
                      <span className="text-lg">{ev.icon}</span>
                      <span className="font-mono text-sm font-bold" style={{ color: ev.color }}>{ev.text}</span>
                      {isLast && !landed && (
                        <span className="inline-block w-2 h-4 bg-green-400 animate-[type-cursor_0.8s_infinite] ml-1" />
                      )}
                    </div>
                  );
                })}
                {!isRevealed && (
                  <div className="text-green-400/30 font-mono text-sm flex items-center gap-2">
                    <span className="w-2 h-4 bg-green-400/30 animate-[type-cursor_0.8s_infinite]" />
                    AWAITING ENTRY...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — touchdown reveal + stats */}
          <div className="flex flex-col items-center text-center">
            {landed ? (
              <div className="animate-in fade-in zoom-in-95 duration-1000">
                {/* Big touchdown text */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 blur-3xl opacity-30 rounded-full"
                    style={{ background: 'radial-gradient(circle, #22C55E, transparent)' }} />
                  <h1 className="relative text-7xl md:text-9xl font-display font-black text-white uppercase tracking-tighter"
                    style={{ textShadow: '0 0 60px rgba(34,197,94,0.5), 0 0 120px rgba(34,197,94,0.2)' }}>
                    Touch<br />down
                  </h1>
                </div>

                {/* Confirmed badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-green-500 bg-green-500/15 mb-8"
                  style={{ boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}>
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-green-400 font-bold tracking-widest">CONFIRMED — JEZERO CRATER</span>
                </div>

                {/* MET */}
                <div className="glass-panel px-8 py-4 rounded-2xl border border-white/10 mb-8 inline-block">
                  <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-1">MISSION ELAPSED TIME</div>
                  <div className="text-3xl font-mono text-white font-bold tabular-nums">{formatTime(missionTime)}</div>
                  {/* Signal bars */}
                  <div className="flex justify-center items-end gap-1 h-6 mt-3">
                    {[0.4,0.7,1,0.6,0.9,0.5,0.8,1,0.7,0.4].map((h, i) => (
                      <div key={i} className="w-1.5 rounded-t-sm bg-green-400/70 animate-[data-bar_1s_ease-in-out_infinite]"
                        style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>

                {/* Surface stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-sm mx-auto">
                  {SURFACE_STATS.map((s, i) => (
                    <div key={i} className="glass-panel p-3 rounded-xl border border-white/8 text-left">
                      <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-1">{s.label}</div>
                      <div className={`text-sm font-display font-bold ${s.color}`}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                {/* Descent animation */}
                <div className="relative w-32 h-48">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-white/40 to-transparent" />
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path d="M24 4L8 40L24 34L40 40L24 4Z" fill="white" opacity="0.9"/>
                      <circle cx="24" cy="38" r="4" fill="#FF5A1F" className="animate-pulse"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-orange-500/30 rounded-full blur-md" />
                </div>
                <div className="text-white/40 font-mono text-sm tracking-widest animate-pulse">
                  DESCENT IN PROGRESS...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
