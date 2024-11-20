function showProject() {
  const hideProject = document.getElementsByClassName("hide-project");
  for (let i = 0; i < hideProject.length; i++) {
    const element = hideProject[i];
    element.style.display = "flex";
  }

  document.getElementById("btn-hide-project").style.display = "none";
}

const songList = [
  "notes/56.mp3",
  "notes/51.mp3",
  "notes/52.mp3",
  "notes/54.mp3",
  "notes/52.mp3",
  "notes/51.mp3",
  "notes/49.mp3",
  "notes/49.mp3",
  "notes/52.mp3",
  "notes/56.mp3",
  "notes/54.mp3",
  "notes/52.mp3",
  "notes/51.mp3",
  "notes/52.mp3",
  "notes/54.mp3",
  "notes/56.mp3",
  "notes/52.mp3",
  "notes/49.mp3",
  "notes/49.mp3",
  "notes/54.mp3",
  "notes/57.mp3",
  "notes/61.mp3",
  "notes/59.mp3",
  "notes/57.mp3",
  "notes/56.mp3",
  "notes/52.mp3",
  "notes/56.mp3",
  "notes/54.mp3",
  "notes/52.mp3",
  "notes/51.mp3",
  "notes/51.mp3",
  "notes/52.mp3",
  "notes/54.mp3",
  "notes/56.mp3",
  "notes/52.mp3",
  "notes/49.mp3",
  "notes/49.mp3",
];
const NOTESONLINE = "../piano/";

function loadPage() {
  const skills = document
    .getElementsByClassName("skills")[0]
    .getElementsByTagName("img");

  for (let i = 0; i < skills.length; i++) {
    const element = skills[i];

    element.style.animation = `disapear 3s infinite`;
    element.style.animationDelay = i / 10 + "s";
  }

  preloadAudio(songList);
}

// piano imported

let note = 0;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const tetrisPiece = document.getElementById("piece-tetris");
function easterEgg() {
  //Si la nota es fora del teclat, reseteja
  if (note >= songList.length) note = 0;
  tetrisPiece.style.right = `${randInt(0, 80)}%`;
  tetrisPiece.className = `piece${randInt(1, 7)}`;

  let linkSong = NOTESONLINE + songList[note];
  var audio = new Audio(linkSong);
  audio.play();

  note++;
}

function preloadAudio(preloads) {
  for (var x = 0; x < preloads.length; x++) {
    let aud = new Audio(NOTESONLINE + preloads[x]);    
    aud.preload = "auto";
  }
}
