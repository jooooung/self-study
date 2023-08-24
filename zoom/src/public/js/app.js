const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
} // 채팅방 입장 시 보이게

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
} // 입장 메세지 추가

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
} // 채팅방 입장

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
} // 메세지 입력

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => { 
  addMessage("someone joined!");
}); // 채팅방 입장 메세지

socket.on("bye", () => {
  addMessage("someone left!");
}); // 채팅방 퇴장 메세지

socket.on("new message", addMessage); // 메세지 출력