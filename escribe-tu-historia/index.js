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
        default:  //Valenciano
           // return ["rosa", "manzanilla", "orquídea", "lirio", "tulipán", "girasol", "helecho", "cactus", "margarita", "violeta", "bonsái", "peonia", "diente de león", "dalia", "tomillo", "lavanda", "cerezo", "pino", "eucalipto", "bambú"];
    }
}
function postText() {
    // No te paraula, no et deixo pujar
    if (!player.isTheWord(parrafHTML.value)) {
        console.log("Falta la palabra", player.getTodayWord());
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

    document.getElementById("mustContainThisWord").focus();

}

function canPostTitleBook() {
    document.getElementById("btn-end-book").style.display = "none";
    endStory.style.display = "block"
    newParraf.style.display = "none"
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
            localStorage.setItem(SAVELOCALBOOK, JSON.stringify(player))
        } else {
            alert("Titulo repetido, escribe otro")
        }

    }
}

const btnTitleBook = (event) => {
    console.log(event.target.id);
    //Al clicar el boto, retorna el llibre escrit localment
    player = JSON.parse(localStorage.getItem(event.target.id));
    console.log("pedro", player);
    fillBook(player);
}
let bookPare = document.getElementById("libros");

let llibres = Object.keys(localStorage).filter(e => e.includes(BOOKLOCAL));
llibres.forEach(e => {
    // decode string  Exemple "story-color-title"; [1]=color [2]=title 
    //split 3 is to limit split "-" array 3 items
    let title = decodeURIComponent(e.split("-", 3)[2]);
    console.log(title);
    let btn = document.createElement("button");
    btn.innerText = title;
    btn.className = "book-on-shelf";
    btn.style.backgroundColor = e.split("-", 3)[1];
    btn.id = e;
    btn.onclick = btnTitleBook;
    bookPare.appendChild(btn);
});


function fillBook(book) {
    let bookPages = document.getElementById("book-pages");
    document.getElementById("title-book").innerText = book.title;
    document.getElementById("cover-page").style.backgroundColor = book.coverPageColor;
    document.getElementById("cover-page").style.border = "20px solid " + book.coverPageColor;

    let indexBook = document.getElementById("book-index");
    deleteChilds(indexBook);
    deleteChilds(bookPages);
    player.chapters.forEach((e, i) => {
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
        let h1 = document.createElement("h1");
        h1.innerText = (i + 1) + ". " + e.title;
        h1.id = "chapter-" + (i + 1);
        section.appendChild(h1);
        (player.chapters[i]).parrafList.forEach(element => {
            let p = document.createElement("p");
            p.innerText = element;
            section.appendChild(p);
        });
        bookPages.appendChild(section);
    });
    //Mostra el llibre
    document.getElementById("lectura").style.display = "block";
}


function changeColor() {
    let demoCover = document.getElementById("demo-cover");
    let inputColor = document.getElementById("myColor").value;
    demoCover.style.backgroundColor = inputColor;
    demoCover.style.border = "20px solid " + inputColor;
    player.coverPageColor = inputColor;



}


function deleteAll() {
    localStorage.clear();
}