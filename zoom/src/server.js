import http from "http";
import { Server } from "socket.io";
import express from "express";
import { instrument } from "@socket.io/admin-ui";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
  mode: "development",
});

wsServer.on("connection", socket => {
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
});

const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);

// // 채팅
// function publicRooms() {
//   const {
//     sockets: {
//       adapter: { sids, rooms },
//     },
//   } = wsServer;
//   const publicRooms = [];
//   rooms.forEach((_, key) => {
//     if (sids.get(key) === undefined) {
//       publicRooms.push(key);
//     }
//   });
//   return publicRooms;
// }

// function countRoom(roomName) {
//   return wsServer.sockets.adapter.rooms.get(roomName)?.size;
// }

// wsServer.on("connection", (socket) => {
//   socket["nickname"] = "Anon";
//   socket.onAny((event) => {
//     console.log(`Socket Event:${event}`);
//   });
//   socket.on("enter_room", (roomName, done) => {
//     socket.join(roomName);
//     done();
//     socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
//     wsServer.sockets.emit("room_change", publicRooms());
//   }); // 채팅방 입장 메세지
//   socket.on("disconnecting", () => {
//     socket.rooms.forEach((room) =>
//       socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
//     );
//   }); // 채팅방 퇴장 메세지
//   socket.on("disconnect", () => {
//     wsServer.sockets.emit("room_change", publicRooms());
//   });
//   socket.on("new message", (msg, room, done) => {
//     socket.to(room).emit("new message", `${socket.nickname}: ${msg}`);
//     done();
//   }); // 메세지 출력
//   socket.on("nickname", (nickname) => (socket["nickname"] = nickname)); // 닉네임
// });

// function onSocketClose() {
//   console.log("Disconnected from the Browser ❌");
// }
