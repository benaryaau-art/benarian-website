// BENARIAN global runtime — site-wide polish and homepage offers
function loadCssOnce(href,key){
  if(document.querySelector(`link[data-${key}]`))return;
  const link=document.createElement('link');
  link.rel='stylesheet';link.href=href;link.setAttribute(`data-${key}`,'true');
  document.head.appendChild(link);
}
loadCssOnce('assets/white-theme.css?v=20260724h','benarian-white-theme');
if(document.querySelector('.hotels-hero'))loadCssOnce('assets/hotels-mobile-fix.css?v=20260724c','benarian-hotels-mobile');

const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
if(menu&&nav){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
  });
}

function normalPage(value){return (value||'index').replace(/^.*\//,'').replace(/\.html$/,'')||'index'}
const currentPage=normalPage(location.pathname);
document.querySelectorAll('.nav a').forEach(link=>{
  if(normalPage(link.getAttribute('href'))===currentPage)link.classList.add('current');
});

function ensureNavigation(){
  document.querySelectorAll('.nav').forEach(menuNav=>{
    if(!menuNav.querySelector('a[href="persian-experiences.html"]')){
      const link=document.createElement('a');link.href='persian-experiences.html';link.textContent='PERSIAN EXPERIENCES';
      const restaurants=menuNav.querySelector('a[href="restaurants.html"]');
      restaurants?menuNav.insertBefore(link,restaurants):menuNav.appendChild(link);
    }
  });
}

function normaliseBrand(){
  document.querySelectorAll('.brand-lockup .brand-mark').forEach(mark=>{mark.textContent='BB'});
}

const checkin=document.querySelector('#checkin');
const checkout=document.querySelector('#checkout');
if(checkin&&checkout){
  const iso=date=>date.toISOString().slice(0,10);
  const today=new Date();
  const first=new Date(today);first.setDate(first.getDate()+7);
  const last=new Date(today);last.setDate(last.getDate()+11);
  checkin.min=iso(today);
  if(!checkin.value||checkin.value<iso(today))checkin.value=iso(first);
  checkout.min=iso(first);
  if(!checkout.value||checkout.value<=checkin.value)checkout.value=iso(last);
  checkin.addEventListener('change',()=>{
    const next=new Date(`${checkin.value}T12:00:00`);next.setDate(next.getDate()+1);
    checkout.min=iso(next);
    if(!checkout.value||checkout.value<=checkin.value)checkout.value=iso(next);
  });
}

const bookingForm=document.querySelector('.booking-form');
if(bookingForm){
  const note=bookingForm.parentElement?.querySelector('p');
  if(note)note.textContent='Search results open securely through our Expedia partner connection. Live rates and availability are confirmed on Expedia.';
  bookingForm.addEventListener('submit',event=>{
    event.preventDefault();
    const destination=(document.querySelector('#destination')?.value||'Bali').trim();
    const params=new URLSearchParams({destination});
    if(checkin?.value)params.set('startDate',checkin.value);
    if(checkout?.value)params.set('endDate',checkout.value);
    location.href=`https://www.expedia.com.au/Hotel-Search?${params}`;
  });
}

function addFeaturedStyles(){
  if(document.querySelector('#featured-hotel-detail-styles'))return;
  const style=document.createElement('style');style.id='featured-hotel-detail-styles';style.textContent=`
html{scroll-behavior:smooth}.home-lux .hotels-section{padding-top:78px;padding-bottom:78px;background:#fff;scroll-margin-top:90px}.weekly-offers-heading{text-align:center;max-width:1050px;margin:0 auto 34px;padding:0 14px}.weekly-offers-kicker{display:block;color:#a46c18;font-size:12px;font-weight:800;letter-spacing:3px;margin-bottom:10px}.weekly-offers-heading h2{font:600 clamp(34px,4.4vw,60px)/1 'Cormorant Garamond',Georgia,serif;color:#a46c18;margin:0 0 10px;white-space:nowrap}.weekly-offers-heading .fa-title{font-size:clamp(24px,3vw,38px);font-weight:700;color:#a46c18;margin:0 0 16px}.weekly-offers-heading .places{font-size:15px;font-weight:800;letter-spacing:1.5px;color:#29231d;margin:0 0 10px}.weekly-offers-heading .contact-copy{font-size:14px;color:#655744;line-height:1.7;margin:4px 0}.home-lux .hotels-section .lux-section-head{display:none!important}.home-lux .hotels-section .lux-hotel-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;max-width:1320px;margin:0 auto}.featured-hotel-card{background:#fff;border:1px solid #e4d5b9;box-shadow:0 18px 48px rgba(73,52,20,.1);overflow:hidden;display:flex;flex-direction:column}.featured-hotel-media{position:relative;min-height:390px;overflow:hidden;background:#eee8dd}.featured-hotel-media img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover;transition:transform .55s ease}.featured-hotel-card:hover .featured-hotel-media img{transform:scale(1.025)}.featured-hotel-badge{position:absolute;left:20px;top:20px;background:rgba(22,18,13,.88);color:#f2cd83;padding:10px 13px;font-size:9px;font-weight:800;letter-spacing:1.4px}.featured-hotel-body{padding:28px;display:flex;flex-direction:column;flex:1}.featured-hotel-location{color:#a46c18;font-size:10px;font-weight:800;letter-spacing:1.7px;margin:0 0 9px}.featured-hotel-body h3{font:600 clamp(31px,3vw,43px)/1.02 'Cormorant Garamond',Georgia,serif;color:#201a13;margin:0 0 8px}.featured-hotel-tagline{font-weight:700;color:#4f4334;margin:0 0 14px;line-height:1.5}.featured-hotel-description{color:#6f6251;line-height:1.75;margin:0 0 18px;font-size:14px}.featured-hotel-highlights{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 22px;padding:0;list-style:none}.featured-hotel-highlights li{border:1px solid #e2d2b5;background:#fbf7ef;color:#76551f;padding:8px 10px;font-size:10px;font-weight:700}.featured-hotel-price{font-size:12px;color:#8d611e;font-weight:800;margin:0 0 18px}.featured-hotel-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:auto}.featured-hotel-actions a{text-align:center;text-decoration:none;padding:14px 12px;font-size:10px;font-weight:800}.view-hotel{background:#17130e;color:#fff}.contact-hotel{background:#b9872c;color:#fff}.featured-direct-contact{max-width:1320px;margin:28px auto 0;padding:28px 30px;display:flex;align-items:center;justify-content:space-between;gap:28px;border:1px solid #d8b46b;background:linear-gradient(135deg,#fffaf0,#f6ead2)}.featured-direct-contact span{display:block;color:#a86f16;font-size:10px;font-weight:800;letter-spacing:2px;margin-bottom:9px}.featured-direct-contact h3{margin:0 0 10px;font:600 clamp(27px,3vw,38px)/1.05 'Cormorant Garamond',Georgia,serif}.featured-direct-contact p{margin:5px 0;color:#655744;line-height:1.65}.featured-direct-contact>a{background:#b9872c;color:#fff;text-decoration:none;padding:15px 20px;font-size:11px;font-weight:800;white-space:nowrap}.hero-offer-btn{display:flex!important;align-items:center;justify-content:center;margin-top:14px!important;background:rgba(18,15,11,.56)!important;border:1px solid rgba(239,194,105,.9)!important;color:#fff!important;backdrop-filter:blur(7px);box-shadow:none!important}.hero-offer-btn:hover{background:#b9872c!important;border-color:#b9872c!important}.lux-hero-copy .lux-btn+.hero-offer-btn{margin-left:0}
@media(max-width:850px){.home-lux .hotels-section .lux-hotel-grid{grid-template-columns:1fr}.featured-hotel-media{min-height:340px}}
@media(max-width:760px){.weekly-offers-heading{margin-bottom:24px}.weekly-offers-heading h2{font-size:clamp(23px,7vw,34px);letter-spacing:-.4px}.weekly-offers-heading .places{font-size:12px}.featured-hotel-media{min-height:300px}.featured-hotel-actions{grid-template-columns:1fr}.featured-direct-contact{align-items:flex-start;flex-direction:column;padding:24px 20px}.featured-direct-contact>a{width:100%;text-align:center}.hero-offer-btn{margin-top:10px!important}}
`;document.head.appendChild(style);
}

function hotelCard(hotel){return `<article class="featured-hotel-card"><div class="featured-hotel-media"><img src="${hotel.image}" alt="${hotel.name}" loading="lazy"><span class="featured-hotel-badge">${hotel.badge}</span></div><div class="featured-hotel-body"><p class="featured-hotel-location">${hotel.location}</p><h3>${hotel.name}</h3><p class="featured-hotel-tagline">${hotel.tagline}</p><p class="featured-hotel-description">${hotel.description}</p><ul class="featured-hotel-highlights">${hotel.highlights.map(item=>`<li>${item}</li>`).join('')}</ul><p class="featured-hotel-price">Contact BENARIAN directly for our best available price</p><div class="featured-hotel-actions"><a class="view-hotel" href="${hotel.url}" target="_blank" rel="noopener sponsored">VIEW HOTEL →</a><a class="contact-hotel" href="contact.html">GET BEST PRICE →</a></div></div></article>`}

function renderFeaturedHotels(){
  const grid=document.querySelector('.lux-hotel-grid');if(!grid)return;
  addFeaturedStyles();
  const section=grid.closest('.hotels-section');
  if(section){
    section.id='weekly-offers';
    if(!section.querySelector('.weekly-offers-heading'))section.insertAdjacentHTML('afterbegin','<div class="weekly-offers-heading"><span class="weekly-offers-kicker">THIS WEEK’S BEST OFFERS</span><h2>Best Offers of This Week</h2><p class="fa-title" lang="fa" dir="rtl">بهترین آفرهای این هفته</p><p class="places">BALI &nbsp;|&nbsp; UBUD &amp; JIMBARAN</p><p class="contact-copy">For the best price at these two hotels, please contact me directly.</p><p class="contact-copy" lang="fa" dir="rtl">لطفاً برای دریافت بهترین قیمت در این دو هتل، مستقیماً با من تماس بگیرید.</p></div>');
  }
  const hotels=[
    {name:'Inara Alas Harum',location:'UBUD, BALI',badge:'BENARIAN UBUD SELECTION',tagline:'A serene boutique retreat surrounded by the natural beauty of Ubud',description:'Set among tropical greenery and peaceful rice-field scenery, Inara Alas Harum offers elegant accommodation, a beautiful swimming pool and easy access to Ubud’s cultural attractions.',highlights:['Peaceful Ubud setting','Tropical swimming pool','Boutique luxury atmosphere'],image:'https://inarahotels.com/alas-harum-resort-bali/wp-content/uploads/2023/11/Pool-View-Inara-Alas-Harum.webp',url:'https://www.booking.com/Share-K1krxrH'},
    {name:'Royal Tulip Springhill Resort Jimbaran',location:'JIMBARAN, BALI',badge:'BENARIAN JIMBARAN SELECTION',tagline:'A spacious tropical resort close to the beaches of southern Bali',description:'Royal Tulip Springhill Resort Jimbaran combines spacious rooms and suites, landscaped gardens and excellent resort facilities—ideal for couples, families and relaxed Bali holidays.',highlights:['Spacious rooms and suites','Large tropical resort pool','Excellent Jimbaran location'],image:'https://media.iceportal.com/95130/photos/83138249_XXL.jpg',url:'https://www.booking.com/Share-dOZxu7I'}
  ];
  grid.innerHTML=hotels.map(hotelCard).join('');
  if(!document.querySelector('.featured-direct-contact'))grid.insertAdjacentHTML('afterend','<div class="featured-direct-contact"><div><span>BENARIAN PRIVATE RATES</span><h3>Looking for the best available price in Ubud or Jimbaran?</h3><p>Contact BENARIAN directly for personalised assistance and preferred-rate enquiries.</p><p lang="fa" dir="rtl">برای دریافت بهترین قیمت در مناطق اوبود و جیمباران، مستقیماً با من تماس بگیرید.</p></div><a href="contact.html">Contact Ben Directly →</a></div>');
  document.querySelector('[aria-labelledby="weekend-deals-title"]')?.remove();
}

function addHeroOfferButton(){
  const heroCopy=document.querySelector('.lux-hero-copy');
  if(!heroCopy||heroCopy.querySelector('.hero-offer-btn'))return;
  const primary=heroCopy.querySelector('.lux-btn');if(!primary)return;
  primary.insertAdjacentHTML('afterend','<a class="lux-btn hero-offer-btn" href="#weekly-offers">Best Offers of the Week <span>↓</span></a>');
}

function ensureLegalLinks(){
  document.querySelectorAll('.footer').forEach(footer=>{
    const support=[...footer.querySelectorAll('div')].find(group=>/Support/i.test(group.querySelector('strong')?.textContent||''));
    if(support&&!support.querySelector('a[href="terms-and-conditions.html"]')){
      const terms=document.createElement('a');terms.href='terms-and-conditions.html';terms.textContent='Terms & Conditions';support.appendChild(terms);
    }
    if(!support&&!footer.querySelector('a[href="terms-and-conditions.html"]')){
      const terms=document.createElement('a');terms.href='terms-and-conditions.html';terms.textContent='Terms & Conditions';
      const copyright=footer.querySelector('.copyright')||footer.lastElementChild;
      copyright?.insertAdjacentElement('beforebegin',terms);
    }
  });
}

function improveExternalLinks(){
  document.querySelectorAll('a[href^="http"]').forEach(link=>{
    if(link.hostname&&link.hostname!==location.hostname){link.target='_blank';link.rel='noopener sponsored'}
  });
}

const MEMBER_KEY='benarianMember';
function member(){try{return JSON.parse(localStorage.getItem(MEMBER_KEY)||'null')}catch{return null}}
function memberState(){
  const saved=member();
  document.querySelectorAll('[data-member-name]').forEach(element=>element.textContent=saved?.name||saved?.email?.split('@')[0]||'BENARIAN Member');
  document.querySelectorAll('.member-top-link').forEach(link=>{if(saved){link.textContent='My Account';link.href='member-dashboard.html'}});
}

ensureNavigation();normaliseBrand();renderFeaturedHotels();addHeroOfferButton();ensureLegalLinks();improveExternalLinks();memberState();
setTimeout(()=>{ensureNavigation();normaliseBrand();ensureLegalLinks();},500);
