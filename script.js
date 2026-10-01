(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const nav = document.getElementById('nav');
  const links = [...document.querySelectorAll('[data-nav]')];
  const ids = ['home', 'about', 'skills', 'projects', 'contact'];

  const syncToggle = () => toggle.setAttribute('aria-checked', String(root.dataset.theme === 'mocha'));
  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'mocha' ? 'latte' : 'mocha';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncToggle();
  });
  syncToggle();

  const onScroll = () => {
    let cur = 'home';
    ids.forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 200) cur = id; });
    nav.classList.toggle('ds-nav--scrolled', window.scrollY > 8);
    links.forEach(l => l.classList.toggle('ds-nav__link--active', l.dataset.nav === cur));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
