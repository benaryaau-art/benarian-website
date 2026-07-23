// BENARIAN partner-link configuration
window.BENARIAN_PARTNERS = {
  booking: { enabled: true, baseUrl: "https://www.booking.com/searchresults.html", affiliateBaseUrl: "https://www.kqzyfj.com/click-101828630-17289006" },
  taxi: { enabled: true, affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17322570" },
  attractions: { enabled: true, affiliateBaseUrl: "https://www.kqzyfj.com/click-101828630-17289009" },
  flights: { enabled: true, affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17289007" },
  cars: { enabled: true, affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17289008" },
  getawayDeals: { enabled: true, affiliateBaseUrl: "https://www.tqlhce.com/click-101828630-17301957" },
  expedia: { enabled: true, travelShopUrl: "https://www.expedia.com.au/shop/benariantravel" },
  agoda: { enabled: false, affiliateBaseUrl: "" }, trip: { enabled: false, affiliateBaseUrl: "" }, hotels: { enabled: false, affiliateBaseUrl: "" }, getYourGuide: { enabled: false, affiliateBaseUrl: "" }
};

function initialiseBenarianRuntime() {
  const hero = document.querySelector('.home-lux .lux-hero');
  if (hero) {
    hero.querySelectorAll('.benarian-hero-video').forEach(video => video.remove());
    hero.style.backgroundImage = "linear-gradient(90deg,rgba(8,12,8,.58) 0%,rgba(8,12,8,.24) 48%,rgba(8,12,8,.06) 100%),url('assets/images/benarian-hero-resort.webp?v=20260723g')";
    hero.style.backgroundPosition = 'center center';
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundRepeat = 'no-repeat';

    const heroCopy = hero.querySelector('.lux-hero-copy');
    if (heroCopy && !heroCopy.querySelector('.benarian-expedia-cta')) {
      const cta = document.createElement('a');
      cta.className = 'benarian-expedia-cta';
      cta.href = window.BENARIAN_PARTNERS.expedia.travelShopUrl;
      cta.target = '_blank';
      cta.rel = 'noopener sponsored';
      cta.textContent = 'EXPLORE HOTELS ON EXPEDIA';
      cta.setAttribute('aria-label', 'Explore BENARIAN hotels on Expedia');
      heroCopy.appendChild(cta);
    }
  }

  const logoMarkup = `<svg class="benarian-global-logo" viewBox="0 0 760 120" role="img" aria-label="BENARIAN Luxury Travel and Hospitality" xmlns="http://www.w3.org/2000/svg"><g fill="#b9872c"><text x="0" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text><text x="38" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text></g><text x="130" y="69" font-family="Georgia, 'Times New Roman', serif" font-size="51" letter-spacing="6" fill="#17140f">BENARIAN</text><text x="132" y="99" font-family="Arial, Helvetica, sans-serif" font-size="14" letter-spacing="2.1" fill="#b9872c">LUXURY TRAVEL &amp; HOSPITALITY</text></svg>`;
  document.querySelectorAll('.header .brand').forEach(brand => { brand.classList.remove('brand-lockup'); brand.innerHTML = logoMarkup; brand.setAttribute('aria-label', 'BENARIAN home'); });

  if (!document.querySelector('#benarian-global-runtime-style')) {
    const style = document.createElement('style');
    style.id = 'benarian-global-runtime-style';
    style.textContent = `.header .brand,.header .brand:not(.brand-lockup){display:flex!important;align-items:center!important;width:330px!important;height:70px!important;max-width:100%!important;overflow:visible!important;background:none!important;filter:none!important}.header .brand:before,.header .brand:after{content:none!important;display:none!important}.header .brand img{display:none!important}.benarian-global-logo{display:block!important;width:100%!important;height:100%!important;overflow:visible!important}.lux-hero{position:relative!important;overflow:hidden!important;background-color:#182015!important}.benarian-hero-video{display:none!important}.benarian-hero-overlay{display:none!important}.lux-hero-copy{position:relative!important;z-index:2!important}.benarian-expedia-cta{display:inline-flex!important;align-items:center!important;justify-content:center!important;margin-top:22px!important;padding:14px 24px!important;border:1px solid #c79a43!important;background:#b9872c!important;color:#fff!important;font-family:Arial,Helvetica,sans-serif!important;font-size:13px!important;font-weight:700!important;letter-spacing:1.5px!important;text-decoration:none!important;box-shadow:0 10px 26px rgba(0,0,0,.24)!important;transition:transform .2s ease,background .2s ease!important}.benarian-expedia-cta:hover{background:#9e7224!important;transform:translateY(-2px)!important}.about-page .about-signature,.about-page .founder-signature{font-family:'Allura','Snell Roundhand','Apple Chancery',cursive!important;font-style:normal!important;font-weight:400!important;color:#b9872c!important}.about-page .about-signature{font-size:72px!important}.about-page .founder-signature{font-size:66px!important}.about-page .founder-photo{aspect-ratio:2/3!important;background:#111!important}.about-page .founder-photo img{width:100%!important;height:100%!important;object-fit:contain!important}@media(max-width:760px){.header .brand,.header .brand:not(.brand-lockup){width:250px!important;height:62px!important;max-width:calc(100vw - 132px)!important}.about-page .about-signature{font-size:54px!important}.about-page .founder-signature{font-size:50px!important}.lux-hero{background-position:58% center!important}.benarian-expedia-cta{width:100%!important;max-width:320px!important;padding:13px 16px!important;font-size:12px!important}}@media(max-width:390px){.header .brand,.header .brand:not(.brand-lockup){width:230px!important;height:58px!important;max-width:calc(100vw - 118px)!important}}`;
    document.head.appendChild(style);
  }

  const loadStyleOnce = (href, marker) => { if (document.querySelector(`link[${marker}]`)) return; const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; link.setAttribute(marker, 'true'); document.head.appendChild(link); };
  loadStyleOnce('assets/premium-v2.css?v=20260723a', 'data-benarian-premium-v2');
  loadStyleOnce('assets/weekend-deals-v3.css?v=20260723', 'data-benarian-weekend-deals-v3');

  if (document.body.classList.contains('about-page') && !document.querySelector('link[data-benarian-signature-font]')) { const font = document.createElement('link'); font.rel = 'stylesheet'; font.href = 'https://fonts.googleapis.com/css2?family=Allura&display=swap'; font.setAttribute('data-benarian-signature-font', 'true'); document.head.appendChild(font); }
  const founderImage = document.querySelector('.about-page .founder-photo img'); if (founderImage) { founderImage.src = 'assets/images/ben-tafreshi-founder.jpg?v=20260723b'; founderImage.alt = 'Ben Tafreshi, Founder and CEO of BENARIAN'; founderImage.loading = 'eager'; founderImage.decoding = 'async'; founderImage.fetchPriority = 'high'; }

  document.querySelectorAll('.header .nav').forEach(nav => {
    if (!nav.querySelector('a[data-benarian-expedia-shop]')) {
      const shopLink = document.createElement('a');
      shopLink.href = window.BENARIAN_PARTNERS.expedia.travelShopUrl;
      shopLink.target = '_blank';
      shopLink.rel = 'noopener sponsored';
      shopLink.textContent = 'EXPEDIA SHOP';
      shopLink.setAttribute('data-benarian-expedia-shop', 'true');
      nav.appendChild(shopLink);
    }
    if (!nav.querySelector('a[href="terms-and-conditions.html"]')) { const link = document.createElement('a'); link.href = 'terms-and-conditions.html'; link.textContent = 'TERMS & CONDITIONS'; nav.appendChild(link); }
  });
  document.querySelectorAll('a[href="iran-flights.html"]').forEach(link => { link.textContent = 'FLIGHTS'; link.setAttribute('aria-label', 'Flights'); });
  document.querySelectorAll('.footer').forEach(footer => {
    if (!footer.querySelector('a[data-benarian-expedia-shop]')) {
      const shopLink = document.createElement('a');
      shopLink.href = window.BENARIAN_PARTNERS.expedia.travelShopUrl;
      shopLink.target = '_blank';
      shopLink.rel = 'noopener sponsored';
      shopLink.textContent = 'BENARIAN Expedia Travel Shop';
      shopLink.setAttribute('data-benarian-expedia-shop', 'true');
      footer.appendChild(document.createTextNode(' · '));
      footer.appendChild(shopLink);
    }
    if (!footer.querySelector('a[href="terms-and-conditions.html"]')) { const privacy = footer.querySelector('a[href="privacy-policy.html"]'); if (privacy) { const link = document.createElement('a'); link.href = 'terms-and-conditions.html'; link.textContent = 'Terms & Conditions'; privacy.parentNode.insertBefore(link, privacy); privacy.parentNode.insertBefore(document.createTextNode(' · '), privacy); } }
  });

  const loadScriptOnce = (src, marker) => { if (document.querySelector(`script[${marker}]`)) return; const script = document.createElement('script'); script.src = src; script.defer = true; script.setAttribute(marker, 'true'); document.body.appendChild(script); };
  loadScriptOnce('assets/live-concierge.js?v=20260723c', 'data-benarian-live-concierge');
  loadScriptOnce('assets/install-app-prompt.js?v=20260723b', 'data-benarian-install-prompt');
  loadScriptOnce('assets/premium-v2.js?v=20260723a', 'data-benarian-premium-v2-script');
  loadScriptOnce('assets/weekend-deals-v3.js?v=20260723', 'data-benarian-weekend-deals-v3-script');
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseBenarianRuntime, { once: true }); else initialiseBenarianRuntime();