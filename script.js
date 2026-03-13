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
   INTERACTIVE PARTICLE BACKGROUND
══════════════════════════════════ */
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null };

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 2 + 0.8; // slightly larger dot
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repel interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let repelRadius = 150;

        if (distance < repelRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (repelRadius - distance) / repelRadius;

          this.x -= forceDirectionX * force * 5;
          this.y -= forceDirectionY * force * 5;
        }
      }
    }

    draw() {
      ctx.fillStyle = 'rgba(180, 180, 180, 0.6)'; // slightly brighter
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    const numParticles = Math.floor((width * height) / 10000); // denser
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, index) => {
      p.update();
      p.draw();

      // Connecting lines
      for (let j = index + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(180, 180, 180, ${0.4 - dist / 350})`; // stronger line
          ctx.lineWidth = 1.0;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  init();
  animate();
}


/* ══════════════════════════════════
   MOUSE PARALLAX ON HERO
══════════════════════════════════ */
const orbs = document.querySelectorAll('.hero-gradient-orb');
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  orbs.forEach((orb, i) => {
    const strength = (i + 1) * 12;
    orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  });
});

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
    title: 'Threat Intercepting Autonomous System',
    role: 'UX Creative Director',
    image: 'images/project-1/1.jpg',
    images: ['images/project-1/1.jpg', 'images/project-1/2.png', 'images/project-1/3.jpg', 'images/project-1/4.png'],
    desc: 'Startup project - AI-driven Risk Management platform for enterprise users. Led end-to-end UX strategy—from discovery research and journey mapping to interaction design and design elements creation. Reduced cognitive load by 42% and improved task completion by 68%.',
    tags: ['AI/ML UX', 'UX Architecture', 'Data Visualisation', 'Figma', 'Enterprise UX'],
    url: 'https://www.figma.com/proto/1zblbGym1HSKiwsJ4xEUN1/Business-Observability--ECM--Back-up_1?node-id=1-31013&t=2H2Yb1E62XtjNV49-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A44567',
    docUrl: 'https://drive.google.com/file/d/1Bb2cl1e9A5n-RKK4ON6gR2eVWpBQnR-X/view'
  },
  2: {
    title: 'AeroFlow - Flight Ticket Booking',
    role: 'Lead UX Architect',
    image: 'images/project-2/1.png',
    images: ['images/project-2/1.png', 'images/project-2/2.png'],
    desc: 'Create a next-generation AI-powered travel booking ecosystem that enables travelers to plan, book, manage, and optimize their journeys through intelligent automation, personalization, and real-time travel intelligence.',
    tags: ['UX Architecture', 'Enterprise UX'],
    url: 'https://aerofloww.netlify.app/',
    docUrl: 'https://drive.google.com/file/d/1VKOfeXfxt1LhBT-paZmbd67Uf8JVEN4v/view'
  },
  3: {
    title: 'RadioFlow',
    role: 'UX Creative Director',
    image: 'images/project-3/1.png',
    images: ['images/project-3/1.png'],
    desc: 'RadioFlow is a Online Radio stations live streaming platform. It has schedule management, live streaming, Radio Shows, Live DJ announcements, Dj Studio, and listener engagement features. I led the UX strategy, component library development to ensure a cohesive and intuitive user experience across the platform.',
    tags: ['UX Strategy', 'React', 'Component Library', 'Documentation'],
    url: 'https://radioflowlive.netlify.app/',
    docUrl: 'https://drive.google.com/file/d/1lQa8e_bVnJCxg6Hwp1a3_uQlT9w3m74K/view'
  },
  4: {
    title: 'EduCore - School Mgmt. Software',
    role: 'UX Director — AI',
    image: 'images/project-4/1.png',
    images: ['images/project-4/1.png'],
    desc: 'Develop a modern, scalable, cloud-ready School Management Software (SMS) tailored for Indian schools (CBSE, ICSE, State Boards). The system should centralize academic, administrative, financial, and communication workflows.',
    tags: ['Agentic AI', 'Conversational UX', 'Prototyping'],
    url: 'https://schoolmgmtapp.vercel.app/',
    docUrl: 'https://drive.google.com/file/d/1173cg-6WRJamj_3AnMfYC0N2n3bA2esu/view'
  },
  5: {
    title: 'NetVision-Network Monitoring',
    role: 'Principal UX Lead',
    image: 'images/project-5/1.png',
    images: ['images/project-5/1.png'],
    desc: 'next-generation **Network Monitoring Software** focused on : AI-powered insights, predictive analytics, and automated remediation, Zero-touch onboarding, Real-time observability, Highly visual dashboards, AI-driven anomaly detection, Self-healing network capabilities, Natural-language query interface, Role-based access control, API-first architecture, Multi-cloud support, Advanced security features, Comprehensive reporting and analytics, Integration with existing IT tools.',
    tags: ['Prototyping', 'Redesign', 'Enterprise'],
    url: 'https://net-vision-fd14.vercel.app/',
    docUrl: 'https://drive.google.com/file/d/14YMncitRUxkd0QAcyT-SKftXNs4Ulo66/view'
  },
  6: {
    title: 'ProOS - Property Mgmt. Software',
    role: 'UX Lead - AI',
    image: 'images/project-6/1.png',
    images: ['images/project-6/1.png'],
    desc: 'cloud-native, AI-enabled, multi-tenant Property Management SaaS platform, Residential, Commercial, and Mixed-Use properties, Operational efficiency through automation, AI-powered insights and predictions, Tenant experience management, Automated rent collection and financial tracking, Maintenance and work order management, Lease lifecycle management, Compliance and reporting, Self-service portals for tenants and owners, Integration with existing property management tools.',
    tags: ['UX Prototyping', 'Service Design', 'Strategy'],
    url: 'https://propos-property-mgmt.vercel.app/',
    docUrl: 'https://drive.google.com/file/d/1Shl87T-OH_6rPLjlOcSC_plJe4uE57Za/view'
  }
};

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


