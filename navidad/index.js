





const main = document.getElementById("main");



defaultSettings.questions.forEach((q, i) => {
    const ytVideo = defaultSettings.surprises[i];
    main.innerHTML += `${q.id}. ${q.question}<br>${correctQuiz(q.options, i)}<br> <img src="http://i3.ytimg.com/vi/${ytVideo}/mqdefault.jpg" alt="Sorpresa Youtube" title="Ir a Youtube"><br>`;
});


function correctQuiz(options, id) {
    let html = '';
    options.forEach((option, index) => {
        if (index === defaultSettings.resolves[id]) {
            html += `<span style="background-color: lightgreen;">${option}</span> `;
        } else {
            html += `<span style="background-color: red;">${option}</span> `;
        }
    });
    return html;
}


console.log(defaultSettings);



















const NAVIDAD = "navidad2023";
const d = new Date();
const dayGlobal = d.getDate();
const monthGlobal = d.getMonth() + 1;
const monthWorkThisProgram = 4; //Mes que funciona el programa
let player = null;

const cardOpenHTML = (day) => {
    return ``;
}

const cardCloseHTML = (day) => {
    return ``;
}

const cardResolveHTML = (ytVideo, day) => {
    return ``;
}



class Advent {
    constructor(questions, resolves, surprises) {
        this.questions = questions;
        this.resolves = resolves;
        this.surprises = surprises;
        this.unlockdays = Array.from({ length: questions.length }, () => 0); //si guarda el dia que la resolvio no hace isResolved= False porque resolveDays !=0
    }
    checkQuiz(nDay, checkThis) {
        // Comprova si es correcta la resposta
        if (this.resolves[nDay - 1] === checkThis) {
            //Si es correcta retorna true i guarda el moment en el que s'ha resolt
            if (this.unlockdays[nDay - 1] === 0) this.unlockdays[nDay - 1] = Math.floor(Date.now() / 1000);;
            return true;
        }
        return false;
    }

    getSurprise(nDay) {
        return this.surprises[nDay - 1];
    }
    getQuestion(nDay) {
        return this.questions[nDay - 1].quiz;
    }

    getOption(nDay) {
        return this.questions[nDay - 1].options;
    }
};






function infoChristmas() {

}
function fillCalendar() {
    deleteChilds(pare);

}

/* Modal */
const checkAnswer = (event) => {
    // Evitar que el formulario se envíe nuevamente
    event.preventDefault();
    let animado = document.getElementById("retrato");
    animado.style.animation = 'none';
    void animado.offsetWidth; // Reflujos forzados para reiniciar la animación
    document.getElementById("retrato").style.animation = "mueve 4s forwards"
    //return false; // Evita el envío normal del formulario

}




function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}