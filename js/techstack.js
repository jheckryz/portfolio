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
  const themeSwitch = document.getElementById('theme-switch');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Dark mode init
  const darkmode = localStorage.getItem('darkmode') === 'active';
  setDarkMode(darkmode);

  // Toggle dark mode
  themeSwitch?.addEventListener('click', () => {
    const isNowDark = !document.body.classList.contains('darkmode');
    setDarkMode(isNowDark);
  });

  // Toggle mobile menu
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });

  // Highlight active nav
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav ul li').forEach(link => {
    const anchor = link.querySelector('a');
    if (anchor && anchor.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
