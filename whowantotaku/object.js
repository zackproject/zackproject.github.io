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

Comodin.prototype.apply50Percent() = function apply50Percent(question_id, ncorrect) {
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


Comodin.prototype.applyCalling() = function applyCalling(question_id, ncorrect) {
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
        return [percent, ncorrect]; //false
    }
    console.log("posibilitat", posibilidad, "percent", percent);
}

Comodin.prototype.applyPublic() = function applyPublic() {
    let dificultad = 1; // 1=facil 1=dificil
    let opt1 = randInt(90, 99)
    let opt2 = randInt(0, 100 - opt1);
    let opt3 = randInt(0, 100 - (opt2 + opt1));
    let opt4 = 100 - (opt3 + opt2 + opt1);

    console.log(opt1, opt2, opt3, opt4, " = ", opt1 + opt2 + opt3 + opt4);
    return [opt1, opt2, opt3, opt4];
}


let c1 = new Comodin(1, "Llamada", false);
let c2 = new Comodin(2, "Publico", false);
let c3 = new Comodin(3, "Mitad opciones", false);
let rangeQuestion = questionsList.slice(10, 19);
let rangeSolution = optionsPositionCorrect.slice(10, 19);

let j1 = new QuizFriki("Kevin", "shingeki", 1, [c1, c2, c3], rangeQuestion, rangeSolution);
console.log(j1);
