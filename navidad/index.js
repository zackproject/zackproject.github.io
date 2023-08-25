const fondoHtml = "./2022/images/web/fondo.webp";
const candadoCerrado = "./2022/images/web/candado_cerrado.png";
const candadoAbierto = "./2022/images/web/candado_abierto.png";

const cardOpenHTML = (day) => {
    return `<li class="carta">
        <img class="fondo-card" src="${fondoHtml}" alt="" aria-hidden="true">
        <img class="padlock opacity-padlock" data-day="${day}" src="${candadoAbierto}" alt="Candado abierto"
            title="Casilla del dia ${day} abierta, click para resolver la casilla" onclick="openModal(event)"">
        <div class=" carta-text" aria-hidden="true">${day}</div>
    </li>`;
}

const cardCloseHTML = (day) => {
    return `<li class="carta">
            <img class="fondo-card" src="${fondoHtml}" alt="" aria-hidden="true">
            <img class="padlock shake-padlock" src="${candadoCerrado}" alt="Candado cerrado"
                title="Casilla del dia ${day} cerrada, espera al dia para abrir la casilla">
            <div class="carta-text" aria-hidden="true">${day}</div>
        </li>`;
}

const cardResolveHTML = (ytVideo, day) => { //https://youtu.be/AL8qLEUkDOM
    return `<li class="carta">
        <img class="fondo-card-resolved" data-day="${day}" src="http://i3.ytimg.com/vi/${ytVideo.split("/").pop()}/mqdefault.jpg"
            alt="Dia ${day}, candado resuelto" title="Casilla del dia ${day} resuelta, click para volver a responderla" onclick="openModal(event)">
        <div class="carta-text" aria-hidden="true">${day}</div>
    </li>`;
}

class Advent {
    constructor(questions, resolves, surprises) {
        this.questions = questions;
        this.resolves = resolves;
        this.surprises = surprises;
        this.unlockdays = Array.from({ length: questions.length }, () => 0); //si guarda el dia que la resolvio no hace isResolved= False porque resolveDays !=0
    }
    checkAnswer(nDay, checkThis) {
        // Comprova si es correcta la resposta
        if (this.resolves[nDay - 1] = parseInt(checkThis)) {
            //Si es correcta retorna true i guarda el moment en el que s'ha resolt
            if (this.unlockdays[nDay - 1] != 0) this.unlockdays[nDay - 1] = Math.floor(Date.now() / 1000);;
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
const d = new Date();
const dayGlobal = 7;//d.getDate();
const monthGlobal = d.getMonth() + 1;
const monthWorkThisProgram = 8; //Mes que funciona el programa
let player = new Advent(adventList.questions, adventList.resolves, adventList.surprises)
let pare = document.getElementById("pare");
adventList.questions.forEach((element, i) => {
    //Funciona si es el mes marcat i el dia ha passat
    if (dayGlobal >= element.id && monthGlobal === monthWorkThisProgram) {
        if (player.unlockdays[i] !== 0) {
            // Si esta guardat la data en milisegonds  s'ha completat
            pare.innerHTML += cardResolveHTML(player.getSurprise(element.id), element.id)
        } else {
            // Sino, esta sense resoldre
            pare.innerHTML += cardOpenHTML(element.id);
        }
    } else {
        //En altres casos, esta tancada
        pare.innerHTML += cardCloseHTML(element.id)
    }


    //

});


/* Modal */
let modal = document.getElementById("modal");
let titleModal = document.getElementById("title-modal");
let fuera = document.getElementById("headnavidad");
function checkAnswer(event) {
    //quiz_answer => name="quiz_answer"
    let respostaForm = parseInt(event.target.quiz_answer.value)
    //player.checkAnswer()
    console.log(" de la respuesta ", respostaForm);
    return false; // Evita el envío normal del formulario
}
function openModal(event) {
    let day = event.target.getAttribute("data-day");
    console.log(event.target);
    //Omple la pregunta d'avui
    document.getElementById("quiz-question").innerText = player.getQuestion(day);
    document.querySelector("label[for='quiz-1']").innerText = player.getOption(day)[0];
    document.querySelector("label[for='quiz-2']").innerText = player.getOption(day)[1];
    document.querySelector("label[for='quiz-3']").innerText = player.getOption(day)[2];
    document.querySelector("label[for='quiz-4']").innerText = player.getOption(day)[3];
    //Mostra el contingut
    modal.style.display = "block";
    modal.ariaHidden = "false"
    titleModal.focus();
}

function closeModal() {
    modal.style.display = "none";
    modal.ariaHidden = "true"
    fuera.focus();
}


