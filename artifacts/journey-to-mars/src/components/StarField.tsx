import { useEffect, useRef } from 'react';

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Static stars — no parallax, no color shifts, just white twinkle
    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.001 + 0.0003,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      for (const s of stars) {
        s.x = Math.random() * W;
        s.y = Math.random() * H;
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #0d0a1a 0%, #050810 50%, #020408 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
