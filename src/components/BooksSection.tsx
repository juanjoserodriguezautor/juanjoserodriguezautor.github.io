import React from 'react';
import { BookOpen, ShoppingBag, ExternalLink, Sparkles } from 'lucide-react';
import { BOOKS } from '../data/authorData';
import { Book } from '../types';

interface BooksSectionProps {
  onSelectBook: (book: Book) => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({ onSelectBook }) => {
  return (
    <section id="libros" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 text-[#8B2E12] font-sans-clean text-xs font-medium tracking-[0.25em] uppercase">
          <span className="w-6 h-px bg-[#8B2E12]" />
          <span>Catálogo de Obras</span>
          <span className="w-6 h-px bg-[#8B2E12]" />
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl text-[#141210] font-normal">
          Novelas y Publicaciones
        </h2>

        <p className="font-body-sans text-sm sm:text-base text-[#141210]/75">
          Historias de ciencia ficción y dilemas humanos disponibles en formato físico y digital en Amazon.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BOOKS.map((book) => (
          <article
            key={book.id}
            className="bg-[#EAE3D2] rounded-lg p-6 sm:p-7 border border-[#8B2E12]/20 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between group"
          >
            {/* New Release Badge */}
            {book.isNew && (
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center gap-1 bg-[#8B2E12] text-[#F7F3EB] text-[10px] font-sans-clean font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-xs shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  Novedad
                </span>
              </div>
            )}

            {/* Main Content: Cover + Information */}
            <div className="flex flex-col space-y-5">
              
              {/* Book Cover Thumbnail */}
              <div className="flex justify-center pt-2">
                <div
                  className="relative w-40 sm:w-44 aspect-[2/3] rounded-xs overflow-hidden shadow-lg border border-[#8B2E12]/20 group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer bg-[#141210]"
                  onClick={() => onSelectBook(book)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectBook(book)}
                  aria-label={`Ver detalles de ${book.title}`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-white/20 to-transparent z-10 pointer-events-none" />
                  <img
                    src={book.coverImage}
                    alt={`Portada de ${book.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Book Details */}
              <div className="flex flex-col space-y-2.5">
                <span className="font-sans-clean text-[11px] font-medium tracking-[0.22em] text-[#8B2E12] uppercase block">
                  {book.genre}
                </span>
                
                <h3 className="font-editorial text-2xl text-[#141210] font-normal leading-tight">
                  {book.title}
                </h3>

                <p className="font-body-sans text-xs sm:text-sm text-[#141210]/80 leading-relaxed line-clamp-4 font-normal">
                  {book.shortDesc}
                </p>

                {/* Highlights / Quote snippet */}
                {book.quotes && book.quotes.length > 0 && (
                  <div className="pt-2 border-t border-[#8B2E12]/15">
                    <p className="font-editorial italic text-xs text-[#685F54]">
                      {book.quotes[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-[#8B2E12]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onSelectBook(book)}
                className="inline-flex items-center gap-1.5 text-xs font-sans-clean font-semibold tracking-wider text-[#141210] hover:text-[#8B2E12] uppercase transition-colors py-1.5 w-full sm:w-auto justify-center"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8B2E12]" />
                <span>Sinopsis & Muestra</span>
              </button>

              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] text-xs font-sans-clean uppercase tracking-[0.15em] rounded-xs transition-all duration-200 shadow-xs hover:shadow-md w-full sm:w-auto text-center"
                aria-label={`Comprar ${book.title} en Amazon (se abre en nueva pestaña)`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Amazon</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};