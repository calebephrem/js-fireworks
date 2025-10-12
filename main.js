const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

function adjustCanvasSize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
adjustCanvasSize();
addEventListener('resize', adjustCanvasSize);

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

class Particle {
  constructor(x, y, r, color, velocity) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.velocity = velocity;
    this.gravity = 0.01;
    this.friction = 1;
    this.alpha = 2;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005;

    this.draw();
  }
}

let particles = [];

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.09)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.alpha > 0);
  particles.forEach(p => p.update());
}

animate();

addEventListener('click', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  const particleCount = 1000;
  const angleIncrement = (Math.PI * 2) / particleCount;

  for (let i = 0; i < particleCount; i++) {
    const angle = angleIncrement * i;
    const speed = Math.random() * 10 + 2;

    const velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };

    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 100%, 60%)`;

    particles.push(new Particle(mouse.x, mouse.y, 4, color, velocity));
  }
});
