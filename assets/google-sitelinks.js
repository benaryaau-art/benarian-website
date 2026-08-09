(() => {
  const BASE='https://benarian.com/';
  const LINKS=[['Booking Hotels','hotels.html'],['Flights','flights.html'],['Bali Experience','bali-experiences.html'],['Luxury Destinations','destinations.html'],['Tours & Experiences','experiences.html'],['Spa & Wellness','wellness.html'],['Restaurants','restaurants.html'],['Travel Guides','travel-guides.html'],['Contact BENARIAN','contact.html']];
  function ensureMeta(selector,attributes){let n=document.head.querySelector(selector);if(!n){n=document.createElement('meta');document.head.appendChild(n)}Object.entries(attributes).forEach(([k,v])=>n.setAttribute(k,v))}
  function installSeo(){document.title='BENARIAN | Luxury Hotels, Flights & Curated Travel';ensureMeta('meta[name="description"]',{name:'description',content:'Book luxury hotels, search flights and discover curated destinations, tours, restaurants, spa and wellness experiences with BENARIAN.'});ensureMeta('meta[name="robots"]',{name:'robots',content:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'});let c=document.head.querySelector('link[rel="canonical"]');if(!c){c=document.createElement('link');c.rel='canonical';document.head.appendChild(c)}c.href=BASE;}
  function installBaliExperience(){
    if(document.querySelector('.benarian-bali-experience-promo')) return;
    const main=document.querySelector('main'), hero=main?.querySelector('.lux-hero'); if(!main||!hero) return;
    const cards=[
      ['Ubud Waterfall Exploration','Hidden waterfalls · Jungle walks · Natural pools','https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&w=900&q=85'],
      ['ATV Quad Bike Adventure','Jungle trails · Rice fields · Waterfalls','https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85'],
      ['Rice Terrace & Jungle Swing','Iconic terraces · Jungle swing · Photo spots','https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85'],
      ['Temples & Cultural Experience','Water temples · Ceremonies · Balinese heritage','https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=900&q=85'],
      ['Private Driver & Custom Tours','English-speaking driver · Flexible itinerary','https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80'],
      ['Ubud Highlights Full-Day Tour','Ubud icons · Waterfalls · Rice terraces','https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=900&q=85'],
      ['Uluwatu Sunset & Kecak Dance','Cliffside sunset · Kecak dance · Dinner','https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80'],
      ['Nusa Penida Island Escape','Beaches · Cliff viewpoints · Day trip','https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=900&q=85']
    ];
    const section=document.createElement('section'); section.className='benarian-bali-experience-promo';
    section.innerHTML=`
      <div class="bbx-hero">
        <div class="bbx-shade"></div>
        <div class="bbx-copy">
          <div class="bbx-mark">BB</div>
          <div class="bbx-rule">✦</div>
          <h2>BALI EXPERIENCE</h2>
          <h3>LUXURY ALL-INCLUSIVE TOUR PACKAGE</h3>
          <p>Discover Bali’s most iconic places with comfort, style & exclusive experiences.</p>
          <div class="bbx-benefits">
            <div><b>♕</b><strong>PRIVATE & EXCLUSIVE</strong><span>Private tours, personal driver and VIP service</span></div>
            <div><b>☆</b><strong>EXPERT LOCAL GUIDES</strong><span>Professional guides with local knowledge</span></div>
            <div><b>✦</b><strong>ALL-INCLUSIVE</strong><span>Activities, entrances, meals & transfers</span></div>
            <div><b>◇</b><strong>FLEXIBLE & COMFORTABLE</strong><span>Customizable itinerary with free cancellation</span></div>
          </div>
        </div>
      </div>
      <div class="bbx-experiences">
        <div class="bbx-title"><span></span><h3>TOP EXPERIENCES IN BALI</h3><span></span></div>
        <div class="bbx-grid">${cards.map((c,i)=>`<article><div class="bbx-img" style="background-image:url('${c[2]}')"><em>${i+1}</em></div><div class="bbx-card-copy"><h4>${c[0]}</h4><p>${c[1]}</p></div></article>`).join('')}</div>
        <div class="bbx-cta">
          <div><strong>7 / 10 DAYS ITINERARY</strong><span>Fully customizable</span></div>
          <a class="bbx-gold" href="bali-experiences.html">EXPLORE ALL EXPERIENCES →</a>
          <a class="bbx-dark" href="https://wa.me/61420788006?text=Hello%20BENARIAN%2C%20I%27m%20interested%20in%20the%20Bali%20Experience%20package.">◉ ENQUIRE ON WHATSAPP</a>
          <div><strong>GROUPS, COUPLES & FAMILIES</strong><span>All welcome</span></div>
        </div>
        <div class="bbx-extras"><span>🚘 PRIVATE TRANSFERS</span><span>🍽 GOURMET MEALS</span><span>📷 PROFESSIONAL PHOTOS</span><span>🥂 COMPLIMENTARY DRINKS</span><span>🎁 SPECIAL EXTRAS</span></div>
      </div>`;
    hero.insertAdjacentElement('afterend',section);
    const st=document.createElement('style'); st.id='benarian-bali-experience-promo-style'; st.textContent=`
      .benarian-bali-experience-promo{background:#f8f3e9;color:#17130f;border-bottom:1px solid #c89539;overflow:hidden}
      .bbx-hero{position:relative;min-height:610px;background:url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=90') center 55%/cover no-repeat;display:flex;align-items:center}
      .bbx-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,6,6,.96) 0%,rgba(4,6,6,.76) 42%,rgba(4,6,6,.08) 78%)}
      .bbx-copy{position:relative;z-index:2;width:min(1220px,92%);margin:auto;color:#fff;padding:62px 0 45px}
      .bbx-mark{font:600 72px/.8 'Cormorant Garamond',Georgia,serif;color:#e5b557;letter-spacing:-7px;width:max-content}.bbx-rule{color:#d5a64a;margin:18px 0 8px;font-size:18px;letter-spacing:12px}
      .bbx-copy h2{font:600 clamp(54px,6.3vw,92px)/.88 'Cormorant Garamond',Georgia,serif;color:#e8b95c;margin:0;letter-spacing:1px}.bbx-copy h3{font:500 clamp(20px,2vw,30px)/1.2 Inter,Arial,sans-serif;letter-spacing:2px;margin:8px 0 28px}.bbx-copy>p{max-width:650px;text-transform:uppercase;font:500 16px/1.55 Inter,Arial,sans-serif;letter-spacing:1px;margin:0 0 30px}
      .bbx-benefits{display:grid;grid-template-columns:repeat(4,1fr);max-width:850px;border:1px solid #c89539;border-radius:18px;background:rgba(5,7,7,.82);overflow:hidden}.bbx-benefits>div{padding:22px 18px;text-align:center;border-right:1px solid rgba(200,149,57,.35)}.bbx-benefits>div:last-child{border-right:0}.bbx-benefits b{display:block;color:#e6b85d;font-size:31px;font-weight:400}.bbx-benefits strong{display:block;color:#e6b85d;font:700 11px/1.2 Inter,Arial,sans-serif;margin:8px 0}.bbx-benefits span{display:block;color:#fff;font:400 10px/1.55 Inter,Arial,sans-serif}
      .bbx-experiences{width:min(1450px,96%);margin:-36px auto 0;position:relative;z-index:3;background:#fbf7ef;border-radius:24px;padding:22px 22px 28px;box-shadow:0 14px 36px rgba(32,23,11,.12)}.bbx-title{display:flex;align-items:center;justify-content:center;gap:16px;margin:0 0 16px}.bbx-title span{height:1px;width:80px;background:#c89539}.bbx-title h3{font:600 25px/1 'Cormorant Garamond',Georgia,serif;margin:0;letter-spacing:1px}
      .bbx-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:10px}.bbx-grid article{background:#fff;border:1px solid #eadfcd;border-radius:10px;overflow:hidden}.bbx-img{height:155px;background-size:cover;background-position:center;position:relative}.bbx-img em{position:absolute;top:8px;left:8px;width:27px;height:27px;border-radius:50%;background:#fff;color:#8f641e;display:grid;place-items:center;font:700 12px Inter,Arial,sans-serif;font-style:normal;border:1px solid #d5aa5b}.bbx-card-copy{padding:10px 10px 12px}.bbx-card-copy h4{font:700 12px/1.25 Inter,Arial,sans-serif;margin:0 0 7px}.bbx-card-copy p{font:400 9px/1.45 Inter,Arial,sans-serif;color:#5f584f;margin:0}
      .bbx-cta{margin:18px auto 12px;max-width:1120px;background:#080a09;color:#fff;border-radius:10px;padding:12px 18px;display:grid;grid-template-columns:1fr auto auto 1fr;align-items:center;gap:14px}.bbx-cta div{text-align:center}.bbx-cta strong{display:block;font:700 10px/1.2 Inter,Arial,sans-serif}.bbx-cta span{display:block;font:400 9px/1.4 Inter,Arial,sans-serif;color:#d5cec3}.bbx-cta a{text-decoration:none;border-radius:9px;padding:13px 18px;font:700 10px/1.2 Inter,Arial,sans-serif;white-space:nowrap}.bbx-gold{background:#d39c38;color:#111}.bbx-dark{border:1px solid #c89539;color:#fff}
      .bbx-extras{max-width:1040px;margin:12px auto 0;background:#080a09;border:1px solid #c89539;color:#e5b557;border-radius:10px;display:grid;grid-template-columns:repeat(5,1fr);padding:14px 8px}.bbx-extras span{text-align:center;font:700 10px/1.3 Inter,Arial,sans-serif;border-right:1px solid rgba(200,149,57,.25)}.bbx-extras span:last-child{border-right:0}
      @media(max-width:1100px){.bbx-grid{grid-template-columns:repeat(4,1fr)}.bbx-benefits{grid-template-columns:repeat(2,1fr);max-width:680px}.bbx-benefits>div:nth-child(2){border-right:0}.bbx-benefits>div{border-bottom:1px solid rgba(200,149,57,.25)}.bbx-cta{grid-template-columns:1fr 1fr}.bbx-extras{grid-template-columns:repeat(2,1fr);gap:8px}.bbx-extras span{border:0}}
      @media(max-width:760px){.bbx-hero{min-height:710px;background-position:68% center}.bbx-shade{background:linear-gradient(180deg,rgba(4,6,6,.2),rgba(4,6,6,.82) 48%,#050606 82%)}.bbx-copy{text-align:center;padding:245px 18px 34px}.bbx-mark{margin:auto;font-size:58px}.bbx-copy h2{font-size:50px}.bbx-copy h3{font-size:16px;letter-spacing:1px}.bbx-copy>p{font-size:12px;margin-left:auto;margin-right:auto}.bbx-benefits{grid-template-columns:1fr 1fr}.bbx-benefits>div{padding:15px 10px}.bbx-benefits b{font-size:25px}.bbx-benefits strong{font-size:9px}.bbx-benefits span{font-size:8px}.bbx-experiences{width:100%;margin:0;border-radius:0;padding:20px 14px}.bbx-title h3{font-size:20px}.bbx-title span{width:35px}.bbx-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px}.bbx-grid article{flex:0 0 64vw;scroll-snap-align:start}.bbx-img{height:210px}.bbx-card-copy h4{font-size:13px}.bbx-card-copy p{font-size:10px}.bbx-cta{grid-template-columns:1fr;margin-top:12px}.bbx-cta a{width:100%;text-align:center}.bbx-extras{grid-template-columns:1fr 1fr}.bbx-extras span{font-size:9px}}
    `;document.head.appendChild(st);
  }
  function installQuickLinks(){if(document.querySelector('.benarian-google-quicklinks'))return;const main=document.querySelector('main');if(!main)return;const section=document.createElement('section');section.className='benarian-google-quicklinks';section.innerHTML=`<div class="bgq-inner"><span class="bgq-kicker">EXPLORE BENARIAN</span><h2>Plan Your Journey</h2><p>Direct access to our most requested travel services.</p><nav class="bgq-links">${LINKS.map(([n,h])=>`<a href="${h}">${n}<span>→</span></a>`).join('')}</nav></div>`;const booking=main.querySelector('.booking-search');if(booking)booking.insertAdjacentElement('afterend',section);else main.appendChild(section);const st=document.createElement('style');st.id='benarian-google-quicklinks-style';st.textContent=`.benarian-google-quicklinks{padding:56px 7%;background:#fff;border-bottom:1px solid #eee4d2}.bgq-inner{max-width:1240px;margin:0 auto;text-align:center}.bgq-kicker{display:block;color:#b9872c;font:700 10px/1.2 Inter,Arial,sans-serif;letter-spacing:2.2px;margin-bottom:10px}.bgq-inner h2{margin:0;color:#17130f;font:600 clamp(36px,5vw,58px)/1 'Cormorant Garamond',Georgia,serif}.bgq-inner>p{margin:12px auto 28px;color:#756c61;font:400 14px/1.6 Inter,Arial,sans-serif}.bgq-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.bgq-links a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 16px;border:1px solid #ddc79f;border-radius:10px;background:#fffaf1;color:#2a241d;text-decoration:none;font:600 12px/1.3 Inter,Arial,sans-serif}.bgq-links a span{color:#b9872c}@media(max-width:900px){.bgq-links{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.benarian-google-quicklinks{padding:44px 18px}.bgq-links{grid-template-columns:1fr}}`;document.head.appendChild(st)}
  function apply(){installSeo();installBaliExperience();installQuickLinks()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();