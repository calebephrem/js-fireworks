const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

function adjustCanvasSize() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}
adjustCanvasSize();

addEventListener('resize', () => adjustCanvasSize);

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

class Particle {
  constructor(x, y, r, c, v) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = c;
    this.v = v;
    this.gravity = 0.99;
    this.friction = 0.05;
    this.power = 10;
  }

  draw() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.draw();

    this.y += this.gravity;

    this.x += this.v.x * this.power;
    this.y += this.v.y * this.power;
  }
}

let particles;

function init() {
  particles = [];
}

function animate() {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'rgba(0, 0, 0, 0.01)';
  c.fillRect(0, 0, innerWidth, innerHeight);

  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();

addEventListener('click', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  const particleCount = 1234;

  const angleIncrement = (Math.PI * 2) / particleCount;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(
        mouse.x,
        mouse.y,
        3,
        `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
        {
          x: Math.cos(angleIncrement * i) * Math.random(),
          y: Math.sin(angleIncrement * i) * Math.random(),
        }
      )
    );
  }
});
