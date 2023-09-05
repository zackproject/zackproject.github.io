console.log("(͠≖ ͜ʖ͠≖)👌");

//Cada llibre tindra el seu propi localstorage
let num = 0;
let LOCALSTORY = "story" + num;
class Chapter {
    constructor(title, parrafList) {
        this.title = title;
        this.parrafList = parrafList;
    }

    sendText(texting, word) {
        //La paraula es dins deixa ficar
        if ((texting.toLowerCase()).includes(word.toLowerCase())) {
            this.parrafList.push(texting);
            return true;
        }
        return false;
    }
    fullOfParrafs(maxParrafs) {
        //Comprova si el capitol te el maxim de paragafs i si te titol
        return this.parrafList.length === maxParrafs && this.title !== null;
    }
    isTitle() {
        return this.title !== null;
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
    }
    isFillChapter() {
        //L'uktim capitol es ple
        return this.chapters[this.chapters.length - 1].fullOfParrafs(maxParrafs);
    }
    isTitleLastChapter() {
        return this.chapters[this.chapters.length - 1].isTitle();
    }

    addNewChapter(text) {
        this.chapters.push(new Chapter(null, [text]))
    }
}

let parrafsByChapters = 3;
let minWords = 50;
let player = new Book(1, null, [new Chapter(null, [])], 50, ["pera", "platano", "manzana"], 3);

let listChapter = [];


//Escriu algun cosa al textarea
// Si no hi ha capitols crea un nou sense titol
//Si hi ha el fa push al existen
//Al ficar el tercer capitol demana el titol
// Si arriba al minim de paraules (50) deixa finalitzar el libre i començar un altre
function postText() {
    let text = document.getElementById("textInput").value;

    let pepe = player.sendText(text, "jose");
    console.log("pepe", pepe, player);
}



