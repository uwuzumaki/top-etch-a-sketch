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
  const radioOption = document.getElementsByName("brush");
  let selectedOption;
  for (let i = 0; i < radioOption.length; i++) {
    if (radioOption[i].checked) {
      selectedOption = radioOption[i].value;
    }
  }
  console.log(selectedOption);

  if (isClicked) {
    if (selectedOption === "rainbow") {
      document.getElementById(e.target.id).style.backgroundColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
    } else {
      document.getElementById(e.target.id).style.backgroundColor =
        document.querySelector(".invisible-button").value;
    }
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
  for (let i = 0; i < size ** 2; i++) {
    const box = document.createElement("div");
    box.setAttribute("id", `box-${i}`);
    box.classList.add("square");
    box.addEventListener("mouseover", colourSquare);
    box.addEventListener("mousedown", (e) => {
      const radioOption = document.getElementsByName("brush");
      let selectedOption;
      for (let i = 0; i < radioOption.length; i++) {
        if (radioOption[i].checked) {
          selectedOption = radioOption[i].value;
        }
      }
      if (selectedOption === "rainbow") {
        document.getElementById(e.target.id).style.backgroundColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
      } else {
        document.getElementById(e.target.id).style.backgroundColor =
          document.querySelector(".invisible-button").value;
      }
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
textDiv.classList.add("input-wrapper");
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

const centerOption = document.createElement("div");
centerOption.classList.add("colour-container");
optionsDiv.appendChild(centerOption);

const brushOne = document.createElement("input");
brushOne.type = "radio";
brushOne.name = "brush";
brushOne.id = "rainbow";
brushOne.value = "rainbow";
centerOption.appendChild(brushOne);
const brushOneLabel = document.createElement("label");
brushOneLabel.setAttribute("for", "rainbow");
brushOneLabel.insertAdjacentText("beforeend", "Rainbow");
centerOption.appendChild(brushOneLabel);

const brushTwo = document.createElement("input");
brushTwo.type = "radio";
brushTwo.name = "brush";
brushTwo.id = "colour-picker";
brushTwo.value = "colour-picker";
centerOption.appendChild(brushTwo);
const brushTwoLabel = document.createElement("label");
brushTwoLabel.id = "color-picker-label";
brushTwoLabel.setAttribute("for", "colour-picker");
brushTwoLabel.insertAdjacentText("beforeend", "Colour Picker");
centerOption.appendChild(brushTwoLabel);
brushTwo.addEventListener("click", (e) => {
  const colorPicker = document.querySelector(".invisible-button");
  colorPicker.click();
  document.querySelector(".sample-color").style.backgroundColor =
    colorPicker.value;
  console.log(colorPicker.value);
});

const invisColor = document.createElement("input");
invisColor.classList.add("invisible-button");
invisColor.type = "color";
centerOption.appendChild(invisColor);

const colorPickerValue = document.createElement("div");
colorPickerValue.classList.add("sample-color");
colorPickerValue.style.backgroundColor =
  document.querySelector(".invisible-button").value;
centerOption.appendChild(colorPickerValue);

// const sliderDiv = document.createElement("div");
// sliderDiv.classList.add(".slider-container");
// optionsDiv.appendChild(sliderDiv);
// const sizeOption = document.createElement("input");
// sizeOption.id = "slider";
// sizeOption.setAttribute("type", "range");
// sizeOption.setAttribute("min", "16");
// sizeOption.setAttribute("max", "64");
// sizeOption.setAttribute("value", "40");
// sizeOption.addEventListener("input", (e) => {
//   createCanvas(e.target.value);
// });
// sliderDiv.appendChild(sizeOption);
// sliderDiv.insertAdjacentText("afterbegin", "16");
// sliderDiv.insertAdjacentText("beforeend", "64");

const resetDiv = document.createElement("div");
resetDiv.classList.add("reset-container");
optionsDiv.appendChild(resetDiv);
const btn = document.createElement("button");
btn.innerHTML = "reset";
btn.addEventListener("click", (e) => {
  const square = document.querySelectorAll(".square");
  square.forEach((obj) => {
    obj.style.backgroundColor = "#fff";
  });
});
resetDiv.appendChild(btn);
