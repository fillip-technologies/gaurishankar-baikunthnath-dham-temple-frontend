import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Newspaper, Calendar, ExternalLink, Sparkles, X, Maximize2 } from 'lucide-react';
import mediaImg1 from '../../../assets/home/herosection-3.png';
import mediaImg2 from '../../../assets/home/herosection-2.png';
import mediaImg3 from '../../../assets/home/upcoming-festival.png';
import mediaImg4 from '../../../assets/home/herosection.png';

export default function MediaArticlesList() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { id: 'all', label: t('mediaPage.categories.all', 'All Media') },
    { id: 'print', label: t('mediaPage.categories.print', 'Print Newspapers') },
    { id: 'tv', label: t('mediaPage.categories.tv', 'TV & Video Coverage') },
    { id: 'digital', label: t('mediaPage.categories.digital', 'Digital News') },
  ];

  const articleList = [
    {
      id: 1,
      category: 'print',
      image: mediaImg1,
      source: t('mediaPage.articles.0.source', 'Dainik Jagran'),
      date: t('mediaPage.articles.0.date', '14 August 2026'),
      title: t('mediaPage.articles.0.title', 'Grand Renovation & Sandstone Carvings Unveiled at Baikathpur Dham'),
      description: t('mediaPage.articles.0.description', 'State dignitaries and Vedic scholars gathered at Shri Gaurishankar Baikunthnath Dham for the inauguration of renovated stone mandaps and newly paved Ganga Ghat promenade.')
    },
    {
      id: 2,
      category: 'tv',
      image: mediaImg2,
      source: t('mediaPage.articles.1.source', 'DD Bihar Live'),
      date: t('mediaPage.articles.1.date', '02 August 2026'),
      title: t('mediaPage.articles.1.title', 'Live Broadcast of Shravani Somvar Deepotsav at Baikathpur Ganga Deck'),
      description: t('mediaPage.articles.1.description', 'Over 50,000 devotees participated in the sacred evening Ganga Aarti broadcast live on national television from Baikathpur.')
    },
    {
      id: 3,
      category: 'print',
      image: mediaImg3,
      source: t('mediaPage.articles.2.source', 'Hindustan Samachar'),
      date: t('mediaPage.articles.2.date', '20 July 2026'),
      title: t('mediaPage.articles.2.title', 'Historical 16th-Century Heritage of Raja Man Singh Revived'),
      description: t('mediaPage.articles.2.description', 'Historical researchers publish special feature on the ancient Hari-Hara composite deity consecrated during 16th-century royal expedition in Patna district.')
    },
    {
      id: 4,
      category: 'digital',
      image: mediaImg4,
      source: t('mediaPage.articles.3.source', 'Prabhat Khabar Digital'),
      date: t('mediaPage.articles.3.date', '10 June 2026'),
      title: t('mediaPage.articles.3.title', '24x7 Live Sanctum Streaming Launched for Global Pilgrims'),
      description: t('mediaPage.articles.3.description', 'Shri Baikunthnath Mandir Trust launches high-definition live streaming portal for NRI devotees across 40 countries.')
    }
  ];

  const filteredArticles = activeCategory === 'all'
    ? articleList
    : articleList.filter((item) => item.category === activeCategory);

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
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col md:flex-row items-stretch"
            >
              
              {/* LEFT SIDE: IMAGE CONTAINER */}
              <div className="w-full md:w-5/12 h-60 md:h-auto min-h-[220px] relative overflow-hidden bg-stone-950 shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Zoom Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-11 h-11 rounded-full bg-[#c28227]/90 text-white flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: TITLE & DESCRIPTION CONTAINER */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
                
                <div className="space-y-3">
                  
                  {/* Source & Date Badge */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                    <span className="bg-amber-100 text-[#c28227] px-3 py-1 rounded-full font-hindi flex items-center gap-1.5 border border-amber-300">
                      <Newspaper className="w-3.5 h-3.5" />
                      <span>{article.source}</span>
                    </span>

                    <span className="text-stone-500 font-sans flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{article.date}</span>
                    </span>
                  </div>

                  {/* Right Side Title */}
                  <h3 className={`text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#c28227] transition-colors leading-snug ${
                    currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
                  }`}>
                    {article.title}
                  </h3>

                  {/* Right Side Description */}
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-hindi line-clamp-3">
                    {article.description}
                  </p>

                </div>

                {/* Read Full Action Button */}
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#c28227] group-hover:text-[#a66d1e] transition-colors">
                  <span>Read Press Article</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#c28227] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
            </div>

            {/* Modal Details */}
            <div className="p-6 sm:p-8 space-y-4 bg-stone-900 text-white">
              <div className="flex items-center gap-3 text-xs font-bold text-amber-400">
                <span className="bg-[#c28227] text-white px-3 py-1 rounded-full">
                  {selectedArticle.source}
                </span>
                <span>{selectedArticle.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#ffd700] font-hindi leading-snug">
                {selectedArticle.title}
              </h3>

              <p className="text-stone-300 text-sm leading-relaxed font-hindi font-light">
                {selectedArticle.description}
              </p>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-[#c28227] hover:bg-[#a66d1e] text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
