const ELDESAFIOLIST = "el-desafio-creator";
let quizList = [];

//local form

class QuizQuestion {
    constructor(id, question, options) {
        this.id = id;
        this.question = question;
        this.options = options;
    }
}

class MyQuiz {
    constructor(name, quizQuestion, solutionsList) {
        this.name = name;
        this.quizQuestion = quizQuestion;
        this.solutionsList = solutionsList;
    }
}

function loadChallenges() {
    fillSelector();
}

function toggleShowChallenge(option) {
    const createHtml = document.getElementById("create-challenge");
    const deleteHtml = document.getElementById("delete-challenge");
    const importHtml = document.getElementById("import-challenge");
    const exportHtml = document.getElementById("export-challenge");
    // lol
    createHtml.style.display = deleteHtml.style.display = importHtml.style.display = exportHtml.style.display = "none"
    switch (option) {
        case "create":
            createHtml.style.display = "block";
            break;
        case "delete":
            deleteHtml.style.display = "block";
            break;
        case "import":
            importHtml.style.display = "block";
            break;
        case "export":
            exportHtml.style.display = "block";
            break;
        default:
            console.log("No options avaliable");
            break;
    }
}


function saveQuiz(event) {
    //document.getElementById("form-quiz").style.display = "none";
    event.preventDefault();
    let selectedAnswers = [];
    // Iterar sobre cada pregunta
    let title = document.getElementById("title-quiz").value;
    for (var i = 1; i <= 10; i++) {
        let selectedOption = document.querySelector('input[name="answ-' + i + '"]:checked');
        if (selectedOption) {
            selectedAnswers.push(parseInt(selectedOption.value)); // Agregar el valor seleccionado al array
        }
    }

    let myQuiz = new MyQuiz(title, quizList, selectedAnswers)
    addDesafioLocalStorage(myQuiz);

    document.getElementById("form-quiz").style.display = "block";
    document.getElementById("save-quiz").style.display = "none";
    window.location = "../";
}

function addDesafioLocalStorage(myQuiz) {
    if (localStorage.getItem(ELDESAFIOLIST)) {
        let tempList = JSON.parse(localStorage.getItem(ELDESAFIOLIST));
        tempList.push(myQuiz);
        localStorage.setItem(ELDESAFIOLIST, JSON.stringify(tempList))
    } else {
        localStorage.setItem(ELDESAFIOLIST, JSON.stringify([myQuiz]))
    }
}

function createQuiz(event) {
    event.preventDefault();
    for (let i = 1; i <= 10; i++) {
        const question = document.getElementById("question-" + i);
        const answer = document.getElementsByName('answers-' + i)
        const answerList = [answer[0].value, answer[1].value, answer[2].value, answer[3].value];
        quizList.push(new QuizQuestion(i, question.value, answerList));
        // https://stackoverflow.com/questions/16975350/assign-multiple-variables-to-the-same-value-in-javascript
        question.value = answer[0].value = answer[1].value = answer[2].value = answer[3].value = "";
    }
    document.getElementById("form-quiz").style.display = "none";
    document.getElementById("save-quiz").style.display = "block";
    fillFormAnswer();
}

function fillFormAnswer() {
    for (let i = 0; i < 10; i++) {
        document.getElementById("quiz-text-" + (i + 1)).innerText = (i + 1) + " " + quizList[i].question;
        document.querySelector(`label[for='q${(i + 1)}-opt-1']`).innerText = quizList[i].options[0];
        document.querySelector(`label[for='q${(i + 1)}-opt-2']`).innerText = quizList[i].options[1];
        document.querySelector(`label[for='q${(i + 1)}-opt-3']`).innerText = quizList[i].options[2];
        document.querySelector(`label[for='q${(i + 1)}-opt-4']`).innerText = quizList[i].options[3];

        document.getElementById(`q${(i + 1)}-opt-1`).checked = false;
        document.getElementById(`q${(i + 1)}-opt-2`).checked = false;
        document.getElementById(`q${(i + 1)}-opt-3`).checked = false;
        document.getElementById(`q${(i + 1)}-opt-4`).checked = false;
    }
}


// https://codesandbox.io/p/sandbox/download-json-file-with-js-p9t1z?file=%2Findex.html%3A43%2C3-49%2C4
function downloadFile(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}


function exportChallenge() {
    // the value in select is the position on array [0,1,2] from array json localstorage
    let nId = document.getElementById("select-export").selectedOptions[0].value;
    let desafioList = JSON.parse(localStorage.getItem(ELDESAFIOLIST))[nId];
    downloadFile(JSON.stringify(desafioList, null, 2), "el-desafio.json", "text/plain");
}

function importChallenge(event) {
    const fileReader = new FileReader();
    const [file] = event.target.files;
    const infoHtml = document.getElementById("info-import-file");
    infoHtml.style.innerText = "";
    infoHtml.style.color = "red";
    fileReader.onload = (event) => {
        const content = event.target.result;
        try {
            const jsonData = JSON.parse(content);
            // test js vanilla
            const validation = testJson(jsonData);
            if (validation !== "200") {
                infoHtml.innerText = validation
                return;
            }
            addDesafioLocalStorage(jsonData);
            infoHtml.innerText = "El archivo '" + file.name + "' se ha importado correctamente"
            infoHtml.style.color = "green";
        } catch (error) {
            infoHtml.innerText = "El archivo '" + file.name + "' no es un formato válido"
        }
    }

    if (file) {
        fileReader.readAsText(file);
    }
    fillSelector();
}

function testJson(data) {
    if (typeof data["name"] !== "string") {
        return "ERROR: El valor 'name' no es valido"
    }
    if (!Array.isArray(data["quizQuestion"])) {
        return "ERROR: El valor 'quizQuestion' no es valido"
    }

    if (!Array.isArray(data["quizQuestion"])) {
        return "ERROR: El valor 'quizQuestion' no es valido"
    }
    if (!Array.isArray(data["solutionsList"])) {
        return "ERROR: El valor 'solutionsList' no es valido"
    }

    if (data["quizQuestion"].length !== data["solutionsList"].length) {
        return "ERROR: Las listas 'quizQuestion' y 'solutionsList' no miden lo mismo"
    }

    let testMessage = "200";
    data["quizQuestion"].forEach((element, i) => {
        // si troba un error, para el bucle i el missatge enviar sera aquest
        if (typeof element["id"] !== "number") {
            testMessage = "ERROR: El valor 'id' de la pregunta " + (i + 1) + " no es valido";
            return;
        }
        if (typeof element["question"] !== "string") {
            testMessage = "ERROR: El valor 'question' de la pregunta " + (i + 1) + " no es valido";
            return;
        }
        if (!Array.isArray(element["options"])) {
            testMessage = "ERROR: El valor 'options de la pregunta " + (i + 1) + " no es valido"
            return;
        }
    });
    return testMessage;
}

function deleteChallenge() {
    let nId = document.getElementById("select-export").selectedOptions[0].value;
    let ndesafioList = JSON.parse(localStorage.getItem(ELDESAFIOLIST));
    //  position array to remove
    ndesafioList = ndesafioList.splice(nId, 1);
    localStorage.setItem(ELDESAFIOLIST, JSON.stringify(ndesafioList));
    fillSelector();
}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}


function fillSelector() {
    if (localStorage.getItem(ELDESAFIOLIST) != null) {
        let selectDelete = document.getElementById("select-delete");
        let selectExport = document.getElementById("select-export");
        deleteChilds(selectDelete);
        deleteChilds(selectExport);
        let desafioList = JSON.parse(localStorage.getItem(ELDESAFIOLIST));
        desafioList.forEach((e, i) => {
            selectDelete.appendChild(new Option(e.name, i));
            selectExport.appendChild(new Option(e.name, i));
        });
    }
}