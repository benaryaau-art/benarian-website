// BENARIAN partner-link configuration — Booking.com is the primary booking partner.
window.BENARIAN_PARTNERS = {
  booking: { enabled: true, baseUrl: 'https://www.booking.com/searchresults.html', affiliateBaseUrl: 'https://www.kqzyfj.com/click-101828630-17289006' },
  flights: { enabled: true, affiliateBaseUrl: 'https://www.anrdoezrs.net/click-101828630-17289007' },
  taxi: { enabled: true, affiliateBaseUrl: 'https://www.anrdoezrs.net/click-101828630-17322570' },
  attractions: { enabled: true, affiliateBaseUrl: 'https://www.kqzyfj.com/click-101828630-17289009' },
  cars: { enabled: true, affiliateBaseUrl: 'https://www.anrdoezrs.net/click-101828630-17289008' }
};

(function initialiseBenarianPartners(){
  function loadScriptOnce(src, marker) {
    const base = src.split('?')[0];
    if (document.querySelector(`script[${marker}]`) || document.querySelector(`script[src^="${base}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.setAttribute(marker, 'true');
    document.body.appendChild(script);
  }

  function currentPageSlug() {
    return (location.pathname.split('/').filter(Boolean).pop() || 'index')
      .toLowerCase()
      .replace(/\.html$/, '');
  }

  function ensureMeta(selector, attributes) {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement(attributes.tag || 'meta');
      document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== 'tag') element.setAttribute(key, value);
    });
    return element;
  }

  function installSeoMetadata() {
    const page = currentPageSlug();
    const isHome = page === 'index';
    const canonicalUrl = isHome ? 'https://benarian.com/' : `https://benarian.com/${page}.html`;
    const title = isHome
      ? 'BENARIAN | Luxury Hotels, Resorts & Curated Travel'
      : `${document.title.replace(/\s*\|\s*BENARIAN.*$/i, '').trim()} | BENARIAN`;
    const description = isHome
      ? 'Discover curated luxury hotels, resorts, destinations, wellness retreats and exceptional travel experiences with BENARIAN.'
      : (document.querySelector('meta[name="description"]')?.content || 'Explore curated luxury travel experiences, hotels and destination guides with BENARIAN.');

    document.title = title;
    ensureMeta('meta[name="description"]', { name: 'description', content: description });
    ensureMeta('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: canonicalUrl });
    ensureMeta('link[rel="icon"]', { tag: 'link', rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' });
    ensureMeta('link[rel="manifest"]', { tag: 'link', rel: 'manifest', href: '/site.webmanifest' });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'BENARIAN' });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: 'https://benarian.com/assets/benarian-social-card.svg' });
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: 'https://benarian.com/assets/benarian-social-card.svg' });

    if (isHome) {
      let schema = document.getElementById('benarian-organization-schema');
      if (!schema) {
        schema = document.createElement('script');
        schema.type = 'application/ld+json';
        schema.id = 'benarian-organization-schema';
        document.head.appendChild(schema);
      }
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        '@id': 'https://benarian.com/#organization',
        name: 'BENARIAN',
        legalName: 'BENARIAN Pty Ltd',
        url: 'https://benarian.com/',
        logo: 'https://benarian.com/favicon.svg',
        image: 'https://benarian.com/assets/benarian-social-card.svg',
        description,
        email: 'info@benarian.com',
        founder: { '@type': 'Person', name: 'Ben Tafreshi' },
        sameAs: ['https://www.instagram.com/benarianhotels']
      });
    }
  }

  function ensureGlobalLogo() {
    document.querySelectorAll('.header').forEach(header => {
      let brand = header.querySelector('.brand, .brand-lockup, a[aria-label*="BENARIAN" i]');
      if (!brand) {
        brand = document.createElement('a');
        brand.href = 'index.html';
        header.prepend(brand);
      }
      brand.className = 'brand brand-lockup';
      brand.href = 'index.html';
      brand.setAttribute('aria-label', 'BENARIAN home');
      brand.innerHTML = '<span class="brand-mark" aria-hidden="true">BB</span><span class="brand-copy"><strong>BENARIAN</strong><small>LUXURY TRAVEL &amp; HOSPITALITY</small></span>';
    });
  }

  function correctFlightLinks() {
    document.querySelectorAll('a[href="iran-flights.html"],a[href$="/iran-flights.html"]').forEach(link => {
      link.href = 'flights.html';
      if ((link.textContent || '').trim()) link.textContent = link.textContent.replace(/Iran Flights/gi, 'Flights');
      link.setAttribute('aria-label', 'Flights');
    });
  }

  function bindStableMenu() {
    document.querySelectorAll('.header').forEach(header => {
      const button = header.querySelector('.menu-btn');
      const nav = header.querySelector('.nav');
      if (!button || !nav || button.dataset.benarianStableMenu === 'true') return;
      button.dataset.benarianStableMenu = 'true';
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const open = nav.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
      });
    });
  }

  function applyDistinctPageHeroes() {
    const page = currentPageSlug();
    const setHero = (selector, image, overlay, position = 'center center') => {
      const hero = document.querySelector(selector);
      if (!hero) return;
      hero.style.setProperty('background-image', `${overlay},url("${image}")`, 'important');
      hero.style.setProperty('background-position', position, 'important');
      hero.style.setProperty('background-size', 'cover', 'important');
      hero.style.setProperty('background-repeat', 'no-repeat', 'important');
    };

    if (page === 'affiliate-disclosure') {
      setHero('.page-hero', 'assets/affiliate-hero-new.jpg?v=20260726b', 'linear-gradient(90deg,rgba(18,14,10,.76),rgba(18,14,10,.18))', innerWidth <= 760 ? '62% center' : 'center center');
    } else if (page === 'visa-guide') {
      setHero('.visa-hero', 'assets/visa-hero-new.jpg?v=20260726b', 'linear-gradient(90deg,rgba(10,12,18,.80),rgba(10,12,18,.34),rgba(10,12,18,.06))', innerWidth <= 760 ? '68% center' : 'center center');
    } else if (page === 'destinations') {
      setHero('.page-hero', 'assets/destinations-hero-new.jpg?v=20260726b', 'linear-gradient(90deg,rgba(10,13,12,.72),rgba(10,13,12,.18))', innerWidth <= 760 ? '62% center' : 'center center');
    } else if (page === 'hotels') {
      setHero('.hotels-hero', 'assets/hotels-hero-new.jpg?v=20260726b', 'linear-gradient(90deg,rgba(10,8,6,.76),rgba(10,8,6,.20),rgba(10,8,6,.04))', innerWidth <= 760 ? '66% center' : 'center center');
    } else if (page === 'travel-stories') {
      setHero('.stories-hero', 'https://cdn.prod.website-files.com/66fab24d6dde4d79b3b50865/6899e5b55fa1164778ab0854_AD_4nXeaNfd5sFEUy6v6sHSww0D9neoH0wnCcXM20LcPs8d9tpx8rxP-zoOwrtqQ175-m3Cn6sXuvDjPwFuUzyWaS_QKA1fOcO0D0BKrQWUr3C3H2Bg1DxNxN8_R7a47y4Elx1HxAf7L.jpeg', 'linear-gradient(90deg,rgba(7,8,10,.90) 0%,rgba(7,8,10,.72) 42%,rgba(7,8,10,.22) 75%,rgba(7,8,10,.06) 100%)', innerWidth <= 760 ? '62% center' : 'center center');
      const styleId='benarian-stories-readability';
      let style=document.getElementById(styleId);
      if(!style){style=document.createElement('style');style.id=styleId;document.head.appendChild(style)}
      style.textContent=`
        .stories-hero-copy{max-width:760px!important;padding:28px 30px!important;background:rgba(8,8,8,.28)!important;border-left:3px solid #d5a84f!important;border-radius:0 18px 18px 0!important;backdrop-filter:blur(3px)!important;-webkit-backdrop-filter:blur(3px)!important}
        .stories-hero h1{display:block!important;color:#fff!important;font-size:clamp(58px,7vw,96px)!important;line-height:.9!important;text-shadow:0 4px 24px rgba(0,0,0,.9)!important;margin-bottom:26px!important}
        .stories-hero p{color:#fff!important;font-size:19px!important;font-weight:500!important;line-height:1.8!important;text-shadow:0 2px 12px rgba(0,0,0,.95)!important}
        .stories-hero .hero-fa{font-size:17px!important;color:#fff!important;font-weight:600!important;line-height:2.05!important}
        .stories-hero .stories-kicker{color:#f2c66f!important;font-size:12px!important;text-shadow:0 2px 8px rgba(0,0,0,.9)!important}
        .stories-hero .stories-btn{background:#c49237!important;border-color:#e3ba68!important;color:#fff!important;box-shadow:0 12px 30px rgba(0,0,0,.35)!important}
        @media(max-width:760px){.stories-hero-copy{padding:22px 20px!important;background:rgba(8,8,8,.46)!important;border-radius:14px!important;border-left:2px solid #d5a84f!important}.stories-hero h1{font-size:clamp(46px,13vw,64px)!important}.stories-hero p{font-size:16px!important}.stories-hero .hero-fa{font-size:15px!important}}
      `;
    }
  }

  function forceTravelGuideLightTheme() {
    const page = currentPageSlug();
    if (page !== 'travel-guides') return;
    document.documentElement.style.background = '#ffffff';
    document.body.style.background = '#ffffff';
    document.body.style.color = '#211b15';
    if (!document.getElementById('benarian-travel-guide-light-fix')) {
      const style = document.createElement('style');
      style.id = 'benarian-travel-guide-light-fix';
      style.textContent = `
        html,body,body.inner-page,.shell,main,.guidehub-wrap{background:#fff!important;color:#211b15!important}
        body{font-family:'Vazirmatn','Inter',Arial,sans-serif!important;font-weight:400!important}
        .guide-hero{min-height:0!important;aspect-ratio:16/9!important;padding:0!important;background-image:url('assets/travel-guides-hero-clean.jpg?v=20260726d')!important;background-position:center center!important;background-size:cover!important;background-repeat:no-repeat!important}
        .guide-hero:before{display:none!important;content:none!important;background:none!important}
        .guide-hero-copy{display:none!important}
        .guidehub-hero{background:linear-gradient(90deg,rgba(255,255,255,.97),rgba(255,255,255,.74)),url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=92&w=2200') center/cover!important}
        .guidehub-hero h1,.guidehub-hero h2,.guidehub-hero p,.guidehub-hero span{color:#211b15!important;text-shadow:none!important}
        .guidehub-hero h1,.guidehub-intro h2,.destination-section h2{font-family:'Vazirmatn','Inter',sans-serif!important;font-weight:700!important;letter-spacing:-.02em!important}
        .guidehub-intro p,.destination-section>p,.info-card p{color:#51483f!important;opacity:1!important}
        .destination-section{background:#fff!important;border-color:#e4d6bc!important;box-shadow:0 12px 34px rgba(45,35,20,.07)!important}
        .info-card{background:#fbf7ef!important;border-color:#eadfc9!important;color:#211b15!important}
        .info-card strong{color:#211b15!important;font-weight:700!important}
        .iran-note{background:#fff9ee!important;color:#42372c!important;border-color:#dec28a!important}
        .eyebrow,.english-name{color:#94651c!important}
        .destination-button h3,.destination-button span,.destination-button small{color:#fff!important;text-shadow:0 2px 10px rgba(0,0,0,.8)!important}
        .open-full,.backtop{color:#744d10!important;background:#fff!important;border-color:#b9872c!important}
        .footer,.lux-footer{direction:ltr!important;background:#fff!important;color:#211b15!important;border-top:1px solid #e4d6bc!important}
        .footer a,.lux-footer a{color:#51483f!important}
        .footer strong,.lux-footer strong{color:#211b15!important}
        @media(max-width:700px){
          .guide-hero{aspect-ratio:16/9!important;min-height:0!important;background-position:center center!important}
          .guidehub-wrap{padding-left:18px!important;padding-right:18px!important}
          .guidehub-hero h1{font-size:39px!important;line-height:1.35!important}
          .guidehub-hero p{font-size:16px!important;line-height:1.95!important}
          .guidehub-intro h2,.destination-section h2{font-size:32px!important;line-height:1.45!important}
          .info-card p{font-size:14px!important;line-height:1.9!important}
        }
      `;
      document.head.appendChild(style);
    }
    loadScriptOnce('assets/canonical-footer.js?v=20260726navfinal', 'data-benarian-canonical-footer');
  }

  function removeLegacyExpediaSections() {
    document.querySelectorAll('.benarian-expedia-widget-section,.benarian-featured-stays').forEach(section => section.remove());
  }

  function applyGlobalRules() {
    installSeoMetadata();
    applyDistinctPageHeroes();
    ensureGlobalLogo();
    correctFlightLinks();
    bindStableMenu();
    forceTravelGuideLightTheme();
  }

  function start() {
    applyGlobalRules();
    removeLegacyExpediaSections();
    loadScriptOnce('assets/hotels-curated.js?v=20260803a', 'data-benarian-curated-hotels');
    loadScriptOnce('assets/live-concierge.js?v=20260725e', 'data-benarian-live-concierge');
    loadScriptOnce('assets/install-app-prompt.js?v=20260725e', 'data-benarian-install-prompt');
    loadScriptOnce('assets/premium-v2.js?v=20260727flight', 'data-benarian-premium-v2-script');
    loadScriptOnce('assets/custom-flight-luxury.js?v=20260727a', 'data-benarian-custom-flight');
    loadScriptOnce('assets/bali-culture-guide.js?v=20260725a', 'data-benarian-bali-culture');
  }

  window.addEventListener('resize', applyDistinctPageHeroes, {passive:true});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();