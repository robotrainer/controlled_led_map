const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config.json");
const SerialPort = require("serialport");
const citiesInfo = require("./db/citydata_Small.json");
const led = require("./db/led.json");
const citiesHistory = require("./db/citydata_Big.json");
const mineralsInfo = require("./db/IscopData.json");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const serialPort = new SerialPort(config.port, { baudRate: config.baudRate });

app.use("/", express.static("assets"));


io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("click district", (districtName) => {
    sendSignalArduino(districtName);
    socket.emit("click district", citiesInfo[districtName]);
    socket.emit("history", citiesHistory[districtName]);
  });

  socket.on("click mineral", (mineralName) => {
    sendSignalArduino(mineralName);
    socket.emit("click mineral", mineralsInfo[mineralName]);
  });

  socket.on("off leds", (off) => {
    sendSignalArduino(off);
  });

  socket.on("disconnect", () => {
    console.log("User disconnect");
  });

});

server.listen(config.PORT, () => {
  console.log(`listening on http://localhost:${config.PORT}`)
});

function sendSignalArduino(name) {
  const buf = new Buffer.from([1]);
  buf.writeUInt8(led[name], 0);
  console.log("signal: " + led[name]);
  serialPort.write(buf);
};