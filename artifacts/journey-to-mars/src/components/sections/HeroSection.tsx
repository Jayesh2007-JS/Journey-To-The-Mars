import { ArrowDown } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function HeroSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });

  const scrollToLaunch = () => {
    document.getElementById('launch')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div 
        ref={ref}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        <div className={`reveal-scale ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm text-accent text-sm font-mono tracking-widest font-semibold uppercase">
            Mission 001
          </div>
        </div>

        <h1 className={`text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tighter mb-6 uppercase leading-none reveal-base delay-100 ${isRevealed ? 'is-revealed' : ''}`}>
          <span className="block text-white drop-shadow-lg">Journey to</span>
          <span className="block text-gradient-mars drop-shadow-[0_0_30px_rgba(255,90,31,0.4)]">Mars</span>
        </h1>

        <p className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light reveal-base delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
          Humanity's next great leap. Experience the 225 million kilometer voyage from Earth to the red planet in an immersive interactive mission log.
        </p>

        <button 
          onClick={scrollToLaunch}
          className={`group relative px-8 py-4 bg-primary text-primary-foreground font-display font-bold tracking-widest uppercase rounded-full hover:-translate-y-1 transition-all duration-300 animate-pulse-glow reveal-base delay-300 ${isRevealed ? 'is-revealed' : ''}`}
        >
          <span className="relative z-10 flex items-center gap-3">
            Begin Sequence
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="flex flex-col gap-1 text-xs font-mono text-muted-foreground/60">
          <span>SYS.ON</span>
          <span>ARES.ONLINE</span>
          <span>T-00:00:00</span>
        </div>
      </div>
    </section>
  );
}
