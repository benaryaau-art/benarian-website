export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html') || (url.pathname !== '/' && url.pathname !== '/index.html')) {
      return response;
    }

    const html = await response.text();
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

    const cleaned = html
      .replace(/<meta[^>]+property=["']og:[^>]+>/gi, '')
      .replace(/<meta[^>]+name=["']twitter:[^>]+>/gi, '');
    const body = cleaned.replace('</head>', `${meta}</head>`);
    const headers = new Headers(response.headers);
    headers.set('content-type', 'text/html; charset=UTF-8');
    headers.set('cache-control', 'public, max-age=0, must-revalidate');
    return new Response(body, { status: response.status, headers });
  }
};