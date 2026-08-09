(() => {
  const BASE = 'https://benarian.com/';
  const LINKS = [
    ['Booking Hotels', 'hotels.html'],
    ['Flights', 'flights.html'],
    ['Bali Experience', 'bali-experiences.html'],
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

  function installBaliExperience() {
    if (document.querySelector('.benarian-bali-experience-promo')) return;
    const main = document.querySelector('main');
    const hero = main?.querySelector('.lux-hero');
    if (!main || !hero) return;

    const section = document.createElement('section');
    section.className = 'benarian-bali-experience-promo';
    section.setAttribute('aria-label', 'BENARIAN Bali Experience');
    section.innerHTML = `
      <div class="bbep-media" aria-hidden="true"></div>
      <div class="bbep-overlay"></div>
      <div class="bbep-content">
        <div class="bbep-mark">BB</div>
        <span class="bbep-kicker">CURATED BY BENARIAN</span>
        <h2>BALI EXPERIENCE</h2>
        <p>Luxury & private experiences across Bali — waterfalls, rice terraces, temples, ATV adventures, rafting, Uluwatu sunsets, Nusa Penida and more.</p>
        <div class="bbep-actions">
          <a class="bbep-primary" href="bali-experiences.html">Explore Experiences <span>→</span></a>
          <a class="bbep-secondary" href="https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%27m%20interested%20in%20the%20Bali%20Experience%20package.">Enquire on WhatsApp</a>
        </div>
      </div>`;

    hero.insertAdjacentElement('afterend', section);

    const style = document.createElement('style');
    style.id = 'benarian-bali-experience-promo-style';
    style.textContent = `
      .benarian-bali-experience-promo{position:relative;min-height:520px;overflow:hidden;background:#111;color:#fff;display:grid;place-items:center;border-top:1px solid #b9872c;border-bottom:1px solid #b9872c}
      .bbep-media{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=88') center 58%/cover no-repeat;transform:scale(1.02)}
      .bbep-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,5,5,.88) 0%,rgba(5,5,5,.62) 48%,rgba(5,5,5,.22) 100%)}
      .bbep-content{position:relative;z-index:2;width:min(1180px,90%);padding:64px 0;text-align:left}
      .bbep-mark{font:600 56px/.8 'Cormorant Garamond',Georgia,serif;color:#dfb45f;letter-spacing:-6px;margin-bottom:20px}
      .bbep-kicker{display:block;color:#dfb45f;font:700 10px/1.2 Inter,Arial,sans-serif;letter-spacing:2.5px;margin-bottom:10px}
      .bbep-content h2{font:600 clamp(48px,7vw,82px)/.9 'Cormorant Garamond',Georgia,serif;margin:0 0 18px;letter-spacing:.5px}
      .bbep-content p{max-width:620px;margin:0 0 26px;color:#eee6db;font:400 15px/1.75 Inter,Arial,sans-serif}
      .bbep-actions{display:flex;gap:12px;flex-wrap:wrap}
      .bbep-actions a{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:46px;padding:13px 18px;border-radius:8px;text-decoration:none;font:700 12px/1.2 Inter,Arial,sans-serif;transition:.2s ease}
      .bbep-primary{background:#b9872c;color:#fff}.bbep-primary:hover{background:#d0a04b;transform:translateY(-1px)}
      .bbep-secondary{border:1px solid rgba(255,255,255,.55);color:#fff;background:rgba(0,0,0,.18)}.bbep-secondary:hover{border-color:#dfb45f;color:#f4ce83}
      @media(max-width:760px){
        .benarian-bali-experience-promo{min-height:540px}
        .bbep-media{background-position:62% center}
        .bbep-overlay{background:linear-gradient(180deg,rgba(4,4,4,.22),rgba(4,4,4,.82) 62%,rgba(4,4,4,.94))}
        .bbep-content{width:calc(100% - 36px);padding:210px 0 36px;text-align:center}
        .bbep-mark{font-size:48px;margin-bottom:13px}
        .bbep-content h2{font-size:49px}
        .bbep-content p{font-size:13px;line-height:1.65;margin-left:auto;margin-right:auto}
        .bbep-actions{justify-content:center}.bbep-actions a{width:100%}
      }
    `;
    document.head.appendChild(style);
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
    else main.appendChild(section);

    const style = document.createElement('style');
    style.id = 'benarian-google-quicklinks-style';
    style.textContent = `
      .benarian-google-quicklinks{padding:56px 7%;background:#fff;border-bottom:1px solid #eee4d2}
      .bgq-inner{max-width:1240px;margin:0 auto;text-align:center}
      .bgq-kicker{display:block;color:#b9872c;font:700 10px/1.2 Inter,Arial,sans-serif;letter-spacing:2.2px;margin-bottom:10px}
      .bgq-inner h2{margin:0;color:#17130f;font:600 clamp(36px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}
      .bgq-inner>p{margin:12px auto 28px;color:#756c61;font:400 14px/1.6 Inter,Arial,sans-serif}
      .bgq-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
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
    installBaliExperience();
    installQuickLinks();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once: true});
  else apply();
})();
