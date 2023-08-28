const fondoHtml = "./2022/images/web/fondo.webp";
const candadoCerrado = "./2022/images/web/candado_cerrado.png";
const candadoAbierto = "./2022/images/web/candado_abierto.png";
const NAVIDAD = "navida2023"
makeFooter();
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
    <a href="${ytVideo}" target="_blank" >
        <img class="fondo-card-resolved" data-day="${day}" src="http://i3.ytimg.com/vi/${ytVideo.split("/").pop()}/mqdefault.jpg"
            alt="Dia ${day}, candado resuelto" title="Casilla del dia ${day} resuelta, click ver la sorpresa" ></a>
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
const d = new Date();
const dayGlobal = 25;//d.getDate();
const monthGlobal = d.getMonth() + 1;
const monthWorkThisProgram = 8; //Mes que funciona el programa
let player = null;

if (localStorage.getItem(NAVIDAD) != null) {
    let mPlayer = JSON.parse(localStorage.getItem(NAVIDAD));
    player = new Advent(mPlayer.questions, mPlayer.resolves, mPlayer.surprises);
    //No es crea en el OBJ i es defineix internament, pero aixo no es guarda
    player.unlockdays = mPlayer.unlockdays;
} else {
    player = new Advent(adventList.questions, adventList.resolves, adventList.surprises);
    localStorage.setItem(NAVIDAD, JSON.stringify(player))
}

let pare = document.getElementById("pare");

fillCalendar();
function fillCalendar() {
    deleteChilds(pare);
    console.log("lo hizo");
    adventList.questions.forEach((element, i) => {
        //Funciona si es el mes marcat i el dia ha passat
        if (dayGlobal >= element.id && monthGlobal === monthWorkThisProgram) {
            console.log(i, player.unlockdays[i]);
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

}


/* Modal */
let modal = document.getElementById("modal");
let titleModal = document.getElementById("title-modal");
let fuera = document.getElementById("headnavidad");
const checkAnswer = (event) => {
    //quiz_answer => name="quiz_answer"
    let myAnswer = event.target.quiz_answer.value;
    let myQuestion = document.getElementById("quiz-question").getAttribute("data-day");
    console.log("uno", myAnswer, "dos", myQuestion);
    let respuesta = document.getElementById("respuesta");
    if (player.checkQuiz(parseInt(myQuestion), parseInt(myAnswer))) {
        console.log("OK");
        respuesta.innerText = "✓"
        respuesta.style.backgroundColor = "green"
        titleModal.innerText = "¡CORRECTO! Cierra la ventana y clica la casilla " + myQuestion;
        //Genera de nou el calendari
        localStorage.setItem(NAVIDAD, JSON.stringify(player));
        fillCalendar();
    } else {
        console.log("MAL");
        respuesta.innerText = "X"
        respuesta.style.backgroundColor = "red";
        titleModal.innerText = "¡INCORRECTO! Vuelve a intentarlo";
    }

    titleModal.focus();
    let animado = document.getElementById("retrato");
    animado.style.animation = 'none';
    void animado.offsetWidth; // Reflujos forzados para reiniciar la animación
    document.getElementById("retrato").style.animation = "mueve 4s forwards"
    return false; // Evita el envío normal del formulario

}

function openModal(event) {
    let day = event.target.getAttribute("data-day");
    //Omple la pregunta d'avui
    document.getElementById("day-quiz").innerText = day;
    document.getElementById("quiz-question").innerText = player.getQuestion(day);
    document.getElementById("quiz-question").setAttribute("data-day", day);
    for (let i = 1; i <= 4; i++) {
        document.querySelector("label[for='quiz-" + i + "']").innerText = player.getOption(day)[i - 1];
        document.getElementById("quiz-" + i).checked = false;
    }
    //Mostra el contingut
    modal.ariaHidden = "false"
    modal.style.display = "block";
    titleModal.innerText = "Marca una opción";
    titleModal.focus();
}

function closeModal() {
    modal.style.display = "none";
    modal.ariaHidden = "true"
    let animado = document.getElementById("retrato");
    animado.style.animation = 'none';
    fuera.focus();
}

/* Cada any el footer posara l'any actual */
function makeFooter() {
    const d = new Date();
    document.getElementById("dateYear").innerText = d.getFullYear();
}


function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}