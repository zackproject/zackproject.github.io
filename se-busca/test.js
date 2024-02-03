class Wanted {
    constructor(points, characterList, time, numberOfCharacters, typePanel, special) {
        this.numberOfCharacters = numberOfCharacters
        this.time = time;
        this.points = points;
        this.characterList = characterList;
        this.typePanel = typePanel;
        //S'omplen una vegada creat el panell, getRandCharacter(), getRandPanel()
        this.myCharacter = null;
        this.panelList = null;
        this.special = special;
        this.isPlaying = false;
    }

    getRandCharacter() {
        //Cada 35 punts es Wally
        if (this.points % 35 == 0 && this.points > 0) {
            this.myCharacter = this.special;
            return;
        }
        //Pot ser que la llista de characters siguin 10 pero nomes jugo amb 4 (numberOfCharacters)
        let rand = this.randNum(0, this.characterList.length - 1)
        this.myCharacter = this.characterList[rand];
    }
    updatePanel() {
        if (this.points % 5 == 0 && this.points > 5) {
            this.numberOfCharacters = this.numberOfCharacters + 4;
        }
        this.points++;
    }
    getRandPanel() {
        let i = 0;
        let newLlista = [];
        // Quant personatges repetits volem
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
    timerAdd() {
        if (this.points > 40) {
            this.time += 1;
            return;
        }
        this.time += 2;

    }

    timerSubstract() {
        this.time -= 10;
        if (this.time <= 0) {
            this.time = 0;
        }
    }

}

let sebusca = {
    "clasic": [
        { "id": 0, "name": "Brook", "image": "./img/brook.png" },
        { "id": 1, "name": "Chopper", "image": "./img/chopper.png" },
        { "id": 2, "name": "Franky", "image": "./img/franky.png" },
        { "id": 3, "name": "Luffy", "image": "./img/luffy.png" },
        { "id": 4, "name": "Robin", "image": "./img/robin.png" },
        { "id": 5, "name": "Sanji", "image": "./img/sanji.png" },
        { "id": 6, "name": "Usopp", "image": "./img/usop.png" },
        { "id": 7, "name": "Zoro", "image": "./img/zoro.png" },
        { "id": 8, "name": "Nami", "image": "./img/nami.png" }
    ],
    "special": { "id": 9, "name": "Wally", "image": "./img/wally.png" }

};

function test() {
    console.log("----------------------");
    for (let i = 0; i <= 10000; i++) {
        let player = new Wanted(points = i, characterList = sebusca.clasic, time = 0, numberOfCharacters = i, typePanel = 0, sebusca.special);
        //Genera el nou character
        player.getRandCharacter();
        //Genera el nou panell
        player.getRandPanel();
        //La puntuacio es major a 0
        if (player.points > 0) {
            //Generacio de personatges en una llista
            if (player.myCharacter === null) {
                console.log("❌ Generacio del panell:", i);
                break;
            } else if (i % 1000 === 0) {
                console.log("✅ Generacio del panell:", i);
            }

            //Existeix el personatge en el panell
            let personatgeEnElPanell = player.panelList.some(e => e === player.myCharacter);
            if (!personatgeEnElPanell) {
                console.log("❌ Personatge en el panell:", i);
                break;
            } else if (i % 1000 === 0) {
                console.log("✅ Personatge en el panell:", i);
            }

            //Només hi ha un personatje triat per panell
            let personatgeTriat = player.panelList.filter(e => e === player.myCharacter);
            if (personatgeTriat.length != 1) {
                console.log("❌ Personatge unic:", i);
                break;
            } else if (i % 1000 === 0) {
                console.log("✅ Personatge unic:", i);
            }

            //character special (Wally) apareix cada 35 punts
            if (player.points % 35 == 0 && player.myCharacter != player.special) {
                console.log("❌ Personatge Wally:", i, player.myCharacter);
                break;
            } else if (i % 1000 === 0) {
                console.log("✅ Personatge Wally:", i);
            }
        }
        if (i % 1000 === 0) {
            console.log("----------------------");
        }

    }
}
test();