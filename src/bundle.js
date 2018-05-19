// Initial Setup
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d'); // passings objs of the canvas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 1. Create the items objs
// 2. loop to update the shoes: appear random position
// 3. Catch is going to move left and right <- • ->
// 4. Safe element that you catch inside the bag, (array)
// 5. Make desappear elements inside the bag out of the loop.
// 6. Elements that are not in the bag need to be in loop for catching.

// Variables
const mouse = {
  x: undefined,
  y: undefined
};

const maxRadius = 60;

// Event Listeners
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

// Constructor, Objects 
 class Circle {

   constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    // methods
    this.draw = function() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.strokeStyle = 'blue';
      context.fillStyle = this.color;
      context.fill();
      context.stroke();
    };

    this.update = function() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      // interactivity on mouse hover
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > radius) {
        this.radius -= 1;
      }

      this.draw();
    };
  }
}

// Implementation
let cicleArray = [];

const init = function () {
  cicleArray = [];

  for (var i = 0; i < 800; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    var color =
      'rgba(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      0.05 +
      ')';

    cicleArray.push(new Circle(x, y, dx, dy, radius, color));
  }
}


// Animation Loop
const animation = function () {

  requestAnimationFrame(animation); // create a loop, basically this going to refresh the page and draw and increment a value.

  context.clearRect(0, 0, innerWidth, innerHeight); // to clear the canvas every time

  for (var i = 0; i < cicleArray.length; i++) {

    cicleArray[i].update();
  
  }
}

init();
animation();
