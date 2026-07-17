(async function(){
  const read = async path => { const r=await fetch(path,{cache:'no-store'}); if(!r.ok) throw new Error(path); return r.json(); };
  const text=(el,v)=>{if(el&&v!==undefined&&v!==null) el.textContent=v};
  try{
    const [home,settings,hotels]=await Promise.all([read('content/homepage.json'),read('content/settings.json'),read('content/hotels.json')]);
    document.documentElement.style.setProperty('--gold',settings.gold_colour||'#b78022');
    document.documentElement.style.setProperty('--gold2',settings.gold_light||'#d39a31');
    document.documentElement.style.setProperty('--ink',settings.text_colour||'#161616');
    document.body.style.backgroundColor=settings.background_colour||'#fff';
    document.body.style.fontFamily=`${settings.font_family||'Inter'}, Arial, sans-serif`;
    document.querySelectorAll('.hero-copy h1,.brand-poster .tag,.page-hero h1,.page-content h2').forEach(e=>e.style.fontFamily=`${settings.heading_font||'Georgia'}, serif`);
    const title=document.getElementById('hero-title');
    if(title){ const full=home.hero_title||''; const hi=home.hero_highlight||''; title.innerHTML=hi&&full.includes(hi)?full.replace(hi,`<span>${hi}</span>`):full; }
    text(document.getElementById('hero-subtitle'),home.hero_subtitle);
    const btn=document.getElementById('hero-button'); if(btn){text(btn,home.hero_button_text);btn.href=home.hero_button_link||'#';}
    const hero=document.getElementById('hero-panel'); if(hero&&home.hero_image) hero.style.backgroundImage=`url('${home.hero_image}')`;
    const panel=document.getElementById('brand-poster'); if(panel&&home.brand_panel_image) panel.style.backgroundImage=`linear-gradient(rgba(255,255,255,.28),rgba(255,255,255,.72)),url('${home.brand_panel_image}')`;
    ['header-logo','poster-logo'].forEach(id=>{const e=document.getElementById(id);if(e&&home.logo)e.src=home.logo});
    text(document.getElementById('brand-tagline'),home.tagline);
    text(document.getElementById('brand-signature'),home.signature);
    document.querySelectorAll('.hotel-link[data-hotel-index]').forEach((link,i)=>{
      const h=(hotels.hotels||[])[i]; if(!h)return; link.href=h.booking_url||'#'; const card=link.querySelector('.hotel-card');
      const img=card.querySelector('img'); if(img){img.src=h.image;img.alt=h.name}
      const h3=card.querySelector('h3'); if(h3) h3.innerHTML=`${h.name} <span class="score">${h.score||''}</span>`;
      const ps=card.querySelectorAll('.hotel-info p'); if(ps[0])ps[0].textContent=`⌖ ${h.location||''}`; if(ps[1])ps[1].textContent=h.price||''; if(ps[2])ps[2].textContent=h.rooms||'';
    });
  }catch(e){console.warn('BENARIAN CMS content could not be loaded; static fallback remains.',e)}
})();