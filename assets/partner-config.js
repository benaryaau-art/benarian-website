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

const BENARIAN_FEATURED_HOTELS = [
  { name: 'Bvlgari Resort Bali', location: 'Pecatu, Bali', description: 'An extraordinary clifftop retreat combining refined Italian design with Balinese character and exceptional privacy.' },
  { name: 'Mandapa, a Ritz-Carlton Reserve', location: 'Ubud, Bali', description: 'A serene luxury retreat beside the Ayung River, surrounded by rice terraces and tropical forest.' },
  { name: 'The Apurva Kempinski Bali', location: 'Nusa Dua, Bali', description: 'A grand beachfront resort known for dramatic architecture, refined rooms and an impressive oceanfront setting.' }
];

function expediaHotelSearchUrl(hotelName, location) {
  return `https://www.expedia.com.au/Hotel-Search?destination=${encodeURIComponent(`${hotelName}, ${location}`)}`;
}

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

    document.querySelectorAll('.benarian-expedia-widget-section,.benarian-featured-stays').forEach(section => section.remove());
    document.querySelectorAll('script[data-benarian-expedia-widget],script.eg-widgets-script').forEach(script => script.remove());

    const section = document.createElement('section');
    section.className = 'benarian-expedia-widget-section';
    section.innerHTML = `
      <div class="benarian-expedia-widget-inner">
        <p class="benarian-expedia-eyebrow">HOTEL RESERVATIONS</p>
        <h2>Book your hotel</h2>
        <p class="benarian-expedia-intro">Enter your destination and travel dates. You will continue securely to Expedia to view live prices, choose your room and complete your reservation.</p>
        <form class="benarian-expedia-direct-form" novalidate>
          <label><span>Destination</span><input type="text" name="destination" placeholder="Bali, Phuket, Dubai..." required></label>
          <label><span>Check-in</span><input type="date" name="checkin" required></label>
          <label><span>Check-out</span><input type="date" name="checkout" required></label>
          <button type="submit">SEARCH HOTELS</button>
        </form>
        <p class="benarian-expedia-disclosure">Search and booking are completed securely on Expedia. BENARIAN may earn a commission from eligible bookings.</p>
      </div>`;
    hero.insertAdjacentElement('afterend', section);

    const featured = document.createElement('section');
    featured.className = 'benarian-featured-stays';
    featured.innerHTML = `
      <div class="benarian-featured-inner">
        <p class="benarian-featured-eyebrow">FROM OUR EXPEDIA COLLECTION</p>
        <h2>Featured Bali stays</h2>
        <div class="benarian-featured-grid">
          ${BENARIAN_FEATURED_HOTELS.map((hotel, index) => `
            <article class="benarian-featured-card">
              <span class="benarian-featured-number">0${index + 1}</span>
              <small>${hotel.location.toUpperCase()}</small>
              <h3>${hotel.name}</h3>
              <p>${hotel.description}</p>
              <a href="${expediaHotelSearchUrl(hotel.name, hotel.location)}" target="_blank" rel="noopener">VIEW HOTEL ON EXPEDIA →</a>
            </article>`).join('')}
        </div>
        <a class="benarian-featured-shop" href="${window.BENARIAN_PARTNERS.expedia.travelShopUrl}" target="_blank" rel="noopener sponsored">EXPLORE THE FULL BENARIAN COLLECTION</a>
      </div>`;
    section.insertAdjacentElement('afterend', featured);

    const form = section.querySelector('.benarian-expedia-direct-form');
    if (form) {
      const checkin = form.elements.checkin;
      const checkout = form.elements.checkout;
      const today = new Date();
      const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
      const nextDay = new Date(today); nextDay.setDate(today.getDate() + 2);
      const toISO = date => date.toISOString().slice(0, 10);
      checkin.min = toISO(today); checkout.min = toISO(tomorrow);
      checkin.value = toISO(tomorrow); checkout.value = toISO(nextDay);
      checkin.addEventListener('change', () => {
        if (!checkin.value) return;
        const minCheckout = new Date(`${checkin.value}T00:00:00`);
        minCheckout.setDate(minCheckout.getDate() + 1);
        checkout.min = toISO(minCheckout);
        if (!checkout.value || checkout.value <= checkin.value) checkout.value = toISO(minCheckout);
      });
      form.addEventListener('submit', event => {
        event.preventDefault();
        const destination = form.elements.destination.value.trim();
        if (!destination) { form.elements.destination.focus(); return; }
        const params = new URLSearchParams({ destination });
        if (checkin.value) params.set('startDate', checkin.value);
        if (checkout.value) params.set('endDate', checkout.value);
        window.open(`https://www.expedia.com.au/Hotel-Search?${params.toString()}`, '_blank', 'noopener');
      });
    }
  }

  [
    '.booking-search',
    '.home-lux .hotels-section',
    '.home-lux .benarian-home-collection',
    '.home-lux .benarian-market-section[aria-labelledby="weekend-deals-title"]',
    '.home-lux .weekend-deals',
    '.home-lux .featured-hotels',
    '.home-lux .hotel-grid',
    '.home-lux .hotel-grid-pro'
  ].forEach(selector => document.querySelectorAll(selector).forEach(section => {
    section.style.display = 'none';
    section.setAttribute('aria-hidden', 'true');
  }));

  const removeInactiveNav = () => {
    document.querySelectorAll('.header .nav a, .benarian-mobile-nav a').forEach(link => {
      const text = (link.textContent || '').trim().toUpperCase();
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (text === 'EXPEDIA SHOP' || text === 'HOTELS' || href.endsWith('hotels.html')) link.remove();
    });
  };
  removeInactiveNav();
  setTimeout(removeInactiveNav, 500);
  setTimeout(removeInactiveNav, 1500);

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
      .benarian-expedia-widget-section{background:#fff!important;padding:72px 20px 78px!important;border-bottom:1px solid #eee7dc!important}.benarian-expedia-widget-inner{max-width:1180px!important;margin:0 auto!important;text-align:center!important}.benarian-expedia-eyebrow,.benarian-featured-eyebrow{margin:0 0 12px!important;color:#b9872c!important;font:700 12px Arial,Helvetica,sans-serif!important;letter-spacing:2.4px!important}.benarian-expedia-widget-inner h2,.benarian-featured-inner h2{margin:0!important;color:#17140f!important;font:400 clamp(40px,6vw,66px)/1.04 Georgia,'Times New Roman',serif!important}.benarian-expedia-intro{margin:16px auto 30px!important;max-width:690px!important;color:#5f5a52!important;font:400 16px/1.75 Arial,Helvetica,sans-serif!important}.benarian-expedia-direct-form{display:grid!important;grid-template-columns:2fr 1fr 1fr auto!important;gap:12px!important;max-width:1080px!important;margin:0 auto 22px!important;padding:18px!important;background:#17140f!important;box-shadow:0 20px 55px rgba(32,25,14,.14)!important}.benarian-expedia-direct-form label{text-align:left!important}.benarian-expedia-direct-form label span{display:block!important;margin:0 0 7px!important;color:#d8b66e!important;font:700 10px Arial,sans-serif!important;letter-spacing:1.2px!important}.benarian-expedia-direct-form input{width:100%!important;box-sizing:border-box!important;border:1px solid #4a4137!important;background:#fff!important;color:#17140f!important;padding:14px 12px!important;font:400 14px Arial,sans-serif!important}.benarian-expedia-direct-form button{align-self:end!important;border:0!important;background:#bd8626!important;color:#fff!important;padding:15px 24px!important;font:700 12px Arial,sans-serif!important;letter-spacing:1.1px!important;cursor:pointer!important}.benarian-expedia-disclosure{margin:17px auto 0!important;max-width:760px!important;color:#7b746a!important;font:400 12px/1.65 Arial,Helvetica,sans-serif!important}
      .benarian-featured-stays{background:#f7f2e9!important;padding:86px 20px 96px!important}.benarian-featured-inner{max-width:1180px!important;margin:0 auto!important;text-align:center!important}.benarian-featured-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:20px!important;margin:42px 0 34px!important;text-align:left!important}.benarian-featured-card{background:#fff!important;border:1px solid #dfcba6!important;padding:30px!important;box-shadow:0 12px 34px rgba(61,43,16,.07)!important}.benarian-featured-number{display:block!important;color:#b9872c!important;font:400 18px Georgia,serif!important;margin-bottom:24px!important}.benarian-featured-card small{display:block!important;color:#8b7659!important;font:700 10px Arial,sans-serif!important;letter-spacing:1.5px!important;margin-bottom:12px!important}.benarian-featured-card h3{margin:0 0 16px!important;color:#17140f!important;font:400 31px/1.08 Georgia,serif!important}.benarian-featured-card p{margin:0 0 24px!important;color:#625a50!important;font:400 14px/1.75 Arial,sans-serif!important}.benarian-featured-card a,.benarian-featured-shop{color:#a56c18!important;text-decoration:none!important;border-bottom:1px solid #b9872c!important;padding-bottom:5px!important;font:700 11px Arial,sans-serif!important;letter-spacing:.8px!important}.benarian-featured-shop{display:inline-block!important}
      @media(max-width:760px){.header .brand,.header .brand:not(.brand-lockup){width:250px!important;height:62px!important;max-width:calc(100vw - 132px)!important}.lux-hero{background-position:58% center!important}.benarian-expedia-widget-section{padding:48px 14px 54px!important}.benarian-expedia-direct-form{grid-template-columns:1fr!important;padding:16px!important}.benarian-expedia-direct-form button{width:100%!important}.benarian-featured-stays{padding:64px 14px 88px!important}.benarian-featured-grid{grid-template-columns:1fr!important}.benarian-featured-card{padding:26px 22px!important}}
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
