(() => {
  const expediaShop = 'https://www.expedia.com.au/shop/benariantravel';

  const setSponsoredLink = (link, label) => {
    if (!link) return;
    link.href = expediaShop;
    link.target = '_blank';
    link.rel = 'noopener sponsored';
    if (label) link.textContent = label;
  };

  const weekendSection = document.querySelector('.benarian-market-section[aria-labelledby="weekend-deals-title"]');
  if (weekendSection) {
    const properties = [
      {
        name: 'Bulgari Resort Bali',
        type: 'Luxury Cliffside Resort',
        badge: 'ULUWATU',
        location: 'Pecatu, Bali',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=96&w=2000',
        alt: 'Luxury Bali resort preview'
      },
      {
        name: 'AYANA Resort Bali',
        type: 'Oceanfront Luxury Resort',
        badge: 'JIMBARAN',
        location: 'Jimbaran, Bali',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=96&w=2000',
        alt: 'Luxury beachfront resort preview'
      },
      {
        name: 'Adiwana Resort Jembawan',
        type: 'Wellness Boutique Retreat',
        badge: 'UBUD',
        location: 'Ubud, Bali',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=96&w=2000',
        alt: 'Luxury tropical wellness retreat preview'
      }
    ];

    weekendSection.querySelectorAll('.market-card').forEach((card, index) => {
      const property = properties[index];
      if (!property) return;
      const image = card.querySelector('.market-card-media img');
      if (image) {
        image.src = property.image;
        image.alt = property.alt;
        image.loading = index === 0 ? 'eager' : 'lazy';
        image.decoding = 'async';
      }
      const badge = card.querySelector('.market-badge');
      if (badge) badge.textContent = property.badge;
      const type = card.querySelector('.market-type');
      if (type) type.textContent = property.type;
      const title = card.querySelector('h3');
      if (title) title.textContent = property.name;
      const rating = card.querySelector('.market-rating');
      if (rating) rating.innerHTML = '<b>LIVE</b><span>Price & availability on Expedia</span>';
      const small = card.querySelector('.market-card-foot small');
      if (small) small.textContent = property.location;
      const strong = card.querySelector('.market-card-foot strong');
      if (strong) strong.textContent = 'Check live Expedia price';
      setSponsoredLink(card.querySelector('.market-card-media'));
      setSponsoredLink(card.querySelector('.market-card-foot a'), 'View on Expedia →');
    });

    const heading = weekendSection.querySelector('.market-heading p');
    if (heading) heading.textContent = 'Real Bali hotels selected from Expedia. Live prices, room availability, guest ratings and cancellation terms are shown securely on Expedia.';
    setSponsoredLink(weekendSection.querySelector('.market-view-all'), 'Explore BENARIAN on Expedia →');

    if (!weekendSection.querySelector('.benarian-editorial-note')) {
      const note = document.createElement('p');
      note.className = 'benarian-editorial-note';
      note.textContent = 'Property names are real. Preview photography is editorial; official hotel photos, verified ratings and live prices appear on Expedia.';
      note.style.cssText = 'margin:18px auto 0;max-width:850px;color:#7b746a;font:400 11px/1.65 Arial,Helvetica,sans-serif;text-align:center';
      weekendSection.appendChild(note);
    }
  }

  const hotelCards = document.querySelectorAll('.hotel-grid-pro .hotel-pro-card');
  if (hotelCards.length) {
    const hotels = [
      {
        name: 'AYANA Resort Bali', location: 'Jimbaran, Bali', badge: 'JIMBARAN',
        description: 'A renowned cliffside resort complex with ocean views, extensive pools, private beach access, wellness and destination dining.',
        meta: ['Oceanfront', 'Luxury spa', 'Multiple pools']
      },
      {
        name: 'The Apurva Kempinski Bali', location: 'Nusa Dua, Bali', badge: 'NUSA DUA',
        description: 'A dramatic beachfront resort known for monumental architecture, refined suites, culinary experiences and sweeping ocean views.',
        meta: ['Beachfront', 'Fine dining', 'Family luxury']
      },
      {
        name: 'Alila Villas Uluwatu', location: 'Uluwatu, Bali', badge: 'ULUWATU',
        description: 'Contemporary private-pool villas set above the Indian Ocean, combining privacy, design and a calm clifftop atmosphere.',
        meta: ['Private villas', 'Clifftop', 'Design hotel']
      },
      {
        name: 'Bulgari Resort Bali', location: 'Pecatu, Bali', badge: 'PECATU',
        description: 'An ultra-luxury cliffside retreat blending Balinese craftsmanship, Italian design, private villas and exceptional service.',
        meta: ['Ultra luxury', 'Private pool', 'Ocean cliff']
      },
      {
        name: 'Adiwana Resort Jembawan', location: 'Ubud, Bali', badge: 'UBUD',
        description: 'A peaceful boutique wellness resort in central Ubud, surrounded by tropical greenery and close to cultural highlights.',
        meta: ['Boutique', 'Wellness', 'Central Ubud']
      },
      {
        name: 'The Kayon Jungle Resort', location: 'Ubud, Bali', badge: 'UBUD',
        description: 'A romantic jungle retreat with layered infinity pools, valley views and an intimate adults-focused atmosphere.',
        meta: ['Jungle views', 'Infinity pools', 'Romantic escape']
      }
    ];

    hotelCards.forEach((card, index) => {
      const hotel = hotels[index];
      if (!hotel) return;
      const title = card.querySelector('h3');
      if (title) title.textContent = hotel.name;
      const location = card.querySelector('.hotel-location');
      if (location) location.textContent = hotel.location;
      const badge = card.querySelector('.hotel-badge');
      if (badge) badge.textContent = hotel.badge;
      const score = card.querySelector('.hotel-score');
      if (score) score.textContent = 'LIVE';
      const description = card.querySelector('.hotel-description');
      if (description) description.textContent = hotel.description;
      const meta = card.querySelector('.hotel-meta');
      if (meta) meta.innerHTML = hotel.meta.map(item => `<span>${item}</span>`).join('');
      const small = card.querySelector('.hotel-book small');
      if (small) small.textContent = 'Live price, verified guest rating and availability on Expedia';
      setSponsoredLink(card.querySelector('.hotel-book .btn'), 'VIEW LIVE PRICE');
    });

    const allHotels = document.querySelector('.hotel-intro .btn');
    setSponsoredLink(allHotels, 'SEARCH ALL HOTELS ON EXPEDIA');
    const disclosure = document.querySelector('.booking-disclosure');
    if (disclosure) disclosure.innerHTML = 'The listed properties are real hotels available through Expedia. Live prices, availability, verified ratings, room details, taxes and cancellation terms are displayed on Expedia at the time of search. BENARIAN may earn a commission from eligible bookings.';
  }
})();