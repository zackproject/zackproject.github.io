let allOptions = [];
let startPlayer = 0;
let maxPieces = 8;
let maxWater = 7;
let url = "";
const BLUE = "b";
const RED = "r";
const WATER = "w";
const DEAD = "d";
const imgQR = document.getElementById("img-qr");
const imgContainer = document.getElementById("img-container");

const PARAMID = "panel";
const docSearch = document.location.search;
const CONTENT_ID = new URLSearchParams(docSearch).get(PARAMID);

const containerPanel = document.getElementById("container");
let generating = false; // evita reentradas

if (CONTENT_ID) {
  // cargar panel desde URL
  startPlayer = parseInt(CONTENT_ID.charAt(0));
  const contentOptions = CONTENT_ID.slice(1).split("");
  if (contentOptions.length === 25) {
    allOptions = contentOptions;
    generatePanel();
  } else {
    alert("El panel en la URL no es válido.");
    generatePanel();
  }
} else {
  document.getElementById("container").style.display = "none";
  document.getElementById("qr-btn").style.display = "none";
}

function createPanel() {
  if (generating) return; // ya se está generando
  if (confirm("¡Crear un nuevo panel?")) {
    generatePanel();
  }
}

function sharePanel(event) {
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
function disortArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generatePanel() {
  const tds = Array.from(document.getElementsByClassName("panel-item"));
  const needed = tds.length;
  generating = true;
  if (!CONTENT_ID) {
    startPlayer = randInt(0, 1);
    allOptions = [];

    // Pool base
    for (let i = 0; i < maxPieces; i++) {
      allOptions.push(BLUE, RED);
    }

    // Extra según jugador inicial
    allOptions.push(startPlayer === 0 ? BLUE : RED);

    // Aguas
    for (let i = 0; i < maxWater; i++) {
      allOptions.push(WATER);
    }

    // Muerto
    allOptions.push(DEAD);

    // Ajustar longitud para que coincida con el panel
    if (allOptions.length > needed) {
      // quitar sobrantes (pop) — puedes cambiar la lógica si prefieres eliminar otro tipo
      while (allOptions.length > needed) allOptions.pop();
    } else if (allOptions.length < needed) {
      // rellenar con WATER (o con otro tipo que prefieras)
      while (allOptions.length < needed) allOptions.push(WATER);
    }

    disortArray(allOptions);
  }
  const qrParent = "https://api.qrserver.com/v1/create-qr-code/?data=";
  const urlParent = "https://www.zksama.com/codigo-secreto/?panel=";
  url = urlParent + startPlayer + allOptions.join("");
  console.log(url);

  imgQR.src = qrParent + encodeURIComponent(url) + "&size=400";
  // Pintar: primero limpiar siempre, luego pintar según valor
  tds.forEach((td, index) => {
    const val = allOptions[index];

    // LIMPIAR estado previo (imprescindible)
    td.innerText = "";
    td.style.backgroundColor = "";
    td.style.color = ""; // por si alguna vez cambias color de texto

    switch (val) {
      case BLUE:
        td.innerText = "🔷";
        td.style.backgroundColor = "#008ee7";
        break;
      case RED:
        td.innerText = "🔴";
        td.style.backgroundColor = "#f81821";
        break;
      case WATER:
        td.innerText = ""; // sin icono
        td.style.backgroundColor = "lightyellow";
        break;
      case DEAD:
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
    if (startPlayer === 0) {
      mGuide.style.borderColor = "blue";
      mGuide.style.backgroundColor = "lightblue";
    } else {
      mGuide.style.borderColor = "red";
      mGuide.style.backgroundColor = "lightcoral";
    }
  }

  generating = false;
}
