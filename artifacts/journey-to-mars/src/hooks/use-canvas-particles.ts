import { useEffect, useRef } from 'react';

export interface ParticleConfig {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  opacity?: number;
}

export interface CanvasParticlesConfig {
  isActive: boolean;
  spawnRate: number;
  createParticle: (ctx: CanvasRenderingContext2D, width: number, height: number) => ParticleConfig;
  updateParticle: (p: ParticleConfig, ctx: CanvasRenderingContext2D, width: number, height: number) => boolean;
  drawParticle: (p: ParticleConfig, ctx: CanvasRenderingContext2D) => void;
  clearColor?: string;
}

export function useCanvasParticles(config: CanvasParticlesConfig) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ParticleConfig[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      if (config.clearColor) {
        ctx.fillStyle = config.clearColor;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      if (config.isActive) {
        const rate = config.spawnRate;
        const whole = Math.floor(rate);
        const frac = rate - whole;
        const count = whole + (Math.random() < frac ? 1 : 0);
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(config.createParticle(ctx, width, height));
        }
      }

      particlesRef.current = particlesRef.current.filter(p => {
        const keep = config.updateParticle(p, ctx, width, height);
        if (keep) {
          config.drawParticle(p, ctx);
        }
        return keep;
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [config]);

  return canvasRef;
}
