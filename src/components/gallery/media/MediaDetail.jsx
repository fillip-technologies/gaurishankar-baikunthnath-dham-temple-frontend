import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Calendar,
  Newspaper,
  Clock,
  MapPin,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { mediaGetApi, mediaGetAllApi } from '../../clientApi/allApi';
import { formatMediaDate } from '../../clientApi/format';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=60&w=800';

const categoryLabel = (category, lang) => {
  if (category === 'tv') return lang === 'hi' ? 'टीवी प्रसारण' : 'TV Broadcast';
  if (category === 'digital') return lang === 'hi' ? 'डिजिटल न्यूज़' : 'Digital News';
  return lang === 'hi' ? 'प्रिंट मीडिया' : 'Print News';
};

export default function MediaDetail({ articleId }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [copied, setCopied] = useState(false);

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      setIsLoading(true);
      setNotFound(false);
      try {
        const [detailRes, allRes] = await Promise.all([
          mediaGetApi(articleId),
          mediaGetAllApi().catch(() => null),
        ]);
        if (!active) return;
        const found = detailRes?.data?.data;
        if (!found) { setNotFound(true); setArticle(null); }
        else setArticle(found);
        const all = allRes?.data?.data ?? [];
        setRelatedArticles(all.filter((a) => a._id !== articleId));
      } catch {
        if (active) { setNotFound(true); setArticle(null); }
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => { active = false; };
  }, [articleId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article.title} - Shri Gaurishankar Baikunthnath Dham`);
    
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#f5eee6] text-stone-700 px-4 py-16">
        <Loader2 className="w-8 h-8 animate-spin text-[#c28227] mb-3" />
        <p className="text-sm font-medium">{currentLang === 'hi' ? 'आलेख लोड हो रहा है…' : 'Loading article…'}</p>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#f5eee6] text-stone-900 px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">
          {currentLang === 'hi' ? 'समाचार आलेख प्राप्त नहीं हुआ' : 'Article Not Found'}
        </h2>
        <button
          onClick={() => navigate('/gallery/media')}
          className="px-6 py-2.5 rounded-full bg-[#c28227] text-white font-semibold text-sm hover:bg-[#a66d1e] transition-colors cursor-pointer"
        >
          {currentLang === 'hi' ? '← मीडिया कवरेज पर वापस जाएं' : '← Back to Media Coverage'}
        </button>
      </div>
    );
  }

  const displayDate = formatMediaDate(article.publicationDate, currentLang);

  return (
    <article className="w-full bg-[#f5eee6] min-h-screen text-stone-900 font-sans relative overflow-hidden pb-16 sm:pb-24">
      
      {/* Background Watermark Accent */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] opacity-10 pointer-events-none z-0 translate-x-20 -translate-y-20">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 relative z-10">
        
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 text-xs">
          <button
            onClick={() => navigate('/gallery/media')}
            className="flex items-center gap-2 text-stone-700 hover:text-[#c28227] font-semibold transition-colors group cursor-pointer bg-white px-4 py-2 rounded-full border border-stone-300/80 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{currentLang === 'hi' ? 'सभी मीडिया समाचार' : 'All Media Coverage'}</span>
          </button>

          {/* Breadcrumb Trail */}
          <div className="hidden sm:flex items-center gap-1.5 text-stone-500 font-medium">
            <Link to="/" className="hover:text-[#c28227] transition-colors">{currentLang === 'hi' ? 'होम' : 'Home'}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link to="/gallery/media" className="hover:text-[#c28227] transition-colors">{currentLang === 'hi' ? 'मीडिया कवरेज' : 'Media'}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#c28227] font-semibold truncate max-w-[220px]">{article.source}</span>
          </div>
        </div>

        {/* Main Article Container */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
          
          {/* Article Header Details */}
          <div className="p-6 sm:p-10 lg:p-12 pb-6 border-b border-stone-100">
            
            {/* Meta Tags: Source, Category, Date, Read Time */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs mb-4">
              <span className="bg-amber-100 text-[#c28227] font-bold px-3.5 py-1 rounded-full flex items-center gap-1.5 border border-amber-300">
                <Newspaper className="w-3.5 h-3.5" />
                <span>{article.source}</span>
              </span>

              <span className="bg-stone-100 text-stone-700 font-semibold px-3 py-1 rounded-full border border-stone-200 uppercase tracking-wider text-[10px]">
                {categoryLabel(article.category, currentLang)}
              </span>

              {displayDate && (
                <span className="text-stone-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{displayDate}</span>
                </span>
              )}

              {article.readTime && (
                <>
                  <span className="text-stone-400 hidden sm:inline">•</span>
                  <span className="text-stone-500 font-medium flex items-center gap-1 hidden sm:flex">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{article.readTime}</span>
                  </span>
                </>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight tracking-tight mb-4">
              {article.title}
            </h1>

            {/* Author & Location Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-stone-500 border-t border-stone-100">
              <div className="flex items-center gap-4">
                {article.author && <span className="font-semibold text-stone-700">{article.author}</span>}
                {article.location && (
                  <span className="flex items-center gap-1 text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-[#c28227]" />
                    <span>{article.location}</span>
                  </span>
                )}
              </div>

              {/* Social Share Group */}
              <div className="flex items-center gap-2">
                <span className="text-stone-400 font-medium mr-1 hidden sm:inline">
                  {currentLang === 'hi' ? 'साझा करें:' : 'Share:'}
                </span>

                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Share on WhatsApp"
                >
                  <span className="text-xs font-bold">WA</span>
                </button>

                <button
                  onClick={() => handleShare('twitter')}
                  className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Share on X / Twitter"
                >
                  <span className="text-xs font-bold">X</span>
                </button>

                <button
                  onClick={() => handleShare('facebook')}
                  className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Share on Facebook"
                >
                  <span className="text-xs font-bold">FB</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[11px] transition-colors cursor-pointer ml-1"
                  title="Copy Article Link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">{currentLang === 'hi' ? 'कॉपी हो गया' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-stone-600" />
                      <span>{currentLang === 'hi' ? 'लिंक कॉपी' : 'Copy Link'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Featured Image */}
          <div className="relative w-full h-72 sm:h-96 lg:h-[460px] bg-stone-950 overflow-hidden">
            <img
              src={article.imageUrl || PLACEHOLDER}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            {/* Image Caption */}
            <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white/90 text-xs font-medium backdrop-blur-sm bg-black/40 px-3 py-1.5 rounded-lg w-fit">
              <span>📷 {article.title} • {article.source}</span>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="p-6 sm:p-10 lg:p-12 space-y-6 sm:space-y-8">
            
            {/* Lead Description Paragraph */}
            <p className="text-base sm:text-lg lg:text-xl font-medium text-stone-800 leading-relaxed border-l-4 border-[#c28227] pl-4 sm:pl-6 bg-amber-50/50 py-3 rounded-r-xl">
              {article.description}
            </p>

            {/* Story Paragraphs */}
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
              {article.paragraphs && article.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Highlighted Quote Callout Box */}
            {article.quote && (
              <div className="bg-gradient-to-r from-amber-50 via-amber-100/40 to-stone-50 border-l-4 border-[#c28227] p-6 sm:p-8 rounded-2xl shadow-sm my-6">
                <p className="text-base sm:text-lg font-bold text-stone-900 italic leading-relaxed mb-3">
                  {article.quote}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#c28227]">
                  {article.quoteAuthor}
                </p>
              </div>
            )}

            {/* Key Highlights Card */}
            {article.highlights && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-7">
                <h4 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#c28227]" />
                  <span>{currentLang === 'hi' ? 'मुख्य बिंदु (Key Highlights)' : 'Key Highlights & Takeaways'}</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {article.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#c28227] font-bold shrink-0 mt-0.5">❖</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags Group */}
            {article.tags && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-500 mr-2">
                  {currentLang === 'hi' ? 'टैग:' : 'Tags:'}
                </span>
                {article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-stone-100 text-stone-600 hover:bg-amber-100 hover:text-[#c28227] px-3 py-1 rounded-full text-xs font-medium transition-colors border border-stone-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-200">
              <button
                onClick={() => navigate('/gallery/media')}
                className="px-6 py-2.5 rounded-full bg-[#c28227] hover:bg-[#a66d1e] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{currentLang === 'hi' ? 'सभी मीडिया कवरेज देखें' : 'Back to All Media Coverage'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold tracking-wide transition-colors flex items-center gap-2 cursor-pointer border border-stone-300"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#c28227]" />}
                <span>{copied ? (currentLang === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link Copied!') : (currentLang === 'hi' ? 'आलेख साझा करें' : 'Share Article')}</span>
              </button>
            </div>

          </div>

        </div>

        {/* More Media Coverage Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 sm:mt-16">
            
            {/* Header with full width divider */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  {currentLang === 'hi' ? 'अन्य प्रमुख मीडिया कवरेज' : 'More Press & Media Coverage'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light mt-1">
                  {currentLang === 'hi' ? 'धाम से संबंधित अन्य प्रकाशित समाचार एवं रिपोर्ट' : 'Explore more published articles and video telecasts'}
                </p>
              </div>

              <button
                onClick={() => navigate('/gallery/media')}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#c28227] hover:underline"
              >
                <span>{currentLang === 'hi' ? 'सभी देखें' : 'View All'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Related Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {relatedArticles.slice(0, 3).map((rel) => (
                <div
                  key={rel._id}
                  onClick={() => {
                    navigate(`/gallery/media/${rel._id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  <div className="h-44 w-full relative overflow-hidden bg-stone-950">
                    <img
                      src={rel.imageUrl || PLACEHOLDER}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
                    />
                    {rel.source && (
                      <div className="absolute top-3 left-3 bg-[#c28227] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                        {rel.source}
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-2.5">
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      <span>{formatMediaDate(rel.publicationDate, currentLang)}</span>
                    </span>

                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#c28227] transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h4>

                    <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#c28227] group-hover:text-[#a66d1e]">
                      <span>{currentLang === 'hi' ? 'आलेख पढ़ें' : 'Read Article'}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </article>
  );
}
