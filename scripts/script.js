/* ---------- плавная прокрутка ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- GSAP-анимация появления ---------- */
gsap.registerPlugin(ScrollTrigger);

gsap.from('.section__title', {
  y: 60,
  opacity: 0,
  duration: 1,
  scrollTrigger: { trigger: '.section', start: 'top 90%' }
});

gsap.from('.about__img', {
  x: -100,
  opacity: 0,
  duration: 1,
  scrollTrigger: { trigger: '.about', start: 'top 80%' }
});

gsap.from('.work', {
  y: 80,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: { trigger: '.works', start: 'top 80%' }
});

/* ---------- карусель отзывов ---------- */
const carousel = document.getElementById('reviews-carousel');
const reviews = carousel.children;
let index = 0;

function goTo(i) {
  index = i;
  carousel.scrollTo({ left: i * 340, behavior: 'smooth' });
}

function nextReview() {
  index = (index + 1) % reviews.length;
  goTo(index);
}

function prevReview() {
  index = (index - 1 + reviews.length) % reviews.length;
  goTo(index);
}

// авто-прокрутка каждые 5 секунд
setInterval(nextReview, 5000);

/* 40 случайных частиц */
const particles=document.getElementById('particles');
/* случайные размеры 2–6 px */
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = 2 + Math.random() * 6;   // 2–6 px
  p.style.width  = size + 'px';
  p.style.height = size + 'px';
  p.style.left   = Math.random() * 100 + '%';
  p.style.animationDelay    = Math.random() * 20 + 's';
  p.style.animationDuration = (15 + Math.random() * 10) + 's';
  document.getElementById('particles').appendChild(p);
}

const container = document.getElementById('comets-container');
const colors   = ['#00f5ff','#ff2d55','#00ff8c','#ffae00'];
const speeds   = [6,8,10,12];

for(let i = 0; i < 12; i++){
  const comet = document.createElement('div');
  comet.className = 'comet';

  const size   = 2 + Math.random() * 1;
  const angle  = Math.random() * 360;
  const speed  = speeds[Math.floor(Math.random()*speeds.length)];
  const delay  = Math.random() * speed;

  // случайное направление (можно сделать более изящно)
  const dir = Math.random() > .5 ? 1 : -1;
  const offsetX = dir > 0 ? '-100px' : '110vw';
  const endX    = dir > 0 ? '110vw'  : '-100px';

  const offsetY = -100 - Math.random()*100 + 'px';
  const endY    = '110vh';

  comet.style.setProperty('--angle', angle + 'deg');
  comet.style.setProperty('--offsetX', offsetX);
  comet.style.setProperty('--offsetY', offsetY);
  comet.style.setProperty('--endX', endX);
  comet.style.setProperty('--endY', endY);

  comet.style.width  = size + 'px';
  comet.style.height = 40 + Math.random()*60 + 'px';
  comet.style.background = colors[i % colors.length];

  comet.style.animation = `fly ${speed}s linear ${delay}s infinite`;
  container.appendChild(comet);
}

  const form = document.querySelector('.form');
  const botToken = '7626467627:AAHmtUgZoHtrIJeA_c5lcfQ2b0UNcDTy5g0';
  const chatId = '7465761482';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = `📬 Новая заявка с сайта:
<b>Имя:</b> ${name}
<b>Email:</b> ${email}
<b>Сообщение:</b> ${message}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        alert('Сообщение отправлено в Telegram!');
        form.reset();
      } else {
        alert('Ошибка при отправке.');
      }
    } catch (error) {
      alert('Ошибка соединения.');
    }
  });