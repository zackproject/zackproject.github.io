const ytLogo = "../images/yt.png";
const fondoHtml = defaultSettings.backgroundImage;
const candadoCerrado = defaultSettings.padlockCloseImage;
const candadoAbierto = defaultSettings.padlockOpenImage;
const NAVIDAD = defaultSettings.localChristmas;
const d = new Date();
const dayGlobal = d.getDate();
const monthGlobal = d.getMonth() + 1;
const monthWorkThisProgram = 12; //Mes que funciona el programa
let player = null;
const adventList = defaultSettings;
//Pagina
const mainPage = document.getElementById("pare");
//Modal
const modalPage = document.getElementById("modal");

const cardOpenHTML = (day) => {
    return `<li class="carta">
        <img class="fondo-card" src="${fondoHtml}"  height="200" width="200" alt="" aria-hidden="true">
        <img class="padlock opacity-padlock" data-day="${day}" height="200" width="200" src="${candadoAbierto}" alt="Candado abierto"
            title="Casilla del dia ${day} abierta, click para resolver la casilla" onclick="openModal(event)"">
        <div class=" carta-text" aria-hidden="true">${day}</div>
    </li>`;
}

const cardCloseHTML = (day) => {
    return `<li class="carta">
            <img class="fondo-card" src="${fondoHtml}" alt="" height="200" width="200" aria-hidden="true">
            <img class="padlock shake-padlock" src="${candadoCerrado}" height="200" width="200" alt="Candado cerrado"
                title="Casilla del dia ${day} cerrada, espera al dia para abrir la casilla">
            <div class="carta-text" aria-hidden="true">${day}</div>
        </li>`;
}

const cardResolveHTML = (ytVideo, day) => {
    return `<li class="carta">
    <a href="https://youtu.be/${ytVideo}" target="_blank" >
    <img class="fondo-card-resolved" data-day="${day}" height="200" width="200" src="http://i3.ytimg.com/vi/${ytVideo}/mqdefault.jpg"
            alt="Dia ${day}, candado resuelto" title="Volver a ver video de Youtube del Dia ${day}" alt="Logo Youtube" >
            ${showYtLogo(day)}        
    </a>
        <div class="carta-text" aria-hidden="true">${day}</div>
    </li>`;
}

const showYtLogo = (day) => {
    if (player.showLogo(day)) {
        console.log("hola");
        return `<img onclick="watchedVideo(${day}, event)" aria-hidden="true" class="fondo-card-resolved" height="200" width="200" src="${ytLogo}" title="Ver video de Youtube del Dia ${day}" alt="Logo Youtube">`
    }
    return "";
}

class Advent {
    constructor(questions, resolves, surprises) {
        this.questions = questions;
        this.resolves = resolves;
        this.surprises = surprises;
        this.watchedSurprise = Array.from({ length: questions.length }, () => false);
        this.unlockdays = Array.from({ length: questions.length }, () => 0); //si guarda el dia que la resolvio no hace isResolved= False porque resolveDays !=0
    }
    checkQuiz(nDay, checkThis) {
        // Comprova si es correcta la resposta
        if (this.resolves[nDay - 1] === checkThis) {
            //Si es correcta retorna true i guarda el moment en el que s'ha resolt
            if (this.unlockdays[nDay - 1] === 0) this.unlockdays[nDay - 1] = Math.floor(Date.now() / 1000);;
            // la marca d'aigua es treu
            return true;
        }
        return false;
    }

    setWatched(nDay) {
        this.watchedSurprise[nDay - 1] = true;
    }

    showLogo(nDay) {
        return !this.watchedSurprise[nDay - 1];
    }

    getSurprise(nDay) {
        return this.surprises[nDay - 1];
    }
    getQuestion(nDay) {
        return this.questions[nDay - 1].question;
    }

    getOption(nDay) {
        return this.questions[nDay - 1].options;
    }

    setUnlockDays(unlocks) {
        this.unlockdays = unlocks;
    }
    setSurprises(mySurprises) {
        this.surprises = mySurprises;
    }
    setWatcheds(myWathes) {
        this.watchedSurprise = myWathes;
    }
};


if (localStorage.getItem(NAVIDAD) != null) {
    let mPlayer = JSON.parse(localStorage.getItem(NAVIDAD));
    player = new Advent(mPlayer.questions, mPlayer.resolves, mPlayer.surprises);
    //No es crea en el OBJ i es defineix internament, pero aixo no es guarda
    player.setUnlockDays(mPlayer.unlockdays);
    player.setSurprises(defaultSettings.surprises);
    player.setWatcheds(mPlayer.watchedSurprise)
} else {
    player = new Advent(adventList.questions, adventList.resolves, adventList.surprises);
    localStorage.setItem(NAVIDAD, JSON.stringify(player))
}

let pare = document.getElementById("pare");
fillCalendar();
infoChristmas();


function infoChristmas() {
    let info = document.getElementById("infonavidad");
    if (monthGlobal === monthWorkThisProgram) {
        document.getElementById("snowing").style.display = "flex";
        if (dayGlobal < 25) {
            info.innerText = "Abre la casilla de hoy";
        } else {
            info.innerHTML = "¡Feliz Navidad!<br> Mira otros minijuegos <a href='https://www.zksama.com'>AQUÍ</a>";
        }
    } else {
        info.innerText = "Disponible sólo en diciembre";

    }

}

function watchedVideo(mday, event) {
    console.log(player);
    player.setWatched(mday);
    console.log(player);
    event.target.style.display = "none";
    localStorage.setItem(NAVIDAD, JSON.stringify(player))
}
function fillCalendar() {
    deleteChilds(pare);
    adventList.questions.forEach((element, i) => {
        //Funciona si es el mes marcat i el dia ha passat
        if (dayGlobal >= element.id && monthGlobal === monthWorkThisProgram) {
            if (player.unlockdays[i] !== 0) {
                // Si esta guardat la data en milisegonds  s'ha completat
                pare.innerHTML += cardResolveHTML(player.getSurprise(element.id), element.id)
            } else {
                // Sino, esta sense resoldre
                //TEST pare.innerHTML += cardResolveHTML(player.getSurprise(element.id), element.id);
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
let titleModal = document.getElementById("title-modal");
let fuera = document.getElementById("headnavidad");
const checkAnswer = (event) => {
    // Evitar que el formulario se envíe nuevamente
    event.preventDefault();
    //quiz_answer => name="quiz_answer"
    let myAnswer = event.target.quiz_answer.value;
    let myQuestion = document.getElementById("quiz-question").getAttribute("data-day");
    let respuesta = document.getElementById("respuesta");
    if (player.checkQuiz(parseInt(myQuestion), parseInt(myAnswer))) {
        respuesta.innerText = "✓"
        respuesta.style.backgroundColor = "green"
        titleModal.innerText = "¡CORRECTO! Cierra la ventana y clica la casilla " + myQuestion;
        //Genera de nou el calendari
        localStorage.setItem(NAVIDAD, JSON.stringify(player));
        fillCalendar();
    } else {
        respuesta.innerText = "X"
        respuesta.style.backgroundColor = "red";
        titleModal.innerText = "¡INCORRECTO! Vuelve a intentarlo";
    }

    titleModal.focus();
    let animado = document.getElementById("retrato");
    animado.style.animation = 'none';
    void animado.offsetWidth; // Reflujos forzados para reiniciar la animación
    document.getElementById("retrato").style.animation = "mueve 4s forwards"
    //return false; // Evita el envío normal del formulario

}

function openModal(event) {
    //Pagina principal oculta i modal visible
    mainPage.ariaHidden = "true";
    modalPage.ariaHidden = "false";
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

    modalPage.showModal();
    titleModal.innerText = "Marca una opción";
    titleModal.focus();
}

function closeModal() {
    mainPage.ariaHidden = "false";
    modalPage.ariaHidden = "true";
    let animado = document.getElementById("retrato");
    animado.style.animation = 'none';
    modalPage.close();
    fuera.focus();
}



function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}


// console.log(defaultSettings);

function showSolution() {
    for (let i = 0; i < player.questions.length; i++) {
        console.log(i, player.questions[i].question, player.questions[i].options[player.resolves[i]]);
    }
}
