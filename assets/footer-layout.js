(() => {
  const arrangeFooter = () => {
    const footer = document.querySelector('footer.footer, .footer');
    if (!footer || footer.querySelector('.benarian-support-social')) return;

    const groups = [...footer.querySelectorAll(':scope > div')];
    const support = groups.find(group => /Support/i.test(group.querySelector('strong')?.textContent || ''));
    const follow = groups.find(group => /Follow Us/i.test(group.querySelector('strong')?.textContent || ''));
    if (!support || !follow) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'benarian-support-social';
    support.insertAdjacentElement('beforebegin', wrapper);
    wrapper.append(support, follow);

    if (!document.querySelector('#benarian-footer-layout-style')) {
      const style = document.createElement('style');
      style.id = 'benarian-footer-layout-style';
      style.textContent = `
        .benarian-support-social{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:28px!important;align-items:start!important;min-width:0!important}
        .benarian-support-social>div{min-width:0!important}
        @media(max-width:650px){.benarian-support-social{grid-column:1/-1!important;width:100%!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:24px!important;margin-top:8px!important}.benarian-support-social strong{white-space:nowrap!important}}
      `;
      document.head.appendChild(style);
    }
  };

  arrangeFooter();
  document.addEventListener('DOMContentLoaded', arrangeFooter, { once: true });
  setTimeout(arrangeFooter, 300);
})();
