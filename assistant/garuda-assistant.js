/**
 * ══════════════════════════════════════════════════════════════
 * GARUDA AI ASSISTANT — MASTER RUNTIME & JARVIS VOICE CONTROLLER
 * Context-Aware: index.html | portfolio.html | resume.html
 * Agentic Multi-Page Dispatcher | Jarvis British Voice Engine
 * ══════════════════════════════════════════════════════════════
 */

(() => {
  "use strict";

  if (document.getElementById("garuda-ai")) return;

  // -------------------------------------------------------------
  // 1. CONTEXTUAL PAGE DETECTION & THEME RESOLUTION
  // -------------------------------------------------------------
  const currentPath = (window.location.pathname || "").toLowerCase();
  const isResumePage = currentPath.includes("resume");
  const isPortfolioPage = currentPath.includes("portfolio");
  const isMainPage = !isResumePage && !isPortfolioPage;

  function isLightTheme() {
    return document.documentElement.getAttribute("data-theme") === "light";
  }

  function getGarudaIconPath() {
    return "images/garuda_logo_anim.gif";
  }

  function getContextualGreeting() {
    if (isResumePage) {
      return {
        text: "At your service, sir. I am Garuda — your executive digital guide to Venkatesh Ammireddy's resume. You can ask me to explain his 13+ years of enterprise career at OPTIMAS.AI, Mindtree, EPSoft, review his IBM Design Thinking certification, or download the PDF resume. How may I assist your review?",
        chips: ["Employment History", "ProVise (Dubai)", "Mindtree Role", "IBM Certification", "Education", "Download PDF"]
      };
    }
    if (isPortfolioPage) {
      return {
        text: "At your service, sir. I am Garuda — your telemetry guide to Venkatesh Ammireddy's extended project showcase. Ask me about live prototypes like Deepfake Defense, AeroFlow, AI HRMS Pro, SteamVerde, or his 6 enterprise design systems. What project shall we inspect?",
        chips: ["AeroFlow Prototype", "AI HRMS Pro", "Deepfake Defense", "SteamVerde Live", "Design Systems", "Main Website"]
      };
    }
    return {
      text: "At your service. I am Garuda — an intelligent Agentic UX system designed by Venkatesh Ammireddy. All telemetry is online across his main portfolio, extended project showcase, and professional digital resume. How may I assist your exploration today, sir?",
      chips: ["Career & Resume", "All 30+ Projects", "Design Systems", "Deepfake Defense", "Workstation Telemetry", "Contact Terminal"]
    };
  }

  const contextData = getContextualGreeting();

  // -------------------------------------------------------------
  // 2. JARVIS ACOUSTIC HUD CHIME (Web Audio API)
  // -------------------------------------------------------------
  function playJarvisChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const now = ctx.currentTime;
      // Futuristic dual-tone blip: D5 (587Hz) gliding up to A5 (880Hz)
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.07);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.17);
    } catch (e) {
      // AudioContext blocked or awaiting user gesture
    }
  }

  // -------------------------------------------------------------
  // 3. DOM INJECTION
  // -------------------------------------------------------------
  const root = document.createElement("div");
  root.id = "garuda-ai";

  root.innerHTML = `
    <!-- Floating Trigger Button -->
    <button id="garuda-ai-toggle" aria-label="Open Garuda AI Voice and Chat Assistant" title="Garuda AI Assistant">
      <div class="garuda-toggle-aura"></div>
      <img src="${getGarudaIconPath()}" alt="Garuda AI" class="garuda-toggle-icon" id="garudaToggleImg" />
      <span class="garuda-toggle-tooltip">Garuda AI Assistant</span>
    </button>

    <!-- Main Assistant HUD Panel -->
    <section id="garuda-ai-panel" hidden aria-label="Garuda AI Assistant Interface">
      <!-- Header -->
      <header class="garuda-header">
        <div class="garuda-brand">
          <div class="garuda-avatar-wrap">
            <img src="${getGarudaIconPath()}" alt="Garuda" id="garudaHeaderImg" />
            <span class="garuda-online-dot"></span>
          </div>
          <div class="garuda-title-wrap">
            <h3>Garuda AI</h3>
            <p>${isResumePage ? "Digital Resume Telemetry" : isPortfolioPage ? "Extended Showcase Terminal" : "Autonomous UX Intelligence"}</p>
          </div>
        </div>

        <div class="garuda-header-actions">
          <button class="garuda-icon-btn" id="garuda-clear-chat" title="Clear Conversation" aria-label="Clear Conversation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
          <button class="garuda-icon-btn active" id="garuda-tts-toggle" title="Toggle Voice Narration" aria-label="Toggle Voice Narration">
            <svg id="ttsOnIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <svg id="ttsOffIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          </button>
          <button class="garuda-icon-btn" id="garuda-close" title="Close Assistant" aria-label="Close Assistant">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <!-- Status Bar -->
      <div class="garuda-status-bar">
        <span class="garuda-status-indicator">
          <span class="garuda-status-dot" id="garuda-status-dot"></span>
          <span id="garuda-status-text">Garuda Core: Online</span>
        </span>
        <span style="opacity: 0.6; font-size: 0.68rem;">Neural Voice Active</span>
      </div>

      <!-- Quick Suggestion Chips with Left/Right Nav Arrows -->
      <div class="garuda-chips-wrapper">
        <button type="button" class="garuda-chips-arrow prev" id="garuda-chips-prev" aria-label="Scroll chips left" title="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="garuda-chips-bar" id="garuda-chips">
          ${contextData.chips.map(c => `<button class="garuda-chip" data-question="${c}">${c}</button>`).join("")}
        </div>
        <button type="button" class="garuda-chips-arrow next" id="garuda-chips-next" aria-label="Scroll chips right" title="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <!-- Messages Stream -->
      <div id="garuda-messages" role="log" aria-live="polite">
        <div class="garuda-msg bot">
          ${contextData.text}
        </div>
      </div>

      <!-- Voice Controls -->
      <div class="garuda-voice-controls">
        <button class="garuda-mic-btn" id="garuda-mic" aria-label="Speak your question">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
          <span id="garuda-mic-label">Vocal Command</span>
        </button>
        <button class="garuda-stop-btn" id="garuda-stop" title="Mute current speech">
          ■ Mute Speech
        </button>
      </div>

      <!-- Voice Preferences Drawer -->
      <div class="garuda-voice-prefs">
        <div class="garuda-pref-item">
          <label for="garuda-voice-sel">Voice:</label>
          <select id="garuda-voice-sel" class="garuda-pref-select">
            <option value="jarvis" selected>Executive British (Neural)</option>
            <option value="us-male">Natural Male (US)</option>
            <option value="female">Natural Female</option>
            <option value="auto">System Natural</option>
          </select>
        </div>
        <div class="garuda-pref-item">
          <label for="garuda-speed-sel">Cadence:</label>
          <select id="garuda-speed-sel" class="garuda-pref-select">
            <option value="0.9">Deliberate</option>
            <option value="1" selected>Optimal (1.0x)</option>
            <option value="1.15">Accelerated</option>
          </select>
        </div>
      </div>

      <!-- Compose Form -->
      <form class="garuda-compose" id="garuda-form">
        <input
          id="garuda-input"
          class="garuda-input"
          type="text"
          placeholder="${isResumePage ? "Ask about career, IBM cert, roles, or say 'Download PDF'..." : isPortfolioPage ? "Ask about AeroFlow, SteamVerde, prototypes..." : "Command Garuda or say 'Show design systems'..."}"
          autocomplete="off"
          aria-label="Ask Garuda AI"
        />
        <button type="submit" class="garuda-send-btn" aria-label="Send command">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </section>
  `;

  document.body.appendChild(root);

  // -------------------------------------------------------------
  // 4. ELEMENT REFERENCES & STATE
  // -------------------------------------------------------------
  const toggleBtn = document.getElementById("garuda-ai-toggle");
  const panel = document.getElementById("garuda-ai-panel");
  const closeBtn = document.getElementById("garuda-close");
  const clearBtn = document.getElementById("garuda-clear-chat");
  const ttsToggleBtn = document.getElementById("garuda-tts-toggle");
  const ttsOnIcon = document.getElementById("ttsOnIcon");
  const ttsOffIcon = document.getElementById("ttsOffIcon");

  const micBtn = document.getElementById("garuda-mic");
  const micLabel = document.getElementById("garuda-mic-label");
  const stopBtn = document.getElementById("garuda-stop");

  const statusDot = document.getElementById("garuda-status-dot");
  const statusText = document.getElementById("garuda-status-text");
  const messagesBox = document.getElementById("garuda-messages");
  const chipsBox = document.getElementById("garuda-chips");
  const chipsPrevBtn = document.getElementById("garuda-chips-prev");
  const chipsNextBtn = document.getElementById("garuda-chips-next");

  const form = document.getElementById("garuda-form");
  const input = document.getElementById("garuda-input");
  const voiceSelect = document.getElementById("garuda-voice-sel");
  const speedSelect = document.getElementById("garuda-speed-sel");

  const toggleImg = document.getElementById("garudaToggleImg");
  const headerImg = document.getElementById("garudaHeaderImg");

  let isTtsEnabled = true;
  let isListening = false;
  let ttsHeartbeat = null;

  // -------------------------------------------------------------
  // 5. THEME OBSERVER (Dynamic Icon Swap)
  // -------------------------------------------------------------
  function updateGarudaIcons() {
    const src = getGarudaIconPath();
    if (toggleImg) toggleImg.src = src;
    if (headerImg) headerImg.src = src;
  }

  const themeObserver = new MutationObserver(() => updateGarudaIcons());
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  // -------------------------------------------------------------
  // 6. AUDIO / VIDEO COLLISION GUARD
  // -------------------------------------------------------------
  function pauseSiteMedia() {
    try {
      document.querySelectorAll("video, audio").forEach(media => {
        if (!media.paused) media.pause();
      });

      const garudaVideo = document.getElementById("meetGarudaVideo");
      if (garudaVideo && garudaVideo.contentWindow) {
        garudaVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
      const introVideo = document.getElementById("showcaseIntroVideo");
      if (introVideo && introVideo.contentWindow) {
        introVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    } catch (e) {
      // Safe cross-origin ignore
    }
  }

  // -------------------------------------------------------------
  // 7. AGENTIC SITE ACTION DISPATCHER (Multi-Page Aware)
  // -------------------------------------------------------------
  function dispatchSiteAction(action) {
    if (!action || !action.type) return;

    switch (action.type) {
      case "OPEN_RESUME": {
        if (isResumePage) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.open("resume.html", "_blank");
        }
        break;
      }

      case "SCROLL_RESUME_SECTION": {
        if (isResumePage) {
          const el = document.querySelector(action.target);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.style.transition = "box-shadow 0.4s ease, border-color 0.4s ease";
            el.style.boxShadow = "0 0 25px rgba(59, 130, 246, 0.6)";
            setTimeout(() => {
              el.style.boxShadow = "";
            }, 2500);
          }
        } else {
          window.open("resume.html", "_blank");
        }
        break;
      }

      case "DOWNLOAD_RESUME_PDF": {
        const a = document.createElement("a");
        a.href = "Ammireddy_Venkatesh_Digital_Resume.pdf";
        a.download = "Ammireddy_Venkatesh_Digital_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        break;
      }

      case "OPEN_PORTFOLIO_PAGE": {
        if (isPortfolioPage) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.open("portfolio.html", "_blank");
        }
        break;
      }

      case "OPEN_EXTERNAL_URL": {
        if (action.url) {
          window.open(action.url, "_blank");
        }
        break;
      }

      case "NAVIGATE_TAB": {
        if (isMainPage) {
          const tabBtn = document.querySelector(`.portfolio-tab[data-tab="${action.tab}"]`);
          if (tabBtn) tabBtn.click();
          const portfolioSec = document.getElementById("portfolio");
          if (portfolioSec) {
            portfolioSec.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else if (isPortfolioPage) {
          const searchInput = document.getElementById("search-input") || document.querySelector("input[type='search'], .search-box input");
          if (searchInput) {
            searchInput.value = action.tab;
            searchInput.dispatchEvent(new Event("input"));
            searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            window.open("index.html#portfolio", "_blank");
          }
        } else {
          window.open("index.html#portfolio", "_blank");
        }
        break;
      }

      case "SCROLL_SECTION": {
        if (isMainPage) {
          const target = document.querySelector(action.target);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            if (action.target === "#contact") {
              setTimeout(() => {
                const nameInput = document.getElementById("contactName") || document.querySelector("#contact input");
                if (nameInput) nameInput.focus();
              }, 600);
            }
          }
        } else {
          window.open(`index.html${action.target}`, "_blank");
        }
        break;
      }

      case "OPEN_PROJECT": {
        if (isMainPage) {
          const previewBtn = document.querySelector(`.card-preview-btn[data-project="${action.projectId}"]`);
          if (previewBtn) {
            previewBtn.click();
          } else if (typeof window.openModal === "function") {
            window.openModal(action.projectId);
          }
        } else {
          window.open("portfolio.html", "_blank");
        }
        break;
      }

      case "OPEN_GARUDA_VIDEO": {
        if (isMainPage) {
          const btn = document.getElementById("openMeetGarudaBtn");
          if (btn) btn.click();
          else {
            const popover = document.getElementById("meetGarudaPopover");
            if (popover) {
              popover.classList.add("open");
              document.body.style.overflow = "hidden";
            }
          }
        } else {
          window.open("https://github.com/venkateshcreations/GARUDA-Intelligence", "_blank");
        }
        break;
      }

      case "OPEN_SHOWCASE_VIDEO": {
        if (isMainPage) {
          const btn = document.getElementById("openShowcaseIntroBtn");
          if (btn) btn.click();
        } else {
          window.open("index.html#portfolio", "_blank");
        }
        break;
      }

      default:
        break;
    }
  }

  // -------------------------------------------------------------
  // 8. KNOWLEDGE BASE MATCHING ENGINE
  // -------------------------------------------------------------
  function findBestAnswer(query) {
    const normalized = query
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const kb = window.GARUDA_KNOWLEDGE || [];
    let bestMatch = null;
    let highestScore = 0;

    const stopWords = new Set(["the", "a", "an", "is", "in", "on", "at", "for", "to", "of", "and", "or", "what", "how", "who", "where", "show", "tell", "me", "about", "can", "you", "please"]);
    const queryTokens = normalized.split(" ").filter(w => w.length > 1 && !stopWords.has(w));

    for (const item of kb) {
      let score = 0;
      for (const kw of item.keywords) {
        const term = kw.trim().toLowerCase();
        if (normalized === term) {
          score += 60; // Exact phrase match
        } else if (normalized.includes(term)) {
          score += term.includes(" ") ? 35 : 20; // Contains phrase
        } else if (term.includes(normalized) && normalized.length > 2) {
          score += 25; // Substring
        }

        // Token-level overlap
        for (const token of queryTokens) {
          if (term === token) {
            score += 15;
          } else if (term.includes(token) && token.length > 3) {
            score += 8;
          }
        }
      }

      if (item.priority) {
        score += item.priority;
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch;
    }

    // Default Fallback
    return {
      answer: "I have processed your query, but that specific parameter is not indexed in current memory. You may review Venkatesh's 42+ showcase projects or establish direct contact via the terminal.",
      action: { type: "SCROLL_SECTION", target: "#contact" },
      actionLabel: "Access Contact Terminal ↗",
      chips: isResumePage
        ? ["Employment History", "ProVise (Dubai)", "IBM Certification", "Download PDF"]
        : isPortfolioPage
        ? ["AeroFlow Prototype", "AI HRMS Pro", "Deepfake Defense", "Design Systems"]
        : ["Career & Resume", "All 30+ Projects", "Design Systems", "Access Resume"]
    };
  }

  // -------------------------------------------------------------
  // 9. JARVIS VOICE & SPEECH SYNTHESIS ENGINE
  // -------------------------------------------------------------
  function getSelectedVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return null;

    const pref = voiceSelect ? voiceSelect.value : "jarvis";

    // ─── 1. JARVIS (British Tech / Refined Male Accent) ───
    if (pref === "jarvis") {
      const ukMalePattern = /george|ryan|oliver|brian|daniel|arthur|uk english male|great britain|united kingdom/i;
      const ukMale = voices.find(v => /^en(-|_)GB/i.test(v.lang) && ukMalePattern.test(v.name));
      if (ukMale) return ukMale;

      const anyUkMale = voices.find(v => /^en(-|_)GB/i.test(v.lang) && !/female|zira|samantha|hazel|susan/i.test(v.name));
      if (anyUkMale) return anyUkMale;

      const classicBritish = voices.find(v => /daniel|oliver|arthur|george/i.test(v.name));
      if (classicBritish) return classicBritish;

      const deepMale = voices.find(v => /^en(-|_)/i.test(v.lang) && /david|mark|guy|richard|james|male/i.test(v.name));
      if (deepMale) return deepMale;

      const anyUk = voices.find(v => /^en(-|_)GB/i.test(v.lang));
      if (anyUk) return anyUk;
    }

    // ─── 2. US MALE ───
    if (pref === "us-male") {
      const usMale = voices.find(v => /^en(-|_)US/i.test(v.lang) && /david|mark|guy|richard|james|male/i.test(v.name));
      if (usMale) return usMale;
    }

    // ─── 3. NATURAL FEMALE ───
    if (pref === "female") {
      const femalePattern = /female|zira|samantha|susan|karen|moira|tessa|veena|heera|priya|jenny/i;
      const femaleVoice = voices.find(v => /^en(-|_)/i.test(v.lang) && femalePattern.test(v.name));
      if (femaleVoice) return femaleVoice;
    }

    // ─── 4. NATURAL / SYSTEM DEFAULT ───
    const englishVoices = voices.filter(v => /^en(-|_)/i.test(v.lang));
    const pool = englishVoices.length ? englishVoices : voices;
    const natural = pool.find(v => /neural|natural|google|enhanced/i.test(v.name));
    return natural || pool[0];
  }

  function speakText(text) {
    if (!isTtsEnabled || !("speechSynthesis" in window)) return;

    speechSynthesis.cancel();
    clearInterval(ttsHeartbeat);

    const utterance = new SpeechSynthesisUtterance(text);
    const pref = voiceSelect ? voiceSelect.value : "jarvis";
    const speedMult = Number(speedSelect ? speedSelect.value : 1);

    if (pref === "jarvis") {
      utterance.pitch = 0.92;
      utterance.rate = 0.96 * speedMult;
    } else {
      utterance.pitch = 1.0;
      utterance.rate = 1.0 * speedMult;
    }

    const voice = getSelectedVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.onstart = () => {
      statusDot.className = "garuda-status-dot speaking";
      statusText.textContent = "Vocalizing Response...";
      toggleBtn.classList.add("is-speaking");

      ttsHeartbeat = setInterval(() => {
        if (!speechSynthesis.speaking) {
          clearInterval(ttsHeartbeat);
        } else {
          speechSynthesis.pause();
          speechSynthesis.resume();
        }
      }, 9000);
    };

    utterance.onend = () => {
      clearInterval(ttsHeartbeat);
      resetStatusToReady();
    };

    utterance.onerror = () => {
      clearInterval(ttsHeartbeat);
      resetStatusToReady();
    };

    speechSynthesis.speak(utterance);
  }

  function stopAllSpeech() {
    clearInterval(ttsHeartbeat);
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
    resetStatusToReady();
  }

  function resetStatusToReady() {
    statusDot.className = "garuda-status-dot";
    statusText.textContent = "Garuda Core: Online";
    toggleBtn.classList.remove("is-speaking", "is-listening");
  }

  // -------------------------------------------------------------
  // 10. SPEECH RECOGNITION (STT)
  // -------------------------------------------------------------
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = navigator.language || "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListening = true;
      pauseSiteMedia();
      stopAllSpeech();
      playJarvisChime();

      statusDot.className = "garuda-status-dot listening";
      statusText.textContent = "Listening for Command...";
      micBtn.classList.add("listening");
      micLabel.textContent = "Listening...";
      toggleBtn.classList.add("is-listening");
    };

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      if (input) input.value = transcript;
      handleUserQuery(transcript);
    };

    recognition.onerror = event => {
      statusText.textContent = event.error === "not-allowed"
        ? "Microphone access blocked"
        : "Voice input error";
      stopListeningUI();
    };

    recognition.onend = () => {
      stopListeningUI();
    };
  } else {
    if (micBtn) {
      micBtn.disabled = true;
      micBtn.title = "Speech recognition is not supported in this browser. Please type below.";
      micLabel.textContent = "Type command";
    }
  }

  function stopListeningUI() {
    isListening = false;
    micBtn.classList.remove("listening");
    micLabel.textContent = "Vocal Command";
    toggleBtn.classList.remove("is-listening");
    if (!window.speechSynthesis?.speaking) {
      resetStatusToReady();
    }
  }

  // -------------------------------------------------------------
  // 11. CHAT MESSAGE RENDERING & INTERACTION
  // -------------------------------------------------------------
  function addMessage(text, type, action, actionLabel) {
    const bubble = document.createElement("div");
    bubble.className = "garuda-msg " + type;
    bubble.textContent = text;

    if (type === "bot" && action && actionLabel) {
      const actionBtn = document.createElement("button");
      actionBtn.className = "garuda-action-btn";
      actionBtn.innerHTML = `<span>${actionLabel}</span>`;
      actionBtn.addEventListener("click", () => {
        playJarvisChime();
        dispatchSiteAction(action);
      });
      bubble.appendChild(document.createElement("br"));
      bubble.appendChild(actionBtn);
    }

    messagesBox.appendChild(bubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function updateSuggestionChips(chips) {
    if (!chips || !chips.length) return;
    chipsBox.innerHTML = "";
    chips.forEach(chipText => {
      const btn = document.createElement("button");
      btn.className = "garuda-chip";
      btn.textContent = chipText;
      btn.setAttribute("data-question", chipText);
      btn.addEventListener("click", () => handleUserQuery(chipText));
      chipsBox.appendChild(btn);
    });
    chipsBox.scrollLeft = 0;
    setTimeout(updateChipsNavArrows, 50);
  }

  function updateChipsNavArrows() {
    if (!chipsBox || !chipsPrevBtn || !chipsNextBtn) return;
    const maxScroll = chipsBox.scrollWidth - chipsBox.clientWidth;
    if (maxScroll <= 4) {
      chipsPrevBtn.style.opacity = "0";
      chipsPrevBtn.style.pointerEvents = "none";
      chipsNextBtn.style.opacity = "0";
      chipsNextBtn.style.pointerEvents = "none";
      return;
    }

    if (chipsBox.scrollLeft > 6) {
      chipsPrevBtn.style.opacity = "1";
      chipsPrevBtn.style.pointerEvents = "auto";
    } else {
      chipsPrevBtn.style.opacity = "0.2";
      chipsPrevBtn.style.pointerEvents = "none";
    }

    if (chipsBox.scrollLeft < maxScroll - 6) {
      chipsNextBtn.style.opacity = "1";
      chipsNextBtn.style.pointerEvents = "auto";
    } else {
      chipsNextBtn.style.opacity = "0.2";
      chipsNextBtn.style.pointerEvents = "none";
    }
  }

  // -------------------------------------------------------------
  // 12. QUERY HANDLER & PIPELINE
  // -------------------------------------------------------------
  function handleUserQuery(rawQuery) {
    const query = (rawQuery || "").trim();
    if (!query) return;

    if (recognition && isListening) {
      recognition.abort();
    }

    pauseSiteMedia();
    addMessage(query, "user");
    if (input) input.value = "";

    statusDot.className = "garuda-status-dot listening";
    statusText.textContent = "Analyzing Telemetry...";

    const match = findBestAnswer(query);

    setTimeout(() => {
      playJarvisChime();
      addMessage(match.answer, "bot", match.action, match.actionLabel);
      if (match.chips) updateSuggestionChips(match.chips);
      if (match.action) dispatchSiteAction(match.action);
      speakText(match.answer);
    }, 250);
  }

  // -------------------------------------------------------------
  // 13. EVENT LISTENERS & LIFECYCLE
  // -------------------------------------------------------------
  toggleBtn.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) {
      playJarvisChime();
      if (input) input.focus();
      setTimeout(updateChipsNavArrows, 80);
    } else {
      stopAllSpeech();
      if (recognition && isListening) recognition.abort();
    }
  });

  closeBtn.addEventListener("click", () => {
    panel.hidden = true;
    stopAllSpeech();
    if (recognition && isListening) recognition.abort();
  });

  clearBtn.addEventListener("click", () => {
    stopAllSpeech();
    playJarvisChime();
    messagesBox.innerHTML = `
      <div class="garuda-msg bot">
        Telemetry reset. Garuda Core ready for next command, sir.
      </div>
    `;
    resetStatusToReady();
  });

  ttsToggleBtn.addEventListener("click", () => {
    isTtsEnabled = !isTtsEnabled;
    if (isTtsEnabled) {
      ttsToggleBtn.classList.add("active");
      ttsOnIcon.style.display = "block";
      ttsOffIcon.style.display = "none";
      ttsToggleBtn.title = "Voice Narration Active";
      playJarvisChime();
    } else {
      ttsToggleBtn.classList.remove("active");
      ttsOnIcon.style.display = "none";
      ttsOffIcon.style.display = "block";
      ttsToggleBtn.title = "Narration Muted";
      stopAllSpeech();
    }
  });

  micBtn.addEventListener("click", () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
    } else {
      try {
        stopAllSpeech();
        recognition.start();
      } catch (err) {
        statusText.textContent = "Please try again.";
        stopListeningUI();
      }
    }
  });

  stopBtn.addEventListener("click", () => {
    if (recognition && isListening) recognition.abort();
    stopAllSpeech();
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    handleUserQuery(input.value);
  });

  // Attach quick chips
  chipsBox.querySelectorAll(".garuda-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      handleUserQuery(chip.dataset.question || chip.textContent);
    });
  });

  // Chips horizontal scroll listener & mouse wheel
  if (chipsBox) {
    chipsBox.addEventListener("scroll", updateChipsNavArrows, { passive: true });
    chipsBox.addEventListener("wheel", e => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        chipsBox.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  if (chipsPrevBtn) {
    chipsPrevBtn.addEventListener("click", () => {
      chipsBox.scrollBy({ left: -140, behavior: "smooth" });
    });
  }

  if (chipsNextBtn) {
    chipsNextBtn.addEventListener("click", () => {
      chipsBox.scrollBy({ left: 140, behavior: "smooth" });
    });
  }

  setTimeout(updateChipsNavArrows, 150);

  // Keyboard accessibility
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !panel.hidden) {
      panel.hidden = true;
      stopAllSpeech();
      if (recognition && isListening) recognition.abort();
    }
  });

  // Initialize SpeechSynthesis Voices
  if ("speechSynthesis" in window) {
    speechSynthesis.onvoiceschanged = () => {
      getSelectedVoice();
    };
    speechSynthesis.getVoices();
  }

  console.log(`Garuda AI Assistant active on [${isResumePage ? "resume.html" : isPortfolioPage ? "portfolio.html" : "index.html"}].`);
})();
