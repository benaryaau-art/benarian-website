(() => {
  const NAV_ITEMS = [
    ['destinations.html','DESTINATIONS'],
    ['hotels.html','HOTELS'],
    ['flights.html','FLIGHTS'],
    ['persian-experiences.html','PERSIAN EXPERIENCES'],
    ['experiences.html','EXPERIENCES'],
    ['wellness.html','SPA & WELLNESS'],
    ['visa-guide.html','VISA GUIDE'],
    ['travel-guides.html','TRAVEL GUIDE'],
    ['about.html','ABOUT US'],
    ['contact.html','CONTACT'],
    ['terms-and-conditions.html','TERMS & CONDITIONS']
  ];

  const FOOTER_HTML = `
    <footer class="benarian-footer-v3" aria-label="BENARIAN footer">
      <div class="bf3-brand-block">
        <a href="index.html" class="bf3-brand" aria-label="BENARIAN home">
          <span class="bf3-mark" aria-hidden="true">BB</span>
          <span class="bf3-copy"><strong>BENARIAN</strong><small>LUXURY TRAVEL & HOSPITALITY</small></span>
        </a>
        <a class="bf3-whatsapp" href="https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%20need%20assistance%20with%20my%20travel%20booking." target="_blank" rel="noopener">
          <span class="bf3-dot" aria-hidden="true"></span><span>LIVE CONCIERGE · WHATSAPP</span>
        </a>
        <p class="bf3-talk">Talk to our team or Ben Tafreshi</p>
      </div>
      <div class="bf3-column"><strong>Company</strong><a href="about.html">About Us</a><a href="experiences.html">Our Services</a><a href="contact.html">Concierge</a></div>
      <div class="bf3-column"><strong>Support</strong><a href="contact.html">FAQ</a><a href="privacy-policy.html">Privacy Policy</a><a href="affiliate-disclosure.html">Affiliate Disclosure</a><a href="terms-and-conditions.html">Terms & Conditions</a></div>
      <div class="bf3-column"><strong>Follow Us</strong><a href="https://www.instagram.com/benarianhotels" target="_blank" rel="noopener">Instagram</a><a href="mailto:info@benarian.com">Email</a></div>
      <p class="bf3-copyright">© 2026 BENARIAN Pty Ltd. All rights reserved.</p>
    </footer>`;

  const CSS = `
    footer.footer,footer.lux-footer,footer.benarian-canonical-footer,footer.benarian-footer-v2,footer.benarian-guide-footer{display:none!important}
    .header .brand-lockup{display:flex!important;align-items:center!important;text-decoration:none!important}
    .header .brand-lockup .brand-mark{display:block!important;color:#b9872c!important;font:600 48px/.76 'Cormorant Garamond',Georgia,serif!important;letter-spacing:-8px!important;margin-right:18px!important;transform:scaleX(.84)!important}
    .header .brand-lockup .brand-copy{display:flex!important;flex-direction:column!important}
    .header .brand-lockup .brand-copy strong{color:#17130f!important;font:600 28px/.9 'Cormorant Garamond',Georgia,serif!important;letter-spacing:4.4px!important;white-space:nowrap!important}
    .header .brand-lockup .brand-copy small{margin-top:7px!important;color:#b9872c!important;font:700 7px/1.2 Inter,Arial,sans-serif!important;letter-spacing:1.25px!important;white-space:nowrap!important}
    .header .nav{min-height:42px!important}
    .header .nav a{flex:0 0 auto!important}
    .topline .right .benarian-utility{display:inline-flex!important;align-items:center!important;gap:5px!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;color:inherit!important;text-decoration:none!important;font:inherit!important;line-height:inherit!important;white-space:nowrap!important;cursor:pointer!important}
    .topline .right .benarian-utility:hover{color:#b9872c!important}
    .benarian-footer-v3{position:relative!important;inset:auto!important;float:none!important;clear:both!important;display:grid!important;width:100%!important;max-width:none!important;min-height:0!important;height:auto!important;grid-template-columns:minmax(280px,1.3fr) repeat(3,minmax(120px,.55fr))!important;gap:32px!important;align-items:start!important;margin:0!important;padding:48px 6% 36px!important;background:#fbf7ef!important;border:0!important;border-top:1px solid #e3d3b7!important;border-radius:0!important;box-shadow:none!important;color:#6d6254!important;font-family:Inter,Arial,sans-serif!important;font-size:16px!important;line-height:1.5!important;box-sizing:border-box!important;overflow:visible!important;transform:none!important;z-index:1!important}
    .benarian-footer-v3 *{box-sizing:border-box!important;min-width:0!important;max-width:100%!important}
    .bf3-brand-block{display:flex!important;flex-direction:column!important;align-items:flex-start!important;margin:0!important;padding:0!important}
    .bf3-brand{display:inline-flex!important;flex-direction:row!important;align-items:center!important;width:auto!important;margin:0!important;padding:0!important;background:none!important;border:0!important;text-decoration:none!important}
    .bf3-mark{display:block!important;flex:0 0 auto!important;margin:0 16px 0 0!important;padding:0!important;color:#b9872c!important;font:600 48px/.78 'Cormorant Garamond',Georgia,serif!important;letter-spacing:-7px!important;transform:scaleX(.84)!important}
    .bf3-copy{display:flex!important;flex-direction:column!important;align-items:flex-start!important;margin:0!important;padding:0!important}.bf3-copy strong{display:block!important;margin:0!important;padding:0!important;color:#17130f!important;font:600 29px/.92 'Cormorant Garamond',Georgia,serif!important;letter-spacing:4.3px!important;white-space:nowrap!important}.bf3-copy small{display:block!important;margin:7px 0 0!important;padding:0!important;color:#b9872c!important;font:700 7px/1.2 Inter,Arial,sans-serif!important;letter-spacing:1.2px!important;white-space:nowrap!important}
    .bf3-whatsapp{display:inline-flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:9px!important;width:auto!important;margin:20px 0 0!important;padding:10px 14px!important;background:transparent!important;border:1px solid #c8953d!important;border-radius:999px!important;color:#755f45!important;text-decoration:none!important;font:700 10px/1.25 Inter,Arial,sans-serif!important;letter-spacing:.75px!important;white-space:nowrap!important}.bf3-dot{display:block!important;flex:0 0 9px!important;width:9px!important;height:9px!important;margin:0!important;padding:0!important;border-radius:50%!important;background:#25d366!important;box-shadow:0 0 0 5px rgba(37,211,102,.14)!important}.bf3-talk{display:block!important;margin:9px 0 0!important;padding:0!important;color:#746a5d!important;font:500 12px/1.5 Inter,Arial,sans-serif!important}
    .bf3-column{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:9px!important;margin:0!important;padding:0!important}.bf3-column strong{display:block!important;margin:0 0 4px!important;padding:0!important;color:#211d18!important;font:700 14px/1.3 Inter,Arial,sans-serif!important}.bf3-column a{display:block!important;margin:0!important;padding:0!important;color:#766d61!important;text-decoration:none!important;font:400 12px/1.5 Inter,Arial,sans-serif!important}.bf3-column a:hover{color:#9b681a!important}.bf3-copyright{grid-column:1/-1!important;display:block!important;margin:8px 0 0!important;padding:20px 0 0!important;border-top:1px solid #e8dcc7!important;color:#91877a!important;font:400 11px/1.5 Inter,Arial,sans-serif!important}
    @media(max-width:900px){.header .brand-lockup .brand-mark{font-size:40px!important;margin-right:14px!important}.header .brand-lockup .brand-copy strong{font-size:23px!important;letter-spacing:3.2px!important}.header .brand-lockup .brand-copy small{font-size:6px!important;letter-spacing:.95px!important}}
    @media(max-width:850px){.benarian-footer-v3{grid-template-columns:1fr 1fr!important;gap:26px 22px!important;padding:38px 22px 140px!important}.bf3-brand-block{grid-column:1/-1!important}.bf3-copyright{grid-column:1/-1!important}}
    @media(max-width:520px){.benarian-footer-v3{grid-template-columns:1fr 1fr!important;gap:24px 18px!important;padding:34px 18px 132px!important}.bf3-brand-block{grid-column:1/-1!important}.bf3-mark{font-size:39px!important;margin-right:12px!important}.bf3-copy strong{font-size:22px!important;letter-spacing:2.8px!important}.bf3-copy small{font-size:5.7px!important;letter-spacing:.78px!important}.bf3-whatsapp{font-size:8.5px!important;padding:9px 12px!important}.bf3-talk{font-size:11px!important}.bf3-column strong{font-size:13px!important}.bf3-column a{font-size:11px!important}.bf3-column:last-of-type{grid-column:1/-1!important;display:grid!important;grid-template-columns:auto auto!important;justify-content:start!important;column-gap:18px!important}.bf3-column:last-of-type strong{grid-column:1/-1!important}.bf3-copyright{grid-column:1/-1!important;font-size:10px!important}}
  `;

  function normalPage(v){return(v||'index').replace(/^.*\//,'').replace(/\.html$/,'')||'index'}
  function desiredNavHtml(){return NAV_ITEMS.map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}
  function navSignature(nav){return [...nav.querySelectorAll('a')].map(a=>`${normalPage(a.getAttribute('href'))}:${(a.textContent||'').trim()}`).join('|')}
  const DESIRED_SIGNATURE=NAV_ITEMS.map(([href,label])=>`${normalPage(href)}:${label}`).join('|');

  function installAppMeta(){
    const links=[['manifest','/site.webmanifest'],['icon','/favicon.svg'],['shortcut icon','/favicon.svg'],['apple-touch-icon','/favicon.svg']];
    links.forEach(([rel,href])=>{let link=document.head.querySelector(`link[rel="${rel}"]`);if(!link){link=document.createElement('link');link.rel=rel;document.head.appendChild(link)}link.href=href;if(rel.includes('icon'))link.type='image/svg+xml'});
    let theme=document.head.querySelector('meta[name="theme-color"]');if(!theme){theme=document.createElement('meta');theme.name='theme-color';document.head.appendChild(theme)}theme.content='#ffffff';
  }

  function installSeoMeta(){
    const page=normalPage(location.pathname);
    if(page!=='index')return;
    const description='Discover curated luxury hotels, resorts, destinations, flights, wellness retreats and exceptional travel experiences with BENARIAN.';
    document.title='BENARIAN | Luxury Travel & Hospitality';
    const setMeta=(selector,attrs)=>{let node=document.head.querySelector(selector);if(!node){node=document.createElement('meta');document.head.appendChild(node)}Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));};
    setMeta('meta[name="description"]',{name:'description',content:description});
    setMeta('meta[property="og:title"]',{property:'og:title',content:'BENARIAN | Luxury Travel & Hospitality'});
    setMeta('meta[property="og:description"]',{property:'og:description',content:description});
    setMeta('meta[property="og:type"]',{property:'og:type',content:'website'});
    setMeta('meta[property="og:url"]',{property:'og:url',content:'https://benarian.com/'});
    setMeta('meta[property="og:image"]',{property:'og:image',content:'https://benarian.com/favicon.svg'});
    setMeta('meta[name="twitter:card"]',{name:'twitter:card',content:'summary'});
    setMeta('meta[name="twitter:title"]',{name:'twitter:title',content:'BENARIAN | Luxury Travel & Hospitality'});
    setMeta('meta[name="twitter:description"]',{name:'twitter:description',content:description});
    let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}canonical.href='https://benarian.com/';
    let schema=document.getElementById('benarian-structured-data');if(!schema){schema=document.createElement('script');schema.type='application/ld+json';schema.id='benarian-structured-data';document.head.appendChild(schema)}
    schema.textContent=JSON.stringify({
      '@context':'https://schema.org',
      '@graph':[
        {'@type':'Organization','@id':'https://benarian.com/#organization','name':'BENARIAN','alternateName':'Benarian Hotels','url':'https://benarian.com/','logo':{'@type':'ImageObject','url':'https://benarian.com/favicon.svg','width':512,'height':512},'sameAs':['https://www.instagram.com/benarianhotels']},
        {'@type':'WebSite','@id':'https://benarian.com/#website','url':'https://benarian.com/','name':'BENARIAN','alternateName':'BENARIAN Luxury Travel & Hospitality','publisher':{'@id':'https://benarian.com/#organization'},'inLanguage':'en'},
        {'@type':'WebPage','@id':'https://benarian.com/#webpage','url':'https://benarian.com/','name':'BENARIAN | Luxury Travel & Hospitality','isPartOf':{'@id':'https://benarian.com/#website'},'about':{'@id':'https://benarian.com/#organization'},'description':description,'inLanguage':'en'}
      ]
    });
  }

  function installStyle(){let style=document.getElementById('benarian-final-global-style');if(!style){style=document.createElement('style');style.id='benarian-final-global-style';document.head.appendChild(style)}style.textContent=CSS}

  function installUtilities(){
    document.querySelectorAll('.topline .right').forEach(right=>{
      [...right.children].forEach(node=>{
        const text=(node.textContent||'').replace(/\s+/g,' ').trim();
        if(/Wishlist/i.test(text) && node.tagName!=='A'){
          const link=document.createElement('a');link.className='benarian-utility benarian-wishlist';link.href='member-login.html?section=wishlist';link.setAttribute('aria-label','Open Wishlist');link.innerHTML='♡ <span>Wishlist</span>';node.replaceWith(link);
        }else if(/My Bookings/i.test(text) && node.tagName!=='A' && node.tagName!=='BUTTON'){
          const link=document.createElement('a');link.className='benarian-utility benarian-bookings';link.href='member-login.html?section=bookings';link.setAttribute('aria-label','Open My Bookings');link.innerHTML='▣ <span>My Bookings</span>';node.replaceWith(link);
        }else if(/^AUD\s*⌄?$/i.test(text) && node.tagName!=='BUTTON'){
          const button=document.createElement('button');button.type='button';button.className='benarian-utility benarian-currency';button.setAttribute('aria-label','Change currency');button.dataset.currencyControl='true';node.replaceWith(button);
        }
      });
      let currency=right.querySelector('[data-currency-control="true"],#currencyButton');
      if(currency && currency.dataset.benarianCurrencyBound!=='true'){
        currency.dataset.benarianCurrencyBound='true';
        const currencies=['AUD','USD','EUR'];
        let current=localStorage.getItem('benarianCurrency')||'AUD';
        const render=()=>{const label=currency.querySelector('#currencyLabel');if(label)label.textContent=current;else currency.textContent=current+'⌄'};
        render();
        currency.addEventListener('click',event=>{event.preventDefault();current=currencies[(currencies.indexOf(current)+1)%currencies.length];localStorage.setItem('benarianCurrency',current);render()});
      }
      right.querySelectorAll('a[href="member-login.html"],a.member-top-link').forEach(a=>{a.setAttribute('aria-label','BENARIAN Members');});
    });
  }

  function installHeader(){
    document.querySelectorAll('.header').forEach(header=>{
      const brand=header.querySelector('.brand-lockup,.brand');
      if(brand && brand.dataset.benarianBrandReady!=='true'){
        brand.classList.add('brand-lockup');brand.href='index.html';brand.setAttribute('aria-label','BENARIAN home');brand.innerHTML='<span class="brand-mark" aria-hidden="true">BB</span><span class="brand-copy"><strong>BENARIAN</strong><small>LUXURY TRAVEL & HOSPITALITY</small></span>';brand.dataset.benarianBrandReady='true';
      }
      const nav=header.querySelector('.nav');
      if(nav){
        if(navSignature(nav)!==DESIRED_SIGNATURE) nav.innerHTML=desiredNavHtml();
        const current=normalPage(location.pathname);
        nav.querySelectorAll('a').forEach(a=>{a.classList.toggle('current',normalPage(a.getAttribute('href'))===current);a.addEventListener('click',()=>nav.classList.remove('open'),{once:true})});
        nav.dataset.benarianNavReady='true';
      }
      const existing=header.querySelector('.menu-btn');
      if(existing && existing.dataset.canonicalMenuReady!=='true'){
        const button=existing.cloneNode(true);existing.replaceWith(button);button.dataset.canonicalMenuReady='true';button.dataset.finalMenuBound='true';button.setAttribute('aria-label','Open menu');button.setAttribute('aria-expanded','false');
        button.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();const n=header.querySelector('.nav');if(!n)return;const open=n.classList.toggle('open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu')});
      }
    });
    if(document.documentElement.dataset.benarianMenuOutsideBound!=='true'){
      document.documentElement.dataset.benarianMenuOutsideBound='true';
      document.addEventListener('click',event=>{document.querySelectorAll('.header').forEach(header=>{if(header.contains(event.target))return;const nav=header.querySelector('.nav');const button=header.querySelector('.menu-btn');nav?.classList.remove('open');button?.setAttribute('aria-expanded','false');button?.setAttribute('aria-label','Open menu')})});
      document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;document.querySelectorAll('.header').forEach(header=>{header.querySelector('.nav')?.classList.remove('open');header.querySelector('.menu-btn')?.setAttribute('aria-expanded','false')})});
    }
  }

  function installFooter(){document.querySelectorAll('footer').forEach(f=>f.remove());const shell=document.querySelector('.shell')||document.body;shell.insertAdjacentHTML('beforeend',FOOTER_HTML)}
  function apply(){installAppMeta();installSeoMeta();installStyle();installUtilities();installHeader();installFooter()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  [350,1000,2200].forEach(ms=>setTimeout(()=>{installAppMeta();installSeoMeta();installStyle();installUtilities();if(document.querySelectorAll('.benarian-footer-v3').length!==1)installFooter()},ms));
})();