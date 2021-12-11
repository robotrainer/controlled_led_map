let socket = io();
let button_on = 1;

const button = document.getElementById("button");

button.addEventListener("click", buttonSend);

function buttonSend() {
  socket.emit("click button", button_on);
  if (button_on) {
    button_on = 0;
  } else {
    button_on = 1;
  }
};