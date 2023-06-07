var comoJugar = [
    {
        "title": "Calendario de Adviento",
        "description": "Calendario de Adviento con 25 casillas disponibles. Abre cada día del 1 al 25 de diciembre una casilla y resuelve el quiz que hay dentro. En ese momento quedará la casilla de ese día desbloqueada y obtendrás una sorpresa relacionada con esa pregunta. Las casillas están numeradas del 1 al 25 y solo se abrirán el día que corresponda.",
        "path": "navidad",
        "video": "https://www.youtube.com/embed/ndbs21zY_IA",
        "images": [
            { "url": "", "alt": "" },
            { "url": "", "alt": "" },
            { "url": "", "alt": "" }
        ]
    },
    {
        "title": "Calendario de Adviento",
        "description": "Calendario de Adviento con 25 casillas disponibles. Abre cada día del 1 al 25 de diciembre una casilla y resuelve el quiz que hay dentro. En ese momento quedará la casilla de ese día desbloqueada y obtendrás una sorpresa relacionada con esa pregunta. Las casillas están numeradas del 1 al 25 y solo se abrirán el día que corresponda.",
        "path": "navidad",
        "video": "https://www.youtube.com/embed/ndbs21zY_IA",
        "images": [
            { "url": "", "alt": "" },
            { "url": "", "alt": "" },
            { "url": "", "alt": "" }
        ]
    }
];


function loadHowToPlay() {
    let pare = document.getElementById("how-to-play");
    let indexpare = document.getElementById("index-how-to-play");
    comoJugar.forEach(e => {
        pare.innerHTML += componentHowTo(e);
        indexpare.innerHTML += `<li><a href="#${e.path}">${e.title}</a></li>`


    });

}

function componentHowTo(props) {
    return ` <h2 id="${props.path}">${props.title}</h2>
    <h3>Descripción</h3>
    <p>${props.description}</p>
    <h3>Video</h3>
    <iframe width="560" height="315" src="${props.video}" title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>`
}