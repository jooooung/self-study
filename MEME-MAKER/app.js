const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = [
  "#1abc9c",
  "#2ecc71",
  "#9b59b6",
  "#8e44ad",
  "#d35400",
  "#bdc3c7"
]

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;

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
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

// 선 그리기
// function mousemove(event) {
//   ctx.beginPath();
//   ctx.moveTo(0,0);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }
// canvas.addEventListener("mousemove", mousemove);

// 집 만들기
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.lineWidth = 2;
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();

// 사람만들기
// ctx.fillRect(210 - 40, 200, 15, 100);
// ctx.fillRect(350 - 40, 200, 15, 100);
// ctx.fillRect(260 - 40, 200, 60, 200);

// ctx.arc(250, 150, 50, 0, 2*Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(230, 130, 8, Math.PI, 2 * Math.PI);
// ctx.arc(270, 130, 8, Math.PI, 2 * Math.PI);
// ctx.fill();


