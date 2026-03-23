import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useCanvasParticles } from '@/hooks/use-canvas-particles';

export function LaunchSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.2 });
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [altitude, setAltitude] = useState(0);
  const [thrust, setThrust] = useState(0);
  const [stageSep, setStageSep] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Monitor scroll for stage separation and visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const visible = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(visible);

      if (visible) {
        const progress = Math.max(0, Math.min(1, 1 - (rect.bottom / (windowHeight + rect.height))));
        if (progress > 0.5 && !stageSep) {
          setStageSep(true);
        } else if (progress < 0.5 && stageSep) {
          setStageSep(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stageSep]);

  // Animate stats when revealed
  useEffect(() => {
    if (isRevealed) {
      const duration = 3000;
      const startTime = Date.now();
      
      const animateStats = () => {
        const now = Date.now();
        const progress = Math.min(1, (now - startTime) / duration);
        
        setAltitude(Math.floor(progress * 150));
        setThrust(Math.floor(progress * 16));
        
        if (progress < 1) {
          requestAnimationFrame(animateStats);
        }
      };
      
      requestAnimationFrame(animateStats);
    }
  }, [isRevealed]);

  // Rocket exhaust particle system
  const exhaustCanvasRef = useCanvasParticles({
    isActive: isVisible,
    spawnRate: 10,
    createParticle: (ctx, w, h) => ({
      x: w * 0.75 + (Math.random() - 0.5) * 20, // Middle-right, under rocket
      y: h * 0.6,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 5 + 5,
      size: Math.random() * 3 + 1,
      color: ['#FF6B35', '#FFD700', '#FF4500', '#FFFFFF'][Math.floor(Math.random() * 4)],
      life: 0,
      maxLife: Math.random() * 50 + 30,
      opacity: 1
    }),
    updateParticle: (p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      p.opacity = 1 - (p.life / p.maxLife);
      return p.life < p.maxLife;
    },
    drawParticle: (p, ctx) => {
      ctx.globalAlpha = p.opacity || 1;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Shockwave particle system
  const shockwaveCanvasRef = useCanvasParticles({
    isActive: isVisible,
    spawnRate: 0.1, // Spawns occasionally
    createParticle: (ctx, w, h) => ({
      x: w * 0.75,
      y: h * 0.6,
      vx: 0,
      vy: 0,
      size: 10,
      color: 'rgba(255, 255, 255, 0.1)',
      life: 0,
      maxLife: 60,
      opacity: 1
    }),
    updateParticle: (p) => {
      p.size += 5; // Expand ring
      p.life++;
      p.opacity = 1 - (p.life / p.maxLife);
      return p.life < p.maxLife;
    },
    drawParticle: (p, ctx) => {
      ctx.globalAlpha = p.opacity || 1;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  return (
    <section id="launch" ref={sectionRef} className="relative min-h-[150vh] flex flex-col justify-center py-20 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-background to-background z-0 pointer-events-none" />
      
      {/* Canvases for particles */}
      <canvas ref={exhaustCanvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />
      <canvas ref={shockwaveCanvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

      {/* Stage Separation Overlay */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${stageSep ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-red-500 font-display font-black text-6xl md:text-8xl tracking-widest uppercase border-4 border-red-500 p-8 bg-red-500/10 backdrop-blur-sm animate-pulse">
          Stage Sep
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center sticky top-1/4 z-20">
        
        {/* Content Side */}
        <div ref={ref} className="space-y-8">
          <div className={`reveal-left ${isRevealed ? 'is-revealed' : ''}`}>
            <h2 className="text-sm font-mono text-accent tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-accent/50 block"></span>
              Phase 01: Ascend
            </h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
              Escaping Gravity
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              The Ares Heavy lift vehicle represents the pinnacle of human engineering. Generating over 16 million pounds of thrust, it shatters the bounds of Earth's gravity to propel our crew into the deep unknown.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className={`glass-panel p-6 rounded-2xl border-l-4 border-l-primary hover:bg-white/10 transition-colors reveal-base ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="text-sm font-mono text-muted-foreground uppercase mb-1">Altitude</div>
              <div className="text-4xl font-display font-semibold text-white tabular-nums">
                {altitude.toString().padStart(3, '0')} <span className="text-xl text-muted-foreground">km</span>
              </div>
            </div>
            
            <div className={`glass-panel p-6 rounded-2xl border-l-4 border-l-accent hover:bg-white/10 transition-colors reveal-base delay-100 ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="text-sm font-mono text-muted-foreground uppercase mb-1">Thrust</div>
              <div className="text-4xl font-display font-semibold text-white tabular-nums">
                {thrust.toString().padStart(2, '0')} <span className="text-xl text-muted-foreground">M lbs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Side (Stylized Rocket SVG) */}
        <div className={`relative h-[600px] w-full reveal-right delay-200 flex justify-center items-center ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="animate-rocket-shake relative z-20">
            <svg width="120" height="400" viewBox="0 0 120 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main Body */}
              <path d="M60 0C60 0 30 50 30 150V320H90V150C90 50 60 0 60 0Z" fill="#e2e8f0" />
              {/* Nose Cone Tip */}
              <path d="M60 0C60 0 45 25 40 60H80C75 25 60 0 60 0Z" fill="#1e293b" />
              {/* Windows */}
              <circle cx="60" cy="100" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="60" cy="140" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              {/* Fins */}
              <path d="M30 250L0 350V320L30 290V250Z" fill="#cbd5e1" />
              <path d="M90 250L120 350V320L90 290V250Z" fill="#cbd5e1" />
              {/* Engine Nozzle */}
              <path d="M40 320H80L90 350H30L40 320Z" fill="#475569" />
              {/* Decal */}
              <rect x="55" y="180" width="10" height="80" fill="#ef4444" />
            </svg>
          </div>
        </div>
        
      </div>
    </section>
  );
}
