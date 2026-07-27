(() => {
  const hero = document.querySelector('.hotels-hero');
  if (!hero || document.querySelector('#benarian-hotels-reservation')) return;

  const HOTEL_TRACKING_URL = 'https://www.kqzyfj.com/click-101828630-17289006';

  const bookingSearch = query => {
    const target = new URL('https://www.booking.com/searchresults.html');
    target.searchParams.set('ss', query || 'Luxury hotels');
    target.searchParams.set('selected_currency', 'AUD');
    target.searchParams.set('lang', 'en-us');
    return target.toString();
  };

  const deepLink = target => `${HOTEL_TRACKING_URL}?url=${encodeURIComponent(target)}`;

  const style = document.createElement('style');
  style.id = 'benarian-hotels-booking-style';
  style.textContent = `
    .hotels-hero{position:relative}
    .hotels-best-price{margin-top:26px;max-width:660px;padding:18px 20px;border:1px solid rgba(230,181,84,.82);border-radius:14px;background:rgba(15,12,8,.78);backdrop-filter:blur(8px);box-shadow:0 14px 40px rgba(0,0,0,.24);box-sizing:border-box}
    .hotels-best-price strong{display:block;color:#f4d38b;font:600 22px/1.2 'Cormorant Garamond',Georgia,serif;margin-bottom:5px}.hotels-best-price span{display:block;color:#fff;font:500 13px/1.6 Inter,Arial,sans-serif}.hotels-best-price .fa{margin-top:3px;color:#f2d7a0;direction:rtl;text-align:left}.hotels-best-price a{display:inline-flex;margin-top:14px;padding:12px 18px;border-radius:9px;background:#c58c28;color:#fff;text-decoration:none;font:700 11px Inter,Arial,sans-serif;letter-spacing:.7px}
    #benarian-hotels-reservation{position:relative;padding:54px 6% 44px;background:radial-gradient(circle at top,#2a2118 0,#17130e 55%,#0e0b08 100%);border-top:1px solid #c8953d;border-bottom:1px solid #c8953d;color:#fff;scroll-margin-top:90px;overflow:hidden}.hotels-reservation-inner{max-width:1080px;width:100%;margin:auto;text-align:center;box-sizing:border-box}.hotels-reservation-kicker{display:block;color:#d7a544;font:800 10px Inter,Arial,sans-serif;letter-spacing:3px;margin-bottom:10px}.hotels-reservation-inner h2{margin:0;color:#f4dfb6;font:600 clamp(34px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}.hotels-reservation-intro{max-width:760px;margin:14px auto 26px;color:#d6cab8;font:400 14px/1.7 Inter,Arial,sans-serif}
    .hotels-booking-form{display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:12px;align-items:end;width:100%;background:#fff;border:1px solid #c9953f;border-radius:18px;padding:20px;box-shadow:0 22px 60px rgba(0,0,0,.4);text-align:left;box-sizing:border-box}.hotels-booking-form>*{min-width:0;box-sizing:border-box}.hotels-booking-form label{display:block;color:#8d6424;font:800 9px/1 Inter,Arial,sans-serif;letter-spacing:1.2px}.hotels-booking-form input{display:block;width:100%;margin-top:8px;padding:14px 12px;border:1px solid #cfc7bb;border-radius:8px;background:#fff;color:#17130e;font:500 14px Inter,Arial,sans-serif;box-sizing:border-box}.hotels-booking-form button{min-height:48px;padding:13px 22px;border:0;border-radius:8px;background:#17130e;color:#fff;font:800 11px Inter,Arial,sans-serif;letter-spacing:.8px;cursor:pointer;white-space:nowrap}.hotels-reservation-note{margin:15px auto 0!important;color:#b7aa98!important;font:400 10px/1.7 Inter,Arial,sans-serif!important;max-width:820px}
    .booking-partner-strip{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;padding:17px 6%;background:#fff8eb;border-bottom:1px solid #e5d1aa;text-align:center}.booking-partner-strip span{font-size:9px;font-weight:800;letter-spacing:1.7px;color:#96651b}.booking-partner-strip strong{font:600 23px 'Cormorant Garamond',Georgia,serif;color:#211b15}.booking-partner-strip small{font-size:11px;color:#6d6255}
    @media(max-width:760px){.hotels-best-price{width:100%;padding:16px}.hotels-best-price strong{font-size:20px}#benarian-hotels-reservation{padding:40px 12px 34px}.hotels-reservation-inner h2{font-size:34px}.hotels-booking-form{display:block;padding:14px}.hotels-booking-form label{margin:0 0 16px}.hotels-booking-form input{height:52px;font-size:16px}.hotels-booking-form button{display:block;width:100%;white-space:normal}.booking-partner-strip{align-items:flex-start;flex-direction:column;text-align:left;padding:17px 20px;gap:5px}}
  `;
  document.head.appendChild(style);

  const heroCopy = hero.querySelectorAll('p');
  if (heroCopy.length) heroCopy[heroCopy.length - 1].textContent = 'Explore BENARIAN’s curated hotel collection, then view live availability and complete your reservation securely through Booking.com.';

  const priceBox = document.createElement('div');
  priceBox.className = 'hotels-best-price';
  priceBox.innerHTML = `<strong>Find live hotel availability with Booking.com</strong><span>BENARIAN presents the collection; Booking.com confirms current prices and completes the reservation.</span><span class="fa" lang="fa" dir="rtl">قیمت و ظرفیت زنده را در Booking.com بررسی و رزرو را امن تکمیل کنید</span><a href="#benarian-hotels-reservation">SEARCH &amp; BOOK HOTELS →</a>`;
  hero.appendChild(priceBox);

  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(); dayAfter.setDate(dayAfter.getDate() + 2);
  const iso = date => date.toISOString().slice(0, 10);

  const section = document.createElement('section');
  section.id = 'benarian-hotels-reservation';
  section.innerHTML = `<div class="hotels-reservation-inner"><span class="hotels-reservation-kicker">BOOKING.COM AFFILIATE SEARCH</span><h2>Search &amp; Book Your Stay</h2><p class="hotels-reservation-intro">Choose your destination and dates. Live rates, room availability, payment and booking confirmation are provided securely by Booking.com.</p><form class="hotels-booking-form"><label>DESTINATION<input name="destination" type="text" placeholder="Hotel or destination" required></label><label>CHECK-IN<input name="checkin" type="date" min="${iso(new Date())}" value="${iso(tomorrow)}" required></label><label>CHECK-OUT<input name="checkout" type="date" min="${iso(tomorrow)}" value="${iso(dayAfter)}" required></label><button type="submit">SEARCH BOOKING.COM →</button></form><p class="hotels-reservation-note">You will continue to Booking.com in a new tab. BENARIAN may earn an affiliate commission from eligible bookings at no additional cost to you.</p></div>`;
  hero.insertAdjacentElement('afterend', section);

  const strip = document.createElement('div');
  strip.className = 'booking-partner-strip';
  strip.innerHTML = '<span>BOOKING PARTNER</span><strong>Curated by BENARIAN · Reserved with Booking.com</strong><small>Live availability opens securely in a new tab.</small>';
  section.insertAdjacentElement('afterend', strip);

  document.querySelectorAll('.hotel-card').forEach(card => {
    const name = card.querySelector('h3')?.textContent?.trim() || '';
    const place = card.querySelector('.hotel-place')?.textContent?.trim() || '';
    const query = [name, place].filter(Boolean).join(', ');
    const button = card.querySelector('.book-btn');
    const note = card.querySelector('small');
    if (button && query) {
      button.href = deepLink(bookingSearch(query));
      button.target = '_blank';
      button.rel = 'noopener sponsored nofollow';
      button.textContent = 'CHECK ON BOOKING.COM';
    }
    if (note) note.textContent = 'Indicative rate only. Booking.com confirms the live price, room conditions and availability for your dates.';
  });

  document.querySelectorAll('.destination-heading > a').forEach(link => {
    const destination = link.closest('.destination-section')?.querySelector('h2')?.textContent?.replace(/^10 selected hotels in\s+/i, '').trim() || 'Luxury hotels';
    link.href = deepLink(bookingSearch(destination));
    link.target = '_blank';
    link.rel = 'noopener sponsored nofollow';
    link.textContent = `Search all ${destination} hotels on Booking.com →`;
  });

  const priceNote = document.querySelector('.price-note');
  if (priceNote) priceNote.innerHTML = '<strong>Booking notice:</strong> BENARIAN curates and presents hotel recommendations. Displayed “from” prices are indicative and are not live quotations. Current rates, taxes, room conditions, availability, payment and the final reservation are provided securely by Booking.com. BENARIAN may earn an affiliate commission from qualifying bookings at no additional cost to you.';

  const form = section.querySelector('.hotels-booking-form');
  const checkin = form.elements.checkin;
  const checkout = form.elements.checkout;
  checkin.addEventListener('change', () => {
    if (!checkin.value) return;
    const minCheckout = new Date(`${checkin.value}T00:00:00`); minCheckout.setDate(minCheckout.getDate() + 1);
    checkout.min = iso(minCheckout);
    if (!checkout.value || checkout.value <= checkin.value) checkout.value = iso(minCheckout);
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const destination = form.elements.destination.value.trim();
    if (!destination) return form.elements.destination.focus();
    window.open(deepLink(bookingSearch(destination)), '_blank', 'noopener');
  });
})();
