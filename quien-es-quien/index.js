let isPlaying = false;
//Objecte que controla el joc 'Quien es quien'
class WhoIsWho {
    constructor(animeName, characterList, maxCharacters, myCharacter) {
        this.animeName = animeName;
        this.characterList = characterList
        this.maxCharacters = maxCharacters;
        this.myCharacter = myCharacter;
    }

    //Actualitza el personatge del Player
    nextCharacter() {
        console.log("min", this.characterList[0].id, "max", this.characterList[this.characterList.length - 1].id);
        if (this.myCharacter.id < this.characterList[this.characterList.length - 1].id) {
            //Dins els compara la id del 1r element i la id del ultim element
            //this.myCharacter = this.characterList[this.myCharacter.id + 1];
            this.myCharacter = this.characterList.filter(e => e.id == this.myCharacter.id + 1)[0];

        }
    }
    //Actualitza el personatge del Player
    backCharacter() {
        if (this.myCharacter.id > this.characterList[0].id) {
            //this.myCharacter = this.characterList[this.myCharacter.id - 1];

            this.myCharacter = this.characterList.filter(e => e.id == this.myCharacter.id - 1)[0];
        }
    }

}

//Partida per defecte
var player = new WhoIsWho(
    quienEsQuien[0].title, //Nom de la serie
    quienEsQuien[0].characters, //Personatges de Shingeki
    quienEsQuien[0].characters.length, // Maxim de personatge en partida
    quienEsQuien[0].characters[0]); // Personatge triat per defecte

console.log(player);
//Objecte del joc


function generateSelects() {
    //Selector d'anime
    let selectAnime = document.getElementById("select-anime");
    for (i in quienEsQuien) {
        let noption = document.createElement("option");
        //Seleciona el primer item
        if (i == 0) noption.selected = true;
        //El value es la i
        noption.value = i;
        //El text son els anime
        noption.text = quienEsQuien[i].title;
        selectAnime.appendChild(noption)
    }

    //Omple l'ultim selector de personatges, el primer son '0' i '12' (html)
    let selectCards = document.getElementById("select-cards");
    let moption = document.createElement("option");
    moption.value = player.maxCharacters;
    //El text son els changeAnime
    moption.selected = "true";
    moption.text = player.maxCharacters + " personajes";
    selectCards.appendChild(moption)
}

//https://www.w3schools.com/howto/howto_css_flip_card.asp
function flipCard(event) {
    let ncard = document.getElementsByClassName("flip-card-inner");
    let pos = null;

    //Cara: Controla quan es mostra imatge 
    if (event.target.parentElement.id != "") {
        //Controla la clase 'img-[num]'
        pos = parseInt((event.target.parentElement.id).split("-")[1]);
    }

    //Creu: Controla quan es mostra el text
    if (event.target.id != "") {
        //Controla la clase 'card-[num]'
        pos = parseInt((event.target.id).split("-")[1]);
    }
    //Si la posicio es nulla no fa animacio
    if (pos !== null) {
        //Segons que clica agafa el numero, i sempre hi haura una carta card-[num] disponible
        document.getElementById("card-" + pos).style.transform = document.getElementById("card-" + pos).style.transform ? "" : "rotateY(180deg)"
    }
}

function flipAllCard() {
    //Dona a volta a totes les cartes
    for (let i = 0; i < document.getElementsByClassName("flip-card-inner").length; i++) {
        const element = document.getElementsByClassName("flip-card-inner")[i];
        element.style.transform = ""
    }
}

function cardHTML(props) {
    return `<div class="card">
    <div class="flip-card" onclick="flipCard(event)">
        <div id="card-${props.id}" class="flip-card-inner">
            <div class="flip-card-front">
                <img id="img-${props.id}" src="${props.image}" alt="${props.name}" height="100%" width="100%">
            </div>
            <div class="flip-card-back">
                <h1 id="name-${props.id}">${props.name}</h1>
                <p id="anime-${props.id}">${props.anime}</p>
            </div>
        </div>
    </div>
</div>`
}



function nextImage() {
    player.nextCharacter();
    refreshViewSelector()
}
function backImage() {
    player.backCharacter();
    refreshViewSelector();
}

function refreshViewSelector() {
    document.getElementById("image-name").innerText = player.myCharacter.name;
    document.getElementById("image-card").src = player.myCharacter.image;
    //En comptes de posar la id original, resta la id del primer (51) i começa desde alla (0+1)
    document.getElementById("indexSelect").innerText = parseInt(player.myCharacter.id) + 1 - player.characterList[0].id;
    //No varia perque sera el que medeix l'array
    document.getElementById("indexMax").innerText = player.maxCharacters;

}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}


function novaPartida() {
    isPlaying = true;
    deleteChilds(document.getElementById("cards"));
    let cont = 0;
    player.characterList.forEach(e => {
        if (cont < player.maxCharacters) {
            let props = { id: e.id, image: e.image, name: e.name, anime: player.animeName };
            document.getElementById("cards").innerHTML += cardHTML(props)
            cont++;
        }
    });

    for (let i = 0; i < document.getElementsByClassName("card").length; i++) {
        const element = document.getElementsByClassName("card")[i];
        element.style.animation = "aparece 2s";
        element.style.animationDelay = i / 10 + "s";
        element.style.animationFillMode = "forwards";
    }

    document.getElementById("image-card").src = player.myCharacter.image;

    //Amaga la carta d'opcions
    document.getElementById("fondo-card").style.display = "none";
    document.getElementById("card-selector-anime").style.top = "-600px";
}



function loadGame() {
    //Posa la imatge per defecte del personatge
    document.getElementById("image-card").src = player.myCharacter.image;
    //Omple el selector de anime
    generateSelects();
    //Refresa la vista
    refreshViewSelector();
}


function changeAnime() {
    let slctAnime = parseInt(document.getElementById("select-anime").selectedOptions[0].value);
    let selectOBJ = quienEsQuien[slctAnime];
    player.characterList = selectOBJ.characters;
    player.animeName = selectOBJ.title;
    player.myCharacter = selectOBJ.characters[0];
    console.log(player);
    refreshViewSelector();
}

function changeCharacter() {
    let slctCharacter = document.getElementById("select-cards").selectedOptions[0];
    player.maxCharacters = parseInt(slctCharacter.value)
    //Reseteja al primer
    player.myCharacter = player.characterList[0];
    refreshViewSelector();
}

function showMyCharacter() {
    document.getElementById("fondo-card").style.display = "block";
    document.getElementById("card-selector-mycharacter").style.top = "10%";
    document.getElementById("mycharacter-name").innerText = player.myCharacter.name;
    document.getElementById("mycharacter-image").alt = player.myCharacter.name;
    document.getElementById("mycharacter-image").src = player.myCharacter.image;
}

function showOptions() {
    //Ensenya la carta
    document.getElementById("fondo-card").style.display = "block";
    document.getElementById("card-selector-anime").style.top = "10%";
}

function ocultarPersonaje() {
    document.getElementById("fondo-card").style.display = "none";
    document.getElementById("card-selector-mycharacter").style.top = "-600px";
}

function ocultaCartas() {
    //Nomes en partida es pot treure la carta i el fons sol.
    if (isPlaying) {
        document.getElementById("fondo-card").style.display = "none";
        document.getElementById("card-selector-mycharacter").style.top = "-600px";
        document.getElementById("card-selector-anime").style.top = "-600px";
    }
}
