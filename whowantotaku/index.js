function fillQuiz() {
    //Testing, retorna una pregunta al atzar
    let rand = parseInt(Math.random() * ((questionsList.length - 1) - 0) + 0);
    //Es guarda la pregunta amb les opcions
    let qList = questionsList[rand];
    //Escriu la pregunta al div
    document.getElementById("question").innerText = qList.question;
    //Llista totes les clases respostes (4)
    let listClasses = document.getElementsByClassName("answer");
    for (let i = 0; i < listClasses.length; i++) {
        // Per cada resposta hi haura una clase, escriu la opcio
        listClasses.item(i).innerText = qList.options[i];
    }
}