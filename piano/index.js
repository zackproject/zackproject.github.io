const NOTESONLINE = "./notes/";
const PARAMSONG = "song";
const PARAMTITLE = "title";
//tranportePieza //notaActual
let player = new Piano(0, 0);
let numInNote = 1;
const teclaNotes = document.querySelectorAll(".tecla");
const btnContainer = document.getElementById("btnGenerated");
const slct = document.getElementById("selectTextPiano");

// Load Music
const menuTransortSong = document.getElementById("menu-transport-song");
const menuEscribirSong = document.getElementById("menu-escribir-cancion");
const menuCreateSong = document.getElementById("menu-create-song");
const menuGuessSong = document.getElementById("menu-adivinar-cancion");
const updateSaveSong = document.getElementById("updateSave");
const detailExampleSong = document.getElementById("detail-example-song");
const detailExampleBirth = document.getElementById("detail-example-birth");
//
const documentSearch = document.location.search;
const tranportePiezaHtml = document.getElementById("transportePieza");
const inputGuesSongHtml = document.getElementById("inputGuesSong");

// problably ok
const progresBarContainer = document.getElementById("progress-bar-container");
const progresBar = document.getElementById("progress-bar-music");
const tempo = document.getElementById("tempo");
//

teclaNotes.forEach(function (e, i) {
  e.addEventListener("contextmenu", (event) => drawNumber(event));
  e.addEventListener("click", () => {
    soundTecla(i);
    saveSong(i);
  });
});

function changeColorWhiteNotes(e) {
  // OK
  let checked = e.target.checked;
  for (let i = 0; i < teclaNotes.length; i++) {
    if (notesPiano[i].note == "white") {
      teclaNotes[i].style.background = checked ? notesPiano[i].color : "white";
    }
  }
}

function drawNumber(event) {
  // OK
  event.preventDefault();
  if (slct.value == "3") {
    event.target.innerText = numInNote;
    numInNote++;
  }
}

function soundTecla(i) {
  /// OK
  new Audio(notesPiano[i].sound).play();
}

const textSum = (num) => (num > 0 ? `+${num}` : num);

function avanzaEscala() {
  //Reseteja la song
  //Si incluye la ultima nota no puede avanzarla
  player.avanzaPieza(notesPiano);
  tranportePiezaHtml.innerText = textSum(player.tranportePieza);
  getNewLink();
}

function retrocedeEscala() {
  player.retrocedePieza(notesPiano);
  tranportePiezaHtml.innerText = textSum(player.tranportePieza);
  getNewLink();
}

function readPath() {
  //Guarda el parametres de 'PARAMSONG' y 'PARAMTITLE'
  let stringNotes = new URLSearchParams(documentSearch).get(PARAMSONG);
  // ???
  const titleSong = new URLSearchParams(documentSearch).get(PARAMTITLE);

  // Is not song to guess
  if (stringNotes == null || stringNotes == "") return false;
  if (titleSong == null || titleSong == "") return false;

  player.setCancionImportada(stringNotes, teclado, notesPiano);

  //Notas musicales
  player.setTitleSong(titleSong);
  return true;
}

function loadMusic() {
  // Si hi han paramentres, retorna 'true'
  let paramsDisponibles = readPath();
  //Si hi han parametres de 'song' i 'title' es mostra el menu, sino el menu es per crearla
  menuTransortSong.style.display = paramsDisponibles ? "block" : "none";
  menuEscribirSong.style.display = paramsDisponibles ? "none" : "flex";
  menuCreateSong.style.display = paramsDisponibles ? "block" : "none";
  menuGuessSong.style.display = paramsDisponibles ? "block" : "none";
  updateSaveSong.style.display = paramsDisponibles ? "none" : "block";
  // si es modo crear, mostra la llista de cancons, si es modo adivinar obre el desplegable
  detailExampleSong.open = !paramsDisponibles;
  detailExampleBirth.open = !paramsDisponibles;

  if (paramsDisponibles) {
    //GeneraButtons
    generateButtonsGuess();
    //L'input nomes admet la quantitat de lletres de la 'song'
    inputGuesSongHtml.maxLength = player.titleSong.length;
  }
  //Canvia segons l'escala
  updateTextPiano();

  //Precarrega tots els audios
  preloadAudio(notesPiano);
}

function generateButtonsGuess() {
  deleteChilds(btnContainer);
  let listLetras = player.disordedTitle;
  for (let i = 0; i < listLetras.length; i++) {
    let btn = document.createElement("span");
    btn.className = "btn-guess";
    if (listLetras[i] === " ") {
      btn.innerHTML = "&nbsp";
      btn.ariaLabel = `Espacio. Escribe espacio en el cuadro de edición `;
    }

    if (listLetras[i] !== " ") {
      btn.innerText = listLetras[i];
      btn.ariaLabel = `Letra ${listLetras[i]}. Escribe la letra en el cuadro de edición `;
    }

    btn.setAttribute("usat", "no");
    btnContainer.appendChild(btn);
  }
}

function tocaEsto() {
  //Si la nota es fora del teclat, reseteja
  player.resetIfOut();
  //Dibuixa la nota al teclat
  const index = notesPiano.findIndex((n) => n.sound === player.getActualNote());
  drawTecla(notesPiano[index]);
  // Crea un link de
  new Audio(player.getActualNote()).play();

  const noteWithLength = `${player.notaActual + 1} / ${
    player.cancionImportada.length
  }`;
  tempo.innerHTML = noteWithLength;
  tempo.ariaLabel = `Notas tocadas: ${noteWithLength}`;

  progresBar.style.width =
    (100 * (player.notaActual + 1)) / player.cancionImportada.length + "%";
  progresBar.ariaLabel = `Notas tocadas: ${player.notaActual + 1}/${
    player.cancionImportada.length
  }`;
  progresBarContainer.ariaLabel = `Notas restantes: ${
    player.cancionImportada.length - player.notaActual + 1
  }`;
  player.addActualNote();
  // Amaga la info si es toca mes de 4 notes o arriba al final de la canco
  if (player.isFourthFirstNotes()) {
    document.getElementById("infoToca").style.display = "none";
  }
}

function drawTecla(note) {
  //Neteja totes les tecles blanques
  Array.from(teclaNotes).forEach((item) => (item.style.transform = ""));
  teclaNotes[note.id].style.transform = "translateY(5px)";
  const isWhite = notesPiano[note.id].note === "white";
  createNoteAnimated(isWhite, note.color);
  document.getElementById("touch-this").style.color = note.color;
}

function updateTextPiano() {
  // reseteja el numero que es mostra en "Sin notacion"
  numInNote = 1;
  let slctNum = parseInt(slct.selectedOptions[0].value);
  //0 = Inglesa, 1= Do 2= Alphabet
  for (let i = 0; i < teclaNotes.length; i++) {
    //Per cada tecla actualitza el contingut
    teclaNotes[i].innerText = textoDisponibles[slctNum][i];
    teclaNotes[i].ariaLabel = "Reproducir nota " + textoDisponibles[slctNum][i];
  }
}

function saveSong(mNoteId) {
  // is the same index ARRAY NOTE & 'teclado'
  player.updateLetra(teclado[mNoteId]);
  updateSaveSong.innerText = "Notas grabadas: " + player.letras.length;
}

//Guarda si el troba, sino es '-1'
//Acualitza el 'a:href'

function pulsado(event) {
  //Si no es dins del 'input', sona
  if (!inputActive()) {
    let obj = tecles[event.keyCode];
    //Si la tecla existeix
    if (typeof obj !== "undefined") {
      // do something
      new Audio(obj.sound).play();
      //Pinta la tecla blanca o gris en css premuda
      drawTecla(obj);
      //Guarda en 'letras' la nota actual en ASCII
      saveSong(obj.id);
    }
  }
}

//Mira si el 'input' de la cancio es actiu, per desacticar el teclat premut
function inputActive() {
  switch (document.activeElement) {
    case document.getElementById("inputSong"):
      return true;
    case inputGuesSongHtml:
      return true;
    case document.getElementById("nameBirth"):
      return true;
    default:
      return false;
  }
}

function generateLink() {
  let nameSong = document.getElementById("inputSong").value.toLowerCase();
  let nResultat = document.getElementById("resultat");
  if (nameSong != "") {
    nResultat.href = `./?${PARAMSONG}=${
      player.letras
    }&${PARAMTITLE}=${player.ocultaCancion(player.titleSong)} `;
    nResultat.innerText = "Click aquí: " + nameSong;
    nResultat.ariaLabel =
      "Enlace clicable de la canción creada '" + nameSong + "'";
    nResultat.ariaHidden = false;
    nResultat.focus();
  }
}

function resetSong() {
  player.letras = "";
  updateSaveSong.innerText = "Notas grabadas: " + player.letras.length;
}

function createNoteAnimated(isWhite, color) {
  let father = document.getElementById("menu-piano");
  //<div class="note-fall material-icons">music_note</div>
  let note = document.createElement("div");
  note.className = "note-fall material-icons";
  note.ariaHidden = true;
  note.innerText = "music_note";
  note.style.color = color;
  if (isWhite) {
    note.style.animation = "fall-music-left 3s linear, rotate 4s linear";
  } else {
    note.style.animation = "fall-music-right 3s linear, rotate 4s linear";
  }
  note.style.animationFillMode = "forwards";
  father.appendChild(note);
  //Borrara las notas que sean mayores de'50'
  if (document.getElementsByClassName("note-fall").length > 50) {
    father.removeChild(document.getElementsByClassName("note-fall")[0]);
  }
}

function checkInputSong() {
  //Genera de nuevo los botones, era eso o limpiar el formato
  generateButtonsGuess();
  //El text del 'input' es posa en minuscula i es torna array
  let inputGuessList = inputGuesSongHtml.value.toLowerCase().split("");
  //Canvia los espacios del input ' ' por '&nbsp;'
  inputGuessList = inputGuessList.map((e) => e.replace(" ", "&nbsp;"));
  let btnList = document.getElementsByClassName("btn-guess");
  var label = document.querySelector("label[for='inputGuesSong']");

  //Segon bucle per les lletres del input
  for (let i = 0; i < inputGuessList.length; i++) {
    //Bucle per als botons
    for (let j = 0; j < btnList.length; j++) {
      //Per cada lletra del input es comprova els botons
      if (
        inputGuessList[i] == btnList[j].innerHTML &&
        btnList[j].getAttribute("usat") != "yes"
      ) {
        btnList[j].style.background = "white";
        btnList[j].style.color = "black";
        btnList[j].ariaLabel =
          "Letra usada:" + btnList[j].innerHTML.replace("&nbsp;", "Espacio");
        //Aqui controlo si la lletra s'ha utilitzat o no a partir d'aquesta variable
        btnList[j].setAttribute("usat", "yes");
        //btnList[j].disabled = true;
        break;
      }
    }
  }

  //Si falla
  label.innerText = "Titulo incorrecto, prueba otra vez";
  //Si adivina la cancion

  if (player.compareInputTitle(inputGuesSongHtml.value.toLowerCase())) {
    for (let i = 0; i < btnList.length; i++) {
      btnList[i].style.background = "green";
      btnList[i].style.color = "white";
      btnList[i].disabled = true;
    }
    // Sobrescribe el texto si
    label.innerText = "Titulo correctamente escrito";
    let btn = document.getElementById("btn-adivina-song");
    btn.disabled = true;
    btn.innerText = player.getTitleUpperCase();
  }
  label.focus();
}
function switchModalGuess() {
  let dialogAdivina = document.getElementById("dialogAdivina");
  let fons = document.getElementById("fondo-card");
  if (dialogAdivina.style.top === "") {
    dialogAdivina.ariaHidden = false;
    inputGuesSongHtml.focus();
    dialogAdivina.style.top = "50%";
    fons.style.display = "block";
    return;
  }
  fons.style.display = "none";

  dialogAdivina.style.top = "";
  dialogAdivina.ariaHidden = true;
}

function deleteChilds(currentDiv) {
  while (currentDiv.firstChild) {
    currentDiv.removeChild(currentDiv.firstChild);
  }
}
//Disorder the word randoom

function sendBirthday() {
  let namePerson = document.getElementById("nameBirth").value.toLowerCase();
  let linkBirth = document.getElementById("linkBirth");
  if (namePerson != "") {
    linkBirth.href =
      "./?song=IIJILhIIJIMLIIPNLhJOONLML&title=" +
      player.ocultaCancion(namePerson);
    linkBirth.innerText = `Comparte este link con '${namePerson}' `;
    document.getElementById("linkBirth").focus();
  }
}
//Preload audio https://stackoverflow.com/a/13116795
function preloadAudio(preloads) {
  for (var x = 0; x < preloads.length; x++) {
    let aud = new Audio(preloads[x].sound);
    aud.preload = "auto";
  }
}

function getNewLink() {
  let stringNotes = new URLSearchParams(documentSearch).get(PARAMSONG);
  console.log(stringNotes);
  const urlNewLink = `./?${PARAMSONG}=${player.setNewCesar(
    stringNotes
  )}&${PARAMTITLE}=${player.ocultaCancion(player.titleSong)}`;
  document.getElementById("newPiece").href = urlNewLink;
}
