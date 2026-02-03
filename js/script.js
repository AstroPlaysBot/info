const boxContents = [
  "Kasten 1",
  "Kasten 2",
  "Kasten 3",
  "Kasten 4",
  "Kasten 5",
  "Kasten 6"
];

const boxes = document.getElementById("boxes");
let index = 0;

/* Boxen erzeugen */
boxContents.forEach((text, i) => {
  const box = document.createElement("div");
  box.classList.add("box");

  if (i % 3 === 0) box.classList.add("small");
  if (i % 3 === 1) box.classList.add("medium");
  if (i % 3 === 2) box.classList.add("large");

  box.textContent = text;
  boxes.appendChild(box);
});

/* Slide-Logik */
const step = 270; // Breite + Gap

document.getElementById("prev").addEventListener("click", () => {
  index = Math.max(0, index - 1);
  boxes.style.transform = `translateX(-${index * step}px)`;
});

document.getElementById("next").addEventListener("click", () => {
  index = Math.min(boxContents.length - 3, index + 1);
  boxes.style.transform = `translateX(-${index * step}px)`;
});
