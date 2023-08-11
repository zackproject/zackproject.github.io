




// elige una cancion  de una lista desordenada+
let iSong = 26;
let songOBJ = playlist[iSong];
let song = new Audio(songOBJ.fragment);
let btnGuessAnime = document.getElementById("btn-play-anime");
let animeSolution = document.getElementById("anime-solution");

let progressbar = document.getElementById("progress-song");
const intervalID = null;
let timeToResolve = 10;
let number = 0; //0, 1,2,3 // 3 all-audio
fillSolution(songOBJ);
function fillSolution({ title, fragment, song, author }) {
    document.getElementById("title-anime").innerText = title;
    let imgAnime = document.getElementById("img-anime");
    imgAnime.src = `http://i3.ytimg.com/vi/${song.split("/").pop()}/hqdefault.jpg`
    imgAnime.alt = `Miniatura del video de YouTube ${title} del autor ${author}`
    let authorAnime = document.getElementById("author-anime");
    authorAnime.innerText = "Canción de " + author;
    authorAnime.href = song;
}
function pressBtn() {
    if (!song.paused) {
        song.pause();
        song.currentTime = 0;
        btnGuessAnime.innerText = "electric_bolt";
        btnGuessAnime.disabled = true;
        callSolution();
        return;
    } else {
        if (number < 3) number++;
        song.currentTime = 0;
        btnGuessAnime.stu
        playSong();
        fillSolution(songOBJ);
        animeSolution.style.display = "none";
        if (number != 3) {
            timeOut(number);
        }
        btnGuessAnime.innerText = "touch_app";
        btnGuessAnime.style.backgroundColor = "red"
        btnGuessAnime.title = "Adivinar";
    }
}

function callSolution() {
    let time = timeToResolve;
    let countDownHTML = document.getElementById("countdown");
    countDownHTML.innerText = time;
    const intervalID = setInterval(() => {
        if (time > 0) {
            time--;
            console.log("tiempo", time);
            countDownHTML.innerText = time;

        } else {
            clearInterval(intervalID);
            countDownHTML.innerText = "";
            animeSolution.style.display = "flex";
            btnGuessAnime.disabled = false;
            btnGuessAnime.innerText = "play_arrow";
            btnGuessAnime.style.backgroundColor = "green"
            iSong++;
            number = 0;
            songOBJ = playlist[iSong];
            song = new Audio(songOBJ.fragment);
        }
        console.log();
    }, 1000);
}
function playSong() {
    //Primera vez interval 5 segundos, segunda vez, interval 10, tercera vez sin interval
    const intervalID = setInterval(() => {
        let calcul = song.currentTime / song.duration * 100;
        progressbar.style.width = calcul + "%";
    }, 500);
    song.play();
}

function timeOut(number) {
    setTimeout(function () {
        clearInterval(intervalID);
        song.pause();
        // Si pulsan el boton mientras esta el repetir, cuenta atras para decir el titulo
        // sino aparece solo
        btnGuessAnime.innerText = "replay";
        btnGuessAnime.style.backgroundColor = "green"
        btnGuessAnime.title = "Repetir";

    }, number * 5000);

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
/*let pare = document.getElementById("container");
let llista = playlist.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
let total = 0;
llista.forEach((element) => {
    if (element.title != "") {
        pare.innerHTML += template(element);
        total++;
    }
});
document.getElementById("total").innerText = total;*/