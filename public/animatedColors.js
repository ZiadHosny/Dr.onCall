document.querySelector('body').style.margin = 0;
document.querySelector('body').style.overflow = 'hidden';
const canvasDOM = document.querySelector('canvas');
const WIDTH = (canvasDOM.width = innerWidth);
const HEIGHT = (canvasDOM.height = innerHeight);

const canvas = canvasDOM.getContext('2d');
const gradientCircle = canvas.createLinearGradient(0, 0, 0, HEIGHT);
const CircleArray = [];

class Circle {
  constructor(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
  }
  draw = function () {
    canvas.beginPath();
    canvas.fillStyle = gradientCircle;
    canvas.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    canvas.fill();
    if (this.x + this.r > WIDTH || this.x - this.r < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.r > HEIGHT || this.y - this.r < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  };
}

for (let i = 0; i <= 10; i++) {
  if (i % 2 == 0) {
    gradientCircle.addColorStop(i / 10, 'blue');
  } else {
    gradientCircle.addColorStop(i / 10, 'black');
  }
}

const background = () => {
  const gradientBackground = canvas.createLinearGradient(0, 0, 0, HEIGHT);
  for (let i = 0; i <= 10; i++) {
    if (i % 2 == 0) {
      gradientBackground.addColorStop(i / 10, 'black');
    } else {
      gradientBackground.addColorStop(i / 10, 'blue');
    }
  }
  canvas.fillStyle = gradientBackground;
  canvas.fillRect(0, 0, WIDTH, HEIGHT);
};

const animation = () => {
  background();
  for (let i = 0; i < CircleArray.length; i++) {
    CircleArray[i].draw();
  }
  requestAnimationFrame(animation);
};

//START

for (i = 0; i < 100; i++) {
  const r = Math.random() * 35 + 5;
  const dx = Math.random() * 10 + 1;
  const dy = Math.random() * 10 + 1;
  const x = Math.random() * (WIDTH - 2 * r) + r;
  const y = Math.random() * (HEIGHT - 2 * r) + r;
  CircleArray.push(new Circle(x, y, r, dx, dy));
}

requestAnimationFrame(animation);
