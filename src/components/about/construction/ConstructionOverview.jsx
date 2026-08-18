import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hammer, Landmark, ShieldCheck } from 'lucide-react';
import templeImg from '../../../assets/home/herosection-2.png';

export default function ConstructionOverview() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Background Mandala Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-14 -translate-y-14">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Frameless Arch Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[560px] filter drop-shadow-2xl">
              <svg className="w-full h-[380px] sm:h-[450px] lg:h-[480px]" viewBox="0 0 660 530">
                <defs>
                  <clipPath id="constructionOverviewArch">
                    <path d="M 0 0 L 280 0 C 420 0, 520 60, 540 160 C 610 215, 610 315, 540 370 C 520 470, 420 530, 280 530 L 0 530 Z" />
                  </clipPath>
                </defs>
                <image
                  href={templeImg}
                  x="-40"
                  y="0"
                  width="740"
                  height="530"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#constructionOverviewArch)"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Architectural Narrative */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex items-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
              <Hammer className="w-4 h-4 text-[#c28227]" />
              <span>{t('constructionPage.overviewSubtitle', 'Ancient Stone Craftsmanship & Modern Pilgrimage Complex')}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#c28227] text-lg sm:text-xl font-hindi">─── ༺ ॐ ༻ ───</span>
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight ${
                currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
              }`}>
                {t('constructionPage.overviewTitle', 'Vedic Nagara Architecture & Sacred Mandir Construction')}
              </h2>
            </div>

            <div className="space-y-3.5 text-stone-700 text-xs sm:text-sm leading-relaxed">
              <p>{t('constructionPage.overviewDesc1')}</p>
              <p>{t('constructionPage.overviewDesc2')}</p>
              <p>{t('constructionPage.overviewDesc3')}</p>
            </div>

            {/* Highlights Badges */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-800 font-medium">
                <Landmark className="w-4 h-4 text-[#c28227] shrink-0" />
                <span>100% Chunar Sandstone Architecture</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-800 font-medium font-hindi">
                <ShieldCheck className="w-4 h-4 text-[#c28227] shrink-0" />
                <span>वैदिक शिल्प शास्त्र अनुकूल निर्माण</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
