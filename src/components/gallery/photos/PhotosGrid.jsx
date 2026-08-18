import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Maximize2, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import imgSanctum from '../../../assets/home/herosection-3.png';
import imgFestival from '../../../assets/home/upcoming-festival.png';
import imgGanga from '../../../assets/home/herosection-2.png';
import imgArchitecture from '../../../assets/home/herosection.png';

export default function PhotosGrid() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = [
    { id: 'all', label: t('photosPage.categories.all', 'All Photos') },
    { id: 'sanctum', label: t('photosPage.categories.sanctum', 'Sanctum & Deities') },
    { id: 'gangaGhat', label: t('photosPage.categories.gangaGhat', 'Ganga Ghat & Aarti') },
    { id: 'festivals', label: t('photosPage.categories.festivals', 'Festivals & Celebrations') },
    { id: 'architecture', label: t('photosPage.categories.architecture', 'Temple Architecture') },
  ];

  const photoList = [
    {
      id: 1,
      category: 'sanctum',
      image: imgSanctum,
      title: t('photosPage.photos.0.title', 'Shri Baikunthnath Main Sanctum'),
      subtitle: t('photosPage.photos.0.subtitle', 'Holy Garbha Griha & Hari-Hara Swaroop'),
      tag: t('photosPage.photos.0.tag', 'Sanctum')
    },
    {
      id: 2,
      category: 'festivals',
      image: imgFestival,
      title: t('photosPage.photos.1.title', 'Grand Shravan Festival & Deepotsav'),
      subtitle: t('photosPage.photos.1.subtitle', 'Holy Celebrations & Devotee Gatherings'),
      tag: t('photosPage.photos.1.tag', 'Festivals')
    },
    {
      id: 3,
      category: 'gangaGhat',
      image: imgGanga,
      title: t('photosPage.photos.2.title', 'Baikathpur Evening Ganga Aarti'),
      subtitle: t('photosPage.photos.2.subtitle', 'Divine Light Offering on Holy Ganga Banks'),
      tag: t('photosPage.photos.2.tag', 'Ganga Ghat')
    },
    {
      id: 4,
      category: 'architecture',
      image: imgArchitecture,
      title: t('photosPage.photos.3.title', 'Vedic Nagara Sandstone Architecture'),
      subtitle: t('photosPage.photos.3.subtitle', 'Intricately Carved Stone Pillars & Shikhara'),
      tag: t('photosPage.photos.3.tag', 'Architecture')
    },
    {
      id: 5,
      category: 'festivals',
      image: imgFestival,
      title: t('photosPage.photos.4.title', 'Shri Krishna Janmashtami Alankar'),
      subtitle: t('photosPage.photos.4.subtitle', 'Flower Decoration & Midnight Aarti'),
      tag: t('photosPage.photos.4.tag', 'Festivals')
    },
    {
      id: 6,
      category: 'gangaGhat',
      image: imgSanctum,
      title: t('photosPage.photos.5.title', 'Sunset View of Temple & Ganga Promenade'),
      subtitle: t('photosPage.photos.5.subtitle', 'Serene Landscape of Mother Ganga'),
      tag: t('photosPage.photos.5.tag', 'Ganga Ghat')
    }
  ];

  const filteredPhotos = activeCategory === 'all'
    ? photoList
    : photoList.filter((item) => item.category === activeCategory);

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

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Center Hover Zoom Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#c28227]/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Overlay Title Only */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-bold text-sm sm:text-base font-hindi text-[#ffd700] truncate">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#c28227] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Enlarged Image */}
            <div className="relative max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Modal Bottom Caption */}
            <div className="p-5 sm:p-6 bg-[#2a080d] border-t border-amber-500/20 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs font-bold text-amber-400 font-hindi uppercase tracking-wider block mb-1">
                  {selectedPhoto.tag}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#ffd700] font-hindi">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/80 font-light">
                  {selectedPhoto.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-5 py-2 rounded-full bg-[#c28227] hover:bg-[#a66d1e] text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer shrink-0"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
