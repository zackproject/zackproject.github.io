class Wanted {
    constructor(points, characterList, time, numberOfCharacters, typePanel) {
        this.numberOfCharacters = numberOfCharacters
        this.time = time;
        this.points = points;
        this.characterList = characterList;
        this.typePanel = typePanel;
        //S'omplen una vegada creat el panell, getRandCharacter(), getRandPanel()
        this.myCharacter = null;
        this.panelList = null;
    }

    getRandCharacter() {
        //Pot ser que la llista de characters siguin 10 pero nomes jugo amb 4 (numberOfCharacters)
        let rand = this.randNum(0, this.characterList.length - 1)
        this.myCharacter = this.characterList[rand];
    }
    updatePanel() {
        if (this.points % 5 == 0) {
            this.numberOfCharacters = this.numberOfCharacters + 2;
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
        this.time += 5;
    }

    timerSubstract() {
        this.time -= 10;
        if (this.time < 0) {
            this.time = 0;
        }
    }

}
let sebusca = [
    { "id": 0, "name": "Brook", "image": "./img/brook.png" },
    { "id": 1, "name": "Chopper", "image": "./img/chopper.png" },
    { "id": 2, "name": "Franky", "image": "./img/franky.png" },
    { "id": 3, "name": "Luffy", "image": "./img/luffy.png" },
    { "id": 4, "name": "Robin", "image": "./img/robin.png" },
    { "id": 5, "name": "Sanji", "image": "./img/sanji.png" },
    { "id": 6, "name": "Usopp", "image": "./img/usop.png" },
    { "id": 7, "name": "Zoro", "image": "./img/zoro.png" },
    { "id": 8, "name": "Nami", "image": "./img/nami.png" },
    /*    { "id": 9, "name": "Jinbe", "image": "./img/brook.png" },*/

];

function test() {
    console.log("----------------------");
    for (let i = 0; i <= 10000; i++) {
        let player = new Wanted(points = 0, characterList = sebusca, time = 0, numberOfCharacters = i, typePanel = 0);
        //Genera el nou character
        player.getRandCharacter();
        //Genera el nou panell
        player.getRandPanel();

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
        if (i % 1000 === 0) {
            console.log("----------------------");
        }

    }
}
test();