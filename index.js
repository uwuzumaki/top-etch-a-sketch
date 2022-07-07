let isClicked = false;
const setClicked = () => {
  isClicked = !isClicked;
};

window.addEventListener("mousedown", setClicked);
window.addEventListener("mouseup", setClicked);

const container = document.querySelector(".container");

const etch = document.createElement("div");
etch.classList.add("etch-container");
container.appendChild(etch);

const colourSquare = (e) => {
  if (isClicked) {
    document.getElementById(e.target.id).style.backgroundColor = "green";
  }
};

for (let i = 0; i < 16 ** 2; i++) {
  const box = document.createElement("div");
  box.setAttribute("id", `box-${i}`);
  box.classList.add("square");
  box.addEventListener("mouseover", colourSquare);
  box.addEventListener("click", (e) => {
    document.getElementById(e.target.id).style.backgroundColor = "green";
  });
  etch.appendChild(box);
}

const square = document.querySelectorAll(".square");

const btn = document.createElement("button");
btn.innerHTML = "reset";
btn.addEventListener("click", (e) => {
  square.forEach((obj) => {
    obj.style.backgroundColor = "aqua";
  });
});

container.appendChild(btn);
