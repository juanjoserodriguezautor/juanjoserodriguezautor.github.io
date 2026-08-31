import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowRight, BookOpen, ExternalLink, Sparkles, Copy, Check, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost, Book } from '../types';
import { BOOKS } from '../data/authorData';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
  onSelectBook: (book: Book) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost, onSelectBook }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#/noticias/${postId}`
      : `https://juanjoserodriguezautor.github.io/#/noticias/${postId}`;

    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(postId);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  return (
    <section id="noticias" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 text-[#8B2E12] font-sans-clean text-xs font-medium tracking-[0.25em] uppercase">
          <span className="w-6 h-px bg-[#8B2E12]" />
          <Newspaper className="w-3.5 h-3.5" />
          <span>Actualidad & Notas</span>
          <span className="w-6 h-px bg-[#8B2E12]" />
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl text-[#141210] font-normal">
          Noticias y Reflexiones
        </h2>

        <p className="font-body-sans text-sm sm:text-base text-[#141210]/75">
          Comentarios sobre ciencia, avances relacionados con las novelas, lanzamientos y reflexiones del autor. Cada noticia cuenta con un enlace único para compartir.
        </p>
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {BLOG_POSTS.map((post) => {
          const relatedBook = post.relatedBookId 
            ? BOOKS.find(b => b.id === post.relatedBookId) 
            : null;

          return (
            <article
              key={post.id}
              className="bg-[#EAE3D2] rounded-lg border border-[#8B2E12]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Optional Post Image */}
              {post.imageUrl && (
                <div 
                  className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#141210] cursor-pointer"
                  onClick={() => onSelectPost(post)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectPost(post)}
                  aria-label={`Leer noticia: ${post.title}`}
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Pill on Image */}
                  <span className="absolute top-3 left-3 bg-[#141210]/85 backdrop-blur-xs text-[#F7F3EB] text-[10px] font-sans-clean font-semibold tracking-widest uppercase px-3 py-1 rounded-xs border border-white/10 shadow-xs">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Content Box */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta: Date + Category + Read Time */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#685F54] mb-3">
                    <span className="inline-flex items-center gap-1.5 font-sans-clean">
                      <Calendar className="w-3.5 h-3.5 text-[#8B2E12]" />
                      {post.date}
                    </span>
                    {post.readTime && (
                      <span className="inline-flex items-center gap-1 font-sans-clean">
                        <Clock className="w-3 h-3 text-[#8B2E12]" />
                        {post.readTime}
                      </span>
                    )}
                    {post.archiveNumber && (
                      <span className="bg-[#141210] text-[#F7F3EB] text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-xs uppercase">
                        {post.archiveNumber}
                      </span>
                    )}
                    {!post.imageUrl && (
                      <span className="bg-[#F7F3EB] text-[#8B2E12] text-[10px] font-sans-clean font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs border border-[#8B2E12]/20">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectPost(post)}
                    className="font-editorial text-2xl sm:text-[26px] text-[#141210] font-normal leading-snug hover:text-[#8B2E12] transition-colors cursor-pointer mb-3"
                  >
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-body-sans text-xs sm:text-sm text-[#141210]/80 leading-relaxed font-normal mb-4">
                    {post.summary}
                  </p>

                  {/* Related Book Badge if linked */}
                  {relatedBook && (
                    <div className="mt-3 pt-3 border-t border-[#8B2E12]/15 flex items-center justify-between">
                      <span className="text-[11px] font-sans-clean text-[#685F54] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#8B2E12]" />
                        Relacionado:
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBook(relatedBook);
                        }}
                        className="text-xs font-sans-clean font-semibold text-[#8B2E12] hover:underline flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{relatedBook.title}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 pt-4 border-t border-[#8B2E12]/15 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectPost(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-sans-clean font-semibold tracking-wider text-[#141210] hover:text-[#8B2E12] uppercase transition-colors py-1.5"
                  >
                    <span>Leer artículo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8B2E12]" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleCopyLink(e, post.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-sans-clean text-[#685F54] hover:text-[#8B2E12] py-1 px-2 rounded-xs border border-[#8B2E12]/15 bg-[#F7F3EB]/60 hover:bg-[#F7F3EB] transition-colors"
                      title="Copiar enlace único para redes sociales"
                    >
                      {copiedId === post.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-700" />
                          <span className="text-emerald-800 font-medium">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#8B2E12]" />
                          <span>Link</span>
                        </>
                      )}
                    </button>

                    {post.sourceUrl && (
                      <a
                        href={post.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-sans-clean text-[#685F54] hover:text-[#8B2E12] transition-colors"
                      >
                        <span>{post.sourceLabel || 'Fuente'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};