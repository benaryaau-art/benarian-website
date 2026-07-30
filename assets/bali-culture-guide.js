(()=>{
  const page=(location.pathname.split('/').pop()||'').toLowerCase();

  function mountBaliPreTravel(){
    if(page!==''&&page!=='index.html') return;
    if(document.querySelector('.bali-pretravel')) return;
    const style=document.createElement('style');
    style.id='bali-pretravel-style';
    style.textContent=`
      .bali-pretravel{padding:78px 7%;background:#fbf7ef;color:#17130f;border-top:1px solid #e6d6b9;border-bottom:1px solid #e6d6b9}
      .bali-pretravel-head{max-width:860px;margin:0 auto 34px;text-align:center}
      .bali-pretravel-kicker{display:block;margin-bottom:13px;color:#a9731f;font:800 10px/1.2 Inter,Arial,sans-serif;letter-spacing:2.8px}
      .bali-pretravel h2{margin:0 0 15px;font:600 clamp(38px,5vw,62px)/1 'Cormorant Garamond',Georgia,serif;color:#17130f}
      .bali-pretravel-head p{margin:0 auto;max-width:720px;color:#62584d;font-size:15px;line-height:1.8}
      .bali-pretravel-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;max-width:1180px;margin:auto}
      .bali-pretravel-card{position:relative;display:flex;flex-direction:column;min-height:330px;padding:28px;border:1px solid #ddc79f;border-radius:20px;background:#fff;box-shadow:0 16px 42px rgba(63,45,19,.08)}
      .bali-pretravel-number{display:grid;place-items:center;width:48px;height:48px;border:1px solid #c8953d;border-radius:50%;color:#a46c18;font:700 14px/1 Inter,Arial,sans-serif;margin-bottom:24px}
      .bali-pretravel-card small{display:block;margin-bottom:9px;color:#a9731f;font:800 9px/1.2 Inter,Arial,sans-serif;letter-spacing:1.7px}
      .bali-pretravel-card h3{margin:0 0 12px;font:600 31px/1 'Cormorant Garamond',Georgia,serif;color:#17130f}
      .bali-pretravel-card p{margin:0 0 22px;color:#655b50;font-size:13px;line-height:1.75;flex:1}
      .bali-pretravel-card .fa-note{direction:rtl;text-align:right;color:#51473d;font-family:'Vazirmatn',Inter,sans-serif}
      .bali-pretravel-card a{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-radius:10px;background:#17130f;color:#fff;text-decoration:none;font:700 11px/1.2 Inter,Arial,sans-serif;letter-spacing:.7px}
      .bali-pretravel-card a:hover{background:#a9731f}
      .bali-pretravel-warning{max-width:1180px;margin:24px auto 0;padding:16px 20px;border:1px solid #d8ba7d;border-radius:12px;background:#fff9ed;color:#60491f;text-align:center;font-size:12px;line-height:1.7}
      @media(max-width:900px){.bali-pretravel-grid{grid-template-columns:1fr}.bali-pretravel-card{min-height:0}}
      @media(max-width:620px){.bali-pretravel{padding:58px 18px}.bali-pretravel h2{font-size:40px}.bali-pretravel-head p{font-size:14px}.bali-pretravel-card{padding:23px}.bali-pretravel-card h3{font-size:29px}}
    `;
    document.head.appendChild(style);
    const section=document.createElement('section');
    section.className='bali-pretravel';
    section.setAttribute('aria-labelledby','bali-pretravel-title');
    section.innerHTML=`
      <div class="bali-pretravel-head">
        <span class="bali-pretravel-kicker">BEFORE YOU FLY TO BALI</span>
        <h2 id="bali-pretravel-title">Three essential steps before arrival</h2>
        <p>Use the official Indonesian and Bali Government websites below to complete the key travel requirements directly and securely.</p>
      </div>
      <div class="bali-pretravel-grid">
        <article class="bali-pretravel-card">
          <span class="bali-pretravel-number">01</span>
          <small>BALI GOVERNMENT</small>
          <h3>Tourist Levy</h3>
          <p>Pay Bali’s official foreign tourist levy online before departure and keep the QR-code voucher sent to your email.</p>
          <p class="fa-note" lang="fa">عوارض گردشگری بالی را پیش از پرواز مستقیماً در وب‌سایت رسمی پرداخت کنید.</p>
          <a href="https://lovebali.baliprov.go.id/#currency-AUD" target="_blank" rel="noopener">PAY TOURIST LEVY <span>↗</span></a>
        </article>
        <article class="bali-pretravel-card">
          <span class="bali-pretravel-number">02</span>
          <small>INDONESIA IMMIGRATION</small>
          <h3>Arrival Card</h3>
          <p>Complete the official All Indonesia arrival declaration, which combines immigration, customs, health and quarantine information.</p>
          <p class="fa-note" lang="fa">کارت ورود All Indonesia را از سه روز پیش از رسیدن تا روز ورود تکمیل کنید.</p>
          <a href="https://allindonesia.imigrasi.go.id/" target="_blank" rel="noopener">COMPLETE ARRIVAL CARD <span>↗</span></a>
        </article>
        <article class="bali-pretravel-card">
          <span class="bali-pretravel-number">03</span>
          <small>INDONESIA IMMIGRATION</small>
          <h3>Visa &amp; e-VOA</h3>
          <p>Check your eligibility and apply directly through Indonesia’s official eVisa portal before travelling.</p>
          <p class="fa-note" lang="fa">برای بررسی شرایط و درخواست ویزا یا ویزای هنگام ورود الکترونیکی از سایت رسمی اقدام کنید.</p>
          <a href="https://evisa.imigrasi.go.id/" target="_blank" rel="noopener">APPLY FOR VISA <span>↗</span></a>
        </article>
      </div>
      <div class="bali-pretravel-warning"><strong>Official links only:</strong> BENARIAN does not process these government applications or collect government fees. Requirements depend on passport and travel circumstances.</div>`;
    const anchor=document.querySelector('#official-flight-search')||document.querySelector('#official-booking-search')||document.querySelector('.booking-search')||document.querySelector('.lux-hero');
    if(anchor) anchor.insertAdjacentElement('afterend',section);
  }

  function pointBaliCardsToGuide(){
    document.querySelectorAll('.destination-card').forEach(card=>{
      const title=(card.querySelector('h3')?.textContent||'').trim().toLowerCase();
      if(title==='bali'){
        card.href='bali-travel-guide.html';
        const label=card.querySelector('.gold-link');
        if(label) label.textContent='BALI TRAVEL GUIDE →';
      }
    });
  }

  mountBaliPreTravel();
  if(page!=='bali-travel-guide.html'){pointBaliCardsToGuide();return;}
  if(document.querySelector('.sacred-bali-section')) return;

  const style=document.createElement('style');
  style.id='sacred-bali-style';
  style.textContent=`
    .sacred-bali-section{margin:76px 0 0;padding:0;background:#17130f;color:#fff;overflow:hidden}
    .sacred-bali-head{display:grid;grid-template-columns:1.05fr .95fr;min-height:520px}
    .sacred-bali-copy{display:flex;flex-direction:column;justify-content:center;padding:70px 7%}
    .sacred-bali-kicker{font:700 10px/1.2 Inter,Arial,sans-serif;letter-spacing:2.5px;color:#d9aa50;margin-bottom:16px}
    .sacred-bali-copy h2{font:600 clamp(44px,5vw,72px)/.95 'Cormorant Garamond',Georgia,serif!important;color:#fff!important;margin:0 0 22px}
    .sacred-bali-copy p{max-width:650px;margin:0;color:#ddd3c8;font-size:16px;line-height:1.85}
    .sacred-bali-hero{min-height:520px;background:url('https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&q=92&w=1600') center/cover}
    .sacred-bali-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#4b4033}
    .sacred-bali-tile{position:relative;min-height:390px;overflow:hidden;background:#000}
    .sacred-bali-tile img{width:100%;height:100%;object-fit:cover;display:block;opacity:.78;transition:transform .5s ease,opacity .5s ease}
    .sacred-bali-tile:hover img{transform:scale(1.035);opacity:.9}
    .sacred-bali-overlay{position:absolute;inset:auto 0 0;padding:72px 28px 28px;background:linear-gradient(transparent,rgba(0,0,0,.9));color:#fff}
    .sacred-bali-overlay span{font:700 9px/1.2 Inter,Arial,sans-serif;letter-spacing:1.8px;color:#e2b35b}
    .sacred-bali-overlay h3{font:600 31px/1 'Cormorant Garamond',Georgia,serif!important;color:#fff!important;margin:9px 0 10px}
    .sacred-bali-overlay p{font-size:13px;line-height:1.65;color:#ece7df;margin:0}
    .sacred-bali-rules{padding:64px 6%;background:#fbf7ef;color:#17130f}
    .sacred-bali-rules h3{text-align:center;font:600 48px/1 'Cormorant Garamond',Georgia,serif!important;margin:0 0 36px;color:#17130f!important}
    .sacred-rule-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1180px;margin:auto}
    .sacred-rule{background:#fff;border:1px solid #e1d0b2;padding:26px;min-height:230px}
    .sacred-rule b{display:block;color:#b9872c;font:700 10px/1.2 Inter,Arial,sans-serif;letter-spacing:1.6px;margin-bottom:12px}
    .sacred-rule h4{font:600 27px/1.05 'Cormorant Garamond',Georgia,serif;margin:0 0 12px;color:#17130f}
    .sacred-rule p{font-size:13px;line-height:1.7;color:#5d554d;margin:0}
    .sacred-persian{direction:rtl;text-align:right;margin-top:46px;padding-top:42px;border-top:1px solid #ddcaab}
    .sacred-persian h3{text-align:center}
    .sacred-respect-note{max-width:980px;margin:38px auto 0;padding:26px 30px;border:1px solid #c89a43;background:#fff9ec;text-align:center;font:500 22px/1.5 'Cormorant Garamond',Georgia,serif;color:#5d4216}
    @media(max-width:980px){.sacred-bali-head{grid-template-columns:1fr}.sacred-bali-hero{min-height:430px;order:-1}.sacred-bali-gallery{grid-template-columns:1fr}.sacred-bali-tile{min-height:430px}.sacred-rule-grid{grid-template-columns:1fr 1fr}}
    @media(max-width:620px){.sacred-bali-section{margin-top:54px}.sacred-bali-copy{padding:48px 22px}.sacred-bali-hero{min-height:360px}.sacred-bali-tile{min-height:370px}.sacred-bali-overlay{padding:62px 22px 24px}.sacred-bali-rules{padding:50px 20px}.sacred-rule-grid{grid-template-columns:1fr}.sacred-bali-rules h3{font-size:40px}.sacred-rule{min-height:0}}
  `;
  document.head.appendChild(style);

  const section=document.createElement('section');
  section.className='sacred-bali-section';
  section.innerHTML=`
    <div class="sacred-bali-head">
      <div class="sacred-bali-copy">
        <div class="sacred-bali-kicker">SACRED BALI · LIVING CULTURE</div>
        <h2>Respecting faith, rituals and local life</h2>
        <p>Bali’s temples, offerings and ceremonies are not staged attractions—they are part of everyday spiritual life. A thoughtful guest observes quietly, dresses respectfully and allows worshippers and processions the space they need.</p>
      </div>
      <div class="sacred-bali-hero" role="img" aria-label="Balinese temple surrounded by tropical landscape"></div>
    </div>
    <div class="sacred-bali-gallery">
      <article class="sacred-bali-tile"><img src="https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=90&w=1200" alt="Balinese temple ceremony" loading="lazy"><div class="sacred-bali-overlay"><span>TEMPLES</span><h3>Enter sacred spaces thoughtfully</h3><p>Wear modest clothing, use a sarong and sash when requested, speak softly and follow temple staff or your licensed guide.</p></div></article>
      <article class="sacred-bali-tile"><img src="https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&q=90&w=1200" alt="Traditional Balinese offering" loading="lazy"><div class="sacred-bali-overlay"><span>DAILY OFFERINGS</span><h3>Watch where you step</h3><p>Canang sari offerings may be placed on pavements, doorways and shrines. Walk around them and never move, touch or step over them.</p></div></article>
      <article class="sacred-bali-tile"><img src="https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&q=90&w=1200" alt="Bali community and cultural life" loading="lazy"><div class="sacred-bali-overlay"><span>CEREMONIES</span><h3>Let worship come first</h3><p>Do not interrupt prayers or processions for photographs. Keep a respectful distance and ask permission before taking close-up images.</p></div></article>
    </div>
    <div class="sacred-bali-rules">
      <h3>Simple ways to show respect</h3>
      <div class="sacred-rule-grid">
        <article class="sacred-rule"><b>01 · DRESS</b><h4>Cover shoulders and knees</h4><p>Temples may require a sarong and sash. Follow posted entry rules even when other visitors do not.</p></article>
        <article class="sacred-rule"><b>02 · BEHAVIOUR</b><h4>Stay calm and quiet</h4><p>Avoid shouting, climbing on sacred structures, public arguments or behaviour that could disturb worship.</p></article>
        <article class="sacred-rule"><b>03 · PHOTOGRAPHY</b><h4>Ask before you photograph</h4><p>Never block a ceremony or stand in front of people praying. Some sacred areas prohibit photography entirely.</p></article>
        <article class="sacred-rule"><b>04 · PROCESSIONS</b><h4>Give ceremonies priority</h4><p>Religious processions may pause traffic. Be patient, do not push through and follow local directions.</p></article>
      </div>
      <div class="sacred-persian">
        <h3>احترام به آیین‌ها و مراسم مذهبی بالی</h3>
        <div class="sacred-rule-grid">
          <article class="sacred-rule"><b>۰۱ · پوشش</b><h4>پوشش مناسب داشته باشید</h4><p>هنگام ورود به معابد شانه‌ها و زانوها پوشیده باشد و در صورت درخواست از سارونگ و شال مخصوص استفاده کنید.</p></article>
          <article class="sacred-rule"><b>۰۲ · رفتار</b><h4>آرام و محترمانه باشید</h4><p>در مکان‌های مقدس بلند صحبت نکنید، روی سازه‌ها و محراب‌ها ننشینید و مزاحم عبادت افراد نشوید.</p></article>
          <article class="sacred-rule"><b>۰۳ · عکاسی</b><h4>قبل از عکاسی اجازه بگیرید</h4><p>برای گرفتن عکس نزدیک از افراد، مراسم و عبادت‌کنندگان اجازه بگیرید و هرگز مسیر مراسم را مسدود نکنید.</p></article>
          <article class="sacred-rule"><b>۰۴ · نذری‌ها و مراسم</b><h4>به نذری‌ها دست نزنید</h4><p>روی سبدهای کوچک گل و نذری‌های قرارگرفته روی زمین پا نگذارید و در زمان عبور مراسم با صبر مسیر را باز نگه دارید.</p></article>
        </div>
      </div>
      <div class="sacred-respect-note">Bali welcomes visitors warmly. The most meaningful way to return that welcome is to treat its living faith, traditions and communities with patience, humility and care.<br><span dir="rtl">بالی با مهربانی از مهمانان استقبال می‌کند؛ بهترین پاسخ، احترام صادقانه به باورها، سنت‌ها و زندگی مردم محلی است.</span></div>
    </div>`;

  const quick=document.querySelector('.quick-check');
  if(quick) quick.before(section); else document.querySelector('.guide-wrap')?.appendChild(section);
})();