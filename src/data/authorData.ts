import { Book } from '../types';

export const AUTHOR_INFO = {
  name: 'Juan José Rodríguez',
  tagline: 'Historias donde la lógica y lo imposible se dan la mano.',
  subline: 'Escritor · Ciencia Ficción · Fantasía',
  role: 'Escritor español',
  // Puedes cambiar esta ruta por la de tu archivo local en GitHub (ej: './assets/autor.jpg') o tu URL personalizada
  photoUrl: './portada-autor.png',
  bioParagraphs: [
    'Apasionado por la ciencia ficción desde siempre, encontré en la obra de Philip K. Dick no solo una fuente de inspiración, sino una puerta a mundos donde la realidad es solo una sugerencia.',
    'Mi amor por la literatura no se detiene ahí: la fantasía también ocupa un lugar especial en mi universo, al igual que los juegos de rol, donde la creatividad y la narrativa se entrelazan para dar vida a historias inesperadas.',
    'Cuando el trabajo me lo permite, imagino los límites de la ciencia y me sumerjo en la construcción de relatos que desafían lo establecido, donde la tecnología y el destino humano bailan en un equilibrio frágil.',
    'Mi escritura bebe de un amplio bagaje personal y literario, de lo desconocido, de las preguntas sin respuesta y de ese pequeño espacio donde la lógica y lo imposible se dan la mano.'
  ],
  socials: {
    instagram: 'https://www.instagram.com/juanjo.autor/',
    twitter: 'https://x.com/Juanjoautor',
    formspreeEndpoint: 'https://formspree.io/f/xnjobqeg'
  }
};

export const BOOKS: Book[] = [
  {
    id: 'diario-del-apocalipsis',
    title: 'El Diario del Apocalipsis',
    genre: 'Post-Apocalíptico · Ciencia Ficción',
    // Puedes sustituir con tu archivo en GitHub (ej: './assets/diario-apocalipsis.jpg')
    coverImage: './portada-apocalipsis.jpg',
    amazonUrl: 'https://www.amazon.es/dp/B0GXS3C7X2',
    isNew: true,
    publishedYear: '2026',
    shortDesc: 'Carlos Márquez es un hombre corriente con una vida tranquila… hasta que, de un día para otro, el mundo cambia para siempre. Cuando una misteriosa epidemia arrasa la civilización, Carlos se ve obligado a enfrentarse a un nuevo mundo en silencio, con ingenio y firmeza como únicas armas.',
    fullSynopsis: '«Me llamo Carlos Márquez y escribo este diario por si pudiera ayudar a alguien, aunque no lo creo posible. También lo escribo para no volverme loco en la situación en la que me encuentro» Carlos Márquez es un hombre corriente con una vida tranquila… hasta que, de un día para otro, el mundo cambia para siempre. Cuando una misteriosa epidemia arrasa la civilización en cuestión de horas, Carlos se despierta en una Soria completamente vacía. Sin saber por qué sigue vivo, sin saber si hay alguien más, decide hacer lo único que puede: seguir adelante. Narrado en primera persona a través de las páginas de su diario, El Diario del Apocalipsis es el relato íntimo de una lucha constante por la supervivencia, pero también por demostrar que, incluso cuando el mundo se apaga, hay algo en el ser humano que se niega a rendirse.',
    sampleExcerpt: '"Escribo este diario por si pudiera ayudar a alguien, aunque no lo creo posible. También lo escribo para no volverme loco en la situación en la que me encuentro. Me llamo Carlos Márquez y nací el 23 de febrero de hace 24 años en Soria (España), donde pasé mi niñez y adolescencia junto a mis padres y mi hermano pequeño. Nunca fui un buen estudiante, así que desde los quince años mi padre me obligó a trabajar en la carpintería metálica familiar. Allí me convertí en oficial soldador. Un sábado por la noche, cuando tenía veinte años, mis padres y mi hermano —que entonces tenía quince— fallecieron en un trágico accidente de tráfico, volviendo de cenar. Un puto indeseable que iba hasta las cejas de drogas y alcohol invadió el carril contrario segando sus vidas. Yo me libré porque aquella noche estaba de fiesta con mis amigos..."',
    quotes: [
      '«Una narración asfixiante y realista sobre la fragilidad de nuestra civilización.»',
      '«El diario íntimo de un hombre que se niega a rendirse en el fin del mundo.»'
    ]
  },
  {
    id: 'teorema-de-la-venganza',
    title: 'El Teorema de la Venganza',
    genre: 'Ciencia Ficción · Thriller Científico',
    // Puedes sustituir con tu archivo en GitHub (ej: './assets/teorema-venganza.jpg')
    coverImage: './portada-teorema.jpg',
    amazonUrl: 'https://www.amazon.es/dp/B0F2SRKXGL',
    isNew: false,
    publishedYear: '2025',
    shortDesc: '¿Qué pasaría si un joven científico desafiara las leyes de la física? Daniel Leos domina la gravedad cuántica y construye el Gravitón Uno. Su descubrimiento lo catapulta a la fama, pero también lo arrastra a una peligrosa espiral de envidia, traición y conspiración.',
    fullSynopsis: 'Un descubrimiento capaz de cambiar el mundo. Una traición capaz de destruir una vida. Daniel Leos tiene solo veintitrés años cuando logra lo imposible: dominar la gravedad cuántica. Junto a su familia y amigos funda Gravitón S.A. y crea el Gravitón Uno, un avión que desafía todas las leyes conocidas de la física. El éxito es inmediato. La fama, inevitable. Pero cuando el poder entra en juego, la envidia y la ambición no tardan en aparecer. Una conspiración liderada desde las más altas esferas internacionales intenta desacreditar su trabajo y borrar su nombre de la historia. Acusado injustamente y con su vida destrozada, Daniel desaparece. ¿Hasta dónde es capaz de llegar un genio al que le han robado todo? El Teorema de la Venganza es un thriller de ciencia y conspiración donde el poder, la traición y la lealtad chocan en una lucha implacable por la verdad y la justicia.',
    sampleExcerpt: '"El cansancio parecía haber marcado cada arruga en el rostro de Daniel, un cansancio que iba más allá de lo físico, penetrando hasta los rincones más profundos de su ser. Había pasado noches mal durmiendo, reflexionando sobre aquella situación desesperada en la que lo habían colocado. Cada segundo que pasaba sentía cómo una parte de su humanidad se desmoronaba, y la decisión que estaba a punto de tomar parecía un salto al vacío, sin retorno. Respiró hondo, tragándose una última pizca de duda mientras miraba a su alrededor...."',
    quotes: [
      '«Un thriller científico implacable donde la física cuántica se cruza con la traición humana.»',
      '«Ritmo trepidante y rigor conceptual al más puro estilo de la ciencia ficción dura.»'
    ]
  }
];
