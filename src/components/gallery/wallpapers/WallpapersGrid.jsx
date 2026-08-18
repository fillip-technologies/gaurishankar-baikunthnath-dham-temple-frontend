import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Maximize2, X, Sparkles } from 'lucide-react';
import wallSanctum from '../../../assets/home/herosection-3.png';
import wallGanga from '../../../assets/home/herosection-2.png';
import wallFestival from '../../../assets/home/upcoming-festival.png';
import wallMandir from '../../../assets/home/herosection.png';

export default function WallpapersGrid() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: t('wallpapersPage.categories.all', 'All Wallpapers') },
    { id: 'mobile', label: t('wallpapersPage.categories.mobile', 'Mobile (Vertical)') },
    { id: 'desktop', label: t('wallpapersPage.categories.desktop', 'Desktop (Horizontal)') },
    { id: 'sanctum', label: t('wallpapersPage.categories.sanctum', 'Sanctum & Deities') },
    { id: 'gangaGhat', label: t('wallpapersPage.categories.gangaGhat', 'Ganga Ghat') },
  ];

  const wallpaperList = [
    { id: 1, category: 'desktop', image: wallSanctum, isVertical: false },
    { id: 2, category: 'mobile', image: wallFestival, isVertical: true },
    { id: 3, category: 'gangaGhat', image: wallGanga, isVertical: false },
    { id: 4, category: 'sanctum', image: wallMandir, isVertical: false },
    { id: 5, category: 'mobile', image: wallSanctum, isVertical: true },
    { id: 6, category: 'desktop', image: wallFestival, isVertical: false },
  ];

  const filteredWallpapers = activeCategory === 'all'
    ? wallpaperList
    : wallpaperList.filter((item) => item.category === activeCategory);

  const handleDownload = (e, imageUrl) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'baikunthnath-dham-wallpaper.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        {/* Wallpaper Image Grid - NO TEXT, ONLY IMAGE & DOWNLOAD ICON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredWallpapers.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.image)}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
            >
              {/* Image Box */}
              <div className={`relative w-full overflow-hidden bg-stone-950 ${item.isVertical ? 'h-80 sm:h-96' : 'h-64 sm:h-72'}`}>
                <img
                  src={item.image}
                  alt="Baikunthnath Dham Wallpaper"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Subtle Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating Download Button Icon */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={(e) => handleDownload(e, item.image)}
                    className="w-11 h-11 rounded-full bg-[#c28227] hover:bg-[#a66d1e] text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all border-2 border-white/80 cursor-pointer"
                    title="Download HD Wallpaper"
                  >
                    <Download className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-amber-300 flex items-center justify-center border border-amber-500/30">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl flex flex-col items-center">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#c28227] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Full Image */}
            <div className="relative max-h-[75vh] overflow-hidden flex items-center justify-center bg-black w-full p-2">
              <img
                src={selectedImage}
                alt="Enlarged Wallpaper"
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Bottom Bar with Download Button */}
            <div className="w-full p-4 bg-[#2a080d] border-t border-amber-500/20 text-white flex justify-between items-center">
              <span className="text-xs font-bold text-amber-300 font-hindi">
                HD Temple Wallpaper
              </span>

              <button
                onClick={(e) => handleDownload(e, selectedImage)}
                className="px-5 py-2 rounded-full bg-[#c28227] hover:bg-[#a66d1e] text-white text-xs font-bold tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Wallpaper</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
