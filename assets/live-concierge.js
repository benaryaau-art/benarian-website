(() => {
  const HOTEL_WIDGET_ID = 'bookingAffiliateWidget_hotelsPage_386d39d7';
  const FLIGHT_WIDGET_ID = 'bookingAffiliateWidget_flightsPage_39c24ef3';
  const HOTEL_AFFILIATE = 'https://www.jdoqocy.com/click-101828630-17323528?sid=';
  const FLIGHT_AFFILIATE = 'https://www.jdoqocy.com/click-101828630-17323529?sid=';

  function ensureBookingSdk(callback) {
    if (window.Booking?.AffiliateWidget) return callback();
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

  function initialiseWidget(id, url, key) {
    const host = document.getElementById(id);
    if (!host || host.dataset[key]) return;
    ensureBookingSdk(() => {
      if (!window.Booking?.AffiliateWidget || host.dataset[key]) return;
      host.dataset[key] = 'true';
      try {
        new Booking.AffiliateWidget({
          iframeSettings: { selector: id, responsive: true },
          widgetSettings: { destinationurloverride: url }
        });
      } catch (error) {
        host.dataset[key] = '';
        console.error('BENARIAN Booking widget:', error);
      }
    });
  }

  function addSharedStyles() {
    if (document.getElementById('benarian-live-layout-styles')) return;
    const style = document.createElement('style');
    style.id = 'benarian-live-layout-styles';
    style.textContent = `
      .benarian-official-reservation{position:relative;padding:54px 6%;background:radial-gradient(circle at top,#2a2117 0,#17130e 56%,#0d0b08 100%);border-top:1px solid #c9973e;border-bottom:1px solid #c9973e;color:#fff;overflow:hidden}
      .benarian-reservation-inner{max-width:1120px;margin:auto;text-align:center}
      .benarian-reservation-kicker{display:block;color:#d5a344;font:800 10px/1 Inter,Arial,sans-serif;letter-spacing:3px;margin-bottom:12px}
      .benarian-reservation-inner h2{margin:0 0 12px;color:#f4dfb6;font:600 clamp(34px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}
      .benarian-reservation-intro{max-width:760px;margin:0 auto 24px;color:#d5c8b6;font:400 14px/1.7 Inter,Arial,sans-serif}
      .benarian-reservation-shell{background:#fff;border:1px solid #c9953f;border-radius:18px;padding:18px;box-shadow:0 22px 60px rgba(0,0,0,.4);overflow:hidden;min-height:110px}
      .benarian-reservation-shell iframe{display:block;width:100%!important;max-width:100%!important;border:0!important}
      .benarian-reservation-note{max-width:830px;margin:15px auto 0;color:#a99c89;font:400 10px/1.65 Inter,Arial,sans-serif}
      .benarian-hotel-hero-cta{display:inline-flex;flex-direction:column;align-items:flex-start;gap:4px;margin-top:22px;padding:15px 18px;border:1px solid #dfb45f;background:rgba(17,14,10,.72);color:#fff;text-decoration:none;border-radius:10px;max-width:430px}
      .benarian-hotel-hero-cta strong{color:#f3cf83;font:700 14px/1.3 Inter,Arial,sans-serif}.benarian-hotel-hero-cta span{font:500 11px/1.5 Inter,Arial,sans-serif}
      .hotel-booking-actions{display:flex;flex-direction:column;gap:8px;flex:0 0 auto;min-width:154px}.hotel-booking-actions .book-btn{display:block;box-sizing:border-box;width:100%;text-align:center}.booking-com-btn{background:#17140f!important;color:#f2cc7c!important;border:1px solid #b9872c!important}
      .benarian-footer-brand-column{display:flex!important;flex-direction:column!important;align-items:flex-start!important;min-width:0!important;max-width:100%!important}
      .benarian-footer-concierge{display:flex;flex-direction:column;align-items:flex-start;gap:7px;margin-top:16px;max-width:310px;width:100%}
      .benarian-footer-live{display:inline-flex;align-items:center;gap:9px;max-width:100%;box-sizing:border-box;padding:10px 14px;border:1px solid rgba(185,135,44,.72);border-radius:999px;background:rgba(23,20,15,.04);color:#9b681b;text-decoration:none!important;font:700 10px Inter,Arial,sans-serif;letter-spacing:.7px;white-space:normal}
      .benarian-footer-live .live-dot{width:8px;height:8px;border-radius:50%;background:#25d366;box-shadow:0 0 0 4px rgba(37,211,102,.14);flex:0 0 auto}.benarian-footer-concierge p{margin:0!important;color:#746a5d!important;font:500 11px/1.55 Inter,Arial,sans-serif!important}
      .footer .benarian-footer-group{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:9px!important;min-width:0!important}.footer .benarian-footer-group strong{display:block!important;margin:0 0 4px!important}.footer .benarian-footer-group a{display:block!important;margin:0!important;line-height:1.45!important;white-space:normal!important}.footer .benarian-footer-group p{margin:0!important}
      @media(max-width:650px){
        .benarian-official-reservation{padding:40px 14px 110px}.benarian-reservation-shell{padding:10px;border-radius:14px}.benarian-reservation-inner h2{font-size:34px}.benarian-reservation-intro{font-size:13px}
        .hotel-booking-actions{width:100%;min-width:0}
        .footer{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:28px 22px!important;align-items:start!important;padding-bottom:280px!important}
        .footer .benarian-footer-brand-column{grid-column:1/-1!important;width:100%!important}.footer .benarian-footer-group.company-group{grid-column:1/-1!important}.footer .benarian-footer-group.support-group{grid-column:1!important}.footer .benarian-footer-group.follow-group{grid-column:2!important}.footer .copyright,.footer>p.copyright{grid-column:1/-1!important;margin-top:8px!important}
        .benarian-footer-live{font-size:9px!important;padding:10px 12px}.benarian-footer-concierge p{font-size:10px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function addHotelsReservation() {
    if (!/hotels\.html$/i.test(location.pathname)) return;
    const hero = document.querySelector('.hotels-hero');
    if (!hero) return;
    addSharedStyles();

    let section = document.getElementById('benarian-hotels-reservation');
    if (!section) {
      section = document.createElement('section');
      section.id = 'benarian-hotels-reservation';
      section.className = 'benarian-official-reservation';
      section.innerHTML = `<div class="benarian-reservation-inner"><span class="benarian-reservation-kicker">BOOKING.COM OFFICIAL HOTEL RESERVATIONS</span><h2>Find the Best Available Hotel Prices</h2><p class="benarian-reservation-intro">Search live availability and book securely through BENARIAN’s official Booking.com connection.<br><span lang="fa" dir="rtl">بهترین قیمت‌های موجود هتل را از اینجا پیدا کنید</span></p><div class="benarian-reservation-shell"><div id="${HOTEL_WIDGET_ID}">&nbsp;</div></div><p class="benarian-reservation-note">Prices, availability and booking confirmation are provided securely by Booking.com. BENARIAN may earn a commission from eligible reservations at no additional cost to you.</p><img src="https://www.lduhtrp.net/image-101828630-17323528" width="1" height="1" alt="" style="position:absolute;opacity:0;pointer-events:none"></div>`;
      hero.insertAdjacentElement('afterend', section);
    } else if (hero.nextElementSibling !== section) {
      hero.insertAdjacentElement('afterend', section);
    }

    if (!hero.querySelector('.benarian-hotel-hero-cta')) {
      const cta = document.createElement('a');
      cta.className = 'benarian-hotel-hero-cta';
      cta.href = '#benarian-hotels-reservation';
      cta.innerHTML = '<strong>Find the best available hotel prices here →</strong><span lang="fa" dir="rtl">بهترین قیمت‌های هتل را از اینجا پیدا کنید</span>';
      hero.appendChild(cta);
    }

    hero.querySelectorAll('p').forEach(p => {
      p.innerHTML = p.innerHTML.replaceAll('Expedia', 'Booking.com');
    });
    initialiseWidget(HOTEL_WIDGET_ID, HOTEL_AFFILIATE, 'hotelWidgetReady');
  }

  function replaceFlightsWithBooking() {
    if (!/iran-flights\.html$/i.test(location.pathname)) return;
    const oldSearch = document.querySelector('.expedia-flight-search');
    if (!oldSearch) return;
    addSharedStyles();
    oldSearch.className = 'benarian-official-reservation';
    oldSearch.innerHTML = `<div class="benarian-reservation-inner"><span class="benarian-reservation-kicker">BOOKING.COM OFFICIAL FLIGHTS</span><h2>Search Live Flights</h2><p class="benarian-reservation-intro">Choose your route and travel dates using BENARIAN’s official Booking.com affiliate connection.</p><div class="benarian-reservation-shell"><div id="${FLIGHT_WIDGET_ID}">&nbsp;</div></div><p class="benarian-reservation-note">Live prices, availability and booking confirmation are provided securely by Booking.com.</p></div>`;
    document.querySelectorAll('.flight-hero p,.intro p').forEach(p => { p.innerHTML = p.innerHTML.replaceAll('Expedia', 'Booking.com'); });
    initialiseWidget(FLIGHT_WIDGET_ID, FLIGHT_AFFILIATE, 'flightWidgetReady');
  }

  function addBookingButtonsToHotels() {
    if (!/hotels\.html$/i.test(location.pathname)) return;
    document.querySelectorAll('.hotel-card').forEach(card => {
      if (card.querySelector('.booking-com-btn')) return;
      const currentButton = card.querySelector(':scope > .book-btn');
      if (!currentButton) return;
      const hotelName = card.querySelector('h3')?.textContent?.trim() || 'hotel';
      const actions = document.createElement('div');
      actions.className = 'hotel-booking-actions';
      currentButton.replaceWith(actions);
      actions.appendChild(currentButton);
      const bookingButton = document.createElement('a');
      bookingButton.className = 'book-btn booking-com-btn';
      bookingButton.href = `${HOTEL_AFFILIATE}${encodeURIComponent(`hotel-${hotelName}`)}`;
      bookingButton.target = '_blank';
      bookingButton.rel = 'noopener sponsored';
      bookingButton.textContent = 'BOOK ON BOOKING.COM';
      actions.appendChild(bookingButton);
    });
  }

  function fixFooter() {
    const footer = document.querySelector('footer.footer, .footer');
    if (!footer) return;
    addSharedStyles();

    const groups = [...footer.children].filter(el => el.tagName === 'DIV');
    groups.forEach(group => {
      const title = group.querySelector('strong')?.textContent?.trim() || '';
      group.classList.add('benarian-footer-group');
      if (/Company/i.test(title)) group.classList.add('company-group');
      if (/Support/i.test(title)) group.classList.add('support-group');
      if (/Follow Us/i.test(title)) group.classList.add('follow-group');
    });

    if (!document.getElementById('benarian-footer-live')) {
      const whatsappUrl = `https://wa.me/61420788006?text=${encodeURIComponent('Hello BENARIAN, I need assistance with my travel booking.')}`;
      const block = document.createElement('div');
      block.id = 'benarian-footer-live';
      block.className = 'benarian-footer-concierge';
      block.innerHTML = `<a class="benarian-footer-live" href="${whatsappUrl}" target="_blank" rel="noopener"><span class="live-dot" aria-hidden="true"></span>LIVE CONCIERGE · WHATSAPP</a><p>Talk to our team or Ben Tafreshi</p>`;
      const brand = footer.querySelector('a[aria-label="BENARIAN home"], a[href="index.html"], .brand');
      if (brand) {
        let column = brand.parentElement?.classList.contains('benarian-footer-brand-column') ? brand.parentElement : null;
        if (!column) {
          column = document.createElement('div');
          column.className = 'benarian-footer-brand-column';
          brand.replaceWith(column);
          column.appendChild(brand);
        }
        column.appendChild(block);
      } else footer.prepend(block);
    }
  }

  function init() {
    addSharedStyles();
    addHotelsReservation();
    replaceFlightsWithBooking();
    addBookingButtonsToHotels();
    fixFooter();
    new MutationObserver(() => { addBookingButtonsToHotels(); fixFooter(); }).observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();