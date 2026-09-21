document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis();

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  const headerStack = document.querySelector('.site-header-stack');
  if (headerStack) {
    const COMPACT_THRESHOLD = 40;
    let ticking = false;

    const updateCompact = () => {
      headerStack.classList.toggle('is-compact', window.scrollY > COMPACT_THRESHOLD);
      ticking = false;
    };

    updateCompact();
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateCompact);
        ticking = true;
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target);
      }
    });
  });

  const heroSlides = document.querySelectorAll('.hero__slide');
  const heroDots = document.querySelectorAll('.hero__dot');
  const heroFills = document.querySelectorAll('.hero__dot-fill');
  const heroTitle = document.querySelector('.hero__title');
  const heroDesc = document.querySelector('.hero__desc');

  const HERO_CONTENT = [
    {
      title: 'We build what moves the world forward',
      desc: 'From the threads that become everyday life to the machines that shape industries, our work spans generations of engineering. Across textiles, machinery, foundry and aerospace, we turn precision into progress.',
    },
    {
      title: 'We keep the world spinning, thread by thread',
      desc: 'For decades, we have helped textile manufacturers turn fibre into possibility through machines built for precision, consistency and scale. Every spindle, every thread, every revolution carries forward a legacy of engineering that began in Coimbatore.',
    },
    {
      title: 'We shape the machines behind tomorrow',
      desc: 'Precision begins where ideas meet metal. From advanced machining centres to intelligent manufacturing systems, we engineer the tools that help industries create with greater accuracy, speed and confidence.',
    },
    {
      title: 'We forge strength from the heat of creation',
      desc: 'Before a machine takes shape, there is fire, metal and the hands that know how to transform them. Our foundry capabilities bring together generations of metallurgical expertise and modern engineering to create components built to endure.',
    },
    {
      title: 'We reach beyond the boundaries of earth',
      desc: "The demands of aerospace leave no room for compromise. From complex structures to mission-critical components, our engineering capabilities carry the precision of LMW into one of the world's most demanding frontiers.",
    },
  ];

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
      if (heroTitle && heroDesc && HERO_CONTENT[index]) {
        heroTitle.style.opacity = '0';
        heroDesc.style.opacity = '0';
        window.setTimeout(() => {
          heroTitle.textContent = HERO_CONTENT[index].title;
          heroDesc.textContent = HERO_CONTENT[index].desc;
          heroTitle.style.opacity = '1';
          heroDesc.style.opacity = '1';
        }, 200);
      }
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

  const promiseTabs = document.querySelectorAll('.five-promises__tab');
  const promiseTitle = document.querySelector('.five-promises__card-title');
  const promiseDesc = document.querySelector('.five-promises__card-desc');
  const promiseImage = document.querySelector('[data-promise-image]');

  if (promiseTabs.length && promiseTitle && promiseDesc && promiseImage) {
    const PROMISES = [
      {
        title: 'To our customers',
        desc: 'Our machines are bought once and worked for decades — spinning lines, machining centres, castings in service. We engineer and support them for that whole life, not for the warranty period.',
        image: 'assets/images/five-promises-bg.png',
      },
      {
        title: 'To our owners',
        desc: "Every expansion in sixty-three years has been paid for by the business itself. Holding LMW has never meant holding a lender's risk.",
        image: 'assets/images/five-promises-owners.png',
      },
      {
        title: 'To our ecosystem',
        desc: 'The suppliers, technology partners and allied enterprises around us are part of how we keep our word on quality. We treat them accordingly.',
        image: 'assets/images/five-promises-ecosystem.png',
      },
      {
        title: 'To our people & communities',
        desc: 'Careers that run across generations, institutes our founders built, and community work funded beyond what the law requires.',
        image: 'assets/images/five-promises-people.png',
      },
      {
        title: 'To our planet',
        desc: 'Lower carbon, our own renewable power, and machines built for the recycled fibre the industry is moving toward.',
        image: 'assets/images/five-promises-planet.png',
      },
    ];
    const PROMISE_DURATION = 15000;
    let promiseCurrent = 0;
    let promiseTimer = null;

    const setPromise = (index) => {
      promiseCurrent = index;
      promiseTabs.forEach((tab, i) => {
        tab.classList.toggle('five-promises__tab--active', i === index);
      });
      promiseTitle.style.opacity = '0';
      promiseDesc.style.opacity = '0';
      promiseImage.style.opacity = '0';
      window.setTimeout(() => {
        promiseTitle.textContent = PROMISES[index].title;
        promiseDesc.textContent = PROMISES[index].desc;
        promiseImage.style.backgroundImage = `url('${PROMISES[index].image}')`;
        promiseTitle.style.opacity = '1';
        promiseDesc.style.opacity = '1';
        promiseImage.style.opacity = '1';
      }, 200);
    };

    const restartPromiseTimer = () => {
      if (promiseTimer) clearInterval(promiseTimer);
      promiseTimer = setInterval(() => {
        setPromise((promiseCurrent + 1) % PROMISES.length);
      }, PROMISE_DURATION);
    };

    promiseTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        setPromise(i);
        restartPromiseTimer();
      });
    });

    restartPromiseTimer();
  }

  document.querySelectorAll('.commitment-card').forEach((card) => {
    card.addEventListener('mousedown', (e) => e.preventDefault());
    card.addEventListener('mouseleave', () => card.blur());
  });

  const timelinePin = document.querySelector('[data-timeline-pin]');
  const timelineTrack = document.querySelector('.timeline__track');
  const timelineItems = document.querySelectorAll('.timeline__item');
  const timelineBarFill = document.querySelector('.timeline__bar-fill');

  if (timelinePin && timelineTrack && timelineItems.length && window.matchMedia('(min-width: 901px)').matches) {
    // Sticky-pin pattern: the wrapper is made ITEM_COUNT viewport-heights tall and
    // the track inside it is position:sticky (see .timeline in style.css), so the
    // section background/heading/quote/bar physically cannot move while pinned —
    // CSS sticky itself caps the track's position, it can never be scrolled past
    // in one jump. Within that pinned dwell, one wheel gesture steps exactly one
    // card; only .timeline__track translates horizontally, never the page.
    const ITEM_COUNT = timelineItems.length;
    const ITEM_STEP = 770; // 650px card + 120px gap
    const STICKY_TOP = 78; // must match .timeline { top: ... } in style.css
    const TRANSITION_MS = 700;

    let activeIndex = 0;
    let isAnimating = false;

    timelinePin.style.height = `${ITEM_COUNT * 100}vh`;

    const render = (index) => {
      activeIndex = index;
      timelineTrack.style.transform = `translateX(-${activeIndex * ITEM_STEP}px)`;
      timelineItems.forEach((item, i) => {
        item.classList.toggle('timeline__item--dim', i !== activeIndex);
      });
      timelineBarFill.style.width = `${((activeIndex + 1) / ITEM_COUNT) * 100}%`;
    };

    const isPinned = () => {
      const rect = timelinePin.getBoundingClientRect();
      return rect.top <= STICKY_TOP + 1 && rect.bottom > window.innerHeight;
    };

    window.addEventListener(
      'wheel',
      (e) => {
        if (!isPinned()) return;

        if (isAnimating) {
          e.preventDefault();
          return;
        }

        const goingDown = e.deltaY > 0;

        if (goingDown && activeIndex === ITEM_COUNT - 1) return; // release: let scroll continue to next section
        if (!goingDown && activeIndex === 0) return; // release: let scroll continue to previous section

        e.preventDefault();
        isAnimating = true;
        render(activeIndex + (goingDown ? 1 : -1));
        window.setTimeout(() => {
          isAnimating = false;
        }, TRANSITION_MS);
      },
      { passive: false }
    );

    render(0);
  }

  document.querySelectorAll('.nav-item').forEach((navItem) => {
    const trigger = navItem.querySelector('.nav-item__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = navItem.classList.toggle('nav-item--open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!navItem.contains(e.target)) {
        navItem.classList.remove('nav-item--open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
