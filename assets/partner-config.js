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
    script.src = src; script.defer = true; script.setAttribute(marker, 'true');
    document.body.appendChild(script);
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

  function replaceRestaurantsWithTerms() {
    document.querySelectorAll('.header .nav, .benarian-mobile-nav').forEach(nav => {
      nav.querySelectorAll('a').forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        const label = (link.textContent || '').trim().toUpperCase();
        if (href.endsWith('restaurants.html') || label === 'RESTAURANTS' || label === 'RESTAURANT') {
          link.href = 'terms-and-conditions.html';
          link.textContent = 'TERMS & CONDITIONS';
          link.setAttribute('aria-label', 'Terms and Conditions');
        }
      });
      if (!nav.querySelector('a[href="terms-and-conditions.html"]') && !nav.classList.contains('benarian-mobile-nav')) {
        const terms = document.createElement('a');
        terms.href = 'terms-and-conditions.html'; terms.textContent = 'TERMS & CONDITIONS';
        const contact = nav.querySelector('a[href="contact.html"]');
        contact ? nav.insertBefore(terms, contact) : nav.appendChild(terms);
      }
      [...nav.querySelectorAll('a[href="terms-and-conditions.html"]')].slice(1).forEach(link => link.remove());
    });
  }

  function ensureTravelGuideLink() {
    document.querySelectorAll('.header .nav, .benarian-mobile-nav').forEach(nav => {
      let guide = nav.querySelector('a[href="travel-guides.html"],a[href="bali-travel-guide.html"]');
      if (!guide) {
        guide = document.createElement('a');
        const visa = nav.querySelector('a[href="visa-guide.html"]');
        const about = nav.querySelector('a[href="about.html"]');
        if (visa && visa.nextSibling) nav.insertBefore(guide, visa.nextSibling);
        else if (about) nav.insertBefore(guide, about);
        else nav.appendChild(guide);
      }
      guide.href = 'travel-guides.html';
      guide.textContent = 'TRAVEL GUIDE';
      guide.setAttribute('aria-label', 'Destination Travel Guides');
      [...nav.querySelectorAll('a[href="travel-guides.html"]')].slice(1).forEach(link => link.remove());
    });
  }

  function applyDistinctPageHeroes() {
    const page = (location.pathname.split('/').pop() || '').toLowerCase();
    const setHero = (selector, image, overlay, position = 'center center') => {
      const hero = document.querySelector(selector);
      if (!hero) return;
      hero.style.setProperty('background-image', `${overlay},url("${image}")`, 'important');
      hero.style.setProperty('background-position', position, 'important');
      hero.style.setProperty('background-size', 'cover', 'important');
      hero.style.setProperty('background-repeat', 'no-repeat', 'important');
    };

    if (page === 'affiliate-disclosure.html') {
      setHero('.page-hero', 'assets/affiliate-hero-new.jpg?v=20260726', 'linear-gradient(90deg,rgba(18,14,10,.76),rgba(18,14,10,.18))', innerWidth <= 760 ? '62% center' : 'center center');
    } else if (page === 'visa-guide.html') {
      setHero('.visa-hero', 'assets/visa-hero-new.jpg?v=20260726', 'linear-gradient(90deg,rgba(10,12,18,.80),rgba(10,12,18,.34),rgba(10,12,18,.06))', innerWidth <= 760 ? '68% center' : 'center center');
    } else if (page === 'destinations.html') {
      setHero('.page-hero', 'assets/destinations-hero-new.jpg?v=20260726', 'linear-gradient(90deg,rgba(10,13,12,.72),rgba(10,13,12,.18))', innerWidth <= 760 ? '62% center' : 'center center');
    } else if (page === 'hotels.html') {
      setHero('.hotels-hero', 'assets/hotels-hero-new.jpg?v=20260726', 'linear-gradient(90deg,rgba(10,8,6,.76),rgba(10,8,6,.20),rgba(10,8,6,.04))', innerWidth <= 760 ? '66% center' : 'center center');
    }
  }

  function forceTravelGuideLightTheme() {
    const page = (location.pathname.split('/').pop() || '').toLowerCase();
    if (page !== 'travel-guides.html') return;
    document.documentElement.style.background = '#ffffff';
    document.body.style.background = '#ffffff';
    document.body.style.color = '#211b15';
    if (!document.getElementById('benarian-travel-guide-light-fix')) {
      const style = document.createElement('style');
      style.id = 'benarian-travel-guide-light-fix';
      style.textContent = `
        html,body,body.inner-page,.shell,main,.guidehub-wrap{background:#fff!important;color:#211b15!important}
        body{font-family:'Vazirmatn','Inter',Arial,sans-serif!important;font-weight:400!important}
        .guide-hero{min-height:0!important;aspect-ratio:16/9!important;padding:0!important;background-image:url('assets/%20%20%20%20travel-guide-hero.jpg')!important;background-position:center center!important;background-size:cover!important;background-repeat:no-repeat!important}
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
    loadScriptOnce('assets/canonical-footer.js?v=20260725guidefinal', 'data-benarian-canonical-footer');
  }

  function removeLegacyExpediaSections() {
    document.querySelectorAll('.benarian-expedia-widget-section,.benarian-featured-stays').forEach(section => section.remove());
  }

  function applyGlobalRules() {
    applyDistinctPageHeroes(); ensureGlobalLogo(); correctFlightLinks(); replaceRestaurantsWithTerms(); ensureTravelGuideLink(); forceTravelGuideLightTheme();
  }

  function start() {
    applyGlobalRules(); removeLegacyExpediaSections();
    loadScriptOnce('assets/live-concierge.js?v=20260725e', 'data-benarian-live-concierge');
    loadScriptOnce('assets/install-app-prompt.js?v=20260725e', 'data-benarian-install-prompt');
    loadScriptOnce('assets/premium-v2.js?v=20260725e', 'data-benarian-premium-v2-script');
    loadScriptOnce('assets/bali-culture-guide.js?v=20260725a', 'data-benarian-bali-culture');
    [300,700,1200,2000].forEach(delay => setTimeout(applyGlobalRules, delay));
  }

  window.addEventListener('resize', applyDistinctPageHeroes, {passive:true});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();