import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, BookOpen, Quote, Sparkles, ExternalLink, Copy, Check, Gamepad2, Globe } from 'lucide-react';
import { Book } from '../types';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (book) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [book, onClose]);

  if (!book) return null;

  const handleCopyBookLink = () => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}#/libro/${book.id}`
        : `https://juanjoserodriguezautor.github.io/#/libro/${book.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div
      id="book-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-book-title"
    >
      <div
        id="book-detail-modal-content"
        className="relative w-full max-w-3xl bg-[#F7F3EB] rounded-lg shadow-2xl border border-[#8B2E12]/25 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#8B2E12]/15 bg-[#EAE3D2]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8B2E12]" />
            <span className="font-sans-clean text-xs font-semibold tracking-widest text-[#8B2E12] uppercase">
              Ficha Editorial & Fragmento de Lectura
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyBookLink}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans-clean text-[#685F54] hover:text-[#8B2E12] bg-[#F7F3EB] rounded-xs border border-[#8B2E12]/20 transition-colors cursor-pointer"
              title="Copiar enlace directo a este libro"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-emerald-800 font-semibold">¡Enlace copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#8B2E12]" />
                  <span className="hidden sm:inline">Compartir ficha</span>
                </>
              )}
            </button>

            <button
              id="close-modal-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#141210]/60 hover:text-[#8B2E12] hover:bg-[#F7F3EB] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B2E12] cursor-pointer"
              aria-label="Cerrar ventana de detalles"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Top section: Cover and Quick Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-4 flex justify-center">
              <div className="w-40 sm:w-44 aspect-[2/3] rounded-xs overflow-hidden shadow-xl border border-[#8B2E12]/25 bg-[#141210]">
                <img
                  src={book.coverImage}
                  alt={`Portada de ${book.title}`}
                  width={200}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="sm:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-sans-clean text-xs tracking-widest uppercase text-[#8B2E12] font-semibold">
                  {book.genre}
                </span>
                {book.isNew && (
                  <span className="inline-flex items-center gap-1 bg-[#8B2E12] text-[#F7F3EB] text-[9px] font-sans-clean font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    Novedad
                  </span>
                )}
              </div>

              <h2 id="modal-book-title" className="font-editorial text-3xl sm:text-4xl text-[#141210] font-normal leading-tight">
                {book.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-sans-clean text-[#685F54] uppercase tracking-wider">
                <span>Publicado en {book.publishedYear}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#8B2E12]" />
                  {book.language || 'Español'}
                </span>
                {book.formats && (
                  <>
                    <span>·</span>
                    <span>{book.formats}</span>
                  </>
                )}
              </div>

              {/* Quotes */}
              {book.quotes && (
                <div className="space-y-1.5 pt-2 border-t border-[#8B2E12]/15">
                  {book.quotes.map((quote, idx) => (
                    <p key={idx} className="font-editorial italic text-sm text-[#8B2E12]">
                      {quote}
                    </p>
                  ))}
                </div>
              )}

              {book.interactiveUrl && (
                <div className="pt-2">
                  <a
                    href={book.interactiveUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#141210] hover:bg-[#292521] text-[#F7F3EB] text-xs font-sans-clean uppercase tracking-wider rounded-xs transition-colors"
                  >
                    <Gamepad2 className="w-3.5 h-3.5 text-[#C4501E]" />
                    <span>Jugar Aventura Interactiva Oficial</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Full Synopsis */}
          <div className="space-y-3 pt-4 border-t border-[#8B2E12]/15">
            <h3 className="font-sans-clean text-xs font-semibold tracking-[0.2em] text-[#141210] uppercase">
              Sinopsis Completa
            </h3>
            <div className="font-body-sans text-sm text-[#141210]/85 leading-relaxed space-y-3 whitespace-pre-line font-normal">
              {book.fullSynopsis}
            </div>
          </div>

          {/* Sample Excerpt */}
          <div className="bg-[#EAE3D2] p-6 rounded-md border-l-4 border-[#8B2E12] space-y-3 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-sans-clean font-semibold uppercase tracking-wider text-[#8B2E12]">
              <Quote className="w-3.5 h-3.5" />
              <span>Primeras Líneas (Fragmento de Lectura)</span>
            </div>
            <p className="font-editorial italic text-base sm:text-lg text-[#141210] leading-relaxed whitespace-pre-line">
              {book.sampleExcerpt}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#EAE3D2] border-t border-[#8B2E12]/15">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-sans-clean uppercase tracking-wider text-[#685F54] hover:text-[#141210] transition-colors cursor-pointer"
          >
            Cerrar ventana
          </button>

          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] text-xs font-sans-clean font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md transition-all duration-200"
            aria-label={`Comprar ${book.title} en Amazon (se abre en nueva pestaña)`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Adquirir en Amazon</span>
            <ExternalLink className="w-3 h-3 opacity-75" />
          </a>
        </div>
      </div>
    </div>
  );
};
