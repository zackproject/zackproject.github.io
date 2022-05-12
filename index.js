var pkname;
var score = 0
var wrongList = [];
var rightList = [];
var skipedList = [];

// excluye el 152 max


function disorderWord(word) {
    return word.split('').sort(function () { return 0.5 - Math.random() }).join('').toLowerCase();
}

function findPokeName() {
    let rand = Math.floor(Math.random() * (898 - 1) + 1);
    let poke = data[rand];
    pkname = poke.name;
    let pknameunsort = '';
    while (pkname.toLowerCase() == pknameunsort || pknameunsort == '') {
        pknameunsort = disorderWord(pkname);
    }

    //console.log('unsort', pknameunsort);
   // console.log('pkname', rand);

    //document.getElementById('imagen').src = pkimage;
    document.getElementById('guesspk').textContent = pknameunsort;
}


function giveup() {
    skipedList.unshift(pkname)
    findPokeName();
    if (score > 0) {
        score--;
    }
    document.getElementById('textScore').textContent = 'Score: ' + score;
    makeListHtml(_idhtml = 'listaskiped', _list = skipedList);
    document.body.style.backgroundColor = "#cc0000";
}


function textInputGame() {
    let input = document.getElementById('inputpk').value;
    if (input.toLowerCase() == pkname.toLowerCase()) {
        document.body.style.backgroundColor = "lightgreen";
        findPokeName();
        score++;
        document.getElementById('textScore').textContent = 'Score: ' + score;
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
    //hace un remove de la ultima posicion
    if (_list.length > 5) _list.pop();
    _list.forEach(element => { text = text + "<li class='list-group-item'>" + element + "</li>"; });
    document.getElementById(_idhtml).innerHTML = text;
}