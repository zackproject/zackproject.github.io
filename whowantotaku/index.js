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
    console.log(questionHTMList);
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
    let rand = Math.floor(Math.random() * ar.length - 1);
    //Exclueix responsta random
    ar.splice(rand, remove);
    // Esborra dos respostes incorrecres
    ar.forEach(element => {
        questionHTMList[element].innerText = "";
    });
}
function comodinPublico(){
    
}
