import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { BooksSection } from './components/BooksSection';
import { BlogSection } from './components/BlogSection';
import { BlogArticlePage } from './components/BlogArticlePage';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookDetailModal } from './components/BookDetailModal';
import { Book, BlogPost } from './types';
import { BLOG_POSTS } from './data/blogData';

export default function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  useEffect(() => {
    const parseUrlForArticle = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const queryPostId = searchParams.get('noticia') || searchParams.get('post') || searchParams.get('articulo');
      if (queryPostId) {
        const found = BLOG_POSTS.find((p) => p.id === queryPostId);
        if (found) {
          setActiveArticle(found);
          return;
        }
      }

      const hash = window.location.hash;
      const match = hash.match(/^#\/?(?:noticias|blog|noticia)\/([a-zA-Z0-9-_]+)/i);
      if (match && match[1]) {
        const postId = match[1];
        const found = BLOG_POSTS.find((p) => p.id === postId);
        if (found) {
          setActiveArticle(found);
          return;
        }
      }

      if (!match && !queryPostId) {
        setActiveArticle(null);
      }
    };

    parseUrlForArticle();
    window.addEventListener('hashchange', parseUrlForArticle);
    window.addEventListener('popstate', parseUrlForArticle);

    return () => {
      window.removeEventListener('hashchange', parseUrlForArticle);
      window.removeEventListener('popstate', parseUrlForArticle);
    };
  }, []);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseBookModal = () => {
    setSelectedBook(null);
  };

  const handleSelectPost = (post: BlogPost) => {
    setActiveArticle(post);
    window.location.hash = `/noticias/${post.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActiveArticle(null);
    window.history.pushState(null, '', window.location.pathname + '#noticias');
    setTimeout(() => {
      const el = document.getElementById('noticias');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div id="author-website-root" className="min-h-screen flex flex-col bg-[#F7F3EB] text-[#141210]">
      <Navbar 
        isArticlePage={Boolean(activeArticle)} 
        onBackToHome={handleBackToHome} 
      />

      {activeArticle ? (
        <main id="article-main-content" className="flex-1">
          <BlogArticlePage
            post={activeArticle}
            onBackToHome={handleBackToHome}
            onSelectPost={handleSelectPost}
            onSelectBook={handleSelectBook}
          />
        </main>
      ) : (
        <main id="main-content" className="flex-1">
          <HeroSection onSelectBook={handleSelectBook} />
          <AboutSection />
          <BooksSection onSelectBook={handleSelectBook} />
          <BlogSection onSelectPost={handleSelectPost} onSelectBook={handleSelectBook} />
          <ContactSection />
        </main>
      )}

      <Footer />

      <BookDetailModal book={selectedBook} onClose={handleCloseBookModal} />
    </div>
  );
}