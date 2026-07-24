(() => {
  if (!/hotels\.html$/i.test(location.pathname)) return;

  const HERO_WIDGET_ID = 'bookingAffiliateWidget_hotelsHero_386d39d7';
  const affiliateUrl = 'https://www.jdoqocy.com/click-101828630-17323528?sid=hotels-page-reservation';

  const addStyles = () => {
    if (document.querySelector('#benarian-hotels-hero-reservation-styles')) return;
    const style = document.createElement('style');
    style.id = 'benarian-hotels-hero-reservation-styles';
    style.textContent = `
      .hotels-best-price-cta{margin-top:24px;max-width:680px;padding:18px 20px;border:1px solid rgba(239,194,105,.78);background:rgba(14,11,8,.72);backdrop-filter:blur(8px);box-shadow:0 16px 42px rgba(0,0,0,.28)}
      .hotels-best-price-cta strong{display:block;color:#f1cc7d;font:700 15px/1.4 Inter,Arial,sans-serif;margin-bottom:5px}.hotels-best-price-cta span{display:block;color:#fff;font:500 13px/1.7 Inter,Arial,sans-serif}.hotels-best-price-cta em{display:block;color:#f1e2c4;font:500 13px/1.8 Arial,sans-serif;font-style:normal;direction:rtl;text-align:left}.hotels-best-price-cta a{display:inline-flex;margin-top:13px;padding:12px 17px;background:#c58b27;color:#fff;text-decoration:none;font:700 11px Inter,Arial,sans-serif;letter-spacing:.8px}
      #benarian-hotels-hero-reservation{position:relative;padding:58px 6%;background:radial-gradient(circle at top,#2b2218 0,#17130e 55%,#0d0b08 100%);border-top:1px solid #c9973e;border-bottom:1px solid #c9973e;color:#fff;overflow:hidden;scroll-margin-top:80px}
      #benarian-hotels-hero-reservation .reservation-inner{max-width:1120px;margin:auto;text-align:center}.reservation-kicker{display:block;color:#d5a344;font:800 10px/1 Inter,Arial,sans-serif;letter-spacing:3px;margin-bottom:12px}.reservation-title{margin:0 0 12px;color:#f4dfb6;font:600 clamp(34px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}.reservation-copy{max-width:760px;margin:0 auto 25px;color:#d5c8b6;font:400 14px/1.7 Inter,Arial,sans-serif}.reservation-copy-fa{margin-top:-14px!important;direction:rtl}.reservation-shell{background:#fff;border:1px solid #c9953f;border-radius:18px;padding:18px;box-shadow:0 22px 60px rgba(0,0,0,.4);overflow:hidden;min-height:110px}.reservation-shell iframe{display:block;width:100%!important;max-width:100%!important;border:0!important}.reservation-note{max-width:830px;margin:15px auto 0;color:#a99c89;font:400 10px/1.65 Inter,Arial,sans-serif}
      @media(max-width:650px){.hotels-best-price-cta{padding:15px;margin-top:20px}.hotels-best-price-cta em{text-align:left;font-size:12px}#benarian-hotels-hero-reservation{padding:42px 14px 110px}.reservation-shell{padding:10px;border-radius:14px}.reservation-title{font-size:34px}}
    `;
    document.head.appendChild(style);
  };

  const ensureSdk = callback => {
    if (window.Booking?.AffiliateWidget) { callback(); return; }
    let script = document.querySelector('script[data-hotels-hero-booking-sdk]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://www.booking.com/affiliate/prelanding_sdk';
      script.async = true;
      script.dataset.hotelsHeroBookingSdk = 'true';
      document.head.appendChild(script);
    }
    script.addEventListener('load', callback, { once: true });
  };

  const mount = () => {
    const hero = document.querySelector('.hotels-hero');
    if (!hero) return;
    addStyles();

    if (!hero.querySelector('.hotels-best-price-cta')) {
      hero.insertAdjacentHTML('beforeend', `<div class="hotels-best-price-cta"><strong>Find the best available hotel prices here</strong><span>Search live availability and compare current hotel prices through Booking.com.</span><em>بهترین قیمت‌های موجود هتل را از اینجا پیدا کنید</em><a href="#benarian-hotels-hero-reservation">SEARCH &amp; BOOK HOTELS →</a></div>`);
    }

    let section = document.querySelector('#benarian-hotels-hero-reservation, #benarian-hotels-reservation');
    if (!section) {
      section = document.createElement('section');
      section.id = 'benarian-hotels-hero-reservation';
      section.innerHTML = `<div class="reservation-inner"><span class="reservation-kicker">BOOKING.COM OFFICIAL HOTEL RESERVATIONS</span><h2 class="reservation-title">Find Your Best Hotel Price</h2><p class="reservation-copy">Enter your destination and travel dates to view live availability and current hotel prices.</p><p class="reservation-copy reservation-copy-fa">مقصد و تاریخ سفر را وارد کنید و بهترین قیمت‌های موجود هتل را ببینید.</p><div class="reservation-shell"><div id="${HERO_WIDGET_ID}">&nbsp;</div></div><p class="reservation-note">Prices, availability and booking confirmation are provided securely by Booking.com. BENARIAN may earn a commission from eligible reservations at no additional cost to you.</p><img src="https://www.lduhtrp.net/image-101828630-17323528" width="1" height="1" alt="" style="position:absolute;opacity:0;pointer-events:none"></div>`;
      hero.insertAdjacentElement('afterend', section);
    }

    if (!document.getElementById(HERO_WIDGET_ID)) return;
    ensureSdk(() => {
      const host = document.getElementById(HERO_WIDGET_ID);
      if (!host || host.dataset.ready || !window.Booking?.AffiliateWidget) return;
      host.dataset.ready = 'true';
      try {
        new Booking.AffiliateWidget({
          iframeSettings: { selector: HERO_WIDGET_ID, responsive: true },
          widgetSettings: { destinationurloverride: affiliateUrl }
        });
      } catch (error) {
        host.dataset.ready = '';
        console.error(error);
      }
    });
  };

  mount();
  [300, 900, 1800].forEach(delay => setTimeout(mount, delay));
})();
