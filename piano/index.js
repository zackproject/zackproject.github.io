
let notaActual = 0;
let notasBlancas = [28, 30, 32, 33, 35, 37, 39, 40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59];
let notasNegras = [29, 31, 34, 36, 38, 41, 43, 46, 48, 50, 53, 55, 58];
let textoDisponibles = [
    ["C3", "C3#  D3b", "D3", "D3#  E3b", "E3", "F3", "F3#  G3b", "G3", "G3#  A3b", "A3", "A3#  B3b", "B3", "C4", "C4#  D4b", "D4", "D4#  E4b", "E4", "F4", "F4#  G4b", "G4", "G4#  A4b", "A4", "A4#  B4b", "B4", "C5", "C5#  D5b", "D5", "D5#  E5b", "E5", "F5", "F5#  G5b", "G5"],
    ["DO", "DO# REb", "RE", "RE# MIb", "MI", "FA", "FA# SOLb", "SOL", "SOL# LAb", "LA", "LA# SIb", "SI", "DO", "DO# REb", "RE", "RE# MIb", "MI", "FA", "FA# SOLb", "SOL", "SOL# LAb", "LA", "LA# SIb", "SI", "DO#", "RE", "RE#", "MIb", "MI", "FA#", "SOLb", "SOL"],
    ["A", "a", "B", "b", "C", "D", "c", "E", "d", "F", "e", "G", "H", "f", "I", "g", "J", "K", "h", "L", "i", "M", "j", "N", "O", "k", "P", "l", "Q", "R", "m", "S"]
];

let cancionImportada = null;
let letras = '';
const NOTESONLINE = 'https://www.musicca.com/lydfiler/piano/';
const PATHMUSIC = 'music'

function readPath() {
    let listaStringNotes = new URLSearchParams(document.location.search).get("music");
    if (listaStringNotes == null || listaStringNotes == '') return false;
    let lista = listaStringNotes.split("");
    console.log("Path:", lista);

    //Tabla ASCII: 65:Mayuscula 97:Minuscula
    let textoListToNumbers = (e) => {
        //Las letras minusculas coresponden a las negras 'abcdefg'
        if (e === e.toLowerCase()) return notasNegras[e.charCodeAt(0) - 97];
        //Las letras mayusculas coresponden a las negras 'ABCDEFG'
        return notasBlancas[e.charCodeAt(0) - 65];
    }
    //Notas musicales
    cancionImportada = lista.map(textoListToNumbers);
    console.log(cancionImportada);
    return true;
}

function loadMusic() {
    let paramsDisponibles = readPath();
    if (!paramsDisponibles) {
        document.getElementById("touch-this").style.display = "none";
    }

    updateTextPiano();
}

function tocaEsto() {
    if (notaActual >= cancionImportada.length) notaActual = 0;
    drawTecla(cancionImportada[notaActual]);
    let linkSong = NOTESONLINE + cancionImportada[notaActual] + '.mp3';
    var audio = new Audio(linkSong);
    audio.play();
    document.getElementById("tempo").innerText = `${notaActual + 1}/${cancionImportada.length}`
    notaActual++;
}

function drawTecla(num) {
    let listBlancaHTML = document.getElementsByClassName("primary-note");
    for (let i = 0; i < listBlancaHTML.length; i++) {
        listBlancaHTML[i].style.background = "";
        listBlancaHTML[i].style.transform = "";
    }
    let listNegraHTML = document.getElementsByClassName("secondary-note");
    for (let i = 0; i < listNegraHTML.length; i++) {
        listNegraHTML[i].style.transform = "";
    }

    if (notasBlancas.includes(parseInt(num))) {
        let pos = notasBlancas.indexOf(num);
        listBlancaHTML[pos].style.background = "lightgray";
        listBlancaHTML[pos].style.transform = "translateY(5px)";
    }

    if (notasNegras.includes(parseInt(num))) {
        let pos = notasNegras.indexOf(num);
        listNegraHTML[pos].style.transform = "translateY(5px)";
    }

}

function updateTextPiano() {
    let slct = document.getElementById("selectTextPiano");
    let slctNum = parseInt(slct.selectedOptions[0].value);
    for (let i = 0; i < document.getElementsByClassName("tecla").length; i++) {
        const element = document.getElementsByClassName("tecla")[i];
        element.innerText = textoDisponibles[slctNum][i];
        //console.log(element.innerText);
    }

}

function soundBlanca(ntecla) {
    let linkSong = NOTESONLINE + notasBlancas[ntecla] + '.mp3';
    var audio = new Audio(linkSong);
    audio.play();
    saveSong(true, ntecla);
}

function soundNegra(ntecla) {
    let linkSong = NOTESONLINE + notasNegras[ntecla] + ".mp3"
    var audio = new Audio(linkSong);
    audio.play();
    saveSong(false, ntecla);

}

function saveSong(isWhite, nTecla) {
    if (isWhite) {
        let asciLetra = notasBlancas.indexOf(parseInt(notasBlancas[nTecla])) + 97;
        letras = letras + String.fromCharCode(asciLetra).toUpperCase();
    } else {
        let asciLetra = notasNegras.indexOf(parseInt(notasNegras[nTecla])) + 65;
        letras = letras + String.fromCharCode(asciLetra).toLowerCase();
    }
    document.getElementById("resultat").href = "./?" + PATHMUSIC + "=" + letras;
    document.getElementById("resultat").innerText = "Notas Grabadas: "+letras.length;
}
function pulsado(event) {
    let nTecla = null;
    let listTecla = null;
    switch (event.key) {
        //Teclas blancas
        case 'z':
            nTecla = 0
            listTecla = notasBlancas[nTecla];
            break;
        case 'x':
            nTecla = 1;
            listTecla = notasBlancas[nTecla];
            break;
        case 'c':
            nTecla = 2;
            listTecla = notasBlancas[nTecla];
            break;
        case 'v':
            nTecla = 3;
            listTecla = notasBlancas[nTecla];
            break;
        case 'b':
            nTecla = 4;
            listTecla = notasBlancas[nTecla];
            break;
        case 'n':
            nTecla = 5;
            listTecla = notasBlancas[nTecla];
            break;
        case 'm':
            nTecla = 6;
            listTecla = notasBlancas[nTecla];
            break;
        case 'a':
            nTecla = 7;
            listTecla = notasBlancas[nTecla];
            break;
        case 's':
            nTecla = 8;
            listTecla = notasBlancas[nTecla];
            break;
        case 'd':
            nTecla = 9;
            listTecla = notasBlancas[nTecla];
            break;
        case 'f':
            nTecla = 10;
            listTecla = notasBlancas[nTecla];
            break;
        case 'g':
            nTecla = 11;
            listTecla = notasBlancas[nTecla];
            break;
        case 'h':
            nTecla = 12;
            listTecla = notasBlancas[nTecla];
            break;
        case 'j':
            nTecla = 13;
            listTecla = notasBlancas[nTecla];
            break;
        case 'q':
            nTecla = 14;
            listTecla = notasBlancas[nTecla];
            break;
        case 'w':
            nTecla = 15;
            listTecla = notasBlancas[nTecla];
            break;
        case 'e':
            nTecla = 16;
            listTecla = notasBlancas[nTecla];
            break;
        case 'r':
            nTecla = 17;
            listTecla = notasBlancas[nTecla];
            break;
        case 't':
            nTecla = 18;
            listTecla = notasBlancas[nTecla];
            break;
        case '1':
            //Notas negras
            nTecla = 0;
            listTecla = notasNegras[nTecla];
            break;
        case '2':
            nTecla = 1;
            listTecla = notasNegras[nTecla];
            break;
        case '3':
            nTecla = 2;
            listTecla = notasNegras[nTecla];
            break;
        case '4':
            nTecla = 3;
            listTecla = notasNegras[nTecla];
            break;
        case '5':
            nTecla = 4;
            listTecla = notasNegras[nTecla];
            break;
        case '6':
            nTecla = 5;
            listTecla = notasNegras[nTecla];
            break;
        case '7':
            nTecla = 6;
            listTecla = notasNegras[nTecla];
            break;
        case '8':
            nTecla = 7;
            listTecla = notasNegras[nTecla];
            break;
        case '9':
            nTecla = 8;
            listTecla = notasNegras[nTecla];
            break;
        case '0':
            nTecla = 9;
            listTecla = notasNegras[nTecla];
            break;
    }

    //drawTecla(nTecla);
    if (listTecla != null) {
        let linkSong = NOTESONLINE + listTecla + '.mp3';
        var audio = new Audio(linkSong);
        audio.play();
        drawTecla(parseInt(listTecla))
    } else {
        console.log("nope", listTecla);
    }
}
