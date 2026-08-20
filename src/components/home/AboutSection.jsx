import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, BookOpen, ArrowRight } from 'lucide-react';
import templeArchImg from '../../assets/home/herosection-3.png';

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <section id="about-section" className="w-full bg-[#f5eee6] pt-8 sm:pt-12 pb-12 sm:pb-16 text-stone-900 font-sans border-t border-stone-200/60 relative overflow-hidden">
      
      {/* Right Top & Right Side Elegant Mandala Vector Overlay */}
      <div className="absolute top-0 right-0 w-[460px] h-[460px] opacity-15 pointer-events-none z-0 translate-x-12 -translate-y-12">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M 200 20 C 220 70, 220 130, 200 200 C 180 130, 180 70, 200 20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              transform={`rotate(${i * 30} 200 200)`}
            />
          ))}
        </svg>
      </div>

      <div className="w-full max-w-[1536px] mx-auto px-0 sm:px-4 lg:px-8 relative z-10">
        
        {/* Top 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-2 sm:mb-4">
          
          {/* Left Column: Frameless Clean Arch */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex justify-start pl-0 -ml-0 sm:-ml-4 lg:-ml-8">
            <div className="w-full max-w-[660px] lg:max-w-none relative filter drop-shadow-2xl">
              <svg className="w-full h-[420px] sm:h-[480px] lg:h-[530px]" viewBox="0 0 660 530">
                <defs>
                  <clipPath id="templeCleanFramelessArch">
                    <path d="M 0 0 L 280 0 C 420 0, 520 60, 540 160 C 610 215, 610 315, 540 370 C 520 470, 420 530, 280 530 L 0 530 Z" />
                  </clipPath>
                </defs>
                
                {/* Clipped Temple Photo - Clean, Borderless */}
                <image
                  href={templeArchImg}
                  x="-40"
                  y="0"
                  width="740"
                  height="530"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#templeCleanFramelessArch)"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Heading, Chant, Subtitle & Extended Paragraphs + READ MORE Button */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center px-4 sm:px-6 lg:px-0 lg:pl-4 space-y-3.5">
            
            {/* Top Chant */}
            <div className="flex items-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
              <span>✦</span>
              <span>{t('about.chant')}</span>
              <span>✦</span>
            </div>

            {/* Title with Full Width Dynamic Sacred Accent Lines */}
            <div className="w-full flex items-center gap-2.5 sm:gap-4 my-1">
              <div className="h-[1.5px] sm:h-[2px] flex-1 bg-gradient-to-r from-transparent to-[#c28227] rounded-full" />
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[#c28227] text-sm sm:text-lg font-hindi select-none">ॐ</span>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-stone-900 tracking-tight whitespace-nowrap ${
                  currentLang === 'hi' ? 'font-sans font-bold' : 'font-cinzel'
                }`}>
                  {t('about.title')}
                </h2>
                <span className="text-[#c28227] text-sm sm:text-lg font-hindi select-none">ॐ</span>
              </div>
              <div className="h-[1.5px] sm:h-[2px] flex-1 bg-gradient-to-l from-transparent to-[#c28227] rounded-full" />
            </div>

            {/* Subtitle */}
            <h3 className="text-base sm:text-lg font-bold text-[#c28227] font-hindi leading-snug">
              {t('about.subtitle')}
            </h3>

            {/* Paragraph 1 */}
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal">
              {t('about.desc1')}
            </p>

            {/* Paragraph 2 */}
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal">
              {t('about.desc2')}
            </p>

            {/* Paragraph 3 */}
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal">
              {t('about.desc3')}
            </p>

            {/* READ MORE Button */}
            <div className="pt-2 sm:pt-3">
              <button className="bg-[#c28227] hover:bg-[#a66d1e] text-white px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2.5 w-fit group cursor-pointer active:scale-95">
                <span>{t('about.readMore')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Deep Burgundy Maroon Purpose Banner */}
        <div className="mx-4 sm:mx-6 lg:mx-8 bg-[#38060d] rounded-[28px] p-5 sm:p-7 text-white border border-amber-500/20 shadow-2xl relative overflow-hidden mt-8 sm:mt-10 lg:mt-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            
            {/* Left Mission Info */}
            <div className="lg:col-span-3 flex flex-col items-start">
              <h3 className="text-xl sm:text-2xl font-bold text-amber-200 font-hindi">
                {t('about.missionTitle')}
              </h3>
              
              <div className="flex items-center gap-2 my-2 text-amber-400/80 text-xs">
                <span className="h-[1px] w-6 bg-amber-400/40" />
                <span>❖</span>
                <span className="h-[1px] w-6 bg-amber-400/40" />
              </div>

              <p className="text-xs text-amber-100/90 leading-relaxed font-light">
                {t('about.missionDesc')}
              </p>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block lg:col-span-1 flex justify-center">
              <div className="w-[1px] h-24 bg-amber-400/20" />
            </div>

            {/* Middle 4 Pillars Icons */}
            <div className="lg:col-span-4 grid grid-cols-4 gap-2 text-center py-2 lg:py-0">
              
              {/* Pillar 1 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/40 bg-amber-950/70 flex items-center justify-center text-amber-200 font-hindi text-2xl shadow-inner hover:scale-105 transition-transform">
                  ॐ
                </div>
                <span className="text-[11px] font-medium text-amber-100/90 leading-tight">
                  {t('about.pillars.spiritual')}
                </span>
              </div>

              {/* Pillar 2 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/40 bg-amber-950/70 flex items-center justify-center text-amber-200 text-xl shadow-inner hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-[#ffd700]" />
                </div>
                <span className="text-[11px] font-medium text-amber-100/90 leading-tight">
                  {t('about.pillars.welfare')}
                </span>
              </div>

              {/* Pillar 3 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/40 bg-amber-950/70 flex items-center justify-center text-amber-200 text-xl shadow-inner hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6 text-[#ffd700]" />
                </div>
                <span className="text-[11px] font-medium text-amber-100/90 leading-tight">
                  {t('about.pillars.culture')}
                </span>
              </div>

              {/* Pillar 4 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/40 bg-amber-950/70 flex items-center justify-center text-amber-200 font-hindi text-xl shadow-inner hover:scale-105 transition-transform">
                  🔱
                </div>
                <span className="text-[11px] font-medium text-amber-100/90 leading-tight">
                  {t('about.pillars.harmony')}
                </span>
              </div>

            </div>

            {/* Right Scalloped Quote Card - Elegant Corner Quote Marks */}
            <div className="lg:col-span-4 pl-0 lg:pl-2 flex items-center">
              <div className="bg-[#fef9ee] text-stone-900 p-5 sm:p-6 rounded-[24px] border-2 border-[#c28227] shadow-xl relative overflow-hidden w-full text-center flex flex-col items-center justify-center min-h-[160px]">
                
                {/* Large Gold Opening Quote (Top Left) */}
                <div className="absolute top-2 left-3 text-[#c28227] text-4xl sm:text-5xl font-serif font-bold opacity-80 pointer-events-none select-none leading-none">
                  “
                </div>

                {/* Large Gold Closing Quote (Bottom Right) */}
                <div className="absolute bottom-5 right-3 text-[#c28227] text-4xl sm:text-5xl font-serif font-bold opacity-80 pointer-events-none select-none leading-none">
                  ”
                </div>

                {/* Clean Centered Verse Text */}
                <div className="relative z-10 space-y-1 text-xs sm:text-sm font-semibold text-stone-800 font-hindi leading-snug text-center max-w-[260px] my-auto px-2">
                  <p>{t('about.quoteLine1')}</p>
                  <p>{t('about.quoteLine2')}</p>
                  <p>{t('about.quoteLine3')}</p>
                </div>

                {/* Bottom Filigree Centered */}
                <div className="relative z-10 flex items-center gap-2 mt-3 justify-center">
                  <span className="h-[1px] w-6 bg-[#c28227]/40" />
                  <span className="text-[#c28227] text-xs">❖</span>
                  <span className="h-[1px] w-6 bg-[#c28227]/40" />
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
