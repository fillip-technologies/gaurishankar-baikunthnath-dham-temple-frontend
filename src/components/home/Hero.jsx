import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Video, Heart, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import heroBg1 from '../../assets/home/herosection.png';
import heroBg2 from '../../assets/home/herosection-2.png';
import heroBg3 from '../../assets/home/herosection-3.png';

const slides = [
  { id: 0, image: heroBg1, alt: "Baikunth Dham Aerial Sunset View" },
  { id: 1, image: heroBg2, alt: "Baikunth Dham Front Sunset View" },
  { id: 2, image: heroBg3, alt: "Baikunth Dham Side Sunset Panorama View" },
];

// Append cloned first slide to enable seamless infinite left sliding loop
const extendedSlides = [...slides, { ...slides[0], id: 'clone-0' }];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const handleNextSlide = () => {
    setIsAnimated(true);
    setCurrentSlideIndex((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    setIsAnimated(true);
    if (currentSlideIndex === 0) {
      setIsAnimated(false);
      setCurrentSlideIndex(slides.length);
      setTimeout(() => {
        setIsAnimated(true);
        setCurrentSlideIndex(slides.length - 1);
      }, 20);
    } else {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  // Auto-play slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // When transition ends at extended slide (clone), seamlessly reset to slide 0 without animation
  const handleTransitionEnd = () => {
    if (currentSlideIndex >= slides.length) {
      setIsAnimated(false);
      setCurrentSlideIndex(0);
    }
  };

  return (
    <section id="hero-section" className="relative w-full min-h-[560px] sm:min-h-[78vh] lg:min-h-[82vh] bg-stone-950 text-white overflow-hidden flex flex-col justify-between font-sans">
      
      {/* Background Images Slider Track with Continuous Infinite Left Motion */}
      <div 
        className={`absolute inset-0 flex w-full h-full ${
          isAnimated ? 'transition-transform duration-700 ease-out' : ''
        }`}
        style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, index) => {
          const originalIndex = index % slides.length;
          return (
            <div key={`${slide.id}-${index}`} className="w-full h-full flex-shrink-0 relative">
              <img 
                src={slide.image} 
                alt={slide.alt}
                className={`w-full h-full object-cover ${
                  originalIndex === 0 
                    ? 'object-[82%_20%] sm:object-[center_35%]' 
                    : originalIndex === 1 
                    ? 'object-center' 
                    : 'object-[75%_center] sm:object-[center_30%]'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Responsive Gradient Overlays - High Visibility for Right-side Temple */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 via-60% to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20 pointer-events-none z-10" />

      {/* Top Sacred Chant Moving Ticker Marquee & Sound Button */}
      <div className="relative z-30 w-full text-amber-200 py-2 px-3 sm:px-4 flex items-center justify-between gap-3 sm:gap-4 overflow-hidden text-xs sm:text-sm font-hindi">
        
        {/* Continuous Seamless Animated Marquee Ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee-continuous font-medium tracking-wider text-[#ffd700] drop-shadow-md">
            <span className="shrink-0 px-4">
              ॥ ॐ नमः शिवाय • श्री शिवाय नमस्तुभ्यम् • श्री गौरीशङ्कर-वैकुण्ठनाथौ विजयतेतराम् ॥ &nbsp;&nbsp;&nbsp;❁&nbsp;&nbsp;&nbsp; ॥ ॐ नमः शिवाय • श्री शिवाय नमस्तुभ्यम् • श्री गौरीशङ्कर-वैकुण्ठनाथौ विजयतेतराम् ॥ &nbsp;&nbsp;&nbsp;❁&nbsp;&nbsp;&nbsp;
            </span>
            <span className="shrink-0 px-4">
              ॥ ॐ नमः शिवाय • श्री शिवाय नमस्तुभ्यम् • श्री गौरीशङ्कर-वैकुण्ठनाथौ विजयतेतराम् ॥ &nbsp;&nbsp;&nbsp;❁&nbsp;&nbsp;&nbsp; ॥ ॐ नमः शिवाय • श्री शिवाय नमस्तुभ्यम् • श्री गौरीशङ्कर-वैकुण्ठनाथौ विजयतेतराम् ॥ &nbsp;&nbsp;&nbsp;❁&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>

        {/* Audio Mute/Unmute Toggle Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="shrink-0 flex items-center justify-center p-1.5 sm:px-3 sm:py-1 rounded-full bg-[#c28227]/90 hover:bg-[#a66d1e] text-white text-xs font-semibold shadow-lg transition-all border border-amber-300/40 backdrop-blur-sm"
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="hidden sm:inline">Sound On</span>
            </>
          )}
        </button>
      </div>

      {/* Content Container - Bottom Aligned on Phone to show temple shikhara cleanly */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full pb-6 sm:pb-16 lg:pb-20 pt-28 sm:pt-16 sm:my-auto flex flex-col justify-end sm:justify-center min-h-[460px] sm:min-h-0">
        <div className="max-w-2xl flex flex-col items-start gap-2 sm:gap-5">

          {/* Sacred Chant above Main Heading */}
          <div className="flex items-center gap-2 sm:gap-3 text-[#ffd700] text-xs sm:text-base font-hindi tracking-widest">
            <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#c28227]" />
            <span className="drop-shadow">{t('hero.chant')}</span>
            <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#c28227]" />
          </div>

          {/* Main Hero Headings */}
          <div className="flex flex-col gap-0.5 sm:gap-2">
            <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-normal gold-gradient-text drop-shadow-md leading-tight ${
              currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
            }`}>
              {t('hero.titleLine1')}
            </h1>
            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-normal gold-gradient-text drop-shadow-md leading-tight ${
              currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
            }`}>
              {t('hero.titleLine2')}
            </h2>
          </div>

          {/* Description */}
          <p className="text-stone-200/90 text-xs sm:text-base lg:text-lg max-w-xl font-light leading-relaxed drop-shadow mt-0.5">
            {t('hero.desc')}
          </p>

          {/* Action Buttons: Single Row on Phone + Positioned at Bottom */}
          <div className="flex flex-row items-center gap-2.5 sm:gap-3.5 pt-3 sm:pt-4 w-full sm:w-auto">
            <a
              href="#live-darshan"
              className="flex-1 sm:flex-initial bg-[#c28227] hover:bg-[#a66d1e] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded font-semibold text-[11px] sm:text-xs tracking-wider uppercase shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 group"
            >
              <Video className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform shrink-0" />
              <span className="whitespace-nowrap">{t('hero.liveDarshan')}</span>
            </a>

            <a
              href="#donate"
              className="flex-1 sm:flex-initial border border-[#c28227] bg-stone-950/50 hover:bg-[#c28227]/20 backdrop-blur-md text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5"
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
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-stone-950/40 hover:bg-[#c28227] text-white border border-stone-700 hover:border-[#c28227] transition-all backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button 
        onClick={handleNextSlide}
        className="hidden sm:flex absolute right-3 lg:right-14 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-stone-950/40 hover:bg-[#c28227] text-white border border-stone-700 hover:border-[#c28227] transition-all backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Right Side Vertical Slider Dots */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-30">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              setIsAnimated(true);
              setCurrentSlideIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 ${
              (currentSlideIndex % slides.length) === index
                ? 'w-3 h-3 rounded-full border-2 border-[#ffd700] bg-[#c28227] shadow-lg shadow-[#c28227]'
                : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
