(() => {
  if (!document.querySelector('script[data-benarian-wishlist]')) {
    const wishlist = document.createElement('script');
    wishlist.src = 'assets/wishlist.js?v=20260726a';
    wishlist.defer = true;
    wishlist.dataset.benarianWishlist = 'true';
    document.body.appendChild(wishlist);
  }

  const hero = document.querySelector('.hotels-hero');
  if (!hero || document.querySelector('#benarian-hotels-reservation')) return;
  const TRACKING_URL = 'https://www.jdoqocy.com/click-101828630-17323528?sid=';
  const style = document.createElement('style');
  style.id = 'benarian-hotels-booking-style';
  style.textContent = `
    .hotels-hero{position:relative}.hotels-best-price{margin-top:26px;max-width:620px;padding:18px 20px;border:1px solid rgba(230,181,84,.82);border-radius:14px;background:rgba(15,12,8,.78);backdrop-filter:blur(8px);box-shadow:0 14px 40px rgba(0,0,0,.24);box-sizing:border-box}.hotels-best-price strong{display:block;color:#f4d38b;font:600 22px/1.2 'Cormorant Garamond',Georgia,serif;margin-bottom:5px}.hotels-best-price span{display:block;color:#fff;font:500 13px/1.6 Inter,Arial,sans-serif}.hotels-best-price .fa{margin-top:3px;color:#f2d7a0;direction:rtl;text-align:left}.hotels-best-price a{display:inline-flex;margin-top:14px;padding:12px 18px;border-radius:9px;background:#c58c28;color:#fff;text-decoration:none;font:700 11px Inter,Arial,sans-serif;letter-spacing:.7px}
    #benarian-hotels-reservation{position:relative;padding:54px 6% 64px;background:radial-gradient(circle at top,#2a2118 0,#17130e 55%,#0e0b08 100%);border-top:1px solid #c8953d;border-bottom:1px solid #c8953d;color:#fff;scroll-margin-top:90px;overflow:hidden}.hotels-reservation-inner{max-width:1080px;width:100%;margin:auto;text-align:center;box-sizing:border-box}.hotels-reservation-kicker{display:block;color:#d7a544;font:800 10px Inter,Arial,sans-serif;letter-spacing:3px;margin-bottom:10px}.hotels-reservation-inner h2{margin:0;color:#f4dfb6;font:600 clamp(34px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}.hotels-reservation-intro{max-width:730px;margin:14px auto 26px;color:#d6cab8;font:400 14px/1.7 Inter,Arial,sans-serif}.hotels-booking-form{display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:12px;align-items:end;width:100%;box-sizing:border-box;background:#fff;border:1px solid #c9953f;border-radius:18px;padding:20px;box-shadow:0 22px 60px rgba(0,0,0,.4);text-align:left}.hotels-booking-form>*{min-width:0;box-sizing:border-box}.hotels-booking-form label{display:block;color:#8d6424;font:800 9px/1 Inter,Arial,sans-serif;letter-spacing:1.2px}.hotels-booking-form input{display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:14px 12px;border:1px solid #cfc7bb;border-radius:8px;background:#fff;color:#17130e;font:500 14px Inter,Arial,sans-serif}.hotels-booking-form button{min-height:48px;padding:13px 22px;border:0;border-radius:8px;background:#c58c28;color:#fff;font:800 11px Inter,Arial,sans-serif;letter-spacing:.8px;cursor:pointer;white-space:nowrap}.hotels-reservation-note{margin:15px auto 0!important;color:#a99c89!important;font:400 10px/1.6 Inter,Arial,sans-serif!important;max-width:780px}
    @media(max-width:760px){.hotels-best-price{width:100%;padding:16px}.hotels-best-price strong{font-size:20px}#benarian-hotels-reservation{padding:40px 12px 56px}.hotels-reservation-inner h2{font-size:34px}.hotels-booking-form{display:block;padding:14px;border-radius:14px}.hotels-booking-form label{display:block;width:100%;margin:0 0 16px}.hotels-booking-form input{height:52px!important;font-size:16px!important}.hotels-booking-form button{display:block;width:100%;white-space:normal}}
  `;
  document.head.appendChild(style);

  const priceBox = document.createElement('div');
  priceBox.className = 'hotels-best-price';
  priceBox.innerHTML = '<strong>Find the best available hotel prices here</strong><span class="fa" lang="fa" dir="rtl">بهترین قیمت‌های موجود هتل را از اینجا پیدا کنید</span><a href="#benarian-hotels-reservation">SEARCH &amp; BOOK HOTELS →</a>';
  hero.appendChild(priceBox);

  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(); dayAfter.setDate(dayAfter.getDate() + 2);
  const iso = date => date.toISOString().slice(0,10);
  const section = document.createElement('section');
  section.id = 'benarian-hotels-reservation';
  section.innerHTML = `<div class="hotels-reservation-inner"><span class="hotels-reservation-kicker">BOOKING.COM OFFICIAL HOTEL RESERVATIONS</span><h2>Search &amp; Book Your Stay</h2><p class="hotels-reservation-intro">Choose your destination and travel dates, then continue securely through BENARIAN’s official Booking.com affiliate connection.</p><form class="hotels-booking-form"><label>DESTINATION<input name="destination" type="text" placeholder="Bali, Phuket, Dubai…" required></label><label>CHECK-IN<input name="checkin" type="date" min="${iso(new Date())}" value="${iso(tomorrow)}" required></label><label>CHECK-OUT<input name="checkout" type="date" min="${iso(tomorrow)}" value="${iso(dayAfter)}" required></label><button type="submit">SEARCH ON BOOKING.COM →</button></form><p class="hotels-reservation-note">You will continue securely to Booking.com to view live prices, room availability and complete your reservation. BENARIAN may earn a commission from eligible bookings at no additional cost to you.</p></div>`;
  hero.insertAdjacentElement('afterend', section);
  const form = section.querySelector('form');
  const checkin = form.elements.checkin, checkout = form.elements.checkout;
  checkin.addEventListener('change', () => { if (!checkin.value) return; const d = new Date(`${checkin.value}T00:00:00`); d.setDate(d.getDate()+1); checkout.min=iso(d); if (!checkout.value || checkout.value <= checkin.value) checkout.value=iso(d); });
  form.addEventListener('submit', event => { event.preventDefault(); const destination=form.elements.destination.value.trim(); if(!destination){form.elements.destination.focus();return;} const sid=encodeURIComponent(`hotels-page|${destination}|${checkin.value}|${checkout.value}`); window.open(`${TRACKING_URL}${sid}`,'_blank','noopener'); });
})();