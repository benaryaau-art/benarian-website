(() => {
  const FOOTER_HTML = `
    <footer class="footer lux-footer benarian-canonical-footer">
      <div class="benarian-footer-brand-column">
        <a href="index.html" class="benarian-footer-brand" aria-label="BENARIAN home">
          <span class="benarian-footer-mark" aria-hidden="true">BB</span>
          <span class="benarian-footer-copy">
            <strong>BENARIAN</strong>
            <small>LUXURY TRAVEL &amp; HOSPITALITY</small>
          </span>
        </a>
        <div class="benarian-footer-concierge">
          <a class="benarian-footer-live" href="https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%20need%20assistance%20with%20my%20travel%20booking." target="_blank" rel="noopener">
            <span class="live-dot" aria-hidden="true"></span>LIVE CONCIERGE · WHATSAPP
          </a>
          <p>Talk to our team or Ben Tafreshi</p>
        </div>
      </div>
      <div class="benarian-footer-group"><strong>Company</strong><a href="about.html">About Us</a><a href="destinations.html">Destinations</a><a href="experiences.html">Experiences</a><a href="contact.html">Concierge</a></div>
      <div class="benarian-footer-group"><strong>Support</strong><a href="contact.html">Contact &amp; FAQ</a><a href="privacy-policy.html">Privacy Policy</a><a href="affiliate-disclosure.html">Affiliate Disclosure</a><a href="terms-and-conditions.html">Terms &amp; Conditions</a></div>
      <div class="benarian-footer-group"><strong>Follow Us</strong><div class="benarian-socials"><a href="https://www.instagram.com/benarianhotels" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a><a href="mailto:info@benarian.com" aria-label="Email BENARIAN">Email</a></div></div>
      <p class="copyright">© 2026 BENARIAN. Luxury travel recommendations and concierge assistance. Prices and availability are confirmed by the relevant booking partner.</p>
    </footer>`;

  const NAV_HTML = `<a href="destinations.html">DESTINATIONS</a><a href="hotels.html">HOTELS</a><a href="persian-experiences.html">PERSIAN EXPERIENCES</a><a href="restaurants.html">RESTAURANTS</a><a href="experiences.html">EXPERIENCES</a><a href="wellness.html">SPA &amp; WELLNESS</a><a href="visa-guide.html">VISA GUIDE</a><a href="about.html">ABOUT US</a><a href="contact.html">CONTACT</a>`;

  function normalPage(value) {
    return (value || 'index').replace(/^.*\//, '').replace(/\.html$/, '') || 'index';
  }

  function applyCanonicalHeader() {
    document.querySelectorAll('header.header').forEach(header => {
      const brand = header.querySelector('.brand');
      if (brand && !brand.classList.contains('brand-lockup')) {
        brand.className = 'brand brand-lockup';
        brand.setAttribute('aria-label', 'BENARIAN home');
        brand.innerHTML = '<span class="brand-mark" aria-hidden="true">BB</span><span class="brand-copy"><strong>BENARIAN</strong><small>LUXURY TRAVEL &amp; HOSPITALITY</small></span>';
      } else if (brand) {
        const mark = brand.querySelector('.brand-mark');
        if (mark) mark.textContent = 'BB';
      }
      const nav = header.querySelector('.nav');
      if (nav && !nav.dataset.canonicalNav) {
        nav.innerHTML = NAV_HTML;
        nav.dataset.canonicalNav = 'true';
      }
      const menu = header.querySelector('.menu-btn');
      if (menu) {
        menu.setAttribute('aria-label', 'Open navigation menu');
        menu.setAttribute('aria-expanded', 'false');
        if (!menu.dataset.canonicalMenu) {
          menu.addEventListener('click', () => {
            const open = nav?.classList.toggle('open');
            menu.setAttribute('aria-expanded', String(Boolean(open)));
          });
          menu.dataset.canonicalMenu = 'true';
        }
      }
      const current = normalPage(location.pathname);
      nav?.querySelectorAll('a').forEach(a => a.classList.toggle('current', normalPage(a.getAttribute('href')) === current));
    });
  }

  function applyCanonicalFooter() {
    const oldFooter = document.querySelector('footer.footer, footer.lux-footer, body > footer');
    if (!oldFooter || oldFooter.classList.contains('benarian-canonical-footer')) return;
    oldFooter.outerHTML = FOOTER_HTML;
  }

  function clarifyBookingPartners() {
    const hotelHero = document.querySelector('.hotels-hero');
    if (hotelHero) {
      const intro = hotelHero.querySelector('p:not(.eyebrow)');
      if (intro) intro.textContent = 'Explore a curated collection of luxury hotels with indicative nightly prices. Live rates, availability and booking confirmation are provided securely by the booking partner shown on each link.';
    }
    document.querySelectorAll('.price-note').forEach(note => {
      note.innerHTML = '<strong>Important:</strong> Displayed prices are indicative only and may change by date, room type, taxes and availability. The final total and booking terms are always confirmed by the selected booking partner.';
    });
  }

  const style = document.createElement('style');
  style.id = 'benarian-canonical-shell-styles';
  style.textContent = `
    .benarian-canonical-footer{display:grid!important;grid-template-columns:minmax(300px,1.25fr) repeat(3,minmax(130px,.55fr))!important;gap:34px!important;align-items:start!important;padding:54px 6% 38px!important;background:#fbf7ef!important;border-top:1px solid #e3d3b7!important;color:#6d6254!important}
    .benarian-footer-brand-column{display:flex!important;flex-direction:column!important;align-items:flex-start!important;min-width:0!important}.benarian-footer-brand{display:flex!important;align-items:center!important;text-decoration:none!important;min-width:0!important}.benarian-footer-mark{font:600 52px/.75 'Cormorant Garamond',Georgia,serif!important;color:#b9872c!important;letter-spacing:-8px!important;margin-right:20px!important;transform:scaleX(.84)!important}.benarian-footer-copy{display:flex!important;flex-direction:column!important}.benarian-footer-copy strong{font:600 31px/.9 'Cormorant Garamond',Georgia,serif!important;letter-spacing:5px!important;color:#151310!important;white-space:nowrap!important}.benarian-footer-copy small{margin-top:8px!important;font:700 8px/1.2 Inter,Arial,sans-serif!important;letter-spacing:1.45px!important;color:#b9872c!important;white-space:nowrap!important}
    .benarian-footer-concierge{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:8px!important;margin-top:20px!important}.benarian-footer-live{display:inline-flex!important;align-items:center!important;gap:9px!important;padding:11px 15px!important;border:1px solid #c8953d!important;border-radius:999px!important;color:#755f45!important;text-decoration:none!important;font:700 10px Inter,Arial,sans-serif!important;letter-spacing:.9px!important}.live-dot{width:9px!important;height:9px!important;border-radius:50%!important;background:#25d366!important;box-shadow:0 0 0 5px rgba(37,211,102,.14)!important}.benarian-footer-concierge p{margin:0!important;font:500 12px/1.5 Inter,Arial,sans-serif!important;color:#746a5d!important}
    .benarian-footer-group{display:flex!important;flex-direction:column!important;gap:10px!important;min-width:0!important}.benarian-footer-group strong{font:700 14px Inter,Arial,sans-serif!important;color:#211d18!important}.benarian-footer-group a{margin:0!important;color:#766d61!important;text-decoration:none!important;font:400 12px/1.5 Inter,Arial,sans-serif!important}.benarian-footer-group a:hover{color:#9b681a!important}.benarian-socials{display:flex!important;flex-direction:column!important;gap:10px!important}.copyright{grid-column:1/-1!important;margin:12px 0 0!important;padding-top:22px!important;border-top:1px solid #e8dcc7!important;color:#91877a!important;font:400 11px/1.6 Inter,Arial,sans-serif!important}
    @media(max-width:1050px){.header{align-items:center!important}.nav{gap:15px!important}.nav a{font-size:9px!important;letter-spacing:.35px!important}}
    @media(max-width:850px){.benarian-canonical-footer{grid-template-columns:1fr 1fr!important;padding:42px 22px 190px!important;gap:28px 24px!important}.benarian-footer-brand-column{grid-column:1/-1!important}.benarian-footer-group:last-of-type{grid-column:1/-1!important}.benarian-socials{flex-direction:row!important;gap:18px!important}.copyright{grid-column:1/-1!important}.benarian-footer-mark{font-size:47px!important}.benarian-footer-copy strong{font-size:28px!important;letter-spacing:4px!important}}
    @media(max-width:420px){.benarian-canonical-footer{padding-left:20px!important;padding-right:20px!important}.benarian-footer-copy strong{font-size:25px!important;letter-spacing:3.3px!important}.benarian-footer-copy small{font-size:7px!important;letter-spacing:1.1px!important}.benarian-footer-live{font-size:9px!important;max-width:100%!important}}
  `;
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  function applyAll() {
    applyCanonicalHeader();
    applyCanonicalFooter();
    clarifyBookingPartners();
  }
  applyAll();
  new MutationObserver(applyAll).observe(document.documentElement, {childList:true, subtree:true});
})();