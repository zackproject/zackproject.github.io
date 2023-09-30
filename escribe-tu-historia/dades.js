// https://www.academiacanarialengua.org/diccionario/
let canarianWords = [
    {
        "word": "abamballado",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/abamballado/"
    },
    {
        "word": "abanazo",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/abanazo/"
    },
    {
        "word": "aquella",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/aquellar/"
    },
    {
        "word": "ajio",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/ajio/"
    },
    {
        "word": "bartolo",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/bartolo/"
    },
    {
        "word": "bardagada",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/bardagada/"
    },
    {
        "word": "bimba",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/bimba/"
    },
    {
        "word": "brisca",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/briscar/"
    },
    {
        "word": "cancajos",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/cancajos/"
    },
    {
        "word": "cazcarrilla",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/cazcarrilla/"
    },
    {
        "word": "caquero",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/caquero/"
    },
    {
        "word": "carrascudo",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/carrascudo/"
    },
    {
        "word": "despalilla",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/despalillar/"
    },
    {
        "word": "desperra",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/desperrar/"
    },
    {
        "word": "cho",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/cho/"
    },
    {
        "word": "deschaveta",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/deschavetarse/"
    },
    {
        "word": "endora",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/endorar/"
    },
    {
        "word": "enfolina",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/enfolinarse/"
    },
    {
        "word": "enrejada",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/enrejada/"
    },
    {
        "word": "empenarse",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/empenarse/"
    },
    {
        "word": "faicán",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/faican/"
    },
    {
        "word": "fisco",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/fisco/"
    },
    {
        "word": "fote",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/fote/"
    },
    {
        "word": "fule",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/fule/"
    },
    {
        "word": "gildana",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/gildana/"
    },
    {
        "word": "guanil",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/guanil/"
    },
    {
        "word": "güiro",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/guiro/"
    },
    {
        "word": "godo",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/godo/"
    },
    {
        "word": "haragán",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/haragan/"
    },
    {
        "word": "hormiguilla",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/hormiguilla/"
    },
    {
        "word": "hinchona",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/hinchona/"
    },
    {
        "word": "hablantín",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/hablantin/"
    },
    {
        "word": "hoto",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/hoto/"
    },
    {
        "word": "indiano",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/indiano/"
    },
    {
        "word": "ingua",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/ingua/"
    },
    {
        "word": "insalla",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/insalla/"
    },
    {
        "word": "iscariote",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/iscariote/"
    },
    {
        "word": "jarca",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/jarca/"
    },
    {
        "word": "jocicón",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/jocicon/"
    },
    {
        "word": "jumaza",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/jumaza/"
    },
    {
        "word": "jusillo",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/jusillo/"
    },
    {
        "word": "lambea",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/lambear/"
    },
    {
        "word": "lomazo",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/lomazo/"
    },
    {
        "word": "lambucear",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/lambucear/"
    },
    {
        "word": "largar",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/largar/"
    },
    {
        "word": "macanuda",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/macanuda/"
    },
    {
        "word": "malorico",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/malorico/"
    },
    {
        "word": "malpaís",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/malpaís/"
    },
    {
        "word": "margarea",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/margarear/"
    },
    {
        "word": "nabolengo",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/nabolengo/"
    },
    {
        "word": "nano",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/nano/"
    },
    {
        "word": "nombrete",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/nombrete/"
    },
    {
        "word": "nivariense",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/nivariense/"
    },
    {
        "word": "obstinarse",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/obstinarse/"
    },
    {
        "word": "opila",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/opilar/"
    },
    {
        "word": "orasa",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/orasa/"
    },
    {
        "word": "orobal",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/orobal/"
    },
    {
        "word": "paparacho",
        "definition": "https://www.academiacanarialengua.org/diccionario/entrada/paparacho/"
    }
];

// https://www.diccionari.cat/
let catalanWords = [
    { "word": "Exèrcit", "definition": "https://www.diccionari.cat/GDLC/exercit" },
    { "word": "Constitució", "definition": "https://www.diccionari.cat/GDLC/constitucio" },
    { "word": "Paradoxal", "definition": "https://www.diccionari.cat/GDLC/paradoxal" },
    { "word": "Xiuxiueja", "definition": "https://www.diccionari.cat/GDLC/xiuxiuejar" },
    { "word": "Dimensió", "definition": "https://www.diccionari.cat/GDLC/dimensio" },
    { "word": "Imprevisible", "definition": "https://www.diccionari.cat/GDLC/imprevisible" },
    { "word": "Deliberació", "definition": "https://www.diccionari.cat/GDLC/deliberacio" },
    { "word": "Singularitat", "definition": "https://www.diccionari.cat/GDLC/singularitat" },
    { "word": "Reconciliació", "definition": "https://www.diccionari.cat/GDLC/reconciliacio" },
    { "word": "Obsolescència", "definition": "https://www.diccionari.cat/GDLC/obsolescencia" },
    { "word": "Substància", "definition": "https://www.diccionari.cat/GDLC/substancia" },
    { "word": "Prodigiosament", "definition": "https://www.diccionari.cat/GDLC/prodigiosament" },
    { "word": "Llum", "definition": "https://www.diccionari.cat/GDLC/llum" },
    { "word": "Compilar", "definition": "https://www.diccionari.cat/GDLC/compilar" },
    { "word": "Indefinició", "definition": "https://www.diccionari.cat/GDLC/indefinicio" },
    { "word": "Vulgaritat", "definition": "https://www.diccionari.cat/GDLC/vulgaritat" },
    { "word": "Desigualtat", "definition": "https://www.diccionari.cat/GDLC/desigualtat" },
    { "word": "Sublimació", "definition": "https://www.diccionari.cat/GDLC/sublimacio" },
    { "word": "Fragmentació", "definition": "https://www.diccionari.cat/GDLC/fragmentacio" },
    { "word": "Consciència", "definition": "https://www.diccionari.cat/GDLC/consciencia" },
    { "word": "Peregrina", "definition": "https://www.diccionari.cat/GDLC/peregrinar" },
    { "word": "Transforma", "definition": "https://www.diccionari.cat/GDLC/transformacio" },
    { "word": "Refinament", "definition": "https://www.diccionari.cat/GDLC/refinament" },
    { "word": "Divertida", "definition": "https://www.diccionari.cat/GDLC/divertit" },
    { "word": "Resistència", "definition": "https://www.diccionari.cat/GDLC/resistencia" },
    { "word": "Perseverança", "definition": "https://www.diccionari.cat/GDLC/perseveranca" },
    { "word": "Frustració", "definition": "https://www.diccionari.cat/GDLC/frustracio" },
    { "word": "Simplicitat", "definition": "https://www.diccionari.cat/GDLC/simplicitat" },
    { "word": "Divers", "definition": "https://www.diccionari.cat/GDLC/divers" },
    { "word": "Contraposició", "definition": "https://www.diccionari.cat/GDLC/contraposicio" },
    { "word": "Sorpresa", "definition": "https://www.diccionari.cat/GDLC/sorpresa" },
    { "word": "Impuls", "definition": "https://www.diccionari.cat/GDLC/impuls" },
    { "word": "Peculiar", "definition": "https://www.diccionari.cat/GDLC/peculiar" },
    { "word": "Aparent", "definition": "https://www.diccionari.cat/GDLC/aparent" },
    { "word": "Presumpció", "definition": "https://www.diccionari.cat/GDLC/presumpcio" },
    { "word": "Parcial", "definition": "https://www.diccionari.cat/GDLC/parcial" },
    { "word": "Transparència", "definition": "https://www.diccionari.cat/GDLC/transparencia" },
    { "word": "Creativitat", "definition": "https://www.diccionari.cat/GDLC/creativitat" },
    { "word": "Imagina", "definition": "https://www.diccionari.cat/GDLC/imaginar" },
    { "word": "Precisió", "definition": "https://www.diccionari.cat/GDLC/precisio" },
    { "word": "Delicadesa", "definition": "https://www.diccionari.cat/GDLC/delicadesa" },
    { "word": "Reluctància", "definition": "https://www.diccionari.cat/GDLC/reluctancia" },
    { "word": "Integració", "definition": "https://www.diccionari.cat/GDLC/integracio" },
    { "word": "Separació", "definition": "https://www.diccionari.cat/GDLC/separacio" },
    { "word": "Anàlisi", "definition": "https://www.diccionari.cat/GDLC/analisi" },
    { "word": "Afinitat", "definition": "https://www.diccionari.cat/GDLC/afinitat" },
    { "word": "Concentració", "definition": "https://www.diccionari.cat/GDLC/concentracio" },
    { "word": "Revelació", "definition": "https://www.diccionari.cat/GDLC/revelacio" },
    { "word": "Sensibilitat", "definition": "https://www.diccionari.cat/GDLC/sensibilitat" },
    { "word": "Virtual", "definition": "https://www.diccionari.cat/GDLC/virtual" },
    { "word": "Contradicció", "definition": "https://www.diccionari.cat/GDLC/contradiccio" },
    { "word": "Autenticitat", "definition": "https://www.diccionari.cat/GDLC/autenticitat" },
    { "word": "Eufòria", "definition": "https://www.diccionari.cat/GDLC/euforia" },
    { "word": "Certesa", "definition": "https://www.diccionari.cat/GDLC/certesa" },
    { "word": "Tragèdia", "definition": "https://www.diccionari.cat/GDLC/tragedia" },
    { "word": "Malenconia", "definition": "https://www.diccionari.cat/GDLC/malenconia" },
    { "word": "Revolució", "definition": "https://www.diccionari.cat/GDLC/revolucio" },
    { "word": "Ambigüitat", "definition": "https://www.diccionari.cat/GDLC/ambiguitat" },
    { "word": "Desconegut", "definition": "https://www.diccionari.cat/GDLC/desconegut" },
    { "word": "Harmonia", "definition": "https://www.diccionari.cat/GDLC/harmonia" },
    { "word": "Ansietat", "definition": "https://www.diccionari.cat/GDLC/ansietat" },
    { "word": "Despoderar", "definition": "https://www.diccionari.cat/GDLC/despoderar" },
    { "word": "Violència", "definition": "https://www.diccionari.cat/GDLC/violencia" },
    { "word": "Gentilesa", "definition": "https://www.diccionari.cat/GDLC/gentilesa" },
    { "word": "Incert", "definition": "https://www.diccionari.cat/GDLC/incert" },
    { "word": "Coexistència", "definition": "https://www.diccionari.cat/GDLC/coexistencia" },
    { "word": "Comunicació", "definition": "https://www.diccionari.cat/GDLC/comunicacio" },
    { "word": "Explora", "definition": "https://www.diccionari.cat/GDLC/explorar" },
    { "word": "Vulnerable", "definition": "https://www.diccionari.cat/GDLC/vulnerable" },
    { "word": "Fraternitat", "definition": "https://www.diccionari.cat/GDLC/fraternitat" },
    { "word": "Despreniment", "definition": "https://www.diccionari.cat/GDLC/despreniment" },
    { "word": "Desenvolupa", "definition": "https://www.diccionari.cat/GDLC/desenvolupar" },
    { "word": "Espontani", "definition": "https://www.diccionari.cat/GDLC/espontani" },
    { "word": "Aprovació", "definition": "https://www.diccionari.cat/GDLC/aprovacio" },
    { "word": "Expressió", "definition": "https://www.diccionari.cat/GDLC/expressio" },
    { "word": "Discrepància", "definition": "https://www.diccionari.cat/GDLC/discrepancia" },
    { "word": "Autonomia", "definition": "https://www.diccionari.cat/GDLC/autonomia" },
    { "word": "Procés", "definition": "https://www.diccionari.cat/GDLC/proces" },
    { "word": "Adoració", "definition": "https://www.diccionari.cat/GDLC/adoracio" },
    { "word": "Tranquil·litat", "definition": "https://www.diccionari.cat/GDLC/tranquillitat" },
    { "word": "Tradició", "definition": "https://www.diccionari.cat/GDLC/tradicio" },
    { "word": "Intimitat", "definition": "https://www.diccionari.cat/GDLC/intimitat" },
    { "word": "Prosperitat", "definition": "https://www.diccionari.cat/GDLC/prosperitat" },
    { "word": "Desig", "definition": "https://www.diccionari.cat/GDLC/desig" },
    { "word": "Reflexió", "definition": "https://www.diccionari.cat/GDLC/reflexio" },
    { "word": "Superació", "definition": "https://www.diccionari.cat/GDLC/superacio" },
    { "word": "Lleure", "definition": "https://www.diccionari.cat/GDLC/lleure1" },
    { "word": "Brilla", "definition": "https://www.diccionari.cat/GDLC/brillar1" },
    { "word": "Expectació", "definition": "https://www.diccionari.cat/GDLC/expectacio" },
    { "word": "Compliment", "definition": "https://www.diccionari.cat/GDLC/compliment" },
    { "word": "Fascina", "definition": "https://www.diccionari.cat/GDLC/fascinar" },
    { "word": "Virtuositat", "definition": "https://www.diccionari.cat/GDLC/virtuositat" },
    { "word": "Deducció", "definition": "https://www.diccionari.cat/GDLC/deduccio" },
    { "word": "Illuminació", "definition": "https://www.diccionari.cat/GDLC/illuminacio" },
    { "word": "Decisió", "definition": "https://www.diccionari.cat/GDLC/decisio" },
    { "word": "Experiència", "definition": "https://www.diccionari.cat/GDLC/experiencia" },
    { "word": "Vibració", "definition": "https://www.diccionari.cat/GDLC/vibracio" },
    { "word": "Assumpció", "definition": "https://www.diccionari.cat/GDLC/assumpcio" },
    { "word": "Determinació", "definition": "https://www.diccionari.cat/GDLC/determinacio" },
    { "word": "figa", "definition": "https://www.diccionari.cat/GDLC/figa" },
];

// https://academia.gal/dicionario
let galicianWords = [
    { "word": "Biosbardo", "definition": "https://academia.gal/dicionario/-/termo/biosbardo" },
    { "word": "Faladoiro", "definition": "https://academia.gal/dicionario/-/termo/faladoiro" },
    { "word": "Agasallo", "definition": "https://academia.gal/dicionario/-/termo/agasallo" },
    { "word": "Baleiro", "definition": "https://academia.gal/dicionario/-/termo/baleiro" },
    { "word": "Feitizo", "definition": "https://academia.gal/dicionario/-/termo/feitizo" },
    { "word": "Canon", "definition": "https://academia.gal/dicionario/-/termo/canon" },
    { "word": "Abalar", "definition": "https://academia.gal/dicionario/-/termo/abalar" },
    { "word": "Despexar", "definition": "https://academia.gal/dicionario/-/termo/despexar" },
    { "word": "Gheada", "definition": "https://academia.gal/dicionario/-/termo/gheada" },
    { "word": "Namorar", "definition": "https://academia.gal/dicionario/-/termo/namorar" },
    { "word": "Arroutada", "definition": "https://academia.gal/dicionario/-/termo/arroutada" },
    { "word": "Botafumeiro", "definition": "https://academia.gal/dicionario/-/termo/botafumeiro" },
    { "word": "Chisco", "definition": "https://academia.gal/dicionario/-/termo/chisco" },
    { "word": "Rechouchío", "definition": "https://academia.gal/dicionario/-/termo/rechouchío" },
    { "word": "Xentil", "definition": "https://academia.gal/dicionario/-/termo/xentil" },
    { "word": "Pasamento", "definition": "https://academia.gal/dicionario/-/termo/pasamento" },
    { "word": "Abonda", "definition": "https://academia.gal/dicionario/-/termo/abonda" },
    { "word": "Chosco", "definition": "https://academia.gal/dicionario/-/termo/chosco" },
    { "word": "Barallocas", "definition": "https://academia.gal/dicionario/-/termo/barallocas" },
    { "word": "Enxebre", "definition": "https://academia.gal/dicionario/-/termo/enxebre" },
    { "word": "Luar", "definition": "https://academia.gal/dicionario/-/termo/luar" },
    { "word": "Morca", "definition": "https://academia.gal/dicionario/-/termo/morca" },
    { "word": "Parvo", "definition": "https://academia.gal/dicionario/-/termo/parvo" },
    { "word": "Saudade", "definition": "https://academia.gal/dicionario/-/termo/saudade" },
    { "word": "Xeito", "definition": "https://academia.gal/dicionario/-/termo/xeito" },
    { "word": "Rosmar", "definition": "https://academia.gal/dicionario/-/termo/rosmar" },
    { "word": "Aperta", "definition": "https://academia.gal/dicionario/-/termo/aperta" },
    { "word": "Ledicia", "definition": "https://academia.gal/dicionario/-/termo/ledicia" },
    { "word": "Rabudo", "definition": "https://academia.gal/dicionario/-/termo/rabudo" },
    { "word": "Toxo", "definition": "https://academia.gal/dicionario/-/termo/toxo" },
    { "word": "Trapallada", "definition": "https://academia.gal/dicionario/-/termo/trapallada" },
    { "word": "Fochica", "definition": "https://academia.gal/dicionario/-/termo/fochicar" },
    { "word": "Coso", "definition": "https://academia.gal/dicionario/-/termo/coso" },
    { "word": "Esmaga", "definition": "https://academia.gal/dicionario/-/termo/esmagar" },
    { "word": "Fulana", "definition": "https://academia.gal/dicionario/-/termo/fulana" },
    { "word": "Esnafrar", "definition": "https://academia.gal/dicionario/-/termo/esnafrar" },
    { "word": "Fozar", "definition": "https://academia.gal/dicionario/-/termo/fozar" },
    { "word": "Miñaxoia", "definition": "https://academia.gal/dicionario/-/termo/miñaxoia" },
    { "word": "Coitado", "definition": "https://academia.gal/dicionario/-/termo/coitado" },
    { "word": "Seica", "definition": "https://academia.gal/dicionario/-/termo/seica" },
    { "word": "Chafallada", "definition": "https://academia.gal/dicionario/-/termo/chafallada" },
    { "word": "Prea", "definition": "https://academia.gal/dicionario/-/termo/prea" },
    { "word": "Afouteza", "definition": "https://academia.gal/dicionario/-/termo/afouteza" },
    { "word": "Esmorga", "definition": "https://academia.gal/dicionario/-/termo/esmorga" },
    { "word": "Carallo", "definition": "https://academia.gal/dicionario/-/termo/carallo" },
    { "word": "Larpeiro", "definition": "https://academia.gal/dicionario/-/termo/larpeiro" },
    { "word": "Bolboreta", "definition": "https://academia.gal/dicionario/-/termo/bolboreta" },
    { "word": "Sapoconcho", "definition": "https://academia.gal/dicionario/-/termo/sapoconcho" },
    { "word": "Trapalleiro", "definition": "https://academia.gal/dicionario/-/termo/trapalleiro" },
    { "word": "Furancho", "definition": "https://academia.gal/dicionario/-/termo/furancho" },
    { "word": "Recuncar", "definition": "https://academia.gal/dicionario/-/termo/recuncar" },
    { "word": "Luscofusco", "definition": "https://academia.gal/dicionario/-/termo/luscofusco" },
    { "word": "Cruceiro", "definition": "https://academia.gal/dicionario/-/termo/cruceiro" },
    { "word": "Queimada", "definition": "https://academia.gal/dicionario/-/termo/queimada" },
    { "word": "Escarallar", "definition": "https://academia.gal/dicionario/-/termo/escarallar" },
    { "word": "Esbardalla", "definition": "https://academia.gal/dicionario/-/termo/esbardallar" },
    { "word": "Abracadabrante", "definition": "https://academia.gal/dicionario/-/termo/abracadabrante" },
    { "word": "Lea", "definition": "https://academia.gal/dicionario/-/termo/lea" },
    { "word": "Lilaina", "definition": "https://academia.gal/dicionario/-/termo/lilaina" },
    { "word": "Chincar", "definition": "https://academia.gal/dicionario/-/termo/chincar" },
    { "word": "Curruncho", "definition": "https://academia.gal/dicionario/-/termo/curruncho" },
    { "word": "Cotelear", "definition": "https://academia.gal/dicionario/-/termo/cotelear" },
    { "word": "Arrolicarse", "definition": "https://academia.gal/dicionario/-/termo/arrolicarse" },
    { "word": "Achourila", "definition": "https://academia.gal/dicionario/-/termo/achourilar" },
    { "word": "Luzada", "definition": "https://academia.gal/dicionario/-/termo/luzada" },
    { "word": "Bulebule", "definition": "https://academia.gal/dicionario/-/termo/bulebule" },
    { "word": "Alfeirar", "definition": "https://academia.gal/dicionario/-/termo/alfeirar" },
    { "word": "Garatuxa", "definition": "https://academia.gal/dicionario/-/termo/garatuxa" },
    { "word": "Apreixo", "definition": "https://academia.gal/dicionario/-/termo/apreixo" }, //aperta
    { "word": "Aloumiño", "definition": "https://academia.gal/dicionario/-/termo/aloumiño" },
    { "word": "Beldade", "definition": "https://academia.gal/dicionario/-/termo/beldade" },
    { "word": "Froallo", "definition": "https://academia.gal/dicionario/-/termo/froallo" },
    { "word": "Galopina", "definition": "https://academia.gal/dicionario/-/termo/galopina" },
    { "word": "Chega", "definition": "https://academia.gal/dicionario/-/termo/chegar" },
    { "word": "Maña", "definition": "https://academia.gal/dicionario/-/termo/maña" },
    { "word": "Feitío", "definition": "https://academia.gal/dicionario/-/termo/feitío" },
    { "word": "Bico", "definition": "https://academia.gal/dicionario/-/termo/bico" },
    { "word": "Follada", "definition": "https://academia.gal/dicionario/-/termo/follada" },
    { "word": "Tarambaina", "definition": "https://academia.gal/dicionario/-/termo/tarambaina" },
    { "word": "Rasante", "definition": "https://academia.gal/dicionario/-/termo/rasante" },
    { "word": "Desleitar", "definition": "https://academia.gal/dicionario/-/termo/desleitar" },
    { "word": "Raqueiro", "definition": "https://academia.gal/dicionario/-/termo/raqueiro" },
    { "word": "Fular", "definition": "https://academia.gal/dicionario/-/termo/fular" },
    { "word": "Marmular", "definition": "https://academia.gal/dicionario/-/termo/marmular" },
    { "word": "Paraxe", "definition": "https://academia.gal/dicionario/-/termo/paraxe" },
    { "word": "Talabarte", "definition": "https://academia.gal/dicionario/-/termo/talabarte" },
    { "word": "Rateiro", "definition": "https://academia.gal/dicionario/-/termo/rateiro" },
    { "word": "Anoxo", "definition": "https://academia.gal/dicionario/-/termo/anoxo" },
    { "word": "Brincadeira", "definition": "https://academia.gal/dicionario/-/termo/brincadeira" },
    { "word": "Inxuria", "definition": "https://academia.gal/dicionario/-/termo/inxuria" },
    { "word": "Loura", "definition": "https://academia.gal/dicionario/-/termo/loura" },
    { "word": "Zafallar", "definition": "https://academia.gal/dicionario/-/termo/zafallar" },
    { "word": "Atrancar", "definition": "https://academia.gal/dicionario/-/termo/atrancar" },
    { "word": "Ransoño", "definition": "https://academia.gal/dicionario/-/termo/ransoño" },
    { "word": "Filandra", "definition": "https://academia.gal/dicionario/-/termo/filandra" },
    { "word": "Medorra", "definition": "https://academia.gal/dicionario/-/termo/medorra" },
    { "word": "Xerbo", "definition": "https://academia.gal/dicionario/-/termo/xerbo" },
    { "word": "Chiscar", "definition": "https://academia.gal/dicionario/-/termo/chiscar" },
    { "word": "Aventar", "definition": "https://academia.gal/dicionario/-/termo/aventar" },
    { "word": "Sobranceira", "definition": "https://academia.gal/dicionario/-/termo/sobranceria" },

]


let basqueWords = [];
let valencianWords = [];
let asturianWords = [];

//Comprova si la paraula es repetida en la array
function findRepeatedWords(array) {
    const repeatedWords = [];
    for (let i = 0; i < array.length; i++) {
        const word1 = array[i].word;
        for (let j = i + 1; j < array.length; j++) {
            const word2 = array[j].word;
            if (word1 === word2 && !repeatedWords.includes(word1)) {
                repeatedWords.push(word1);
            }
        }
    }

    return repeatedWords;
}
//const repeatedWords = findRepeatedWords(catalanWords);
//console.log("Repeated words:");
//console.log(repeatedWords);