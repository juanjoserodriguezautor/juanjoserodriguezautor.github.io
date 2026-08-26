export interface Book {
  id: string;
  title: string;
  genre: string;
  coverImage: string;
  amazonUrl: string;
  isNew?: boolean;
  publishedYear: string;
  shortDesc: string;
  fullSynopsis: string;
  sampleExcerpt: string;
  quotes: string[];
}

export interface ContactFormData {
  nombre: string;
  email: string;
  asunto?: string;
  mensaje: string;
}
