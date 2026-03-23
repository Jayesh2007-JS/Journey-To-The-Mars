import { useEffect, useState, useRef, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useCanvasParticles } from '@/hooks/use-canvas-particles';

export function LaunchSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.15 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const [altitude, setAltitude] = useState(0);
  const [thrust, setThrust] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [gForce, setGForce] = useState(0);
  const [stageSep, setStageSep] = useState(false);
  const [stageSepShown, setStageSepShown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rocketY, setRocketY] = useState(0);

  // Monitor scroll for stage separation — triggers once, auto-dismisses after 2.5s
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visible = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(visible);

      if (visible) {
        const progress = Math.max(0, Math.min(1, 1 - (rect.bottom / (windowHeight + rect.height))));
        // Rocket rises as you scroll through the section
        setRocketY(-(progress * 80));
        // Stage sep: fires once at 60% scroll through THIS section only
        if (progress > 0.6 && !stageSepShown) {
          setStageSepShown(true);
          setStageSep(true);
          setTimeout(() => setStageSep(false), 2500);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stageSepShown]);

  // Animate stats when revealed
  useEffect(() => {
    if (isRevealed) {
      const duration = 3500;
      const startTime = Date.now();
      const tick = () => {
        const p = Math.min(1, (Date.now() - startTime) / duration);
        const ease = 1 - Math.pow(1 - p, 3);
        setAltitude(Math.floor(ease * 150));
        setThrust(Math.floor(ease * 160));
        setVelocity(Math.floor(ease * 27600));
        setGForce(+(ease * 3.2).toFixed(1));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, [isRevealed]);

  // Rocket exhaust particle system
  const exhaustCanvasRef = useCanvasParticles({
    isActive: isVisible,
    spawnRate: 14,
    createParticle: (_ctx, w, h) => ({
      x: w * 0.65 + (Math.random() - 0.5) * 24,
      y: h * 0.52 + rocketY * 4,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 7 + 4,
      size: Math.random() * 4 + 1,
      color: ['#FF6B35', '#FFD700', '#FF4500', '#FF8C00', '#FFF5E0', '#FFFFFF'][Math.floor(Math.random() * 6)],
      life: 0,
      maxLife: Math.random() * 55 + 30,
      opacity: 1,
    }),
    updateParticle: (p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy *= 1.04;
      p.size *= 0.97;
      p.life++;
      p.opacity = Math.pow(1 - p.life / p.maxLife, 0.6);
      return p.life < p.maxLife;
    },
    drawParticle: (p, ctx) => {
      ctx.globalAlpha = p.opacity ?? 1;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      grad.addColorStop(0, p.color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    },
  });

  // Shockwave ring system
  const shockwaveCanvasRef = useCanvasParticles({
    isActive: isVisible,
    spawnRate: 0.05,
    createParticle: (_ctx, w, h) => ({
      x: w * 0.65,
      y: h * 0.55 + rocketY * 4,
      vx: 0,
      vy: 0,
      size: 8,
      color: 'rgba(255,180,80,0.3)',
      life: 0,
      maxLife: 80,
      opacity: 0.5,
    }),
    updateParticle: (p) => {
      p.size += 6;
      p.life++;
      p.opacity = 0.5 * (1 - p.life / p.maxLife);
      return p.life < p.maxLife;
    },
    drawParticle: (p, ctx) => {
      ctx.globalAlpha = p.opacity ?? 1;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.stroke();
    },
  });

  return (
    <section id="launch" ref={sectionRef} className="relative min-h-[180vh] py-20 px-6">
      {/* Background gradient — sky to space */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-[#0a1628] to-background pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0d2240]/60 to-transparent pointer-events-none z-0" />

      {/* Particle canvases */}
      <canvas ref={exhaustCanvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />
      <canvas ref={shockwaveCanvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

      {/* Stage Separation — absolute within section, centered, auto-dismisses */}
      <div
        className={`absolute inset-0 z-40 flex items-center justify-center pointer-events-none transition-all duration-500 ${stageSep ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className={`transition-transform duration-500 ${stageSep ? 'scale-100' : 'scale-75'}`}>
          <div className="relative px-10 py-6 border-2 border-orange-500 bg-black/80 backdrop-blur-md rounded-lg shadow-[0_0_60px_rgba(255,120,0,0.5)]">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            <p className="text-xs font-mono text-orange-400 tracking-[0.4em] mb-2 text-center">ARES HEAVY</p>
            <h3 className="text-5xl md:text-7xl font-display font-black text-orange-500 tracking-widest uppercase text-center">
              Stage Sep
            </h3>
            <p className="text-xs font-mono text-orange-300/70 tracking-widest mt-2 text-center">FIRST STAGE JETTISONED • ALT {altitude} KM</p>
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          </div>
        </div>
      </div>

      {/* Sticky inner content */}
      <div className="sticky top-0 h-screen flex items-center z-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Content */}
          <div ref={ref} className="space-y-8 z-10">
            <div className={`reveal-left ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-accent/50 block" />
                <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Phase 01 / Ascend</span>
              </div>
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-5 leading-none">
                Escaping<br /><span className="text-gradient-mars">Gravity</span>
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                The Ares Heavy lift vehicle represents the pinnacle of human engineering — 16 million pounds of thrust shattering the bounds of Earth's gravity well.
              </p>
            </div>

            {/* Stats Grid */}
            <div className={`grid grid-cols-2 gap-4 reveal-base delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
              {[
                { label: 'Altitude', value: altitude, unit: 'km', color: 'border-l-primary' },
                { label: 'Thrust', value: thrust, unit: 'MN', color: 'border-l-orange-500' },
                { label: 'Velocity', value: velocity.toLocaleString(), unit: 'km/h', color: 'border-l-yellow-500' },
                { label: 'G-Force', value: gForce, unit: 'g', color: 'border-l-accent' },
              ].map((stat, i) => (
                <div key={i} className={`glass-panel p-4 rounded-xl border-l-4 ${stat.color} hover:bg-white/10 transition-colors`}>
                  <div className="text-xs font-mono text-muted-foreground uppercase mb-1 tracking-wider">{stat.label}</div>
                  <div className="text-2xl md:text-3xl font-display font-bold text-white tabular-nums">
                    {stat.value}
                    <span className="text-sm font-normal text-muted-foreground ml-1">{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Escape velocity bar */}
            <div className={`reveal-base delay-300 ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
                <span>ESCAPE VELOCITY PROGRESS</span>
                <span>{Math.round((velocity / 40320) * 100)}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary via-orange-400 to-yellow-400 rounded-full transition-all duration-150 shadow-[0_0_10px_rgba(255,140,0,0.6)]"
                  style={{ width: `${Math.min(100, (velocity / 40320) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right — Rocket SVG rising */}
          <div className={`relative h-[560px] w-full flex justify-center items-end reveal-right delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
            <div
              className="relative z-20 transition-transform duration-75"
              style={{ transform: `translateY(${rocketY}px)` }}
            >
              {/* Engine glow below nozzle */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-16 h-24 bg-gradient-to-b from-yellow-400/80 via-orange-500/60 to-transparent rounded-full blur-xl animate-pulse" />

              <svg width="160" height="500" viewBox="0 0 160 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_30px_rgba(255,140,0,0.3)]">
                {/* Exhaust bell */}
                <path d="M60 400 Q50 430 35 460 L60 455 L80 460 L100 455 L125 460 Q110 430 100 400Z" fill="#1e2a3a" />
                {/* Engine bells (3) */}
                <ellipse cx="80" cy="400" rx="30" ry="8" fill="#334155" />
                <ellipse cx="55" cy="403" rx="12" ry="5" fill="#475569" />
                <ellipse cx="105" cy="403" rx="12" ry="5" fill="#475569" />
                {/* Body */}
                <path d="M80 20 C80 20 45 80 42 200 L42 395 L118 395 L118 200 C115 80 80 20 80 20Z" fill="url(#bodyGrad)" />
                {/* Body highlight */}
                <path d="M80 20 C80 20 60 80 58 200 L58 395 L72 395 L72 200 C70 80 80 20 80 20Z" fill="white" opacity="0.06" />
                {/* Interstage band */}
                <rect x="42" y="300" width="76" height="12" fill="#1e293b" />
                <rect x="42" y="305" width="76" height="2" fill="#0ea5e9" opacity="0.5" />
                {/* Nose cone */}
                <path d="M80 0 C80 0 55 15 48 60 L112 60 C105 15 80 0 80 0Z" fill="url(#noseGrad)" />
                {/* Porthole windows */}
                <circle cx="80" cy="110" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="80" cy="110" r="6" fill="#0d2042" />
                <circle cx="76" cy="107" r="2" fill="#7dd3fc" opacity="0.6" />
                <circle cx="80" cy="150" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="80" cy="150" r="4" fill="#0d2042" />
                <circle cx="77" cy="148" r="1.5" fill="#7dd3fc" opacity="0.6" />
                {/* ARES label */}
                <rect x="76" y="220" width="8" height="70" fill="#ef4444" rx="2" />
                <rect x="68" y="230" width="4" height="50" fill="#ef4444" rx="1" opacity="0.5" />
                {/* Fins */}
                <path d="M42 310 L8 430 L8 400 L42 360 Z" fill="url(#finGrad)" />
                <path d="M118 310 L152 430 L152 400 L118 360 Z" fill="url(#finGrad)" />
                {/* Fin detail lines */}
                <line x1="42" y1="340" x2="15" y2="415" stroke="white" strokeWidth="0.5" opacity="0.3" />
                <line x1="118" y1="340" x2="145" y2="415" stroke="white" strokeWidth="0.5" opacity="0.3" />
                {/* Engine nozzle detail */}
                <ellipse cx="80" cy="455" rx="26" ry="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />

                <defs>
                  <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="40%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                  <linearGradient id="noseGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="finGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Launch pad glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-orange-500/20 blur-2xl rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
