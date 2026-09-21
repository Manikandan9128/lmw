document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const heroSlides = document.querySelectorAll('.hero__slide');
  const heroDots = document.querySelectorAll('.hero__dot');
  const heroFills = document.querySelectorAll('.hero__dot-fill');

  if (heroSlides.length > 1 && heroDots.length === heroSlides.length) {
    const SLIDE_DURATION = 15000;
    let current = 0;
    let startTime = performance.now();

    const setActive = (index) => {
      heroSlides[current].classList.remove('hero__slide--active');
      heroSlides[index].classList.add('hero__slide--active');
      heroFills.forEach((fill, i) => {
        fill.style.width = i < index ? '100%' : '0%';
      });
      current = index;
      startTime = performance.now();
    };

    const tick = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / SLIDE_DURATION, 1) * 100;
      heroFills[current].style.width = pct + '%';
      if (elapsed >= SLIDE_DURATION) {
        setActive((current + 1) % heroSlides.length);
      }
      requestAnimationFrame(tick);
    };

    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => setActive(i));
    });

    requestAnimationFrame(tick);
  }

  document.querySelectorAll('.commitment-card').forEach((card) => {
    card.addEventListener('mousedown', (e) => e.preventDefault());
    card.addEventListener('mouseleave', () => card.blur());
  });
});
