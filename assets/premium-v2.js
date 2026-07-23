(() => {
  if (document.documentElement.dataset.benarianPremiumV2 === 'true') return;
  document.documentElement.dataset.benarianPremiumV2 = 'true';

  const current = location.pathname.split('/').pop() || 'index.html';

  if (!document.querySelector('.benarian-trust-strip')) {
    const trust = document.createElement('section');
    trust.className = 'benarian-trust-strip';
    trust.setAttribute('aria-label', 'Why travel with BENARIAN');
    trust.innerHTML = `
      <div class="benarian-trust-item"><strong>Curated Stays</strong><span>Selected luxury hotels and resorts</span></div>
      <div class="benarian-trust-item"><strong>Personal Support</strong><span>Travel assistance through BENARIAN</span></div>
      <div class="benarian-trust-item"><strong>Persian Friendly</strong><span>English and Persian travel guidance</span></div>
      <div class="benarian-trust-item"><strong>Trusted Partners</strong><span>Bookings completed with approved providers</span></div>`;
    const booking = document.querySelector('.booking-search');
    const hero = document.querySelector('.lux-hero');
    if (booking?.parentNode) booking.parentNode.insertBefore(trust, booking.nextSibling);
    else if (hero?.parentNode) hero.parentNode.insertBefore(trust, hero.nextSibling);
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
    nav.innerHTML = items.map(([href, icon, label]) => `<a href="${href}"${current === href ? ' class="current"' : ''}><span aria-hidden="true">${icon}</span>${label}</a>`).join('');
    document.body.appendChild(nav);
  }

  document.querySelectorAll('img:not([decoding])').forEach(img => { img.decoding = 'async'; });
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener');
    link.setAttribute('rel', Array.from(rel).join(' '));
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
