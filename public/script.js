// Typewriter effect fun
const textArray = [
  "I have a passion for creating unique and interactive user experiences!",
];
const codeBox = document.getElementById("code-wrapper");

// Recursively write letters in line until end of sentence
const writeLine = (text) =>
  new Promise((resolve) => {
    const p = document.createElement("p");
    p.classList.add("active");
    codeBox.appendChild(p);

    const write = (text, el) => {
      if (text[0] === "<") {
        const span = document.createElement("span");
        span.classList.add("accent");
        el.appendChild(span);
        setTimeout(() => write(text.substring(1), span), 30);
      } else if (text[0] === ">") {
        setTimeout(() => write(text.substring(1), p), 30);
      } else if (text) {
        el.innerHTML += text[0];
        setTimeout(() => write(text.substring(1), el), 30);
      } else {
        el.classList.remove("active");
        resolve(true);
      }
    };

    write(text, p);
  });

// Recursively write lines until end of array
const writeLines = (lines) => {
  lines.length &&
    writeLine(lines[0]).then(() => {
      lines.shift();
      writeLines(lines);
    });
};

writeLines(textArray);

// Light/dark theme shenanigans
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "light" : "dark"
  );
  document.documentElement.classList.toggle("dark");
});

// Project wrapper click listener
document
  .getElementById("driftjs")
  .addEventListener("click", () => window.open("https://driftjs.io", "_blank"));

document
  .getElementById("notish")
  .addEventListener("click", () => window.open("https://notish.io", "_blank"));

document
  .getElementById("deciball")
  .addEventListener("click", () =>
    window.open("https://deciball.io", "_blank")
  );

document
  .getElementById("absolutemasonry")
  .addEventListener("click", () =>
    window.open("https://github.com/dalzein/absolute-masonry", "_blank")
  );

document
  .getElementById("spotifyplayer")
  .addEventListener("click", () =>
    window.open("https://github.com/dalzein/spotify-player", "_blank")
  );

// Suppress bubbling from <a> clicks within wrapper
document
  .querySelectorAll(".project-wrapper a")
  .forEach((element) =>
    element.addEventListener("click", (e) => e.stopPropagation())
  );
