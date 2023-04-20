const NOTESONLINE = './notes/';
const PATHMUSIC = 'song'
const PATHSONG = 'title';
//tranportePieza //notaActual
let player = new Piano(0, 0);
console.log(player);

function readPath() {
    //Guarda el parametres de 'PATHMUSIC' y 'PATHSONG'
    let listaStringNotes = new URLSearchParams(document.location.search).get(PATHMUSIC);
    let titleSong = new URLSearchParams(document.location.search).get(PATHSONG);

    if (listaStringNotes == null || listaStringNotes == '') return false;
    if (titleSong == null || titleSong == '') return false;

    let lista = listaStringNotes.split("");
    ///console.log("Path:", lista);
    //console.log("Title", titleSong);

    //Tabla ASCII: 65:Mayuscula 97:Minuscula
    let textoListToNumbers = (e) => {
        //Las letras minusculas coresponden a las negras 'abcdefg'
        if (e === e.toLowerCase()) return notasNegras[e.charCodeAt(0) - 97];
        //Las letras mayusculas coresponden a las negras 'ABCDEFG'
        return notasBlancas[e.charCodeAt(0) - 65];
    }

    //Notas musicales
    player.titleSong = player.muestraCancion(titleSong)
    player.cancionImportada = lista.map(textoListToNumbers);
    return true;
}



function loadMusic() {
    // Si hi han paramentres, retorna 'true'
    let paramsDisponibles = readPath();
    if (!paramsDisponibles) {
        //Amaga el 'transportador' i el 'toca esto'
        document.getElementById("menu-adivinar-cancion").style.display = "none";
        document.getElementById("menu-escribir-cancion").style.display = "block";
    } else {
        document.getElementById("menu-adivinar-cancion").style.display = "block";
        document.getElementById("menu-escribir-cancion").style.display = "none";
        //GeneraButtons
        let btnContainer = document.getElementById("btnGenerated");
        let listLetras = disorderWord(player.titleSong).split("");
        for (let i = 0; i < listLetras.length; i++) {
            let btn = document.createElement("button");
            btn.className = "btn-guess"
            if (listLetras[i] === " ") btn.innerHTML = "&nbsp";
            if (listLetras[i] !== " ") btn.innerText = listLetras[i];
            btnContainer.appendChild(btn);
        }
    }
    //Canvia segons l'escala
    updateTextPiano();
}

function tocaEsto() {
    //Si la nota es fora del teclat, reseteja
    if (player.notaActual >= player.cancionImportada.length) player.notaActual = 0;
    //Dibuixa la nota al teclat
    drawTecla(player.cancionImportada[player.notaActual]);
    // Crea un link de
    let linkSong = NOTESONLINE + player.cancionImportada[player.notaActual] + '.mp3';
    var audio = new Audio(linkSong);
    audio.play();
    let tempo = document.getElementById("tempo");
    tempo.innerHTML = `&nbsp ${player.notaActual + 1}/${player.cancionImportada.length}`;
    tempo.style.width = (100 * (player.notaActual + 1) / player.cancionImportada.length) + "%";

    player.notaActual++;
}

function drawTecla(num) {
    //Neteja totes les tecles blanques
    let listBlancaHTML = document.getElementsByClassName("primary-note");
    for (let i = 0; i < listBlancaHTML.length; i++) {
        listBlancaHTML[i].style.background = "";
        listBlancaHTML[i].style.transform = "";
    }
    //Neteja totes les tecles negres
    let listNegraHTML = document.getElementsByClassName("secondary-note");
    for (let i = 0; i < listNegraHTML.length; i++) {
        listNegraHTML[i].style.transform = "";
    }
    let clrsHTML = document.getElementById("touch-this");
    //Si toca una blanca, es mou
    if (notasBlancas.includes(parseInt(num))) {
        let pos = notasBlancas.indexOf(num);
        //Color de la nota del boton
        clrsHTML.style.color = colorList[0][pos];
        //Crea nota
        createNoteAnimated(true, colorList[0][pos]);
        listBlancaHTML[pos].style.background = "lightgray";
        listBlancaHTML[pos].style.transform = "translateY(5px)";
    }
    //Si toca una negra, es mou
    if (notasNegras.includes(parseInt(num))) {
        let pos = notasNegras.indexOf(num);
        //Crea nota
        createNoteAnimated(false, colorList[1][pos]);
        clrsHTML.style.color = colorList[1][pos];
        listNegraHTML[pos].style.transform = "translateY(5px)";
    }

}

function updateTextPiano() {
    let slct = document.getElementById("selectTextPiano");
    let slctNum = parseInt(slct.selectedOptions[0].value);
    //0 = Inglesa, 1= Do 2= Alphabet
    for (let i = 0; i < document.getElementsByClassName("tecla").length; i++) {
        //Per cada tecla actualitza el contingut
        const element = document.getElementsByClassName("tecla")[i];
        element.innerText = textoDisponibles[slctNum][i];
        element.ariaLabel = "Reproducir nota " + textoDisponibles[slctNum][i];
    }

}

function soundBlanca(ntecla) {
    //Toca la blanca i guarda la tecla
    let linkSong = NOTESONLINE + notasBlancas[ntecla] + '.mp3';
    var audio = new Audio(linkSong);
    audio.play();
    saveSong(notasBlancas[ntecla]);
}

function soundNegra(ntecla) {
    //Toca la negra i guarda la tecla
    let linkSong = NOTESONLINE + notasNegras[ntecla] + ".mp3"
    var audio = new Audio(linkSong);
    audio.play();
    saveSong(notasNegras[ntecla]);
}

function saveSong(nTecla) {
    //Guarda si el troba, sino es '-1'
    player.updateLetra(notasBlancas, notasNegras, nTecla)
    //Acualitza el 'a:href'
    document.getElementById("updateSave").innerText = "Notas Grabadas: " + player.letras.length;
}
function pulsado(event) {
    //Si no es dins del 'input', sona
    if (document.getElementById("inputSong") !== document.activeElement) {
        let obj = tecles[event.key];
        //Si la tecla existeix
        if (typeof obj !== 'undefined') {
            // do something 
            let linkSong = NOTESONLINE + obj.tecla + '.mp3';
            var audio = new Audio(linkSong);
            audio.play();
            //Pinta la tecla blanca o gris en css premuda
            drawTecla(obj.tecla);
            //Guarda en 'letras' la nota actual en ASCII 
            saveSong(obj.tecla);

        }
    }
}


function avanzaEscala() {
    //Reseteja la song
    //Si incluye la ultima nota no puede avanzarla
    player.avanzaPieza(notasBlancas)
    document.getElementById("transportePieza").innerText = textSum(player.tranportePieza);
}

function retrocedeEscala() {
    //Reseteja la song
    //Si incluye la primera nota no puede retroceder
    player.retrocedePieza(notasBlancas)
    document.getElementById("transportePieza").innerText = textSum(player.tranportePieza);
}

function textSum(num) {
    //Si es positiu '+1, +2'
    if (num > 0) return "+" + num;
    //Si no retorna tal cual (el negatiu ja te el -num)
    return num;
}

function generateLink() {
    let nameSong = document.getElementById("inputSong").value.toLowerCase();
    let nResultat = document.getElementById("resultat");
    nResultat.href = `./?${PATHMUSIC}=${player.letras}&${PATHSONG}=${player.ocultaCancion(nameSong)} `
    nResultat.innerText = nameSong;
}

function disorderWord(word) {
    return word.split('').sort(function () { return 0.5 - Math.random() }).join('').toLowerCase();
}


function resetSong() {
    player.letras = "";
    document.getElementById("updateSave").innerText = "Notas Grabadas: " + player.letras.length;
}


function createNoteAnimated(isWhite, color) {
    let father = document.getElementById("menu-piano");
    //<div class="note-fall material-icons">music_note</div>
    let note = document.createElement("div");
    note.className = "note-fall material-icons";
    note.innerText = "music_note";
    note.style.color = color;
    if (isWhite) {
        note.style.animation = "fall-music-left 3s linear, rotate 4s linear";
    } else {
        note.style.animation = "fall-music-right 3s linear, rotate 4s linear";
    }
    note.style.animationFillMode = "forwards";
    father.appendChild(note);
    //Borrara las notas que sean mayores de'50'
    if (document.getElementsByClassName("note-fall").length > 50) {
        father.removeChild(document.getElementsByClassName("note-fall")[0]);
    }

}