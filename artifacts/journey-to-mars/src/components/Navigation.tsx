import { useEffect, useState } from 'react';

interface NavigationProps {
  activeSection: string;
  sections: { id: string; label: string }[];
}

export function Navigation({ activeSection, sections }: NavigationProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeLabel = sections.find(s => s.id === activeSection)?.label ?? '';

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-white/[0.03]">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #FF5A1F, #FF8C00, #FFD700)',
            boxShadow: '0 0 8px rgba(255,140,0,0.7)',
          }}
        />
      </div>

      {/* Top bar */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'}`} />

        <div className="relative px-6 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 group outline-none"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border border-orange-500/40 bg-black/60 backdrop-blur flex items-center justify-center group-hover:border-orange-500/80 transition-colors">
                <svg width="14" height="16" viewBox="0 0 24 28" fill="none">
                  <path d="M12 1L7 20H17L12 1Z" fill="#FF5A1F"/>
                  <ellipse cx="12" cy="20" rx="5" ry="2" fill="#FF5A1F" opacity="0.5"/>
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full border border-orange-500/20 animate-ping opacity-30" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-black text-sm tracking-[0.2em] text-white group-hover:text-orange-400 transition-colors">
                ARES<span className="text-orange-500">–I</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1 h-1 rounded-full bg-green-400 animate-blink-dot" />
                <span className="text-[8px] font-mono text-green-400/70 tracking-widest">NOMINAL</span>
              </div>
            </div>
          </button>

          {/* Center — active section */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-px h-4 bg-white/10" />
            <span className="text-[10px] font-mono text-white/30 tracking-[0.4em] uppercase transition-all duration-300">
              {activeLabel}
            </span>
            <div className="w-px h-4 bg-white/10" />
          </div>

          {/* Right — mission time */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-widest">
            <div className="w-1 h-1 rounded-full bg-orange-400/60 animate-pulse" />
            MISSION ARES-I
          </div>
        </div>
      </header>

      {/* Side dot nav */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              aria-label={`Go to ${section.label}`}
              className="relative group flex items-center justify-end outline-none"
            >
              {/* Label tooltip */}
              <span className={`absolute right-6 text-[9px] font-mono tracking-wider whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'opacity-100 text-orange-400 translate-x-0'
                  : 'opacity-0 text-white/40 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
              }`}>
                {section.label}
              </span>

              {/* Dot */}
              <div className="relative flex items-center justify-center w-4 h-4">
                {isActive && (
                  <div className="absolute w-4 h-4 rounded-full border border-orange-500/50 animate-ripple" />
                )}
                <div className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-orange-500 shadow-[0_0_8px_rgba(255,90,31,0.9)]'
                    : 'w-1.5 h-1.5 bg-white/15 group-hover:bg-white/50'
                }`} />
              </div>
            </button>
          );
        })}
      </nav>
    </>
  );
}
