
//let sonidos = "do re mi fa sol la si d0"
let notaActual = 0;
var music = [
    {
        "title": "Evangelion",
        "notas": "do re_ fa re_ fa fa fa la_ sol_ sol fa sol sol la_ _do fa re_ la_ la_ sol la_ la_ _do"
    },
    {
        "title": "Boku No Pico",
        "notas": "re sol fa_ fa_ mi fa_ sol mi la sol fa_ fa_ sol la re sol fa_ fa_ mi fa_ sol la mi fa_ fa_ sol la"
    }

];

let song = music[1].notas.split(" ");

function suena() {
    var audio = new Audio('audios/' + song[notaActual] + '.mp3');
    audio.play();
    refreshView();
    notaActual++;
    if (song.length == notaActual) notaActual = 0;
}


function refreshView() {
    document.getElementById("nota-actual").innerText = `[${notaActual + 1} , ${song.length}] : ${song[notaActual]}`
}


function inicioCancion() {
    notaActual = 0;
    refreshView();
}