import { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIATING SYSTEMS...");
  const [isTakingOff, setIsTakingOff] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const totalDuration = 3500; // 3.5 seconds
    const intervalTime = 35;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(currentProgress);

      if (currentProgress < 30) setStatus("CALIBRATING GUIDANCE...");
      else if (currentProgress < 60) setStatus("PRESSURIZING TANKS...");
      else if (currentProgress < 90) setStatus("IGNITION SEQUENCE START...");
      else if (currentProgress === 100) setStatus("LIFT OFF");

      if (currentProgress === 100) {
        clearInterval(timer);
        setIsTakingOff(true);
        
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(onComplete, 800); // Wait for fade out
        }, 1000); // Wait for take off animation
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,90,255,0.1)_0%,rgba(0,0,0,0)_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8">
        {/* Rocket Icon */}
        <div className="relative h-32 flex items-end mb-8">
          <div 
            className={`transition-all duration-1000 ease-in-out ${
              isTakingOff ? '-translate-y-[50vh]' : 'animate-rocket-shake'
            }`}
          >
            <Rocket className="w-16 h-16 text-primary" strokeWidth={1.5} />
            {/* Exhaust */}
            <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-yellow-400 to-transparent rounded-full blur-[2px] animate-exhaust ${isTakingOff ? 'h-24' : ''}`} />
          </div>
        </div>

        {/* Status Text */}
        <h2 className="font-display text-xl text-primary mb-4 tracking-widest h-8 text-center uppercase">
          {status}
        </h2>

        {/* Progress Bar Container */}
        <div className="w-full h-2 bg-border rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-primary transition-all duration-75 ease-linear rounded-full shadow-[0_0_10px_rgba(255,90,31,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 flex justify-between w-full text-xs text-muted-foreground font-mono">
          <span>T-MINUS</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
