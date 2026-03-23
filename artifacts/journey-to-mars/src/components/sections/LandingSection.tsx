import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Target, Activity } from 'lucide-react';

export function LandingSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.3 });

  return (
    <section id="landing" className="relative min-h-screen flex items-center px-6 overflow-hidden">
      {/* Mars Surface Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/mars-surface.png`}
          alt="Mars Surface"
          className="w-full h-full object-cover object-bottom"
        />
        {/* Gradients to blend sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
        {/* Dust overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] animate-dust pointer-events-none" />
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 mb-8 reveal-base ${isRevealed ? 'is-revealed' : ''}`}>
          <Activity className="w-5 h-5 animate-pulse" />
          <span className="font-mono text-sm font-semibold tracking-widest uppercase">Telemetry Nominal</span>
        </div>

        <h2 className={`text-6xl md:text-8xl lg:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mb-6 uppercase reveal-scale delay-100 ${isRevealed ? 'is-revealed' : ''}`}>
          Touchdown
        </h2>
        
        <p className={`text-xl md:text-3xl text-primary/90 font-light tracking-wide mb-16 reveal-base delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
          "Jezero Crater base established. The new era begins."
        </p>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto reveal-base delay-300 ${isRevealed ? 'is-revealed' : ''}`}>
          {[
            { label: 'Surface Temp', val: '-60°C' },
            { label: 'Pressure', val: '6.1 mbar' },
            { label: 'Gravity', val: '3.72 m/s²' },
            { label: 'Wind Spd', val: '12 km/h' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 backdrop-blur-md">
              <div className="text-xs font-mono text-muted-foreground uppercase mb-1">{stat.label}</div>
              <div className="text-lg font-display text-white font-medium">{stat.val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
