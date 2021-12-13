const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config.json");
const SerialPort = require("serialport");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const serialPort = new SerialPort(config.port, { baudRate: config.baudRate });

app.use("/", express.static("assets"));


io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("click district", (signal) => {
    const buf = new Buffer.from([1]);
    buf.writeUInt8(signal, 0);
    console.log("signal: " + signal);
    serialPort.write(buf);
  });
  socket.on("disconnect", () => {
    console.log("User disconnect");
  })
});

server.listen(config.PORT, () => {
  console.log(`listening on http://localhost:${config.PORT}`)
});