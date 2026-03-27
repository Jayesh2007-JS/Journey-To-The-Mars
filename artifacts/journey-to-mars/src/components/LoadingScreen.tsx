import { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_SEQUENCE = [
  { at: 0,   msg: "ARES-I FLIGHT COMPUTER ONLINE" },
  { at: 8,   msg: "LOADING NAVIGATION SYSTEMS..." },
  { at: 18,  msg: "GYROSCOPE CALIBRATION: OK" },
  { at: 28,  msg: "FUEL CELL PRESSURE: 3,400 PSI ✓" },
  { at: 38,  msg: "CREW LIFE SUPPORT: NOMINAL" },
  { at: 50,  msg: "COMMS LINK TO HOUSTON: ESTABLISHED" },
  { at: 62,  msg: "TRAJECTORY LOCK: MARS TRANSFER ORBIT" },
  { at: 74,  msg: "IGNITION SEQUENCE ARMED" },
  { at: 88,  msg: "ALL SYSTEMS GO — LAUNCH IMMINENT" },
  { at: 100, msg: "▶  LIFT OFF" },
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isTakingOff, setIsTakingOff] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalDuration = 4000;
    const intervalTime = 40;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const p = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(p);

      // Countdown from 10 to 0
      const cd = Math.max(0, 10 - Math.floor(p / 10));
      setCountdown(cd);

      // Append log lines at thresholds
      const entry = BOOT_SEQUENCE.find(e => e.at === p);
      if (entry) setLogs(prev => [...prev, entry.msg]);

      if (p === 100) {
        clearInterval(timer);
        setIsTakingOff(true);
        setTimeout(() => { setIsFadingOut(true); setTimeout(onComplete, 700); }, 1200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#020810] flex flex-col items-center justify-center transition-opacity duration-700 ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)' }} />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-20 w-full max-w-2xl px-8 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className={`transition-all duration-1000 ${isTakingOff ? '-translate-y-[60vh] scale-50 opacity-0' : ''}`}>
            <svg width="64" height="80" viewBox="0 0 64 80" fill="none" className="drop-shadow-[0_0_20px_rgba(255,90,31,0.6)]">
              <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#64748b"/><stop offset="50%" stopColor="#e2e8f0"/><stop offset="100%" stopColor="#64748b"/>
                </linearGradient>
              </defs>
              <path d="M32 2 C32 2 18 20 16 42 L16 68 L48 68 L48 42 C46 20 32 2 32 2Z" fill="url(#lg1)"/>
              <path d="M32 2 C32 2 24 20 23 42 L23 68 L29 68 L29 42 C28 20 32 2 32 2Z" fill="white" opacity="0.08"/>
              <path d="M32 0 C32 0 22 8 20 22 L44 22 C42 8 32 0 32 0Z" fill="#1e293b"/>
              <ellipse cx="32" cy="68" rx="16" ry="4" fill="#334155"/>
              <path d="M16 48 L2 70 L2 62 L16 54Z" fill="#475569"/>
              <path d="M48 48 L62 70 L62 62 L48 54Z" fill="#475569"/>
              <circle cx="32" cy="30" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>
              <circle cx="29" cy="28" r="1.5" fill="#7dd3fc" opacity="0.7"/>
              {/* Flame */}
              <path d={isTakingOff ? "M24 72 Q20 85 16 100 Q24 92 32 98 Q40 92 48 100 Q44 85 40 72Z" : "M26 72 Q24 80 22 88 Q27 84 32 88 Q37 84 42 88 Q40 80 38 72Z"}
                fill="url(#lf)" className="animate-[exhaust_0.15s_ease-in-out_infinite_alternate]"/>
              <defs>
                <linearGradient id="lf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fff7e0" stopOpacity="0.9"/>
                  <stop offset="60%" stopColor="#FF8C00" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#FF4500" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-[10px] font-mono text-orange-400/70 tracking-[0.5em] uppercase">Mission ARES-I</div>
        </div>

        {/* Countdown ring */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4"/>
            <circle cx="48" cy="48" r="44" fill="none" stroke="#FF6B35" strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.04s linear', filter: 'drop-shadow(0 0 6px rgba(255,107,53,0.8))' }}/>
          </svg>
          <div className="text-center">
            <div className="text-3xl font-display font-black text-white tabular-nums">{countdown}</div>
            <div className="text-[8px] font-mono text-orange-400/60 tracking-widest">T-MINUS</div>
          </div>
        </div>

        {/* Boot log terminal */}
        <div className="w-full bg-black/60 border border-green-500/20 rounded-lg p-4 h-40 overflow-hidden font-mono text-xs relative">
          <div className="absolute top-2 left-3 flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"/>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"/>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"/>
          </div>
          <div className="mt-4 space-y-1 overflow-hidden">
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-2 ${i === logs.length - 1 ? 'text-green-300' : 'text-green-500/50'}`}>
                <span className="text-green-500/30 shrink-0">[{String(i).padStart(2,'0')}]</span>
                <span>{log}</span>
              </div>
            ))}
            <div ref={logEndRef}/>
          </div>
          {/* Cursor blink */}
          <div className="inline-block w-2 h-3 bg-green-400 animate-[type-cursor_0.8s_infinite] ml-1"/>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground tracking-widest">
            <span>SYSTEM BOOT</span><span className="text-orange-400">{progress}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-300 rounded-full shadow-[0_0_10px_rgba(255,140,0,0.7)] transition-all duration-75"
              style={{ width: `${progress}%` }}/>
          </div>
          <div className="flex justify-between">
            {[0,25,50,75,100].map(v => (
              <div key={v} className={`w-px h-2 ${progress >= v ? 'bg-orange-400/60' : 'bg-white/10'}`}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
