// ============================================================
// SANTANA ELECTRICAL SERVICES — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initFormSubmit();
});


// ---------------------------------------------------------------
// Solidifica e encolhe a nav quando o utilizador faz scroll
// ---------------------------------------------------------------
function initNav() {
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 60);
  }, { passive: true });
}


// ---------------------------------------------------------------
// Abre/fecha o menu móvel e anima o ícone hamburger → X
// ---------------------------------------------------------------
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-active', isOpen);
    // Evita scroll do body enquanto o menu está aberto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fecha o menu ao clicar num link
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
}


// ---------------------------------------------------------------
// Revela elementos conforme entram no viewport (IntersectionObserver)
// Aplica atraso escalonado a elementos irmãos para um efeito cascata
// ---------------------------------------------------------------
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Calcula o índice do elemento entre os seus irmãos .reveal
        const siblings = [...entry.target.parentElement.querySelectorAll(':scope > .reveal')];
        const idx = siblings.indexOf(entry.target);

        entry.target.style.transitionDelay = `${idx * 0.1}s`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}


// ---------------------------------------------------------------
// Anima os contadores numéricos da secção About quando ficam visíveis
// ---------------------------------------------------------------
function initCounters() {
  const counters = document.querySelectorAll('.stat__num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(el => observer.observe(el));
}


// ---------------------------------------------------------------
// Conta de 0 até ao valor-alvo com easing ease-out cubic
// ---------------------------------------------------------------
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 2000; // ms
  const startTime = performance.now();

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out cúbico
    const eased    = 1 - Math.pow(1 - progress, 3);

    el.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(tick);
}


// ---------------------------------------------------------------
// Submissão do formulário de contacto com feedback visual
// ---------------------------------------------------------------
function initFormSubmit() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form__submit');
    const originalText = btn.textContent;

    // Estado de loading
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simula envio — substitui por integração real (ex. Formspree, EmailJS)
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.opacity = '1';
      form.reset();

      // Repõe o botão após 3s
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });
}
