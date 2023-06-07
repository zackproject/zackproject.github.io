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
        "title": "Piano",
        "description": "Toca las teclas blancas y/o negras para grabar la canción. Automáticamente verás incrementar el número de 'Notas Grabadas'. Si no te gusta lo que has tocado, puedes pulsar el botón de eliminar y empezar de nuevo. Cuando creas que está todo correcto, puedes poner un título a la canción que has grabado y darle al botón compartir. Haz clic en el enlace generado y comparte el link con otra persona. <br>Pide a la otra persona que entre al enlace que le enviaste y toque repetidamente la nota musical. Cuando crea que sabe qué canción es, puede pulsar el botón 'adivinar canción'. Pídele que escriba el título de la canción en el cuadro de texto con las letras de los recuadros. Cada vez que pulse Enter, se marcarán las letras utilizadas en blanco. Si el título es correcto, se marcarán todas las letras en verde.<br>Ten en cuenta que las opciones de 'Más opciones' varían según si están creando o adivinando la canción: Colorear: Cambia el color del teclado; Notación: Cambia la notación de cada tecla entre Solfeo, Notación Inglesa o Ninguna; Pieza Transportada: Permite subir o bajar la tonalidad de la canción que te han compartido. Pulsa el botón de la nota musical para comprobar la pieza transportada; Nueva canción: Vuelve al panel para crear una canción nueva.",
        "path": "piano",
        "video": "https://www.youtube.com/embed/ndbs21zY_IA",
        "images": [
            { "url": "", "alt": "" },
            { "url": "", "alt": "" },
            { "url": "", "alt": "" }
        ]
    },
    {
        "title": "Quien es Quien",
        "description": "Es esencial utilizar dos dispositivos distintos. Series disponibles: Shingeki No Kyojin, Haikyuu, Kimetsu No Yaiba, Boku No Hero, Edens Zero, Code Lyoko.  <br> Invita a tu oponente a abrir la misma página en su dispositivo y seleccionar la misma serie de la lista desplegable. Si la otra persona presenta dificultades visuales, puedes utilizar el ícono de accesibilidad en la esquina superior izquierda para acceder a una lista de preguntas que podrás leer en voz alta. De esta forma, podrás interactuar y hacer preguntas aunque la otra persona sea ciega mientras utilizan herramientas como VoiceOver o TalkBack para leer las imágenes. <br> Haz clic en cualquier personaje para resaltarlo sobre los demás, este sera tu personaje. Puedes cambiar de personaje antes de comenzar. Una vez que hayas decidido, presiona el botón 'Comenzar partida'. Si en algún momento deseas ver tu personaje, selecciona 'Ver mi personaje'. Realiza preguntas a tu oponente sobre características de su personaje y, para descartarlo, haz clic sobre la carta de ese personaje. Si te equivocas, puedes volver a seleccionarlo dejara de estar descartado. Para finalizar la partida, elige 'Nueva partida' y podrás seleccionar otra serie.",
        "path": "quien-es-quien",
        "video": "https://www.youtube.com/embed/ndbs21zY_IA",
        "images": [
            { "url": "", "alt": "" },
            { "url": "", "alt": "" },
            { "url": "", "alt": "" }
        ]
    },
    {
        "title": "Pokehigher or Pokelower",
        "description": "Todos los Pokémon tienen diferentes estadísticas: PS, Ataque, Defensa, Ataque Especial, Defensa Especial, Velocidad, y Total (la suma de todas las anteriores). Conociendo la información de uno de ellos, debemos adivinar si el otro Pokémon tiene más o menos de esa estadística/característica pulsando el botón 'HIGHER' si creemos que tiene más que el nuestro, o 'LOWER' si creemos que tiene menos. Si aciertas, continúa la partida y suma puntos. Si fallas, el juego termina.<br>En la parte superior, tenemos las siguientes opciones: - Max y Score: Muestra la puntuación actual y la máxima conseguida para esa categoría. Pulsando sobre el mismo, puedes ver la puntuación máxima de cada estadística de la generación elegida. - All generations: Desplegable con la opción marcada de 'Todas las generaciones', que permite elegir entre la primera, la novena generación o todas las generaciones a la vez. - Speed: Desplegable con la opción marcada 'Velocidad', que permite elegir entre las diferentes estadísticas a comparar.",
        "path": "higherlower",
        "video": "https://www.youtube.com/embed/ndbs21zY_IA",
        "images": [
            { "url": "", "alt": "" },
            { "url": "", "alt": "" },
            { "url": "", "alt": "" }
        ]
    },

];


function loadHowToPlay() {
    let pare = document.getElementById("how-to-play");
    let indexpare = document.getElementById("index-how-to-play");
    comoJugar.forEach(e => {
        componentHowTo(pare, e)
        indexpare.innerHTML += `<li><a href="#${e.path}">${e.title}</a></li>`
    });

    var sectionId = window.location.hash.substring(1);
    console.log("pedro", sectionId);
    if (sectionId) {
        var section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView();
        }
    }
}

function componentHowTo(pare, props) {
    let h2 = document.createElement("h2");
    h2.innerText = props.title;
    h2.id = props.path;
    let h3 = document.createElement("h3");
    h3.innerText = "Description";
    h3.id = props.path;
    let desc = descFormated(props.description);
    let h3_ = document.createElement("h3");
    h3_.innerText = "Video";
    let video = embedYT(props.video);
    pare.appendChild(h2);
    pare.appendChild(h3);
    pare.appendChild(desc);
    pare.appendChild(h3_);
    // pare.appendChild(video);
}

function embedYT(video) {
    // Create the iframe element
    var iframe = document.createElement('iframe');
    // Set the attributes
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('src', video);
    iframe.setAttribute('title', 'YouTube video player');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    return iframe;

}
//Si inclueix "<br>"" crea un <p>, si inclueix "-" crea un <ul><li>
function descFormated(desc) {
    let article = document.createElement("article");
    let listdesc = desc.split("<br>");
    listdesc.forEach(element => {
        if (element.includes("-")) {
            let p = document.createElement("p");
            p.innerText = element.substring(0, element.indexOf("-"));
            article.appendChild(p);
            let ulLi = element.substring(element.indexOf("-"), element.length).split("-");
            article.appendChild(listUnordered(ulLi))
        } else {
            let p = document.createElement("p");
            p.innerText = element;
            article.appendChild(p);
        }

    });
    return article;
}

function listUnordered(list) {
    console.log(list, "mi lista??");
    let ul = document.createElement("ul");
    for (let i = 1; i < list.length; i++) {
        let li = document.createElement("li");
        li.innerText = list[i];
        ul.appendChild(li);
    }
    return ul;
}