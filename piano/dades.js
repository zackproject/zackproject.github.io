let notasBlancas = [28, 30, 32, 33, 35, 37, 39, 40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59, 61, 63]; //notasBlancas
let notasNegras = [29, 31, 34, 36, 38, 41, 43, 46, 48, 50, 53, 55, 58, 60, 62]; //notasNegras
let colorList = [
    [//Teclas blancas
        '#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#EE82EE', //Escala 1
        '#FF4C4C', '#FF923D', '#FFFF4C', '#4CFF4C', '#4C4CFF', '#9d2dff', '#B84CBF', //Escala 2
        '#FF5A5A', '#FFA347', '#FFFF5A', '#5AFF5A', '#5A5AFF', '#9367c8', '#C75BCF', //Escala 3
    ],
    [ //Teclas negras
        "#FF5300", "#FFD200", "#008080", "#2c0082", "#9D41B8", //Escala 1
        '#FF6B33', '#FFE666', '#009999', '#3700A1', '#AD56C3', //Escala 2
        "#ff853e", "#fff48f", "#00b3b3", "#3500c1", "#c977d4"  //Escala 3
    ]
];

let tecles =
{
    //Escala 1 qwertyuiop`+
    "49": { "pos": 0, "tecla": notasBlancas[0] },
    "50": { "pos": 0, "tecla": notasNegras[0] },
    "51": { "pos": 1, "tecla": notasBlancas[1] },
    "52": { "pos": 1, "tecla": notasNegras[1] },
    "53": { "pos": 2, "tecla": notasBlancas[2] },
    "54": { "pos": 3, "tecla": notasBlancas[3] },
    "55": { "pos": 2, "tecla": notasNegras[2] },
    "56": { "pos": 4, "tecla": notasBlancas[4] },
    "57": { "pos": 3, "tecla": notasNegras[3] },
    "48": { "pos": 5, "tecla": notasBlancas[5] },
    "219": { "pos": 4, "tecla": notasNegras[4] },
    "221": { "pos": 6, "tecla": notasBlancas[6] },
    //Escala 2 qwertyuiop`+
    "81": { "pos": 7, "tecla": notasBlancas[7] },
    "87": { "pos": 5, "tecla": notasNegras[5] },
    "69": { "pos": 8, "tecla": notasBlancas[8] },
    "82": { "pos": 6, "tecla": notasNegras[6] },
    "84": { "pos": 9, "tecla": notasBlancas[9] },
    "89": { "pos": 10, "tecla": notasBlancas[10] },
    "85": { "pos": 7, "tecla": notasNegras[7] },
    "73": { "pos": 11, "tecla": notasBlancas[11] },
    "79": { "pos": 8, "tecla": notasNegras[8] },
    "80": { "pos": 12, "tecla": notasBlancas[12] },
    "186": { "pos": 9, "tecla": notasNegras[9] },
    "187": { "pos": 13, "tecla": notasBlancas[13] },
    //Escala 3 OK 1234567890'¡
    "65": { "pos": 14, "tecla": notasBlancas[14] },
    "83": { "pos": 10, "tecla": notasNegras[10] },
    "68": { "pos": 15, "tecla": notasBlancas[15] },
    "70": { "pos": 11, "tecla": notasNegras[11] },
    "71": { "pos": 16, "tecla": notasBlancas[16] },
    "72": { "pos": 17, "tecla": notasBlancas[17] },
    "74": { "pos": 12, "tecla": notasNegras[12] },
    "75": { "pos": 18, "tecla": notasBlancas[18] },
    "76": { "pos": 13, "tecla": notasNegras[13] },
    "192": { "pos": 19, "tecla": notasBlancas[19] },
    "222": { "pos": 14, "tecla": notasNegras[14] },
    "191": { "pos": 20, "tecla": notasBlancas[20] },
};
let textoDisponibles = [
    ["C3", "C3#  D3b", "D3", "D3#  E3b", "E3", "F3", "F3#  G3b", "G3", "G3#  A3b", "A3", "A3#  B3b", "B3", "C4", "C4#  D4b", "D4", "D4#  E4b", "E4", "F4", "F4#  G4b", "G4", "G4#  A4b", "A4", "A4#  B4b", "B4", "C5", "C5#  D5b", "D5", "D5#  E5b", "E5", "F5", "F5#  G5b", "G5", "G5# A5b", "A5", "A5# B5b", "B5"],
    ["DO", "DO# REb", "RE", "RE# MIb", "MI", "FA", "FA# SOLb", "SOL", "SOL# LAb", "LA", "LA# SIb", "SI", "DO", "DO# REb", "RE", "RE# MIb", "MI", "FA", "FA# SOLb", "SOL", "SOL# LAb", "LA", "LA# SIb", "SI", "DO", "DO# REb", "RE", "RE# MIb", "MI", "FA", "FA# SOLb", "SOL", "SOL# LAb", "LA", "LA# SIb", "SI",],
    ["A", "a", "B", "b", "C", "D", "c", "E", "d", "F", "e", "G", "H", "f", "I", "g", "J", "K", "h", "L", "i", "M", "j", "N", "O", "k", "P", "l", "Q", "R", "m", "S", "n", "T", "o", "U"],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
];

let cancionImportada = null;
let letras = '';
let nameSong = null;

class Piano {
    constructor(tranportePieza, notaActual, disordedTitle, cancionImportada = null, titleSong = null, letras = "") {
        this.tranportePieza = tranportePieza;
        this.notaActual = notaActual;
        this.cancionImportada = cancionImportada;
        this.titleSong = titleSong;
        this.letras = letras;
        this.disordedTitle = disordedTitle;
    }

    avanzaPieza(nBlancas) {
        //Si incluye la ultima nota no puede avanzarla
        if (!this.cancionImportada.includes(nBlancas[nBlancas.length - 1])) {
            this.cancionImportada = this.cancionImportada.map((e) => e + 1);
            this.tranportePieza++;
            //document.getElementById("transportePieza").innerText = textSum(tranportePieza);
        }
        this.notaActual = 0

    }
    retrocedePieza(nBlancas) {
        //Si incluye la primera nota no puede retrocederla
        if (!this.cancionImportada.includes(nBlancas[0])) {
            this.cancionImportada = this.cancionImportada.map((e) => e - 1);
            this.tranportePieza--;
            //document.getElementById("transportePieza").innerText = textSum(tranportePieza);
        }
        this.notaActual = 0
    }
    ocultaCancion(texto) {
        let nuevoTexto = ""
        //Si es true encripta el texto
        //Primero voltea el texto
        texto = texto.split("").reverse().join("");
        for (let i in texto) {
            switch (texto[i]) {
                case 'z':
                    //Codigo ascci 'z' => '{'. para evitar pongo  '7'
                    nuevoTexto += "7";
                    break;
                case ' ':
                    nuevoTexto += "0";
                    break;
                default:
                    //Avanza una letra
                    nuevoTexto += String.fromCharCode(texto[i].charCodeAt() + 1)
                    break;
            }
        }
        return nuevoTexto;
    }

    muestraCancion(texto) {
        let nuevoTexto = ""
        texto = texto.split("").reverse().join("");
        for (let i in texto) {
            //Se invierten los casos7
            switch (texto[i]) {
                case '7':
                    //Codigo ascci 'z' => '{'. para evitar pongo  '7'
                    nuevoTexto += "z";
                    break;
                case '0':
                    nuevoTexto += " ";
                    break;
                default:
                    //Retrocede una letra
                    nuevoTexto += String.fromCharCode(texto[i].charCodeAt() - 1)
                    break;
            }
        }
        return nuevoTexto;
    }

    updateLetra(notasBlancas, notasNegras, nTecla) {
        let esBlanca = notasBlancas.indexOf(nTecla);
        let esNegra = notasNegras.indexOf(nTecla);
        if (esBlanca !== -1) {
            //Si es una blanca es diferent a -1
            this.letras = this.letras + String.fromCharCode(esBlanca + 97).toUpperCase();
        }

        if (esNegra !== -1) {
            //Si es una negra es diferent a -1
            this.letras = this.letras + String.fromCharCode(esNegra + 65).toLowerCase();
        }
    }

}