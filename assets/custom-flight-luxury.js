(() => {
  if (document.documentElement.dataset.benarianLuxuryFlight === 'true') return;
  document.documentElement.dataset.benarianLuxuryFlight = 'true';

  const flightPartner = window.BENARIAN_PARTNERS?.flights || {};
  const affiliateBase = flightPartner.affiliateBaseUrl || 'https://www.anrdoezrs.net/click-101828630-17289007';
  const IMG = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=92&w=1800';

  const formatDate = date => date.toISOString().slice(0, 10);
  const buildTarget = (from, to, depart, ret) => {
    const q = new URLSearchParams();
    if (from) q.set('from', from);
    if (to) q.set('to', to);
    if (depart) q.set('depart', depart);
    if (ret) q.set('return', ret);
    return `${affiliateBase}${affiliateBase.includes('?') ? '&' : '?'}${q.toString()}`;
  };

  const installStyles = () => {
    if (document.getElementById('benarian-luxury-flight-style')) return;
    const style = document.createElement('style');
    style.id = 'benarian-luxury-flight-style';
    style.textContent = `
      .benarian-custom-flight{position:relative!important;padding:70px 0 78px!important;margin:0!important;background:radial-gradient(circle at 50% 0,#2a2118 0,#17120d 46%,#0d0a07 100%)!important;border-top:1px solid #b9822c!important;border-bottom:1px solid #b9822c!important;overflow:hidden!important;color:#fff!important}
      .benarian-custom-flight:before{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 0,rgba(207,151,55,.055) 50%,transparent 100%);pointer-events:none}
      .benarian-flight-pill{position:relative;width:max-content;margin:0 auto 26px;padding:10px 24px;border:1px solid rgba(205,151,67,.28);border-radius:999px;background:rgba(50,40,29,.62);color:#fff;font-size:13px;letter-spacing:.2px}
      .benarian-flight-heading{position:relative;text-align:center;max-width:780px;margin:0 auto;padding:0 24px}
      .benarian-flight-heading .eyebrow{display:block;color:#e7b454!important;font-size:9px!important;font-weight:800!important;letter-spacing:3.5px!important;margin-bottom:16px!important}
      .benarian-flight-heading h2{font:500 clamp(40px,5.5vw,64px)/.98 'Cormorant Garamond',Georgia,serif!important;color:#e8c77f!important;margin:0 0 18px!important;letter-spacing:-.8px!important}
      .benarian-flight-heading p{max-width:650px;margin:0 auto 30px!important;color:#e9dfd2!important;font-size:14px!important;line-height:1.7!important}
      .benarian-flight-card{position:relative;max-width:720px;margin:0 auto;background:#fff;border:1px solid #d4a34d;border-radius:18px;overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,.24)}
      .benarian-flight-image{height:210px;background:url('${IMG}') center 56%/cover no-repeat;position:relative}
      .benarian-flight-image:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,14,9,.08),rgba(20,14,9,.28))}
      .benarian-flight-form{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:22px}
      .benarian-flight-field{display:block;text-align:left;min-width:0}
      .benarian-flight-field span{display:block;margin:0 0 8px;color:#81591e;font-size:9px;font-weight:800;letter-spacing:1.8px}
      .benarian-flight-field input{display:block;width:100%!important;max-width:100%!important;height:60px;padding:0 16px;border:1px solid #d8c7ab!important;border-radius:10px!important;background:#fff!important;color:#17130f!important;font-size:16px!important;box-shadow:none!important}
      .benarian-flight-form button{grid-column:1/-1;width:100%;height:58px;margin-top:2px;border:0!important;border-radius:9px!important;background:#1a1713!important;color:#fff!important;font-size:12px!important;font-weight:800!important;letter-spacing:.35px!important;cursor:pointer!important}
      .benarian-flight-form button:hover{background:#b9872c!important}
      .benarian-flight-note{position:relative;max-width:660px;margin:22px auto 0!important;padding:0 24px;color:#b7aa9b!important;text-align:center;font-size:10px!important;line-height:1.75!important}
      .benarian-flight-link{position:relative;display:block;width:max-content;max-width:calc(100% - 40px);margin:20px auto 0;padding-bottom:6px;border-bottom:1px solid #c6923d;color:#d6a957!important;text-align:center;text-decoration:none;font-size:11px;font-weight:800;letter-spacing:.2px}
      @media(max-width:760px){
        .benarian-custom-flight{padding:56px 0 60px!important}
        .benarian-flight-pill{margin-bottom:22px;padding:9px 22px;font-size:12px}
        .benarian-flight-heading{padding:0 20px}
        .benarian-flight-heading .eyebrow{font-size:8px!important;letter-spacing:2.8px!important;margin-bottom:14px!important}
        .benarian-flight-heading h2{font-size:40px!important;margin-bottom:16px!important}
        .benarian-flight-heading p{font-size:13px!important;line-height:1.68!important;margin-bottom:26px!important}
        .benarian-flight-card{margin:0 22px;border-radius:16px}
        .benarian-flight-image{height:170px}
        .benarian-flight-form{grid-template-columns:1fr;padding:18px;gap:12px}
        .benarian-flight-field input{height:58px;font-size:16px!important}
        .benarian-flight-form button{height:58px;font-size:11px!important}
        .benarian-flight-note{font-size:10px!important;margin-top:20px!important}
        .benarian-flight-link{font-size:10px;margin-top:18px}
      }
    `;
    document.head.appendChild(style);
  };

  const render = () => {
    if (!document.body.classList.contains('home-lux')) return false;
    const section = document.querySelector('#official-flight-search') || document.querySelector('.flight-widget-section');
    if (!section) return false;
    if (section.dataset.customFlightReady === 'true') return true;

    installStyles();
    section.dataset.customFlightReady = 'true';
    section.id = 'official-flight-search';
    section.className = 'flight-widget-section benarian-custom-flight';

    const today = new Date();
    const depart = new Date(today); depart.setDate(today.getDate() + 7);
    const ret = new Date(today); ret.setDate(today.getDate() + 14);

    section.innerHTML = `
      <div class="benarian-flight-pill">benarian.com</div>
      <div class="benarian-flight-heading">
        <span class="eyebrow">BOOKING.COM OFFICIAL FLIGHT RESERVATIONS</span>
        <h2>Search &amp; Book Your Flight</h2>
        <p>Find worldwide flight options through BENARIAN’s official Booking.com affiliate connection.</p>
      </div>
      <div class="benarian-flight-card">
        <div class="benarian-flight-image" role="img" aria-label="Luxury tropical resort at golden sunset"></div>
        <form class="benarian-flight-form" aria-label="Search flights">
          <label class="benarian-flight-field"><span>FROM</span><input name="from" type="text" placeholder="Melbourne" required></label>
          <label class="benarian-flight-field"><span>TO</span><input name="to" type="text" placeholder="Bali" required></label>
          <label class="benarian-flight-field"><span>DEPARTURE</span><input name="depart" type="date" value="${formatDate(depart)}" required></label>
          <label class="benarian-flight-field"><span>RETURN</span><input name="return" type="date" value="${formatDate(ret)}" required></label>
          <button type="submit">SEARCH FLIGHTS →</button>
        </form>
      </div>
      <p class="benarian-flight-note">Live fares, availability, payment and booking confirmation are provided securely by Booking.com or the relevant travel provider.</p>
      <a class="benarian-flight-link" href="${affiliateBase}" target="_blank" rel="noopener sponsored">Open worldwide flight search</a>
    `;

    section.querySelector('form')?.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const from = form.elements.from.value.trim();
      const to = form.elements.to.value.trim();
      if (!from || !to) return;
      window.open(buildTarget(from, to, form.elements.depart.value, form.elements.return.value), '_blank', 'noopener');
    });
    return true;
  };

  if (render()) return;
  const observer = new MutationObserver(() => { if (render()) observer.disconnect(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  [300,700,1200,2000,3200].forEach(delay => setTimeout(render, delay));
})();
