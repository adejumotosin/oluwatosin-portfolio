(() => {
  const replacements = [
    ['clearer position—and a voice', 'clearer position and a voice'],
    ['complete strategic chain—from business problem', 'complete strategic chain, from business problem'],
    ['easier to create—and far more effective', 'easier to create and far more effective'],
    ['publish more—it is to make content move the brand forward', 'publish more. It is to make content move the brand forward']
  ];

  function cleanText(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName)) return;
      let text = node.nodeValue || '';
      replacements.forEach(([from, to]) => { text = text.split(from).join(to); });
      text = text.replace(/\s*—\s*/g, ', ');
      if (text !== node.nodeValue) node.nodeValue = text;
    });
  }

  function stabilizeCapabilities() {
    if (location.pathname.startsWith('/social-audit')) return;
    const section = document.getElementById('services');
    if (!section) return;
    const cards = [...section.querySelectorAll('.cap-card')];

    const ST = window.ScrollTrigger;
    if (ST && typeof ST.getAll === 'function') {
      ST.getAll().forEach((trigger) => {
        const t = trigger.trigger;
        const targetsCapabilities = t === section || (t && t.classList && t.classList.contains('cap-card'));
        if (!targetsCapabilities) return;
        if (trigger.animation && typeof trigger.animation.kill === 'function') trigger.animation.kill();
        trigger.kill();
      });
    }

    cards.forEach((card) => {
      card.style.opacity = '1';
      card.style.visibility = 'visible';
      card.style.removeProperty('transform');
      card.style.removeProperty('translate');
      card.style.willChange = 'auto';
    });

    const heading = section.querySelector('.section-heading');
    if (heading) {
      heading.style.opacity = '1';
      heading.style.visibility = 'visible';
      heading.style.removeProperty('transform');
    }
  }

  function run() {
    cleanText();
    stabilizeCapabilities();
  }

  function start() {
    if (location.pathname.startsWith('/social-audit')) return;
    run();
    let count = 0;
    const timer = setInterval(() => {
      run();
      count += 1;
      if (count >= 25) clearInterval(timer);
    }, 120);

    const root = document.getElementById('root');
    if (root) {
      const observer = new MutationObserver(run);
      observer.observe(root, { childList: true, subtree: true, characterData: true });
      setTimeout(() => observer.disconnect(), 5000);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
