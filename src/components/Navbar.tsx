import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, User, Mail, Home, Newspaper } from 'lucide-react';
import { AUTHOR_INFO } from '../data/authorData';

interface NavbarProps {
  onOpenBookModal?: () => void;
  isArticlePage?: boolean;
  onBackToHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isArticlePage = false, onBackToHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'sobre-mi', 'libros', 'noticias', 'contacto'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero', id: 'hero', icon: Home },
    { name: 'Autor', href: '#sobre-mi', id: 'sobre-mi', icon: User },
    { name: 'Libros', href: '#libros', id: 'libros', icon: BookOpen },
    { name: 'Noticias', href: '#noticias', id: 'noticias', icon: Newspaper },
    { name: 'Contacto', href: '#contacto', id: 'contacto', icon: Mail },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isArticlePage && onBackToHome) {
      onBackToHome();
      setTimeout(() => {
        if (href === '#hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      if (href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F3EB]/95 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(20,18,16,0.06)] border-b border-[#8B2E12]/15'
          : 'bg-[#F7F3EB]/85 backdrop-blur-md py-4 border-b border-[#8B2E12]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a
          id="brand-logo-link"
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-2 text-decoration-none focus:outline-none focus:ring-2 focus:ring-[#8B2E12] rounded-sm p-1"
          aria-label="Ir al inicio de la página de Juan José Rodríguez"
        >
          <span className="font-sans-clean font-light text-sm sm:text-base tracking-[0.2em] uppercase text-[#141210] group-hover:text-[#8B2E12] transition-colors">
            {AUTHOR_INFO.name}
          </span>
          <span className="text-[#8B2E12] text-xs font-sans-clean tracking-widest hidden md:inline-block opacity-60">
            · Autor
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-navigation" aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => {
              const isActive = !isArticlePage && activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    id={`nav-link-${link.id}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`font-sans-clean font-normal text-xs tracking-[0.18em] uppercase transition-all duration-200 py-1 relative ${
                      isActive
                        ? 'text-[#8B2E12] font-semibold'
                        : 'text-[#685F54] hover:text-[#8B2E12]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#8B2E12] rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            id="nav-cta-books"
            href="#libros"
            onClick={(e) => handleNavClick(e, '#libros')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] text-xs font-sans-clean uppercase tracking-widest rounded-xs transition-colors shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ver Obras</span>
          </a>
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            id="mobile-nav-cta-books"
            href="#libros"
            onClick={(e) => handleNavClick(e, '#libros')}
            className="px-3 py-1.5 bg-[#8B2E12] text-[#F7F3EB] text-[11px] font-sans-clean uppercase tracking-wider rounded-xs"
          >
            Obras
          </a>

          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-md text-[#141210] hover:bg-[#EAE3D2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B2E12]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-[#F7F3EB] border-b border-[#8B2E12]/20 px-4 pt-3 pb-6 shadow-xl animate-fade-in"
        >
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = !isArticlePage && activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    id={`mobile-nav-link-${link.id}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-sans-clean text-sm tracking-wider uppercase transition-colors min-h-[44px] ${
                      isActive
                        ? 'bg-[#8B2E12] text-[#F7F3EB] font-medium'
                        : 'text-[#141210] hover:bg-[#EAE3D2]'
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-75" />
                    <span>{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};