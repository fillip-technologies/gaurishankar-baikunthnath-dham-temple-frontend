import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Video, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import heroBg1 from '../../assets/home/herosection.png';
import heroBg2 from '../../assets/home/herosection-2.png';
import heroBg3 from '../../assets/home/herosection-3.png';

const slides = [
  { id: 0, image: heroBg1, alt: "Baikunth Dham Aerial Sunset View" },
  { id: 1, image: heroBg2, alt: "Baikunth Dham Front Sunset View" },
  { id: 2, image: heroBg3, alt: "Baikunth Dham Side Sunset Panorama View" },
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);

  const goToSlide = (nextIndex) => {
    setCurrentSlideIndex((prev) => {
      if (prev === nextIndex) return prev;
      setPrevSlideIndex(prev);
      return nextIndex;
    });
  };

  const handleNextSlide = () => {
    goToSlide((currentSlideIndex + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    goToSlide((currentSlideIndex - 1 + slides.length) % slides.length);
  };

  // Auto-play slider every 6 seconds with smooth cross-fade
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => {
        const next = (prev + 1) % slides.length;
        setPrevSlideIndex(prev);
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="relative w-full min-h-[560px] sm:min-h-[78vh] lg:min-h-[82vh] bg-stone-950 text-white overflow-hidden flex flex-col justify-between font-sans">
      
      {/* Background Images: Seamless Dissolve (Zero Black Flash) + Ken Burns Slow Zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {slides.map((slide, index) => {
          const isCurrent = index === currentSlideIndex;
          const isPrev = index === prevSlideIndex;

          return (
            <div 
              key={slide.id} 
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isCurrent
                  ? 'opacity-100 z-[2]'
                  : isPrev
                  ? 'opacity-100 z-[1]'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.alt}
                className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                  isCurrent || isPrev ? 'scale-105' : 'scale-100'
                } ${
                  index === 0 
                    ? 'object-[82%_20%] sm:object-[center_35%]' 
                    : index === 1 
                    ? 'object-center' 
                    : 'object-[75%_center] sm:object-[center_30%]'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Responsive Gradient Overlays - Crisp Visibility for Temple & Sunset at Bottom */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 via-60% to-transparent pointer-events-none z-10 hidden sm:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/30 via-50% to-transparent pointer-events-none z-10 sm:hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/20 pointer-events-none z-10 hidden sm:block" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full pb-12 sm:pb-16 lg:pb-20 pt-32 sm:pt-16 mt-auto sm:my-auto flex flex-col justify-end sm:justify-center">
        <div className="max-w-2xl flex flex-col items-start gap-1.5 sm:gap-5">

          {/* Sacred Chant above Main Heading */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-[#ffd700] text-xs sm:text-lg font-mantra tracking-widest">
            <span className="w-4 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#c28227]" />
            <span className="drop-shadow">{t('hero.chant')}</span>
            <span className="w-4 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#c28227]" />
          </div>

          {/* Main Hero Headings */}
          <div className="flex flex-col gap-0.5 sm:gap-2">
            <h1 className={`text-[19px] sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-normal gold-gradient-text drop-shadow-md leading-tight sm:whitespace-nowrap ${
              currentLang === 'hi' ? 'font-yatra' : 'font-cinzel'
            }`}>
              {t('hero.titleLine1')}
            </h1>
            <h2 className={`text-[19px] sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-normal gold-gradient-text drop-shadow-md leading-tight sm:whitespace-nowrap ${
              currentLang === 'hi' ? 'font-yatra' : 'font-cinzel'
            }`}>
              {t('hero.titleLine2')}
            </h2>
          </div>

          {/* Description */}
          <p className="text-stone-200/90 text-[11.5px] sm:text-base lg:text-lg max-w-xl font-light leading-relaxed drop-shadow mt-0.5">
            {t('hero.desc')}
          </p>

          {/* Action Buttons: Single Row on Phone + Positioned at Bottom */}
          <div className="flex flex-row items-center gap-2 sm:gap-3.5 pt-2 sm:pt-4 w-full sm:w-auto">
            <a
              href="#live-darshan"
              className="flex-1 sm:flex-initial bg-[#c28227] hover:bg-[#a66d1e] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded font-semibold text-[10.5px] sm:text-xs tracking-wider uppercase shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 group"
            >
              <Video className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform shrink-0" />
              <span className="whitespace-nowrap">{t('hero.liveDarshan')}</span>
            </a>

            <a
              href="#donate"
              className="flex-1 sm:flex-initial border border-[#c28227] bg-stone-950/60 hover:bg-[#c28227]/20 backdrop-blur-md text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded font-semibold text-[10.5px] sm:text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-[#ffd700] shrink-0" />
              <span className="whitespace-nowrap">{t('hero.donate')}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Manual Chevron Slider Arrows (Hidden on Mobile/Phone) */}
      <button 
        onClick={handlePrevSlide}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-950/50 hover:bg-[#c28227] text-white border border-stone-700 hover:border-[#c28227] transition-all backdrop-blur-sm cursor-pointer hover:scale-110 active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button 
        onClick={handleNextSlide}
        className="hidden sm:flex absolute right-3 lg:right-14 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-950/50 hover:bg-[#c28227] text-white border border-stone-700 hover:border-[#c28227] transition-all backdrop-blur-sm cursor-pointer hover:scale-110 active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Right Side Vertical Slider Dots */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-30">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 cursor-pointer ${
              currentSlideIndex === index
                ? 'w-3 h-3 rounded-full border-2 border-[#ffd700] bg-[#c28227] shadow-lg shadow-[#c28227]'
                : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
