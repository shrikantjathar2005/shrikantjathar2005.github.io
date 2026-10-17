/**
 * ARCHITECTURAL BLUEPRINT INTERACTIVITY ENGINE
 * Interactive flow simulators, theme toggling, clipboard copy, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Default: Light Architectural Paper Mode)
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Clear any previous dark mode set during automated tests so user gets default light mode
  if (localStorage.getItem('bp-theme') === 'dark' && !sessionStorage.getItem('user-picked-theme')) {
    localStorage.removeItem('bp-theme');
  }

  const currentTheme = () => root.getAttribute('data-theme') || 'light';

  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('bp-theme', theme);
      sessionStorage.setItem('user-picked-theme', 'true');
    } catch (e) {}
  };

  const themeToggles = document.querySelectorAll('#theme-toggle, .mobile-theme-btn');
  themeToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  });

  // 2. Mobile Navigation Toggle
  const header = document.querySelector('.hd');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelectorAll('.hd-nav a');

  if (menuToggle && header) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = header.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('open')) {
        header.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu on clicking outside
    document.addEventListener('click', (e) => {
      if (header.classList.contains('open') && !header.contains(e.target)) {
        header.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Active Navigation Observer (ScrollSpy)
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              const isActive = href === `#${id}`;
              link.classList.toggle('active', isActive);
            });
          }
        });
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0.1 }
    );

    sections.forEach((sec) => navObserver.observe(sec));
  }

  // 4. Copy Email to Clipboard
  const copyBtn = document.getElementById('copy-email-btn');
  const copyLabel = document.getElementById('copy-email-label');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText && copyLabel) {
    copyBtn.addEventListener('click', async () => {
      const email = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyLabel.textContent;
        copyLabel.textContent = '✓ Copied!';
        copyBtn.style.borderColor = 'var(--accent)';
        setTimeout(() => {
          copyLabel.textContent = originalText;
          copyBtn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyLabel.textContent = '✓ Copied!';
        setTimeout(() => {
          copyLabel.textContent = 'Copy email';
        }, 2200);
      }
    });
  }

  // 5. Interactive Pipeline Flow Simulators
  const flowData = {
    graphtrace: {
      steps: [
        {
          name: "Raw Data",
          output: ">> [IN] Heterogeneous entity table ingested: 145,210 nodes, 2,104,330 relational edges parsed."
        },
        {
          name: "Graph Builder",
          output: ">> [GRAPH] Directed adjacency matrix constructed. Density: 0.041, Average Degree: 28.6."
        },
        {
          name: "Embedding Model",
          output: ">> [EMBED] GCN 128-dim node embeddings computed. Modularity score: 0.77 (1,845 clusters identified)."
        },
        {
          name: "Path Reasoner",
          output: ">> [REASON] Traversing high-betweenness centrality paths across neural cluster 'AURORA'."
        },
        {
          name: "Insight Engine",
          output: ">> [INSIGHT] Top anomalous connection verified: Node 074 ↔ Central Core (Latency: 12ms, Confidence: 98.4%)."
        }
      ]
    },
    homedeck: {
      steps: [
        {
          name: "Space Dimensions",
          output: ">> [INPUT] Bounding box: 112.5 m², Ceiling height: 2,850 mm, Apertures: 2 windows, 1 entry portal."
        },
        {
          name: "Constraint Solver",
          output: ">> [SOLVER] Minimum clearance path validated: Circulation aisle ≥ 900mm across Living & Kitchen."
        },
        {
          name: "Rec Matrix",
          output: ">> [REC] Furniture vectors matched: Scandinavian Minimalist palette. Natural light utilization: 97%."
        },
        {
          name: "Ergonomic Audit",
          output: ">> [AUDIT] Clearance score: 94% | Ergonomic efficiency: 91% | Clash violations: 0 detected."
        },
        {
          name: "3D Blueprint",
          output: ">> [RENDER] 2D blueprint & spatial schedule rendered. Bill-of-materials compiled in 3.4 seconds."
        }
      ]
    },
    mediflow: {
      steps: [
        {
          name: "Patient Intake",
          output: ">> [TRIAGE] Patient #4892 presenting with acute chest distress. Intake timestamp: 10:39:12."
        },
        {
          name: "Vitals Stream",
          output: ">> [TELEMETRY] HR: 104 bpm, BP: 142/90 mmHg, SpO2: 94%, Resp: 22/min. Threshold alert: Elevated."
        },
        {
          name: "Triage Model",
          output: ">> [CLASSIFIER] Emergency Severity Index calculated: ESI Level 2 (Emergent). Wait priority: Urgent."
        },
        {
          name: "Resource Dispatch",
          output: ">> [DISPATCH] Acute Zone Bed #04 assigned. On-call physician paged with automated summary."
        },
        {
          name: "Live Console",
          output: ">> [SYSTEM] Triage board updated in 0.8s. Mean department wait time maintained at 15 minutes."
        }
      ]
    }
  };

  const flowContainers = document.querySelectorAll('.flow[data-flow]');

  flowContainers.forEach((container) => {
    const flowKey = container.getAttribute('data-flow');
    const flowConfig = flowData[flowKey];
    if (!flowConfig) return;

    const runBtn = container.querySelector('.flow-run');
    const stages = container.querySelectorAll('.stage');
    const readout = container.querySelector('.flow-read');

    const updateStageView = (index) => {
      stages.forEach((stage, idx) => {
        const isCurrent = idx === index;
        stage.classList.toggle('active-stage', isCurrent);
        stage.setAttribute('aria-pressed', String(isCurrent));
      });

      if (readout && flowConfig.steps[index]) {
        readout.innerHTML = `<code>${flowConfig.steps[index].output}</code>`;
      }
    };

    // Click individual stage
    stages.forEach((stage, idx) => {
      stage.addEventListener('click', () => {
        updateStageView(idx);
      });
    });

    // Run automated sample sequence
    let isRunning = false;
    if (runBtn) {
      runBtn.addEventListener('click', async () => {
        if (isRunning) return;
        isRunning = true;
        const originalBtnHtml = runBtn.innerHTML;
        runBtn.innerHTML = '<span>⏳</span>Running...';

        for (let i = 0; i < flowConfig.steps.length; i++) {
          updateStageView(i);
          await new Promise((res) => setTimeout(res, 750));
        }

        runBtn.innerHTML = '<span>✓</span>Done';
        setTimeout(() => {
          runBtn.innerHTML = originalBtnHtml;
          isRunning = false;
        }, 1800);
      });
    }
  });
});
