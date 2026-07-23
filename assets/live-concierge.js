(() => {
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = '/manifest.webmanifest?v=20260723';
    document.head.appendChild(manifest);
  }

  const theme = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
  theme.name = 'theme-color';
  theme.content = '#17140f';
  if (!theme.parentNode) document.head.appendChild(theme);

  const capable = document.querySelector('meta[name="apple-mobile-web-app-capable"]') || document.createElement('meta');
  capable.name = 'apple-mobile-web-app-capable';
  capable.content = 'yes';
  if (!capable.parentNode) document.head.appendChild(capable);

  const statusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]') || document.createElement('meta');
  statusBar.name = 'apple-mobile-web-app-status-bar-style';
  statusBar.content = 'black-translucent';
  if (!statusBar.parentNode) document.head.appendChild(statusBar);

  const appTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]') || document.createElement('meta');
  appTitle.name = 'apple-mobile-web-app-title';
  appTitle.content = 'BENARIAN';
  if (!appTitle.parentNode) document.head.appendChild(appTitle);

  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const icon = document.createElement('link');
    icon.rel = 'apple-touch-icon';
    icon.href = '/assets/app-icon.svg?v=20260723';
    document.head.appendChild(icon);
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js?v=20260723').catch(() => {}), { once: true });
  }

  if (document.querySelector('#benarian-live-concierge')) return;

  const whatsappNumber = '61420788006';
  const whatsappMessage = encodeURIComponent('Hello BENARIAN, I need assistance with my travel booking.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const style = document.createElement('style');
  style.textContent = `
    .benarian-chat-launcher{position:fixed;right:22px;bottom:22px;z-index:9998;border:0;border-radius:999px;background:#17140f;color:#fff;box-shadow:0 12px 36px rgba(0,0,0,.24);padding:14px 18px;display:flex;align-items:center;gap:10px;font:600 13px Inter,Arial,sans-serif;cursor:pointer}.benarian-chat-launcher .dot{width:9px;height:9px;border-radius:50%;background:#25d366;box-shadow:0 0 0 4px rgba(37,211,102,.18)}
    .benarian-chat-panel{position:fixed;right:22px;bottom:82px;z-index:9999;width:min(370px,calc(100vw - 28px));background:#fff;border:1px solid #e7dcc8;border-radius:20px;box-shadow:0 22px 60px rgba(0,0,0,.25);overflow:hidden;font-family:Inter,Arial,sans-serif;transform:translateY(12px);opacity:0;visibility:hidden;transition:.22s ease}.benarian-chat-panel.open{transform:none;opacity:1;visibility:visible}
    .benarian-chat-head{background:#17140f;color:#fff;padding:18px 20px;display:flex;justify-content:space-between;align-items:center}.benarian-chat-head strong{display:block;font-family:Georgia,serif;font-size:20px;letter-spacing:.5px}.benarian-chat-head span{display:block;margin-top:4px;color:#d9cdbb;font-size:11px}.benarian-chat-close{border:0;background:transparent;color:#fff;font-size:24px;cursor:pointer}
    .benarian-chat-body{padding:18px}.benarian-chat-message{background:#f6f1e8;border-radius:14px 14px 14px 4px;padding:13px 14px;color:#40382e;font-size:13px;line-height:1.6}.benarian-chat-actions{display:grid;gap:9px;margin-top:14px}.benarian-chat-actions a{display:block;text-align:center;text-decoration:none;border-radius:10px;padding:12px 14px;font:600 12px Inter,Arial,sans-serif;cursor:pointer}.benarian-chat-primary{border:0;background:#25d366;color:#fff}.benarian-chat-secondary{border:1px solid #d9c49b;background:#fff;color:#4b3920}.benarian-chat-note{margin:12px 2px 0;color:#7c7267;font-size:10px;line-height:1.5;text-align:center}
    @media(max-width:600px){.benarian-chat-launcher{right:14px;bottom:14px}.benarian-chat-panel{right:14px;bottom:74px}}
  `;
  document.head.appendChild(style);

  const wrapper = document.createElement('div');
  wrapper.id = 'benarian-live-concierge';
  wrapper.innerHTML = `
    <button class="benarian-chat-launcher" type="button" aria-expanded="false" aria-controls="benarian-chat-panel"><span class="dot" aria-hidden="true"></span>WhatsApp Concierge</button>
    <section class="benarian-chat-panel" id="benarian-chat-panel" aria-label="BENARIAN WhatsApp Concierge" aria-hidden="true">
      <div class="benarian-chat-head"><div><strong>BENARIAN Concierge</strong><span>Luxury travel assistance via WhatsApp</span></div><button class="benarian-chat-close" type="button" aria-label="Close WhatsApp chat">×</button></div>
      <div class="benarian-chat-body">
        <div class="benarian-chat-message">Welcome to BENARIAN. Tap below to start a WhatsApp conversation about hotels, destinations or luxury travel.</div>
        <div class="benarian-chat-actions">
          <a class="benarian-chat-primary" href="${whatsappUrl}" target="_blank" rel="noopener">Open WhatsApp Chat</a>
          <a class="benarian-chat-secondary" href="mailto:concierge@benarian.com?subject=BENARIAN%20Concierge%20Enquiry">Email Concierge</a>
        </div>
        <p class="benarian-chat-note">Your message will open in WhatsApp with a ready-made greeting.</p>
      </div>
    </section>`;
  document.body.appendChild(wrapper);

  const launcher = wrapper.querySelector('.benarian-chat-launcher');
  const panel = wrapper.querySelector('.benarian-chat-panel');
  const close = wrapper.querySelector('.benarian-chat-close');
  const setOpen = open => {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));
    if (open) close.focus();
  };
  launcher.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  close.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
})();
