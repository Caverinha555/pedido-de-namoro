let currentScreen = 1;

// 🌌 Fundo animado (estrelas à noite / pétalas de dia)
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const hour = new Date().getHours();
const particles = [];
const night = hour >= 19 || hour < 6;

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    speed: Math.random() * 0.6 + 0.2
  });
}

function animateBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = night ? "rgba(255,255,255,0.8)" : "rgba(255,120,160,0.7)";
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y -= p.speed;
    if (p.y < 0) p.y = canvas.height;
  });
  requestAnimationFrame(animateBackground);
}
animateBackground();

// ✍️ Texto por horário
let text = night
  ? `Boa noite…  
Entre tantas estrelas,  
meu lugar favorito  
é onde você está ✨`
  : `Durante o dia,  
no meio da correria,  
meu pensamento sempre  
volta pra você 💖`;

function nextScreen(num) {
  document.getElementById(`screen${currentScreen}`).classList.remove("active");
  document.getElementById(`screen${num}`).classList.add("active");
  currentScreen = num;
  if (num === 2) typeText();
  if (num === 3 && navigator.vibrate) navigator.vibrate([200,100,200]);
}

// Texto digitado
let i = 0;
function typeText() {
  const el = document.getElementById("typing");
  el.innerHTML = "";
  i = 0;
  const timer = setInterval(() => {
    el.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(timer);
  }, 50);
}

// Música com fade-in
const music = document.getElementById("music");
function fadeInMusic() {
  music.volume = 0;
  music.play();
  let v = 0;
  const fade = setInterval(() => {
    v += 0.02;
    music.volume = v;
    if (v >= 1) clearInterval(fade);
  }, 100);
}

// Botão SIM
const yesBtn = document.getElementById("yesBtn");
const secret = document.getElementById("secret");
let hold;

yesBtn.addEventListener("mousedown", () => {
  hold = setTimeout(() => secret.classList.add("show"), 900);
});

yesBtn.addEventListener("mouseup", () => clearTimeout(hold));

yesBtn.addEventListener("click", () => {
  fadeInMusic();
  nextScreen(4);
});

// Botão NÃO
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
  noBtn.style.transform = `translate(${Math.random()*200-100}px, ${Math.random()*200-100}px)`;
});
