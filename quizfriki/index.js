var player;
var npc;
var optionsHTMList;
var GAMESTORAGE = "whanttobeafriki";
var npcPresentadorHtml;

function playNow() {
  // Si el campo de nombre esta vacio no continuara la funcion
  let inputName = document.getElementById("inputName");
  if (inputName.value == "") {
    inputName.placeholder = "¡Rellena este campo!";
    return;
  }
  //Crea un jugador amb els setting definits
  player = playNewGame();
  //Crea un presentador
  npc = createPresentador();
  //Guarda la partida creada en LocalStorage
  localStorage.setItem(GAMESTORAGE, JSON.stringify(player));
  console.info(player);
  //Guarda les clases de 'options' del HTML, en una variable
  optionsHTMList = fillQuestionList();
  //Guarda el presentador HTML
  npcPresentadorHtml = document.getElementById("npcPresentador");
  //Omple el text HTML amb els valors
  fillQuiz();
  //Neteja les opcions
  cleanOptions();
  //Neteja els comodins
  cleanComodin();
  //Neteja els 2 botons del quiz
  cleanQuizBtn();
  npcPresentadorHtml.innerText = npc.callPresentacion(player.name);
}

function onLoadGame() {
  //Si hi havia una partida, boto 'Resume Game' visible
  if (localStorage.getItem(GAMESTORAGE) != null) {
    document.getElementById("resumeGame").style.display = "block";
  }
  generateCategoriaList();

  generateHTMLSelectView();

  generateRutaList();
}

function reloadLastGame() {
  //Pilla el presentador de nuevo
  player = JSON.parse(localStorage.getItem(GAMESTORAGE));
  //Crea un presentador
  npc = createPresentador();
  //Guarda el presentador HTML
  npcPresentadorHtml = document.getElementById("npcPresentador");
  //Guarda les clases de 'options' del HTML, en una variable
  optionsHTMList = fillQuestionList();
  //Omple el text HTML amb els valors
  fillQuiz();
  //Neteja les opcions
  cleanOptions();
  //Neteja els comodins
  cleanComodin();
  //Neteja els 2 botons del quiz
  cleanQuizBtn();
  //Activa las casillas otra vez
  optionHTMLDisabled(false);
  //Posa l'estat del comodins
  disableComodinOnReload();
  // Posa els metodes de nou
  addAgainMethodOnComodins();
}

//Emplena un nou objecte de joc
function playNewGame() {
  let inputName = document.getElementById("inputName").value;
  let selectedCategory =
    document.getElementById("rutaViewList").selectedOptions[0];
  let idAcualQuestion = 0;
  let comodinList = [c1, c2, c3];
  let firstRange = parseInt(selectedCategory.value);
  let secondRange = firstRange + 10;
  let rangeQuestion = quizList.slice(firstRange, secondRange);
  //la posicio del award es la id categoria sense multiplicar per 10
  let award = rotate(awardsList[parseInt(selectedCategory.value) / 10]);
  let rangeSolution = optionsPositionCorrect.slice(firstRange, secondRange);
  //Una vegada creat el player el retorna
  return new QuizFriki(
    inputName,
    selectedCategory.innerText,
    idAcualQuestion,
    comodinList,
    rangeQuestion,
    rangeSolution,
    award
  );
}

function rotate(mensaje) {
  /* https://donnierock.com/2021/02/08/funcion-para-cifrado-rot13-con-javascript/ */
  return mensaje.replace(/[a-zA-Z]/gi, function (s) {
    return String.fromCharCode(
      s.charCodeAt(0) + (s.toLowerCase() < "n" ? 13 : -13)
    );
  });
}

function fillQuestionList() {
  let list = [];
  let clsslist = document.getElementsByClassName("answer");
  for (let i = 0; i < clsslist.length; i++) {
    const element = clsslist[i];
    list.push(element);
  }
  return list;
}
function fillQuiz() {
  let quiz = player.questionsList[player.id_actual_question];
  //La pregunta actual es la del 'obj'
  let pregunta = document.getElementById("question");
  pregunta.innerText = player.id_actual_question + 1 + ". " + quiz.question;

  //GLOBAL let optionsList
  for (let i = 0; i < optionsHTMList.length; i++) {
    //Hi ha tantes clases com opcions: 4
    optionsHTMList[i].innerText = quiz.options[i];
  }
}

function comodinLlamada(event) {
  //Nom del comodi
  let comodin = player.comodinList[0];
  //Anihacking, si el comodin fue usado, no deja usarlo mas
  if (comodin.used) {
    npcPresentadorHtml.innerText = npc.callTrampa();
    return;
  }
  //Guarda el index de la resposta correcta
  let indexAnswerForThisQuestion =
    optionsPositionCorrect[player.id_actual_question];
  //Retorna el index de la persona trucada
  let contactCall = parseInt(
    document.getElementById("callViewList").selectedOptions[0].value
  );
  //Guarda la opcio de la trucada telefonica i el percentatle []
  let callOption = player.comodinList[0].applyCalling(
    indexAnswerForThisQuestion
  );
  //Tria un dialog a l'atzar de la persona 'contactCall'
  let dialogOption =
    nameCalling[contactCall].call[
    randInt(0, nameCalling[contactCall].call.length - 1)
    ];
  //callOption[0] es 'id resposta callOption[1] es 'percentatge d'acert'
  let textRespuesta =
    dialogOption +
    "'" +
    player.questionsList[player.id_actual_question].options[callOption[0]] +
    "'. Estoy al " +
    callOption[1] +
    "% seguro";
  //console.log(comodin.name, textRespuesta);
  //Escriu el resultat del comodi al html
  let text = document.getElementById("applycomodin");
  text.innerText = comodin.name + " - " + textRespuesta;
  // Marquem com utilizat el comodi
  comodin.used = true;
  //Desactiva el pare que l'ha cridat, o sigui el boton
  event.target.disabled = true;
  //Guarda els canvis
  localStorage.setItem(GAMESTORAGE, JSON.stringify(player));
}

function comodinPublico(event) {
  //Nom del comodi
  let comodin = player.comodinList[1];
  //Anihacking, si el comodin fue usado, no deja usarlo mas
  if (comodin.used) {
    npcPresentadorHtml.innerText = npc.callTrampa();
    return;
  }
  //Guarda el index de la resposta correcta
  let indexAnswerForThisQuestion =
    optionsPositionCorrect[player.id_actual_question];
  //Retorna un percentatges de les opcions mes votades
  //segons el nivel de pregunta (id_actual_question) , acerten mes o menys
  let percentPublicList = player.comodinList[0].applyPublic(
    player.id_actual_question,
    indexAnswerForThisQuestion
  );
  //console.log(comodin.name, percentPublicList);

  let optionListAnswer =
    player.questionsList[player.id_actual_question].options;
  //Escriu el resultat del comodi al html
  let text = document.getElementById("applycomodin");
  text.innerText =
    comodin.name + " - " + representPublic(percentPublicList, optionListAnswer);
  // Marquem com utilizat el comodi
  comodin.used = true;
  //Desactiva el pare que l'ha cridat, o sigui el boton
  event.target.disabled = true;
  //Guarda els canvis
  localStorage.setItem(GAMESTORAGE, JSON.stringify(player));
}

function comodinFifty(event) {
  //Nom del comodi
  let comodin = player.comodinList[2];
  //Anihacking, si el comodin fue usado, no deja usarlo mas
  if (comodin.used) {
    npcPresentadorHtml.innerText = npc.callTrampa();
    return;
  }

  //Guarda el index de la resposta correcta
  let indexAnswerForThisQuestion =
    optionsPositionCorrect[player.id_actual_question];
  // Retorna les opcions a esborrar
  let removeWrongList = player.comodinList[0].applyFiftyPercent(
    indexAnswerForThisQuestion
  );
  //console.log(comodin.name, removeWrongList);
  //Esborra el text de 2 opcions incorrectes
  removeWrongList.forEach((element) => {
    optionsHTMList[element].innerText = "";
  });

  // Marquem com utilizat el comodi
  comodin.used = true;
  //Desactiva el pare que l'ha cridat, o sigui el boton
  event.target.disabled = true;
  //Guarda els canvis
  localStorage.setItem(GAMESTORAGE, JSON.stringify(player));
}

//Retorna el text de comodi Public en format llegible
function representPublic(percentList, questionList) {
  let text = "";
  for (let i = 0; i < percentList.length; i++) {
    text = text + "'" + questionList[i] + "' " + percentList[i] + "% | ";
  }

  return text;
}

//Omple les opcions del comodi Trucada
function generateHTMLSelectView() {
  let pare = document.getElementById("callViewList");
  //El Select es converteix en llista si te un 'size'
  pare.size = nameCalling.length;
  let cont = 0;
  nameCalling.forEach((element) => {
    let optionHTML = document.createElement("option");
    if (cont == 0) {
      optionHTML.selected = true;
    }
    optionHTML.value = cont;
    optionHTML.innerText = element.name;
    cont++;
    pare.appendChild(optionHTML);
  });
}

//Comproba si la qui es correcte
function checkQuestion() {
  //Retorna quin ha sigut checked (num)
  let thing = document.querySelector('input[name="quiz-element"]:checked');

  if (thing != null) {
    //Aconsegueix la id de la resposta correcte
    let correcte = player.solutionsList[player.id_actual_question];
    //console.log("thing", thing.value, "correcte", correcte);
    if (thing.value == correcte) {
      //Si es correcte o marca en verd
      optionsHTMList[thing.value].style.background = "green";
      //Dialogo del presentador correcto
      npcPresentadorHtml.innerText = npc.callCorrecto();
    } else {
      // si es incorrecta tornara a fer de zero
      document.getElementById("btn-next").innerText = "Reintentar";
      player.id_actual_question = -1;
      optionsHTMList[thing.value].style.background = "red";
      //Dialogo del presentador incorrecto
      npcPresentadorHtml.innerText = npc.callInorrecto(player.name);
      // vacia el localstorage
      localStorage.removeItem(GAMESTORAGE);
    }
    //'Toggle' els buttons contentar<>siguiente
    // document.getElementById("btn-check").disabled = true;
    document.getElementById("btn-next").disabled = false;
  }
  //Desactiva les opcions quiz
  optionHTMLDisabled(true);
}

//
function goNextQuestion(event) {
  //Si el id actual es menor al les preguntes totals
  if (player.id_actual_question + 1 < player.questionsList.length) {
    //Incrementa la pregunta
    player.id_actual_question++;
    //Neteja les opciones marcades
    cleanOptions();
    //Torna escriure la seguent pregunta
    fillQuiz();
    //'Toggle' els buttons contentar<>siguiente
    cleanQuizBtn();
    //Guarda els canvis
    localStorage.setItem(GAMESTORAGE, JSON.stringify(player));
    // Builda el text del npc Presentador
    npcPresentadorHtml.innerText = "";
    //Activa les opcions quiz
    optionHTMLDisabled(false);
  } else {
    let dwnload = document.getElementById("winnerUrl");
    dwnload.action = rotate(player.award);
    dwnload.style.display = "block";
    console.info("You win");
    // npc Presentador et felicita
    npcPresentadorHtml.innerText = npc.callWinner(player.name);

    event.target.disabled = true;
    //Si guanya reseteja
    localStorage.removeItem(GAMESTORAGE);
  }
}

function cleanOptions() {
  let cont = 0;
  optionsHTMList.forEach((element) => {
    element.style.background = null;
    const label = optionsHTMList[cont].htmlFor;
    //label e input comparteixex 'id' i el 'for', treu el radio marcart
    document.getElementById(label).checked = false;
    cont++;
  });
}

function cleanComodin() {
  let comodinLocalList = document.getElementsByClassName("comodin");
  for (let i = 0; i < comodinLocalList.length; i++) {
    comodinLocalList[i].disabled = false;
  }
}

function cleanQuizBtn() {
  document.getElementById("btn-next").innerText = "Siguiente";
  // document.getElementById("btn-check").disabled = false;
  document.getElementById("btn-next").disabled = true;
}

function createPresentador() {
  return new Presentador(
    (presentation = presenterList.startList),
    (suggestComodin = presenterList.comodinList),
    (failAnswer = presenterList.failList),
    (correctAnswer = presenterList.correctList),
    (winnerFelicitar = presenterList.winner.felicitar),
    (winnerInformar = presenterList.winner.informar),
    (tramposo = presenterList.trampa)
  );
}
// per cada opcio el activa o desactiva les caselles
function optionHTMLDisabled(estat) {
  for (let i = 0; i < optionsHTMList.length; i++) {
    document.getElementById("quiz-" + i).disabled = estat;
  }
}

//Si el OBJ comodin es usat, desactiva el botó
function disableComodinOnReload() {
  let comodinsHTML = document.getElementsByClassName("comodin");
  for (let i = 0; i < comodinsHTML.length; i++) {
    //Desactiva els comodins usats
    if (player.comodinList[i].used) {
      comodinsHTML[i].disabled = true;
    }
  }
}

function addAgainMethodOnComodins() {
  player.comodinList.forEach((element) => {
    //Omple les funcions de nou (LocalStorage no ho fa)
    //'prototype' no va, '__proto__' si
    element.__proto__.applyFiftyPercent = callApply50Percent;
    element.__proto__.applyCalling = callApplyCalling;
    element.__proto__.applyPublic = callApplyPublic;
  });
}


//Genera les categorias <select>

function generateCategoriaList() {
  let padre = document.getElementById("categoriaViewList");

  deleteChilds(padre);

  for (let i = 0; i < categoriaList.length; i++) {
    let hijo = document.createElement("option");
    if (i == 0) {
      hijo.selected = true;
    }
    hijo.value = i;
    hijo.innerText = categoriaList[i].name;
    padre.appendChild(hijo);
  }
}

//Genera les subcategorias <select>
function generateRutaList() {
  let abuelo = document.getElementById("categoriaViewList");
  let padre = document.getElementById("rutaViewList");
  deleteChilds(padre);
  let iSelected = parseInt(abuelo.selectedOptions[0].value);
  let subCategoriaList = categoriaList[iSelected].subcategoria;
  for (let i = 0; i < subCategoriaList.length; i++) {
    let hijo = document.createElement("option");
    if (i == 0) {
      hijo.selected = true;
    }
    // la subcategoria ve per l'objecte 
    hijo.value = subCategoriaList[i].id;
    hijo.innerText = subCategoriaList[i].name;
    padre.appendChild(hijo);
  }
}

//Esborra els fills del div pasat
function deleteChilds(currentDiv) {
  while (currentDiv.firstChild) {
    currentDiv.removeChild(currentDiv.firstChild);
  }
}