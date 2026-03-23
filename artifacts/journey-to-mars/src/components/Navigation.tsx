import { useEffect, useState } from 'react';

interface NavigationProps {
  activeSection: string;
  sections: { id: string; label: string }[];
}

export function Navigation({ activeSection, sections }: NavigationProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top bar — logo + mission progress */}
      <header className="fixed top-0 left-0 w-full z-40 pointer-events-none">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-accent via-primary to-orange-400 transition-all duration-150 shadow-[0_0_8px_rgba(255,140,0,0.6)]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="px-6 py-5 flex justify-between items-center bg-gradient-to-b from-background/90 to-transparent backdrop-blur-[2px]">
          {/* Logo */}
          <div className="flex items-center gap-3 pointer-events-auto cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-full border border-primary/40 bg-background/80 backdrop-blur flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L8 18H16L12 2Z" fill="currentColor" className="text-primary" />
                  <ellipse cx="12" cy="18" rx="4" ry="2" fill="currentColor" className="text-primary/60" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
            </div>
            <div>
              <span className="font-display font-black tracking-widest text-sm text-white hidden sm:block">
                ARES<span className="text-primary">–I</span>
              </span>
              <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-blink-dot" />
                <span className="text-[9px] font-mono text-green-400/80 tracking-widest">NOMINAL</span>
              </div>
            </div>
          </div>

          {/* Section label */}
          <div className="hidden md:block pointer-events-none">
            <span className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase">
              {sections.find(s => s.id === activeSection)?.label ?? ''}
            </span>
          </div>
        </div>
      </header>

      {/* Side dot nav */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              aria-label={`Go to ${section.label}`}
              className="relative group flex items-center justify-end outline-none"
            >
              {/* Label */}
              <span
                className={`absolute right-6 text-[10px] font-mono tracking-wider whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 text-primary translate-x-0'
                    : 'opacity-0 text-muted-foreground translate-x-3 group-hover:opacity-70 group-hover:translate-x-0'
                }`}
              >
                {section.label}
              </span>

              {/* Dot */}
              <div className="relative flex items-center justify-center">
                {isActive && (
                  <div className="absolute w-5 h-5 rounded-full border border-primary/40 animate-ripple" />
                )}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3 h-3 bg-primary shadow-[0_0_10px_rgba(255,90,31,0.9)]'
                      : 'w-2 h-2 bg-white/20 group-hover:bg-white/60'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>
    </>
  );
}
