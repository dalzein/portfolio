// Light/dark theme shenanigans
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "light" : "dark"
  );
  document.documentElement.classList.toggle("dark");
});

const goTo = (url) => {
  window.open(url, "_blank");
};

// Suppress anchor click events from bubbling
document
  .querySelectorAll(".project-wrapper a")
  .forEach((element) =>
    element.addEventListener("click", (e) => e.stopPropagation())
  );
