function fillCard() {
    var father = document.getElementById("cartas");
    cards.forEach(element => {
        //Per cada objecte json crea una carta amb aquest html
        let cardHtml = cardTemplate(element)
        //En comptes de 'appendChild' sumem el contingut anterior mes el nou
        father.innerHTML += cardHtml;
        //generateLinks(element.link)
    });


}



function generateLinks(link) {
    let pare = document.getElementById("links");
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = "/" + link;
    a.innerText = link
    li.appendChild(a);
    pare.appendChild(li);
}
// Crea un template del html de una carta
function cardTemplate({ title, image, alt, description, link }) {
    return `
    <article class="carta card" class="p-2 listaflex">
            <img width="318" height="171" class="card-img-top" src="${image}" alt="${alt}">
            <header class="card-body">
                <h1 class="card-title">${title}</h1>
                <p class="card-text">${description}</p>
            </header>
            <footer>
                <a href="/${link}" title="Ir a la página ${link}" class="btn btn-outline-success">Play</a>
                <a href="/como-jugar/#${link}" title="Ir al tutorial ${link}" class="btn btn-outline-primary">Como jugar</a>
                </footer
        </section>
    </article>
    `;
}
