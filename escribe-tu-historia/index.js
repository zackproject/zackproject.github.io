console.log("(͠≖ ͜ʖ͠≖)👌");

//Cada llibre tindra el seu propi localstorage
let LOCALSTORY = "wrihte-your-story";
let BOOKLOCAL = "story-";
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
        return this.wordsList[this.actualIndexWord];
    }

    isTheWord(txt) {
        //Comprova si la paraula demanada es al parraf
        return txt.toLowerCase().includes(this.wordsList[this.actualIndexWord].toLowerCase());

    }
    setLastTitle(text) {
        //Posa titol al l'ultim capitol
        return this.chapters[this.chapters.length - 1].setTitle(text);
    }

    canCloseBook() {
        // Si te el minim de capitols i te titol, permet finalizar llibre
        return this.chapters.length >= this.minChapters && this.chapters[this.chapters.length - 1].title != null;
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

function startStory() {
    let parrafsByChapters = 3;
    let minChapters = 15;
    let wordsList = getWordList(document.getElementById("wordLista").value);
    //Crea un llibre buit
    player = new Book(0, null, [new Chapter(null, [])], minChapters, wordsList, parrafsByChapters);
    //Posa en un ordre diferents les paraules
    player.disorderWordList();
    document.getElementById("palabra").innerText = player.getTodayWord();
    //Si no empieza la historia que lo pierda
    //localStorage.setItem(LOCALSTORY,JSON.stringify(player));
    newStory.style.display = "none";
    newParraf.style.display = "block"
}

function getWordList(number) {
    switch (number) {
        case "1": //Catalan
            return ["manzana", "pera", "naranja", "uva", "plátano", "sandía", "fresa", "kiwi", "mango", "limón", "piña", "cereza", "papaya", "frambuesa", "melocotón", "albaricoque", "ciruela", "higo", "melón", "guayaba"];
        case "2":  //Castellano
            return ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Tesla", "BMW", "Audi", "Mercedes-Benz", "Lexus", "Volkswagen", "Hyundai", "Kia", "Mazda", "Subaru", "Jeep", "Chrysler", "Fiat", "Volvo", "Land Rover"];
        case "3": //Gallego
            return ["Juan", "María", "Pedro", "Ana", "Luis", "Laura", "Carlos", "Sofía", "Manuel", "Elena", "Andrés", "Isabel", "Rafael", "Lucía", "Javier", "Carmen", "Alejandro", "Marta", "Luisa", "Diego"];
        case "4": //Euskera
            return ["perro", "gato", "elefante", "tigre", "leon", "lobo", "oso", "cebra", "delfín", "jirafa", "pingüino", "serpiente", "tortuga", "rinoceronte", "hámster", "pájaro", "camello", "murciélago", "hipopótamo", "ardilla"];
        default:  //Valenciano
            return ["rosa", "manzanilla", "orquídea", "lirio", "tulipán", "girasol", "helecho", "cactus", "margarita", "violeta", "bonsái", "peonia", "diente de león", "dalia", "tomillo", "lavanda", "cerezo", "pino", "eucalipto", "bambú"];
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
    generateBook(player);
    localStorage.setItem(LOCALSTORY, JSON.stringify(player));

    if (player.canCloseBook()) {
        document.getElementById("btn-end-book").disabled = false;
    }
}

function canPostTitleBook() {
    endStory.style.display = "block"
    newParraf.style.display = "block"
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
        return;
    }
    console.log("Pon un titulo porfa");
}

function onLoadStory() {
    let localBook = localStorage.getItem(LOCALSTORY);
    if (localBook === null) {
        console.log("No hay nada guardado");
        document.getElementById("sendStory").style.display = "block";
        newStory.style.display = "block";
    } else {
        console.log("Precarga historia");
        //Genera el html de la historia
        generateBook(JSON.parse(localBook));
        player = generateClassWithBook(JSON.parse(localBook));
        if (player.isFillChapter() && !player.isTitleLastChapter()) {
            newTitle.style.display = "block";
        } else {
            newParraf.style.display = "block";
        }
        localStorage.setItem(LOCALSTORY, JSON.stringify(player));
    }
    document.getElementById("palabra").innerText = player.getTodayWord();

    console.log("ok");

    console.log("Llibres finalitzats", Object.keys(localStorage).filter(e => e.includes(BOOKLOCAL)));

}

//Retorna un llibre amb les funciones del local Storage
function generateClassWithBook(mp) {
    console.log("pedro", mp.wordsList);
    let mplayer = new Book(mp.id, mp.title, [], mp.minChapters, mp.wordsList, mp.maxParrafs);
    console.log(mplayer.wordsList);
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
    //Si no te titol, segueix escrivint, llavor l'ultim capitol obert
    if (book.title === null) {
        let lastDetails = pare.getElementsByTagName("details");
        lastDetails[lastDetails.length - 1].open = true;
    }
}

function postBook() {
    //De les variables locals, compte quants son llibres
    const total = Object.keys(localStorage).filter(e => e.includes(BOOKLOCAL)).length;
    //L'id de llibre correspon a la cuantitat de llibres en local
    player.id = total;
    //  El titol de llibre ve per al input
    player.title = document.getElementById("textTitleBook").value;
    //Esborra el llibre escrit i el converteix en llibre acabat
    localStorage.removeItem(LOCALSTORY);
    // El nom de llibre local es el numero de BOOKLOCAL + total
    localStorage.setItem(BOOKLOCAL + total, JSON.stringify(player))
}


//localStorage.setItem(LOCALSTORY, '{"id":0,"title":null,"chapters":[{"title":"Inicio de la casa","parrafList":["El nuevo miembro de mi banda es un Toyota","Jugaba en una piscina Honda"]},{"title":"Cars","parrafList":["Y Harrison Ford daba las buenas noches","el nuevo deberia ser un Chevrolet"]},{"title":"otaku","parrafList":["Y ohaio nissan waka waka","Este nuevo cap tesla pobre"]},{"title":"otro titulazo","parrafList":["y bmwwxyz esta invitado","Este caso deberia Audi tenerlo"]},{"title":"final ahora si part2","parrafList":["Y no te olvides del Mercedes-Benz que palo","seguimos lexus de casa"]},{"title":"pito","parrafList":["y Volkswagen o volks que torni"]}],"minChapters":50,"wordsList":["Toyota","Honda","Ford","Chevrolet","Nissan","Tesla","BMW","Audi","Mercedes-Benz","Lexus","Volkswagen","Hyundai","Kia","Mazda","Subaru","Jeep","Chrysler","Fiat","Volvo","Land Rover"],"maxParrafs":3,"actualIndexWord":11}')
