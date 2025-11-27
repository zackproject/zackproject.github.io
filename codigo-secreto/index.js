const imgQR = document.getElementById("img-qr");
const imgContainer = document.getElementById("img-container");
const containerPanel = document.getElementById("container");

const PARAMID = "panel";
const docSearch = document.location.search;
const CONTENT_ID = new URLSearchParams(docSearch).get(PARAMID);

let generating = false; // evita reentradas

class PanelOption {
  constructor(urlParent, urlQR, startPlayer, maxPieces, maxWater) {
    this.blue = "b";
    this.startPlayer = startPlayer;
    this.red = "r";
    this.water = "w";
    this.dead = "d";
    this.urlParent = urlParent;
    this.urlQR = urlQR;
    this.allOptions = [];
    this.maxPieces = maxPieces;
    this.maxWater = maxWater;
  }

  transformUrlToPanel(mContentParam) {
    this.startPlayer = parseInt(mContentParam.charAt(0));
    this.allOptions = mContentParam.slice(1).split("");
  }

  getUrlQR() {
    return (
      qrParent + this.urlParent  + this.startPlayer + this.allOptions.join("")
    );
  }

  generateUrlNewPanel() {
    this.startPlayer = randInt(0, 1);
    this.generateNewAllOptions();
    this.disortPanel();
    return this.urlParent + this.startPlayer + this.allOptions.join("");
  }

  generateNewAllOptions() {
    this.startPlayer = randInt(0, 1);
    this.allOptions = [];

    // Pool base
    for (let i = 0; i < this.maxPieces; i++) {
      this.allOptions.push(this.blue, this.red);
    }
    // Extra según jugador inicial
    this.allOptions.push(this.startPlayer === 0 ? this.blue : this.red);
    // Aguas
    for (let i = 0; i < this.maxWater; i++) {
      this.allOptions.push(this.water);
    }

    // Muerto
    this.allOptions.push(this.dead);
  }

  disortPanel() {
    for (let i = this.allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.allOptions[i], this.allOptions[j]] = [
        this.allOptions[j],
        this.allOptions[i],
      ];
    }
    return this.allOptions;
  }
}
const qrParent = "https://api.qrserver.com/v1/create-qr-code/?data=";

let player = new PanelOption(
  (urlParent =
    "https://www.zksama.com/codigo-secreto/?panel="), // zksama.com/codigo-secreto/?panel=
  (urlQR = qrParent),
  (startPlayer = randInt(0, 1)),
  (maxPieces = 8),
  (maxWater = 7)
);

if (CONTENT_ID) {
  // paint loaded panel
  player.transformUrlToPanel(CONTENT_ID);
  paintingPanel();
  document.getElementById("img-qr").src = player.getUrlQR();
  console.log("QR URL: " + player.getUrlQR());
  // create new to new panel
  document.getElementById("url-panel").href = player.generateUrlNewPanel();
} else {
  player.generateNewAllOptions();
  player.disortPanel();
  document.getElementById("url-panel").href = player.generateUrlNewPanel();
  document.getElementById("container").style.display = "none";
  document.getElementById("qr-btn").style.display = "none";
}

function btnSharePanel(event) {
  if (imgContainer.style.display === "flex") {
    imgContainer.style.display = "none";
    containerPanel.style.display = "grid";
    event.target.innerText = "Ver QR";
  } else {
    imgContainer.style.display = "flex";
    containerPanel.style.display = "none";
    event.target.innerText = "Ocultar QR";
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateUrl() {
  // const urlParent = "https://www.zksama.com/codigo-secreto/?panel=";

  url = urlParent + player.startPlayer + player.allOptions.join("");
  console.log(url);
  return encodeURIComponent(url) + "&size=400";
}

function paintingPanel() {
  const tds = Array.from(document.getElementsByClassName("panel-item"));
  generating = true;

  // Pintar: primero limpiar siempre, luego pintar según valor
  tds.forEach((td, index) => {
    const val = player.allOptions[index];
    // LIMPIAR estado previo (imprescindible)
    td.innerText = "";
    td.style.backgroundColor = "";
    td.style.color = ""; // por si alguna vez cambias color de texto

    switch (val) {
      case player.blue:
        td.innerText = "🔷";
        td.style.backgroundColor = "#008ee7";
        break;
      case player.red:
        td.innerText = "🔴";
        td.style.backgroundColor = "#f81821";
        break;
      case player.water:
        td.innerText = ""; // sin icono
        td.style.backgroundColor = "lightyellow";
        break;
      case player.dead:
        td.innerText = "💀";
        td.style.backgroundColor = "#454545";
        break;
      default:
        // por seguridad, si algo raro ocurre, dejamos la celda limpia
        td.innerText = "";
        td.style.backgroundColor = "";
    }
  });

  // Guía visual
  const guides = document.getElementsByClassName("guide");
  for (let mGuide of guides) {
    if (player.startPlayer === 0) {
      mGuide.style.borderColor = "blue";
      mGuide.style.backgroundColor = "lightblue";
    } else {
      mGuide.style.borderColor = "red";
      mGuide.style.backgroundColor = "lightcoral";
    }
  }
  generating = false;
}
