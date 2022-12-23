
var poke1;
var poke2;
var score = 0;
var maxScore = 0;
var type = 'speed';
var gen = 0;
//La llista sera del localStorage, si no existeix la crea
var generationList = getScoreListFromLocalStorage();


//Crea la taula score
function generateTableScore() {
    let father = document.getElementById("score-table");
    if (gen == 0) {
        father.innerText = "All Generations";
    } else {
        father.innerText = gen + " Generation";
    }
    let table = document.createElement("table");
    let tr = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.innerText = "Type";
    let th2 = document.createElement("th");
    th2.innerText = "Score";
    tr.appendChild(th1);
    tr.appendChild(th2);
    table.appendChild(tr);

    let typeList = ["Hp", "Attack", "Defense", "Special Attack", "Special Defense", "Speed", "Total"];
    // 0-allGeneration , 1-gen, 2-gen, 3-gen ...
    let scoreForGen = generationList[gen];
    for (let i = 0; i < scoreForGen.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = typeList[i];
        let td2 = document.createElement("td");
        td2.innerText = scoreForGen[i];
        tr.appendChild(td1)
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    //Afegeix tot al pare
    father.appendChild(table);
}
function addToLocalStorage(generationList) {
    let text = "";
    //Cada valor queda separat per comes, al ser array
    generationList.forEach(element => {
        //Cada array de score el separem per espai
        text += element.toString() + " ";
    });
    localStorage.setItem("pokescore", text);
}

function getScoreListFromLocalStorage() {
    //Reinicia el generationList variable
    allGenList = [];
    if (localStorage.getItem("pokescore") == null) {
        // hp, attack, defense, sp_attack, sp_defense, speed, total
        let scoreList = [0, 0, 0, 0, 0, 0, 0];
        // Un scorelist per cada generacio
        let genList = [scoreList, scoreList, scoreList, scoreList, scoreList, scoreList, scoreList, scoreList, scoreList];
        //Afegeix al localstorage el creat
        addToLocalStorage(genList);
        return genList;
    } else {
        let textList = localStorage.getItem("pokescore");
        // El primer 'split()' aconseguix totes les generationList en text
        let genListOfList = textList.split(" ");
        genListOfList.forEach(element => {
            //El scoreList es una array separat per comes
            let scoreList = element.split(",");
            // Cada array que trobi la fica al ScoreList
            allGenList.push(scoreList);
        });

        //Hi ha un element que s'escapa llavors l'esborrem
        allGenList.pop();
        return allGenList;
    }

}
function changeGenOrType() {
    let typeHtml = document.getElementById('typeViewList').selectedOptions[0].value;
    let genHtml = document.getElementById('genViewList').selectedOptions[0].value;
    type = typeHtml;
    gen = parseInt(genHtml);
    // Cada vegada que canvia les opcions, actualitza el score i max score
    score = 0;
    //max score sera el valor guardar el localStorage per gen i tipus(speed)
    maxScore = getMaxScoreLocalStorage(type, gen);
    document.getElementById('score-number').textContent = score;
    document.getElementById('max-score-number').textContent = maxScore;

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
    //Genera la taula nomes comenzar
    generateTableScore()
    //Al carregar Score el primer cop, carrega el record del gen y tipus (speed)
    maxScore = getMaxScoreLocalStorage(type, gen);
    document.getElementById('max-score-number').textContent = maxScore;
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
    refreshScore();
}

//Segons el tipus i la generacio retorna un record en concret
function getMaxScoreLocalStorage(type, gen) {
    switch (type) {
        case "hp":
            //Exemple list[Gen-1][Hp] = 12 maxscore
            maxScore = generationList[gen][0];
            break;
        case "attack":
            //Exemple [Gen-4][Attack] = 13 maxScore
            maxScore = generationList[gen][1];
            break;
        case "defense":
            maxScore = generationList[gen][2];
            break;
        case "special_attack":
            maxScore = generationList[gen][3];
            break;
        case "special_defense":
            maxScore = generationList[gen][4];
            break;
        case "speed":
            maxScore = generationList[gen][5];
            break;
        case "best":
            maxScore = generationList[gen][6];
            break;
        default:
            break;
    }
    return maxScore;

}
function btnLow() {
    if (poke1[type] <= poke2[type]) {
        score++;
    } else {
        score = 0;
        document.getElementById("textmodal").innerHTML = `<p>INCORRECT</p><p>${poke1.name} ${type}: ${poke1[type]}  </p> <p>${poke2.name} ${type}: ${poke2[type]}</p>`
        openModal();
    }
    //Refresh the score in the html and max score
    refreshScore();
    twiceNewPoke();
}

//Segons el tipus es refresca una part del scoe
function updateScore(localList, gen, type, maxScore) {
    switch (type) {
        case "hp":
            //Exemple list[Gen-1][Hp] = 12 maxscore
            localList[gen][0] = maxScore;
            break;
        case "attack":
            //Exemple [Gen-4][Attack] = 13 maxScore
            localList[gen][1] = maxScore;
            break;
        case "defense":
            localList[gen][2] = maxScore;
            break;
        case "special_attack":
            localList[gen][3] = maxScore;
            break;
        case "special_defense":
            localList[gen][4] = maxScore;
            break;
        case "speed":
            localList[gen][5] = maxScore;
            break;
        case "best":
            localList[gen][6] = maxScore;
            break;
        default:
            break;
    }
    document.getElementById("max-score-number").innerText = maxScore;
    return localList;

}

function btnHigh() {
    if (poke1[type] >= poke2[type]) {
        score++;
    } else {
        score = 0;
        document.getElementById("textmodal").innerHTML = `<p>INCORRECT</p><p>${poke1.name} ${type}: ${poke1[type]}  </p> <p>${poke2.name} ${type}: ${poke2[type]}</p>`
        openModal();
    }
    refreshScore();
    twiceNewPoke();
}

//Refresh the score in the html and max score
function refreshScore() {
    if (score > maxScore) {
        maxScore = score;
        //Score només guarda les millors puntuacions
        generationList = updateScore(getScoreListFromLocalStorage(), gen, type, maxScore);
        //Actualitza el LocalStorage
        addToLocalStorage(generationList);
        //Regenera la taula score html
        generateTableScore();
        //Nomes actualiza el max score quan s'ha superat
        document.getElementById('max-score-number').textContent = maxScore;
    }
    document.getElementById('score-number').textContent = score;
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


function printTable() {
    console.table(generationList);
}

function mostrarTablaScore() {
    let x = document.getElementById("open-score");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}