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

}

function flipAllCard() {
    //Dona a volta a totes les cartes
    for (let i = 0; i < document.getElementsByClassName("flip-card-inner").length; i++) {
        const element = document.getElementsByClassName("flip-card-inner")[i];
        element.style.transform = ""
    }
}

function cardHTML(nid, img, name, anime) {
    return `<div class="card">
    <div class="flip-card" onclick="flipCard(event)">
        <div id="card-${nid}" class="flip-card-inner">
            <div class="flip-card-front">
                <img id="img-${nid}" src="${img}" alt="Avatar" height="100%" width="100%">
            </div>
            <div class="flip-card-back">
                <h1>${name}</h1>
                <p>${anime}</p>
            </div>
        </div>
    </div>
</div>`
}
function novaPartida() {
    let ntitle = quienEsQuien[0].title;
    quienEsQuien[0].characters.forEach(e => {
        document.getElementById("cards").innerHTML += cardHTML(e.id, e.image, e.name, ntitle)
    
    });

    for (let i = 0; i < document.getElementsByClassName("card").length; i++) {
        const element = document.getElementsByClassName("card")[i];
        element.style.animation = "aparece 2s";
        element.style.animationDelay = i/4 + "s";
        element.style.animationFillMode = "forwards";
    }
}


