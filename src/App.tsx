import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { BooksSection } from './components/BooksSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookDetailModal } from './components/BookDetailModal';
import { Book } from './types';

export default function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div id="author-website-root" className="min-h-screen flex flex-col bg-[#F7F3EB] text-[#141210]">
      {/* Universal Fixed Header */}
      <Navbar />

      {/* Main Single Page Content */}
      <main id="main-content" className="flex-1">
        <HeroSection onSelectBook={handleSelectBook} />
        <AboutSection />
        <BooksSection onSelectBook={handleSelectBook} />
        <ContactSection />
      </main>

      {/* Literary Footer */}
      <Footer />

      {/* Interactive Book Details & Excerpt Modal */}
      <BookDetailModal book={selectedBook} onClose={handleCloseModal} />
    </div>
  );
}
