(() => {
  const clean = () => {
    const footer = document.querySelector('.benarian-footer-v3');
    if (!footer) return;
    let node = footer.nextElementSibling;
    while (node) {
      const next = node.nextElementSibling;
      const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
      const bookingFrame = node.matches?.('iframe[src*="booking.com"]') || node.querySelector?.('iframe[src*="booking.com"]');
      if (bookingFrame || /Search for your next stay/i.test(text)) node.remove();
      node = next;
    }
  };
  clean();
  new MutationObserver(clean).observe(document.body, { childList: true });
  [300, 800, 1500, 3000].forEach(delay => setTimeout(clean, delay));
})();