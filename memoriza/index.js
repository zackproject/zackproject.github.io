class Memorize {
  constructor(speed = 1500) {
    this.playing = false;
    this.useButton = true;
    this.sequenceList = [];
    this.cont = 0;
    this.serie = 0;
    // miliseconds
    this.speed = speed;
    this.useMusic = true;
    this.colorPage = "#002618";
    this.blendColor = "multiply";
  }

  setLoadGame(speed, useMusic, colorPage, blendColor, serie) {
    this.playing = false;
    this.useButton = true;
    this.sequenceList = [];
    this.cont = 0;
    this.serie = serie;
    // miliseconds
    this.speed = speed;
    this.useMusic = useMusic;
    this.colorPage = colorPage;
    this.blendColor = blendColor;
  }

  getColorPage() {
    return this.colorPage;
  }

  setColorPage(value) {
    this.colorPage = value;
  }
  getBlendColor() {
    return this.blendColor;
  }

  setBlendColor(value) {
    this.blendColor = value;
  }

  getUseButton() {
    return this.useButton;
  }
  setUseButton(value) {
    this.useButton = value;
  }
  isPlaying() {
    return this.playing;
  }

  setMusic(value) {
    this.useMusic = value;
  }

  isMusic() {
    return this.useMusic;
  }
  setSerie(value) {
    this.serie = value;
  }

  addSequence() {
    if (!this.playing) {
      this.sequenceList.push(randInt(0, 3));
    }
    // 4 buttons avaliables: [0, 1, 2, 3]
  }
  getSpeed() {
    return this.speed;
  }
  getDelay(i) {
    // delay between animation
    return this.speed * i;
  }
  getLastDelay() {
    return this.sequenceList.length * this.speed;
  }

  getSequenceList() {
    return this.sequenceList;
  }

  setSpeed(mSpeed) {
    this.speed = mSpeed;
  }

  resetCont() {
    this.cont = 0;
  }

  resetGame() {
    this.resetCont();
    this.sequenceList = [];
  }

  addCont() {
    this.cont++;
  }
  setPlaying(val) {
    this.playing = val;
  }
  getPercent() {
    return (((this.cont + 1) * 100) / this.sequenceList.length).toFixed(2);
  }

  isLastSequence() {
    return this.cont == this.sequenceList.length;
  }
  isCorrectSequence(value) {
    return value == this.sequenceList[this.cont];
  }
}

const circleBtn = document.getElementById("infoBtn");
const btnList = document.getElementsByClassName("btn-game");
const infoText = document.getElementById("infoText");
const MEMORIZELOCAL = "memorize-game";

const localMusic = [
  "../piano/notes/40.mp3",
  "../piano/notes/44.mp3",
  "../piano/notes/47.mp3",
  "../piano/notes/51.mp3",
];

// 2000 Lento
// 1500 normal
// 1000 rapido
// 500 super rapido
// 200 hiperrapido

let player = new Memorize(1500);

function getFourRandCharacters(serie) {
  if (serie + 1 > quienEsQuien.length) {
    serie = quienEsQuien.length - 1;
    console.info("Oversized query, setting max default");
  }
  let listChar = quienEsQuien[serie].characters.sort(() => Math.random() - 0.5);
  return listChar.slice(0, 4);
}

function fillButonImages(serie = 0) {
  const charactersList = getFourRandCharacters(serie);
  charactersList.forEach((e, i) => {
    btnList[i].style.backgroundImage = `url('${e.image}')`;
  });
}

function changeBlendButtons(event) {
  for (let i = 0; i < btnList.length; i++) {
    btnList[i].style.backgroundBlendMode = event.target.value;
  }
  player.setBlendColor(event.target.value);
  localStorage.setItem(MEMORIZELOCAL, JSON.stringify(player));
}

function changeColorPage(event) {
  document.querySelector("body").style.backgroundColor = event.target.value;
  player.setColorPage(event.target.value);
  localStorage.setItem(MEMORIZELOCAL, JSON.stringify(player));
}

function changeSpeed(event) {
  player.setSpeed(parseInt(event.target.value));
  localStorage.setItem(MEMORIZELOCAL, JSON.stringify(player));
}

function changeMusic(event) {
  console.log(event.target.checked);
  player.setMusic(event.target.checked);
  localStorage.setItem(MEMORIZELOCAL, JSON.stringify(player));
}

function changeSerie(event) {
  fillButonImages(parseInt(event.target.value));
  player.setSerie(parseInt(event.target.value));
  localStorage.setItem(MEMORIZELOCAL, JSON.stringify(player));
}

function getLocalStorage() {
  if (localStorage.getItem(MEMORIZELOCAL) != null) {
    let loc = JSON.parse(localStorage.getItem(MEMORIZELOCAL));
    player.setLoadGame(
      loc.speed,
      loc.useMusic,
      loc.colorPage,
      loc.blendColor,
      loc.serie
    );
    for (let i = 0; i < btnList.length; i++) {
      // blend-color
      btnList[i].style.backgroundBlendMode = loc.blendColor;
    }
    // background-color
    document.querySelector("body").style.backgroundColor = loc.colorPage;
    document.getElementById("colorpg-select").value = loc.colorPage;
    document.getElementById("useSound").checked = loc.useMusic;
    document.getElementById("speed-selected").value = loc.speed;
    document.getElementById("blend-select").value = loc.blendColor;
    document.getElementById("serie-selected").value = loc.serie;
    fillButonImages(loc.serie);
  }
}

function loadAssets() {
  fillButonImages();
  getLocalStorage();
  // add funcions to button
  for (let i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener("click", () => {
      // send 0,1,2,3 in sendBtn total: 4
      sendBtn(i);
    });
  }

  const selectetorSerie = document.getElementById("serie-selected");
  for (let i = 0; i < quienEsQuien.length; i++) {
    selectetorSerie.appendChild(new Option(quienEsQuien[i].title, i));
  }
  preloadAudio();
}

function playSequence() {
  if (!player.isPlaying()) {
    // inizialize new sequence
    // circleBtn.disabled = true;
    if (player.getUseButton()) {
      player.addSequence();
      circleBtn.style.setProperty("--percentage", 0);
      circleBtn.innerText = "ATENTO";
      infoText.innerText = player.getSequenceList().length + "ª ronda";
      circleBtn.title = "Escucha la secuencia";
      circleBtn.focus();
      player.setUseButton(false);
      player.resetCont();
      let mSequenceList = player.getSequenceList();
      // play sequence
      for (let i = 0; i < mSequenceList.length; i++) {
        setTimeout(() => {
          visualEffect(mSequenceList[i]);
          console.log(player);
        }, player.getDelay(i));
      }
      // after sequence, guess order
      setTimeout(() => {
        circleBtn.innerText = "TU TURNO";
        circleBtn.title = "Resuelto al 0%";
        circleBtn.focus();
        player.setPlaying(true);
        player.setUseButton(true);
      }, player.getLastDelay());
    }
  }
}

function sendBtn(mValue) {
  if (!player.isPlaying()) {
    if (player.getUseButton()) {
      playAudio(mValue);
    }
    return;
  }

  if (player.isPlaying()) {
    if (player.isCorrectSequence(mValue)) {
      circleBtn.style.setProperty("--percentage", player.getPercent());
      circleBtn.title = " Resuelto al " + player.getPercent() + "%";
      playAudio(mValue);
    } else {
      circleBtn.innerText = "❌\n OTRA VEZ";
      circleBtn.title = "Fallaste, vuelve a intentar";
      circleBtn.focus();
      player.setPlaying(false);
      player.resetGame();
    }
    player.addCont();
    if (player.isLastSequence()) {
      circleBtn.innerText = "SEGUIR";
      circleBtn.title = "Resuelto al 100%, continuar";
      circleBtn.style.backgroundColor = "rgb(84, 84, 84)";
      circleBtn.focus();
      player.setPlaying(false);
    }
  }
}

function visualEffect(mValue) {
  applyCssEffect(btnList[mValue]);
  playAudio(mValue);
  setTimeout(() => {
    clearCssEffect(btnList[mValue]);
  }, player.getSpeed() / 2);
}

function playAudio(mValue) {
  if (player.isMusic()) {
    let audio = new Audio(localMusic[mValue]);
    audio.play();
  }
}

function applyCssEffect(mDoc) {
  mDoc.style.backgroundBlendMode = "normal";
  mDoc.style.transform = "scale(1.1)";
  mDoc.style.boxShadow = "none";
}

function clearCssEffect(mDoc) {
  mDoc.style.backgroundBlendMode = player.getBlendColor();
  mDoc.style.transform = "";
  mDoc.style.boxShadow = "";
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Preload audio https://stackoverflow.com/a/13116795
function preloadAudio() {
  for (var x = 0; x < localMusic.length; x++) {
    let aud = new Audio(localMusic[x]);
    aud.preload = "auto";
  }
}

function showModal() {
  document.getElementById("modal-simon").showModal();
}
function closeModal() {
  document.getElementById("modal-simon").close();
}
