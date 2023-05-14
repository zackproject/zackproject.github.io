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
        this.myCharacter = characterList[this.randNum(0, characterList.length - 1)];
        this.panelList = this.getRandPanel(characterList);
    }



    getRandPanel(list) {
        let i = 0;
        let newLlista = [];
        while (i < this.numberOfCharacters) {
            //Per tots el personatges disponibles, agafa un character random
            let rand = this.randNum(0, list.length - 1);
            let randCharacter = list[rand];
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
        return newLlista;
    }

    randNum(min, max) {
        return parseInt(Math.random() * (max - min + 1) + min);
    }


}
let a = new Wanted(0, sebusca, 60, 100);

function dibujaenGrid() {
    let pare = document.getElementById("panelGrid");
    for (let i = 0; i < a.panelList.length; i++) {
        let img = document.createElement("img");
        img.src = a.panelList[i].image;
        img.width = "100"
        img.alt = a.panelList[i].name;
        pare.appendChild(img)
    }
    document.getElementById("myCharacter").src = a.myCharacter.image;
}





