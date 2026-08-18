import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import upcomingEventImg from '../../assets/home/upcoming-festival.png';
import templeBgImg from '../../assets/home/herosection-2.png';

export default function UpcomingEvents() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const events = t('upcomingEvents.events', { returnObjects: true }) || [];

  // Monthly calendar dates (August 2026 starts on Saturday, 31 days)
  const daysOfWeek = currentLang === 'hi' 
    ? ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि']
    : ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  // August 2026 starts on Saturday (index 6)
  const emptyDays = Array(6).fill(null);
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Special festival dates mapping in August 2026
  const festivalDates = [7, 11, 15, 19, 26];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollUpdate = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalPages = Math.ceil(scrollWidth / clientWidth);
      const pageIndex = Math.round((scrollLeft / (scrollWidth - clientWidth)) * (totalPages - 1));
      setActiveIndex(Math.min(Math.max(pageIndex, 0), totalPages - 1));
    }
  };

  return (
    <section id="events-section" className="w-full bg-[#faf7f2] py-10 sm:py-16 text-stone-900 overflow-hidden font-sans border-t border-stone-200/60 relative">
      
      {/* Subtle Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Left Temple Shikhara Watermark Background Image - High Visibility */}
      <div className="absolute left-0 bottom-0 top-0 w-full lg:w-1/2 opacity-70 sm:opacity-80 pointer-events-none overflow-hidden z-0">
        <img
          src={templeBgImg}
          alt="Temple Background"
          className="w-full h-full object-cover object-left-bottom filter brightness-105 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#faf7f2]/60 to-[#faf7f2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-transparent to-[#faf7f2]/60" />
      </div>

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Vertically Centered & Shifted Slightly Right */}
          <div className="lg:col-span-3 flex flex-col justify-center items-start pl-1 sm:pl-3 pr-0 lg:pr-2 my-auto h-full gap-4">
            <div>
              {/* Sacred Chant above UPCOMING EVENTS Title */}
              <div className="flex items-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest mb-2">
                <span className="w-5 h-[1px] bg-[#c28227]/40 rounded-full" />
                <span>ॐ नमः शिवाय</span>
                <span className="w-5 h-[1px] bg-[#c28227]/40 rounded-full" />
              </div>

              {/* Section Title */}
              <h2 className={`text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug ${
                currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
              }`}>
                {t('upcomingEvents.title')}
              </h2>

              {/* Subtitle */}
              <p className="text-stone-600 text-xs sm:text-sm mt-2.5 leading-relaxed max-w-xs font-medium drop-shadow-sm">
                {t('upcomingEvents.subtitle')}
              </p>

              {/* Filigree Divider Line */}
              <div className="flex items-center gap-2 mt-4 mb-2 w-32">
                <div className="h-[2px] bg-[#c28227]/40 flex-1 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-[#c28227]" />
                <div className="h-[2px] bg-[#c28227]/40 flex-1 rounded-full" />
              </div>
            </div>

            {/* Left / Right Carousel Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full border border-stone-300/80 bg-white flex items-center justify-center text-stone-700 hover:bg-[#c28227] hover:border-[#c28227] hover:text-white transition-all shadow-sm active:scale-95"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full bg-[#c28227] flex items-center justify-center text-white hover:bg-[#a66d1e] transition-all shadow-md active:scale-95"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Middle Column: Event Cards Slider */}
          <div className="lg:col-span-6 w-full overflow-hidden flex flex-col justify-between">
            <div 
              ref={scrollRef}
              onScroll={handleScrollUpdate}
              className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth py-1 px-0.5 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {events.map((event, index) => (
                <div
                  key={event.id || index}
                  className="w-full sm:w-[calc(50%-10px)] flex-shrink-0 snap-start group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 flex flex-col h-full">
                    
                    {/* Event Image & Date Badge Overlay */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                      <img
                        src={upcomingEventImg}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Left Date Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <div className={`px-2.5 py-1.5 rounded-xl bg-gradient-to-b ${event.badgeGradient || 'from-amber-800/90 to-amber-950/95'} backdrop-blur-md border border-white/20 shadow-md text-white text-center flex flex-col items-center justify-center min-w-[48px]`}>
                          <span className="text-sm sm:text-base font-bold leading-none font-sans drop-shadow-sm">
                            {event.day}
                          </span>
                          <span className="text-[10px] font-medium tracking-wide uppercase leading-tight mt-0.5 text-amber-200">
                            {event.month}
                          </span>
                          <span className="text-[9px] font-light opacity-80 leading-none mt-0.5">
                            {event.year}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Card Body: ONLY Title & Icon */}
                    <div className="p-4 flex items-center gap-2.5 bg-white border-t border-stone-100 flex-1 min-h-[64px]">
                      <span className="text-base sm:text-lg shrink-0">{event.icon}</span>
                      <h3 className={`font-semibold text-stone-800 text-xs sm:text-sm leading-snug group-hover:text-[#c28227] transition-colors line-clamp-2 ${
                        currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
                      }`}>
                        {event.title}
                      </h3>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Slider Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {[0, 1, 2].map((dotIndex) => (
                <div
                  key={dotIndex}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === dotIndex
                      ? 'w-6 bg-[#c28227]'
                      : 'w-2 bg-stone-300'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Premium Divine Temple Calendar Card */}
          <div className="lg:col-span-3 w-full">
            <div className="bg-gradient-to-b from-white via-[#fdfbf7] to-white rounded-2xl p-4 sm:p-5 border border-amber-300/40 shadow-lg flex flex-col justify-between h-full min-h-[290px] relative overflow-hidden">
              
              {/* Top Ochre Gold Header Bar */}
              <div className="bg-gradient-to-r from-[#9e6317] via-[#c28227] to-[#a86e1e] rounded-xl p-3 text-white shadow-sm flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#ffd700]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {t('upcomingEvents.calendarTitle')}
                  </span>
                </div>
                <span className="bg-stone-950/30 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-amber-200 border border-amber-300/30">
                  {t('upcomingEvents.month')}
                </span>
              </div>

              {/* Days Header Strip */}
              <div className="bg-[#fcedd9]/50 rounded-lg py-1.5 px-1 border border-amber-200/50 mb-1.5 grid grid-cols-7 text-center">
                {daysOfWeek.map((day, idx) => (
                  <div key={idx} className="text-[10px] font-bold text-[#c28227] uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              {/* Mini Calendar Grid Body (Dates) */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs my-auto">
                {emptyDays.map((_, idx) => (
                  <div key={`empty-${idx}`} className="py-1" />
                ))}
                {monthDays.map((day) => {
                  const isFestival = festivalDates.includes(day);

                  return (
                    <div
                      key={day}
                      className={`py-1 rounded-lg text-[11px] font-semibold transition-all relative flex flex-col items-center justify-center ${
                        isFestival
                          ? 'bg-gradient-to-b from-[#c28227] to-[#9e6317] text-white shadow-md font-bold scale-105 border border-amber-300/40 ring-1 ring-amber-400/50'
                          : 'text-stone-700 hover:bg-amber-100/60'
                      }`}
                    >
                      <span>{day}</span>
                      {isFestival && (
                        <span className="w-1.5 h-1.5 bg-[#ffd700] rounded-full mt-0.5 animate-pulse shadow-sm" />
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
