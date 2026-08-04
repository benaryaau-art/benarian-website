(() => {
  const page = (location.pathname.split('/').filter(Boolean).pop() || 'index.html').toLowerCase();
  const isHome = page === 'index.html' || location.pathname === '/' || location.pathname === '';
  const isStories = page === 'travel-stories.html';
  const uploadHref = isStories ? '#share-story' : 'travel-stories.html#share-story';

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

  function addUploadToQuickAccess() {
    document.querySelectorAll('.benarian-quick-access').forEach(menu => {
      if (menu.querySelector('[data-benarian-upload]')) return;
      const link = document.createElement('a');
      link.href = uploadHref;
      link.dataset.benarianUpload = 'true';
      link.className = 'benarian-upload-quick-link';
      link.innerHTML = '<span class="qa-icon">＋</span><span class="upload-label"><strong>Upload Photos</strong><small>آپلود عکس و ثبت تجربه</small></span>';
      menu.appendChild(link);
    });
  }

  function addUploadToMobileNav() {
    document.querySelectorAll('.benarian-mobile-nav').forEach(nav => {
      if (nav.querySelector('[data-benarian-mobile-upload]')) return;
      const link = document.createElement('a');
      link.href = uploadHref;
      link.dataset.benarianMobileUpload = 'true';
      link.className = isStories ? 'current benarian-mobile-upload' : 'benarian-mobile-upload';
      link.innerHTML = '<span>＋</span><b>Upload</b><small>آپلود</small>';
      const account = nav.querySelector('a[href*="member"],a[href*="account"]');
      account ? nav.insertBefore(link, account) : nav.appendChild(link);
      nav.classList.add('with-upload');
    });
  }

  function addFallbackUploadButton() {
    if (document.querySelector('.benarian-quick-access') || document.querySelector('.benarian-mobile-nav')) return;
    if (document.getElementById('benarian-upload-fallback')) return;
    const link = document.createElement('a');
    link.id = 'benarian-upload-fallback';
    link.href = uploadHref;
    link.innerHTML = '<span>＋</span><strong>Upload Photos</strong><small>آپلود عکس و ثبت تجربه</small>';
    document.body.appendChild(link);
  }

  function addCreatorPromotionFields() {
    if (!isStories) return;
    const form = document.getElementById('travelStoryForm');
    if (!form || form.querySelector('[data-creator-promotion]')) return;
    const existingSocial = form.querySelector('input[name="social"]')?.closest('label');
    const block = document.createElement('div');
    block.className = 'full creator-promotion-card';
    block.dataset.creatorPromotion = 'true';
    block.innerHTML = `
      <div class="creator-promotion-head">
        <span class="creator-promotion-icon">◎</span>
        <div><strong>Promote your travel profile</strong><small>معرفی اینستاگرام و کانال یوتیوب شما</small></div>
      </div>
      <p>Add your public profiles so travellers can discover your content. These links are optional and will only appear when you allow them.</p>
      <div class="creator-profile-grid">
        <label>Instagram profile <span class="label-fa">لینک یا نام کاربری اینستاگرام</span><input type="text" name="instagram" inputmode="url" dir="auto" placeholder="@username or https://instagram.com/username"></label>
        <label>YouTube channel <span class="label-fa">لینک کانال یوتیوب</span><input type="url" name="youtube" inputmode="url" placeholder="https://youtube.com/@channel"></label>
        <label>TikTok or website <span class="label-fa">تیک‌تاک یا وب‌سایت — اختیاری</span><input type="text" name="creator_website" inputmode="url" dir="auto" placeholder="https://..."></label>
        <label>Creator name or channel name <span class="label-fa">نام پیج یا کانال</span><input type="text" name="creator_name" dir="auto" placeholder="Your travel brand / نام پیج سفر"></label>
      </div>
      <label class="inline-choice creator-consent"><input type="checkbox" name="show_creator_profiles" value="yes"><span>Show these links publicly with my approved story.<br><span class="label-fa">لینک‌های من همراه تجربه تأییدشده نمایش داده شوند.</span></span></label>`;
    if (existingSocial) existingSocial.replaceWith(block); else {
      const upload = form.querySelector('#uploadZone')?.closest('.full');
      upload ? form.insertBefore(block, upload) : form.appendChild(block);
    }
  }

  function installStyles() {
    if (document.getElementById('benarian-community-access-style')) return;
    const style = document.createElement('style');
    style.id = 'benarian-community-access-style';
    style.textContent = `
      .benarian-quick-access .benarian-upload-quick-link{
        display:flex!important;align-items:center!important;gap:10px!important;
        min-width:152px!important;width:100%!important;min-height:52px!important;
        padding:13px 15px!important;margin:0!important;
        border:1px solid #c9953f!important;border-radius:12px!important;
        background:rgba(18,15,11,.94)!important;color:#fff!important;
        box-shadow:0 10px 28px rgba(0,0,0,.3)!important;
        font:700 11px/1 Inter,Arial,sans-serif!important;
      }
      .benarian-quick-access .benarian-upload-quick-link .qa-icon{
        display:grid!important;place-items:center!important;width:26px!important;height:26px!important;
        flex:0 0 26px!important;border-radius:50%!important;
        background:rgba(201,149,63,.18)!important;color:#f3c976!important;
        font:700 18px/1 Inter,Arial,sans-serif!important;
      }
      .benarian-quick-access .benarian-upload-quick-link .upload-label{display:flex!important;flex-direction:column!important;gap:4px!important;min-width:0!important}
      .benarian-quick-access .benarian-upload-quick-link strong{font:700 11px/1 Inter,Arial,sans-serif!important;color:#fff!important;white-space:nowrap!important}
      .benarian-quick-access .benarian-upload-quick-link small{font:500 8px/1.25 Vazirmatn,Inter,sans-serif!important;color:#d9c9ad!important;white-space:nowrap!important}
      .benarian-mobile-nav.with-upload{grid-template-columns:repeat(6,minmax(0,1fr))!important}
      .benarian-mobile-nav .benarian-mobile-upload{background:linear-gradient(145deg,#c8953d,#8e5d1b)!important;color:#fff!important;border-radius:13px!important}
      .benarian-mobile-nav .benarian-mobile-upload b{display:block;font:700 8px/1 Inter,Arial,sans-serif!important}
      .benarian-mobile-nav .benarian-mobile-upload small{display:block;font:500 7px/1 Vazirmatn,Inter,sans-serif!important;color:#fff!important}
      #benarian-upload-fallback{position:fixed;right:16px;top:58%;z-index:10020;display:flex;align-items:center;gap:10px;padding:13px 16px;border:1px solid #dfb15b;border-radius:13px;background:linear-gradient(135deg,#b9872c,#75470f);color:#fff;text-decoration:none;box-shadow:0 14px 36px rgba(0,0,0,.32)}
      #benarian-upload-fallback>span{font-size:25px}#benarian-upload-fallback strong,#benarian-upload-fallback small{display:block}#benarian-upload-fallback strong{font-size:11px}#benarian-upload-fallback small{font:500 9px Vazirmatn,Inter,sans-serif}
      .creator-promotion-card{padding:24px;border:1px solid #d9be8b;border-radius:16px;background:linear-gradient(135deg,#fffaf0,#f7eddb)}
      .creator-promotion-head{display:flex;align-items:center;gap:13px;margin-bottom:8px}.creator-promotion-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#1e1812;color:#e5b65e;font-size:23px}.creator-promotion-head strong{display:block;font:600 25px/1.1 'Cormorant Garamond',Georgia,serif;color:#211a13}.creator-promotion-head small{display:block;margin-top:5px;font:500 11px Vazirmatn,Inter,sans-serif;color:#806d54}.creator-promotion-card>p{margin:12px 0 20px;color:#6f6252;line-height:1.7}.creator-profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.creator-consent{margin-top:16px;background:#fff}
      @media(max-width:760px){
        .benarian-mobile-nav.with-upload{left:6px!important;right:6px!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;padding:3px!important}
        .benarian-mobile-nav.with-upload a{font-size:6.7px!important;padding-left:0!important;padding-right:0!important}
        .benarian-mobile-nav.with-upload a span{font-size:16px!important}.benarian-mobile-nav .benarian-mobile-upload b{font-size:7px!important}.benarian-mobile-nav .benarian-mobile-upload small{font-size:6px!important}
        #benarian-upload-fallback{left:14px;right:14px;top:auto;bottom:82px;justify-content:center}body{padding-bottom:150px!important}
        .creator-promotion-card{padding:19px 15px}.creator-profile-grid{grid-template-columns:1fr}.creator-promotion-head strong{font-size:22px}
      }
    `;
    document.head.appendChild(style);
  }

  function addTravelStoriesHomeFeature() {
    if (!isHome || document.getElementById('benarian-travel-stories-home')) return;
    const main = document.querySelector('main');
    if (!main) return;
    const anchor = document.querySelector('.hotels-section') || document.querySelector('.info-section') || main.lastElementChild;
    const section = document.createElement('section');
    section.id = 'benarian-travel-stories-home';
    section.innerHTML = `<div class="travel-stories-home-media" role="img" aria-label="Traveller sharing a luxury hotel experience"></div><div class="travel-stories-home-copy"><span>BENARIAN TRAVEL COMMUNITY</span><h2>Share Your Travel Story</h2><p>Upload your favourite travel photos, review your hotel stay and promote your Instagram or YouTube travel channel.</p><div class="travel-stories-home-actions"><a class="travel-stories-primary" href="travel-stories.html#share-story">Upload & Share →</a><a class="travel-stories-secondary" href="travel-stories.html">Explore Stories</a></div></div>`;
    if (anchor?.parentNode) anchor.insertAdjacentElement('afterend', section); else main.appendChild(section);
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
    installStyles();
    addTravelStoriesNavigation();
    addUploadToQuickAccess();
    addUploadToMobileNav();
    addFallbackUploadButton();
    addCreatorPromotionFields();
    addTravelStoriesHomeFeature();
    removeBookingAfterFooter();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true}); else run();
  [250,600,1200,2200,4000,7000].forEach(ms => setTimeout(run, ms));
  new MutationObserver(() => requestAnimationFrame(run)).observe(document.documentElement,{childList:true,subtree:true});
})();