let timeout;
const canvas = document.querySelector("canvas");
canvas.width = document.documentElement.clientWidth;;
canvas.height = document.body.scrollHeight;
let ctx = canvas.getContext("2d");
let numberOfDots = Math.floor((canvas.width * canvas.height) / 20000);
let dotCoordinates = [];
const connectDistance = 200;
let mouseX;
let mouseY;

// Set up dot coordinates
const setInitialDotCoordinates = () => {
  for (let i = 0; i < numberOfDots; i++) {
    dotCoordinates.push({
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
      speed: Math.random() * 1 + 0.1,
      angle: Math.floor(Math.random() * 360),
      connectedDots: [],
    });
  }
};

setInitialDotCoordinates();

// Debounced resize handler - re-initalise the dots
const handleResize = () => {
  timeout && clearTimeout(timeout);
  timeout = setTimeout(() => {
    numberOfDots = Math.floor((canvas.width * canvas.height) / 20000);
    dotCoordinates = [];

    setInitialDotCoordinates();
  }, 500);
};

window.addEventListener("resize", handleResize);

// Store mouse location data for interactive fun
const handleMouseMove = (e) => {
  mouseX = e.pageX - document.body.scrollLeft;
  mouseY = e.pageY - document.body.scrollTop;
};

window.addEventListener("mousemove", handleMouseMove);

// Update dot coordinate locations based on speed, angle and coordinates
const updateDotCoordinates = () => {
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
};

// Render triangle
const drawTriangle = (
  firstCoordinate,
  secondCoordinate,
  thirdCoordinate,
  totalDistance
) => {
  ctx.beginPath();
  ctx.moveTo(firstCoordinate.x, firstCoordinate.y);
  ctx.lineTo(secondCoordinate.x, secondCoordinate.y);
  ctx.lineTo(thirdCoordinate.x, thirdCoordinate.y);
  ctx.closePath();

  ctx.fillStyle = `rgba(106, 120, 149, ${
    0.2 * (1 - 0.3 * Math.pow(totalDistance / connectDistance, 3))
  }`;
  ctx.fill();
};

// Render dot
const drawDot = (coordinates) => {
  ctx.beginPath();
  ctx.arc(coordinates.x, coordinates.y, 1, 0, 2 * Math.PI);
  ctx.closePath();

  ctx.fillStyle = "rgba(106, 120, 149, 0.5)";
  ctx.fill();
};

// Render dots and all possible triangles
const renderDots = () => {
  for (let i = 0; i < dotCoordinates.length; i++) {
    const firstCoordinates = dotCoordinates[i];
    drawDot(firstCoordinates);
    for (let j = i + 1; j < dotCoordinates.length; j++) {
      if (j === dotCoordinates.length) break;
      const secondCoordinates = dotCoordinates[j];
      const distanceFromFirstToSecondCoordinates = Math.sqrt(
        Math.pow(secondCoordinates.x - firstCoordinates.x, 2) +
          Math.pow(secondCoordinates.y - firstCoordinates.y, 2)
      );
      if (distanceFromFirstToSecondCoordinates <= connectDistance) {
        for (let k = j + 1; k < dotCoordinates.length; k++) {
          if (k === dotCoordinates.length) break;
          const thirdCoordinates = dotCoordinates[k];

          const distanceFromFirstToThirdCoordinates = Math.sqrt(
            Math.pow(thirdCoordinates.x - firstCoordinates.x, 2) +
              Math.pow(thirdCoordinates.y - firstCoordinates.y, 2)
          );

          const distanceFromSecondToThirdCoordinates = Math.sqrt(
            Math.pow(thirdCoordinates.x - secondCoordinates.x, 2) +
              Math.pow(thirdCoordinates.y - secondCoordinates.y, 2)
          );

          if (
            distanceFromFirstToThirdCoordinates <= connectDistance &&
            distanceFromSecondToThirdCoordinates <= connectDistance
          ) {
            drawTriangle(
              firstCoordinates,
              secondCoordinates,
              thirdCoordinates,
              distanceFromFirstToSecondCoordinates +
                distanceFromFirstToThirdCoordinates +
                distanceFromSecondToThirdCoordinates
            );
          }
        }

        const distanceFromFirstCoordinatesToMouse = Math.sqrt(
          Math.pow(mouseX - firstCoordinates.x, 2) +
            Math.pow(mouseY - firstCoordinates.y, 2)
        );
        const distanceFromSecondCoordinatesToMouse = Math.sqrt(
          Math.pow(mouseX - secondCoordinates.x, 2) +
            Math.pow(mouseY - secondCoordinates.y, 2)
        );
        if (
          distanceFromFirstCoordinatesToMouse <= connectDistance &&
          distanceFromSecondCoordinatesToMouse <= connectDistance
        ) {
          drawTriangle(
            firstCoordinates,
            secondCoordinates,
            { x: mouseX, y: mouseY },
            distanceFromFirstToSecondCoordinates +
              distanceFromFirstCoordinatesToMouse +
              distanceFromSecondCoordinatesToMouse
          );
        }
      }
    }
  }
};

// Animation loop
const draw = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = document.body.scrollHeight;

  updateDotCoordinates();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderDots();
};

// Animation is tied to refresh rate so we need to force 60 FPS
const throttleAnimationLoop = (func) => {
  let then = new Date().getTime();
  let fps = 60;
  let interval = 1000 / fps;

  (function loop() {
    let now = new Date().getTime();
    let delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);
      func();
    }
    
    requestAnimationFrame(loop);
  })();
};

throttleAnimationLoop(draw);
