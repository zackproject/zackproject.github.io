//Objecte que controla el joc 'Quien es quien'
class WhoIsWho {
    constructor(animeName, characterList, maxCharacters, myCharacter) {
        this.animeName = animeName;
        this.characterList = characterList;
        this.maxCharacters = maxCharacters;
        this.myCharacter = myCharacter;
        this.isPlaying = false;
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
    deleteChilds(selectAnime);

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
}

//https://www.w3schools.com/howto/howto_css_flip_card.asp
function flipCard(event) {
    //let ncard = document.getElementsByClassName("flip-card-inner");
    let pos = null;

    //Cara: Controla quan es mostra imatge 
    if (event.target.parentElement.id != "") {
        //Controla la clase 'img-[num]'
        pos = parseInt((event.target.parentElement.id).split("-")[1]);
        //Control de accesibilidad por carta TalkBack
        //document.getElementById("img-" + pos).ariaHidden = false;
        //document.getElementById("name-" + pos).ariaHidden = true;
    }

    //Creu: Controla quan es mostra el text
    if (event.target.id != "") {
        //Controla la clase 'car>d-[num]'
        pos = parseInt((event.target.id).split("-")[1]);


    }

    //Si la posicio es nulla no fa animacio
    if (pos !== null) {
        let nameA = document.getElementById("name-" + pos);
        let imgA = document.getElementById("img-" + pos);
        //Quan cliques la carta varia si la imatge o el text de darrere es visible
        nameA.ariaHidden = nameA.ariaHidden == "false" ? "true" : "false";
        imgA.ariaHidden = imgA.ariaHidden == "true" ? "false" : "true";
        console.log(nameA.ariaHidden, imgA.ariaHidden);

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

function selectCard() {
    for (let i = 0; i < document.getElementsByClassName("flip-card-inner").length; i++) {
        const element = document.getElementsByClassName("flip-card-inner")[i];
        element.style.filter = "brightness(0.3)";
    }
    //Agada la id del personatge
    let cardid = parseInt((event.target.id).split("-")[1]);
    //Guarda el selecionar
    let seleccio = player.characterList.filter(e => e.id == cardid)[0];
    player.myCharacter = seleccio;

    document.getElementById("card-" + cardid).style.filter = "";
    //document.getElementById("elegir-btn").style.display = "none";
    document.getElementById("empezar-btn").style.display = "block";
    // molesta si estas eligiendo document.getElementById("empezar-btn").focus();
    document.getElementById("empezar-btn").focus();
}

function cardClicked(event) {
    if (player.isPlaying) {
        flipCard(event)
    } else {
        selectCard();
    }
}

function cardHTML(props) {
    return `<li class="card">
    <div class="flip-card" onclick="cardClicked(event)">
        <div id="card-${props.id}" class="flip-card-inner">
            <div class="flip-card-front" >
                <img aria-hidden="false" title="${props.title}" id="img-${props.id}" src="${props.image}" alt="${props.alt}" height="100%" width="100%">
            </div>
            <div class="flip-card-back">
                <h3 aria-hidden="true" title="Personaje descartado, click para volver a activarlo " id="name-${props.id}">${props.name}</h3>
                <p id="anime-${props.id}" aria-hidden="true">${props.anime}</p>
            </div>
        </div>
    </div>
</li>`
}


function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}


function generateCardsHTML() {
    deleteChilds(document.getElementById("cards"));
    //let cont = 0;
    player.characterList.forEach(e => {
        //if (cont < player.maxCharacters) {
        //Si el alt esta vacio 
        //Pongo un valor por defecto
        let altCharacter = "Personaje";
        if (e.alt == "" || e.alt == undefined || e.alt == null) altCharacter = e.name;
        else altCharacter = "Nombre:" + e.name + ". Descripción: " + e.alt;
        let titleCharacter = "Click para seleccionar y poder empezar la partida pulsando el botón 'Empezar Partida'";
        if (player.isPlaying) titleCharacter = "Click para descartar personaje"
        let props = { id: e.id, image: e.image, name: e.name, anime: player.animeName, alt: altCharacter, title: titleCharacter };
        document.getElementById("cards").innerHTML += cardHTML(props)
        //  cont++;
        // }
    });

    for (let i = 0; i < document.getElementsByClassName("card").length; i++) {
        const element = document.getElementsByClassName("card")[i];
        element.style.animation = "aparece 2s";
        element.style.animationDelay = i / 10 + "s";
        element.style.animationFillMode = "forwards";
    }
}

function novaPartida() {
    //Amaga la carta d'opcions
    document.getElementById("empezar-btn").style.display = "none";
    player.isPlaying = true;
    generateCardsHTML();
    for (let i = 0; i < document.getElementsByClassName("flip-card-inner").length; i++) {
        const element = document.getElementsByClassName("flip-card-inner")[i];
        element.style.filter = null;
    }

    document.getElementById("select-anime").style.display = "none";
    document.getElementById("showpersonaje").style.display = "block";
    document.getElementById("newPartida").style.display = "block";
    document.getElementById("cards").focus();

}



function loadGame() {
    //Omple el selector de anime
    generateSelects();
    //Genera les cartes
    generateCardsHTML();
    //Genera el footer
    makeFooter();
    document.getElementById("cards").focus();
}

function newGame() {
    document.getElementById("fondo-card").style.display = "none";

    document.getElementById("modal-new-game").style.top = "-250px";
    document.getElementById("select-anime").style.display = "block";
    document.getElementById("showpersonaje").style.display = "none";
    document.getElementById("newPartida").style.display = "none";
    player.isPlaying = false;

    generateCardsHTML();

}



function changeAnime() {
    let slctAnime = parseInt(document.getElementById("select-anime").selectedOptions[0].value);
    let selectOBJ = quienEsQuien[slctAnime];
    player.characterList = selectOBJ.characters;
    player.animeName = selectOBJ.title;
    player.myCharacter = selectOBJ.characters[0];
    player.isPlaying = false
    generateCardsHTML();

}

function showMyCharacter() {
    document.getElementById("fondo-card").style.display = "block";
    document.getElementById("card-selector-mycharacter").style.top = "10%";
    document.getElementById("mycharacter-name").innerText = player.myCharacter.name;
    let imgMine = document.getElementById("mycharacter-image");
    imgMine.alt = player.myCharacter.alt;
    imgMine.src = player.myCharacter.image;
    let btnHide = document.getElementById("btn-ocultar");
    let altCharacter = "Nombre:" + player.myCharacter.name + ". Descripción: " + player.myCharacter.alt;
    btnHide.title = altCharacter;
    btnHide.focus();

}

function ocultarPersonaje() {
    document.getElementById("fondo-card").style.display = "none";
    document.getElementById("card-selector-mycharacter").style.top = "-600px";
    document.getElementById("cards").focus();
}

function ocultaCartas() {
    //Nomes en partida es pot treure la carta i el fons sol.
    document.getElementById("fondo-card").style.display = "none";
    document.getElementById("card-selector-mycharacter").style.top = "-600px";
    document.getElementById("card-selector-anime").style.top = "-600px";
}


function hideNewGame() {
    document.getElementById("fondo-card").style.display = "none";
    document.getElementById("modal-new-game").style.top = "-250px";
    document.getElementById("showpersonaje").style.display = "block";
}

function showModalNewGame() {
    document.getElementById("modal-new-game").style.top = "150px";
    document.getElementById("fondo-card").style.display = "block";
    document.getElementById("showpersonaje").style.display = "none";
    document.getElementById("title-diag").focus();
}


/* Cada any el footer posara l'any actual */
function makeFooter() {
    const d = new Date();
    let foot = document.getElementsByTagName("footer")[0];
    foot.innerHTML = `Zack Sama · ${d.getFullYear()} · <a href="https://zackproject.github.io"> Zack Project</a>`;
}

function twiceVisibilityAccesible() {
    let estat = document.getElementById("dialogAccesible");
    if (estat.style.display === "none" || estat.style.display === "") {
        estat.style.display = "block"
        document.getElementById("dialogAccesible").focus();
    } else { estat.style.display = "none" };
}