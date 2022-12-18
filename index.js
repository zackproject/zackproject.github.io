var cards = [
    {
        "title": "PokeHigher or Pokelower",
        "image": "https://i.imgur.com/WeM1zLU.png",
        "alt": "Card PokeHigher or PokeLower",
        "description": "Guess between two poke which poke has more or less speed, attack, defense, ... ",
        "link": "/higherlower"
    },
    {
        "title": "Poke Guess",
        "image": "https://i.imgur.com/ieg9MPg.png",
        "alt": "Card Poke guess",
        "description": "Guess between two poke which poke has more or less speed, attack, defense, ... ",
        "link": "/guess"
    },
    {
        "title": "Calendario Navidad",
        "image": "https://i.imgur.com/XbRvtk3.png",
        "alt": "Card Calendario Adviento",
        "description": "Cada dia se desbloquea una casilla. Acierta la quiz y consigue la sorpresa.Sólo disponible en diciembre",
        "link": "/navidad"
    }
];

var cartesHTML = [];




function fillCard() {
    let child = document.getElementById("carta");
    let father = document.getElementById("cartas");
    for (let i = 0; i < cards.length; i++) {
        father.appendChild(document.createElement(child));
    }


    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
    }
 
}

