
var poke1;
var poke2;
var score = 0;
var maxScore = 0;
var type = 'speed';
var gen = '1';

function changeGenOrType() {
    let typeHtml = document.getElementById('typeViewList').selectedOptions[0].value;
    let genHtml = document.getElementById('genViewList').selectedOptions[0].value;
    type = typeHtml;
    gen = parseInt(genHtml);
    score = 0;
    maxScore = 0;
    refreshScore();
    loadTwoPokes();
}


function loadTwoPokes() {
    //An array of 2 position can be asigned on two variables
    let listGen = genMaxMin(gen);
    let min = listGen[0];
    let max = listGen[1];
    //Sellect two random pokes
    poke1 = data[randNumber(max, min)];
    poke2 = data[randNumber(max, min)];
    printPokeHTML();
}

function twiceNewPoke() {
    //An array of 2 position can be asigned on two variables
    let listGen = genMaxMin(gen);
    let min = listGen[0];
    let max = listGen[1];
    //Copy the first poke in the left and new random to right
    poke1 = poke2;
    poke2 = data[randNumber(max, min)];
    printPokeHTML();
}

//retun max min for generation in dex number
function genMaxMin(genl) {
    //return de range of number pokedex for each generation
    switch (genl) {
        case 1:
            return [1, 151]; //gen1
        case 2:
            return [152, 251]; //gen2
        case 3:
            return [252, 386]; //gen3
        case 4:
            return [387, 493]; //gen4
        case 5:
            return [494, 649]; //gen5
        case 6:
            return [650, 721]; //gen6
        case 7:
            return [722, 809]; //gen7
        case 8:
            return [810, 898]; //gen8
        default:
            return [1, 898]; //all gens gen=0 or other
    }

}
function printPokeHTML() {
    // First poke
    document.getElementById('pk1name').textContent = poke1.name;
    document.getElementById('pk1image').src = poke1.img_default;
    document.getElementById('pk1number').textContent = poke1[type]; //Ex: type['speed'] =  156
    document.getElementsByClassName('pktpye')[0].textContent = type; //Ex: type = 'speed'
    //second poke
    document.getElementById('pk2name').textContent = poke2.name;
    document.getElementById('pk2image').src = poke2.img_default;
    document.getElementsByClassName('pktpye')[1].textContent = type;
    // document.getElementById('pk2number').textContent = poke2[type]; THIS NUMBER IS SECRET
}

function btnLow() {
    if (poke1[type] <= poke2[type]) {
        score++;
    } else {
        score = 0;
        document.getElementById("textmodal").innerHTML =`<p>INCORRECT</p><p>${poke1.name} ${type}: ${poke1[type]}  </p> <p>${poke2.name} ${type}: ${poke2[type]}</p>`
        openModal();
    }
    //Refresh the score in the html and max score
    refreshScore();
    twiceNewPoke();
}

function btnHigh() {
    if (poke1[type] >= poke2[type]) {
        score++;
    } else {
        score = 0;
        document.getElementById("textmodal").innerHTML =`<p>INCORRECT</p><p>${poke1.name} ${type}: ${poke1[type]}  </p> <p>${poke2.name} ${type}: ${poke2[type]}</p>`
        openModal();
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


function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
