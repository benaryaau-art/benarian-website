const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menu && nav) {
  menu.addEventListener('click', () => nav.classList.toggle('open'));
}

// Mark the current navigation item.
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('current');
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
  });
});

function bookingSearchUrl(params) {
  const config = window.BENARIAN_PARTNERS?.booking || {};
  const base = config.enabled && config.affiliateBaseUrl
    ? config.affiliateBaseUrl
    : (config.baseUrl || 'https://www.booking.com/searchresults.html');
  const separator = base.includes('?') ? '&' : '?';
  return base + separator + params.toString();
}

const form = document.querySelector('.booking-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const destination = (document.querySelector('#destination')?.value || 'Bali').trim();
    const checkin = document.querySelector('#checkin')?.value || '';
    const checkout = document.querySelector('#checkout')?.value || '';
    const guestValue = document.querySelector('#guests')?.value || '2-1';
    const [adults, rooms] = guestValue.split('-');
    const params = new URLSearchParams({
      ss: destination,
      group_adults: adults,
      no_rooms: rooms,
      group_children: '0'
    });
    if (checkin) params.set('checkin', checkin);
    if (checkout) params.set('checkout', checkout);
    window.open(bookingSearchUrl(params), '_blank', 'noopener');
  });
}
