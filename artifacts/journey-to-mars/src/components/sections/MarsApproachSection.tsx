import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function MarsApproachSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.3);
  const [countdown, setCountdown] = useState(263); // 4:23
  const [typedText, setTypedText] = useState("");

  const fullText = "MISSION CONTROL — HOUSTON";

  // Parallax Zoom Effect tied to section scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the section we have scrolled (0 to 1)
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = 1 - (rect.bottom / (windowHeight + rect.height));
        // Map progress (0 to 1) to a zoom scale (0.3 to 1.2)
        const currentZoom = 0.3 + Math.max(0, progress * 0.9);
        setZoom(currentZoom);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isRevealed && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRevealed, countdown]);

  // Typing effect
  useEffect(() => {
    if (isRevealed) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRevealed]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `00:${m}:${s}`;
  };

  return (
    <section id="approach" ref={sectionRef} className="relative min-h-[200vh] flex items-center justify-center px-6 overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/20 pointer-events-none z-0" />

      {/* Sticky Container for the visual */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Trajectory Arc */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-60">
          <svg viewBox="0 0 1000 1000" className="w-full max-w-[1500px]">
            <path 
              id="trajectory"
              d="M-100,200 Q400,100 800,500" 
              fill="none" 
              stroke="#00d2ff" 
              strokeWidth="2" 
              strokeDasharray="10 10" 
            />
            {/* Spacecraft Dot moving on arc based on zoom/scroll */}
            <circle r="6" fill="#fff" className="shadow-[0_0_10px_#fff]">
               <animateMotion dur="10s" repeatCount="indefinite" path="M-100,200 Q400,100 800,500" />
            </circle>
          </svg>
        </div>

        {/* Pure CSS Mars Planet Container */}
        <div className="relative z-20 flex items-center justify-center">
          {/* Atmosphere Glow */}
          <div 
            className="absolute rounded-full blur-sm"
            style={{ 
              transform: `scale(${zoom})`,
              width: '620px',
              height: '620px',
              background: 'radial-gradient(circle, rgba(255,100,30,0.15) 0%, transparent 70%)',
            }}
          />

          <div 
            className="relative rounded-full transition-transform duration-100 ease-out z-20 animate-[spin-slow_60s_linear_infinite] overflow-hidden"
            style={{ 
              transform: `scale(${zoom})`,
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle at 30% 30%, #C1440E, #6B1F0A)',
              boxShadow: `
                inset -40px -40px 100px rgba(0,0,0,0.9),
                0 0 80px 40px rgba(193, 68, 14, 0.3),
                0 0 0 2px rgba(255, 150, 50, 0.2)
              `
            }}
          >
            {/* Surface Line Texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(0,0,0,1) 0deg 10deg, transparent 10deg 20deg)' }} />

            {/* Subtle Terrain Textures via multiple box shadows */}
            <div className="absolute inset-0 rounded-full opacity-30" style={{
              background: 'transparent',
              boxShadow: `
                20px 40px 30px #8B2500,
                -50px 80px 40px #501000,
                80px -20px 50px #A03000,
                -30px -60px 40px #400800
              `
            }} />

            {/* Dust Storm Band */}
            <div className="absolute top-1/2 left-0 w-[150%] h-[15%] bg-[#d48a55]/20 blur-md rounded-[100%] animate-[rover-drive_8s_linear_infinite]" />
            
            {/* Polar Ice Cap */}
            <div className="absolute top-[5%] left-[40%] w-[20%] h-[10%] bg-white/80 rounded-full blur-[2px] transform -rotate-12" />
            
            {/* Additional craters */}
            <div className="absolute top-[30%] left-[60%] w-[15%] h-[15%] rounded-full border-t border-black/30 border-b border-white/10" />
            <div className="absolute top-[60%] left-[20%] w-[25%] h-[20%] rounded-full border-t border-black/40 border-b border-white/5" />

            {/* Olympus Mons Silhouette */}
            <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[40%] h-[10%]">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full text-[#4a1500] opacity-80">
                <path d="M0,20 L20,15 L35,5 L50,0 L65,5 L80,15 L100,20 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating UI Elements */}
        <div ref={ref} className="absolute inset-0 pointer-events-none z-30">
          <div className="max-w-7xl mx-auto h-full relative">
            
            <div className={`absolute top-1/4 left-6 md:left-24 glass-panel p-6 rounded-xl border-l-4 border-l-red-500 reveal-left ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="text-xs font-mono text-red-400 mb-2 animate-pulse">WARNING</div>
              <div className="text-sm font-mono text-muted-foreground">ATMOSPHERIC ENTRY IN</div>
              <div className={`text-3xl font-display font-bold tabular-nums ${countdown < 30 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{formatCountdown(countdown)}</div>
            </div>
            
            <div className={`absolute bottom-1/4 right-6 md:right-24 glass-panel p-6 rounded-xl text-right reveal-right delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-xs font-mono text-primary mb-1">ENTRY ANGLE</div>
                  <div className="text-2xl font-display font-bold text-white">15.5&deg;</div>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div>
                  <div className="text-xs font-mono text-accent mb-1">VELOCITY</div>
                  <div className="text-2xl font-display font-bold text-white">5.5 <span className="text-sm text-muted-foreground">km/s</span></div>
                </div>
              </div>
            </div>

            {/* Typing text at the bottom */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-sm font-mono text-white/50 tracking-widest">
              {typedText}
              <span className="inline-block w-2 h-4 bg-white/50 ml-1 animate-[type-cursor_0.8s_infinite]" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
