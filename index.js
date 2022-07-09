let canvasSize = 40;
let root = document.documentElement;
root.style.setProperty("--etch-size", canvasSize);

let isClicked = false;
const setClicked = () => {
  isClicked = !isClicked;
};

window.addEventListener("mousedown", setClicked);
window.addEventListener("mouseup", setClicked);

const container = document.querySelector(".container");

const headerContainer = document.createElement("div");
headerContainer.innerHTML = "Etch - A - Sketch";
headerContainer.classList.add("header-container");
container.appendChild(headerContainer);

const etch = document.createElement("div");
etch.classList.add("etch-container");
container.appendChild(etch);

const colourSquare = (e) => {
  if (isClicked) {
    document.getElementById(e.target.id).style.backgroundColor = "#000000";
  }
};

const createCanvas = (size) => {
  etch.textContent = "";
  root.style.setProperty("--etch-size", size);
  for (let i = 0; i < size ** 2; i++) {
    const box = document.createElement("div");
    box.setAttribute("id", `box-${i}`);
    box.classList.add("square");
    box.addEventListener("mouseover", colourSquare);
    box.addEventListener("mousedown", (e) => {
      document.getElementById(e.target.id).style.backgroundColor = "#000000";
    });
    etch.appendChild(box);
  }
};

createCanvas(canvasSize);

const optionsDiv = document.createElement("div");
optionsDiv.classList.add("options-container");
container.appendChild(optionsDiv);

const sliderDiv = document.createElement("div");
sliderDiv.classList.add(".slider-container");
optionsDiv.appendChild(sliderDiv);
const sizeOption = document.createElement("input");
sizeOption.setAttribute("type", "range");
sizeOption.setAttribute("min", "16");
sizeOption.setAttribute("max", "64");
sizeOption.setAttribute("value", "40");
sizeOption.addEventListener("input", (e) => {
  createCanvas(e.target.value);
  console.log(e.target.value);
});
sliderDiv.appendChild(sizeOption);

const square = document.querySelectorAll(".square");
const btn = document.createElement("button");
btn.innerHTML = "reset";
btn.addEventListener("click", (e) => {
  square.forEach((obj) => {
    obj.style.backgroundColor = "#fff";
  });
});
optionsDiv.appendChild(btn);
