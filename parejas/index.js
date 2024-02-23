
class Card {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}

class Multiplayer {
    constructor(currentPlayerIndex = 0, players = []) {
        this.players = players;
        this.currentPlayerIndex = currentPlayerIndex; // Índice del jugador actual
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    getmPlayerName() {
        return this.getCurrentPlayer().name;
    }

    addmPlayerPoints() {
        this.getCurrentPlayer().score = this.getCurrentPlayer().score + 1;
    }

    ismMultiplayer() {
        return this.players.length != 0;
    }

    nextPlayer() {
        //this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;*
        this.currentPlayerIndex = this.currentPlayerIndex + 1;
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0;
        }
        return this.currentPlayerIndex;
    }
    getPlayers() {
        return this.players;
    }
    postPlayer(name) {
        this.players.push(new Player(name));
    }
    unorderMPlayers() {
        this.players = this.players.sort(() => Math.random() - 0.5);
    }

    loadStorage(props) {
        this.players = props.players;
        this.currentPlayerIndex = props.currentPlayerIndex; // Índice del jugador actual
    }

}

class Couple {
    constructor(cards, maxCards, helpWithNums) {
        this.turns = 0;
        this.points = 0;
        this.isPlaying = true;
        this.maxCards = maxCards; // Si tria 10, es dupliquen i son 20
        this.cards = cards.sort(() => Math.random() - 0.5).slice(0, maxCards);
        //this.cards = cards.slice(0, maxCards);
        this.doubleCards = this.generateDouble();
        this.rightCardList = [];
        this.firstCard = null; // en realidad solo necesitas guardar una 'card1'
        this.helpWithNums = helpWithNums;
        this.multiplayer = new Multiplayer()
    }
    unorderPlayers() {
        this.multiplayer.unorderMPlayers();
    }

    isMultiplayer() {
        return this.multiplayer.ismMultiplayer();
    }

    addPlayerPoints(){
        this.multiplayer.addmPlayerPoints();
    }

    getPlayerName() {
        return this.multiplayer.getmPlayerName()
    }
    setNewMultiplayer(multiplayer) {
        return this.multiplayer = multiplayer;
    }

    getCurrentPlayer() {
        return this.multiplayer.getCurrentPlayer();
    }

    nextPlayer() {
        this.multiplayer.nextPlayer();
    }
    addPlayer(name) {
        this.multiplayer.postPlayer(name);
    }



    loadStorage(props) {
        this.turns = props.turns;
        this.points = props.points;
        this.cards = props.cards;
        this.doubleCards = props.doubleCards;
        this.rightCardList = props.rightCardList;
        this.firstCard = props.firstCard;
        this.helpWithNums = props.helpWithNums;
        console.log(props.multiplayer.players, "bb");
        this.multiplayer = new Multiplayer(props.multiplayer.currentPlayerIndex, props.multiplayer.players);
    }
    saveResolvedCard(value) {
        this.rightCardList.push(parseInt(value));
    }

    isAllCoupleCompleted() {
        return this.rightCardList.length - this.cards.length === 0;
    }

    isSameCard(key) {
        // key es valor unic, value es repeteix
        return this.firstCard.key == key;
    }

    isResolvedCard(value) {
        return this.rightCardList.includes(parseInt(value));
    }

    // Al clicar una carta envia la carta aquesta funcion
    firstMove(key, value) {
        if (this.firstCard == null) {
            this.firstCard = new Card(key, value);
            return true;
        }
        /// si es el segon moviment crida una comparacio
        return false;
    }

    compareCard(value) {
        this.turns++;
        if (this.firstCard.value === value) {
            this.firstCard = null;
            return true;
        }
        this.firstCard = null;
        return false;
    }

    generateDouble() {
        this.doubleCards = [...this.cards, ...this.cards];
        this.doubleCards = this.doubleCards.sort(() => Math.random() - 0.5);
    }

    getCardName(nid) {
        return this.cards.find(e => e.id == parseInt(nid)).name;
    }

    getFirstCardName() {
        return this.getCardName(this.firstCard.value);
    }

    getPlayerList() {
        return this.multiplayer.players;
    }
}
const COUPLECARDS = "couplecards";

// HTML TAGS
const selectorCoupleHTML = document.getElementById("selector-couple");
const selectorMaxHTML = document.getElementById("selector-max");
const isNumericHTML = document.getElementById("numeric-cards");
const infoHTML = document.getElementById("info");
const menuCoupleHTML = document.getElementById("menu-couple");
const newGameBtnHTML = document.getElementById("newGameBtn");
const ulPlayerHTML = document.getElementById("playerList");

// CLASS VALUES
const maxCoupleCards = 4
const helpWithNums = true;
var player = new Couple(quienEsQuien[0].characters, maxCoupleCards, helpWithNums);
var multiplayer = new Multiplayer();
function loadPage() {
    let valueLocal = localStorage.getItem(COUPLECARDS);
    if (valueLocal !== null) {
        let nPlayer = JSON.parse(valueLocal)
        player.loadStorage(nPlayer);
        generateCards();
        rotateCorrect();
        if (player.firstCard !== null) {
            infoHTML.innerText = `Carta de '${player.getFirstCardName()}' seleccionada`;
        } else {
            infoHTML.innerText = `Selecciona cualquier carta`;
        }
    }
    menuCoupleHTML.style.display = "none";
    newGameBtnHTML.style.display = "block";
    console.log("Cargado");

    generateSelector();
    generateSelectorMax();
}

function generateSelector() {
    deleteChilds(selectorCoupleHTML);
    quienEsQuien.forEach((e, i) => {
        // let opt = document.createElement("option")
        let opt = new Option(e.title, i);
        selectorCoupleHTML.appendChild(opt);
    });
}

function generateSelectorMax() {
    deleteChilds(selectorMaxHTML);
    let charactersList = quienEsQuien[selectorCoupleHTML.selectedIndex].characters;
    /// predefault list
    let llistat = [4, 6, 8, 10, 14, 20];
    for (let i = 0; i <= charactersList.length; i++) {
        if (i < llistat.length) {
            let opt = new Option(llistat[i], llistat[i]);
            selectorMaxHTML.appendChild(opt);
        }
    }

    if (!llistat.includes(charactersList.length)) {
        let opt = new Option(charactersList.length, charactersList.length);
        selectorMaxHTML.appendChild(opt);
    }
}

let a = null;

function startCoupleGame(event) {
    event.preventDefault();
    console.log("e", event);
    // Prevent default auto-send
    a = new FormData(event.target);
    for (var pair of a.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
    // Generate ob from 'form'
    player = new Couple(
        quienEsQuien[selectorCoupleHTML.value].characters,
        selectorMaxHTML.value,
        isNumericHTML.checked
    );
    player.setNewMultiplayer(multiplayer);
    player.generateDouble();
    player.unorderPlayers();
    localStorage.setItem(COUPLECARDS, JSON.stringify(player));

    menuCoupleHTML.style.display = "none";
    newGameBtnHTML.style.display = "block";
    generateCards();
    addAnimationGenerations();
    infoHTML.innerText = `Selecciona cualquier carta`;
    if (player.isMultiplayer()) {
        console.info("Empieza a ", player.getPlayerName());
    }
}


function cardHTML(props, index, numeric) {
    // si es resolta, la card sencera es oculta 'aria-hidden'
    let numericHTML = '';
    let number = "";
    // si la carta es clicada la part frontal es oculta, la de darrere visible
    let isCard1Clicked = player.firstCard == null;
    // afegegeix un numero al html
    if (numeric) numericHTML = `<div class="help-num" aria-hidden="true">${index + 1}</div>`;
    if (numeric) number = index + 1;
    return `<li class="card">
    <div class="flip-card" aria-hidden="${player.isResolvedCard(props.id)}">
        <div class="flip-card-inner" data-key="${index}" data-card="${props.id}"  onclick="cardClicked(event)">
            <div class="flip-card-front" aria-hidden="${!isCard1Clicked}">
                <svg xmlns="http://www.w3.org/2000/svg" aria-label="Carta oculta ${number}" width="150" height="150" viewBox="0 -3 114 120">
                    <use xlink:href="zp.svg#outerzp" />
                </svg>
                ${numericHTML}
            </div>
            <div class="flip-card-back" aria-hidden="${isCard1Clicked}" >
            <img src="${props.image}" alt="Carta de ${props.name}" height="100%" width="100%">
            </div>
        </div>
    </div>
</li>`
}


function cardClicked(event) {
    // comprova si esta jugant
    if (!player.isPlaying) return;

    // agafa el valor mes proper al 'event
    const crdInner = event.target.closest('.flip-card-inner');
    const valueCard = crdInner.getAttribute('data-card');
    const keyCard = crdInner.getAttribute('data-key');
    // del valor html mes proper, extrau el front, back i img
    const backCard = crdInner.querySelector(".flip-card-front");
    const frontCard = crdInner.querySelector(".flip-card-back");

    // Comprova si tria una ja encertada
    if (player.isResolvedCard(valueCard)) return;

    //comprova si es la primera jugada i guarda la carta {key, value}
    if (player.firstMove(keyCard, valueCard)) {
        crdInner.style.transform = "rotateY(180deg)";
        frontCard.ariaHidden = "false";
        backCard.ariaHidden = "true";
        infoHTML.innerText = `Carta de '${player.getCardName(valueCard)}' seleccionada`;
        infoHTML.focus();
        localStorage.setItem(COUPLECARDS, JSON.stringify(player));
        return;
    };

    // Comprova si tria la mateixa carta en comptes d'una altre
    if (player.isSameCard(keyCard)) return;


    // si es la segonda jugada fa la comparacio
    if (player.compareCard(valueCard)) {
        crdInner.style.transform = "rotateY(180deg)";
        frontCard.ariaHidden = "false";
        backCard.ariaHidden = "true";
        crdInner.ariaHidden = "true";
        infoHTML.innerText = "Correcto, resuelve otra pareja ";
        if(player.isMultiplayer()){
            console.log(player.multiplayer.players);
            player.addPlayerPoints();
        }
        infoHTML.focus();
        player.saveResolvedCard(valueCard);
        localStorage.setItem(COUPLECARDS, JSON.stringify(player));
    } else {
        crdInner.style.transform = "rotateY(180deg)";
        frontCard.ariaHidden = "true";
        backCard.ariaHidden = "false";
        player.isPlaying = false;
        infoHTML.innerText = "Incorrecto, prueba otra pareja ";
        if (player.isMultiplayer()) {
            player.nextPlayer();
            console.log("Le toca a ", player.getPlayerName());
        }
        infoHTML.focus();
        localStorage.setItem(COUPLECARDS, JSON.stringify(player));
        // si falla es voltejan totes
        setTimeout(() => {
            rotateAll();
            player.isPlaying = true;
        }, 1000);
    }

    if (player.isAllCoupleCompleted()) {
        infoHTML.innerText = "¡Enhorabuena! Resuelto en " + player.turns + " turnos";
        infoHTML.focus();
        localStorage.removeItem(COUPLECARDS);
    }

}

function addFormPlayer(event) {
    // Prevent default auto-send
    event.preventDefault();
    let inputPlayer = document.getElementById("player-name");
    if (inputPlayer.value != "") {
        multiplayer.postPlayer(inputPlayer.value);
        inputPlayer.value = "";
    }

    deleteChilds(ulPlayerHTML);
    let playerList = multiplayer.getPlayers();
    playerList.forEach(e => {
        let li = document.createElement("li");
        li.innerText = e.name;
        ulPlayerHTML.appendChild(li);
    });
}

function rotateAll() {
    for (let i = 0; i < document.getElementsByClassName("flip-card-inner").length; i++) {
        const element = document.getElementsByClassName("flip-card-inner")[i];
        if (!player.isResolvedCard(element.getAttribute("data-card"))) {
            element.style.transform = "";
        }
    }
}

function rotateCorrect() {
    for (let i = 0; i < document.getElementsByClassName("flip-card-inner").length; i++) {
        const element = document.getElementsByClassName("flip-card-inner")[i];
        // ? prevent null
        if (player.isResolvedCard(element.getAttribute("data-card")) || player.firstCard?.key == element.getAttribute("data-key")) {
            element.style.transform = "rotateY(180deg)";
        }

    }
}

function generateCards() {
    let cards = document.getElementById("cards");
    deleteChilds(cards);
    player.doubleCards.forEach((e, index) => {
        let card = cardHTML(e, index, player.helpWithNums);
        cards.innerHTML += card;
    });

}

function addAnimationGenerations() {
    for (let i = 0; i < document.getElementsByClassName("flip-card-inner").length; i++) {
        const element = document.getElementsByClassName("flip-card-inner")[i];
        element.style.animation = "0.5s ease 0s 1 normal running aparece";
    }
}


function showMenu() {
    menuCoupleHTML.style.display = "flex";
    newGameBtnHTML.style.display = "none";
    menuCoupleHTML.focus();
}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}

