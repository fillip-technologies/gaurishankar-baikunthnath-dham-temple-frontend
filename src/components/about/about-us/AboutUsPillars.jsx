import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, BookOpen } from 'lucide-react';

export default function AboutUsPillars() {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[#f5eee6] pb-14 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Burgundy Purpose Banner */}
        <div className="bg-[#38060d] rounded-[28px] p-6 sm:p-8 text-white border border-amber-500/20 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            
            {/* Left Mission Info */}
            <div className="lg:col-span-3 flex flex-col items-start space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-amber-200 font-hindi">
                {t('about.missionTitle', 'Our Sacred Mission')}
              </h3>
              
              <div className="flex items-center gap-2 text-amber-400/80 text-xs">
                <span className="h-[1px] w-6 bg-amber-400/40" />
                <span>❖</span>
                <span className="h-[1px] w-6 bg-amber-400/40" />
              </div>

              <p className="text-xs text-amber-100/90 leading-relaxed font-light">
                {t('about.missionDesc', 'Preserving ancient Sanatan traditions, fostering devotion, spiritual awakening, and serving society through selfless seva.')}
              </p>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block lg:col-span-1 flex justify-center">
              <div className="w-[1px] h-24 bg-amber-400/20" />
            </div>

            {/* Middle 4 Pillars Icons */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center py-2 lg:py-0">
              
              {/* Pillar 1 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/40 bg-amber-950/70 flex items-center justify-center text-amber-200 font-hindi text-2xl shadow-inner hover:scale-105 transition-transform">
                  ॐ
                </div>
                <span className="text-[11px] font-medium text-amber-100/90 leading-tight">
                  {t('about.pillars.spiritual', 'Spiritual Awakening')}
                </span>
              </div>

              {/* Pillar 2 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/40 bg-amber-950/70 flex items-center justify-center text-amber-200 text-xl shadow-inner hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-[#ffd700]" />
                </div>
                <span className="text-[11px] font-medium text-amber-100/90 leading-tight">
                  {t('about.pillars.welfare', 'Social Welfare')}
                </span>
              </div>

              {/* Pillar 3 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/40 bg-amber-950/70 flex items-center justify-center text-amber-200 text-xl shadow-inner hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6 text-[#ffd700]" />
                </div>
                <span className="text-[11px] font-medium text-amber-100/90 leading-tight">
                  {t('about.pillars.culture', 'Vedic Culture')}
                </span>
              </div>

              {/* Pillar 4 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/40 bg-amber-950/70 flex items-center justify-center text-amber-200 font-hindi text-xl shadow-inner hover:scale-105 transition-transform">
                  🔱
                </div>
                <span className="text-[11px] font-medium text-amber-100/90 leading-tight">
                  {t('about.pillars.harmony', 'Universal Harmony')}
                </span>
              </div>

            </div>

            {/* Right Quote Card */}
            <div className="lg:col-span-4 flex items-center">
              <div className="bg-[#fef9ee] text-stone-900 p-5 rounded-[24px] border-2 border-[#c28227] shadow-xl relative overflow-hidden w-full text-center flex flex-col items-center justify-center min-h-[150px]">
                
                <div className="absolute top-2 left-3 text-[#c28227] text-4xl font-serif font-bold opacity-80 pointer-events-none select-none leading-none">
                  “
                </div>

                <div className="absolute bottom-5 right-3 text-[#c28227] text-4xl font-serif font-bold opacity-80 pointer-events-none select-none leading-none">
                  ”
                </div>

                <div className="relative z-10 space-y-1 text-xs sm:text-sm font-semibold text-stone-800 font-hindi leading-snug text-center max-w-[260px] my-auto px-2">
                  <p>{t('about.quoteLine1', 'धर्मो रक्षति रक्षितः')}</p>
                  <p>{t('about.quoteLine2', 'सत्यं शिवं सुंदरम्')}</p>
                  <p>{t('about.quoteLine3', 'वसुधैव कुटुंबकम्')}</p>
                </div>

                <div className="relative z-10 flex items-center gap-2 mt-2 justify-center">
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
