const textArray = ["HTML", "CSS", "JAVASCRIPT", "REACTJS", "ANGULAR", "NODEJS", ".NET"];
const codeBox = document.getElementById("code-wrapper");

const writeLine = (text) =>
  new Promise((resolve) => {
    const el = document.createElement("p");
    // el.innerHTML = "> ";
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

const writeLines = (lines) => {
  lines.length &&
    writeLine(lines[0]).then(() => {
      lines.shift();
      writeLines(lines);
    });
};

writeLines(textArray);
