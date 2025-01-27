// Light/dark theme shenanigans
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "light" : "dark"
  );
  document.documentElement.classList.toggle("dark");
});
