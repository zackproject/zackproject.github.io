console.log("(͠≖ ͜ʖ͠≖)👌");

//Cada llibre tindra el seu propi localstorage
let LOCALSTORY = "write-your-story";
let BOOKLOCAL = "book";
class Chapter {
    constructor(title, parrafList) {
        this.title = title;
        this.parrafList = parrafList;
    }

    addParraf(texting) {
        //La paraula es dins deixa ficar
        this.parrafList.push(texting);
    }
    fullOfParrafs(maxParrafs) {
        //Comprova si el capitol te el maxim de paragafs
        return this.parrafList.length === maxParrafs;
    }
    isTitle() {
        return this.title !== null;
    }
    setTitle(text) {
        this.title = text;
    }

}

class Book {
    constructor(id, title, chapters, minChapters, wordsList, maxParrafs) {
        this.id = id;
        this.title = title;
        this.chapters = chapters;
        this.minChapters = minChapters;
        this.wordsList = wordsList;
        this.maxParrafs = maxParrafs;
        //Compte internament les paraules utilitzades
        this.actualIndexWord = 0;
        //Color de portada
        this.coverPageColor = "#174d0f";
    }
    disorderWordList() {
        //Desordena la lllista de paraules
        this.wordsList = this.wordsList.sort(() => Math.random() - 0.5);
    }
    isFillChapter() {
        //Es ple el capitol segons el num de parrafs?
        return this.chapters[this.chapters.length - 1].fullOfParrafs(this.maxParrafs);
    }
    isNextFillChapter() {
        //L'uktim capitol es plenaria amb la seguent parraf?
        return this.chapters[this.chapters.length - 1].fullOfParrafs(this.maxParrafs - 1);
    }
    isTitleLastChapter() {
        //Te titol l'ultim capitol?
        return this.chapters[this.chapters.length - 1].isTitle();
    }

    addNewChapter(text) {
        //Fica el parraf en un nou capitol
        this.chapters.push(new Chapter(null, [text]));
        this.actualIndexWord++;
    }

    addParrafLastChapter(text) {
        //Fica el parraf en el capitol actual
        this.chapters[this.chapters.length - 1].addParraf(text);
        this.actualIndexWord++;
    }

    getTodayWord() {
        //Si es queda sense paraules, afegeix 10 mes al final
        if (this.wordsList.length === this.actualIndexWord) {
            let ultims = this.wordsList.sort(() => Math.random() - 0.5).slice(-10);
            this.wordsList = this.wordsList.concat(ultims);
        }
        //Retorna la paraula que pertoca per al parraf
        return this.wordsList[this.actualIndexWord].word;
    }

    getTodayDefinition() {
        return this.wordsList[this.actualIndexWord].definition;
    }
    isTheWord(txt) {
        //Comprova si la paraula demanada es al parraf
        return txt.toLowerCase().includes(this.wordsList[this.actualIndexWord].word.toLowerCase());

    }
    setLastTitle(text) {
        //Posa titol al l'ultim capitol
        return this.chapters[this.chapters.length - 1].setTitle(text);
    }

    canCloseBook() {
        // Si te el minim de capitols i te titol, permet finalizar llibre
        return this.chapters.length >= this.minChapters && this.chapters[this.chapters.length - 1].title != null;
    }

    closeMyBook(id, title) {
        this.id = id;
        this.title = title;
        // El numero de paraules han de ser igual a les utilitzades
        this.wordsList = this.wordsList.slice(0, this.actualIndexWord);
    }
}




//Escriu algun cosa al textarea
// Si no hi ha capitols crea un nou sense titol
//Si hi ha el fa push al existen
//Al ficar el tercer capitol demana el titol
// Si arriba al minim de paraules (50) deixa finalitzar el libre i començar un altre
let parrafHTML = document.getElementById("textInput");
let titleHTML = document.getElementById("textTitle");

//Principals display block or none, capitol o titol o nova historia
let newStory = document.getElementById("sendStory");
let newParraf = document.getElementById("sendChapter");
let newTitle = document.getElementById("sendTitle");
let endStory = document.getElementById("endStory");
let containThiWord = document.getElementById("mustContainThisWord");


let containerStory = document.getElementById("container-story");
let containerReadBook = document.getElementById("lectura");
let player = null;
const parrafsByChapters = 3;
const minChapters = 3;

function startStory() {
    let wordsList = getWordList(document.getElementById("wordLista").value);
    //Crea un llibre buit
    player = new Book(0, null, [new Chapter(null, [])], minChapters, wordsList, parrafsByChapters);
    //Posa en un ordre diferents les paraules
    player.disorderWordList();
    document.getElementById("palabra").innerText = player.getTodayWord();
    document.getElementById("definicion").href = player.getTodayDefinition();
    document.getElementById("minChap").innerText = player.minChapters;
    //Si no empieza la historia que lo pierda
    //localStorage.setItem(LOCALSTORY,JSON.stringify(player));
    newStory.style.display = "none";
    newParraf.style.display = "block"
    // Enfoca al text area
    containThiWord.focus();
}

function getWordList(number) {
    switch (number) {
        case "1": //Catalan
            return catalanWords;
        case "2":  //Canarian
            return canarianWords;
        case "3": //Gallego
            return galicianWords;
        case "4": //Euskera
            return basqueWords;
        case "5": //Valencian
            return valencianWords;
        case "6": //Asturian
            return asturianWords;
        default:  //Castillan
            return castillianWords;
    }
}
function postText() {
    // No te paraula, no et deixo pujar
    if (!player.isTheWord(parrafHTML.value)) {
        console.log("Falta la palabra", player.getTodayWord());
        containThiWord.focus();
        return;
    }


    //Si en el seguent parraf s'ompliria, demana el titol
    if (player.isNextFillChapter()) {
        //display block input
        //player.addNewChapter(parrafHTML.value);
        console.log("Pon un titulo al anterior");
        newTitle.style.display = "block";
        newParraf.style.display = "none";
    }

    if (player.isFillChapter() && player.isTitleLastChapter()) {
        player.addNewChapter(parrafHTML.value);
    } else {
        player.addParrafLastChapter(parrafHTML.value);
    }
    parrafHTML.value = "";
    document.getElementById("palabra").innerText = player.getTodayWord();
    document.getElementById("definicion").href = player.getTodayDefinition();

    generateBook(player);

    //Si escriu parraf, continua la historia (no pot acabar sense titol)
    document.getElementById("btn-end-book").disabled = true;

    localStorage.setItem(LOCALSTORY, JSON.stringify(player));

    containThiWord.focus();

}

function canPostTitleBook() {
    document.getElementById("btn-end-book").style.display = "none";
    endStory.style.display = "block"
    newParraf.style.display = "none";
    generateBookInBookShelf
}

function postTitleChapter() {
    if (titleHTML.value != "") {
        player.setLastTitle(titleHTML.value);
        console.log("Titulado");
        titleHTML.value = "";
        generateBook(player);
        newParraf.style.display = "block";
        newTitle.style.display = "none";
        //Guarda localment
        localStorage.setItem(LOCALSTORY, JSON.stringify(player));

        //Si compleix al enviar el titol, deixa finalitzar la historia (deshabilita el parraf)
        if (player.canCloseBook()) {
            document.getElementById("btn-end-book").disabled = false;
        }
        return;
    }
    console.log("Pon un titulo porfa");
}

function onLoadStory() {
    let localBook = localStorage.getItem(LOCALSTORY);
    if (localBook === null) {
        //Si no hi ha llibre iniciat, deixa inicar un nou
        document.getElementById("sendStory").style.display = "block";
        newStory.style.display = "block";
    } else {
        // Si hi ha un llibre OBJ  iniciat, el mostra en html
        generateBook(JSON.parse(localBook));

        // El converteix en una clase amb metodes
        player = generateClassWithBook(JSON.parse(localBook));
        // Si el capitlos es ple i no te titol, demana el titol
        if (player.isFillChapter() && !player.isTitleLastChapter()) {
            newTitle.style.display = "block";
        } else {
            //Si no es ple, deixa continuar escrivint el parraf
            newParraf.style.display = "block";
        }
        //Completa la 'paraula', 'definicio' i 'capitols minim per finalizar'
        document.getElementById("palabra").innerText = player.getTodayWord();
        document.getElementById("definicion").href = player.getTodayDefinition();
        document.getElementById("minChap").innerText = player.minChapters;
        //Si compleix els minim per finalizar, deixa clicar per tancar llibre
        if (player.canCloseBook()) {
            document.getElementById("btn-end-book").disabled = false;
        }
        //Guarda els posibles nous valors
        localStorage.setItem(LOCALSTORY, JSON.stringify(player));
    }
    //Mostra els llistat de llibres acabats
    console.log("Llibres finalitzats", Object.keys(localStorage).filter(e => e.includes(BOOKLOCAL)));
    generateBookInBookShelf()
}

//Retorna un llibre amb les funciones del local Storage
function generateClassWithBook(mp) {
    let mplayer = new Book(mp.id, mp.title, [], mp.minChapters, mp.wordsList, mp.maxParrafs);
    mplayer.actualIndexWord = mp.actualIndexWord;
    mp.chapters.forEach(e => {
        mplayer.chapters.push(new Chapter(e.title, e.parrafList));
    });
    return mplayer;
}

//Borra el contingut del pare
function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}

//Crea en html un llibre a partir del OBJ
function generateBook(book) {
    let pare = document.getElementById("generateStory");
    deleteChilds(pare);
    book.chapters.forEach((e, i) => {
        let details = document.createElement("details");
        let summary = document.createElement("summary");
        //Titol capitol
        if (e.title !== null) {
            summary.innerHTML = "Capitulo " + (i + 1) + " - " + e.title;
        } else {
            summary.innerHTML = "Capitulo " + (i + 1);
        }
        details.appendChild(summary);
        //Parrafs del capitol
        e.parrafList.forEach(f => {
            let p = document.createElement("p");
            p.innerText = f;
            details.appendChild(p);
        });
        //Fica al pare
        pare.appendChild(details)
    });
    //Si no te titol, segueix escrivint, llavors, l'ultim capitol queda obert
    if (book.title === null) {
        let lastDetails = pare.getElementsByTagName("details");
        lastDetails[lastDetails.length - 1].open = true;
    }
}

function postBook() {
    let titleBook = document.getElementById("textTitleBook").value;
    if (titleBook != "") {
        //De les variables locals, compte quants son llibres
        const total = Object.keys(localStorage).filter(e => e.includes(BOOKLOCAL)).length;
        //L'id de llibre correspon a la cuantitat de llibres en local
        player.closeMyBook(total, titleBook);
        //Esborra el llibre escrit i el converteix en llibre acabat
        localStorage.removeItem(LOCALSTORY);
        //Transforma el titol en encode per no tenir problemes amb accents
        let encodeTitle = encodeURIComponent(player.title);
        console.log("Encoded", encodeTitle);
        //Guarda el llibre localment si no existeix
        console.log("Decoded", decodeURIComponent(encodeTitle));
        //El titol i el color portada es queda en localstorage
        let SAVELOCALBOOK = BOOKLOCAL + "-" + player.coverPageColor + "-" + encodeTitle;
        if (localStorage.getItem(SAVELOCALBOOK) == null) {
            localStorage.setItem(SAVELOCALBOOK, JSON.stringify(player));
            document.getElementById("endStory").style.display = "none";
            document.getElementById("generateStory").style.display = "none";
            document.getElementById("sendStory").style.display = "block";
            generateBookInBookShelf();
        } else {
            alert("Titulo repetido, escribe otro")
        }

    }
}

const btnTitleBook = (event) => {
    console.log(event.target.id);
    //Al clicar el boto, retorna el llibre escrit localment
    let readBook = JSON.parse(localStorage.getItem(event.target.id));
    //llegeix "book" NO player, perque sino sobrescriu la escritura actual
    fillBook(readBook);
}
function generateBookInBookShelf() {
    let bookPare = document.getElementById("libros");
    deleteChilds(bookPare);
    let llibres = Object.keys(localStorage).filter(e => e.includes(BOOKLOCAL));
    llibres.forEach(e => {
        // decode string  Exemple "story-color-title"; [1]=color [2]=title 
        //split 3 is to limit split "-" array 3 items
        let title = decodeURIComponent(e.split("-", 3)[2]);
        console.log(title);
        let btn = document.createElement("button");
        btn.title = "Libro"
        btn.innerText = title;
        btn.className = "book-on-shelf";
        btn.style.backgroundColor = e.split("-", 3)[1];
        btn.id = e;
        btn.onclick = btnTitleBook;
        bookPare.appendChild(btn);
    });
}



function fillBook(book) {
    let bookPages = document.getElementById("book-pages");
    let ntitlebook = document.getElementById("title-book");
    ntitlebook.innerText = book.title;
    document.getElementById("cover-page").style.backgroundColor = book.coverPageColor;
    document.getElementById("cover-page").style.border = "20px solid " + book.coverPageColor;
    let indexBook = document.getElementById("book-index");
    deleteChilds(indexBook);
    deleteChilds(bookPages);
    //Per cada parraf incrementa en 1, per poder utilitzar la 'wordlist' que pertoca
    let iParraf = 0;

    // bucle per cada capitol del llibre
    book.chapters.forEach((e, i) => {
        // Titols dels capitols, Index
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerText = e.title;
        a.href = "#chapter-" + (i + 1);
        li.appendChild(a);
        indexBook.appendChild(li);

        //Capitols
        let section = document.createElement("section");
        section.className = "book-page";
        let h2 = document.createElement("h2");
        h2.innerText = (i + 1) + ". " + e.title;
        h2.id = "chapter-" + (i + 1);
        section.appendChild(h2);

        // bucle per cada parraf del llibre
        const bookParrafs = book.chapters[i].parrafList;

        bookParrafs.forEach((element) => {
            let p = document.createElement("p");
            // Cambia la paraula del parraf per un destacat
            p.innerHTML = distinctWordUsedInParraf(book.wordsList[iParraf].word, element);
            section.appendChild(p);
            //incrementa iparraf per la seguent wordlist[iParraf]
            iParraf++;
        });

        bookPages.appendChild(section);
    });
    //Mostra el llibre
    containerReadBook.style.display = "flex";
    document.getElementById
    //Amaga el contungut de la pagina
    containerStory.ariaHidden = "true";
    ntitlebook.focus();
    console.log(book.wordsList);

}


function distinctWordUsedInParraf(word, parraf) {
    // La expresio regular 'gi' compara en cas de majuscula o minuscula indistintivament
    const expresionRegular = new RegExp(word, "gi");
    //"$&" en una expressió regular representa la coincidència trobada i es manté sense canvis en la cadena resultat.
    const parrafChanged = parraf.replace(expresionRegular, '<strong>$&</strong>');
    return parrafChanged;

}
function changeColor() {
    let demoCover = document.getElementById("demo-cover");
    let inputColor = document.getElementById("myColor").value;
    demoCover.style.backgroundColor = inputColor;
    demoCover.style.border = "20px solid " + inputColor;
    player.coverPageColor = inputColor;



}
function closeReadingBook() {
    containerReadBook.style.display = "none";
    //Talkback torna a interactuar amb la pagina
    containerStory.ariaHidden = "false";
    document.getElementById("write-story-header").focus();
}

function deleteAll() {
    localStorage.clear();
}

//let a = JSON.parse(`{"id":0,"title":"La cara","chapters":[{"title":"El Misteri de la Vall Encantada","parrafList":["En una nit clara d'estiu, la llum de la lluna banyava el petit poble amb una brillantor màgica. Un estrany fenomen d'ambigüitat estava passant. Les ombres dels arbres s'allargaven de manera inusual, prenent formes capricioses que ningú podia comprendre del tot. La gent del poble començava a sentir una inquietud que creixia amb cada hora que passava. Algunes persones deien que era un senyal dels déus, altres pensaven que era una conseqüència d'experiments secrets del govern. La ambigüitat dels fets augmentava mentre els esdeveniments estranys es succeïen. Un grup de valents decidí investigar el misteri i descobrir la veritat que es trobava darrere d'aquest fenomen inexpliCable.","A mesura que el grup d'investigadors explorava les zones misterioses del poble afectades per l'experiència inusual, van començar a experimentar sensacions estranyes i visions inexplicables. Els arbres prenien vida i els contorns dels edificis canviaven com si fossin fets d'argila. Tot semblava una experiència surrealista enmig d'una realitat que es desfeia. Un vell sabiós del poble va aparèixer, afirmant que només els que havien viscut prou temps en la vall coneixien l'experiència de la seva màgia oculta. Va explicar que aquests fenòmens eren una connexió amb l'antic passat de la vall i que només aquells amb un cor pur podrien desxifrar els secrets amagats en aquesta experiència misteriosa. El grup d'investigadors es va comprometre a descobrir tots els misteris que la vall amagava.","A mesura que el grup d'investigadors profunditzava en el procés d'explorar la vall misteriosa, van començar a trobar pistes que els portaven a llocs encara més enigmàtics. Va ser llavors que van descobrir un vell temple amagat al cor del bosc, cobert per la vegetació. Dins d'aquest temple antic, van trobar inscripcions antigues que parlaven d'un ritual ancestral que podria posar fi a la ambigüitat i revelar els secrets de la vall. Així, el grup va decidir seguir el procés indicat en les inscripcions. Amb la lluna plena com a testimoni, van començar el procés ritual amb l'esperança de desxifrar l'experiència misteriosa que envoltava el seu poble. La destinació final encara era incerta, però estaven determinats a descobrir la veritat oculta enmig d'aquesta aventura."]},{"title":"La Superació de les Contradiccions","parrafList":["Dins del temple antic, els membres del grup van seguir el procés del ritual amb determinació, però ràpidament van començar a notar una contradicció en les inscripcions i els esdeveniments que els envoltaven. Les paraules antigues semblaven contindre missatges duals, com si algú hagués volgut confondre els cercadors","L'impuls d'avançar i desxifrar els misteris de la Vall Encantada es va fer cada cop més fort en el cor del grup d'investigadors. Tot i les contradiccions i l'ambigüitat que els envoltava, cada pas que donaven els acostava més a la veritat amagada.","La superació de les contradiccions que havien envoltat la recerca es va convertir en l'objectiu principal del grup d'investigadors. Mentre estudiaven les inscripcions ocultes a l'estàtua, van descobrir que la superació de les dualitats era essencial per desxifrar els secrets de la Vall Encantada."]},{"title":"Un Món de Misteris i Imaginació 🥵","parrafList":["Malgrat haver resolt moltes de les contradiccions que havien envoltat la Vall Encantada, el grup d'investigadors va començar a adonar-se que hi havia una nova contraposició emergint. Aquesta contraposició es relacionava amb les forces màgiques de la vall i la responsabilitat de mantenir els seus secrets protegits.","El despreniment dels misteris que envoltaven la Vall Encantada es va convertir en una missió crucial per al grup d'investigadors. Malgrat les contradiccions i la superació de desafiaments, el seu compromís amb la veritat era inquebrantable. Amb la experiència acumulada i la contraposició resolta, el grup va decidir compartir els coneixements amb el poble. Els secrets de la Vall Encantada es van revelar en una cerimònia especial, i la gent va abraçar la seva nova comprensió amb gratitud.","Amb els secrets de la Vall Encantada revelats i la despreniment de la seva màgia compartida amb el món, els habitants del poble es van adonar que havien entrat en una nova era. Les possibilitats eren infinites i l'imaginació era el límit. Les generacions futures es van convertir en exploradors intrèpids, utilitzant la seva imaginació per descobrir nous racons de la vall i les seves pròpies aventures. El poble va florir amb creativitat i coneixement, aprofitant la bellesa natural i els misteris de la seva terra."]},{"title":"Desvelant els Misteris amb Detall","parrafList":["Amb l'aprovació unànime dels habitants del poble, la decisió de compartir els secrets de la Vall Encantada va ser celebrada com un gran triomf. Les festes i celebracions van omplir la vall mentre la gent es coneguia amb els misteris abans amagats. Els nens corretejaven pel bosc, deixant volar la seva imaginació mentre exploraven les antigues runes i boscos encantats. Els adults compartien històries de la superació dels desafiaments i les seves pròpies experiències a la vall, creant un teixit comunitari més fort.","La revolució del coneixement es va estendre per la Vall Encantada com un incendi forestal. Amb els secrets revelats i una comunitat unida, els habitants es van avançar cap a un futur amb una imaginació sense límits. No obstant això, aquesta nova era no va ser exempta de desafiaments. Una revolució del coneixement comportava responsabilitats i decisions importants. La gent havia de determinar com protegir la vall mentre compartia els seus misteris amb el món exterior.","La precisió es va convertir en un element clau a mesura que els habitants de la Vall Encantada es submergien en una nova era d'exploració i coneixement. Cada pas que donaven en aquesta jornada era meticulosament planificat per assegurar-se que protegirien els secrets de la vall mentre compartien els seus coneixements amb el món exterior. Els científics, artistes i investigadors van abordar cada tasca amb una precisió impressionant, explorant els racons més recòndits de la vall i documentant cada descobriment amb detall. La precisió en els seus esforços va permetre que la comunitat continués prosperant sense posar en perill el seu llegat."]},{"title":"L'Expectació a la Vall Encantada","parrafList":["L'autonomia sempre ha estat un valor fonamental a la Vall Encantada. Des de l'inici de la revolució del coneixement, els habitants han defensat amb fermesa la seva capacitat d'autonomia per prendre decisions importants sobre com gestionar i compartir els seus coneixements. Amb precisió i cura, han estat capaços de mantenir el delicat equilibri entre preservar els seus secrets màgics i permetre que els visitants explorin les meravelles de la vall. Aquesta autonomia els ha permès adaptar-se als canvis i avançar cap a un futur prometedor sense deixar enrere les seves arrels i la seva rica història.","La resistència sempre ha estat una característica clau de la Vall Encantada. Des dels seus primers dies de resistència contra les contradiccions i l'ambigüitat fins a la resistència en la preservació dels seus secrets, els habitants han demostrat una força inquebrantable. Tot i la revolució del coneixement i la precisió en la gestió dels seus recursos, la Vall Encantada encara s'enfronta a nous desafiaments. Canvis en el clima, noves dinàmiques socials i reptes ambientals posen a prova la seva resistència i la seva capacitat d'adaptació.","L'expectació era palpable a la Vall Encantada. Després de mesos de preparació, el gran esdeveniment estava a punt de començar. La gent del poble s'havia unit en un esforç col·lectiu per organitzar la celebració més gran que la Vall Encantada mai havia vist. Les cases estaven decorades amb colors vius i llums brillants. Els nens corrien pel carrer amb somriures d'expectació als seus rostres, mentre els adults es preparaven per a les festivitats. Tothom es reunia a la plaça del poble, on es muntava un escenari per a l'entreteniment i els discursos."]}],"minChapters":3,"wordsList":[{"word":"Ambigüitat","definition":"https://www.diccionari.cat/GDLC/ambiguitat"},{"word":"Experiència","definition":"https://www.diccionari.cat/GDLC/experiencia"},{"word":"Procés","definition":"https://www.diccionari.cat/GDLC/proces"},{"word":"Contradicció","definition":"https://www.diccionari.cat/GDLC/contradiccio"},{"word":"Impuls","definition":"https://www.diccionari.cat/GDLC/impuls"},{"word":"Superació","definition":"https://www.diccionari.cat/GDLC/superacio"},{"word":"Contraposició","definition":"https://www.diccionari.cat/GDLC/contraposicio"},{"word":"Despreniment","definition":"https://www.diccionari.cat/GDLC/despreniment"},{"word":"Imagina","definition":"https://www.diccionari.cat/GDLC/imaginar"},{"word":"Aprovació","definition":"https://www.diccionari.cat/GDLC/aprovacio"},{"word":"Revolució","definition":"https://www.diccionari.cat/GDLC/revolucio"},{"word":"Precisió","definition":"https://www.diccionari.cat/GDLC/precisio"},{"word":"Autonomia","definition":"https://www.diccionari.cat/GDLC/autonomia"},{"word":"Resistència","definition":"https://www.diccionari.cat/GDLC/resistencia"},{"word":"Expectació","definition":"https://www.diccionari.cat/GDLC/expectacio"}],"maxParrafs":3,"actualIndexWord":15,"coverPageColor":"#2b53ad"}`);
//localStorage.setItem("book-#2b53ad-La%20cara", JSON.stringify(a));