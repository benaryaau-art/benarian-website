(() => {
  if (document.documentElement.dataset.benarianGoogleBrand === 'true') return;
  document.documentElement.dataset.benarianGoogleBrand = 'true';

  const PAGE = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const IS_HOME = PAGE === '' || PAGE === 'index.html';
  const LOGO_URL = 'https://benarian.com/favicon.svg?v=20260730g';
  const HOME_URL = 'https://benarian.com/';

  const setMeta = (selector, attrs) => {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
      document.head.appendChild(node);
    }
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };

  const installSeo = () => {
    const title = IS_HOME
      ? 'BENARIAN | Luxury Hotels, Flights & Bali Travel Services'
      : document.title;
    const description = IS_HOME
      ? 'BENARIAN is a luxury travel and hospitality platform founded by hotel executive Ben Tafreshi, offering curated hotels, flights, Bali travel guidance and personalised assistance.'
      : (document.querySelector('meta[name="description"]')?.content || 'Luxury travel and hospitality services by BENARIAN.');

    document.title = title;
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'BENARIAN' });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: LOGO_URL });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: LOGO_URL });
    setMeta('link[rel="icon"]', { rel: 'icon', href: '/favicon.svg?v=20260730g', type: 'image/svg+xml' });
    setMeta('link[rel="shortcut icon"]', { rel: 'shortcut icon', href: '/favicon.svg?v=20260730g', type: 'image/svg+xml' });
    setMeta('link[rel="apple-touch-icon"]', { rel: 'apple-touch-icon', href: '/favicon.svg?v=20260730g' });

    let schema = document.getElementById('benarian-google-brand-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'benarian-google-brand-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['Organization', 'TravelAgency'],
          '@id': `${HOME_URL}#organization`,
          name: 'BENARIAN',
          alternateName: 'BENARIAN Luxury Travel & Hospitality',
          url: HOME_URL,
          logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
          image: LOGO_URL,
          description,
          founder: { '@type': 'Person', name: 'Ben Tafreshi' },
          email: 'info@benarian.com',
          sameAs: ['https://www.instagram.com/benarianhotels']
        },
        {
          '@type': 'WebSite',
          '@id': `${HOME_URL}#website`,
          url: HOME_URL,
          name: 'BENARIAN',
          alternateName: 'BENARIAN Luxury Travel & Hospitality',
          publisher: { '@id': `${HOME_URL}#organization` },
          inLanguage: ['en', 'fa']
        },
        {
          '@type': 'ItemList',
          name: 'BENARIAN primary travel services',
          itemListElement: [
            ['Luxury Hotels', 'https://benarian.com/hotels.html'],
            ['Flights', 'https://benarian.com/flights.html'],
            ['Bali Tourist Levy', 'https://benarian.com/bali-tourist-levy.html'],
            ['Bali Arrival Card', 'https://benarian.com/bali-arrival-card.html'],
            ['Bali Visa and e-VOA', 'https://benarian.com/bali-visa.html']
          ].map(([name, url], index) => ({ '@type': 'ListItem', position: index + 1, name, url }))
        }
      ]
    });
  };

  const installStyles = () => {
    if (document.getElementById('benarian-google-brand-style')) return;
    const style = document.createElement('style');
    style.id = 'benarian-google-brand-style';
    style.textContent = `
      .benarian-brand-services{padding:24px 6%;background:#fff;border-bottom:1px solid #eadfc9}
      .benarian-brand-services-inner{max-width:1200px;margin:auto;display:grid;grid-template-columns:1.2fr repeat(5,minmax(0,1fr));gap:10px;align-items:stretch}
      .benarian-brand-services-intro{padding:15px 16px;border:1px solid #dec99f;background:#fbf7ef}
      .benarian-brand-services-intro strong{display:block;color:#211b15;font:700 13px/1.35 Inter,Arial,sans-serif;margin-bottom:4px}
      .benarian-brand-services-intro span{display:block;color:#766b5f;font:400 11px/1.55 Inter,Arial,sans-serif}
      .benarian-brand-service{display:flex;align-items:center;justify-content:center;min-height:68px;padding:12px;border:1px solid #dec99f;background:#fff;color:#211b15;text-align:center;text-decoration:none;font:700 10.5px/1.35 Inter,Arial,sans-serif;letter-spacing:.25px}
      .benarian-brand-service:hover{background:#17130f;color:#f2cf8a;border-color:#17130f}
      .benarian-bali-footer-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
      .benarian-bali-footer-links a{display:inline-flex;padding:8px 11px;border:1px solid #d7bd8b;border-radius:999px;color:#755820!important;text-decoration:none!important;font-size:10px!important;font-weight:700!important}
      @media(max-width:980px){.benarian-brand-services-inner{grid-template-columns:1fr 1fr 1fr}.benarian-brand-services-intro{grid-column:1/-1}}
      @media(max-width:620px){.benarian-brand-services{padding:16px 18px}.benarian-brand-services-inner{grid-template-columns:1fr 1fr;gap:8px}.benarian-brand-service{min-height:60px;font-size:9.5px}.benarian-brand-services-intro{grid-column:1/-1}.benarian-bali-footer-links{display:grid;grid-template-columns:1fr}.benarian-bali-footer-links a{justify-content:center}}
    `;
    document.head.appendChild(style);
  };

  const installHomeLinks = () => {
    if (!IS_HOME || document.querySelector('.benarian-brand-services')) return;
    const header = document.querySelector('.header');
    if (!header?.parentNode) return;
    const section = document.createElement('section');
    section.className = 'benarian-brand-services';
    section.setAttribute('aria-label', 'BENARIAN primary services');
    section.innerHTML = `
      <div class="benarian-brand-services-inner">
        <div class="benarian-brand-services-intro"><strong>BENARIAN Travel Services</strong><span>Direct access to our most important travel pages.</span></div>
        <a class="benarian-brand-service" href="hotels.html">LUXURY HOTELS</a>
        <a class="benarian-brand-service" href="flights.html">FLIGHTS</a>
        <a class="benarian-brand-service" href="bali-tourist-levy.html">BALI TOURIST LEVY</a>
        <a class="benarian-brand-service" href="bali-arrival-card.html">BALI ARRIVAL CARD</a>
        <a class="benarian-brand-service" href="bali-visa.html">BALI VISA &amp; e-VOA</a>
      </div>`;
    header.insertAdjacentElement('afterend', section);
  };

  const installFooterLinks = () => {
    document.querySelectorAll('.benarian-footer-v3 .bf3-brand-block').forEach(block => {
      if (block.querySelector('.benarian-bali-footer-links')) return;
      const links = document.createElement('div');
      links.className = 'benarian-bali-footer-links';
      links.innerHTML = '<a href="bali-tourist-levy.html">Tourist Levy</a><a href="bali-arrival-card.html">Arrival Card</a><a href="bali-visa.html">Bali Visa</a>';
      block.appendChild(links);
    });
  };

  const apply = () => {
    installSeo();
    installStyles();
    installHomeLinks();
    installFooterLinks();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();
  [400, 1000, 2200].forEach(ms => setTimeout(apply, ms));
})();