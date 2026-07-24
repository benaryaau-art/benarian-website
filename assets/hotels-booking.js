(() => {
  if (!document.querySelector('.hotels-hero')) return;
  if (document.querySelector('script[data-hotels-booking-runtime]')) return;
  const script = document.createElement('script');
  script.src = 'assets/live-concierge.js?v=20260725c';
  script.defer = true;
  script.dataset.hotelsBookingRuntime = 'true';
  document.body.appendChild(script);
})();