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

}

let points = 0;
let timer = 60;
let maxCharacters = 4;
//Controla si es 0-flex, 1-position, 2-staticPosition 3-table
let typePanel = 0;

let player = new Wanted(points, sebusca, timer, maxCharacters, typePanel);
//Genera el nou character
player.getRandCharacter();
//Genera el nou panell
player.getRandPanel();


//PANEL ESTATIC
function drawPanelFlex() {
    document.getElementById("typePanel").innerText = " en flex";
    let pare = document.getElementById("panelGrid");
    //Esborra el contigut de l'anterior
    deleteChilds(pare);
    //Torna a generar la partida
    player.typePanel = 0;
    player.getRandCharacter();
    player.getRandPanel();
    //Fica el personatge triat
    showHTMLMyCharacter(player.myCharacter);
    // Omple el panel HTML
    for (let i = 0; i < player.panelList.length; i++) {
        let img = document.createElement("img");
        img.src = player.panelList[i].image;
        img.width = "100"
        img.alt = player.panelList[i].name;
        //Quan cliques una imatge s'envia la seva data a la funcio 'getInfoClicked'
        img.addEventListener("click", () => { getInfoClicked(player.panelList[i]) });
        pare.appendChild(img)
    }
}


//PANEL RELATIVE/ABSOLUTE
function drawPanelPosition() {
    document.getElementById("typePanel").innerText = " en Position";
    let pare = document.getElementById("panelAbsoluto");
    //Esborra el contigut de l'anterior
    deleteChilds(pare);
    //Torna a generar la partida
    player.typePanel = 1;
    player.getRandCharacter();
    player.getRandPanel();
    player.panelList.forEach((element, i) => {
        let img = document.createElement("img");
        img.src = element.image;
        img.width = "70"
        img.alt = element.name;
        // Si el pare es relative la imatge es absoluta
        img.style.position = "absolute";
        // Tria una posicio x y numero random 'double' dins del panell. Al 100% no es veu
        img.style.left = player.randNum(0, 90, true) + "%";
        img.style.top = player.randNum(0, 90, true) + "%";
        if (i % 2 == 0 && i != 0) img.style.animationDirection = "reverse";
        else img.style.animationDirection = "normal";
        //img.style.animationDelay = i/10 + "s";
        //El personatge triat ha d'estar sobre per poder clicarlo
        if (element === player.myCharacter) {
            img.style.zIndex = 2;
        }
        else {
            img.style.zIndex = 1;
        }
        console.log("i", i);
        //Quan cliques una imatge s'envia la seva data a la funcio 'getInfoClicked'
        img.addEventListener("click", () => { getInfoClicked(element) });
        // Puja la imatge en el container
        pare.appendChild(img)
    });
    //Mostra el personatge que has de buscar al HTML
    showHTMLMyCharacter(player.myCharacter);
}


//PANEL RELATIVE/ABSOLUTE 4 ELEMENTS
function drawPanelStaticPosition() {
    document.getElementById("typePanel").innerText = " en Static";
    let pare = document.getElementById("panelStatico");
    //Esborra el contigut de l'anterior
    deleteChilds(pare);
    //Com nomes en aquest panel necesito 4, faig copia i aplico
    let copiaNumber = player.numberOfCharacters;
    player.numberOfCharacters = 4;
    //Torna a generar la partida
    player.typePanel = 2;
    player.getRandCharacter();
    player.getRandPanel();
    let tamany = 1;
    player.panelList.forEach(element => {
        let img = document.createElement("img");
        img.src = element.image;
        img.width = "100"
        img.alt = element.name;
        // Si el pare es relative la imatge es absoluta
        img.style.position = "absolute";
        // Tria una posicio x y numero random 'double' dins del panell. Al 100% no es veu
        img.style.left = tamany * 17 + "%";
        img.style.top = "-50%";
        tamany++;
        //El personatge triat ha d'estar sobre per poder clicarlo
        if (element === player.myCharacter) img.style.zIndex = 1;
        //Quan cliques una imatge s'envia la seva data a la funcio 'getInfoClicked'
        img.addEventListener("click", () => { getInfoClicked(element) });
        // Puja la imatge en el container
        pare.appendChild(img)
    });
    //Mostra el personatge que has de buscar al HTML
    showHTMLMyCharacter(player.myCharacter)

    // Retorna al original aqui
    player.numberOfCharacters = copiaNumber;

}

function drawPanelTable() {

    let posTr = 0;
    let posTd = 0;
    document.getElementById("typePanel").innerText = " en Tabla";
    let pare = document.getElementById("panelTabla");

    deleteChilds(pare);
    player.typePanel = 4;
    player.getRandCharacter();
    player.getRandPanel();

    let table = document.createElement("table");
    let numColumnes = 2;

    let tdrestant = numColumnes - (player.numberOfCharacters % numColumnes);
    console.log(tdrestant);
    //header de la taula
    let trhead = document.createElement("tr");
    for (let i = 0; i < numColumnes; i++) {
        let thead = document.createElement("th");
        thead.innerText = "Columna " + (i + 1);
        trhead.appendChild(thead)
    }
    //Fica el header de la taula
    table.appendChild(trhead)
    let tr = document.createElement("tr");
    for (let i = 0; i < player.numberOfCharacters; i++) {
        let td = document.createElement("td")
        td.innerText = player.panelList[i].name;
        tr.appendChild(td)
        table.appendChild(tr)
        //En cas que sigui divisible entre el numde columnes, fa una final nova
        if ((i + 1) % numColumnes === 0) {
            tr = document.createElement("tr");
        }
    }

    //let totalTd = table.getElementsByTagName("tr");
    //let lasttr = totalTd[totalTd.length-1]
    // console.log("mi ultimo es ",lasttr );
    // lasttr.colSpan = "2";


    let h3 = document.createElement("h3");
    h3.innerText = "Se busca a " + player.myCharacter.name + " | Fila: " + posTr + " Columna: " + posTd;
    pare.appendChild(h3)
    pare.appendChild(table)
}

//Mostra el personatge que has de buscar al HTML
function showHTMLMyCharacter(nPlayer) {
    let myChar = document.getElementById("myCharacter");
    myChar.src = nPlayer.image;
    myChar.alt = nPlayer.name;
}

//Mata els fills per a torna a generar
function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}


//Funcio que aplica quan cliques a una imatge
function getInfoClicked(props) {
    if (player.myCharacter === props) {
        console.log("Correcto", props);
        //Puja el nivell
        player.updatePanel();
        console.log("Points:", player.points, "Panel:", player.panelList.length);
        switch (player.typePanel) {
            case 0:
                drawPanelFlex()
                break;
            case 1:
                drawPanelPosition();
                break;
            case 2:
                drawPanelStaticPosition();
            default:
                console.log("Tipus de panell no definit");
                break;
        }
    } else {
        console.log("Ups, no era", props.name);
    }
    console.log(props.name);
}