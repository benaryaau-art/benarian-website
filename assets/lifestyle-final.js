(() => {
  const img = document.querySelector('.benarian-lifestyle-final');
  if (!img) return;

  const parts = [
    'assets/shop/lifestyle-600-01.b64?v=20260814final1',
    'assets/shop/lifestyle-600-02.b64?v=20260814final1',
    'assets/shop/lifestyle-600-03.b64?v=20260814final1',
    'assets/shop/lifestyle-600-04.b64?v=20260814final1',
    'assets/shop/lifestyle-600-05.b64?v=20260814final1',
    'assets/shop/lifestyle-600-06.b64?v=20260814final1',
    'assets/shop/lifestyle-600-07.b64?v=20260814final1',
    'assets/shop/lifestyle-600-08.b64?v=20260814final1'
  ];

  Promise.all(parts.map(src => fetch(src, { cache: 'no-store' }).then(r => {
    if (!r.ok) throw new Error(`Lifestyle image part failed: ${r.status}`);
    return r.text();
  })))
    .then(bits => {
      const clean = bits.join('').replace(/\s+/g, '');
      if (!clean.startsWith('UklG') || clean.length < 50000) throw new Error('Lifestyle image source incomplete');
      const dataUrl = `data:image/webp;base64,${clean}`;
      const probe = new Image();
      probe.onload = () => {
        img.src = dataUrl;
        img.style.opacity = '1';
        img.dataset.ready = 'true';
      };
      probe.onerror = () => {
        console.warn('[BENARIAN Lifestyle] Image decode failed');
        img.style.display = 'none';
      };
      probe.src = dataUrl;
    })
    .catch(err => {
      console.warn('[BENARIAN Lifestyle]', err.message);
      img.style.display = 'none';
    });
})();
