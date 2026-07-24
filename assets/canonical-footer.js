(() => {
  const FOOTER_HTML = `
    <footer class="benarian-footer-v3" aria-label="BENARIAN footer">
      <div class="bf3-brand-block">
        <a href="index.html" class="bf3-brand" aria-label="BENARIAN home">
          <span class="bf3-mark" aria-hidden="true">BB</span>
          <span class="bf3-copy"><strong>BENARIAN</strong><small>LUXURY TRAVEL &amp; HOSPITALITY</small></span>
        </a>
        <a class="bf3-whatsapp" href="https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%20need%20assistance%20with%20my%20travel%20booking." target="_blank" rel="noopener">
          <span class="bf3-dot" aria-hidden="true"></span><span>LIVE CONCIERGE · WHATSAPP</span>
        </a>
        <p class="bf3-talk">Talk to our team or Ben Tafreshi</p>
      </div>
      <div class="bf3-column"><strong>Company</strong><a href="about.html">About Us</a><a href="experiences.html">Our Services</a><a href="contact.html">Concierge</a></div>
      <div class="bf3-column"><strong>Support</strong><a href="contact.html">FAQ</a><a href="privacy-policy.html">Privacy Policy</a><a href="affiliate-disclosure.html">Affiliate Disclosure</a><a href="terms-and-conditions.html">Terms &amp; Conditions</a></div>
      <div class="bf3-column"><strong>Follow Us</strong><a href="https://www.instagram.com/benarianhotels" target="_blank" rel="noopener">Instagram</a><a href="mailto:info@benarian.com">Email</a></div>
      <p class="bf3-copyright">© 2026 BENARIAN. All rights reserved.</p>
    </footer>`;

  const CSS = `
    footer.footer,footer.lux-footer,footer.benarian-canonical-footer,footer.benarian-footer-v2{display:none!important}
    .benarian-footer-v3{position:relative!important;inset:auto!important;float:none!important;clear:both!important;display:grid!important;width:100%!important;max-width:none!important;min-height:0!important;height:auto!important;grid-template-columns:minmax(280px,1.3fr) repeat(3,minmax(120px,.55fr))!important;gap:32px!important;align-items:start!important;margin:0!important;padding:48px 6% 36px!important;background:#fbf7ef!important;border:0!important;border-top:1px solid #e3d3b7!important;border-radius:0!important;box-shadow:none!important;color:#6d6254!important;font-family:Inter,Arial,sans-serif!important;font-size:16px!important;line-height:1.5!important;box-sizing:border-box!important;overflow:visible!important;transform:none!important;z-index:1!important}
    .benarian-footer-v3 *{box-sizing:border-box!important;min-width:0!important;max-width:100%!important}
    .bf3-brand-block{display:flex!important;flex-direction:column!important;align-items:flex-start!important;margin:0!important;padding:0!important}
    .bf3-brand{display:inline-flex!important;flex-direction:row!important;align-items:center!important;width:auto!important;margin:0!important;padding:0!important;background:none!important;border:0!important;text-decoration:none!important}
    .bf3-mark{display:block!important;flex:0 0 auto!important;margin:0 16px 0 0!important;padding:0!important;color:#b9872c!important;font:600 48px/.78 'Cormorant Garamond',Georgia,serif!important;letter-spacing:-7px!important;transform:scaleX(.84)!important}
    .bf3-copy{display:flex!important;flex-direction:column!important;align-items:flex-start!important;margin:0!important;padding:0!important}.bf3-copy strong{display:block!important;margin:0!important;padding:0!important;color:#17130f!important;font:600 29px/.92 'Cormorant Garamond',Georgia,serif!important;letter-spacing:4.3px!important;white-space:nowrap!important}.bf3-copy small{display:block!important;margin:7px 0 0!important;padding:0!important;color:#b9872c!important;font:700 7px/1.2 Inter,Arial,sans-serif!important;letter-spacing:1.2px!important;white-space:nowrap!important}
    .bf3-whatsapp{display:inline-flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:9px!important;width:auto!important;margin:20px 0 0!important;padding:10px 14px!important;background:transparent!important;border:1px solid #c8953d!important;border-radius:999px!important;color:#755f45!important;text-decoration:none!important;font:700 10px/1.25 Inter,Arial,sans-serif!important;letter-spacing:.75px!important;white-space:nowrap!important}.bf3-dot{display:block!important;flex:0 0 9px!important;width:9px!important;height:9px!important;margin:0!important;padding:0!important;border-radius:50%!important;background:#25d366!important;box-shadow:0 0 0 5px rgba(37,211,102,.14)!important}.bf3-talk{display:block!important;margin:9px 0 0!important;padding:0!important;color:#746a5d!important;font:500 12px/1.5 Inter,Arial,sans-serif!important}
    .bf3-column{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:9px!important;margin:0!important;padding:0!important}.bf3-column strong{display:block!important;margin:0 0 4px!important;padding:0!important;color:#211d18!important;font:700 14px/1.3 Inter,Arial,sans-serif!important}.bf3-column a{display:block!important;margin:0!important;padding:0!important;color:#766d61!important;text-decoration:none!important;font:400 12px/1.5 Inter,Arial,sans-serif!important}.bf3-column a:hover{color:#9b681a!important}.bf3-copyright{grid-column:1/-1!important;display:block!important;margin:8px 0 0!important;padding:20px 0 0!important;border-top:1px solid #e8dcc7!important;color:#91877a!important;font:400 11px/1.5 Inter,Arial,sans-serif!important}
    @media(max-width:850px){.benarian-footer-v3{grid-template-columns:1fr 1fr!important;gap:26px 22px!important;padding:38px 22px 140px!important}.bf3-brand-block{grid-column:1/-1!important}.bf3-copyright{grid-column:1/-1!important}}
    @media(max-width:520px){.benarian-footer-v3{grid-template-columns:1fr 1fr!important;gap:24px 18px!important;padding:34px 18px 132px!important}.bf3-brand-block{grid-column:1/-1!important}.bf3-mark{font-size:39px!important;margin-right:12px!important}.bf3-copy strong{font-size:22px!important;letter-spacing:2.8px!important}.bf3-copy small{font-size:5.7px!important;letter-spacing:.78px!important}.bf3-whatsapp{font-size:8.5px!important;padding:9px 12px!important;white-space:nowrap!important}.bf3-talk{font-size:11px!important}.bf3-column strong{font-size:13px!important}.bf3-column a{font-size:11px!important}.bf3-column:last-of-type{grid-column:1/-1!important;display:grid!important;grid-template-columns:auto auto!important;justify-content:start!important;column-gap:18px!important}.bf3-column:last-of-type strong{grid-column:1/-1!important}.bf3-copyright{grid-column:1/-1!important;font-size:10px!important}}
  `;

  function installStyle(){
    let style=document.getElementById('benarian-footer-v3-style');
    if(!style){style=document.createElement('style');style.id='benarian-footer-v3-style';document.head.appendChild(style)}
    style.textContent=CSS;
  }

  function installFooter(){
    document.querySelectorAll('footer').forEach(f=>f.remove());
    const shell=document.querySelector('.shell')||document.body;
    shell.insertAdjacentHTML('beforeend',FOOTER_HTML);
  }

  function apply(){installStyle();installFooter()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  [350,1000].forEach(ms=>setTimeout(()=>{if(document.querySelectorAll('.benarian-footer-v3').length!==1)apply()},ms));
})();