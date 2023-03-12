// Typewriter effect fun
const textArray = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "REACTJS",
  "ANGULAR",
  "NODEJS",
  ".NET",
  "Motorcycling!",
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

if (localStorage.getItem("theme") === "dark") {
  checkbox.checked = true;
  document.body.classList.toggle("dark");
}

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  console.log(checkbox.checked);
  localStorage.setItem("theme", checkbox.checked ? "dark" : "light");
});

// Project wrapper click listeners
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
