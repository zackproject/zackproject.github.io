const d = new Date();

const COLORBIRTHDAY = "themebirthday";
let colorSelecionat = 'green';
var monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
function start() {
    //Emplena els dropdows de 'days' i 'month'
    fillDropdown();
    //Es la primera de les 3 opcions que carrega
    //Actualitza el dia segons els dropdowns
    changeByDay();
    // get color localy, else, set 'green'
    let colorLocal = localStorage.getItem(COLORBIRTHDAY);
    if (colorLocal !== null) {
        colorSelecionat = colorLocal;
    } else {
        localStorage.setItem(COLORBIRTHDAY, colorSelecionat)
    }
    console.log(colorLocal, colorLocal !== "" ,localStorage.getItem(COLORBIRTHDAY));
    // set selected in option of <select>
    document.getElementById('colorViewList').value = colorSelecionat;
    changeColor();
}

function updateColor() {
    //Selecciona el dropdown de color
    let colorHTML = document.getElementById("colorViewList")
    //Selecciona el color triat
    colorSelecionat = colorHTML.selectedOptions[0].value;
    localStorage.setItem(COLORBIRTHDAY, colorSelecionat);
    console.log(COLORBIRTHDAY, colorSelecionat);
    // actualitza el color
    changeColor();
}
function changeColor() {
    //Pinta els elements d'aquell color
    let nav = document.getElementById("color-header");
    let demoinfo = document.getElementById("demoinfo");
    let selectColor = document.getElementById("colorViewList");
    let btnFind = document.getElementById("fake-btn");
    selectColor.className = "dark-color-" + colorSelecionat;
    selectColor.style.color = "white";
    btnFind.className = "dark-color-" + colorSelecionat;
    nav.className = "dark-color-" + colorSelecionat;
    demoinfo.className = "dark-color-" + colorSelecionat;
    //foot.className = "dark-color-" + colorSelecionat;
    //Ingenieria  inversa, consigue el color aplicado
    let col123 = getComputedStyle(document.querySelector('.dark-color-' + colorSelecionat)).backgroundColor;
    //Aplica el mismo color al svg
    document.getElementById("sweethome").style.fill = col123;
    document.getElementById("sweetforward").style.fill = col123;
    document.getElementById("sweetbackward").style.fill = col123;

    //Selecciona els div pares de carta per posar el nou color
    let cartesList = document.getElementsByClassName("color-carta");
    //A cadascu li posem una clase que conecta amb color.css 
    for (let i = 0; i < cartesList.length; i++) {
        let element = cartesList[i];
        //Example: class='color-blue'
        element.className = "color-carta color-" + colorSelecionat;
    }
}

// Crea la carta a partir dels element passat per parametre
function createCard(element) {
    //console.log("creando carta", element.origin);
    //Crea la carta
    let carta = document.createElement("div");
    carta.className = "carta card flexitem";

    ///Clase auxiliar per cambia de color
    let colorTheme = document.createElement("div");
    colorTheme.className = "color-carta";

    //Crea el div name
    let nom = document.createElement("div");
    nom.className = "title-carta";
    nom.innerText = element.name;

    //Crea el div img
    let image = document.createElement("img");
    image.className = "image-carta";
    image.width = "200";
    image.height = "200";
    //baseUrlImage es la pagina web original
    image.src = baseUrlImage + element.character_thumb
    image.alt = "Image of " + element.name;
    image.loading = "lazy"
    //Crea el div origin
    let origin = document.createElement("div");
    origin.className = "subtitle-carta";
    origin.innerText = element.origin;
    colorTheme.appendChild(nom);
    colorTheme.appendChild(image);
    colorTheme.appendChild(origin);
    carta.appendChild(colorTheme);
    return carta;
}

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}




//Canvia de query segons l'opcio selecionada
function changeQuery(option) {
    //Primer oculta tots
    document.getElementById("byBirthday").style.display = "none";
    document.getElementById("byAnime").style.display = "none";
    document.getElementById("byCharacter").style.display = "none";
    //Segons la opcio triada, mostra un dels 3
    switch (option) {
        case 1:
            document.getElementById("byAnime").style.display = "block";
            changeByAnime();
            break;
        case 2:
            document.getElementById("byBirthday").style.display = "block";
            changeByDay()
            break;
        case 3:
            document.getElementById("byCharacter").style.display = "block";
            changeByCharacter()
            break;
    }
}

function changeByDay() {
    //El dia i el mes s'agafan de els dropdown
    let day = parseInt(document.getElementById('daysViewList').selectedOptions[0].value);
    let month = parseInt(document.getElementById('monthsViewList').selectedOptions[0].value);
    var llistat = document.getElementById("listalo");
    //Esborra els fills creats abans 
    deleteChilds(llistat);
    //Per un dia en concret es crida dia i mes
    let listArray = thisDate(day, month);

    //Crea tant element 
    listArray.forEach(element => {
        //Exmple d'insertar personatges a la llista <li>
        let ncard = createCard(element);
        llistat.appendChild(ncard);
    });
    //console.log("Day:", day, "Month", month);
    changeColor();

}

//Omple els drpdown amb mes i dia
function fillDropdown() {
    //Agafa els dos dropdown de la llista
    let lllistaMonths = document.getElementById("monthsViewList");
    let lllistadays = document.getElementById("daysViewList");

    //Bucle de elements per la list <select> months
    lllistaMonths = loopDropdown(
        llistaDOM = lllistaMonths,
        size = 12,
        date = d.getMonth() + 1,
        useText = true);

    //Bucle de elements per la list <select> days
    lllistadays = loopDropdown(
        llistaDOM = lllistadays,
        size = 31,
        date = d.getDate());
}

//Omple els dropdowns de 'days' i 'months'
function loopDropdown(llistaDOM, size, date, useText = false) {
    for (let index = 1; index <= size; index++) {
        let optSelect = document.createElement("option");
        optSelect.value = index;
        //Em cas de 'mes' escriu el text
        if (useText) {
            optSelect.innerText = monthName[index - 1];
        } else {
            //En cas 'dia' escriu numero
            optSelect.innerText = index;
        }
        //Si la 'date' es la de avui, es quedara marcada
        if (date == index) {
            optSelect.selected = "true";
        }
        //Afegeix al element creat una '<option>
        llistaDOM.appendChild(optSelect);
    }
    //retorna l'element per asignarlo fora de la funcio
    return llistaDOM;
}

//Primer tria la array de aquell mes
function thisDate(day, month) {
    switch (month) {
        case 1:
            return thisDay(januaryList, day)
        case 2:
            return thisDay(februaryList, day)
        case 3:
            return thisDay(marchList, day)
        case 4:
            return thisDay(aprilList, day)
        case 5:
            return thisDay(mayList, day)
        case 6:
            return thisDay(juneList, day)
        case 7:
            return thisDay(julyList, day)
        case 8:
            return thisDay(augustList, day)
        case 9:
            return thisDay(septemberList, day)
        case 10:
            return thisDay(octoberList, day)
        case 11:
            return thisDay(novemberList, day)
        case 12:
            return thisDay(decemberList, day)
        default:
            return null
    }
}

//Amb la array d'aquell dia es busca el dia en concret
function thisDay(list, day) {
    thisList = [];
    list.forEach(element => {
        if (element.day == day) {
            thisList.push(element)
        }
    });
    return thisList;
}


function changeByAnime() {
    let limit = 50;
    let count = 0;
    let inputAnime = document.getElementById("inputAnime");
    //De normal consulta la paraula cercada
    let query = inputAnime.value;
    //Si detecta que l'input es buit cerca el placeholder
    if (inputAnime.value == "") {
        query = inputAnime.placeholder;
    }
    var llistat = document.getElementById("listalo");

    //Esborra els fills creats abans 
    deleteChilds(llistat);
    //Recorre la array de dades.js
    for (let i = 0; i < animeList.length; i++) {
        let element = animeList[i];
        let lowQuery = element.origin.toLowerCase();
        //Si coincideix la busqueda 
        if (lowQuery.includes(query.toLowerCase())) {
            //Crea una carta i la insereix
            let ncard = createCard(element);
            llistat.appendChild(ncard);
            //Posarem un limit de cartes
            count++;
        }
        //Si es pasa del limit, es trenca el bucle
        if (count > limit) {
            break;
        }
    }
    changeColor();
}


function queryThisInput() {

}

function changeByCharacter() {
    let limit = 50;
    let count = 0;
    let inputCharacter = document.getElementById("inputCharacter");
    //De normal consulta la paraula cercada
    let query = inputCharacter.value;
    //Si detecta que l'input es buit cerca el placeholder
    if (inputCharacter.value == "") {
        query = inputCharacter.placeholder;
    }
    var llistat = document.getElementById("listalo");

    //Esborra els fills creats abans 
    deleteChilds(llistat);
    //Recorre la array de dades.js
    for (let i = 0; i < allDataList.length; i++) {
        let element = allDataList[i];
        let lowQuery = element.name.toLowerCase();
        //Si coincideix la busqueda 
        if (lowQuery.includes(query.toLowerCase())) {
            //Crea una carta i la insereix
            let ncard = createCard(element);
            llistat.appendChild(ncard);
            //Posarem un limit de cartes
            count++;
        }
        //Si es pasa del limit, es trenca el bucle
        if (count > limit) {
            break;
        }
    }
    changeColor();

}

