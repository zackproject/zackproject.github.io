function loadHowToPlay() {
    let pare = document.getElementById("how-to-play");
    let indexpare = document.getElementById("index-how-to-play");
    comoJugar.forEach(e => {
        componentHowTo(pare, e)
        indexpare.innerHTML += `<li><a href="#${e.path}">${e.title}</a></li>`
    });

    var sectionId = window.location.hash.substring(1);
    if (sectionId) {
        var section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView();
        }
    }

    window.onscroll = function () { scrollBar() };

}

function componentHowTo(pare, props) {
    let h2 = document.createElement("h2");
    h2.innerText = props.title;
    //Inclou margin per l'espai del sticky
    h2.style.scrollMarginTop = document.getElementById("how-play-main").clientHeight + "px";
    h2.id = props.path;
    let desc = descFormated(props.description, props.path);
    let video = embedYT(props.video, props.title);
    pare.appendChild(h2);
    pare.appendChild(desc);
    pare.appendChild(video);
}
// Miniatura YT https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api/20542029#20542029
function embedYT(video, title) {
    let article = document.createElement("article");

    let h3_ = document.createElement("h3");
    h3_.innerText = "Video";

    var a = document.createElement("a");
    a.href = "https://www.youtube.com/embed/" + video;

    var img = document.createElement("img");
    img.src = "https://i.ytimg.com/vi/" + video + "/mqdefault.jpg";
    img.setAttribute("loading", "lazy");
    img.alt = "Click para ver el video de Youtube " + title;
    a.appendChild(img)
    article.appendChild(h3_);
    article.appendChild(a);
    // Create the iframe element
  /*  var iframe = document.createElement('iframe');
    // Set the attributes
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('src',);
    iframe.setAttribute('title', 'YouTube video player');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    */return article;

}
//Si inclueix "<br>"" crea un <p>, si inclueix "-" crea un <ul><li>
function descFormated(desc, path) {
    let article = document.createElement("article");
    let h3 = document.createElement("h3");
    h3.innerText = "Instrucciones";
    h3.id = path;
    article.appendChild(h3);
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
    let ul = document.createElement("ul");
    for (let i = 1; i < list.length; i++) {
        let li = document.createElement("li");
        li.innerText = list[i];
        ul.appendChild(li);
    }
    return ul;
}


function scrollBar() {
    //Calcula el scroll de la pagina
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    //El percentatge de la barra es segons el tros fet scroll
    document.getElementById("myBar").style.width = scrolled + "%";
    //El boto de tornar a dalt es disponible segons el scroll de la pagina
    let btnBack = document.getElementById("back-up");
    btnBack = scrolled > 10 ? btnBack.style.right = "10px" : btnBack.style.right = "-100px"
}