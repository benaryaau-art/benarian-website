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
    .hotels-best-price{margin-top:26px;max-width:660px;padding:18px 20px;border:1px solid rgba(231,194,121,.78);border-radius:16px;background:rgba(255,255,255,.94);box-shadow:0 18px 48px rgba(0,0,0,.18);box-sizing:border-box}
    .hotels-best-price strong{display:block;color:#201a14;font:600 24px/1.15 'Cormorant Garamond',Georgia,serif;margin-bottom:7px}
    .hotels-best-price span{display:block;color:#5f564c;font:500 13px/1.65 Inter,Arial,sans-serif}
    .hotels-best-price .fa{margin-top:4px;color:#8c6728;direction:rtl;text-align:left}
    .hotels-best-price a{display:inline-flex;margin-top:15px;padding:12px 18px;border-radius:999px;background:#b9872c;color:#fff;text-decoration:none;font:700 11px Inter,Arial,sans-serif;letter-spacing:.7px}

    #benarian-hotels-reservation{position:relative;padding:70px 6% 62px;background:#fbf7ef;border-top:1px solid #e8dcc7;border-bottom:1px solid #e1d1b6;color:#211b15;scroll-margin-top:90px;overflow:hidden}
    .hotels-reservation-inner{max-width:980px;width:100%;margin:auto;text-align:center;box-sizing:border-box}
    .hotels-reservation-kicker{display:block;color:#a46c18;font:800 10px Inter,Arial,sans-serif;letter-spacing:2.8px;margin-bottom:12px}
    .hotels-reservation-inner h2{margin:0;color:#211b15;font:600 clamp(40px,5vw,62px)/1 'Cormorant Garamond',Georgia,serif}
    .hotels-reservation-intro{max-width:680px;margin:16px auto 30px;color:#62594f;font:400 15px/1.75 Inter,Arial,sans-serif}

    .hotels-booking-form{display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:12px;align-items:end;width:100%;background:#fff;border:1px solid #d6b873;border-radius:20px;padding:20px;box-shadow:0 18px 45px rgba(65,47,24,.10);text-align:left;box-sizing:border-box}
    .hotels-booking-form>*{min-width:0;box-sizing:border-box}
    .hotels-booking-form label{display:block;color:#8d6424;font:800 9px/1 Inter,Arial,sans-serif;letter-spacing:1.2px}
    .hotels-booking-form input{display:block;width:100%;min-width:0;max-width:100%;height:50px;margin-top:8px;padding:0 14px;border:1px solid #d8cdbc;border-radius:10px;background:#fff;color:#17130e;font:500 15px Inter,Arial,sans-serif;box-sizing:border-box;appearance:none;-webkit-appearance:none}
    .hotels-booking-form input:focus{outline:none;border-color:#b9872c;box-shadow:0 0 0 3px rgba(185,135,44,.12)}
    .hotels-booking-form button{min-height:50px;padding:13px 22px;border:0;border-radius:10px;background:#17130e;color:#fff;font:800 11px Inter,Arial,sans-serif;letter-spacing:.8px;cursor:pointer;white-space:nowrap}
    .hotels-booking-form button:hover{background:#b9872c}
    .hotels-reservation-note{margin:16px auto 0!important;color:#7d7368!important;font:400 10px/1.7 Inter,Arial,sans-serif!important;max-width:760px}

    .booking-partner-strip{display:none!important}

    @media(max-width:760px){
      .hotels-best-price{width:100%;padding:17px 16px;border-radius:14px}.hotels-best-price strong{font-size:21px}.hotels-best-price span{font-size:12px}
      #benarian-hotels-reservation{padding:52px 18px 150px;background:#fbf7ef}
      .hotels-reservation-inner h2{font-size:42px;line-height:1.02}
      .hotels-reservation-intro{font-size:14px;line-height:1.7;margin:14px auto 24px;padding:0 4px}
      .hotels-booking-form{display:block;width:100%;padding:16px;border-radius:18px;box-shadow:0 14px 34px rgba(65,47,24,.10)}
      .hotels-booking-form label{display:block;width:100%;margin:0 0 15px}
      .hotels-booking-form input,.hotels-booking-form input[type="date"],.hotels-booking-form input[type="text"]{display:block!important;width:100%!important;min-width:0!important;max-width:100%!important;height:54px!important;margin:8px 0 0!important;padding:0 14px!important;font-size:16px!important;line-height:54px!important;border-radius:10px!important;box-sizing:border-box!important;overflow:hidden!important}
      .hotels-booking-form button{display:block;width:100%;min-height:54px;border-radius:10px;white-space:normal}
      .hotels-reservation-note{font-size:10px!important;line-height:1.65!important;padding:0 8px}
    }
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
  section.innerHTML = `<div class="hotels-reservation-inner"><span class="hotels-reservation-kicker">BOOKING.COM AFFILIATE SEARCH</span><h2>Search &amp; Book Your Stay</h2><p class="hotels-reservation-intro">Live rates, room availability and booking confirmation are provided securely by Booking.com.</p><form class="hotels-booking-form"><label>DESTINATION<input name="destination" type="text" placeholder="Hotel or destination" required></label><label>CHECK-IN<input name="checkin" type="date" min="${iso(new Date())}" value="${iso(tomorrow)}" required></label><label>CHECK-OUT<input name="checkout" type="date" min="${iso(tomorrow)}" value="${iso(dayAfter)}" required></label><button type="submit">SEARCH ON BOOKING.COM →</button></form><p class="hotels-reservation-note">BENARIAN may earn an affiliate commission from eligible bookings at no additional cost to you.</p></div>`;
  hero.insertAdjacentElement('afterend', section);

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
