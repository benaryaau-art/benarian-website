export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) return response;

    let html = await response.text();
    if (url.pathname === '/persian-experiences.html') html = html.replace('</head>', '<meta name="benarian-version" content="iran-mobile-20260812a"></head>');
    html = html.replace(/assets\/tour-splash-simple\.css\?v=[^\"']+/g, 'assets/tour-splash-simple.css?v=20260812founder1');

    /* Keep exactly one global runtime. */
    html = html.replace(/<script[^>]+src=["']\/assets\/site-fixes\.js[^>]*><\/script>/gi,'');
    html = html.replace(/<style id="benarian-forced-promo-zoom">[\s\S]*?<\/style>\s*<script>[\s\S]*?initForcedPromo[\s\S]*?<\/script>/gi,'');
    const globalFixScript = '<script defer src="/assets/site-fixes.js?v=20260812safari-motion14"></script>';
    html = html.replace('</body>', `${globalFixScript}</body>`);

    if (url.pathname === '/' || url.pathname === '/index.html') {
      const socialImage = 'https://benarian.com/assets/hotels-hero-new.jpg?v=20260728-social';
      const title = 'BENARIAN | Luxury Travel & Hospitality';
      const description = 'Curated luxury hotels, destinations, flights and exceptional travel experiences with BENARIAN.';
      const meta = `
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="BENARIAN">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:url" content="https://benarian.com/">
        <meta property="og:image" content="${socialImage}">
        <meta property="og:image:secure_url" content="${socialImage}">
        <meta property="og:image:type" content="image/jpeg">
        <meta property="og:image:width" content="1600">
        <meta property="og:image:height" content="900">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <meta name="twitter:image" content="${socialImage}">
      `;
      html = html
        .replace(/<meta[^>]+property=["']og:[^>]+>/gi, '')
        .replace(/<meta[^>]+name=["']twitter:[^>]+>/gi, '')
        .replace('</head>', `${meta}</head>`);

      const sneakerPromo = `
      <section id="benarian-sneaker-promo" style="background:#080808;color:#fff;padding:0;overflow:hidden;border-top:1px solid #2b2115;border-bottom:1px solid #2b2115">
        <a href="https://benarian-2.myshopify.com/collections/all" style="display:grid;grid-template-columns:1fr 1fr;min-height:520px;color:inherit;text-decoration:none">
          <div style="padding:70px 8%;display:flex;flex-direction:column;justify-content:center;background:radial-gradient(circle at 80% 20%,#241b10 0,#0b0b0b 45%,#050505 100%)">
            <span style="color:#d4aa59;font:600 9px Inter,Arial,sans-serif;letter-spacing:3px">BENARIAN SIGNATURE FOOTWEAR</span>
            <h2 style="margin:18px 0 18px;font:400 clamp(50px,6vw,82px)/.86 'Cormorant Garamond',Georgia,serif">Step into<br>the signature.</h2>
            <p style="max-width:520px;color:#bbb2a7;font:300 14px/1.7 Inter,Arial,sans-serif">BENARIAN Signature High-Top Sneakers — Black & Gold.</p>
            <strong style="display:block;margin-top:8px;color:#f0c879;font:500 28px 'Cormorant Garamond',Georgia,serif">AU$110</strong>
            <span style="align-self:flex-start;margin-top:24px;padding:15px 22px;border:1px solid #c99a45;background:#c99a45;color:#090909;font:700 9px Inter,Arial,sans-serif;letter-spacing:2px">SHOP SNEAKERS →</span>
          </div>
          <div style="min-height:520px;background:#fff;display:flex;align-items:center;justify-content:center;padding:28px">
            <div style="width:min(88%,520px);aspect-ratio:1/1;background:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.18)">
              <div style="position:absolute;inset:11%;border:1px solid #eadfc8;border-radius:50%"></div>
              <div style="position:relative;z-index:2;text-align:center;padding:32px">
                <div style="font:700 clamp(58px,7vw,92px)/1 'Cormorant Garamond',Georgia,serif;color:#0b0b0b;letter-spacing:-4px">BB</div>
                <div style="margin:18px auto 14px;width:84px;height:1px;background:#c99a45"></div>
                <div style="font:600 17px/1.2 Inter,Arial,sans-serif;color:#111;letter-spacing:2px">HIGH-TOP</div>
                <div style="margin-top:6px;font:400 12px/1.4 Inter,Arial,sans-serif;color:#8b6b31;letter-spacing:1.6px">BLACK & GOLD</div>
                <div style="margin:34px auto 0;width:72%;height:95px;border-radius:50% 50% 42% 42%;background:linear-gradient(145deg,#111 0,#020202 66%,#1c1c1c 100%);transform:skewX(-16deg) rotate(-4deg);box-shadow:22px 30px 0 -12px #0a0a0a,0 28px 30px rgba(0,0,0,.22);position:relative">
                  <span style="position:absolute;left:24%;top:25%;font:700 28px Georgia,serif;color:#c89c3f;transform:skewX(16deg) rotate(4deg)">BB</span>
                  <span style="position:absolute;right:6%;top:-30px;width:70px;height:86px;border-radius:10px 22px 5px 5px;background:#0b0b0b;transform:skewX(16deg) rotate(4deg);border-left:1px solid #333"></span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </section>
      <style>@media(max-width:760px){#benarian-sneaker-promo>a{grid-template-columns:1fr!important}#benarian-sneaker-promo>a>div{min-height:390px!important}#benarian-sneaker-promo>a>div:first-child{padding:56px 24px!important}}</style>`;
      if (!html.includes('id="benarian-sneaker-promo"')) {
        html = html.replace('<section class="benarian-promo-rotator"', `${sneakerPromo}<section class="benarian-promo-rotator"`);
      }
    }

    const headers = new Headers(response.headers);
    headers.set('content-type', 'text/html; charset=UTF-8');
    headers.set('cache-control', 'public, max-age=0, must-revalidate');
    headers.set('x-content-type-options', 'nosniff');
    headers.set('referrer-policy', 'strict-origin-when-cross-origin');
    return new Response(html, { status: response.status, headers });
  }
};
