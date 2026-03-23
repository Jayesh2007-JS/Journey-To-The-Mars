import { useEffect, useState } from 'react';
import { ArrowDown, Users, Navigation, Clock, Rocket, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function HeroSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const [missionTime, setMissionTime] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setMissionTime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `T+${h}:${m}:${s}`;
  };

  const scrollToLaunch = () => {
    document.getElementById('launch')?.scrollIntoView({ behavior: 'smooth' });
  };

  const badges = [
    { label: "CREW 6", icon: Users },
    { label: "225M KM", icon: Navigation },
    { label: "7 MONTHS", icon: Clock },
    { label: "LAUNCH READY", icon: Rocket }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
      {/* Radar Sweep Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[150vh] md:h-[150vh] rounded-full border border-accent/10 z-0">
        <div 
          className="absolute inset-0 rounded-full animate-radar-rotate"
          style={{ background: 'conic-gradient(from 0deg, rgba(0,210,255,0) 0deg, rgba(0,210,255,0) 270deg, rgba(0,210,255,0.05) 350deg, rgba(0,210,255,0.4) 360deg)' }}
        />
      </div>

      {/* Horizontal Scan Line */}
      <div className="absolute left-0 right-0 h-[2px] bg-accent/50 shadow-[0_0_10px_rgba(0,210,255,0.8)] z-50 pointer-events-none animate-scan-sweep" style={{ top: 0 }} />

      {/* 4 Corner Readouts */}
      <div className="absolute top-6 left-6 text-green-400 font-mono text-[10px] tracking-widest z-20 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-blink-dot" />
        SYS.NOMINAL
      </div>
      <div className="absolute top-6 right-6 text-green-400 font-mono text-[10px] tracking-widest z-20 text-right">
        FUEL 100%
      </div>
      <div className="absolute bottom-6 left-6 text-green-400 font-mono text-[10px] tracking-widest z-20">
        CREW: 6/6
      </div>
      <div className="absolute bottom-6 right-6 text-green-400 font-mono text-[10px] tracking-widest z-20 text-right">
        ORBIT ALT: 408 KM
      </div>

      <div 
        ref={ref}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto flex-grow justify-center"
      >
        <div className={`reveal-scale ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm text-accent text-sm font-mono tracking-widest font-semibold uppercase relative overflow-hidden group">
            <span className="relative z-10">Mission ARES-I &bull; {formatTime(missionTime)}</span>
            <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </div>
        </div>

        <h1 className={`text-7xl sm:text-8xl md:text-[10rem] font-display font-black tracking-tighter mb-2 uppercase leading-[0.8] reveal-base delay-100 ${isRevealed ? 'is-revealed' : ''}`}>
          <span className="block text-white drop-shadow-lg text-glow-cyan animate-[glitch_8s_infinite]">Journey To</span>
          <span className="block text-gradient-mars text-glow-orange pb-4">Mars</span>
        </h1>

        <div className={`flex flex-wrap justify-center gap-4 my-12 reveal-base delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-md bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow">
              <badge.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-white/90">{badge.label}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={scrollToLaunch}
          className={`group relative px-8 py-4 bg-primary text-primary-foreground font-display font-bold tracking-widest uppercase rounded-full hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(255,90,31,0.6)] hover:shadow-[0_0_40px_rgba(255,90,31,0.8)] reveal-base delay-300 ${isRevealed ? 'is-revealed' : ''}`}
        >
          <span className="relative z-10 flex items-center gap-3">
            Begin Sequence
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </span>
        </button>

        {/* Scroll Indicator */}
        <div className={`mt-16 flex flex-col items-center gap-2 text-white/50 reveal-base delay-500 ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      {/* Giant orbit ring at the bottom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[90vw] md:h-[90vw] rounded-full border border-dashed border-white/20 animate-[spin-slow_120s_linear_infinite] pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
      </div>
    </section>
  );
}
