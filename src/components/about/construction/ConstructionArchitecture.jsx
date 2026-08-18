import React from 'react';
import { useTranslation } from 'react-i18next';
import { Landmark, Compass, ShieldCheck, Sparkles } from 'lucide-react';

export default function ConstructionArchitecture() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const archFeatures = [
    {
      icon: <Landmark className="w-6 h-6 text-[#c28227]" />,
      title: t('constructionPage.arch1Title', 'Vedic Nagara Shikhara'),
      desc: t('constructionPage.arch1Desc', 'Majestic central tower rising over the Garbha Griha, crafted according to ancient temple proportions.')
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#c28227]" />,
      title: t('constructionPage.arch2Title', 'Carved Sandstone Pillars'),
      desc: t('constructionPage.arch2Desc', 'Intricately carved stone pillars showcasing motifs of Lord Vishnu, Lord Shiva, and sacred lotus flowers.')
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#c28227]" />,
      title: t('constructionPage.arch3Title', 'Iron-Free Stone Interlocking'),
      desc: t('constructionPage.arch3Desc', 'Traditional mortarless stone interlocking method ensuring structural permanence for centuries.')
    },
    {
      icon: <Compass className="w-6 h-6 text-[#c28227]" />,
      title: t('constructionPage.arch4Title', 'Ganga Ghat & View Promenade'),
      desc: t('constructionPage.arch4Desc', 'Expansive paved Ganga ghat promenade for mass evening Ganga Aarti and holy dips.')
    }
  ];

  return (
    <section className="w-full bg-stone-100 py-12 sm:py-16 text-stone-900 font-sans border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
            <Sparkles className="w-4 h-4 text-[#c28227]" />
            <span>॥ वैदिक स्थापत्य एवं वास्तुकला ॥</span>
            <Sparkles className="w-4 h-4 text-[#c28227]" />
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 ${
            currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
          }`}>
            {t('constructionPage.architectureTitle', 'Architectural Highlights & Features')}
          </h2>
          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {archFeatures.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-bold text-base text-stone-900 font-hindi">
                {item.title}
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
