/* NEXORA Micro Interaction v1
   Subtle icon response while the user scrolls/touches the page. */
(function () {
  const selector = [
    'i[class*="icon"]',
    'svg',
    '.icon',
    '.service-icon',
    '.portfolio-icon',
    '.feature-icon',
    '.cta-icon',
    '.package-icon',
    '.estimator-icon',
    '.quote-icon',
    '[data-icon]'
  ].join(',');

  let ticking = false;
  let lastShake = 0;

  function shakeVisibleIcons() {
    const now = performance.now();
    if (now - lastShake < 180) return;
    lastShake = now;

    const icons = document.querySelectorAll(selector);
    let count = 0;

    icons.forEach((icon) => {
      if (count >= 12) return;
      const rect = icon.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!visible) return;

      icon.classList.remove('nexora-scroll-shake');
      void icon.offsetWidth;
      icon.classList.add('nexora-scroll-shake');

      window.setTimeout(() => {
        icon.classList.remove('nexora-scroll-shake');
      }, 300);

      count++;
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      shakeVisibleIcons();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile touch feedback: a small shake after a real swipe/drag.
  let touchStartY = null;
  document.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (touchStartY === null) return;
    const endY = e.changedTouches && e.changedTouches[0]
      ? e.changedTouches[0].clientY : touchStartY;
    if (Math.abs(endY - touchStartY) > 12) shakeVisibleIcons();
    touchStartY = null;
  }, { passive: true });
})();
