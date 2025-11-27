function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function disortArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let allOptions = [];
let lengthTable = 25; // 5 * 5
let maxPieces = 8;
let maxWater = 7;
const BLUE = "b";
const RED = "r";
const WATER = "w";
const DEAD = "d";
let startPlayer = randInt(0, 1);

for (let i = 0; i < maxPieces; i++) {
  allOptions.push(BLUE);
  allOptions.push(RED);
}
if (startPlayer === 0) {
  // blue extra
  allOptions.push(BLUE);
}
if (startPlayer === 1) {
  // red extra
  allOptions.push(RED);
}
for (let i = 0; i < maxWater; i++) {
  allOptions.push(WATER);
}
allOptions.push(DEAD); // dead

allOptions = disortArray(allOptions);
let tds = document.getElementsByClassName("panel-item");
Array.from(tds).forEach((td, index) => {
  switch (allOptions[index]) {
    case BLUE:
      td.innerText = "🔷";
      td.style.backgroundColor = "#008ee7";
      break;
    case RED:
      td.innerText = "🔴";
      td.style.backgroundColor = "#f81821";
      break;
    case WATER:
      td.style.backgroundColor = "lightyellow";
      break;
    case DEAD:
      td.innerText = "💀";

      td.style.backgroundColor = "#454545";
      break;
  }
});
for (let i = 0; i < document.getElementsByClassName("guide").length; i++) {
  let mGuide = document.getElementsByClassName("guide")[i];
  if (startPlayer === 0) {
    mGuide.style.borderColor = "blue";
    mGuide.style.backgroundColor = "lightblue";
  } else {
    mGuide.style.borderColor = "red";
    mGuide.style.backgroundColor = "lightcoral";
  }
}
