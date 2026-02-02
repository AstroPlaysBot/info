const boxContents = [
  "Kasten 1",
  "Kasten 2",
  "Kasten 3",
  "Kasten 4",
  "Kasten 5",
  "Kasten 6"
];

let currentIndex = 0;
const boxesDiv = document.getElementById("boxes");

function renderBoxes() {
  boxesDiv.innerHTML = "";
  
  // Zeige 4 Kästen gleichzeitig
  for (let i = 0; i < 4; i++) {
    const index = (currentIndex + i) % boxContents.length;
    const box = document.createElement("div");
    box.className = "box";
    box.textContent = boxContents[index];
    boxesDiv.appendChild(box);
  }
}

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + boxContents.length) % boxContents.length;
  renderBoxes();
});

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % boxContents.length;
  renderBoxes();
});

// Initial render
renderBoxes();
