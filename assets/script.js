// BENARIAN global runtime
function loadCssOnce(href, key){if(document.querySelector(`link[data-${key}]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.setAttribute(`data-${key}`,'true');document.head.appendChild(l)}
loadCssOnce('assets/white-theme.css?v=20260722','benarian-white-theme');
if(document.querySelector('.hotels-hero'))loadCssOnce('assets/hotels-mobile-fix.css?v=20260724a','benarian-hotels-mobile');

const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
if(menu&&nav)menu.addEventListener('click',()=>nav.classList.toggle('open'));
if(nav){
  const ensureNavLink=(href,label,beforeHref='restaurants.html')=>{if(nav.querySelector(`a[href="${href}"]`))return;const link=document.createElement('a');link.href=href;link.textContent=label;const before=nav.querySelector(`a[href="${beforeHref}"]`);before?nav.insertBefore(link,before):nav.appendChild(link)};
  ensureNavLink('iran-flights.html','IRAN FLIGHTS');ensureNavLink('iran-tours.html','IRAN TOURS');
}
const currentPage=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav a').forEach(link=>{if(link.getAttribute('href')===currentPage)link.classList.add('current')});

function openPartnerLink(key,fallback){const p=window.BENARIAN_PARTNERS?.[key];const url=p?.enabled&&p?.affiliateBaseUrl?p.affiliateBaseUrl:fallback;if(!url)return;/^https?:/i.test(url)?window.open(url,'_blank','noopener'):location.href=url}
const tabRoutes={'HOTELS':null,'RESTAURANTS':{fallback:'restaurants.html'},'EXPERIENCES':{partner:'attractions',fallback:'experiences.html'},'SPA & WELLNESS':{fallback:'wellness.html'},'TRANSFERS':{partner:'taxi',fallback:'contact.html'},'FLIGHTS':{partner:'flights',fallback:'iran-flights.html'},'YACHTS':{fallback:'yacht-charter.html'},'HELICOPTER TOURS':{fallback:'helicopter-tours.html'},'LUXURY CARS':{partner:'cars',fallback:'luxury-cars.html'}};
document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));tab.classList.add('active');const label=tab.textContent.replace(/^[^A-Z]+/,'').trim();const route=tabRoutes[label];if(route)openPartnerLink(route.partner,route.fallback)}));
const serviceRoutes={'SPA & WELLNESS':{fallback:'wellness.html'},'AIRPORT TRANSFERS':{partner:'taxi',fallback:'contact.html'},'YACHT CHARTERS':{fallback:'yacht-charter.html'},'HELICOPTER TOURS':{fallback:'helicopter-tours.html'},'LUXURY CARS':{partner:'cars',fallback:'luxury-cars.html'},'TRAVEL INSURANCE':{fallback:'contact.html'}};
document.querySelectorAll('.service').forEach(service=>{const route=serviceRoutes[service.querySelector('h4')?.textContent.trim()];if(!route)return;service.setAttribute('role','link');service.setAttribute('tabindex','0');const go=()=>openPartnerLink(route.partner,route.fallback);service.addEventListener('click',go);service.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});

const checkinInput=document.querySelector('#checkin'),checkoutInput=document.querySelector('#checkout');
if(checkinInput&&checkoutInput){const iso=d=>d.toISOString().slice(0,10),today=new Date(),ci=new Date(today),co=new Date(today);ci.setDate(today.getDate()+7);co.setDate(today.getDate()+11);if(!checkinInput.value||checkinInput.value<iso(today))checkinInput.value=iso(ci);if(!checkoutInput.value||checkoutInput.value<=checkinInput.value)checkoutInput.value=iso(co);checkinInput.min=iso(today);checkoutInput.min=iso(ci);checkinInput.addEventListener('change',()=>{const n=new Date(`${checkinInput.value}T12:00:00`);n.setDate(n.getDate()+1);checkoutInput.min=iso(n);if(checkoutInput.value<=checkinInput.value)checkoutInput.value=iso(n)})}
const form=document.querySelector('.booking-form');
if(form)form.addEventListener('submit',e=>{e.preventDefault();const destination=(document.querySelector('#destination')?.value||'Bali').trim(),params=new URLSearchParams({destination});if(checkinInput?.value)params.set('startDate',checkinInput.value);if(checkoutInput?.value)params.set('endDate',checkoutInput.value);location.href=`https://www.expedia.com.au/Hotel-Search?${params}`});

const hotelRow=document.querySelector('.hotel-row');
if(hotelRow&&hotelRow.children.length>1){hotelRow.style.transition='opacity .35s ease, transform .35s ease';let timer;const rotate=()=>{hotelRow.style.opacity='0';hotelRow.style.transform='translateY(6px)';setTimeout(()=>{hotelRow.appendChild(hotelRow.firstElementChild);hotelRow.style.opacity='1';hotelRow.style.transform='translateY(0)'},360)},start=()=>{clearInterval(timer);timer=setInterval(rotate,5000)};hotelRow.addEventListener('mouseenter',()=>clearInterval(timer));hotelRow.addEventListener('mouseleave',start);hotelRow.addEventListener('focusin',()=>clearInterval(timer));hotelRow.addEventListener('focusout',start);start()}

function safeText(v,f=''){return typeof v==='string'&&v.trim()?v.trim():f}
function hideDuplicateHomeHotelSection(){
  if(!document.body.classList.contains('home-lux'))return;
  const duplicate=document.querySelector('[aria-labelledby="weekend-deals-title"]');
  if(duplicate)duplicate.remove();
}
function addFeaturedHotelStyles(){if(document.querySelector('#featured-hotel-detail-styles'))return;const style=document.createElement('style');style.id='featured-hotel-detail-styles';style.textContent=`
.home-lux .hotels-section{padding-top:78px;padding-bottom:78px;background:#fff}
.home-lux .hotels-section .lux-hotel-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;max-width:1320px;margin:0 auto}
.featured-hotel-card{background:#fff;border:1px solid #e4d5b9;box-shadow:0 18px 48px rgba(73,52,20,.1);overflow:hidden;display:flex;flex-direction:column}
.featured-hotel-media{position:relative;min-height:390px;overflow:hidden;background:#eee8dd}
.featured-hotel-media img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover;transition:transform .7s ease}
.featured-hotel-card:hover .featured-hotel-media img{transform:scale(1.035)}
.featured-hotel-badge{position:absolute;left:20px;top:20px;background:rgba(22,18,13,.88);color:#f2cd83;padding:10px 13px;font-size:9px;font-weight:800;letter-spacing:1.4px}
.featured-hotel-body{padding:28px 28px 30px;display:flex;flex-direction:column;flex:1}
.featured-hotel-location{color:#a46c18;font-size:10px;font-weight:800;letter-spacing:1.7px;margin:0 0 9px}
.featured-hotel-body h3{font:600 clamp(31px,3vw,43px)/1.02 'Cormorant Garamond',Georgia,serif;color:#201a13;margin:0 0 8px}
.featured-hotel-tagline{font-weight:700;color:#4f4334;margin:0 0 14px;line-height:1.5}
.featured-hotel-description{color:#6f6251;line-height:1.75;margin:0 0 18px;font-size:14px}
.featured-hotel-highlights{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 22px;padding:0;list-style:none}
.featured-hotel-highlights li{border:1px solid #e2d2b5;background:#fbf7ef;color:#76551f;padding:8px 10px;font-size:10px;font-weight:700}
.featured-hotel-price{font-size:12px;color:#8d611e;font-weight:800;margin:0 0 18px}
.featured-hotel-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:auto}
.featured-hotel-actions a{text-align:center;text-decoration:none;padding:14px 12px;font-size:10px;font-weight:800;letter-spacing:.6px}
.featured-hotel-actions .view-hotel{background:#17130e;color:#fff}.featured-hotel-actions .contact-hotel{background:#b9872c;color:#fff}
.featured-direct-contact{max-width:1320px;margin:28px auto 0;padding:28px 30px;display:flex;align-items:center;justify-content:space-between;gap:28px;border:1px solid #d8b46b;background:linear-gradient(135deg,#fffaf0,#f6ead2);box-shadow:0 16px 40px rgba(86,57,18,.08)}
.featured-direct-contact-copy{max-width:760px}.featured-direct-contact span{display:block;color:#a86f16;font-size:10px;font-weight:800;letter-spacing:2px;margin-bottom:9px}.featured-direct-contact h3{margin:0 0 10px;font:600 clamp(27px,3vw,38px)/1.05 'Cormorant Garamond',Georgia,serif;color:#211a12}.featured-direct-contact p{margin:5px 0;color:#655744;line-height:1.65}.featured-direct-contact p[lang='fa']{font-size:14px;color:#8b611d}.featured-direct-contact>a{flex:0 0 auto;background:#b9872c;color:#fff;text-decoration:none;padding:15px 20px;font-size:11px;font-weight:800;letter-spacing:.7px}
@media(max-width:850px){.home-lux .hotels-section .lux-hotel-grid{grid-template-columns:1fr}.featured-hotel-media{min-height:340px}}
@media(max-width:760px){.home-lux .hotels-section{padding-left:18px;padding-right:18px}.featured-hotel-body{padding:23px 20px 24px}.featured-hotel-media{min-height:300px}.featured-hotel-actions{grid-template-columns:1fr}.featured-direct-contact{align-items:flex-start;flex-direction:column;padding:24px 20px}.featured-direct-contact>a{width:100%;text-align:center}}
`;document.head.appendChild(style)}
async function loadFeaturedHotels(){const grid=document.querySelector('.lux-hotel-grid');if(!grid)return;try{const r=await fetch('data/hotels.json',{cache:'no-store'});if(!r.ok)return;const data=await r.json();if(!Array.isArray(data.featuredHotels)||!data.featuredHotels.length)return;addFeaturedHotelStyles();grid.innerHTML='';data.featuredHotels.forEach(h=>{const card=document.createElement('article');card.className='featured-hotel-card';const highlights=Array.isArray(h.highlights)?h.highlights:[];card.innerHTML=`<div class="featured-hotel-media"><img src="${safeText(h.image,'assets/images/hotel-ayana.jpg')}" alt="${safeText(h.name,'Luxury hotel')}" loading="lazy"><span class="featured-hotel-badge">${safeText(h.score,'BENARIAN SELECTION')}</span></div><div class="featured-hotel-body"><p class="featured-hotel-location">${safeText(h.location,'Bali').toUpperCase()}</p><h3>${safeText(h.name,'Luxury Hotel')}</h3><p class="featured-hotel-tagline">${safeText(h.tagline,'A handpicked BENARIAN stay')}</p><p class="featured-hotel-description">${safeText(h.description,'A carefully selected luxury stay in Bali.')}</p><ul class="featured-hotel-highlights">${highlights.map(item=>`<li>${safeText(item)}</li>`).join('')}</ul><p class="featured-hotel-price">${safeText(h.price,'Contact BENARIAN for preferred rates')}</p><div class="featured-hotel-actions"><a class="view-hotel" href="${safeText(h.bookingUrl,'hotels.html')}" target="_blank" rel="noopener sponsored">VIEW HOTEL →</a><a class="contact-hotel" href="contact.html">GET BEST PRICE →</a></div></div>`;grid.appendChild(card)});addFeaturedDirectContactBanner(grid)}catch(err){console.warn('BENARIAN hotel data could not be loaded.',err)}}
function addFeaturedDirectContactBanner(grid){if(!grid||document.querySelector('.featured-direct-contact'))return;const banner=document.createElement('div');banner.className='featured-direct-contact';banner.innerHTML=`<div class="featured-direct-contact-copy"><span>BENARIAN PRIVATE RATES</span><h3>Looking for the best available price in Ubud or Jimbaran?</h3><p>Contact BENARIAN directly for personalised assistance and preferred-rate enquiries for these two special Bali regions.</p><p lang="fa" dir="rtl">برای دریافت بهترین قیمت در مناطق اوبود و جیمباران، مستقیماً با من تماس بگیرید.</p></div><a href="contact.html">Contact Ben Directly →</a>`;grid.insertAdjacentElement('afterend',banner)}

const MEMBER_KEY='benarianMember';
function getMember(){try{return JSON.parse(localStorage.getItem(MEMBER_KEY)||'null')}catch{return null}}
function saveMember(m){localStorage.setItem(MEMBER_KEY,JSON.stringify(m))}
function displayMemberState(){const m=getMember();document.querySelectorAll('[data-member-name]').forEach(el=>el.textContent=m?.name||m?.email?.split('@')[0]||'BENARIAN Member');const locked=document.querySelector('#member-locked'),unlocked=document.querySelector('#member-unlocked');if(locked&&unlocked){locked.hidden=!!m;unlocked.hidden=!m}document.querySelectorAll('.member-top-link').forEach(link=>{if(m){link.textContent='♟ My Account';link.href='member-dashboard.html'}});if(location.pathname.endsWith('member-dashboard.html')&&!m)location.replace('member-login.html?next=member-dashboard.html')}
const loginForm=document.querySelector('#member-login-form');if(loginForm)loginForm.addEventListener('submit',e=>{e.preventDefault();const email=document.querySelector('#member-email').value.trim(),password=document.querySelector('#member-password').value,msg=document.querySelector('#member-form-message');if(password.length<6){msg.textContent='Please enter a password with at least 6 characters.';return}saveMember({email,name:email.split('@')[0]});msg.textContent='Sign-in successful. Opening your dashboard…';setTimeout(()=>location.href='member-dashboard.html',450)});
const joinForm=document.querySelector('#member-join-form');if(joinForm)joinForm.addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#member-name').value.trim(),email=document.querySelector('#member-email').value.trim(),password=document.querySelector('#member-password').value,consent=document.querySelector('#member-consent').checked,msg=document.querySelector('#member-form-message');if(!name||password.length<6||!consent){msg.textContent='Please complete all fields and accept the privacy terms.';return}saveMember({name,email});msg.textContent='Welcome to BENARIAN. Opening your private member area…';setTimeout(()=>location.href='member-dashboard.html',500)});
const logout=document.querySelector('#member-logout');if(logout)logout.addEventListener('click',()=>{localStorage.removeItem(MEMBER_KEY);location.href='member-login.html'});
function ensureMainLegalLinks(){document.querySelectorAll('.footer').forEach(footer=>{let support=Array.from(footer.querySelectorAll('div')).find(g=>/Support/i.test(g.querySelector('strong')?.textContent||''));if(!support){support=document.createElement('div');support.innerHTML='<strong>Support</strong>';footer.appendChild(support)}if(!support.querySelector('a[href="terms-and-conditions.html"]')){const terms=document.createElement('a');terms.href='terms-and-conditions.html';terms.textContent='Terms & Conditions';const privacy=support.querySelector('a[href="privacy-policy.html"]');privacy?support.insertBefore(terms,privacy):support.appendChild(terms)}})}

function fixPersianHotelCards(){
  document.querySelectorAll('.iran-hotel').forEach(card=>{
    const title=card.querySelector('h3')?.textContent.trim();
    const img=card.querySelector('.hotel-media img');
    if(title==='Shiraz Grand Hotel'&&img){
      img.src='https://commons.wikimedia.org/wiki/Special:Redirect/file/%D9%88%D8%B1%D9%88%D8%AF%D9%8A_%D8%B4%D9%85%D8%A7%D9%84%D9%8A_%D8%B4%D9%87%D8%B1_%D8%B4%D9%8A%D8%B1%D8%A7%D8%B2.jpg?width=1800';
      img.alt='Shiraz Grand Hotel near Quran Gate';
      img.onerror=null;
    }
    if(title==='Darvishi Royal Hotel'){
      if(img){
        img.src='https://commons.wikimedia.org/wiki/Special:Redirect/file/%D9%87%D9%85%D8%A7%D9%87%D8%AA%D9%84_%D9%87%D9%85%D8%A7_1_(%D8%A7%D8%AD%D9%85%D8%AF%D8%A2%D8%A7%D8%AF)-%D9%87%D8%AA%D9%84_%D9%87%D8%A7%DB%8C%D8%AA.jpg?width=1800';
        img.alt='Homa Hotel 1 Mashhad';
        img.onerror=null;
      }
      const badge=card.querySelector('.hotel-badge');if(badge)badge.textContent='MASHHAD LANDMARK';
      const location=card.querySelector('.hotel-location');if(location)location.textContent='MASHHAD · AHMADABAD';
      const heading=card.querySelector('h3');if(heading)heading.textContent='Homa Hotel 1 Mashhad';
      const desc=card.querySelector('.hotel-body p');if(desc)desc.textContent='A recognised five-star hotel in central Mashhad, offering established hospitality, landscaped grounds and convenient access to the city’s main attractions.';
      const foot=card.querySelector('.hotel-foot strong');if(foot)foot.textContent='Classic city stay';
    }
  });
}

hideDuplicateHomeHotelSection();loadFeaturedHotels();displayMemberState();ensureMainLegalLinks();fixPersianHotelCards();setTimeout(ensureMainLegalLinks,700);setTimeout(fixPersianHotelCards,700);