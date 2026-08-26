import { Book } from '../types';

export const AUTHOR_INFO = {
  name: 'Juan José Rodríguez',
  tagline: 'Historias donde la lógica y lo imposible se dan la mano.',
  subline: 'Escritor · Ciencia Ficción · Fantasía',
  role: 'Escritor español',
  // Puedes cambiar esta ruta por la de tu archivo local en GitHub (ej: './assets/autor.jpg') o tu URL personalizada
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    amazonUrl: 'https://www.amazon.es/dp/B0GXS3C7X2',
    isNew: true,
    publishedYear: '2025',
    shortDesc: 'Carlos Márquez es un hombre corriente con una vida tranquila… hasta que, de un día para otro, el mundo cambia para siempre. Cuando una misteriosa epidemia arrasa la civilización, Carlos se ve obligado a enfrentarse a un nuevo mundo en silencio, con ingenio y firmeza como únicas armas.',
    fullSynopsis: 'Carlos Márquez es un hombre corriente con una vida tranquila… hasta que, de un día para otro, el mundo cambia para siempre. Cuando una misteriosa epidemia arrasa la civilización, Carlos se ve obligado a enfrentarse a un nuevo mundo en silencio, con ingenio y firmeza como únicas armas.\n\nA través de las páginas de su diario personal, asistimos a la crónica íntima y sobrecogedora de la supervivencia humana frente al colapso absoluto. Una historia visceral de resiliencia, aislamiento y la búsqueda desesperada de esperanza entre las ruinas del mañana.',
    sampleExcerpt: '"Día 14 tras el silencio de las frecuencias de radio. Salí al amanecer; el aire sabe a metal oxidado y polvo frío. No hay pisadas frescas en el asfalto, solo el eco de mis propios pasos. La lógica dicta racionar las provisiones, pero la mente busca desesperadamente una señal de vida..."',
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
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    amazonUrl: 'https://www.amazon.es/dp/B0F2SRKXGL',
    isNew: false,
    publishedYear: '2024',
    shortDesc: '¿Qué pasaría si un joven científico desafiara las leyes de la física? Daniel Leos domina la gravedad cuántica y construye el Gravitón Uno. Su descubrimiento lo catapulta a la fama, pero también lo arrastra a una peligrosa espiral de envidia, traición y conspiración.',
    fullSynopsis: '¿Qué pasaría si un joven científico desafiara las leyes de la física? Daniel Leos domina la gravedad cuántica y construye el Gravitón Uno. Su descubrimiento lo catapulta a la fama mundial, pero también lo arrastra a una peligrosa espiral de envidia, espionaje corporativo y conspiraciones en las más altas esferas del poder.\n\nCuando las fuerzas que intentan arrebatarle su creación amenazan lo que más ama, Daniel comprenderá que la física no es la única ley inquebrantable: toda acción desencadena una reacción equivalente... y la venganza puede calcularse con precisión matemática.',
    sampleExcerpt: '"La ecuación brillaba en la pizarra como un desafío a dos siglos de ortodoxia. Si el cálculo era exacto, el Gravitón Uno no solo doblaría la luz; alteraría la masa inercial misma. No supe entonces que al romper la gravedad, acababa de liberar la ambición más oscura de quienes me rodeaban..."',
    quotes: [
      '«Un thriller científico implacable donde la física cuántica se cruza con la traición humana.»',
      '«Ritmo trepidante y rigor conceptual al más puro estilo de la ciencia ficción dura.»'
    ]
  }
];
