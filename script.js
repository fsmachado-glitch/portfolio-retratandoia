// ==========================================
// PRELOADER
// ==========================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 2200);
});

// ==========================================
// CUSTOM CURSOR
// ==========================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX - 4 + 'px';
  cursorDot.style.top = mouseY - 4 + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX - 4 + 'px';
  cursorRing.style.top = ringY - 4 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .highlight-item, .contact-channel');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ==========================================
// MOBILE NAV TOGGLE
// ==========================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('[data-nav]');

function updateActiveNav() {
  const scrollY = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ==========================================
// STAT COUNTER ANIMATION
// ==========================================
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  if (statNumbers.length === 0) { statsAnimated = true; return; }

  const heroSection = document.getElementById('inicio');
  const rect = heroSection.getBoundingClientRect();

  if (rect.top < window.innerHeight && rect.bottom > 0) {
    statsAnimated = true;
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      if (isNaN(target)) return;
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + '+';
      }, 30);
    });
  }
}

window.addEventListener('scroll', animateStats);
// Trigger on initial load
setTimeout(animateStats, 2500);

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.85) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', () => {
  setTimeout(checkReveal, 2300);
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  submitBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    Enviando...
  `;
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      Mensagem Enviada!
    `;
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = `
        Enviar Mensagem
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      `;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 2500);
  }, 1500);
});

// ==========================================
// TILT EFFECT ON PROJECT CARDS
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ==========================================
// PARALLAX FLOATING ORBS
// ==========================================
const floatingOrbs = document.querySelectorAll('.floating-orb');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  floatingOrbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.05;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// ==========================================
// TYPING EFFECT IN CODE WINDOW
// ==========================================
const codeLines = document.querySelectorAll('.code-line');
let codeAnimated = false;

function animateCode() {
  if (codeAnimated) return;

  const codeWindow = document.querySelector('.code-window');
  if (!codeWindow) return;

  const rect = codeWindow.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    codeAnimated = true;

    codeLines.forEach((line, index) => {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-10px)';
      line.style.transition = `all 0.4s ease ${index * 0.08}s`;

      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      }, 100);
    });
  }
}

window.addEventListener('scroll', animateCode);

// ==========================================
// SKILL TAG RANDOM GLOW
// ==========================================
const skillTags = document.querySelectorAll('.skill-tag');

function randomGlow() {
  const randomIndex = Math.floor(Math.random() * skillTags.length);
  const tag = skillTags[randomIndex];
  tag.style.borderColor = 'rgba(124, 58, 237, 0.4)';
  tag.style.boxShadow = '0 0 15px rgba(124, 58, 237, 0.15)';

  setTimeout(() => {
    tag.style.borderColor = '';
    tag.style.boxShadow = '';
  }, 1500);
}

setInterval(randomGlow, 2000);

// ==========================================
// CSS SPIN KEYFRAME (injected for loading)
// ==========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ==========================================
// INTERSECTION OBSERVER FOR TIMELINE
// ==========================================
const timelineDots = document.querySelectorAll('.timeline-dot');

const dotObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'translateX(-50%) scale(1.3)';
      entry.target.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.6)';

      setTimeout(() => {
        entry.target.style.transform = 'translateX(-50%) scale(1)';
        entry.target.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.4)';
      }, 600);
    }
  });
}, { threshold: 0.5 });

timelineDots.forEach(dot => dotObserver.observe(dot));

// ==========================================
// FAQ ACCORDION
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all FAQ items
    faqItems.forEach(faq => faq.classList.remove('active'));

    // Toggle clicked item
    if (!isActive) {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
    } else {
      question.setAttribute('aria-expanded', 'false');
    }
  });
});

// ==========================================
// WHATSAPP BUTTON SCROLL VISIBILITY
// ==========================================
const whatsappFloat = document.getElementById('whatsappFloat');

if (whatsappFloat) {
  whatsappFloat.style.opacity = '0';
  whatsappFloat.style.transform = 'scale(0.5)';
  whatsappFloat.style.pointerEvents = 'none';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      whatsappFloat.style.opacity = '1';
      whatsappFloat.style.transform = 'scale(1)';
      whatsappFloat.style.pointerEvents = 'auto';
    } else {
      whatsappFloat.style.opacity = '0';
      whatsappFloat.style.transform = 'scale(0.5)';
      whatsappFloat.style.pointerEvents = 'none';
    }
  });
}
