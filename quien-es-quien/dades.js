// const urlparent = "https://mxndickgpuawvydrrqpe.supabase.co/storage/v1/object/public/images";

const urlparent =
  "https://raw.githubusercontent.com/zackproject/static-images/master";
let quienEsQuien = [
  {
    title: "Shingeki no Kyojin",
    characters: [
      {
        id: 0,
        name: "Armin Arlet",
        image: urlparent + "/shingeki-no-kyojin/Armin.png",
        alt: "Género Hombre adulto, Cabello rubio y corto, lleva un colgante en el cuello, una oreja completamente visible",
      },
      {
        id: 1,
        name: "Bertholdt",
        image: urlparent + "/shingeki-no-kyojin/Berholt.png",
        alt: "Género Hombre adulto, Cabello oscuro y corto, una oreja completamente visible",
      },
      {
        id: 2,
        name: "Caballo",
        image: urlparent + "/shingeki-no-kyojin/Caballo.png",
        alt: "Animal Hombre Adulto, Cabello castaño y largo, lleva colgante",
      },
      {
        id: 3,
        name: "Connie Springer",
        image: urlparent + "/shingeki-no-kyojin/Conny.png",
        alt: "Género Hombre adulto, Cabello canoso y corto, lleva un colgante en el cuello, una oreja completamente visible",
      },
      {
        id: 4,
        name: "Eren Jaeger",
        image: urlparent + "/shingeki-no-kyojin/Eren.png",
        alt: "Género Hombre adulto, Cabello castaño y largo, una oreja completamente visible",
      },
      {
        id: 5,
        name: "Erwin Smith",
        image: urlparent + "/shingeki-no-kyojin/Erwin.png",
        alt: "Género Hombre adulto, Cabello rubio y corto, dos orejas completamente visible",
      },
      {
        id: 6,
        name: "Falco Grice",
        image: urlparent + "/shingeki-no-kyojin/Falco.png",
        alt: "Género Hombre pequeño, Cabello rubio y corto, dos orejas completamente visible",
      },
      {
        id: 7,
        name: "Floch Forster",
        image: urlparent + "/shingeki-no-kyojin/Folch.png",
        alt: "Género Hombre adulto, Cabello castaño claro y corto, dos orejas completamente visible",
      },
      {
        id: 8,
        name: "Gabi Braun",
        image: urlparent + "/shingeki-no-kyojin/Gabi.png",
        alt: "Género Mujer pequeña, Cabello castaño y largo, una oreja completamente visible",
      },
      {
        id: 9,
        name: "Grisha Jaeger",
        image: urlparent + "/shingeki-no-kyojin/Grisha.png",
        alt: "Género Hombre adulto, Cabello castaño y largo, tiene vello facial, usa gafas",
      },
      {
        id: 10,
        name: "Hange Zoe",
        image: urlparent + "/shingeki-no-kyojin/Hange.png",
        alt: "Género Desconocido posiblemente mujer adulto, Cabello castaño y largo, usa gafas, lleva un colgante en el cuello, una oreja completamente visible",
      },
      {
        id: 11,
        name: "Historia",
        image: urlparent + "/shingeki-no-kyojin/Historia.png",
        alt: "Género Mujer adulta, Cabello rubio y largo, lleva un colgante en el cuello",
      },
      {
        id: 12,
        name: "Jean Kirstein",
        image: urlparent + "/shingeki-no-kyojin/Jean.png",
        alt: "Género Hombre adulto, Cabello castaño claro y largo, tiene vello facial, lleva un colgante en el cuello",
      },
      {
        id: 13,
        name: "Levi Ackerman",
        image: urlparent + "/shingeki-no-kyojin/Levi.png",
        alt: "Género Hombre adulto, Cabello oscuro y corto,, dos orejas completamente visible",
      },
      {
        id: 14,
        name: "Mikasa Ackerman",
        image: urlparent + "/shingeki-no-kyojin/Mikasa.png",
        alt: "Género Mujer adulta, Cabello oscuro y corto, una oreja completamente visible",
      },
      {
        id: 15,
        name: "Reiner Braun",
        image: urlparent + "/shingeki-no-kyojin/Reiner.png",
        alt: "Género Hombre adulto, Cabello rubio y corto, tiene vello facial, dos orejas completamente visible",
      },
      {
        id: 16,
        name: "Sasha Blouse",
        image: urlparent + "/shingeki-no-kyojin/Sasha.png",
        alt: "Género Mujer adulta, Cabello castaño claro y largo, una oreja completamente visible",
      },
      {
        id: 17,
        name: "Pieck Finger",
        image: urlparent + "/shingeki-no-kyojin/PieckFinger.png",
        alt: "Género Mujer adulta, Cabello oscuro y largo, una oreja completamente visible",
      },
      {
        id: 18,
        name: "Annie Leonhart",
        image: urlparent + "/shingeki-no-kyojin/AnnieLeonardt.png",
        alt: "Género Mujer adulta, Cabello rubio y largo, una oreja completamente visible",
      },
      {
        id: 19,
        name: "Willy Tybur",
        image: urlparent + "/shingeki-no-kyojin/WillyTybur.png",
        alt: "Género Hombre adulto, Cabello rubio y largo, tiene vello facial",
      },
      {
        id: 20,
        name: "Pixis",
        image: urlparent + "/shingeki-no-kyojin/Pixis.png",
        alt: "Género Hombre adulto, No tiene cabello, tiene vello facial, lleva un colgante en el cuello,dos orejas completamente visible",
      },
      {
        id: 21,
        name: "Zeke",
        image: urlparent + "/shingeki-no-kyojin/Zeke.png",
        alt: "Género Hombre adulto, Cabello rubio y corto, tiene vello facial, usa gafas, dos orejas completamente visible",
      },
      {
        id: 22,
        name: "Ymir Fritz",
        image: urlparent + "/shingeki-no-kyojin/Ymir.png",
        alt: "Género Mujer pequeña, Cabello rubio, y largo, ninguna oreja completamente visible",
      },
      {
        id: 23,
        name: "Marco",
        image: urlparent + "/shingeki-no-kyojin/Marco.png",
        alt: "Género Hombre adulto, Cabello castaño y corto, dos orejas completamente visible",
      },
      {
        id: 24,
        name: "Carla Jaeger",
        image: urlparent + "/shingeki-no-kyojin/CarlaJager.png",
        alt: "Género Mujer adulta, Cabello oscuro y largo, dos orejas completamente visible",
      },
      {
        id: 25,
        name: "Ymir",
        image: urlparent + "/shingeki-no-kyojin/Ymir.png",
        alt: "Género Mujer adulta, Cabello castaño y largo, una oreja completamente visible",
      },
    ],
  },
  {
    title: "Boku No Hero",
    characters: [
      {
        id: 26,
        name: "Aizawa",
        image: urlparent + "/boku-no-hero/Aizawa.jpg",
        alt: "Genero Hombre, boca visible, dientes no visibles",
      },
      {
        id: 27,
        name: "All Might",
        image: urlparent + "/boku-no-hero/AllMight.jpg",
        alt: "Genero Hombre, boca visible, dientes visibles",
      },
      {
        id: 28,
        name: "Bakugo",
        image: urlparent + "/boku-no-hero/Bakugo.jpg",
        alt: "Genero Hombre, boca visible, dientes no visibles",
      },
      {
        id: 29,
        name: "Best Jeanist",
        image: urlparent + "/boku-no-hero/BestJeanist.jpg",
        alt: "Genero Hombre,boca no visible, dientes no visibles",
      },
      {
        id: 30,
        name: "Dabi",
        image: urlparent + "/boku-no-hero/Dabi.jpg",
        alt: "Genero Hombre, boca visible, dientes no visibles",
      },
      {
        id: 31,
        name: "Deku",
        image: urlparent + "/boku-no-hero/Deku.jpg",
        alt: "Genero Hombre, boca visible, dientes no visibles",
      },
      {
        id: 32,
        name: "Director Nezu",
        image: urlparent + "/boku-no-hero/DirectorNezu.jpg",
        alt: "Genero Hombre, boca visible, dientes no visibles",
      },
      {
        id: 33,
        name: "Eijirou Kirishima",
        image: urlparent + "/boku-no-hero/EijirouKirishima.jpg",
        alt: "Genero Hombre, boca visible, dientes visibles",
      },
      {
        id: 34,
        name: "Eri Chan",
        image: urlparent + "/boku-no-hero/EriChan.jpg",
        alt: "Genero Mujer, boca visible, dientes no visibles",
      },
      {
        id: 35,
        name: "Hawks",
        image: urlparent + "/boku-no-hero/Hawks.jpg",
        alt: "Genero Hombre, boca visible, dientes no visibles",
      },
      {
        id: 36,
        name: "Himiko Toga",
        image: urlparent + "/boku-no-hero/HimikoToga.jpg",
        alt: "Genero Mujer, boca visible, dientes no visibles",
      },
      {
        id: 37,
        name: "Kyoka Jiro",
        image: urlparent + "/boku-no-hero/KyokaJiro.jpg",
        alt: "Genero Mujer, boca visible, dientes no visibles",
      },
      {
        id: 38,
        name: "La Brava",
        image: urlparent + "/boku-no-hero/LaBrava.jpg",
        alt: "Genero Mujer, boca visible, dientes visibles",
      },
      {
        id: 39,
        name: "Mina Ashido",
        image: urlparent + "/boku-no-hero/MinaAshido.jpg",
        alt: "Genero Mujer, boca visible, dientes no visibles",
      },
      {
        id: 40,
        name: "Minoru Mineta",
        image: urlparent + "/boku-no-hero/MinoruMineta.jpg",
        alt: "Genero Hombre, boca visible, dientes no visibles",
      },
      {
        id: 41,
        name: "Mirio Togata",
        image: urlparent + "/boku-no-hero/MirioTogata.jpg",
        alt: "Genero Hombre, boca visible, dientes visibles",
      },
      {
        id: 42,
        name: "Mirko",
        image: urlparent + "/boku-no-hero/Mirko.jpg",
        alt: "Genero Mujer, boca visible, dientes visibles",
      },
      {
        id: 43,
        name: "Momo Yaoyorozu",
        image: urlparent + "/boku-no-hero/MomoYaoyorozu.jpg",
        alt: "Genero Mujer, boca visible, dientes no visibles",
      },
      {
        id: 44,
        name: "Nana Shimura",
        image: urlparent + "/boku-no-hero/NanaShimura.jpg",
        alt: "Genero Mujer, boca visible, dientes no visibles",
      },
      {
        id: 45,
        name: "Ochaco Uraraka",
        image: urlparent + "/boku-no-hero/OchacoUraraka.jpg",
        alt: "Genero Mujer, boca visible, dientes no visibles",
      },
      {
        id: 46,
        name: "Shigaraki",
        image: urlparent + "/boku-no-hero/Shigaraki.jpg",
        alt: "Genero Hombre, boca visible, dientes no visibles",
      },
      {
        id: 47,
        name: "Shoto Todoroki",
        image: urlparent + "/boku-no-hero/ShotoTodoroki.jpg",
        alt: "Genero Hombre, boca visible, dientes visibles",
      },
      {
        id: 48,
        name: "Tenya Iida",
        image: urlparent + "/boku-no-hero/TenyaIida.jpg",
        alt: "Genero Hombre, boca visible, dientes no visibles",
      },
      {
        id: 49,
        name: "Toru Hagakure",
        image: urlparent + "/boku-no-hero/ToruHagakure.jpg",
        alt: "Genero Mujer, boca no visible, dientes no visibles",
      },
      {
        id: 50,
        name: "Tsuyu Asui",
        image: urlparent + "/boku-no-hero/TsuyuAsui.jpg",
        alt: "Genero Mujer, boca visible, dientes no visibles",
      },
      {
        id: 51,
        name: "Twice",
        image: urlparent + "/boku-no-hero/Twice.jpg",
        alt: "Genero Hombre, boca no visible, dientes no visibles",
      },
    ],
  },
  {
    title: "Kimetsu No Yaiba",
    characters: [
      {
        id: 53,
        name: "Akaza",
        image: urlparent + "/kimetsu-no-yaiba/Akaza.png",
        alt: "",
      },
      {
        id: 54,
        name: "Daki",
        image: urlparent + "/kimetsu-no-yaiba/Daki.png",
        alt: "",
      },
      {
        id: 55,
        name: "Doma",
        image: urlparent + "/kimetsu-no-yaiba/Doma.png",
        alt: "",
      },
      {
        id: 56,
        name: "Enmu",
        image: urlparent + "/kimetsu-no-yaiba/Enmu.png",
        alt: "",
      },
      {
        id: 57,
        name: "Genya Shinazugawa",
        image: urlparent + "/kimetsu-no-yaiba/GenyaShinazugawa.png",
        alt: "",
      },
      {
        id: 58,
        name: "Giyu Tomioka",
        image: urlparent + "/kimetsu-no-yaiba/GiyuTomioka.png",
        alt: "",
      },
      {
        id: 59,
        name: "Gyomei Himejima",
        image: urlparent + "/kimetsu-no-yaiba/GyomeiHimejima.png",
        alt: "",
      },
      {
        id: 60,
        name: "Gyutaro",
        image: urlparent + "/kimetsu-no-yaiba/Gyutaro.png",
        alt: "",
      },
      {
        id: 61,
        name: "Inosuke Hashibira",
        image: urlparent + "/kimetsu-no-yaiba/InosukeHashibira.png",
        alt: "",
      },
      {
        id: 62,
        name: "Kagaya Ubuyashiki",
        image: urlparent + "/kimetsu-no-yaiba/KagayaUbuyashiki.png",
        alt: "",
      },
      {
        id: 63,
        name: "Kanao Tsuyuri",
        image: urlparent + "/kimetsu-no-yaiba/KanaoTsuyuri.png",
        alt: "",
      },
      {
        id: 64,
        name: "Mitsuri Kanroji",
        image: urlparent + "/kimetsu-no-yaiba/MitsuriKanroji.png",
        alt: "",
      },
      {
        id: 65,
        name: "Muichiro Tokito",
        image: urlparent + "/kimetsu-no-yaiba/MuichiroTokito.png",
        alt: "",
      },
      {
        id: 66,
        name: "Muzan",
        image: urlparent + "/kimetsu-no-yaiba/Muzan.png",
        alt: "",
      },
      {
        id: 67,
        name: "Nezuko Chan",
        image: urlparent + "/kimetsu-no-yaiba/NezukoChan.png",
        alt: "",
      },
      {
        id: 68,
        name: "Obanai Iguro",
        image: urlparent + "/kimetsu-no-yaiba/ObanaiIguro.png",
        alt: "",
      },
      {
        id: 69,
        name: "Rengoku",
        image: urlparent + "/kimetsu-no-yaiba/Rengoku.png",
        alt: "",
      },
      {
        id: 70,
        name: "Rui",
        image: urlparent + "/kimetsu-no-yaiba/Rui.png",
        alt: "",
      },
      {
        id: 71,
        name: "Sabito",
        image: urlparent + "/kimetsu-no-yaiba/Sabito.png",
        alt: "",
      },
      {
        id: 72,
        name: "Sakonji Urokodaki",
        image: urlparent + "/kimetsu-no-yaiba/SakonjiUrokodaki.png",
        alt: "",
      },
      {
        id: 73,
        name: "Sanemi Shinazugawa",
        image: urlparent + "/kimetsu-no-yaiba/SanemiShinazugawa.png",
        alt: "",
      },
      {
        id: 74,
        name: "Shinobu Kocho",
        image: urlparent + "/kimetsu-no-yaiba/ShinobuKocho.png",
        alt: "",
      },
      {
        id: 75,
        name: "Susamaru",
        image: urlparent + "/kimetsu-no-yaiba/Susamaru.png",
        alt: "",
      },
      {
        id: 76,
        name: "Tanjiro Kamado",
        image: urlparent + "/kimetsu-no-yaiba/TanjroKamado.png",
        alt: "",
      },
      {
        id: 77,
        name: "Tengen Uzui",
        image: urlparent + "/kimetsu-no-yaiba/TengenUzui.png",
        alt: "",
      },
      {
        id: 78,
        name: "Zenitsu Agatsuma",
        image: urlparent + "/kimetsu-no-yaiba/ZenitsuAgatsuma.png",
        alt: "",
      },
    ],
  },
  {
    title: "Dragon Ball",
    characters: [
      {
        id: 79,
        name: "Abuelo",
        image: urlparent + "/dragon-ball/Abuelo.jpg",
        alt: "",
      },
      {
        id: 80,
        name: "Androide 17",
        image: urlparent + "/dragon-ball/Androide17.jpg",
        alt: "",
      },
      {
        id: 81,
        name: "Androide 18",
        image: urlparent + "/dragon-ball/Androide18.jpg",
        alt: "",
      },
      {
        id: 82,
        name: "Bulma",
        image: urlparent + "/dragon-ball/Bulma.jpg",
        alt: "",
      },
      {
        id: 83,
        name: "Celula",
        image: urlparent + "/dragon-ball/Celula.jpg",
        alt: "",
      },
      {
        id: 84,
        name: "Chaoz",
        image: urlparent + "/dragon-ball/Chaoz.jpg",
        alt: "",
      },
      {
        id: 85,
        name: "Chi Chi",
        image: urlparent + "/dragon-ball/ChiChi.jpg",
        alt: "",
      },
      {
        id: 86,
        name: "Freezer",
        image: urlparent + "/dragon-ball/Freezer.jpg",
        alt: "",
      },
      {
        id: 87,
        name: "Goku",
        image: urlparent + "/dragon-ball/Goku.jpg",
        alt: "",
      },
      {
        id: 88,
        name: "Krillin",
        image: urlparent + "/dragon-ball/Krillin.jpg",
        alt: "",
      },
      {
        id: 89,
        name: "Lunch",
        image: urlparent + "/dragon-ball/Lunch.jpg",
        alt: "",
      },
      {
        id: 90,
        name: "Majin Boo",
        image: urlparent + "/dragon-ball/MajinBoo.jpg",
        alt: "",
      },
      {
        id: 91,
        name: "Mr Satan",
        image: urlparent + "/dragon-ball/MrSatan.jpg",
        alt: "",
      },
      {
        id: 92,
        name: "Mutenroshi",
        image: urlparent + "/dragon-ball/Mutenroshi.jpg",
        alt: "",
      },
      {
        id: 93,
        name: "Oolong",
        image: urlparent + "/dragon-ball/Oolong.jpg",
        alt: "",
      },
      {
        id: 94,
        name: "Piccolo",
        image: urlparent + "/dragon-ball/Piccolo.jpg",
        alt: "",
      },
      {
        id: 95,
        name: "Pilaf",
        image: urlparent + "/dragon-ball/Pilaf.jpg",
        alt: "",
      },
      {
        id: 96,
        name: "Presentador",
        image: urlparent + "/dragon-ball/Presentador.jpg",
        alt: "",
      },
      {
        id: 97,
        name: "Puar",
        image: urlparent + "/dragon-ball/Puar.jpg",
        alt: "",
      },
      {
        id: 98,
        name: "Son Gohan",
        image: urlparent + "/dragon-ball/SonGohan.jpg",
        alt: "",
      },
      {
        id: 99,
        name: "Tao Pai Pai",
        image: urlparent + "/dragon-ball/TaoPaiPai.jpg",
        alt: "",
      },
      {
        id: 100,
        name: "Ten Shin Han",
        image: urlparent + "/dragon-ball/TenShinHan.jpg",
        alt: "",
      },
      {
        id: 101,
        name: "Uranai Baba",
        image: urlparent + "/dragon-ball/UranaiBaba.jpg",
        alt: "",
      },
      {
        id: 102,
        name: "Vegeta",
        image: urlparent + "/dragon-ball/Vegeta.jpg",
        alt: "",
      },
      {
        id: 103,
        name: "Yajirobe",
        image: urlparent + "/dragon-ball/Yajirobe.jpg",
        alt: "",
      },
      {
        id: 104,
        name: "Yamcha",
        image: urlparent + "/dragon-ball/Yamcha.jpg",
        alt: "",
      },
    ],
  },
  {
    title: "Code Lyoko",
    characters: [
      {
        id: 105,
        name: "Aelita",
        image: urlparent + "/code-lyoko/Aelita.jpg",
        alt: "",
      },
      {
        id: 106,
        name: "Avispa",
        image: urlparent + "/code-lyoko/Avispa.jpg",
        alt: "",
      },
      {
        id: 107,
        name: "Bloque",
        image: urlparent + "/code-lyoko/Bloque.jpg",
        alt: "",
      },
      {
        id: 108,
        name: "Cangrejo",
        image: urlparent + "/code-lyoko/Cangrejo.jpg",
        alt: "",
      },
      {
        id: 109,
        name: "Cucaracha",
        image: urlparent + "/code-lyoko/Cucaracha.jpg",
        alt: "",
      },
      {
        id: 110,
        name: "Enfermera Dorothy",
        image: urlparent + "/code-lyoko/EnfermeraDorothy.jpg",
        alt: "",
      },
      {
        id: 111,
        name: "Frank Hopper",
        image: urlparent + "/code-lyoko/FrankHopper.jpg",
        alt: "",
      },
      {
        id: 112,
        name: "Goloso",
        image: urlparent + "/code-lyoko/Goloso.jpg",
        alt: "",
      },
      {
        id: 113,
        name: "Gusano",
        image: urlparent + "/code-lyoko/Gusano.jpg",
        alt: "",
      },
      {
        id: 114,
        name: "Herb Pichon",
        image: urlparent + "/code-lyoko/HerbPichon.jpg",
        alt: "",
      },
      {
        id: 115,
        name: "Jean-Pierres Delmas",
        image: urlparent + "/code-lyoko/Jean-PierreSDelmas.jpg",
        alt: "",
      },
      {
        id: 116,
        name: "Jeremy Belpois",
        image: urlparent + "/code-lyoko/Jeremy.jpg",
        alt: "",
      },
      {
        id: 117,
        name: "Jim Morales",
        image: urlparent + "/code-lyoko/JimMorales.jpg",
        alt: "",
      },
      {
        id: 118,
        name: "Kiwi",
        image: urlparent + "/code-lyoko/Kiwi.jpg",
        alt: "",
      },
      {
        id: 119,
        name: "Kongrio",
        image: urlparent + "/code-lyoko/Kongrio.jpg",
        alt: "",
      },
      {
        id: 120,
        name: "Manta Raya",
        image: urlparent + "/code-lyoko/MantaRaya.jpg",
        alt: "",
      },
      {
        id: 121,
        name: "Milly Solovieff",
        image: urlparent + "/code-lyoko/MillySolovieff.jpg",
        alt: "",
      },
      {
        id: 122,
        name: "Nicolas Poliakoff",
        image: urlparent + "/code-lyoko/NicolasPoliakoff.jpg",
        alt: "",
      },
      {
        id: 123,
        name: "Odd Della Robbia",
        image: urlparent + "/code-lyoko/OddDellaRobbia.jpg",
        alt: "",
      },
      {
        id: 124,
        name: "Scyphozoa",
        image: urlparent + "/code-lyoko/Scyphozoa.jpg",
        alt: "",
      },
      {
        id: 125,
        name: "Sissi",
        image: urlparent + "/code-lyoko/Sisi.jpg",
        alt: "",
      },
      {
        id: 126,
        name: "Suzanne Hertz",
        image: urlparent + "/code-lyoko/SuzanneHertz.jpg",
        alt: "",
      },
      {
        id: 127,
        name: "Tamiya Diop",
        image: urlparent + "/code-lyoko/TamiyaDiop.jpg",
        alt: "",
      },
      {
        id: 128,
        name: "Tanque",
        image: urlparent + "/code-lyoko/Tanque.jpg",
        alt: "",
      },
      {
        id: 129,
        name: "Tarantula",
        image: urlparent + "/code-lyoko/Tarantula.jpg",
        alt: "",
      },
      {
        id: 130,
        name: "Ulrich Stern",
        image: urlparent + "/code-lyoko/UlrichStern.jpg",
        alt: "",
      },
      {
        id: 131,
        name: "William Dunbar",
        image: urlparent + "/code-lyoko/WilliamDunbar.jpg",
        alt: "",
      },
      {
        id: 132,
        name: "Yumi Ishiyama",
        image: urlparent + "/code-lyoko/YumiIshiyama.jpg",
        alt: "",
      },
    ],
  },
  {
    title: "Haikyuu",
    characters: [
      {
        id: 158,

        name: "Akane Yamamoto",
        image: urlparent + "/haikyuu/AkaneYamamoto.png",
        alt: "",
      },
      {
        id: 159,
        name: "Alisa Haiba",
        image: urlparent + "/haikyuu/AlisaHaiba.png",
        alt: "",
      },
      {
        id: 160,
        name: "Asahi Azumane",
        image: urlparent + "/haikyuu/AsahiAzumane.png",
        alt: "",
      },
      {
        id: 161,
        name: "Atsumu Miya",
        image: urlparent + "/haikyuu/AtsumuMiya.png",
        alt: "",
      },
      {
        id: 162,
        name: "Daichi Sawamura",
        image: urlparent + "/haikyuu/DaichiSawamura.png",
        alt: "",
      },
      {
        id: 163,
        name: "Hitoka Yachi",
        image: urlparent + "/haikyuu/HitokaYachi.png",
        alt: "",
      },
      {
        id: 164,
        name: "Keiji Akaashi",
        image: urlparent + "/haikyuu/KeijiAkaashi.png",
        alt: "",
      },
      {
        id: 165,
        name: "Keishin Uka",
        image: urlparent + "/haikyuu/KeishinUka.png",
        alt: "",
      },
      {
        id: 166,
        name: "Kei Tsukishima",
        image: urlparent + "/haikyuu/KeiTsukishima.png",
        alt: "",
      },
      {
        id: 167,
        name: "Kenma Kozume",
        image: urlparent + "/haikyuu/KenmaKozume.png",
        alt: "",
      },
      {
        id: 168,
        name: "Kiyoko Tanaka",
        image: urlparent + "/haikyuu/KiyokoTanaka.png",
        alt: "",
      },
      {
        id: 169,
        name: "Kiyoomi Sakusa",
        image: urlparent + "/haikyuu/KiyoomiSakusa.png",
        alt: "",
      },
      {
        id: 170,
        name: "Korai Hoshiumi",
        image: urlparent + "/haikyuu/KoraiHoshiumi.png",
        alt: "",
      },
      {
        id: 171,
        name: "Koshi Sugawara",
        image: urlparent + "/haikyuu/KoshiSugawara.png",
        alt: "",
      },
      {
        id: 172,
        name: "Kotaro Bokuto",
        image: urlparent + "/haikyuu/KotaroBokuto.png",
        alt: "",
      },
      {
        id: 173,
        name: "Natsu Hinata",
        image: urlparent + "/haikyuu/NatsuHinata.png",
        alt: "",
      },
      {
        id: 174,
        name: "Saeko Tanaka",
        image: urlparent + "/haikyuu/SaekoTanaka.png",
        alt: "",
      },
      {
        id: 175,
        name: "Satori Tendo",
        image: urlparent + "/haikyuu/SatoriTendo.png",
        alt: "",
      },
      {
        id: 176,
        name: "Shoyo Hinata",
        image: urlparent + "/haikyuu/ShoyoHinata.png",
        alt: "",
      },
      {
        id: 177,
        name: "Tadashi Yamaguchi",
        image: urlparent + "/haikyuu/TadashiYamaguchi.png",
        alt: "",
      },
      {
        id: 178,
        name: "Tetsuro Kuroo",
        image: urlparent + "/haikyuu/TetsuroKuroo.png",
        alt: "",
      },
      {
        id: 179,
        name: "Tobio Kageyama",
        image: urlparent + "/haikyuu/TobioKageyama.png",
        alt: "",
      },
      {
        id: 180,
        name: "Tooru Oikawa",
        image: urlparent + "/haikyuu/TooruOikawa.png",
        alt: "",
      },
      {
        id: 181,
        name: "Wakatoshi Ushijima",
        image: urlparent + "/haikyuu/WakatoshiUshijima.png",
        alt: "",
      },
      {
        id: 182,
        name: "Yui Michimiya",
        image: urlparent + "/haikyuu/YuiMichimiya.png",
        alt: "",
      },
      {
        id: 183,
        name: "Yu Nishinoya",
        image: urlparent + "/haikyuu/YuNishinoya.png",
        alt: "",
      },
    ],
  },
  {
    title: "Miraculous Ladybug",
    characters: [
      {
        id: 184,
        name: "Adrien",
        image: urlparent + "/ladybug/Adrien.webp",
        alt: "",
      },
      {
        id: 185,
        name: "Alya",
        image: urlparent + "/ladybug/Alya.webp",
        alt: "",
      },
      {
        id: 186,
        name: "Cat Noir",
        image: urlparent + "/ladybug/CatNoir.webp",
        alt: "",
      },
      {
        id: 187,
        name: "Chloe",
        image: urlparent + "/ladybug/Chloe.webp",
        alt: "",
      },
      {
        id: 188,
        name: "Daizzi",
        image: urlparent + "/ladybug/Daizzi.webp",
        alt: "",
      },
      {
        id: 189,
        name: "Emily Agreste",
        image: urlparent + "/ladybug/EmilyAgreste.webp",
        alt: "",
      },
      {
        id: 190,
        name: "Felix",
        image: urlparent + "/ladybug/Felix.webp",
        alt: "",
      },
      {
        id: 191,
        name: "Fluff",
        image: urlparent + "/ladybug/Fluff.webp",
        alt: "",
      },
      {
        id: 192,
        name: "Gabriel Agreste",
        image: urlparent + "/ladybug/GabrielAgreste.webp",
        alt: "",
      },
      {
        id: 193,
        name: "Ladybug",
        image: urlparent + "/ladybug/Ladybug.webp",
        alt: "",
      },
      {
        id: 194,
        name: "Lepidoptero",
        image: urlparent + "/ladybug/Lepidoptero.webp",
        alt: "",
      },
      {
        id: 195,
        name: "Lila",
        image: urlparent + "/ladybug/Lila.webp",
        alt: "",
      },
      {
        id: 196,
        name: "Luka",
        image: urlparent + "/ladybug/Luka.webp",
        alt: "",
      },
      {
        id: 197,
        name: "Marinette",
        image: urlparent + "/ladybug/Marinette.webp",
        alt: "",
      },
      {
        id: 198,
        name: "Nathalie",
        image: urlparent + "/ladybug/Nathalie.webp",
        alt: "",
      },
      {
        id: 199,
        name: "Nathaniel",
        image: urlparent + "/ladybug/Nathaniel.webp",
        alt: "",
      },
      {
        id: 200,
        name: "Nino",
        image: urlparent + "/ladybug/Nino.webp",
        alt: "",
      },
      {
        id: 201,
        name: "Nooroo",
        image: urlparent + "/ladybug/Nooroo.webp",
        alt: "",
      },
      {
        id: 202,
        name: "Plagg",
        image: urlparent + "/ladybug/Plagg.webp",
        alt: "",
      },
      {
        id: 203,
        name: "Pollen",
        image: urlparent + "/ladybug/Pollen.webp",
        alt: "",
      },
      {
        id: 204,
        name: "Sass",
        image: urlparent + "/ladybug/Sass.webp",
        alt: "",
      },
      {
        id: 205,
        name: "Tikki",
        image: urlparent + "/ladybug/Tikki.webp",
        alt: "",
      },
      {
        id: 206,
        name: "Trixx",
        image: urlparent + "/ladybug/Trixx.webp",
        alt: "",
      },
      {
        id: 207,
        name: "Wayzz",
        image: urlparent + "/ladybug/Wayzz.webp",
        alt: "",
      },
      {
        id: 208,
        name: "Xuppu",
        image: urlparent + "/ladybug/Xuppu.webp",
        alt: "",
      },
      {
        id: 209,
        name: "Ziggy",
        image: urlparent + "/ladybug/Ziggy.webp",
        alt: "",
      },
    ],
  },
  {
    title: "Hazbin Hotel",
    characters: [
      {
        id: 210,
        name: "Adam",
        image: urlparent + "/hazbin-hotel/adam.webp",
        alt: "",
      },
      {
        id: 211,
        name: "Alastor",
        image: urlparent + "/hazbin-hotel/alastor.webp",
        alt: "",
      },
      {
        id: 212,
        name: "Angel Dust",
        image: urlparent + "/hazbin-hotel/angeldust.webp",
        alt: "",
      },
      {
        id: 213,
        name: "Carmilla",
        image: urlparent + "/hazbin-hotel/carmillacarmine.webp",
        alt: "",
      },
      {
        id: 214,
        name: "Charlie",
        image: urlparent + "/hazbin-hotel/charlie.webp",
        alt: "",
      },
      {
        id: 215,
        name: "Cherry Bomb",
        image: urlparent + "/hazbin-hotel/cherrybomb.webp",
        alt: "",
      },
      {
        id: 216,
        name: "Emily",
        image: urlparent + "/hazbin-hotel/emily.webp",
        alt: "",
      },
      {
        id: 217,
        name: "Huevo",
        image: urlparent + "/hazbin-hotel/huevo.webp",
        alt: "",
      },
      {
        id: 218,
        name: "Husk",
        image: urlparent + "/hazbin-hotel/husk.webp",
        alt: "",
      },
      {
        id: 219,
        name: "Katie",
        image: urlparent + "/hazbin-hotel/katiekilljoy.webp",
        alt: "",
      },
      {
        id: 220,
        name: "Lucifer",
        image: urlparent + "/hazbin-hotel/lucifer.webp",
        alt: "",
      },
      {
        id: 221,
        name: "Lute",
        image: urlparent + "/hazbin-hotel/lute.webp",
        alt: "",
      },
      {
        id: 222,
        name: "Mimzy",
        image: urlparent + "/hazbin-hotel/mimzy.webp",
        alt: "",
      },
      {
        id: 223,
        name: "Niffty",
        image: urlparent + "/hazbin-hotel/niffty.webp",
        alt: "",
      },
      {
        id: 224,
        name: "Rosie",
        image: urlparent + "/hazbin-hotel/rosie.webp",
        alt: "",
      },
      {
        id: 225,
        name: "San Pedro",
        image: urlparent + "/hazbin-hotel/sanpedro.webp",
        alt: "",
      },
      {
        id: 226,
        name: "Sera",
        image: urlparent + "/hazbin-hotel/sera.webp",
        alt: "",
      },
      {
        id: 227,
        name: "Sr Pentious",
        image: urlparent + "/hazbin-hotel/sirpentious.webp",
        alt: "",
      },
      {
        id: 228,
        name: "Susan",
        image: urlparent + "/hazbin-hotel/susan.webp",
        alt: "",
      },
      {
        id: 229,
        name: "Tocinete",
        image: urlparent + "/hazbin-hotel/tocinete.webp",
        alt: "",
      },
      {
        id: 230,
        name: "Tom",
        image: urlparent + "/hazbin-hotel/tomtrench.webp",
        alt: "",
      },
      {
        id: 231,
        name: "Vaggie",
        image: urlparent + "/hazbin-hotel/vaggie.webp",
        alt: "",
      },
      {
        id: 232,
        name: "Valentino",
        image: urlparent + "/hazbin-hotel/valentino.webp",
        alt: "",
      },
      {
        id: 233,
        name: "Velvette",
        image: urlparent + "/hazbin-hotel/velvette.webp",
        alt: "",
      },
      {
        id: 234,
        name: "Vox",
        image: urlparent + "/hazbin-hotel/vox.webp",
        alt: "",
      },
      {
        id: 235,
        name: "Zestial",
        image: urlparent + "/hazbin-hotel/zestialmorde.webp",
        alt: "",
      },
    ],
  },
  {
    title: "One Punch Man",
    characters: [
      {
        id: 237,
        name: "Amai Mask",
        image: urlparent + "/one-punch-man/amaimask.webp",
        alt: "",
      },
      {
        id: 238,
        name: "Bang",
        image: urlparent + "/one-punch-man/bang.webp",
        alt: "",
      },
      {
        id: 239,
        name: "Dr Genius",
        image: urlparent + "/one-punch-man/drgenus.webp",
        alt: "",
      },
      {
        id: 240,
        name: "Flashy",
        image: urlparent + "/one-punch-man/flashy.webp",
        alt: "",
      },
      {
        id: 241,
        name: "Fubuki",
        image: urlparent + "/one-punch-man/fubuki.webp",
        alt: "",
      },
      {
        id: 242,
        name: "Garou",
        image: urlparent + "/one-punch-man/garou.webp",
        alt: "",
      },
      {
        id: 243,
        name: "Genos",
        image: urlparent + "/one-punch-man/genos.webp",
        alt: "",
      },
      {
        id: 244,
        name: "Hammer Head",
        image: urlparent + "/one-punch-man/hammerhead.webp",
        alt: "",
      },
      {
        id: 245,
        name: "King",
        image: urlparent + "/one-punch-man/king.webp",
        alt: "",
      },
      {
        id: 246,
        name: "Saitama",
        image: urlparent + "/one-punch-man/saitama.webp",
        alt: "",
      },
      {
        id: 247,
        name: "Sonic",
        image: urlparent + "/one-punch-man/sonic.webp",
        alt: "",
      },
      {
        id: 248,
        name: "Superalloy",
        image: urlparent + "/one-punch-man/superalloy.webp",
        alt: "",
      },
      {
        id: 249,
        name: "Tatsumaki",
        image: urlparent + "/one-punch-man/tatsumaki.webp",
        alt: "",
      },
      {
        id: 250,
        name: "Zombie Man",
        image: urlparent + "/one-punch-man/zombieman.webp",
        alt: "",
      },
    ],
  },
  {
    title: "Spy x Family",
    characters: [
      {
        id: 236,
        name: "Anya Forger",
        image: urlparent + "/spy-family/AnyaForger.png",
        alt: "",
      },
      {
        id: 237,
        name: "Becky Blackbell",
        image: urlparent + "/spy-family/BeckyBlackbell.png",
        alt: "",
      },
      {
        id: 238,
        name: "Bill Watkins",
        image: urlparent + "/spy-family/BillWatkins.png",
        alt: "",
      },
      {
        id: 239,
        name: "Bond Forger",
        image: urlparent + "/spy-family/BondForger.png",
        alt: "",
      },
      {
        id: 240,
        name: "Camilla",
        image: urlparent + "/spy-family/Camilla.png",
        alt: "",
      },
      {
        id: 241,
        name: "Damian Desmond",
        image: urlparent + "/spy-family/DamianDesmond.png",
        alt: "",
      },
      {
        id: 242,
        name: "DirectorHenry",
        image: urlparent + "/spy-family/DirectorHenry.png",
        alt: "",
      },
      {
        id: 243,
        name: "Donovan Desmond",
        image: urlparent + "/spy-family/DonovanDesmond.png",
        alt: "",
      },
      {
        id: 244,
        name: "Emile Elman",
        image: urlparent + "/spy-family/EmileElman.png",
        alt: "",
      },
      {
        id: 245,
        name: "Ewen Egeburg",
        image: urlparent + "/spy-family/EwenEgeburg.png",
        alt: "",
      },
      {
        id: 246,
        name: "Fiona",
        image: urlparent + "/spy-family/Fiona.png",
        alt: "",
      },
      {
        id: 247,
        name: "Franky Franklin",
        image: urlparent + "/spy-family/FrankyFranklin.png",
        alt: "",
      },
      {
        id: 248,
        name: "George Glooman",
        image: urlparent + "/spy-family/GeorgeGlooman.png",
        alt: "",
      },
      {
        id: 249,
        name: "Loid Forger",
        image: urlparent + "/spy-family/LoidForger.png",
        alt: "",
      },
      {
        id: 250,
        name: "Matthew McMahon",
        image: urlparent + "/spy-family/MatthewMcMahon.png",
        alt: "",
      },
      {
        id: 251,
        name: "Murdoch Swan",
        image: urlparent + "/spy-family/MurdochSwan.png",
        alt: "",
      },
      {
        id: 252,
        name: "Sylvia Sherwood",
        image: urlparent + "/spy-family/SylviaSherwood.png",
        alt: "",
      },
      {
        id: 253,
        name: "Walter Evans",
        image: urlparent + "/spy-family/WalterEvans.png",
        alt: "",
      },
      {
        id: 254,
        name: "Yor Forger",
        image: urlparent + "/spy-family/YorForger.png",
        alt: "",
      },
      {
        id: 255,
        name: "Yuri Briar",
        image: urlparent + "/spy-family/YuriBriar.png",
        alt: "",
      },
    ],
  },
];
