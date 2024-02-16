
class Card {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class Multiplayer {
    constructor(name) {
        this.name = name;
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
    }

    loadStorage(props) {
        this.turns = props.turns;
        this.points = props.points;
        this.cards = props.cards;
        this.doubleCards = props.doubleCards;
        this.rightCardList = props.rightCardList;
        this.firstCard = props.firstCard;
        this.helpWithNums = props.helpWithNums;
        console.log(props);
    }
    saveResolvedCard(value) {
        this.rightCardList.push(value);
    }

    isAllCoupleCompleted() {
        return this.rightCardList.length - this.cards.length === 0;
    }

    isSameCard(key) {
        // key es valor unic, value es repeteix
        return this.firstCard.key == key;
    }

    isResolvedCard(value) {
        return this.rightCardList.includes(value);
    }

    // Al clicar una carta envia la carta aquesta funcion
    firstMove(key, value) {
        if (this.firstCard == null && this.firstCard == null) {
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
}
const COUPLECARDS = "couplecards";

// HTML TAGS
const selectorCoupleHTML = document.getElementById("selector-couple");
const selectorMaxHTML = document.getElementById("selector-max");
const isNumericHTML = document.getElementById("numeric-cards");
// CLASS VALUES
const maxCoupleCards = 4
const helpWithNums = true;
var player = new Couple(quienEsQuien[0].characters, maxCoupleCards, helpWithNums);

function loadPage() {
    let valueLocal = localStorage.getItem(COUPLECARDS);
    if (valueLocal !== null) {
        let nPlayer = JSON.parse(valueLocal)
        console.log("hell is forever", nPlayer);
        player.loadStorage(nPlayer);
        generateCards();
        rotateCorrect();
        console.log("Cargado");
    } /*else {
        player.generateDouble();
        localStorage.setItem(COUPLECARDS,JSON.stringify(player));
        console.log("Generado");
    }*/

    generateSelector();
    generateSelectorMax();
}

function generateSelector() {
    deleteChilds(selectorCoupleHTML);
    quienEsQuien.forEach((e, i) => {
        let opt = document.createElement("option");
        opt.innerText = e.title;
        opt.value = i;
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
            let opt = document.createElement("option");
            opt.innerText = llistat[i];
            opt.value = llistat[i];
            selectorMaxHTML.appendChild(opt);
        }
    }

    if (!llistat.includes(charactersList.length)) {
        let opt = document.createElement("option");
        opt.innerText = charactersList.length;
        opt.value = charactersList.length;
        selectorMaxHTML.appendChild(opt);
    }
}


function startCoupleGame(event) {
    // Prevent default auto-send
    event.preventDefault();
    // Generate ob from 'form'
    player = new Couple(
        quienEsQuien[selectorCoupleHTML.value].characters,
        selectorMaxHTML.value,
        isNumericHTML.checked
    );

    player.generateDouble();
    localStorage.setItem(COUPLECARDS, JSON.stringify(player));
    generateCards();
}



function cardHTML(props, index, numeric) {
    let numericHTML = '';
    if (numeric) numericHTML = `<div class="help-num">${index + 1}</div>`;
    return `<li class="card">
    <div class="flip-card">
        <div class="flip-card-inner" data-key="${index}" data-card="${props.id}"  onclick="cardClicked(event)">
            <div class="flip-card-front">
                <svg xmlns="http://www.w3.org/2000/svg" aria-label="Carta oculta" width="150" height="150" viewBox="0 -3 114 120">
                    <use xlink:href="zp.svg#outerzp" />
                </svg>
                ${numericHTML}  
            </div>
            <div class="flip-card-back" aria-hidden="true" >
            <img src="${props.image}" alt="Carta de ${props.name}" height="100%" width="100%">
            </div>
        </div>
    </div>
</li>`
}


function cardClicked(event) {
    // comprova si esta jugant
    if (!player.isPlaying) return;
    // agafa el valor de la caera
    let cardClosestInner = event.target.closest('.flip-card-inner');
    let valueCard = cardClosestInner.getAttribute('data-card');
    let keyCard = cardClosestInner.getAttribute('data-key');

    cardClosestInner.getElementsByClassName("flip-card-front")[0].ariaHidden = "true";
    cardClosestInner.getElementsByClassName("flip-card-back")[0].ariaHidden = "false";

    // Comprova si tria una ja encertada
    if (player.isResolvedCard(valueCard)) return;

    //comprova si es la primera jugada i guarda la carta {key, value}
    if (player.firstMove(keyCard, valueCard)) {
        cardClosestInner.style.transform = "rotateY(180deg)";
        localStorage.setItem(COUPLECARDS, JSON.stringify(player));
        return;
    };

    // Comprova si tria la mateixa carta en comptes d'una altre
    if (player.isSameCard(keyCard)) return;


    // si es la segonda jugada fa la comparacio
    if (player.compareCard(valueCard)) {
        cardClosestInner.style.transform = "rotateY(180deg)";
        player.saveResolvedCard(valueCard);
        localStorage.setItem(COUPLECARDS, JSON.stringify(player));
    } else {
        cardClosestInner.style.transform = "rotateY(180deg)";
        player.isPlaying = false
        // si falla es voltejan totes
        setTimeout(() => {
            rotateAll();
            player.isPlaying = true;
        }, 1000);
    }

    if (player.isAllCoupleCompleted()) {
        console.log("WIN!\nModo " + player.cards.length + " parejas\nTurnos: " + player.turns);
        localStorage.removeItem(COUPLECARDS);
    }

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

    for (let i = 0; i < document.getElementsByClassName("flip-card-inner").length; i++) {
        const element = document.getElementsByClassName("flip-card-inner")[i];
        element.style.animation = "0.5s ease 0s 1 normal running aparece";
    }
}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}

