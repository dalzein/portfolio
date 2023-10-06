let timeout;
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = document.body.scrollHeight;
let ctx = canvas.getContext("2d");
let numberOfDots = Math.floor((canvas.width * canvas.height) / 20000);
let dotCoordinates = [];
const connectDistance = 350;
let mouseX;
let mouseY;

// Set up dot coordinates
function setInitialDotCoordinates() {
  for (let i = 0; i < numberOfDots; i++) {
    dotCoordinates.push({
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
      speed: Math.random() * 0.5 + 0.1,
      angle: Math.floor(Math.random() * 360),
      connectedDots: [],
    });
  }
}

setInitialDotCoordinates();

// Debounced resize handler - re-initalise the dots
function handleResize() {
  timeout && clearTimeout(timeout);
  timeout = setTimeout(() => {
    numberOfDots = Math.floor((canvas.width * canvas.height) / 20000);
    dotCoordinates = [];

    setInitialDotCoordinates();
  }, 500);
}

window.addEventListener("resize", handleResize);

// Store mouse location data for interactive fun
function handleMouseMove(e) {
  mouseX = e.pageX - document.body.scrollLeft;
  mouseY = e.pageY - document.body.scrollTop;
}

window.addEventListener("mousemove", handleMouseMove);

// Update dot coordinate locations based on speed, angle and coordinates
function updateDotCoordinates() {
  dotCoordinates.forEach((dotCoordinate) => {
    dotCoordinate.x +=
      Math.cos((-dotCoordinate.angle * Math.PI) / 180) * dotCoordinate.speed;
    dotCoordinate.y +=
      Math.sin((-dotCoordinate.angle * Math.PI) / 180) * dotCoordinate.speed;
    dotCoordinate.connectedDots = [];

    if (dotCoordinate.x > canvas.width) {
      dotCoordinate.x = 0;
    } else if (dotCoordinate.x < 0) {
      dotCoordinate.x = canvas.width;
    }

    if (dotCoordinate.y > canvas.height) {
      dotCoordinate.y = 0;
    } else if (dotCoordinate.y < 0) {
      dotCoordinate.y = canvas.height;
    }
  });
}

// Draw the dots
function renderDots() {
  // Loop through each dot
  for (let i = 0; i < dotCoordinates.length; i++) {
    const dot = dotCoordinates[i];
    // Loop through remainder of dot array to check distance to other dots
    for (let j = i + 1; j < dotCoordinates.length; j++) {
      if (j === dotCoordinates.length) break;
      const targetDot = dotCoordinates[j];

      // If distance to other dot is short enough, store its coordinates so we can connect the dots later
      const distanceFromTargetDot = Math.sqrt(
        Math.pow(targetDot.x - dot.x, 2) + Math.pow(targetDot.y - dot.y, 2)
      );
      if (distanceFromTargetDot <= connectDistance) {
        dot.connectedDots.push({
          x: targetDot.x,
          y: targetDot.y,
          opacity: Math.pow(
            (connectDistance - distanceFromTargetDot) / connectDistance,
            3
          ),
        });
      }
    }

    // Store cursor coordinates in connection array for this dot if the distance between them is short enough
    const distanceFromMouse = Math.sqrt(
      Math.pow(mouseX - dot.x, 2) + Math.pow(mouseY - dot.y, 2)
    );
    if (distanceFromMouse <= connectDistance) {
      dot.connectedDots.push({
        x: mouseX,
        y: mouseY,
        opacity: Math.pow(
          (connectDistance - distanceFromMouse) / connectDistance,
          3
        ),
      });
    }

    // Draw the lines to the dots based on connection array
    dot.connectedDots.forEach((connectedDot) => {
      ctx.strokeStyle = `rgba(127, 127, 127, ${connectedDot.opacity})`;
      ctx.beginPath();
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(connectedDot.x, connectedDot.y);
      ctx.stroke();
      ctx.closePath();
    });

    // Draw the dot itself
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgb(127, 127, 127)";
    ctx.fill();
  }
}

// Animation loop
function draw() {
  requestAnimationFrame(draw);

  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;

  updateDotCoordinates();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderDots();
}

draw();
