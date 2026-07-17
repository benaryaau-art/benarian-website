const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');if(menu)menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active')}));
const form=document.querySelector('.booking-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();alert('Booking partner links will activate after affiliate approval. Our concierge can assist you now.');});
