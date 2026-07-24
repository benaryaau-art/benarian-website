(() => {
  const FOOTER_HTML = `
    <footer class="footer lux-footer benarian-canonical-footer">
      <a href="index.html" class="benarian-footer-brand" aria-label="BENARIAN home">
        <span class="benarian-footer-mark" aria-hidden="true">BB</span>
        <span class="benarian-footer-copy">
          <strong>BENARIAN</strong>
          <small>LUXURY TRAVEL &amp; HOSPITALITY</small>
        </span>
      </a>
      <div class="benarian-footer-concierge">
        <a class="benarian-footer-live" href="https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%20need%20assistance%20with%20my%20travel%20booking." target="_blank" rel="noopener">
          <span class="live-dot" aria-hidden="true"></span><span>LIVE CONCIERGE · WHATSAPP</span>
        </a>
        <p>Talk to our team or Ben Tafreshi</p>
      </div>
      <div class="benarian-footer-group"><strong>Company</strong><a href="about.html">About Us</a><a href="experiences.html">Our Services</a><a href="contact.html">Concierge</a></div>
      <div class="benarian-footer-group"><strong>Support</strong><a href="contact.html">FAQ</a><a href="privacy-policy.html">Privacy Policy</a><a href="affiliate-disclosure.html">Affiliate Disclosure</a><a href="terms-and-conditions.html">Terms &amp; Conditions</a></div>
      <div class="benarian-footer-group"><strong>Follow Us</strong><p class="benarian-socials"><a href="https://www.instagram.com/benarianhotels" target="_blank" rel="noopener" aria-label="Instagram">◎</a><a href="mailto:info@benarian.com" aria-label="Email">✉</a></p></div>
      <p class="copyright">© 2026 BENARIAN. All rights reserved.</p>
    </footer>`;

  function cleanDuplicateConcierge(footer) {
    const items = [...footer.querySelectorAll('.benarian-footer-concierge')];
    items.slice(1).forEach(item => item.remove());
  }

  function applyCanonicalFooter() {
    const existing = document.querySelector('footer.benarian-canonical-footer');
    if (existing) {
      cleanDuplicateConcierge(existing);
      return;
    }
    const oldFooter = document.querySelector('footer.footer, footer.lux-footer, body > footer');
    if (!oldFooter) return;
    oldFooter.outerHTML = FOOTER_HTML;
    const footer = document.querySelector('footer.benarian-canonical-footer');
    if (footer) cleanDuplicateConcierge(footer);
  }

  const style = document.createElement('style');
  style.id = 'benarian-canonical-footer-styles';
  style.textContent = `
    .benarian-canonical-footer{display:grid!important;grid-template-columns:minmax(300px,1.25fr) repeat(3,minmax(130px,.55fr))!important;gap:34px!important;align-items:start!important;padding:54px 6% 38px!important;background:#fbf7ef!important;border-top:1px solid #e3d3b7!important;color:#6d6254!important}
    .benarian-canonical-footer .benarian-footer-brand{display:flex!important;flex-direction:row!important;align-items:center!important;width:auto!important;max-width:100%!important;text-decoration:none!important;min-width:0!important;grid-column:1!important;margin:0!important}
    .benarian-canonical-footer .benarian-footer-mark{display:block!important;flex:0 0 auto!important;font:600 52px/.75 'Cormorant Garamond',Georgia,serif!important;color:#b9872c!important;letter-spacing:-8px!important;margin:0 20px 0 0!important;transform:scaleX(.84)!important}
    .benarian-canonical-footer .benarian-footer-copy{display:flex!important;flex-direction:column!important;align-items:flex-start!important;min-width:0!important}.benarian-canonical-footer .benarian-footer-copy strong{display:block!important;margin:0!important;font:600 31px/.9 'Cormorant Garamond',Georgia,serif!important;letter-spacing:5px!important;color:#151310!important;white-space:nowrap!important}.benarian-canonical-footer .benarian-footer-copy small{display:block!important;margin:8px 0 0!important;font:700 8px/1.2 Inter,Arial,sans-serif!important;letter-spacing:1.45px!important;color:#b9872c!important;white-space:nowrap!important}
    .benarian-canonical-footer .benarian-footer-concierge{grid-column:1!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:8px!important;margin-top:-12px!important}.benarian-canonical-footer .benarian-footer-live{display:inline-flex!important;flex-direction:row!important;align-items:center!important;gap:9px!important;width:auto!important;max-width:100%!important;margin:0!important;padding:11px 15px!important;border:1px solid #c8953d!important;border-radius:999px!important;color:#755f45!important;text-decoration:none!important;font:700 10px Inter,Arial,sans-serif!important;letter-spacing:.9px!important;white-space:nowrap!important}.benarian-canonical-footer .live-dot{display:block!important;flex:0 0 9px!important;width:9px!important;height:9px!important;border-radius:50%!important;background:#25d366!important;box-shadow:0 0 0 5px rgba(37,211,102,.14)!important}.benarian-canonical-footer .benarian-footer-concierge p{margin:0!important;font:500 12px/1.5 Inter,Arial,sans-serif!important;color:#746a5d!important}
    .benarian-canonical-footer .benarian-footer-group{display:flex!important;flex-direction:column!important;gap:10px!important}.benarian-canonical-footer .benarian-footer-group strong{font:700 14px Inter,Arial,sans-serif!important;color:#211d18!important}.benarian-canonical-footer .benarian-footer-group a,.benarian-canonical-footer .benarian-footer-group p{margin:0!important;color:#766d61!important;text-decoration:none!important;font:400 12px/1.5 Inter,Arial,sans-serif!important}.benarian-canonical-footer .benarian-footer-group a:hover{color:#9b681a!important}.benarian-canonical-footer .benarian-socials{display:flex!important;gap:14px!important;align-items:center!important}.benarian-canonical-footer .copyright{grid-column:1/-1!important;margin:12px 0 0!important;padding-top:22px!important;border-top:1px solid #e8dcc7!important;color:#91877a!important;font:400 11px Inter,Arial,sans-serif!important}
    @media(max-width:850px){.benarian-canonical-footer{grid-template-columns:1fr 1fr!important;padding:40px 22px 170px!important;gap:26px 24px!important}.benarian-canonical-footer .benarian-footer-brand,.benarian-canonical-footer .benarian-footer-concierge{grid-column:1/-1!important}.benarian-canonical-footer .benarian-footer-group:nth-of-type(3){grid-column:1/-1!important}.benarian-canonical-footer .benarian-footer-mark{font-size:42px!important;margin-right:16px!important}.benarian-canonical-footer .benarian-footer-copy strong{font-size:25px!important;letter-spacing:3.6px!important}.benarian-canonical-footer .benarian-footer-copy small{font-size:6.5px!important;letter-spacing:1px!important}.benarian-canonical-footer .copyright{grid-column:1/-1!important}}
    @media(max-width:420px){.benarian-canonical-footer{padding-left:20px!important;padding-right:20px!important}.benarian-canonical-footer .benarian-footer-brand{align-items:center!important}.benarian-canonical-footer .benarian-footer-mark{font-size:39px!important;margin-right:14px!important}.benarian-canonical-footer .benarian-footer-copy strong{font-size:22px!important;letter-spacing:3px!important}.benarian-canonical-footer .benarian-footer-copy small{font-size:5.8px!important;letter-spacing:.8px!important}.benarian-canonical-footer .benarian-footer-live{font-size:8.5px!important;padding:10px 13px!important;white-space:normal!important}.benarian-canonical-footer .benarian-footer-group{min-width:0!important}}
  `;
  const oldStyle = document.getElementById(style.id);
  if (oldStyle) oldStyle.replaceWith(style); else document.head.appendChild(style);
  applyCanonicalFooter();
})();