class Memorize {
  constructor(speed) {
    this.sequenceList = [];
    this.cont = 0;
    // miliseconds
    this.speed = speed;
  }

  addSequence() {
    // 4 buttons avaliables: [0, 1, 2, 3]
    this.sequenceList.push(randInt(0, 3));
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

// 2000 Lento
// 1500 normal
// 1000 rapido
// 500 super rapido
// 200 hiperrapido

let player = new Memorize(1500);

circleBtn.innerText = "INICIAR";

function loadAssets() {
  console.log("Load Page");
  // add funcions to button
  for (let i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener("click", () => {
      // send 0,1,2,3 in sendBtn
      sendBtn(i);
    });
  }
}

function playSequence() {
  // inizialize new sequence
  player.addSequence();
  circleBtn.style.setProperty("--percentage", 0);
  circleBtn.innerText = "ATENTO";
  circleBtn.disabled = true;
  useButtons(true);
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
    useButtons(false);
    circleBtn.innerText = "TU TURNO";
  }, player.getLastDelay());
}

function useButtons(isEnabled) {
  for (let i = 0; i < btnList.length; i++) {
    btnList[i].disabled = isEnabled;
  }
}

function sendBtn(mValue) {
  if (player.isCorrectSequence(mValue)) {
    circleBtn.style.setProperty("--percentage", player.getPercent());
  } else {
    circleBtn.innerText = "OTRA VEZ";
    circleBtn.disabled = false;
    player.resetGame();
  }
  player.addCont();
  if (player.isLastSequence()) {
    circleBtn.innerText = "SEGUIR";
    circleBtn.style.backgroundColor = "rgb(84, 84, 84)";
    circleBtn.disabled = false;
  }
}

function visualEffect(mValue) {
  applyCssEffect(btnList[mValue]);
  setTimeout(() => {
    clearCssEffect(btnList[mValue]);
  }, player.getSpeed() / 2);
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
