const categoriaList = [
  {
    "name": "Por defecto",
    "subcategoria": [
      {
        "name": "Quiz Pokemon",
        "id": 0,
      },
      {
        "name": "Quiz Shingek",
        "id": 10,
      },
      {
        "name": "Quiz Jojos",
        "id": 20,
      },
      {
        "name": "Quiz Catalunya",
        "id": 30,
      },
    ],
  },
  {
    "name": "Personalizado",
    "subcategoria": [
      {
        "name": "Ruta catalana",
        "id": 30,
      },
      /*{
        "name": "Ruta madrid",
        "id": 40,
      },*/
    ],
  },
];

const quizList = [
  {
    "id": 0,
    "question": "Qué Pokemon es un roedor",
    "options": ["Pikachu", "Squirtle", "Charmander", "Bulbasaur"],
  },
  {
    "id": 1,
    "question": "En que animal se basa Charmander",
    "options": ["Salamandra", "Hipopotamo", "Ratón", "Avestruz"],
  },
  {
    "id": 2,
    "question": "A que evoluciona Eevee con la piedra hoja",
    "options": ["Vaporeon", "Glaceon", "Leafon", "Jolteon"],
  },
  {
    "id": 3,
    "question": "Si usó 'Doble Equipo', que caracteristica augmenta",
    "options": ["Ataque", "Defensa", "Velocidad", "Evasión"],
  },
  {
    "id": 4,
    "question": "Cuál NO es un Pokemon palindromo",
    "options": ["Alomomola", "Girafarig", "Eevee", "Grimer"],
  },
  {
    "id": 5,
    "question": "Cual NO es de tipo dragon",
    "options": ["Applin", "Exeguttor Alola", "Lapras", "Salamence"],
  },
  {
    "id": 6,
    "question":
      "Según la Pokedex: 'Si hacen bullying a una persona que ha entablado amistad, quemará la casa del matón hasta los cimientos'",
    "options": ["Drampa", "Charizard", "Chansey", "Latios"],
  },
  {
    "id": 7,
    "question": "Que habilidad potencia los movimientos de su propio tipo",
    "options": ["Mutatipo", "Libero", "Adaptable", "Intrepido"],
  },
  {
    "id": 8,
    "question": "Que movimiento fue introducido en Octava Generación",
    "options": ["Hora del té", "Giro Vil", "Limpieza General", "Sustituto"],
  },
  {
    "id": 9,
    "question": "Qué baya aumenta la ataque especial",
    "options": ["Aslac", "Lichi", "Chiri", "Yapati"],
  },
  {
    "id": 10,
    "question": "A que Legión pertenecen Eren, Mikasa y Armin",
    "options": ["Reconocimiento", "Policia Militar", "Tropas Estacionarias", "A ninguna",],
  },
  {
    "id": 11,
    "question":
      "La ciudad estaba separada por 3 muros, Cuál NO es un nombre de muro",
    "options": ["Maria", "Ymir", "Rose", "Sina"],
  },
  {
    "id": 12,
    "question": "Qué arma usan contra los titanes",
    "options": ["Equipo tridimensional", "Armas de fogueo", "Espadas", "Con las manos",],
  },
  {
    "id": 13,
    "question": "Cuál es el genero de Hange Zoe",
    "options": ["Masculino", "Femenino", "Desconocido", "Ambos"],
  },
  {
    "id": 14,
    "question": "Quien NO es parte de la familia Ackerman",
    "options": ["Levi", "Kenny", "Zeke", "Mikasa"],
  },
  {
    "id": 15,
    "question": "En la primera caida del muro. Que poder titan NO participó",
    "options": ["Titan colosal", "Titan bestia", "Titan Acorazado", "Titan hembra",
    ],
  },
  {
    "id": 16,
    "question": "Cuál era la profesión de Grisha Jaegger",
    "options": ["Medico", "Militar", "Historiador", "Agricultor"],
  },
  {
    "id": 17,
    "question": "En que año cayó por primera vez el muro María",
    "options": ["En 850", "En 840", "En 854", "En 845"],
  },
  {
    "id": 18,
    "question": "Qué deporte practicaba Zeke Jaeger",
    "options": ["Fútbol", "Cricket", "Beisbol", "Baloncesto"],
  },
  {
    "id": 19,
    "question":
      "'La maldición de Ymir' dice: 'Aquellos que heredan el poder de los 9 titanes, mueren después de ...'",
    "options": ["2 decadas", "7 años", "11 años", "1 decada y 3 años"],
  },
  {
    "id": 20,
    "question": "Quien es el principal enemigo de los Joestar",
    "options": ["Dio", "Satoru", "Kars", "Yoshikage"],
  },
  {
    "id": 21,
    "question": "Que apellido decide ponerle joseph Joestar a su hija holly",
    "options": ["Brando", "Peggy", "Joestar", "Kujo"],
  },
  {
    "id": 22,
    "question": "Cuantos jojobro murieron en la tercera parte",
    "options": ["Uno", "Ninguno", "Dos", "Tres"],
  },
  {
    "id": 23,
    "question": "La frase más famosa de Joseph Joestar",
    "options": ["Gambare", "Oni chan", "Nigerundayo", "Za Warudo"],
  },
  {
    "id": 24,
    "question": "Nombre del Stan de Kakyoin",
    "options": ["Hierophant Green", "Star Platinum", "Hermit Purple", "The fool"],
  },
  {
    "id": 25,
    "question": "Josuke higashikata NO soportan que se metan con ...",
    "options": ["Sus manos", "Su pelo", "Sus ojos", "Su nariz"],
  },
  {
    "id": 26,
    "question":
      "Cual es la prisión a la que meten a la hija de Jotaro, Jolyne Cujoh:",
    "options": ["Folsom Prison", "Maxisum Prison", "Alcatraz", "Green Dolphin"],
  },
  {
    "id": 27,
    "question":
      "Qué tapadera tiene en la cárcel la persona que quiere acabar con Jolyne",
    "options": ["Un guardia", "Un cura", "Un visitante", "Un prisionero"],
  },
  {
    "id": 28,
    "question": "Cómo se llama el mejor amigo de Josuke Higashikata",
    "options": [
      "Koichi Hirose",
      "No tiene",
      "Okuyasu Nijimura",
      "Joseph Joestar",
    ],
  },
  {
    "id": 29,
    "question": "Quien es el creador de jojo's",
    "options": [
      "Eichiro Oda",
      "Kentaro Miurea",
      "Kohei Horikoshi",
      "Hirohiko Araki",
    ],
  },
  {
    "id": 30,
    "question": "Cuando es la Diada de Catalunya",
    "options": ["9 de octubre", "11 de septiembre", "2 de mayo", "9 de junio"],
  },
  {
    "id": 31,
    "question": "¿Qué famosa serie de televisión ha sido rodada en Girona?",
    "options": ["La Casa de Papel", "Elite", "Juego de Tronos", "Vikings"],
  },
  {
    "id": 32,
    "question": "¿Que significa la expresión 'Aixo es bufar i fer ampolles'?",
    "options": [
      "Va a ser facil",
      "Cuesta pero intentalo",
      "No soples fuerte",
      "Haz botellas",
    ],
  },
  {
    "id": 33,
    "question":
      "Que predica la leyenda en la ciudad de Girona, si besas el culo de la Leona?",
    "options": [
      "Te vas a caer en un charco",
      "Volveras a la ciudad",
      "Seras infeliz",
      "Te vas ha enamorar",
    ],
  },
  {
    "id": 34,
    "question":
      "¿Dónde estaba ubicada originalmente la fabrica de Anis del Mono?",
    "options": ["Badalona", "Mataró", "Manresa", "Hospitalet"],
  },
  {
    "id": 35,
    "question": "¿Qué famoso parque temático es conocido en Tarragona?",
    "options": ["Isla Magica", "Parque Warner", "Tibidabo", "PortAventura"],
  },
  {
    "id": 36,
    "question": "¿Qué anime No se emite en SX3, canal del grupo TV3?",
    "options": ["Haikyuu", "Kimetsu No Yaiba", "Black Clover", "Sword Art Online",
    ],
  },
  {
    "id": 37,
    "question": "¿Quien fue el presidente de Catalunya en 1934?",
    "options": ["Josep Irla", "Josep Tarradellas", "Lluis Companys", "Francesc Macia"],
  },
  {
    "id": 38,
    "question": "Que hora sera numéricamente 'Tres cuartos y 5 minutos de once'",
    "options": ["10:50", "10:45", "11:50", "11:45"],
  },
  {
    "id": 39,
    "question": "Si pregunto 'Es aquesta resposta correcta?' respondería:",
    "options": ["Sí, l'és", "Sí, ho és", "Si, que és", "Si, és"],
  },
  {
    "id": 40,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 41,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 42,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 43,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 44,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 45,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 46,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 47,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 48,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 49,
    "question": "",
    "options": ["", "", "", ""],
  },
  {
    "id": 50,
    "question": "",
    "options": ["", "", "", ""],
  },
];

const optionsPositionCorrect = [
  0, 0, 2, 3, 3, 2, 0, 2, 2, 3, //quizpk 0
  0, 1, 0, 2, 2, 1, 0, 3, 2, 3, //quizsnk 10
  0, 3, 3, 2, 0, 1, 3, 1, 2, 3, //quizjos 20
  1, 2, 0, 1, 0, 3, 3, 2, 0, 1, // quizcat 30
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, //quizmdz 40
];

// Tita: Creyente, amable y chismosa // Hermano: Inteligente y buena onda  // Abuelo: Sordo y viejo
// Prima: Cre"id"a, euforica y 'cool' // Shoto Sama: Duchate por favor
const nameCalling = [
  {
    "name": "Tita Elro Sario",
    "call": [
      "Hola sobrino, ¿que me llamas para que?,ah, leeme la pregunta. Yo creo que es ",
      "SOBRINO ME ESCUCHAS. Ay perdón. Estás en la TV del comedor, te vemos toda la familia ¿necesitas ayuda?. Hmm, yo marcaría ",
      "Holiiii, ¿que 'chisme' es esta vez? ¿Qué me llamas para preguntas? Hmmm, apuesto el pelo de tu tito que es ",
      "Elro al telefono, ¿digame?. Ah, hola sobrino ¿que te cuentas? ¿un concurso? Hmm pues ves marcando ",
      "Buenas sobrino, te veo y te escucho, Dios está de nuestra parte y me ha dicho que es ",
    ],
  },
  {
    "name": "Hermano Elton Tito",
    "call": [
      "Sabia que me necesitabas hermanito, te estoy viendo en directo. A ver, leyendo las opciones creo que es ",
      "Lo están haciendo bien 'brother' No pensaba que necesitarias ayuda pero bueno. Apuesto la moto que es ",
      "¿Qué estás haciendo? ¿Intentando engañar a alguien para que te ayude a ganar? Bueno, mi 190 de IQ dice que es ",
      "¿'Tete' que necesitas? Ah, una pregunta que se te ha atascado, no la veo complicada creo que es ",
    ],
  },
  {
    "name": "Abuelo Elvis Nieto",
    "call": [
      "Que no quiero publicidad, ah, ¿un concurso de mi nieto? A ver, deja que me ponga el sonotone. Vale, diria que es ",
      "Buenas a mi nieto preferido ¿Que estás en un 'transcurso'? Ah, concurso. Espera que me subo el sonotone. Hmm, yo pondría ",
      "¿Una llamada? En mis tiempos enviabas una paloma. Bueno, modernito, gana ese 'transcurso' y escribe ",
      "Buenas nieto, que raro que no te la sepas si estás todo el dia con el movil, a ver ... mi intuición de anciano dice que es ",
    ],
  },
  {
    "name": "Prima Inés Esario",
    "call": [
      "Hey primito, estoy 'living'. Sabia que llamarias a tu 'best' prima. Es un poco 'difficult' pero haria 'check' a ",
      "Buenas primo, te estoy viendo en 'live'. Estás a tope. Pero si necesitas un poco de 'help'. You can choose ",
      "Hi cousin, un poco de ayudita siempre viene bien, sobretodo de tu best prima. Pon check a ",
      "¿Estás perdidito primo? 'No problem', para eso estamos 'trust me' no hay duda es ",
    ],
  },
  {
    "name": "Shoto Sama",
    "call": [
      "Buenas futuro hokage, espera que activo el Sharigan. Hmm, veo la respuesta, deposita la confianza en ",
      "Pensabas que era Shoto Sama pero no, SOY DIO. A ver mequetrefe, ya estas tardando en poner ",
      "Esta pregunta es más dificil que entender Evangelion a la primera, Shinji votaria ",
      "Trato equivalente, yo te digo la respuesta y tu repartes el premio o pierdes un brazo, marca ",
      "Que puedo esperar de alguien que aún no se sabe la 'tabla de tipos', vamos, marca ",
    ],
  },
];

const awardsList = [
  "awards/01.wastickers",
  "awards/02.wastickers",
  "awards/03.wastickers",
  "awards/04.wastickers",
  "awards/04.wastickers",
];

const presenterList = {
  "trampa": "No se permite editar el codigo, es trampa",
  "startList": [
    "Bienvenido al concurso {}, tienes comodines disponibles y hay 10 preguntas para resolver, ¡vamos a empezar!",
    "¡Hola concursante {}! Bienvenido al juego, recuerda tienes comodines disponibles y hay 10 preguntas para resolver.",
    "Bienvenido al programa {}, tienes comodines disponibles y hay 10 preguntas para resolver, ¡suerte en el juego!",
    "¡Empecemos! Bienvenido al concurso {}, recuerda tienes comodines disponibles y hay 10 preguntas para resolver.",
    "¡Bienvenido al juego {}! Tienes comodines disponibles y hay 10 preguntas para resolver, ¡estamos listos para empezar!",
    "¡Hola concursante {}! Bienvenido al programa, recuerda tienes comodines disponibles y hay 10 preguntas para resolver.",
    "¡Este es tu momento! Bienvenido al concurso {}, recuerda tienes comodines disponibles y hay 10 preguntas para resolver.",
    "¡Bienvenido al juego {}! Tienes comodines disponibles y hay 10 preguntas para resolver, ¡vamos a empezar tu camino al premio!",
    "¡Empezamos {}! Bienvenido al programa, recuerda tienes comodines disponibles y hay 10 preguntas para resolver.",
    "¡Bienvenido al concurso {}! Tienes comodines disponibles y hay 10 preguntas para resolver, ¡vamos a empezar tu camino al premio mayor!",
  ],
  "comodinList": [
    "Recuerda, puedes pulsar el icono de la bombilla para usar comodines si lo necesitas.",
    "No tengas miedo de pulsar el icono de la bombilla para usar comodines si estás atascado.",
    "Los comodines están disponibles si los necesitas, solo pulsa el icono de la bombilla para usarlos.",
    "No dudes en pulsar el icono de la bombilla para usar un comodín si te sientes inseguro.",
    "Ten en cuenta, puedes pulsar el icono de la bombilla para usar comodines si lo necesitas.",
    "No te olvides de pulsar el icono de la bombilla para usar los comodines si te sientes perdido.",
    "Los comodines están aquí para ayudarte si los necesitas, solo pulsa el icono de la bombilla para usarlos.",
    "Si estás atascado, no dudes en pulsar el icono de la bombilla para usar un comodín.",
    "Recuerda que tienes comodines disponibles si los necesitas, solo pulsa el icono de la bombilla para usarlos.",
    "Los comodines están aquí para ayudarte en caso de duda, solo pulsa el icono de la bombilla para usarlos.",
  ],
  "failList": [
    "Lo siento {}, ha fallado la pregunta y ha perdido todo.",
    "Desafortunadamente {}, ha fallado la pregunta y se ha quedado sin premio.",
    "Lamentablemente {}, no ha acertado la pregunta y ha perdido todo.",
    "{}, la pregunta no ha sido respondida correctamente  y ha perdido todo.",
    "Ha fallado la pregunta {}, lamentablemente no ganará ningún premio.",
    "La pregunta no ha sido respondida correctamente {} y ha perdido todas sus ganancias.",
    "Desafortunadamente {}, no ha acertado la pregunta y se ha quedºdo sin premio.",
    "Lo siento {}, no ha respondido la pregunta correctamente y ha perdido todo.",
    "Lamentablemente {}, ha fallado la pregunta y su juego ha terminado.",
    "La pregunta no ha sido respondida correctamente {}, no ganará ningún premio.",
  ],
  "correctList": [
    "¡Correcto! Puede continuar con la siguiente pregunta.",
    "¡Excelente! Ha acertado la pregunta y puede continuar.",
    "¡Bien hecho! Puede continuar con la siguiente pregunta.",
    "¡Acertado! Puede continuar con el juego .",
    "¡Muy bien! Ha respondido correctamente y puede continuar con la siguiente pregunta.",
    "¡Buen trabajo! Puede continuar con la siguiente pregunta.",
    "¡Impresionante! Ha acertado la pregunta y puede continuar con el juego.",
    "¡Fantástico! Puede continuar con la siguiente pregunta.",
    "¡Genial! Ha respondido correctamente y puede seguir avanzando en el juego.",
    "¡Excelente trabajo! Puede continuar con la siguiente pregunta.",
  ],
  "winner": {
    "felicitar": [
      "¡Felicidades!",
      "¡Enhorabuena!",
      "¡Increíble!",
      "¡Genial!",
      "¡Espectacular!",
      "¡Merecido!",
      "¡Excelente!",
      "¡Enhorabuena!",
      "¡Fantástico!",
      "¡Gran trabajo!",
    ],
    "informar": "{} ha ganado el premio, puede descargarlo pulsando el botón.",
  },
};
