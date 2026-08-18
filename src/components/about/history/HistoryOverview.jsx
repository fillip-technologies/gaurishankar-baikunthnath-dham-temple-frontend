import React from 'react';
import { useTranslation } from 'react-i18next';
import { Landmark, Scroll, ShieldCheck } from 'lucide-react';
import templeImg from '../../../assets/home/herosection.png';

export default function HistoryOverview() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Subtle Background Watermark */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none z-0 translate-x-12 -translate-y-12">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Frameless Temple Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[560px] filter drop-shadow-2xl">
              <svg className="w-full h-[380px] sm:h-[450px] lg:h-[480px]" viewBox="0 0 660 530">
                <defs>
                  <clipPath id="historyOverviewArch">
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
                  clipPath="url(#historyOverviewArch)"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Historical Narrative */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex items-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
              <Scroll className="w-4 h-4 text-[#c28227]" />
              <span>{t('historyPage.overviewSubtitle', 'Uniting Eternal Devotion & Vedic Traditions')}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#c28227] text-lg sm:text-xl font-hindi">─── ༺ ॐ ༻ ───</span>
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight ${
                currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
              }`}>
                {t('historyPage.overviewTitle', 'The Sacred Heritage of Baikunthnath Dham')}
              </h2>
            </div>

            <div className="space-y-3.5 text-stone-700 text-xs sm:text-sm leading-relaxed">
              <p>{t('historyPage.overviewDesc1')}</p>
              <p>{t('historyPage.overviewDesc2')}</p>
              <p>{t('historyPage.overviewDesc3')}</p>
            </div>

            {/* Highlight Badges */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-800 font-medium">
                <Landmark className="w-4 h-4 text-[#c28227] shrink-0" />
                <span>Raja Man Singh Era (16th Century)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-800 font-medium font-hindi">
                <ShieldCheck className="w-4 h-4 text-[#c28227] shrink-0" />
                <span>हरि-हर रूप का पावन संगम</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
