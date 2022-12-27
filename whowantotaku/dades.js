const questionsList = [
    {
        "id": 0,
        "question": "¿Qué Pokemon es un ratón electrico?",
        "options": ["Pikachu", "Squirtle", "Charmander", "Bulbasaur"]
    },
    {
        "id": 1,
        "question": "¿En que animal se basa Charmander",
        "options": ["Lagartija", "Hipopotamo", "Ratón", "Avestruz"]
    },
    {
        "id": 2,
        "question": "¿A que evoluciona Eevee con la piedra hoja?",
        "options": ["Leafon", "Glaceon", "Vaporeon", "Jolteon"]
    },
    {
        "id": 3,
        "question": "Si usó 'Doble Equipo', que caracteristica augmenta",
        "options": ["Ataque", "Defensa", "Velocidad", "Evasión"]
    },
    {
        "id": 4,
        "question": "¿En que animal esta basado 'Lapras'?",
        "options": ["", "Monstruo de ", "Nessie", ""]
    },
    {
        "id": 5,
        "question": "¿Cual NO es de tipo dragon?",
        "options": ["Applin", "Exeguttor Alola", "Lapras", "Salamence"]
    },
    {
        "id": 6,
        "question": "Según la Pokedex: 'Si hacen bullying a una persona que ha entablado amistad, quemará la casa del matón hasta los cimientos' ¿de que Pokemon hablamos?",
        "options": ["Drampa", "Charizard", "Chansey", "Latios"]
    },
    {
        "id": 7,
        "question": "Que habilidad potencia los movimientos de su propio tipo",
        "options": ["Mutatipo", "Libero", "Adaptable", "Intrepido"]
    },
    {
        "id": 8,
        "question": "¿Que movimiento fue introducido en Octava Generación",
        "options": ["Hora del té", "Giro Vil", "Limpieza General", "Sustituto"]
    },
    {
        "id": 9,
        "question": "¿Qué baya aumenta la defensa especial?",
        "options": ["Maranga", "Lichi", "Maranga", "Rimoya"]
    },
    {
        "id": 10,
        "question": "¿A que Legión están pertenecen Eren, Mikasa y Armin?",
        "options": ["Reconocimiento", "Policia Militar", "Tropas Estacionarias", "A ninguna"]
    },
    {
        "id": 11,
        "question": "La ciudad estaba separada por 3 muros, ¿Cuál NO era un nombre de muro?",
        "options": ["Maria", "Ymir", "Rose", "Sina"]
    },
    {
        "id": 12,
        "question": "¿Qué arma usaba el equipo de reconociento?",
        "options": ["Equipo tridimensional", "Armas de fogueo", "Espadas", "Con las manos"]
    },
    {
        "id": 13,
        "question": "¿Cuál es el genero de Hange Zoe?",
        "options": ["Masculino", "Femenino", "Desconocido", "Ambos"]
    },
    {
        "id": 14,
        "question": "¿Quien NO es parte de la familia Ackerman?",
        "options": ["Levi", "Kenny", "Zeke", "Mikasa"]
    },
    {
        "id": 15,
        "question": "En la primera caida del muro. ¿Que poder titan NO participó?",
        "options": ["Titan colosal", "Titan bestia", "Titan Acorazado>", "Titan hembra"]
    },
    {
        "id": 16,
        "question": "¿Cuál era la profesión de Grisha Jaegger?",
        "options": ["Medico", "Militar", "Historiador", "Agricultro"]
    },
    {
        "id": 17,
        "question": "¿En que año cayó por primera vez el muro María?",
        "options": ["850", "840", "854", "845"]
    },
    {
        "id": 18,
        "question": "¿Qué deporte practicaba Zeke Jaegger?",
        "options": ["Fútbol", "Cricket", "Baloncesto", "Beisbol"]
    },
    {
        "id": 19,
        "question": "'La maldición de Ymir' dice: 'Aquellos que heredan el poder de los 9 titanes, mueren después de ...'",
        "options": ["2 decadas", "7 años", "11 años", "1 decada y 3 años"]
    },
    {
        "id": 20,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 21,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 22,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 23,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 24,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 25,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 26,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 27,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 28,
        "question": "",
        "options": ["", "", "", ""]
    },
    {
        "id": 29,
        "question": "",
        "options": ["", "", "", ""]
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