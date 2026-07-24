(() => {
  const hero = document.querySelector('.hotels-hero');
  if (!hero || document.querySelector('#benarian-hotels-reservation')) return;

  const style = document.createElement('style');
  style.id = 'benarian-hotels-booking-style';
  style.textContent = `
    .hotels-hero{position:relative}
    .hotels-best-price{margin-top:26px;max-width:620px;padding:18px 20px;border:1px solid rgba(230,181,84,.82);border-radius:14px;background:rgba(15,12,8,.74);backdrop-filter:blur(8px);box-shadow:0 14px 40px rgba(0,0,0,.24)}
    .hotels-best-price strong{display:block;color:#f4d38b;font:600 22px/1.2 'Cormorant Garamond',Georgia,serif;margin-bottom:5px}
    .hotels-best-price span{display:block;color:#fff;font:500 13px/1.6 Inter,Arial,sans-serif}
    .hotels-best-price .fa{margin-top:3px;color:#f2d7a0;direction:rtl;text-align:left}
    .hotels-best-price a{display:inline-flex;margin-top:14px;padding:12px 18px;border-radius:9px;background:#c58c28;color:#fff;text-decoration:none;font:700 11px Inter,Arial,sans-serif;letter-spacing:.7px}
    #benarian-hotels-reservation{position:relative;padding:54px 6% 60px;background:radial-gradient(circle at top,#2a2118 0,#17130e 55%,#0e0b08 100%);border-top:1px solid #c8953d;border-bottom:1px solid #c8953d;color:#fff;scroll-margin-top:90px}
    .hotels-reservation-inner{max-width:1120px;margin:auto;text-align:center}
    .hotels-reservation-kicker{display:block;color:#d7a544;font:800 10px Inter,Arial,sans-serif;letter-spacing:3px;margin-bottom:10px}
    .hotels-reservation-inner h2{margin:0;color:#f4dfb6;font:600 clamp(34px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}
    .hotels-reservation-inner>p{max-width:730px;margin:14px auto 24px;color:#d6cab8;font:400 14px/1.7 Inter,Arial,sans-serif}
    .hotels-reservation-shell{background:#fff;border:1px solid #c9953f;border-radius:18px;padding:18px;box-shadow:0 22px 60px rgba(0,0,0,.4);overflow:hidden;min-height:120px}
    .hotels-reservation-shell iframe{display:block;width:100%!important;max-width:100%!important;border:0!important}
    .hotels-reservation-note{margin:15px auto 0!important;color:#a99c89!important;font-size:10px!important;line-height:1.6!important}
    @media(max-width:650px){
      .hotels-best-price{padding:16px;margin-top:22px}.hotels-best-price strong{font-size:20px}.hotels-best-price span{font-size:12px}
      #benarian-hotels-reservation{padding:40px 14px 54px}.hotels-reservation-shell{padding:10px;border-radius:14px}.hotels-reservation-inner h2{font-size:34px}
      .lux-footer,.footer{display:grid!important;grid-template-columns:1fr!important;gap:22px!important;padding-left:22px!important;padding-right:22px!important;padding-bottom:190px!important}
      .lux-footer>div,.footer>div,.benarian-footer-brand-column,.benarian-support-social{width:100%!important;max-width:100%!important;grid-column:1!important}
      .benarian-support-social{display:grid!important;grid-template-columns:1fr 1fr!important;gap:24px!important}
      .benarian-support-social a{display:block!important;margin:9px 0!important;line-height:1.45!important}
      .benarian-support-social p{margin:10px 0!important}
    }
  `;
  document.head.appendChild(style);

  const priceBox = document.createElement('div');
  priceBox.className = 'hotels-best-price';
  priceBox.innerHTML = `<strong>Find the best available hotel prices here</strong><span class="fa" lang="fa" dir="rtl">بهترین قیمت‌های موجود هتل را از اینجا پیدا کنید</span><a href="#benarian-hotels-reservation">SEARCH &amp; BOOK HOTELS →</a>`;
  hero.appendChild(priceBox);

  const section = document.createElement('section');
  section.id = 'benarian-hotels-reservation';
  section.innerHTML = `<div class="hotels-reservation-inner"><span class="hotels-reservation-kicker">BOOKING.COM OFFICIAL HOTEL RESERVATIONS</span><h2>Search &amp; Book Your Stay</h2><p>Enter your destination and travel dates to view live availability through BENARIAN’s official Booking.com affiliate connection.</p><div class="hotels-reservation-shell"><div id="bookingAffiliateWidget_hotelsPage_386d39d7">&nbsp;</div></div><p class="hotels-reservation-note">Prices, availability and booking confirmation are provided securely by Booking.com. BENARIAN may earn a commission from eligible reservations at no additional cost to you.</p><img src="https://www.lduhtrp.net/image-101828630-17323528" width="1" height="1" alt="" style="position:absolute;opacity:0;pointer-events:none"></div>`;
  hero.insertAdjacentElement('afterend', section);

  const init = () => {
    if (!window.Booking?.AffiliateWidget || section.dataset.ready) return;
    section.dataset.ready = 'true';
    try {
      new Booking.AffiliateWidget({
        iframeSettings: { selector: 'bookingAffiliateWidget_hotelsPage_386d39d7', responsive: true },
        widgetSettings: { destinationurloverride: 'https://www.jdoqocy.com/click-101828630-17323528?sid=hotels-page' }
      });
    } catch (error) {
      section.dataset.ready = '';
      console.error(error);
    }
  };

  if (window.Booking?.AffiliateWidget) init();
  else {
    let sdk = document.querySelector('script[data-benarian-hotels-sdk]');
    if (!sdk) {
      sdk = document.createElement('script');
      sdk.src = 'https://www.booking.com/affiliate/prelanding_sdk';
      sdk.async = true;
      sdk.dataset.benarianHotelsSdk = 'true';
      document.head.appendChild(sdk);
    }
    sdk.addEventListener('load', init, { once: true });
  }
})();