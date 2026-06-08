/**
 * CORPORA Website Behavior & Interactions
 * Custom interactions for pill header dropdown and scroll reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  initDropdownMenu();
  initHeaderScroll();
  initScrollAnimations();
  initFaqAccordion();
});

/**
 * Dropdown Menu Interactivity
 * Controls the visibility and transitions of the floating pill header dropdown
 */
function initDropdownMenu() {
  const toggleBtn = document.getElementById('menu-dropdown-toggle');
  const dropdownPanel = document.getElementById('menu-dropdown-panel');
  const dropdownLinks = document.querySelectorAll('.dropdown-link');
  const ctaAction = document.getElementById('dropdown-cta-action');

  if (!toggleBtn || !dropdownPanel) return;

  const toggleDropdown = (event) => {
    event.stopPropagation();
    const isOpen = dropdownPanel.classList.contains('open');
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    dropdownPanel.classList.add('open');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDropdown = () => {
    dropdownPanel.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  // Click listener for hamburger button
  toggleBtn.addEventListener('click', toggleDropdown);

  // Close menu when clicking navigation links
  dropdownLinks.forEach(link => {
    link.addEventListener('click', closeDropdown);
  });

  // Close menu when clicking the CTA link
  if (ctaAction) {
    ctaAction.addEventListener('click', closeDropdown);
  }

  // Close menu when clicking outside header and menu
  document.addEventListener('click', (event) => {
    if (!dropdownPanel.contains(event.target) && !toggleBtn.contains(event.target)) {
      closeDropdown();
    }
  });

  // Close menu on pressing Escape key (accessibility check)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
    }
  });
}

/**
 * Header Scroll Offset Styling
 * Adjusts the background transparency and shadows as the user scrolls
 */
function initHeaderScroll() {
  const headerPill = document.getElementById('main-pill-header');
  if (!headerPill) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      headerPill.classList.add('scrolled');
    } else {
      headerPill.classList.remove('scrolled');
    }
  };

  // Run immediately on page load
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Transition Scroll Reveal
 * Detects viewport visibility to trigger clean upward transitions
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.18
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      } else {
        entry.target.classList.remove('reveal');
      }
    });
  }, observerOptions);

  const revealIds = [
    'gap-reveal-grid',
    'solution-reveal-grid',
    'highlights-reveal-grid',
    'journey-pathway-block',
    'journey-image-block',
    'exposure-reveal-grid',
    'exposure-statement-block',
    'partners-reveal-grid',
    'home-founder-reveal',
    'enquiry-reveal-box',

    'about-hero-reveal',
    'about-what-reveal',
    'about-why-reveal',
    'about-reality-reveal',
    'about-how-reveal',
    'about-model-reveal',
    'about-founder-reveal',

    'readiness-header-reveal',
    'hands-on-learning',
    'technical-skill-exposure',
    'workplace-safety-awareness',
    'team-production-understanding',

    'about-who-reveal',
    'about-outcomes-reveal',
    'about-connection-reveal',
    'about-cta-reveal',

    'students-hero-reveal',
    'students-reality-reveal',
    'students-readiness-reveal',
    'students-journey-reveal',
    'students-experience-reveal',
    'students-chips-reveal',
    'students-outcomes-reveal',
    'students-cta-reveal',
    'readiness-map-reveal',
    'student-benefits-reveal',
    'student-cta-reveal',

    'institutions-hero-reveal',
    'institutions-problem-reveal',
    'institutions-gains-reveal',
    'institutions-model-reveal',
    'institutions-bento-reveal',
    'institutions-experience-reveal',
    'institutions-why-reveal',
    'institutions-cta-reveal',

    'industry-hero-reveal',
    'industry-challenge-reveal',
    'industry-gains-reveal',
    'industry-opps-reveal',
    'industry-gallery-reveal',
    'industry-lens-reveal',
    'industry-cta-reveal',

    'contact-hero-reveal',
    'contact-cards-reveal',
    'contact-form-reveal',
    'contact-faq-reveal',
    'contact-cta-reveal',

    'footer-reveal-block'
  ];

  revealIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });
}

/**
 * FAQ Accordion Toggle Behavior
 * Controls accordion panels max-height transitions and aria state changes
 */
function initFaqAccordion() {
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panel = trigger.nextElementSibling;
      
      // Close other panels for a clean single-open accordion behavior
      if (!isExpanded) {
        faqTriggers.forEach(otherTrigger => {
          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherTrigger.nextElementSibling) {
              otherTrigger.nextElementSibling.style.maxHeight = null;
            }
          }
        });
      }
      
      trigger.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
      if (panel) {
        if (!isExpanded) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          panel.style.maxHeight = null;
        }
      }
    });
  });
}

