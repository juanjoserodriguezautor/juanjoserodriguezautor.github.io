import React, { useState } from 'react';
import { Compass, Dices, Brain, Sparkles, BookOpen, Quote } from 'lucide-react';
import { AUTHOR_INFO } from '../data/authorData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'influences' | 'philosophy'>('bio');

  const pillars = [
    {
      id: 'dick',
      icon: Brain,
      title: 'Philip K. Dick',
      desc: 'Mundos donde la realidad es solo una sugerencia y la mente humana se enfrenta a sus propias paradojas.',
    },
    {
      id: 'scifi',
      icon: Compass,
      title: 'Ciencia Ficción & Fronteras',
      desc: 'Exploración de los límites de la física, la inteligencia artificial y el destino de nuestra especie.',
    },
    {
      id: 'rpg',
      icon: Dices,
      title: 'Juegos de Rol',
      desc: 'Laboratorio de creación de historias inesperadas, toma de decisiones morales y construcción de universos.',
    },
  ];

  return (
    <section
      id="sobre-mi"
      aria-label="Sobre el autor"
      className="py-20 md:py-28 bg-[#EAE3D2] border-b border-[#8B2E12]/15 relative overflow-hidden"
    >
      {/* Decorative accent divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-sans-clean text-xs font-semibold tracking-[0.35em] text-[#8B2E12] uppercase">
            Sobre el Autor
          </span>
          <div className="h-px bg-[#8B2E12]/30 flex-1 max-w-xs" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Author Portrait & Fast Bio Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-[#F7F3EB] p-6 rounded-lg border border-[#8B2E12]/20 shadow-md">
              
              {/* Photo Frame with Fixed Aspect Ratio to prevent CLS */}
              <div className="relative aspect-[3/4] w-full max-w-[240px] mx-auto rounded-md overflow-hidden shadow-md border border-[#8B2E12]/20 mb-6 bg-[#141210]">
                <img
                  src={AUTHOR_INFO.photoUrl}
                  alt={`Retrato del escritor ${AUTHOR_INFO.name}`}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Identity & Details */}
              <div className="text-center">
                <h3 className="font-sans-clean font-medium text-sm tracking-[0.2em] text-[#141210] uppercase mb-1">
                  {AUTHOR_INFO.name}
                </h3>
                <p className="font-editorial italic text-base text-[#8B2E12]">
                  {AUTHOR_INFO.role}
                </p>

                <div className="mt-4 pt-4 border-t border-[#8B2E12]/15 flex justify-center items-center gap-4 text-xs font-sans-clean text-[#685F54]">
                  <span>Ciencia Ficción</span>
                  <span>•</span>
                  <span>Fantasía</span>
                  <span>•</span>
                  <span>Narrativa</span>
                </div>
              </div>

              {/* Author Quote Box */}
              <div className="mt-6 p-4 bg-[#EAE3D2] rounded-md border-l-2 border-[#8B2E12] relative">
                <Quote className="w-4 h-4 text-[#8B2E12]/40 absolute top-2 right-2" />
                <p className="font-editorial italic text-sm text-[#141210]/90 leading-relaxed">
                  «La ciencia ficción no predice el futuro. Lo cuestiona. Cada novela Sci-Fi comienza con una simple pregunta: ¿Qué pasaría si...?»
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Literary Narrative & Pillars */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
            
            {/* Storytelling Text */}
            <div className="bg-[#F7F3EB] p-8 sm:p-10 rounded-lg border border-[#8B2E12]/20 shadow-sm space-y-5">
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#141210] font-normal leading-snug">
                Creando historias en la frontera entre la lógica y el misterio
              </h2>

              <div className="font-editorial text-lg sm:text-xl text-[#2A2520] leading-[1.85] space-y-4">
                {AUTHOR_INFO.bioParagraphs.map((paragraph, index) => (
                  <p key={index} className="first-letter:text-3xl first-letter:font-bold first-letter:text-[#8B2E12] first-letter:mr-1">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Core Influences & Thematic Pillars */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-sans-clean tracking-[0.2em] text-[#8B2E12] uppercase font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pilares de Inspiración</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.id}
                      className="bg-[#F7F3EB] p-5 rounded-md border border-[#8B2E12]/15 hover:border-[#8B2E12]/40 transition-colors shadow-xs group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#EAE3D2] flex items-center justify-center text-[#8B2E12] mb-3 group-hover:bg-[#8B2E12] group-hover:text-[#F7F3EB] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-sans-clean font-semibold text-xs tracking-wider text-[#141210] uppercase mb-1.5">
                        {pillar.title}
                      </h4>
                      <p className="font-body-sans text-xs text-[#685F54] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
