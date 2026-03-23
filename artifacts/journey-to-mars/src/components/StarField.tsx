import { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  color: string;
  zDepth: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Parallax tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight * 2; // Extra height for scrolling

    const stars: Star[] = [];
    const colors = ['#ffffff', '#e0f0ff', '#fff0e0'];
    
    // Generate static stars
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        zDepth: Math.floor(Math.random() * 3) + 1, // 1 to 3
      });
    }

    let shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Starfield tint based on scroll
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollRatio = docHeight > 0 ? window.scrollY / docHeight : 0;
      const redTint = Math.floor(scrollRatio * 80);
      
      // Draw Stars
      stars.forEach(star => {
        const parallaxY = (star.y - window.scrollY * (0.1 * star.zDepth)) % height;
        const adjustedY = parallaxY < 0 ? parallaxY + height : parallaxY;

        ctx.globalAlpha = star.brightness * (0.5 + Math.sin(time * 0.001 * star.zDepth) * 0.5);
        ctx.fillStyle = star.color;
        
        if (redTint > 0 && star.color === '#ffffff') {
          ctx.fillStyle = `rgb(255, ${255 - redTint}, ${255 - redTint})`;
        }

        ctx.beginPath();
        ctx.arc(star.x, adjustedY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn Shooting Stars
      if (time - lastShootingStarTime > 3000 + Math.random() * 2000) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height / 2), // Start higher up
          vx: (Math.random() - 0.5) * 10 + 10, // Move right generally
          vy: Math.random() * 5 + 5, // Move down
          length: Math.random() * 80 + 40,
          opacity: 1,
          life: 0,
          maxLife: 60 + Math.random() * 40
        });
        lastShootingStarTime = time;
      }

      // Draw Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.opacity = 1 - (ss.life / ss.maxLife);

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
          continue;
        }

        const gradient = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * 2, ss.y - ss.vy * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * ss.length / 10, ss.y - ss.vy * ss.length / 10);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight * 2;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-background">
      {/* Ambient nebulas */}
      <div 
        className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen transition-transform duration-[20s] translate-x-4" 
        style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
      />
      <div 
        className="absolute top-[60%] right-[10%] w-[30vw] h-[30vw] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen transition-transform duration-[25s] -translate-x-4" 
        style={{ transform: `translateY(${-scrollY * 0.08}px)` }}
      />
      
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute inset-0" 
      />
    </div>
  );
}
