function initNavigation() {
  const mobileNavigation = document.querySelector('#mobile-navigation');
  const mobileToggle = document.querySelector('.mobile-navigation-toggle');
  const mobilePanel = document.querySelector('#mobile-navigation-panel');
  const mobileLabel = document.querySelector('.mobile-navigation-label');
  const socialLinks = document.querySelector('.social-links');
  const mobileSocial = document.querySelector('#mobile-navigation-social');

  if (socialLinks && mobileSocial && !mobileSocial.hasChildNodes()) {
    mobileSocial.append(socialLinks.cloneNode(true));
  }

  const setMobileMenu = isOpen => {
    mobilePanel?.classList.toggle('is-open', isOpen);
    mobileToggle?.setAttribute('aria-expanded', String(isOpen));
    mobileToggle?.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    if (mobileLabel) mobileLabel.textContent = isOpen ? 'CERRAR' : 'MENÚ';
    document.body.classList.toggle('mobile-navigation-open', isOpen);
  };

  mobileToggle?.addEventListener('click', () => {
    const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
    setMobileMenu(!isOpen);
  });

  document.querySelectorAll('.mobile-navigation-link').forEach(link => {
    link.addEventListener('click', () => setMobileMenu(false));
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const navigationLinks = [...document.querySelectorAll('[data-section]')];
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navigationLinks.forEach(link => link.classList.toggle('is-active', link.dataset.section === entry.target.id));
  }), { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: .08 });

  document.querySelectorAll('.section-heading, .about-copy, .design-minded, .experience-item, .project-row, .stack-grid article, .workflow-grid article, .contact-details').forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('pointermove', event => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    }, { passive: true });
  }
}

window.Portfolio = window.Portfolio || {};
window.Portfolio.initNavigation = initNavigation;
