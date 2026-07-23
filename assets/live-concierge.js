(() => {
  if (document.querySelector('#benarian-live-concierge')) return;

  const style = document.createElement('style');
  style.textContent = `
    .benarian-chat-launcher{position:fixed;right:22px;bottom:22px;z-index:9998;border:0;border-radius:999px;background:#17140f;color:#fff;box-shadow:0 12px 36px rgba(0,0,0,.24);padding:14px 18px;display:flex;align-items:center;gap:10px;font:600 13px Inter,Arial,sans-serif;cursor:pointer}.benarian-chat-launcher .dot{width:9px;height:9px;border-radius:50%;background:#d4a64e;box-shadow:0 0 0 4px rgba(212,166,78,.18)}
    .benarian-chat-panel{position:fixed;right:22px;bottom:82px;z-index:9999;width:min(370px,calc(100vw - 28px));background:#fff;border:1px solid #e7dcc8;border-radius:20px;box-shadow:0 22px 60px rgba(0,0,0,.25);overflow:hidden;font-family:Inter,Arial,sans-serif;transform:translateY(12px);opacity:0;visibility:hidden;transition:.22s ease}.benarian-chat-panel.open{transform:none;opacity:1;visibility:visible}
    .benarian-chat-head{background:#17140f;color:#fff;padding:18px 20px;display:flex;justify-content:space-between;align-items:center}.benarian-chat-head strong{display:block;font-family:Georgia,serif;font-size:20px;letter-spacing:.5px}.benarian-chat-head span{display:block;margin-top:4px;color:#d9cdbb;font-size:11px}.benarian-chat-close{border:0;background:transparent;color:#fff;font-size:24px;cursor:pointer}
    .benarian-chat-body{padding:18px}.benarian-chat-message{background:#f6f1e8;border-radius:14px 14px 14px 4px;padding:13px 14px;color:#40382e;font-size:13px;line-height:1.6}.benarian-chat-actions{display:grid;gap:9px;margin-top:14px}.benarian-chat-actions a,.benarian-chat-actions button{display:block;text-align:center;text-decoration:none;border-radius:10px;padding:12px 14px;font:600 12px Inter,Arial,sans-serif;cursor:pointer}.benarian-chat-primary{border:0;background:#b9872c;color:#fff}.benarian-chat-secondary{border:1px solid #d9c49b;background:#fff;color:#4b3920}.benarian-chat-note{margin:12px 2px 0;color:#7c7267;font-size:10px;line-height:1.5;text-align:center}
    @media(max-width:600px){.benarian-chat-launcher{right:14px;bottom:14px}.benarian-chat-panel{right:14px;bottom:74px}}
  `;
  document.head.appendChild(style);

  const wrapper = document.createElement('div');
  wrapper.id = 'benarian-live-concierge';
  wrapper.innerHTML = `
    <button class="benarian-chat-launcher" type="button" aria-expanded="false" aria-controls="benarian-chat-panel"><span class="dot" aria-hidden="true"></span>Live Concierge</button>
    <section class="benarian-chat-panel" id="benarian-chat-panel" aria-label="BENARIAN Live Concierge" aria-hidden="true">
      <div class="benarian-chat-head"><div><strong>BENARIAN Concierge</strong><span>Luxury travel assistance</span></div><button class="benarian-chat-close" type="button" aria-label="Close live chat">×</button></div>
      <div class="benarian-chat-body">
        <div class="benarian-chat-message">Welcome to BENARIAN. How may we assist with your hotel, destination or luxury travel enquiry?</div>
        <div class="benarian-chat-actions">
          <a class="benarian-chat-primary" href="contact.html?source=live-chat">Start an enquiry</a>
          <a class="benarian-chat-secondary" href="mailto:concierge@benarian.com?subject=BENARIAN%20Concierge%20Enquiry">Email Concierge</a>
        </div>
        <p class="benarian-chat-note">Messages are answered as soon as a concierge is available. This widget does not claim an agent is online unless live staffing is connected.</p>
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