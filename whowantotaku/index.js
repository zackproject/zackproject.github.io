var player;
var optionsHTMList;
function playNow() {
    //Crea un jugador amb els setting definits
    player = playNewGame();
    console.info(player);
    //Guarda les clases de 'options' del HTML, en una variable
    optionsHTMList = fillQuestionList();
    //Omple el text HTML amb els valors
    fillQuiz();
    //Omple les opcions del comodi Trucada
    generateHTMLSelectView();
}

//Emplena un nou objecte de joc
function playNewGame() {
    let inputName = document.getElementById("inputName").value;
    let selectedCategory = document.getElementById("rutaViewList").selectedOptions[0];
    let idAcualQuestion = 0;
    let comodinList = [c1, c2, c3];
    let firstRange = parseInt(selectedCategory.value);
    let secondRange = firstRange + 9;
    let rangeQuestion = quizList.slice(firstRange, secondRange);
    let rangeSolution = optionsPositionCorrect.slice(firstRange, secondRange);
    //Una vegada creat el player el retorna
    return new QuizFriki(inputName, selectedCategory.innerText, idAcualQuestion, comodinList, rangeQuestion, rangeSolution);
}

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
    let quiz = player.questionsList[player.id_actual_question];
    //La pregunta actual es la del 'obj'
    let pregunta = document.getElementById("question");
    pregunta.innerText = quiz.question;

    //GLOBAL let optionsList 
    for (let i = 0; i < optionsHTMList.length; i++) {
        //Hi ha tantes clases com opcions: 4
        optionsHTMList[i].innerText = quiz.options[i];
    }
}


function comodinLlamada(event) {
    //Nom del comodi
    let comodin = player.comodinList[0];
    //Guarda el index de la resposta correcta
    let indexAnswerForThisQuestion = optionsPositionCorrect[player.id_actual_question];
    //Retorna el index de la persona trucada
    let contactCall = parseInt(document.getElementById("callViewList").selectedOptions[0].value);
    //Guarda la opcio de la trucada telefonica i el percentatle []
    let callOption = player.comodinList[0].applyCalling(indexAnswerForThisQuestion);
    //Tria un dialog a l'atzar de la persona 'contactCall'
    let dialogOption = nameCalling[contactCall].call[randInt(0, nameCalling[contactCall].call.length - 1)];
    //callOption[0] es 'id resposta callOption[1] es 'percentatge d'acert'
    let textRespuesta = dialogOption + "'" + player.questionsList[player.id_actual_question].options[callOption[0]] + "'. Estoy al " + callOption[1] + "% seguro"
    //console.log(comodin.name, textRespuesta);
    //Escriu el resultat del comodi al html
    let text = document.getElementById("applycomodin");
    text.innerText = comodin.name + " - " + textRespuesta;
    // Marquem com utilizat el comodi
    comodin.used = true;
    //Desactiva el pare que l'ha cridat, o sigui el boton
    event.target.disabled = true;
}

function comodinPublico(event) {
    //Nom del comodi
    let comodin = player.comodinList[1];
    //Guarda el index de la resposta correcta
    let indexAnswerForThisQuestion = optionsPositionCorrect[player.id_actual_question];
    //Retorna un percentatges de les opcions mes votades
    //segons el nivel de pregunta (id_actual_question) , acerten mes o menys
    let percentPublicList = player.comodinList[0].applyPublic(player.id_actual_question, indexAnswerForThisQuestion);
    //console.log(comodin.name, percentPublicList);

    let optionListAnswer = player.questionsList[player.id_actual_question].options;
    //Escriu el resultat del comodi al html
    let text = document.getElementById("applycomodin");
    text.innerText = comodin.name + " - " + representPublic(percentPublicList, optionListAnswer);
    // Marquem com utilizat el comodi
    comodin.used = true;
    //Desactiva el pare que l'ha cridat, o sigui el boton
    event.target.disabled = true;
}

function comodinFifty(event) {
    //Nom del comodi
    let comodin = player.comodinList[2];
    //Guarda el index de la resposta correcta
    let indexAnswerForThisQuestion = optionsPositionCorrect[player.id_actual_question];
    // Retorna les opcions a esborrar
    let removeWrongList = player.comodinList[0].applyFiftyPercent(indexAnswerForThisQuestion);
    //console.log(comodin.name, removeWrongList);
    //Esborra el text de 2 opcions incorrectes
    removeWrongList.forEach(element => {
        optionsHTMList[element].innerText = "";
    });

    // Marquem com utilizat el comodi
    comodin.used = true;
    //Desactiva el pare que l'ha cridat, o sigui el boton
    event.target.disabled = true;
}



function representPublic(percentList, questionList) {
    let text = "";
    for (let i = 0; i < percentList.length; i++) {
        text = text + "'" + questionList[i] + "' " + percentList[i] + "% | ";
    }

    return text;
}

function generateHTMLSelectView() {
    let pare = document.getElementById("callViewList");
    let cont = 0;
    nameCalling.forEach(element => {
        let optionHTML = document.createElement("option");
        if(cont==0){
            optionHTML.selected = true;
        }
        optionHTML.value = cont;
        optionHTML.innerText = element.name;
        cont++;
        pare.appendChild(optionHTML);
    });
}