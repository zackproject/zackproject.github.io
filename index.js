function fillCard() {
    var father = document.getElementById("cartas");
    cards.forEach(element => {
        //Per cada objecte json crea una carta amb aquest html
        let cardHtml = cardTemplate(element)
        //En comptes de 'appendChild' sumem el contingut anterior mes el nou
        father.innerHTML += cardHtml;
    });
}


// Crea un template del html de una carta
function cardTemplate({ title, image, alt, description, link }) {
    return `
    <div id="carta" class="p-2 listaflex">
        <div class="card">
            <img class="card-img-top" src="${image}" alt="${alt}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a href="${link}" class="btn btn-primary">Play</a>
            </div>
        </div>
    </div>
    `;
}

