(function(){
  'use strict';
  const API='https://benarian-price-tracker.benarya-au.workers.dev/v1';
  const form=document.querySelector('#dealSearch');
  const grid=document.querySelector('#hotelGrid');
  if(!form||!grid)return;

  const style=document.createElement('style');
  style.textContent=`
    .field select{width:100%;border:0;outline:0;background:transparent;color:inherit;font:inherit;appearance:none}
    #resultsState{grid-column:1/-1;min-height:180px;display:grid;place-items:center;text-align:center;padding:38px;border:1px dashed rgba(201,154,67,.42);border-radius:15px;color:#aaa195;line-height:1.75}
    .hotel-visual.has-image{background-position:center;background-size:cover}.price-compare{display:flex;flex-wrap:wrap;align-items:end;gap:8px;margin-top:14px}.price-current{font:600 28px 'Cormorant Garamond',serif;color:#fff}.price-before{color:#81786d;text-decoration:line-through;font-size:11px}.price-change{padding:6px 8px;border-radius:999px;background:rgba(121,201,158,.14);color:#79c99e;font-size:8px;font-weight:700;letter-spacing:.7px}.price-change.neutral{background:rgba(237,202,132,.1);color:#edca84}.verified-time{margin-top:8px;color:#81786d;font-size:8px;line-height:1.5}.result-actions{display:flex;gap:8px;margin-top:15px;padding-top:15px;border-top:1px solid #30291f}.result-actions .select-btn{flex:1}.compare-note{color:#9b9185;font-size:9px;line-height:1.65}.checkout-status{margin-top:14px;padding:12px;border:1px solid rgba(201,154,67,.28);border-radius:10px;color:#bdb3a6;font-size:9px;line-height:1.65}
  `;
  document.head.appendChild(style);

  let supplierConnected=false;
  let results=[];
  let saved=JSON.parse(localStorage.getItem('benarianVerifiedSavedStays')||'[]');
  let selected=JSON.parse(sessionStorage.getItem('benarianVerifiedSelectedStay')||'null');
  const $=selector=>document.querySelector(selector);
  const money=(value,currency='AUD')=>new Intl.NumberFormat('en-AU',{style:'currency',currency:currency||'AUD',maximumFractionDigits:0}).format(Number(value)||0);
  const escapeHtml=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const setState=message=>{grid.innerHTML=`<div class="empty" id="resultsState">${escapeHtml(message)}</div>`};
  const toast=message=>{const el=$('#toast');if(!el)return;el.textContent=message;el.classList.add('show');clearTimeout(window.benarianToastTimer);window.benarianToastTimer=setTimeout(()=>el.classList.remove('show'),2200)};

  function openDrawer(name){document.querySelectorAll('.drawer').forEach(d=>d.classList.remove('open'));const drawer=$('#'+name+'Drawer');if(drawer){drawer.classList.add('open');document.body.style.overflow='hidden'}}
  function closeDrawers(){document.querySelectorAll('.drawer').forEach(d=>d.classList.remove('open'));document.body.style.overflow=''}
  function resultById(id){return results.find(item=>String(item.hotel_id)===String(id))||saved.find(item=>String(item.hotel_id)===String(id))}

  function renderResults(){
    if(!results.length){setState('No verified prices are available for this search yet. BENARIAN never displays invented or demonstration prices.');return}
    grid.innerHTML=results.map(item=>{
      const id=escapeHtml(item.hotel_id),current=Number(item.current_price),previous=Number(item.previous_price||current),difference=Math.max(0,previous-current),drop=Number(item.drop_percent||0),observations=Number(item.observations_30d||0),currency=item.currency||'AUD';
      const comparison=observations>1&&difference>0?`<span class="price-before">${money(previous,currency)}</span><span class="price-change">↓ ${drop}% · SAVE ${money(difference,currency)}</span>`:`<span class="price-change neutral">${observations>1?'RATE VERIFIED':'FIRST VERIFIED PRICE'}</span>`;
      const image=item.image_url?` style="background-image:linear-gradient(rgba(0,0,0,.18),rgba(0,0,0,.48)),url('${escapeHtml(item.image_url)}')"`:'';
      return `<article class="hotel-card" data-id="${id}"><div class="hotel-visual${item.image_url?' has-image':''}"${image}><span class="hotel-tag">${escapeHtml(item.recommendation_label||'VERIFIED RATE')}</span><button class="save-btn${saved.some(x=>String(x.hotel_id)===String(item.hotel_id))?' saved':''}" type="button" aria-label="Save ${escapeHtml(item.hotel_name)}">${saved.some(x=>String(x.hotel_id)===String(item.hotel_id))?'♥':'♡'}</button></div><div class="hotel-content"><h3>${escapeHtml(item.hotel_name)}</h3><span class="hotel-location">${escapeHtml(item.destination||'')}</span><div class="price-compare"><span class="price-current">${money(current,currency)}</span>${comparison}</div><div class="verified-time">Verified supplier total · ${observations||1} recorded observation${observations===1?'':'s'}</div><div class="result-actions"><button class="select-btn" type="button">VIEW &amp; CHECKOUT</button></div></div></article>`;
    }).join('');
  }

  function renderSaved(){
    const count=$('#savedCount');if(count)count.textContent=saved.length;
    const list=$('#savedList');if(!list)return;
    list.innerHTML=saved.length?saved.map(item=>`<div class="saved-item"><div><strong>${escapeHtml(item.hotel_name)}</strong><small>${escapeHtml(item.destination||'')} · ${money(item.current_price,item.currency)}</small></div><button class="select-btn" type="button" data-select-id="${escapeHtml(item.hotel_id)}">SELECT</button></div>`).join(''):'<p class="empty">Save a verified result to keep it in your shortlist on this device.</p>';
  }

  function renderCheckout(){
    const box=$('#checkoutContent');if(!box)return;
    if(!selected){box.innerHTML='<p class="empty">Select a verified hotel result to review its price before checkout.</p>';return}
    const current=Number(selected.current_price),previous=Number(selected.previous_price||current),currency=selected.currency||'AUD',difference=Math.max(0,previous-current);
    box.innerHTML=`<div class="checkout-summary"><h3>${escapeHtml(selected.hotel_name)}</h3><div class="summary-line"><span>${escapeHtml(selected.destination||'')}</span><span>Verified supplier result</span></div><div class="summary-line"><span>Current total</span><span>${money(current,currency)}</span></div>${difference>0?`<div class="summary-line"><span>Previous recorded total</span><span>${money(previous,currency)}</span></div><div class="summary-line"><span>Price difference</span><span>− ${money(difference,currency)}</span></div>`:''}<div class="summary-line total"><span>Amount shown before final recheck</span><span>${money(current,currency)}</span></div></div><div class="checkout-fields"><input type="text" placeholder="Lead guest name" disabled><input type="email" placeholder="Email address" disabled></div><button class="checkout-action" disabled>SECURE PAYMENT · ACTIVATES WITH LIVE BOOKING</button><div class="checkout-status">Before charging a card, BENARIAN will recheck the rate and cancellation terms, authorise the amount, confirm the supplier booking, and only then capture payment.</div>`;
  }

  async function checkHealth(){
    try{const response=await fetch(API+'/health',{headers:{accept:'application/json'}});const data=await response.json();supplierConnected=Boolean(response.ok&&data.ok&&data.supplier);$('#systemLabel').textContent=supplierConnected?'AUTHORIZATION PENDING':'API SETUP REQUIRED';if(supplierConnected){$('#heroStatus').textContent='Systems online · Hotelbeds authorization pending';$('#connectionText').textContent='Credentials are configured securely. Live prices will appear after Hotelbeds authorizes the API credentials.';$('#statusBadge').textContent='AUTHORIZATION PENDING'}}catch(_){$('#systemLabel').textContent='CONNECTING'}
  }

  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const button=form.querySelector('button[type="submit"]');
    const destination=form.elements.destination;
    const option=destination.options[destination.selectedIndex];
    if(!supplierConnected){setState('The secure supplier credentials are not active yet. Add the Hotelbeds API Key and Secret in Cloudflare, then search again.');grid.scrollIntoView({behavior:'smooth',block:'start'});return}
    button.disabled=true;button.textContent='CHECKING VERIFIED RATES…';setState('Contacting the supplier and checking current availability…');grid.scrollIntoView({behavior:'smooth',block:'start'});
    try{
      const response=await fetch(API+'/search',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({destination:option.dataset.label,destination_code:destination.value,checkin:form.elements.checkin.value,checkout:form.elements.checkout.value,adults:2,rooms:1})});
      const data=await response.json();
      if(!response.ok)throw new Error(data.error||'search_failed');
      results=Array.isArray(data.deals)?data.deals:[];renderResults();
    }catch(error){setState(error.message==='supplier_credentials_missing'?'Hotelbeds credentials are not active yet.':'Hotelbeds authorization is pending. Verified live prices will appear as soon as the supplier accepts the API credentials.');}
    finally{button.disabled=false;button.textContent='SEARCH LIVE RATES'}
  });

  grid.addEventListener('click',event=>{
    const card=event.target.closest('.hotel-card');if(!card)return;const item=resultById(card.dataset.id);if(!item)return;
    if(event.target.closest('.save-btn')){const exists=saved.some(x=>String(x.hotel_id)===String(item.hotel_id));saved=exists?saved.filter(x=>String(x.hotel_id)!==String(item.hotel_id)):[...saved,item];localStorage.setItem('benarianVerifiedSavedStays',JSON.stringify(saved));renderSaved();renderResults();toast(exists?'Removed from saved hotels':'Saved to your hotels')}
    if(event.target.closest('.select-btn')){selected=item;sessionStorage.setItem('benarianVerifiedSelectedStay',JSON.stringify(item));renderCheckout();openDrawer('checkout')}
  });
  $('#savedList')?.addEventListener('click',event=>{const button=event.target.closest('[data-select-id]');if(!button)return;selected=resultById(button.dataset.selectId);sessionStorage.setItem('benarianVerifiedSelectedStay',JSON.stringify(selected));renderCheckout();openDrawer('checkout')});
  document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openDrawer(button.dataset.open)));
  document.querySelectorAll('.close-btn').forEach(button=>button.addEventListener('click',closeDrawers));
  document.querySelectorAll('.drawer').forEach(drawer=>drawer.addEventListener('click',event=>{if(event.target===drawer)closeDrawers()}));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeDrawers()});
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-language]').forEach(b=>b.classList.toggle('active',b===button));$('.policy-en').classList.toggle('active',button.dataset.language==='en');$('.policy-fa').classList.toggle('active',button.dataset.language==='fa')}));

  const today=new Date();today.setDate(today.getDate()+1);const iso=date=>date.toISOString().slice(0,10);form.elements.checkin.min=iso(today);form.elements.checkin.value=iso(today);const checkout=new Date(today);checkout.setDate(checkout.getDate()+2);form.elements.checkout.min=iso(new Date(today.getTime()+86400000));form.elements.checkout.value=iso(checkout);form.elements.checkin.addEventListener('change',()=>{const next=new Date(form.elements.checkin.value+'T00:00:00');next.setDate(next.getDate()+1);form.elements.checkout.min=iso(next);if(!form.elements.checkout.value||form.elements.checkout.value<=form.elements.checkin.value)form.elements.checkout.value=iso(next)});
  renderSaved();renderCheckout();checkHealth();
})();
