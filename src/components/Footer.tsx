import React from 'react';
import { ArrowUp, BookOpen, Instagram, Gamepad2 } from 'lucide-react';
import { AUTHOR_INFO, BOOKS } from '../data/authorData';
import { Book } from '../types';

interface FooterProps {
  onSelectBook?: (book: Book) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectBook }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#0D0B0A] text-[#F7F3EB]/80 pt-14 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand & Literary Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C4501E]" />
              <span className="font-sans-clean text-sm font-semibold tracking-[0.22em] uppercase text-[#F7F3EB]">
                {AUTHOR_INFO.name}
              </span>
            </div>
            <p className="font-editorial italic text-lg text-[#C4501E]">
              «{AUTHOR_INFO.tagline}»
            </p>
            <p className="font-body-sans text-xs text-[#F7F3EB]/60 leading-relaxed max-w-sm">
              Página oficial de autor. Novelas de ciencia ficción, thriller científico y narrativa especulativa disponibles en Amazon en formato físico y digital.
            </p>
          </div>

          {/* Column 2: Obras Publicadas */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-sans-clean text-xs font-semibold tracking-[0.25em] uppercase text-[#F7F3EB]">
              Obras Publicadas
            </p>
            <ul className="space-y-2 text-xs font-body-sans">
              {BOOKS.map((book) => (
                <li key={book.id}>
                  {onSelectBook ? (
                    <button
                      type="button"
                      onClick={() => onSelectBook(book)}
                      className="text-[#F7F3EB]/70 hover:text-[#C4501E] transition-colors text-left cursor-pointer"
                    >
                      {book.title}{' '}
                      <span className="text-[10px] text-[#F7F3EB]/40 uppercase">
                        ({book.language || 'ES'})
                      </span>
                    </button>
                  ) : (
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F7F3EB]/70 hover:text-[#C4501E] transition-colors"
                    >
                      {book.title}
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="./juegos/diario/index.html"
                  className="inline-flex items-center gap-1.5 text-[#C4501E] hover:underline font-medium"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>El Diario del Apocalipsis — Juego Interactivo</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Enlaces y Redes */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-sans-clean text-xs font-semibold tracking-[0.25em] uppercase text-[#F7F3EB]">
              Comunidad Oficial
            </p>
            <div className="flex items-center gap-3">
              <a
                href={AUTHOR_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Juan José Rodríguez"
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-[#8B2E12] border border-white/15 flex items-center justify-center text-[#F7F3EB] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={AUTHOR_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter de Juan José Rodríguez"
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-[#8B2E12] border border-white/15 flex items-center justify-center text-[#F7F3EB] font-sans-clean font-bold text-xs transition-colors"
              >
                𝕏
              </a>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-[11px] font-sans-clean uppercase tracking-widest text-[#F7F3EB]/60 hover:text-[#F7F3EB] transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#C4501E]" />
                <span>Volver arriba</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans-clean text-[11px] tracking-widest uppercase text-[#F7F3EB]/50">
          <p>© {currentYear} {AUTHOR_INFO.name} · Todos los derechos reservados</p>
          <p>Literatura de Ciencia Ficción y Fantasía</p>
        </div>
      </div>
    </footer>
  );
};
