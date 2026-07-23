(() => {
  if (document.documentElement.dataset.benarianPremiumV2 === 'true') return;
  document.documentElement.dataset.benarianPremiumV2 = 'true';

  const current = location.pathname.split('/').pop() || 'index.html';
  const expediaShop = 'https://www.expedia.com.au/shop/benariantravel';
  const hotels = [
    {name:'Adiwana Resort Jembawan',location:'Ubud',image:'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=92&w=1800',type:'Wellness Retreat',description:'A peaceful luxury retreat in the heart of Ubud, surrounded by tropical greenery and a calm wellness atmosphere.'},
    {name:'Mandapa, a Ritz-Carlton Reserve',location:'Ubud',image:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=92&w=1800',type:'Riverfront Reserve',description:'A serene luxury retreat beside the Ayung River, surrounded by rice terraces and tropical forest.'},
    {name:'Bvlgari Resort Bali',location:'Pecatu',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=92&w=1800',type:'Clifftop Luxury',description:'An extraordinary clifftop resort combining refined Italian design with Balinese character and exceptional privacy.'},
    {name:'Alila Villas Uluwatu, Bali',location:'Pecatu',image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=92&w=1800',type:'Private Pool Villas',description:'A striking clifftop retreat celebrated for minimalist architecture, private pool villas and sweeping ocean views.'},
    {name:'The Apurva Kempinski Bali',location:'Nusa Dua',image:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=92&w=1800',type:'Beachfront Resort',description:'A grand beachfront resort known for dramatic architecture, refined rooms and an impressive oceanfront setting.'},
    {name:'Four Seasons Resort Bali at Sayan',location:'Ubud',image:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=92&w=1800',type:'Riverside Retreat',description:'A peaceful riverside retreat surrounded by lush jungle and rice fields with exceptional Four Seasons service.'},
    {name:'The St. Regis Bali Resort',location:'Nusa Dua',image:'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=92&w=1800',type:'Beachfront Elegance',description:'An elegant beachfront resort known for refined service, spacious suites and villas, and a peaceful private-beach setting.'},
    {name:'The Kayon Jungle Resort',location:'Payangan',image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=92&w=1800',type:'Jungle Hideaway',description:'A peaceful jungle retreat near Ubud, known for its dramatic valley setting, layered infinity pools and romantic atmosphere.'},
    {name:'AYANA Resort Bali',location:'Jimbaran',image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=92&w=1800',type:'Cliffside Resort',description:'A spectacular cliffside resort with ocean views, beautiful pools, extensive facilities and a memorable sunset setting.'}
  ];

  if (!document.querySelector('.benarian-skip-link')) {
    const skip = document.createElement('a'); skip.className = 'benarian-skip-link'; skip.href = '#benarian-main'; skip.textContent = 'Skip to main content'; document.body.prepend(skip);
    const main = document.querySelector('main'); if (main && !main.id) main.id = 'benarian-main';
  }

  if (!document.querySelector('.benarian-trust-strip')) {
    const trust = document.createElement('section'); trust.className = 'benarian-trust-strip'; trust.setAttribute('aria-label', 'Why travel with BENARIAN');
    trust.innerHTML = '<div class="benarian-trust-item"><strong>Curated Stays</strong><span>Selected luxury hotels and resorts</span></div><div class="benarian-trust-item"><strong>Personal Support</strong><span>Travel assistance through BENARIAN</span></div><div class="benarian-trust-item"><strong>Persian Friendly</strong><span>English and Persian travel guidance</span></div><div class="benarian-trust-item"><strong>Secure Partner Booking</strong><span>Live rates and booking on approved partner platforms</span></div>';
    const widget = document.querySelector('.benarian-expedia-widget-section'); const hero = document.querySelector('.lux-hero');
    if (widget?.parentNode) widget.parentNode.insertBefore(trust, widget.nextSibling); else if (hero?.parentNode) hero.parentNode.insertBefore(trust, hero.nextSibling);
  }

  const oldBooking = document.querySelector('.booking-search');
  if (oldBooking) oldBooking.style.display = 'none';

  const featured = document.querySelector('.lux-hotel-grid');
  if (featured) {
    featured.innerHTML = hotels.slice(0,6).map(h => `<article class="lux-hotel"><a href="${expediaShop}" target="_blank" rel="noopener sponsored"><div class="lux-hotel-image"><img src="${h.image}" alt="Editorial luxury travel image for ${h.name}" loading="lazy"><span class="lux-hotel-badge">${h.location.toUpperCase()}</span></div><div class="lux-hotel-copy"><span>${h.type}</span><h3>${h.name}</h3><p>${h.location}, Bali</p><strong>View live price on Expedia →</strong></div></a></article>`).join('');
    const sectionTitle = document.querySelector('.hotels-section .lux-title'); if (sectionTitle) sectionTitle.textContent = 'Expedia Luxury Collection';
    const viewAll = document.querySelector('.hotels-section .lux-view'); if (viewAll) { viewAll.href = expediaShop; viewAll.target = '_blank'; viewAll.rel = 'noopener sponsored'; viewAll.textContent = 'Explore all on Expedia →'; }
  }

  const weekendSection = document.querySelector('.benarian-market-section[aria-labelledby="weekend-deals-title"]');
  if (weekendSection) {
    const heading = weekendSection.querySelector('.market-heading p'); if (heading) heading.textContent = 'Real Bali hotels from the BENARIAN Expedia collection. Live prices, availability, verified ratings and cancellation terms are shown securely on Expedia.';
    const headingLink = weekendSection.querySelector('.market-view-all'); if (headingLink) { headingLink.href = expediaShop; headingLink.target = '_blank'; headingLink.rel = 'noopener sponsored'; headingLink.textContent = 'Explore BENARIAN on Expedia →'; }
    weekendSection.querySelectorAll('.market-card').forEach((card,index) => {
      const h = hotels[index + 2] || hotels[index];
      const img = card.querySelector('img'); if (img) { img.src = h.image; img.alt = `Editorial luxury travel image for ${h.name}`; }
      const badge = card.querySelector('.market-badge'); if (badge) badge.textContent = h.location.toUpperCase();
      const type = card.querySelector('.market-type'); if (type) type.textContent = h.type;
      const title = card.querySelector('h3'); if (title) title.textContent = h.name;
      const rating = card.querySelector('.market-rating'); if (rating) rating.innerHTML = `<b>LIVE</b><span>Price & availability on Expedia</span>`;
      const small = card.querySelector('.market-card-foot small'); if (small) small.textContent = `${h.location}, Bali`;
      const strong = card.querySelector('.market-card-foot strong'); if (strong) strong.textContent = 'Check live price';
      card.querySelectorAll('a').forEach(a => { a.href = expediaShop; a.target = '_blank'; a.rel = 'noopener sponsored'; if (/View/.test(a.textContent)) a.textContent = 'View on Expedia →'; });
    });
  }

  const hotelGrid = document.querySelector('.hotel-grid-pro');
  if (hotelGrid) {
    hotelGrid.innerHTML = hotels.map(h => `<article class="hotel-pro-card"><div class="hotel-pro-image"><img src="${h.image}" alt="Editorial luxury travel image for ${h.name}" loading="lazy"><span class="hotel-badge">${h.location.toUpperCase()}</span><span class="hotel-score">LIVE</span></div><div class="hotel-pro-body"><h3>${h.name}</h3><div class="hotel-location">${h.location}, Bali</div><p class="hotel-description">${h.description}</p><div class="hotel-book"><small>Live price, rooms, availability, verified guest ratings and cancellation terms are shown on Expedia.</small><a class="btn" href="${expediaShop}" target="_blank" rel="noopener sponsored">VIEW LIVE PRICE</a></div></div></article>`).join('');
    const searchAll = document.querySelector('.hotel-intro .btn'); if (searchAll) { searchAll.href = expediaShop; searchAll.target = '_blank'; searchAll.rel = 'noopener sponsored'; searchAll.textContent = 'SEARCH ALL HOTELS ON EXPEDIA'; }
    const intro = document.querySelector('.hotel-intro p'); if (intro) intro.textContent = 'Explore the real hotels currently curated in the BENARIAN Expedia Travel Shop. Live prices and availability are confirmed securely on Expedia.';
    const disclosure = document.querySelector('.booking-disclosure'); if (disclosure) disclosure.textContent = 'Live prices, room availability, verified guest ratings, taxes and cancellation terms are provided by Expedia. Display photography is editorial and may not be an official property image. BENARIAN may earn a commission from eligible bookings.';
  }

  if (!document.querySelector('.benarian-mobile-nav')) {
    const nav = document.createElement('nav'); nav.className = 'benarian-mobile-nav'; nav.setAttribute('aria-label', 'BENARIAN mobile navigation');
    const items = [['index.html','⌂','Home'],['hotels.html','▦','Hotels'],['iran-flights.html','✈','Flights'],['visa-guide.html','◇','Visa'],['member-login.html','♙','Account']];
    nav.innerHTML = items.map(([href,icon,label]) => `<a href="${href}"${current === href ? ' class="current" aria-current="page"' : ''}><span aria-hidden="true">${icon}</span>${label}</a>`).join(''); document.body.appendChild(nav);
  }

  document.querySelectorAll('img').forEach(img => { if (!img.decoding) img.decoding = 'async'; if (!img.loading) img.loading = 'lazy'; img.addEventListener('error', () => img.classList.add('benarian-image-error'), {once:true}); });
  document.querySelectorAll('a[target="_blank"]').forEach(link => { const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean)); rel.add('noopener'); link.setAttribute('rel', Array.from(rel).join(' ')); });
  document.querySelectorAll('.lux-concierge a').forEach(link => { if (/whatsapp/i.test(link.textContent || '')) { link.href = 'https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%20need%20assistance%20with%20my%20travel%20booking.'; link.target = '_blank'; link.rel = 'noopener'; link.textContent = '◉ Travel Assistant'; } });
  document.querySelectorAll('.copyright').forEach(el => { el.textContent = el.textContent.replace(/©\s*\d{4}/, `© ${new Date().getFullYear()}`); });

  // Restore Terms & Conditions visibly in every footer.
  document.querySelectorAll('.footer').forEach(footer => {
    const support = Array.from(footer.querySelectorAll('div')).find(group => /Support/i.test(group.querySelector('strong')?.textContent || ''));
    if (support && !support.querySelector('a[href="terms-and-conditions.html"]')) {
      const terms = document.createElement('a');
      terms.href = 'terms-and-conditions.html';
      terms.textContent = 'Terms & Conditions';
      terms.style.display = 'block';
      terms.style.marginTop = '8px';
      const privacy = support.querySelector('a[href="privacy-policy.html"]');
      if (privacy) support.insertBefore(terms, privacy); else support.appendChild(terms);
    }
  });

  // Make the main hotel search reliable on iPhone/Safari and avoid popup blocking.
  const hotelSearchForm = document.querySelector('.benarian-expedia-direct-form');
  if (hotelSearchForm && !hotelSearchForm.dataset.benarianSearchFixed) {
    hotelSearchForm.dataset.benarianSearchFixed = 'true';
    hotelSearchForm.setAttribute('action', 'https://www.expedia.com.au/Hotel-Search');
    hotelSearchForm.setAttribute('method', 'get');
    const submitButton = hotelSearchForm.querySelector('button');
    if (submitButton) submitButton.type = 'submit';
    hotelSearchForm.addEventListener('submit', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const destination = (hotelSearchForm.elements.destination?.value || '').trim();
      const checkin = hotelSearchForm.elements.checkin?.value || '';
      const checkout = hotelSearchForm.elements.checkout?.value || '';
      if (!destination) {
        hotelSearchForm.elements.destination?.focus();
        return;
      }
      const params = new URLSearchParams({ destination });
      if (checkin) params.set('startDate', checkin);
      if (checkout) params.set('endDate', checkout);
      const targetUrl = `https://www.expedia.com.au/Hotel-Search?${params.toString()}`;
      window.location.href = targetUrl;
    }, true);
  }

  const menu = document.querySelector('.menu-btn'); const desktopNav = document.querySelector('.header .nav');
  if (menu && desktopNav && !menu.dataset.premiumBound) { menu.dataset.premiumBound = 'true'; menu.addEventListener('click', () => { const expanded = desktopNav.classList.contains('open'); menu.setAttribute('aria-expanded', String(expanded)); }); }
})();