(function organiseBenarianHotels(){
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='hotels.html' && page!=='hotels') return;

  const partner=window.BENARIAN_PARTNERS?.booking;
  const bookingAffiliateBase=partner?.affiliateBaseUrl || 'https://www.kqzyfj.com/click-101828630-17289006';

  const destinationCopy={
    bali:'Private villas, exceptional service and memorable island settings selected for luxury, romance and relaxation.',
    phuket:'Refined beachfront resorts and private retreats selected for ocean views, privacy and effortless island stays.',
    maldives:'Exceptional island resorts selected for overwater living, clear lagoons, privacy and unforgettable escapes.',
    dubai:'Landmark luxury hotels selected for outstanding service, dining, design and access to Dubai’s best experiences.'
  };

  const style=document.createElement('style');
  style.id='benarian-curated-hotels-style';
  style.textContent=`
    .hotels-hero p{max-width:760px!important}
    .destination-section{padding-top:58px!important}
    .destination-heading{align-items:flex-end!important}
    .destination-heading>div{max-width:760px}
    .destination-intro{margin:12px 0 0;color:#6f6253;font-size:14px;line-height:1.7}
    .hotel-list{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:20px!important}
    .hotel-card{display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:space-between!important;gap:18px!important;min-height:270px!important;padding:25px!important;border:1px solid #e7dcc8!important;border-radius:14px!important;box-shadow:0 14px 36px rgba(47,33,15,.07)!important;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease!important}
    .hotel-card:hover{transform:translateY(-4px);box-shadow:0 20px 45px rgba(47,33,15,.12)!important;border-color:#cda65f!important}
    .hotel-copy{display:block!important}
    .hotel-num{display:inline-flex!important;align-items:center;justify-content:center;width:34px;height:34px;border:1px solid #d8bd88;border-radius:50%;font:600 13px Inter,Arial,sans-serif!important;margin-bottom:18px}
    .hotel-place{font-size:9px!important;letter-spacing:1.45px!important;margin-bottom:8px!important}
    .hotel-card h3{font-size:29px!important;line-height:1.02!important;margin-bottom:12px!important}
    .hotel-price{display:none!important}
    .hotel-card small{display:block!important;font-size:12px!important;line-height:1.65!important;color:#695f53!important}
    .hotel-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:15px}
    .hotel-tag{padding:6px 9px;border-radius:999px;background:#f7f1e7;color:#8a611d;font-size:9px;font-weight:700;letter-spacing:.55px}
    .book-btn{width:100%!important;text-align:center!important;border-radius:8px!important;padding:14px 16px!important;font-size:10px!important;letter-spacing:.9px!important;background:#17140f!important;color:#f2cf87!important}
    .book-btn:hover{background:#b9872c!important;color:#fff!important}
    .affiliate-note{display:block;margin-top:8px;text-align:center;color:#8a8176;font-size:9px;line-height:1.4}
    @media(max-width:1080px){.hotel-list{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:700px){.hotel-list{grid-template-columns:1fr!important}.hotel-card{min-height:0!important}.destination-heading{align-items:flex-start!important}.destination-heading>a{width:100%;padding:12px 0;border-top:1px solid #e7dcc8}}
  `;
  if(!document.getElementById(style.id)) document.head.appendChild(style);

  const tagsFor=(name,place)=>{
    const text=(name+' '+place).toLowerCase();
    const tags=[];
    if(/villa|bvlgari|mandapa|aman|raffles|one&only|capella|soneva/.test(text)) tags.push('ULTRA LUXURY');
    if(/beach|bay|island|maldives|jimbaran|phuket|jumeirah|palm/.test(text)) tags.push('BEACH');
    if(/ubud|sayan|shambhala|wellness/.test(text)) tags.push('WELLNESS');
    if(/villa|reserve|aman|trisara|cheval blanc/.test(text)) tags.push('PRIVATE ESCAPE');
    if(tags.length<2) tags.push('BENARIAN SELECTED');
    return [...new Set(tags)].slice(0,2);
  };

  const descriptionFor=(name,place,destination)=>{
    const text=(name+' '+place).toLowerCase();
    if(/ubud|sayan|shambhala/.test(text)) return 'A peaceful luxury retreat surrounded by nature, ideal for wellness, romance and a slower style of travel.';
    if(/maldives|island|atoll/.test(text)) return 'An exceptional island escape offering privacy, lagoon views and a beautifully refined resort experience.';
    if(/beach|bay|jimbaran|phuket|palm|jumeirah/.test(text)) return 'A refined coastal stay selected for its setting, service and easy access to memorable resort experiences.';
    if(destination==='dubai') return 'A distinguished Dubai hotel selected for polished service, impressive design and convenient access to the city.';
    return 'A carefully selected luxury hotel offering distinctive design, attentive service and a memorable sense of place.';
  };

  document.querySelectorAll('.destination-section').forEach(section=>{
    const id=(section.id||'').toLowerCase();
    const heading=section.querySelector('.destination-heading>div');
    if(heading && !heading.querySelector('.destination-intro')){
      const intro=document.createElement('p');
      intro.className='destination-intro';
      intro.textContent=destinationCopy[id] || 'A curated selection of exceptional stays chosen by BENARIAN.';
      heading.appendChild(intro);
    }

    const allHotelsLink=section.querySelector('.destination-heading>a');
    if(allHotelsLink){
      const destination=section.querySelector('h2')?.textContent.replace(/^.*?in\s+/i,'').trim() || id;
      const target=`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`;
      allHotelsLink.href=`${bookingAffiliateBase}?url=${encodeURIComponent(target)}`;
      allHotelsLink.textContent=`Search all ${destination} hotels →`;
      allHotelsLink.setAttribute('rel','noopener sponsored');
    }

    section.querySelectorAll('.hotel-card').forEach(card=>{
      const name=card.querySelector('h3')?.textContent.trim() || 'Luxury Hotel';
      const place=card.querySelector('.hotel-place')?.textContent.trim() || id;
      const small=card.querySelector('small');
      if(small) small.textContent=descriptionFor(name,place,id);

      const copy=card.querySelector('.hotel-copy>div');
      if(copy && !copy.querySelector('.hotel-tags')){
        const tags=document.createElement('div');
        tags.className='hotel-tags';
        tagsFor(name,place).forEach(label=>{
          const span=document.createElement('span');
          span.className='hotel-tag';
          span.textContent=label;
          tags.appendChild(span);
        });
        copy.appendChild(tags);
      }

      const button=card.querySelector('.book-btn');
      if(button){
        const target=`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(name+', '+place)}`;
        button.href=`${bookingAffiliateBase}?url=${encodeURIComponent(target)}`;
        button.textContent='CHECK AVAILABILITY →';
        button.setAttribute('aria-label',`Check availability for ${name} on Booking.com`);
        button.setAttribute('rel','noopener sponsored');
        if(!card.querySelector('.affiliate-note')){
          const note=document.createElement('span');
          note.className='affiliate-note';
          note.textContent='Opens Booking.com · Affiliate link';
          button.insertAdjacentElement('afterend',note);
        }
      }
    });
  });

  const heroText=document.querySelector('.hotels-hero p:last-child');
  if(heroText) heroText.textContent='Explore a curated collection of luxury hotels organised by destination. Each selection includes a concise BENARIAN overview and a direct Booking.com availability link.';
})();