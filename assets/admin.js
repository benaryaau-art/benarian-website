const container = document.querySelector('#hotels');
const status = document.querySelector('#status');
let hotels = [];

const blankHotel = () => ({
  name: 'New Luxury Hotel',
  location: 'Bali',
  price: 'From AUD 0',
  score: '9.0 Wonderful',
  image: 'assets/images/hotel-ayana.jpg',
  bookingUrl: 'https://www.booking.com/'
});

function escapeHtml(value='') {
  return value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function render() {
  container.innerHTML = hotels.map((hotel, index) => `
    <div class="hotel" data-index="${index}">
      <label>Hotel name<input data-key="name" value="${escapeHtml(hotel.name)}"></label>
      <label>Location<input data-key="location" value="${escapeHtml(hotel.location)}"></label>
      <label>Price text<input data-key="price" value="${escapeHtml(hotel.price)}"></label>
      <label>Review score<input data-key="score" value="${escapeHtml(hotel.score)}"></label>
      <label class="wide">Image path or URL<input data-key="image" value="${escapeHtml(hotel.image)}"></label>
      <label class="wide">Booking link<input data-key="bookingUrl" value="${escapeHtml(hotel.bookingUrl)}"></label>
      <div class="wide"><button class="ghost remove" type="button">Remove this hotel</button></div>
    </div>`).join('');
}

function syncFromInputs() {
  document.querySelectorAll('.hotel').forEach(row => {
    const index = Number(row.dataset.index);
    row.querySelectorAll('input[data-key]').forEach(input => {
      hotels[index][input.dataset.key] = input.value.trim();
    });
  });
}

async function load() {
  status.textContent = 'Loading current website data…';
  try {
    const response = await fetch(`data/hotels.json?v=${Date.now()}`, {cache:'no-store'});
    if (!response.ok) throw new Error('Could not load hotel data');
    const data = await response.json();
    hotels = Array.isArray(data.featuredHotels) ? data.featuredHotels : [];
    render();
    status.textContent = 'Current hotel information loaded.';
  } catch (error) {
    hotels = [blankHotel()];
    render();
    status.textContent = 'The data file could not be loaded. A blank hotel was added instead.';
  }
}

container.addEventListener('click', event => {
  if (!event.target.classList.contains('remove')) return;
  syncFromInputs();
  hotels.splice(Number(event.target.closest('.hotel').dataset.index), 1);
  render();
});

document.querySelector('#add').addEventListener('click', () => {
  syncFromInputs();
  hotels.push(blankHotel());
  render();
  window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
});

document.querySelector('#save').addEventListener('click', () => {
  syncFromInputs();
  const content = JSON.stringify({featuredHotels: hotels}, null, 2) + '\n';
  const blob = new Blob([content], {type:'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'hotels.json';
  link.click();
  URL.revokeObjectURL(link.href);
  status.textContent = 'Downloaded. Replace data/hotels.json in GitHub with this file.';
});

document.querySelector('#reset').addEventListener('click', load);
load();
