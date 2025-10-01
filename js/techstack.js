function updateLogo(isDark) {
  const logo = document.getElementById("logo");
  if (logo) {
    logo.src = isDark ? "images/Logo.png" : "images/logo_light.png";
  }
}

function setDarkMode(isDark) {
  const themeSwitch = document.getElementById('theme-switch');
  if (!themeSwitch) return;

  document.body.classList.toggle('darkmode', isDark);
  document.body.classList.toggle('lightmode', !isDark);
  themeSwitch.classList.toggle('active', isDark);
  localStorage.setItem('darkmode', isDark ? 'active' : null);

  updateLogo(isDark);
}

document.addEventListener('DOMContentLoaded', () => {
  // header/theme behaviour (unchanged)
  const themeSwitch = document.getElementById('theme-switch');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  const darkmode = localStorage.getItem('darkmode') === 'active';
  setDarkMode(darkmode);

  themeSwitch?.addEventListener('click', () => {
    const isNowDark = !document.body.classList.contains('darkmode');
    setDarkMode(isNowDark);
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });

  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav ul li').forEach(link => {
    const anchor = link.querySelector('a');
    if (anchor && anchor.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // -------------------------
  // Techstack neighbor logic (updated)
  // -------------------------
  const container = document.querySelector('.items');
  if (!container) return;

  let items = Array.from(container.querySelectorAll('.item'));

  // Build 2D array grid by clustering element centerY positions into rows,
  // then sort items in each row by left. Robust to responsive reflow.
  function buildGrid() {
    items = Array.from(container.querySelectorAll('.item'));
    const rows = []; // { centerY, items: [{el, left, centerX}] }

    items.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const left = rect.left;
      // find row where centerY is within half the element height of row.centerY
      let row = rows.find(r => Math.abs(r.centerY - centerY) <= (rect.height / 2 + 4));
      if (!row) {
        row = { centerY, items: [] };
        rows.push(row);
      }
      row.items.push({ el, left, centerX: rect.left + rect.width / 2 });
    });

    rows.sort((a, b) => a.centerY - b.centerY);
    rows.forEach(row => row.items.sort((a, b) => a.left - b.left));
    return rows.map(r => r.items.map(i => i.el));
  }

  // Clear classes and inline transforms used for tilting and dimming
  function clearTiltStates() {
    items.forEach(it => {
      // preserve selected state
      if (it.classList.contains('selected')) return;
      it.classList.remove(
        'hovered',
        'tilt-left', 'tilt-right', 'tilt-up', 'tilt-down',
        'tilt-tl', 'tilt-tr', 'tilt-bl', 'tilt-br',
        'dim'
      );
      // clear inline transform if any (diagonal)
      it.style.transform = '';
      delete it.dataset.tiltDiagonal;
    });
  }

  // Apply diagonal via inline transform (kept inline for precision across layouts)
  function setDiagonalState(el, dir) {
    // stronger diagonal tilt values than before
    const tx = (dir === 'tr' || dir === 'br') ? 16 : -16;
    const ty = (dir === 'bl' || dir === 'br') ? 16 : -16;
    const rx = (dir === 'tr' || dir === 'tl') ? -14 : 14; // up tilt negative
    const ry = (dir === 'tl' || dir === 'bl') ? -14 : 14; // left tilt negative
    el.classList.add(`tilt-${dir}`);
    el.style.transform = `translateX(${tx}px) translateY(${ty}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    el.dataset.tiltDiagonal = dir;
    el.classList.add('dim'); // dim diagonals as well
  }

  // Attach handlers and keep guard to avoid double-binding
  function attachHandlers() {
    items = Array.from(container.querySelectorAll('.item'));

    items.forEach(el => {
      if (el.__hasTiltHandlers) return;
      el.__hasTiltHandlers = true;

      el.addEventListener('mouseenter', () => {
        const grid = buildGrid();
        clearTiltStates();

        // find element coordinates in grid
        let pos = null;
        for (let r = 0; r < grid.length; r++) {
          const c = grid[r].indexOf(el);
          if (c !== -1) { pos = { r, c }; break; }
        }
        if (!pos) return;
        const { r, c } = pos;

        // hovered class (brightest)
        el.classList.add('hovered');

        // left/right neighbors (same row) - stronger tilt & dim them
        if (c - 1 >= 0) {
          const leftEl = grid[r][c - 1];
          leftEl.classList.add('tilt-left', 'dim');
          // stronger tilt via inline tweak to ensure priority over CSS transform
          leftEl.style.transform = 'translateX(-16px) rotateY(-16deg) scale(1.05)';
        }
        if (c + 1 < grid[r].length) {
          const rightEl = grid[r][c + 1];
          rightEl.classList.add('tilt-right', 'dim');
          rightEl.style.transform = 'translateX(16px) rotateY(16deg) scale(1.05)';
        }

        // up/down neighbors (same column index in adjacent rows)
        if (r - 1 >= 0 && grid[r - 1][c]) {
          const upEl = grid[r - 1][c];
          upEl.classList.add('tilt-up', 'dim');
          upEl.style.transform = 'translateY(-16px) rotateX(-16deg) scale(1.05)';
        }
        if (r + 1 < grid.length && grid[r + 1][c]) {
          const downEl = grid[r + 1][c];
          downEl.classList.add('tilt-down', 'dim');
          downEl.style.transform = 'translateY(16px) rotateX(16deg) scale(1.05)';
        }

        // diagonals: stronger diagonal tilt + dim
        if (r - 1 >= 0 && c - 1 >= 0 && grid[r - 1][c - 1]) setDiagonalState(grid[r - 1][c - 1], 'tl');
        if (r - 1 >= 0 && c + 1 < grid[r - 1].length && grid[r - 1][c + 1]) setDiagonalState(grid[r - 1][c + 1], 'tr');
        if (r + 1 < grid.length && c - 1 >= 0 && grid[r + 1][c - 1]) setDiagonalState(grid[r + 1][c - 1], 'bl');
        if (r + 1 < grid.length && c + 1 < grid[r + 1].length && grid[r + 1][c + 1]) setDiagonalState(grid[r + 1][c + 1], 'br');
      });

      el.addEventListener('mouseleave', () => {
        clearTiltStates();
      });

      // click to center-select (unchanged)
      el.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const prev = document.querySelector('.item.selected');
        if (prev) {
          prev.classList.remove('selected');
          const prevOverlay = document.querySelector('.items-overlay');
          if (prevOverlay) prevOverlay.remove();
          document.body.classList.remove('no-scroll');
        }

        const overlay = document.createElement('div');
        overlay.className = 'items-overlay';
        document.body.appendChild(overlay);
        document.body.classList.add('no-scroll');

        clearTiltStates();
        el.classList.add('selected');

        overlay.addEventListener('click', () => {
          el.classList.remove('selected');
          overlay.remove();
          document.body.classList.remove('no-scroll');
        });
      });
    });
  }

  // init
  attachHandlers();

  // on resize/orientation change re-evaluate (clear & rebind)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      clearTiltStates();
      items.forEach(it => { it.__hasTiltHandlers = false; });
      attachHandlers();
    }, 120);
  });

  // clicking anywhere outside selected item closes selection (unchanged)
  document.addEventListener('click', () => {
    const sel = document.querySelector('.item.selected');
    const ov = document.querySelector('.items-overlay');
    if (sel) {
      sel.classList.remove('selected');
      if (ov) ov.remove();
      document.body.classList.remove('no-scroll');
    }
  });

}); // DOMContentLoaded end
