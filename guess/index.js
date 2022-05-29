/* guess */
var pkname;
var score = 0
var wrongList = [];
var rightList = [];
var skipedList = [];
var gen = 0;

//Disorder the word randoom
function disorderWord(word) {
    return word.split('').sort(function () { return 0.5 - Math.random() }).join('').toLowerCase();
}

//Get poke and update views
function findPokeName() {
    let listGen = genMaxMin(gen);
    let min = listGen[0];
    let max = (listGen[1]) + 1; //random no include the last (1-152 no iclude 152)
    let rand = Math.floor(Math.random() * (max - min) + min);
    let poke = pokeled[rand];
    pkname = poke.name;
    let pknameunsort = '';
    do {
        pknameunsort = disorderWord(pkname);
    } while (pkname.toLowerCase() == pknameunsort || pknameunsort == '');
    document.getElementById('imagepk').alt = "Peeled " + poke.dex;
    document.getElementById('imagepk').src = poke.image;
    document.getElementById('guesspk').textContent = pknameunsort;
    updateScore();
}


function giveup() {
    skipedList.unshift(pkname)
    findPokeName();
    if (score > 0) {
        score--;
    }
    updateScore();
    makeListHtml(_idhtml = 'listaskiped', _list = skipedList);
    document.body.style.backgroundColor = "#cc0000";
}


function textInputGame() {
    let input = document.getElementById('inputpk').value;
    if (input.toLowerCase() == pkname.toLowerCase()) {
        document.body.style.backgroundColor = "lightgreen";
        findPokeName();
        score++;
        updateScore();
        //hace un push hacia la primera posicion
        rightList.unshift(input);
        makeListHtml(_idhtml = 'listaright', _list = rightList);

    } else {
        document.body.style.backgroundColor = "#cc0000";
        if (input != '') {
            //hace un push hacia la primera posicion
            wrongList.unshift(input);
            makeListHtml(_idhtml = 'listawrong', _list = wrongList);
        }
    }
    document.getElementById('inputpk').value = "";
}



function makeListHtml(_idhtml, _list) {
    let text = '';
    //hace un remove de la ultima posicion si es mayor a 5
    if (_list.length > 5) _list.pop();
    //Vuelve a actualizar el list group en un texto
    _list.forEach(element => { text = text + "<li class='list-group-item'>" + element + "</li>"; });
    //pinta en el html el nuevo list group
    document.getElementById(_idhtml).innerHTML = text;
}

function genMaxMin(genl) {
    //return de range of number pokedex for each generation
    switch (genl) {
        case 1:
            return [1, 151]; //gen1
        case 2:
            return [152, 251]; //gen2
        default:
            return [1, 251]; //gen 1&2
    }
}

function changeGen() {
    let genHtml = document.getElementById('genViewList').selectedOptions[0].value;
    gen = parseInt(genHtml);
    score = 0;
    findPokeName();
}

function updateScore() {
    document.getElementById('textScore').textContent = 'Score: ' + score;
}