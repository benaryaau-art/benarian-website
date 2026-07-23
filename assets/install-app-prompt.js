(() => {
  if (document.querySelector('#benarian-install-app')) return;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) return;

  const dismissedAt = Number(localStorage.getItem('benarianInstallDismissedAt') || 0);
  if (Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) return;

  let deferredPrompt = null;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  const style = document.createElement('style');
  style.textContent = `
    .benarian-install-card{position:fixed;left:18px;right:18px;bottom:18px;z-index:9997;max-width:760px;margin:auto;background:#fff;border:1px solid #dfc48d;border-radius:18px;box-shadow:0 18px 55px rgba(0,0,0,.22);padding:15px 16px;display:flex;align-items:center;gap:14px;font-family:Inter,Arial,sans-serif}.benarian-install-icon{width:52px;height:52px;border-radius:14px;background:#17140f;color:#c99a43;display:grid;place-items:center;font:600 25px Georgia,serif;flex:0 0 auto}.benarian-install-copy{min-width:0;flex:1}.benarian-install-copy strong{display:block;color:#17140f;font-size:14px;margin-bottom:4px}.benarian-install-copy span{display:block;color:#6c6257;font-size:11px;line-height:1.45}.benarian-install-actions{display:flex;align-items:center;gap:8px}.benarian-install-button{border:0;background:#b9872c;color:#fff;border-radius:10px;padding:11px 15px;font:700 11px Inter,Arial,sans-serif;cursor:pointer;white-space:nowrap}.benarian-install-close{border:0;background:transparent;color:#756a5e;font-size:22px;cursor:pointer;padding:5px}.benarian-ios-guide{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.55);display:grid;place-items:end center;padding:18px}.benarian-ios-guide>div{width:min(520px,100%);background:#fff;border-radius:22px;padding:22px;font-family:Inter,Arial,sans-serif}.benarian-ios-guide h3{font-family:Georgia,serif;font-size:25px;margin:0 0 12px}.benarian-ios-guide p{color:#5e554a;font-size:13px;line-height:1.7}.benarian-ios-guide button{width:100%;border:0;border-radius:10px;padding:12px;background:#17140f;color:#fff;font-weight:700;cursor:pointer}@media(max-width:620px){.benarian-install-card{left:10px;right:10px;bottom:78px;align-items:flex-start}.benarian-install-icon{width:46px;height:46px}.benarian-install-actions{align-self:center}.benarian-install-button{padding:10px 12px}.benarian-install-copy span{font-size:10px}}
  `;
  document.head.appendChild(style);

  const card = document.createElement('aside');
  card.id = 'benarian-install-app';
  card.className = 'benarian-install-card';
  card.setAttribute('aria-label', 'Install BENARIAN app');
  card.innerHTML = `<div class="benarian-install-icon" aria-hidden="true">BB</div><div class="benarian-install-copy"><strong>Install the BENARIAN App</strong><span>Save BENARIAN to your phone for faster access to hotels, flights, visa guides and concierge support.</span></div><div class="benarian-install-actions"><button class="benarian-install-button" type="button">Install App</button><button class="benarian-install-close" type="button" aria-label="Dismiss">×</button></div>`;
  document.body.appendChild(card);

  const installButton = card.querySelector('.benarian-install-button');
  const dismiss = () => { localStorage.setItem('benarianInstallDismissedAt', String(Date.now())); card.remove(); };
  card.querySelector('.benarian-install-close').addEventListener('click', dismiss);

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
  });

  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') card.remove();
      deferredPrompt = null;
      return;
    }
    if (isIOS) {
      const guide = document.createElement('div');
      guide.className = 'benarian-ios-guide';
      guide.innerHTML = `<div><h3>Install BENARIAN on iPhone</h3><p>1. Open this page in Safari.<br>2. Tap the Share button at the bottom of Safari.<br>3. Choose <strong>Add to Home Screen</strong>.<br>4. Tap <strong>Add</strong>.</p><button type="button">Got it</button></div>`;
      document.body.appendChild(guide);
      guide.querySelector('button').addEventListener('click', () => guide.remove());
      guide.addEventListener('click', event => { if (event.target === guide) guide.remove(); });
      return;
    }
    alert('Open your browser menu and choose “Install app” or “Add to Home screen”.');
  });

  window.addEventListener('appinstalled', () => card.remove());
})();
