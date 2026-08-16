(() => {
  const SHOPIFY_BASE = 'https://benarian-2.myshopify.com';
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
        probe.onerror = () => {
          hero.style.setProperty('background-image', HERO_FALLBACK, 'important');
        };
        probe.src = dataUrl;
      })
      .catch(err => {
        console.warn('[BENARIAN Hero]', err.message);
        hero.style.setProperty('background-image', HERO_FALLBACK, 'important');
      });
  };

  applyProfessionalHero();

  if (!grid) return;

  const SNEAKER_ALT = 'BENARIAN Signature High-Top Sneakers in black and gold';
  const SNEAKER_SOURCE = 'assets/shop/benarian-sneakers-pro-v2.b64?v=20260814g';

  const applyProfessionalSneaker = () => {
    fetch(SNEAKER_SOURCE, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`Sneaker image source failed: ${r.status}`);
        return r.text();
      })
      .then(base64 => {
        const img = grid.querySelector(`img[alt="${SNEAKER_ALT}"]`) || [...grid.querySelectorAll('.shop-card')].find(card => (card.querySelector('h3')?.textContent || '').toLowerCase().includes('sneaker'))?.querySelector('.shop-card-media img');
        if (!img) return;
        img.src = `data:image/jpeg;base64,${base64.trim()}`;
        img.alt = SNEAKER_ALT;
        img.loading = 'eager';
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
    return `AU$${amount.toLocaleString('en-AU', { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 })}`;
  };
  const stripHtml = (html = '') => {
    const el = document.createElement('div');
    el.innerHTML = html;
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  };
  const productPrice = (product) => {
    const prices = (product.variants || []).map(v => Number.parseFloat(v.price)).filter(Number.isFinite);
    return prices.length ? Math.min(...prices) : null;
  };
  const productImage = (product) => product.images?.[0]?.src || product.image?.src || '';
  const productUrl = (product) => `${SHOPIFY_BASE}/products/${product.handle}`;

  const cards = [...grid.querySelectorAll('.shop-card')];
  const usedHandles = new Set();

  const aliases = [
    ['crossbody', ['crossbody']],
    ['backpack', ['backpack']],
    ['gym travel', ['gym', 'travel', 'bag']],
    ['hoodie', ['hoodie']],
    ['quarter zip', ['quarter', 'zip']],
    ['pullover', ['pullover']],
    ['cap', ['cap']],
    ['sneaker', ['sneaker']],
    ['neck pillow', ['neck', 'pillow']],
    ['wash bag', ['wash', 'bag']],
    ['socks', ['socks']]
  ];

  function scoreCard(card, product) {
    const cardText = normalise(card.querySelector('h3')?.textContent || '');
    const productText = normalise(product.title || '');
    let score = 0;
    for (const [, terms] of aliases) {
      const inCard = terms.every(t => cardText.includes(t));
      const inProduct = terms.every(t => productText.includes(t));
      if (inCard && inProduct) score += 20;
    }
    const words = cardText.split(' ').filter(w => w.length > 3);
    for (const word of words) if (productText.includes(word)) score += 1;
    return score;
  }

  function updateExistingCard(card, product) {
    usedHandles.add(product.handle);
    const priceEl = card.querySelector('.shop-price');
    const minPrice = productPrice(product);
    if (priceEl && minPrice !== null) priceEl.textContent = money(minPrice);

    const primary = card.querySelector('.shop-card-actions .shop-button');
    if (primary) {
      primary.href = productUrl(product);
      primary.textContent = 'Shop on Shopify';
    }

    const image = productImage(product);
    const cardTitle = normalise(card.querySelector('h3')?.textContent || '');
    if (image && cardTitle.includes('sneaker')) applyProfessionalSneaker();

    const placeholder = card.querySelector('.shop-placeholder');
    if (image && placeholder) {
      placeholder.classList.remove('shop-placeholder');
      const old = placeholder.querySelector('div');
      if (old) old.remove();
      const img = document.createElement('img');
      img.src = image;
      img.alt = product.title;
      img.loading = 'eager';
      img.style.objectFit = 'contain';
      img.style.objectPosition = 'center';
      img.style.background = '#fff';
      placeholder.appendChild(img);
    }
  }

  function createCard(product, index) {
    const article = document.createElement('article');
    article.className = 'shop-card shop-card-live';
    const image = productImage(product);
    const price = productPrice(product);
    const description = stripHtml(product.body_html || '').slice(0, 210);
    article.innerHTML = `
      <div class="shop-card-media">
        <span class="shop-card-number">No. ${String(index).padStart(2, '0')}</span>
        ${image ? `<img src="${image}" alt="${product.title.replace(/"/g, '&quot;')}" loading="lazy">` : '<div class="shop-live-placeholder">BENARIAN</div>'}
      </div>
      <div class="shop-card-body">
        <div class="shop-card-top"><h3>${product.title}</h3><span class="shop-price">${price !== null ? money(price) : 'View price'}</span></div>
        <p>${description || 'A BENARIAN signature piece, available through our secure Shopify store.'}</p>
        <div class="shop-card-actions"><a class="shop-button" href="${productUrl(product)}">Shop on Shopify</a><a class="shop-button ghost" href="contact.html">Ask Concierge</a></div>
      </div>`;
    return article;
  }

  applyProfessionalSneaker();

  fetch(`${SHOPIFY_BASE}/products.json?limit=250`, { mode: 'cors', cache: 'no-store' })
    .then(r => {
      if (!r.ok) throw new Error(`Shopify sync failed: ${r.status}`);
      return r.json();
    })
    .then(data => {
      const products = (data.products || []).filter(p => p && p.handle && p.title);
      if (!products.length) {
        applyProfessionalSneaker();
        return;
      }

      cards.forEach(card => {
        let best = null;
        let bestScore = 0;
        for (const product of products) {
          const score = scoreCard(card, product);
          if (score > bestScore) { best = product; bestScore = score; }
        }
        if (best && bestScore >= 3) updateExistingCard(card, best);
      });

      let nextIndex = grid.querySelectorAll('.shop-card').length + 1;
      products.filter(p => !usedHandles.has(p.handle)).forEach(product => {
        grid.appendChild(createCard(product, nextIndex++));
        usedHandles.add(product.handle);
      });

      const note = document.querySelector('.shop-note');
      if (note) note.dataset.shopifySynced = 'true';
      applyProfessionalSneaker();
      applyProfessionalHero();
    })
    .catch(err => {
      console.warn('[BENARIAN Shop]', err.message);
      applyProfessionalSneaker();
      applyProfessionalHero();
    });
})();
