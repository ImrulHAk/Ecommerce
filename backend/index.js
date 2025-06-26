const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // You may restrict this
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

const port = process.env.PORT;
const route = require("./route");
const dbconnect = require("./config/db");

dbconnect();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(route);

// Socket logic
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("update-cart", (userId) => {
    // Notify all clients about cart update
    io.emit(`cart-updated-${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Share socket globally if needed in routes/controllers
global.io = io;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
