let notasBlancas = [28, 30, 32, 33, 35, 37, 39, 40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59]; //notasBlancas
let notasNegras = [29, 31, 34, 36, 38, 41, 43, 46, 48, 50, 53, 55, 58]; //notasNegras
let colorList = [
    ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "gray", "black", "white", "teal", "maroon", "navy", "olive", "lime", "aqua", "fuchsia", "silver"],
    ["gold", "indigo", "ivory", "khaki", "lavender", "magenta", "mint", "peach", "plum", "rose", "salmon", "tan", "turquoise"]
];
let tecles =
{
    "z": { "pos": 0, "tecla": notasBlancas[0] },
    "x": { "pos": 1, "tecla": notasBlancas[1] },
    "c": { "pos": 2, "tecla": notasBlancas[2] },
    "v": { "pos": 3, "tecla": notasBlancas[3] },
    "b": { "pos": 4, "tecla": notasBlancas[4] },
    "n": { "pos": 5, "tecla": notasBlancas[5] },
    "m": { "pos": 6, "tecla": notasBlancas[6] },
    "a": { "pos": 8, "tecla": notasBlancas[7] },
    "s": { "pos": 8, "tecla": notasBlancas[8] },
    "d": { "pos": 9, "tecla": notasBlancas[9] },
    "f": { "pos": 10, "tecla": notasBlancas[10] },
    "g": { "pos": 11, "tecla": notasBlancas[11] },
    "h": { "pos": 12, "tecla": notasBlancas[12] },
    "j": { "pos": 13, "tecla": notasBlancas[13] },
    "q": { "pos": 14, "tecla": notasBlancas[14] },
    "w": { "pos": 15, "tecla": notasBlancas[15] },
    "e": { "pos": 16, "tecla": notasBlancas[16] },
    "r": { "pos": 17, "tecla": notasBlancas[17] },
    "t": { "pos": 18, "tecla": notasBlancas[18] },
    "1": { "pos": 0, "tecla": notasNegras[0] },
    "2": { "pos": 1, "tecla": notasNegras[1] },
    "3": { "pos": 2, "tecla": notasNegras[2] },
    "4": { "pos": 3, "tecla": notasNegras[3] },
    "5": { "pos": 4, "tecla": notasNegras[4] },
    "6": { "pos": 5, "tecla": notasNegras[5] },
    "7": { "pos": 6, "tecla": notasNegras[6] },
    "8": { "pos": 7, "tecla": notasNegras[7] },
    "9": { "pos": 8, "tecla": notasNegras[8] },
    "0": { "pos": 9, "tecla": notasNegras[9] },
    "y": { "pos": 10, "tecla": notasNegras[10] },
    "u": { "pos": 11, "tecla": notasNegras[11] },
    "i": { "pos": 12, "tecla": notasNegras[12] },

};
let textoDisponibles = [
    ["C3", "C3#  D3b", "D3", "D3#  E3b", "E3", "F3", "F3#  G3b", "G3", "G3#  A3b", "A3", "A3#  B3b", "B3", "C4", "C4#  D4b", "D4", "D4#  E4b", "E4", "F4", "F4#  G4b", "G4", "G4#  A4b", "A4", "A4#  B4b", "B4", "C5", "C5#  D5b", "D5", "D5#  E5b", "E5", "F5", "F5#  G5b", "G5"],
    ["DO", "DO# REb", "RE", "RE# MIb", "MI", "FA", "FA# SOLb", "SOL", "SOL# LAb", "LA", "LA# SIb", "SI", "DO", "DO# REb", "RE", "RE# MIb", "MI", "FA", "FA# SOLb", "SOL", "SOL# LAb", "LA", "LA# SIb", "SI", "DO#", "RE", "RE#", "MIb", "MI#", "FA#", "SOLb", "SOL#"],
    ["A", "a", "B", "b", "C", "D", "c", "E", "d", "F", "e", "G", "H", "f", "I", "g", "J", "K", "h", "L", "i", "M", "j", "N", "O", "k", "P", "l", "Q", "R", "m", "S"]
];

let cancionImportada = null;
let letras = '';
let nameSong = null;
class Piano {
    constructor(tranportePieza, notaActual, cancionImportada = null, titleSong = null, letras = "") {
        this.tranportePieza = tranportePieza;
        this.notaActual = notaActual;
        this.cancionImportada = cancionImportada;
        this.titleSong = titleSong,
            this.letras = letras
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