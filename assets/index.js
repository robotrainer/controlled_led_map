let socket = io();
let button_on = 1;

const button = document.getElementById("button");
const district = document.querySelectorAll(".district");

district.forEach(d => {
  d.addEventListener("click", function () {
    const active = Object.values(this.classList).includes("active");
    const districtName = this.getAttribute("data-title");

    if (active) {
      this.classList.remove("active");
    } else {
      district.forEach(d => {
        d.classList.remove("active");
      });
      this.classList.add("active");
    }

    if (districtName == "Ижморский") {
      socket.emit("click district", button_on);
      if (button_on) {
        button_on = 0;
      } else {
        button_on = 1;
      }
    }

  });
});