// Typewriter effect fun
const textArray = [
  "<Hi there!> I'm a <full stack developer> with a bit of a thing for front end development.",
  "I've got a passion for creating <unique, interactive and user-friendly experiences> with a high <attention to detail>.",
  "I love <challenging myself>, and my projects reflect this. From draggable masonry algorithms to physics to audio visualising, I'm always finding ways to further <push myself and learn>!",
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
        setTimeout(() => write(text.substring(1), span), 25);
      } else if (text[0] === ">") {
        setTimeout(() => write(text.substring(1), p), 25);
      } else if (text) {
        el.innerHTML += text[0];
        setTimeout(() => write(text.substring(1), el), 25);
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
const checkbox = document.getElementById("switch");

checkbox.checked = document.documentElement.classList.contains("dark");

checkbox.addEventListener("change", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", checkbox.checked ? "dark" : "light");
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

// Suppress bubbling from <a> clicks within wrapper
document
  .querySelectorAll(".project-wrapper a")
  .forEach((element) =>
    element.addEventListener("click", (e) => e.stopPropagation())
  );
