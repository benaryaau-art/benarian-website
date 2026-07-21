// BENARIAN global white-and-gold theme.
if (!document.querySelector('link[href="assets/white-theme.css"]')) {
  const whiteTheme = document.createElement('link');
  whiteTheme.rel = 'stylesheet';
  whiteTheme.href = 'assets/white-theme.css?v=20260721';
  document.head.appendChild(whiteTheme);
}

const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menu && nav) menu.addEventListener('click', () => nav.classList.toggle('open'));

const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('current');
});

function openPartnerLink(key, fallback) {
  const partner = window.BENARIAN_PARTNERS?.[key];
  const url = partner?.enabled && partner?.affiliateBaseUrl ? partner.affiliateBaseUrl : fallback;
  if (!url) return;
  if (/^https?:/i.test(url)) window.open(url, '_blank', 'noopener');
  else location.href = url;
}

const tabRoutes = {
  'HOTELS': null,
  'RESTAURANTS': { fallback: 'restaurants.html' },
  'EXPERIENCES': { partner: 'attractions', fallback: 'experiences.html' },
  'SPA & WELLNESS': { fallback: 'wellness.html' },
  'TRANSFERS': { partner: 'taxi', fallback: 'contact.html' },
  'FLIGHTS': { partner: 'flights', fallback: 'contact.html' },
  'YACHTS': { fallback: 'yacht-charter.html' },
  'HELICOPTER TOURS': { fallback: 'helicopter-tours.html' },
  'LUXURY CARS': { partner: 'cars', fallback: 'luxury-cars.html' }
};

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    const label = tab.textContent.replace(/^[^A-Z]+/, '').trim();
    const route = tabRoutes[label];
    if (route) openPartnerLink(route.partner, route.fallback);
  });
});

const serviceRoutes = {
  'SPA & WELLNESS': { fallback: 'wellness.html' },
  'AIRPORT TRANSFERS': { partner: 'taxi', fallback: 'contact.html' },
  'YACHT CHARTERS': { fallback: 'yacht-charter.html' },
  'HELICOPTER TOURS': { fallback: 'helicopter-tours.html' },
  'LUXURY CARS': { partner: 'cars', fallback: 'luxury-cars.html' },
  'TRAVEL INSURANCE': { fallback: 'contact.html' }
};

document.querySelectorAll('.service').forEach(service => {
  const label = service.querySelector('h4')?.textContent.trim();
  const route = serviceRoutes[label];
  if (!route) return;
  service.setAttribute('role', 'link');
  service.setAttribute('tabindex', '0');
  service.setAttribute('aria-label', `Open ${label}`);
  const activate = () => openPartnerLink(route.partner, route.fallback);
  service.addEventListener('click', activate);
  service.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activate();
    }
  });
});

function bookingSearchUrl(params) {
  const config = window.BENARIAN_PARTNERS?.booking || {};
  const base = config.enabled && config.affiliateBaseUrl
    ? config.affiliateBaseUrl
    : (config.baseUrl || 'https://www.booking.com/searchresults.html');
  return base + (base.includes('?') ? '&' : '?') + params.toString();
}

const checkinInput = document.querySelector('#checkin');
const checkoutInput = document.querySelector('#checkout');
if (checkinInput && checkoutInput) {
  const formatDate = date => date.toISOString().slice(0, 10);
  const today = new Date();
  const suggestedCheckin = new Date(today);
  suggestedCheckin.setDate(today.getDate() + 7);
  const suggestedCheckout = new Date(today);
  suggestedCheckout.setDate(today.getDate() + 11);
  if (!checkinInput.value || checkinInput.value < formatDate(today)) checkinInput.value = formatDate(suggestedCheckin);
  if (!checkoutInput.value || checkoutInput.value <= checkinInput.value) checkoutInput.value = formatDate(suggestedCheckout);
  checkinInput.min = formatDate(today);
  checkoutInput.min = formatDate(suggestedCheckin);
  checkinInput.addEventListener('change', () => {
    const nextDay = new Date(`${checkinInput.value}T12:00:00`);
    nextDay.setDate(nextDay.getDate() + 1);
    checkoutInput.min = formatDate(nextDay);
    if (checkoutInput.value <= checkinInput.value) checkoutInput.value = formatDate(nextDay);
  });
}

const form = document.querySelector('.booking-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const destination = (document.querySelector('#destination')?.value || 'Bali').trim();
    const checkin = checkinInput?.value || '';
    const checkout = checkoutInput?.value || '';
    const [adults, rooms] = (document.querySelector('#guests')?.value || '2-1').split('-');
    const params = new URLSearchParams({ ss: destination, group_adults: adults, no_rooms: rooms, group_children: '0' });
    if (checkin) params.set('checkin', checkin);
    if (checkout) params.set('checkout', checkout);
    window.open(bookingSearchUrl(params), '_blank', 'noopener');
  });
}

const hotelRow = document.querySelector('.hotel-row');
if (hotelRow && hotelRow.children.length > 1) {
  hotelRow.style.transition = 'opacity .35s ease, transform .35s ease';
  let hotelRotation;
  const rotateHotels = () => {
    hotelRow.style.opacity = '0';
    hotelRow.style.transform = 'translateY(6px)';
    setTimeout(() => {
      hotelRow.appendChild(hotelRow.firstElementChild);
      hotelRow.style.opacity = '1';
      hotelRow.style.transform = 'translateY(0)';
    }, 360);
  };
  const startHotelRotation = () => {
    clearInterval(hotelRotation);
    hotelRotation = setInterval(rotateHotels, 5000);
  };
  hotelRow.addEventListener('mouseenter', () => clearInterval(hotelRotation));
  hotelRow.addEventListener('mouseleave', startHotelRotation);
  hotelRow.addEventListener('focusin', () => clearInterval(hotelRotation));
  hotelRow.addEventListener('focusout', startHotelRotation);
  startHotelRotation();
}

const MEMBER_KEY = 'benarianMember';
function getMember(){try{return JSON.parse(localStorage.getItem(MEMBER_KEY)||'null')}catch{return null}}
function saveMember(member){localStorage.setItem(MEMBER_KEY,JSON.stringify(member))}
function displayMemberState(){
  const member=getMember();
  document.querySelectorAll('[data-member-name]').forEach(el=>el.textContent=member?.name||member?.email?.split('@')[0]||'BENARIAN Member');
  const locked=document.querySelector('#member-locked');
  const unlocked=document.querySelector('#member-unlocked');
  if(locked&&unlocked){locked.hidden=!!member;unlocked.hidden=!member}
  document.querySelectorAll('.member-top-link').forEach(link=>{if(member){link.textContent='♟ My Account';link.href='member-dashboard.html'}});
  if(location.pathname.endsWith('member-dashboard.html')&&!member) location.replace('member-login.html?next=member-dashboard.html');
}
const loginForm=document.querySelector('#member-login-form');
if(loginForm){loginForm.addEventListener('submit',e=>{e.preventDefault();const email=document.querySelector('#member-email').value.trim();const password=document.querySelector('#member-password').value;const msg=document.querySelector('#member-form-message');if(password.length<6){msg.textContent='Please enter a password with at least 6 characters.';return}saveMember({email,name:email.split('@')[0]});msg.textContent='Sign-in successful. Opening your dashboard…';setTimeout(()=>location.href='member-dashboard.html',450)})}
const joinForm=document.querySelector('#member-join-form');
if(joinForm){joinForm.addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#member-name').value.trim();const email=document.querySelector('#member-email').value.trim();const password=document.querySelector('#member-password').value;const consent=document.querySelector('#member-consent').checked;const msg=document.querySelector('#member-form-message');if(!name||password.length<6||!consent){msg.textContent='Please complete all fields and accept the privacy terms.';return}saveMember({name,email});msg.textContent='Welcome to BENARIAN. Opening your private member area…';setTimeout(()=>location.href='member-dashboard.html',500)})}
const logout=document.querySelector('#member-logout');
if(logout){logout.addEventListener('click',()=>{localStorage.removeItem(MEMBER_KEY);location.href='member-login.html'})}
displayMemberState();