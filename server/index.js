const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config.json");
const SerialPort = require("serialport");
const cityData = require("./db/citydata.json");
const ledCity = require("./db/ledCity.json");
const citiesHistory = require("./db/citieshistory.json");

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

    let cityInfo = new Object();
    let cityHistory = new Object();

    if (signal == ledCity.kemerovo) {
      cityInfo = cityData.kemerovo;
      cityHistory = citiesHistory.kemerovo;
    } else if (signal == ledCity.leninsk) {
      cityInfo = cityData.leninsk;
      cityHistory = citiesHistory.leninsk;
    } else if (signal == ledCity.novokuznetsk) {
      cityInfo = cityData.novokuznetsk;
      cityHistory = citiesHistory.novokuznetsk;
    } else if (signal = ledCity.promyshlennaya) {
      cityInfo = cityData.promyshlennaya;
      cityHistory = citiesHistory.promyshlennaya;
    }

    if (signal != 100) {
      socket.emit("click district", cityInfo);
      socket.emit("history", cityHistory);
    }
  });

  socket.on("history", (cityName) => {
    console.log(cityName);
  });

  socket.on("disconnect", () => {
    console.log("User disconnect");
  });

});

server.listen(config.PORT, () => {
  console.log(`listening on http://localhost:${config.PORT}`)
});