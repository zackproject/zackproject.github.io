function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class QuizFriki {
    constructor(name, category, id_actual_question, comodinList, questionsList, solutionsList) {
        this.name = name;
        this.id_actual_question = id_actual_question;
        this.category = category;
        this.comodinList = comodinList;
        this.questionsList = questionsList;
        this.solutionsList = solutionsList;
    }
}


class Comodin {
    constructor(id, name, used) {
        this.id = id;
        this.used = used;
        this.name = name;
    }
}

Comodin.prototype.applyFiftyPercent = function apply50Percent(question_id, ncorrect) {
    // Marquem com utilizat el comodi
    this.used = true

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


Comodin.prototype.applyCalling = function applyCalling(question_id, ncorrect) {
    // Marquem com utilizat el comodi
    this.used = true

    //Decideix el porcentaje a partir del 30%
    let percent = randInt(30, 100);
    let posibilidad = randInt(1, 100);
    //Si la posibilitat '43' es menor o igual a percent '30' diu la veritat
    if (posibilidad <= percent) {
        //"Estoy al " + percent + "% seguro que es la"
        return [percent, ncorrect]; //true
    } else {
        let num = 0;
        do {
            //Retornara una opcio incorrecta
            num = randInt(0, 3);
        } while (num == ncorrect);
        //Si la posibilitat '43' es majora percent '65' diu la mentida
        return [percent, num]; //false
    }
}

Comodin.prototype.applyPublic = function applyPublic(question_id, ncorrect,) {
    // Marquem com utilizat el comodi
    this.used = true
    
    //let dificultad = question_id % 10; // 1=facil 10=dificil
    let dificultad = 8; // 1=facil 10=dificil

    //En un range on dificultat=10 --> 50% de probabilitat d'acert
    let range = 100 - (dificultad * 5);
    //opt1 sera la correcta, el public pot o no acertar
    let opt1 = randInt(range - 10, range)
    //El rand2 sera menor al opt1
    let opt2 = randInt(0, 100 - opt1);
    //El rand3 sera menor al opt1 i opt2
    let opt3 = randInt(0, 100 - (opt2 + opt1));
    //El rand sera la resta del 100%, lo que queda
    // per probabilitat, pot arribar a ser major que la resta
    let opt4 = 100 - (opt3 + opt2 + opt1);

    console.log("range", range, "opt", opt1, opt2, opt3, opt4, " = ", opt1 + opt2 + opt3 + opt4);
    return [opt1, opt2, opt3, opt4];
}


var c1 = new Comodin(1, "Llamada", false);
var c2 = new Comodin(2, "Publico", false);
var c3 = new Comodin(3, "La mitad", false);
//let rangeQuestion = questionsList.slice(10, 19);
//let rangeSolution = optionsPositionCorrect.slice(10, 19);

//let j1 = new QuizFriki("Pedro", "shingeki", 1, [c1, c2, c3], rangeQuestion, rangeSolution);
//let j2 = new QuizFriki("Luis", "jojos", 1, [c1, c2, c3], rangeQuestion, rangeSolution);
