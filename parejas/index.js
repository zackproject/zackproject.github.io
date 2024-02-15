
class Card {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class Couple {
    constructor(cards, maxCards, helpWithNums) {
        this.points = 0;
        this.isPlaying = true;
        this.maxCards = maxCards; // Si tria 10, es dupliquen i son 20
        this.cards = cards.slice(0, maxCards);
        this.doubleCards = this.generateDouble();
        this.rightCardList = [];
        this.firstCard = null; // en realidad solo necesitas guardar una 'card1'
        this.helpWithNums = helpWithNums;
    }

    saveResolvedCard(value) {
        this.rightCardList.push(value);
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

// HTML TAGS
// CLASS VALUES
const maxCoupleCards = 4
const helpWithNums = false;
var player = new Couple(quienEsQuien[0].characters, maxCoupleCards, helpWithNums);

function loadPage() {
    generateSelector();
    generateSelectorMax();
    generateCards();
}

function generateSelector() {
    let slct = document.getElementById("selector-couple");
    deleteChilds(slct);
    quienEsQuien.forEach((e, i) => {
        let opt = document.createElement("option");
        opt.innerText = e.title;
        opt.value = i;
        slct.appendChild(opt);
    });
}

function generateSelectorMax() {
    let slctMax = document.getElementById("selector-max");
    let slctSerie = document.getElementById("selector-couple");
    deleteChilds(slctMax);
    let charactersList = quienEsQuien[slctSerie.selectedIndex].characters;
    /// predefault list
    let llistat = [4, 6, 8, 10, 14, 20];
    for (let i = 0; i <= charactersList.length; i++) {
        if (i < llistat.length) {
            let opt = document.createElement("option");
            opt.innerText = llistat[i] + " parejas";
            opt.value = llistat[i];
            slctMax.appendChild(opt);
        }
    }

    if (!llistat.includes(charactersList.length)) {
        let opt = document.createElement("option");
        opt.innerText = charactersList.length + " parejas";
        opt.value = charactersList.length;
        slctMax.appendChild(opt);
    }
}

function changeCoupleGame() {
    // 'selectedIndex' devuelve : 0,1,2,3 NO EL VALOR REAL DE 'value'
    let n = document.getElementById("selector-couple").selectedIndex;
    let isNumeric = document.getElementById("numeric-cards");
    let m = document.getElementById("selector-max").value;
    player = new Couple(quienEsQuien[n].characters, parseInt(m), isNumeric.checked);
    generateCards();
}

function changeMaxCard() {
    let m = document.getElementById("selector-couple").selectedIndex;
    let n = document.getElementById("selector-max").value;
    let isNumeric = document.getElementById("numeric-cards");
    player = new Couple(quienEsQuien[m].characters, parseInt(n), isNumeric.checked);
    generateCards();
}

function toggleNumericCards() {
    let isNumeric = document.getElementById("numeric-cards");
    player.helpWithNums = isNumeric.checked;
    generateCards();
}

function cardHTML(props, index, numeric) {
    let numericHTML = '';
    console.log("numerirc", numeric);
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

    // Comprova si tria una ja encertada
    if (player.isResolvedCard(valueCard)) return;

    //comprova si es la primera jugada i guarda la carta {key, value}
    if (player.firstMove(keyCard, valueCard)) {
        cardClosestInner.style.transform = "rotateY(180deg)";
        return;
    };

    // Comprova si tria la mateixa carta en comptes d'una altre
    if (player.isSameCard(keyCard)) {
        console.log("lol eso no");
        return;
    }

    // si es la segonda jugada fa la comparacio
    if (player.compareCard(valueCard)) {
        cardClosestInner.style.transform = "rotateY(180deg)";
        player.saveResolvedCard(valueCard);
    } else {
        cardClosestInner.style.transform = "rotateY(180deg)";
        player.isPlaying = false
        // si falla es voltejan totes
        setTimeout(() => {
            rotateAll();
            player.isPlaying = true;
        }, 1000);
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



function generateCards() {
    player.generateDouble();
    let cards = document.getElementById("cards");
    deleteChilds(cards);
    player.doubleCards.forEach((e, index) => {
        let card = cardHTML(e, index, player.helpWithNums);
        cards.innerHTML += card;
    });
}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}

