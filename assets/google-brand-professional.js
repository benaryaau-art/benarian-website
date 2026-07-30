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
    let style = document.getElementById('benarian-google-brand-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'benarian-google-brand-style';
      document.head.appendChild(style);
    }
    style.textContent = `
      .benarian-brand-services{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important}
      .benarian-bali-footer-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
      .benarian-bali-footer-links a{display:inline-flex;padding:8px 11px;border:1px solid #d7bd8b;border-radius:999px;color:#755820!important;text-decoration:none!important;font-size:10px!important;font-weight:700!important}
      @media(max-width:620px){.benarian-bali-footer-links{display:grid;grid-template-columns:1fr}.benarian-bali-footer-links a{justify-content:center}}
    `;
  };

  const removeHomeServiceBar = () => {
    document.querySelectorAll('.benarian-brand-services').forEach(section => section.remove());
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
    removeHomeServiceBar();
    installFooterLinks();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();

  [200, 500, 1000, 1800, 3000].forEach(ms => setTimeout(apply, ms));

  const observer = new MutationObserver(() => removeHomeServiceBar());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();