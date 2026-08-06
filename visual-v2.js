(() => {
  const ready = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  };

  ready(() => {
    const isAudit = location.pathname.startsWith('/social-audit');
    if (isAudit) return;

    // Custom cursor on fine pointers only.
    if (matchMedia('(pointer:fine)').matches) {
      document.body.classList.add('v2-fine-pointer');
      const dot = document.createElement('div');
      const ring = document.createElement('div');
      dot.className = 'v2-cursor';
      ring.className = 'v2-cursor-ring';
      document.body.append(dot, ring);
      let rx = innerWidth / 2, ry = innerHeight / 2;
      let mx = rx, my = ry;
      addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
      });
      const follow = () => {
        rx += (mx - rx) * .16; ry += (my - ry) * .16;
        ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
        requestAnimationFrame(follow);
      };
      follow();
      document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a,button,.case-card,.cap-card,.system-card')) document.body.classList.add('v2-link-hover');
      });
      document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a,button,.case-card,.cap-card,.system-card')) document.body.classList.remove('v2-link-hover');
      });
    }

    const scrollLabel = document.createElement('div');
    scrollLabel.className = 'v2-scroll-label';
    scrollLabel.textContent = 'SCROLL TO EXPLORE ↘';
    document.body.appendChild(scrollLabel);
    addEventListener('scroll', () => scrollLabel.classList.toggle('hidden', scrollY > 320), { passive: true });

    const waitForApp = () => {
      if (!document.querySelector('.hero')) {
        setTimeout(waitForApp, 80);
        return;
      }
      enhance();
    };
    waitForApp();

    function enhance() {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.registerPlugin(ScrollTrigger);

      // Stronger cinematic entrance.
      gsap.fromTo('.hero-proof',
        { opacity: 0, y: 60, rotate: 7, scale: .94 },
        { opacity: 1, y: 0, rotate: 2.5, scale: 1, duration: 1.15, delay: .65, ease: 'power4.out' }
      );

      // Make major sections arrive like presentation slides.
      document.querySelectorAll('.section-heading,.cap-card,.audit-panel,.system-card,.about > *').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: .9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });

      // Work cards get a scale + perspective reveal.
      document.querySelectorAll('.case-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 90,
          scale: .965,
          rotateX: 4,
          transformPerspective: 1200,
          duration: 1.05,
          delay: i * .04,
          ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 86%', once: true }
        });
      });

      // Oversized headings glide horizontally as they enter.
      document.querySelectorAll('.section-heading h2,.approach h2,.contact h2').forEach((heading, i) => {
        gsap.from(heading, {
          xPercent: i % 2 ? 7 : -7,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 90%', once: true }
        });
      });

      // Subtle parallax across large blocks.
      gsap.to('.hero-proof', {
        y: -55,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 }
      });
      document.querySelectorAll('.case-card').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 ? -22 : 22,
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.4 }
        });
      });

      // Tilt interactions for poster cards.
      if (matchMedia('(pointer:fine)').matches) {
        document.querySelectorAll('.case-card,.cap-card,.system-card').forEach((card) => {
          card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - .5;
            const py = (e.clientY - r.top) / r.height - .5;
            gsap.to(card, { rotateY: px * 2.5, rotateX: py * -2.5, transformPerspective: 1000, duration: .35, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: .65, ease: 'elastic.out(1,.45)' }));
        });
      }
    }
  });
})();
