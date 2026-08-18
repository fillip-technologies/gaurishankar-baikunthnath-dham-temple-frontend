import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import heroBg from '../../../assets/home/herosection-2.png';

export default function AboutUsHero() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <div className="w-full text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#c28227]/40 relative overflow-hidden">
      
      {/* Background Temple Image */}
      <img 
        src={heroBg} 
        alt="Shri Baikunthnath Dham" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105" 
      />

      {/* Lightened Dark & Gold Overlay for Image Visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-[#2a080d]/45 to-black/60 z-10" />
      
      {/* Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:20px_20px] z-15" />
      
      <div className="max-w-7xl mx-auto relative z-20 text-center space-y-4">

        {/* Sacred Top Mantra */}
        <div className="flex items-center justify-center gap-2 text-[#ffd700] text-xs sm:text-sm font-hindi tracking-widest pt-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>॥ ॐ नमो भगवते वासुदेवाय ॥</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Page Title */}
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffd700] tracking-wider drop-shadow-lg ${
          currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
        }`}>
          {t('about.title', 'Shri Gaurishankar Baikunthnath Dham')}
        </h1>

        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#c28227] to-transparent mx-auto my-3" />

        {/* Subtitle */}
        <p className="text-amber-100 text-sm sm:text-base max-w-2xl mx-auto font-hindi font-medium leading-relaxed drop-shadow">
          {t('about.subtitle', 'A Sacred Abode of Divine Grace, Tradition & Peace on the Holy Banks of Mother Ganga')}
        </p>

      </div>
    </div>
  );
}
