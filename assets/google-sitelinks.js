(() => {
  const BASE = 'https://benarian.com/';
  const LINKS = [
    ['Booking Hotels', 'hotels.html'],
    ['Flights', 'flights.html'],
    ['Luxury Destinations', 'destinations.html'],
    ['Tours & Experiences', 'experiences.html'],
    ['Spa & Wellness', 'wellness.html'],
    ['Restaurants', 'restaurants.html'],
    ['Travel Guides', 'travel-guides.html'],
    ['Contact BENARIAN', 'contact.html']
  ];

  function ensureMeta(selector, attributes) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement('meta');
      document.head.appendChild(node);
    }
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  }

  function installSeo() {
    document.title = 'BENARIAN | Luxury Hotels, Flights & Curated Travel';
    ensureMeta('meta[name="description"]', {
      name: 'description',
      content: 'Book luxury hotels, search flights and discover curated destinations, tours, restaurants, spa and wellness experiences with BENARIAN.'
    });
    ensureMeta('meta[name="robots"]', {
      name: 'robots',
      content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = BASE;

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['Organization', 'TravelAgency'],
          '@id': `${BASE}#organization`,
          name: 'BENARIAN',
          alternateName: 'BENARIAN Luxury Travel & Hospitality',
          url: BASE,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE}favicon.svg`,
            contentUrl: `${BASE}favicon.svg`
          },
          sameAs: ['https://www.instagram.com/benarianhotels'],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            availableLanguage: ['English', 'Persian'],
            url: `${BASE}contact.html`
          }
        },
        {
          '@type': 'WebSite',
          '@id': `${BASE}#website`,
          url: BASE,
          name: 'BENARIAN',
          alternateName: 'BENARIAN Luxury Travel & Hospitality',
          publisher: {'@id': `${BASE}#organization`}
        },
        {
          '@type': 'ItemList',
          '@id': `${BASE}#primary-navigation`,
          name: 'BENARIAN Primary Services',
          itemListElement: LINKS.map(([name, href], index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name,
            url: `${BASE}${href}`
          }))
        },
        ...LINKS.map(([name, href]) => ({
          '@type': 'SiteNavigationElement',
          name,
          url: `${BASE}${href}`
        }))
      ]
    };

    let script = document.getElementById('benarian-google-sitelinks-schema');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'benarian-google-sitelinks-schema';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }

  function installQuickLinks() {
    if (document.querySelector('.benarian-google-quicklinks')) return;
    const main = document.querySelector('main');
    if (!main) return;

    const section = document.createElement('section');
    section.className = 'benarian-google-quicklinks';
    section.setAttribute('aria-label', 'BENARIAN travel services');
    section.innerHTML = `
      <div class="bgq-inner">
        <span class="bgq-kicker">EXPLORE BENARIAN</span>
        <h2>Plan Your Journey</h2>
        <p>Direct access to our most requested travel services.</p>
        <nav class="bgq-links" aria-label="BENARIAN primary services">
          ${LINKS.map(([name, href]) => `<a href="${href}">${name}<span aria-hidden="true">→</span></a>`).join('')}
        </nav>
      </div>`;

    const booking = main.querySelector('.booking-search');
    if (booking) booking.insertAdjacentElement('afterend', section);
    else main.prepend(section);

    const style = document.createElement('style');
    style.id = 'benarian-google-quicklinks-style';
    style.textContent = `
      .benarian-google-quicklinks{padding:56px 7%;background:#fff;border-bottom:1px solid #eee4d2}
      .bgq-inner{max-width:1240px;margin:0 auto;text-align:center}
      .bgq-kicker{display:block;color:#b9872c;font:700 10px/1.2 Inter,Arial,sans-serif;letter-spacing:2.2px;margin-bottom:10px}
      .bgq-inner h2{margin:0;color:#17130f;font:600 clamp(36px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}
      .bgq-inner>p{margin:12px auto 28px;color:#756c61;font:400 14px/1.6 Inter,Arial,sans-serif}
      .bgq-links{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
      .bgq-links a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 16px;border:1px solid #ddc79f;border-radius:10px;background:#fffaf1;color:#2a241d;text-decoration:none;font:600 12px/1.3 Inter,Arial,sans-serif;transition:.2s ease}
      .bgq-links a:hover{transform:translateY(-2px);border-color:#b9872c;color:#8d611d;box-shadow:0 8px 20px rgba(75,49,11,.08)}
      .bgq-links a span{color:#b9872c;font-size:16px}
      @media(max-width:900px){.bgq-links{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:560px){.benarian-google-quicklinks{padding:44px 18px}.bgq-links{grid-template-columns:1fr}.bgq-links a{padding:14px 15px}}
    `;
    document.head.appendChild(style);
  }

  function apply() {
    installSeo();
    installQuickLinks();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once: true});
  else apply();
})();
