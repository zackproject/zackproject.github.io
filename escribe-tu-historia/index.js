console.log("(͠≖ ͜ʖ͠≖)👌");

//Cada llibre tindra el seu propi localstorage
let num = 0;
let LOCALSTORY = "story" + num;
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
    constructor(id, title, chapters, minWords, wordsList, maxParrafs) {
        this.id = id;
        this.title = title;
        this.chapters = chapters;
        this.minWords = minWords;
        this.wordsList = wordsList;
        this.maxParrafs = maxParrafs;
        //Compte internament les paraules utilitzades
        this.actualIndexWord = 0;
    }
    isMinWords() {
        return this.actualIndexWord > this.minWords;
    }
    isFillChapter() {
        //L'uktim capitol es ple
        return this.chapters[this.chapters.length - 1].fullOfParrafs(this.maxParrafs - 1);
    }
    isTitleLastChapter() {
        return this.chapters[this.chapters.length - 1].isTitle();
    }

    addNewChapter(text) {
        this.chapters.push(new Chapter(null, [text]));
        this.actualIndexWord++;
    }

    addParrafLastChapter(text) {
        this.chapters[this.chapters.length - 1].addParraf(text);
        this.actualIndexWord++;
    }
    getTodayWord() {
        return this.wordsList[this.actualIndexWord];
    }

    isTheWord(txt) {
        return txt.toLowerCase().includes(this.wordsList[this.actualIndexWord]);

    }
    setLastTitle(text) {
        return this.chapters[this.chapters.length - 1].setTitle(text);

    }
}

let parrafsByChapters = 3;
let minWords = 50;
let player = new Book(1, null, [new Chapter(null, [])], 50, ["manzana", "pera", "naranja", "uva", "plátano", "sandía", "fresa", "kiwi", "mango", "limón", "piña", "cereza", "papaya", "frambuesa", "melocotón", "albaricoque", "ciruela", "higo", "melón", "guayaba"], 3);



//Escriu algun cosa al textarea
// Si no hi ha capitols crea un nou sense titol
//Si hi ha el fa push al existen
//Al ficar el tercer capitol demana el titol
// Si arriba al minim de paraules (50) deixa finalitzar el libre i començar un altre
let parrafHTML = document.getElementById("textInput");
let titleHTML = document.getElementById("textTitle");

function postText() {
    if (!player.isTheWord(parrafHTML.value)) {
        console.log("Falta la palabra", player.getTodayWord());
        return;
    }
    console.log("lol");

    if (player.isFillChapter()) {
        //display block input
        player.addNewChapter(parrafHTML.value);
        parrafHTML.value = "";
        console.log("Pon un titulo al anterior");
        titleHTML.style.display = "block";
        parrafHTML.style.display = "none";
    } else {
        player.addParrafLastChapter(parrafHTML.value);
        parrafHTML.value = "";
    }
    document.getElementById("palabra").innerText = player.getTodayWord();
}
function postTitleChapter() {
    if (titleHTML.value != "") {
        player.setLastTitle(titleHTML.value);
        console.log("Titulado");
        titleHTML.value = "";
        titleHTML.style.display = "none";
        parrafHTML.style.display = "block";
        return;
    }
    console.log("Pon un titulo porfa");
}

function onStartStory() {
    document.getElementById("palabra").innerText = player.getTodayWord();
    if (!player.isTitleLastChapter()) {
        console.log("Alguien se olvido");
        return;
    }
    if (player.isMinWords()) {
        console.log("Permite acabar el libro en cualquier momento, si queda capitulo abierto debe cerrarlo");

    }
    console.log("ok");
}