// BENARIAN partner-link configuration
window.BENARIAN_PARTNERS = {
  booking: {
    enabled: true,
    baseUrl: "https://www.booking.com/searchresults.html",
    affiliateBaseUrl: "https://www.kqzyfj.com/click-101828630-17289006"
  },
  taxi: {
    enabled: true,
    affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17322570"
  },
  attractions: {
    enabled: true,
    affiliateBaseUrl: "https://www.kqzyfj.com/click-101828630-17289009"
  },
  flights: {
    enabled: true,
    affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17289007"
  },
  cars: {
    enabled: true,
    affiliateBaseUrl: "https://www.anrdoezrs.net/click-101828630-17289008"
  },
  getawayDeals: {
    enabled: true,
    affiliateBaseUrl: "https://www.tqlhce.com/click-101828630-17301957"
  },
  agoda: { enabled: false, affiliateBaseUrl: "" },
  trip: { enabled: false, affiliateBaseUrl: "" },
  expedia: { enabled: false, affiliateBaseUrl: "" },
  hotels: { enabled: false, affiliateBaseUrl: "" },
  getYourGuide: { enabled: false, affiliateBaseUrl: "" }
};

document.addEventListener('DOMContentLoaded', () => {
  const logoMarkup = `
    <svg class="benarian-global-logo" viewBox="0 0 760 120" role="img" aria-label="BENARIAN Luxury Travel and Hospitality" xmlns="http://www.w3.org/2000/svg">
      <g fill="#b9872c">
        <text x="0" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text>
        <text x="38" y="88" font-family="Georgia, 'Times New Roman', serif" font-size="90">B</text>
      </g>
      <text x="130" y="69" font-family="Georgia, 'Times New Roman', serif" font-size="51" letter-spacing="6" fill="#17140f">BENARIAN</text>
      <text x="132" y="99" font-family="Arial, Helvetica, sans-serif" font-size="14" letter-spacing="2.1" fill="#b9872c">LUXURY TRAVEL &amp; HOSPITALITY</text>
    </svg>`;

  document.querySelectorAll('.header .brand').forEach(brand => {
    brand.classList.remove('brand-lockup');
    brand.innerHTML = logoMarkup;
    brand.setAttribute('aria-label', 'BENARIAN home');
  });

  const style = document.createElement('style');
  style.id = 'benarian-global-logo-style';
  style.textContent = `
    .header .brand,
    .header .brand:not(.brand-lockup){
      display:flex!important;
      align-items:center!important;
      width:330px!important;
      height:70px!important;
      max-width:100%!important;
      overflow:visible!important;
      background:none!important;
      filter:none!important;
    }
    .header .brand:before,
    .header .brand:after{content:none!important;display:none!important}
    .header .brand img{display:none!important}
    .benarian-global-logo{display:block!important;width:100%!important;height:100%!important;overflow:visible!important}
    @media(max-width:760px){
      .header .brand,
      .header .brand:not(.brand-lockup){
        width:250px!important;
        height:62px!important;
        max-width:calc(100vw - 132px)!important;
      }
    }
    @media(max-width:390px){
      .header .brand,
      .header .brand:not(.brand-lockup){
        width:230px!important;
        height:58px!important;
        max-width:calc(100vw - 118px)!important;
      }
    }`;
  document.head.appendChild(style);

  if (!document.querySelector('link[data-benarian-signature-font]')) {
    const scriptFont = document.createElement('link');
    scriptFont.rel = 'stylesheet';
    scriptFont.href = 'https://fonts.googleapis.com/css2?family=Allura&display=swap';
    scriptFont.setAttribute('data-benarian-signature-font', 'true');
    document.head.appendChild(scriptFont);
  }

  const signatureStyle = document.createElement('style');
  signatureStyle.id = 'benarian-signature-style-final';
  signatureStyle.textContent = `
    .about-page .about-signature,
    .about-page .founder-signature{
      font-family:'Allura','Snell Roundhand','Apple Chancery',cursive!important;
      font-style:normal!important;
      font-weight:400!important;
      letter-spacing:.1px!important;
      line-height:1!important;
      color:#b9872c!important;
      text-rendering:geometricPrecision!important;
      -webkit-font-smoothing:antialiased!important;
    }
    .about-page .about-signature{
      font-size:72px!important;
      margin-top:30px!important;
    }
    .about-page .founder-signature{
      font-size:66px!important;
      margin-top:18px!important;
    }
    @media(max-width:760px){
      .about-page .about-signature{font-size:54px!important}
      .about-page .founder-signature{font-size:50px!important}
    }`;
  document.head.appendChild(signatureStyle);

  // Keep the legal terms accessible from every site footer.
  document.querySelectorAll('.footer').forEach(footer => {
    if (footer.querySelector('a[href="terms-and-conditions.html"]')) return;

    const privacyLink = footer.querySelector('a[href="privacy-policy.html"]');
    if (privacyLink) {
      const termsLink = document.createElement('a');
      termsLink.href = 'terms-and-conditions.html';
      termsLink.textContent = 'Terms & Conditions';
      privacyLink.parentNode.insertBefore(termsLink, privacyLink);
      privacyLink.parentNode.insertBefore(document.createTextNode(' · '), privacyLink);
      return;
    }

    const supportColumn = Array.from(footer.querySelectorAll('div')).find(div =>
      /support/i.test(div.querySelector('strong')?.textContent || '')
    );
    if (supportColumn) {
      const termsLink = document.createElement('a');
      termsLink.href = 'terms-and-conditions.html';
      termsLink.textContent = 'Terms & Conditions';
      supportColumn.appendChild(termsLink);
    }
  });
});