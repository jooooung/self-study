const modeBtn = document.getElementById("mode-btn");  // 그리기모드
const destroyBtn = document.getElementById("destroy-btn");  // 전체지우기
const eraserBtn = document.getElementById("eraser-btn");  // 지우개
const colorOptions = Array.from(  // 색 옵션 배열
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color"); 
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const colors = [
  "#1abc9c",
  "#2ecc71",
  "#9b59b6",
  "#8e44ad",
  "#d35400",
  "#bdc3c7"
]

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onMouseDown() {
  isPainting = true;  
}
function cancelPainting() {
  isPainting = false;
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color
  ctx.strokeStyle= colorValue;
  ctx.fillStyle= colorValue;
  color.value = colorValue;
}

function onModeClick(event) {
  if(isFilling){
    isFilling = false;
    modeBtn.innerText = "Fill";
  }else{
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if(isFilling){
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  modeBtn.innerText = "Fill";
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);


colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);