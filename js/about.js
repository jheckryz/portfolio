let vantaEffect = null;

function initVanta(isDark) {
  if (vantaEffect) vantaEffect.destroy();

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
  initVanta(isDark);
}

document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Dark mode init
  const darkmode = localStorage.getItem('darkmode') === 'active';
  setDarkMode(darkmode);

  themeSwitch?.addEventListener('click', () => {
    const isNowDark = !document.body.classList.contains('darkmode');
    setDarkMode(isNowDark);
  });

  // Hamburger menu toggle
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });

  // Highlight active nav link
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav ul li').forEach(link => {
    const anchor = link.querySelector('a');
    if (anchor && anchor.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
