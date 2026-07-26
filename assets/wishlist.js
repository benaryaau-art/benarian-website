(() => {
  const KEY = 'benarianHotelWishlist';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
  const write = items => { localStorage.setItem(KEY, JSON.stringify(items)); updateUtility(); };
  const slug = value => (value || '').toLowerCase().replace(/&amp;/g, '&').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function updateUtility(){
    const count = read().length;
    document.querySelectorAll('.topline .right').forEach(right => {
      let link = right.querySelector('.benarian-wishlist, a[href*="wishlist"]');
      if (!link) {
        const node = [...right.children].find(x => /Wishlist/i.test(x.textContent || ''));
        if (node) { link = document.createElement('a'); node.replaceWith(link); }
      }
      if (link) {
        link.className = 'benarian-utility benarian-wishlist';
        link.href = 'wishlist.html';
        link.setAttribute('aria-label', `Open Wishlist, ${count} saved hotels`);
        link.innerHTML = `♡ <span>Wishlist${count ? ` (${count})` : ''}</span>`;
      }
    });
  }

  function injectStyles(){
    if (document.getElementById('benarian-wishlist-style')) return;
    const style = document.createElement('style');
    style.id = 'benarian-wishlist-style';
    style.textContent = `
      .hotel-card,.featured-hotel-card{position:relative}
      .wishlist-heart{position:absolute;z-index:3;top:12px;right:12px;width:42px;height:42px;display:grid;place-items:center;border:1px solid #c8953d;border-radius:50%;background:rgba(255,255,255,.96);color:#9a681a;font-size:22px;line-height:1;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.14);transition:.2s ease}
      .wishlist-heart:hover{transform:scale(1.06)}.wishlist-heart.active{background:#b9872c;color:#fff}.wishlist-heart:focus-visible{outline:3px solid rgba(185,135,44,.35);outline-offset:2px}
      .wishlist-toast{position:fixed;left:50%;bottom:26px;z-index:10050;transform:translate(-50%,20px);opacity:0;padding:12px 18px;border-radius:999px;background:#17130e;color:#fff;border:1px solid #c8953d;font:600 12px Inter,Arial,sans-serif;box-shadow:0 12px 34px rgba(0,0,0,.3);transition:.25s ease;pointer-events:none}.wishlist-toast.show{opacity:1;transform:translate(-50%,0)}
      @media(max-width:600px){.wishlist-heart{top:10px;right:10px;width:44px;height:44px;font-size:23px}.hotel-card{padding-top:58px!important}.featured-hotel-card .wishlist-heart{top:14px;right:14px}.wishlist-toast{bottom:150px;max-width:calc(100vw - 32px);text-align:center}}
    `;
    document.head.appendChild(style);
  }

  function toast(message){
    let el = document.querySelector('.wishlist-toast');
    if (!el) { el = document.createElement('div'); el.className = 'wishlist-toast'; document.body.appendChild(el); }
    el.textContent = message; el.classList.add('show'); clearTimeout(el._timer); el._timer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function dataFromCard(card){
    const name = card.querySelector('h3')?.textContent.trim();
    if (!name) return null;
    const location = card.querySelector('.hotel-place')?.textContent.trim() || card.querySelector('.featured-hotel-body > p')?.textContent.trim() || '';
    const price = card.querySelector('.hotel-price')?.textContent.replace(/\s+/g,' ').trim() || '';
    const book = card.querySelector('.book-btn,.view-hotel,a[href*="booking.com"],a[href*="expedia"]');
    const image = card.querySelector('img')?.src || '';
    return { id: slug(`${name}-${location}`), name, location, price, url: book?.href || 'hotels.html', image };
  }

  function mountCard(card){
    if (card.dataset.wishlistReady === 'true') return;
    const item = dataFromCard(card); if (!item) return;
    card.dataset.wishlistReady = 'true';
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'wishlist-heart'; button.setAttribute('aria-label', `Save ${item.name} to Wishlist`);
    const render = () => { const active = read().some(x => x.id === item.id); button.classList.toggle('active', active); button.textContent = active ? '♥' : '♡'; button.setAttribute('aria-pressed', String(active)); };
    button.addEventListener('click', () => {
      const items = read(); const index = items.findIndex(x => x.id === item.id);
      if (index >= 0) { items.splice(index,1); toast(`${item.name} removed from Wishlist`); }
      else { items.unshift(item); toast(`${item.name} saved to Wishlist`); }
      write(items); render();
    });
    card.appendChild(button); render();
  }

  function mountCards(){ document.querySelectorAll('.hotel-card,.featured-hotel-card').forEach(mountCard); }
  function renderWishlistPage(){
    const root = document.querySelector('[data-wishlist-page]'); if (!root) return;
    const items = read();
    const count = root.querySelector('[data-wishlist-count]'); if (count) count.textContent = `${items.length} saved hotel${items.length === 1 ? '' : 's'}`;
    const grid = root.querySelector('[data-wishlist-grid]'); if (!grid) return;
    if (!items.length) { grid.innerHTML = `<div class="wishlist-empty"><span>♡</span><h2>Your Wishlist is empty</h2><p>Tap the heart beside any hotel to save it here.</p><a href="hotels.html">EXPLORE HOTELS →</a></div>`; return; }
    grid.innerHTML = items.map(item => `<article class="saved-hotel" data-id="${esc(item.id)}">${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.name)}">` : ''}<div><p>${esc(item.location)}</p><h2>${esc(item.name)}</h2>${item.price ? `<span>${esc(item.price)}</span>` : ''}<div class="saved-actions"><a href="${esc(item.url)}" target="_blank" rel="noopener sponsored">VIEW HOTEL →</a><button type="button" data-remove>REMOVE</button></div></div></article>`).join('');
    grid.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { const card = button.closest('[data-id]'); write(read().filter(x => x.id !== card.dataset.id)); renderWishlistPage(); }));
  }

  injectStyles(); updateUtility(); mountCards(); renderWishlistPage();
  new MutationObserver(() => { mountCards(); updateUtility(); }).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('storage', () => { updateUtility(); mountCards(); renderWishlistPage(); });
})();