class Memorize {
  constructor(speed) {
    this.playing = false;
    this.sequenceList = [];
    this.cont = 0;
    // miliseconds
    this.speed = speed;
  }

  isPlaying() {
    return this.playing;
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
    return ((this.cont + 1) * 100) / this.sequenceList.length;
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

const localMusic = [
  "https://www.zksama.com/piano/notes/40.mp3",
  "https://www.zksama.com/piano/notes/44.mp3",
  "https://www.zksama.com/piano/notes/47.mp3",
  "https://www.zksama.com/piano/notes/51.mp3",
  "https://www.zksama.com/piano/notes/28.mp3",
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

function fillButonImages(serie = 9) {
  const charactersList = getFourRandCharacters(serie);
  charactersList.forEach((e, i) => {
    btnList[i].style.backgroundImage = `url('${e.image}')`;
  });
}

function loadAssets() {
  fillButonImages();
  // add funcions to button
  for (let i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener("click", () => {
      // send 0,1,2,3 in sendBtn total: 4
      sendBtn(i);
    });
  }
  preloadAudio();
}

function playSequence() {
  if (!player.isPlaying()) {
    // inizialize new sequence
    player.addSequence();
    circleBtn.style.setProperty("--percentage", 0);
    circleBtn.innerText = "ATENTO";
    circleBtn.focus();
    circleBtn.disabled = true;
    player.resetCont();
    let mSequenceList = player.getSequenceList();
    // play sequence
    for (let i = 0; i < mSequenceList.length; i++) {
      setTimeout(() => {
        visualEffect(mSequenceList[i]);
      }, player.getDelay(i));
    }
    // after sequence, guess order
    setTimeout(() => {
      circleBtn.innerText = "TU TURNO";
      circleBtn.title = "Resuelto al 0%";
      circleBtn.focus();
      player.setPlaying(true);
      circleBtn.disabled = false;
    }, player.getLastDelay());
  }
}

function sendBtn(mValue) {
  if (!player.isPlaying()) {
    playAudio(mValue);
    return;
  }

  if (player.isPlaying()) {
    if (player.isCorrectSequence(mValue)) {
      circleBtn.style.setProperty("--percentage", player.getPercent());
      circleBtn.title = " Resuelto al " + player.getPercent() + "%";
      playAudio(mValue);
    } else {
      circleBtn.innerText = "OTRA VEZ";
      player.setPlaying(false);
      player.resetGame();
      playAudio(3); // fail
    }
    player.addCont();
    if (player.isLastSequence()) {
      circleBtn.innerText = "SEGUIR";
      circleBtn.style.backgroundColor = "rgb(84, 84, 84)";
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
  let audio = new Audio(localMusic[mValue]);
  audio.play();
}

function applyCssEffect(mDoc) {
  mDoc.style.backgroundBlendMode = "normal";
  mDoc.style.transform = "scale(1.1)";
  mDoc.style.boxShadow = "none";
}

function clearCssEffect(mDoc) {
  mDoc.style.backgroundBlendMode = "multiply";
  mDoc.style.transform = "";
  mDoc.style.boxShadow = "";
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeSpeed(event) {
  player.setSpeed(parseInt(event.target.value));
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
