(() => {
  const FOOTER_HTML = `
    <footer class="benarian-footer-v2" aria-label="BENARIAN footer">
      <div class="bf-brand-block">
        <a href="index.html" class="bf-brand" aria-label="BENARIAN home">
          <span class="bf-mark" aria-hidden="true">BB</span>
          <span class="bf-copy"><strong>BENARIAN</strong><small>LUXURY TRAVEL &amp; HOSPITALITY</small></span>
        </a>
        <a class="bf-whatsapp" href="https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%20need%20assistance%20with%20my%20travel%20booking." target="_blank" rel="noopener">
          <span class="bf-dot" aria-hidden="true"></span><span>LIVE CONCIERGE · WHATSAPP</span>
        </a>
        <p class="bf-talk">Talk to our team or Ben Tafreshi</p>
      </div>
      <div class="bf-column"><strong>Company</strong><a href="about.html">About Us</a><a href="experiences.html">Our Services</a><a href="contact.html">Concierge</a></div>
      <div class="bf-column"><strong>Support</strong><a href="contact.html">FAQ</a><a href="privacy-policy.html">Privacy Policy</a><a href="affiliate-disclosure.html">Affiliate Disclosure</a><a href="terms-and-conditions.html">Terms &amp; Conditions</a></div>
      <div class="bf-column"><strong>Follow Us</strong><a href="https://www.instagram.com/benarianhotels" target="_blank" rel="noopener">Instagram</a><a href="mailto:info@benarian.com">Email</a></div>
      <p class="bf-copyright">© 2026 BENARIAN. All rights reserved.</p>
    </footer>`;

  const CSS = `
    footer.footer,footer.lux-footer,footer.benarian-canonical-footer{display:none!important}
    .benarian-footer-v2{display:grid!important;grid-template-columns:minmax(290px,1.3fr) repeat(3,minmax(130px,.55fr))!important;gap:34px!important;align-items:start!important;padding:52px 6% 38px!important;background:#fbf7ef!important;border-top:1px solid #e3d3b7!important;color:#6d6254!important;font-family:Inter,Arial,sans-serif!important;box-sizing:border-box!important}
    .bf-brand-block{display:flex!important;flex-direction:column!important;align-items:flex-start!important;min-width:0!important}
    .bf-brand{display:flex!important;align-items:center!important;text-decoration:none!important;margin:0!important;width:auto!important}
    .bf-mark{display:block!important;font:600 50px/.75 'Cormorant Garamond',Georgia,serif!important;color:#b9872c!important;letter-spacing:-8px!important;margin-right:18px!important;transform:scaleX(.84)!important}
    .bf-copy{display:flex!important;flex-direction:column!important;align-items:flex-start!important}.bf-copy strong{margin:0!important;font:600 30px/.9 'Cormorant Garamond',Georgia,serif!important;letter-spacing:4.7px!important;color:#17130f!important;white-space:nowrap!important}.bf-copy small{margin-top:7px!important;font:700 7.5px/1.2 Inter,Arial,sans-serif!important;letter-spacing:1.3px!important;color:#b9872c!important;white-space:nowrap!important}
    .bf-whatsapp{display:inline-flex!important;align-items:center!important;gap:9px!important;width:auto!important;max-width:100%!important;margin:22px 0 0!important;padding:11px 15px!important;border:1px solid #c8953d!important;border-radius:999px!important;color:#755f45!important;text-decoration:none!important;font:700 10px/1.2 Inter,Arial,sans-serif!important;letter-spacing:.8px!important;white-space:nowrap!important;box-sizing:border-box!important}.bf-dot{display:block!important;flex:0 0 9px!important;width:9px!important;height:9px!important;border-radius:50%!important;background:#25d366!important;box-shadow:0 0 0 5px rgba(37,211,102,.14)!important}.bf-talk{margin:10px 0 0!important;color:#746a5d!important;font:500 12px/1.5 Inter,Arial,sans-serif!important}
    .bf-column{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:10px!important;min-width:0!important}.bf-column strong{margin:0 0 4px!important;color:#211d18!important;font:700 14px/1.3 Inter,Arial,sans-serif!important}.bf-column a{margin:0!important;color:#766d61!important;text-decoration:none!important;font:400 12px/1.5 Inter,Arial,sans-serif!important}.bf-column a:hover{color:#9b681a!important}.bf-copyright{grid-column:1/-1!important;margin:10px 0 0!important;padding-top:21px!important;border-top:1px solid #e8dcc7!important;color:#91877a!important;font:400 11px/1.5 Inter,Arial,sans-serif!important}
    @media(max-width:850px){.benarian-footer-v2{grid-template-columns:1fr 1fr!important;gap:30px 24px!important;padding:40px 22px 165px!important}.bf-brand-block{grid-column:1/-1!important}.bf-column:last-of-type{grid-column:1/-1!important;flex-direction:row!important;flex-wrap:wrap!important;align-items:center!important;gap:10px 18px!important}.bf-column:last-of-type strong{width:100%!important}.bf-copyright{grid-column:1/-1!important}}
    @media(max-width:480px){.benarian-footer-v2{grid-template-columns:1fr!important;gap:28px!important;padding:36px 20px 150px!important}.bf-brand-block,.bf-column,.bf-column:last-of-type,.bf-copyright{grid-column:1!important}.bf-brand{width:100%!important}.bf-mark{font-size:42px!important;margin-right:14px!important}.bf-copy strong{font-size:24px!important;letter-spacing:3.2px!important}.bf-copy small{font-size:6px!important;letter-spacing:.9px!important}.bf-whatsapp{font-size:9px!important;padding:10px 13px!important;white-space:normal!important}.bf-column:last-of-type{flex-direction:column!important;align-items:flex-start!important;gap:10px!important}.bf-column:last-of-type strong{width:auto!important}}
  `;

  function installStyle(){
    let style=document.getElementById('benarian-footer-v2-style');
    if(!style){style=document.createElement('style');style.id='benarian-footer-v2-style';document.head.appendChild(style)}
    style.textContent=CSS;
  }

  function installFooter(){
    document.querySelectorAll('footer').forEach(f=>f.remove());
    const shell=document.querySelector('.shell')||document.body;
    shell.insertAdjacentHTML('beforeend',FOOTER_HTML);
  }

  function apply(){installStyle();installFooter()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  [300,900,1800].forEach(ms=>setTimeout(()=>{
    if(document.querySelectorAll('.benarian-footer-v2').length!==1)apply();
  },ms));
})();