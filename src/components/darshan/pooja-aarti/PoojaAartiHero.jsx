import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import heroBg from '../../../assets/home/herosection-2.png';

export default function PoojaAartiHero() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <div className="w-full text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#c28227]/40 relative overflow-hidden">
      
      {/* Background Image */}
      <img
        src={heroBg}
        alt="Shri Baikunthnath Dham Pooja & Aarti"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
      />

      {/* Warm Sacred Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-[#2a080d]/60 to-black/75 z-10" />

      {/* Decorative Gold Grid Watermark */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:24px_24px] z-15" />

      <div className="max-w-6xl mx-auto relative z-20 text-center space-y-4">
        
        {/* Sacred Top Chant */}
        <div className="flex items-center justify-center gap-2 text-[#ffd700] text-xs sm:text-sm font-hindi tracking-widest pt-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{t('poojaAartiPage.chant', '॥ ॐ नमः शिवाय • ॐ नमो भगवते वासुदेवाय ॥')}</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffd700] tracking-wider drop-shadow-lg">
          {t('poojaAartiPage.title', 'Pooja & Daily Aarti Schedule')}
        </h1>

        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#c28227] to-transparent mx-auto my-3" />

        {/* Subtitle */}
        <p className="text-amber-100 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed drop-shadow">
          {t('poojaAartiPage.subtitle', 'Immerse in the timeless Vedic rituals and sacred five daily Aartis celebrated at Shri Gaurishankar Baikunthnath Dham')}
        </p>

      </div>

    </div>
  );
}
