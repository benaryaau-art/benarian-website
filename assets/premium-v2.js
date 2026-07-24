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
    if (checkin) {
      const [year, month, day] = checkin.split('-');
      params.set('checkin', checkin);
      params.set('checkin_year', year); params.set('checkin_month', month); params.set('checkin_monthday', day);
    }
    if (checkout) {
      const [year, month, day] = checkout.split('-');
      params.set('checkout', checkout);
      params.set('checkout_year', year); params.set('checkout_month', month); params.set('checkout_monthday', day);
    }
    params.set('group_adults', '2'); params.set('no_rooms', '1'); params.set('group_children', '0');
    return `${bookingSearchBase}?${params.toString()}`;
  };

  const affiliateUrl = target => `${affiliateBase}${affiliateBase.includes('?') ? '&' : '?'}url=${encodeURIComponent(target)}`;
  const hotelUrl = name => affiliateUrl(bookingTarget(name));

  const showHotelSections = () => {
    ['.booking-search','.home-lux .hotels-section','.home-lux .benarian-home-collection','.home-lux .benarian-market-section[aria-labelledby="weekend-deals-title"]','.home-lux .weekend-deals','.home-lux .featured-hotels','.home-lux .hotel-grid','.home-lux .hotel-grid-pro'].forEach(selector => {
      document.querySelectorAll(selector).forEach(section => {
        section.style.removeProperty('display');
        section.removeAttribute('aria-hidden');
      });
    });
  };

  const restoreDesktopHotelsNav = () => {
    document.querySelectorAll('.header .nav').forEach(nav => {
      if (nav.querySelector('a[href="hotels.html"]')) return;
      const link = document.createElement('a');
      link.href = 'hotels.html'; link.textContent = 'HOTELS';
      const destinations = nav.querySelector('a[href="destinations.html"]');
      destinations ? destinations.insertAdjacentElement('afterend', link) : nav.prepend(link);
    });
  };

  const bindHomeSearch = () => {
    document.querySelectorAll('.booking-form,.benarian-expedia-direct-form').forEach(form => {
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
    if (!nav) { nav = document.createElement('nav'); nav.className = 'benarian-mobile-nav'; nav.setAttribute('aria-label','BENARIAN mobile navigation'); document.body.appendChild(nav); }
    const items = [['index.html','⌂','Home'],['hotels.html','▦','Hotels'],['iran-flights.html','✈','Flights'],['visa-guide.html','◇','Visa'],['member-login.html','♙','Account']];
    nav.innerHTML = items.map(([href,icon,label]) => `<a href="${href}"${current === href ? ' class="current" aria-current="page"' : ''}><span aria-hidden="true">${icon}</span>${label}</a>`).join('');
  };

  const apply = () => {
    showHotelSections(); restoreDesktopHotelsNav(); bindHomeSearch(); convertExpediaContent(); improveFeaturedLinks(); ensureMobileNav();
  };

  apply();
  [300,700,1200,1800,2600].forEach(delay => setTimeout(apply, delay));
})();