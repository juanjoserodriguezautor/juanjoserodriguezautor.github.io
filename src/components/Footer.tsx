import React from 'react';
import { AUTHOR_INFO } from '../data/authorData';

export const Footer: React.FC = () => {
  return (
    <footer
      id="main-footer"
      className="bg-[#0D0B0A] text-[#F7F3EB]/70 py-8 px-4 text-center border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sans-clean text-xs tracking-widest uppercase">
        <p>© 2025 {AUTHOR_INFO.name} · Todos los derechos reservados</p>
        <p className="text-[#F7F3EB]/50 text-[10px]">
          Web literaria optimizada para velocidad, accesibilidad y experiencia de usuario
        </p>
      </div>
    </footer>
  );
};
