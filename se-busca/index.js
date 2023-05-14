let sebusca = [
    { "id": 0, "name": "Monkey D. Luffy", "image": "https://i.imgur.com/7hudkbh.png" },
    { "id": 1, "name": "Roronoa Zoro", "image": "https://imgur.com/MPigBVG.png" },
    { "id": 2, "name": "Nami", "image": "https://i.imgur.com/eWqris3.png" },
    { "id": 3, "name": "Ussop", "image": "https://i.imgur.com/jVCRzqT.png" },
    { "id": 4, "name": "Sanji", "image": "https://i.imgur.com/3vnXoZB.png" },
    { "id": 5, "name": "Tony Tony Chopper", "image": "https://i.imgur.com/xH7n2x3.png" },
    { "id": 6, "name": "Nico Robin", "image": "https://i.imgur.com/bhMTpCd.png" },
    { "id": 7, "name": "Franky", "image": "https://i.imgur.com/1PnWvLj.png" },
    { "id": 8, "name": "Brook", "image": "https://i.imgur.com/468BEdj.png" },
    { "id": 9, "name": "Jinbe", "image": "https://i.imgur.com/6hG55CQ.png" },
];

//let nivel = 1; /// 1,2,3,4,5,6,7
//let panel = 0; // 0 clasico(flex), 1 random(position), 2 tabla
//let listaPersonajes = [] //todos los personajes de esa partida
//let tiempo = 60; // Tiempo que se va a restar
//let miPersonaje = {}; // Personaje elegido
//let listaPanel = []; //personajes repetidos y mi personaje unico

class Wanted {
    constructor(points, characterList, time, numberOfCharacters) {
        this.numberOfCharacters = numberOfCharacters
        this.time = time;
        this.points = points;
        this.characterList = characterList;
        //S'omplen una vegada creat el panell, getRandCharacter(), getRandPanel()
        this.myCharacter = null;
        this.panelList = null;
    }

    getRandCharacter() {
        this.myCharacter = this.characterList[this.randNum(0, this.characterList.length - 1)]
    }

    getRandPanel() {
        let i = 0;
        let newLlista = [];
        while (i < this.numberOfCharacters) {
            //Per tots el personatges disponibles, agafa un character random
            let rand = this.randNum(0, this.characterList.length - 1);
            let randCharacter = this.characterList[rand];
            //Si el que busca no es el triat, el fica, el nostre ha de ser unic
            if (randCharacter !== this.myCharacter) {
                newLlista.push(randCharacter)
                /// Si el fica incrementa el bucle
                i++;
            }
        }
        //Tria una ubicacio a l'atzar
        let novaUbicacio = this.randNum(0, this.numberOfCharacters - 1)
        //Al acaba sobrescriu un a l'atzar per el nostre personatge
        newLlista[novaUbicacio] = this.myCharacter;
        this.panelList = newLlista;
    }

    randNum(min, max, double = false) {
        if (double) {
            //Ho talla a dos decimals i acaba sent float de 2 decimals
            return parseFloat((Math.random() * (max - min + 1) + min).toFixed(2));
        }
        return parseInt(Math.random() * (max - min + 1) + min);
    }

}

let player = new Wanted(0, sebusca, 60, 30);
//Genera el nou character
player.getRandCharacter();
//Genera el nou panell
player.getRandPanel();

function dibujaenGrid() {
    let pare = document.getElementById("panelGrid");
    //Esborra el contigut de l'anterior
    deleteChilds(pare);
    //Torna a generar la partida
    player.getRandCharacter();
    player.getRandPanel();
    //Fica el personatge triat
    document.getElementById("myCharacter").src = player.myCharacter.image;
    for (let i = 0; i < player.panelList.length; i++) {
        let img = document.createElement("img");
        img.src = player.panelList[i].image;
        img.width = "100"
        img.alt = player.panelList[i].name;
        pare.appendChild(img)
    }
}



function dibujaenPosition() {
    let pare = document.getElementById("panelAbsoluto");
    //Esborra el contigut de l'anterior
    deleteChilds(pare);
    //Torna a generar la partida
    player.getRandCharacter();
    player.getRandPanel();
    player.panelList.forEach(element => {
        let img = document.createElement("img");
        img.src = element.image;
        img.width = "100"
        img.alt = element.name;
        // Si el pare es relative la imatge es absoluta
        img.style.position = "absolute";
        // Tria una posicio x y numero random 'double' dins del panell. Al 100% no es veu
        img.style.left = player.randNum(0, 90, true) + "%";
        img.style.top = player.randNum(0, 90, true) + "%";
        //El personatge triat ha d'estar sobre per poder clicarlo
        if (element === player.myCharacter) img.style.zIndex = 1;
        // Puja la imatge en el container
        pare.appendChild(img)
    });
    for (let i = 0; i < player.panelList.length; i++) {

    }
    document.getElementById("myCharacter").src = player.myCharacter.image;
    console.log("pedro");
}




function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}