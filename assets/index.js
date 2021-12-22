let socket = io();

const home = document.querySelector(".home");
const back = document.querySelector(".back");
const info = document.querySelector(".map__info");
const buttonDistict = document.querySelectorAll(".button__district");
const buttonMineral = document.querySelectorAll(".button__mineral");
const districtItems = document.querySelector(".button__districts");
const mineralItems = document.querySelector(".button__minerals");
const miracleItems = document.querySelector(".button__miracles");
const cityItemsButtons = document.querySelector(".city__item__buttons");
const cityItemText = document.querySelector(".city__item__text");
const cityItemInfo = document.querySelector(".city__item__info");
const cityItemLogo = document.querySelector(".city__item__logo");
const cityItemName = document.querySelector(".city__item__name");
const cityItemHeading = document.querySelector(".city__item__heading");
const cityItemButton = document.querySelectorAll(".city__item__button");
const cityItemHistory = document.querySelector(".city__item__history");
const mineralItemInfo = document.querySelector(".mineral__item__info");
const mineralItemName = document.querySelector(".mineral__item__name");
const mineralItemText = document.querySelector(".mineral__item__text");
const mapCities = document.querySelectorAll(".map__city");
const cities = document.querySelector(".cities");
const ellipses = document.querySelector(".ellipses");
const minerals = document.querySelector(".minerals");
const miracles = document.querySelector(".miracles");
const headerSwitch = document.querySelectorAll(".header__switch");

headerSwitch.forEach(s => {
  s.addEventListener("click", () => {
    headerSwitch.forEach(s => {
      if (s.classList.value.includes("underline")) {
        s.classList.remove("underline");
      }
    });
    s.classList.add("underline");
    if (s.textContent == "ГОРОДА КУЗБАССА") {
      districtItems.style.display = "flex";
      mineralItems.style.display = "none";
      miracleItems.style.display = "none";
      cities.classList.remove("hidden");
      ellipses.classList.remove("hidden");
      minerals.classList.add("hidden");
      miracles.classList.add("hidden");
    } else if (s.textContent == "ПОЛЕЗНЫЕ ИСКОПАЕМЫЕ") {
      districtItems.style.display = "none";
      mineralItems.style.display = "flex";
      miracleItems.style.display = "none";
      cities.classList.add("hidden");
      ellipses.classList.add("hidden");
      minerals.classList.remove("hidden");
      miracles.classList.add("hidden");
    } else if (s.textContent == "ЧУДЕСА КУЗБАССА") {
      districtItems.style.display = "none";
      mineralItems.style.display = "none";
      miracleItems.style.display = "flex";
      cities.classList.add("hidden");
      ellipses.classList.add("hidden");
      minerals.classList.add("hidden");
      miracles.classList.remove("hidden");
    }
  });
});

buttonDistict.forEach(button => {
  button.addEventListener("click", function () {
    const districtName = this.value;
    const dataName = this.getAttribute("data-name");

    socket.emit("click district", dataName);

    districtItems.style.display = "none";
    home.classList.remove("hidden");
    info.classList.add("hidden");
    document.body.style.backgroundImage = "url(images/BGpointsHalf.png)";
    cityItemsButtons.style.display = "flex";
    cityItemText.classList.remove("hidden");
    cityItemLogo.src = `./images/logo/${dataName}.png`;
    cityItemName.textContent = districtName;
    cityItemInfo.classList.remove("hidden");
    document.querySelector("video").src = `./videos/${dataName}.mp4`;
    document.querySelector(`.${dataName}`).style.fontSize = "18px";
  });
});

socket.on("click district", (info) => {
  addInfo(cityItemText, info);
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

let iconMineral = "";
buttonMineral.forEach(button => {
  button.addEventListener("click", function () {
    const mineralName = this.value;
    const dataName = this.getAttribute("data-name");
    iconMineral = document.querySelectorAll(`.${dataName}`);

    socket.emit("click mineral", dataName);

    mineralItems.style.display = "none";
    home.classList.remove("hidden");
    info.classList.add("hidden");
    document.body.style.backgroundImage = "url(images/BGpointsHalf.png)";
    iconMineral.forEach(i => {
      i.style.width = "28px";
      i.style.height = "28px";
    });
    mineralItemInfo.classList.remove("hidden");
    mineralItemName.textContent = mineralName;
    mineralItemText.classList.remove("hidden");
  });
});

socket.on("click mineral", (info) => {
  addInfo(mineralItemText, info);
});

home.addEventListener("click", () => {
  const underline = document.querySelector(".underline");

  if (underline.textContent == "ГОРОДА КУЗБАССА") {
    socket.emit("off leds", "off");
    cityItemHistory.innerHTML = "";
    districtItems.style.display = "flex";
    cityItemText.innerHTML = "";
    cityItemsButtons.style.display = "none";
    cityItemText.classList.add("hidden");
    cityItemInfo.classList.add("hidden");
    mapCities.forEach(city => {
      city.style.fontSize = "12px";
    });
    cityItemHeading.classList.add("hidden");
    cityItemHistory.classList.add("hidden");
    document.querySelector(".city__item__gallery").style.display = "none";
    document.querySelector(".city__item__video").classList.add("hidden");
    back.classList.add("hidden");
  } else if (underline.textContent == "ПОЛЕЗНЫЕ ИСКОПАЕМЫЕ") {
    mineralItems.style.display = "flex";
    iconMineral.forEach(i => {
      i.style.width = "14px";
      i.style.height = "14px";
    });
    mineralItemInfo.classList.add("hidden");
    mineralItemText.classList.add("hidden");
    mineralItemText.innerHTML = "";
  }

  home.classList.add("hidden");
  info.classList.remove("hidden");
  document.body.style.backgroundImage = "url(images/BGpoints.png)";
});

cityItemButton.forEach(button => {
  button.addEventListener("click", function () {
    const heading = this.value;

    if (heading == "ИСТОРИЧЕСКАЯ СПРАВКА") {
      cityItemHistory.classList.remove("hidden");
    }

    if (heading == "ФОТОАЛЬБОМ") {
      document.querySelector(".city__item__gallery").style.display = "grid";
    }

    if (heading == "ВИДЕО-ВИЗИТКА ГОРОДА") {
      document.querySelector(".city__item__video").classList.remove("hidden");
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
  document.querySelector(".city__item__video").classList.add("hidden");
});

function addInfo(domElem, getInfo) {
  const info = Object.values(getInfo);
  info.forEach(text => {
    let p = document.createElement("p");
    domElem.appendChild(p);
    p.textContent = text;
  });
}