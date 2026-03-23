import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal({ 
  threshold = 0.1, 
  rootMargin = '0px',
  triggerOnce = true 
}: UseScrollRevealProps = {}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isRevealed };
}
