let tiempo = setInterval(doInBucle, 1000);
let segundos = 0;


function doInBucle() {
    if (segundos <= 30) {
        document.getElementById("time-call").innerText = format(segundos);
        segundos++;
    } else {
        clearInterval(tiempo);
    }
}

function format(segundos) {
    if (segundos < 10) {
        return "00:0" + segundos;
    }
    return "00:" + segundos;
}