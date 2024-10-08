const speed = 2000;
const btn = document.getElementById("infoBtn");
const btnList = document.getElementsByClassName("btn-game");
const infoBtn = document.getElementById("infoBtn");
let cont = 0;
let responseList = [];
btn.innerText = "INICIAR";
// add funcions to button
for (let i = 0; i < btnList.length; i++) {
  btnList[i].addEventListener("click", () => {
    // send 0,1,2,3 in sendBtn
    sendBtn(i);
  });
}

function loadAssets() {
  console.log("Load Page");
}

function playSequence() {
  infoBtn.style.setProperty("--percentage", 0);
  responseList.push(randInt(0, 3));
  btn.innerText = "ATENTO";
  btn.style.backgroundColor = "rgb(29, 29, 29)";
  btn.disabled = true;
  useButtons(true);
  cont = 0;
  for (let i = 0; i < responseList.length; i++) {
    setTimeout(() => {
      visualEffect(responseList[i]);
    }, i * speed);
  }
  setTimeout(() => {
    useButtons(false);
    btn.innerText = "TU TURNO";
  }, responseList.length * speed);
}

function useButtons(isEnabled) {
  for (let i = 0; i < btnList.length; i++) {
    btnList[i].disabled = isEnabled;
  }
}

function sendBtn(value) {
  if (value == responseList[cont]) {
    infoBtn.style.setProperty(
      "--percentage",
      ((cont + 1) * 100) / responseList.length
    );
  } else {
    btn.innerText = "OTRA VEZ";
    btn.disabled = false;
    responseList = [];
    cont = 0;
  }
  cont++;
  if (cont === responseList.length) {
    btn.innerText = "SEGUIR";
    btn.style.backgroundColor = "rgb(84, 84, 84)";
    btn.disabled = false;
  }
}

function visualEffect(value) {
  applyCssEffect(btnList[value]);
  setTimeout(() => {
    clearCssEffect(btnList[value]);
  }, 1000);
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
