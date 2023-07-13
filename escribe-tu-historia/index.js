class Chapter {
    constructor(id, title, parrafs) {
        this.id = id; // capitulo 1
        this.title = title; //null
        this.parrafs = parrafs; //array
    }
}

class Story {
    constructor(title, maxsize, maxParafs, language) {
        this.title = title;
        this.maxsize = maxsize;
        this.maxParafs = maxParafs;
        this.language = language;
    }
}


let LOCAL_STORY = "story";
let player = new Story(title = null, maxsize = 500, maxParafs = 7, language = castellano);

//Si no existeix historia, la crea amb proleg
if (localStorage.getItem(LOCAL_STORY) === null) {
    let firstChapter = [new Chapter(0, "Prologo", defaultStory)];
    localStorage.setItem(LOCAL_STORY, JSON.stringify(firstChapter));
}

//Al carregar es guarda la llista de capitols
let listChapters = JSON.parse(localStorage.getItem(LOCAL_STORY));

//Controla el limit de lletres
function textAreaLimit() {
    let tArea = document.getElementById("story-area");
    document.getElementById("max-story").innerText = tArea.value.length + "/" + player.maxsize;
}


function cargaStory() {
    //Tamany maxim del area text
    let tArea = document.getElementById("story-area");
    tArea.maxLength = player.maxsize;

    let pare = document.getElementById("story");
    deleteChilds(pare);
    listChapters.forEach((element) => {
        let title = element.id + " - " + element.title;
        let cap = createHTMLChapter(title, element.parrafs);
        console.log("lista", cap);
        pare.appendChild(cap);
        console.log(element);
    });

    //Obra automaticament l'ultim
    let lastDetails = document.getElementsByTagName("details");
    lastDetails[lastDetails.length - 1].open = true;

}
function createHTMLChapter(title, parrafs) {
    let summary = document.createElement("summary");
    summary.innerText = "Capitulo " + title;
    let detail = document.createElement("details");
    detail.appendChild(summary);
    parrafs.forEach(element => {
        let p = document.createElement("p");
        p.innerText = element;
        p.className = "p-day";
        detail.appendChild(p);
    });
    return detail;
}


function addParraf() {
    console.log("enviar");
    let text = document.getElementById("story-area");
    if (listChapters[listChapters.length - 1].parrafs.length < player.maxParrafs) {
        console.log("enviado");
        if (text.value != "") {
            //lmao last chapts
            listChapters[listChapters.length - 1].parrafs.push(text.value);
            localStorage.setItem(LOCAL_STORY, JSON.stringify(listChapters));
            cargaStory();
        }
    } else {
        let inputTitleStory = document.getElementById("title-story");
        if (inputTitleStory.value != "") {
            let c1 = new Chapter(listChapters.length, "pedro", [text.value]);
            listChapters.push(c1);
            inputTitleStory.value = "";
            console.log("ok", listChapters);
            localStorage.setItem(LOCAL_STORY, JSON.stringify(listChapters))
            cargaStory();
        } else {
            console.log("faltan datos");
        }
    }

}


function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}



