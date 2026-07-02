const EMAIL = "lokheshreddy@gmail.com";

// Lokesh's projects mapped with detailed descriptions from the resume
const projects = [
  {
    name: "JusticeGPT",
    label: "Legal AI Chatbot",
    categories: ["ai-ml"],
    language: "React / Node",
    status: "Active Build",
    focus: "Legal Reasoning",
    url: "https://github.com/lokheshreddy-gif/JusticeGPT",
    description: "Built an AI legal chatbot using React, Node.js and MongoDB. Added voice input, REST API integration and secure chat history.",
    icon: "fa-scale-balanced",
    visualClass: "visual-justice",
    tech: ["React", "Node.js", "MongoDB", "Voice Input", "REST APIs"]
  },
  {
    name: "Mindful Companion",
    label: "Mental Health Platform",
    categories: ["ai-ml"],
    language: "React / Flask",
    status: "Deployed",
    focus: "Intelligent Chat",
    url: "https://github.com/lokheshreddy-gif/Mindful-Companion",
    live: "https://mindchat-zpnk.vercel.app",
    description: "Developed a full-stack mental health platform using React, Flask and Python. Integrated facial emotion recognition, AI conversations and REST APIs. Implemented mood tracking, journaling and crisis detection. Designed hybrid cloud and local AI architecture.",
    icon: "fa-heart-pulse",
    visualClass: "visual-mindful",
    tech: ["React", "Flask", "Python", "Emotion Recognition", "APIs", "Mood Tracking"]
  },
  {
    name: "Academic Abstract Classifier",
    label: "NLP Sorter",
    categories: ["ai-ml"],
    language: "Python",
    status: "ML Active",
    focus: "Text Classifier",
    url: "https://github.com/lokheshreddy-gif/Academic-Abstract-Classifier-",
    description: "Developed a multi-class NLP classifier using TF-IDF, Logistic Regression, SVM and Naive Bayes. Improved accuracy through preprocessing, cross-validation and hyperparameter tuning.",
    icon: "fa-book-open-reader",
    visualClass: "visual-classifier",
    tech: ["Python", "TF-IDF", "Logistic Regression", "SVM", "Naive Bayes", "Scikit-learn"]
  },
  {
    name: "Batch Process Monitor",
    label: "OS Simulation Portal",
    categories: ["systems"],
    language: "C++",
    status: "Sim Build",
    focus: "CPU Scheduling",
    url: "https://github.com/lokheshreddy-gif/Batch-Process-Monitor",
    description: "Implemented FCFS and Round Robin CPU scheduling. Used Process Control Blocks with fork(), execvp(), kill(), waitpid() and signals. Simulated timer-based preemptive scheduling and IPC.",
    icon: "fa-microchip",
    visualClass: "visual-monitor",
    tech: ["C++", "CPU Scheduling", "fork() / execvp()", "Signals", "IPC", "Preemptive Scheduling"]
  },
  {
    name: "Bias & Fairness in Educational AI",
    label: "Responsible AI Audit",
    categories: ["ai-ml"],
    language: "Python",
    status: "Research Draft",
    focus: "Algorithmic Equity",
    url: "https://github.com/lokheshreddy-gif/Bias-and-Fairness-in-Educational-AI",
    description: "A Responsible AI audit project checking representation bias and statistical fairness metrics inside grading algorithms used in schools.",
    icon: "fa-yin-yang",
    visualClass: "visual-bias",
    tech: ["Python", "Fairness Metrics", "Responsible AI", "Analytics"]
  },
  {
    name: "Expense Tracker Dev Guide",
    label: "Full Stack Tutorial",
    categories: ["web-dev"],
    language: "PHP",
    status: "Completed",
    focus: "Backend Structure",
    url: "https://github.com/lokheshreddy-gif/Expense-Tracker-Development-Guide",
    description: "A comprehensive developer guide showing how to set up routing, databases, user auth, and financial charting using PHP.",
    icon: "fa-wallet",
    visualClass: "visual-expense",
    tech: ["PHP", "SQL Database", "Routing", "Auth Systems"]
  }
];

let activeProjectIndex = 0;
let activeFilter = "all";

// Loading Page Overlay
function setLoadingState() {
  const overlay = document.getElementById("loading-overlay");
  if (!overlay) return;
  window.setTimeout(() => overlay.classList.add("hide"), 350);
}

// Navigation & Sticky Headers
function setupNavigation() {
  const toggle = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const header = document.getElementById("header");
  const backToTopBtn = document.getElementById("back-to-top");
  if (!toggle || !navLinks) return;

  const closeMenu = () => {
    navLinks.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Track scroll position
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    
    // Header resize
    if (scrollY > 50) {
      header.style.minHeight = "70px";
      header.style.boxShadow = "var(--shadow)";
    } else {
      header.style.minHeight = "var(--header-height)";
      header.style.boxShadow = "none";
    }

    // Back to top show/hide
    if (scrollY > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Active section highlights
  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionMap = new Map(sections.map((section) => [section.id, section]));
  const navAnchors = [...navLinks.querySelectorAll('a[href^="#"]')];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((anchor) => anchor.classList.remove("active"));
      const active = navAnchors.find((anchor) => sectionMap.get(anchor.getAttribute("href").slice(1)) === entry.target);
      if (active) active.classList.add("active");
    });
  }, { rootMargin: "-30% 0px -55% 0px", threshold: 0.1 });

  sections.forEach((section) => observer.observe(section));
}

// Check filter match
function projectMatchesFilter(project) {
  return activeFilter === "all" || project.categories.includes(activeFilter);
}

// Action button rendering
function projectActions(project) {
  return `
    <div class="project-actions">
      ${project.live ? `<a class="text-link" href="${project.live}" target="_blank" rel="noopener">Live Demo <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ""}
      <a class="text-link" href="${project.url}" target="_blank" rel="noopener">Code View <i class="fa-brands fa-github" aria-hidden="true"></i></a>
    </div>
  `;
}

// Render Spotlight Section
function renderSpotlight() {
  const spotlight = document.getElementById("project-spotlight");
  if (!spotlight) return;

  const project = projects[activeProjectIndex];
  spotlight.innerHTML = `
    <div class="spotlight-visual ${project.visualClass}">
      <div class="spotlight-screen">
        <div class="screen-toolbar">
          <span></span><span></span><span></span>
        </div>
        <div class="screen-line wide"></div>
        <div class="screen-line"></div>
        <div class="screen-line short"></div>
        <div class="screen-pulse">
          <i class="fa-solid ${project.icon}" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="spotlight-copy">
      <span class="lab-kicker">Spotlight build</span>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="spotlight-stats" aria-label="${project.name} metadata">
        <span>${project.status}</span>
        <span>${project.language}</span>
        <span>${project.focus}</span>
      </div>
      <div class="project-meta">
        ${project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
      </div>
      ${projectActions(project)}
    </div>
  `;
}

// Render Grid Showcase Cards
function renderProjects() {
  const showcase = document.querySelector(".project-showcase");
  if (!showcase) return;

  const visibleProjects = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => projectMatchesFilter(project));

  // Auto-focus first visible project if current active goes out of view
  if (!visibleProjects.some(({ index }) => index === activeProjectIndex)) {
    activeProjectIndex = visibleProjects[0]?.index ?? 0;
  }

  renderSpotlight();

  showcase.innerHTML = visibleProjects.map(({ project, index }) => `
    <article class="project-card reveal ${index === activeProjectIndex ? "is-active" : ""}" data-category="${project.categories.join(" ")}">
      <button class="project-select" type="button" data-project-index="${index}" aria-pressed="${index === activeProjectIndex}" aria-label="Spotlight ${project.name}">
        <div class="project-visual ${project.visualClass}" data-label="${project.label}">
          <div class="project-icon">
            <i class="fa-solid ${project.icon}" aria-hidden="true"></i>
          </div>
        </div>
        <div class="project-body">
          <span class="project-status">${project.status}</span>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-meta">
            ${project.tech.slice(0, 3).map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
          </div>
        </div>
      </button>
      ${projectActions(project)}
    </article>
  `).join("");
}

// 3D Tilt pointermove math
function setupProjectMotion() {
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    });
  });
}

// Project filter setup
function setupProjectLab() {
  const filters = document.querySelectorAll(".filter-btn");
  const showcase = document.querySelector(".project-showcase");
  if (!showcase) return;

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filters.forEach((filter) => {
        const isActive = filter === button;
        filter.classList.toggle("active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });
      renderProjects();
      setupProjectMotion();
      setupRevealAnimations();
    });
  });

  showcase.addEventListener("click", (event) => {
    const selector = event.target.closest("[data-project-index]");
    if (!selector) return;
    activeProjectIndex = Number(selector.dataset.projectIndex);
    renderProjects();
    setupProjectMotion();
    setupRevealAnimations();
  });

  renderProjects();
}

// Section Scroll Reveal Transitions
function setupRevealAnimations() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((element) => observer.observe(element));
}

// Stats Count-Up Animations
function setupCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animateCounter = (element) => {
    const target = Number(element.dataset.count);
    const duration = 1000;
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      element.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

// Copy email helper
function setupCopyEmail() {
  const button = document.getElementById("copy-email");
  if (!button) return;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      button.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Copied';
      window.setTimeout(() => {
        button.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i> Copy email';
      }, 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  });
}

// Contact form simulated submission
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    status.style.color = "var(--teal)";

    setTimeout(() => {
      status.textContent = "Thank you! Your message has been sent successfully.";
      status.style.color = "var(--emerald)";
      form.reset();
      
      setTimeout(() => {
        status.textContent = "";
      }, 5000);
    }, 1500);
  });
}

// Theme toggler with local persistence
function setupThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    body.className = savedTheme;
  } else {
    body.className = prefersDark ? "dark-theme" : "light-theme";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.add("theme-transition");
    if (body.classList.contains("dark-theme")) {
      body.classList.replace("dark-theme", "light-theme");
      localStorage.setItem("portfolio-theme", "light-theme");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      localStorage.setItem("portfolio-theme", "dark-theme");
    }
    setTimeout(() => body.classList.remove("theme-transition"), 400);
  });
}

// Initialize all features on load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = String(new Date().getFullYear());
  
  setupThemeToggle();
  setupNavigation();
  setupProjectLab();
  setupProjectMotion();
  setupRevealAnimations();
  setupCounters();
  setupCopyEmail();
  setupContactForm();
  setLoadingState();
});

// Inline helper stylesheet for theme swap transitions
const styleSheet = document.createElement("style");
styleSheet.innerText = `
.theme-transition,
.theme-transition *,
.theme-transition *::before,
.theme-transition *::after {
  transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease !important;
}
`;
document.head.appendChild(styleSheet);
