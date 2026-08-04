(() => {
  const page = (location.pathname.split('/').filter(Boolean).pop() || 'index.html').toLowerCase();
  const isHome = page === 'index.html' || location.pathname === '/' || location.pathname === '';

  function addTravelStoriesNavigation() {
    document.querySelectorAll('.nav').forEach(nav => {
      if (nav.querySelector('a[href="travel-stories.html"]')) return;
      const link = document.createElement('a');
      link.href = 'travel-stories.html';
      link.textContent = 'TRAVEL STORIES';
      const wellness = nav.querySelector('a[href="wellness.html"]');
      wellness ? nav.insertBefore(link, wellness) : nav.appendChild(link);
    });
  }

  function addUploadShortcut() {
    if (document.getElementById('benarian-upload-shortcut')) return;
    const link = document.createElement('a');
    link.id = 'benarian-upload-shortcut';
    link.href = page === 'travel-stories.html' ? '#share-story' : 'travel-stories.html#share-story';
    link.setAttribute('aria-label','Upload travel photos and share a story');
    link.innerHTML = '<span class="upload-shortcut-icon">＋</span><span class="upload-shortcut-copy"><strong>Upload Photos</strong><small>آپلود عکس و ثبت تجربه</small></span>';
    document.body.appendChild(link);

    if (!document.getElementById('benarian-upload-shortcut-style')) {
      const style = document.createElement('style');
      style.id = 'benarian-upload-shortcut-style';
      style.textContent = `
        #benarian-upload-shortcut{position:fixed;right:16px;top:calc(50% + 132px);z-index:9997;display:flex;align-items:center;gap:11px;min-width:174px;padding:13px 15px;border:1px solid #d3a24d;border-radius:12px;background:rgba(18,15,11,.96);color:#fff;text-decoration:none;box-shadow:0 12px 30px rgba(0,0,0,.32);backdrop-filter:blur(10px)}
        #benarian-upload-shortcut .upload-shortcut-icon{display:grid;place-items:center;width:30px;height:30px;flex:0 0 30px;border-radius:50%;background:#b9872c;color:#fff;font:700 22px/1 Inter,Arial,sans-serif}
        #benarian-upload-shortcut .upload-shortcut-copy{display:flex;flex-direction:column;gap:4px;min-width:0}
        #benarian-upload-shortcut strong{font:700 11px/1 Inter,Arial,sans-serif;white-space:nowrap}
        #benarian-upload-shortcut small{font:500 9px/1.2 Vazirmatn,Inter,Arial,sans-serif;color:#e9d9bd;white-space:nowrap}
        #benarian-upload-shortcut:hover{transform:translateY(-2px);background:#231b12}
        @media(max-width:760px){
          #benarian-upload-shortcut{left:18px;right:18px;top:auto;bottom:82px;min-width:0;justify-content:center;padding:12px 16px;border-radius:16px;background:linear-gradient(135deg,#c18a2f,#9f6d20);box-shadow:0 12px 32px rgba(53,35,10,.34)}
          #benarian-upload-shortcut .upload-shortcut-icon{background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.28)}
          #benarian-upload-shortcut strong{font-size:12px}
          #benarian-upload-shortcut small{font-size:10px;color:#fff5e4}
          body{padding-bottom:150px!important}
        }
      `;
      document.head.appendChild(style);
    }
  }

  function addTravelStoriesHomeFeature() {
    if (!isHome || document.getElementById('benarian-travel-stories-home')) return;
    const main = document.querySelector('main');
    if (!main) return;
    const anchor = document.querySelector('.hotels-section') || document.querySelector('.info-section') || main.lastElementChild;
    const section = document.createElement('section');
    section.id = 'benarian-travel-stories-home';
    section.innerHTML = `<div class="travel-stories-home-media" role="img" aria-label="Traveller sharing a luxury hotel experience"></div><div class="travel-stories-home-copy"><span>BENARIAN TRAVEL COMMUNITY</span><h2>Share Your Travel Story</h2><p>Upload your favourite travel photos, review your hotel stay and inspire other travellers with your genuine experience.</p><div class="travel-stories-home-actions"><a class="travel-stories-primary" href="travel-stories.html#share-story">Share Your Story →</a><a class="travel-stories-secondary" href="travel-stories.html">Explore Stories</a></div></div>`;
    if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend', section); else main.appendChild(section);
    if (!document.getElementById('benarian-travel-stories-home-style')) {
      const style = document.createElement('style');
      style.id = 'benarian-travel-stories-home-style';
      style.textContent = `#benarian-travel-stories-home{display:grid;grid-template-columns:1.05fr .95fr;min-height:560px;background:#17130e;color:#fff;overflow:hidden}.travel-stories-home-media{min-height:560px;background:linear-gradient(90deg,rgba(15,12,9,.08),rgba(15,12,9,.42)),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=90&w=1600') center/cover no-repeat}.travel-stories-home-copy{display:flex;flex-direction:column;justify-content:center;padding:70px clamp(32px,6vw,90px)}.travel-stories-home-copy>span{color:#dfb45f;font:700 10px/1 Inter,Arial,sans-serif;letter-spacing:3px;margin-bottom:18px}.travel-stories-home-copy h2{font:600 clamp(48px,5.5vw,72px)/.92 'Cormorant Garamond',Georgia,serif;margin:0 0 24px;color:#fff}.travel-stories-home-copy p{max-width:560px;color:#e4d9ca;font-size:16px;line-height:1.75;margin:0}.travel-stories-home-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.travel-stories-home-actions a{display:inline-block;padding:14px 19px;border-radius:8px;text-decoration:none;font:700 12px/1 Inter,Arial,sans-serif}.travel-stories-primary{background:#bd8730;color:#fff}.travel-stories-secondary{border:1px solid #d5a64b;color:#f1c978}@media(max-width:820px){#benarian-travel-stories-home{grid-template-columns:1fr}.travel-stories-home-media{min-height:360px}.travel-stories-home-copy{padding:54px 22px 64px}.travel-stories-home-copy h2{font-size:48px}}`;
      document.head.appendChild(style);
    }
  }

  function removeBookingAfterFooter() {
    if (!isHome) return;
    const footer = document.querySelector('.benarian-footer-v3, footer');
    if (!footer) return;
    let sibling = footer.nextElementSibling;
    while (sibling) {
      const next = sibling.nextElementSibling;
      const text = (sibling.textContent || '').replace(/\s+/g, ' ').trim();
      if (sibling.matches('iframe, form, section, div') && (/Search for your next stay/i.test(text) || /Powered by\s*Booking\.com/i.test(text) || sibling.querySelector?.('iframe[src*="booking.com"], form[action*="booking.com"]'))) sibling.remove();
      sibling = next;
    }
  }

  function run() {
    requestAnimationFrame(() => {
      addTravelStoriesNavigation();
      addUploadShortcut();
      addTravelStoriesHomeFeature();
      removeBookingAfterFooter();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true }); else run();
  [300,800,1600,3000].forEach(ms => setTimeout(run, ms));
})();