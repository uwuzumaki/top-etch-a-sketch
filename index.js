//Global Variables and Setters
let canvasSize = 40;
let root = document.documentElement;
let isClicked = false;
const setClicked = () => {
  isClicked = !isClicked;
};
window.addEventListener("mousedown", setClicked);
window.addEventListener("mouseup", setClicked);

//Main div
const container = document.querySelector(".container");

//Header
const headerContainer = document.createElement("div");
headerContainer.innerHTML = "Etch - A - Sketch";
headerContainer.classList.add("header-container");
container.appendChild(headerContainer);

//Etch container
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
  const tempBoxSize = Math.round((550 / size) * 1e2) / 1e2;
  const finalBoxSize =
    tempBoxSize * size >= 550
      ? tempBoxSize
      : Math.ceil((550 / size) * 1e1) / 1e1;
  root.style.setProperty("--square-size", finalBoxSize + "px");
  console.log(tempBoxSize, finalBoxSize);
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

//Options container
const optionsDiv = document.createElement("div");
optionsDiv.classList.add("options-container");
container.appendChild(optionsDiv);

const textDiv = document.createElement("div");
optionsDiv.appendChild(textDiv);
const textOption = document.createElement("input");
textOption.id = "text-input";
textOption.classList.add("input-outline");
textOption.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    if (isNaN(e.target.value)) {
      textOption.classList.add("error");
      e.target.value = "";
    } else if (e.target.value < 16 || e.target.value > 64) {
      textOption.classList.add("error");
      e.target.value = "";
    } else {
      createCanvas(e.target.value);
      e.target.value = "";
    }
  }
});

textOption.addEventListener("transitionend", (e) => {
  if (e.propertyName !== "transform") return;
  textOption.classList.remove("error");
});
textDiv.appendChild(textOption);

const sliderDiv = document.createElement("div");
sliderDiv.classList.add(".slider-container");
optionsDiv.appendChild(sliderDiv);
const sizeOption = document.createElement("input");
sizeOption.id = "slider";
sizeOption.setAttribute("type", "range");
sizeOption.setAttribute("min", "16");
sizeOption.setAttribute("max", "64");
sizeOption.setAttribute("value", "40");
sizeOption.addEventListener("input", (e) => {
  createCanvas(e.target.value);
  console.log(e.target.value);
});
sliderDiv.appendChild(sizeOption);
sliderDiv.insertAdjacentText("afterbegin", "16");
sliderDiv.insertAdjacentText("beforeend", "64");

const btn = document.createElement("button");
btn.innerHTML = "reset";
btn.addEventListener("click", (e) => {
  const square = document.querySelectorAll(".square");
  square.forEach((obj) => {
    obj.style.backgroundColor = "#fff";
  });
});
optionsDiv.appendChild(btn);
