import { useMemo, useEffect, useState } from 'react';

export function StarField() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate deterministic stars to avoid hydration mismatch, though this is client-only.
  const { layer1, layer2, layer3 } = useMemo(() => {
    const generateShadows = (count: number, maxWidth: number, maxHeight: number) => {
      let shadows = '';
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * maxWidth);
        const y = Math.floor(Math.random() * maxHeight);
        shadows += `${x}px ${y}px #FFF${i === count - 1 ? '' : ', '}`;
      }
      return shadows;
    };

    return {
      layer1: generateShadows(150, 2000, 3000), // Small, slow
      layer2: generateShadows(75, 2000, 3000),  // Medium, mid speed
      layer3: generateShadows(35, 2000, 3000),  // Large, fast
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-background">
      {/* Dynamic ambient nebula blobs */}
      <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[100px] mix-blend-screen opacity-50" />
      <div className="absolute top-[60%] right-[10%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[100px] mix-blend-screen opacity-40" />

      {/* Parallax Star Layers */}
      <div 
        className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent rounded-full opacity-40"
        style={{ 
          boxShadow: layer1,
          transform: `translateY(${-scrollY * 0.05}px)`
        }} 
      />
      <div 
        className="absolute top-0 left-0 w-[3px] h-[3px] bg-transparent rounded-full opacity-60"
        style={{ 
          boxShadow: layer2,
          transform: `translateY(${-scrollY * 0.15}px)`
        }} 
      />
      <div 
        className="absolute top-0 left-0 w-[4px] h-[4px] bg-transparent rounded-full opacity-90 shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"
        style={{ 
          boxShadow: layer3,
          transform: `translateY(${-scrollY * 0.3}px)`
        }} 
      />
    </div>
  );
}
