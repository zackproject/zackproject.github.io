




// elige una cancion  de una lista desordenada+
//Desordena
const intervalID = null;

let btnGuessAnime = document.getElementById("btn-play-anime");
let animeSolution = document.getElementById("anime-solution");
let countDownHTML = document.getElementById("countdown");
let copyAnimation = document.getElementById("copy-animation");
let progressbar = document.getElementById("progress-song");
let imgAnime = document.getElementById("img-anime");
let authorAnime = document.getElementById("author-anime");
let URLPATHSONG = "https://github.com/zackproject/static-api/raw/master/cc-covers-anime-song/";
class AnimeSong {
    constructor(iSong, playlist, status, timeWait, timeResolve, pathSong) {
        this.pathSong = pathSong;
        this.iSong = iSong;
        this.playlist = playlist.sort(() => Math.random() - 0.5);
        this.song = new Audio(this.pathSong + playlist[iSong].fragment);
        this.songOBJ = playlist[iSong];
        this.timeWait = timeWait;
        this.status = status;
        this.timeResolve = timeResolve;
        this.isPlaying = false;
    }

    disorderList() {
        this.playlist = this.playlist.sort(() => Math.random() - 0.5);
    }

    percentSong() {
        return this.song.currentTime / this.song.duration * 100
    }

    nextSong() {
        if (this.iSong < this.playlist.length) {
            this.iSong++;
        } else {
            this.iSong = 0;
            this.disorderList();
        }
        this.songOBJ = this.playlist[this.iSong]; // mira si puedo utilizarlo en this.song despues
        this.song = new Audio(this.pathSong + this.playlist[this.iSong].fragment);
        this.status = 0;
        this.preloadSong();
    }

    preloadSong() {
        if (this.iSong + 1 < this.playlist.length) {
            let aud = new Audio(this.playlist[this.iSong + 1].fragment)
            aud.preload = 'auto';
            return;
        }
        let aud = new Audio(this.playlist[0].fragment)
        aud.preload = 'auto';
    }
}
let player = new AnimeSong(0, playlist, 0, 5, 15, URLPATHSONG);

fillSolution(player.songOBJ);

function fillSolution({ title, fragment, song, author }) {
    document.getElementById("title-anime").innerText = title;
    imgAnime.src = `http://i3.ytimg.com/vi/${song.split("/").pop()}/hqdefault.jpg`
    imgAnime.alt = `Miniatura del video de YouTube ${title} del autor ${author}`
    authorAnime.innerText = "Canción de " + author;
    authorAnime.href = song;
}
function pressBtn() {
    //En la primera carrega precarrega el seguent audio
    copyAnimation.style.animationName = "muevete";
    btnGuessAnime.style.animation = "";
    copyAnimation.style.backgroundColor = "green";
    if (player.status == 0) {
        player.preloadSong();
    }
    if (!player.song.paused) {
        player.song.pause();
        player.song.currentTime = 0;
        btnGuessAnime.innerText = "play_arrow";
        btnGuessAnime.disabled = true;
        playAnimation(0);
        callSolution();
    } else {
        //Prevent ddos clicked
        if (!player.isPlaying) {
            setTimeout(() => {
                if (player.status < 3) player.status++;
                player.song.currentTime = 0;
                playSong();
                fillSolution(player.songOBJ);
                animeSolution.style.display = "none";

                timeOut(player.status);
                playAnimation(1);
                btnGuessAnime.innerText = "touch_app";
                copyAnimation.style.backgroundColor = "red";
                btnGuessAnime.style.backgroundColor = "red"
                btnGuessAnime.title = "Adivinar";
                player.isPlaying = false;
            }, 3000);
        }
        player.isPlaying = true;

    }
}

function callSolution() {
    countDownHTML.innerText = player.timeResolve;
    btnGuessAnime.style.display = "none";
    copyAnimation.style.animationName = "";
    countDownHTML.style.animation = "tracking-in-expand-forward-top 1s linear infinite";

    let countTime = player.timeResolve;
    const intervalID = setInterval(() => {
        if (countTime > 0) {
            countTime--;
            countDownHTML.innerText = countTime;
        } else {
            clearInterval(intervalID);
            countDownHTML.style.animation = "";
            resetSong();
        }
    }, 1000);
}
function resetSong() {
    player.nextSong()
    countDownHTML.innerText = "";
    animeSolution.style.display = "flex";
    btnGuessAnime.disabled = false;
    btnGuessAnime.style.backgroundColor = "green";
    btnGuessAnime.innerText = "play_arrow";
    btnGuessAnime.style.display = "block";
}
function playSong() {
    //Primera vez interval 5 segundos, segunda vez, interval 10, tercera vez sin interval
    const intervalID = setInterval(() => {
        progressbar.style.width = player.percentSong() + "%";
    }, 500);

    player.song.play();
}

function timeOut(number) {
    // Si el temps es complet, retorna tot el temps en milisegons
    let time = (number === 3) ? player.song.duration * 1000 : number * 5000;
    console.log("tiempo", time);
    setTimeout(function () {
        player.song.pause();
        // Si pulsan el boton mientras esta el repetir, cuenta atras para decir el titulo
        // sino aparece solo
        copyAnimation.style.animationName = "";
        btnGuessAnime.style.animation = "gira 1s";
        btnGuessAnime.innerText = "replay";
        btnGuessAnime.style.backgroundColor = "green"
        btnGuessAnime.title = "Repetir";
        playAnimation(0);
    }, time);

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
});*/
//document.getElementById("total").innerText = total;


function playAnimation(status) {
    //Carrega la animacio per cada barra i li posa un delay a cadascun
    let barresMusicals = document.getElementsByClassName("melody");
    for (let i = 0; i < barresMusicals.length; i++) {
        if (status == 1) {
            barresMusicals[i].style.animation = "musicamaestro 1s infinite";
            barresMusicals[i].style.animationDelay = i * 0.2 + "s";
        } else {
            barresMusicals[i].style.animationPlayState = "paused";
        }
        console.log(barresMusicals[i].style.animationPlayState);
    }
}
