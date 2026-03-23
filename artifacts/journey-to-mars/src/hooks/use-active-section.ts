import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.scrollY;
      let newActiveSection = sectionIds[0];

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          // If we've scrolled past a significant portion of the section
          if (pageYOffset >= offsetTop - window.innerHeight / 2 && 
              pageYOffset < offsetTop + height - window.innerHeight / 2) {
            newActiveSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initially

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}
