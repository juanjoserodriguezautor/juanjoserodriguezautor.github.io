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
import { BOOKS } from './data/authorData';

export default function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  useEffect(() => {
    const parseUrlState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const queryPostId =
        searchParams.get('noticia') || searchParams.get('post') || searchParams.get('articulo');
      if (queryPostId) {
        const found = BLOG_POSTS.find((p) => p.id === queryPostId);
        if (found) {
          setActiveArticle(found);
          return;
        }
      }

      const queryBookId = searchParams.get('libro') || searchParams.get('obra');
      if (queryBookId) {
        const foundBook = BOOKS.find((b) => b.id === queryBookId);
        if (foundBook) {
          setSelectedBook(foundBook);
        }
      }

      const hash = window.location.hash;
      const articleMatch = hash.match(/^#\/?(?:noticias|blog|noticia)\/([a-zA-Z0-9-_]+)/i);
      if (articleMatch && articleMatch[1]) {
        const postId = articleMatch[1];
        const found = BLOG_POSTS.find((p) => p.id === postId);
        if (found) {
          setActiveArticle(found);
          return;
        }
      }

      const bookMatch = hash.match(/^#\/?(?:libro|libros|obra)\/([a-zA-Z0-9-_]+)/i);
      if (bookMatch && bookMatch[1]) {
        const bookId = bookMatch[1];
        const foundBook = BOOKS.find((b) => b.id === bookId);
        if (foundBook) {
          setSelectedBook(foundBook);
        }
      }

      if (!articleMatch && !queryPostId) {
        setActiveArticle(null);
      }
    };

    parseUrlState();
    window.addEventListener('hashchange', parseUrlState);
    window.addEventListener('popstate', parseUrlState);

    return () => {
      window.removeEventListener('hashchange', parseUrlState);
      window.removeEventListener('popstate', parseUrlState);
    };
  }, []);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseBookModal = () => {
    setSelectedBook(null);
    if (window.location.hash.startsWith('#/libro/')) {
      window.history.replaceState(null, '', window.location.pathname + '#libros');
    }
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

  const handleExploreBooks = () => {
    const el = document.getElementById('libros');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
          <HeroSection
            onSelectBook={handleSelectBook}
            onExploreClick={handleExploreBooks}
          />
          <AboutSection />
          <BooksSection onSelectBook={handleSelectBook} />
          <BlogSection onSelectPost={handleSelectPost} onSelectBook={handleSelectBook} />
          <ContactSection />
        </main>
      )}

      <Footer onSelectBook={handleSelectBook} />

      <BookDetailModal book={selectedBook} onClose={handleCloseBookModal} />
    </div>
  );
}
