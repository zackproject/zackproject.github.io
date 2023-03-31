
//Anime selecionat
var animeId = 0;
//Personatge per jugar seleccionat
var selectedCharacter = 0;
//Total Carta
var maxCard = 25;
//Personatges del anime
var quienEsQuienList = quienEsQuien[animeId].characters;
//Titol
var ntitle = quienEsQuien[animeId].title;

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
        ncard[pos].style.transform = ncard[pos].style.transform ? "" : "rotateY(180deg)"
    }
    console.log("clicado", event.target.id);


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
                <img id="img-${props.id}" src="${props.image}" alt="Avatar" height="100%" width="100%">
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
    if (selectedCharacter < quienEsQuienList.length - 1) {
        selectedCharacter++;
        document.getElementById("image-card").src = quienEsQuienList[selectedCharacter].image;
    }
    refreshViewSelector()
}
function backImage() {
    if (selectedCharacter > 0) {
        selectedCharacter--;
        document.getElementById("image-card").src = quienEsQuienList[selectedCharacter].image;
    }
    refreshViewSelector();
}

function refreshViewSelector() {
    document.getElementById("indexSelect").innerText = selectedCharacter + 1;
    document.getElementById("indexMax").innerText = quienEsQuienList.length;
}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}


function novaPartida() {
    deleteChilds(document.getElementById("cards"));
    let cont = 0;
    quienEsQuienList.forEach(e => {
        if (cont < maxCard) {
            console.log(ntitle);
            let props = { id: e.id, image: e.image, name: e.name, anime: ntitle };
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

    document.getElementById("image-card").src = quienEsQuienList[selectedCharacter].image;

}


function loadGame() {
    //Posa la imatge per defecte del personatge
    document.getElementById("image-card").src = quienEsQuienList[selectedCharacter].image;
    //Omple el selector de anime
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
    moption.value = quienEsQuienList.length;
    //El text son els anime
    moption.selected = "true";
    moption.text = quienEsQuienList.length + " personajes";
    selectCards.appendChild(moption)
    refreshViewSelector();
}

function changeCharacter (){
    let a = document.getElementById("select-cards").selectedOptions[0].value;
    maxCard = parseInt(a)
}