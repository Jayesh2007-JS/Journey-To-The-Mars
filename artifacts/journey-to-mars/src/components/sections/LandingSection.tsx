import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useCanvasParticles } from '@/hooks/use-canvas-particles';
import { ShieldCheck } from 'lucide-react';

const landingEvents = [
  "EDL SEQUENCE INITIATED",
  "CHUTE DEPLOYED — MACH 1.7",
  "HEAT SHIELD JETTISONED",
  "LANDING CONFIRMED — JEZERO CRATER"
];

export function LandingSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.3 });
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [events, setEvents] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [missionTime, setMissionTime] = useState(0);

  // Screen shake and event sequence
  useEffect(() => {
    if (isRevealed) {
      setShake(true);
      setTimeout(() => setShake(false), 500);

      // Trigger events one by one
      landingEvents.forEach((event, index) => {
        setTimeout(() => {
          setEvents(prev => [...prev, event]);
        }, (index + 1) * 1000);
      });
    }
  }, [isRevealed]);

  // Mission Elapsed Time Counter
  useEffect(() => {
    if (events.length === landingEvents.length) {
      const interval = setInterval(() => {
        setMissionTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [events.length]);

  // Martian dust particle system
  const dustCanvasRef = useCanvasParticles({
    isActive: isRevealed,
    spawnRate: 20,
    createParticle: (ctx, w, h) => ({
      x: Math.random() * w,
      y: h + 10, // Spawn from below
      vx: (Math.random() - 0.5) * 4,
      vy: -(Math.random() * 8 + 2), // Move up
      size: Math.random() * 4 + 1,
      color: ['#c1440e', '#e77d11', '#fda600', '#a03300'][Math.floor(Math.random() * 4)],
      life: 0,
      maxLife: Math.random() * 100 + 50,
      opacity: 0.8
    }),
    updateParticle: (p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      p.opacity = 0.8 * (1 - (p.life / p.maxLife));
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="landing" ref={sectionRef} className={`relative min-h-screen flex items-center px-6 overflow-hidden ${shake ? 'animate-shake' : ''}`}>
      
      {/* Dust Particles Canvas */}
      <canvas ref={dustCanvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none mix-blend-screen opacity-50" />

      {/* Radial Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)]" />

      {/* Mars Surface Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/mars-surface.png`}
          alt="Mars Surface"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      </div>

      <div ref={ref} className="relative z-20 max-w-5xl mx-auto w-full text-center">
        
        {/* 7 Minutes of Terror header */}
        <div className={`inline-block mb-12 border-2 border-red-500/50 bg-red-500/10 px-6 py-2 rounded animate-pulse reveal-base ${isRevealed ? 'is-revealed' : ''}`}>
          <h3 className="text-red-500 font-display font-bold text-2xl tracking-widest uppercase">7 Minutes of Terror</h3>
        </div>

        {/* Typing Terminal Events with Scanline */}
        <div className="relative overflow-hidden max-w-2xl mx-auto text-left mb-16 font-mono text-sm md:text-base space-y-2 bg-black/60 p-6 rounded-lg border border-green-500/30 backdrop-blur-md min-h-[160px] shadow-[0_0_20px_rgba(0,255,0,0.1)]">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-500/10 to-transparent w-full h-[50px] animate-[scan-line_2s_linear_infinite]" />
          
          {events.map((event, i) => (
            <div key={i} className="text-green-400 flex items-start gap-3 animate-in slide-in-from-left-4 fade-in duration-300">
              <span className="text-white mt-1">&#10003;</span>
              <span>{event}</span>
            </div>
          ))}
          {events.length < landingEvents.length && isRevealed && (
            <div className="text-green-400 flex items-center gap-2">
              <span className="w-2 h-4 bg-green-400 animate-[type-cursor_0.8s_infinite]" />
            </div>
          )}
        </div>

        {/* Touchdown Giant Text */}
        <div className={`transition-all duration-1000 transform ${events.length === landingEvents.length ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mb-6 uppercase animate-[glitch_2s_ease-out_1]">
            Touchdown
          </h2>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-green-500 bg-green-500/20 text-green-400 mb-8 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-mono text-lg font-bold tracking-widest uppercase">Confirmed</span>
          </div>

          <div className="flex flex-col items-center justify-center mb-16 space-y-4">
             <div className="text-xs font-mono text-white/50 tracking-widest uppercase">Mission Elapsed Time</div>
             <div className="text-4xl font-mono text-white font-bold tracking-widest">{formatTime(missionTime)}</div>
             
             {/* Signal Waveforms */}
             <div className="flex items-end gap-1 h-8 mt-2">
               <div className="w-2 bg-green-500 rounded-t-sm animate-[data-bar_1s_ease-in-out_infinite]" />
               <div className="w-2 bg-green-500 rounded-t-sm animate-[data-bar_0.8s_ease-in-out_infinite_0.2s]" />
               <div className="w-2 bg-green-500 rounded-t-sm animate-[data-bar_1.2s_ease-in-out_infinite_0.4s]" />
             </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-opacity duration-1000 ${events.length === landingEvents.length ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { label: 'Surface Temp', val: '-60°C' },
            { label: 'Pressure', val: '6.1 mbar' },
            { label: 'Gravity', val: '3.72 m/s²' },
            { label: 'Wind Spd', val: '12 km/h' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="text-xs font-mono text-muted-foreground uppercase mb-1">{stat.label}</div>
              <div className="text-lg font-display text-white font-medium">{stat.val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
