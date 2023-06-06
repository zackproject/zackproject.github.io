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
        this.scoreList = [0, 0, 0, 0, 0];
    }
    updateScore(newScore) {
        let copiaList = this.scoreList;
        copiaList.push(parseInt(newScore));
        copiaList = copiaList.sort((a, b) => b - a); // Ordenar de forma descendente usando una función de comparación
        copiaList.pop();
        this.scoreList = copiaList;
    }

    getRandCharacter() {
        //Cada 45 punts es Wally
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


const WANTEDLOCAL = "wanted";
//Controla totes les imatges de la partida
const IMGINGAME = "img-in-game";
let points = 0;
let timer = 15;
let maxCharacters = 4;
//Controla si es 0-flex, 1-position, 2-staticPosition 3-table
let typePanel = 0;
let reproductor = new Audio();
const intervalID = setInterval(timeCountDown, 1000)
function timeCountDown() {
    if (player.isPlaying) {
        player.time -= 1;
        document.getElementById("timing-wanted").innerText = player.time;
    }
    if (player.time <= 0) {
        //Guarda la nova puntuacio
        player.updateScore(parseInt(player.points));
        localStorage.setItem(WANTEDLOCAL, player.scoreList.toString());
        document.getElementById("timing-wanted").innerText = 0;
        player.isPlaying = false;
        ocultaIncorrectes();
        //Reset panel
        resetPanelOnFail();
        //Mostra el boto de seguent
        document.getElementById("btn-next-partida").style.display = "block";
        document.getElementById("footer-wanted").style.display = "none";
    }
}


function playClasic() {
    //Inicia despres de acabar a la animacio
    setTimeout(drawPanelPosition, 1500);
    document.getElementById("container-wanted").style.display = "flex";
    document.getElementById("footer-wanted").style.display = "flex";
    document.getElementById("menu-wanted").style.display = "none";

}
function backWantedMenu() {
    let pare = document.getElementById("panelAbsoluto");
    deleteChilds(pare);
    document.getElementById("container-wanted").style.display = "none";
    document.getElementById("menu-wanted").style.display = "flex";
    if (!reproductor.paused) {
        reproductor.pause();
    }
}

function resetPanelOnFail() {
    player.points = points;
    player.time = timer;
    player.numberOfCharacters = maxCharacters;
    player.isPlaying = false;
}

//Crea la partida
let player = new Wanted(points, sebusca.clasic, timer, maxCharacters, typePanel, sebusca.special);
//Genera el nou character
player.getRandCharacter();
//Genera el nou panell
player.getRandPanel();


//PANEL RELATIVE/ABSOLUTE
function drawPanelPosition() {
    player.isPlaying = true;
    //Tria si fara l'animacio
    document.getElementById("timing-wanted").innerText = player.time;

    let faAnimacio = player.randNum(0, 2) === 1;
    let pare = document.getElementById("panelAbsoluto");
    //Esborra el contigut de l'anterior
    deleteChilds(pare);

    pare.innerHTML = "<button id='btn-next-partida' class='center-next-btn' onclick='backWantedMenu()''>SALIR</button> <button id='btn-next-partida' class='center-next-btn' onclick='nextPartida()''>SALIR</button>"
    //Torna a generar la partida
    player.typePanel = 1;
    player.getRandCharacter();
    player.getRandPanel();
    player.panelList.forEach((element, i) => {
        let img = document.createElement("img");
        img.src = element.image;
        img.width = "70"
        img.alt = element.name;
        //Controla quien elements ha d'ocultar per clase
        img.className = IMGINGAME;
        // Si el pare es relative la imatge es absoluta
        img.style.position = "absolute";
        // Tria una posicio x y numero random 'double' dins del panell. Al 100% no es veu
        img.style.left = player.randNum(0, 90, true) + "%";
        img.style.top = player.randNum(0, 80, true) + "%";
        img.style.animationDirection = "normal";

        //Dependen de la puntuacio i de l'atzar aplica animacio
        if (faAnimacio && player.points > 10) {
            applyAnimation(img);
        }

        //Si no tria animacio en moviment tria parpadeig entre color o opacitat
        if (!faAnimacio && player.points > 10) {
            //En cas que sigui divisible entre 25 fara aquesta
            if (player.points % 25 == 0) {
                img.style.animationDelay = (1 + i) / 10 + "s";
                img.style.animationName = "parpadea-gris";

            } else {
                //Sino fara aquesta
                img.style.animationDelay = (1 + i) / 10 + "s";
                img.style.animationName = "parpadea";
            }
        }

        //El personatge triat ha d'estar sobre per poder clicarlo
        if (element === player.myCharacter) {
            img.style.zIndex = 2;
        }
        else {
            img.style.zIndex = 1;
        }
        //Quan cliques una imatge s'envia la seva data a la funcio 'getInfoClicked'
        img.addEventListener("click", (event) => { getInfoClicked(element, event) });
        // Puja la imatge en el container
        pare.appendChild(img)
    });
    //Mostra el personatge que has de buscar al HTML
    showHTMLMyCharacter(player.myCharacter);
}


//PANEL RELATIVE/ABSOLUTE 4 ELEMENTS
function drawPanelStaticPosition() {
    let pare = document.getElementById("panelAbsoluto");
    //Esborra el contigut de l'anterior
    deleteChilds(pare);
    pare.innerHTML = "<button id='btn-next-partida' class='center-next-btn' onclick='backWantedMenu()''>SALIR</button> <button id='btn-next-partida' class='center-next-btn' onclick='nextPartida()''>SALIR</button>"

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
        img.width = "70"
        img.alt = element.name;
        //Controla quien elements ha d'ocultar per clase
        img.className = IMGINGAME;
        // Si el pare es relative la imatge es absoluta
        img.style.position = "absolute";
        // Tria una posicio x y numero random 'double' dins del panell. Al 100% no es veu
        img.style.left = tamany * 17 + "%";
        img.style.top = "-5%";
        tamany++;
        //El personatge triat ha d'estar sobre per poder clicarlo
        if (element === player.myCharacter) img.style.zIndex = 1;
        //Quan cliques una imatge s'envia la seva data a la funcio 'getInfoClicked'
        img.addEventListener("click", (event) => { getInfoClicked(element, event) });
        // Puja la imatge en el container
        pare.appendChild(img)
    });


    //Mostra el personatge que has de buscar al HTML
    showHTMLMyCharacter(player.myCharacter)

    // Retorna al original aqui
    player.numberOfCharacters = copiaNumber;
    //Retorna al panell 1
    player.typePanel = 1;
}

function drawPanelTable() {
    //let posTr = 0;
    //let posTd = 0;
    let pare = document.getElementById("panelTabla");

    deleteChilds(pare);
    player.typePanel = 3;
    player.getRandCharacter();
    player.getRandPanel();

    let table = document.createElement("table");
    let numColumnes = player.randNum(2, 3);

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
        //Creacio buto
        let btn = document.createElement("button");
        btn.innerText = player.panelList[i].name;
        btn.addEventListener("click", (event) => { accesibleClicked(player.panelList[i], event) });
        //Fica als fills
        td.appendChild(btn);
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


    //+ " | Fila: " + posTr + " Columna: " + posTd
    let sebusca = document.getElementById("nameSeBusca");
    sebusca.innerText = player.myCharacter.name;
    document.getElementById("focusBusca").focus();
    pare.appendChild(table);

    document.getElementById("focusBusca").focus();

}


//Mostra el personatge que has de buscar al HTML
function showHTMLMyCharacter(nPlayer) {
    let myChar = document.getElementById("myCharacter");
    myChar.src = nPlayer.image;
    myChar.alt = "Se busca a " + nPlayer.name;
}

//Mata els fills per a torna a generar
function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}


function accesibleClicked(props, event) {
    let sebuscaText = document.getElementById("nameSeBusca");
    if (player.myCharacter === props) {
        //Puja el nivell
        player.updatePanel();
        //Si es correcte la pantalla canviara
        player.timerAdd();
        sebuscaText.innerText = player.myCharacter.name;
        sebuscaText.focus();
        drawPanelTable();
    }

}
//Funcio que aplica quan cliques a una imatge
function getInfoClicked(props, event) {
    if (player.myCharacter === props && player.isPlaying) {
        //Puja el nivell
        player.updatePanel();
        //Si es correcte la pantalla canviara
        player.timerAdd();
        ocultaIncorrectes();
        //Aplica animacio estrelles
        animateStars();
        //Pausa la partida
        player.isPlaying = false;
        //Carrega la nova partida
        resetAnimation();
        setTimeout(nextPartida, 1500);
    } else if (player.isPlaying) {
        player.timerSubstract();
    }
}


function nextPartida() {
    if (player.time <= 0) {
        player.points = points; //default
        player.time = timer; //deault
        return;
    }
    if (player.typePanel === 1 && player.points < 10) {
        player.typePanel = player.randNum(1, 2);
    }
    //Continua la partida
    player.isPlaying = true;
    switch (player.typePanel) {
        case 1:
            drawPanelPosition();
            break;
        case 2:
            //Retorn al panell '1' al acabar.
            drawPanelStaticPosition();
            break;
        case 3:
            drawPanelTable();
            break;
        default:
            console.log("Tipus de panell no definit: " + player.typePanel);
            break;
    }
    if (player.typePanel === 1 || player.typePanel == 0) {

        document.getElementById("btn-next-partida").style.display = "none";
    }
}

function ocultaIncorrectes() {
    let elements = document.getElementsByClassName(IMGINGAME);
    for (let i = 0; i < elements.length; i++) {
        //Si no es el meu personatge, oculta les imatges
        if (elements[i].alt !== player.myCharacter.name) {
            elements[i].style.display = "none";
        }
    }
    //Atura el cronometre
    document.getElementById("timing-wanted").innerText = player.time;
    player.isPlaying = false;
}


//Controla les animacions que nomes s'aplican a l'atzar si es major 10 la puntuacio
function applyAnimation(element) {
    //Si ,es de 10 punts, dos animacions, si es 23, 2 animacion 
    let animacionsDisponibles = parseInt(player.points / 10);
    //No deixa que hi hagi mes punts que animacions
    //EX: 53 punts no hi ha animacio '6'
    if (animacionsDisponibles > 5) { animacionsDisponibles = 5; }
    //Tria animacions random per cada imatge, poden repetirse en el bucle
    let num = player.randNum(1, animacionsDisponibles);
    //Tria una animacio
    switch (num) {
        case 1:
            element.style.animationName = "moveFromY";
            break;
        case 2:
            element.style.animationName = "moveFromX";
            break
        case 3:
            element.style.animationName = "circle";
            break;
        case 4:
            element.style.animationName = "rotateDiagonal";
            break;
        default: //5
            element.style.animationName = "translateXOpacity";
            break;
    }

    //Es la velocitar a la que va segons puntatge proporcionalment als punts
    if (player.points < 800) {
        //10 es el que val l'animacio per defecte en el index.css
        element.style.animationDuration = 10 - (player.points / 100) + "s";
    } else {
        //Si pasa del 800 punts la velocitat seran 2 segons
        element.style.animationDuration = "2s";
    }

}


function animateStars() {
    document.getElementById("number-star").innerText = player.points;
    let starties = document.getElementsByClassName("sub-star");
    if (player.points % 5 == 1) {
        document.getElementById("numberStars").style.color = "lightyellow";
        for (let i = 0; i < starties.length; i++) {
            starties[i].style.color = "black";
        }
    } else {
        document.getElementById("numberStars").style.color = "yellow";
        let numberStars = (player.points % 5) - 1;
        for (let i = 0; i < numberStars; i++) {
            starties[i].style.color = "yellow";
        }
        if (player.points % 5 == 0) {
            starties[3].style.color = "yellow";
        }
    }

}

function loadWanted() {
    //Carrega la musica
    reproductor.src = "./audio/sakebink_niclaus.mp3";
    reproductor.muted = true;
    reproductor.loop = true;
    //Carrega el localstorage
    let dataL = localStorage.getItem(WANTEDLOCAL);
    if (dataL != null) {
        player.scoreList = dataL.split(",").map(Number);
    } else {
        localStorage.setItem(WANTEDLOCAL, "0,0,0,0,0")
        player.scoreList = [0, 0, 0, 0, 0];

    }
    makeFooter();

}
///Musica
function playPauseMusic(event) {
    let musicnote = event.target;
    if (reproductor.paused) {
        reproductor.muted = false;
        reproductor.play();
        musicnote.innerText = "music_note";
        return;
    }
    musicnote.innerText = "music_off"
    reproductor.currentTime = 0;
    reproductor.pause();

}
//https://stackoverflow.com/a/45036752
function resetAnimation() {
    var el = document.getElementById('wanted-poster');
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null;
}

function pauseWanted(event) {
    let panel = document.getElementById("panelAbsoluto");

    if (player.isPlaying) {
        panel.style.opacity = 0;
        event.target.innerText = "pause_circle_outline";
        event.target.style.fontSize = "50px";
        player.isPlaying = false;
    } else if (!player.isPlaying) {
        panel.style.opacity = 1;
        event.target.style.fontSize = "24px";
        event.target.innerText = "play_circle_outline";
        player.isPlaying = true;
    }

}

function generateScore() {
    let pare = document.getElementById("score-wanted");
    deleteChilds(pare);
    let ol = document.createElement("ol");
    for (let i = 0; i < player.scoreList.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = "<span class='material-icons'>star</span> ... " + player.scoreList[i];
        ol.appendChild(li);
    }
    pare.appendChild(ol);
}

function makeFooter() {
    const d = new Date();
    let foot = document.getElementById("wanted-menu-footer");
    foot.innerHTML = `Zack Sama · ${d.getFullYear()} · <a href="https://www.zksama.com"> Zack Project</a>`;
}