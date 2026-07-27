(() => {
  if (document.documentElement.dataset.benarianLuxuryFlight === 'true') return;
  document.documentElement.dataset.benarianLuxuryFlight = 'true';

  if (!document.querySelector('script[data-benarian-hotel-image]')) {
    const hotelImageScript = document.createElement('script');
    hotelImageScript.src = 'assets/hotel-image-enhancement.js?v=20260727b';
    hotelImageScript.defer = true;
    hotelImageScript.dataset.benarianHotelImage = 'true';
    document.head.appendChild(hotelImageScript);
  }

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
      .benarian-custom-flight{position:relative!important;padding:54px 0 72px!important;margin:0!important;background:radial-gradient(circle at 50% 0,#2a2118 0,#17120d 46%,#0d0a07 100%)!important;border-top:1px solid #b9822c!important;border-bottom:1px solid #b9822c!important;overflow:hidden!important;color:#fff!important;scroll-margin-top:76px!important}
      .benarian-custom-flight:before{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 0,rgba(207,151,55,.055) 50%,transparent 100%);pointer-events:none}
      .benarian-custom-flight:after{content:none!important;display:none!important}
      .benarian-custom-flight>.benarian-flight-pill{position:relative;width:max-content;margin:0 auto 22px;padding:9px 22px;border:1px solid rgba(205,151,67,.28);border-radius:999px;background:rgba(50,40,29,.62);color:#fff;font-size:12px;letter-spacing:.2px;box-shadow:none!important;text-shadow:none!important}
      .benarian-flight-heading{position:relative;text-align:center;max-width:760px;margin:0 auto;padding:0 24px}
      .benarian-flight-heading .eyebrow{display:block;color:#e7b454!important;font-size:8.5px!important;font-weight:800!important;letter-spacing:3.25px!important;margin-bottom:14px!important}
      .benarian-flight-heading h2{font:500 clamp(38px,5vw,58px)/.98 'Cormorant Garamond',Georgia,serif!important;color:#e8c77f!important;margin:0 0 16px!important;letter-spacing:-.65px!important}
      .benarian-flight-heading p{max-width:610px;margin:0 auto 26px!important;color:#e9dfd2!important;font-size:13px!important;line-height:1.65!important}
      .benarian-flight-card{position:relative;max-width:680px;margin:0 auto;background:#fff;border:1px solid #d4a34d;border-radius:16px;overflow:hidden;box-shadow:0 14px 34px rgba(0,0,0,.22)}
      .benarian-flight-image{height:180px;background:url('${IMG}') center 56%/cover no-repeat;position:relative}
      .benarian-flight-image:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,14,9,.06),rgba(20,14,9,.22))}
      .benarian-flight-form{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:20px}
      .benarian-flight-field{display:block;text-align:left;min-width:0;overflow:hidden}
      .benarian-flight-field span{display:block;margin:0 0 7px;color:#81591e;font-size:8.5px;font-weight:800;letter-spacing:1.7px}
      .benarian-flight-field input{display:block;box-sizing:border-box!important;width:100%!important;max-width:100%!important;min-width:0!important;height:56px;padding:0 15px;border:1px solid #d8c7ab!important;border-radius:9px!important;background:#fff!important;color:#17130f!important;font-size:15px!important;box-shadow:none!important;-webkit-appearance:none!important;appearance:none!important}
      .benarian-flight-form button{grid-column:1/-1;width:100%;height:56px;margin-top:2px;border:0!important;border-radius:8px!important;background:#1a1713!important;color:#fff!important;font-size:11.5px!important;font-weight:800!important;letter-spacing:.35px!important;cursor:pointer!important}
      .benarian-flight-form button:hover{background:#b9872c!important}
      .benarian-flight-note{position:relative;max-width:620px;margin:20px auto 0!important;padding:0 24px;color:#b7aa9b!important;text-align:center;font-size:9.5px!important;line-height:1.7!important}
      .benarian-flight-link{position:relative;display:block;width:max-content;max-width:calc(100% - 40px);margin:18px auto 0;padding-bottom:5px;border-bottom:1px solid #c6923d;color:#d6a957!important;text-align:center;text-decoration:none;font-size:10.5px;font-weight:800;letter-spacing:.2px}
      @media(max-width:760px){
        .benarian-custom-flight{padding:42px 0 132px!important}
        .benarian-custom-flight:after{content:none!important;display:none!important}
        .benarian-custom-flight>.benarian-flight-pill{margin-bottom:18px;padding:8px 20px;font-size:11.5px}
        .benarian-flight-heading{padding:0 20px}
        .benarian-flight-heading .eyebrow{font-size:7.5px!important;letter-spacing:2.55px!important;margin-bottom:12px!important}
        .benarian-flight-heading h2{font-size:37px!important;line-height:.98!important;margin-bottom:14px!important}
        .benarian-flight-heading p{font-size:12.5px!important;line-height:1.62!important;margin-bottom:22px!important;padding:0 5px}
        .benarian-flight-card{margin:0 26px;border-radius:15px}
        .benarian-flight-image{height:138px}
        .benarian-flight-form{grid-template-columns:1fr;padding:17px;gap:11px}
        .benarian-flight-field input{height:54px;font-size:15px!important}
        .benarian-flight-form button{height:55px;font-size:11px!important}
        .benarian-flight-note{font-size:9.5px!important;margin-top:18px!important;padding:0 28px}
        .benarian-flight-link{font-size:10px;margin-top:16px}
        body.flight-section-active .benarian-mobile-nav{transform:translateY(120%)!important;opacity:0!important;pointer-events:none!important;transition:transform .22s ease,opacity .22s ease!important}
      }
      @media(max-width:390px){.benarian-flight-card{margin-left:18px;margin-right:18px}.benarian-flight-heading h2{font-size:34px!important}}
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

    if ('IntersectionObserver' in window) {
      const navObserver = new IntersectionObserver(entries => {
        const visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0.18);
        document.body.classList.toggle('flight-section-active', visible);
      }, { threshold: [0, .18, .4] });
      navObserver.observe(section);
    }
    return true;
  };

  if (render()) return;
  const observer = new MutationObserver(() => { if (render()) observer.disconnect(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  [300,700,1200,2000,3200].forEach(delay => setTimeout(render, delay));
})();