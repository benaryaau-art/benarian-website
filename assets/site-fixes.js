(() => {
  const WHATSAPP_URL='https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%20need%20assistance%20with%20my%20travel%20booking.';
  const EMAIL_URL='mailto:info@benarian.com?subject=BENARIAN%20Travel%20Enquiry';

  function normalPage(v){return(v||'index.html').split('/').pop()||'index.html'}

  function fixUtilities(){
    document.querySelectorAll('.topline .right').forEach(right=>{
      [...right.children].forEach(node=>{
        const text=(node.textContent||'').replace(/\s+/g,' ').trim();
        if(/Wishlist/i.test(text) && node.tagName!=='A'){
          const a=document.createElement('a');a.href='member-login.html';a.className='benarian-utility';a.setAttribute('aria-label','Open BENARIAN member access for Wishlist');a.innerHTML='♡ <span>Wishlist</span>';node.replaceWith(a);
        } else if(/My Bookings/i.test(text) && node.tagName!=='A'){
          const a=document.createElement('a');a.href='member-login.html';a.className='benarian-utility';a.setAttribute('aria-label','Open BENARIAN member access for My Bookings');a.innerHTML='▣ <span>My Bookings</span>';node.replaceWith(a);
        } else if(/^AUD\s*⌄?$/i.test(text) && node.tagName!=='BUTTON'){
          const b=document.createElement('button');b.type='button';b.className='benarian-utility benarian-currency';b.dataset.currencyControl='true';node.replaceWith(b);
        }
      });
      const currency=right.querySelector('[data-currency-control="true"]');
      if(currency && !currency.dataset.bound){
        currency.dataset.bound='true';
        const currencies=['AUD','USD','EUR'];
        let current=localStorage.getItem('benarianCurrency')||'AUD';
        const render=()=>currency.textContent=current+'⌄';render();
        currency.addEventListener('click',()=>{current=currencies[(currencies.indexOf(current)+1)%currencies.length];localStorage.setItem('benarianCurrency',current);render();});
      }
    });
  }

  function fixConciergeLinks(){
    document.querySelectorAll('.lux-contact-actions').forEach(group=>{
      const links=[...group.querySelectorAll('a')];
      if(links[0]){links[0].href=WHATSAPP_URL;links[0].target='_blank';links[0].rel='noopener';links[0].setAttribute('aria-label','Chat with BENARIAN on WhatsApp');}
      if(links[1]){links[1].href=EMAIL_URL;links[1].removeAttribute('target');links[1].setAttribute('aria-label','Email BENARIAN');}
      if(links[2]){links[2].href='contact.html';links[2].setAttribute('aria-label','Open BENARIAN Concierge contact page');}
    });
  }

  function optimiseImages(){
    const imgs=[...document.images];
    const firstVisible=imgs.find(img=>img.getBoundingClientRect().top < window.innerHeight*1.2);
    imgs.forEach(img=>{
      img.decoding='async';
      if(img===firstVisible){img.loading='eager';img.fetchPriority='high';}
      else {img.loading='lazy';img.fetchPriority='low';}
      if(!img.alt && !img.closest('a[aria-label]')) img.alt='';
    });
  }

  function hardenLinks(){
    document.querySelectorAll('a[target="_blank"]').forEach(a=>{
      const rel=new Set((a.rel||'').split(/\s+/).filter(Boolean));rel.add('noopener');rel.add('noreferrer');a.rel=[...rel].join(' ');
    });
    document.querySelectorAll('a[href="#"],a[href=""]').forEach(a=>{
      if(a.dataset.keepEmpty==='true') return;
      a.setAttribute('aria-disabled','true');
      a.addEventListener('click',e=>e.preventDefault());
    });
  }

  function installPerformanceHints(){
    const origins=['https://images.unsplash.com','https://www.booking.com','https://fonts.gstatic.com'];
    origins.forEach(href=>{if(document.head.querySelector(`link[rel="preconnect"][href="${href}"]`))return;const l=document.createElement('link');l.rel='preconnect';l.href=href;l.crossOrigin='anonymous';document.head.appendChild(l);});
    if(!document.getElementById('benarian-global-stability')){
      const s=document.createElement('style');s.id='benarian-global-stability';s.textContent=`
        .topline .right .benarian-utility{display:inline-flex;align-items:center;gap:5px;border:0;background:transparent;color:inherit;text-decoration:none;font:inherit;cursor:pointer;padding:0}
        .topline .right .benarian-utility:hover{color:#b9872c}
        img{max-width:100%;height:auto}
        @media(max-width:760px){button,a{touch-action:manipulation}}
        @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}}
      `;document.head.appendChild(s);
    }
  }

  function fixLegacyHeavyBrand(){
    document.querySelectorAll('.header .brand img[src*="benarian-logo-approved.png"]').forEach(img=>{
      const brand=img.closest('.brand');if(!brand)return;
      brand.classList.add('brand-lockup');brand.setAttribute('aria-label','BENARIAN home');
      brand.innerHTML='<span class="brand-mark" aria-hidden="true">BB</span><span class="brand-copy"><strong>BENARIAN</strong><small>LUXURY TRAVEL & HOSPITALITY</small></span>';
    });
  }

  function apply(){fixUtilities();fixConciergeLinks();optimiseImages();hardenLinks();installPerformanceHints();fixLegacyHeavyBrand();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  window.addEventListener('load',()=>setTimeout(apply,150),{once:true});
})();
