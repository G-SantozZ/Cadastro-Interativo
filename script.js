const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Configuração inicial
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const shootingStars = [];
const numStars = 200;

// Cria estrelas fixas
function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    opacity: Math.random(),
  };
}

// Cria estrelas cadentes
function createShootingStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    size: Math.random() * 2 + 1,
    speedX: Math.random() * 8 + 2,
    speedY: Math.random() * 4 + 1,
    opacity: Math.random() * 0.8 + 0.2,
  };
}

// Inicializa estrelas fixas
function initStars() {
  for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
  }
}

// Desenha estrelas fixas
function drawStars() {
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();
  });
}

// Desenha estrelas cadentes
function drawShootingStars() {
  shootingStars.forEach((star, index) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();

    star.x -= star.speedX;
    star.y += star.speedY;

    if (star.x < 0 || star.y > canvas.height) {
      shootingStars.splice(index, 1); // Remove a estrela ao sair da tela
    }
  });

  if (Math.random() < 0.02) {
    shootingStars.push(createShootingStar());
  }
}

// Atualiza o canvas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawShootingStars();
  requestAnimationFrame(animate);
}

initStars();
animate();