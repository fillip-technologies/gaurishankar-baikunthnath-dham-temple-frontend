import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';
import templeArchImg from '../../../assets/home/herosection-3.png';

export default function AboutUsStory() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Background Mandala Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Temple Arch Image */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="w-full max-w-[580px] filter drop-shadow-2xl">
              <svg className="w-full h-[380px] sm:h-[460px] lg:h-[500px]" viewBox="0 0 660 530">
                <defs>
                  <clipPath id="aboutPageTempleArch">
                    <path d="M 0 0 L 280 0 C 420 0, 520 60, 540 160 C 610 215, 610 315, 540 370 C 520 470, 420 530, 280 530 L 0 530 Z" />
                  </clipPath>
                </defs>
                <image
                  href={templeArchImg}
                  x="-40"
                  y="0"
                  width="740"
                  height="530"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#aboutPageTempleArch)"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex items-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
              <span>✦</span>
              <span>{t('about.chant', '॥ श्री वैकुण्ठनाथाय नमः ॥')}</span>
              <span>✦</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#c28227] text-lg sm:text-xl font-hindi">─── ༺ ॐ ༻ ───</span>
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight ${
                currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
              }`}>
                {t('about.title', 'Shri Gaurishankar Baikunthnath Dham')}
              </h2>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#c28227] font-hindi leading-snug">
              {t('about.subtitle', 'Sacred Pilgrimage Shrine at Baikathpur')}
            </h3>

            <div className="space-y-3 text-stone-700 text-xs sm:text-sm leading-relaxed">
              <p>{t('about.desc1', 'Shri Gaurishankar Baikunthnath Dham is a sacred pilgrimage shrine situated on the holy banks of Mother Ganga, uniting devotion, sadhana, and Vedic traditions.')}</p>
              <p>{t('about.desc2', 'The temple is renowned for its divine atmosphere, ancient rituals, and spiritual vibrations that bring peace and bliss to thousands of visiting devotees.')}</p>
              <p>{t('about.desc3', 'Here, Lord Vishnu and Lord Shiva are worshipped with supreme reverence, embodying the timeless essence of Harihara unity and Vedic dharma.')}</p>
            </div>

            {/* Badges / Highlights */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-800 font-medium">
                <MapPin className="w-4 h-4 text-[#c28227] shrink-0" />
                <span>Baikathpur (Khusrupur), Patna, Bihar</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-800 font-medium font-hindi">
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
