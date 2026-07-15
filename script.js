const html = document.documentElement;
const langToggle = document.getElementById('languageToggle');
const persianAccess = document.getElementById('persianAccess');

function setLanguage(lang){
  const fa = lang === 'fa';
  html.lang = fa ? 'fa' : 'en';
  html.dir = fa ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en][data-fa]').forEach(el=>{
    el.innerHTML = fa ? el.dataset.fa : el.dataset.en;
  });
  document.querySelectorAll('[data-placeholder-en]').forEach(el=>{
    el.placeholder = fa ? el.dataset.placeholderFa : el.dataset.placeholderEn;
  });
  localStorage.setItem('benarian-language', lang);
}
setLanguage(localStorage.getItem('benarian-language') || 'en');
langToggle?.addEventListener('click',()=>setLanguage(html.lang==='fa'?'en':'fa'));
persianAccess?.addEventListener('click',()=>setLanguage('fa'));

document.querySelectorAll('.booking-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.booking-tabs button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.querySelectorAll('[data-search]').forEach(card=>{
  card.addEventListener('click',e=>{
    e.preventDefault();
    document.getElementById('destination').value = card.dataset.search;
    document.querySelector('.booking').scrollIntoView({behavior:'smooth',block:'center'});
  });
});

document.getElementById('bookingForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const destination = document.getElementById('destination').value.trim();
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const guests = document.getElementById('guests').value || '2';
  if(!destination || !checkin || !checkout) return;
  const url = new URL('https://www.booking.com/searchresults.html');
  url.searchParams.set('ss', destination);
  url.searchParams.set('checkin', checkin);
  url.searchParams.set('checkout', checkout);
  url.searchParams.set('group_adults', guests);
  url.searchParams.set('no_rooms', guests === '4' ? '2' : '1');
  url.searchParams.set('group_children', '0');
  window.open(url.toString(), '_blank', 'noopener,noreferrer');
});

const today = new Date();
const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);
const after = new Date(today); after.setDate(today.getDate()+3);
const iso = d => d.toISOString().slice(0,10);
const ci = document.getElementById('checkin'), co = document.getElementById('checkout');
if(ci && !ci.value){ci.min=iso(today);ci.value=iso(tomorrow)}
if(co && !co.value){co.min=iso(tomorrow);co.value=iso(after)}
ci?.addEventListener('change',()=>{co.min=ci.value;if(co.value<=ci.value){const d=new Date(ci.value);d.setDate(d.getDate()+1);co.value=iso(d)}});