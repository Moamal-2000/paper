"use strict";

const paperContent = document.querySelector(".paper .content");
const dotsContainer = document.querySelector(".paper .dots");
const saveButton = document.querySelector("#save-button");
const clearButton = document.querySelector("#clear-button");
const savedMessage = document.querySelector("#save-message");



let isMsgActive = false;
let paperData = []
const paperDataLocal = localStorage.getItem("paper-data")
if (paperDataLocal) {
  paperData = JSON.parse(paperDataLocal)
}



function createPaperInputs(num) {
  for (let i = 0; i < num; i++) {
    const inp = document.createElement("input");
    inp.type = "text";
    inp.dir = "auto";
    paperContent.appendChild(inp);
  }

  const Inputs = document.querySelectorAll(".paper .content input");

  Inputs.forEach((inp, i) => handleInput(inp, i, Inputs, paperData[i]));
}
createPaperInputs(13);



function handleInput(inp, i, Inputs, paperData) {
  const nextInp = Inputs[i + 1];
  const prevInp = Inputs[i - 1];


  if (paperData?.val) inp.value = paperData.val

  inp.addEventListener("keydown", (e) => {
    const val = inp.value;
    const code = e.code.toLowerCase();
    const isEnterClicked = code === "enter" && nextInp;
    const isBackspaceClicked = code === "backspace" && prevInp && val === "";

    if (isEnterClicked) {
      nextInp.focus();
      e.preventDefault();
    }

    if (isBackspaceClicked) {
      prevInp.focus();
      e.preventDefault();
    }
  });
}



function createPaperDots(num) {
  for (let i = 0; i < num; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);
  }
}
createPaperDots(18);



function handleSaveButton() {
  const paperInputs = document.querySelectorAll(".paper .content input")

  const inputsData = []

  paperInputs.forEach(inp => inputsData.push({val: inp.value}));

  localStorage.setItem("paper-data", JSON.stringify(inputsData));

  activeMsg("Saved Successfully!")
}



function handleClearButton() {
  const paperInputs = document.querySelectorAll(".paper .content input")

  localStorage.removeItem("paper-data")
  paperInputs.forEach(inp => inp.value = "")

  activeMsg("Cleared Successfully!")
}



function activeMsg(text) {
  if (isMsgActive) return
  isMsgActive = true

  const p = savedMessage.children[0]
  p.textContent = text
  savedMessage.classList.add("active")
  setTimeout(() => {
    savedMessage.classList.remove("active")
    setTimeout(() => isMsgActive = false, 500);
  }, 3000);
}



saveButton.addEventListener("click", () => handleSaveButton())
clearButton.addEventListener("click", () => handleClearButton())