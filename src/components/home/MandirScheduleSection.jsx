import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Sunset, Moon, Flame, Clock, Sparkles } from 'lucide-react';
import bgDoors from '../../assets/home/herosection.png';
import bgAarti1 from '../../assets/home/herosection-3.png';
import bgAarti2 from '../../assets/home/upcoming-festival.png';
import bgAarti3 from '../../assets/home/herosection-2.png';
import bgAarti4 from '../../assets/home/herosection.png';

export default function MandirScheduleSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <section id="schedule-section" className="w-full bg-[#faf7f2] py-14 sm:py-20 text-stone-900 font-sans border-t border-stone-200/60 relative overflow-hidden">
      
      {/* Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center mb-10 sm:mb-14">
          
          {/* Top Sacred Chant */}
          <div className="flex items-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest mb-1">
            <span>✦</span>
            <span>{t('mandirSchedule.chant')}</span>
            <span>✦</span>
          </div>

          {/* Section Title with Filigree */}
          <div className="flex items-center gap-3">
            <span className="text-[#c28227] text-lg sm:text-2xl font-hindi">─── ༺ 🔔 ༻ ───</span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight ${
              currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
            }`}>
              {t('mandirSchedule.title')}
            </h2>
            <span className="text-[#c28227] text-lg sm:text-2xl font-hindi">─── ༺ 🔔 ༻ ───</span>
          </div>

          {/* Subtitle */}
          <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal leading-relaxed">
            {t('mandirSchedule.subtitle')}
          </p>

        </div>

        {/* 2-Column Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Temple Door Opening & Closing Card with Clean Natural Image (No Red Tint) */}
          <div className="lg:col-span-5 flex">
            <div className="w-full relative rounded-[28px] overflow-hidden border-2 border-stone-800/20 shadow-2xl flex flex-col justify-between p-6 sm:p-8 text-white group">
              
              {/* Background Image with Clean Dark Gradient (No Red/Maroon Overlay Tint) */}
              <img
                src={bgDoors}
                alt="Temple Doors Background"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/75 to-black/40" />

              {/* Top Status Pill */}
              <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 bg-emerald-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-400/30 shadow-md animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>{t('mandirSchedule.statusOpen')}</span>
                </div>
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>


              {/* Timings List */}
              <div className="relative z-10 space-y-5 my-auto">
                
                {/* Opening Time Box */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/70 border border-white/15 backdrop-blur-md shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                    <Sun className="w-6 h-6 text-[#ffd700]" />
                  </div>
                  <div>
                    <span className="text-xs text-amber-200/90 font-medium uppercase tracking-wider">
                      {t('mandirSchedule.openingTime')}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-bold text-[#ffd700] font-cinzel leading-tight mt-0.5">
                      {t('mandirSchedule.openingTimeVal')}
                    </h4>
                    <p className="text-xs text-stone-300 mt-1 font-light">
                      {t('mandirSchedule.openingSub')}
                    </p>
                  </div>
                </div>

                {/* Closing Time Box */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/70 border border-white/15 backdrop-blur-md shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                    <Moon className="w-6 h-6 text-amber-200" />
                  </div>
                  <div>
                    <span className="text-xs text-amber-200/90 font-medium uppercase tracking-wider">
                      {t('mandirSchedule.closingTime')}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-bold text-[#ffd700] font-cinzel leading-tight mt-0.5">
                      {t('mandirSchedule.closingTimeVal')}
                    </h4>
                    <p className="text-xs text-stone-300 mt-1 font-light">
                      {t('mandirSchedule.closingSub')}
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Decorative Line */}
              <div className="relative z-10 flex items-center gap-2 mt-6 pt-4 border-t border-white/15 justify-center">
                <span className="h-[1px] w-8 bg-amber-400/40" />
                <span className="text-amber-400 text-xs">❖ ॐ नमः शिवाय ❖</span>
                <span className="h-[1px] w-8 bg-amber-400/40" />
              </div>

            </div>
          </div>

          {/* Right Column: 4 Sacred Aarti Cards Grid with Clean Natural Images */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            
            {/* Aarti Card 1: Pratah Aarti */}
            <div className="relative rounded-[24px] overflow-hidden border-2 border-stone-800/10 shadow-lg hover:shadow-2xl hover:border-[#c28227] transition-all duration-300 group min-h-[200px] flex flex-col justify-between p-5 sm:p-6 text-white">
              <img
                src={bgAarti1}
                alt="Pratah Aarti Background"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/70 to-stone-950/30" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-900/70 backdrop-blur-md text-amber-300 border border-white/20 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-[#ffd700]" />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 border border-white/20 flex items-center gap-1 shadow-inner">
                    <Clock className="w-3 h-3 text-[#ffd700]" />
                    <span>05:30 AM</span>
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-amber-200 font-hindi drop-shadow">
                  {t('mandirSchedule.aartiCards.pratah')}
                </h4>
                <p className="text-xs text-stone-200/90 mt-1 leading-relaxed font-light">
                  {t('mandirSchedule.aartiCards.pratahSub')}
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span>{t('mandirSchedule.aartiCards.pratahTime')}</span>
                <span className="text-stone-300 text-[10px] uppercase font-bold tracking-wider">• daily ritual</span>
              </div>
            </div>

            {/* Aarti Card 2: Rajbhog Aarti */}
            <div className="relative rounded-[24px] overflow-hidden border-2 border-stone-800/10 shadow-lg hover:shadow-2xl hover:border-[#c28227] transition-all duration-300 group min-h-[200px] flex flex-col justify-between p-5 sm:p-6 text-white">
              <img
                src={bgAarti2}
                alt="Rajbhog Aarti Background"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/70 to-stone-950/30" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-900/70 backdrop-blur-md text-orange-300 border border-white/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-orange-300 border border-white/20 flex items-center gap-1 shadow-inner">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span>12:00 PM</span>
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-amber-200 font-hindi drop-shadow">
                  {t('mandirSchedule.aartiCards.rajbhog')}
                </h4>
                <p className="text-xs text-stone-200/90 mt-1 leading-relaxed font-light">
                  {t('mandirSchedule.aartiCards.rajbhogSub')}
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span>{t('mandirSchedule.aartiCards.rajbhogTime')}</span>
                <span className="text-stone-300 text-[10px] uppercase font-bold tracking-wider">• daily ritual</span>
              </div>
            </div>

            {/* Aarti Card 3: Sandhya Aarti */}
            <div className="relative rounded-[24px] overflow-hidden border-2 border-stone-800/10 shadow-lg hover:shadow-2xl hover:border-[#c28227] transition-all duration-300 group min-h-[200px] flex flex-col justify-between p-5 sm:p-6 text-white">
              <img
                src={bgAarti3}
                alt="Sandhya Aarti Background"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/70 to-stone-950/30" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-900/70 backdrop-blur-md text-amber-300 border border-white/20 flex items-center justify-center">
                    <Sunset className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 border border-white/20 flex items-center gap-1 shadow-inner">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>06:30 PM</span>
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-amber-200 font-hindi drop-shadow">
                  {t('mandirSchedule.aartiCards.sandhya')}
                </h4>
                <p className="text-xs text-stone-200/90 mt-1 leading-relaxed font-light">
                  {t('mandirSchedule.aartiCards.sandhyaSub')}
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span>{t('mandirSchedule.aartiCards.sandhyaTime')}</span>
                <span className="text-stone-300 text-[10px] uppercase font-bold tracking-wider">• daily ritual</span>
              </div>
            </div>

            {/* Aarti Card 4: Shayan Aarti */}
            <div className="relative rounded-[24px] overflow-hidden border-2 border-stone-800/10 shadow-lg hover:shadow-2xl hover:border-[#c28227] transition-all duration-300 group min-h-[200px] flex flex-col justify-between p-5 sm:p-6 text-white">
              <img
                src={bgAarti4}
                alt="Shayan Aarti Background"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/70 to-stone-950/30" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-900/70 backdrop-blur-md text-purple-200 border border-white/20 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-purple-200 border border-white/20 flex items-center gap-1 shadow-inner">
                    <Clock className="w-3 h-3 text-purple-300" />
                    <span>08:30 PM</span>
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-amber-200 font-hindi drop-shadow">
                  {t('mandirSchedule.aartiCards.shayan')}
                </h4>
                <p className="text-xs text-stone-200/90 mt-1 leading-relaxed font-light">
                  {t('mandirSchedule.aartiCards.shayanSub')}
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span>{t('mandirSchedule.aartiCards.shayanTime')}</span>
                <span className="text-stone-300 text-[10px] uppercase font-bold tracking-wider">• daily ritual</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
