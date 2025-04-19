document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
  
    const enableDarkmode = () => {
      document.body.classList.add('darkmode');
      localStorage.setItem('darkmode', 'active');
    };
  
    const disableDarkmode = () => {
      document.body.classList.remove('darkmode');
      localStorage.removeItem('darkmode');
    };
  
    if (localStorage.getItem('darkmode') === 'active') {
      enableDarkmode();
    }
  
    themeSwitch?.addEventListener('click', () => {
      const isDark = document.body.classList.contains('darkmode');
      isDark ? disableDarkmode() : enableDarkmode();
    });
  
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
  
    if (form && status) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
  
        if (!name || !email || !message) {
          status.textContent = 'Please fill out all fields.';
          status.style.color = 'red';
          return;
        }
  
        status.textContent = 'Thank you! Your message has been sent.';
        status.style.color = 'green';
        form.reset();
      });
    }
  });
  