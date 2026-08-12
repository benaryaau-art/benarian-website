(() => {
  const WHATSAPP_URL='https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%20need%20assistance%20with%20my%20travel%20booking.';
  const EMAIL_URL='mailto:info@benarian.com?subject=BENARIAN%20Travel%20Enquiry';

  function installIntroFounderOverlay(){
    if(!document.body.classList.contains('home-lux') || window.__benarianIntroFounderInstalled) return;
    window.__benarianIntroFounderInstalled=true;

    const style=document.createElement('style');
    style.id='benarian-intro-founder-style';
    style.textContent=`
      #benarian-intro-screen{position:fixed;inset:0;z-index:2147483646;display:grid;place-items:center;overflow:hidden;pointer-events:none;color:#fff;text-align:center;background:#071014;animation:benarianIntroScreen 5.8s ease both;isolation:isolate}
      #benarian-intro-screen::before{content:"";position:absolute;inset:-3%;z-index:-2;background:linear-gradient(rgba(4,7,8,.32),rgba(4,7,8,.46)),url('/assets/images/thailand-hero.jpg?v=20260812intro-motion') center/cover no-repeat;animation:benarianCinematicDrift 5.8s ease-out both;will-change:transform}
      #benarian-intro-screen::after{content:"";position:absolute;left:-15%;right:-15%;bottom:-4%;height:42%;z-index:-1;opacity:.34;background:repeating-radial-gradient(ellipse at 50% 110%,rgba(180,235,232,.34) 0 1px,transparent 2px 16px);mix-blend-mode:soft-light;filter:blur(1px);transform-origin:center bottom;animation:benarianWaterFlow 2.4s ease-in-out infinite alternate;will-change:transform,background-position}
      #benarian-intro-screen .b-copy{position:relative;z-index:2;width:min(92vw,820px)}
      #benarian-intro-screen .b-brand{font:500 clamp(30px,6.2vw,49px)/1.05 'Cormorant Garamond',Georgia,serif;letter-spacing:5px}
      #benarian-intro-screen .b-tagline{margin-top:12px;font:400 clamp(17px,3.7vw,29px)/1.12 'Cormorant Garamond',Georgia,serif;letter-spacing:2.5px;white-space:nowrap}
      #benarian-intro-screen .b-rule{width:110px;height:1px;margin:22px auto 15px;background:linear-gradient(90deg,transparent,#d4a64d,transparent)}
      #benarian-intro-screen .b-role{color:#e5b85e;font:500 clamp(11px,2.5vw,17px)/1.2 Inter,Arial,sans-serif;letter-spacing:4px}
      #benarian-intro-screen .b-signature-img{display:block;width:min(72vw,440px);height:auto;margin:9px auto 0;filter:invert(1) drop-shadow(0 2px 8px rgba(0,0,0,.3))}
      @keyframes benarianIntroScreen{0%,96%{opacity:1;visibility:visible}100%{opacity:1;visibility:hidden}}
      @keyframes benarianCinematicDrift{0%{transform:scale(1.035) translate3d(0,0,0)}100%{transform:scale(1.095) translate3d(-.7%,-.5%,0)}}
      @keyframes benarianWaterFlow{0%{transform:translate3d(-1.5%,0,0) scaleX(1.02);background-position:0 0}100%{transform:translate3d(1.5%,-1.2%,0) scaleX(.98);background-position:38px 13px}}
      @media(prefers-reduced-motion:reduce){#benarian-intro-screen::before,#benarian-intro-screen::after{animation:none!important}}
      @media(max-width:760px){#benarian-intro-screen .b-copy{width:94vw}#benarian-intro-screen .b-brand{font-size:25px;letter-spacing:3px}#benarian-intro-screen .b-tagline{font-size:16px;letter-spacing:.9px}#benarian-intro-screen .b-rule{margin:17px auto 12px;width:86px}#benarian-intro-screen .b-role{font-size:11px;letter-spacing:2.7px}#benarian-intro-screen .b-signature-img{width:min(78vw,330px);margin-top:7px}}
    `;
    document.head.appendChild(style);

    const screen=document.createElement('div');
    screen.id='benarian-intro-screen';
    screen.innerHTML='<div class="b-copy"><div class="b-brand">BENARIAN</div><div class="b-tagline">LUXURY TRAVEL &amp; HOSPITALITY</div><div class="b-rule"></div><div class="b-role">FOUNDER | CEO</div><img class="b-signature-img" src="/assets/ben-tafreshi-signature.png?v=20260812final4" alt="Ben Tafreshi signature"></div>';
    document.body.appendChild(screen);
    const cleanup=()=>{screen.remove();style.remove();};
    screen.addEventListener('animationend',cleanup,{once:true});
    setTimeout(cleanup,6200);
  }

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
      if(links[0]){links[0].href=WHATSAPP_URL;links[0].target='_blank';links[0].rel='noopener';}
      if(links[1]){links[1].href=EMAIL_URL;links[1].removeAttribute('target');}
      if(links[2]) links[2].href='contact.html';
    });
  }

  function optimiseImages(){
    const imgs=[...document.images];
    const firstVisible=imgs.find(img=>img.getBoundingClientRect().top < window.innerHeight*1.2);
    imgs.forEach(img=>{img.decoding='async';if(img===firstVisible){img.loading='eager';img.fetchPriority='high';}else{img.loading='lazy';img.fetchPriority='low';}});
  }

  function installPerformanceHints(){
    ['https://images.unsplash.com','https://www.booking.com','https://fonts.gstatic.com'].forEach(href=>{
      if(document.head.querySelector(`link[rel="preconnect"][href="${href}"]`))return;
      const l=document.createElement('link');l.rel='preconnect';l.href=href;l.crossOrigin='anonymous';document.head.appendChild(l);
    });
    if(!document.getElementById('benarian-global-stability')){
      const s=document.createElement('style');s.id='benarian-global-stability';s.textContent=`
        .topline .right .benarian-utility{display:inline-flex;align-items:center;gap:5px;border:0;background:transparent;color:inherit;text-decoration:none;font:inherit;cursor:pointer;padding:0}
        .topline .right .benarian-utility:hover{color:#b9872c}
        img{max-width:100%;height:auto}
        @media(max-width:760px){button,a{touch-action:manipulation}}
      `;document.head.appendChild(s);
    }
  }

  function installGuaranteedPromoSlider(){
    const oldRotator=document.querySelector('.benarian-promo-rotator');
    if(!oldRotator || oldRotator.dataset.benarianTakeover==='true') return;
    const rotator=oldRotator.cloneNode(true);
    oldRotator.replaceWith(rotator);
    rotator.dataset.benarianTakeover='true';

    const track=rotator.querySelector('.benarian-promo-track');
    const dots=rotator.querySelector('.benarian-promo-dots');
    const slides=[...track.querySelectorAll('.benarian-promo-slide')];
    if(!slides.length) return;

    if(!document.getElementById('benarian-takeover-motion')){
      const style=document.createElement('style');
      style.id='benarian-takeover-motion';
      style.textContent=`
        @media(max-width:760px){
          body.home-lux .benarian-promo-rotator[data-benarian-takeover="true"]{overflow:hidden!important;padding-left:0!important;padding-right:0!important}
          body.home-lux .benarian-promo-rotator[data-benarian-takeover="true"] .benarian-promo-track{overflow:visible!important}
          body.home-lux .benarian-promo-rotator[data-benarian-takeover="true"] .benarian-promo-slide{left:4%!important;right:auto!important;width:92%!important;border-radius:14px!important;transform-origin:center center!important;transition:none!important;animation:none!important}
        }
      `;
      document.head.appendChild(style);
    }

    let current=0,timer=null,busy=false;
    dots.innerHTML='';
    slides.forEach((slide,i)=>{
      slide.classList.remove('is-active','is-prev','is-next');
      slide.style.setProperty('opacity',i===0?'1':'0','important');
      slide.style.setProperty('visibility',i===0?'visible':'hidden','important');
      slide.style.setProperty('transform','scale(1)','important');
      slide.style.setProperty('z-index',i===0?'3':'1','important');
      slide.style.setProperty('pointer-events',i===0?'auto':'none','important');
      if(i===0) slide.classList.add('is-active');
      const d=document.createElement('button');d.className='benarian-promo-dot'+(i===0?' active':'');d.setAttribute('aria-label','Go to promotion '+(i+1));d.addEventListener('click',()=>transitionTo(i));dots.appendChild(d);
    });
    function markDots(){[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===current));}
    function transitionTo(nextIndex){
      if(busy||nextIndex===current)return;busy=true;clearTimeout(timer);
      const outgoing=slides[current],incoming=slides[nextIndex];
      outgoing.style.setProperty('visibility','visible','important');outgoing.style.setProperty('opacity','1','important');outgoing.style.setProperty('z-index','5','important');outgoing.style.setProperty('pointer-events','none','important');outgoing.style.setProperty('transition','transform 560ms cubic-bezier(.18,.78,.22,1), opacity 560ms ease','important');outgoing.style.setProperty('transform','scale(1.085)','important');
      setTimeout(()=>{outgoing.style.setProperty('transform','scale(1.16)','important');outgoing.style.setProperty('opacity','0','important');},240);
      setTimeout(()=>{
        outgoing.classList.remove('is-active');outgoing.style.setProperty('visibility','hidden','important');outgoing.style.setProperty('z-index','1','important');outgoing.style.setProperty('transform','scale(1)','important');outgoing.style.setProperty('transition','none','important');
        incoming.classList.add('is-active');incoming.style.setProperty('visibility','visible','important');incoming.style.setProperty('opacity','0','important');incoming.style.setProperty('z-index','4','important');incoming.style.setProperty('pointer-events','auto','important');incoming.style.setProperty('transition','none','important');incoming.style.setProperty('transform','scale(.88)','important');
        requestAnimationFrame(()=>requestAnimationFrame(()=>{incoming.style.setProperty('transition','transform 610ms cubic-bezier(.18,.78,.22,1), opacity 500ms ease','important');incoming.style.setProperty('transform','scale(1)','important');incoming.style.setProperty('opacity','1','important');}));
        current=nextIndex;markDots();setTimeout(()=>{busy=false;start();},640);
      },575);
    }
    function next(){transitionTo((current+1)%slides.length)}function prev(){transitionTo((current-1+slides.length)%slides.length)}function start(){clearTimeout(timer);timer=setTimeout(next,3400)}
    const prevBtn=rotator.querySelector('.benarian-promo-prev'),nextBtn=rotator.querySelector('.benarian-promo-next');if(prevBtn)prevBtn.addEventListener('click',prev);if(nextBtn)nextBtn.addEventListener('click',next);
    let touchStart=0;rotator.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].clientX;clearTimeout(timer)},{passive:true});rotator.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchStart;if(Math.abs(d)>45)(d<0?next:prev)();else start()},{passive:true});rotator.addEventListener('mouseenter',()=>clearTimeout(timer));rotator.addEventListener('mouseleave',start);document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(timer);else start()});start();
  }

  function apply(){installIntroFounderOverlay();fixUtilities();fixConciergeLinks();optimiseImages();installPerformanceHints();installGuaranteedPromoSlider();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  window.addEventListener('load',()=>setTimeout(apply,120),{once:true});
})();
