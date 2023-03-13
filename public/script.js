// Typewriter effect fun
const textArray = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACTJS",
  "ANGULAR",
  "NODEJS",
  ".NET",
];
const codeBox = document.getElementById("code-wrapper");

// Recursively write letters in line until end of sentence
const writeLine = (text) =>
  new Promise((resolve) => {
    const el = document.createElement("p");
    el.classList.add("active");
    codeBox.appendChild(el);

    const write = (index) => {
      if (index < textArray[0].length) {
        el.innerHTML += text[index];
        setTimeout(() => write(index + 1), 100);
      } else {
        el.classList.remove("active");
        resolve(true);
      }
    };

    write(0);
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
