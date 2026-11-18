import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hammer, Landmark, ShieldCheck } from 'lucide-react';
import templeImg from '../../../assets/construction-view.png';

export default function ConstructionOverview() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isHi = currentLang === 'hi';

  return (
    <section className="w-full bg-[#fdfbf7] py-14 sm:py-18 lg:py-20 text-stone-900 font-sans relative overflow-hidden border-b border-stone-200/60">

      {/* Background Mandala Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.06] pointer-events-none z-0 translate-x-14 -translate-y-14">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Left Column: Clean Rounded Square / Rectangular Image Card */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[540px] lg:max-w-none">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-[#e8dfcf] bg-stone-100 group">
                <img
                  src={templeImg}
                  alt={isHi ? "श्री वैकुण्ठनाथ धाम निर्माण कार्य" : "Shri Baikunthnath Dham Construction & Architecture"}
                  className="w-full h-[360px] sm:h-[450px] lg:h-[500px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
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
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight ${isHi ? 'font-sans' : 'font-cinzel'
                }`}>
                {t('constructionPage.overviewTitle', 'Architectural Splendor & Sacred Construction')}
              </h2>
            </div>

            <div className="space-y-3.5 text-stone-700 text-xs sm:text-sm leading-relaxed">
              <p>{t('constructionPage.overviewDesc1')}</p>
              <p>{t('constructionPage.overviewDesc2')}</p>
              <p>{t('constructionPage.overviewDesc3')}</p>
            </div>

            {/* Architectural Highlights */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#e8dfcf] shadow-xs text-stone-800 font-medium">
                <Landmark className="w-4 h-4 text-[#c28227] shrink-0" />
                <span>Nagara Style Stone Shikhara</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#e8dfcf] shadow-xs text-stone-800 font-medium font-hindi">
                <ShieldCheck className="w-4 h-4 text-[#c28227] shrink-0" />
                <span>शताब्दियों तक अक्षुण्ण भव्यता</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
