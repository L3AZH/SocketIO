const express = require("express");
const { Socket } = require("socket.io");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", function (socket) {
  console.log("device connected: " + socket.id);
  //send data back to device which connected to server
  socket.emit("SocketID", "Your Socket ID is " + socket.id);
  //send data to another device except this device
  socket.broadcast.emit("NotiForAnotherDevice", "1 device had join server");
  socket.on("disconnect", function () {
    console.log("device with id: " + socket.id + " disconnect");
  });
  socket.on("Button Click", function (data) {
    console.log(data);
    //send data to all device include this device
    io.sockets.emit(
      "Server-Response-all",
      "Response form server for all device : " + data
    );
  });
});

app.get("/", function (req, res) {
  res.status(200).json({ msg: "hello world" });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
