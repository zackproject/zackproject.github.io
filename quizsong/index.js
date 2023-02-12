
//let sonidos = "do re mi fa sol la si d0"
let notaActual = 0;
//El numero de cancion de la lisra
let numCancion = 3;
let songOBJ = music[numCancion];

function onLoadPage() {
    createButtons();
}

//Devuelve tantos espacios como nota. En el futuro tendra que ser 'div' vacios y blancos
function getSpaces() {
    let texto = [];
    for (let i = 0; i < songOBJ.title.length; i++) {
        texto.push(" _ ")
    }
    return texto;
}
//Elige un audio de la lista y toca una nota en cada click
function suena() {
    let song = songOBJ.notas.split(" ");
    var audio = new Audio('audios/' + song[notaActual] + '.mp3');
    audio.play();
    refreshView();
    notaActual++;
    if (song.length == notaActual) notaActual = 0;
}

//Cambia l texto visible en el html
function refreshView() {
    document.getElementById("a").innerText = getSpaces();
    document.getElementById("nota-actual").innerText = `[${notaActual + 1} , ${songOBJ.notas.length}] : ${songOBJ.notas[notaActual]}`
}

//Disorder the word randoom
function disorderWord(word) {
    return word.split('').sort(function () { return 0.5 - Math.random() }).join('').toLowerCase();
}

//Al cargar la cancion lo muestra y empieza de cero
function inicioCancion() {
    notaActual = 0;
    refreshView();

}
//Crea tantos botones como letras existan en el titulo (contando espacios)
function createButtons() {
    let father = document.getElementById("btn-letras");
    deleteChilds(father);

    let btnList = disorderWord(songOBJ.title).toUpperCase().split("");
    btnList.forEach(element => {
        let btn = document.createElement("button");
        btn.innerText = element;
        btn.value = element;

        if (element == " ") {
            btn.innerText = "[espacio]";
        }
        father.appendChild(btn);
    });
}


function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}