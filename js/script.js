(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const inOut = t => (t < .5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE_OUT = 'cubic-bezier(.23, 1, .32, 1)';

  /* ---------- Theme: the room lights ---------- */
  const root = document.documentElement;
  const themeBtn = $('#theme');
  const labelTheme = () => {
    themeBtn.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} mode`);
  };
  const flipTheme = () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* private window: theme just won't persist */ }
    labelTheme();
  };
  // A full-page colour flip is harsh, so it crossfades where the browser supports it.
  themeBtn.addEventListener('click', () => {
    if (document.startViewTransition && !still) document.startViewTransition(flipTheme);
    else flipTheme();
  });
  labelTheme();

  /* ---------- Copy email: mailto does nothing without a mail app, so offer a fallback ---------- */
  const copyBtn = $('#copy');
  const copyStatus = $('#copy-status');
  let copyTimer;
  copyBtn.addEventListener('click', async () => {
    clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      copyBtn.textContent = 'Copied';
      copyStatus.textContent = 'Email address copied.';
      copyTimer = setTimeout(() => { copyBtn.textContent = 'Copy email'; copyStatus.textContent = ''; }, 2400);
    } catch (e) {
      copyBtn.textContent = 'Copy email';
      copyStatus.textContent = "Couldn't copy. Select the address above instead.";
    }
  });

  /* ---------- The step labels follow the demo as it plays ---------- */
  const demo = $('.work-iot video'), stepList = $('.iot-steps'), steps = $$('li', stepList);
  demo.addEventListener('timeupdate', () => {
    if (demo.paused) return;
    stepList.classList.add('is-live');
    const now = steps.filter(li => +li.dataset.at <= demo.currentTime).pop();
    for (const li of steps) li.classList.toggle('is-on', li === now);
  });

  /* ---------- Name: each letter takes its own hover ---------- */
  const heroName = $('#hero-name');
  heroName.parentElement.setAttribute('aria-label', heroName.textContent);
  heroName.setAttribute('aria-hidden', 'true');
  heroName.innerHTML = [...heroName.textContent].map(c => `<span>${c}</span>`).join('');
  // Project titles get the same hover, grouped by word so long ones still wrap.
  for (const title of $$('.work-copy h3, .scan-lit h3')) {
    title.setAttribute('aria-label', title.textContent);
    title.innerHTML = title.textContent.split(' ')
      .map(w => `<span aria-hidden="true">${[...w].map(c => `<span>${c}</span>`).join('')}</span>`)
      .join(' ');
  }

  /* ---------- Nav state: mark and rail follow the section in view ---------- */
  const sections = $$('[data-section]').map(el => ({
    el, id: el.id, label: el.dataset.label, top: 0, h: 0,
    link: $(`[data-nav="${el.id}"]`),
  }));
  const mark = $('#mark');
  const rail = $('#rail');
  let vh = innerHeight, phone = innerWidth < 800, active = null;

  const placeMark = link => {
    mark.style.transform = `translateX(${link.offsetLeft + link.offsetWidth / 2 - 6}px)`;
    // The logo link is hidden on phones, and the mark has nothing to sit under there.
    mark.style.opacity = link.offsetWidth ? 1 : 0;
  };
  const updateNav = y => {
    const mid = y + vh / 2;
    const now = sections.find(s => mid >= s.top && mid < s.top + s.h) || sections[0];
    if (now === active) return;
    if (active) active.link.removeAttribute('aria-current');
    now.link.setAttribute('aria-current', 'true');
    placeMark(now.link);
    rail.textContent = now.label;
    rail.classList.toggle('on-field', now.id === 'contact');
    active = now;
  };

  /* ---------- Scrubbed effects ---------- */
  const byId = id => sections.find(s => s.id === id);
  const hero = byId('hero'), stack = byId('stack'), contact = byId('contact');
  // Works also holds the project rows, so each pin is measured from its article alone.
  const works = $$('.work:not(.work-iot)').map(el => ({ el, top: 0, h: 0, screens: [], rows: [], copies: [] }));
  const fades = $$('[data-hero-fade]');
  const word = el => {
    const parts = el.textContent.trim().split(/\s+/);
    el.innerHTML = parts.map(w => `<span>${w}</span>`).join(' ');
    return $$('span', el);
  };
  const addDuo = img => {
    const duo = img.cloneNode();
    duo.alt = '';
    duo.className = 'duo';
    duo.removeAttribute('data-develop');
    duo.setAttribute('aria-hidden', 'true');
    img.after(duo);
    return duo;
  };

  let plates = [], words = [], frames = [], iot = null;
  const lead = $('#about-lead'), field = $('#contact-field');
  const WIND_STEP = 30; // degrees between neighbouring tools on the helix
  const spin = { pin: $('.spin-pin'), stage: $('.spin-stage'), top: 0, h: 0, radius: 0, rise: 0, max: 0, apart: 0, last: 0, front: -1 };
  const spinNum = $('#spin-num'), spinName = $('#spin-name');
  const ring = { center: $('#spin-ring-center'), line: $('#spin-ring-line'), dot: $('#spin-ring-dot'), pointer: $('.spin-ring-pointer'), ticks: [], r: 0 };

  if (!still) {
    plates = $$('[data-plate]').map(el => {
      const [fx, fy] = el.dataset.focus.split(' ').map(n => n / 100);
      return { el, duo: addDuo($('img', el)), r: +el.dataset.tilt, fx, fy };
    });
    for (const w of works) {
      w.screens = $$('[data-screen]', w.el).map(el => ({ el, dir: +el.dataset.screen, duo: addDuo($('img', el)) }));
      w.rows = $$('[data-marquee]', w.el).map(el => ({ el, dir: +el.dataset.marquee }));
      w.copies = $$('[data-work-copy]', w.el);
    }
    // IoT: the demo waits on its first frame until the scan has passed, so colour and crimson always match.
    const stageEl = $('.work-iot .work-stage'), lit = $('.scan-lit');
    const ghost = lit.cloneNode(true);
    ghost.className = 'scan-ghost';
    ghost.setAttribute('aria-hidden', 'true');
    ghost.querySelector('h3').removeAttribute('aria-label');
    lit.before(ghost);
    iot = { el: $('.work-iot'), stage: stageEl, lit, line: $('.scan-line'), video: $('.work-iot video'), glass: $('.work-iot .screen-glass'), duo: addDuo($('.screen-still')), top: 0, h: 0, litTop: 0, litH: 0, glassTop: 0, glassH: 0, scanned: false, visible: false };
    iot.sync = () => {
      if (iot.scanned && iot.visible) { iot.video.play().catch(() => { /* blocked autoplay: the controls still work */ }); return; }
      iot.video.pause();
      if (!iot.scanned && iot.video.currentTime > .2) {
        iot.video.currentTime = .15;
        $('.iot-steps').classList.remove('is-live');
      }
    };
    new IntersectionObserver(([e]) => { iot.visible = e.isIntersecting; iot.sync(); }).observe(iot.video);
    words = word(lead);
    frames = $$('.frame').map((el, i) => {
      const [num, ...name] = $('p', el).textContent.trim().split(/\s+/);
      $('.wash', el).style.maskImage = 'url("' + $('img', el).getAttribute('src') + '")';
      return { el, wash: $('.wash', el), i, num, name: name.join(' '), hidden: false };
    });
    spin.max = (frames.length - 1) * WIND_STEP;
    spin.pin.classList.add('is-spinning');
    // One tick per tool on the dial behind the helix.
    const tickGroup = $('#spin-ring-ticks');
    ring.ticks = frames.map(() => {
      const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tick.setAttribute('stroke', 'currentColor');
      tickGroup.append(tick);
      return tick;
    });
  }

  const layout = () => {
    vh = innerHeight;
    phone = innerWidth < 800;
    const sy = scrollY;
    for (const s of sections) {
      const r = s.el.getBoundingClientRect();
      s.top = r.top + sy;
      s.h = r.height;
    }
    for (const w of works) {
      const r = w.el.getBoundingClientRect();
      w.top = r.top + sy;
      w.h = r.height;
    }
    if (iot) {
      const r = iot.el.getBoundingClientRect(), stageTop = iot.stage.getBoundingClientRect().top;
      const lr = iot.lit.getBoundingClientRect(), gr = iot.glass.getBoundingClientRect();
      iot.top = r.top + sy;
      iot.h = r.height;
      iot.litTop = lr.top - stageTop;
      iot.litH = lr.height;
      iot.glassTop = gr.top - stageTop;
      iot.glassH = gr.height;
    }
    // The picture ends as a circle centred between the nav and the name, cropped around the face.
    const nameTop = $('.hero-name').offsetTop, NAV_BOTTOM = 56;
    for (const pl of plates) {
      const w = pl.el.offsetWidth, h = pl.el.offsetHeight, r = w * .4;
      const cx = clamp(w * pl.fx, r, w - r), cy = clamp(h * pl.fy, r, h - r);
      pl.round = r;
      pl.inset = [cy - r, w - cx - r, h - cy - r, cx - r];
      pl.endS = Math.min(innerWidth * (phone ? .56 : .24), vh * .34, nameTop - NAV_BOTTOM - 32) / (r * 2);
      pl.endX = -pl.endS * (cx - w / 2);
      pl.endY = (NAV_BOTTOM + nameTop) / 2 - pl.el.offsetTop - pl.endS * (cy - h / 2);
    }
    lead.dataset.top = lead.getBoundingClientRect().top + sy;
    lead.dataset.h = lead.offsetHeight;
    const pr = spin.pin.getBoundingClientRect();
    spin.top = pr.top + sy;
    spin.h = pr.height;
    const size = Math.min(innerWidth, vh) * (phone ? .42 : .27);
    spin.radius = size * 2.3;
    spin.rise = size * .42;
    spin.stage.style.setProperty('--spin-size', size + 'px');
    ring.r = Math.min(innerWidth, vh) * .42;
    ring.center.setAttribute('transform', `translate(${innerWidth / 2} ${vh / 2})`);
    ring.line.setAttribute('r', ring.r);
    ring.pointer.setAttribute('cx', ring.r);
    if (active) placeMark(active.link);
  };

  const inView = (s, y) => y + vh > s.top && y < s.top + s.h;

  let frameDt = .016;
  const spinWindAt = y => clamp((y - spin.top) / (spin.h - vh)) * spin.max;

  // Tools sit on a helix around a vertical axis: each is a step further round and a step higher.
  const renderSpin = y => {
    const wind = spinWindAt(y);
    // The coils spread while it spins fast and close up as it settles.
    const speed = clamp(Math.abs(wind - spin.last) / frameDt / 720);
    spin.apart += (speed - spin.apart) * (1 - Math.exp(-frameDt * 8));
    if (spin.apart < .001) spin.apart = 0;
    spin.last = wind;
    const at = wind / WIND_STEP;
    // Ticks turn with the wind, and the current tool's tick sits at twelve o'clock, longer and brighter.
    ring.ticks.forEach((tick, i) => {
      const off = Math.abs(i - at);
      if (off > 6) { tick.setAttribute('opacity', 0); return; }
      const near = Math.max(0, 1 - off);
      tick.setAttribute('transform', `rotate(${wind - i * WIND_STEP})`);
      tick.setAttribute('y1', -ring.r);
      tick.setAttribute('y2', -ring.r + 7 * (1 + .6 * near));
      tick.setAttribute('stroke-width', 1 + near);
      tick.setAttribute('opacity', .32 + .5 * near);
    });
    const gap = spin.rise * (1 + .35 * spin.apart);
    for (const f of frames) {
      const deg = f.i * WIND_STEP - wind;
      const rad = deg * Math.PI / 180;
      const cos = Math.cos(rad), sin = Math.sin(rad);
      // Past the side of the helix a tool faces away, so it isn't drawn.
      const hidden = cos < -.05 || Math.abs(f.i - at) > 8;
      if (hidden !== f.hidden) { f.el.style.visibility = hidden ? 'hidden' : ''; f.hidden = hidden; }
      if (hidden) continue;
      f.el.style.transform = `translate(-50%,-50%) translate3d(${spin.radius * sin}px,${(at - f.i) * gap}px,${spin.radius * cos}px) rotateY(${deg}deg)`;
      // Only the tool facing you is fully developed.
      f.wash.style.opacity = Math.min(1, .9 * sin * sin);
    }
    const front = Math.round(at);
    if (front !== spin.front) {
      spin.front = front;
      spinNum.textContent = frames[front].num;
      spinName.textContent = frames[front].name;
    }
  };

  const render = y => {
    if (inView(hero, y)) {
      const p = clamp((y - hero.top) / (hero.h - vh));
      plates.forEach(pl => {
        const t = inOut(clamp((p - .04) / .62));
        pl.el.style.transform = `translate(-50%,-50%) translate(${lerp(0, pl.endX, t)}px,${lerp(0, pl.endY, t)}px) rotate(${lerp(pl.r, 0, t)}deg) scale(${lerp(1, pl.endS, t)})`;
        // The square closes in on the face as its corners round, and ends as an exact circle.
        pl.el.style.clipPath = `inset(${pl.inset.map(v => v * t + 'px').join(' ')} round ${pl.round * t}px)`;
        pl.duo.style.opacity = 1 - clamp((p - .2) / .4);
      });
      const fade = 1 - clamp((p - .08) / .2);
      for (const el of fades) {
        el.style.opacity = fade;
        el.style.visibility = fade === 0 ? 'hidden' : '';
      }
    }

    if (words.length) {
      const top = +lead.dataset.top, h = +lead.dataset.h;
      const p = clamp((y + vh * .85 - top) / (h + vh * .35));
      words.forEach((w, i) => {
        const o = lerp(.2, 1, clamp(p * words.length - i * .92));
        if (w._o !== o) { w.style.opacity = o; w._o = o; }
      });
    }

    for (const w of works) {
      if (!inView(w, y)) continue;
      const p = clamp((y - w.top) / (w.h - vh));
      const t = inOut(clamp(p / .6));
      w.screens.forEach((s, i) => {
        const x = s.dir < 0 ? lerp(-78, -106, t) : lerp(-22, 6, t);
        s.el.style.transform = `translate(${x}%,-50%) perspective(1400px) rotateY(${lerp(-s.dir * 28, -s.dir * 14, t)}deg) rotate(${lerp(s.dir * 7, s.dir * 3, t)}deg) scale(${lerp(phone ? .8 : .62, 1, t)})`;
        s.duo.style.opacity = 1 - clamp((p - .16 - i * .08) / .42);
      });
      for (const r of w.rows) {
        r.el.style.transform = `translateX(${r.dir > 0 ? lerp(2, -48, p) : lerp(-48, 2, p)}%)`;
      }
      const o = clamp((p - (phone ? .25 : .55)) / .16);
      for (const c of w.copies) {
        c.style.opacity = o;
        c.style.transform = `translateY(${lerp(16, 0, inOut(o))}px)`;
      }
    }

    if (iot && inView(iot, y)) {
      const t = clamp((clamp((y - iot.top) / (iot.h - vh)) - .05) / .75);
      const lineY = t * vh;
      iot.line.style.transform = `translateY(${lineY}px)`;
      iot.line.style.opacity = t > 0 && t < 1 ? 1 : 0;
      iot.lit.style.clipPath = t < 1 ? `inset(0 0 ${Math.max(0, iot.litH - (lineY - iot.litTop))}px 0)` : '';
      iot.duo.style.clipPath = `inset(${clamp(lineY - iot.glassTop, 0, iot.glassH)}px 0 0 0)`;
      if ((t >= 1) !== iot.scanned) { iot.scanned = t >= 1; iot.sync(); }
    }

    if (inView(stack, y)) {
      if (frames.length) renderSpin(y);
    }

    if (!still) {
      const t = inOut(clamp((y + vh - contact.top) / (vh * .85)));
      const c = 1 - t;
      field.style.clipPath = t === 1 ? '' : `inset(${14 * c}% ${6 * c}% 0 ${6 * c}%)`;
    }
  };

  /* One timeline: scroll position, smoothed once, drives every effect above. */
  let cur = scrollY, raf = 0, last = 0;
  const tick = now => {
    const dt = Math.min(.05, (now - last) / 1000 || .016);
    last = now;
    frameDt = dt;
    const target = scrollY;
    cur += (target - cur) * (1 - Math.exp(-dt * 14));
    if (Math.abs(target - cur) < .4) cur = target;
    render(cur);
    raf = cur === target && !spin.apart ? 0 : requestAnimationFrame(tick);
  };
  const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };

  /* The nav tucks away on the way down past the hero, and a short scroll up brings it back. */
  const topbar = $('.topbar');
  let lastY = scrollY, travel = 0;
  const updateTuck = y => {
    const dy = y - lastY;
    lastY = y;
    if (active === hero) { topbar.classList.remove('is-tucked'); travel = 0; return; }
    // Drawing circles moves the page both ways, and the nav shouldn't flicker with it.
    if (!dy || spin.winding) return;
    travel = (dy > 0) === (travel > 0) ? travel + dy : dy;
    if (travel > 6) topbar.classList.add('is-tucked');
    else if (travel < -24) topbar.classList.remove('is-tucked');
  };

  addEventListener('scroll', () => { updateNav(scrollY); updateTuck(scrollY); if (!still) kick(); }, { passive: true });
  const relayout = () => { layout(); updateNav(scrollY); if (!still) render(cur); };
  addEventListener('resize', relayout);
  addEventListener('load', relayout);
  new ResizeObserver(relayout).observe(document.body);
  if (document.fonts) document.fonts.ready.then(relayout);
  relayout();

  /* ---------- Drawing circles winds the helix by moving the page, so scroll stays the one timeline ---------- */
  if (!still) {
    const stage = spin.stage;
    const pointerAngle = e => Math.atan2(e.clientY - vh / 2, e.clientX - innerWidth / 2);
    const goTo = w => scrollTo({ top: spin.top + clamp(w / spin.max) * (spin.h - vh), behavior: 'instant' });
    let drag = null, coastRaf = 0, velocity = 0, wind = 0, stamp = 0;
    const stopCoast = () => { cancelAnimationFrame(coastRaf); coastRaf = 0; spin.winding = false; };

    // After letting go it runs on, slows, then settles on the nearest tool.
    const settle = () => {
      const from = wind, to = Math.round(wind / WIND_STEP) * WIND_STEP, start = performance.now();
      const step = now => {
        const t = clamp((now - start) / 600);
        goTo(from + (to - from) * (1 - (1 - t) ** 3));
        coastRaf = t < 1 ? requestAnimationFrame(step) : 0;
        if (t === 1) spin.winding = false;
      };
      coastRaf = requestAnimationFrame(step);
    };
    const coast = now => {
      const dt = Math.min(.05, (now - stamp) / 1000);
      stamp = now;
      wind = clamp(wind + velocity * dt, 0, spin.max);
      velocity *= Math.exp(-dt / .55);
      goTo(wind);
      if (Math.abs(velocity) < 40 || wind === 0 || wind === spin.max) settle();
      else coastRaf = requestAnimationFrame(coast);
    };

    // Touch keeps its normal scroll: circling a finger would fight the page.
    stage.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button) return;
      stopCoast();
      spin.winding = true;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('is-dragging');
      wind = spinWindAt(scrollY);
      velocity = 0;
      stamp = performance.now();
      drag = { angle: pointerAngle(e) };
      ring.dot.setAttribute('transform', `rotate(${drag.angle * 180 / Math.PI})`);
    });
    stage.addEventListener('pointermove', e => {
      if (!drag) return;
      const angle = pointerAngle(e);
      let delta = angle - drag.angle;
      if (delta > Math.PI) delta -= 2 * Math.PI;
      else if (delta < -Math.PI) delta += 2 * Math.PI;
      drag.angle = angle;
      ring.dot.setAttribute('transform', `rotate(${angle * 180 / Math.PI})`);
      const deg = delta * 180 / Math.PI;
      const now = performance.now();
      const dt = Math.max(.001, (now - stamp) / 1000);
      stamp = now;
      velocity += (deg / dt - velocity) * .3;
      wind = clamp(wind + deg, 0, spin.max);
      goTo(wind);
    });
    const release = () => {
      if (!drag) return;
      drag = null;
      stage.classList.remove('is-dragging');
      stamp = performance.now();
      coastRaf = requestAnimationFrame(coast);
    };
    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);
    addEventListener('wheel', stopCoast, { passive: true });
  }

  /* ---------- Entrance: once, on first paint, only at the top of the page ---------- */
  if (!still && scrollY < 10) {
    const opts = { duration: 900, easing: EASE_OUT, fill: 'backwards' };
    $('.tab').animate({ transform: ['translateY(-88px)', 'translateY(0)'] }, { duration: 560, easing: 'cubic-bezier(.22, 1, .36, 1)' });
    $('.topbar').animate({ transform: ['scaleX(0)', 'scaleX(1)'] }, { duration: 640, easing: 'cubic-bezier(.5, 0, .15, 1)', pseudoElement: '::before' });
    $('#hero-name').animate({ opacity: [0, 1], translate: ['0 14%', '0 0'] }, { ...opts, duration: 1000 });
    plates.forEach((pl, i) => {
      pl.el.animate(
        { opacity: [0, 1], rotate: [`${-pl.r}deg`, '0deg'], translate: ['0 6vh', '0 0'] },
        { ...opts, delay: 120 + i * 70 },
      );
    });
    for (const el of fades) el.animate({ opacity: [0, 1] }, { ...opts, delay: 500, duration: 500 });
  }
})();
