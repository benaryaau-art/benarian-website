// BENARIAN Booking.com affiliate flow
// Keeps BENARIAN as the curated discovery layer and sends live availability/booking to Booking.com via CJ.
(function () {
  'use strict';

  const partners = window.BENARIAN_PARTNERS || {};
  const booking = partners.booking || {};
  const affiliateBase = booking.affiliateBaseUrl || 'https://www.kqzyfj.com/click-101828630-17289006';

  function bookingSearchUrl(query) {
    const target = new URL('https://www.booking.com/searchresults.html');
    target.searchParams.set('ss', query || 'Luxury hotels');
    target.searchParams.set('lang', 'en-us');
    target.searchParams.set('selected_currency', 'AUD');
    return target.toString();
  }

  function cjDeepLink(targetUrl) {
    // CJ deep-link convention. The click endpoint retains BENARIAN publisher tracking.
    const separator = affiliateBase.includes('?') ? '&' : '?';
    return affiliateBase + separator + 'url=' + encodeURIComponent(targetUrl);
  }

  function hotelQuery(card) {
    const name = card.querySelector('h3')?.textContent?.trim() || '';
    const place = card.querySelector('.hotel-place')?.textContent?.trim() || '';
    return [name, place].filter(Boolean).join(', ');
  }

  function updateHotelsPage() {
    if (!/\/?hotels(?:\.html)?$/i.test(location.pathname)) return;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'Curated luxury hotels in Bali, Phuket, Maldives and Dubai. Check live availability and complete your booking securely through Booking.com.';
    }

    const heroParagraphs = document.querySelectorAll('.hotels-hero p');
    if (heroParagraphs.length) {
      const copy = heroParagraphs[heroParagraphs.length - 1];
      copy.textContent = 'Explore BENARIAN’s curated hotel collection, then check current availability and complete your reservation securely through Booking.com.';
    }

    document.querySelectorAll('.hotel-card').forEach(card => {
      const query = hotelQuery(card);
      const button = card.querySelector('.book-btn');
      const note = card.querySelector('small');
      if (button && query) {
        button.href = cjDeepLink(bookingSearchUrl(query));
        button.target = '_blank';
        button.rel = 'noopener sponsored nofollow';
        button.textContent = 'CHECK ON BOOKING.COM';
        button.setAttribute('aria-label', `Check ${query} on Booking.com`);
      }
      if (note) note.textContent = 'Indicative rate only. Booking.com confirms the live price, room conditions and availability for your dates.';
    });

    document.querySelectorAll('.destination-heading > a').forEach(link => {
      const section = link.closest('.destination-section');
      const destination = section?.querySelector('h2')?.textContent?.replace(/^10 selected hotels in\s+/i, '').trim() || 'Luxury hotels';
      link.href = cjDeepLink(bookingSearchUrl(destination));
      link.target = '_blank';
      link.rel = 'noopener sponsored nofollow';
      link.textContent = `Search all ${destination} hotels on Booking.com →`;
    });

    const priceNote = document.querySelector('.price-note');
    if (priceNote) {
      priceNote.innerHTML = '<strong>Booking notice:</strong> BENARIAN curates and presents hotel recommendations. Displayed “from” prices are indicative and not live quotations. Current rates, taxes, room conditions, availability, payment and the final reservation are provided securely by Booking.com. BENARIAN may earn an affiliate commission from qualifying bookings at no additional cost to you.';
    }

    if (!document.getElementById('booking-partner-badge')) {
      const nav = document.querySelector('.jump-nav');
      if (nav) {
        const badge = document.createElement('div');
        badge.id = 'booking-partner-badge';
        badge.innerHTML = '<span>BOOKING PARTNER</span><strong>Search &amp; reserve with Booking.com</strong><small>Live availability opens securely in a new tab.</small>';
        nav.insertAdjacentElement('afterend', badge);
      }
    }
  }

  function updateGenericPartnerLinks() {
    document.querySelectorAll('a[href*="expedia.com"], a[href*="expedia.com.au"]').forEach(link => {
      const card = link.closest('.hotel-card, .market-card, article');
      const query = card?.querySelector('h3')?.textContent?.trim() || link.textContent.trim() || 'Luxury hotels';
      link.href = cjDeepLink(bookingSearchUrl(query));
      link.target = '_blank';
      link.rel = 'noopener sponsored nofollow';
      link.textContent = link.textContent.replace(/EXPEDIA/gi, 'BOOKING.COM');
    });
  }

  function addStyles() {
    if (document.getElementById('booking-affiliate-model-styles')) return;
    const style = document.createElement('style');
    style.id = 'booking-affiliate-model-styles';
    style.textContent = `
      #booking-partner-badge{display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap;padding:18px 6%;background:#fff8eb;border-bottom:1px solid #e5d1aa;color:#211b15;text-align:center}
      #booking-partner-badge span{font-size:9px;font-weight:800;letter-spacing:1.7px;color:#96651b}
      #booking-partner-badge strong{font-family:'Cormorant Garamond',Georgia,serif;font-size:24px;font-weight:600}
      #booking-partner-badge small{font-size:11px;color:#6d6255}
      .book-btn{transition:transform .2s ease,box-shadow .2s ease}
      .book-btn:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(89,58,15,.18)}
      @media(max-width:600px){#booking-partner-badge{align-items:flex-start;flex-direction:column;text-align:left;padding:18px 20px;gap:5px}#booking-partner-badge strong{font-size:22px}}
    `;
    document.head.appendChild(style);
  }

  function start() {
    addStyles();
    updateHotelsPage();
    updateGenericPartnerLinks();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
