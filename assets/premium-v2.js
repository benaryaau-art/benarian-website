(() => {
  if (document.documentElement.dataset.benarianPremiumV2 === 'true') return;
  document.documentElement.dataset.benarianPremiumV2 = 'true';

  const current = location.pathname.split('/').pop() || 'index.html';

  if (!document.querySelector('.benarian-skip-link')) {
    const skip = document.createElement('a');
    skip.className = 'benarian-skip-link';
    skip.href = '#benarian-main';
    skip.textContent = 'Skip to main content';
    document.body.prepend(skip);
    const main = document.querySelector('main');
    if (main && !main.id) main.id = 'benarian-main';
  }

  if (!document.querySelector('.benarian-trust-strip')) {
    const trust = document.createElement('section');
    trust.className = 'benarian-trust-strip';
    trust.setAttribute('aria-label', 'Why travel with BENARIAN');
    trust.innerHTML = `
      <div class="benarian-trust-item"><strong>Curated Stays</strong><span>Selected luxury hotels and resorts</span></div>
      <div class="benarian-trust-item"><strong>Personal Support</strong><span>Travel assistance through BENARIAN</span></div>
      <div class="benarian-trust-item"><strong>Persian Friendly</strong><span>English and Persian travel guidance</span></div>
      <div class="benarian-trust-item"><strong>Trusted Partners</strong><span>Final bookings handled by approved providers</span></div>`;
    const booking = document.querySelector('.booking-search');
    const hero = document.querySelector('.lux-hero');
    if (booking?.parentNode) booking.parentNode.insertBefore(trust, booking.nextSibling);
    else if (hero?.parentNode) hero.parentNode.insertBefore(trust, hero.nextSibling);
  }

  const bookingSearch = document.querySelector('.booking-search');
  if (bookingSearch && !bookingSearch.querySelector('.benarian-booking-note')) {
    const note = document.createElement('div');
    note.className = 'benarian-booking-note';
    note.innerHTML = '<span aria-hidden="true">✓</span><strong>Secure partner booking</strong><small>Live prices, availability and final confirmation are provided by our approved booking partners.</small>';
    bookingSearch.appendChild(note);
  }

  if (!document.querySelector('.benarian-mobile-nav')) {
    const nav = document.createElement('nav');
    nav.className = 'benarian-mobile-nav';
    nav.setAttribute('aria-label', 'BENARIAN mobile navigation');
    const items = [
      ['index.html', '⌂', 'Home'],
      ['hotels.html', '▦', 'Hotels'],
      ['iran-flights.html', '✈', 'Flights'],
      ['visa-guide.html', '◇', 'Visa'],
      ['member-login.html', '♙', 'Account']
    ];
    nav.innerHTML = items.map(([href, icon, label]) => `<a href="${href}"${current === href ? ' class="current" aria-current="page"' : ''}><span aria-hidden="true">${icon}</span>${label}</a>`).join('');
    document.body.appendChild(nav);
  }

  const heroImages = new Set(Array.from(document.querySelectorAll('.lux-hero img,.page-hero img')));
  document.querySelectorAll('img').forEach(img => {
    if (!img.decoding) img.decoding = 'async';
    if (!heroImages.has(img) && !img.loading) img.loading = 'lazy';
    img.addEventListener('error', () => img.classList.add('benarian-image-error'), { once: true });
  });

  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener');
    link.setAttribute('rel', Array.from(rel).join(' '));
  });

  document.querySelectorAll('.lux-concierge a').forEach(link => {
    if (/whatsapp/i.test(link.textContent || '')) {
      link.href = 'https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%20need%20assistance%20with%20my%20travel%20booking.';
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = '◉ Travel Assistant';
    }
  });

  document.querySelectorAll('.copyright').forEach(el => {
    el.textContent = el.textContent.replace(/©\s*\d{4}/, `© ${new Date().getFullYear()}`);
  });

  const menu = document.querySelector('.menu-btn');
  const desktopNav = document.querySelector('.header .nav');
  if (menu && desktopNav && !menu.dataset.premiumBound) {
    menu.dataset.premiumBound = 'true';
    menu.addEventListener('click', () => {
      const expanded = desktopNav.classList.contains('open');
      menu.setAttribute('aria-expanded', String(expanded));
    });
  }
})();