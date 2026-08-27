import React, { useState, useEffect } from 'react';
import { BookOpen, ShoppingBag, Award, Sparkles, ChevronDown } from 'lucide-react';
import { AUTHOR_INFO, BOOKS } from '../data/authorData';
import { Book } from '../types';

interface HeroSectionProps {
  onSelectBook: (book: Book) => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectBook, onExploreClick }) => {
  const featuredBook = BOOKS[0]; // Edición en català como obra destacada
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(139, 46, 18, 0.08) 0%, transparent 70%)`,
          transform: `translateY(${scrollY * 0.15}px)`
        }}
      />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Author & Featured Introduction */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Author Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#EAE3D2] border border-[#8B2E12]/20 text-[#8B2E12] text-xs font-sans-clean font-medium tracking-[0.2em] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8B2E12]" />
            <span>{AUTHOR_INFO.subline}</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-3">
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#141210] font-normal leading-[1.05] tracking-tight">
              {AUTHOR_INFO.name}
            </h1>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#8B2E12] font-normal max-w-xl">
              «{AUTHOR_INFO.tagline}»
            </p>
          </div>

          {/* Synopsis preview of featured work */}
          <p className="font-body-sans text-sm sm:text-base text-[#141210]/80 max-w-xl leading-relaxed font-normal">
            {featuredBook.shortDesc}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] font-sans-clean text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <span>Explorar libros</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onSelectBook(featuredBook)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EAE3D2] hover:bg-[#ded5c0] text-[#141210] font-sans-clean text-xs font-medium tracking-[0.18em] uppercase border border-[#8B2E12]/20 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#8B2E12]" />
              <span>Leer fragmento</span>
            </button>
          </div>

          {/* Author Quote / Social proof snippet */}
          <div className="pt-4 border-t border-[#8B2E12]/15 w-full flex items-center justify-center lg:justify-start gap-3 text-xs text-[#685F54] font-body-sans">
            <Award className="w-4 h-4 text-[#8B2E12]" />
            <span>Ciencia ficción dura · Thriller especulativo · Novela en español y catalán</span>
          </div>
        </div>

        {/* Right Column: 3D Book Showcase */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative group max-w-[280px] sm:max-w-[320px] w-full">
            
            {/* Soft Ambient Glow */}
            <div className="absolute -inset-4 bg-[#8B2E12]/10 rounded-2xl blur-xl group-hover:bg-[#8B2E12]/15 transition-all duration-500" />

            {/* Book Container with realistic aspect ratio (2:3) */}
            <div 
              className="relative aspect-[2/3] w-full bg-[#141210] rounded-xs shadow-2xl overflow-hidden border border-[#8B2E12]/30 transition-transform duration-500 group-hover:scale-[1.02] cursor-pointer"
              onClick={() => onSelectBook(featuredBook)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectBook(featuredBook)}
              aria-label={`Ver detalles de ${featuredBook.title}`}
            >
              {/* Spine Highlight Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white/20 via-white/5 to-transparent z-10 pointer-events-none" />
              
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1.5 bg-[#F7F3EB] text-[#141210] text-[10px] font-sans-clean font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-xs shadow-md border border-[#8B2E12]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B2E12] animate-ping" />
                  Edició en català
                </span>
              </div>

              {/* Cover Image */}
              <img
                src={featuredBook.coverImage}
                alt={`Portada del libro ${featuredBook.title}`}
                className="w-full h-full object-cover"
                loading="eager"
              />

              {/* Hover Overlay with Quick Actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                <p className="font-editorial text-xl text-[#F7F3EB] mb-1">
                  {featuredBook.title}
                </p>
                <p className="text-xs text-[#EAE3D2]/80 font-sans-clean tracking-wider uppercase mb-4">
                  {featuredBook.genre}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBook(featuredBook);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#F7F3EB] text-[#141210] text-[11px] font-sans-clean uppercase tracking-widest font-semibold rounded-xs hover:bg-[#EAE3D2] transition-colors"
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
            <div className="w-[85%] mx-auto h-4 bg-[#141210]/20 blur-md rounded-full mt-3" />
          </div>
        </div>

      </div>
    </header>
  );
};