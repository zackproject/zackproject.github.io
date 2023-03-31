var quienEsQuienList = quienEsQuien[0].characters;
var ntitle = quienEsQuien[0].title;
var selectedCharacter = 0;

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

function addSelectorCharacter(selected) {
    document.getElementById("image-card").src = selected[0].image;
}

function nextImage() {
    if (selectedCharacter < quienEsQuienList.length) {
        selectedCharacter++;
    }
    document.getElementById("image-card").src = quienEsQuienList[selectedCharacter].image;
    console.log("next", quienEsQuienList[selectedCharacter].image);
}
function backImage() {
    if (selectedCharacter > quienEsQuienList.length) {
        selectedCharacter--;
    }
    document.getElementById("image-card").src = quienEsQuienList[selectedCharacter].image;
    console.log("next", quienEsQuienList[selectedCharacter].image);}

function select() {

}


function novaPartida() {
    quienEsQuienList.forEach(e => {
        console.log(ntitle);
        let props = { id: e.id, image: e.image, name: e.name, anime: ntitle };
        document.getElementById("cards").innerHTML += cardHTML(props)

    });

    for (let i = 0; i < document.getElementsByClassName("card").length; i++) {
        const element = document.getElementsByClassName("card")[i];
        element.style.animation = "aparece 2s";
        element.style.animationDelay = i / 4 + "s";
        element.style.animationFillMode = "forwards";
    }

    addSelectorCharacter(quienEsQuien[0].characters);
}


