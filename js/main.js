/**
 * THINAIRA - Core Scripts & Interactions
 * "Nilam Kaathu, Neri Nindru, Thisai Kaattum Payanam — Thinai!"
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveals();
  initMatrixTabs();
  initHeroDomainCards();
  initImpactCounters();
  initContactForm();
  initModal();
});

/* ==========================================================================
   NAVBAR INTERACTIONS
   ========================================================================== */
function initNavbar() {
  const nav = document.getElementById('mainNav');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Active link highlight based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

/* ==========================================================================
   SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   HERO DOMAIN CARDS & AMBIENT GLOW
   ========================================================================== */
function initHeroDomainCards() {
  const agroOrb = document.querySelector('.orb-agro');
  const cyberOrb = document.querySelector('.orb-cyber');
  const travelOrb = document.querySelector('.orb-travel');

  const cards = document.querySelectorAll('.domain-pill-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (card.classList.contains('agro') && agroOrb) {
        agroOrb.style.opacity = '0.35';
        agroOrb.style.transform = 'scale(1.25)';
      } else if (card.classList.contains('cyber') && cyberOrb) {
        cyberOrb.style.opacity = '0.35';
        cyberOrb.style.transform = 'scale(1.25)';
      } else if (card.classList.contains('travel') && travelOrb) {
        travelOrb.style.opacity = '0.35';
        travelOrb.style.transform = 'scale(1.25)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (agroOrb) {
        agroOrb.style.opacity = '0.18';
        agroOrb.style.transform = 'scale(1)';
      }
      if (cyberOrb) {
        cyberOrb.style.opacity = '0.18';
        cyberOrb.style.transform = 'scale(1)';
      }
      if (travelOrb) {
        travelOrb.style.opacity = '0.18';
        travelOrb.style.transform = 'scale(1)';
      }
    });
  });
}

/* ==========================================================================
   THINAI MATRIX TABS (5 Sacred Landscapes)
   ========================================================================== */
function initMatrixTabs() {
  const tabs = document.querySelectorAll('.matrix-tab');
  const panels = document.querySelectorAll('.matrix-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetLandscape = tab.getAttribute('data-landscape');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const activePanel = document.getElementById(`panel-${targetLandscape}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   ANIMATED IMPACT COUNTERS
   ========================================================================== */
function initImpactCounters() {
  const counters = document.querySelectorAll('.impact-number');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000;
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const currentVal = Math.round(target * easeOutQuad(progress));
            counter.textContent = currentVal.toLocaleString() + suffix;

            if (currentStep >= totalSteps) {
              clearInterval(timer);
              counter.textContent = target.toLocaleString() + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const impactSection = document.querySelector('.impact-strip');
  if (impactSection) {
    observer.observe(impactSection);
  }
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

/* ==========================================================================
   MODAL DIALOG CONTROLLER
   ========================================================================== */
function initModal() {
  const modalBackdrop = document.getElementById('consultModal');
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');

  if (!modalBackdrop) return;

  const openModal = (defaultDomain = null) => {
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (defaultDomain) {
      const domainCheckbox = modalBackdrop.querySelector(`input[value="${defaultDomain}"]`);
      if (domainCheckbox) domainCheckbox.checked = true;
    }
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const domain = btn.getAttribute('data-domain');
      openModal(domain);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const forms = [document.getElementById('contactForm'), document.getElementById('modalContactForm')];

  forms.forEach(form => {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting Inquiry...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        // Close modal if form is in modal
        const modalBackdrop = document.getElementById('consultModal');
        if (modalBackdrop && modalBackdrop.classList.contains('active')) {
          modalBackdrop.classList.remove('active');
          document.body.style.overflow = '';
        }

        showToast("நன்றி! Your inquiry has reached THINAIRA. An advisor will connect with you within 24 hours.");
      }, 1200);
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--agro-light)" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
