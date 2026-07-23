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

const BENARIAN_EXPEDIA_HOTELS = [
  { name: 'Adiwana Resort Jembawan', location: 'Ubud', tags: ['Boutique', 'Wellness'], description: 'A peaceful luxury retreat in central Ubud, surrounded by tropical greenery and a calm wellness atmosphere.' },
  { name: 'Mandapa, a Ritz-Carlton Reserve', location: 'Ubud', tags: ['Riverfront', 'Private villas'], description: 'A serene luxury retreat beside the Ayung River, surrounded by rice terraces and tropical forest.' },
  { name: 'Bvlgari Resort Bali', location: 'Pecatu', tags: ['Clifftop', 'Private villas'], description: 'An extraordinary clifftop resort combining refined Italian design with Balinese character and exceptional privacy.' },
  { name: 'Alila Villas Uluwatu, Bali', location: 'Pecatu', tags: ['Minimalist design', 'Private pool'], description: 'A striking clifftop retreat celebrated for minimalist architecture, private pool villas and sweeping Indian Ocean views.' },
  { name: 'The Apurva Kempinski Bali', location: 'Nusa Dua', tags: ['Beachfront', 'Grand design'], description: 'A grand beachfront resort known for dramatic architecture, refined rooms and an impressive oceanfront setting.' },
  { name: 'Four Seasons Resort Bali at Sayan', location: 'Ubud', tags: ['Riverside', 'Wellness'], description: 'A peaceful riverside retreat surrounded by lush jungle and rice fields with exceptional Four Seasons service.' },
  { name: 'The St. Regis Bali Resort', location: 'Nusa Dua', tags: ['Beachfront', 'Butler service'], description: 'An elegant beachfront resort known for refined service, spacious suites and villas, and a peaceful private-beach setting.' },
  { name: 'The Kayon Jungle Resort', location: 'Payangan', tags: ['Adults focused', 'Jungle'], description: 'A peaceful jungle retreat near Ubud, known for its dramatic valley setting, layered infinity pools and romantic atmosphere.' },
  { name: 'AYANA Resort Bali', location: 'Jimbaran', tags: ['Cliffside', 'Rock Bar'], description: 'A spectacular cliffside resort with ocean views, beautiful pools, extensive facilities and a memorable sunset setting.' }
];

function expediaHotelUrl(hotel) {
  const destination = `${hotel.name}, ${hotel.location}, Bali, Indonesia`;
  return `https://www.expedia.com.au/Hotel-Search?destination=${encodeURIComponent(destination)}`;
}

function initialiseBenarianRuntime() {
  const expediaShop = window.BENARIAN_PARTNERS.expedia.travelShopUrl;
  const hero = document.querySelector('.home-lux .lux-hero');

  if (hero) {
    hero.querySelectorAll('.benarian-hero-video').forEach(video => video.remove());
    hero.style.backgroundImage = "linear-gradient(90deg,rgba(8,12,8,.58) 0%,rgba(8,12,8,.24) 48%,rgba(8,12,8,.06) 100%),url('assets/images/benarian-hero-resort.webp?v=20260723g')";
    hero.style.backgroundPosition = 'center center';
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundRepeat = 'no-repeat';

    const heroCopy = hero.querySelector('.lux-hero-copy');
    if (heroCopy && !heroCopy.querySelector('.benarian-expedia-cta')) {
      const cta = document.createElement('a');
      cta.className = 'benarian-expedia-cta';
      cta.href = 'hotels.html';
      cta.textContent = 'EXPLORE THE HOTEL COLLECTION';
      heroCopy.appendChild(cta);
    }

    if (!document.querySelector('.benarian-expedia-widget-section')) {
      const section = document.createElement('section');
      section.className = 'benarian-expedia-widget-section';
      section.innerHTML = `<div class="benarian-expedia-widget-inner"><p class="benarian-expedia-eyebrow">LIVE TRAVEL SEARCH</p><h2>Find your stay or flight</h2><p class="benarian-expedia-intro">Search live Expedia hotel availability and flights from BENARIAN.</p><div class="benarian-expedia-widget-shell"><div class="eg-widget" data-widget="search" data-program="au-expedia" data-lobs="stays,flights" data-network="pz" data-camref="1101l5PIxe" data-pubref="benarian-home"></div></div><p class="benarian-expedia-disclosure">Search and booking are powered by Expedia. BENARIAN may earn a commission from eligible bookings.</p></div>`;
      hero.insertAdjacentElement('afterend', section);
    }

    if (!document.querySelector('script[data-benarian-expedia-widget]')) {
      const script = document.createElement('script');
      script.className = 'eg-widgets-script';
      script.src = 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js';
      script.async = true;
      script.setAttribute('data-benarian-expedia-widget', 'true');
      document.body.appendChild(script);
    }
  }

  const oldBooking = document.querySelector('.booking-search');
  if (oldBooking) oldBooking.style.display = 'none';

  const homeHotels = document.querySelector('.home-lux .hotels-section');
  if (homeHotels) {
    homeHotels.className = 'benarian-home-collection';
    homeHotels.innerHTML = `
      <div class="benarian-home-collection-head">
        <p>THE BENARIAN EDIT</p>
        <h2>Exceptional Bali stays</h2>
        <span>A restrained selection of luxury stays. Live rates, availability and verified guest information are shown on Expedia.</span>
      </div>
      <div class="benarian-home-collection-list">
        ${BENARIAN_EXPEDIA_HOTELS.slice(0, 4).map((hotel, index) => `
          <a href="${expediaHotelUrl(hotel)}" target="_blank" rel="noopener" class="benarian-home-hotel-row">
            <span class="benarian-home-hotel-number">0${index + 1}</span>
            <span class="benarian-home-hotel-main"><small>${hotel.location.toUpperCase()} · BALI</small><strong>${hotel.name}</strong></span>
            <span class="benarian-home-hotel-arrow">VIEW HOTEL ON EXPEDIA →</span>
          </a>`).join('')}
      </div>
      <a class="benarian-home-all" href="hotels.html">VIEW THE FULL COLLECTION</a>`;
  }

  document.querySelectorAll('.home-lux .benarian-market-section[aria-labelledby="weekend-deals-title"]').forEach(section => section.remove());

  const hotelGrid = document.querySelector('.hotel-grid-pro');
  if (hotelGrid) {
    hotelGrid.classList.add('benarian-text-hotel-grid');
    hotelGrid.innerHTML = BENARIAN_EXPEDIA_HOTELS.map((hotel, index) => `
      <article class="benarian-text-hotel-card">
        <div class="benarian-text-hotel-top"><span>0${index + 1}</span><small>${hotel.location.toUpperCase()} · BALI</small></div>
        <h3>${hotel.name}</h3>
        <p>${hotel.description}</p>
        <div class="benarian-text-hotel-tags">${hotel.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        <a href="${expediaHotelUrl(hotel)}" target="_blank" rel="noopener">VIEW HOTEL ON EXPEDIA →</a>
      </article>`).join('');

    const searchAll = document.querySelector('.hotel-intro .btn');
    if (searchAll) {
      searchAll.href = expediaShop;
      searchAll.target = '_blank';
      searchAll.rel = 'noopener sponsored';
      searchAll.textContent = 'SEARCH ALL HOTELS ON EXPEDIA';
    }
    const disclosure = document.querySelector('.booking-disclosure');
    if (disclosure) disclosure.textContent = 'Live prices, availability, verified guest ratings, room types, taxes and cancellation terms are provided securely on Expedia. BENARIAN may earn a commission from eligible bookings.';
  }

  const logoMarkup = `<svg class="benarian-global-logo" viewBox="0 0 760 120" role="img" aria-label="BENARIAN Luxury Travel and Hospitality" xmlns="http://www.w3.org/2000/svg"><g fill="#b9872c"><text x="0" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text><text x="38" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text></g><text x="130" y="69" font-family="Georgia, 'Times New Roman', serif" font-size="51" letter-spacing="6" fill="#17140f">BENARIAN</text><text x="132" y="99" font-family="Arial, Helvetica, sans-serif" font-size="14" letter-spacing="2.1" fill="#b9872c">LUXURY TRAVEL &amp; HOSPITALITY</text></svg>`;
  document.querySelectorAll('.header .brand').forEach(brand => { brand.classList.remove('brand-lockup'); brand.innerHTML = logoMarkup; brand.setAttribute('aria-label', 'BENARIAN home'); });

  document.querySelectorAll('.header .nav a[data-benarian-expedia-shop]').forEach(link => link.remove());
  document.querySelectorAll('.header .nav a').forEach(link => {
    if ((link.textContent || '').trim().toUpperCase() === 'EXPEDIA SHOP') link.remove();
  });

  if (!document.querySelector('#benarian-global-runtime-style')) {
    const style = document.createElement('style');
    style.id = 'benarian-global-runtime-style';
    style.textContent = `
      .header .brand,.header .brand:not(.brand-lockup){display:flex!important;align-items:center!important;width:330px!important;height:70px!important;max-width:100%!important;background:none!important}.header .brand:before,.header .brand:after{content:none!important;display:none!important}.header .brand img{display:none!important}.benarian-global-logo{display:block!important;width:100%!important;height:100%!important}
      .lux-hero{position:relative!important;overflow:hidden!important;background-color:#182015!important}.benarian-hero-video,.benarian-hero-overlay{display:none!important}.lux-hero-copy{position:relative!important;z-index:2!important}
      .benarian-expedia-cta{display:inline-flex!important;align-items:center!important;justify-content:center!important;margin-top:22px!important;padding:14px 24px!important;border:1px solid #c79a43!important;background:#b9872c!important;color:#fff!important;font:700 13px Arial,Helvetica,sans-serif!important;letter-spacing:1.5px!important;text-decoration:none!important;box-shadow:0 10px 26px rgba(0,0,0,.24)!important}
      .benarian-expedia-widget-section{background:#fff!important;padding:54px 20px 62px!important;border-bottom:1px solid #eee7dc!important}.benarian-expedia-widget-inner{max-width:1180px!important;margin:0 auto!important;text-align:center!important}.benarian-expedia-eyebrow{margin:0 0 10px!important;color:#b9872c!important;font:700 12px Arial,Helvetica,sans-serif!important;letter-spacing:2px!important}.benarian-expedia-widget-inner h2{margin:0!important;color:#17140f!important;font:400 clamp(34px,5vw,58px)/1.05 Georgia,'Times New Roman',serif!important}.benarian-expedia-intro{margin:14px auto 26px!important;max-width:620px!important;color:#5f5a52!important;font:400 16px/1.7 Arial,Helvetica,sans-serif!important}.benarian-expedia-widget-shell{max-width:1080px!important;margin:0 auto!important;padding:22px!important;background:#faf8f4!important;border:1px solid #e8dfd0!important;box-shadow:0 18px 50px rgba(32,25,14,.08)!important}.benarian-expedia-widget-shell .eg-widget{min-height:90px!important}.benarian-expedia-disclosure{margin:15px auto 0!important;color:#7b746a!important;font:400 12px/1.6 Arial,Helvetica,sans-serif!important}
      .benarian-home-collection{padding:90px 7%!important;background:#17140f!important;color:#fff!important}.benarian-home-collection-head{max-width:780px;margin-bottom:48px}.benarian-home-collection-head p{color:#c99a43;font:700 11px Arial,sans-serif;letter-spacing:3px;margin:0 0 16px}.benarian-home-collection-head h2{font:400 clamp(46px,7vw,82px)/.95 Georgia,serif;margin:0 0 20px}.benarian-home-collection-head span{color:#d9d2c8;font:400 16px/1.8 Arial,sans-serif}.benarian-home-collection-list{border-top:1px solid rgba(255,255,255,.18)}.benarian-home-hotel-row{display:grid;grid-template-columns:70px 1fr auto;align-items:center;gap:20px;padding:30px 0;border-bottom:1px solid rgba(255,255,255,.18);color:#fff;text-decoration:none}.benarian-home-hotel-number{color:#c99a43;font:400 18px Georgia,serif}.benarian-home-hotel-main small{display:block;color:#b9afa3;font:700 10px Arial,sans-serif;letter-spacing:2px;margin-bottom:8px}.benarian-home-hotel-main strong{display:block;font:400 clamp(27px,4vw,46px)/1.05 Georgia,serif}.benarian-home-hotel-arrow{color:#d9aa52;font:700 11px Arial,sans-serif;letter-spacing:1px}.benarian-home-all{display:inline-block;margin-top:38px;color:#d9aa52;text-decoration:none;border-bottom:1px solid #d9aa52;padding-bottom:6px;font:700 12px Arial,sans-serif;letter-spacing:1px}
      .benarian-text-hotel-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:22px!important}.benarian-text-hotel-card{background:#fff;border:1px solid #dfcba6;border-radius:18px;padding:34px;box-shadow:0 14px 38px rgba(66,42,8,.07)}.benarian-text-hotel-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:34px}.benarian-text-hotel-top span{color:#b9872c;font:400 18px Georgia,serif}.benarian-text-hotel-top small{color:#8b7659;font:700 10px Arial,sans-serif;letter-spacing:1.8px}.benarian-text-hotel-card h3{font:400 36px/1.05 Georgia,serif;margin:0 0 18px;color:#201b15}.benarian-text-hotel-card p{color:#625a50;font:400 14px/1.8 Arial,sans-serif;margin:0 0 24px}.benarian-text-hotel-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:26px}.benarian-text-hotel-tags span{font:700 10px Arial,sans-serif;color:#786548;border:1px solid #e2d0ae;border-radius:999px;padding:7px 10px}.benarian-text-hotel-card a{display:inline-block;color:#a56c18;text-decoration:none;border-bottom:1px solid #b9872c;padding-bottom:5px;font:700 11px Arial,sans-serif;letter-spacing:.8px}
      @media(max-width:760px){.header .brand,.header .brand:not(.brand-lockup){width:250px!important;height:62px!important;max-width:calc(100vw - 132px)!important}.lux-hero{background-position:58% center!important}.benarian-expedia-cta{width:100%!important;max-width:320px!important}.benarian-expedia-widget-section{padding:38px 14px 46px!important}.benarian-expedia-widget-shell{padding:12px!important}.benarian-home-collection{padding:64px 24px 80px!important}.benarian-home-hotel-row{grid-template-columns:40px 1fr;padding:26px 0}.benarian-home-hotel-arrow{grid-column:2;margin-top:8px}.benarian-text-hotel-grid{grid-template-columns:1fr!important}.benarian-text-hotel-card{padding:28px 24px}.benarian-text-hotel-card h3{font-size:32px}}
    `;
    document.head.appendChild(style);
  }

  const loadStyleOnce = (href, marker) => { if (document.querySelector(`link[${marker}]`)) return; const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; link.setAttribute(marker, 'true'); document.head.appendChild(link); };
  loadStyleOnce('assets/premium-v2.css?v=20260723a', 'data-benarian-premium-v2');

  document.querySelectorAll('a[href="iran-flights.html"]').forEach(link => { link.textContent = 'FLIGHTS'; link.setAttribute('aria-label', 'Flights'); });

  const loadScriptOnce = (src, marker) => { if (document.querySelector(`script[${marker}]`)) return; const script = document.createElement('script'); script.src = src; script.defer = true; script.setAttribute(marker, 'true'); document.body.appendChild(script); };
  loadScriptOnce('assets/live-concierge.js?v=20260723c', 'data-benarian-live-concierge');
  loadScriptOnce('assets/install-app-prompt.js?v=20260723b', 'data-benarian-install-prompt');
  loadScriptOnce('assets/premium-v2.js?v=20260723a', 'data-benarian-premium-v2-script');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseBenarianRuntime, { once: true }); else initialiseBenarianRuntime();