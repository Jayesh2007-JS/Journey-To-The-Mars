import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Battery, Wind, Beaker, Radio, ArrowUpRight } from 'lucide-react';

const modules = [
  {
    id: 'power',
    title: 'Kilopower Reactor',
    desc: 'Fission surface power system providing 10 kW of continuous electrical power regardless of dust storms.',
    icon: Battery,
    color: 'text-yellow-400',
    border: 'border-yellow-400/50'
  },
  {
    id: 'life',
    title: 'ECLSS Habitat',
    desc: 'Closed-loop environmental control and life support. Recycles 98% of water and generates O2 from CO2.',
    icon: Wind,
    color: 'text-green-400',
    border: 'border-green-400/50'
  },
  {
    id: 'science',
    title: 'Astrobiology Lab',
    desc: 'Pressurized module dedicated to analyzing regolith core samples for microbial biosignatures.',
    icon: Beaker,
    color: 'text-accent',
    border: 'border-accent/50'
  },
  {
    id: 'comms',
    title: 'Deep Space Array',
    desc: 'High-bandwidth optical communications terminal linking the Mars base directly to Earth.',
    icon: Radio,
    color: 'text-purple-400',
    border: 'border-purple-400/50'
  }
];

export function ExplorationSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="exploration" className="relative min-h-screen py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div ref={ref} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className={`reveal-left ${isRevealed ? 'is-revealed' : ''}`}>
            <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">Phase 04: Survive</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Base Operations</h3>
            <p className="text-muted-foreground max-w-xl text-lg">
              Interact with the deployed habitat modules to explore the infrastructure keeping humanity alive on a hostile world.
            </p>
          </div>
          <div className={`reveal-right delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-white/70">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div 
                key={mod.id}
                className={`group relative glass-panel p-8 rounded-3xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 reveal-base ${isRevealed ? 'is-revealed' : ''}`}
                style={{ transitionDelay: `${200 + idx * 100}ms` }}
              >
                {/* Background glow on hover */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 transition-opacity duration-500 ${mod.color}`} />
                
                <div className="flex justify-between items-start mb-12">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border bg-background/50 backdrop-blur-sm ${mod.border}`}>
                    <Icon className={`w-7 h-7 ${mod.color}`} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <h4 className="text-2xl font-display font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                  {mod.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {mod.desc}
                </p>

                {/* Decorative UI line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 group-hover:bg-white/10 transition-colors">
                  <div className={`h-full w-0 group-hover:w-full transition-all duration-700 ease-out bg-current ${mod.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer block */}
        <div className="mt-32 text-center border-t border-white/10 pt-16">
          <h1 className="text-3xl font-display font-bold text-white/40 mb-4">ARES MISSION ARCHIVE</h1>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            END OF TRANSMISSION
          </p>
        </div>
      </div>
    </section>
  );
}
