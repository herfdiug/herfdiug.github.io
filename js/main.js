/* ═══════════════════════════════════════════
   Roblox Scripter Portfolio
   Terminal Theme — main.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── Typing Animation ─── */
  const typingEl = document.getElementById('typing-text');
  const phrases = [
    'State Machines',
    'Spawners & Lifetime Rules',
    'ECS, Systems and Queries',
    'Tooling That Fails Loud',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeLoop() {
    if (!typingEl) return;

    const current = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      typingEl.textContent = current.substring(0, charIndex);
    } else {
      charIndex++;
      typingEl.textContent = current.substring(0, charIndex);
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
      speed = 1800;
      isPaused = true;
      setTimeout(() => {
        isDeleting = true;
        isPaused = false;
        typeLoop();
      }, speed);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(typeLoop, speed);
  }

  setTimeout(typeLoop, 1200);

  /* ─── Scroll Reveal (IntersectionObserver) ─── */
  const sections = document.querySelectorAll('.fade-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          /* Trigger skill bar animation when skills section appears */
          const skillFills = entry.target.querySelectorAll('.skill-fill');
          skillFills.forEach((bar) => {
            bar.style.width = bar.getAttribute('data-level') || '0%';
          });
          /* Don't unobserve so re-visits re-trigger */
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));

  /* ─── Copy to Clipboard ─── */
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const text = this.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        const original = this.textContent;
        this.textContent = '[copied!]';
        this.classList.add('copied');
        setTimeout(() => {
          this.textContent = original;
          this.classList.remove('copied');
        }, 1800);
      }).catch(() => {
        /* Fallback for environments without clipboard API */
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const original = this.textContent;
        this.textContent = '[copied!]';
        this.classList.add('copied');
        setTimeout(() => {
          this.textContent = original;
          this.classList.remove('copied');
        }, 1800);
      });
    });
  });

  /* ─── Smooth Nav Link Scroll ─── */
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ─── Hero CTA Smooth Scroll ─── */
  const ctaButtons = document.querySelectorAll('.hero-cta .btn');
  ctaButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
