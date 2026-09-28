'use strict';
// Progressive enhancement: a failed or disabled script never hides site content.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.classList.add('motion-ready');
  if (!location.hash || location.hash === '#top') {
    root.classList.add('intro-playing');
    // Independent safety release even if the main motion module fails to load.
    window.setTimeout(() => root.classList.remove('intro-playing'), 3200);
  }
})();
