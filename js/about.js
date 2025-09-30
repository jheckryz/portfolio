// js/about.js - updated: read existing DOM title/desc and per-slide data-attributes
(function () {
  'use strict';

  // ---------- Vanta background ----------
  let vantaEffect = null;
  function initVanta(isDark) {
    try {
      if (vantaEffect) vantaEffect.destroy();
      if (window.VANTA && window.VANTA.TRUNK) {
        vantaEffect = VANTA.TRUNK({
          el: "#vanta-bg",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          chaos: 4.00,
          color: isDark ? 0xe08f24 : 0x11a138,
          backgroundColor: isDark ? 0x0e0e0e : 0xf0f0f0
        });
      }
    } catch (e) {
      console.warn('Vanta init failed (maybe missing lib):', e);
    }
  }

  // ---------- Logo update ----------
  function updateLogo(isDark) {
    const logo = document.getElementById("logo");
    if (logo) {
      logo.src = isDark ? "images/Logo.png" : "images/logo_light.png";
    }
  }

  // ---------- Theme toggle ----------
  function setDarkMode(isDark) {
    const themeSwitch = document.getElementById('theme-switch');
    document.body.classList.toggle('darkmode', !!isDark);
    document.body.classList.toggle('lightmode', !isDark);
    if (themeSwitch) themeSwitch.classList.toggle('active', !!isDark);
    try { localStorage.setItem('darkmode', isDark ? 'active' : ''); } catch (e) {}
    updateLogo(isDark);
    initVanta(isDark);
  }

  // ---------- DOM ready ----------
  document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // initialize theme
    const darkmode = (function () {
      try { return localStorage.getItem('darkmode') === 'active'; } catch (e) { return false; }
    })();
    setDarkMode(darkmode);

    // theme toggle click
    themeSwitch?.addEventListener('click', () => {
      const isNowDark = !document.body.classList.contains('darkmode');
      setDarkMode(isNowDark);
    });

    // hamburger toggle
    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks?.classList.toggle('active');
    });

    // highlight active nav link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav ul li').forEach(link => {
      const anchor = link.querySelector('a');
      if (anchor && anchor.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });

    // ---------- Carousel (works section) ----------
    (function initCarousel() {
      const works = document.getElementById('works-section');
      if (!works) return;

      const track = document.getElementById('carousel-track');
      const prevBtn = document.getElementById('carousel-prev');
      const nextBtn = document.getElementById('carousel-next');
      const titleEl = document.getElementById('carousel-title');
      const descEl = document.getElementById('carousel-desc');
      const dotsContainer = document.getElementById('carousel-dots');

      if (!track) return;
      const slides = Array.from(track.querySelectorAll('.carousel-slide'));
      if (slides.length === 0) return;

      // Read existing DOM text (so manual edits persist)
      const existingTitle = titleEl ? titleEl.textContent.trim() : '';
      const existingDesc = descEl ? descEl.textContent.trim() : '';

      // Build metadata arrays:
      // 1) per-slide data attributes -> slide.dataset.title / slide.dataset.desc
      // 2) fallback to existing DOM title/desc for the first slide
      // 3) fallback to image alt or default text
      const titles = slides.map((slide, i) => {
        if (slide.dataset && slide.dataset.title) return slide.dataset.title.trim();
        if (i === 0 && existingTitle) return existingTitle;
        const imgAlt = slide.querySelector('img')?.alt?.trim();
        return imgAlt || `Project ${i + 1}`;
      });

      const descs = slides.map((slide, i) => {
        if (slide.dataset && slide.dataset.desc) return slide.dataset.desc.trim();
        if (i === 0 && existingDesc) return existingDesc;
        const imgAlt = slide.querySelector('img')?.alt?.trim();
        return imgAlt ? `${imgAlt} — click to edit.` : `This is a short description for Project ${i + 1}.`;
      });

      // create dots
      slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'carousel-dot';
        d.setAttribute('aria-label', 'go to slide ' + (i + 1));
        d.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(d);
      });
      const dots = Array.from(dotsContainer.children);

      let idx = 0;

      function getGap() {
        try {
          const gs = window.getComputedStyle(track);
          const gap = parseFloat(gs.gap || gs.columnGap || '0');
          return isNaN(gap) ? 8 : gap;
        } catch (e) { return 8; }
      }

      function updateUI() {
        if (!slides[0]) return;
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = getGap();
        const shift = (slideWidth + gap) * idx;
        track.style.transform = `translateX(${-shift}px)`;

        if (titleEl) titleEl.textContent = titles[idx] || '';
        if (descEl) descEl.textContent = descs[idx] || '';

        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }

      function goTo(i) {
        idx = (i + slides.length) % slides.length;
        updateUI();
      }

      prevBtn?.addEventListener('click', (e) => { e.preventDefault(); goTo(idx - 1); });
      nextBtn?.addEventListener('click', (e) => { e.preventDefault(); goTo(idx + 1); });

      // keyboard support
      document.addEventListener('keydown', (e) => {
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
          if (e.key === 'ArrowLeft') goTo(idx - 1);
          else goTo(idx + 1);
        }
      });

      // touch swipe
      let startX = null;
      let deltaX = 0;
      const viewportEl = track.parentElement;
      viewportEl.addEventListener('touchstart', (ev) => { startX = ev.changedTouches[0].clientX; });
      viewportEl.addEventListener('touchmove', (ev) => { if (startX !== null) deltaX = ev.changedTouches[0].clientX - startX; });
      viewportEl.addEventListener('touchend', () => {
        if (startX === null) return;
        if (Math.abs(deltaX) > 40) {
          if (deltaX > 0) goTo(idx - 1);
          else goTo(idx + 1);
        }
        startX = null;
        deltaX = 0;
      });

      // recalc on resize
      let resizeTimer;
      window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(updateUI, 120); });

      // Reveal works only after scrolled down (keeps it hidden on first view)
      const obsOptions = {
        root: null,
        rootMargin: '0px 0px -60% 0px',
        threshold: 0
      };

      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            works.classList.add('visible');
            updateUI();
            observer.disconnect();
          }
        });
      }, obsOptions);

      obs.observe(works);

      // initial UI (does not make it visible)
      updateUI();

    })(); // end carousel

    // End of DOMContentLoaded
  }); // DOMContentLoaded

})(); // IIFE
