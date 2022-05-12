
var poke1;
var poke2;
var score = 0;
var maxScore = 0;

function loadTwoPokes() {
    //Sellect two random pokes
    poke1 = data[randNumber(898, 1)];
    poke2 = data[randNumber(898, 1)];
    printPokeHTML();
}

function twiceNewPoke() {
    //Copy the first poke in the left and new random to right
    poke1 = poke2;
    poke2 = data[randNumber(898, 1)];
    printPokeHTML();
}

function printPokeHTML() {
    // First poke
    document.getElementById('pk1name').textContent = poke1.name;
    document.getElementById('pk1image').src = poke1.img_default;
    document.getElementById('pk1number').textContent = poke1.speed;
    document.getElementsByClassName('pktpye')[0].textContent = 'speed';
    //second poke
    document.getElementById('pk2name').textContent = poke2.name;
    document.getElementById('pk2image').src = poke2.img_default;
    // document.getElementById('pk2number').textContent = poke2.speed; THIS NUMBER IS SECRET
    document.getElementsByClassName('pktpye')[1].textContent = 'speed';
}

function btnLow() {
    if (poke1.speed < poke2.speed) {
        score++;
    } else {
        score = 0;
        alert(`WRONG!!!\n${poke1.name} : ${poke1.speed}\n${poke2.name} : ${poke2.speed}\n`)
    }

    //Refresh the score in the html and max score
    refreshScore();
    twiceNewPoke();
}

function btnHigh() {
    if (poke1.speed > poke2.speed) {
        score++;
    } else {
        score = 0;
        alert(`WRONG!!!\n${poke1.name} : ${poke1.speed}\n${poke2.name} : ${poke2.speed}\n`)
    }
    refreshScore();
    twiceNewPoke();
}

//Refresh the score in the html and max score
function refreshScore() {
    if (score > maxScore) maxScore = score;
    document.getElementById('pokescore').textContent = "Score: " + score + " MaxScore: " + maxScore;

}

function randNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}