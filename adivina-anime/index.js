




// elige una cancion  de una lista desordenada
let song = new Audio(playlist[0].fragment);
// no timeout, reveal name, repeat
let btnGuessAnime = document.getElementById("btn-play-anime");
let progressbar = document.getElementById("progress-song");
const intervalID = null;
function pressBtn() {
    if (!song.paused) {
        console.log("Tienes 20 segundos para adivinar");
        song.pause();
        return;
    } else {
        playSong();
        btnGuessAnime.innerText = "back_hand";
        btnGuessAnime.title ="Adivinar";
    }




}

function playSong() {
    //Primera vez interval 5 segundos, segunda vez, interval 10, tercera vez sin interval
    const intervalID = setInterval(() => {
        let calcul = song.currentTime / song.duration * 100;
        progressbar.style.width = calcul + "%";
    }, 500);

    song.play();
    setTimeout(function () {
        clearInterval(intervalID);
        song.pause();
        song.currentTime = 0;
        // Si pulsan el boton mientras esta el repetir, cuenta atras para decir el titulo
        // sino aparece solo
        btnGuessAnime.innerText = "replay";
        btnGuessAnime.title ="Repetir";

    }, 5000);


}


function template(props) {
    // console.log(props.title, props.song, props.author, "AAAAAA");
    return `<div class="card">
                <h1>${props.title}</h1>
                <h2><a href="${props.song}">${props.author}</a></h2>
                <img  height="200" src="http://i3.ytimg.com/vi/${props.song.split("/").pop()}/hqdefault.jpg" alt="Youtube link of song ${props.title}">
   
            </div>`
    /*             <audio controls>
            <source src="${props.fragment}" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio> */
}
let pare = document.getElementById("container");
let llista = playlist.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
let total = 0;
llista.forEach((element) => {
    if (element.title != "") {
        pare.innerHTML += template(element);
        total++;
    }
});
document.getElementById("total").innerText = total;