const teclado = "VpWqXYrZstuvAaBbCDcEdFeGHfIgJKhLiMjNOkPlQRmSnToU";
const notesPiano = [
  { id: 0, note: "white", sound: "./notes/16.mp3", color: "#FF0000" },
  { id: 1, note: "black", sound: "./notes/17.mp3", color: "#FF5300" },
  { id: 2, note: "white", sound: "./notes/18.mp3", color: "#FFA500" },
  { id: 3, note: "black", sound: "./notes/19.mp3", color: "#FFD200" },
  { id: 4, note: "white", sound: "./notes/20.mp3", color: "#FFFF00" },
  { id: 5, note: "white", sound: "./notes/21.mp3", color: "#00FF00" },
  { id: 6, note: "black", sound: "./notes/22.mp3", color: "#008080" },
  { id: 7, note: "white", sound: "./notes/23.mp3", color: "#0000FF" },
  { id: 8, note: "black", sound: "./notes/24.mp3", color: "#2c0082" },
  { id: 9, note: "white", sound: "./notes/25.mp3", color: "#4B0082" },
  { id: 10, note: "black", sound: "./notes/26.mp3", color: "#9D41B8" },
  { id: 11, note: "white", sound: "./notes/27.mp3", color: "#EE82EE" },
  // Escala 1
  { id: 12, note: "white", sound: "./notes/28.mp3", color: "#FF0000" },
  { id: 13, note: "black", sound: "./notes/29.mp3", color: "#FF5300" },
  { id: 14, note: "white", sound: "./notes/30.mp3", color: "#FFA500" },
  { id: 15, note: "black", sound: "./notes/31.mp3", color: "#FFD200" },
  { id: 16, note: "white", sound: "./notes/32.mp3", color: "#FFFF00" },
  { id: 17, note: "white", sound: "./notes/33.mp3", color: "#00FF00" },
  { id: 18, note: "black", sound: "./notes/34.mp3", color: "#008080" },
  { id: 19, note: "white", sound: "./notes/35.mp3", color: "#0000FF" },
  { id: 20, note: "black", sound: "./notes/36.mp3", color: "#2c0082" },
  { id: 21, note: "white", sound: "./notes/37.mp3", color: "#4B0082" },
  { id: 22, note: "black", sound: "./notes/38.mp3", color: "#9D41B8" },
  { id: 23, note: "white", sound: "./notes/39.mp3", color: "#EE82EE" },
  // Escala 2
  { id: 24, note: "white", sound: "./notes/40.mp3", color: "#FF4C4C" },
  { id: 25, note: "black", sound: "./notes/41.mp3", color: "#FF6B33" },
  { id: 26, note: "white", sound: "./notes/42.mp3", color: "#FF923D" },
  { id: 27, note: "black", sound: "./notes/43.mp3", color: "#FFE666" },
  { id: 28, note: "white", sound: "./notes/44.mp3", color: "#FFFF4C" },
  { id: 29, note: "white", sound: "./notes/45.mp3", color: "#4CFF4C" },
  { id: 30, note: "black", sound: "./notes/46.mp3", color: "#009999" },
  { id: 31, note: "white", sound: "./notes/47.mp3", color: "#4C4CFF" },
  { id: 32, note: "black", sound: "./notes/48.mp3", color: "#3700A1" },
  { id: 33, note: "white", sound: "./notes/49.mp3", color: "#9d2dff" },
  { id: 34, note: "black", sound: "./notes/50.mp3", color: "#AD56C3" },
  { id: 35, note: "white", sound: "./notes/51.mp3", color: "#B84CBF" },
  // Escala 3
  { id: 36, note: "white", sound: "./notes/52.mp3", color: "#FF5A5A" },
  { id: 37, note: "black", sound: "./notes/53.mp3", color: "#ff853e" },
  { id: 38, note: "white", sound: "./notes/54.mp3", color: "#FFA347" },
  { id: 39, note: "black", sound: "./notes/55.mp3", color: "#fff48f" },
  { id: 40, note: "white", sound: "./notes/56.mp3", color: "#FFFF5A" },
  { id: 41, note: "white", sound: "./notes/57.mp3", color: "#5AFF5A" },
  { id: 42, note: "black", sound: "./notes/58.mp3", color: "#00b3b3" },
  { id: 43, note: "white", sound: "./notes/59.mp3", color: "#5A5AFF" },
  { id: 44, note: "black", sound: "./notes/60.mp3", color: "#3500c1" },
  { id: 45, note: "white", sound: "./notes/61.mp3", color: "#9367c8" },
  { id: 46, note: "black", sound: "./notes/62.mp3", color: "#c977d4" },
  { id: 47, note: "white", sound: "./notes/63.mp3", color: "#C75BCF" },
];

let tecles = {
  //Escala 1 qwertyuiop`+
  49: notesPiano[0],
  50: notesPiano[1],
  51: notesPiano[2],
  52: notesPiano[3],
  53: notesPiano[4],
  54: notesPiano[5],
  55: notesPiano[6],
  56: notesPiano[7],
  57: notesPiano[8],
  48: notesPiano[9],
  219: notesPiano[10],
  221: notesPiano[11],
  //Escala 2 qwertyuiop`+
  81: notesPiano[12],
  87: notesPiano[13],
  69: notesPiano[14],
  82: notesPiano[15],
  84: notesPiano[16],
  89: notesPiano[17],
  85: notesPiano[18],
  73: notesPiano[19],
  79: notesPiano[20],
  80: notesPiano[21],
  186: notesPiano[22],
  187: notesPiano[23],
  //Escala 3 OK 1234567890'¡
  65: notesPiano[24],
  83: notesPiano[25],
  68: notesPiano[26],
  70: notesPiano[27],
  71: notesPiano[28],
  72: notesPiano[29],
  74: notesPiano[30],
  75: notesPiano[31],
  76: notesPiano[32],
  192: notesPiano[33],
  222: notesPiano[34],
  191: notesPiano[35],
  // Escala 4
  16: notesPiano[36],
  226: notesPiano[37],
  90: notesPiano[38],
  88: notesPiano[39],
  67: notesPiano[40],
  86: notesPiano[41],
  66: notesPiano[42],
  78: notesPiano[43],
  77: notesPiano[44],
  188: notesPiano[45],
  190: notesPiano[46],
  189: notesPiano[47],


};
let textoDisponibles = [
  "C2,C2# D2b,D2,D2# E2b,E2,F2,F2# G2b,G2,G2# A2b,A2,A2# B2b,B2,C3,C3# D3b,D3,D3# E3b,E3,F3,F3# G3b,G3,G3# A3b,A3,A3# B3b,B3,C4,C4# D4b,D4,D4# E4b,E4,F4,F4# G4b,G4,G4# A4b,A4,A4# B4b,B4,C5,C5# D5b,D5,D5# E5b,E5,F5,F5# G5b,G5,G5# A5b,A5,A5# B5b,B5".split(
    ","
  ),
  "DO²,DO#² REb²,RE²,RE#² MIb²,MI²,FA²,FA#² SOLb²,SOL²,SOL#² LAb²,LA²,LA#² SIb²,SI²,DO³,DO#³ REb³,RE³,RE#³ MIb³,MI³,FA³,FA#³ SOLb³,SOL³,SOL#³ LAb³,LA³,LA#³ SIb³,SI³,DO⁴,DO#⁴ REb⁴,RE⁴,RE#⁴ MIb⁴,MI⁴,FA⁴,FA#⁴ SOLb⁴,SOL⁴,SOL#⁴ LAb⁴,LA⁴,LA#⁴ SIb⁴,SI⁴,DO⁵,DO#⁵ REb⁵,RE⁵,RE#⁵ MIb⁵,MI⁵,FA⁵,FA#⁵ SOLb⁵,SOL⁵,SOL#⁵ LAb⁵,LA⁵,LA#⁵ SIb⁵,SI⁵".split(
    ","
  ),
  teclado.split(""),
  Array(36).fill(""),
  "28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63".split(
    ","
  ),
];

let cancionImportada = null;
let letras = "";
let nameSong = null;

class Piano {
  constructor(
    tranportePieza,
    notaActual,
    disordedTitle,
    cancionImportada = null,
    titleSong = null,
    letras = ""
  ) {
    this.tranportePieza = tranportePieza;
    this.notaActual = notaActual;
    this.cancionImportada = cancionImportada;
    this.titleSong = titleSong;
    this.letras = letras;
    this.disordedTitle = disordedTitle;
  }

  getTitleSong() {
    return this.titleSong;
  }

  getTitleUpperCase() {
    return this.titleSong.toUpperCase();
  }

  setTitleSong(mTitleSong) {
    this.titleSong = this.muestraCancion(mTitleSong);
    this.disortMyTitle();
  }

  setTitle(mTitle) {
    this.titleSong = mTitle;
  }

  getLetters() {
    return this.letras;
  }

  getPartiture(songLetters, teclado, englishNote, checked) {
    let result = [];
    for (let i = 0; i < songLetters.length; i++) {
      if (isNaN(songLetters[i])) {
        // add trasported pieza new notes
        let index = teclado.indexOf(songLetters[i]);
        let mText = englishNote[index + this.tranportePieza].split(" ");
        if (mText.length > 1 && checked) {
          result.push(mText[1]);
        } else {
          result.push(mText[0]);
        }
      } else {
        const count = parseInt(songLetters[i]);
        const insideArray = songLetters.slice(i + 1, i + 1 + count);
        let tempList = [];
        for (let j = 0; j < insideArray.length; j++) {
          let index = teclado.indexOf(insideArray[j]);
          let mText = englishNote[index + this.tranportePieza].split(" ");
          if (mText.length > 1 && checked) {
            tempList.push(mText[1]);
          } else {
            tempList.push(mText[0]);
          }
        }
        result.push(tempList);
        i += count;
      }
    }
    return result;
  }

  updateLetra(letter) {
    this.letras = this.letras + letter;
  }

  resetLetters() {
    this.letras = "";
  }

  getImportSong() {
    return this.cancionImportada;
  }

  getDisordedTitle() {
    return this.disordedTitle;
  }

  getTransportPiece() {
    if (this.tranportePieza > 0) {
      return `+${this.tranportePieza}`;
    }
    return this.tranportePieza;
  }

  getActualNote() {
    return this.cancionImportada[this.notaActual];
  }

  addActualNote() {
    this.notaActual++;
  }

  setNewCesar(texto, teclado) {
    // Estructura del teclat
    let textoList = texto.split("");
    let total = "";
    for (let i = 0; i < textoList.length; i++) {
      //Cada tecla s'ha de moure el segons l'escala 'teclado'
      total += teclado[teclado.indexOf(textoList[i]) + this.tranportePieza];
    }
    return total;
  }

  isFourthFirstNotes() {
    return (
      player.notaActual > 4 ||
      player.notaActual == player.cancionImportada.length
    );
  }

  resetIfOut() {
    if (this.notaActual >= this.cancionImportada.length) {
      this.notaActual = 0;
    }
  }

  setCancionImportada(stringNotes, teclado, notesPiano) {
    this.cancionImportada = [];
    const notesArray = stringNotes.split("");
    for (let i = 0; i < notesArray.length; i++) {
      const letra = notesArray[i];

      if (isNaN(letra)) {
        // not number in string
        const letterIndex = teclado.indexOf(letra);
        this.cancionImportada.push(notesPiano[letterIndex].sound);
      } else {
        const count = parseInt(letra);
        // if 'count' is 2 get the two elements after ZZZ2ABCCC => ["A","B"]
        this.setChordCancionImportada(
          stringNotes,
          i,
          count,
          teclado,
          notesPiano
        );
        // skip elements pushed
        i += count;
      }
    }
  }

  setChordCancionImportada(stringNotes, i, count, teclado, notesPiano) {
    const insideArray = stringNotes.slice(i + 1, i + 1 + count);
    let tempList = [];
    for (let j = 0; j < insideArray.length; j++) {
      const letterIndex = teclado.indexOf(insideArray[j]);
      tempList.push(notesPiano[letterIndex].sound);
    }
    this.cancionImportada.push(tempList);
  }

  disortMyTitle() {
    const shuffle = (text) => {
      return text
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
        .toLowerCase();
    };
    // disoreder
    this.disordedTitle = shuffle(this.titleSong);
    if (this.disordedTitle === this.titleSong) {
      // if equals, disorder again
      this.disordedTitle = shuffle(this.titleSong);
    }
  }

  compareInputTitle(inputGuess) {
    return inputGuess.toLowerCase() === this.titleSong.toLowerCase();
  }

  avanzaPieza(notesPiano) {
    let maxNote = notesPiano[notesPiano.length - 1].sound;
    // if chord(array pass test 'includes'?????)
    if (!this.cancionImportada.includes(maxNote)) {
      for (let i = 0; i < this.cancionImportada.length; i++) {
        if (typeof this.cancionImportada[i] !== "object") {
          const index = notesPiano.findIndex(
            (note) => note.sound === this.cancionImportada[i]
          );
          this.cancionImportada[i] = notesPiano[index + 1].sound;
        } else {
          // if found and arrayObject is a chord
          for (let i = 0; i < array.length; i++) {
            const element = array[i];
          }
        }
      }
      this.tranportePieza++;
    }
    this.notaActual = 0;
  }

  resetPieza() {
    this.notaActual = 0;
    this.tranportePieza = 0;
  }

  retrocedePieza(notesPiano) {
    let maxNote = notesPiano[0].sound;
    if (!this.cancionImportada.includes(maxNote)) {
      for (let i = 0; i < this.cancionImportada.length; i++) {
        const index = notesPiano.findIndex(
          (note) => note.sound === this.cancionImportada[i]
        );
        this.cancionImportada[i] = notesPiano[index - 1].sound;
      }
      this.tranportePieza--;
    }
    this.notaActual = 0;
  }

  ocultaCancion(hideSong) {
    let nuevoTexto = "";
    //Si es true encripta el texto
    //Primero voltea el texto
    this.titleSong = hideSong.split("").reverse().join("").toLowerCase();
    for (let i in hideSong) {
      switch (this.titleSong[i]) {
        case "z":
          //Codigo ascci 'z' => '{'. para evitar pongo  '7'
          nuevoTexto += "7";
          break;
        case " ":
          nuevoTexto += "0";
          break;
        default:
          //Avanza una letra
          nuevoTexto += String.fromCharCode(this.titleSong[i].charCodeAt() + 1);
          break;
      }
    }
    return nuevoTexto;
  }

  muestraCancion(texto) {
    let nuevoTexto = "";
    texto = texto.split("").reverse().join("").toLowerCase();
    for (let i in texto) {
      //Se invierten los casos7
      switch (texto[i]) {
        case "7":
          //Codigo ascci 'z' => '{'. para evitar pongo  '7'
          nuevoTexto += "z";
          break;
        case "0":
          nuevoTexto += " ";
          break;
        default:
          //Retrocede una letra
          nuevoTexto += String.fromCharCode(texto[i].charCodeAt() - 1);
          break;
      }
    }
    return nuevoTexto;
  }
}
// http://192.168.1.133:5500/piano/?song=2HSSQRST2GSRQP2QFQOPQR2EQPONFMM2ODT2HS2OFPQ2eRQPO2EPONO&title=uh0mmbc0ophbse
//let borrador = "SQTQmSQUTSmQP2LS2JQ2MT2JQ2hm2LS2aJQ2NU2MT2LS2hm2JQ2IP";

// let myListBorrador = [];
/*
for (let i = 0; i < borrador.length; i++) {
  const element = borrador[i];
  if (isNaN(element)) {
    // not number in string
    myListBorrador.push(element);
  } else {
    const count = parseInt(element);
    // if 'count' is 2 get the two elements after ZZZ2ABCCC => ["A","B"]
    const insideArray = borrador.slice(i + 1, i + 1 + count).split("");
    myListBorrador.push(insideArray);
    // skip elements pushed
    i += count;
  }
}

console.log(myListBorrador);
*/
