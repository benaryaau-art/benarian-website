export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) return response;

    let html = await response.text();
    html = html.replace(/assets\/tour-splash-simple\.css\?v=[^\"']+/g, 'assets/tour-splash-simple.css?v=20260811zoom3');
    const globalFixScript = '<script defer src="/assets/site-fixes.js?v=20260811b"></script>';
    if (!html.includes('/assets/site-fixes.js')) {
      html = html.replace('</body>', `${globalFixScript}</body>`);
    }

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
    }

    const headers = new Headers(response.headers);
    headers.set('content-type', 'text/html; charset=UTF-8');
    headers.set('cache-control', 'public, max-age=0, must-revalidate');
    headers.set('x-content-type-options', 'nosniff');
    headers.set('referrer-policy', 'strict-origin-when-cross-origin');
    return new Response(html, { status: response.status, headers });
  }
};
