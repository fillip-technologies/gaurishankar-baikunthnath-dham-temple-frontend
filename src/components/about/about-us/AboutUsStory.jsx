import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ShieldCheck } from 'lucide-react';
import shivlingImg from '../../../assets/home/hero-image-3.png';

export default function AboutUsStory() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isHi = currentLang === 'hi';

  return (
    <section className="w-full bg-[#fdfbf7] py-14 sm:py-18 lg:py-20 text-stone-900 font-sans relative overflow-hidden border-b border-stone-200/60">

      {/* Background Subtle Watermark Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.06] pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 2-Column Story Layout (Exact Match to Reference UI) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Left Column: Sacred Image Card */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[540px] lg:max-w-none">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-[#e8dfcf] bg-stone-100 group">
                <img
                  src={shivlingImg}
                  alt={isHi ? "भगवान शिव शिवलिंग अभिषेक" : "Lord Shiva Sacred Shivling Abhishek"}
                  className="w-full h-[360px] sm:h-[450px] lg:h-[500px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            {/* Pill Tag (Exact Match to Reference UI) */}
            <div className="inline-block mb-3">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#d6a858]/60 bg-[#fbf6ea] text-[#b7791f] text-[11px] sm:text-xs font-semibold tracking-widest uppercase font-sans">
                {isHi ? 'इतिहास' : 'HISTORY'}
              </span>
            </div>

            {/* Main Heading (Exact Match to Reference UI: Line 1 Dark Serif, Line 2 Bold Gold Gradient) */}
            <h2 className="flex flex-wrap items-baseline gap-2 sm:gap-2.5 tracking-wide mb-2 sm:mb-3">
              <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26150f] uppercase leading-tight ${isHi ? 'font-yatra' : 'font-cinzel'
                }`}>
                {isHi ? 'भक्ति और आस्था की' : 'A LEGACY OF'}
              </span>
              <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight bg-gradient-to-r from-[#d97706] via-[#c28227] to-[#78350f] bg-clip-text text-transparent ${isHi ? 'font-yatra' : 'font-cinzel'
                }`}>
                {isHi ? 'अमर परंपरा' : 'DEVOTION'}
              </span>
            </h2>

            {/* Gold Accent Underline Bar */}
            <div className="w-14 sm:w-16 h-[2.5px] bg-[#c28227] rounded-full mb-4 sm:mb-5" />

            {/* Subtitle / Temple Reference */}
            <h3 className="text-sm sm:text-base font-bold text-[#8b1a1a] mb-3">
              {t('about.title', 'Shri Gaurishankar Baikunthnath Dham')} — {t('about.subtitle', 'Sacred Pilgrimage Shrine at Baikathpur')}
            </h3>

            {/* Narrative Paragraphs */}
            <div className="space-y-3 sm:space-y-3.5 text-stone-600 sm:text-stone-700 text-xs sm:text-[14px] leading-relaxed">
              <p>{t('about.desc1', 'Shri Gaurishankar Baikunthnath Dham is a sacred pilgrimage shrine situated on the holy banks of Mother Ganga, uniting devotion, sadhana, and Vedic traditions.')}</p>
              <p>{t('about.desc2', 'The temple is renowned for its divine atmosphere, ancient rituals, and spiritual vibrations that bring peace and bliss to thousands of visiting devotees.')}</p>
              <p>{t('about.desc3', 'Here, Lord Vishnu and Lord Shiva are worshipped with supreme reverence, embodying the timeless essence of Harihara unity and Vedic dharma.')}</p>
            </div>

            {/* Badges / Highlights */}
            <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#e8dfcf] shadow-xs text-stone-800 font-medium">
                <MapPin className="w-4 h-4 text-[#c28227] shrink-0" />
                <span>Baikathpur (Khusrupur), Patna, Bihar</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#e8dfcf] shadow-xs text-stone-800 font-medium font-hindi">
                <ShieldCheck className="w-4 h-4 text-[#c28227] shrink-0" />
                <span>श्री वैकुण्ठनाथ मंदिर ट्रस्ट द्वारा संचालित</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
