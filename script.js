
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
document.querySelectorAll('.booking-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.booking-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const button = document.querySelector('.search-btn');
    const labels = {hotels:'Search stays',restaurants:'Find a table',experiences:'Explore experiences',transfers:'Book transfer'};
    button.textContent = labels[tab.dataset.tab] || 'Search';
  });
});
document.querySelectorAll('.lang').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if(btn.dataset.lang === 'fa'){
      alert('نسخه فارسی آماده اتصال به صفحات فارسی سایت است.');
    }
  });
});
