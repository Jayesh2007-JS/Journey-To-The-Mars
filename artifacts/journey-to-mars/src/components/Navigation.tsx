import { Shield } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  sections: { id: string; label: string }[];
}

export function Navigation({ activeSection, sections }: NavigationProps) {
  return (
    <>
      {/* Top Nav Logo */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-background to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center bg-background/50 backdrop-blur">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold tracking-widest text-sm hidden sm:block text-white/90">
            ARES<span className="text-primary">I</span>
          </span>
        </div>
      </header>

      {/* Side Dot Navigation */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={`Scroll to ${section.label}`}
            className="relative group flex items-center justify-end"
          >
            <span 
              className={`absolute right-8 text-xs font-mono font-medium tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeSection === section.id 
                  ? 'opacity-100 text-primary translate-x-0' 
                  : 'opacity-0 text-muted-foreground translate-x-4 group-hover:opacity-60 group-hover:translate-x-2'
              }`}
            >
              {section.label}
            </span>
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-primary shadow-[0_0_12px_rgba(255,90,31,0.8)] scale-125'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/80 scale-100'
              }`}
            />
          </a>
        ))}
      </nav>
    </>
  );
}
