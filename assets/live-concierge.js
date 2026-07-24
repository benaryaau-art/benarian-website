(() => {
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = '/manifest.webmanifest?v=20260723';
    document.head.appendChild(manifest);
  }

  const theme = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
  theme.name = 'theme-color';
  theme.content = '#17140f';
  if (!theme.parentNode) document.head.appendChild(theme);

  const HOTEL_WIDGET_ID = 'bookingAffiliateWidget_hotelsPage_386d39d7';
  const FLIGHT_WIDGET_ID = 'bookingAffiliateWidget_flightsPage_39c24ef3';

  function ensureBookingSdk(callback) {
    if (window.Booking?.AffiliateWidget) { callback(); return; }
    let sdk = document.querySelector('script[data-benarian-booking-sdk]');
    if (!sdk) {
      sdk = document.createElement('script');
      sdk.src = 'https://www.booking.com/affiliate/prelanding_sdk';
      sdk.async = true;
      sdk.dataset.benarianBookingSdk = 'true';
      document.head.appendChild(sdk);
    }
    sdk.addEventListener('load', callback, { once: true });
  }

  function addBookingPageStyles() {
    if (document.querySelector('#benarian-booking-page-styles')) return;
    const style = document.createElement('style');
    style.id = 'benarian-booking-page-styles';
    style.textContent = `
      .benarian-official-reservation{position:relative;padding:58px 6%;background:radial-gradient(circle at top,#2b2218 0,#17130e 55%,#0d0b08 100%);border-top:1px solid #c9973e;border-bottom:1px solid #c9973e;color:#fff;overflow:hidden}
      .benarian-official-reservation:before{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent,rgba(211,154,49,.08),transparent);pointer-events:none}
      .benarian-reservation-inner{position:relative;max-width:1120px;margin:auto;text-align:center}
      .benarian-reservation-kicker{display:block;color:#d5a344;font:800 10px/1 Inter,Arial,sans-serif;letter-spacing:3px;margin-bottom:12px}
      .benarian-reservation-inner h2{margin:0 0 13px;color:#f4dfb6;font:600 clamp(34px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}
      .benarian-reservation-intro{max-width:720px;margin:0 auto 26px;color:#d5c8b6;font:400 14px/1.7 Inter,Arial,sans-serif}
      .benarian-reservation-shell{background:#fff;border:1px solid #c9953f;border-radius:18px;padding:18px;box-shadow:0 22px 60px rgba(0,0,0,.4);overflow:hidden;min-height:110px}
      .benarian-reservation-shell iframe{display:block;width:100%!important;max-width:100%!important;border:0!important}
      .benarian-reservation-note{max-width:830px;margin:15px auto 0;color:#a99c89;font:400 10px/1.65 Inter,Arial,sans-serif}
      @media(max-width:650px){.benarian-official-reservation{padding:40px 14px 112px}.benarian-reservation-shell{padding:10px;border-radius:14px}.benarian-reservation-inner h2{font-size:34px}.benarian-reservation-intro{font-size:13px}}
    `;
    document.head.appendChild(style);
  }

  function initialiseWidget(selector, destinationUrl, datasetKey) {
    const host = document.getElementById(selector);
    if (!host || host.dataset[datasetKey]) return;
    ensureBookingSdk(() => {
      if (!window.Booking?.AffiliateWidget || host.dataset[datasetKey]) return;
      host.dataset[datasetKey] = 'true';
      try {
        new Booking.AffiliateWidget({
          iframeSettings: { selector, responsive: true },
          widgetSettings: { destinationurloverride: destinationUrl }
        });
      } catch (error) {
        host.dataset[datasetKey] = '';
        console.error(error);
      }
    });
  }

  function replaceFlightsWithBooking() {
    if (!/iran-flights\.html$/i.test(location.pathname)) return;
    const oldSearch = document.querySelector('.expedia-flight-search');
    if (!oldSearch) return;
    addBookingPageStyles();
    oldSearch.className = 'benarian-official-reservation';
    oldSearch.setAttribute('aria-label', 'Booking.com worldwide flight search');
    oldSearch.innerHTML = `<div class="benarian-reservation-inner"><span class="benarian-reservation-kicker">BOOKING.COM OFFICIAL FLIGHTS</span><h2>Search Live Flights</h2><p class="benarian-reservation-intro">Choose your route and travel dates using BENARIAN’s official Booking.com affiliate connection.</p><div class="benarian-reservation-shell"><div id="${FLIGHT_WIDGET_ID}">&nbsp;</div></div><p class="benarian-reservation-note">Live prices, availability and booking confirmation are provided securely by Booking.com. BENARIAN may earn a commission from eligible reservations at no additional cost to you.</p><img src="https://www.tqlkg.com/image-101828630-17323529" width="1" height="1" alt="" style="position:absolute;opacity:0;pointer-events:none"></div>`;
    document.querySelectorAll('.eg-widgets-script,script[src*="eg-widgets.js"]').forEach(script => script.remove());
    document.querySelectorAll('.flight-hero p,.intro p').forEach(p => { p.innerHTML = p.innerHTML.replaceAll('Expedia', 'Booking.com'); });
    initialiseWidget(FLIGHT_WIDGET_ID, 'https://www.jdoqocy.com/click-101828630-17323529?sid=', 'flightWidgetReady');
  }

  function addHotelsReservation() {
    if (!/hotels\.html$/i.test(location.pathname) || document.querySelector('#benarian-hotels-reservation')) return;
    const hero = document.querySelector('.hotels-hero');
    if (!hero) return;
    addBookingPageStyles();
    const section = document.createElement('section');
    section.id = 'benarian-hotels-reservation';
    section.className = 'benarian-official-reservation';
    section.innerHTML = `<div class="benarian-reservation-inner"><span class="benarian-reservation-kicker">BOOKING.COM OFFICIAL HOTEL RESERVATIONS</span><h2>Search & Book Your Stay</h2><p class="benarian-reservation-intro">Enter your destination and dates to view live hotel availability through BENARIAN’s official Booking.com connection.</p><div class="benarian-reservation-shell"><div id="${HOTEL_WIDGET_ID}">&nbsp;</div></div><p class="benarian-reservation-note">Prices, availability and booking confirmation are provided securely by Booking.com. BENARIAN may earn a commission from eligible reservations at no additional cost to you.</p><img src="https://www.lduhtrp.net/image-101828630-17323528" width="1" height="1" alt="" style="position:absolute;opacity:0;pointer-events:none"></div>`;
    hero.insertAdjacentElement('afterend', section);
    initialiseWidget(HOTEL_WIDGET_ID, 'https://www.jdoqocy.com/click-101828630-17323528?sid=', 'hotelWidgetReady');
  }

  const addBookingButtonsToHotels = () => {
    const cards = document.querySelectorAll('.hotel-card');
    if (!cards.length) return;
    if (!document.querySelector('#benarian-hotel-booking-buttons-style')) {
      const hotelStyle = document.createElement('style');
      hotelStyle.id = 'benarian-hotel-booking-buttons-style';
      hotelStyle.textContent = `.hotel-booking-actions{display:flex;flex-direction:column;gap:8px;flex:0 0 auto;min-width:154px}.hotel-booking-actions .book-btn{display:block;box-sizing:border-box;width:100%;text-align:center}.hotel-booking-actions .booking-com-btn{background:#17140f!important;color:#f2cc7c!important;border:1px solid #b9872c!important}@media(max-width:600px){.hotel-booking-actions{width:100%;min-width:0}.hotel-booking-actions .book-btn{width:100%}}`;
      document.head.appendChild(hotelStyle);
    }
    cards.forEach(card => {
      if (card.querySelector('.booking-com-btn')) return;
      const currentButton = card.querySelector(':scope > .book-btn');
      const hotelName = card.querySelector('h3')?.textContent?.trim() || 'hotel';
      if (!currentButton) return;
      const actions = document.createElement('div');
      actions.className = 'hotel-booking-actions';
      currentButton.replaceWith(actions);
      actions.appendChild(currentButton);
      const bookingButton = document.createElement('a');
      bookingButton.className = 'book-btn booking-com-btn';
      bookingButton.href = `https://www.jdoqocy.com/click-101828630-17323528?sid=${encodeURIComponent(`hotel-${hotelName}`)}`;
      bookingButton.target = '_blank';
      bookingButton.rel = 'noopener sponsored';
      bookingButton.textContent = 'BOOK ON BOOKING.COM';
      bookingButton.setAttribute('aria-label', `Book ${hotelName} on Booking.com`);
      actions.appendChild(bookingButton);
    });
  };

  replaceFlightsWithBooking();
  addHotelsReservation();
  addBookingButtonsToHotels();
  new MutationObserver(addBookingButtonsToHotels).observe(document.documentElement, { childList: true, subtree: true });

  if (document.querySelector('#benarian-live-concierge')) return;

  const whatsappNumber = '61420788006';
  const whatsappMessage = encodeURIComponent('Hello BENARIAN, I need assistance with my travel booking.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const style = document.createElement('style');
  style.textContent = `
    .benarian-chat-launcher{position:fixed;right:22px;bottom:22px;z-index:9998;border:1px solid rgba(213,163,68,.72);border-radius:999px;background:linear-gradient(135deg,#17140f,#2b2116);color:#f7e5bd;box-shadow:0 12px 36px rgba(0,0,0,.28);padding:13px 18px;display:flex;align-items:center;gap:9px;font:700 12px Inter,Arial,sans-serif;letter-spacing:.3px;cursor:pointer}.benarian-chat-launcher .wa-icon{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#25d366;color:#fff;font-size:14px;box-shadow:0 0 0 4px rgba(37,211,102,.14)}
    .benarian-chat-panel{position:fixed;right:22px;bottom:82px;z-index:9999;width:min(370px,calc(100vw - 28px));background:#fff;border:1px solid #e7dcc8;border-radius:20px;box-shadow:0 22px 60px rgba(0,0,0,.25);overflow:hidden;font-family:Inter,Arial,sans-serif;transform:translateY(12px);opacity:0;visibility:hidden;transition:.22s ease}.benarian-chat-panel.open{transform:none;opacity:1;visibility:visible}
    .benarian-chat-head{background:#17140f;color:#fff;padding:18px 20px;display:flex;justify-content:space-between;align-items:center}.benarian-chat-head strong{display:block;font-family:Georgia,serif;font-size:20px;letter-spacing:.5px}.benarian-chat-head span{display:block;margin-top:4px;color:#d9cdbb;font-size:11px}.benarian-chat-close{border:0;background:transparent;color:#fff;font-size:24px;cursor:pointer}
    .benarian-chat-body{padding:18px}.benarian-chat-message{background:#f6f1e8;border-radius:14px 14px 14px 4px;padding:13px 14px;color:#40382e;font-size:13px;line-height:1.6}.benarian-chat-actions{display:grid;gap:9px;margin-top:14px}.benarian-chat-actions a{display:block;text-align:center;text-decoration:none;border-radius:10px;padding:12px 14px;font:600 12px Inter,Arial,sans-serif;cursor:pointer}.benarian-chat-primary{border:0;background:#25d366;color:#fff}.benarian-chat-secondary{border:1px solid #d9c49b;background:#fff;color:#4b3920}.benarian-chat-note{margin:12px 2px 0;color:#7c7267;font-size:10px;line-height:1.5;text-align:center}
    @media(max-width:600px){.benarian-chat-launcher{right:12px;bottom:calc(210px + env(safe-area-inset-bottom));padding:9px 12px}.benarian-chat-launcher .wa-icon{width:28px;height:28px}.benarian-chat-launcher .launcher-label{font-size:10px;letter-spacing:.4px}.benarian-chat-panel{right:10px;bottom:calc(266px + env(safe-area-inset-bottom));width:calc(100vw - 20px);max-height:calc(100vh - 295px);overflow:auto}}
  `;
  document.head.appendChild(style);

  const wrapper = document.createElement('div');
  wrapper.id = 'benarian-live-concierge';
  wrapper.innerHTML = `<button class="benarian-chat-launcher" type="button" aria-expanded="false" aria-controls="benarian-chat-panel"><span class="wa-icon" aria-hidden="true">◉</span><span class="launcher-label">BENARIAN Concierge</span></button><section class="benarian-chat-panel" id="benarian-chat-panel" aria-label="BENARIAN Travel Assistant" aria-hidden="true"><div class="benarian-chat-head"><div><strong>BENARIAN Travel Assistant</strong><span>Luxury travel assistance via WhatsApp</span></div><button class="benarian-chat-close" type="button" aria-label="Close travel assistant">×</button></div><div class="benarian-chat-body"><div class="benarian-chat-message">Welcome to BENARIAN. Tap below to start a WhatsApp conversation about hotels, destinations or luxury travel.</div><div class="benarian-chat-actions"><a class="benarian-chat-primary" href="${whatsappUrl}" target="_blank" rel="noopener">Chat on WhatsApp</a><a class="benarian-chat-secondary" href="mailto:concierge@benarian.com?subject=BENARIAN%20Travel%20Enquiry">Email BENARIAN</a></div><p class="benarian-chat-note">Your message will open in WhatsApp with a ready-made greeting.</p></div></section>`;
  document.body.appendChild(wrapper);

  const launcher = wrapper.querySelector('.benarian-chat-launcher');
  const panel = wrapper.querySelector('.benarian-chat-panel');
  const close = wrapper.querySelector('.benarian-chat-close');
  const setOpen = open => {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));
    if (open) close.focus();
  };
  launcher.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  close.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
})();