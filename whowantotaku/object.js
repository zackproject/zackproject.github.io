function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class QuizFriki {
    constructor(name, category, id_actual_question, comodinList, questionsList, solutionsList, award) {
        this.name = name;
        this.id_actual_question = id_actual_question;
        this.category = category;
        this.comodinList = comodinList;
        this.questionsList = questionsList;
        this.solutionsList = solutionsList;
        this.award = award;
    }
}


class Comodin {
    constructor(id, name, used) {
        this.id = id;
        this.used = used;
        this.name = name;
    }
}

Comodin.prototype.applyFiftyPercent = function apply50Percent(ncorrect) {
    let ar = [0, 1, 2, 3];
    //Remove one item
    const remove = 1;
    //Exclueix la responsta correcta
    ar.splice(ncorrect, remove);
    let rand = randInt(0, ar.length - 1);
    //Exclueix responsta random
    ar.splice(rand, remove);
    //Ha d'esborrar aquestes dues opcions
    return ar;
}


Comodin.prototype.applyCalling = function applyCalling(ncorrect) {
    //Decideix el porcentaje a partir del 30%
    let percent = randInt(30, 100);
    let posibilidad = randInt(1, 100);
    //Si la posibilitat '43' es menor o igual a percent '30' diu la veritat
    if (posibilidad <= percent) {
        //"Estoy al " + percent + "% seguro que es la"
        return [ncorrect, percent]; //true
    } else {
        let num = 0;
        do {
            //Retornara una opcio incorrecta
            num = randInt(0, 3);
        } while (num == ncorrect);
        //Si la posibilitat '43' es majora percent '65' diu la mentida
        return [num, percent]; //false
    }
}

Comodin.prototype.applyPublic = function applyPublic(question_id, ncorrect,) {
    //let dificultad = question_id % 10; // 1=facil 10=dificil
    let dificultad = (question_id + 1); // 1=facil 10=dificil CREO QUE NO ES NECESARIO %10
    //En un range on dificultat=10 --> 50% de probabilitat d'acert
    let range = 100 - (dificultad * 5);
    //opt1 sera la correcta, el public pot o no acertar
    let OPT1 = randInt(range - 10, range)
    //El rand2 sera menor al opt1
    let opt2 = randInt(0, 100 - OPT1);
    //El rand3 sera menor al opt1 i opt2
    let opt3 = randInt(0, 100 - (opt2 + OPT1));
    //El rand sera la resta del 100%, lo que queda
    // per probabilitat, opt4 pot arribar a ser major que la resta
    let opt4 = 100 - (opt3 + opt2 + OPT1);

    //nCorrect = 0,1,2,3 (4 options)
    switch (ncorrect) {
        case 1:
            return [opt4, OPT1, opt3, opt2];
        case 2:
            return [opt3, opt2, OPT1, opt4];
        case 3:
            return [opt3, opt2, opt4, OPT1];
        default:
            //default 0
            return [OPT1, opt2, opt3, opt4];
    }

}


var c1 = new Comodin(1, "Llamada", false);
var c2 = new Comodin(2, "Publico", false);
var c3 = new Comodin(3, "La mitad", false);
//let rangeQuestion = questionsList.slice(10, 19);
//let rangeSolution = optionsPositionCorrect.slice(10, 19);

//let j1 = new QuizFriki("Pedro", "shingeki", 1, [c1, c2, c3], rangeQuestion, rangeSolution);
//let j2 = new QuizFriki("Luis", "jojos", 1, [c1, c2, c3], rangeQuestion, rangeSolution);


class Presentador {
    constructor(presentation, suggestComodin, failAnswer, correctAnswer, winnerFelicitar, winnerInformar, tramposo) {
        this.presentation = presentation;
        this.suggestComodin = suggestComodin;
        this.failAnswer = failAnswer;
        this.correctAnswer = correctAnswer;
        this.winnerFelicitar = winnerFelicitar;
        this.winnerInformar = winnerInformar;
        this.tramposo = tramposo
    }
    callPresentacion(name) {
        return this.presentation[randInt(0, this.presentation.length - 1)].replace("{}", name)
    }
    callComodin() {
        return this.suggestComodin[randInt(0, this.suggestComodin.length - 1)]
    }
    callInorrecto(name) {
        return this.failAnswer[randInt(0, this.failAnswer.length - 1)].replace("{}", name)
    }
    callCorrecto() {
        return this.correctAnswer[randInt(0, this.correctAnswer.length - 1)]
    }
    callWinner(name) {
        return this.winnerFelicitar[randInt(0, this.winnerFelicitar.length - 1)] + " " + this.winnerInformar.replace("{}", name);
    }
    callTrampa() {
        return this.tramposo;
    }
}