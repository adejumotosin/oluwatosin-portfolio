(async () => {
  try {
    const parts = await Promise.all(
      [1, 2, 3, 4, 5, 6, 7].map(async (n) => {
        const res = await fetch(`/runtime/app-${String(n).padStart(2, '0')}.txt`);
        if (!res.ok) throw new Error(`Failed to load runtime chunk ${n}`);
        return res.text();
      })
    );
    (0, eval)(parts.join(''));
  } catch (error) {
    console.error(error);
    document.getElementById('root').innerHTML = `
      <main style="font-family:system-ui;padding:40px;max-width:760px;margin:auto">
        <h1>Portfolio temporarily unavailable</h1>
        <p>Please refresh the page. If the issue continues, contact Oluwatosin via WhatsApp.</p>
        <a href="https://wa.me/2349137088563">Contact on WhatsApp</a>
      </main>`;
  }
})();
