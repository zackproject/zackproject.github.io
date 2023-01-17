//
let numPregunta = 0;
let indexMyQuestion = 0;
let questionHTMList = [];

function fillQuestionList() {
    let list = []
    let clsslist = document.getElementsByClassName("answer");
    for (let i = 0; i < clsslist.length; i++) {
        const element = clsslist[i];
        list.push(element);
    }
    return list;
}
function fillQuiz() {
    questionHTMList = fillQuestionList();
    //Testing, retorna una pregunta al atzar
    indexMyQuestion = parseInt(Math.random() * ((questionsList.length - 1) - 0) + 0);
    //Es guarda la pregunta amb les opcions
    let qList = questionsList[indexMyQuestion];
    //Escriu la pregunta al div
    document.getElementById("question").innerText = qList.question;
    //Llista totes les clases respostes (4)
    for (let i = 0; i < questionHTMList.length; i++) {
        questionHTMList[i].innerText = qList.options[i];
    }
}

function comodinMitad() {
    let ncorrect = parseInt(optionsPositionCorrect[indexMyQuestion]);
    let ar = [0, 1, 2, 3];
    //Remove one item
    const remove = 1;
    //Exclueix la responsta correcta
    ar.splice(ncorrect, remove);
    let rand = randInt(0, ar.length - 1);
    //Exclueix responsta random
    ar.splice(rand, remove);
    // Esborra dos respostes incorrecres
    ar.forEach(element => {
        questionHTMList[element].innerText = "";
    });
}
function comodinPublico() {

}

function selectRuta() {
    let selectedRuta = document.getElementById("rutaViewList").selectedOptions[0];
    console.log(selectedRuta.value, selectedRuta.innerText);
}

function comodinLlamada() {
    //Decideix el porcentaje a partir del 30%
    let percent = randInt(30, 100);
    console.log("Estoy al " + percent + "% seguro que es la");
    let posibilidad = randInt(1, 100);
    //Si la posibilitat '43' es menor o igual a percent '30' diu la veritat
    if (posibilidad <= percent) {
        console.log("Voy a acertar");
    } else {
        //Si la posibilitat '43' es majora percent '65' diu la mentida
        console.log("Voy a fallar");

    }
    console.log("posibilitat", posibilidad, "percent", percent);
}


function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}