/**
 * ══════════════════════════════════════════════════════════════
 * GARUDA AI ASSISTANT — MASTER KNOWLEDGE BASE & INTENT ENGINE
 * Contextual: index.html | portfolio.html | resume.html
 * High-Precision Telemetry | Tailored for Venkatesh Ammireddy
 * ══════════════════════════════════════════════════════════════
 */

window.GARUDA_KNOWLEDGE = [
  // ─── GREETING & INTRO ───
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "good afternoon", "who are you", "what can you do"],
    answer: "At your service. I am Garuda — an intelligent Agentic UX system designed by Venkatesh Ammireddy, UX Creative Director & AI UX Architect. All telemetry is online across his main portfolio, extended project showcase, and professional digital resume. How may I assist your exploration today, sir?",
    chips: ["Career & Resume", "All 30+ Projects", "Design Systems", "Deepfake Defense", "AXIOM Cyber", "Contact Terminal"]
  },

  // ══════════════════════════════════════════════════════════════
  // RESUME & PROFESSIONAL CAREER DETAILS
  // ══════════════════════════════════════════════════════════════

  // ─── RESUME OVERVIEW ───
  {
    keywords: ["resume", "cv", "curriculum vitae", "download resume", "digital resume", "hire credentials", "resume details"],
    answer: "Venkatesh's digital resume details 13+ years of enterprise architecture shaping B2B SaaS ecosystems, AI-driven platforms, RPA workflow automation, and enterprise design systems. His track record includes roles as Senior Product UX Architect at ProVise Consultancy (OPTIMAS.AI), UX Lead at RLabs Enterprises (Client: Mindtree), and Lead Consultant at EPSoft Inc. Accessing resume terminal now.",
    action: { type: "OPEN_RESUME" },
    actionLabel: "Access Digital Resume ↗",
    chips: ["Employment History", "IBM Certification", "Education", "Download PDF"]
  },

  // ─── EMPLOYMENT HISTORY / COMPANIES ───
  {
    keywords: ["companies", "employment", "work history", "provise", "optimas", "rlabs", "mindtree", "epsoft", "jobs", "employers", "roles"],
    answer: "Venkatesh's career history spans premier enterprise organizations: 1) ProVise Consultancy / OPTIMAS.AI (Dubai-based Startup) as Senior Product UX Architect & Creative Director (Sept 2022 – Nov 2025), architecting multi-tenant AI systems; 2) RLabs Enterprises (Client: Mindtree) as UX Lead & Product Design Lead (April 2021 – Sept 2022); and 3) EPSoft Inc. as Lead Consultant & UX Architect (Nov 2019 – Dec 2020) focused on RPA automation and bot orchestration.",
    action: { type: "SCROLL_RESUME_SECTION", target: ".exp-card" },
    actionLabel: "View Experience Cards ↗",
    chips: ["OPTIMAS.AI Role", "Mindtree Role", "Certifications", "Design Systems"]
  },

  // ─── SPECIFIC ROLE: PROVISE / OPTIMAS.AI ───
  {
    keywords: ["provise", "optimas", "optimas.ai", "dubai startup", "senior product ux architect"],
    answer: "At ProVise Consultancy (OPTIMAS.AI, a Dubai-based startup, Sept 2022 – Nov 2025), Venkatesh served as Senior Product UX Architect & Creative Director. He led end-to-end UX architecture for multi-tenant AI-driven SaaS applications, created governance frameworks for synthetic media detection, and engineered scalable enterprise design systems.",
    action: { type: "SCROLL_RESUME_SECTION", target: ".exp-card" },
    actionLabel: "View ProVise Details ↗",
    chips: ["Mindtree Role", "Certifications", "Deepfake Defense"]
  },

  // ─── SPECIFIC ROLE: RLABS / MINDTREE ───
  {
    keywords: ["rlabs", "mindtree", "ux lead"],
    answer: "At RLabs Enterprises supporting enterprise client Mindtree (April 2021 – Sept 2022), Venkatesh served as UX Lead & Product Design Lead. He directed agile design squads, delivered complex user journeys and interactive dashboards, and harmonized cross-functional requirements with engineering leaders.",
    action: { type: "SCROLL_RESUME_SECTION", target: ".exp-card" },
    actionLabel: "View Mindtree Details ↗",
    chips: ["EPSoft Role", "ProVise Role", "All Projects"]
  },

  // ─── SPECIFIC ROLE: EPSOFT / RPA ───
  {
    keywords: ["epsoft", "rpa", "automation role", "lead consultant"],
    answer: "At EPSoft Inc. (Nov 2019 – Dec 2020), Venkatesh acted as Lead Consultant & UX Architect specializing in Robotic Process Automation (RPA), process mining intelligence maps, and bot lifecycle management interfaces.",
    action: { type: "SCROLL_RESUME_SECTION", target: ".exp-card" },
    actionLabel: "View EPSoft Details ↗",
    chips: ["Employment History", "Certifications", "Resume"]
  },

  // ─── CERTIFICATIONS & COURSES ───
  {
    keywords: ["certifications", "courses", "ibm", "certified", "credentials", "degrees", "compliance risk", "audit", "governance"],
    answer: "Venkatesh holds professional credentials in enterprise governance and design thinking: 1) Enterprise Design Thinking Practitioner (IBM), 2) Risk Management for Cyber Security & IT Managers, 3) Compliance Risk Management Governance, 4) IT Audit Fundamentals & Standards, and 5) Enterprise Context Management (Ontology).",
    action: { type: "SCROLL_RESUME_SECTION", target: ".cert-list" },
    actionLabel: "View Certifications ↗",
    chips: ["Education", "Experience (13+ Yrs)", "Download PDF"]
  },

  // ─── EDUCATION ───
  {
    keywords: ["education", "college", "degree", "b.com", "commerce", "university"],
    answer: "Venkatesh holds a Bachelor of Commerce (B.Com) degree with a focus on commerce and business fundamentals, complementing his 13+ years of enterprise product UX strategy with solid business and financial acumen.",
    action: { type: "SCROLL_RESUME_SECTION", target: ".edu-card" },
    actionLabel: "View Education Details ↗",
    chips: ["Certifications", "Work History", "Resume"]
  },

  // ─── DOWNLOAD PDF RESUME ───
  {
    keywords: ["download pdf", "pdf resume", "download cv", "get resume", "print resume"],
    answer: "Certainly, sir. You can download Venkatesh Ammireddy's comprehensive executive digital resume in PDF format directly to your device.",
    action: { type: "DOWNLOAD_RESUME_PDF" },
    actionLabel: "Download PDF Resume ↗",
    chips: ["Contact Terminal", "All Projects", "Experience"]
  },

  // ══════════════════════════════════════════════════════════════
  // EXTENDED PORTFOLIO & LIVE PROTOTYPES (portfolio.html & index.html)
  // ══════════════════════════════════════════════════════════════

  // ─── ALL EXTENDED PROJECTS OVERVIEW ───
  {
    keywords: ["extended portfolio", "more projects", "all projects", "portfolio.html", "prototypes", "live apps", "live demos"],
    answer: "Venkatesh's extended portfolio features over 30 interactive deliverables and live prototypes, including Deepfake Defense, AeroFlow, SteamVerde, AI HRMS Pro, School Management ERP, FlowTrack AI, Health Bridge, Nexus AI CRM, Nyay-AI, NetVision, LetterForgeAi, and all 6 Enterprise Design Systems. Navigating to the extended portfolio.",
    action: { type: "OPEN_PORTFOLIO_PAGE" },
    actionLabel: "Open Extended Showcase ↗",
    chips: ["AeroFlow", "AI HRMS Pro", "School Management", "Design Systems"]
  },

  // ─── PROJECT: AEROFLOW ───
  {
    keywords: ["aeroflow", "flight ticket", "flight management", "airline ux", "flights"],
    answer: "AeroFlow is an intelligent flight ticket and fleet booking management software designed by Venkatesh. It optimizes complex multi-city seat selection, fare rules, and passenger telemetry. Live prototype is deployed at aerofloww.netlify.app.",
    action: { type: "OPEN_EXTERNAL_URL", url: "https://aerofloww.netlify.app/" },
    actionLabel: "Launch AeroFlow Live Prototype ↗",
    chips: ["AI HRMS Pro", "SteamVerde", "FlowTrack AI"]
  },

  // ─── PROJECT: AI HRMS PRO ───
  {
    keywords: ["hrms", "ai hrms", "ai hrms pro", "human resources", "workforce", "payroll"],
    answer: "AI HRMS Pro is a next-generation enterprise workforce and human capital platform. It features predictive payroll analytics, automated employee lifecycle management, and intelligent shift scheduling. Live demo at ai-hrms-pro.netlify.app.",
    action: { type: "OPEN_EXTERNAL_URL", url: "https://ai-hrms-pro.netlify.app/" },
    actionLabel: "Launch AI HRMS Pro Demo ↗",
    chips: ["School Management", "FlowTrack AI", "AeroFlow"]
  },

  // ─── PROJECT: STEAMVERDE ───
  {
    keywords: ["steamverde", "iptv", "streaming", "green streaming", "live media", "stream verde"],
    answer: "SteamVerde is a high-availability IPTV and online media streaming dashboard featuring real-time bandwidth consumption telemetry, channel health metrics, and adaptive playback buffers. Live prototype at streamverde.netlify.app.",
    action: { type: "OPEN_EXTERNAL_URL", url: "https://streamverde.netlify.app/" },
    actionLabel: "Launch SteamVerde Prototype ↗",
    chips: ["Radiostream", "VOXAR", "AeroFlow"]
  },

  // ─── PROJECT: SCHOOL MANAGEMENT ERP ───
  {
    keywords: ["school management", "educore", "school erp", "school app", "school"],
    answer: "School Management / EduCore is a role-based academic administration platform featuring multi-tenant portals for principals, teachers, parents, and students, including attendance analytics and fee governance. Live app at schoolmgmtapp.vercel.app.",
    action: { type: "OPEN_EXTERNAL_URL", url: "https://schoolmgmtapp.vercel.app/" },
    actionLabel: "Launch School ERP Demo ↗",
    chips: ["AI HRMS Pro", "FlowTrack AI", "Deepfake Defense"]
  },

  // ─── PROJECT: FLOWTRACK AI ───
  {
    keywords: ["flowtrack", "flowtrack ai", "flowtrack-ai", "issue tracking", "workflow automation", "project management"],
    answer: "FlowTrack AI is an enterprise project intelligence and issue tracking system. It leverages predictive agentic models to detect sprint bottlenecks and optimize task dependencies. Live deployment at flowtrackai.netlify.app.",
    action: { type: "OPEN_EXTERNAL_URL", url: "https://flowtrackai.netlify.app/" },
    actionLabel: "Launch FlowTrack AI Demo ↗",
    chips: ["Deepfake Defense", "Nexus AI CRM", "Web Apps"]
  },

  // ─── PROJECT: DEEPFAKE DEFENSE ───
  {
    keywords: ["deepfake defense", "deepfake", "deepfake defence", "synthetic media", "ai security", "threat detection"],
    answer: "Deepfake Defense (2026 Enterprise Initiative) is a specialized cybersecurity dashboard designed to detect synthetic voice, video, and biometric manipulation using multi-tier confidence scoring and forensic incident audit logs. Live at deepfakedefence-dashboard.vercel.app.",
    action: { type: "OPEN_EXTERNAL_URL", url: "https://deepfakedefence-dashboard.vercel.app/" },
    actionLabel: "Launch Deepfake Defense Live ↗",
    chips: ["AXIOM Cyber", "FlowTrack AI", "Design System 4"]
  },

  // ─── PROJECT: AXIOM CYBER DEFENSE ───
  {
    keywords: ["axiom", "axiom cyber", "axiom cyber defense", "cyber defense", "soc", "threat intelligence", "cyber security platform", "cyber"],
    answer: "Initiating AXIOM Cyber Defense telemetry. AXIOM delivers a unified autonomous command surface for SOC analysts, featuring automated threat triage, incident response playbooks, and visual attack-correlation matrices.",
    action: { type: "OPEN_PROJECT", projectId: "9" },
    actionLabel: "Open AXIOM Cyber Modal ↗",
    chips: ["Deepfake Defense", "Apex SOC", "Design System 6"]
  },

  // ─── PROJECT: VOXAR VIDEO INTELLIGENCE ───
  {
    keywords: ["voxar", "voxar video", "video intelligence", "video analysis", "video ai", "computer vision"],
    answer: "Accessing VOXAR video intelligence telemetry. VOXAR is a multimodal AI video analytics platform featuring automated scene comprehension, entity tracking, and high-frequency metadata indexing. Opening preview.",
    action: { type: "OPEN_PROJECT", projectId: "7" },
    actionLabel: "Open VOXAR Modal ↗",
    chips: ["AXIOM Cyber", "SteamVerde", "Websites"]
  },

  // ─── PROJECT: ZIPPOS.SYS ───
  {
    keywords: ["zippos", "zippos sys", "zippos.sys", "cyber os", "os"],
    answer: "Accessing ZiPPOS.SYS telemetry. ZiPPOS.SYS is a high-performance cyber operating platform designed for real-time process monitoring, decentralized telemetry, and hardened infrastructure orchestration.",
    action: { type: "OPEN_PROJECT", projectId: "8" },
    actionLabel: "Open ZiPPOS.SYS Modal ↗",
    chips: ["AXIOM Cyber", "VOXAR", "Websites"]
  },

  // ─── PROJECT: ORBITA SPACE COMMUNICATIONS ───
  {
    keywords: ["orbita", "space communications", "space", "satellite", "satellite telemetry"],
    answer: "Accessing ORBITA Next-Gen Space Communications telemetry. ORBITA delivers deep orbital telemetry visualization, satellite constellation tracking, and low-latency payload communications architecture.",
    action: { type: "OPEN_PROJECT", projectId: "10" },
    actionLabel: "Open ORBITA Modal ↗",
    chips: ["AXIOM Cyber", "Workstation Telemetry", "Websites"]
  },

  // ─── PROJECT: AUTOFY OS ───
  {
    keywords: ["autofy", "autofy os", "automotive", "fleet", "fleet management"],
    answer: "Accessing Autofy OS operational control telemetry. Autofy OS delivers real-time connected vehicle telemetry, predictive maintenance alerts, and automated fleet dispatch intelligence.",
    action: { type: "OPEN_PROJECT", projectId: "12" },
    actionLabel: "Open Autofy OS Modal ↗",
    chips: ["FlowTrack AI", "AeroFlow", "Websites"]
  },

  // ─── PROJECT: ENTERPRISE BANKING ECOSYSTEM ───
  {
    keywords: ["banking", "digital banking", "banking ecosystem", "fintech"],
    answer: "Loading Enterprise Digital Banking Ecosystem telemetry. This system features comprehensive core-banking account trees, real-time fraud scoring matrices, and multi-currency liquidity tracking.",
    action: { type: "OPEN_PROJECT", projectId: "13" },
    actionLabel: "Open Banking Ecosystem Modal ↗",
    chips: ["Banking DS", "Transformation Hub", "Data Vis"]
  },

  // ─── PROJECT: DIGITAL TRANSFORMATION HUB ───
  {
    keywords: ["transformation hub", "digital transformation", "globaltech"],
    answer: "Accessing Digital Transformation Intelligence Hub telemetry. This platform unifies cross-departmental legacy modernization pipelines, milestone velocities, and enterprise cloud migrations.",
    action: { type: "OPEN_PROJECT", projectId: "14" },
    actionLabel: "Open Transformation Hub Modal ↗",
    chips: ["GlobalTech DS", "Supply Chain", "Data Vis"]
  },

  // ─── PROJECT: GEC SUPPLY CHAIN ANALYTICS ───
  {
    keywords: ["supply chain", "gec", "gec supply chain", "logistics"],
    answer: "Accessing GEC Global Supply Chain Analytics telemetry. Features multi-echelon inventory flow mapping, multimodal route optimization, and predictive customs clearance bottlenecks.",
    action: { type: "OPEN_PROJECT", projectId: "15" },
    actionLabel: "Open Supply Chain Modal ↗",
    chips: ["Supply Chain DS", "Transformation Hub", "Data Vis"]
  },

  // ─── PROJECT: INTELLIASSIST AI ───
  {
    keywords: ["intelliassist", "intelli assist", "product lifecycle"],
    answer: "Accessing IntelliAssist AI product lifecycle telemetry. An intelligent AI-driven cockpit tracking feature adoption, developer velocity, and cognitive design friction across product lines.",
    action: { type: "OPEN_PROJECT", projectId: "16" },
    actionLabel: "Open IntelliAssist AI Modal ↗",
    chips: ["FlowTrack AI", "Data Vis", "Web Apps"]
  },

  // ─── PROJECT: APEX SOC COMMAND CENTER ───
  {
    keywords: ["apex", "apex soc", "apex global", "soc command", "soc command center"],
    answer: "Accessing Apex SOC Command Center telemetry. Designed for Tier-3 cybersecurity operators, featuring high-frequency SIEM ingestion, automated threat hunting graphs, and active containment controls.",
    action: { type: "OPEN_PROJECT", projectId: "18" },
    actionLabel: "Open Apex SOC Modal ↗",
    chips: ["AXIOM Cyber", "Deepfake Defense", "Data Vis"]
  },

  // ─── PROJECT: NEXUS AI CRM ───
  {
    keywords: ["nexus", "nexus ai", "crm", "customer lifecycle"],
    answer: "Nexus AI is an enterprise CRM platform featuring automated pipeline progression, predictive churn detection, and intelligent account health telemetry.",
    action: { type: "OPEN_PORTFOLIO_PAGE" },
    actionLabel: "View in Extended Portfolio ↗",
    chips: ["Nyay-AI", "AI HRMS Pro", "All Projects"]
  },

  // ─── PROJECT: NYAY-AI ───
  {
    keywords: ["nyay", "nyay ai", "nyay-ai", "legal advisor", "legal ai"],
    answer: "Nyay-AI is an AI-enabled legal intelligence and case research assistant designed to parse statutory frameworks, automate contract risk scoring, and assist legal counsel.",
    action: { type: "OPEN_PORTFOLIO_PAGE" },
    actionLabel: "View in Extended Portfolio ↗",
    chips: ["Deepfake Defense", "Nexus AI", "Showcase"]
  },

  // ─── PROJECT: LETTERFORGE AI ───
  {
    keywords: ["letterforge", "letterforge ai", "newsletter automation"],
    answer: "LetterForgeAi is an autonomous newsletter and technical publication engine that parses multiple RSS feeds and GitHub release notes into formatted digests.",
    action: { type: "OPEN_PORTFOLIO_PAGE" },
    actionLabel: "View in Extended Portfolio ↗",
    chips: ["Garuda Intelligence", "FlowTrack AI", "Showcase"]
  },

  // ─── PROJECT: NETVISION ───
  {
    keywords: ["netvision", "network monitoring", "telemetry dashboard"],
    answer: "NetVision is a high-density network infrastructure monitoring surface providing real-time packet loss heatmaps, gateway latency metrics, and automated alert thresholding.",
    action: { type: "OPEN_PORTFOLIO_PAGE" },
    actionLabel: "View in Extended Portfolio ↗",
    chips: ["Apex SOC", "AXIOM Cyber", "Workstation"]
  },

  // ─── PROJECT: ACIS (ARMY COMMANDO INTEL) ───
  {
    keywords: ["acis", "army commando", "commando intel", "tactical command"],
    answer: "The Army Commando Intel System (ACIS) is a mission-critical tactical telemetry interface designed for low-latency situational awareness and squad asset tracking.",
    action: { type: "OPEN_PROJECT", projectId: "5" },
    actionLabel: "Open ACIS Project Preview ↗",
    chips: ["Deepfake Defense", "NetVision", "Showcase"]
  },

  // ─── ALL 6 DESIGN SYSTEMS ───
  {
    keywords: ["design system", "design systems", "design tokens", "ds 1", "ds 2", "ds 3", "ds 4", "ds 5", "ds 6", "component library"],
    answer: "Venkatesh has engineered 6 production design systems complete with live documentation portals: 1) Enterprise Digital Banking DS, 2) GlobalTech Transformation Hub DS, 3) Supply Chain Analytics DS, 4) Deepfake Defense DS (DFD-Design-System), 5) Radiostream DS, and 6) AXIOM Cyber Defense DS. Loading design systems.",
    action: { type: "NAVIGATE_TAB", tab: "designsystems" },
    actionLabel: "Explore Design Systems ↗",
    chips: ["Banking DS", "Deepfake Defense DS", "AXIOM DS"]
  },

  // ─── SPECIFIC DS LINKS ───
  {
    keywords: ["banking design system", "banking ds", "design system 1"],
    answer: "Enterprise Digital Banking Design System features high-contrast financial data grids, audit-compliant form components, and WCAG AAA accessibility tokens. Live portal at venkateshcreations.github.io/DesignSystems/designsystem-1.html.",
    action: { type: "OPEN_EXTERNAL_URL", url: "https://venkateshcreations.github.io/DesignSystems/designsystem-1.html" },
    actionLabel: "Open Banking DS Portal ↗",
    chips: ["Deepfake DS", "GlobalTech DS", "AXIOM DS"]
  },
  {
    keywords: ["deepfake defense design system", "deepfake ds", "design system 4"],
    answer: "Deepfake Defense Design System (DFD) provides high-security dark mode UI tokens, confidence rating meters, and real-time biometric alert indicators. Live portal at venkateshcreations.github.io/DFD-Design-System/.",
    action: { type: "OPEN_EXTERNAL_URL", url: "https://venkateshcreations.github.io/DFD-Design-System/" },
    actionLabel: "Open Deepfake DS Portal ↗",
    chips: ["Banking DS", "AXIOM DS", "Deepfake Defense"]
  },
  {
    keywords: ["axiom design system", "axiom ds", "design system 6", "axiom cyber design system"],
    answer: "AXIOM Cyber Defense Design System delivers high-density operational components, threat level tags, telemetry charts, and SOC incident cards.",
    action: { type: "OPEN_EXTERNAL_URL", url: "https://venkateshcreations.github.io/DesignSystems/designsystem-6.html" },
    actionLabel: "Open AXIOM DS Portal ↗",
    chips: ["Banking DS", "Deepfake DS", "AXIOM Cyber"]
  },

  // ══════════════════════════════════════════════════════════════
  // CORE PROFILE, WORKSTATION & CONTACT
  // ══════════════════════════════════════════════════════════════

  // ─── EXPERIENCE & BIO ───
  {
    keywords: ["experience", "years", "background", "bio", "about", "career", "history", "profile"],
    answer: "Venkatesh Ammireddy brings 13+ years of senior enterprise experience operating at the convergence of human cognitive behavior and autonomous intelligent systems. He specializes in Product UX Architecture, AI-First Systems, Enterprise SaaS Platforms, and Design Leadership across 30+ major initiatives and 10+ global enterprises.",
    action: { type: "SCROLL_SECTION", target: "#about" },
    actionLabel: "View About Archive ↗",
    chips: ["Career & Resume", "Workstation Telemetry", "All 30+ Projects"]
  },

  // ─── WORKSTATION & INFRASTRUCTURE ───
  {
    keywords: ["workstation", "infrastructure", "setup", "hardware", "dual isp", "monitors", "remote setup", "telemetry"],
    answer: "Venkatesh operates a dedicated, high-availability remote workstation: 1) Performance compute architecture optimized for local LLM execution and heavy prototyping, 2) Dual-ISP fiber with automated failover for continuous global connectivity, 3) Multi-display telemetry for simultaneous code and design sync, and 4) Containerized security with encrypted tunnels.",
    action: { type: "SCROLL_SECTION", target: "#workstation" },
    actionLabel: "View Workstation Telemetry ↗",
    chips: ["Tools & Stack", "Career & Resume", "Contact Terminal"]
  },

  // ─── TOOLS & STACK ───
  {
    keywords: ["tools", "tech stack", "software", "technologies", "figma", "vscode", "claude", "gemini", "ollama"],
    answer: "Venkatesh's operational toolchain encompasses Figma, VS Code, Google Antigravity & Stitch, Anthropic Claude, OpenAI, Google Gemini, Ollama, LM Studio, GSAP, HTML5, Vanilla CSS3, and JavaScript ES6+.",
    action: { type: "SCROLL_SECTION", target: "#tools" },
    actionLabel: "View Tools & Stack ↗",
    chips: ["Workstation", "Design Systems", "Resume"]
  },

  // ─── CONTACT & COLLABORATION ───
  {
    keywords: ["contact", "email", "phone", "hire", "collaborate", "consulting", "hiring", "reach", "linkedin", "touch"],
    answer: "Opening the direct communications terminal. You may connect with Venkatesh directly via email at venkateshcreations@gmail.com or by phone / WhatsApp at +91-9030436110. He is available for UX Creative Direction, AI UX Architecture, and executive design consulting across global time zones.",
    action: { type: "SCROLL_SECTION", target: "#contact" },
    actionLabel: "Scroll to Contact Terminal ↗",
    chips: ["Access Resume", "LinkedIn Profile", "All 30+ Projects"]
  },

  // ─── SHOWCASE INTRO VIDEO ───
  {
    keywords: ["video", "intro video", "watch video", "showcase intro", "tour", "walkthrough"],
    answer: "Certainly, sir. Initializing Venkatesh's portfolio showcase introduction video.",
    action: { type: "OPEN_SHOWCASE_VIDEO" },
    actionLabel: "Watch Showcase Intro ↗",
    chips: ["Garuda Intelligence", "All 30+ Projects", "Access Resume"]
  },

  // ─── THANKS & COURTESY ───
  {
    keywords: ["thank you", "thanks", "awesome", "great", "cool", "bye", "goodbye"],
    answer: "Always a pleasure to assist, sir. I remain on standby for any further inquiries regarding Venkatesh's systems, resume, and UX architecture. Have an outstanding day.",
    chips: ["All 30+ Projects", "Access Resume", "Contact Terminal"]
  }
];
