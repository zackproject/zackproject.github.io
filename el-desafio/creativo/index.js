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

    if (localStorage.getItem(ELDESAFIOLIST)) {
        let tempList = JSON.parse(localStorage.getItem(ELDESAFIOLIST));
        tempList.push(myQuiz);
        localStorage.setItem(ELDESAFIOLIST, JSON.stringify(tempList))

    } else {
        localStorage.setItem(ELDESAFIOLIST, JSON.stringify([myQuiz]))
    }
    document.getElementById("form-quiz").style.display = "block";
    document.getElementById("save-quiz").style.display = "none";
    console.log(myQuiz);
}

function createQuiz(event) {
    event.preventDefault();
    for (let i = 1; i <= 10; i++) {
        const question = document.getElementById("question-" + i);
        const answer = document.getElementsByName('answers-' + i)
        const answerList = [answer[0].value, answer[1].value, answer[2].value, answer[3].value];
        quizQuestion = new QuizQuestion(i, question.value, answerList);
        quizList.push(quizQuestion);
        // https://stackoverflow.com/questions/16975350/assign-multiple-variables-to-the-same-value-in-javascript
        question = answer[0] = answer[1] = answer[2] = answer[3] = null;
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

function uploadFile() {
    var fileReader = new FileReader();
    fileReader.readAsText(document.querySelector("#import-selector").value);
};

function exportJson() {
    // the value in select is the position on array [0,1,2] from array json localstorage
    let nId = document.getElementById("select-desafio").selectedOptions[0].value;
    let desafioList = JSON.parse(localStorage.getItem(ELDESAFIOLIST))[nId];
    downloadFile(JSON.stringify(desafioList, null, 2), "el-desafio.json", "text/plain");
}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}

function fillSelector() {
    if (localStorage.getItem(ELDESAFIOLIST) != null) {
        let select = document.getElementById("select-desafio");
        let desafioList = JSON.parse(localStorage.getItem(ELDESAFIOLIST));
        desafioList.forEach((e, i) => {
            let opt = new Option(e.name, i);
            select.appendChild(opt);
        });
    }
}

function validateJSON(jsonData, schema) {
    // Helper function to recursively validate properties
    function validateProperty(data, schema) {
        if (schema.type === "object") {
            for (const key in schema.properties) {
                if (!(key in data)) {
                    console.error(`Missing property: ${key}`);
                    return false;
                }
                if (!validateProperty(data[key], schema.properties[key])) {
                    return false;
                }
            }
            return true;
        } else if (schema.type === "array") {
            if (!Array.isArray(data)) {
                console.error("Expected array, got:", data);
                return false;
            }
            for (let i = 0; i < data.length; i++) {
                if (!validateProperty(data[i], schema.items)) {
                    return false;
                }
            }
            return true;
        } else {
            if (typeof data !== schema.type) {
                console.error(`Expected ${schema.type}, got:`, data);
                return false;
            }
            return true;
        }
    }

    return validateProperty(jsonData, schema);
}
