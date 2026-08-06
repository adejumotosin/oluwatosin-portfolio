(() => {
  const metrics = ['49K+', '1.2K+', '30+'];

  function applyMetricFixes() {
    if (location.pathname.startsWith('/social-audit')) return;

    const proofStats = [...document.querySelectorAll('.hero-proof .proof-stat strong')];
    proofStats.forEach((strong, i) => {
      const expected = metrics[i];
      if (!expected) return;
      if (strong.dataset.v4Value === expected && strong.textContent.trim() === expected) return;
      strong.dataset.v4Value = expected;
      strong.innerHTML = `<span class="v4-metric">${expected}</span>`;
    });

    const score = document.querySelector('.sample-score > strong');
    if (score && !score.classList.contains('v4-score-lockup')) {
      score.classList.add('v4-score-lockup');
      score.innerHTML = '<span class="v4-score-main">67</span><span class="v4-score-denom">/100</span>';
    }
  }

  function start() {
    if (location.pathname.startsWith('/social-audit')) return;
    let attempts = 0;
    const timer = setInterval(() => {
      applyMetricFixes();
      attempts += 1;
      if (attempts >= 30) clearInterval(timer);
    }, 100);

    const root = document.getElementById('root');
    if (root) {
      const observer = new MutationObserver(() => applyMetricFixes());
      observer.observe(root, { childList: true, subtree: true, characterData: true });
      setTimeout(() => observer.disconnect(), 5000);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
