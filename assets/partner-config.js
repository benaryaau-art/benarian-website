// BENARIAN partner-link configuration — Booking.com is the primary booking partner.
window.BENARIAN_PARTNERS = {
  booking: {
    enabled: true,
    baseUrl: 'https://www.booking.com/searchresults.html',
    affiliateBaseUrl: 'https://www.kqzyfj.com/click-101828630-17289006'
  },
  flights: {
    enabled: true,
    affiliateBaseUrl: 'https://www.anrdoezrs.net/click-101828630-17289007'
  },
  taxi: {
    enabled: true,
    affiliateBaseUrl: 'https://www.anrdoezrs.net/click-101828630-17322570'
  },
  attractions: {
    enabled: true,
    affiliateBaseUrl: 'https://www.kqzyfj.com/click-101828630-17289009'
  },
  cars: {
    enabled: true,
    affiliateBaseUrl: 'https://www.anrdoezrs.net/click-101828630-17289008'
  }
};

(function initialiseBenarianPartners(){
  function loadScriptOnce(src, marker) {
    if (document.querySelector(`script[${marker}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.setAttribute(marker, 'true');
    document.body.appendChild(script);
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

      if (!nav.querySelector('a[href="terms-and-conditions.html"]')) {
        const terms = document.createElement('a');
        terms.href = 'terms-and-conditions.html';
        terms.textContent = 'TERMS & CONDITIONS';
        terms.setAttribute('aria-label', 'Terms and Conditions');
        const contact = nav.querySelector('a[href="contact.html"]');
        contact ? nav.insertBefore(terms, contact) : nav.appendChild(terms);
      }

      const termsLinks = [...nav.querySelectorAll('a[href="terms-and-conditions.html"]')];
      termsLinks.slice(1).forEach(link => link.remove());
    });
  }

  function removeLegacyExpediaSections() {
    document.querySelectorAll('.benarian-expedia-widget-section,.benarian-featured-stays').forEach(section => section.remove());
  }

  function applyNavigationRules() {
    correctFlightLinks();
    replaceRestaurantsWithTerms();
  }

  function start() {
    applyNavigationRules();
    removeLegacyExpediaSections();
    loadScriptOnce('assets/live-concierge.js?v=20260725d', 'data-benarian-live-concierge');
    loadScriptOnce('assets/install-app-prompt.js?v=20260725d', 'data-benarian-install-prompt');
    loadScriptOnce('assets/premium-v2.js?v=20260725d', 'data-benarian-premium-v2-script');
    [300,700,1200,2000].forEach(delay => setTimeout(applyNavigationRules, delay));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();