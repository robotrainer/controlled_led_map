const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config.json");
const SerialPort = require("serialport");
const citiesInfo = require("./db/citydata_Small.json");
const ledCity = require("./db/ledCity.json");
const citiesHistory = require("./db/citydata_Big.json");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const serialPort = new SerialPort(config.port, { baudRate: config.baudRate });

app.use("/", express.static("assets"));


io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("click district", (districtName) => {
    const buf = new Buffer.from([1]);
    buf.writeUInt8(ledCity[districtName], 0);
    console.log("signal: " + ledCity[districtName]);
    serialPort.write(buf);

    if (districtName != "off") {
      socket.emit("click district", citiesInfo[districtName]);
      socket.emit("history", citiesHistory[districtName]);
    }
  });

  socket.on("click mineral", mineralName => {
    console.log(mineralName);
  });

  socket.on("disconnect", () => {
    console.log("User disconnect");
  });

});

server.listen(config.PORT, () => {
  console.log(`listening on http://localhost:${config.PORT}`)
});