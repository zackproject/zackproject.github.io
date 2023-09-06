console.log("(͠≖ ͜ʖ͠≖)👌");

//Cada llibre tindra el seu propi localstorage
let num = 0; // 0 reservado para escritura
let LOCALSTORY = "story-" + num;
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
        console.log("txt", txt.includes("Toyota"));
        return txt.toLowerCase().includes(this.wordsList[this.actualIndexWord].toLowerCase());

    }
    setLastTitle(text) {
        return this.chapters[this.chapters.length - 1].setTitle(text);

    }
}




//Escriu algun cosa al textarea
// Si no hi ha capitols crea un nou sense titol
//Si hi ha el fa push al existen
//Al ficar el tercer capitol demana el titol
// Si arriba al minim de paraules (50) deixa finalitzar el libre i començar un altre
let parrafHTML = document.getElementById("textInput");
let titleHTML = document.getElementById("textTitle");
let player = new Book(0, null, [new Chapter(null, [])], 49, ["a", "b"], 3);;
function startStory() {
    let parrafsByChapters = 3;
    let minWords = 50;
    let wordsList = getWordList(document.getElementById("wordLista").value);
    //Crea un llibre buit
    player = new Book(0, null, [new Chapter(null, [])], minWords, wordsList, parrafsByChapters);
    console.log(player.wordsList);
    document.getElementById("palabra").innerText = player.getTodayWord();
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

function generalo() {
    let pare = document.getElementById("generateStory");
    let copia = JSON.parse(localStorage.getItem(LOCALSTORY));
    console.log();

    copia.chapters.forEach((e, i) => {
        console.log(e);
        let details = document.createElement("details");
        let summary = document.createElement("summary");
        //Titol capitol
        summary.innerHTML = "Capitulo " + (i + 1) + " - " + e.title;
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
}
localStorage.setItem(LOCALSTORY, '{"id":0,"title":null,"chapters":[{"title":"pedrito","parrafList":["El nuevo miembro de mi banda es un Toyota","Jugaba en una piscina Honda"]},{"title":"Cars","parrafList":["Y Harrison Ford daba las buenas noches","el nuevo deberia ser un Chevrolet"]},{"title":"otaku","parrafList":["Y ohaio nissan waka waka","Este nuevo cap tesla pobre"]},{"title":"otro titulazo","parrafList":["y bmwwxyz esta invitado","Este caso deberia Audi tenerlo"]},{"title":"final ahora si part2","parrafList":["Y no te olvides del Mercedes-Benz que palo","seguimos lexus de casa"]},{"title":"pito","parrafList":["y Volkswagen o volks que torni"]}],"minWords":50,"wordsList":["Toyota","Honda","Ford","Chevrolet","Nissan","Tesla","BMW","Audi","Mercedes-Benz","Lexus","Volkswagen","Hyundai","Kia","Mazda","Subaru","Jeep","Chrysler","Fiat","Volvo","Land Rover"],"maxParrafs":3,"actualIndexWord":11}')
generalo();