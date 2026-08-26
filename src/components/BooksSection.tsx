import React from 'react';
import { ShoppingBag, BookOpen, Sparkles, ExternalLink, Bookmark } from 'lucide-react';
import { BOOKS } from '../data/authorData';
import { Book } from '../types';

interface BooksSectionProps {
  onSelectBook: (book: Book) => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({ onSelectBook }) => {
  return (
    <section
      id="libros"
      aria-label="Catálogo de libros publicados"
      className="py-20 md:py-28 bg-[#F7F3EB] border-b border-[#8B2E12]/15 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-sans-clean text-xs font-semibold tracking-[0.35em] text-[#8B2E12] uppercase">
                Obras Publicadas
              </span>
              <div className="h-px bg-[#8B2E12]/30 w-16" />
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#141210] font-normal">
              Historias que desafían lo establecido
            </h2>
          </div>
          <p className="font-editorial italic text-lg text-[#685F54] max-w-md">
            Disponibles en todo el mundo a través de Amazon en edición en papel y digital para Kindle.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {BOOKS.map((book) => (
            <article
              key={book.id}
              id={`book-card-${book.id}`}
              className="bg-[#EAE3D2] rounded-lg p-6 sm:p-8 border border-[#8B2E12]/20 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between group"
            >
              {/* New Release Badge */}
              {book.isNew && (
                <div className="absolute -top-3 right-6 z-10">
                  <span className="inline-flex items-center gap-1 bg-[#8B2E12] text-[#F7F3EB] text-[10px] font-sans-clean font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-xs shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    Novedad {book.publishedYear}
                  </span>
                </div>
              )}

              {/* Main Content: Cover + Information */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start">
                
                {/* Book Cover Thumbnail with Aspect Ratio to avoid CLS */}
                <div className="sm:col-span-4 flex justify-center sm:justify-start">
                  <div
                    className="relative w-36 sm:w-full aspect-[2/3] rounded-xs overflow-hidden shadow-lg border border-[#8B2E12]/20 group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer bg-[#141210]"
                    onClick={() => onSelectBook(book)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSelectBook(book)}
                    aria-label={`Ver sinopsis de ${book.title}`}
                  >
                    <img
                      src={book.coverImage}
                      alt={`Portada del libro ${book.title}`}
                      width={200}
                      height={300}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
                  </div>
                </div>

                {/* Book Details */}
                <div className="sm:col-span-8 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="font-sans-clean text-[11px] font-medium tracking-[0.25em] text-[#8B2E12] uppercase block mb-1">
                      {book.genre}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#141210] font-normal leading-tight">
                      {book.title}
                    </h3>
                  </div>

                  <p className="font-body-sans text-xs sm:text-sm text-[#141210]/80 leading-relaxed line-clamp-4 font-normal">
                    {book.shortDesc}
                  </p>

                  {/* Highlights / Quote snippet */}
                  {book.quotes && book.quotes.length > 0 && (
                    <div className="pt-2 border-t border-[#8B2E12]/15">
                      <p className="font-editorial italic text-xs sm:text-sm text-[#685F54]">
                        {book.quotes[0]}
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-[#8B2E12]/15 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectBook(book)}
                  className="inline-flex items-center gap-2 text-xs font-sans-clean font-semibold tracking-wider text-[#141210] hover:text-[#8B2E12] uppercase transition-colors py-2"
                >
                  <BookOpen className="w-4 h-4 text-[#8B2E12]" />
                  <span>Leer sinopsis & extracto</span>
                </button>

                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] text-xs font-sans-clean uppercase tracking-[0.18em] rounded-xs transition-all duration-200 shadow-xs hover:shadow-md"
                  aria-label={`Comprar ${book.title} en Amazon (se abre en nueva pestaña)`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Comprar en Amazon</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
