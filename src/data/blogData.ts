import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'navegacion-cuantica-gravedad',
    title: 'La navegación cuántica por gravedad ya existe',
    date: '31 de agosto, 2026',
    readTime: '3 min de lectura',
    category: 'Ciencia & Ficción',
    archiveSeries: 'Archivo Daniel Leos',
    archiveNumber: 'Predicción #001',
    archiveSubtitle: 'La navegación cuántica por gravedad deja de ser solo ciencia ficción',
    summary: 'Crean una tecnología de navegación que reemplaza al GPS usando sensores cuánticos ultrasensibles a la gravedad, en vez de satélites',
    markdown: `Hoy me he llevado una sorpresa.

Acabo de descubrir que la navegación cuántica por gravedad ya no es solo ciencia ficción.

### Cómo funciona

* **Usa un gravímetro cuántico:** un dispositivo que deja caer átomos ultra fríos y mide su caída con interferometría atómica (ondas de materia), logrando una sensibilidad extrema a variaciones diminutas del campo gravitatorio.
* **La Tierra no tiene una gravedad uniforme:** montañas, fosas oceánicas, densidad del subsuelo, etc. generan pequeñísimas variaciones locales, como una "huella gravitatoria" del terreno.
* **Cálculo de posición en tiempo real:** El sistema compara lo que detecta en tiempo real con mapas gravitatorios previos de esa zona, y así calcula la posición del vehículo, barco o avión, sin necesitar señal satelital.

### Por qué importa

De momento, y para no perder la costumbre, el interés principal es militar, aunque también de resiliencia: el gravímetro permite la navegación detectando variaciones mínimas en la gravedad, y a diferencia del GPS, no existe una forma realista de interferir a distancia con gravímetros cuánticos, salvo con un pulso electromagnético que dañaría toda la electrónica de la nave o vehículo. Esto lo hace inmune al bloqueo o falsificación de señales, algo cada vez más común en zonas de conflicto.

### Estado actual

La empresa australiana **Q-CTRL** ya probó su sistema (llamado *GravNav*) en el mar, resultando hasta 10 veces más preciso que los sistemas satelitales, tras haber desarrollado antes *MagNav*, un sensor similar pero basado en campos magnéticos.

Sus sensores han sido probados con vibraciones y maniobras dinámicas, incluyendo más de 140 horas de funcionamiento continuo a bordo de un buque australiano. Es más viable hoy en el mar que en tierra o aire, porque hay mejores mapas gravitatorios oceánicos disponibles.

---

Ver esta noticia me ha hecho sonreír.

Hace tiempo, cuando escribí *El Teorema de la Venganza*, imaginé a Daniel Leos desarrollando tecnologías basadas en la gravedad cuántica para hacer posible el **Gravitón Uno**.

La ciencia todavía no ha llegado hasta ahí... pero da vértigo ver cómo algunas ideas que parecían pura ciencia ficción empiezan a asomar en los laboratorios.

> *"Sin duda alguna, la realidad persigue a la ficción."*`,
    imageUrl: './navegacion-cuantica.jpg',
    imageCaption: 'Navegación cuántica por gravedad: el principio del Gravitón Uno en el mundo real.',
    relatedBookId: 'teorema-de-la-venganza',
    sourceLabel: 'Archivo y Cuaderno del Autor'
  },
  {
    id: 'lanzamiento-edicio-catala',
    title: 'Ja disponible la nova edició en català d’El Diari de l’Apocalipsi',
    date: '27 de agosto, 2026',
    readTime: '2 min de lectura',
    category: 'Lanzamiento',
    summary: 'La història d’en Carlos Márquez i la seva lluita per la supervivència en una Sòria deserta arriba ara als lectors en català.',
    markdown: `M’omple d’il·lusió anunciar que ja està disponible a Amazon la versió en català d’**El Diari de l’Apocalipsi**.

### Una lluita íntima per la supervivència

Poder apropar aquesta història de supervivència, soledat i perseverança en català era un pas que tenia moltes ganes de donar. El relat d’en Carlos Márquez enfrontant-se a un món en silenci manté tota la seva intensitat i ritme original.

> *«Em dic Carlos Márquez i escric aquest diari per si pogués ajudar algú, tot i que no crec que sigui possible. També l’escric per no tornar-me boig en la situació en què em trobo.»*

Podeu trobar-la tant en format digital com en edició física a Amazon a través de l'enllaç oficial.`,
    imageUrl: './portada-apocalipsis-cat.jpg',
    imageCaption: 'Nova portada d’El Diari de l’Apocalipsi en català.',
    relatedBookId: 'diari-del-apocalipsi',
    sourceUrl: 'https://www.amazon.es/dp/B0H34HRSFB',
    sourceLabel: 'Ver en Amazon'
  }
];