const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketio = require("socket.io");

const io = socketio(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    credentials: true
  }
});

//Initialize the socket connection
io.on("connection", (socket) => {
  io.emit('message', 'Maxim Melnik');
  console.log('A user connected');
});

app.get('/', (req, res) => {
  res.send('backend route for web sockets');
})

server.listen(4000, (err) => {
  if(err) {
    console.log(err);
  }
});