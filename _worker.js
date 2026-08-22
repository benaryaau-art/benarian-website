export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) return response;
    let html = await response.text();

    const isHome = url.pathname === '/' || url.pathname === '/index.html';
    if (isHome && !html.includes('assets/site-fixes.js')) {
      html = html.replace('</body>', '<script src="/assets/site-fixes.js?v=20260822-coast-safari-fixed"></script></body>');
    }

    const headers = new Headers(response.headers);
    headers.set('content-type', 'text/html; charset=UTF-8');
    headers.set('cache-control', 'public, max-age=0, must-revalidate');
    return new Response(html, { status: response.status, headers });
  }
};