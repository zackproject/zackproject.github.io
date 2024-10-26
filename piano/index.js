const PIANOSTORAGE = "piano-challenges";

// get from url path 'title=' 'id=' & 'song="
const PARAMSONG = "song";
const PARAMTITLE = "title";
const PARAMID = "id";
const docSearch = document.location.search;
const CONTENT_ID = new URLSearchParams(docSearch).get(PARAMID);
const CONTENT_SONG = new URLSearchParams(docSearch).get(PARAMSONG);
const CONTENT_TITLE = new URLSearchParams(docSearch).get(PARAMTITLE);

// DOM elements
const teclaNotes = document.querySelectorAll(".tecla");
const btnContainer = document.getElementById("btnGenerated");
const slct = document.getElementById("selectTextPiano");
const menuEscribirSong = document.getElementById("menu-escribir-cancion");
const settingsHideMenu = document.getElementsByClassName("guess-settings");
const menuGuessSong = document.getElementById("menu-adivinar-cancion");
const updateSaveSong = document.getElementById("updateSave");
const updateCreateSong = document.getElementById("updateCreate");
const detailExampleSong = document.getElementById("detail-example-song");
const detailExampleBirth = document.getElementById("detail-example-birth");
const tranportePiezaHtml = document.getElementById("transportePieza");
const inputGuesSongHtml = document.getElementById("inputGuesSong");
const inputSongHtml = document.getElementById("inputSong");
const nameBirthHtml = document.getElementById("nameBirth");
const progresBarContainer = document.getElementById("progress-bar-container");
const progresBar = document.getElementById("progress-bar-music");
const tempo = document.getElementById("tempo");
const notesWritedPiano = document.getElementById("notesWritedPiano");
const challengePianoHtml = document.getElementById("challengePiano");

let player = new Piano(0, 0);
let numInNote = 1;

// globall challengeArrayCorrect in localstorage
let challengeArray = [];

// Applt function in piano notes
teclaNotes.forEach(function (e, i) {
  e.addEventListener("contextmenu", (event) => drawNumber(event));
  e.addEventListener("click", () => {
    soundTecla(i);
    saveSong(i);
  });
});

function drawNumber(event) {
  event.preventDefault();
  if (slct.value == "3") {
    event.target.innerText = numInNote;
    numInNote++;
  }
}

function changeColorWhiteNotes(e) {
  let checked = e.target.checked;
  for (let i = 0; i < teclaNotes.length; i++) {
    if (notesPiano[i].note == "white") {
      teclaNotes[i].style.background = checked ? notesPiano[i].color : "white";
    }
  }
}

function fillChallenges() {
  challengePianoHtml.childNodes.forEach((element, i) => {
    let index = i + 1; //start by 1 challenge;
    if (challengeArray.includes(index)) {
      element.style.background = "darkgreen";
    }
  });
}

function getLocalChallenge() {
  if (CONTENT_ID !== null) {
    challengePianoHtml.childNodes[parseInt(CONTENT_ID) - 1].style.background =
      "#c02e00";
  }

  if (localStorage.getItem(PIANOSTORAGE) == null) {
    localStorage.setItem(PIANOSTORAGE, JSON.stringify(challengeArray));
    return;
  }
  challengeArray = JSON.parse(localStorage.getItem(PIANOSTORAGE));
  fillChallenges();
}

function setLocalChallenge() {
  if (!challengeArray.includes(parseInt(CONTENT_ID))) {
    challengeArray.push(parseInt(CONTENT_ID));
    challengeArray = challengeArray.sort();
    localStorage.setItem(PIANOSTORAGE, JSON.stringify(challengeArray));
    fillChallenges();
  }
}

function soundTecla(i) {
  new Audio(notesPiano[i].sound).play();
}

function avanzaEscala() {
  player.avanzaPieza(notesPiano);
  tranportePiezaHtml.innerText = player.getTransportPiece();
  updateLinkSong();
  printPartiture();
}

function retrocedeEscala() {
  player.retrocedePieza(notesPiano);
  tranportePiezaHtml.innerText = player.getTransportPiece();
  updateLinkSong();
  printPartiture();
}

function readPath() {
  // Break here if not song to guess
  if (CONTENT_SONG == null || CONTENT_SONG == "") return false;
  if (CONTENT_TITLE == null || CONTENT_TITLE == "") return false;

  player.setCancionImportada(CONTENT_SONG, teclado, notesPiano);
  player.setTitleSong(CONTENT_TITLE);
  return true;
}

function loadMusic() {
  let paramsDisponibles = readPath();
  //Show / hide menus of 'Guess' or 'Create Song'
  menuEscribirSong.style.display = paramsDisponibles ? "none" : "flex";
  menuGuessSong.style.display = paramsDisponibles ? "block" : "none";
  updateSaveSong.style.display = paramsDisponibles ? "none" : "grid";
  updateCreateSong.style.display = paramsDisponibles ? "block" : "none";
  notesWritedPiano.style.display = paramsDisponibles ? "block" : "none";
  for (let i = 0; i < settingsHideMenu.length; i++) {
    settingsHideMenu[i].style.display = paramsDisponibles ? "flex" : "none";
  }

  if (paramsDisponibles) {
    printPartiture();
    generateButtonsGuess();
    inputGuesSongHtml.maxLength = player.getTitleSong().length;
  }
  updateTextPiano();
  generateSectionGuess();
  getLocalChallenge();

  preloadAudio(notesPiano);
}

function generateButtonsGuess() {
  deleteChilds(btnContainer);
  let listLetras = player.getDisordedTitle();
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
  player.resetIfOut();
  printPartiture();
  const index = notesPiano.findIndex((n) => n.sound === player.getActualNote());
  drawTecla(notesPiano[index]);

  new Audio(player.getActualNote()).play();

  const noteWithLength = `${player.notaActual + 1} / ${
    player.getImportSong().length
  }`;
  tempo.innerHTML = noteWithLength;
  tempo.ariaLabel = `Notas tocadas: ${noteWithLength}`;

  progresBar.style.width =
    (100 * (player.notaActual + 1)) / player.getImportSong().length + "%";
  progresBar.ariaLabel = `Notas tocadas: ${player.notaActual + 1}/${
    player.getImportSong().length
  }`;
  progresBarContainer.ariaLabel = `Notas restantes: ${
    player.getImportSong().length - player.notaActual + 1
  }`;

  player.addActualNote();

  // Info help for new users
  if (player.isFourthFirstNotes()) {
    document.getElementById("infoToca").style.display = "none";
  }
}

function drawTecla(note) {
  //Clear animation for each keys notes
  Array.from(teclaNotes).forEach((item) => (item.style.transform = ""));
  // Apply the new animation
  teclaNotes[note.id].style.transform = "translateY(5px)";
  const isWhite = notesPiano[note.id].note === "white";
  createNoteAnimated(isWhite, note.color);
  document.getElementById("touch-this").style.color = note.color;
}

function updateTextPiano() {
  // Helper mark notes
  numInNote = 1;
  let slctNum = parseInt(slct.selectedOptions[0].value);
  //0 = Inglesa, 1= Do 2= Alphabet
  for (let i = 0; i < teclaNotes.length; i++) {
    teclaNotes[i].innerText = textoDisponibles[slctNum][i];
    teclaNotes[i].ariaLabel = "Reproducir nota " + textoDisponibles[slctNum][i];
  }
  player.resetPieza();
  tranportePiezaHtml.innerText = player.getTransportPiece();
  if (readPath()) {
    //only if guess song avaliable
    printPartiture();
  }
}

function resetSong(event) {
  event.preventDefault();
  player.resetLetters();
  document.getElementById("numUpdateSave").innerText =
    player.getLetters().length;
}

function saveSong(mNoteId) {
  // is the same index ARRAY NOTE & 'teclado'
  player.updateLetra(teclado[mNoteId]);
  document.getElementById("numUpdateSave").innerText =
    player.getLetters().length;
}

function pulsado(event) {
  //Si no es dins del 'input', sona
  if (!inputActive()) {
    let obj = tecles[event.keyCode];
    //Si la tecla existeix
    if (typeof obj !== "undefined") {
      // do something
      new Audio(obj.sound).play();
      drawTecla(obj);
      saveSong(obj.id);
    }
  }
}

//Only works sounds of keyboards if not in this inputs
function inputActive() {
  switch (document.activeElement) {
    case inputSongHtml:
      return true;
    case inputGuesSongHtml:
      return true;
    case nameBirthHtml:
      return true;
    default:
      return false;
  }
}

function generateNewSong(event) {
  event.preventDefault();

  let nameSong = inputSongHtml.value.toLowerCase();
  let nResultat = document.getElementById("link-song");

  if (nameSong != "" && player.getLetters().length != 0) {
    // only can share with title and notes recorded not empty
    let notesLink = player.ocultaCancion(nameSong);
    nResultat.href = `./?${PARAMSONG}=${player.letras}&${PARAMTITLE}=${notesLink} `;
    nResultat.innerText = "¡Click Aqui!";
    nResultat.ariaLabel =
      "Enlace clicable de la canción creada '" + nameSong + "'";
    nResultat.ariaHidden = false;
    nResultat.focus();
    event.target.style.display = "none";
    document.getElementById("show-link-song").style.display = "block";
  }
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
  // Clear div if it's mayor of 50 divs
  if (document.getElementsByClassName("note-fall").length > 50) {
    father.removeChild(document.getElementsByClassName("note-fall")[0]);
  }
}

function checkInputSong() {
  // Regenerate buttons
  generateButtonsGuess();

  let inputGuessList = inputGuesSongHtml.value.toLowerCase().split("");
  //Chane space button ' ' by '&nbsp; for visual 'space'
  inputGuessList = inputGuessList.map((e) => e.replace(" ", "&nbsp;"));
  let btnList = document.getElementsByClassName("btn-guess");
  var label = document.querySelector("label[for='inputGuesSong']");

  //Seconds loop for inputs letters
  for (let i = 0; i < inputGuessList.length; i++) {
    //Loop buttons
    for (let j = 0; j < btnList.length; j++) {
      //For each letters input trigger buttons
      if (
        inputGuessList[i] == btnList[j].innerHTML &&
        btnList[j].getAttribute("usat") != "yes"
      ) {
        btnList[j].style.background = "white";
        btnList[j].style.color = "black";
        btnList[j].ariaLabel =
          "Letra usada:" + btnList[j].innerHTML.replace("&nbsp;", "Espacio");
        // triger if used
        btnList[j].setAttribute("usat", "yes");
        //btnList[j].disabled = true;
        break;
      }
    }
  }
  // If Incorrect
  label.innerText = "Titulo incorrecto, prueba otra combinación de letras.";

  //If correct
  if (player.compareInputTitle(inputGuesSongHtml.value.toLowerCase())) {
    for (let i = 0; i < btnList.length; i++) {
      btnList[i].style.background = "green";
      btnList[i].style.color = "white";
      btnList[i].disabled = true;
    }
    // Sobrescribe el texto si
    label.innerText = "¡Muy bien! Has escrito el titulo correctamente.";
    // setChallenge Id if exist
    setLocalChallenge();
    let btn = document.getElementById("btn-adivina-song");
    btn.disabled = true;
    btn.innerText = player.getTitleUpperCase();
  }
  label.focus();
}

// my favorite function <3
function deleteChilds(currentDiv) {
  while (currentDiv.firstChild) {
    currentDiv.removeChild(currentDiv.firstChild);
  }
}

// Send me this in 3/21, thanks
function sendBirthday(event) {
  event.preventDefault();
  let namePerson = event.target.nameBirth.value.toLowerCase();
  let linkBirth = document.getElementById("linkBirth");
  let noteBirthday = "IIJILhIIJIMLIIPNLhJOONLML";
  if (namePerson != "") {
    document.getElementById("show-link-birth").style.display = "block";
    document.getElementById("nBirthResult").innerText = capitalize(namePerson);
    event.target.style.display = "none";
    linkBirth.href =
      "./?song=" + noteBirthday + "&title=" + player.ocultaCancion(namePerson);
    linkBirth.innerText = `¡Click Aqui!`;
    linkBirth.focus();
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Preload audio https://stackoverflow.com/a/13116795
function preloadAudio(preloads) {
  for (var x = 0; x < preloads.length; x++) {
    let aud = new Audio(preloads[x].sound);
    aud.preload = "auto";
  }
}

function updateLinkSong() {
  // On tranport piece, change melody high or low sound
  const newNotes = player.setNewCesar(CONTENT_SONG, teclado);
  const urlNewLink = `./?${PARAMSONG}=${newNotes}&${PARAMTITLE}=${CONTENT_TITLE}`;
  document.getElementById("newPiece").href = urlNewLink;
}

function generateSectionGuess() {
  for (let i = 0; i < challengesPianoList.length; i++) {
    const el = challengesPianoList[i];
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerText = el.id;
    a.href = el.link + "&" + PARAMID + "=" + el.id;

    if (el.link == "") {
      li.style.display = "none";

      //li.style.backgroundColor = "red";
    }
    let p = document.createElement("p");
    p.innerText = el.help;
    li.appendChild(a);
    li.appendChild(p);
    challengePianoHtml.appendChild(li);
  }
}

let dialogAdivina = document.getElementById("dialogAdivina");

function openDialogGuess() {
  document.getElementById("dialogAdivina").showModal();
}

function closeDialogGuess() {
  document.getElementById("dialogAdivina").close();
}

function openSettings() {
  document.getElementById("settings-dialog").showModal();
}

function closeSettings() {
  document.getElementById("settings-dialog").close();
}

function printPartiture() {
  let slctNum = parseInt(slct.selectedOptions[0].value);
  let mPartiture = player.getPartiture(
    CONTENT_SONG,
    teclado,
    textoDisponibles[slctNum]
  );

  let pare = document.getElementById("englishNotesPiano");
  deleteChilds(pare);
  for (let i = 0; i < mPartiture.length; i++) {
    let span = document.createElement("span");
    span.innerText = mPartiture[i];
    if (i === player.notaActual) {
      span.style.color = "yellow";
      span.title = "Nota actual";
    }
    pare.appendChild(span);
  }
}
