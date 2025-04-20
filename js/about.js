document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const darkmode = localStorage.getItem('darkmode');
  
    const enableDarkmode = () => {
      document.body.classList.add('darkmode');
      localStorage.setItem('darkmode', 'active');
    };
  
    const disableDarkmode = () => {
      document.body.classList.remove('darkmode');
      localStorage.removeItem('darkmode');
    };
  
    if (darkmode === 'active') {
      enableDarkmode();
    }
  
    themeSwitch?.addEventListener('click', () => {
      const isDark = document.body.classList.contains('darkmode');
      isDark ? disableDarkmode() : enableDarkmode();
    });
  });
  