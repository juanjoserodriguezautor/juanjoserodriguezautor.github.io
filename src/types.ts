export interface Book {
  id: string;
  title: string;
  genre: string;
  coverImage: string;
  amazonUrl?: string;
  isNew?: boolean;
  publishedYear: string;
  shortDesc: string;
  fullSynopsis: string;
  sampleExcerpt: string;
  quotes: string[];
}

export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  date: string;
  readTime?: string;
  category: string;
  summary: string;
  archiveSeries?: string;
  archiveNumber?: string;
  archiveSubtitle?: string;
  content?: string[];
  markdown?: string;
  imageUrl?: string;
  imageCaption?: string;
  relatedBookId?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}