const d = new Date();
day = d.getDate();
month = d.getMonth() + 1;
year = d.getFullYear();
var monthWorkThisProgram = 12;

function start() {
    let currentDiv = document.getElementById("calendari");
    //advent list ve del fitxer .json

    //Amaga el dialog / modal
    //let nmodal = document.getElementById("modal-form");
    //nmodal.style.display = "none";

    adventList.forEach(element => {
        //Crea un div carta
        let carta = document.createElement("div");
        carta.className = "carta ";
        carta.id = "carta-" + element.id;

        //Crea el text de la carta i fica el numero
        let text = document.createElement("div");
        text.className = "carta-text";
        text.innerText = element.id;

        //Afegeix el href si el dia ha pasat
        let imageWitOrNotHref = document.createElement("div");
        //Genera la imatge dins de la carta
        imageWitOrNotHref.className = "after " + isPadLockOpen(element.id, 1);
        let mimage = document.createElement("img");
        mimage.id = "padlock-" + element.id;
        mimage.alt = "Candado del dia " + element.id;
        mimage.loading = "lazy"
        mimage.src = isPadLockOpen(element.id, 2);

        if (day >= element.id && month == monthWorkThisProgram) {
            imageWitOrNotHref.onclick = function (event) {
                //Si clica un dia desbloquejat, obre el dialog
                generateModalList(element.id);
            };
        }

        imageWitOrNotHref.appendChild(mimage);

        //Guarda a imatge a la carta
        carta.appendChild(imageWitOrNotHref);

        //Fica tots el elements en la carta
        let imgFondoCarta = imageOnCard(element.id, "images/web/fondo.webp", "Fondo de la carta")
        carta.appendChild(imgFondoCarta);

        //Fica la la imatge en la carta
        carta.appendChild(text);
        currentDiv.appendChild(carta);
        applyLocalStorage(element.id);
    });

    /*Nomes neva al desembre */
    if (month == monthWorkThisProgram) {
        letitsnow();
        //Mostra si quedan caselles o completat
        showProgresText();
    }
    console.info("Only for developer", 'testCode(nDay);');
}


/* Genera tants fills com 'copitos' vulgui*/
function letitsnow() {
    /* https://pajasevi.github.io/CSSnowflakes/*/
    let copitos = 13;
    let nevarDiv = document.getElementsByClassName("nevar")[0];
    for (let i = 0; i < copitos; i++) {
        let copitodiv = document.createElement("div");
        copitodiv.className = "copito";
        copitodiv.innerText = "*";
        nevarDiv.appendChild(copitodiv);
    }
}
function showImageOnSolutionCorrect(npregunta) {
    // Amaga l'imatge del candau
    let imgPadLock = document.getElementById("padlock-" + npregunta);
    imgPadLock.style.visibility = "hidden";
    //Canvia l'imatge de fons
    let imgBackPadLock = document.getElementById("padback-" + npregunta);
    //EXAMPLE IMAGE
    imgBackPadLock.loading = "lazy"
    imgBackPadLock.src = adventList[npregunta - 1].image_open;

    //console.log("Candado abierto, id:", npregunta);
    //Guarda al localstorage el id de les ja clicades
    localStorage.setItem('pdunlock-' + npregunta, npregunta);
}


function applyLocalStorage(mId) {
    if (localStorage.getItem("pdunlock-" + mId) != null) {
        //codigo repetido
        let imgPadLock = document.getElementById("padlock-" + mId);
        imgPadLock.style.visibility = "hidden";
        //Canvia l'imatge de fons
        let imgBackPadLock = document.getElementById("padback-" + mId);
        //EXAMPLE IMAGE
        imgBackPadLock.loading = "lazy"
        imgBackPadLock.src = adventList[mId - 1].image_open;

    }
}
/* Genera una imatge amb 'url' i 'alt'*/
function imageOnCard(mid, msrc, malt) {
    let img1 = document.createElement("img");
    img1.id = "padback-" + mid;
    img1.loading = "lazy"
    img1.src = msrc;
    img1.alt = malt;
    return img1;
}

function isPadLockOpen(nId, option = 0) {
    /*Nomes funcionará al desembre*/
    if (month == monthWorkThisProgram) {
        switch (option) {
            case 1:
                return day < nId ? "locked" : "unlocked";
            case 2:
                return day < nId ? "images/web/candado_cerrado.png" : "images/web/candado_abierto.png";
            default:
                return "???";
        }
    }
    else {
        clearCalendarStorage();
        /*Si no es desembre, bloqueja tot */

        let caducidadList = document.getElementsByClassName("fecha-caducidad");

        for (let i = 0; i < caducidadList.length; i++) {
            const elementHTML = caducidadList[i];
            elementHTML.innerText = "Disponible sólo en diciembre";
        };
        switch (option) {
            case 1:
                return "locked";
            case 2:
                return "images/web/candado_cerrado.png";
            default:
                return "!?¿?";
        }

    }

}

/* Only for developing */
function testCode(nDay, deleteLocal = false) {
    if (deleteLocal) {
        //Esborra el localStorage
        clearCalendarStorage();
    }
    monthWorkThisProgram = month;
    day = nDay;
    let currentDiv = document.getElementById("calendari");
    //Borra el primer fill
    deleteChilds(currentDiv);
    start();
    letitsnow();
}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}

//Tria una pregunta de lla llista 'quizList'
function checkResult(questionNumber) {
    let thing = document.querySelector('input[name="quiz-element"]:checked');
    if (thing != null) {
        let posResolved = resolveList[questionNumber - 1];
        //console.log("Checked", thing.value, "Expected", posResolved);
        if (thing.value == posResolved) {
            document.getElementById("llista-" + thing.value).style.background = "green";
            let formSorpresaId = document.getElementById("form-sorpresa");
            formSorpresaId.target = "_blank"
            formSorpresaId.href = adventList[questionNumber - 1].advent;
            formSorpresaId.style.display = "block";
            return true;
        } else {
            document.getElementById("llista-" + thing.value).style.background = "red";
            return false;
        }
    }
}

function generateModalList(npregunta) {
    //Amaga el link de resposta
    document.getElementById("form-sorpresa").style.display = "none";
    let listQuizHTML = document.getElementById("llista-quiz");
    //Text de les respostes de la pregunta 'npregunta' la
    document.getElementById("quiz-text").innerText = "Quiz del Dia " + npregunta;
    document.getElementById("quiz-question").innerText = quizList[npregunta - 1].question;

    //Exemple: La 'npregunta' 18 es en la posicio 17 => 18-1
    let quizOptionsList = quizList[npregunta - 1].options;
    //Borra tots els fills
    deleteChilds(listQuizHTML);

    //Genera tants fills com opcions tingui la pregunta
    for (let i = 0; i < quizOptionsList.length; i++) {
        const element = quizOptionsList[i];
        //Crea un 'li' element 
        let liElement = document.createElement("li");
        liElement.id = "llista-" + i;
        let inputElement = document.createElement("input");
        inputElement.id = "quiz-" + i;
        inputElement.value = i;
        inputElement.name = "quiz-element"
        inputElement.type = "radio";
        //Crea un 'label' element
        let labelElement = document.createElement("label");
        labelElement.innerHTML = element;
        labelElement.setAttribute("for", "quiz-" + i);
        //Fica 'input' dins de 'li'
        liElement.appendChild(inputElement);
        //Fica 'label' dins de 'li'
        liElement.appendChild(labelElement);
        //Fica 'li' dins a 'ul'
        listQuizHTML.appendChild(liElement);
    }

    var modal = document.getElementById("modal-form");
    var btnSolution = document.getElementById("modal-btn");
    //
    btnSolution.onclick = function () {
        var isCorrectQuestion = checkResult(npregunta);
        if (isCorrectQuestion) {
            showImageOnSolutionCorrect(npregunta);
            //Mostra si quedan caselles o completat
            showProgresText();
        }
    }
    //var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal-form");
    modal.style.display = "none";

}

function showProgresText() {
    //let elementHTML = document.getElementById("fecha-caducidad")
    let caducidadList = document.getElementsByClassName("fecha-caducidad");
    for (let i = 0; i < caducidadList.length; i++) {
        const elementHTML = caducidadList[i];
        let textLink = document.createElement("a");
        textLink.className = "link-final";
        textLink.href = "https://zackproject.github.io";
        textLink.text = "zackproject.github.io";

        let textLink2 = document.createElement("a");
        textLink2.href = "https://forms.gle/cALW28N26hiGaiVc6";
        textLink2.text = "AQUI";
        textLink2.className = "link-final";

        //let texto2 = document.createElement("div");
        //texto2.innerText = "Breve encuesta";
        //texto2.appendChild(textLink2);

        elementHTML.innerText = "Resuelve la casilla de hoy";
        //elementHTML.appendChild(texto2);
    };
}

//Borra el localstorage nomes del calendari
function clearCalendarStorage() {
    Object.keys(localStorage).forEach(element => {
        if (element.includes("pdunlock")) {
            localStorage.removeItem(element)
        }
    });
}