function showProject() {
  const hideProject = document.getElementsByClassName("hide-project");
  for (let i = 0; i < hideProject.length; i++) {
    const element = hideProject[i];
    element.style.display = "flex";
  }

  document.getElementById("btn-hide-project").style.display = "none";
}

function loadPage() {
  const skills = document
    .getElementsByClassName("skills")[0]
    .getElementsByTagName("img");

  for (let i = 0; i < skills.length; i++) {
    const element = skills[i];

    element.style.animation = `disapear 3s infinite`;
    element.style.animationDelay = i / 10 + "s";
  }

  preloadAudio(songList.map((obj) => NOTESONLINE + songList[obj] + ".mp3"));
}

// piano imported
const NOTESONLINE = "../piano/notes/";

let note = 0;
const songList = [
  56, 51, 52, 54, 52, 51, 49, 49, 52, 56, 54, 52, 51, 52, 54, 56, 52, 49, 49,
  54, 57, 61, 59, 57, 56, 52, 56, 54, 52, 51, 51, 52, 54, 56, 52, 49, 49,
];
function easterEgg() {
  //Si la nota es fora del teclat, reseteja
  if (note >= songList.length) note = 0;

  let linkSong = NOTESONLINE + songList[note] + ".mp3";
  var audio = new Audio(linkSong);
  audio.play();

  note++;
}

function preloadAudio(preloads) {
  for (var x = 0; x < preloads.length; x++) {
    let aud = new Audio(preloads[x]);
    //console.log("Cached", aud);
    aud.preload = "auto";
  }
}
