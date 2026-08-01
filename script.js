/**
 * Venkatesh Ammireddy — Portfolio
 * script.js: GSAP animations, particles, parallax, cursor, modal, theme, stats counter
 */

/* ══════════════════════════════════════════════════════
   WEATHER-AWARE AUTO THEME
   Logic:
     • Clear sky + daytime → Light mode
     • Overcast / rain / fog / snow / storm / night → Dark mode
     • Manual toggle overrides auto-detect (saved to localStorage)
   API: Open-Meteo (free, no key needed)
══════════════════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// WMO weather code → friendly label + mood
const WEATHER_MAP = {
  0: { label: 'Clear Sky', emoji: '☀️', mood: 'light' },
  1: { label: 'Mainly Clear', emoji: '🌤️', mood: 'light' },
  2: { label: 'Partly Cloudy', emoji: '⛅', mood: 'light' },
  3: { label: 'Overcast', emoji: '☁️', mood: 'dark' },
  45: { label: 'Foggy', emoji: '🌫️', mood: 'dark' },
  48: { label: 'Icy Fog', emoji: '🌫️', mood: 'dark' },
  51: { label: 'Light Drizzle', emoji: '🌦️', mood: 'dark' },
  53: { label: 'Drizzle', emoji: '🌧️', mood: 'dark' },
  55: { label: 'Dense Drizzle', emoji: '🌧️', mood: 'dark' },
  61: { label: 'Light Rain', emoji: '🌧️', mood: 'dark' },
  63: { label: 'Rain', emoji: '🌧️', mood: 'dark' },
  65: { label: 'Heavy Rain', emoji: '🌧️', mood: 'dark' },
  71: { label: 'Light Snow', emoji: '🌨️', mood: 'dark' },
  73: { label: 'Snow', emoji: '❄️', mood: 'dark' },
  75: { label: 'Heavy Snow', emoji: '❄️', mood: 'dark' },
  77: { label: 'Snow Grains', emoji: '🌨️', mood: 'dark' },
  80: { label: 'Rain Showers', emoji: '🌦️', mood: 'dark' },
  81: { label: 'Showers', emoji: '🌧️', mood: 'dark' },
  82: { label: 'Heavy Showers', emoji: '⛈️', mood: 'dark' },
  85: { label: 'Snow Showers', emoji: '🌨️', mood: 'dark' },
  86: { label: 'Heavy Snow Shwr', emoji: '❄️', mood: 'dark' },
  95: { label: 'Thunderstorm', emoji: '⛈️', mood: 'dark' },
  96: { label: 'Thunderstorm', emoji: '⛈️', mood: 'dark' },
  99: { label: 'Severe Storm', emoji: '🌩️', mood: 'dark' },
};

// Get nearest entry in WEATHER_MAP (handles non-exact codes)
function resolveWeather(code) {
  if (WEATHER_MAP[code]) return WEATHER_MAP[code];
  // Walk down to nearest defined code
  for (let c = code; c >= 0; c--) {
    if (WEATHER_MAP[c]) return WEATHER_MAP[c];
  }
  return { label: 'Unknown', emoji: '🌡️', mood: 'dark' };
}

// Apply theme + broadcast to rest of script
function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  
  // Update logo images based on theme
  const logos = document.querySelectorAll('img[src*="garuda-icon"]');
  logos.forEach(logo => {
    logo.src = theme === 'light' ? 'images/garuda-icon-light.png?v=3' : 'images/garuda-icon.png';
  });
}

// Update the weather pill in the nav
function updateWeatherPill(emoji, label, isDay, city) {
  const pill = document.getElementById('weatherPill');
  if (!pill) return;
  const dayTag = isDay ? 'Day' : 'Night';
  pill.innerHTML = `<span class="wp-emoji">${emoji}</span><span class="wp-text">${label}${city ? ` · ${city}` : ''} · ${dayTag}</span>`;
  pill.style.opacity = '1';
  pill.style.transform = 'translateY(0)';
}

// Reverse-geocode city name from lat/lon (OpenStreetMap Nominatim)
async function getCityName(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    return data.address?.city
      || data.address?.town
      || data.address?.village
      || data.address?.state
      || '';
  } catch {
    return '';
  }
}

// Fetch weather and set theme automatically
async function autoThemeFromWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weathercode,is_day&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();

    const code = data.current?.weathercode ?? 3;
    const isDay = data.current?.is_day === 1;
    const info = resolveWeather(code);

    // Theme rule: light only when it's daytime AND weather mood is light
    const autoTheme = (isDay && info.mood === 'light') ? 'light' : 'dark';
    applyTheme(autoTheme);

    // Get city name in parallel then update pill
    const city = await getCityName(lat, lon);
    updateWeatherPill(info.emoji, info.label, isDay, city);

    // Store auto result so toggle can flip from it
    html.setAttribute('data-weather-theme', autoTheme);
  } catch (err) {
    console.warn('Weather fetch failed, keeping saved theme.', err);
  }
}

// ── INIT ──
// Check if user has a manual override saved
const manualOverride = localStorage.getItem('va-theme-manual');
const savedTheme = localStorage.getItem('va-theme') || 'dark';

if (manualOverride === 'true') {
  // Respect the manually chosen theme, skip weather
  applyTheme(savedTheme);
} else {
  // Apply saved theme instantly (no flash), then auto-detect
  applyTheme(savedTheme);
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => autoThemeFromWeather(pos.coords.latitude, pos.coords.longitude),
      () => {
        // Geolocation denied — fall back to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
      },
      { timeout: 8000, maximumAge: 300000 }
    );
  }
}

// ── MANUAL TOGGLE ──
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('va-theme', next);
  localStorage.setItem('va-theme-manual', 'true');

  // Show tooltip that manual override is active
  showOverrideToast(next);
});

// Double-click theme toggle to reset to weather auto-mode
themeToggle.addEventListener('dblclick', (e) => {
  e.preventDefault();
  localStorage.removeItem('va-theme-manual');
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        autoThemeFromWeather(pos.coords.latitude, pos.coords.longitude);
        showOverrideToast('auto');
      },
      null,
      { timeout: 8000, maximumAge: 300000 }
    );
  }
});

// Toast helper
function showOverrideToast(mode) {
  let toast = document.getElementById('themeToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'themeToast';
    toast.style.cssText = `
      position:fixed; bottom:32px; left:50%; transform:translateX(-50%) translateY(12px);
      background:var(--bg-glass); backdrop-filter:blur(16px); border:1px solid var(--border);
      color:var(--text-primary); font-size:0.8rem; font-weight:500; padding:10px 20px;
      border-radius:100px; z-index:99999; transition:opacity 0.3s,transform 0.3s;
      opacity:0; white-space:nowrap; box-shadow:var(--shadow-md);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = mode === 'auto'
    ? '🌤️ Auto-theme restored from weather'
    : mode === 'light'
      ? '☀️ Light mode — double-click to auto'
      : '🌙 Dark mode — double-click to auto';
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
  }, 3500);
}

/* ══════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect: scale up follower on interactive elements
document.querySelectorAll('a, button, .project-card, input, textarea, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
  el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
});

/* ══════════════════════════════════
   STICKY HEADER + ACTIVE NAV
══════════════════════════════════ */
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Active nav link based on scroll position
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}, { passive: true });

/* ══════════════════════════════════
   HAMBURGER MENU
══════════════════════════════════ */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ══════════════════════════════════
   INTERACTIVE RIPPLE WAVES BACKGROUND
   ══════════════════════════════════ */
const canvas = document.getElementById('rippleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let ripples = [];
  let ambientWaves = [];
  let clouds = [];
  let birds = [];
  let airplane;
  let thunder;
  let mouse = { x: null, y: null };
  let lastMouse = { x: null, y: null };
  let isMoving = false;
  let moveTimeout;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (lastMouse.x !== null) {
      let dx = mouse.x - lastMouse.x;
      let dy = mouse.y - lastMouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      
      // Emit ripple if mouse moved fast enough
      if (dist > 25 && Math.random() < 0.35) {
        createRipple(mouse.x, mouse.y, false);
      }
    }

    isMoving = true;
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => { isMoving = false; }, 100);
  });

  // Generate strong ripple on click
  document.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY, true);
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    isMoving = false;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Ripple {
    constructor(x, y, isClick = false, isCenter = false) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.isCenter = isCenter;
      
      if (isCenter) {
        this.maxRadius = Math.max(width, height) * 0.85;
        this.speed = 1.5; // Slow, smooth expansion
        this.alpha = 0.25; // Soft, ambient opacity
        // Fade out completely when it reaches maxRadius
        this.fadeSpeed = (this.alpha * this.speed) / this.maxRadius;
      } else {
        this.maxRadius = isClick ? Math.random() * 150 + 200 : Math.random() * 80 + 80;
        this.speed = isClick ? 3.5 : 2.0;
        this.alpha = 0.5;
        this.fadeSpeed = isClick ? 0.008 : 0.015;
      }
    }

    update() {
      this.radius += this.speed;
      this.alpha -= this.fadeSpeed;
      if (this.alpha < 0) this.alpha = 0;
    }

    draw() {
      if (this.alpha <= 0) return;
      
      const themeColor = document.documentElement.getAttribute('data-theme') === 'light'
        ? 'rgba(59, 130, 246, '
        : 'rgba(96, 165, 250, ';

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = themeColor + this.alpha + ')';
      ctx.lineWidth = this.isCenter ? 1.0 : 1.5;
      ctx.stroke();

      if (this.radius > 30) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius - 30, 0, Math.PI * 2);
        ctx.strokeStyle = themeColor + (this.alpha * 0.4) + ')';
        ctx.lineWidth = this.isCenter ? 0.5 : 1.0;
        ctx.stroke();
      }
    }
  }

  function createRipple(x, y, isClick, isCenter = false) {
    ripples.push(new Ripple(x, y, isClick, isCenter));
    if (ripples.length > 40) ripples.shift();
  }

  class Cloud {
    constructor(isInitial = false) {
      this.reset(isInitial);
    }

    reset(isInitial = false) {
      this.scale = Math.random() * 1.5 + 0.8;
      this.x = isInitial ? Math.random() * (width + 300) - 150 : -200 * this.scale;
      this.y = Math.random() * (height * 0.35);
      this.speed = Math.random() * 0.12 + 0.08;
      this.opacity = Math.random() * 0.1 + 0.16;
      this.morphPhase = Math.random() * 100;
      this.morphSpeed = Math.random() * 0.005 + 0.002;
    }

    update() {
      this.x += this.speed;
      this.morphPhase += this.morphSpeed;
      if (this.x > width + 200 * this.scale) {
        this.reset(false);
      }
    }

    draw() {
      const theme = document.documentElement.getAttribute('data-theme');
      
      // Volumetric lighting: Create a vertical linear gradient from top to bottom
      const grad = ctx.createLinearGradient(this.x, this.y - 45 * this.scale, this.x, this.y + 30 * this.scale);
      if (theme === 'light') {
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        grad.addColorStop(1, `rgba(220, 228, 240, ${this.opacity * 0.55})`);
      } else {
        grad.addColorStop(0, `rgba(219, 234, 254, ${this.opacity})`);
        grad.addColorStop(1, `rgba(96, 165, 250, ${this.opacity * 0.25})`);
      }
      ctx.fillStyle = grad;

      ctx.filter = `blur(${12 * this.scale}px)`;

      // Morphing offsets to slowly reshape the cloud as it drifts
      const leftXOffset = -35 * this.scale + Math.sin(this.morphPhase) * 6 * this.scale;
      const leftYOffset = 12 * this.scale + Math.cos(this.morphPhase) * 3 * this.scale;
      const rightXOffset = 35 * this.scale + Math.cos(this.morphPhase) * 6 * this.scale;
      const rightYOffset = 12 * this.scale + Math.sin(this.morphPhase) * 3 * this.scale;

      ctx.beginPath();
      ctx.arc(this.x, this.y, 45 * this.scale, 0, Math.PI * 2);
      ctx.moveTo(this.x + leftXOffset, this.y + leftYOffset);
      ctx.arc(this.x + leftXOffset, this.y + leftYOffset, 30 * this.scale, 0, Math.PI * 2);
      ctx.moveTo(this.x + rightXOffset, this.y + rightYOffset);
      ctx.arc(this.x + rightXOffset, this.y + rightYOffset, 30 * this.scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.filter = 'none';
    }
  }

  class Bird {
    constructor(isInitial = false, leader = null, offsetX = 0, offsetY = 0) {
      this.leader = leader;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.reset(isInitial);
    }

    reset(isInitial = false) {
      this.scale = (this.leader ? this.leader.scale : Math.random() * 0.3 + 0.6) * (this.leader ? 0.93 : 1.0);
      
      if (!this.leader) {
        this.x = isInitial ? Math.random() * (width - 200) : -100;
        this.y = Math.random() * (height * 0.3) + 60;
        this.speedX = Math.random() * 0.4 + 0.65;
        this.speedY = (Math.random() - 0.5) * 0.08;
      } else {
        this.x = this.leader.x + this.offsetX;
        this.y = this.leader.y + this.offsetY;
      }

      this.wingPhase = Math.random() * Math.PI * 2;
      this.wingSpeed = Math.random() * 0.08 + 0.06;
      this.currentWingHeight = 0;
      this.opacity = Math.random() * 0.2 + 0.65; // Highly visible

      this.isGliding = false;
      this.glideTimer = Math.random() * 120 + 80; // frames before switching flap/glide
    }

    update() {
      if (!this.leader) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Keep leader bird inside reasonable vertical sky bounds
        if (this.y < 50 || this.y > height * 0.45) {
          this.speedY = -this.speedY;
        }

        if (this.x > width + 150) {
          this.reset(false);
          // Instantly reset followers so they teleport back instead of dragging across the canvas
          birds.forEach(b => {
            if (b.leader === this) b.reset(false);
          });
        }
      } else {
        // Smooth flocking tracking with slight organic lag
        const targetX = this.leader.x + this.offsetX;
        const targetY = this.leader.y + this.offsetY;
        this.x += (targetX - this.x) * 0.08;
        this.y += (targetY - this.y) * 0.08;
      }

      // Gliding/Flapping state machine
      this.glideTimer--;
      if (this.glideTimer <= 0) {
        this.isGliding = !this.isGliding;
        this.glideTimer = this.isGliding 
          ? Math.random() * 60 + 40   // glide for 1-2s
          : Math.random() * 140 + 80; // flap for 2-3.5s
      }

      if (!this.isGliding) {
        this.wingPhase += this.wingSpeed;
      }

      // Target wing height sweep
      const targetWingHeight = this.isGliding 
        ? -1.8 * this.scale 
        : Math.sin(this.wingPhase) * 6 * this.scale;
      
      // Interpolate for smooth wing movement (no sudden snapping)
      this.currentWingHeight += (targetWingHeight - this.currentWingHeight) * 0.15;
    }

    draw() {
      if (this.x < -30 || this.x > width + 30) return;

      const theme = document.documentElement.getAttribute('data-theme');
      const color = theme === 'light' 
        ? `rgba(15, 23, 42, ${this.opacity})` 
        : `rgba(147, 197, 253, ${this.opacity})`;

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3 * this.scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const wingSpan = 14 * this.scale;

      // Draw swept back left wing
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.quadraticCurveTo(
        this.x - wingSpan * 0.4, 
        this.y - wingSpan * 0.3 - this.currentWingHeight, 
        this.x - wingSpan * 0.9, 
        this.y - this.currentWingHeight + 1.5 * this.scale
      );
      ctx.stroke();

      // Draw swept back right wing
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.quadraticCurveTo(
        this.x + wingSpan * 0.4, 
        this.y - wingSpan * 0.3 - this.currentWingHeight, 
        this.x + wingSpan * 0.8, 
        this.y - this.currentWingHeight + 1.5 * this.scale
      );
      ctx.stroke();

      // Draw realistic tail/torso line
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - 4 * this.scale, this.y + 1.5 * this.scale);
      ctx.stroke();
    }
  }

  class Airplane {
    constructor() {
      this.reset();
      // Start offscreen
      this.x = -250;
    }

    reset() {
      this.scale = Math.random() * 0.4 + 1.5; // Large close flight (1.5 to 1.9)
      this.x = -250;
      this.y = Math.random() * (height * 0.15) + height * 0.15; // Lower altitude (15-30% height)
      this.speed = Math.random() * 0.6 + 1.2; // Faster, realistic crossing speed
      this.opacity = Math.random() * 0.12 + 0.30; // Subtle silhouette
      this.contrailL = [];
      this.contrailR = [];
    }

    update() {
      this.x += this.speed;
      
      // Emit dual contrails from the engines (offset from center)
      const engineOffset = 8 * this.scale;
      const emitX = this.x - 5 * this.scale;
      
      if (frameCount % 3 === 0) {
        this.contrailL.push({
          x: emitX,
          y: this.y - engineOffset,
          alpha: 0.28,
          radius: 1.8 * this.scale
        });
        this.contrailR.push({
          x: emitX,
          y: this.y + engineOffset,
          alpha: 0.28,
          radius: 1.8 * this.scale
        });
      }

      // Update contrail dispersion
      const updateTrail = (trail) => {
        trail.forEach(pt => {
          pt.alpha -= 0.0015; // disperses a bit faster since it's closer
          pt.radius += 0.05; // spreads wider
        });
        return trail.filter(pt => pt.alpha > 0);
      };
      
      this.contrailL = updateTrail(this.contrailL);
      this.contrailR = updateTrail(this.contrailR);

      if (this.x > width + 250) {
        this.reset();
      }
    }

    draw() {
      const theme = document.documentElement.getAttribute('data-theme');
      
      // 1. Draw dual contrails
      const drawTrail = (trail) => {
        for (let i = 1; i < trail.length; i++) {
          const p1 = trail[i - 1];
          const p2 = trail[i];
          ctx.strokeStyle = theme === 'light' 
            ? `rgba(15, 23, 42, ${p1.alpha * 0.35})` 
            : `rgba(255, 255, 255, ${p1.alpha * 0.85})`;
          ctx.lineWidth = p1.radius;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      };
      
      drawTrail(this.contrailL);
      drawTrail(this.contrailR);

      // 2. Draw Airplane Silhouette with engines
      ctx.fillStyle = theme === 'light' 
        ? `rgba(15, 23, 42, ${this.opacity})` 
        : `rgba(255, 255, 255, ${this.opacity})`;

      ctx.beginPath();
      // Fuselage (Sleek main body)
      ctx.ellipse(this.x, this.y, 25 * this.scale, 4.5 * this.scale, 0, 0, Math.PI * 2);
      
      // Swept back main wings
      ctx.moveTo(this.x - 3 * this.scale, this.y);
      ctx.lineTo(this.x - 16 * this.scale, this.y - 28 * this.scale);
      ctx.lineTo(this.x - 11 * this.scale, this.y - 28 * this.scale);
      ctx.lineTo(this.x + 6 * this.scale, this.y);
      ctx.lineTo(this.x - 11 * this.scale, this.y + 28 * this.scale);
      ctx.lineTo(this.x - 16 * this.scale, this.y + 28 * this.scale);
      
      // Tail Horizontal Stabilizers
      ctx.moveTo(this.x - 18 * this.scale, this.y);
      ctx.lineTo(this.x - 24 * this.scale, this.y - 8 * this.scale);
      ctx.lineTo(this.x - 21 * this.scale, this.y - 8 * this.scale);
      ctx.lineTo(this.x - 14 * this.scale, this.y);
      ctx.lineTo(this.x - 21 * this.scale, this.y + 8 * this.scale);
      ctx.lineTo(this.x - 24 * this.scale, this.y + 8 * this.scale);
      ctx.fill();

      // Wing engines (nacelles)
      ctx.beginPath();
      // Left engine
      ctx.ellipse(this.x - 2 * this.scale, this.y - 8 * this.scale, 6 * this.scale, 1.8 * this.scale, 0, 0, Math.PI * 2);
      // Right engine
      ctx.ellipse(this.x - 2 * this.scale, this.y + 8 * this.scale, 6 * this.scale, 1.8 * this.scale, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class Thunder {
    constructor() {
      this.active = false;
      this.bolt = [];
      this.branches = [];
      this.flashAlpha = 0;
      this.life = 0;
    }

    trigger() {
      this.active = true;
      this.life = 25; // 25 frames of flash sequence
      this.bolt = [];
      this.branches = [];

      const startX = Math.random() * width;
      let currentX = startX;
      let currentY = 0;
      this.bolt.push({ x: currentX, y: currentY });

      // Generate lightning bolt path using random walk
      while (currentY < height * 0.5) {
        currentY += Math.random() * 25 + 15;
        currentX += (Math.random() - 0.5) * 45;
        this.bolt.push({ x: currentX, y: currentY });

        // Branching: 20% chance to spawn a sub-branch
        if (Math.random() < 0.2) {
          let branchX = currentX;
          let branchY = currentY;
          const branchPath = [{ x: branchX, y: branchY }];
          for (let i = 0; i < 5; i++) {
            branchY += Math.random() * 20 + 10;
            branchX += (Math.random() - 0.3) * 30; // Swept to one side
            branchPath.push({ x: branchX, y: branchY });
          }
          this.branches.push(branchPath);
        }
      }
    }

    update() {
      if (!this.active) return;
      this.life--;

      // Double-stroke flicker pattern
      if (this.life > 20) {
        this.flashAlpha = 0.35; // Initial bright flash
      } else if (this.life > 17) {
        this.flashAlpha = 0.0; // Quick dark gap
      } else if (this.life > 12) {
        this.flashAlpha = 0.25; // Second stroke
      } else {
        this.flashAlpha = (this.life / 12) * 0.1; // Slow decay
      }

      if (this.life <= 0) {
        this.active = false;
        this.flashAlpha = 0;
      }
    }

    draw() {
      if (!this.active) return;

      // 1. Draw full-sky ambient flash
      ctx.fillStyle = `rgba(191, 219, 254, ${this.flashAlpha * 0.4})`;
      ctx.fillRect(0, 0, width, height);

      // Only draw the actual bolts during the bright strokes
      const shouldDrawBolt = (this.life > 20) || (this.life > 12 && this.life <= 17);
      if (!shouldDrawBolt) return;

      // Glow effect for lightning
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(191, 219, 254, 0.8)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw main bolt
      ctx.beginPath();
      ctx.moveTo(this.bolt[0].x, this.bolt[0].y);
      for (let i = 1; i < this.bolt.length; i++) {
        ctx.lineTo(this.bolt[i].x, this.bolt[i].y);
      }
      ctx.stroke();

      // Draw branch bolts (thinner)
      ctx.lineWidth = 1.2;
      this.branches.forEach(path => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
      });

      // Reset shadow settings for other canvas drawings
      ctx.shadowBlur = 0;
    }
  }

  function initAtmosphere() {
    clouds = [
      new Cloud(true),
      new Cloud(true),
      new Cloud(true)
    ];

    const leader = new Bird(true);
    birds = [
      leader,
      new Bird(true, leader, -25, 15),
      new Bird(true, leader, -50, -10),
      new Bird(true, leader, -40, 25),
      new Bird(true, leader, -70, 5)
    ];

    airplane = new Airplane();
    thunder = new Thunder();
  }
  initAtmosphere();

  // Ambient sine waves for the background
  class AmbientWave {
    constructor(yOffset, amplitude, period, speed, opacityModifier) {
      this.yOffset = yOffset;
      this.amplitude = amplitude;
      this.period = period;
      this.speed = speed;
      this.opacityModifier = opacityModifier;
      this.phase = Math.random() * 100;
    }

    update() {
      this.phase += this.speed;
    }

    draw() {
      const theme = document.documentElement.getAttribute('data-theme');
      const waveColor = theme === 'light'
        ? `rgba(59, 130, 246, ${0.015 * this.opacityModifier})`
        : `rgba(59, 130, 246, ${0.035 * this.opacityModifier})`;
      
      ctx.fillStyle = waveColor;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        let y = Math.sin(x * this.period + this.phase) * this.amplitude + (height * this.yOffset);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Set up 3 overlapping waves
  let ambientWavesList = [];
  function initWaves() {
    ambientWavesList = [
      new AmbientWave(0.85, 30, 0.0015, 0.003, 1.0),
      new AmbientWave(0.88, 20, 0.0025, -0.004, 0.8),
      new AmbientWave(0.82, 12, 0.0035, 0.006, 0.5)
    ];
  }
  initWaves();

  // Idle ripple generator
  let idleTime = 0;
  setInterval(() => {
    idleTime++;
    if (idleTime > 6 && ripples.length < 5) {
      createRipple(Math.random() * width, Math.random() * height, false);
      idleTime = 0;
    }
  }, 1000);

  document.addEventListener('mousemove', () => { idleTime = 0; });
  document.addEventListener('click', () => { idleTime = 0; });

  let frameCount = 119; // Start at 119 so the first center ripple spawns instantly on load

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const theme = document.documentElement.getAttribute('data-theme');

    // 1. Draw Clouds (very back background layer)
    clouds.forEach(c => {
      c.update();
      c.draw();
    });

    // 2. Draw Ambient Waves (middle background layer)
    ambientWavesList.forEach(w => {
      w.update();
      w.draw();
    });

    // 3. Draw Birds (middle foreground layer)
    birds.forEach(b => {
      b.update();
      b.draw();
    });

    // 4. Draw Airplane
    airplane.update();
    airplane.draw();

    // 5. Update and Draw Thunder (in dark mode only)
    if (theme === 'dark') {
      if (!thunder.active && Math.random() < 0.001) { // 0.1% chance per frame (~once every 16 seconds)
        thunder.trigger();
      }
      thunder.update();
      thunder.draw();
    }

    // Auto-emit center ripples consistently in a loop
    frameCount++;
    if (frameCount % 120 === 0) { // Every 2 seconds (120 frames @ 60fps)
      createRipple(width / 2, height / 2, false, true);
    }

    ripples.forEach(r => {
      r.update();
      r.draw();
    });
    ripples = ripples.filter(r => r.alpha > 0);

    requestAnimationFrame(animate);
  }

  animate();
}


/* ══════════════════════════════════
   GSAP SCROLL ANIMATIONS
══════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

// Hero — initial entrance
gsap.utils.toArray('.hero-content .reveal-fade').forEach(el => {
  const delay = parseFloat(el.dataset.delay || 0);
  gsap.fromTo(el,
    { opacity: 0 },
    {
      opacity: 1,
      delay: 0.3 + delay,
      duration: 1,
      ease: 'power3.out'
    }
  );
});

gsap.utils.toArray('.hero-content .reveal-up').forEach(el => {
  const delay = parseFloat(el.dataset.delay || 0);
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      delay: 0.3 + delay,
      duration: 1,
      ease: 'power3.out'
    }
  );
});

gsap.fromTo('.hero-scroll-indicator',
  { opacity: 0 },
  { opacity: 1, delay: 1.2, duration: 0.8, ease: 'power2.out' }
);

// Scroll-triggered reveals for all other sections
function setupScrollReveal(selector, fromVars, toVars) {
  gsap.utils.toArray(selector).forEach(el => {
    const delay = parseFloat(el.dataset.delay || 0);
    gsap.fromTo(el, fromVars, {
      ...toVars,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// Exclude hero children (already animated)
setupScrollReveal(
  'section:not(#home) .reveal-fade',
  { opacity: 0 },
  { opacity: 1, duration: 0.9, ease: 'power2.out' }
);

setupScrollReveal(
  'section:not(#home) .reveal-up',
  { opacity: 0, y: 36 },
  { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
);

// Parallax on about image
gsap.to('.about-img', {
  yPercent: -8,
  ease: 'none',
  scrollTrigger: {
    trigger: '.about',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

// Portfolio cards stagger
gsap.utils.toArray('.project-card').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: (i % 3) * 0.1,
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  );
});

/* ══════════════════════════════════
   COUNTING STATS ANIMATION
══════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 30);
  });
}

// Trigger counter when about section enters viewport
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  }, { threshold: 0.5 });
  counterObserver.observe(aboutStats);
}

/* ══════════════════════════════════
   PORTFOLIO MODAL
══════════════════════════════════ */
const projectData = {
  1: {
    title: 'FlowTrack AI - Project Management System',
    role: 'UX Creative Director',
    image: 'images/project-1/1.png',
    images: ['images/project-1/1.png', 'images/project-1/2.png', 'images/project-1/3.png', 'images/project-1/4.png'],
    desc: 'AI-Powered Project Management & Issue Tracking System - A world-class, production-ready frontend application inspired by Jira, built with React, Tailwind CSS, and AI integration. Featuring real-time drag-and-drop Kanban boards, sprint management, analytics, automation, and AI-powered features.',
    tags: ['UX Architecture', 'Front-End Development', 'Enterprise UX'],
    url: 'https://flowtrackai.netlify.app/',
    docUrl: 'FlowTrack_AI_IA_Flow_Map.html'
  },
  2: {
    title: 'Deepfake Defense Dashboard - 2026 Initiative',
    role: 'Lead UX Architect',
    image: 'images/project-2/1.png',
    images: ['images/project-2/1.png', 'images/project-2/2.png', 'images/project-2/3.png'],
    desc: 'Understanding the technology behind synthetic media is the first step in defending against it. Deepfakes leverage deep neural networks—primarily Generative Adversarial Networks (GANs) and Diffusion Models—to synthesize hyper-realistic content.',
    tags: ['UX Architecture', 'Enterprise UX'],
    url: 'https://deepfakedefence-dashboard.vercel.app/',
    docUrl: 'deepfake-defense-ia-diagrams.html'
  },
  3: {
    title: 'Radiostream - Worldwide Radio Network is A Live!',
    role: 'UX Creative Director',
    image: 'images/project-3/1.png',
    images: ['images/project-3/1.png'],
    desc: 'Radiostream is a Online Radio stations live streaming platform. It has schedule management, live streaming, Radio Shows, Live DJ announcements, Dj Studio, and listener engagement features. I led the UX strategy, component library development to ensure a cohesive and intuitive user experience across the platform.',
    tags: ['UX Strategy', 'React', 'Component Library', 'Documentation'],
    url: 'https://radioflowlive.netlify.app/',
    docUrl: 'radiostream-information-architecture.html'
  },
  4: {
    title: 'EduCore - School Mgmt. Software',
    role: 'UX Director — AI',
    image: 'images/project-4/1.png',
    images: ['images/project-4/1.png'],
    desc: 'Develop a modern, scalable, cloud-ready School Management Software (SMS) tailored for Indian schools (CBSE, ICSE, State Boards). The system should centralize academic, administrative, financial, and communication workflows.',
    tags: ['Agentic AI', 'Conversational UX', 'Prototyping'],
    url: 'https://schoolmgmtapp.vercel.app/',
    docUrl: 'educore_sms.html'
  },
  5: {
    title: 'Army Commando Intel System',
    role: 'Principal UX Lead',
    image: 'images/project-5/1.png',
    images: ['images/project-5/1.png'],
    desc: 'comprehensive military command dashboard built with React and Vite. It provides real-time situational awareness through an interactive interface featuring tactical maps, surveillance feeds, intelligence updates, and mission planning tools.',
    tags: ['UX Design', 'Prototype', 'Frontend'],
    url: 'https://armycommandointel.netlify.app/',
    docUrl: 'ACIS.html'
  },
  6: {
    title: 'SteamVerde - Online Streaming Platform',
    role: 'UX Lead - AI',
    image: 'images/project-6/1.png',
    images: ['images/project-6/1.png'],
    desc: 'A cloud-native OTT/IPTV platform delivering Live TV, VOD, Catch-up TV, Cloud DVR, AI-powered recommendations, and full operator management. Built as a complete SaaS/OTT/Middleware solution for subscribers, and content providers. I led the UX strategy, prototyping, and design system creation to ensure a seamless and engaging user experience across web and mobile platforms.',
    tags: ['UX Prototyping', 'Front-End Design', 'Content Strategy'],
    url: 'https://streamverde.netlify.app/',
    docUrl: 'StreamVerde_IA.html'
  },

  /* ── WEBSITES ─────────────────────────────────────────── */
  7: {
    title: 'VOXAR - AI Video Creation Platform',
    role: 'UX Designer / Frontend',
    image: 'images/project-7/1.png',
    images: ['images/project-7/1.png'],
    desc: 'VOXAR transforms written scripts into studio-quality videos with photorealistic avatars and 140+ voice clones — in minutes, not months.',
    tags: ['Web Design', 'UX', 'Frontend'],
    url: 'https://venkateshcreations.github.io/VOXAR-AI/',
    docUrl: 'https://venkateshcreations.github.io/VOXAR-AI/VOXAR_AI_FEATURES_AND_EXPERIENCE.html'
  },
  8: {
    title: 'Zippo.SYS - Financial Operations Terminal',
    role: 'UX Designer / Frontend',
    image: 'images/project-8/1.png',
    images: ['images/project-8/1.png'],
    desc: 'Secure Finance vault with advanced encryption and access controls, booting financial operations, optimizing spend protocols, with system terminal control.',
    tags: ['Branding', 'UI Design', 'Creative Frontend'],
    url: 'https://venkateshcreations.github.io/Zippo.SYS/',
    docUrl: 'https://venkateshcreations.github.io/Zippo.SYS/Zippo_sys_WEBSITE_FEATURES_AND_EXPERIENCE.html'
  },
  9: {
    title: 'AXIOM — Autonomous Cyber Defense Platform',
    role: 'Frontend Designer',
    image: 'images/project-9/1.png',
    images: ['images/project-9/1.png', 'images/project-9/2.png'],
    desc: 'A full-styled, client-side cybersecurity dashboard and marketing website for a fictional autonomous AI-driven security platform called **AXIOM**.',
    tags: ['Dashboard UX', 'App UX Design', 'Frontend Development'],
    url: 'https://venkateshcreations.github.io/AXIOM/',
    docUrl: 'https://venkateshcreations.github.io/AXIOM/AXIOM_README.html'
  },
  10: {
    title: 'ORBITA - Next-Gen Space Communications',
    role: 'UX Lead – Frontend Designer',
    image: 'images/project-10/1.png',
    images: ['images/project-10/1.png', 'images/project-10/2.png'],
    desc: 'A sovereign constellation of satellites delivering ultra-low latency broadband, precision telemetry, and secure inter-agency communications across every orbital regime.',
    tags: ['Frontend Development', 'UI Design', 'UX Lead'],
    url: 'https://venkateshcreations.github.io/ORBITA/',
    docUrl: 'https://venkateshcreations.github.io/ORBITA/ORBITA_README.html'
  },
  11: {
    title: 'Deepfake Defense - 2026 Initiative',
    role: 'UX Lead – Content Strategy',
    image: 'images/project-11/1.png',
    images: ['images/project-11/1.png', 'images/project-11/2.png', 'images/project-11/3.png'],
    desc: 'Deepfakes are synthetic media created using artificial intelligence - audio voice clones, video face-swaps, and fabricated images/documents. The technology has crossed from novelty to a **board-level risk**.',
    tags: ['AI UX Design', 'Content Strategy', 'UX Writing'],
    url: 'https://deepfake-defence.vercel.app/',
    docUrl: 'https://deepfake-defence.vercel.app/Deepfake_Defense_Program_Guide.html'
  },
  12: {
    title: 'Autofy - AI-Powered Analytics Dashboard',
    role: 'UX Creative Director',
    image: 'images/project-12/1.png',
    images: ['images/project-12/1.png'],
    desc: 'Direct operational control for analytical power users. Raw performance metrics delivered via proprietary recursive engine. Zero abstraction layer. Optimized for 100% throughput efficiency.',
    tags: ['Portfolio Site', 'Motion Design', 'GSAP'],
    url: 'https://venkateshcreations.github.io/Autofy/',
    docUrl: 'https://venkateshcreations.github.io/Autofy/Autofy_FEATURES_AND_EXPERIENCE.html'
  },
  13: {
    title: 'Enterprise Digital Banking Ecosystem',
    role: 'UX Lead Architect',
    image: 'images/project-13/1.png',
    images: ['images/project-13/1.png', 'images/project-13/2.png'],
    desc: 'An interactive, single-page visualization of an enterprise banking IT ecosystem built with **D3.js v7**. Displays 103 connected services across 9 domains with 6 chart types, real-time analytics, status tracking, and 13 power-user features.',
    tags: ['UX Architecture', 'Front-End', 'UX Design'],
    url: 'https://venkateshcreations.github.io/DataVisualization-1/',
    docUrl: 'https://venkateshcreations.github.io/DataVisualization-1/doc.html'
  },
  14: {
    title: 'Digital Transformation Intelligence Hub',
    role: 'UX Lead Architect',
    image: 'images/project-14/1.png',
    images: ['images/project-14/1.png'],
    desc: 'An interactive enterprise portfolio dashboard built with **D3.js v7** featuring 9 interconnected data visualizations that map GlobalTech Industries\' digital transformation journey from 2023 to 2027.',
    tags: ['UX Design', 'Frontend Design', 'Mapping'],
    url: 'https://venkateshcreations.github.io/DataVisualization-2/',
    docUrl: 'https://venkateshcreations.github.io/DataVisualization-2/doc.html'
  },
  15: {
    title: 'GEC — Global Supply Chain Analytics Dashboard',
    role: 'UX Lead Architect',
    image: 'images/project-15/1.png',
    images: ['images/project-15/1.png'],
    desc: 'A portfolio-grade, single-page data visualization dashboard for **Global Electronics Corporation (GEC)**, built entirely with **D3.js v7**. Features 12 interactive sections covering the end-to-end supply chain from raw materials to retail.',
    tags: ['UX Architecture', 'Frontend Design', 'UX Designing'],
    url: 'https://venkateshcreations.github.io/DataVisualization-3/',
    docUrl: 'https://venkateshcreations.github.io/DataVisualization-3/doc.html'
  },
  16: {
    title: 'IntelliAssist AI - Product Lifecycle Dashboard',
    role: 'UX Lead Architect',
    image: 'images/project-16/1.png',
    images: ['images/project-16/1.png'],
    desc: 'An interactive data visualization dashboard built with [ECharts](https://echarts.apache.org/) that maps the full AI product development lifecycle for **IntelliAssist AI**, an enterprise AI assistant platform.',
    tags: ['UX Architecture', 'Front-End', 'UX Design'],
    url: 'https://venkateshcreations.github.io/DataVisualization-4/',
    docUrl: 'https://venkateshcreations.github.io/DataVisualization-4/doc.html'
  },
  17: {
    title: 'Enterprise Analytics Dashboard',
    role: 'UX Lead Architect',
    image: 'images/project-17/1.png',
    images: ['images/project-17/1.png'],
    desc: 'An interactive startup ecosystem visualization dashboard for the fictional **FutureVerse Startup Ecosystem (2026)**. Built with a 3D force graph and rich charting to explore entities, funding flows, sector synergies, and predictive projections.',
    tags: ['UX Design', 'Frontend Design', 'Mapping'],
    url: 'https://venkateshcreations.github.io/DataVisualization-5/',
    docUrl: 'https://venkateshcreations.github.io/DataVisualization-5/doc.html'
  },
  18: {
    title: 'Apex Global Enterprises — SOC Command Center',
    role: 'UX Lead Architect',
    image: 'images/project-18/1.png',
    images: ['images/project-18/1.png'],
    desc: 'A cybersecurity data visualization dashboard simulating a fictional multinational enterprise\'s Security Operations Center (SOC). Built with **Apache ECharts**, the dashboard provides real-time threat monitoring, attack path analysis, and enterprise-wide security posture visualization.',
    tags: ['UX Architecture', 'Frontend Design', 'UX Designing'],
    url: 'https://venkateshcreations.github.io/DataVisualization-6/',
    docUrl: 'https://venkateshcreations.github.io/DataVisualization-6/doc.html'
  },

  /* ── DESIGN SYSTEMS ──────────────────────────────────── */
  19: {
    title: 'Design System-1',
    role: 'Lead UX Architect',
    image: 'images/project-19/1.png',
    images: ['images/project-19/1.png'],
    desc: 'The Enterprise Digital Banking Design System is a complete UI framework purpose-built for visualizing complex banking ecosystems, service dependencies, and real-time system status. It provides 38 documented UI components, 58 design tokens, and a consistent motion language — all within a single, portable HTML file.',
    tags: ['UX Architect', 'Frontend Design', 'UX Design'],
    url: 'https://venkateshcreations.github.io/DesignSystems/designsystem-1.html',
    docUrl: 'https://venkateshcreations.github.io/DesignSystems/designsystem-1_README.html'
  },
  20: {
    title: 'Design System-2',
    role: 'Lead UX Architect',
    image: 'images/project-20/1.png',
    images: ['images/project-20/1.png'],
    desc: 'This single-file HTML document serves as the canonical source of truth for product engineering teams building the GlobalTech Digital Transformation Hub. It documents every structural element, interactive component, animation protocol, data model, and usage instruction required to build and maintain the platform.',
    tags: ['UX Architect', 'Frontend Design', 'UX Design'],
    url: 'https://venkateshcreations.github.io/DesignSystems/designsystem-2.html',
    docUrl: 'https://venkateshcreations.github.io/DesignSystems/designsystem-2_README.html'
  },
  21: {
    title: 'Design System-3',
    role: 'Lead UX Architect',
    image: 'images/project-21/1.png',
    images: ['images/project-21/1.png'],
    desc: 'A comprehensive component library and design token system for building supply chain analytics interfaces. Features a dark-first theme with cyan (#22d3ee) and purple (#a78bfa) accents, light mode support, 12 documented components, D3.js chart integration patterns, and a lazy-initialized section routing system.',
    tags: ['UX Architect', 'Frontend Design', 'UX Design'],
    url: 'https://venkateshcreations.github.io/DesignSystems/designsystem-3.html',
    docUrl: 'https://venkateshcreations.github.io/DesignSystems/designsystem-3_README.html'
  },
  22: {
    title: 'Design System-4',
    role: 'Lead UX Architect',
    image: 'images/project-22/1.png',
    images: ['images/project-22/1.png'],
    desc: 'A comprehensive reference for engineers, designers, and system integrators building on the Deepfake Defense program. This document covers every design token, component specification, layout pattern, and usage convention in the system. Use it as the source of truth for extending the site, building the Interactive Dashboard, or integrating detection signals into existing security tooling.',
    tags: ['UX Architect', 'Frontend Design', 'UX Design'],
    url: 'https://venkateshcreations.github.io/DFD-Design-System/',
    docUrl: 'https://venkateshcreations.github.io/DFD-Design-System/Designsystem-4_README.html'
  },
  23: {
    title: 'Design System-5',
    role: 'Lead UX Architect',
    image: 'images/project-23/1.png',
    images: ['images/project-23/1.png'],
    desc: 'A comprehensive design system for the Radiostream live radio platform. Dark-themed, neon-accented, and built for real-time audio experiences. This reference documents all design tokens, components, and usage patterns.',
    tags: ['UX Architect', 'Frontend Design', 'UX Design'],
    url: 'https://venkateshcreations.github.io/DesignSystems/designsystem-5.html',
    docUrl: 'https://venkateshcreations.github.io/DesignSystems/designsystem-5_README.html'
  },
  24: {
    title: 'Design System-6',
    role: 'Lead UX Architect',
    image: 'images/project-24/1.png',
    images: ['images/project-24/1.png'],
    desc: 'AXIOM embodies a dark cyber aesthetic — precise, technical, and authoritative. Every design decision prioritizes clarity in high-stakes environments. The system balances atmospheric immersion with functional readability, using neon accents against deep navy backgrounds to create interfaces that feel both advanced and trustworthy.',
    tags: ['UX Architect', 'Frontend Design', 'UX Design'],
    url: 'https://venkateshcreations.github.io/DesignSystems/designsystem-6.html',
    docUrl: 'https://venkateshcreations.github.io/DesignSystems/designsystem-6_README.html'
  }
};

/* ══════════════════════════════════
   PORTFOLIO TAB SWITCHING
══════════════════════════════════ */
(function initPortfolioTabs() {
  const tabs = document.querySelectorAll('.portfolio-tab');
  const panels = document.querySelectorAll('.portfolio-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update panels — force CSS animation replay
      panels.forEach(panel => {
        panel.classList.remove('active');
      });
      const activePanel = document.getElementById(`panel-${target}`);
      if (activePanel) {
        // Reflow trick so the fade-in replays every time
        void activePanel.offsetWidth;
        activePanel.classList.add('active');
      }
    });

    // Cursor events
    tab.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    tab.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });
})();

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalRole = document.getElementById('modalRole');
const modalDesc = document.getElementById('modalDesc');
const modalTagsEl = document.getElementById('modalTags');
const modalLiveLink = document.getElementById('modalLiveLink');
const modalDocLink = document.getElementById('modalDocLink');

const sliderControls = document.getElementById('sliderControls');
const sliderDots = document.getElementById('sliderDots');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');

let currentSlideIndex = 0;
let currentProjectImages = [];

const modalImageWrap = document.getElementById('modalImageWrap');
const magnifier = document.getElementById('magnifier');

function renderSlider() {
  modalImage.src = currentProjectImages[currentSlideIndex];

  if (magnifier && magnifier.classList.contains('active')) {
    magnifier.style.backgroundImage = `url(${modalImage.src})`;
  }

  if (currentProjectImages.length > 1) {
    sliderControls.classList.remove('hidden');
    sliderDots.classList.remove('hidden');

    sliderDots.innerHTML = currentProjectImages.map((_, i) =>
      `<button class="slider-dot ${i === currentSlideIndex ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');

    document.querySelectorAll('.slider-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        goToSlide(parseInt(e.target.dataset.index));
      });
      dot.addEventListener('mouseenter', () => follower.classList.add('hovered'));
      dot.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
    });
  } else {
    sliderControls.classList.add('hidden');
    sliderDots.classList.add('hidden');
  }
}

function goToSlide(index) {
  if (index < 0) index = currentProjectImages.length - 1;
  if (index >= currentProjectImages.length) index = 0;

  currentSlideIndex = index;

  modalImage.style.opacity = 0;
  setTimeout(() => {
    renderSlider();
    modalImage.style.opacity = 1;
  }, 150);
}

if (sliderPrev) sliderPrev.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
if (sliderNext) sliderNext.addEventListener('click', () => goToSlide(currentSlideIndex + 1));

function openModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  currentProjectImages = data.images || [data.image];
  currentSlideIndex = 0;
  renderSlider();

  modalImage.alt = data.title;
  modalTitle.textContent = data.title;
  modalRole.textContent = data.role;
  modalDesc.textContent = data.desc;
  modalTagsEl.innerHTML = data.tags
    .map((t, i) => `<span class="modal-tag-item tag-pastel-${(i % 5) + 1}">${t}</span>`)
    .join('');

  if (data.url) {
    modalLiveLink.href = data.url;
    modalLiveLink.style.display = 'inline-flex';
  } else {
    modalLiveLink.style.display = 'none';
  }

  if (data.docUrl) {
    modalDocLink.href = data.docUrl;
    modalDocLink.style.display = 'inline-flex';
  } else {
    modalDocLink.style.display = 'none';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Magnifier Effects
if (modalImageWrap && magnifier) {
  const ZOOM_LEVEL = 2.5;

  modalImageWrap.addEventListener('mouseenter', () => {
    // Only show if the modal image source isn't empty
    if (modalImage.src) {
      magnifier.style.backgroundImage = `url(${modalImage.src})`;
      magnifier.style.backgroundSize = `${modalImageWrap.offsetWidth * ZOOM_LEVEL}px ${modalImageWrap.offsetHeight * ZOOM_LEVEL}px`;
      magnifier.classList.add('active');
    }
  });

  modalImageWrap.addEventListener('mouseleave', () => {
    magnifier.classList.remove('active');
  });

  modalImageWrap.addEventListener('mousemove', (e) => {
    if (!magnifier.classList.contains('active')) return;

    // Check if mouse touches slider buttons (because they have pointer events)
    // Actually pointer-events bubble up so e.clientX remains accurate.
    const rect = modalImageWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const magRadius = magnifier.offsetWidth / 2;

    magnifier.style.left = `${x - magRadius}px`;
    magnifier.style.top = `${y - magRadius}px`;

    const bgX = magRadius - x * ZOOM_LEVEL;
    const bgY = magRadius - y * ZOOM_LEVEL;
    magnifier.style.backgroundPosition = `${bgX}px ${bgY}px`;
  });
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  magnifier.classList.remove('active');
}

document.querySelectorAll('.card-preview-btn').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.project));
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('card-preview-btn')) {
      openModal(card.dataset.project);
    }
  });
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ══════════════════════════════════
   CONTACT FORM
══════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Inputs
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const subjectInput = document.getElementById('subject');

  // Error Messages
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Values
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim() || 'New Portfolio Message';
  const message = messageInput.value.trim();

  // Reset Error States
  let isValid = true;
  [nameInput, emailInput, messageInput].forEach(el => el.classList.remove('error'));
  [nameError, emailError, messageError].forEach(el => el.classList.remove('visible'));

  // Name Validation
  if (!name) {
    nameInput.classList.add('error');
    nameError.classList.add('visible');
    isValid = false;
  }

  // Email Validation (Regex check)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    emailInput.classList.add('error');
    emailError.classList.add('visible');
    isValid = false;
  }

  // Message Validation
  if (!message) {
    messageInput.classList.add('error');
    messageError.classList.add('visible');
    isValid = false;
  }

  if (!isValid) return;

  // Real send via FormSubmit AJAX
  const btnText = submitBtn.querySelector('span');
  btnText.textContent = 'Sending…';
  submitBtn.disabled = true;

  fetch('https://formsubmit.co/ajax/venkateshcreations@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      _subject: subject,
      Name: name,
      Email: email,
      Message: message
    })
  })
    .then(response => response.json())
    .then(data => {
      contactForm.reset();
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';

      // Show success message
      formSuccess.textContent = "✓ Message sent! I'll get back to you soon.";
      formSuccess.style.color = "var(--text-primary)";
      formSuccess.style.display = 'block';
      gsap.fromTo(formSuccess,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
      setTimeout(() => {
        gsap.to(formSuccess, {
          opacity: 0, duration: 0.4,
          onComplete: () => { formSuccess.style.display = 'none'; }
        });
      }, 5000);
    })
    .catch(error => {
      console.error(error);
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';

      formSuccess.textContent = "⚠️ Error sending message. Please try the email link.";
      formSuccess.style.color = "#ef4444";
      formSuccess.style.display = 'block';
      setTimeout(() => {
        formSuccess.style.display = 'none';
        formSuccess.style.color = "";
      }, 5000);
    });
});

/* ══════════════════════════════════
   FLOATING BADGE PARALLAX (About)
══════════════════════════════════ */
const aboutSection = document.getElementById('about');
if (aboutSection) {
  aboutSection.addEventListener('mousemove', (e) => {
    const rect = aboutSection.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    document.querySelectorAll('.visual-badge').forEach((badge, i) => {
      const factor = i === 0 ? 8 : -8;
      badge.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });
  aboutSection.addEventListener('mouseleave', () => {
    document.querySelectorAll('.visual-badge').forEach(badge => {
      badge.style.transform = '';
    });
  });
}

/* ══════════════════════════════════
   HERO TITLE ROTATING TEXT
══════════════════════════════════ */
// Managed via CSS animation — nothing needed here

/* ══════════════════════════════════
   UI/UX INTELLIGENCE SYSTEM MARDKOWN LOADER
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const markdownContent = document.getElementById('markdown-content');
  if (markdownContent) {
    fetch('UI-UX-Intelligence-System.md')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => {
        // Escape HTML to display raw markdown properly
        let escapedText = text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

        // Basic VS Code syntax highlighting
        escapedText = escapedText
          // Headers
          .replace(/^(#+)(.*)$/gm, '<span class="md-heading">$1$2</span>')
          // Bold
          .replace(/\*\*(.*?)\*\*/g, '<span class="md-bold">**$1**</span>')
          // List markers (dash, asterisk, or number)
          .replace(/^(\s*)([-*]|\d+\.)(\s)/gm, '$1<span class="md-list-marker">$2</span>$3')
          // Multi-line code blocks
          .replace(/```([\s\S]*?)```/g, '<span class="md-code-block">```$1```</span>')
          // Inline code
          .replace(/`([^`\n]+)`/g, '<span class="md-code-inline">`$1`</span>')
          // Horizontal rules
          .replace(/^(---|\*\*\*)$/gm, '<span class="md-hr">$1</span>')
          // Links or images
          .replace(/(\[.*?\])(\(.*?\))/g, '<span class="md-link-text">$1</span><span class="md-link-url">$2</span>');

        markdownContent.innerHTML = escapedText;
      })
      .catch(error => {
        console.error('Error loading markdown file:', error);
        markdownContent.textContent = 'Error loading intelligent architecture system. Please ensure you are running on a local server (e.g. Live Server).';
      });
  }
});

/* ══════════════════════════════════
   ARCHITECTURE DIAGRAM POPOVER
   ══════════════════════════════════ */
const popover = document.getElementById('architecturePopover');
const popoverClose = document.getElementById('popoverClose');
const popoverBackdrop = document.getElementById('popoverBackdrop');
const popoverImage = document.getElementById('popoverImage');
const viewArchitectureBtn = document.getElementById('viewArchitectureBtn');

function openPopover() {
  if (!popover || !popoverImage) return;

  // Determine image based on active theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  if (currentTheme === 'light') {
    popoverImage.src = 'images/UI-UX_Intelli-System_Light_Theme.jpg';
  } else {
    popoverImage.src = 'images/UI-UX_Intelli-System_Dark_Theme.jpg';
  }

  popover.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePopover() {
  if (!popover) return;
  popover.classList.remove('open');
  document.body.style.overflow = '';
}

if (viewArchitectureBtn) {
  viewArchitectureBtn.addEventListener('click', openPopover);
}
if (popoverClose) {
  popoverClose.addEventListener('click', closePopover);
}
if (popoverBackdrop) {
  popoverBackdrop.addEventListener('click', closePopover);
}

// Bind Escape key to close the popover as well
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePopover();
  }
});

// Garuda Audio Player Logic (Popover & Visualizer)
document.addEventListener('DOMContentLoaded', () => {
  const triggerBtn = document.getElementById('openGarudaPlayerBtn');
  const popover = document.getElementById('garudaAudioPopover');
  const backdrop = document.getElementById('garudaPopoverBackdrop');
  const closeBtn = document.getElementById('garudaPopoverClose');
  
  const garudaAudio = document.getElementById('garudaAudio');
  const garudaMainPlayBtn = document.getElementById('garudaMainPlayBtn');
  const garudaPrevBtn = document.getElementById('garudaPrevBtn');
  const garudaNextBtn = document.getElementById('garudaNextBtn');
  
  const playIcon = document.querySelector('.media-play-icon');
  const pauseIcon = document.querySelector('.media-pause-icon');
  
  const canvas = document.getElementById('audioVisualizer');
  
  let audioCtx;
  let analyser;
  let source;
  let isInitialized = false;
  let animationId;

  if (!triggerBtn || !popover || !garudaAudio) return;

  const initWebAudio = () => {
    if (isInitialized) return;
    
    // Create audio context
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    
    // Connect audio element to analyzer
    source = audioCtx.createMediaElementSource(garudaAudio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    isInitialized = true;
  };

  const drawVisualizer = () => {
    if (!canvas || !analyser) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      if (garudaAudio.paused) return; // stop animation loop if paused
      animationId = requestAnimationFrame(draw);
      
      analyser.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, width, height);
      
      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * height;
        
        // Gradient coloring based on frequency (like a heat map)
        const hue = (i / bufferLength) * 120; // 0 to 120 (Red to Green)
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        
        // Draw bars from bottom up
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };
    
    draw();
  };

  const updatePlayState = (isPlaying) => {
    if (isPlaying) {
      garudaMainPlayBtn.setAttribute('aria-label', 'Pause');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
      if (audioCtx && audioCtx.state === 'suspended') {
         audioCtx.resume();
      }
      drawVisualizer(); // restart animation loop
    } else {
      garudaMainPlayBtn.setAttribute('aria-label', 'Play');
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      cancelAnimationFrame(animationId);
    }
  };

  const openPlayer = () => {
    initWebAudio(); // Init audio context on user interaction
    popover.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closePlayer = () => {
    popover.classList.remove('open');
    document.body.style.overflow = '';
    garudaAudio.pause();
    updatePlayState(false);
  };

  // Popover Triggers
  triggerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openPlayer();
  });
  
  closeBtn.addEventListener('click', closePlayer);
  backdrop.addEventListener('click', closePlayer);
  
  // Media Controls
  garudaMainPlayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (garudaAudio.paused) {
      garudaAudio.play().then(() => updatePlayState(true)).catch(console.error);
    } else {
      garudaAudio.pause();
      updatePlayState(false);
    }
  });

  // Prev/Next functionality (-10s / +10s)
  garudaPrevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    garudaAudio.currentTime = Math.max(0, garudaAudio.currentTime - 10);
  });

  garudaNextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    garudaAudio.currentTime = Math.min(garudaAudio.duration, garudaAudio.currentTime + 10);
  });

  garudaAudio.addEventListener('ended', () => {
    updatePlayState(false);
  });
});
