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
}

//Emplena un nou objecte de joc
function playNewGame() {
    let inputName = document.getElementById("inputName").value;
    let selectedCategory = document.getElementById("rutaViewList").selectedOptions[0];
    let idAcualQuestion = 0;
    let comodinList = [c1, c2, c3];
    let firstRange = parseInt(selectedCategory.value);
    let secondRange = firstRange + 9;
    let rangeQuestion = questionsList.slice(firstRange, secondRange);
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


function selectRuta() {
    let selectedRuta = document.getElementById("rutaViewList").selectedOptions[0];
    console.log(selectedRuta.value, selectedRuta.innerText);
}


