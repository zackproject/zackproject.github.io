
let tranportePieza = 0;
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
const NOTESONLINE = './notes/';
const PATHMUSIC = 'song'
const PATHSONG = 'title';

function readPath() {
    //Guarda el parametres de 'PATHMUSIC' y 'PATHSONG'
    let listaStringNotes = new URLSearchParams(document.location.search).get(PATHMUSIC);
    let titleSong = new URLSearchParams(document.location.search).get(PATHSONG);

    if (listaStringNotes == null || listaStringNotes == '') return false;
    //if (titleSong == null || titleSong == '') return false;

    let lista = listaStringNotes.split("");
    console.log("Path:", lista);
    console.log("Title", titleSong);

    //Tabla ASCII: 65:Mayuscula 97:Minuscula
    let textoListToNumbers = (e) => {
        //Las letras minusculas coresponden a las negras 'abcdefg'
        if (e === e.toLowerCase()) return notasNegras[e.charCodeAt(0) - 97];
        //Las letras mayusculas coresponden a las negras 'ABCDEFG'
        return notasBlancas[e.charCodeAt(0) - 65];
    }

    //Notas musicales
    cancionImportada = lista.map(textoListToNumbers);
    return true;
}

function ocultaCancion(texto, encrypt = false) {
    let nuevoTexto = ""
    //Para en/des-encriptar tiene que  voltear el textp
    texto = texto.split("").reverse().join("");
    //Si es true encripta el texto
    if (encrypt) {
        //Primero voltea el texto
        texto = texto.split("").reverse().join("");
        for (let i in texto) {
            //Codigo ascci 'z' => '{'. para evitar pongo  '7'
            if (texto[i] == "z") {
                nuevoTexto += "7";
            } else {
                //Avanza una letra
                nuevoTexto += String.fromCharCode(texto[i].charCodeAt() + 1)
            }
        }
        return nuevoTexto;
    }

    for (let i in texto) {
        //Se invierten los casos
        if (texto[i] == "7") {
            nuevoTexto += "z";
        } else {
            //Retrocede una letra
            nuevoTexto += String.fromCharCode(texto[i].charCodeAt() - 1)
        }
    }
    return nuevoTexto;
}

function loadMusic() {
    // Si hi han paramentres, retorna 'true'
    let paramsDisponibles = readPath();
    if (!paramsDisponibles) {
        //Amaga el 'transportador' i el 'toca esto'
        document.getElementById("tranporte").style.display = "none";
        document.getElementById("touch-this").style.display = "none";
    }
    //Canvia segons l'escala
    updateTextPiano();
}

function tocaEsto() {
    //Si la nota es fora del teclat, reseteja
    if (notaActual >= cancionImportada.length) notaActual = 0;
    //Dibuixa la nota al teclat
    drawTecla(cancionImportada[notaActual]);
    // Crea un link de
    let linkSong = NOTESONLINE + cancionImportada[notaActual] + '.mp3';
    var audio = new Audio(linkSong);
    audio.play();
    document.getElementById("tempo").innerText = `${notaActual + 1}/${cancionImportada.length}`
    notaActual++;
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

    //Si toca una blanca, es mou
    if (notasBlancas.includes(parseInt(num))) {
        let pos = notasBlancas.indexOf(num);
        listBlancaHTML[pos].style.background = "lightgray";
        listBlancaHTML[pos].style.transform = "translateY(5px)";
    }
    //Si toca una negra, es mou
    if (notasNegras.includes(parseInt(num))) {
        let pos = notasNegras.indexOf(num);
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
    let esBlanca = notasBlancas.indexOf(nTecla);
    let esNegra = notasNegras.indexOf(nTecla);
    if (esBlanca !== -1) {
        //Si es una blanca es diferent a -1
        asciLetra = esBlanca + 97;
        letras = letras + String.fromCharCode(asciLetra).toUpperCase();
    }

    if (esNegra !== -1) {
        //Si es una negra es diferent a -1
        asciLetra = esNegra + 65;
        letras = letras + String.fromCharCode(asciLetra).toLowerCase();
    }
    //Acualitza el 'a:href'
    document.getElementById("resultat").href = "./?" + PATHMUSIC + "=" + letras;
    document.getElementById("resultat").innerText = "Notas Grabadas: " + letras.length;
}
function pulsado(event) {
    let nTecla = null;
    let numNote = null;
    switch (event.key) {
        //Teclas blancas
        case 'z':
            nTecla = 0
            numNote = notasBlancas[nTecla];
            break;
        case 'x':
            nTecla = 1;
            numNote = notasBlancas[nTecla];
            break;
        case 'c':
            nTecla = 2;
            numNote = notasBlancas[nTecla];
            break;
        case 'v':
            nTecla = 3;
            numNote = notasBlancas[nTecla];
            break;
        case 'b':
            nTecla = 4;
            numNote = notasBlancas[nTecla];
            break;
        case 'n':
            nTecla = 5;
            numNote = notasBlancas[nTecla];
            break;
        case 'm':
            nTecla = 6;
            numNote = notasBlancas[nTecla];
            break;
        case 'a':
            nTecla = 7;
            numNote = notasBlancas[nTecla];
            break;
        case 's':
            nTecla = 8;
            numNote = notasBlancas[nTecla];
            break;
        case 'd':
            nTecla = 9;
            numNote = notasBlancas[nTecla];
            break;
        case 'f':
            nTecla = 10;
            numNote = notasBlancas[nTecla];
            break;
        case 'g':
            nTecla = 11;
            numNote = notasBlancas[nTecla];
            break;
        case 'h':
            nTecla = 12;
            numNote = notasBlancas[nTecla];
            break;
        case 'j':
            nTecla = 13;
            numNote = notasBlancas[nTecla];
            break;
        case 'q':
            nTecla = 14;
            numNote = notasBlancas[nTecla];
            break;
        case 'w':
            nTecla = 15;
            numNote = notasBlancas[nTecla];
            break;
        case 'e':
            nTecla = 16;
            numNote = notasBlancas[nTecla];
            break;
        case 'r':
            nTecla = 17;
            numNote = notasBlancas[nTecla];
            break;
        case 't':
            nTecla = 18;
            numNote = notasBlancas[nTecla];
            break;
        case '1':
            //Notas negras
            nTecla = 0;
            numNote = notasNegras[nTecla];
            break;
        case '2':
            nTecla = 1;
            numNote = notasNegras[nTecla];
            break;
        case '3':
            nTecla = 2;
            numNote = notasNegras[nTecla];
            break;
        case '4':
            nTecla = 3;
            numNote = notasNegras[nTecla];
            break;
        case '5':
            nTecla = 4;
            numNote = notasNegras[nTecla];
            break;
        case '6':
            nTecla = 5;
            numNote = notasNegras[nTecla];
            break;
        case '7':
            nTecla = 6;
            numNote = notasNegras[nTecla];
            break;
        case '8':
            nTecla = 7;
            numNote = notasNegras[nTecla];
            break;
        case '9':
            nTecla = 8;
            numNote = notasNegras[nTecla];
            break;
        case '0':
            nTecla = 9;
            numNote = notasNegras[nTecla];
            break;
        case 'y':
            nTecla = 10;
            numNote = notasNegras[nTecla];
            break;
        case 'u':
            nTecla = 11;
            numNote = notasNegras[nTecla];
            break;
        case 'i':
            nTecla = 12;
            numNote = notasNegras[nTecla];
            break;
    }

    //Si la tecla existeix
    if (numNote != null) {
        let linkSong = NOTESONLINE + numNote + '.mp3';
        var audio = new Audio(linkSong);
        audio.play();
        //Pinta la tecla blanca o gris en css premuda
        drawTecla(numNote);
        //Guarda en 'letras' la nota actual en ASCII 
        saveSong(numNote);
    }
}


function avanzaEscala() {
    //Reseteja la song
    notaActual = 0;
    //Si incluye la ultima nota no puede avanzarla
    if (!cancionImportada.includes(notasBlancas[notasBlancas.length - 1])) {
        cancionImportada = cancionImportada.map((e) => e + 1);
        tranportePieza++;
        document.getElementById("transportePieza").innerText = textSum(tranportePieza);
        return;
    }
    console.log("No puedo hacerlo mas");
}

function retrocedeEscala() {
    //Reseteja la song
    notaActual = 0;
    //Si incluye la primera nota no puede avanzarla
    if (!cancionImportada.includes(notasBlancas[0])) {
        cancionImportada = cancionImportada.map((e) => e - 1);
        tranportePieza--;
        document.getElementById("transportePieza").innerText = textSum(tranportePieza);
    }
}

function textSum(num) {
    //Si es positiu '+1, +2'
    if (num > 0) return "+" + num;
    //Si no retorna tal cual (el negatiu ja te el -num)
    return num;
}