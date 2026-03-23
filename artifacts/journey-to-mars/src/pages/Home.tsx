import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { StarField } from "@/components/StarField";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { LaunchSection } from "@/components/sections/LaunchSection";
import { SpaceTravelSection } from "@/components/sections/SpaceTravelSection";
import { MarsApproachSection } from "@/components/sections/MarsApproachSection";
import { LandingSection } from "@/components/sections/LandingSection";
import { ExplorationSection } from "@/components/sections/ExplorationSection";
import { useActiveSection } from "@/hooks/use-active-section";

const SECTIONS = [
  { id: 'hero', label: '00 Overview' },
  { id: 'launch', label: '01 Ascend' },
  { id: 'travel', label: '02 Transit' },
  { id: 'approach', label: '03 Approach' },
  { id: 'landing', label: '04 Touchdown' },
  { id: 'exploration', label: '05 Survive' }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const activeSection = useActiveSection(SECTIONS.map(s => s.id));

  // Lock scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, 0); // Start at top when loaded
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <main className="relative bg-background min-h-screen text-foreground selection:bg-primary/30">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <StarField />
      
      <Navigation activeSection={activeSection} sections={SECTIONS} />

      {/* Pages / Sections */}
      <HeroSection />
      <LaunchSection />
      <SpaceTravelSection />
      <MarsApproachSection />
      <LandingSection />
      <ExplorationSection />
    </main>
  );
}
