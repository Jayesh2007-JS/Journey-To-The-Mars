import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Radio, Satellite, Cpu, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const SYSTEMS = [
  { id: 'nav', label: 'NAVIGATION', value: 99.8, status: 'NOMINAL', color: 'text-green-400', bar: 'bg-green-400' },
  { id: 'prop', label: 'PROPULSION', value: 87.2, status: 'NOMINAL', color: 'text-green-400', bar: 'bg-green-400' },
  { id: 'life', label: 'LIFE SUPPORT', value: 100, status: 'NOMINAL', color: 'text-green-400', bar: 'bg-green-400' },
  { id: 'comms', label: 'COMMS ARRAY', value: 94.1, status: 'NOMINAL', color: 'text-green-400', bar: 'bg-green-400' },
  { id: 'power', label: 'POWER GRID', value: 78.5, status: 'CAUTION', color: 'text-yellow-400', bar: 'bg-yellow-400' },
  { id: 'thermal', label: 'THERMAL CTRL', value: 96.3, status: 'NOMINAL', color: 'text-green-400', bar: 'bg-green-400' },
];

const COMMS_LOG = [
  { time: '14:22:07', from: 'HOUSTON', msg: 'ARES-I, trajectory correction burn confirmed. Delta-V nominal.' },
  { time: '14:19:44', from: 'BASE ALPHA', msg: 'Sample cache secured. EVA team returning to airlock.' },
  { time: '14:15:31', from: 'HOUSTON', msg: 'Power grid fluctuation noted. Recommend solar panel reorientation.' },
  { time: '14:11:08', from: 'BASE ALPHA', msg: 'Kilopower reactor output stable at 10.2 kW. All good here.' },
  { time: '14:07:55', from: 'HOUSTON', msg: 'Weather sat shows dust storm forming 800km south. Monitor.' },
  { time: '14:03:22', from: 'BASE ALPHA', msg: 'Biosignature analysis running. Preliminary results in 6 hours.' },
  { time: '13:58:14', from: 'HOUSTON', msg: 'Resupply Dragon confirmed for Sol 310 launch window.' },
  { time: '13:52:40', from: 'BASE ALPHA', msg: 'CDR Chen and SPC Ali on EVA. All vitals nominal.' },
];

const TELEMETRY_POINTS = 40;

function generateTelemetry(base: number, variance: number) {
  return Array.from({ length: TELEMETRY_POINTS }, (_, i) =>
    base + Math.sin(i * 0.4) * variance + (Math.random() - 0.5) * variance * 0.5
  );
}

// Generate once outside component to avoid re-generation on every render
const TELEMETRY_DATA = {
  power: generateTelemetry(78, 8),
  temp: generateTelemetry(22, 5),
  signal: generateTelemetry(94, 4),
};

export function MissionControlSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [missionDay, setMissionDay] = useState(247);
  const [distanceKm, setDistanceKm] = useState(225_000_000);
  const [velocity, setVelocity] = useState(24_130);
  const [newMsg, setNewMsg] = useState('');
  const [commsLog, setCommsLog] = useState(COMMS_LOG);
  const logRef = useRef<HTMLDivElement>(null);

  // Animate counters
  useEffect(() => {
    if (!isRevealed) return;
    const id = setInterval(() => {
      setDistanceKm(d => d - Math.floor(Math.random() * 3 + 1));
      setVelocity(v => v + (Math.random() - 0.5) * 10);
    }, 2000);
    return () => clearInterval(id);
  }, [isRevealed]);

  // Draw telemetry chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;

    const datasets = [
      { data: TELEMETRY_DATA.power, color: '#facc15', label: 'POWER %' },
      { data: TELEMETRY_DATA.signal, color: '#34d399', label: 'SIGNAL %' },
      { data: TELEMETRY_DATA.temp, color: '#60a5fa', label: 'TEMP °C' },
    ];

    ctx.clearRect(0, 0, cw, ch);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (ch / 4) * i;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke();
    }
    for (let i = 0; i <= TELEMETRY_POINTS; i += 5) {
      const x = (cw / TELEMETRY_POINTS) * i;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke();
    }

    datasets.forEach(({ data, color }) => {
      const min = 0, max = 120;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 4;
      data.forEach((v, i) => {
        const x = (cw / (TELEMETRY_POINTS - 1)) * i;
        const y = ch - ((v - min) / (max - min)) * ch;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;
    });
  }, [isRevealed]);

  // Simulate incoming comms
  useEffect(() => {
    if (!isRevealed) return;
    const msgs = [
      'Dust storm tracking nominal. No threat to base.',
      'Water reclamation at 98.4% efficiency.',
      'EVA team back inside. Airlock pressurized.',
      'New core sample shows elevated iron oxide.',
    ];
    let i = 0;
    const id = setInterval(() => {
      const now = new Date();
      const time = now.toTimeString().slice(0, 8);
      setCommsLog(prev => [{ time, from: i % 2 === 0 ? 'BASE ALPHA' : 'HOUSTON', msg: msgs[i % msgs.length] }, ...prev.slice(0, 9)]);
      i++;
    }, 8000);
    return () => clearInterval(id);
  }, [isRevealed]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [commsLog]);

  return (
    <section id="mission-control" className="relative min-h-screen py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04080f]/70 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-900/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className={`mb-12 reveal-base ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-[10px] font-mono text-accent tracking-[0.4em] uppercase">Phase 07 / Control</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-3">
            Mission <span className="text-gradient-space">Control</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">Live telemetry, system health, and communications from Base Alpha — 24 minutes away at the speed of light.</p>
        </div>

        {/* Top stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 reveal-base delay-100 ${isRevealed ? 'is-revealed' : ''}`}>
          {[
            { label: 'MISSION DAY', val: `SOL ${missionDay}`, icon: TrendingUp, color: 'text-orange-400' },
            { label: 'DISTANCE TO EARTH', val: `${(distanceKm / 1_000_000).toFixed(1)}M KM`, icon: Satellite, color: 'text-cyan-400' },
            { label: 'ORBITAL VELOCITY', val: `${velocity.toFixed(0)} M/S`, icon: Cpu, color: 'text-yellow-400' },
            { label: 'SIGNAL DELAY', val: '24 MIN 07 SEC', icon: Radio, color: 'text-purple-400' },
          ].map((s, i) => (
            <div key={i} className="glass-panel rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-[9px] font-mono text-muted-foreground tracking-widest">{s.label}</span>
              </div>
              <div className={`text-xl font-display font-bold ${s.color} tabular-nums`}>{s.val}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Telemetry chart */}
          <div className={`lg:col-span-2 glass-panel rounded-2xl p-5 border border-white/10 reveal-base delay-200 ${isRevealed ? 'is-revealed' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-muted-foreground tracking-widest">LIVE TELEMETRY — LAST 40 CYCLES</span>
              <div className="flex gap-4">
                {[{ color: 'bg-yellow-400', label: 'POWER' }, { color: 'bg-green-400', label: 'SIGNAL' }, { color: 'bg-blue-400', label: 'TEMP' }].map((l, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${l.color}`} />
                    <span className="text-[9px] font-mono text-muted-foreground">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <canvas ref={canvasRef} className="w-full h-40" style={{ imageRendering: 'pixelated' }} />
          </div>

          {/* System health */}
          <div className={`glass-panel rounded-2xl p-5 border border-white/10 reveal-base delay-300 ${isRevealed ? 'is-revealed' : ''}`}>
            <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-4">SYSTEM HEALTH</div>
            <div className="space-y-3">
              {SYSTEMS.map((sys) => (
                <div key={sys.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono text-white/70">{sys.label}</span>
                    <div className="flex items-center gap-1.5">
                      {sys.status === 'NOMINAL'
                        ? <CheckCircle className="w-3 h-3 text-green-400" />
                        : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className={`text-[9px] font-mono ${sys.color}`}>{sys.value}%</span>
                    </div>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${sys.bar} transition-all duration-1000`}
                      style={{ width: isRevealed ? `${sys.value}%` : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comms log */}
        <div className={`mt-6 glass-panel rounded-2xl border border-white/10 overflow-hidden reveal-base delay-400 ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-black/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest">COMMUNICATIONS LOG — EARTH ↔ MARS</span>
            <span className="ml-auto text-[9px] font-mono text-green-400/60">LIVE</span>
          </div>
          <div ref={logRef} className="h-48 overflow-y-auto p-4 space-y-2 font-mono text-xs">
            {commsLog.map((entry, i) => (
              <div key={i} className={`flex gap-3 items-start ${i === 0 ? 'text-white/90' : 'text-white/40'} transition-colors duration-500`}>
                <span className="text-muted-foreground/50 shrink-0 tabular-nums">{entry.time}</span>
                <span className={`shrink-0 font-semibold ${entry.from === 'HOUSTON' ? 'text-cyan-400/80' : 'text-orange-400/80'}`}>[{entry.from}]</span>
                <span className="leading-relaxed">{entry.msg}</span>
              </div>
            ))}
          </div>
          {/* Send message */}
          <div className="px-4 py-3 border-t border-white/10 flex gap-3">
            <span className="text-green-400/60 font-mono text-xs self-center">&gt;</span>
            <input
              type="text"
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && newMsg.trim()) {
                  const now = new Date();
                  setCommsLog(prev => [{ time: now.toTimeString().slice(0, 8), from: 'HOUSTON', msg: newMsg.trim() }, ...prev.slice(0, 9)]);
                  setNewMsg('');
                }
              }}
              placeholder="Send transmission to Base Alpha..."
              className="flex-1 bg-transparent text-xs font-mono text-white/80 placeholder:text-white/20 outline-none"
            />
            <span className="text-[9px] font-mono text-muted-foreground/40">+24 MIN DELAY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
