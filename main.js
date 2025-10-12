const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Adjust canvas to fill screen
function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
addEventListener('resize', resizeCanvas);

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 3;
    this.gravity = 0.02;
    this.friction = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.shadowBlur = 20;
    c.shadowColor = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.draw();

    // Apply friction + gravity
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

let particles = [];

function animate() {
  requestAnimationFrame(animate);

  // Create smooth trails instead of clearing completely
  c.fillStyle = 'rgba(0, 0, 0, 0.05)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    if (particle.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      particle.update();
    }
  });
}

animate();

addEventListener('click', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  const particleCount = 200;
  const angleIncrement = (Math.PI * 2) / particleCount;
  const baseColorHue = Math.random() * 360;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(mouse.x, mouse.y, 3, 
        `hsl(${baseColorHue + i * 2}, 70%, 60%)`, 
        {
          x: Math.cos(angleIncrement * i) * (Math.random() * 6),
          y: Math.sin(angleIncrement * i) * (Math.random() * 6),
        }
      )
    );
  }
});
