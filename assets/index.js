let socket = io();
let button_on_ig = 1;
let button_on_yay = 2;

const button = document.querySelectorAll(".button__district");
const district = document.querySelectorAll(".text__district");
const home = document.querySelector(".home");

home.addEventListener("click", function () {
  socket.emit("click district", 0);
});

button.forEach(b => {
  b.addEventListener("click", function () {
    let districtName = this.value;

    if (districtName == "КЕМЕРОВО") {
      socket.emit("click district", button_on_ig);
    }

    if (districtName == "ЛЕНИНСК-КУЗНЕЦКИЙ") {
      socket.emit("click district", button_on_yay);
    }

    button.forEach(b => {
      b.classList.toggle("hidden");
    });
    home.classList.toggle("hidden");
  });
});

home.addEventListener("click", () => {
  button.forEach(b => {
    b.classList.toggle("hidden");
  });
  home.classList.toggle("hidden");
});

district.forEach(d => {
  d.addEventListener("click", function () {
    // const active = Object.values(this.classList).includes("active");
    const districtName = this.getAttribute("data-title");

    // if (active) {
    //   this.classList.remove("active");
    // } else {
    //   district.forEach(d => {
    //     d.classList.remove("active");
    //   });
    //   this.classList.add("active");
    // }

    if (districtName == "Ижморский") {
      socket.emit("click district", button_on_ig);
      if (button_on_ig == 1) {
        button_on_ig = 11;
      } else {
        button_on_ig = 1;
      }
    }

    if (districtName == "Яйский") {
      socket.emit("click district", button_on_yay);
      if (button_on_yay == 2) {
        button_on_yay = 22;
      } else {
        button_on_yay = 2;
      }
    }

  });
});