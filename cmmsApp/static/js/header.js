const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);
  const navWrapper = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();

      const isOpen = nav.classList.toggle('show-menu');
      navWrapper?.classList.toggle('show-icon', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (event) => {
      const isClickInsideNav = navWrapper?.contains(event.target);

      if (!isClickInsideNav && nav.classList.contains('show-menu')) {
        nav.classList.remove('show-menu');
        navWrapper?.classList.remove('show-icon');
        document.body.classList.remove('no-scroll');
        toggle.setAttribute('aria-expanded', 'false');

        const servicesDropdown = document.querySelector('.services-dropdown');
        servicesDropdown?.classList.remove('is-open');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  showMenu('nav-toggle', 'nav-menu');

  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const links = document.querySelectorAll('[data-scroll-to]');
  const servicesDropdown = document.querySelector('.services-dropdown');
  const servicesToggle = document.querySelector('.services-toggle');

  function headerOffset() {
    return header ? header.offsetHeight : 0;
  }

  function smoothScrollTo(id) {
    const target = id ? document.querySelector(id) : null;
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  function closeMobileMenu() {
    navMenu?.classList.remove('show-menu');
    nav?.classList.remove('show-icon');
    document.body.classList.remove('no-scroll');
    navToggle?.setAttribute('aria-expanded', 'false');
    servicesDropdown?.classList.remove('is-open');
  }

  links.forEach((el) => {
    el.addEventListener('click', (e) => {
      const targetSel = el.getAttribute('href') || el.dataset.target;
      if (!targetSel || !targetSel.startsWith('#')) return;

      e.preventDefault();
      smoothScrollTo(targetSel);
      closeMobileMenu();
    });
  });

  if (servicesToggle && servicesDropdown) {
    servicesToggle.addEventListener('click', (e) => {
      if (window.innerWidth > 1118) return;

      e.preventDefault();
      e.stopPropagation();
      servicesDropdown.classList.toggle('is-open');
    });
  }

  document.addEventListener('click', (e) => {
    if (window.innerWidth > 1118) return;
    if (!servicesDropdown) return;

    if (!servicesDropdown.contains(e.target)) {
      servicesDropdown.classList.remove('is-open');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1118) {
      servicesDropdown?.classList.remove('is-open');
      navMenu?.classList.remove('show-menu');
      nav?.classList.remove('show-icon');
      document.body.classList.remove('no-scroll');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
});