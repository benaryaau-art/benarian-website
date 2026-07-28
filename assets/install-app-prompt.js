(() => {
  const isHome = /(^|\/)index\.html$/.test(location.pathname) || location.pathname === '/' || location.pathname === '';
  if (!isHome) return;

  function removeBookingAfterFooter() {
    const footer = document.querySelector('.benarian-footer-v3, footer');
    if (!footer) return;

    // The footer must be the final item inside the page shell.
    let sibling = footer.nextElementSibling;
    while (sibling) {
      const next = sibling.nextElementSibling;
      const text = (sibling.textContent || '').replace(/\s+/g, ' ').trim();
      if (
        sibling.matches('iframe, form, section, div') &&
        (/Search for your next stay/i.test(text) || /Powered by\s*Booking\.com/i.test(text) || sibling.querySelector?.('iframe[src*="booking.com"], form[action*="booking.com"]'))
      ) sibling.remove();
      sibling = next;
    }

    // Booking.com can also append an orphan widget directly to <body>.
    [...document.body.children].forEach(node => {
      if (node === footer || node.contains(footer) || footer.contains(node)) return;
      if (node.classList?.contains('benarian-quick-access')) return;
      const followsFooter = Boolean(footer.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (!followsFooter) return;
      const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
      if (/Search for your next stay/i.test(text) || /Powered by\s*Booking\.com/i.test(text) || node.querySelector?.('iframe[src*="booking.com"]')) node.remove();
    });
  }

  const run = () => requestAnimationFrame(removeBookingAfterFooter);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
  [300, 800, 1600, 3000, 6000].forEach(ms => setTimeout(run, ms));
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
})();