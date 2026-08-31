import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Check, 
  Copy, 
  BookOpen, 
  ExternalLink, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { BlogPost, Book } from '../types';
import { BOOKS, AUTHOR_INFO } from '../data/authorData';
import { BLOG_POSTS } from '../data/blogData';

interface BlogArticlePageProps {
  post: BlogPost;
  onBackToHome: () => void;
  onSelectPost: (post: BlogPost) => void;
  onSelectBook: (book: Book) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  post,
  onBackToHome,
  onSelectPost,
  onSelectBook,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${post.title} | ${AUTHOR_INFO.name}`;
    return () => {
      document.title = `Web de ${AUTHOR_INFO.name} - Autor`;
    };
  }, [post]);

  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}#/noticias/${post.id}`
    : `https://juanjoserodriguezautor.github.io/#/noticias/${post.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`«${post.title}» por ${AUTHOR_INFO.name}`);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`«${post.title}» - ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
  };

  const relatedBook = post.relatedBookId
    ? BOOKS.find((b) => b.id === post.relatedBookId)
    : null;

  const otherPosts = BLOG_POSTS.filter((p) => p.id !== post.id);

  const markdownContent = post.markdown 
    || (post.content ? post.content.join('\n\n') : post.summary);

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#141210] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#8B2E12]/15">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-sans-clean font-semibold tracking-wider text-[#141210] hover:text-[#8B2E12] uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#8B2E12]" />
            <span>Volver a la web principal</span>
          </button>

          <span className="text-xs font-sans-clean text-[#685F54] hidden sm:inline-block">
            Noticias & Artículos
          </span>
        </div>

        {/* Article Container Card */}
        <article className="bg-[#EAE3D2] rounded-lg p-6 sm:p-10 lg:p-12 border border-[#8B2E12]/20 shadow-md">
          
          {/* Category & Meta Header */}
          <header className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#8B2E12] text-[#F7F3EB] text-[11px] font-sans-clean font-semibold tracking-widest uppercase px-3 py-1 rounded-xs shadow-xs">
                {post.category}
              </span>

              <div className="flex items-center gap-4 text-xs text-[#685F54] font-sans-clean">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8B2E12]" />
                  {post.date}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8B2E12]" />
                    {post.readTime}
                  </span>
                )}
              </div>
            </div>

            {/* Article Headline */}
            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-5xl text-[#141210] font-normal leading-[1.15] tracking-tight">
              {post.title}
            </h1>

            {/* Summary / Subtitle */}
            <p className="font-editorial italic text-lg sm:text-xl text-[#8B2E12]/90 leading-relaxed">
              {post.summary}
            </p>

            {/* Social Sharing Bar */}
            <div className="pt-4 border-t border-[#8B2E12]/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-sans-clean text-[#685F54] font-medium">
                <Share2 className="w-3.5 h-3.5 text-[#8B2E12]" />
                <span>Compartir noticia:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F3EB] hover:bg-[#ded5c0] text-[#141210] border border-[#8B2E12]/20 text-xs font-sans-clean rounded-xs transition-colors shadow-xs"
                  title="Copiar enlace directo de este artículo"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-emerald-800 font-semibold">¡Enlace copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8B2E12]" />
                      <span>Copiar link único</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={shareOnTwitter}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#141210] hover:bg-[#2c2723] text-[#F7F3EB] text-xs font-sans-clean rounded-xs transition-colors"
                >
                  <span>X (Twitter)</span>
                </button>

                <button
                  type="button"
                  onClick={shareOnWhatsApp}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-sans-clean rounded-xs transition-colors"
                >
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={shareOnFacebook}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1877F2] hover:bg-[#0c5dc7] text-white text-xs font-sans-clean rounded-xs transition-colors"
                >
                  <span>Facebook</span>
                </button>
              </div>
            </div>

            {/* Archive / Dossier Badge or Series Header */}
            {(post.archiveSeries || post.archiveNumber || post.archiveSubtitle) && (
              <div className="bg-[#F7F3EB] p-3.5 sm:p-4 rounded-xs border border-[#8B2E12]/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {post.archiveSeries && (
                    <span className="bg-[#141210] text-[#F7F3EB] text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-xs uppercase">
                      {post.archiveSeries}
                    </span>
                  )}
                  {post.archiveNumber && (
                    <span className="bg-[#8B2E12] text-[#F7F3EB] text-[11px] font-sans-clean font-bold tracking-widest px-2.5 py-1 rounded-xs uppercase">
                      {post.archiveNumber}
                    </span>
                  )}
                </div>
                {post.archiveSubtitle && (
                  <p className="font-editorial italic text-sm text-[#8B2E12] font-medium leading-snug">
                    {post.archiveSubtitle}
                  </p>
                )}
              </div>
            )}
          </header>

          {/* Featured Image if exists */}
          {post.imageUrl && (
            <div className="mb-10 space-y-2">
              <div className="w-full max-h-[420px] overflow-hidden rounded-xs border border-[#8B2E12]/20 shadow-md bg-[#141210]">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover max-h-[420px]"
                />
              </div>
              {post.imageCaption && (
                <p className="text-xs font-editorial italic text-[#685F54] text-center">
                  {post.imageCaption}
                </p>
              )}
            </div>
          )}

          {/* Main Markdown Content */}
          <div className="prose max-w-none text-[#141210] font-body-sans text-base sm:text-lg leading-relaxed space-y-5">
            <div className="markdown-content [&>p]:mb-5 [&>p]:leading-relaxed [&>h2]:font-editorial [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:text-[#141210] [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:font-editorial [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:text-[#141210] [&>h3]:mt-6 [&>h3]:mb-3 [&>blockquote]:font-editorial [&>blockquote]:italic [&>blockquote]:text-lg [&>blockquote]:text-[#8B2E12] [&>blockquote]:border-l-2 [&>blockquote]:border-[#8B2E12] [&>blockquote]:pl-4 [&>blockquote]:my-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>a]:text-[#8B2E12] [&>a]:underline [&>strong]:font-semibold">
              <Markdown>{markdownContent}</Markdown>
            </div>
          </div>

          {/* Related Book Highlight Card */}
          {relatedBook && (
            <div className="mt-12 p-6 rounded-md bg-[#F7F3EB] border border-[#8B2E12]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={relatedBook.coverImage}
                  alt={relatedBook.title}
                  className="w-16 sm:w-20 aspect-[2/3] object-cover rounded-xs border border-[#8B2E12]/20 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-[#8B2E12] text-[11px] font-sans-clean font-semibold uppercase tracking-widest mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Obra del autor relacionada</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-[#141210]">
                    {relatedBook.title}
                  </h3>
                  <p className="text-xs text-[#685F54] font-body-sans mb-1">
                    {relatedBook.genre}
                  </p>
                  <p className="text-xs text-[#141210]/75 line-clamp-2 max-w-md">
                    {relatedBook.shortDesc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onSelectBook(relatedBook)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#EAE3D2] hover:bg-[#ded5c0] text-[#141210] border border-[#8B2E12]/20 text-xs font-sans-clean uppercase tracking-wider rounded-xs transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#8B2E12]" />
                  <span>Sinopsis</span>
                </button>

                {relatedBook.amazonUrl && (
                  <a
                    href={relatedBook.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] text-xs font-sans-clean uppercase tracking-wider rounded-xs transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Amazon</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Author Signature Box */}
          <div className="mt-12 pt-6 border-t border-[#8B2E12]/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={AUTHOR_INFO.photoUrl} 
                alt={AUTHOR_INFO.name}
                className="w-12 h-12 rounded-full object-cover border border-[#8B2E12]/30"
              />
              <div>
                <p className="font-editorial text-lg text-[#141210] font-normal leading-tight">
                  {AUTHOR_INFO.name}
                </p>
                <p className="text-xs text-[#685F54] font-sans-clean">
                  {AUTHOR_INFO.subline}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1 text-xs font-sans-clean font-semibold text-[#8B2E12] hover:underline uppercase"
            >
              <span>Explorar toda la web</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>

        </article>

        {/* Other Recent Posts Section */}
        {otherPosts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#141210]">
                Otras noticias y notas del autor
              </h2>
              <button
                type="button"
                onClick={onBackToHome}
                className="text-xs font-sans-clean text-[#8B2E12] hover:underline font-semibold uppercase"
              >
                Ver todas
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((other) => (
                <div
                  key={other.id}
                  onClick={() => onSelectPost(other)}
                  className="bg-[#EAE3D2] p-5 rounded-lg border border-[#8B2E12]/20 shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#685F54] font-sans-clean mb-2">
                      <span className="text-[#8B2E12] font-semibold uppercase text-[10px]">
                        {other.category}
                      </span>
                      <span>·</span>
                      <span>{other.date}</span>
                    </div>

                    <h3 className="font-editorial text-xl text-[#141210] group-hover:text-[#8B2E12] transition-colors leading-snug mb-2">
                      {other.title}
                    </h3>

                    <p className="font-body-sans text-xs text-[#141210]/75 line-clamp-2">
                      {other.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#8B2E12]/15 flex items-center justify-between text-xs font-sans-clean font-semibold text-[#8B2E12]">
                    <span>Leer artículo</span>
                    <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};