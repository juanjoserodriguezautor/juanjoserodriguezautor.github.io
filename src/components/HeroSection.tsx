import React, { useState, useEffect } from 'react';
import { BookOpen, ShoppingBag, Award, Sparkles, ChevronDown, Gamepad2 } from 'lucide-react';
import { AUTHOR_INFO, BOOKS } from '../data/authorData';
import { Book } from '../types';

interface HeroSectionProps {
  onSelectBook: (book: Book) => void;
  onExploreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectBook, onExploreClick }) => {
  // Por defecto mostramos la edición en castellano o la destacada, permitiendo alternar
  const [featuredIndex, setFeaturedIndex] = useState(1);
  const featuredBook = BOOKS[featuredIndex] || BOOKS[0];
  const [scrollY, setScrollY] = useState(0);

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('libros');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#8B2E12]/10"
    >
      {/* Background Subtle Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(139, 46, 18, 0.09) 0%, transparent 70%)`,
          transform: `translateY(${scrollY * 0.12}px)`,
        }}
      />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
        {/* Left Column: Author & Featured Introduction */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Author Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#EAE3D2] border border-[#8B2E12]/25 text-[#8B2E12] text-xs font-sans-clean font-medium tracking-[0.22em] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8B2E12]" />
            <span>{AUTHOR_INFO.subline}</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-3">
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#141210] font-normal leading-[1.04] tracking-tight">
              {AUTHOR_INFO.name}
            </h1>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#8B2E12] font-normal max-w-xl">
              «{AUTHOR_INFO.tagline}»
            </p>
          </div>

          {/* Synopsis preview of featured work */}
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans-clean uppercase tracking-[0.2em] text-[#685F54]">
              <span className="font-semibold text-[#8B2E12]">{featuredBook.title}</span>
              <span>·</span>
              <span>{featuredBook.language || 'Español'}</span>
            </div>
            <p className="font-body-sans text-sm sm:text-base text-[#141210]/85 leading-relaxed font-normal">
              {featuredBook.shortDesc}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] font-sans-clean text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
            >
              <span>Explorar obras</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onSelectBook(featuredBook)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EAE3D2] hover:bg-[#ded5c0] text-[#141210] font-sans-clean text-xs font-semibold tracking-[0.18em] uppercase border border-[#8B2E12]/25 rounded-xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#8B2E12]" />
              <span>Leer fragmento</span>
            </button>

            {featuredBook.interactiveUrl && (
              <a
                href={featuredBook.interactiveUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#141210] hover:bg-[#292521] text-[#F7F3EB] font-sans-clean text-xs font-semibold tracking-[0.16em] uppercase border border-[#8B2E12]/40 rounded-xs transition-all shadow-sm hover:shadow-md"
              >
                <Gamepad2 className="w-4 h-4 text-[#C4501E]" />
                <span>Aventura Interactiva</span>
              </a>
            )}
          </div>

          {/* Author Quote / Social proof snippet */}
          <div className="pt-4 border-t border-[#8B2E12]/15 w-full flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-[#685F54] font-body-sans">
            <Award className="w-4 h-4 text-[#8B2E12] shrink-0" />
            <span>Ciencia ficción dura · Thriller especulativo · Ediciones en español y catalán</span>
          </div>
        </div>

        {/* Right Column: 3D Book Showcase & Work Switcher */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group max-w-[260px] sm:max-w-[300px] w-full">
            {/* Soft Ambient Glow */}
            <div className="absolute -inset-4 bg-[#8B2E12]/12 rounded-2xl blur-xl group-hover:bg-[#8B2E12]/20 transition-all duration-500" />

            {/* Book Container with realistic aspect ratio (2:3) and 3D spine/page edge */}
            <div
              className="relative aspect-[2/3] w-full bg-[#141210] rounded-xs book-shadow-3d overflow-hidden border border-[#8B2E12]/30 transition-transform duration-500 group-hover:scale-[1.02] cursor-pointer"
              onClick={() => onSelectBook(featuredBook)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectBook(featuredBook)}
              aria-label={`Ver detalles y fragmento de ${featuredBook.title}`}
            >
              {/* Spine Highlight Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-white/25 via-black/20 to-transparent z-10 pointer-events-none" />

              {/* Badge */}
              <div className="absolute top-3.5 right-3.5 z-20">
                <span className="inline-flex items-center gap-1.5 bg-[#F7F3EB]/95 backdrop-blur-xs text-[#141210] text-[10px] font-sans-clean font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-xs shadow-md border border-[#8B2E12]/30">
                  {featuredBook.isNew && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B2E12] animate-ping" />
                  )}
                  <span>{featuredBook.isNew ? 'Edició en català' : featuredBook.language || 'Destacado'}</span>
                </span>
              </div>

              {/* Cover Image */}
              <img
                src={featuredBook.coverImage}
                alt={`Portada del libro ${featuredBook.title}`}
                width={320}
                height={480}
                className="w-full h-full object-cover transition-all duration-500"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
              />

              {/* Hover Overlay with Quick Actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/95 via-[#141210]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                <p className="font-editorial text-xl text-[#F7F3EB] mb-0.5">
                  {featuredBook.title}
                </p>
                <p className="text-[11px] text-[#EAE3D2]/80 font-sans-clean tracking-wider uppercase mb-4">
                  {featuredBook.genre}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBook(featuredBook);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#F7F3EB] text-[#141210] text-[11px] font-sans-clean uppercase tracking-widest font-semibold rounded-xs hover:bg-[#EAE3D2] transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#8B2E12]" />
                    <span>Sinopsis</span>
                  </button>

                  {featuredBook.amazonUrl && (
                    <a
                      href={featuredBook.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] text-[11px] font-sans-clean uppercase tracking-widest rounded-xs transition-colors"
                      aria-label={`Comprar ${featuredBook.title} en Amazon (se abre en nueva pestaña)`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Amazon</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Physical Book Shadow on Table */}
            <div className="w-[85%] mx-auto h-4 bg-[#141210]/25 blur-md rounded-full mt-3" />
          </div>

          {/* Interactive Book Switcher Pills */}
          <div
            className="mt-5 inline-flex items-center gap-1.5 p-1 bg-[#EAE3D2] border border-[#8B2E12]/20 rounded-xs shadow-xs"
            role="tablist"
            aria-label="Seleccionar obra destacada"
          >
            {BOOKS.map((book, idx) => {
              const isSelected = idx === featuredIndex;
              const shortLabel =
                book.id === 'diario-del-apocalipsis'
                  ? 'El Diario (ES)'
                  : book.id === 'diari-del-apocalipsi'
                  ? 'El Diari (CAT)'
                  : 'El Teorema';
              return (
                <button
                  key={book.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setFeaturedIndex(idx)}
                  className={`px-3 py-1.5 text-[11px] font-sans-clean uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#8B2E12] text-[#F7F3EB] font-semibold shadow-xs'
                      : 'text-[#685F54] hover:text-[#141210] hover:bg-[#F7F3EB]/60'
                  }`}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
