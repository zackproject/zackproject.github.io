
class Card {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class Couple {
    constructor(cards, maxCards) {
        this.points = 0;
        this.isPlaying = true;
        this.maxCards = maxCards / 2; // Si tria 10, es dupliquen i son 20
        this.cards = cards.slice(0, maxCards / 2);
        this.doubleCards = this.generateDouble();
        this.rightCardList = [];
        this.firstCard = null; // en realidad solo necesitas guardar una 'card1'
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

const maxCards = 4;
var player = new Couple(quienEsQuien[0].characters, maxCards);

function loadPage() {
    generateSelector();
    generateCards();
}


function cardHTML(props, index) {
    return `<li class="card">
    <div class="flip-card">
        <div class="flip-card-inner" data-key="${index}" data-card="${props.id}"  onclick="cardClicked(event)">
            <div class="flip-card-front" >
                <svg xmlns="http://www.w3.org/2000/svg" aria-label="Carta oculta" width="150" height="150" viewBox="0 -3 114 120">
                    <use xlink:href="zp.svg#outerzp" />
                </svg>
            </div>
            <div class="flip-card-back">
            <img aria-hidden="true" title="${props.name}" id="img-${props.id}" src="${props.image}" alt="${props.name}" height="100%" width="100%">
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
        let card = cardHTML(e, index);
        cards.innerHTML += card;
    });
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
function changeCoupleGame() {
    let n = document.getElementById("selector-couple").selectedIndex;
    player = new Couple(quienEsQuien[n].characters, 10);
    generateCards();
}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}

