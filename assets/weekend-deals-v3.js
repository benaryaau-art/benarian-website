(() => {
  const section = document.querySelector('.benarian-market-section[aria-labelledby="weekend-deals-title"]');
  if (!section) return;

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=96&w=2000',
      alt: 'Luxury cliffside villa with infinity pool in Bali'
    },
    {
      src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=96&w=2000',
      alt: 'Luxury beachfront resort with tropical pool'
    },
    {
      src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=96&w=2000',
      alt: 'Luxury tropical wellness retreat in Ubud'
    }
  ];

  section.querySelectorAll('.market-card-media img').forEach((img, index) => {
    const replacement = images[index];
    if (!replacement) return;
    img.src = replacement.src;
    img.alt = replacement.alt;
    img.loading = index === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
  });
})();
