import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import imgTemple from '../../assets/home/herosection-3.png';
import imgFestivals from '../../assets/home/upcoming-festival.png';
import imgRathYatra from '../../assets/home/herosection-2.png';
import imgJanmashtami from '../../assets/home/herosection.png';
import imgDroneView from '../../assets/home/herosection.png';
import imgDevotees from '../../assets/home/herosection-3.png';

export default function GallerySection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const galleryItems = [
    { id: 1, key: 'temple', label: t('gallery.items.temple'), image: imgTemple },
    { id: 2, key: 'festivals', label: t('gallery.items.festivals'), image: imgFestivals },
    { id: 3, key: 'rathYatra', label: t('gallery.items.rathYatra'), image: imgRathYatra },
    { id: 4, key: 'janmashtami', label: t('gallery.items.janmashtami'), image: imgJanmashtami },
    { id: 5, key: 'droneView', label: t('gallery.items.droneView'), image: imgDroneView },
    { id: 6, key: 'devotees', label: t('gallery.items.devotees'), image: imgDevotees },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="gallery-section"
      className="w-full py-8 sm:py-14 text-white font-sans relative bg-fixed bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${imgJanmashtami})` }}
    >
      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center flex flex-col items-center mb-4 sm:mb-6">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ffd700] tracking-widest uppercase ${currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
            }`}>
            {t('gallery.title')}
          </h2>

          {/* Filigree Ornamental Line */}
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[#c28227] text-xs">─── ༺ 🌺 ༻ ───</span>
          </div>
        </div>

        {/* Gallery Carousel Container with Left & Right Arrow Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 relative">

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-amber-500/40 bg-stone-900/80 hover:bg-[#c28227] hover:border-[#ffd700] text-amber-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer shrink-0 z-20 active:scale-95"
            aria-label="Previous Gallery Slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* 6 Cards Grid Track */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {galleryItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center group cursor-pointer">

                {/* Image Card Frame */}
                <div className="w-full aspect-[4/4.5] rounded-xl overflow-hidden border-2 border-amber-500/35 shadow-xl bg-stone-900 relative group-hover:border-[#ffd700] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.35)] transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Label */}
                <span className={`text-[10px] sm:text-xs font-semibold tracking-wider text-amber-100/90 group-hover:text-[#ffd700] transition-colors mt-2 text-center uppercase ${currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
                  }`}>
                  {item.label}
                </span>

              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-amber-500/40 bg-stone-900/80 hover:bg-[#c28227] hover:border-[#ffd700] text-amber-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer shrink-0 z-20 active:scale-95"
            aria-label="Next Gallery Slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>

      </div>
    </section>
  );
}
