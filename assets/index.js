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
const back = document.querySelector(".back");
const info = document.querySelector(".map__info");
const cityItemsButtons = document.querySelector(".city__item__buttons");
const cityItemText = document.querySelector(".city__item__text");
const cityItemInfo = document.querySelector(".city__item__info");
const cityItemLogo = document.querySelector(".city__item__logo");
const cityItemName = document.querySelector(".city__item__name");
const cityItemHeading = document.querySelector(".city__item__heading");
const cityItemButton = document.querySelectorAll(".city__item__button");
const cityItemHistory = document.querySelector(".city__item__history");
const mapCitys = document.querySelectorAll(".map__city");

button.forEach(b => {
  b.addEventListener("click", function () {
    let districtName = this.value;
    let dataName = this.getAttribute("data-name");

    socket.emit("click district", ledCity[`${dataName}`]);

    districtItems.style.display = "none";
    home.classList.remove("hidden");
    info.classList.add("hidden");
    document.body.style.backgroundImage = "url(images/BGpointsHalf.png)";
    cityItemsButtons.style.display = "flex";
    cityItemText.classList.remove("hidden");
    cityItemLogo.src = `./images/logo/${dataName}.svg`;
    cityItemName.textContent = districtName;
    cityItemInfo.classList.remove("hidden");
    document.querySelector(`.${dataName}`).style.fontSize = "18px";
  });
});

socket.on("click district", (info) => {
  const cityInfo = Object.values(info);
  cityInfo.forEach(text => {
    let p = document.createElement("p");
    cityItemText.appendChild(p);
    p.textContent = text;
  });
});

socket.on("history", (history) => {
  const cityHistory = Object.values(history);
  if (cityHistory.length == 0) {
    document.querySelector(".history").classList.add("hidden");
  } else {
    document.querySelector(".history").classList.remove("hidden");
  }
  cityHistory.forEach(text => {
    let p = document.createElement("p");
    cityItemHistory.appendChild(p);
    p.textContent = text;
  });
});

home.addEventListener("click", () => {
  socket.emit("click district", ledCity.off);
  cityItemText.innerHTML = "";
  cityItemHistory.innerHTML = "";
  districtItems.style.display = "flex";
  home.classList.add("hidden");
  info.classList.remove("hidden");
  document.body.style.backgroundImage = "url(images/BGpoints.png)";
  cityItemsButtons.style.display = "none";
  cityItemText.classList.add("hidden");
  cityItemInfo.classList.add("hidden");
  mapCitys.forEach(city => {
    city.style.fontSize = "12px";
  });
  cityItemHeading.classList.add("hidden");
  cityItemHistory.classList.add("hidden");
  document.querySelector(".city__item__gallery").style.display = "none";
  back.classList.add("hidden");
});

cityItemButton.forEach(b => {
  b.addEventListener("click", function () {
    const heading = this.value;

    if (heading == "ИСТОРИЧЕСКАЯ СПРАВКА") {
      cityItemHistory.classList.remove("hidden");
    }

    if (heading == "ФОТОАЛЬБОМ") {
      document.querySelector(".city__item__gallery").style.display = "grid";
    }

    cityItemHeading.textContent = heading;
    cityItemHeading.classList.remove("hidden");
    cityItemsButtons.style.display = "none";
    cityItemText.classList.add("hidden");
    back.classList.remove("hidden");
  });
});

back.addEventListener("click", () => {
  back.classList.add("hidden");
  cityItemsButtons.style.display = "flex";
  cityItemHeading.classList.add("hidden");
  cityItemText.classList.remove("hidden");
  cityItemHistory.classList.add("hidden");
  document.querySelector(".city__item__gallery").style.display = "none";
});
