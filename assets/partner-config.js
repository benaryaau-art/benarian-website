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
    if (document.querySelector(`script[${marker}]`)) return;
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

  function removeLegacyExpediaSections() {
    document.querySelectorAll('.benarian-expedia-widget-section,.benarian-featured-stays').forEach(section => section.remove());
  }

  function applyGlobalRules() {
    ensureGlobalLogo(); correctFlightLinks(); replaceRestaurantsWithTerms();
  }

  function start() {
    applyGlobalRules(); removeLegacyExpediaSections();
    loadScriptOnce('assets/live-concierge.js?v=20260725e', 'data-benarian-live-concierge');
    loadScriptOnce('assets/install-app-prompt.js?v=20260725e', 'data-benarian-install-prompt');
    loadScriptOnce('assets/premium-v2.js?v=20260725e', 'data-benarian-premium-v2-script');
    loadScriptOnce('assets/bali-culture-guide.js?v=20260725a', 'data-benarian-bali-culture');
    [300,700,1200,2000].forEach(delay => setTimeout(applyGlobalRules, delay));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();