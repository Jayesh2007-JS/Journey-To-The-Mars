# 🚀 Journey to Mars — ARES-I Mission

<div align="center">

![Journey to Mars](https://img.shields.io/badge/Mission-ARES--I-orange?style=for-the-badge&logo=rocket)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer)

**An immersive, cinematic, interactive web experience documenting humanity's first crewed mission to Mars.**

[Live Demo](#) · [Report Bug](https://github.com/Jayesh2007-JS/Journey-To-The-Mars/issues) · [Request Feature](https://github.com/Jayesh2007-JS/Journey-To-The-Mars/issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Theme Compliance](#-theme-compliance)
- [Live Sections](#-live-sections)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Component Reference](#-component-reference)
- [Design System](#-design-system)
- [Performance Decisions](#-performance-decisions)
- [Animation Architecture](#-animation-architecture)
- [Hackathon Context](#-hackathon-context)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌌 About the Project

**Journey to Mars** is a full-scale interactive single-page application built for the **Frontend Odyssey Hackathon** under the theme:

> *"Journey to Mars — Create an interactive page showing the journey from Earth to Mars (Launch, Space Travel, Landing, Exploration)."*

This project goes far beyond the minimum requirements. It is a cinematic, scroll-driven experience that takes the user through every phase of a real Mars mission — from the loading screen boot sequence, through launch, deep space transit, Mars approach, EDL (Entry Descent Landing), surface exploration, crew profiles, mission control telemetry, technology breakdowns, and a full mission timeline.

Every section is designed to feel like a real NASA mission control interface — dark space aesthetic, monospace HUD readouts, live counters, interactive elements, and smooth Framer Motion animations throughout.

---

## ✅ Theme Compliance

The hackathon theme required four core phases. Here's exactly how this project covers each:

| Phase | Section | What it does |
|-------|---------|-------------|
| **Launch** | `LaunchSection` | Scroll-driven rocket ascent with CSS flame exhaust, live altitude/thrust/velocity/G-force counters, countdown log, stage separation banner, Earth horizon |
| **Space Travel** | `SpaceTravelSection` | Interactive milestone timeline across 210 days, warp star background, spacecraft moving along track, 5 critical events (lunar assist, solar storm, mid-course correction, deep space comms, decel burn) |
| **Landing** | `MarsApproachSection` + `LandingSection` | Sticky scroll Mars zoom from tiny dot to full planet with 4 EDL phases, plasma entry effects, 7-minute EDL terminal sequence, dust particles, touchdown confirmation |
| **Exploration** | `ExplorationSection` | Interactive Base Alpha overhead map, clickable modules (power/life support/science/comms), crew manifest, Mars local clock, typewriter mission report transmission |

**Bonus sections beyond the theme:** Hero, Crew, Mission Control, Technology, Timeline — making this a complete mission experience.

---

## 🛸 Live Sections

The app is divided into **10 named sections**, navigable via the side dot nav:

### 00 · Hero
The opening cinematic. Features:
- Parallax Mars planet that tracks mouse movement
- Live mission elapsed time counter (`T+HH:MM:SS`)
- Live distance-to-Mars counter ticking down at 24 km/s
- Staggered Framer Motion entrance animations
- Mission stats (225M KM, 7 months, 6 crew, 16M LBF thrust)
- Animated scroll indicator
- Ticker tape with mission telemetry

### 01 · Launch — *Escaping Gravity*
The launch sequence. Features:
- Scroll-driven rocket ascent — rocket flies up as you scroll
- Detailed SVG rocket (nose cone, portholes, ARES stripe, interstage band, engine bells, swept fins, antenna)
- CSS-only exhaust flame (3-layer: core + mid blur + outer glow) — zero canvas, zero lag
- Earth horizon with atmosphere glow and city lights
- Launch tower structure
- Live telemetry: altitude, thrust, velocity, G-force
- Countdown log (T-10 → T-5 → T-0 → LIFTOFF)
- Stage separation banner with Framer Motion AnimatePresence
- 9-engine status indicators
- Escape velocity progress bar

### 02 · Transit — *The Void*
7 months of deep space travel. Features:
- Interactive milestone timeline with 5 events across 210 days
- Animated spacecraft moving along the track
- Click any milestone to see details
- Real mission stats: 24,130 m/s velocity, 1.8 mSv/day radiation, −270°C outside
- Milestone cards: Lunar Gravity Assist, Solar Storm Evasion, Mid-Course Correction, Deep Space Comms, Deceleration Burn

### 03 · Approach — *Mars Approach*
Cinematic Mars zoom. Features:
- Sticky scroll section (400vh) — Mars grows from a tiny dot to filling the screen
- Canvas-rendered Mars with radial gradients, polar cap, Valles Marineris
- 4 approach phases: Decel Burn → Orbit Insertion → EDL Prep → Atmospheric Entry
- Phase indicator dots
- Countdown timer to touchdown
- Plasma sheath entry effect
- Comms blackout warning

### 04 · Touchdown — *7 Minutes of Terror*
The EDL sequence. Features:
- EDL terminal log with 7 sequential events (atmospheric entry → chute → heat shield → sky crane → touchdown)
- Screen shake on key events
- Dust particle canvas
- Descent animation while waiting
- Touchdown confirmation with green glow
- Mission Elapsed Time counter
- Surface stats: temperature, pressure, gravity, wind speed, sol day, location

### 05 · Survive — *Base Alpha*
Life on Mars. Features:
- Interactive overhead map of Base Alpha at Jezero Crater
- 4 clickable module nodes (Kilopower Reactor, ECLSS Habitat, Astrobiology Lab, Deep Space Array)
- Crew manifest with live status (EVA / LAB / NOMINAL)
- Earth link signal strength animation
- Mars local time clock (real MST calculation)
- Module detail cards with stats and descriptions
- Animated rover driving across the Mars horizon
- Epilogue terminal with typewriter transmission from Base Alpha

### 06 · Crew — *The Six*
Meet the astronauts. Features:
- 6 crew cards with Framer Motion staggered entrance
- Click any crew member for full profile
- Live vitals display (heart rate, O₂ saturation, temperature)
- Skill proficiency bars
- EVA hours, mission count, nationality, specialty
- Status badges (EVA / LAB / NOMINAL)
- Animated ECG waveform

### 07 · Mission Control — *Houston*
Ground control interface. Features:
- Live telemetry chart (canvas-rendered, 3 datasets: power/signal/temp)
- System health bars (6 systems)
- Live communications log with simulated incoming messages
- Interactive message input (send transmissions to Base Alpha)
- Mission day counter, distance to Earth, orbital velocity, signal delay
- Auto-updating comms every 8 seconds

### 08 · Technology — *The Tech*
Hardware breakdown. Features:
- 6 technology cards: Raptor 3 Engine, PICA-X Heat Shield, ECLSS, Kilopower Reactor, Optical Comms, MOXIE ISRU
- Click to expand full spec sheet
- Performance envelope visualization
- Framer Motion spring hover on selector buttons

### 09 · Timeline — *Mission Timeline*
Full mission chronology. Features:
- 6 phases from Mission Prep to Base Alpha Operations
- Animated vertical timeline line drawing on scroll
- Click any phase to expand event list
- Status badges (COMPLETE / ACTIVE)
- Alternating left/right layout on desktop

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18 | UI framework |
| **TypeScript** | 5 | Type safety |
| **Vite** | 7 | Build tool & dev server |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Framer Motion** | 12 | Animations & transitions |
| **Lucide React** | latest | Icon library |
| **pnpm** | 10 | Package manager (monorepo) |

### Fonts
- **Orbitron** — Display font (headings, titles, HUD readouts)
- **Exo 2** — Body font (descriptions, paragraphs)

Both loaded from Google Fonts.

---

## ✨ Features

### Visual
- 🌟 **Animated star field** — 250 white stars with twinkle effect, fixed background across all sections
- 🔴 **Parallax Mars planet** — CSS-only, mouse-tracking parallax on hero
- 🌍 **Earth horizon** — CSS curved earth with atmosphere glow and city lights
- 🚀 **Scroll-driven rocket** — Flies up and fades into space as you scroll
- 🔥 **CSS flame exhaust** — 3-layer animated flame, no canvas
- 🌌 **Nebula clouds** — Radial gradient blobs for depth
- 📡 **HUD aesthetic** — Monospace readouts, scan lines, blinking dots throughout

### Interactive
- 🖱️ **Mouse parallax** — Mars planet tracks cursor
- 📜 **Scroll-driven animations** — Rocket ascent, Mars zoom, timeline line
- 🗺️ **Clickable base map** — Interactive module nodes on overhead map
- 👨‍🚀 **Crew profiles** — Click to expand full astronaut dossier
- 🔧 **Tech selector** — Click to switch between 6 technology specs
- 📅 **Timeline accordion** — Click phases to expand event lists
- 💬 **Live comms** — Type and send messages to Base Alpha
- 🎯 **Milestone timeline** — Click dots to navigate space travel events

### Performance
- No `shadowBlur` on canvas (expensive GPU op removed)
- Particle systems capped at 30fps where used
- Telemetry data generated once outside component (no re-generation on render)
- Inline star divs replaced with single canvas
- Duplicate star canvases removed
- Solid section backgrounds replaced with semi-transparent overlays
- `will-change: transform` on scroll-animated elements only

---

## 📁 Project Structure

```
Frontend-Odyssey/
├── artifacts/
│   └── journey-to-mars/
│       ├── src/
│       │   ├── components/
│       │   │   ├── LoadingScreen.tsx      # Boot sequence with countdown ring
│       │   │   ├── Navigation.tsx         # Frosted glass nav + side dot nav
│       │   │   ├── StarField.tsx          # Fixed star canvas background
│       │   │   ├── ui/                    # Radix UI component library
│       │   │   └── sections/
│       │   │       ├── HeroSection.tsx         # 00 - Opening cinematic
│       │   │       ├── LaunchSection.tsx        # 01 - Rocket launch
│       │   │       ├── SpaceTravelSection.tsx   # 02 - Deep space transit
│       │   │       ├── MarsApproachSection.tsx  # 03 - Mars approach zoom
│       │   │       ├── LandingSection.tsx       # 04 - EDL sequence
│       │   │       ├── ExplorationSection.tsx   # 05 - Base Alpha
│       │   │       ├── CrewSection.tsx          # 06 - Crew profiles
│       │   │       ├── MissionControlSection.tsx # 07 - Ground control
│       │   │       ├── TechnologySection.tsx    # 08 - Hardware specs
│       │   │       └── TimelineSection.tsx      # 09 - Mission timeline
│       │   ├── hooks/
│       │   │   ├── use-scroll-reveal.ts    # IntersectionObserver reveal
│       │   │   ├── use-active-section.ts   # Active nav section tracker
│       │   │   ├── use-canvas-particles.ts # Canvas particle system hook
│       │   │   └── use-reveal.ts           # Framer Motion useInView wrapper
│       │   ├── pages/
│       │   │   └── Home.tsx               # Root page, section assembly
│       │   ├── index.css                  # Global styles, keyframes, utilities
│       │   └── main.tsx                   # React entry point
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
├── artifacts/api-server/                  # Backend (not used by frontend)
├── package.json                           # Monorepo root
└── pnpm-workspace.yaml
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** 10+ (`npm install -g pnpm`)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/Jayesh2007-JS/Journey-To-The-Mars.git
cd Journey-To-The-Mars

# Install dependencies (monorepo)
pnpm install --ignore-scripts
```

### Running the Development Server

```bash
# Windows (PowerShell)
$env:PORT="5173"; $env:BASE_PATH="/"; pnpm --filter @workspace/journey-to-mars run dev

# Linux / macOS
PORT=5173 BASE_PATH="/" pnpm --filter @workspace/journey-to-mars run dev
```

Then open **http://localhost:5173** in your browser.

> **Note:** The `--ignore-scripts` flag is required on Windows because the root workspace has a preinstall script that uses `sh` (Linux shell). This flag bypasses it safely.

### Building for Production

```bash
# Windows (PowerShell)
$env:PORT="5173"; $env:BASE_PATH="/"; pnpm --filter @workspace/journey-to-mars run build

# Linux / macOS
PORT=5173 BASE_PATH="/" pnpm --filter @workspace/journey-to-mars run build
```

Output goes to `artifacts/journey-to-mars/dist/public/`.

### Preview Production Build

```bash
$env:PORT="5173"; $env:BASE_PATH="/"; pnpm --filter @workspace/journey-to-mars run serve
```

---

## 🔧 Environment Variables

Both variables are **required** — the app will throw at startup if either is missing.

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `PORT` | ✅ | `5173` | Port for the Vite dev/preview server |
| `BASE_PATH` | ✅ | `/` | Base URL path (use `/` for local, `/repo-name/` for GitHub Pages) |

---

## 📜 Scripts

All scripts are run from the monorepo root with `pnpm --filter @workspace/journey-to-mars`:

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite --config vite.config.ts --host 0.0.0.0` | Start dev server with HMR |
| `build` | `vite build --config vite.config.ts` | Production build |
| `serve` | `vite preview --config vite.config.ts --host 0.0.0.0` | Preview production build |
| `typecheck` | `tsc -p tsconfig.json --noEmit` | TypeScript type checking |

---

## 🧩 Component Reference

### `LoadingScreen`
Boot sequence overlay shown before the main app loads.
- Props: `onComplete: () => void`
- Animated countdown ring (0–10)
- Boot log terminal with color-coded entries
- Rocket SVG with takeoff animation
- Progress bar with tick marks
- Auto-completes after ~4 seconds

### `Navigation`
Fixed top navigation bar + side dot navigation.
- Props: `activeSection: string`, `sections: { id, label }[]`
- Gradient progress bar at top of page
- Frosted glass header on scroll
- Side dot nav with labels on hover
- Active section label in center

### `StarField`
Fixed full-viewport star canvas, rendered behind all content.
- 250 white stars across 3 brightness layers
- Twinkle animation via sine wave
- Nebula cloud overlays (CSS radial gradients)
- Resize-responsive

### `HeroSection`
Opening cinematic section.
- Live mission clock and distance counter
- Mouse-tracking Mars parallax
- Framer Motion staggered entrance
- Two orbit rings with satellite dots

### `LaunchSection`
Scroll-driven launch sequence.
- Scroll progress → rocket Y position (direct DOM, no React state)
- CSS-only 3-layer flame exhaust
- Framer Motion AnimatePresence for stage sep banner
- Stats animated with cubic ease on reveal

### `SpaceTravelSection`
Interactive deep space transit timeline.
- 5 milestone nodes on a track
- Animated spacecraft position
- Click to navigate between milestones

### `MarsApproachSection`
Sticky scroll Mars zoom.
- Canvas renders Mars growing from 8% to 110% of viewport
- 4 scroll-triggered phases
- 30fps cap on canvas draw loop

### `LandingSection`
EDL sequence terminal.
- 7 sequential events triggered by `useScrollReveal`
- Canvas dust particles (1/frame spawn rate)
- Screen shake CSS animation on key events

### `ExplorationSection`
Base Alpha interactive map.
- SVG-positioned module buttons
- Mars local time (real MST calculation: 1 sol = 88,775s)
- Typewriter transmission on scroll reveal

### `CrewSection`
Astronaut profiles.
- 6 crew cards with Framer Motion stagger
- Click to expand detail panel
- Animated ECG bars

### `MissionControlSection`
Ground control dashboard.
- Canvas telemetry chart (3 datasets, DPR-aware)
- Simulated incoming comms every 8s
- Interactive message input

### `TechnologySection`
Hardware specification viewer.
- 6 tech items with spec grids
- Performance envelope bar chart
- Framer Motion spring on selector

### `TimelineSection`
Mission chronology.
- Animated line drawing on scroll reveal
- Alternating left/right layout
- Click to expand phase events

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `hsl(230 30% 3%)` | Deep space dark |
| `--color-primary` | `hsl(15 95% 58%)` | Orange — fire, Mars |
| `--color-accent` | `hsl(190 95% 52%)` | Cyan — tech, HUD |
| `--color-muted-foreground` | `hsl(215 20% 60%)` | Secondary text |

### Typography

| Font | Weight | Usage |
|------|--------|-------|
| Orbitron | 400–900 | All headings, HUD readouts, labels |
| Exo 2 | 300–700 | Body text, descriptions |

### Utility Classes

```css
.glass-panel          /* Frosted glass card */
.glass-panel-bright   /* Brighter glass variant */
.text-gradient-mars   /* Orange-red gradient text */
.text-gradient-space  /* Cyan-blue-purple gradient text */
.text-gradient-gold   /* Gold gradient text */
.reveal-base          /* Fade+slide up on scroll */
.reveal-left          /* Slide in from left */
.reveal-right         /* Slide in from right */
.reveal-scale         /* Scale up on scroll */
.is-revealed          /* Applied by useScrollReveal */
```

### Keyframe Animations

| Name | Duration | Usage |
|------|----------|-------|
| `spin-slow` | 240s | Orbit rings |
| `exhaust` | 0.15s | Rocket flame |
| `ticker-scroll` | 30–35s | Bottom ticker tape |
| `data-bar` | 1s | Signal/ECG bars |
| `blink-dot` | 2s | Status indicators |
| `rover-drive` | 35s | Mars rover |
| `scan-sweep` | 3s | Hero scan line |
| `radar-rotate` | 8s | Radar sweep |
| `ripple-out` | 2s | Nav dot pulse |

---

## ⚡ Performance Decisions

This project was carefully optimized to run smoothly in the browser:

### Canvas Optimizations
- **No `shadowBlur`** — The most expensive canvas operation. Removed from all particle systems.
- **30fps cap** on MarsApproachSection canvas (`if (ts - last < 33) return`)
- **Single StarField canvas** — Replaced 80 inline animated star divs and a duplicate hero canvas
- **Telemetry data outside component** — `TELEMETRY_DATA` generated once at module level, not on every render

### Particle System
- Spawn rates reduced: exhaust 22→12, sparks 18→8
- Removed smoke plume canvas (expensive radial gradients per particle)
- Removed shockwave canvas
- No `shadowBlur` on any particle draw call

### CSS vs Canvas
- Rocket exhaust: **CSS only** (3 divs with blur filter) instead of canvas particles
- Earth horizon: **CSS only** (radial gradients + border-radius)
- Launch tower: **CSS only** (divs)
- Star field: **Single canvas** at viewport size, redraws only visible stars

### React
- `will-change: transform` only on scroll-animated elements
- Direct DOM manipulation for scroll-driven animations (no React state on scroll)
- `useRef` for progress values to avoid re-renders
- `requestAnimationFrame` debouncing on scroll handlers

### Background Transparency
- All section backgrounds use semi-transparent overlays (`/70`, `/80`) instead of solid `bg-background`
- Body background is transparent — StarField handles the base color
- This allows the fixed star canvas to show through all sections

---

## 🎬 Animation Architecture

### Scroll-Driven (Direct DOM)
Used for performance-critical continuous animations:
```typescript
// Rocket ascent — no React state, direct DOM
rocketRef.current.style.transform = `translateY(${translateY}px)`;
rocketRef.current.style.opacity = String(opacity);
```

### Framer Motion (React State)
Used for entrance animations and interactions:
```typescript
// Staggered entrance
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

// Spring hover
whileHover={{ scale: 1.04 }}
transition={{ type: 'spring', stiffness: 300, damping: 20 }}
```

### CSS Keyframes
Used for looping ambient animations:
```css
/* Ticker tape */
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Rocket flame */
@keyframes exhaust {
  0% { transform: scaleY(0.85) scaleX(0.9); }
  100% { transform: scaleY(1.3) scaleX(1.15); }
}
```

### IntersectionObserver (useScrollReveal)
Used for one-time reveal animations:
```typescript
// CSS class toggling
.reveal-base { opacity: 0; transform: translateY(40px); transition: all 1s; }
.is-revealed { opacity: 1; transform: translate(0); }
```

---

## 🏆 Hackathon Context

**Event:** Frontend Odyssey Hackathon  
**Theme:** Journey to Mars — Interactive page showing the journey from Earth to Mars  
**Required phases:** Launch, Space Travel, Landing, Exploration  

### What makes this stand out

1. **Complete narrative arc** — Not just 4 sections, but a full 10-section mission experience with a loading screen, crew, mission control, technology, and timeline
2. **Real data** — All stats (ISP, chamber pressure, radiation dose, O₂ levels, etc.) are based on actual NASA/SpaceX mission parameters
3. **Zero external 3D libraries** — No Three.js, no WebGL. Everything is CSS, SVG, and 2D canvas
4. **Performance-first** — Runs at 60fps on mid-range hardware
5. **Fully interactive** — Clickable maps, crew profiles, tech specs, live comms input, milestone navigation
6. **Live counters** — Distance to Mars ticks down in real time, mission clock counts up, Mars local time runs on real sol calculation
7. **Cinematic loading screen** — Boot sequence with terminal log, countdown ring, and rocket takeoff

---

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
# Open a Pull Request
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ for the Frontend Odyssey Hackathon

**[⬆ Back to top](#-journey-to-mars--ares-i-mission)**

</div>
