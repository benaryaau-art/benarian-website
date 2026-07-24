(() => {
  const hero = document.querySelector('.hotels-hero');
  if (!hero || document.querySelector('#benarian-hotels-reservation')) return;

  const TRACKING_URL = 'https://www.jdoqocy.com/click-101828630-17323528?sid=';

  const style = document.createElement('style');
  style.id = 'benarian-hotels-booking-style';
  style.textContent = `
    .hotels-hero{position:relative}
    .hotels-best-price{margin-top:26px;max-width:620px;padding:18px 20px;border:1px solid rgba(230,181,84,.82);border-radius:14px;background:rgba(15,12,8,.78);backdrop-filter:blur(8px);box-shadow:0 14px 40px rgba(0,0,0,.24)}
    .hotels-best-price strong{display:block;color:#f4d38b;font:600 22px/1.2 'Cormorant Garamond',Georgia,serif;margin-bottom:5px}
    .hotels-best-price span{display:block;color:#fff;font:500 13px/1.6 Inter,Arial,sans-serif}
    .hotels-best-price .fa{margin-top:3px;color:#f2d7a0;direction:rtl;text-align:left}
    .hotels-best-price a{display:inline-flex;margin-top:14px;padding:12px 18px;border-radius:9px;background:#c58c28;color:#fff;text-decoration:none;font:700 11px Inter,Arial,sans-serif;letter-spacing:.7px}
    #benarian-hotels-reservation{position:relative;padding:54px 6% 64px;background:radial-gradient(circle at top,#2a2118 0,#17130e 55%,#0e0b08 100%);border-top:1px solid #c8953d;border-bottom:1px solid #c8953d;color:#fff;scroll-margin-top:90px}
    .hotels-reservation-inner{max-width:1080px;margin:auto;text-align:center}
    .hotels-reservation-kicker{display:block;color:#d7a544;font:800 10px Inter,Arial,sans-serif;letter-spacing:3px;margin-bottom:10px}
    .hotels-reservation-inner h2{margin:0;color:#f4dfb6;font:600 clamp(34px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}
    .hotels-reservation-intro{max-width:730px;margin:14px auto 26px;color:#d6cab8;font:400 14px/1.7 Inter,Arial,sans-serif}
    .hotels-booking-form{display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:12px;align-items:end;background:#fff;border:1px solid #c9953f;border-radius:18px;padding:20px;box-shadow:0 22px 60px rgba(0,0,0,.4);text-align:left}
    .hotels-booking-form label{display:block;color:#8d6424;font:800 9px/1 Inter,Arial,sans-serif;letter-spacing:1.2px}
    .hotels-booking-form input{display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:14px 12px;border:1px solid #cfc7bb;border-radius:8px;background:#fff;color:#17130e;font:500 14px Inter,Arial,sans-serif}
    .hotels-booking-form button{min-height:48px;padding:13px 22px;border:0;border-radius:8px;background:#c58c28;color:#fff;font:800 11px Inter,Arial,sans-serif;letter-spacing:.8px;cursor:pointer;white-space:nowrap}
    .hotels-booking-form button:hover{background:#a97019}
    .hotels-reservation-note{margin:15px auto 0!important;color:#a99c89!important;font:400 10px/1.6 Inter,Arial,sans-serif!important;max-width:780px}
    .hotels-widget-fallback{margin-top:18px}
    .hotels-widget-fallback summary{display:inline-block;cursor:pointer;color:#d7b66d;font:700 10px Inter,Arial,sans-serif;letter-spacing:.6px;border-bottom:1px solid #9b742e;padding-bottom:4px;list-style:none}
    .hotels-widget-fallback summary::-webkit-details-marker{display:none}
    .hotels-widget-shell{margin-top:16px;background:#fff;border:1px solid #c9953f;border-radius:14px;padding:10px;overflow:hidden;max-height:540px}
    .hotels-widget-shell iframe{display:block;width:100%!important;max-width:100%!important;max-height:520px!important;border:0!important}
    @media(max-width:760px){
      .hotels-best-price{padding:16px;margin-top:22px}.hotels-best-price strong{font-size:20px}.hotels-best-price span{font-size:12px}
      #benarian-hotels-reservation{padding:40px 14px 56px}.hotels-reservation-inner h2{font-size:34px}.hotels-booking-form{grid-template-columns:1fr;padding:14px;border-radius:14px}.hotels-booking-form button{width:100%}.hotels-widget-shell{max-height:420px}.hotels-widget-shell iframe{max-height:400px!important}
      .lux-footer,.footer{display:grid!important;grid-template-columns:1fr!important;gap:22px!important;padding-left:22px!important;padding-right:22px!important;padding-bottom:190px!important}
      .lux-footer>div,.footer>div,.benarian-footer-brand-column,.benarian-support-social{width:100%!important;max-width:100%!important;grid-column:1!important}
      .benarian-support-social{display:grid!important;grid-template-columns:1fr 1fr!important;gap:24px!important}.benarian-support-social a{display:block!important;margin:9px 0!important;line-height:1.45!important}.benarian-support-social p{margin:10px 0!important}
    }
  `;
  document.head.appendChild(style);

  const priceBox = document.createElement('div');
  priceBox.className = 'hotels-best-price';
  priceBox.innerHTML = `<strong>Find the best available hotel prices here</strong><span class="fa" lang="fa" dir="rtl">بهترین قیمت‌های موجود هتل را از اینجا پیدا کنید</span><a href="#benarian-hotels-reservation">SEARCH &amp; BOOK HOTELS →</a>`;
  hero.appendChild(priceBox);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const iso = date => date.toISOString().slice(0, 10);

  const section = document.createElement('section');
  section.id = 'benarian-hotels-reservation';
  section.innerHTML = `<div class="hotels-reservation-inner"><span class="hotels-reservation-kicker">BOOKING.COM OFFICIAL HOTEL RESERVATIONS</span><h2>Search &amp; Book Your Stay</h2><p class="hotels-reservation-intro">Choose your destination and travel dates, then continue securely through BENARIAN’s official Booking.com affiliate connection.</p><form class="hotels-booking-form"><label>DESTINATION<input name="destination" type="text" placeholder="Bali, Phuket, Dubai…" required></label><label>CHECK-IN<input name="checkin" type="date" min="${iso(new Date())}" value="${iso(tomorrow)}" required></label><label>CHECK-OUT<input name="checkout" type="date" min="${iso(tomorrow)}" value="${iso(dayAfter)}" required></label><button type="submit">SEARCH ON BOOKING.COM →</button></form><p class="hotels-reservation-note">You will continue securely to Booking.com to view live prices, room availability and complete your reservation. BENARIAN may earn a commission from eligible bookings at no additional cost to you.</p><details class="hotels-widget-fallback"><summary>Open the official embedded Booking.com search</summary><div class="hotels-widget-shell"><div id="bookingAffiliateWidget_hotelsPage_386d39d7">&nbsp;</div></div></details><img src="https://www.lduhtrp.net/image-101828630-17323528" width="1" height="1" alt="" style="position:absolute;opacity:0;pointer-events:none"></div>`;
  hero.insertAdjacentElement('afterend', section);

  const form = section.querySelector('.hotels-booking-form');
  const checkin = form.elements.checkin;
  const checkout = form.elements.checkout;
  checkin.addEventListener('change', () => {
    if (!checkin.value) return;
    const minCheckout = new Date(`${checkin.value}T00:00:00`);
    minCheckout.setDate(minCheckout.getDate() + 1);
    checkout.min = iso(minCheckout);
    if (!checkout.value || checkout.value <= checkin.value) checkout.value = iso(minCheckout);
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const destination = form.elements.destination.value.trim();
    if (!destination) { form.elements.destination.focus(); return; }
    const sid = encodeURIComponent(`hotels-page|${destination}|${checkin.value}|${checkout.value}`);
    window.open(`${TRACKING_URL}${sid}`, '_blank', 'noopener');
  });

  let widgetInitialised = false;
  const initWidget = () => {
    if (widgetInitialised || !window.Booking?.AffiliateWidget) return;
    widgetInitialised = true;
    try {
      new Booking.AffiliateWidget({
        iframeSettings: { selector: 'bookingAffiliateWidget_hotelsPage_386d39d7', responsive: true },
        widgetSettings: { destinationurloverride: `${TRACKING_URL}hotels-embedded` }
      });
    } catch (error) {
      widgetInitialised = false;
      console.error(error);
    }
  };

  section.querySelector('.hotels-widget-fallback').addEventListener('toggle', event => {
    if (!event.currentTarget.open) return;
    if (window.Booking?.AffiliateWidget) { initWidget(); return; }
    let sdk = document.querySelector('script[data-benarian-hotels-sdk]');
    if (!sdk) {
      sdk = document.createElement('script');
      sdk.src = 'https://www.booking.com/affiliate/prelanding_sdk';
      sdk.async = true;
      sdk.dataset.benarianHotelsSdk = 'true';
      document.head.appendChild(sdk);
    }
    sdk.addEventListener('load', initWidget, { once: true });
  });
})();