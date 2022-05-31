require("dotenv").config();

const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.ORIGIN || `http://localhost:4000`;

const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const chalk = require("chalk");

function onWebsocketConnection(socket) {
  console.info(`ID: ${socket.id} | ${chalk.green.bold("Connected")}`);

  socket.on("connected", () => {
    console.info(`ID: ${socket.id} | ${chalk.red.bold("Disconnected")}`);
  });

  socket.on("MESSAGE_CREATE", (payload) => {
    socket.emit(payload);
  });

  socket.on("CHANNEL_CREATE", (payload) => {
    socket.emit(payload);
  });
}

function startServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new socketio.Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
    })
  );

  io.on("connection", onWebsocketConnection);

  server.listen(PORT, () =>
    console.info(`Bloory Websocket App | PORT : ${chalk.yellow.bold(PORT)}`)
  );
}

startServer();
