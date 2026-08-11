export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const type = response.headers.get('content-type') || '';

    if (!type.includes('text/html')) return response;

    let html = await response.text();
    html = html.replace(/assets\/tour-splash-simple\.css\?v=[^\"']+/g, 'assets/tour-splash-simple.css?v=20260811zoom5');
    const globalFixScript = '<script defer src="/assets/site-fixes.js?v=20260811c"></script>';
    html = html.replace(/<script[^>]+src=["']\/assets\/site-fixes\.js[^>]*><\/script>/gi,'');
    html = html.replace('</body>', `${globalFixScript}</body>`);

    if (url.pathname === '/' || url.pathname === '/index.html') {
      const forcedPromo = `
<style id="benarian-forced-promo-zoom">
@media(max-width:760px){
  body.home-lux .benarian-promo-track{overflow:visible!important;perspective:900px!important}
  body.home-lux .benarian-promo-slide{transform-origin:center!important}
  body.home-lux .benarian-promo-slide.benarian-zoom-out{z-index:20!important;opacity:1!important;visibility:visible!important;animation:benarianZoomOut 1.15s cubic-bezier(.16,.8,.22,1) forwards!important}
  body.home-lux .benarian-promo-slide.benarian-zoom-in{z-index:21!important;visibility:visible!important;animation:benarianZoomIn 1.15s cubic-bezier(.16,.8,.22,1) forwards!important}
  @keyframes benarianZoomOut{0%{transform:scale(1)!important;opacity:1!important}58%{transform:scale(1.18)!important;opacity:1!important}100%{transform:scale(1.34)!important;opacity:0!important}}
  @keyframes benarianZoomIn{0%{transform:scale(.82)!important;opacity:0!important}55%{transform:scale(.94)!important;opacity:.72!important}100%{transform:scale(1)!important;opacity:1!important}}
}
</style>
<script>
(function(){
  function initForcedPromo(){
    if(window.innerWidth>760)return;
    var track=document.getElementById('benarianPromoTrack');
    var dots=document.getElementById('benarianPromoDots');
    if(!track||track.dataset.forcedZoom==='1')return;
    track.dataset.forcedZoom='1';
    var slides=Array.prototype.slice.call(track.querySelectorAll('.benarian-promo-slide'));
    if(slides.length<2)return;
    var current=slides.findIndex(function(s){return s.classList.contains('is-active')});
    if(current<0)current=0;
    var busy=false,timer;
    function setDots(){if(!dots)return;Array.prototype.forEach.call(dots.children,function(d,n){d.classList.toggle('active',n===current)})}
    function clean(slide){slide.classList.remove('benarian-zoom-out','benarian-zoom-in')}
    function change(nextIndex){
      if(busy)return;busy=true;
      nextIndex=(nextIndex+slides.length)%slides.length;
      var outgoing=slides[current],incoming=slides[nextIndex];
      slides.forEach(function(s){clean(s)});
      outgoing.classList.add('benarian-zoom-out');
      incoming.classList.remove('is-prev','is-next');
      incoming.classList.add('is-active','benarian-zoom-in');
      incoming.style.pointerEvents='none';
      setTimeout(function(){
        slides.forEach(function(s,i){s.classList.remove('is-active','is-prev','is-next');clean(s);s.style.pointerEvents=''});
        current=nextIndex;
        slides[current].classList.add('is-active');
        slides[(current-1+slides.length)%slides.length].classList.add('is-prev');
        slides[(current+1)%slides.length].classList.add('is-next');
        setDots();busy=false;
      },1180);
    }
    function start(){clearInterval(timer);timer=setInterval(function(){change(current+1)},5500)}
    start();
    var rot=track.parentElement;
    rot.addEventListener('touchstart',function(){clearInterval(timer)},{passive:true});
    rot.addEventListener('touchend',function(){start()},{passive:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(initForcedPromo,80)},{once:true});else setTimeout(initForcedPromo,80);
})();
</script>`;
      html = html.replace('</body>', `${forcedPromo}</body>`);

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
