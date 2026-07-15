const hotels = [
  {name:"AYANA Resort Bali",img:"assets/images/hotel-ayanna.jpg",place:"Jimbaran, Bali",price:"AUD 450",score:"9.4",rooms:"3 rooms left"},
  {name:"The Apurva Kempinski Bali",img:"assets/images/hotel-kempinski.jpg",place:"Nusa Dua, Bali",price:"AUD 680",score:"9.3",rooms:"2 rooms left"},
  {name:"Uluwatu Surf Villas",img:"assets/images/hotel-uluwatu.jpg",place:"Uluwatu, Bali",price:"AUD 550",score:"9.2",rooms:"4 rooms left"},
  {name:"Alila Villas Uluwatu",img:"assets/images/hotel-alila.jpg",place:"Uluwatu, Bali",price:"AUD 690",score:"9.1",rooms:"2 rooms left"}
];
const restaurants = [
  {name:"Merah Putih",img:"assets/images/restaurant-1.jpg",rating:"4.8",place:"Jimbaran"},
  {name:"Locavore",img:"assets/images/restaurant-2.jpg",rating:"4.7",place:"Ubud"},
  {name:"The Cave by Chef Ryan Clift",img:"assets/images/restaurant-3.jpg",rating:"4.8",place:"Uluwatu"},
  {name:"Sundara Beach Club",img:"assets/images/restaurant-4.jpg",rating:"4.6",place:"Jimbaran"}
];

document.getElementById("hotelGrid").innerHTML = hotels.map(h => `
  <article class="hotel-card">
    <div class="heart">♡</div><img src="${h.img}" alt="${h.name}" loading="lazy">
    <div class="hotel-body"><h3>${h.name} <span class="score">${h.score}</span></h3>
    <p>★★★★★</p><p>⌖ ${h.place}</p><p>From ${h.price} / night</p><p class="rooms">${h.rooms}</p></div>
  </article>`).join("");

document.getElementById("restaurantList").innerHTML = restaurants.map(r => `
  <article class="restaurant"><img src="${r.img}" alt="${r.name}" loading="lazy">
  <div><h4>${r.name}</h4><div class="rating">★★★★★ &nbsp; ${r.rating}</div><div class="location">⌖ ${r.place}</div></div></article>`).join("");

const now = new Date();
const inDate = new Date(now); inDate.setDate(now.getDate()+10);
const outDate = new Date(now); outDate.setDate(now.getDate()+14);
const fmt = d => d.toISOString().slice(0,10);
document.getElementById("checkin").value = fmt(inDate);
document.getElementById("checkout").value = fmt(outDate);
document.getElementById("year").textContent = now.getFullYear();

document.querySelector(".menu-btn").addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.querySelectorAll(".service-tabs button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".service-tabs button").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
}));
document.getElementById("searchForm").addEventListener("submit",e=>{
  e.preventDefault(); const t=document.getElementById("toast"); t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),3500);
});
