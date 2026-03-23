import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Rocket, Clock, Users, Navigation } from 'lucide-react';

export function LaunchSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.2 });

  const stats = [
    { icon: Navigation, label: "Distance", value: "225M km" },
    { icon: Clock, label: "Duration", value: "7 Months" },
    { icon: Users, label: "Crew", value: "6 Experts" },
    { icon: Rocket, label: "Vehicle", value: "Ares Heavy" },
  ];

  return (
    <section id="launch" className="relative min-h-screen flex items-center py-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Content Side */}
        <div ref={ref} className="space-y-8 z-10">
          <div className={`reveal-left ${isRevealed ? 'is-revealed' : ''}`}>
            <h2 className="text-sm font-mono text-accent tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-accent/50 block"></span>
              Phase 01: Ascend
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Escaping Gravity
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              The Ares Heavy lift vehicle represents the pinnacle of human engineering. Generating over 16 million pounds of thrust, it shatters the bounds of Earth's gravity to propel our crew into the deep unknown.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={i} 
                  className={`glass-panel p-6 rounded-2xl border-l-4 border-l-primary hover:bg-white/10 transition-colors reveal-base ${isRevealed ? 'is-revealed' : ''}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <div className="text-sm font-mono text-muted-foreground uppercase mb-1">{stat.label}</div>
                  <div className="text-2xl font-display font-semibold text-white">{stat.value}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Side */}
        <div className={`relative h-[600px] w-full reveal-right delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,90,31,0.15)] border border-white/5">
            <img 
              src={`${import.meta.env.BASE_URL}images/rocket-launch.png`}
              alt="Rocket Launch"
              className="w-full h-full object-cover object-center animate-float scale-105"
            />
          </div>
          {/* Decorative tech overlay */}
          <div className="absolute top-6 right-6 z-20 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div className="text-xs font-mono text-white/70">REC</div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
