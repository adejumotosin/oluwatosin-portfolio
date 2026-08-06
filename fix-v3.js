(() => {
  const SOURCE = 'https://oluwatosin-portfolio.purple-thyme-8491.chatgpt.site/portfolio/';
  const img = (name, alt, loading = 'lazy') => {
    const el = document.createElement('img');
    el.src = SOURCE + name;
    el.alt = alt;
    el.loading = loading;
    el.decoding = 'async';
    return el;
  };

  function waitForPortfolio() {
    if (location.pathname.startsWith('/social-audit')) return;
    const hero = document.querySelector('.hero-grid');
    const work = document.querySelector('#work');
    const about = document.querySelector('#about');
    if (!hero || !work || !about) {
      setTimeout(waitForPortfolio, 80);
      return;
    }
    restoreHeroPortrait(hero);
    restoreAboutPortrait(about);
    restoreStandingPortrait();
    rescueCaseStudies();
    // V2 animations initialize asynchronously; repeat once after they have had time to attach.
    setTimeout(rescueCaseStudies, 450);
    setTimeout(rescueCaseStudies, 1200);
  }

  function restoreHeroPortrait(grid) {
    if (grid.querySelector('.v3-hero-side')) return;
    const proof = grid.querySelector('.hero-proof');
    if (!proof) return;

    const side = document.createElement('div');
    side.className = 'v3-hero-side';

    const figure = document.createElement('figure');
    figure.className = 'v3-hero-portrait';
    figure.appendChild(img('oluwatosin-closeup.jpg', 'Portrait of Oluwatosin Adejumo', 'eager'));

    const caption = document.createElement('figcaption');
    caption.innerHTML = '<span>Social media & content strategist</span><strong>Oluwatosin Adejumo</strong>';
    figure.appendChild(caption);

    grid.insertBefore(side, proof);
    side.appendChild(figure);
    side.appendChild(proof);
  }

  function restoreAboutPortrait(about) {
    if (about.querySelector('.v3-about-portrait')) return;
    const left = about.children[0];
    if (!left) return;

    const figure = document.createElement('figure');
    figure.className = 'v3-about-portrait';
    figure.appendChild(img('oluwatosin-seated.webp', 'Oluwatosin Adejumo seated in a studio'));
    const caption = document.createElement('figcaption');
    caption.textContent = 'Lagos, Nigeria · Social media strategy and content systems';
    figure.appendChild(caption);
    left.appendChild(figure);
  }

  function restoreStandingPortrait() {
    if (document.querySelector('.v3-portrait-interlude')) return;
    const toolkit = document.querySelector('.toolkit');
    if (!toolkit) return;

    const section = document.createElement('section');
    section.className = 'v3-portrait-interlude';

    const figure = document.createElement('figure');
    figure.appendChild(img('oluwatosin-standing.webp', 'Oluwatosin Adejumo standing in a black suit'));

    const copy = document.createElement('div');
    copy.className = 'v3-portrait-copy';
    copy.innerHTML = '<p class="eyebrow"><span></span> The principle</p><blockquote>“The right voice doesn’t imitate. It reveals what the brand already knows—clearly.”</blockquote>';

    section.append(figure, copy);
    toolkit.parentNode.insertBefore(section, toolkit);
  }

  function rescueCaseStudies() {
    const cards = [...document.querySelectorAll('#work .case-card')];
    const heading = document.querySelector('#work .section-heading');
    if (heading) {
      heading.style.opacity = '1';
      heading.style.visibility = 'visible';
    }

    const ST = window.ScrollTrigger;
    if (ST && typeof ST.getAll === 'function') {
      ST.getAll().forEach((trigger) => {
        const t = trigger.trigger;
        if (t && t.classList && t.classList.contains('case-card')) {
          if (trigger.animation && typeof trigger.animation.kill === 'function') trigger.animation.kill();
          trigger.kill();
        }
      });
    }

    cards.forEach((card) => {
      card.style.opacity = '1';
      card.style.visibility = 'visible';
      card.style.willChange = 'auto';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', waitForPortfolio, { once: true });
  else waitForPortfolio();
})();
