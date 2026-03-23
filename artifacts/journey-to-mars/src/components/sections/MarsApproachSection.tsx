import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function MarsApproachSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  // Parallax Zoom Effect tied to section scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the section we have scrolled (0 to 1)
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = 1 - (rect.bottom / (windowHeight + rect.height));
        // Map progress (0 to 1) to a zoom scale (0.8 to 1.8)
        const currentZoom = 0.8 + Math.max(0, progress * 1.0);
        setZoom(currentZoom);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="approach" ref={sectionRef} className="relative min-h-[150vh] flex items-center justify-center px-6 overflow-hidden">
      
      {/* Sticky Container for the visual */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Orbital SVG paths */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <svg viewBox="0 0 800 800" className="w-full max-w-[1200px] animate-spin-slow">
            <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="400" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 12" />
            <circle cx="400" cy="100" r="4" fill="#00d2ff" />
          </svg>
        </div>

        {/* Mars Planet */}
        <div 
          className="relative rounded-full shadow-[0_0_150px_rgba(255,90,31,0.3)] transition-transform duration-75 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/mars-planet.png`}
            alt="Mars"
            className="w-[40vw] min-w-[300px] max-w-[800px] object-cover rounded-full"
          />
          {/* Atmospheric Glow Overlay */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,transparent_40%,rgba(0,0,0,0.8)_90%)] pointer-events-none" />
        </div>

        {/* Floating UI Elements */}
        <div ref={ref} className="absolute inset-0 pointer-events-none">
          <div className="max-w-7xl mx-auto h-full relative">
            <div className={`absolute top-1/4 left-6 md:left-24 glass-panel p-4 rounded-lg reveal-left ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="text-xs font-mono text-accent mb-1">DATA LINK ACTIVE</div>
              <div className="text-xl font-display font-bold">Orbital Insertion</div>
            </div>
            
            <div className={`absolute bottom-1/4 right-6 md:right-24 glass-panel p-4 rounded-lg text-right reveal-right delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="text-xs font-mono text-primary mb-1">ALTITUDE</div>
              <div className="text-xl font-display font-bold">400.0 KM</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
