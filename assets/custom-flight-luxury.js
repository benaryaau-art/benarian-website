(() => {
  if (document.documentElement.dataset.benarianHomeEnhancement === 'true') return;
  document.documentElement.dataset.benarianHomeEnhancement = 'true';

  const isHome = document.body.classList.contains('home-lux') || /(^|\/)index\.html$/.test(location.pathname) || location.pathname === '/';
  if (!isHome) return;

  const entryPages = [
    ['bali-tourist-levy.html', 'Tourist Levy'],
    ['bali-arrival-card.html', 'Arrival Card'],
    ['bali-visa.html', 'Bali Visa']
  ];

  const installStyles = () => {
    if (document.getElementById('benarian-brand-google-style')) return;
    const style = document.createElement('style');
    style.id = 'benarian-brand-google-style';
    style.textContent = `
      .benarian-brand-links{display:flex;align-items:center;justify-content:center;gap:12px;padding:11px 5%;background:#17130f;border-top:1px solid rgba(185,135,44,.38);border-bottom:1px solid rgba(185,135,44,.55);font-family:Inter,Arial,sans-serif;position:relative;z-index:20}
      .benarian-brand-links .label{color:#d6a957;font-size:9px;font-weight:800;letter-spacing:1.8px;white-space:nowrap}
      .benarian-brand-links a{display:inline-flex;align-items:center;justify-content:center;min-height:34px;padding:0 15px;border:1px solid rgba(218,174,92,.65);border-radius:999px;color:#fff;text-decoration:none;font-size:10px;font-weight:700;letter-spacing:.25px;background:rgba(255,255,255,.035)}
      .benarian-brand-links a:hover{background:#b9872c;border-color:#b9872c}
      .bali-entry-shortcut{display:inline-flex!important;align-items:center;justify-content:center;gap:9px;width:max-content;margin:15px 0 0;padding:13px 20px;border:1px solid rgba(240,195,103,.9);border-radius:999px;background:rgba(15,12,8,.62);color:#fff!important;text-decoration:none!important;font:800 10px/1 Inter,Arial,sans-serif;letter-spacing:.45px;box-shadow:0 10px 24px rgba(0,0,0,.22)}
      .bali-entry-shortcut:hover{background:#b9872c}
      .benarian-brand-intro{padding:54px 7%;background:#fbf7ef;border-bottom:1px solid #e5d3b4;text-align:center;color:#211b15}
      .benarian-brand-intro .kicker{display:block;color:#9b681a;font:800 10px/1 Inter,Arial,sans-serif;letter-spacing:2.4px;margin-bottom:13px}
      .benarian-brand-intro h2{max-width:920px;margin:0 auto 15px;font:600 clamp(34px,4.8vw,56px)/1.05 'Cormorant Garamond',Georgia,serif;color:#211b15}
      .benarian-brand-intro p{max-width:800px;margin:0 auto;color:#5f564c;font:400 15px/1.8 Inter,Arial,sans-serif}
      .benarian-brand-intro nav{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-top:24px}
      .benarian-brand-intro nav a{padding:11px 16px;border:1px solid #c8953d;border-radius:999px;color:#704d16;text-decoration:none;font:700 10px/1 Inter,Arial,sans-serif;background:#fff}
      .benarian-custom-flight{position:relative!important;padding:54px 0 72px!important;margin:0!important;background:radial-gradient(circle at 50% 0,#2a2118 0,#17120d 46%,#0d0a07 100%)!important;border-top:1px solid #b9822c!important;border-bottom:1px solid #b9822c!important;color:#fff!important;overflow:hidden!important}
      .benarian-flight-heading{text-align:center;max-width:760px;margin:0 auto;padding:0 24px}.benarian-flight-heading .eyebrow{display:block;color:#e7b454;font:800 8.5px/1 Inter,Arial,sans-serif;letter-spacing:3.25px;margin-bottom:14px}.benarian-flight-heading h2{font:500 clamp(38px,5vw,58px)/.98 'Cormorant Garamond',Georgia,serif;color:#e8c77f;margin:0 0 16px}.benarian-flight-heading p{max-width:610px;margin:0 auto 26px;color:#e9dfd2;font:400 13px/1.65 Inter,Arial,sans-serif}
      .benarian-flight-card{max-width:680px;margin:0 auto;background:#fff;border:1px solid #d4a34d;border-radius:16px;overflow:hidden;box-shadow:0 14px 34px rgba(0,0,0,.22)}.benarian-flight-image{height:180px;background:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=92&w=1800') center 56%/cover no-repeat}.benarian-flight-form{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:20px}.benarian-flight-field{display:block;text-align:left}.benarian-flight-field span{display:block;margin:0 0 7px;color:#81591e;font:800 8.5px/1 Inter,Arial,sans-serif;letter-spacing:1.7px}.benarian-flight-field input{box-sizing:border-box;width:100%;height:56px;padding:0 15px;border:1px solid #d8c7ab;border-radius:9px;background:#fff;color:#17130f;font-size:15px}.benarian-flight-form button{grid-column:1/-1;width:100%;height:56px;border:0;border-radius:8px;background:#1a1713;color:#fff;font-size:11.5px;font-weight:800;cursor:pointer}
      .benarian-flight-note{max-width:620px;margin:20px auto 0;padding:0 24px;color:#b7aa9b;text-align:center;font:400 9.5px/1.7 Inter,Arial,sans-serif}
      @media(max-width:760px){.benarian-brand-links{justify-content:flex-start;overflow-x:auto;padding:10px 14px}.benarian-brand-links .label{display:none}.benarian-brand-links a{flex:0 0 auto}.lux-hero-copy>.bali-entry-shortcut{max-width:100%;box-sizing:border-box;font-size:9.5px;padding:12px 14px}.benarian-brand-intro{padding:44px 20px}.benarian-brand-intro h2{font-size:35px}.benarian-brand-intro p{font-size:13px}.benarian-custom-flight{padding:44px 0 132px!important}.benarian-flight-card{margin:0 24px}.benarian-flight-image{height:138px}.benarian-flight-form{grid-template-columns:1fr;padding:17px}.benarian-flight-heading h2{font-size:31px}.benarian-flight-heading p{font-size:12.5px}}
    `;
    document.head.appendChild(style);
  };

  const setMeta = (selector, attrs) => {
    let node = document.head.querySelector(selector);
    if (!node) { node = document.createElement(selector.startsWith('link') ? 'link' : 'meta'); document.head.appendChild(node); }
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  };

  const installSeo = () => {
    const title = 'BENARIAN | Luxury Hotels, Flights & Bali Travel';
    const description = 'BENARIAN is a luxury travel and hospitality platform founded by hotel executive Ben Tafreshi, offering curated hotels, flights, Bali entry guidance and personalised travel assistance.';
    document.title = title;
    setMeta('meta[name="description"]', {name:'description', content:description});
    setMeta('meta[property="og:title"]', {property:'og:title', content:title});
    setMeta('meta[property="og:description"]', {property:'og:description', content:description});
    setMeta('meta[property="og:site_name"]', {property:'og:site_name', content:'BENARIAN'});
    setMeta('meta[property="og:url"]', {property:'og:url', content:'https://benarian.com/'});
    setMeta('meta[property="og:image"]', {property:'og:image', content:'https://benarian.com/favicon.svg'});
    setMeta('link[rel="canonical"]', {rel:'canonical', href:'https://benarian.com/'});
    const old = document.getElementById('benarian-home-brand-schema');
    const schema = old || document.createElement('script');
    schema.id = 'benarian-home-brand-schema'; schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({'@context':'https://schema.org','@graph':[
      {'@type':['Organization','TravelAgency'],'@id':'https://benarian.com/#organization','name':'BENARIAN','alternateName':'BENARIAN Luxury Travel & Hospitality','url':'https://benarian.com/','logo':{'@type':'ImageObject','url':'https://benarian.com/favicon.svg','width':512,'height':512},'description':description,'founder':{'@type':'Person','name':'Ben Tafreshi'},'sameAs':['https://www.instagram.com/benarianhotels']},
      {'@type':'WebSite','@id':'https://benarian.com/#website','url':'https://benarian.com/','name':'BENARIAN','publisher':{'@id':'https://benarian.com/#organization'},'inLanguage':['en','fa']},
      {'@type':'ItemList','name':'BENARIAN key travel services','itemListElement':[
        {'@type':'ListItem','position':1,'name':'Luxury Hotels','url':'https://benarian.com/hotels.html'},
        {'@type':'ListItem','position':2,'name':'Flights','url':'https://benarian.com/flights.html'},
        {'@type':'ListItem','position':3,'name':'Bali Tourist Levy','url':'https://benarian.com/bali-tourist-levy.html'},
        {'@type':'ListItem','position':4,'name':'Bali Arrival Card','url':'https://benarian.com/bali-arrival-card.html'},
        {'@type':'ListItem','position':5,'name':'Bali Visa','url':'https://benarian.com/bali-visa.html'}
      ]}
    ]});
    if (!old) document.head.appendChild(schema);
  };

  const installHeaderLinks = () => {
    const header = document.querySelector('.header');
    if (!header || document.querySelector('.benarian-brand-links')) return false;
    const bar = document.createElement('nav');
    bar.className = 'benarian-brand-links';
    bar.setAttribute('aria-label','BENARIAN quick links');
    bar.innerHTML = `<span class="label">BALI ENTRY</span>${entryPages.map(([href,label]) => `<a href="${href}">${label}</a>`).join('')}<a href="hotels.html">Hotels</a><a href="flights.html">Flights</a>`;
    header.insertAdjacentElement('afterend', bar);
    return true;
  };

  const installHeroButton = () => {
    const heroCopy = document.querySelector('.lux-hero .lux-hero-copy');
    const explore = heroCopy?.querySelector('.lux-btn');
    if (!heroCopy || !explore || heroCopy.querySelector('.bali-entry-shortcut')) return false;
    const button = document.createElement('a');
    button.className = 'bali-entry-shortcut';
    button.href = '#bali-entry-essentials';
    button.innerHTML = '<span>✦</span><span>BALI ENTRY REQUIREMENTS</span><span>↓</span>';
    button.addEventListener('click', event => {
      const target = document.getElementById('bali-entry-essentials') || [...document.querySelectorAll('a[href]')].find(a => /lovebali\.baliprov|allindonesia\.imigrasi|evisa\.imigrasi/i.test(a.href))?.closest('section');
      if (!target) return;
      event.preventDefault(); target.id = 'bali-entry-essentials'; target.scrollIntoView({behavior:'smooth', block:'start'});
    });
    explore.insertAdjacentElement('afterend', button);
    return true;
  };

  const installBrandIntro = () => {
    if (document.querySelector('.benarian-brand-intro')) return true;
    const booking = document.querySelector('#official-booking-search,.booking-search');
    if (!booking) return false;
    const section = document.createElement('section');
    section.className = 'benarian-brand-intro';
    section.innerHTML = `<span class="kicker">LUXURY TRAVEL &amp; HOSPITALITY</span><h2>Expertly curated travel, supported by decades of hotel leadership</h2><p>BENARIAN was founded by hotel executive Ben Tafreshi to help travellers choose refined hotels, flights and destination services with greater confidence, personal guidance and exceptional value.</p><nav aria-label="Important BENARIAN pages"><a href="hotels.html">Luxury Hotels</a><a href="flights.html">Flights</a><a href="bali-tourist-levy.html">Tourist Levy</a><a href="bali-arrival-card.html">Arrival Card</a><a href="bali-visa.html">Bali Visa</a><a href="contact.html">Contact BENARIAN</a></nav>`;
    booking.insertAdjacentElement('beforebegin', section);
    return true;
  };

  const renderFlight = () => {
    const section = document.querySelector('#official-flight-search,.flight-widget-section');
    if (!section || section.dataset.benarianStableFlight === 'true') return !!section;
    section.dataset.benarianStableFlight = 'true';
    section.id = 'official-flight-search'; section.className = 'flight-widget-section benarian-custom-flight';
    const iso = d => d.toISOString().slice(0,10); const depart = new Date(); depart.setDate(depart.getDate()+7); const ret = new Date(); ret.setDate(ret.getDate()+14);
    section.innerHTML = `<div class="benarian-flight-heading"><span class="eyebrow">WORLDWIDE FLIGHT SEARCH</span><h2>Search &amp; Book Your Flight</h2><p>Compare flight options through BENARIAN’s approved travel partner connection.</p></div><div class="benarian-flight-card"><div class="benarian-flight-image"></div><form class="benarian-flight-form"><label class="benarian-flight-field"><span>FROM</span><input name="from" placeholder="Melbourne" required></label><label class="benarian-flight-field"><span>TO</span><input name="to" placeholder="Bali" required></label><label class="benarian-flight-field"><span>DEPARTURE</span><input name="depart" type="date" value="${iso(depart)}" required></label><label class="benarian-flight-field"><span>RETURN</span><input name="return" type="date" value="${iso(ret)}" required></label><button type="submit">SEARCH FLIGHTS →</button></form></div><p class="benarian-flight-note">Live fares, payment and confirmation are provided by the relevant travel provider.</p>`;
    section.querySelector('form')?.addEventListener('submit', event => { event.preventDefault(); location.href = 'flights.html'; });
    return true;
  };

  installStyles(); installSeo();
  const apply = () => { installHeaderLinks(); installHeroButton(); installBrandIntro(); renderFlight(); };
  apply(); [300,800,1500,2600].forEach(delay => setTimeout(apply, delay));
})();