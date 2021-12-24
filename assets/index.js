let socket = io();

const home = document.querySelector(".home");
const back = document.querySelector(".back");
const info = document.querySelector(".map__info");
const buttonDistict = document.querySelectorAll(".button__district");
const buttonMineral = document.querySelectorAll(".button__mineral");
const buttonMiracle = document.querySelectorAll(".button__miracle");
const districtItems = document.querySelector(".button__districts");
const mineralItems = document.querySelector(".button__minerals");
const miracleItems = document.querySelector(".button__miracles");
const cityItemButtons = document.querySelector(".city__item__buttons");
const cityItemText = document.querySelector(".city__item__text");
const cityItemInfo = document.querySelector(".city__item__info");
const cityItemLogo = document.querySelector(".city__item__logo");
const cityItemName = document.querySelector(".city__item__name");
const cityItemHeading = document.querySelector(".city__item__heading");
const cityItemButton = document.querySelectorAll(".city__item__button");
const cityItemHistory = document.querySelector(".city__item__history");
const cityItemGallery = document.querySelector(".city__item__gallery");
const cityItemVideo = document.querySelector(".city__item__video");
const mineralItemInfo = document.querySelector(".mineral__item__info");
const mineralItemName = document.querySelector(".mineral__item__name");
const mineralItemText = document.querySelector(".mineral__item__text");
const miracleItemInfo = document.querySelector(".miracle__item__info");
const miracleItemName = document.querySelector(".miracle__item__name");
const miracleItemText = document.querySelector(".miracle__item__text");
const miracleItemHeading = document.querySelector(".miracle__item__heading");
const miracleItemButtons = document.querySelector(".miracle__item__buttons");
const miracleItemBotton = document.querySelectorAll(".miracle__item__button");
const miracleItemGallery = document.querySelector(".miracle__item__gallery");
const miracleItemVideo = document.querySelector(".miracle__item__video");
const mapCities = document.querySelectorAll(".map__city");
const cities = document.querySelector(".cities");
const ellipses = document.querySelector(".ellipses");
const minerals = document.querySelector(".minerals");
const miracles = document.querySelector(".miracles");
const headerSwitch = document.querySelectorAll(".header__switch");

headerSwitch.forEach(s => {
  s.addEventListener("click", () => {
    buttonHome();
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

let cityName = "";
buttonDistict.forEach(button => {
  button.addEventListener("click", function () {
    playSound();
    const districtName = this.value;
    cityName = this.getAttribute("data-name");

    socket.emit("click district", cityName);

    districtItems.style.display = "none";
    home.classList.remove("hidden");
    info.classList.add("hidden");
    document.body.style.backgroundImage = "url(images/BGpointsHalf.png)";
    cityItemButtons.style.display = "flex";
    cityItemText.classList.remove("hidden");
    cityItemLogo.src = `./images/logo/${cityName}.png`;
    cityItemName.textContent = districtName;
    cityItemInfo.classList.remove("hidden");
    cityItemVideo.querySelector("video").src = `./videos/cities/${cityName}.mp4`;
    document.querySelector(`.${cityName}`).style.fontSize = "18px";
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

cityItemButton.forEach(button => {
  button.addEventListener("click", function () {
    playSound();
    const heading = this.value;

    if (heading == "ИСТОРИЧЕСКАЯ СПРАВКА") {
      cityItemHistory.classList.remove("hidden");
    }

    if (heading == "ФОТОАЛЬБОМ") {
      cityItemGallery.style.display = "grid";
      const cityPictures = cityItemGallery.querySelectorAll(`[name="${cityName}"]`);
      cityPictures.forEach(picture => {
        picture.classList.remove("hidden");
      });
    }

    if (heading == "ВИДЕО-ВИЗИТКА ГОРОДА") {
      cityItemVideo.classList.remove("hidden");
    }

    cityItemHeading.textContent = heading;
    cityItemHeading.classList.remove("hidden");
    cityItemButtons.style.display = "none";
    cityItemText.classList.add("hidden");
    back.classList.remove("hidden");
  });
  // button.addEventListener("click", playSound);
});

let iconMineral = "";
buttonMineral.forEach(button => {
  button.addEventListener("click", function () {
    playSound();
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

let dName = "";
buttonMiracle.forEach(button => {
  button.addEventListener("click", function () {
    playSound();
    const miracleName = this.value;
    dName = this.getAttribute("data-name");
    const width = document.querySelector(`.${dName}`).offsetWidth;
    const height = document.querySelector(`.${dName}`).offsetHeight;

    socket.emit("click miracle", dName);

    miracleItems.style.display = "none";
    home.classList.remove("hidden");
    info.classList.add("hidden");
    document.body.style.backgroundImage = "url(images/BGpointsHalf.png)";
    document.querySelector(`.${dName}`).style.width = String(width * 1.5) + "px";
    document.querySelector(`.${dName}`).style.height = String(height * 1.5) + "px";
    miracleItemInfo.classList.remove("hidden");
    miracleItemName.textContent = miracleName;
    miracleItemText.classList.remove("hidden");
    miracleItemButtons.style.display = "flex";
    if (dName == "writing") {
      document.querySelector(".disable.video").classList.add("miracle__item__button");
      document.querySelector(".disable.video").classList.remove("disable");
      document.querySelector(".miracle__item__button.video").disabled = false;
      miracleItemVideo.querySelector("video").src = `./videos/miracles/${dName}.mp4`;
    } else {
      document.querySelector(".miracle__item__button.video").disabled = true;
      document.querySelector(".miracle__item__button.video").classList.add("disable");
      document.querySelector(".miracle__item__button.video").classList.remove("miracle__item__button");
    }
  });
});

socket.on("click miracle", (info) => {
  addInfo(miracleItemText, info);
});

miracleItemBotton.forEach(button => {
  button.addEventListener("click", function () {
    playSound();
    const heading = this.value;

    if (heading == "ФОТОАЛЬБОМ") {
      miracleItemGallery.style.display = "grid";
      const miraclePictures = miracleItemGallery.querySelectorAll(`[name="${dName}"]`);
      miraclePictures.forEach(picture => {
        picture.classList.remove("hidden");
      });
    }

    if (heading == "ВИДЕО-ВИЗИТКА") {
      miracleItemVideo.classList.remove("hidden");
    }

    miracleItemHeading.textContent = heading;
    miracleItemHeading.classList.remove("hidden");
    miracleItemButtons.style.display = "none";
    miracleItemText.classList.add("hidden");
    back.classList.remove("hidden");
  });
});

function buttonHome() {
  playSound();
  socket.emit("off leds", "off");
  home.classList.add("hidden");
  info.classList.remove("hidden");
  document.body.style.backgroundImage = "url(images/BGpoints.png)";

  const underline = document.querySelector(".underline");
  if (underline.textContent == "ГОРОДА КУЗБАССА") {
    cityItemHistory.innerHTML = "";
    districtItems.style.display = "flex";
    cityItemText.innerHTML = "";
    cityItemButtons.style.display = "none";
    cityItemText.classList.add("hidden");
    cityItemInfo.classList.add("hidden");
    mapCities.forEach(city => {
      city.style.fontSize = "12px";
    });
    cityItemHeading.classList.add("hidden");
    cityItemHistory.classList.add("hidden");
    cityItemGallery.style.display = "none";
    cityItemVideo.classList.add("hidden");
    const cityPictures = cityItemGallery.querySelectorAll(`[name="${cityName}"]`);
    cityPictures.forEach(picture => {
      picture.classList.add("hidden");
    });
    back.classList.add("hidden");
  } else if (underline.textContent == "ПОЛЕЗНЫЕ ИСКОПАЕМЫЕ") {
    mineralItems.style.display = "flex";
    if (iconMineral != "") {
      iconMineral.forEach(i => {
        i.style.width = "14px";
        i.style.height = "14px";
      });
    }
    mineralItemInfo.classList.add("hidden");
    mineralItemText.classList.add("hidden");
    mineralItemText.innerHTML = "";
  } else if (underline.textContent == "ЧУДЕСА КУЗБАССА") {
    if (dName != "") {
      const width = document.querySelector(`.${dName}`).offsetWidth;
      const height = document.querySelector(`.${dName}`).offsetHeight;
      document.querySelector(`.${dName}`).style.width = String(width / 1.5) + "px";
      document.querySelector(`.${dName}`).style.height = String(height / 1.5) + "px";

      const miraclePictures = miracleItemGallery.querySelectorAll(`[name="${dName}"]`);
      miraclePictures.forEach(picture => {
        picture.classList.add("hidden");
      });
    }

    miracleItems.style.display = "flex";
    miracleItemInfo.classList.add("hidden");
    miracleItemText.classList.add("hidden");
    miracleItemText.innerHTML = "";
    miracleItemButtons.style.display = "none";
    miracleItemHeading.classList.add("hidden");
    miracleItemGallery.style.display = "none";
    miracleItemVideo.classList.add("hidden");
    back.classList.add("hidden");
  }
}

home.addEventListener("click", buttonHome);

back.addEventListener("click", () => {
  playSound();
  back.classList.add("hidden");

  const underline = document.querySelector(".underline");
  if (underline.textContent == "ГОРОДА КУЗБАССА") {
    cityItemButtons.style.display = "flex";
    cityItemHeading.classList.add("hidden");
    cityItemText.classList.remove("hidden");
    cityItemHistory.classList.add("hidden");
    cityItemGallery.style.display = "none";
    cityItemVideo.classList.add("hidden");
  } else if (underline.textContent == "ЧУДЕСА КУЗБАССА") {
    miracleItemButtons.style.display = "flex";
    miracleItemHeading.classList.add("hidden");
    miracleItemText.classList.remove("hidden");
    miracleItemGallery.style.display = "none";
    miracleItemVideo.classList.add("hidden");
  }
});

function addInfo(domElem, getInfo) {
  const info = Object.values(getInfo);
  info.forEach(text => {
    let p = document.createElement("p");
    domElem.appendChild(p);
    p.textContent = text;
  });
}

function playSound() {
  let mySound = new Audio;
  mySound.src = "./sound/button2.mp3";
  mySound.play();
}