(() => {
  const HOTEL_IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=92&w=1800&v=20260727final2';

  const install = () => {
    if (!document.body.classList.contains('home-lux')) return false;
    const section = document.querySelector('#official-booking-search.benarian-custom-hotel-search');
    const form = section?.querySelector('.benarian-luxury-form');
    if (!section || !form) return false;

    let wrap = section.querySelector('.benarian-hotel-card-wrap');
    let image = section.querySelector('.benarian-hotel-image');

    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'benarian-hotel-card-wrap';
      form.parentNode.insertBefore(wrap, form);
      wrap.appendChild(form);
    }

    if (!image) {
      image = document.createElement('div');
      image.className = 'benarian-hotel-image';
      image.setAttribute('role', 'img');
      image.setAttribute('aria-label', 'Luxury resort hotel exterior with swimming pool');
      wrap.insertBefore(image, wrap.firstChild);
    }

    image.style.setProperty('background-image', `linear-gradient(180deg,rgba(20,14,9,.02),rgba(20,14,9,.16)),url("${HOTEL_IMAGE}")`, 'important');
    image.style.setProperty('background-position', 'center 50%', 'important');
    image.style.setProperty('background-size', 'cover', 'important');
    image.style.setProperty('background-repeat', 'no-repeat', 'important');

    if (!document.getElementById('benarian-hotel-image-style')) {
      const style = document.createElement('style');
      style.id = 'benarian-hotel-image-style';
      style.textContent = `
        .benarian-hotel-card-wrap{position:relative;max-width:600px;margin:0 auto;background:#fff;border:1px solid #cfa14d;border-radius:18px;overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,.28)}
        .benarian-hotel-image{display:block;width:100%;height:190px;background-color:#2a2118}
        .benarian-hotel-card-wrap .benarian-luxury-form{max-width:none!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important}
        @media(max-width:760px){
          .benarian-hotel-card-wrap{margin:0 34px;border-radius:17px}
          .benarian-hotel-image{height:142px}
          .benarian-hotel-card-wrap .benarian-luxury-form{margin:0!important;border-radius:0!important}
        }
        @media(max-width:390px){.benarian-hotel-card-wrap{margin-left:22px;margin-right:22px}.benarian-hotel-image{height:132px}}
      `;
      document.head.appendChild(style);
    }

    return true;
  };

  install();
  const observer = new MutationObserver(install);
  observer.observe(document.documentElement, {childList:true, subtree:true});
  [250,600,1000,1800,3000].forEach(delay => setTimeout(install, delay));
})();
