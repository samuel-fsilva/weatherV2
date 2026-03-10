let card = document.getElementById("card");
let animation;

function getElem() {
  return [
    document.getElementById("weather-display"),
    document.getElementById("condition-display"),
  ];
}

function setBackground(condition, isDay) {
  backgrounds.clearAll();
  insertIcon.clear();
  if (conditions.isCloudy(condition)) {
    backgrounds.cloudy();
  } else if (conditions.isSunny(condition)) {
    backgrounds.sunny(isDay);
  } else if (conditions.isRainy(condition)) {
    backgrounds.rainy();
  } else if (conditions.isSnowy(condition)) {
    backgrounds.snowy();
  }
}

let backgrounds = {
  cloudy: () => {
    card.style.background =
      "linear-gradient(180deg,rgb(206, 206, 206) 0%, rgba(112, 112, 112, 1) 100%)";
    cityInput.parentElement.style.borderColor = "white";
    cityInput.style.borderColor = "white";
    cityInput.classList.add("change-placeholder");
    insertIcon.clouds();
  },
  sunny: (i) => {
    if (i) {
      card.style.background =
        "linear-gradient(180deg,rgb(103, 199, 255) 0%, rgba(0, 82, 247, 1) 100%)";
      insertIcon.sun();
    } else {
      card.style.background =
        "linear-gradient(180deg,rgb(0, 4, 16) 0%, rgb(17, 5, 47) 100%)";
      insertIcon.moon();
    }
  },
  rainy: () => {
    card.style.background =
      "linear-gradient(180deg,rgba(102, 138, 212, 1) 0%, rgb(111, 132, 173) 100%)";
    insertIcon.rain();
  },
  snowy: () => {
    card.style.background =
      "linear-gradient(180deg,rgb(229, 231, 240) 0%, rgb(209, 210, 216) 100%)";
    cityInput.parentElement.style.borderColor = "black";
    cityInput.style.borderColor = "black";
    cityInput.style.color = "black";
    submitInput.firstElementChild.style.filter = "invert(100%)";

    let textElems = getElem();
    for (let i = 0; i < textElems.length; i++) {
      textElems[i].style.color = "black";
    }
  },
  clearAll: () => {
    card.style.background = "";
    cityInput.parentElement.style.borderColor = "";
    cityInput.style.borderColor = "";
    cityInput.style.color = "";
    cityInput.className = "";
    submitInput.firstElementChild.style.filter = "";

    let textElems = getElem();
    for (let i = 0; i < textElems.length; i++) {
      textElems[i].style.color = "";
    }
  },
};

let conditions = {
  isCloudy: (c) => {
    return (
      c.includes("nublado") ||
      c == "Encoberto" ||
      c.includes("Nublado") ||
      c.includes("Nevoeiro") ||
      c.includes("Névoa") ||
      c.includes("nevoeiro") ||
      c.includes("névoa") ||
      c.includes("Neblina")
    );
  },
  isSunny: (c) => {
    return c.includes("limpo") || c.includes("Sol");
  },
  isRainy: (c) => {
    return (
      c.includes("Aguaceiros") ||
      c.includes("Chuv") ||
      c.includes("chuv") ||
      c.includes("trovoada")
    );
  },
  isSnowy: (c) => {
    return (
      c.includes("neve") ||
      c.includes("Neve") ||
      c.includes("Nevasca") ||
      c.includes("nevasca")
    );
  },
};

let insertIcon = {
  sun: () => {
    let banner = createIconsBanner();
    banner.className = "sunny-banner";

    let sun = document.createElement("img");
    sun.src = "images/sun.svg";
    sun.setAttribute("id", "sun");

    sun.style.height = `${parseInt(window.getComputedStyle(card).width)}px`;
    sun.style.bottom = `${(parseInt(window.getComputedStyle(card).width) * 2) / 5}px`;
    sun.style.right = `${(parseInt(window.getComputedStyle(card).width) * 2) / 5}px`;
    sun.style.rotate = `${0}deg`;

    let rotationDeg = 0;
    animation = setInterval(() => {
      sun.style.rotate = `${rotationDeg}deg`;
      rotationDeg++;
    }, 50);
    banner.appendChild(sun);
  },
  clouds: () => {
    let banner = createIconsBanner();
    banner.className = "cloudy-banner";

    let cloudIcons = [
      document.createElement("img"),
      document.createElement("img"),
      document.createElement("img"),
    ];
    for (let i = 0; i < cloudIcons.length; i++) {
      cloudIcons[i].setAttribute("id", `cloud-icon-${i}`);
      cloudIcons[i].setAttribute("class", `cloud-icon`);
      cloudIcons[i].src = "images/cloudy.svg";
      banner.appendChild(cloudIcons[i]);
      if ((i + 1) % 2 == 1) {
        cloudIcons[i].style.left = window.getComputedStyle(card).width;
      } else {
        cloudIcons[i].style.right = window.getComputedStyle(
          cloudIcons[i - 1],
        ).height;
      }
    }

    const speed = 2;
    const cloud1left = parseInt(window.getComputedStyle(cloudIcons[0]).left);
    const cloud2left = parseInt(window.getComputedStyle(cloudIcons[1]).left);
    const timeUntilBack = 200;
    let turningBack = false;

    animation = setInterval(() => {
      if (
        parseInt(window.getComputedStyle(cloudIcons[0]).left) >
          cloud2left - timeUntilBack &&
        !turningBack
      ) {
        cloudIcons[0].style.left = `${parseInt(window.getComputedStyle(cloudIcons[0]).left) - speed}px`;
        cloudIcons[1].style.left = `${parseInt(window.getComputedStyle(cloudIcons[1]).left) + speed}px`;
        cloudIcons[2].style.left = `${parseInt(window.getComputedStyle(cloudIcons[2]).left) - speed}px`;
      } else {
        turningBack = true;
      }

      if (
        parseInt(window.getComputedStyle(cloudIcons[0]).left) <
          cloud1left + timeUntilBack &&
        turningBack
      ) {
        cloudIcons[0].style.left = `${parseInt(window.getComputedStyle(cloudIcons[0]).left) + speed}px`;
        cloudIcons[1].style.left = `${parseInt(window.getComputedStyle(cloudIcons[1]).left) - speed}px`;
        cloudIcons[2].style.left = `${parseInt(window.getComputedStyle(cloudIcons[2]).left) + speed}px`;
      } else {
        turningBack = false;
      }
    }, 25);
  },
  moon: () => {
    let banner = createIconsBanner();
    banner.className = "night-banner";

    let moon = document.createElement("img");
    moon.src = "images/moon.svg";
    moon.setAttribute("id", "moon");

    moon.style.height = `${parseInt(window.getComputedStyle(card).width) * 0.7}px`;
    //moon.style.bottom = `${parseInt(window.getComputedStyle(card).width) * 0.1}px`;

    banner.appendChild(moon);
  },
  rain: () => {
    let banner = createIconsBanner();
    banner.className = "rainy-banner";
    let rainIcons = [];

    let randomFactor = 250;

    for (let i = 0; i < 4; i++) {
      let rainIcon = document.createElement("img");
      rainIcon.src = "images/rain-svgrepo-com.svg";
      rainIcon.className = "rain-icons";
      rainIcon.setAttribute("id", `rain-icon-${i}`);
      banner.appendChild(rainIcon);
      rainIcons.push(rainIcon);
      rainIcon.style.top = `${(parseInt(window.getComputedStyle(rainIcon).height) + randomFactor) * -1 + Math.floor(Math.floor(Math.random() * randomFactor) - randomFactor / 2)}px`;
    }

    let highestIcon = whichIsTheHighest(rainIcons);

    animation = setInterval(() => {
      if (
        parseInt(window.getComputedStyle(highestIcon).top) <
        parseInt(window.getComputedStyle(banner).height)
      ) {
        for (let i = 0; i < rainIcons.length; i++) {
          rainIcons[i].style.top =
            `${parseInt(window.getComputedStyle(rainIcons[i]).top) + 3}px`;
        }
      } else {
        for (let i = rainIcons.length - 1; i > -1; i--) {
          rainIcons[i].style.top =
            `${parseInt(window.getComputedStyle(rainIcons[i]).height) * -1 + Math.floor(Math.floor(Math.random() * randomFactor) - randomFactor / 2)}px`;
          highestIcon = whichIsTheHighest(rainIcons);
        }
      }
    }, 1);
    function whichIsTheHighest(icons) {
      let positions = [];
      for (let i = 0; i < icons.length; i++) {
        positions.push([
          parseInt(window.getComputedStyle(icons[i]).top),
          icons[i].id,
        ]);
      }

      positions.sort((a, b) => a[0] - b[0]);
      return document.getElementById(positions[0][1]);
    }
  },
  clear: () => {
    if (document.getElementById("banner") != null) {
      document.getElementById("banner").remove();
    }
    clearInterval(animation);
  },
};

function createIconsBanner() {
  let banner = document.createElement("div");
  banner.setAttribute("id", "banner");
  card.appendChild(banner);

  let cardChilds = card.children;
  for (let i = cardChilds.length - 1; i > -1; i--) {
    cardChilds[i].style.position = "relative";
    cardChilds[i].style.zIndex = 2 - i;
  }

  return banner;
}

function deniedCard() {
  let elems = getElem();
  clearCard();
  card.className = "denied-card";
  elems[1].textContent = "Não foi possível obter sua localização";
}

function loadingCard() {
  clearCard();
  card.className = "loading-card";
}

function clearCard() {
  card.className = "";
}
function errorShow() {
  let elems = getElem();
  elems[0].innerHTML = "--°C";
  elems[1].innerHTML = "Erro ao encontrar o local solicitado";
  backgrounds.clearAll()
  loadingCard()
}
