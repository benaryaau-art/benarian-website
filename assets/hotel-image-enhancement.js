(() => {
  const install = () => {
    if (!document.body.classList.contains('home-lux')) return false;
    const section = document.querySelector('#official-booking-search.benarian-custom-hotel-search');
    const form = section?.querySelector('.benarian-luxury-form');
    if (!section || !form) return false;
    if (section.dataset.hotelImageEnhanced === 'true') return true;
    section.dataset.hotelImageEnhanced = 'true';

    if (!document.getElementById('benarian-hotel-image-style')) {
      const style = document.createElement('style');
      style.id = 'benarian-hotel-image-style';
      style.textContent = `
        .benarian-hotel-card-wrap{position:relative;max-width:600px;margin:0 auto;background:#fff;border:1px solid #cfa14d;border-radius:18px;overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,.28)}
        .benarian-hotel-image{height:190px;background-image:linear-gradient(180deg,rgba(20,14,9,.02),rgba(20,14,9,.23)),url('assets/hotels-hero-new.jpg?v=20260727hotel');background-position:center 58%;background-size:cover;background-repeat:no-repeat;position:relative;background-color:#2a2118}
        .benarian-hotel-card-wrap .benarian-luxury-form{max-width:none!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important}
        @media(max-width:760px){
          .benarian-hotel-card-wrap{margin:0 34px;border-radius:17px}
          .benarian-hotel-image{height:142px;background-position:center 60%}
          .benarian-hotel-card-wrap .benarian-luxury-form{margin:0!important;border-radius:0!important}
        }
        @media(max-width:390px){.benarian-hotel-card-wrap{margin-left:22px;margin-right:22px}.benarian-hotel-image{height:132px}}
      `;
      document.head.appendChild(style);
    }

    const wrap = document.createElement('div');
    wrap.className = 'benarian-hotel-card-wrap';
    const image = document.createElement('div');
    image.className = 'benarian-hotel-image';
    image.setAttribute('role', 'img');
    image.setAttribute('aria-label', 'Luxury hotel and resort exterior');
    form.parentNode.insertBefore(wrap, form);
    wrap.appendChild(image);
    wrap.appendChild(form);
    return true;
  };

  if (install()) return;
  const observer = new MutationObserver(() => { if (install()) observer.disconnect(); });
  observer.observe(document.documentElement, {childList:true, subtree:true});
  [300,700,1200,2000,3200].forEach(delay => setTimeout(install, delay));
})();