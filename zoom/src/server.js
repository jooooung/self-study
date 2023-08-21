import http from "http";
import { WebSocketServer } from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

// http 서버
const server = http.createServer(app);
// webSocket 서버
const wss = new WebSocketServer({ server });

function handleConnection(socket){
  console.log(socket);
}

wss.on("connection", handleConnection)

server.listen(3000, handleListen);