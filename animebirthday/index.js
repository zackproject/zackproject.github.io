
function fillDropdown() {
    //Agafa els dos dropdown de la llista
    let lllistaMotnhs = document.getElementById("monthsViewList");
    let lllistadays = document.getElementById("daysViewList");

    //Reciclem el bucle amb un 'if' per dia i mes
    for (let index = 1; index <= 31; index++) {
        let optSelect = document.createElement("option");
        optSelect.value = index;
        optSelect.innerText = index;
        //Al de dies fica del '1' al '31'
        lllistadays.appendChild(optSelect);
        if (index <= 12) {
            //Al de mesos li fica de '1' al '12'
            lllistaMotnhs.appendChild(optSelect);
        }
    }
}

function changeDay() {
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
        let li = document.createElement("li");
        //Exmple d'insertar personatges a la llista <li>
        li.innerText = element.name + " " + element.day + " " + element.month;
        llistat.appendChild(li);
    });

    console.log("Day:", day, "Month", month);

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

function deleteChilds(currentDiv) {
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
}