// Typewriter effect fun
const text = [
  "Hello!",
  "I'm a full-stack developer that likes to make cool stuff :)",
];

const codeBox = document.getElementById("code-wrapper");

// Recursively write letters in line until end of sentence
const writeLine = (p, text, charDelay = 30) =>
  new Promise((resolve) => {
    const write = (text, el) => {
      // Check for "<" and ">" tags which we'll use to indicate text that needs accenting
      // If found, we'll wrap the inner text in a span and give it a class we can target with CSS if ever want to
      if (text[0] === "<") {
        const span = document.createElement("span");
        span.classList.add("accent");
        el.appendChild(span);
        setTimeout(() => write(text.substring(1), span), charDelay);
      } else if (text[0] === ">") {
        setTimeout(() => write(text.substring(1), p), charDelay);
      } else if (text) {
        el.innerHTML += text[0];
        setTimeout(() => write(text.substring(1), el), charDelay);
      } else {
        resolve(true);
      }
    };

    write(text, p);
  });

// Recursively write lines until end of array
const writeLines = (lines, charDelay = 40) => {
  if (!lines.length) return;

  const p = document.createElement("p");
  p.classList.add("active");
  codeBox.appendChild(p);

  writeLine(p, lines[0], charDelay).then(() => {
    lines.shift();
    p.classList.add("blink");
    setTimeout(() => {
      p.classList.remove("active");
      p.classList.remove("blink");
      writeLines(lines, charDelay);
    }, 1000);
  });
};

const writeLineWithChangingText = (
  text,
  charWriteDelay = 30,
  charDeleteDelay = 30,
  pauseTime = 2000
) => {
  const p = document.createElement("p");
  p.classList.add("active");
  codeBox.appendChild(p);

  const writeAppendedText = (span, indexOfTextToAppend) => {
    appendText(
      span,
      text.textToAppend[indexOfTextToAppend],
      charWriteDelay
    ).then(() => {
      p.classList.add("blink");
      setTimeout(() => {
        p.classList.remove("blink");
        deleteText(span, charDeleteDelay).then(() => {
          if (text.textToAppend.length > indexOfTextToAppend + 1) {
            writeAppendedText(span, indexOfTextToAppend + 1);
          } else {
            writeAppendedText(span, 0);
          }
        });
      }, pauseTime);
    });
  };

  const write = (text) => {
    if (text) {
      p.innerHTML += text[0];
      setTimeout(() => write(text.substring(1), p), charWriteDelay);
    } else {
      const span = document.createElement("span");
      span.classList.add("accent");
      p.appendChild(span);
      writeAppendedText(span, 0);
    }
  };

  write(text.mainText, p);
};

const appendText = (el, text, delay) =>
  new Promise((resolve) => {
    const write = (text) => {
      if (text) {
        el.innerHTML += text[0];
        setTimeout(() => write(text.substring(1), el), delay);
      } else {
        resolve(true);
      }
    };

    write(text);
  });

const deleteText = (el, delay) =>
  new Promise((resolve) => {
    const deleteChar = () => {
      if (el.innerHTML.length) {
        el.innerHTML = el.innerHTML.slice(0, -1);
        setTimeout(deleteChar, delay);
      } else {
        resolve(true);
      }
    };

    deleteChar();
  });

setTimeout(() => writeLines(text), 250);

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
