const NOTESONLINE = "./notes/";
const PATHMUSIC = "song";
const PATHSONG = "title";
//tranportePieza //notaActual
let player = new Piano(0, 0);
let numInNote = 1;
let urlNotes = "";

function readPath() {
  //Guarda el parametres de 'PATHMUSIC' y 'PATHSONG'
  let listaStringNotes = new URLSearchParams(document.location.search).get(
    PATHMUSIC
  );
  urlNotes = listaStringNotes;
  let titleSong = new URLSearchParams(document.location.search).get(PATHSONG);

  if (listaStringNotes == null || listaStringNotes == "") return false;
  if (titleSong == null || titleSong == "") return false;

  let lista = listaStringNotes.split("");
  ///console.log("Path:", lista,"Title", titleSong);
  //Tabla ASCII: 65:Mayuscula 97:Minuscula
  let textoListToNumbers = (e) => {
    //Las letras minusculas coresponden a las negras 'abcdefg'
    if (e === e.toLowerCase()) return notasNegras[e.charCodeAt(0) - 97];
    //Las letras mayusculas coresponden a las negras 'ABCDEFG'
    return notasBlancas[e.charCodeAt(0) - 65];
  };

  //Notas musicales
  player.titleSong = player.muestraCancion(titleSong);
  player.disordedTitle = disorderWord(player.titleSong);

  player.cancionImportada = lista.map(textoListToNumbers);
  return true;
}

// Dibuixa numeros en la tecla
function drawNumber(event) {
  event.preventDefault();
  let slct = document.getElementById("selectTextPiano");
  if (slct.value == "3") {
    event.target.innerText = numInNote;
    numInNote++;
  }
}

const teclaElements = document.querySelectorAll(".tecla");

teclaElements.forEach(function (element) {
  element.addEventListener("contextmenu", (event) => drawNumber(event));
});

document.getElementsByClassName("tecla").se;
function loadMusic() {
  // Si hi han paramentres, retorna 'true'
  let paramsDisponibles = readPath();
  //Si hi han parametres de 'song' i 'title' es mostra el menu, sino el menu es per crearla
  document.getElementById("menu-transport-song").style.display =
    paramsDisponibles ? "block" : "none";
  document.getElementById("menu-escribir-cancion").style.display =
    paramsDisponibles ? "none" : "flex";
  document.getElementById("menu-create-song").style.display = paramsDisponibles
    ? "block"
    : "none";
  document.getElementById("menu-adivinar-cancion").style.display =
    paramsDisponibles ? "block" : "none";
  document.getElementById("updateSave").style.display = paramsDisponibles
    ? "none"
    : "block";
  // si es modo crear, mostra la llista de cancons, si es modo adivinar obre el desplegable
  document.getElementById("detail-example-song").open = !paramsDisponibles;
  document.getElementById("detail-example-birth").open = !paramsDisponibles;

  if (paramsDisponibles) {
    //GeneraButtons
    generateButtonsGuess();
    //L'input nomes admet la quantitat de lletres de la 'song'
    document.getElementById("inputGuesSong").maxLength =
      player.titleSong.length;
  }
  //Canvia segons l'escala
  updateTextPiano();

  //Precarrega tots els audios
  preloadAudio(notasBlancas);
  preloadAudio(notasNegras);
}

function generateButtonsGuess() {
  let btnContainer = document.getElementById("btnGenerated");

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
  if (player.notaActual >= player.cancionImportada.length)
    player.notaActual = 0;
  //Dibuixa la nota al teclat
  drawTecla(player.cancionImportada[player.notaActual]);
  // Crea un link de
  let linkSong = player.cancionImportada[player.notaActual];
  var audio = new Audio(linkSong);
  audio.play();

  let progresBarContainer = document.getElementById("progress-bar-container");
  let progresBar = document.getElementById("progress-bar-music");
  let tempo = document.getElementById("tempo");
  tempo.innerHTML = `${player.notaActual + 1}/${
    player.cancionImportada.length
  }`;
  progresBar.style.width =
    (100 * (player.notaActual + 1)) / player.cancionImportada.length + "%";
  progresBar.ariaLabel = `Notas tocadas: ${player.notaActual + 1}/${
    player.cancionImportada.length
  }`;
  tempo.ariaLabel = `Notas tocadas: ${player.notaActual + 1}/${
    player.cancionImportada.length
  }`;
  progresBarContainer.ariaLabel = `Notas restantes: ${
    player.cancionImportada.length - player.notaActual + 1
  }`;
  player.notaActual++;
  // Amaga la info si es toca mes de 4 notes o arriba al final de la canco
  if (
    player.notaActual > 4 ||
    player.notaActual == player.cancionImportada.length
  ) {
    document.getElementById("infoToca").style.display = "none";
  }
}

function drawTecla(num) {
  //Neteja totes les tecles blanques
  let listBlancaHTML = document.getElementsByClassName("primary-note");
  Array.from(listBlancaHTML).forEach((item) => (item.style.transform = ""));
  //Neteja totes les tecles negres
  let listNegraHTML = document.getElementsByClassName("secondary-note");
  Array.from(listNegraHTML).forEach((item) => (item.style.transform = ""));

  let clrsHTML = document.getElementById("touch-this");
  //Si toca una blanca, es mou


  if (notasBlancas.includes(num)) {    
    let pos = notasBlancas.indexOf(num);
    //Color de la nota del boton
    clrsHTML.style.color = colorList[0][pos];
    //Crea nota
    createNoteAnimated(true, colorList[0][pos]);
    // listBlancaHTML[pos].style.background = "lightgray";
    listBlancaHTML[pos].style.transform = "translateY(5px)";
  }
  //Si toca una negra, es mou
  if (notasNegras.includes(num)) {
    console.log("nota");
    let pos = notasNegras.indexOf(num);
    //Crea nota
    createNoteAnimated(false, colorList[1][pos]);
    clrsHTML.style.color = colorList[1][pos];
    listNegraHTML[pos].style.transform = "translateY(5px)";
  }
}

function updateTextPiano() {
  // reseteja el numero que es mostra en "Sin notacion"
  numInNote = 1;
  let slct = document.getElementById("selectTextPiano");
  let slctNum = parseInt(slct.selectedOptions[0].value);
  //0 = Inglesa, 1= Do 2= Alphabet
  for (let i = 0; i < document.getElementsByClassName("tecla").length; i++) {
    //Per cada tecla actualitza el contingut
    const element = document.getElementsByClassName("tecla")[i];
    element.innerText = textoDisponibles[slctNum][i];
    element.ariaLabel = "Reproducir nota " + textoDisponibles[slctNum][i];
  }
}

function soundBlanca(ntecla) {
  //Crea animacio nota blanca
  let clrsHTML = document.getElementById("touch-this");
  clrsHTML.style.color = colorList[0][ntecla];
  createNoteAnimated(true, colorList[0][ntecla]);
  //Toca la blanca i guarda la tecla
  let linkSong = notasBlancas[ntecla];
  var audio = new Audio(linkSong);
  audio.play();
  saveSong(notasBlancas[ntecla]);
}

function soundNegra(ntecla) {
  //Crea animacio nota blanca
  let clrsHTML = document.getElementById("touch-this");
  clrsHTML.style.color = colorList[1][ntecla];
  createNoteAnimated(false, colorList[1][ntecla]);
  //Toca la negra i guarda la tecla
  let linkSong = notasNegras[ntecla];
  var audio = new Audio(linkSong);
  audio.play();
  saveSong(notasNegras[ntecla]);
}

function saveSong(nTecla) {
  //Guarda si el troba, sino es '-1'
  player.updateLetra(notasBlancas, notasNegras, nTecla);
  //Acualitza el 'a:href'
  document.getElementById("updateSave").innerText =
    "Notas grabadas: " + player.letras.length;
}
function pulsado(event) {
  //console.log(event.keyCode, "notado", event.key);
  //Si no es dins del 'input', sona
  if (!inputActive()) {
    let obj = tecles[event.keyCode];
    //Si la tecla existeix
    if (typeof obj !== "undefined") {
      // do something
      let linkSong = obj.tecla;
      var audio = new Audio(linkSong);
      audio.play();
      //Pinta la tecla blanca o gris en css premuda
      drawTecla(obj);
      //Guarda en 'letras' la nota actual en ASCII
      saveSong(obj.tecla);
    }
  }
}

//Mira si el 'input' de la cancio es actiu, per desacticar el teclat premut
function inputActive() {
  switch (document.activeElement) {
    case document.getElementById("inputSong"):
      return true;
    case document.getElementById("inputGuesSong"):
      return true;
    case document.getElementById("nameBirth"):
      return true;
    default:
      return false;
  }
}

function avanzaEscala() {
  //Reseteja la song
  //Si incluye la ultima nota no puede avanzarla
  player.avanzaPieza(notasBlancas);
  document.getElementById("transportePieza").innerText = textSum(
    player.tranportePieza
  );
  getNewLink();
}

function retrocedeEscala() {
  //Reseteja la song
  //Si incluye la primera nota no puede retroceder
  player.retrocedePieza(notasBlancas);
  document.getElementById("transportePieza").innerText = textSum(
    player.tranportePieza
  );
  getNewLink();
}

function textSum(num) {
  //Si es positiu '+1, +2'
  if (num > 0) return "+" + num;
  //Si no retorna tal cual (el negatiu ja te el -num)
  return num;
}

function generateLink() {
  let nameSong = document.getElementById("inputSong").value.toLowerCase();
  let nResultat = document.getElementById("resultat");
  if (nameSong != "") {
    nResultat.href = `./?${PATHMUSIC}=${
      player.letras
    }&${PATHSONG}=${player.ocultaCancion(nameSong)} `;
    nResultat.innerText = "Click aquí: " + nameSong;
    nResultat.ariaLabel =
      "Enlace clicable de la canción creada '" + nameSong + "'";
    nResultat.ariaHidden = false;
    nResultat.focus();
  }
}

function resetSong() {
  player.letras = "";
  document.getElementById("updateSave").innerText =
    "Notas grabadas: " + player.letras.length;
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
  let inputGuess = document.getElementById("inputGuesSong").value.toLowerCase();
  let inputGuessList = inputGuess.split("");
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
  if (inputGuess === player.titleSong) {
    for (let i = 0; i < btnList.length; i++) {
      btnList[i].style.background = "green";
      btnList[i].style.color = "white";
      btnList[i].disabled = true;
    }
    // Sobrescribe el texto si
    label.innerText = "Titulo correctamente escrito";
    let btn = document.getElementById("btn-adivina-song");
    btn.disabled = true;
    btn.innerText = player.titleSong.toUpperCase();
  }
  label.focus();
}
function switchModalGuess() {
  let dialogAdivina = document.getElementById("dialogAdivina");
  let fons = document.getElementById("fondo-card");
  if (dialogAdivina.style.top === "") {
    dialogAdivina.ariaHidden = false;
    document.getElementById("inputGuesSong").focus();
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
function disorderWord(word) {
  let disorded = word
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("")
    .toLowerCase();
  //Que lo haga una segunda vez solo
  if (disorded === word)
    disorded = word
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("")
      .toLowerCase();
  return disorded;
}

function pintaPrimaryNote(e) {
  let checked = e.target.checked;
  for (
    let i = 0;
    i < document.getElementsByClassName("primary-note").length;
    i++
  ) {
    const element = document.getElementsByClassName("primary-note")[i];
    //Canvia colors entre colorit o blancs
    element.style.background = checked ? colorList[0][i] : "white";
  }
}

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
    let aud = new Audio(preloads[x]);
    //console.log("Cached", aud);
    aud.preload = "auto";
  }
}

function cifrarCesar(texto, numeroCifrado) {
  // Estructura del teclat
  const teclado = "AaBbCDcEdFeGHfIgJKhLiMjNOkPlQRmSnToU";
  let textoList = texto.split("");
  let total = "";
  console.log(textoList);
  for (let i = 0; i < textoList.length; i++) {
    //Cada tecla s'ha de moure el segons l'escala 'teclado'
    total += teclado[teclado.indexOf(textoList[i]) + numeroCifrado];
  }
  return total;
}

function getNewLink() {
  console.log(player);
  document.getElementById("newPiece").href = `./?${PATHMUSIC}=${cifrarCesar(
    urlNotes,
    player.tranportePieza
  )}&${PATHSONG}=${player.ocultaCancion(player.titleSong)}`;
}
