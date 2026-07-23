// BENARIAN partner-link configuration
window.BENARIAN_PARTNERS = {
  booking: { enabled: true, baseUrl: "https://www.booking.com/searchresults.html", affiliateBaseUrl: "https://www.kqzyfj.com/click-101828630-17289006" },
  taxi: { enabled: true, affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17322570" },
  attractions: { enabled: true, affiliateBaseUrl: "https://www.kqzyfj.com/click-101828630-17289009" },
  flights: { enabled: true, affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17289007" },
  cars: { enabled: true, affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17289008" },
  getawayDeals: { enabled: true, affiliateBaseUrl: "https://www.tqlhce.com/click-101828630-17301957" },
  agoda: { enabled: false, affiliateBaseUrl: "" },
  trip: { enabled: false, affiliateBaseUrl: "" },
  expedia: { enabled: false, affiliateBaseUrl: "" },
  hotels: { enabled: false, affiliateBaseUrl: "" },
  getYourGuide: { enabled: false, affiliateBaseUrl: "" }
};

function initialiseBenarianRuntime() {
  const hero = document.querySelector('.home-lux .lux-hero');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);

  if (hero && !hero.querySelector('.benarian-hero-video') && !reducedMotion && !saveData) {
    const loadHeroVideo = () => {
      if (hero.querySelector('.benarian-hero-video')) return;
      const video = document.createElement('video');
      video.className = 'benarian-hero-video';
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('aria-hidden', 'true');
      video.innerHTML = '<source src="assets/videos/Video.mp4" type="video/mp4">';
      hero.prepend(video);
      const overlay = document.createElement('span');
      overlay.className = 'benarian-hero-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      hero.insertBefore(overlay, video.nextSibling);
      video.play().catch(() => {});
    };
    const scheduleVideo = () => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(loadHeroVideo, { timeout: 1800 });
      else window.setTimeout(loadHeroVideo, 500);
    };
    if (document.readyState === 'complete') scheduleVideo();
    else window.addEventListener('load', scheduleVideo, { once: true });
  }

  const logoMarkup = `
    <svg class="benarian-global-logo" viewBox="0 0 760 120" role="img" aria-label="BENARIAN Luxury Travel and Hospitality" xmlns="http://www.w3.org/2000/svg">
      <g fill="#b9872c"><text x="0" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text><text x="38" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text></g>
      <text x="130" y="69" font-family="Georgia, 'Times New Roman', serif" font-size="51" letter-spacing="6" fill="#17140f">BENARIAN</text>
      <text x="132" y="99" font-family="Arial, Helvetica, sans-serif" font-size="14" letter-spacing="2.1" fill="#b9872c">LUXURY TRAVEL &amp; HOSPITALITY</text>
    </svg>`;

  document.querySelectorAll('.header .brand').forEach(brand => {
    brand.classList.remove('brand-lockup');
    brand.innerHTML = logoMarkup;
    brand.setAttribute('aria-label', 'BENARIAN home');
  });

  if (!document.querySelector('#benarian-global-runtime-style')) {
    const style = document.createElement('style');
    style.id = 'benarian-global-runtime-style';
    style.textContent = `
      .header .brand,.header .brand:not(.brand-lockup){display:flex!important;align-items:center!important;width:330px!important;height:70px!important;max-width:100%!important;overflow:visible!important;background:none!important;filter:none!important}
      .header .brand:before,.header .brand:after{content:none!important;display:none!important}.header .brand img{display:none!important}.benarian-global-logo{display:block!important;width:100%!important;height:100%!important;overflow:visible!important}
      .lux-hero{position:relative!important;overflow:hidden!important;background-color:#182015!important}.benarian-hero-video{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;z-index:0!important;display:block!important}.benarian-hero-overlay{position:absolute!important;inset:0!important;z-index:1!important;background:linear-gradient(90deg,rgba(8,12,8,.62) 0%,rgba(8,12,8,.28) 45%,rgba(8,12,8,.10) 100%)!important;pointer-events:none!important}.lux-hero-copy{position:relative!important;z-index:2!important}
      .about-page .about-signature,.about-page .founder-signature{font-family:'Allura','Snell Roundhand','Apple Chancery',cursive!important;font-style:normal!important;font-weight:400!important;letter-spacing:.1px!important;line-height:1!important;color:#b9872c!important;text-rendering:geometricPrecision!important;-webkit-font-smoothing:antialiased!important}.about-page .about-signature{font-size:72px!important;margin-top:30px!important}.about-page .founder-signature{font-size:66px!important;margin-top:18px!important}
      .about-page .founder-photo{min-height:0!important;aspect-ratio:2/3!important;background:#111!important}.about-page .founder-photo img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;display:block!important;image-rendering:auto!important}
      @media(max-width:760px){.header .brand,.header .brand:not(.brand-lockup){width:250px!important;height:62px!important;max-width:calc(100vw - 132px)!important}.about-page .about-signature{font-size:54px!important}.about-page .founder-signature{font-size:50px!important}.benarian-hero-video{object-position:center center!important}}
      @media(max-width:390px){.header .brand,.header .brand:not(.brand-lockup){width:230px!important;height:58px!important;max-width:calc(100vw - 118px)!important}}
      @media(max-width:1000px){.about-page .founder-photo{aspect-ratio:2/3!important;max-width:620px;margin:0 auto!important;width:100%!important}}
      @media(prefers-reduced-motion:reduce){.benarian-hero-video{display:none!important}}
    `;
    document.head.appendChild(style);
  }

  if (document.body.classList.contains('about-page') && !document.querySelector('link[data-benarian-signature-font]')) {
    const font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Allura&display=swap';
    font.setAttribute('data-benarian-signature-font', 'true');
    document.head.appendChild(font);
  }

  const founderImage = document.querySelector('.about-page .founder-photo img');
  if (founderImage) {
    founderImage.src = 'assets/images/ben-tafreshi-founder.jpg?v=20260723b';
    founderImage.alt = 'Ben Tafreshi, Founder and CEO of BENARIAN';
    founderImage.loading = 'eager';
    founderImage.decoding = 'async';
    founderImage.fetchPriority = 'high';
  }

  document.querySelectorAll('.header .nav').forEach(nav => {
    if (!nav.querySelector('a[href="terms-and-conditions.html"]')) {
      const link = document.createElement('a');
      link.href = 'terms-and-conditions.html';
      link.textContent = 'TERMS & CONDITIONS';
      nav.appendChild(link);
    }
  });

  document.querySelectorAll('.footer').forEach(footer => {
    if (footer.querySelector('a[href="terms-and-conditions.html"]')) return;
    const privacy = footer.querySelector('a[href="privacy-policy.html"]');
    if (privacy) {
      const link = document.createElement('a');
      link.href = 'terms-and-conditions.html';
      link.textContent = 'Terms & Conditions';
      privacy.parentNode.insertBefore(link, privacy);
      privacy.parentNode.insertBefore(document.createTextNode(' · '), privacy);
      return;
    }
    const support = Array.from(footer.querySelectorAll('div')).find(div => /support/i.test(div.querySelector('strong')?.textContent || ''));
    if (support) {
      const link = document.createElement('a');
      link.href = 'terms-and-conditions.html';
      link.textContent = 'Terms & Conditions';
      support.appendChild(link);
    }
  });

  if (!document.querySelector('script[data-benarian-live-concierge]')) {
    const chatScript = document.createElement('script');
    chatScript.src = 'assets/live-concierge.js?v=20260723';
    chatScript.defer = true;
    chatScript.setAttribute('data-benarian-live-concierge', 'true');
    document.body.appendChild(chatScript);
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseBenarianRuntime, { once: true });
else initialiseBenarianRuntime();