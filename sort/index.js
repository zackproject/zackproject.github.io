/* sort */
var pkname;
var responseUser = "";
var maxScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var score = 0
var wrongList = [];
var rightList = [];
var skipedList = [];
var gen = 0;
var POKEGUESSLOCALSTORAGE = "pokesort";

//Disorder the word randoom
function disorderWord(word) {
  let resultat = "";
  do {
    resultat = word.split('').sort(function () { return 0.5 - Math.random() }).join('').toUpperCase();
  } while (word.toUpperCase() === resultat || resultat === '');

  return resultat;
}

//Get poke and update views
function findPokeName() {
  maxScore = getLocalStorage();
  ocultalos();
  document.getElementById("imgpkpeled").style.transition = "none";
  document.getElementById("imgpkpeled").style.filter = "brightness(0%)"


  let listGen = genMaxMin(gen);
  let min = listGen[0];
  let max = (listGen[1]) + 1; //random no include the last (1-152 no iclude 152)
  let rand = Math.floor(Math.random() * (max - min) + min);
  let poke = data[rand];
  pkname = poke.name.toUpperCase();
  document.getElementById('imagepk').alt = "Peeled " + poke.dex;
  document.getElementById('imagepk').src = poke.img_default;
  createBtnGuess();
  //createDivGuess(pknameunsort);
  updateScore();

  //Buida la resposta
  let parent = document.getElementById("text-resultat-guess");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

}



function createBtnGuess() {
  ocultalos();
  let btns = document.getElementById("btn-peeled");
  let txtList = disorderWord(pkname).split("");
  //Esborra els fills
  while (btns.firstChild) {
    btns.removeChild(btns.firstChild);
  }

  txtList.forEach(element => {
    let btnLocal = document.createElement("button");
    btnLocal.innerText = element;
    btnLocal.onclick = refreshTxt;
    btnLocal.value = element;
    btnLocal.className = "btn-chart";
    btns.appendChild(btnLocal)
  });
  //Buida la 
  responseUser = "";
  //Text que mostra cada lletra
  document.getElementById("text-resultat-guess").innerText = responseUser;
}

function createButton(element) {
  let btnLocal = document.createElement("button");
  btnLocal.innerText = element;
  btnLocal.value = element;
  btnLocal.className = "btn-chart";
}



var refreshTxt = function refreshResultat(event) {
  // Hacemos que el boton tenga una 'variable' interna
  let nombreVariable = "resolve";
  //Vamos a reutilizar el boton de responder y respuesta
  if (event.target.name === "") {
    //event es el contenido del boton (padre)
    event.target.style.backgroundColor = "black";
    event.target.style.color = "white";
    event.target.name = ""
    //event.target.disabled = true;
    responseUser += event.target.value;
    //Cambia de color si per defecte a clicar
    if (responseUser.length === pkname.length) {
      textInputGame()
    }
    //Aplicamos la variable 'resolve'
    event.target.name = nombreVariable;
    document.getElementById("text-resultat-guess").appendChild(event.target);
  } else {
    event.target.style.backgroundColor = "white";
    event.target.style.color = "black";
    event.target.name = ""
    document.getElementById("btn-peeled").appendChild(event.target);
  }
  updateText();
}

function giveup() {
  //Buida el text a resoldre

  skipedList.unshift(pkname)
  findPokeName();
  if (score > 0) {
    score--;
  }
  updateScore();
  makeListHtml('listaskiped', skipedList);
  //Cambia de color si la resposta es incorrecta
  document.getElementsByTagName("body")[0].style = "background-color: #cc0000;"
}


function textInputGame() {
  //let input = document.getElementById('text-resultat-guess').innerText;
  if (responseUser.toUpperCase() === pkname.toUpperCase()) {
    score++;
    let genHtml = document.getElementById('genViewListGuess').selectedOptions[0].value;
    if (score >= maxScore[genHtml]) {
      maxScore[genHtml] = score;
      updateLocalStorage(maxScore);
    }

    updateScore();
    //hace un push hacia la primera posicion
    rightList.unshift(responseUser);
    //Cambia de color si la resposta es correcta
    document.getElementsByTagName("body")[0].style = "background-color: lightgreen;"
    makeListHtml('listaright', rightList);
    //Cambia los pokemon despues de rellenar la lista
    //findPokeName();
    for (let i = 0; i < document.getElementsByClassName("btn-chart").length; i++) {
      const element = document.getElementsByClassName("btn-chart")[i];
      element.disabled = true;
      document.getElementById("imgpkpeled").style.transition = "filter 1s";
      document.getElementById("imgpkpeled").style.filter = "brightness(100%)"
      document.getElementById("btn-retry-guess").style.display = "none";
      document.getElementById("btn-next-guess").style.display = "block";
      document.getElementById("btn-retry-icon").disabled = true;
    }
  } else {
    document.getElementsByTagName("body")[0].backgroundColor = "#cc0000";
    if (responseUser !== '') {
      //hace un push hacia la primera posicion
      wrongList.unshift(responseUser);
      //Cambia de color si la resposta es incorrecta
      document.getElementsByTagName("body")[0].style = "background-color: #cc0000;"
      makeListHtml('listawrong', wrongList);
      //Torna a generar els botons
      document.getElementById("btn-retry-guess").style.display = "block";
      document.getElementById("btn-next-guess").style.display = "none";
      //createBtnGuess();
    }
  }
}



function makeListHtml(_idhtml, _list) {
  let text = '';
  //hace un remove de la ultima posicion si es mayor a 100
  if (_list.length > 100) _list.pop();
  //Vuelve a actualizar el list group en un texto
  _list.forEach(element => { text = text + "<li class='list-group-item'>" + element + "</li>"; });
  //pinta en el html el nuevo list group
  document.getElementById(_idhtml).innerHTML = text;
}

//retun max min for Generación in dex number
function genMaxMin(genl) {
  //return de range of number pokedex for each generation
  switch (genl) {
      case 1:
          return [0, 150]; //gen1
      case 2:
          return [151, 250]; //gen2
      case 3:
          return [251, 385]; //gen3
      case 4:
          return [386, 492]; //gen4
      case 5:
          return [493, 648]; //gen5
      case 6:
          return [649, 720]; //gen6
      case 7:
          return [721, 808]; //gen7
      case 8:
          return [809, 904]; //gen8
      case 9:
          return [905, 1007]; //gen9
      default:
          return [1, 1007]; //all gens gen=0 or other
  }
}

function changeGen() {
  let genHtml = document.getElementById('genViewListGuess').selectedOptions[0].value;
  gen = parseInt(genHtml);
  score = 0;
  findPokeName();
}

function updateScore() {
  let genHtml = document.getElementById('genViewListGuess').selectedOptions[0].value;
  document.getElementById('textScore').innerText = score;
  document.getElementById('textMaxScore').innerText = maxScore[genHtml];
}


function ocultalos() {
  document.getElementById("btn-retry-icon").disabled = false;
  document.getElementById("btn-next-guess").style.display = "none";
  document.getElementById("btn-retry-guess").style.display = "none";
}

function updateText() {
  responseUser = "";
  for (let i = 0; i < document.getElementsByClassName("btn-chart").length; i++) {
    const element = document.getElementsByClassName("btn-chart")[i];
    if (element.name == "resolve") {
      responseUser += element.value

    }
  }
}

function updateLocalStorage(maxScore) {
  localStorage.setItem(POKEGUESSLOCALSTORAGE, maxScore);
}

function getLocalStorage() {
  if (localStorage.getItem(POKEGUESSLOCALSTORAGE) == null) {
    let defaultList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    updateLocalStorage(defaultList);
    return defaultList;
  }
  //console.log(localStorage.getItem(POKEGUESSLOCALSTORAGE).split(",").map(Number));
  return localStorage.getItem(POKEGUESSLOCALSTORAGE).split(",").map(Number);
}