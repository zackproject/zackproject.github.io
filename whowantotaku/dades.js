const quizList = [
    {
        "id": 0,
        "question": "Qué Pokemon es un ratón electrico",
        "options": ["Pikachu", "Squirtle", "Charmander", "Bulbasaur"]
    },
    {
        "id": 1,
        "question": "En que animal se basa Charmander",
        "options": ["Lagartija", "Hipopotamo", "Ratón", "Avestruz"]
    },
    {
        "id": 2,
        "question": "A que evoluciona Eevee con la piedra hoja",
        "options": ["Vaporeon", "Glaceon", "Leafon", "Jolteon"]
    },
    {
        "id": 3,
        "question": "Si usó 'Doble Equipo', que caracteristica augmenta",
        "options": ["Ataque", "Defensa", "Velocidad", "Evasión"]
    },
    {
        "id": 4,
        "question": "Cuál NO es un Pokemon palindromo",
        "options": ["Alomomola", "Girafarig", "Eevee", "Grimer"]
    },
    {
        "id": 5,
        "question": "Cual NO es de tipo dragon",
        "options": ["Applin", "Exeguttor Alola", "Lapras", "Salamence"]
    },
    {
        "id": 6,
        "question": "Según la Pokedex: 'Si hacen bullying a una persona que ha entablado amistad, quemará la casa del matón hasta los cimientos'",
        "options": ["Drampa", "Charizard", "Chansey", "Latios"]
    },
    {
        "id": 7,
        "question": "Que habilidad potencia los movimientos de su propio tipo",
        "options": ["Mutatipo", "Libero", "Adaptable", "Intrepido"]
    },
    {
        "id": 8,
        "question": "Que movimiento fue introducido en Octava Generación",
        "options": ["Hora del té", "Giro Vil", "Limpieza General", "Sustituto"]
    },
    {
        "id": 9,
        "question": "Qué baya aumenta la ataque especial",
        "options": ["Aslac", "Lichi", "Chiri", "Yapati"]
    },
    {
        "id": 10,
        "question": "A que Legión pertenecen Eren, Mikasa y Armin",
        "options": ["Reconocimiento", "Policia Militar", "Tropas Estacionarias", "A ninguna"]
    },
    {
        "id": 11,
        "question": "La ciudad estaba separada por 3 muros, Cuál NO es un nombre de muro",
        "options": ["Maria", "Ymir", "Rose", "Sina"]
    },
    {
        "id": 12,
        "question": "Qué arma usan contra los titanes",
        "options": ["Equipo tridimensional", "Armas de fogueo", "Espadas", "Con las manos"]
    },
    {
        "id": 13,
        "question": "Cuál es el genero de Hange Zoe",
        "options": ["Masculino", "Femenino", "Desconocido", "Ambos"]
    },
    {
        "id": 14,
        "question": "Quien NO es parte de la familia Ackerman",
        "options": ["Levi", "Kenny", "Zeke", "Mikasa"]
    },
    {
        "id": 15,
        "question": "En la primera caida del muro. Que poder titan NO participó",
        "options": ["Titan colosal", "Titan bestia", "Titan Acorazado", "Titan hembra"]
    },
    {
        "id": 16,
        "question": "Cuál era la profesión de Grisha Jaegger",
        "options": ["Medico", "Militar", "Historiador", "Agricultor"]
    },
    {
        "id": 17,
        "question": "En que año cayó por primera vez el muro María",
        "options": ["En 850", "En 840", "En 854", "En 845"]
    },
    {
        "id": 18,
        "question": "Qué deporte practicaba Zeke Jaeger",
        "options": ["Fútbol", "Cricket", "Beisbol", "Baloncesto"]
    },
    {
        "id": 19,
        "question": "'La maldición de Ymir' dice: 'Aquellos que heredan el poder de los 9 titanes, mueren después de ...'",
        "options": ["2 decadas", "7 años", "11 años", "1 decada y 3 años"]
    },
    {
        "id": 20, "question": "Quien es el principal enemigo de los Joestar",
        "options": ["Dio", "Satoru", "Kars", "Yoshikage"]
    },
    {
        "id": 21,
        "question": "Que apellido decide ponerle joseph Joestar a su hija holly",
        "options": ["Brando", "Peggy", "Joestar", "Kujo"]
    },
    {
        "id": 22,
        "question": "Cuantos jojobro murieron en la tercera parte",
        "options": ["Uno", "Ninguno", "Dos", "Tres"]
    },
    {
        "id": 23,
        "question": "La frase más famosa de Joseph Joestar",
        "options": ["Gambare", "Oni chan", "Nigerundayo", "Za Warudo"]
    },
    {
        "id": 24,
        "question": "Nombre del Stan de Kakyoin",
        "options": ["Hierophant Green", "Star Platinum", "Hermit Purple", "The fool"]
    },
    {
        "id": 25,
        "question": "Josuke higashikata NO soportan que se metan con ...",
        "options": ["Sus manos", "Su pelo", "Sus ojos", "Su nariz"]
    },
    {
        "id": 26,
        "question": "Cual es la prisión a la que meten a la hija de Jotaro, Jolyne Cujoh:",
        "options": ["Folsom Prison", "Maxisum Prison", "Alcatraz", "Green Dolphin"]
    },
    {
        "id": 27,
        "question": "Qué tapadera tiene en la cárcel la persona que quiere acabar con Jolyne",
        "options": ["Un guardia", "Un cura", "Un visitante", "Un prisionero"]
    },
    {
        "id": 28,
        "question": "Cómo se llama el mejor amigo de Josuke Higashikata",
        "options": ["Koichi Hirose", "No tiene", "Okuyasu Nijimura", "Joseph Joestar"]
    },
    {
        "id": 29,
        "question": "Quien es el creador de jojo's",
        "options": ["Eichiro Oda", "Kentaro Miurea", "Kohei Horikoshi", "Hirohiko Araki"]
    },
    {
        "id": 30,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 31,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 32,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 33,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 34,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 35,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 36,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 37,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 38,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 39,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 40,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 41,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 42,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 43,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 44,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 45,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 46,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 47,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 48,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 49,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 50,
        "question": "",
        "options": ["", "", "", ""]
    }
];

const optionsPositionCorrect = [
    0, 0, 2, 3, 3, 3, 0, 2, 0, 3, //quizpk 0
    0, 1, 0, 2, 2, 1, 0, 3, 2, 3, //quizsnk 10
    0, 3, 3, 2, 0, 1, 3, 1, 2, 3 //quizjos 20
]


const nameCalling = [
    {
        "name": "Tita Rosa Melano",
        "call": [
            "Hola sobrino, ¿que me llamas para que?,ah, leeme la pregunta. Yo creo que es la ",
            "SOBRINO ME ESCUCHAS. Ay perdón. Estás en la TV del comedor, te vemos toda la familia ¿necesitas ayuda?. Hmm, yo marcaría la "],
    },
    {
        "name": "Hermano Elton Tito",
        "call": [
            "Sabia que me necesitabas hermanito, te estoy viendo en directo. A ver, leyendo las opciones creo que es la ",
            "Lo están haciendo bien 'brother' No pensaba que necesitarias ayuda pero bueno. Apuesto la moto que es la "],
    },
    {
        "name": "Abuelo Elvis Nieto",
        "call": [
            "Que no quiero publicidad, ah, ¿un concurso de mi nieto? A ver, deja que me ponga el sonotone. Vale, diria que es la ",
            "Buenas a mi nieto preferido ¿Que estás en un 'transcuro'? Ah, concurso. Espera que me subo el sonotone. Hmm, yo pondría la "],
    },
    {
        "name": "Prima Inés Esario",
        "call": ["Hey primito, estoy 'living' con este concurso. Sabia que llamarias a tu 'best' prima. Esta pregunta es un poco 'difficult'. Yo haria 'check' a la ",
            "Buenas primo, te estoy viendo en el 'live' de mi 'smarthphone'. Estás a tope. Pero si necesitas un poco de 'help'. You can choose the "],
    },
]
