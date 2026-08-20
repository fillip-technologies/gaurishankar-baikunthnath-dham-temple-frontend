import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Newspaper, Calendar, ExternalLink, Sparkles, Maximize2, ArrowRight } from 'lucide-react';
import { getMediaArticles } from './mediaData';

export default function MediaArticlesList() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('mediaPage.categories.all', 'All Media') },
    { id: 'print', label: t('mediaPage.categories.print', 'Print Newspapers') },
    { id: 'tv', label: t('mediaPage.categories.tv', 'TV & Video Coverage') },
    { id: 'digital', label: t('mediaPage.categories.digital', 'Digital News') },
  ];

  const articleList = getMediaArticles(t, currentLang);

  const filteredArticles = activeCategory === 'all'
    ? articleList
    : articleList.filter((item) => item.category === activeCategory);

  const handleArticleClick = (articleId) => {
    navigate(`/gallery/media/${articleId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Background Watermark Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#c28227] text-white shadow-md scale-105'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Media Articles List: LEFT SIDE IMAGE | RIGHT SIDE TITLE & DESCRIPTION */}
        <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-md hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 group cursor-pointer flex flex-col md:flex-row items-stretch"
            >
              
              {/* LEFT SIDE: IMAGE CONTAINER */}
              <div className="w-full md:w-5/12 h-60 md:h-auto min-h-[220px] relative overflow-hidden bg-stone-950 shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Zoom/Arrow Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-4 py-2 rounded-full bg-[#c28227] text-white font-semibold text-xs flex items-center gap-2 shadow-xl">
                    <span>{currentLang === 'hi' ? 'आलेख पढ़ें' : 'Read Article'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: TITLE & DESCRIPTION CONTAINER */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
                
                <div className="space-y-3">
                  
                  {/* Source & Date Badge */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-bold">
                    <span className="bg-amber-100 text-[#c28227] px-3 py-1 rounded-full flex items-center gap-1.5 border border-amber-300">
                      <Newspaper className="w-3.5 h-3.5" />
                      <span>{article.source}</span>
                    </span>

                    <span className="text-stone-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{article.date}</span>
                    </span>
                  </div>

                  {/* Right Side Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#c28227] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Right Side Description */}
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {article.description}
                  </p>

                </div>

                {/* Read Full Action Button */}
                <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#c28227] group-hover:text-[#a66d1e] transition-colors">
                  <span>{currentLang === 'hi' ? 'पूरा समाचार आलेख पढ़ें' : 'Read Full Press Article'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}

