(() => {
  if (document.documentElement.dataset.benarianBookingHotels === 'true') return;
  document.documentElement.dataset.benarianBookingHotels = 'true';

  const current = location.pathname.split('/').pop() || 'index.html';
  const booking = window.BENARIAN_PARTNERS?.booking || {};
  const affiliateBase = booking.affiliateBaseUrl || 'https://www.kqzyfj.com/click-101828630-17289006';
  const bookingSearchBase = booking.baseUrl || 'https://www.booking.com/searchresults.html';

  const bookingTarget = (destination = '', checkin = '', checkout = '') => {
    const params = new URLSearchParams();
    if (destination) params.set('ss', destination);
    if (checkin) params.set('checkin', checkin);
    if (checkout) params.set('checkout', checkout);
    params.set('group_adults', '2'); params.set('no_rooms', '1'); params.set('group_children', '0');
    return `${bookingSearchBase}?${params.toString()}`;
  };
  const affiliateUrl = target => `${affiliateBase}${affiliateBase.includes('?') ? '&' : '?'}url=${encodeURIComponent(target)}`;
  const hotelUrl = name => affiliateUrl(bookingTarget(name));

  const showHotelSections = () => {
    ['.booking-search','.home-lux .hotels-section','.home-lux .benarian-home-collection','.home-lux .benarian-market-section[aria-labelledby="weekend-deals-title"]','.home-lux .weekend-deals','.home-lux .featured-hotels','.home-lux .hotel-grid','.home-lux .hotel-grid-pro'].forEach(selector => {
      document.querySelectorAll(selector).forEach(section => { section.style.removeProperty('display'); section.removeAttribute('aria-hidden'); });
    });
  };

  const restoreDesktopNav = () => {
    document.querySelectorAll('.header .nav').forEach(nav => {
      if (!nav.querySelector('a[href="hotels.html"]')) {
        const link = document.createElement('a'); link.href='hotels.html'; link.textContent='HOTELS';
        const destinations = nav.querySelector('a[href="destinations.html"]');
        destinations ? destinations.insertAdjacentElement('afterend', link) : nav.prepend(link);
      }
      if (!nav.querySelector('a[href="flights.html"]')) {
        const link = document.createElement('a'); link.href='flights.html'; link.textContent='FLIGHTS';
        const hotels = nav.querySelector('a[href="hotels.html"]');
        hotels ? hotels.insertAdjacentElement('afterend', link) : nav.appendChild(link);
      }
    });
  };

  const bindHomeSearch = () => {
    document.querySelectorAll('.booking-form').forEach(form => {
      if (form.dataset.bookingBound === 'true') return;
      form.dataset.bookingBound = 'true';
      form.addEventListener('submit', event => {
        event.preventDefault(); event.stopImmediatePropagation();
        const destination = (form.querySelector('[name="destination"],#destination')?.value || '').trim();
        const checkin = form.querySelector('[name="checkin"],#checkin')?.value || '';
        const checkout = form.querySelector('[name="checkout"],#checkout')?.value || '';
        if (!destination) return;
        window.open(affiliateUrl(bookingTarget(destination, checkin, checkout)), '_blank', 'noopener');
      }, true);
    });
  };

  const installLuxuryHomeHotelSearch = () => {
    if (!document.body.classList.contains('home-lux')) return;
    const section = document.querySelector('#official-booking-search') || document.querySelector('.booking-search');
    if (!section || section.dataset.luxuryCustomSearch === 'true') return;
    section.dataset.luxuryCustomSearch = 'true';
    section.id = 'official-booking-search';
    section.className = 'booking-widget-section benarian-custom-hotel-search';

    if (!document.getElementById('benarian-custom-hotel-search-style')) {
      const style = document.createElement('style');
      style.id = 'benarian-custom-hotel-search-style';
      style.textContent = `
        .benarian-custom-hotel-search{position:relative!important;padding:0 0 68px!important;margin:0!important;background:radial-gradient(circle at 50% 0,#2a2118 0,#17120e 46%,#0d0a08 100%)!important;border-top:1px solid rgba(185,130,44,.72)!important;border-bottom:1px solid rgba(185,130,44,.72)!important;overflow:hidden!important;color:#fff!important}
        .benarian-custom-hotel-search:before{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 0,rgba(207,151,55,.035) 48%,transparent 100%);pointer-events:none}
        .benarian-custom-hotel-search:after{content:none!important;display:none!important}
        .benarian-domain-pill{position:relative;width:max-content;margin:0 auto 30px;padding:9px 24px;border:1px solid rgba(205,151,67,.24);border-radius:999px;background:rgba(45,35,26,.66);color:#f4eee6;font-size:12px;font-weight:500;letter-spacing:.15px;box-shadow:none!important;text-shadow:none!important}
        .benarian-custom-heading{position:relative;text-align:center;max-width:720px;margin:0 auto;padding:0 26px}
        .benarian-custom-heading .eyebrow{display:block;color:#ddb25c!important;font-size:8.5px!important;font-weight:700!important;letter-spacing:3.5px!important;margin-bottom:16px!important;text-shadow:none!important}
        .benarian-custom-heading h2{font:500 clamp(38px,5vw,56px)/1 'Cormorant Garamond',Georgia,serif!important;color:#d8b773!important;margin:0 0 20px!important;letter-spacing:-.5px!important;text-shadow:none!important}
        .benarian-custom-heading p{max-width:610px;margin:0 auto 34px!important;color:#e9e0d4!important;font-size:14px!important;line-height:1.7!important;font-weight:400!important}
        .benarian-luxury-form{position:relative;max-width:600px;margin:0 auto;padding:20px 21px 21px;background:linear-gradient(180deg,#fff,#fffaf1);border:1px solid #cfa14d;border-radius:18px;box-shadow:0 18px 44px rgba(0,0,0,.28);overflow:hidden}
        .benarian-luxury-field{display:block;text-align:left;margin-bottom:14px;min-width:0;overflow:hidden}
        .benarian-luxury-field span{display:block;margin:0 0 7px;color:#8a6225;font-size:9px;font-weight:700;letter-spacing:1.8px}
        .benarian-luxury-field input{display:block;box-sizing:border-box!important;width:100%!important;max-width:100%!important;min-width:0!important;height:62px;padding:0 18px;border:1px solid #decfb7!important;border-radius:9px!important;background:#fff!important;color:#17130f!important;font-size:17px!important;font-weight:400!important;box-shadow:none!important}
        .benarian-luxury-field input::placeholder{color:#b4b0ab!important}
        .benarian-luxury-form button{width:100%;height:58px;margin-top:2px;border:1px solid #c9983d!important;border-radius:9px!important;background:linear-gradient(180deg,#c9973d,#a96f1b)!important;color:#fff8ea!important;font-size:11.5px!important;font-weight:700!important;letter-spacing:.55px!important;cursor:pointer!important;box-shadow:0 10px 24px rgba(169,111,27,.22)!important}
        .benarian-luxury-form button:hover{filter:brightness(.97)!important}
        .benarian-custom-disclosure{position:relative;max-width:600px;margin:23px auto 0!important;padding:0 24px;color:#b0a598!important;text-align:center;font-size:10px!important;line-height:1.7!important}
        .benarian-official-link{position:relative;display:block;width:max-content;max-width:calc(100% - 40px);margin:21px auto 0;padding:0 0 5px;border-bottom:1px solid rgba(198,146,61,.72);color:#d7aa55!important;text-align:center;text-decoration:none;font-size:10.5px;font-weight:700;letter-spacing:.25px}
        @media(max-width:760px){
          .home-lux .benarian-quick-access{display:none!important}
          .benarian-custom-hotel-search{padding-bottom:44px!important}
          .benarian-domain-pill{margin-bottom:26px;padding:8px 21px;font-size:11px}
          .benarian-custom-heading{padding:0 10px}
          .benarian-custom-heading .eyebrow{font-size:8px!important;letter-spacing:3px!important;margin-bottom:15px!important}
          .benarian-custom-heading h2{font-size:31px!important;line-height:1!important;margin-bottom:20px!important;white-space:nowrap!important;letter-spacing:-.8px!important}
          .benarian-custom-heading p{font-size:13px!important;line-height:1.68!important;margin-bottom:28px!important}
          .benarian-luxury-form{width:auto!important;max-width:none!important;margin:0 34px;padding:18px 20px 20px;border-radius:17px;overflow:hidden}
          .benarian-luxury-field{margin-bottom:13px;min-width:0;overflow:hidden}
          .benarian-luxury-field input{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;height:72px;font-size:17px!important;text-align:center;-webkit-appearance:none!important;appearance:none!important}
          .benarian-luxury-field:first-child input{text-align:left}
          .benarian-luxury-form button{height:60px;font-size:11px!important}
          .benarian-custom-disclosure{font-size:9.5px!important;margin-top:22px!important}
          .benarian-official-link{font-size:10px;margin-top:20px}
        }
        @media(max-width:390px){.benarian-luxury-form{margin-left:22px;margin-right:22px}.benarian-custom-heading h2{font-size:28px!important}.benarian-luxury-field input{height:68px}}
      `;
      document.head.appendChild(style);
    }

    const today = new Date();
    const checkinDate = new Date(today); checkinDate.setDate(today.getDate() + 1);
    const checkoutDate = new Date(today); checkoutDate.setDate(today.getDate() + 2);
    const iso = date => date.toISOString().slice(0,10);

    section.innerHTML = `
      <div class="benarian-domain-pill">benarian.com</div>
      <div class="benarian-custom-heading">
        <span class="eyebrow">BOOKING.COM OFFICIAL HOTEL RESERVATIONS</span>
        <h2>Search &amp; Book Your Stay</h2>
        <p>Choose your destination and travel dates, then continue securely through BENARIAN’s official Booking.com affiliate connection.</p>
      </div>
      <form class="benarian-luxury-form" aria-label="Search hotels on Booking.com">
        <label class="benarian-luxury-field"><span>DESTINATION</span><input id="destination" name="destination" type="text" placeholder="Bali, Phuket, Dubai…" required></label>
        <label class="benarian-luxury-field"><span>CHECK-IN</span><input id="checkin" name="checkin" type="date" value="${iso(checkinDate)}" required></label>
        <label class="benarian-luxury-field"><span>CHECK-OUT</span><input id="checkout" name="checkout" type="date" value="${iso(checkoutDate)}" required></label>
        <button type="submit">SEARCH ON BOOKING.COM →</button>
      </form>
      <p class="benarian-custom-disclosure">You will continue securely to Booking.com to view live prices, room availability and complete your reservation. BENARIAN may earn a commission from eligible bookings at no additional cost to you.</p>
      <a class="benarian-official-link" href="${affiliateUrl(bookingTarget('Luxury hotels'))}" target="_blank" rel="noopener sponsored">Open Booking.com hotel search</a>
    `;

    const form = section.querySelector('.benarian-luxury-form');
    form?.addEventListener('submit', event => {
      event.preventDefault();
      const destination = form.destination.value.trim();
      if (!destination) { form.destination.focus(); return; }
      window.open(affiliateUrl(bookingTarget(destination, form.checkin.value, form.checkout.value)), '_blank', 'noopener');
    });
  };

  const convertExpediaContent = () => {
    document.querySelectorAll('a[href*="expedia.com"]').forEach(link => {
      const card = link.closest('.hotel-card,.lux-hotel,.market-card,.hotel-pro-card,.benarian-featured-card');
      const hotelName = card?.querySelector('h3')?.textContent?.trim();
      link.href = hotelName ? hotelUrl(hotelName) : affiliateUrl(bookingTarget('Luxury hotels'));
      link.target = '_blank'; link.rel = 'noopener sponsored';
      link.textContent = (link.textContent || '').replace(/EXPEDIA/gi, 'BOOKING.COM');
    });
    document.querySelectorAll('body *').forEach(el => {
      if (el.children.length === 0 && /Expedia/.test(el.textContent || '')) el.textContent = el.textContent.replace(/Expedia/g, 'Booking.com');
    });
  };

  const improveFeaturedLinks = () => {
    document.querySelectorAll('.lux-hotel,.market-card,.hotel-pro-card,.benarian-featured-card').forEach(card => {
      const name = card.querySelector('h3')?.textContent?.trim();
      if (!name) return;
      card.querySelectorAll('a').forEach(link => { link.href = hotelUrl(name); link.target = '_blank'; link.rel = 'noopener sponsored'; });
    });
  };

  const ensureMobileNav = () => {
    let nav = document.querySelector('.benarian-mobile-nav');
    if (!nav) { nav = document.createElement('nav'); nav.className='benarian-mobile-nav'; nav.setAttribute('aria-label','BENARIAN mobile navigation'); document.body.appendChild(nav); }
    const items = [['index.html','⌂','Home'],['hotels.html','▦','Hotels'],['flights.html','✈','Flights'],['visa-guide.html','◇','Visa'],['member-login.html','♙','Account']];
    nav.innerHTML = items.map(([href,icon,label]) => `<a href="${href}"${current===href?' class="current" aria-current="page"':''}><span aria-hidden="true">${icon}</span>${label}</a>`).join('');
  };

  const apply = () => { showHotelSections(); restoreDesktopNav(); bindHomeSearch(); installLuxuryHomeHotelSearch(); convertExpediaContent(); improveFeaturedLinks(); ensureMobileNav(); };
  apply();
  [250,500,900,1400,2200].forEach(delay => setTimeout(apply, delay));
})();