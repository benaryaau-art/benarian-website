(() => {
  const SHOPIFY_BASE = 'https://benarian-2.myshopify.com';
  const COLLECTION_URL = `${SHOPIFY_BASE}/collections/all`;
  const grid = document.querySelector('.shop-grid');

  const HERO_SOURCE = 'assets/shop/benarian-group-hero-mobile-fix.b64?v=20260814h';
  const HERO_FALLBACK = "url('assets/shop/benarian-collection-hero-v3.webp')";

  const applyProfessionalHero = () => {
    const hero = document.querySelector('.shop-hero-visual');
    if (!hero) return;

    hero.style.setProperty('background-color', '#f3eee6', 'important');

    fetch(HERO_SOURCE, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`Hero source failed: ${r.status}`);
        return r.text();
      })
      .then(base64 => {
        const clean = base64.replace(/\s+/g, '');
        if (!clean.startsWith('/9j/') || clean.length < 50000) throw new Error('Hero source incomplete');
        const dataUrl = `data:image/jpeg;base64,${clean}`;
        const probe = new Image();
        probe.onload = () => {
          hero.style.setProperty('background-image', `url("${dataUrl}")`, 'important');
          hero.style.setProperty('background-size', 'cover', 'important');
          hero.style.setProperty('background-repeat', 'no-repeat', 'important');
          hero.style.setProperty('background-position', window.innerWidth <= 560 ? '72% center' : window.innerWidth <= 900 ? '70% center' : '68% center', 'important');
        };
        probe.onerror = () => hero.style.setProperty('background-image', HERO_FALLBACK, 'important');
        probe.src = dataUrl;
      })
      .catch(err => {
        console.warn('[BENARIAN Hero]', err.message);
        hero.style.setProperty('background-image', HERO_FALLBACK, 'important');
      });
  };

  applyProfessionalHero();
  if (!grid) return;

  const cards = [...grid.querySelectorAll('.shop-card')];
  const SNEAKER_ALT = 'BENARIAN Signature High-Top Sneakers in black and gold';
  const SNEAKER_SOURCE = 'assets/shop/benarian-sneakers-pro-v2.b64?v=20260814g';

  const applyProfessionalSneaker = () => {
    fetch(SNEAKER_SOURCE, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`Sneaker image source failed: ${r.status}`);
        return r.text();
      })
      .then(base64 => {
        const img = grid.querySelector(`img[alt="${SNEAKER_ALT}"]`) || cards.find(card => (card.querySelector('h3')?.textContent || '').toLowerCase().includes('sneaker'))?.querySelector('.shop-card-media img');
        if (!img) return;
        img.src = `data:image/jpeg;base64,${base64.trim()}`;
        img.alt = SNEAKER_ALT;
        img.loading = 'eager';
        img.decoding = 'async';
        img.style.objectFit = 'contain';
        img.style.objectPosition = 'center';
        img.style.background = '#f5f1eb';
      })
      .catch(err => console.warn('[BENARIAN Sneaker]', err.message));
  };

  const normalise = (value = '') => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
  const money = (value) => {
    const amount = Number.parseFloat(value);
    if (!Number.isFinite(amount)) return '';
    return `AU$${amount.toLocaleString('en-AU', {
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2
    })}`;
  };
  const productPrice = (product) => {
    const prices = (product.variants || []).map(v => Number.parseFloat(v.price)).filter(Number.isFinite);
    return prices.length ? Math.min(...prices) : null;
  };
  const productImage = (product) => product.images?.[0]?.src || product.image?.src || '';
  const productUrl = (product) => `${SHOPIFY_BASE}/products/${product.handle}`;

  /*
   * Never leave stale product URLs or stale prices visible. If Shopify is
   * temporarily unavailable, customers are sent to the live collection instead
   * of an old/404 product handle and are not shown an outdated price.
   */
  cards.forEach(card => {
    const primary = card.querySelector('.shop-card-actions .shop-button');
    if (primary) {
      primary.href = COLLECTION_URL;
      primary.textContent = 'View Piece';
      primary.setAttribute('aria-label', `View ${(card.querySelector('h3')?.textContent || 'BENARIAN piece').replace(/\s+/g, ' ').trim()}`);
    }
    const price = card.querySelector('.shop-price');
    if (price) {
      price.textContent = 'Live price';
      price.dataset.livePrice = 'pending';
    }
  });

  /* Fixed card-to-product matching keeps similarly named Shopify products from
     being attached to the wrong BENARIAN card. Alternate terms cover current
     naming variations used by Shopify/Contrado. */
  const cardMatchers = [
    [['crossbody']],
    [['backpack'], ['rucksack']],
    [['gym', 'travel', 'bag'], ['duffel'], ['holdall']],
    [['hoodie']],
    [['cap'], ['hat']],
    [['sneaker'], ['high', 'top'], ['high-top']],
    [['neck', 'pillow'], ['travel', 'pillow']],
    [['wash', 'bag'], ['toiletry'], ['mens', 'bag']],
    [['sock']],
    [['quarter', 'zip'], ['quarterzip'], ['pullover']],
    [['sleep', 'mask'], ['eye', 'mask']]
  ];

  const matchesTerms = (text, termGroups) => termGroups.some(group => group.every(term => text.includes(normalise(term))));

  function findProductForCard(cardIndex, products, usedHandles) {
    const cardText = normalise(cards[cardIndex]?.querySelector('h3')?.textContent || '');
    const groups = cardMatchers[cardIndex] || [];

    let best = null;
    let bestScore = -1;
    for (const product of products) {
      if (usedHandles.has(product.handle)) continue;
      const productText = normalise(`${product.title || ''} ${product.handle || ''}`);
      if (!matchesTerms(productText, groups)) continue;

      let score = 100;
      for (const word of cardText.split(' ').filter(w => w.length > 3)) {
        if (productText.includes(word)) score += 2;
      }
      if (productText.includes('benarian')) score += 4;
      if (score > bestScore) {
        best = product;
        bestScore = score;
      }
    }
    return best;
  }

  function updateExistingCard(card, product) {
    const priceEl = card.querySelector('.shop-price');
    const minPrice = productPrice(product);
    if (priceEl) {
      priceEl.textContent = minPrice !== null ? money(minPrice) : 'View live price';
      priceEl.dataset.livePrice = minPrice !== null ? 'synced' : 'unavailable';
    }

    const primary = card.querySelector('.shop-card-actions .shop-button');
    if (primary) {
      primary.href = productUrl(product);
      primary.textContent = 'Shop Piece';
      primary.setAttribute('aria-label', `Shop ${product.title}`);
    }

    const image = productImage(product);
    const cardTitle = normalise(card.querySelector('h3')?.textContent || '');
    if (image && cardTitle.includes('sneaker')) applyProfessionalSneaker();

    const placeholder = card.querySelector('.shop-placeholder');
    if (image && placeholder) {
      placeholder.classList.remove('shop-placeholder');
      const old = placeholder.querySelector('div');
      if (old) old.remove();
      let img = placeholder.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        placeholder.appendChild(img);
      }
      img.src = image;
      img.alt = product.title;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.style.objectFit = 'contain';
      img.style.objectPosition = 'center';
      img.style.background = '#fff';
    }
  }

  applyProfessionalSneaker();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  fetch(`${SHOPIFY_BASE}/products.json?limit=250`, {
    mode: 'cors',
    cache: 'no-store',
    signal: controller.signal
  })
    .then(r => {
      if (!r.ok) throw new Error(`Shopify sync failed: ${r.status}`);
      return r.json();
    })
    .then(data => {
      clearTimeout(timeout);
      const products = (data.products || []).filter(p => p && p.handle && p.title);
      if (!products.length) throw new Error('No Shopify products returned');

      const usedHandles = new Set();
      let synced = 0;

      cards.forEach((card, index) => {
        const product = findProductForCard(index, products, usedHandles);
        if (!product) return;
        usedHandles.add(product.handle);
        updateExistingCard(card, product);
        synced += 1;
      });

      const note = document.querySelector('.shop-note');
      if (note) {
        note.dataset.shopifySynced = synced === cards.length ? 'complete' : 'partial';
        const first = note.querySelector('span');
        if (first) first.innerHTML = `<strong>Secure checkout</strong> · ${synced} of ${cards.length} collection pieces matched to live Shopify products. Prices shown are live when available.`;
      }

      applyProfessionalSneaker();
      applyProfessionalHero();
    })
    .catch(err => {
      clearTimeout(timeout);
      console.warn('[BENARIAN Shop]', err.name === 'AbortError' ? 'Shopify sync timed out' : err.message);
      const note = document.querySelector('.shop-note');
      if (note) {
        note.dataset.shopifySynced = 'offline';
        const first = note.querySelector('span');
        if (first) first.innerHTML = '<strong>Secure checkout</strong> · Live pricing is available in the BENARIAN Shopify collection.';
      }
      applyProfessionalSneaker();
      applyProfessionalHero();
    });
})();
