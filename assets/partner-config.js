// BENARIAN partner-link configuration
window.BENARIAN_PARTNERS = {
  booking: { enabled: true, baseUrl: "https://www.booking.com/searchresults.html", affiliateBaseUrl: "https://www.kqzyfj.com/click-101828630-17289006" },
  taxi: { enabled: true, affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17322570" },
  attractions: { enabled: true, affiliateBaseUrl: "https://www.kqzyfj.com/click-101828630-17289009" },
  flights: { enabled: true, affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17289007" },
  cars: { enabled: true, affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17289008" },
  getawayDeals: { enabled: true, affiliateBaseUrl: "https://www.tqlhce.com/click-101828630-17301957" },
  expedia: { enabled: true, travelShopUrl: "https://www.expedia.com.au/shop/benariantravel" }
};

function initialiseBenarianRuntime() {
  const hero = document.querySelector('.home-lux .lux-hero');

  if (hero) {
    hero.querySelectorAll('.benarian-hero-video').forEach(video => video.remove());
    hero.style.backgroundImage = "linear-gradient(90deg,rgba(8,12,8,.58) 0%,rgba(8,12,8,.24) 48%,rgba(8,12,8,.06) 100%),url('assets/images/benarian-hero-resort.webp?v=20260723g')";
    hero.style.backgroundPosition = 'center center';
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundRepeat = 'no-repeat';

    const heroCopy = hero.querySelector('.lux-hero-copy');
    if (heroCopy) heroCopy.querySelectorAll('.benarian-expedia-cta').forEach(link => link.remove());

    document.querySelectorAll('.benarian-expedia-widget-section').forEach(section => section.remove());
    const section = document.createElement('section');
    section.className = 'benarian-expedia-widget-section';
    section.innerHTML = `<div class="benarian-expedia-widget-inner"><p class="benarian-expedia-eyebrow">HOTEL RESERVATIONS</p><h2>Book your hotel</h2><p class="benarian-expedia-intro">Choose your destination and travel dates below. Live hotel availability and final booking are provided securely through Expedia.</p><div class="benarian-expedia-widget-shell"><div class="eg-widget" data-widget="search" data-program="au-expedia" data-lobs="stays" data-network="pz" data-camref="1101l5PIxe" data-pubref="benarian-home-hotels"></div></div><p class="benarian-expedia-disclosure">You will continue to Expedia to view live prices, choose your room and complete your reservation. BENARIAN may earn a commission from eligible bookings.</p></div>`;
    hero.insertAdjacentElement('afterend', section);

    if (!document.querySelector('script[data-benarian-expedia-widget]')) {
      const script = document.createElement('script');
      script.className = 'eg-widgets-script';
      script.src = 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js';
      script.async = true;
      script.setAttribute('data-benarian-expedia-widget', 'true');
      document.body.appendChild(script);
    }
  }

  const hiddenSelectors = [
    '.booking-search',
    '.home-lux .hotels-section',
    '.home-lux .benarian-home-collection',
    '.home-lux .benarian-market-section[aria-labelledby="weekend-deals-title"]',
    '.home-lux .weekend-deals',
    '.home-lux .featured-hotels',
    '.home-lux .hotel-grid',
    '.home-lux .hotel-grid-pro'
  ];
  hiddenSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(section => {
      section.style.display = 'none';
      section.setAttribute('aria-hidden', 'true');
    });
  });

  document.querySelectorAll('.header .nav a, .benarian-mobile-nav a').forEach(link => {
    const text = (link.textContent || '').trim().toUpperCase();
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (text === 'EXPEDIA SHOP' || text === 'HOTELS' || href.endsWith('hotels.html')) link.remove();
  });

  const logoMarkup = `<svg class="benarian-global-logo" viewBox="0 0 760 120" role="img" aria-label="BENARIAN Luxury Travel and Hospitality" xmlns="http://www.w3.org/2000/svg"><g fill="#b9872c"><text x="0" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text><text x="38" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text></g><text x="130" y="69" font-family="Georgia, 'Times New Roman', serif" font-size="51" letter-spacing="6" fill="#17140f">BENARIAN</text><text x="132" y="99" font-family="Arial, Helvetica, sans-serif" font-size="14" letter-spacing="2.1" fill="#b9872c">LUXURY TRAVEL &amp; HOSPITALITY</text></svg>`;
  document.querySelectorAll('.header .brand').forEach(brand => {
    brand.classList.remove('brand-lockup');
    brand.innerHTML = logoMarkup;
    brand.setAttribute('aria-label', 'BENARIAN home');
  });

  if (!document.querySelector('#benarian-global-runtime-style')) {
    const style = document.createElement('style');
    style.id = 'benarian-global-runtime-style';
    style.textContent = `
      .header .brand,.header .brand:not(.brand-lockup){display:flex!important;align-items:center!important;width:330px!important;height:70px!important;max-width:100%!important;background:none!important}
      .header .brand:before,.header .brand:after{content:none!important;display:none!important}.header .brand img{display:none!important}.benarian-global-logo{display:block!important;width:100%!important;height:100%!important}
      .lux-hero{position:relative!important;overflow:hidden!important;background-color:#182015!important}.benarian-hero-video,.benarian-hero-overlay{display:none!important}.lux-hero-copy{position:relative!important;z-index:2!important}
      .benarian-expedia-widget-section{background:#fff!important;padding:72px 20px 78px!important;border-bottom:1px solid #eee7dc!important}.benarian-expedia-widget-inner{max-width:1180px!important;margin:0 auto!important;text-align:center!important}.benarian-expedia-eyebrow{margin:0 0 12px!important;color:#b9872c!important;font:700 12px Arial,Helvetica,sans-serif!important;letter-spacing:2.4px!important}.benarian-expedia-widget-inner h2{margin:0!important;color:#17140f!important;font:400 clamp(40px,6vw,66px)/1.04 Georgia,'Times New Roman',serif!important}.benarian-expedia-intro{margin:16px auto 30px!important;max-width:690px!important;color:#5f5a52!important;font:400 16px/1.75 Arial,Helvetica,sans-serif!important}.benarian-expedia-widget-shell{max-width:1080px!important;margin:0 auto!important;padding:24px!important;background:#faf8f4!important;border:1px solid #dfcba6!important;box-shadow:0 20px 55px rgba(32,25,14,.09)!important}.benarian-expedia-widget-shell .eg-widget{min-height:90px!important}.benarian-expedia-disclosure{margin:17px auto 0!important;max-width:760px!important;color:#7b746a!important;font:400 12px/1.65 Arial,Helvetica,sans-serif!important}
      .about-page .about-signature,.about-page .founder-signature{font-family:'Allura','Snell Roundhand','Apple Chancery',cursive!important;color:#b9872c!important}.about-page .founder-photo img{width:100%!important;height:100%!important;object-fit:contain!important}
      @media(max-width:760px){.header .brand,.header .brand:not(.brand-lockup){width:250px!important;height:62px!important;max-width:calc(100vw - 132px)!important}.lux-hero{background-position:58% center!important}.benarian-expedia-widget-section{padding:48px 14px 56px!important}.benarian-expedia-widget-shell{padding:12px!important}}
    `;
    document.head.appendChild(style);
  }

  const loadStyleOnce = (href, marker) => {
    if (document.querySelector(`link[${marker}]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute(marker, 'true');
    document.head.appendChild(link);
  };
  loadStyleOnce('assets/premium-v2.css?v=20260723a', 'data-benarian-premium-v2');

  document.querySelectorAll('a[href="iran-flights.html"]').forEach(link => {
    link.textContent = 'FLIGHTS';
    link.setAttribute('aria-label', 'Flights');
  });

  const loadScriptOnce = (src, marker) => {
    if (document.querySelector(`script[${marker}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.setAttribute(marker, 'true');
    document.body.appendChild(script);
  };
  loadScriptOnce('assets/live-concierge.js?v=20260723c', 'data-benarian-live-concierge');
  loadScriptOnce('assets/install-app-prompt.js?v=20260723b', 'data-benarian-install-prompt');
  loadScriptOnce('assets/premium-v2.js?v=20260723a', 'data-benarian-premium-v2-script');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseBenarianRuntime, { once: true });
} else {
  initialiseBenarianRuntime();
}
