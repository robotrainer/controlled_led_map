let socket = io();

const ledCity = {
  "off": 100,
  "kemerovo": 0,
  "leninsk": 1,
  "jurga": 2,
  "belovo": 3,
  "berezovsky": 4,
  "gurievsk": 5,
  "kaltan": 6,
  "angero": 7,
  "kiselevsk": 8,
  "mariinsk": 9,
  "mezhdurechensk": 10,
  "promyshlennaya": 11,
  "novokuznetsk": 12,
  "osinniki": 13,
  "polysaevo": 14,
  "prokopyevsk": 15,
  "yashkino": 16,
  "taiga": 17,
  "tashtagol": 18,
  "topki": 19,
  "myski": 20,
  "sheregesh": 21
}

const button = document.querySelectorAll(".button__district");
const districtItems = document.querySelector(".button__districts");
const home = document.querySelector(".home");
const info = document.querySelector(".map__info");
const cityItemsButtons = document.querySelector(".city__item__buttons");
const cityItemText = document.querySelector(".city__item__text");

button.forEach(b => {
  b.addEventListener("click", function () {
    let districtName = this.value;

    if (districtName == "КЕМЕРОВО") {
      socket.emit("click district", ledCity.kemerovo);
    }

    if (districtName == "ЛЕНИНСК-КУЗНЕЦКИЙ") {
      socket.emit("click district", ledCity.leninsk);
    }

    districtItems.style.display = "none";
    home.classList.toggle("hidden");
    info.classList.toggle("hidden");
    document.body.style.backgroundImage = "url(images/BGpointsHalf.png)";
    cityItemsButtons.style.display = "flex";
    cityItemText.classList.toggle("hidden");
  });
});

socket.on("click district", (text) => {
  const src = Object.values(text);
  src.forEach(x => {
    let p = document.createElement("p");
    cityItemText.appendChild(p);
    p.textContent = x;
  });

});

home.addEventListener("click", () => {
  socket.emit("click district", ledCity.off);
  cityItemText.innerHTML = "";
  districtItems.style.display = "flex";
  home.classList.toggle("hidden");
  info.classList.toggle("hidden");
  document.body.style.backgroundImage = "url(images/BGpoints.png)";
  cityItemsButtons.style.display = "none";
  cityItemText.classList.toggle("hidden");

});


