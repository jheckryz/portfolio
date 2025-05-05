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
    chaos: 7.00,
    color: isDark ? 0xe08f24 : 0x0e6ce0,
    backgroundColor: isDark ? 0x0e0e0e : 0xf0f0f0
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const circle = themeSwitch?.querySelector('.circle');
  let darkmode = localStorage.getItem('darkmode');

  const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    document.body.classList.remove('lightmode');
    themeSwitch.classList.add('active');
    localStorage.setItem('darkmode', 'active');
    initVanta(true);
  };

  const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    document.body.classList.add('lightmode');
    themeSwitch.classList.remove('active');
    localStorage.setItem('darkmode', 'inactive');
    initVanta(false);
  };

  if (darkmode === 'active') {
    enableDarkmode();
  } else {
    disableDarkmode();
  }

  themeSwitch?.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    if (darkmode !== 'active') {
      enableDarkmode();
    } else {
      disableDarkmode();
    }
  });

  // Highlight active page
  const navLinks = document.querySelectorAll('nav ul li');
  const currentPage = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    const anchor = link.querySelector('a');
    if (anchor && anchor.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
