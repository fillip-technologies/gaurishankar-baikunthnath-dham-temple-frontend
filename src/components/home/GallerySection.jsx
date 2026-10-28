import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import imgTemple from '../../assets/home/herosection-3.png';
import imgFestivals from '../../assets/home/upcoming-festival.png';
import imgRathYatra from '../../assets/home/herosection-2.png';
import imgJanmashtami from '../../assets/home/herosection.png';
import imgAbhishek from '../../assets/home/sacred_shivling_abhishek.jpg';
import imgGanga from '../../assets/home/about-reference-bg.jpg';
import imgDiya from '../../assets/home/sacred_diya_temple_bg.jpg';

export default function GallerySection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isHi = currentLang === 'hi';

  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // 8 Cards in 2 Rows (4 cards per row on desktop) matching reference design
  const galleryItems = [
    // ── Row 1 (4 Cards) ──
    { id: 1, key: 'temple', label: t('gallery.items.temple', 'TEMPLE'), subtitle: isHi ? 'भव्य मंदिर परिसर' : 'Grand Temple Complex', image: imgTemple },
    { id: 2, key: 'festivals', label: t('gallery.items.festivals', 'FESTIVALS'), subtitle: isHi ? 'महा रुद्राभिषेक एवं उत्सव' : 'Holy Abhishek & Rituals', image: imgAbhishek },
    { id: 3, key: 'rathYatra', label: t('gallery.items.rathYatra', 'RATH YATRA'), subtitle: isHi ? 'भव्य शिखर एवं गर्भगृह' : 'Sacred Shikhara & Sanctum', image: imgRathYatra },
    { id: 4, key: 'janmashtami', label: t('gallery.items.janmashtami', 'JANMASHTAMI'), subtitle: isHi ? 'गंगा तट विहंगम दृश्य' : 'Holy Ganga Sunset View', image: imgJanmashtami },

    // ── Row 2 (4 Cards) ──
    { id: 5, key: 'droneView', label: t('gallery.items.droneView', 'DRONE VIEW'), subtitle: isHi ? 'बैकतपुर पावन गंगा घाट' : 'Ganga Ghat Twilight Vista', image: imgGanga },
    { id: 6, key: 'deepotsav', label: t('gallery.items.deepotsav', 'DEEPOTSAV'), subtitle: isHi ? 'पावन दीप प्रज्ज्वलन' : 'Auspicious Deepotsav Diya', image: imgDiya },
    { id: 7, key: 'devotees', label: t('gallery.items.devotees', 'DEVOTEES'), subtitle: isHi ? 'श्रद्धालु जन एवं परिक्रमा' : 'Devotees & Grand Parikrama', image: imgFestivals },
    { id: 8, key: 'darshan', label: t('gallery.items.darshan', 'LIVE DARSHAN'), subtitle: isHi ? '२४x७ अखंड दिव्य दर्शन' : '24x7 Sanctum Stream', image: imgTemple },
  ];

  // Close modal on escape key or arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalIndex(null);
      if (e.key === 'ArrowRight' && activeModalIndex !== null) {
        setActiveModalIndex((prev) => (prev + 1) % galleryItems.length);
      }
      if (e.key === 'ArrowLeft' && activeModalIndex !== null) {
        setActiveModalIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, galleryItems.length]);

  const activeItem = activeModalIndex !== null ? galleryItems[activeModalIndex] : null;

  return (
    <section
      id="gallery-section"
      className="w-full py-12 sm:py-16 lg:py-20 bg-[#fcf8f2] text-stone-900 font-sans relative overflow-hidden"
    >
      {/* ── Sacred Hindi "ॐ" Background Watermarks ── */}
      {/* Central Om behind Title */}
      <div
        className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 text-[160px] sm:text-[230px] lg:text-[290px] font-yatra select-none pointer-events-none text-[#c28227]/[0.065] leading-none z-0"
        aria-hidden="true"
      >
        ॐ
      </div>

      {/* Left Ambient Om */}
      <div
        className="absolute top-1/3 -left-6 sm:-left-3 text-[140px] sm:text-[210px] font-yatra select-none pointer-events-none text-[#842c2b]/[0.045] leading-none z-0"
        aria-hidden="true"
      >
        ॐ
      </div>

      {/* Right Ambient Om */}
      <div
        className="absolute bottom-16 -right-6 sm:-right-3 text-[140px] sm:text-[210px] font-yatra select-none pointer-events-none text-[#c28227]/[0.05] leading-none z-0"
        aria-hidden="true"
      >
        ॐ
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header (Clean, Refined, Light Theme) ── */}
        <div className="text-center flex flex-col items-center mb-8 sm:mb-12">

          {/* Heading */}
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-wide uppercase ${
            isHi ? 'font-yatra' : 'font-cinzel'
          }`}>
            {t('gallery.title', isHi ? 'दिव्य दीर्घा' : 'DIVINE GALLERY')}
          </h2>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-3 mt-2 select-none">
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#c28227]/60 to-[#c28227]" />
            <span className="text-[#c28227] text-xs select-none">༺ 🌸 ༻</span>
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#c28227]/60 to-[#c28227]" />
          </div>

          {/* Subtitle */}
          <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal leading-relaxed text-center">
            {t('gallery.subtitle', isHi 
              ? 'हमारे मंदिर के अलौकिक सौंदर्य, पावन उत्सवों एवं भव्य दर्शनों की पावन झलकियाँ' 
              : 'Glance into the divine beauty, grand festivals, and sacred moments of our temple'
            )}
          </p>
        </div>

        {/* ── 2 Rows Grid: Exactly 4 Cards per Row on Desktop (8 Cards Total) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveModalIndex(index)}
              className="group cursor-pointer select-none relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-stone-200"
              title={item.label}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveModalIndex(index);
                }
              }}
            >
              {/* Full Bleed Image with Smooth Rounded Corners matching reference screenshot */}
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Subtle Bottom Vignette on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Hover Overlay with Label & Quick View Icon */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="self-end">
                  <div className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md">
                    <Eye className="w-4 h-4 text-stone-900 stroke-[2.2]" />
                  </div>
                </div>

                <div>
                  <span className={`text-white text-xs sm:text-sm font-bold tracking-wider uppercase drop-shadow-md block ${
                    isHi ? 'font-hindi' : 'font-cinzel'
                  }`}>
                    {item.label}
                  </span>
                  <span className="text-stone-200 text-[11px] block truncate">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Centered Explore More Button ── */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <Link
            to="/gallery/photos"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#842c2b] hover:bg-[#6b2221] text-white font-bold text-xs sm:text-sm tracking-widest uppercase shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-amber-300/30 group cursor-pointer active:scale-95 font-cinzel"
          >
            <span>{t('gallery.explore', isHi ? 'और देखें' : 'Explore More')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </div>

      {/* ── Fullscreen Lightbox Modal Preview ── */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveModalIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveModalIndex(null)}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-stone-900/80 border border-white/20 text-white hover:bg-stone-800 flex items-center justify-center transition-all z-50 cursor-pointer shadow-xl"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveModalIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-stone-900/80 border border-white/20 text-white hover:bg-stone-800 flex items-center justify-center transition-all z-50 cursor-pointer shadow-xl"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveModalIndex((prev) => (prev + 1) % galleryItems.length);
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-stone-900/80 border border-white/20 text-white hover:bg-stone-800 flex items-center justify-center transition-all z-50 cursor-pointer shadow-xl"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-950 max-h-[75vh] flex items-center justify-center border border-white/10">
              <img
                src={activeItem.image}
                alt={activeItem.label}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="mt-4 text-center flex flex-col items-center text-white">
              <h3 className={`text-xl sm:text-2xl font-bold tracking-widest uppercase ${
                isHi ? 'font-yatra' : 'font-cinzel'
              }`}>
                {activeItem.label}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1">
                {activeItem.subtitle}
              </p>

              <div className="flex items-center gap-4 mt-3">
                <Link
                  to="/gallery/photos"
                  onClick={() => {
                    setActiveModalIndex(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>{isHi ? 'संपूर्ण गैलरी देखें' : 'View in Full Gallery'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
