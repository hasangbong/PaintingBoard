const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const eraser = document.getElementById("jsRemover");
const save = document.getElementById("jsSave");
const defaultColor = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = defaultColor;
ctx.strokeStyle = defaultColor;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(event) {
  painting = false;
}

function startPainting(event) {
  if (event.button === 0) {
    painting = true;
  }
}

function canvasColor() {
  if (mode.innerText === "PAINT") {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function canvasFilling(event) {
  if (mode.innerText === "PAINT") {
    ctx.fill();
  }
}

function handleRemove(event) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleModeChange() {
  if (mode.innerText === "PAINT") {
    filling = false;
    mode.innerText = "Fill";
  } else {
    mode.innerText = "Paint";
    painting = false;
  }
}

function handleRangeChange(event) {
  const range = event.target.value;
  ctx.lineWidth = range;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleCM(event) {
  event.preventDefault();
}

function canvasSave() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "drawing[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", canvasFilling);
  canvas.addEventListener("dblclick", canvasColor);
  canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeChange);
}
if (eraser) {
  eraser.addEventListener("click", handleRemove);
}
if (save) {
  save.addEventListener("click", canvasSave);
}
