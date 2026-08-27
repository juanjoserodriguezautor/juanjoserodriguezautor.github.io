import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, BookOpen, Star, Sparkles } from 'lucide-react';
import { AUTHOR_INFO, BOOKS } from '../data/authorData';
import { Book } from '../types';

interface HeroSectionProps {
  onSelectBook: (book: Book) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectBook }) => {
  const featuredBook = BOOKS[0]; // El Diario del Apocalipsis (Novedad)
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="hero"
      aria-label="Presentación principal"
      className="relative min-h-[92vh] pt-24 pb-16 md:py-0 flex items-center overflow-hidden border-b border-[#8B2E12]/15 bg-[#F7F3EB]"
    >
      {/* Background Subtle Literary Texture Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#141210_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Author Presentation & Headlines */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 z-10">
            
            {/* Genre & Subtitle Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE3D2] border border-[#8B2E12]/20 text-[#8B2E12] font-sans-clean font-medium text-xs tracking-[0.25em] uppercase">
                <Sparkles className="w-3 h-3" />
                {AUTHOR_INFO.subline}
              </span>
            </div>

            {/* Author Main Name */}
            <h1
              id="hero-author-title"
              className="font-editorial italic font-light text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] text-[#141210] leading-[1.05] tracking-tight"
            >
              Juan José <br />
              <span className="not-italic font-normal text-[#8B2E12]">Rodríguez</span>
            </h1>

            {/* Tagline / Literary manifesto */}
            <div className="relative border-l-2 border-[#8B2E12] pl-5 py-1">
              <p className="font-editorial italic text-xl sm:text-2xl text-[#685F54] leading-relaxed max-w-xl">
                «{AUTHOR_INFO.tagline}»
              </p>
            </div>

            {/* Micro synopsis snippet */}
            <p className="font-body-sans text-sm sm:text-base text-[#141210]/80 max-w-lg leading-relaxed font-normal">
              Explora novelas donde la física cuántica, los enigmas del destino y la fragilidad humana se encuentran en mundos al borde de lo desconocido.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                id="hero-cta-books"
                href="#libros"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] font-sans-clean text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8B2E12] focus:ring-offset-2"
              >
                <span>Explorar libros</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-cta-sample"
                type="button"
                onClick={() => onSelectBook(featuredBook)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EAE3D2] hover:bg-[#ded5c0] text-[#141210] font-sans-clean text-xs font-medium tracking-[0.18em] uppercase border border-[#8B2E12]/20 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#8B2E12]" />
                <span>Leer fragmento</span>
              </button>
            </div>

            {/* Social Proof / Quick highlight */}
            <div className="pt-4 flex items-center gap-6 border-t border-[#8B2E12]/15 text-xs font-sans-clean text-[#685F54]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#C4501E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-medium text-[#141210] ml-1">Disponible en Amazon</span>
              </div>
              <span className="text-[#8B2E12]/30">•</span>
              <span className="tracking-wider uppercase">Tapa blanda & Kindle</span>
            </div>

          </div>

          {/* Right Column: 3D Book Presentation Box */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div
              id="hero-book-showcase"
              className="relative w-full max-w-md bg-[#141210] rounded-lg p-8 sm:p-10 flex flex-col items-center justify-center shadow-2xl overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Cinematic Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B2E12]/30 via-transparent to-black/60 pointer-events-none" />
              
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1 bg-[#F7F3EB] text-[#141210] text-[10px] font-sans-clean font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-xs shadow-md border border-[#8B2E12]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B2E12] animate-ping" />
                  Novedad 2026
                </span>
              </div>

              {/* Book Spine & 3D Cover */}
              <div className="relative my-4 z-10 flex flex-col items-center">
                <div
                  className="w-48 sm:w-56 aspect-[2/3] rounded-xs overflow-hidden book-shadow-3d transition-transform duration-500 ease-out cursor-pointer relative"
                  style={{
                    transform: isHovered
                      ? 'perspective(1000px) rotateY(-4deg) rotateX(2deg) scale(1.04)'
                      : 'perspective(1000px) rotateY(-8deg) rotateX(4deg) scale(1)',
                  }}
                  onClick={() => onSelectBook(featuredBook)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectBook(featuredBook)}
                  aria-label={`Ver detalles de ${featuredBook.title}`}
                >
                  <img
                    src={featuredBook.coverImage}
                    alt={`Portada del libro ${featuredBook.title}`}
                    width={320}
                    height={480}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  {/* Subtle glossy overlay reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 pointer-events-none" />
                </div>

                {/* Book Card Bottom Mini Info */}
                <div className="text-center mt-6 z-10">
                  <p className="font-sans-clean text-[11px] tracking-[0.25em] text-[#C4501E] uppercase font-light mb-1">
                    {featuredBook.genre}
                  </p>
                  <h2 className="font-editorial text-2xl text-[#F7F3EB] font-normal tracking-wide">
                    {featuredBook.title}
                  </h2>
                  <p className="font-body-sans text-xs text-[#F7F3EB]/65 max-w-xs mt-2 line-clamp-2">
                    {featuredBook.shortDesc}
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <a
                      href={featuredBook.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] text-[11px] font-sans-clean uppercase tracking-widest rounded-xs transition-colors"
                      aria-label="Comprar El Diario del Apocalipsis en Amazon (se abre en nueva pestaña)"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Amazon</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onSelectBook(featuredBook)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-[#F7F3EB] text-[11px] font-sans-clean uppercase tracking-wider rounded-xs border border-white/15 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Sinopsis</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Subtle Label */}
              <div className="relative z-10 w-full pt-4 mt-2 border-t border-white/10 flex justify-between items-center text-[10px] font-sans-clean tracking-[0.2em] uppercase text-[#F7F3EB]/40">
                <span>Edición Impresa & Digital</span>
                <span>Ficción Especulativa</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
