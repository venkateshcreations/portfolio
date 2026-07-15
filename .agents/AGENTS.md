# 🧠 Project Memory — Venkatesh Ammireddy Portfolio

> This file is auto-loaded as context for every AI session in this workspace.
> Last updated: 2026-07-10

---

## 👤 Owner & Identity

- **Name**: Venkatesh Ammireddy
- **Title**: UX Creative Director & AI UX Architect
- **Experience**: 13+ years
- **Specialties**: Product UX Architecture, AI-first UX Systems, Enterprise UX Platforms, Agentic AI Experiences
- **Contact**: venkateshcreations@gmail.com | +91-9030436110
- **LinkedIn**: linkedin.com/in/venkateshammireddy
- **GitHub**: github.com/venkateshcreations
- **Portfolio URL**: https://venkateshcreations.github.io/portfolio/

---

## 📁 Project Overview

- **Type**: Personal UX portfolio website
- **Tech Stack**: Pure HTML + Vanilla CSS + Vanilla JavaScript (NO React, NO framework — despite the folder name)
- **External Libraries**: GSAP 3.12.2 + ScrollTrigger (CDN), Google Fonts (Inter, Space Grotesk)
- **External APIs**: Open-Meteo (weather), OpenStreetMap Nominatim (reverse geocoding), Geolocation API
- **Deployment**: GitHub Pages at `venkateshcreations.github.io/portfolio/`

---

## 📄 Core Files

| File | Lines | Role |
|---|---|---|
| `index.html` | 1289 | Main page — all sections |
| `styles.css` | 3162 | All styles — dark/light themes, animations, components |
| `script.js` | 1821 | All interactivity — weather theme, canvas, GSAP, modals |
| `portfolio.html` | large | Extended portfolio page (links from "View More Projects") |
| `resume.html` | ~50KB | Inline digital resume page |
| `UI-UX-Intelligence-System.md` | 14KB | Architecture doc for Garuda AI, loaded dynamically into the code panel |
| `Ammireddy_Venkatesh_Digital_Resume.pdf` | 900KB | Downloadable PDF resume |
| `videoplayback.mp4` | ~28MB | HUD UI video displayed in the About section right panel |
| `garuda_speech_about_intelligence.mp3` | 3.4MB | Audio narration for Garuda Intelligence audio player |
| `favicon.svg` | — | Site favicon |
| `robots.txt` / `sitemap.xml` | — | SEO files |
| `googlec0747c12799f6395.html` | — | Google Search Console verification |

---

## 🖼️ Images Directory (`images/`)

- **Project folders**: `project-1` through `project-24` — each contains numbered screenshots (e.g., `1.png`, `2.png`, etc.)
- **Tool SVGs** in `images/tools/`: vscode, figma, claude, anthropic, chatgpt, gemini, github, cursor, windsurf, opencode, ollama, lm-studio, adobe, windows, apple, nvidia, linux, codex, qwen, google-antigravity, google-stitch, ide, cli, ai-chat
- **Garuda icons**: `images/garuda-icon.png` (dark), `images/garuda-icon-light.png` (light)
- **Architecture diagrams**: `images/UI-UX_Intelli-System_Dark_Theme.jpg`, `images/UI-UX_Intelli-System_Light_Theme.jpg`
- **About illustration**: `images/about-illustration.png`

---

## 🧩 Page Sections (index.html)

### 1. Hero (`#home`)
- Name: Venkatesh Ammireddy
- Rotating titles: "UX Creative Director" → "Product UX Architect" → "AI-first Design Thinker"
- Badges: 13+ Years | AI UX Design Approach | Agentic UX Systems Thinking
- CTAs: "View Portfolio" (→ #portfolio) | "Get In Touch" (→ #contact)

### 2. About Me (`#about`)
- Bio: 13+ years at intersection of human behaviour + intelligent systems
- 4 Speciality cards: Product UX Architecture, AI-first UX Systems, Enterprise UX Platforms, Agentic AI Experiences
- Animated counters: 13+ Years | 30+ Projects | 10+ Enterprises
- Right panel: HUD UI video (`videoplayback.mp4`) with glow + floating badges ("AI-first", "13+ Yrs")

### 3. Tools & Stack (`#tools`)
- Infinite scrolling marquee with 23 tool icons (duplicated for seamless loop)
- 4 feature tiles below: Design | AI Acceleration | Development | Local Models

### 4. Infrastructure (`#workstation`)
- Remote workstation showcase
- 3-screen visual mock (Telemetry | VS Code + AI Copilot | Figma)
- Spec cards: Performance Compute | Resilient Network (Dual-ISP fiber) | Multi-Display Telemetry | Autonomous Security
- Floating badges: "Dual ISP Failover" | "3x Displays"

### 5. Garuda Intelligence (`#intelligence`)
- Garuda = personal multi-agent AI orchestration engine
- GitHub link: https://github.com/venkateshcreations/GARUDA-Intelligence
- "View Architecture" button → opens popover with architecture diagram image (dark/light variants)
- "Listen to Garuda" button → opens custom audio player modal with Web Audio API visualizer canvas
- VS Code-style code panel renders `UI-UX-Intelligence-System.md` with syntax highlighting

### 6. Portfolio (`#portfolio`)
- **4 tab panels**:
  - **Web Apps**: Projects 1–6 (FlowTrack AI, Deepfake Defense Dashboard, Radiostream, EduCore, Army Commando Intel, SteamVerde)
  - **Websites**: Projects 7–12 (VOXAR, ZiPPOS.SYS, AXIOM, ORBITA, Deepfake Defense, Autofy OS)
  - **Data Visualization**: Projects 13–18 (Enterprise Banking, Digital Transformation Hub, GEC Supply Chain, IntelliAssist AI, Enterprise Analytics, Apex SOC Command Center)
  - **Design Systems**: Projects 19–24 (Design System-1 through Design System-6) — uses images from `project-19` to `project-24` folders
    - DS-1: Enterprise Digital Banking DS — https://venkateshcreations.github.io/DesignSystems/designsystem-1.html
    - DS-2: GlobalTech Digital Transformation Hub DS — https://venkateshcreations.github.io/DesignSystems/designsystem-2.html
    - DS-3: Supply Chain Analytics DS — https://venkateshcreations.github.io/DesignSystems/designsystem-3.html
    - DS-4: Deepfake Defense DS — https://venkateshcreations.github.io/DFD-Design-System/
    - DS-5: Radiostream DS — https://venkateshcreations.github.io/DesignSystems/designsystem-5.html
    - DS-6: AXIOM Cyber DS — https://venkateshcreations.github.io/DesignSystems/designsystem-6.html
- "View More Projects" → `portfolio.html`
- Each card opens a **project modal** with: image slider + magnifier, role tag, title, description, tags, "View Doc" + "View Live" buttons

### 7. Contact (`#contact`)
- Email: venkateshcreations@gmail.com
- LinkedIn link
- Contact form (Name, Email, Subject, Message) with client-side validation

### 8. Footer
- Logo "VA" + phone number
- Nav links duplicated from header

---

## ⚙️ JavaScript Features (script.js)

### Weather-Aware Auto Theme
- Uses `navigator.geolocation` → Open-Meteo API for weather code + is_day
- WMO code mapping: clear + daytime = light, overcast/rain/night = dark
- Reverse-geocodes city via OpenStreetMap Nominatim
- Updates `#weatherPill` element with emoji + label + day/night + city
- Manual toggle overrides auto (saved to localStorage: `va-theme`, `va-theme-manual`)
- **Double-click theme toggle** resets back to auto weather mode
- Toast notification on toggle

### Custom Cursor
- `#cursor` (dot) tracks mouse exactly
- `#cursor-follower` (ring) follows with 0.12 lerp easing
- Scales up on hover of `a, button, .project-card, input, textarea, .contact-link`

### Canvas Background (`#rippleCanvas`)
- Full-screen fixed canvas, z-index: -1
- **Ripple waves**: generated on mouse move (if speed > 25px) and on click
- **Clouds**: morphing volumetric blurred ellipses drifting left to right, theme-aware colors
- **Birds**: flocking system — leader bird + followers with organic lag; flap/glide state machine using quadratic bezier curves; theme-aware colors (dark navy in light mode, blue in dark mode)
- **Airplane**: large silhouette with dual contrail trails, crosses screen periodically
- **Ambient center ripple**: slow expanding ring from center for background ambience

### GSAP ScrollTrigger
- `.reveal-up` elements: fade up from below on scroll into view
- `.reveal-fade` elements: fade in on scroll
- `data-delay` attribute controls stagger
- Stats counter `.stat-number[data-count]`: animates 0 → target on scroll

### Sticky Header + Active Nav
- Adds `.scrolled` class to `#header` after 40px scroll (blurs/dims background)
- Updates `.active` on nav links based on current scroll section

### Project Modal
- Opens on `.card-preview-btn` click
- Image slider with prev/next buttons + dot indicators + magnifier on hover
- Project data loaded from a `PROJECTS` data object in script.js
- Keyboard: Escape to close, arrow keys to navigate slides

### Garuda Audio Player (`#garudaAudioPopover`)
- Custom audio element `#garudaAudio` playing `garuda_speech_about_intelligence.mp3`
- Web Audio API AudioContext with AnalyserNode for real-time frequency visualizer on `#audioVisualizer` canvas
- Play/Pause, Skip plus/minus 10s controls

### Architecture Popover (`#architecturePopover`)
- Shows architecture diagram image (swaps src based on current theme)

### Hamburger Menu
- `#menuToggle` toggles `.open` on `#navLinks` for mobile

### Contact Form
- Client-side validation with inline error messages (`#nameError`, `#emailError`, `#messageError`)
- Shows `#formSuccess` div on valid submit

### Floating Resume CTA
- Fixed `.floating-resume-cta` button → opens `resume.html` in new tab

---

## 🎨 Design System (styles.css)

### CSS Custom Properties
```
Dark theme (default):
  --bg: #050508           (near-black background)
  --bg-2: #0A0A12
  --bg-card: rgba(255,255,255,0.03)
  --bg-glass: rgba(255,255,255,0.05)  (glassmorphism)
  --border: rgba(255,255,255,0.08)
  --text-primary: #F8FAFC
  --text-secondary: #A1A5B3
  --blue: #3B82F6         (primary accent)
  --blue-light: #60A5FA
  --blue-glow: rgba(59,130,246,0.25)
  --transition: 0.4s cubic-bezier(0.16,1,0.3,1)
  --container-max: 1280px
  --section-pad: 120px

Light theme ([data-theme="light"]):
  --bg: #FAFAFA
  --bg-2: #F3F4F6
  --text-primary: #0F172A
  --text-secondary: #475569
```

### Themes
- Dark mode is **default** (`data-theme="dark"` on `<html>`)
- Light mode activated by JS setting `data-theme="light"`
- Garuda logo swaps: dark → `garuda-icon.png`, light → `garuda-icon-light.png`

### Key Design Patterns
- **Glassmorphism**: `backdrop-filter: blur()` + semi-transparent backgrounds
- **Gradient text**: `.gradient-text` uses `background-clip: text`
- **Section pattern**: `.section-label` (small uppercase tag) → `.section-title` (large heading)
- **Section dividers**: `.section-divider` — thin horizontal rule between sections
- **Cards**: `.project-card` with `.card-image-wrap`, `.card-overlay`, `.card-info`
- **Buttons**: `.btn-primary` (blue filled) | `.btn-ghost` (outline)
- **Markdown code panel**: VS Code-style syntax coloring with CSS vars `--md-heading`, `--md-bold`, etc.

### Animation Classes
- `.reveal-up` — translateY(30px) → 0, opacity 0 → 1
- `.reveal-fade` — opacity 0 → 1
- Both triggered by IntersectionObserver or GSAP ScrollTrigger

### Responsive
- Mobile hamburger menu replaces nav links
- `.hide-mobile` / `.hide-desktop` utility classes
- Mobile resume CTA shown in header on small screens

---

## 🌐 SEO

- JSON-LD structured data: `Person` + `WebSite` schema
- Open Graph + Twitter Card meta tags
- Canonical URL: `https://venkateshcreations.github.io/portfolio/`
- Google Site Verification: `m3rgq3p7sbFIkEq8Sm5senFMQUvczlFY7IXedqDfrP0`
- `robots.txt` + `sitemap.xml` present
- `googlec0747c12799f6395.html` for Search Console

---

## ⚠️ Critical Notes for AI Sessions

1. **This is NOT React** — pure HTML/CSS/JS despite the folder name "Venkatesh-Portfolio-Web - React". Do not suggest React patterns.
2. **Single CSS file** (`styles.css`) and **single JS file** (`script.js`) — all code lives there.
3. **Version cache busting**: `styles.css?v=13` and `script.js?v=12` in index.html — increment version number on each change to bust browser cache.
4. **No build step** — changes are directly in source files, no compilation needed.
5. **No package.json** — no npm/node ecosystem. Serve locally with a simple HTTP server (e.g., VS Code Live Server, Python http.server).
6. **GSAP loaded from CDN** — do not install locally.
7. **Canvas background is full-screen fixed** (`z-index: -1`) and theme-aware — both ripples and birds change color on theme switch via `document.documentElement.getAttribute('data-theme')`.
8. **Project data for modals** is defined as a `PROJECTS` data object inside `script.js` — when adding new projects, update BOTH `index.html` (card HTML) AND `script.js` (PROJECTS object).
9. **Image naming convention**: project screenshots are `images/project-N/1.png`, `2.png`, etc.
10. **Audio player** uses Web Audio API — requires user gesture to start (browser autoplay policy). Audio is `garuda_speech_about_intelligence.mp3`.
11. **Weather pill** (`#weatherPill`) is in bottom corner of the page, auto-populated by JS after geolocation resolves.
12. **Theme toggle behavior**: Single click = manual override (saves to localStorage). Double-click = resets back to weather auto-mode.
13. **portfolio.html** is a separate standalone page for additional projects (19–24+) beyond the 18 shown on index.html.
