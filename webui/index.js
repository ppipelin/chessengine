const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("./"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get("/script.js", (req, res) => {
	res.sendFile(__dirname + "/script.js");
});

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("disconnect", () => {
		console.log("a user disconnected");
	});

	socket.on("drop", (piece, source, target) => {
		console.log("drop: ", piece, source, target);
	});

	socket.on("cpp_move", (move) => {
		console.log("forwarding move ", move);
		socket.broadcast.emit("move", move);
	});
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});
