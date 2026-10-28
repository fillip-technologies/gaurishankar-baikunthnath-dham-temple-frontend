import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import shivlingImg from '../../assets/home/sacred_shivling_abhishek.jpg';

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isHi = currentLang === 'hi';

  return (
    <section 
      id="about-section" 
      className="w-full bg-[#fcf8f2] py-14 sm:py-18 lg:py-24 text-stone-900 font-sans border-t border-stone-200/60 relative overflow-hidden"
    >
      {/* Subtle sacred background watermark pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ── Left Column: Sacred Shivling Abhishek Image with Top-Left Om Badge ── */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
            <div className="relative mx-auto max-w-[540px] lg:max-w-none">
              
              {/* Sacred "ॐ" (Om) Floating Badge on Top-Left (Exact Match to Reference UI) */}
              <div 
                className="absolute -top-3.5 -left-3.5 sm:-top-5 sm:-left-5 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#d97706] to-[#b45309] shadow-[0_6px_20px_rgba(180,83,9,0.35)] border-2 sm:border-[3px] border-white flex items-center justify-center text-white text-2xl sm:text-3xl font-hindi select-none transform hover:scale-105 transition-transform"
                title="ॐ"
              >
                ॐ
              </div>

              {/* Main Image Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.14)] border border-[#e8dfcf] bg-stone-100 group">
                <img
                  src={shivlingImg}
                  alt={isHi ? "भगवान शिव शिवलिंग अभिषेक" : "Lord Shiva Sacred Shivling Abhishek"}
                  className="w-full h-[360px] sm:h-[460px] lg:h-[520px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                
                {/* Subtle bottom vignette gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

            </div>
          </div>

          {/* ── Right Column: Heading, Descriptions & Info Cards ── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center relative">
            
            {/* Sacred Hindi "ॐ" (Om) Background Watermark in Right Empty Space */}
            <div 
              className="absolute top-0 sm:top-2 lg:-top-20 xl:-top-22 right-1 sm:right-3 lg:-right-24 xl:-right-28 pointer-events-none select-none z-0 flex items-center justify-center opacity-90"
              aria-hidden="true"
            >
              <div className="relative flex items-center justify-center">
                {/* Subtle sacred mandala rings */}
                <div className="absolute w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-full border border-[#c28227]/15 pointer-events-none" />
                <div className="absolute w-36 h-36 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full border border-dashed border-[#c28227]/10 pointer-events-none" />
                <div className="absolute w-28 h-28 sm:w-36 sm:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-[#ffd778]/15 via-[#c28227]/10 to-transparent blur-xl pointer-events-none" />

                {/* Calligraphic Hindi ॐ in font-yatra */}
                <span className="font-yatra text-[105px] sm:text-[140px] lg:text-[210px] text-[#c28227]/22 leading-none select-none block drop-shadow-xs transform -rotate-3">
                  ॐ
                </span>
              </div>
            </div>

            {/* Pill Tag (Exact Match to Reference UI: ABOUT THE TEMPLE) */}
            <div className="inline-block mb-3.5 sm:mb-4 relative z-10">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#d6a858]/60 bg-[#fbf6ea] text-[#b7791f] text-[11px] sm:text-xs font-semibold tracking-widest uppercase font-sans">
                {t('about.badge', isHi ? 'मंदिर का परिचय' : 'ABOUT THE TEMPLE')}
              </span>
            </div>

            {/* Main Heading (Exact Match to Reference UI: Line 1 Dark Serif, Line 2 Bold Gold Gradient) */}
            <h2 className="flex flex-col tracking-wide mb-2 sm:mb-3 relative z-10">
              {/* Line 1: A SACRED ABODE OF */}
              <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26150f] uppercase leading-tight ${
                isHi ? 'font-yatra' : 'font-cinzel'
              }`}>
                {t('about.headingLine1', isHi ? 'परम पावन धाम' : 'A SACRED ABODE OF')}
              </span>

              {/* Line 2: LORD SHIVA */}
              <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight bg-gradient-to-r from-[#d97706] via-[#c28227] to-[#78350f] bg-clip-text text-transparent ${
                isHi ? 'font-yatra' : 'font-cinzel'
              }`}>
                {t('about.headingLine2', isHi ? 'भगवान शिव (गौरीशंकर धाम)' : 'LORD SHIVA')}
              </span>
            </h2>

            {/* Subtle Gold Accent Underline Bar (Exact Match to Reference UI) */}
            <div className="w-16 sm:w-20 h-[3px] bg-gradient-to-r from-[#c28227] to-[#d97706] rounded-full mb-5 sm:mb-6 relative z-10" />

            {/* Narrative Paragraphs */}
            <div className="space-y-3.5 sm:space-y-4 text-stone-600 sm:text-stone-700 text-xs sm:text-[14px] lg:text-[14.5px] leading-relaxed font-normal relative z-10">
              <p>
                {t('about.desc1')}
              </p>
              <p>
                {t('about.desc2')}
              </p>
            </div>

            {/* Bottom 2 Info Cards (Exact Match to Reference UI: Form & Location) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6 sm:pt-7 relative z-10">
              
              {/* Card 1: Deity / Sacred Form */}
              <div className="bg-[#fffdfa] rounded-xl sm:rounded-2xl border border-[#f0e7d8] p-3.5 sm:p-4 shadow-xs hover:border-[#c28227]/40 transition-colors">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#b7791f] uppercase block font-sans">
                  {t('about.card1Label', isHi ? 'पवित्र स्वरूप' : 'SANCTUM DEITY')}
                </span>
                <span className="text-xs sm:text-sm lg:text-[15px] font-bold text-stone-900 leading-snug mt-1 block">
                  {t('about.card1Value', isHi ? 'हरि-हर स्वरूप (शिव एवं विष्णु)' : 'Hari-Hara Swaroop (Shiva & Vishnu)')}
                </span>
              </div>

              {/* Card 2: Location */}
              <div className="bg-[#fffdfa] rounded-xl sm:rounded-2xl border border-[#f0e7d8] p-3.5 sm:p-4 shadow-xs hover:border-[#c28227]/40 transition-colors">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#b7791f] uppercase block font-sans">
                  {t('about.card2Label', isHi ? 'स्थान' : 'LOCATION')}
                </span>
                <span className="text-xs sm:text-sm lg:text-[15px] font-bold text-stone-900 leading-snug mt-1 block">
                  {t('about.card2Value', isHi ? 'बैकतपुर (खुसरूपुर), पटना, बिहार' : 'Baikathpur, Patna, Bihar')}
                </span>
              </div>

            </div>

            {/* Optional Clean Read More Link */}
            <div className="pt-4 sm:pt-5 relative z-10">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#842c2b] hover:text-[#c28227] transition-colors group"
              >
                <span>{t('about.readMore', isHi ? 'और जानें' : 'Read More')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
