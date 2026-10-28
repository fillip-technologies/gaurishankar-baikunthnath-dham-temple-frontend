import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Sunset, Moon, Flame, Clock } from 'lucide-react';
import templeSunriseBg from '../../assets/home/about-reference-bg.jpg';
import bgAarti1 from '../../assets/home/herosection-3.png';
import bgAarti2 from '../../assets/home/sacred_shivling_abhishek.jpg';
import bgAarti3 from '../../assets/home/sacred_diya_temple_bg.jpg';
import bgAarti4 from '../../assets/home/upcoming-festival.png';

// Decorative Hanging Golden Temple Bells Component (Exact Match to Reference UI)
function HangingBells({ className = '', flip = false }) {
  return (
    <div className={`pointer-events-none select-none ${className} ${flip ? 'scale-x-[-1]' : ''}`}>
      <svg viewBox="0 0 160 220" className="w-full h-full filter drop-shadow-md">
        <defs>
          <linearGradient id={flip ? "bellGoldR" : "bellGoldL"} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe699" />
            <stop offset="35%" stopColor="#d49938" />
            <stop offset="70%" stopColor="#b3781e" />
            <stop offset="100%" stopColor="#7a4807" />
          </linearGradient>
          <linearGradient id={flip ? "chainGoldR" : "chainGoldL"} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c28227" />
            <stop offset="100%" stopColor="#e5a83b" />
          </linearGradient>
        </defs>

        {/* Bell 1 (Longest - Left) */}
        <g>
          <line x1="28" y1="0" x2="28" y2="105" stroke={`url(#${flip ? "chainGoldR" : "chainGoldL"})`} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="28" cy="108" r="3" fill="none" stroke={`url(#${flip ? "bellGoldR" : "bellGoldL"})`} strokeWidth="1.5" />
          <path
            d="M 21 120 C 21 110, 35 110, 35 120 C 37 130, 41 136, 43 139 C 44 140, 42 142, 28 142 C 14 142, 12 140, 13 139 C 15 136, 19 130, 21 120 Z"
            fill={`url(#${flip ? "bellGoldR" : "bellGoldL"})`}
            stroke="#6e3f05"
            strokeWidth="0.8"
          />
          <ellipse cx="28" cy="142" rx="15" ry="3" fill={`url(#${flip ? "bellGoldR" : "bellGoldL"})`} stroke="#6e3f05" strokeWidth="0.8" />
          <circle cx="28" cy="146" r="2.5" fill="#ffd700" />
        </g>

        {/* Bell 2 (Medium - Center) */}
        <g>
          <line x1="75" y1="0" x2="75" y2="65" stroke={`url(#${flip ? "chainGoldR" : "chainGoldL"})`} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="75" cy="68" r="2.5" fill="none" stroke={`url(#${flip ? "bellGoldR" : "bellGoldL"})`} strokeWidth="1.5" />
          <path
            d="M 69 78 C 69 70, 81 70, 81 78 C 83 86, 86 91, 88 93 C 89 94, 87 96, 75 96 C 63 96, 61 94, 62 93 C 64 91, 67 86, 69 78 Z"
            fill={`url(#${flip ? "bellGoldR" : "bellGoldL"})`}
            stroke="#6e3f05"
            strokeWidth="0.8"
          />
          <ellipse cx="75" cy="96" rx="13" ry="2.5" fill={`url(#${flip ? "bellGoldR" : "bellGoldL"})`} stroke="#6e3f05" strokeWidth="0.8" />
          <circle cx="75" cy="99" r="2" fill="#ffd700" />
        </g>

        {/* Bell 3 (Shortest - Right) */}
        <g>
          <line x1="125" y1="0" x2="125" y2="35" stroke={`url(#${flip ? "chainGoldR" : "chainGoldL"})`} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="125" cy="38" r="2.2" fill="none" stroke={`url(#${flip ? "bellGoldR" : "bellGoldL"})`} strokeWidth="1.2" />
          <path
            d="M 120 47 C 120 41, 130 41, 130 47 C 132 53, 134 57, 136 59 C 137 60, 135 61, 125 61 C 115 61, 113 60, 114 59 C 116 57, 118 53, 120 47 Z"
            fill={`url(#${flip ? "bellGoldR" : "bellGoldL"})`}
            stroke="#6e3f05"
            strokeWidth="0.7"
          />
          <ellipse cx="125" cy="61" rx="11" ry="2.2" fill={`url(#${flip ? "bellGoldR" : "bellGoldL"})`} stroke="#6e3f05" strokeWidth="0.7" />
          <circle cx="125" cy="64" r="1.8" fill="#ffd700" />
        </g>
      </svg>
    </div>
  );
}

export default function MandirScheduleSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isHi = currentLang === 'hi';

  const aartiCards = [
    {
      id: 'pratah',
      title: t('mandirSchedule.aartiCards.pratah', isHi ? 'प्रातः आरती' : 'Pratah Aarti'),
      subtitle: t('mandirSchedule.aartiCards.pratahSub', isHi ? 'मंगल श्रृंगार व मंगला आरती' : 'Morning Alankar & Mangala Aarti'),
      time: t('mandirSchedule.aartiCards.pratahTime', '05:30 AM'),
      icon: Sun,
      img: bgAarti1,
    },
    {
      id: 'rajbhog',
      title: t('mandirSchedule.aartiCards.rajbhog', isHi ? 'राजभोग आरती' : 'Rajbhog Aarti'),
      subtitle: t('mandirSchedule.aartiCards.rajbhogSub', isHi ? 'विशेष महाभोग अर्पण' : 'Midday Bhog Prasad Offering'),
      time: t('mandirSchedule.aartiCards.rajbhogTime', '12:00 PM'),
      icon: Flame,
      img: bgAarti2,
    },
    {
      id: 'sandhya',
      title: t('mandirSchedule.aartiCards.sandhya', isHi ? 'संध्या आरती' : 'Sandhya Aarti'),
      subtitle: t('mandirSchedule.aartiCards.sandhyaSub', isHi ? 'सायंकालीन आरती व गंगा आरती' : 'Evening Ganga Aarti & Deepotsav'),
      time: t('mandirSchedule.aartiCards.sandhyaTime', '06:30 PM'),
      icon: Sunset,
      img: bgAarti3,
    },
    {
      id: 'shayan',
      title: t('mandirSchedule.aartiCards.shayan', isHi ? 'शयन आरती' : 'Shayan Aarti'),
      subtitle: t('mandirSchedule.aartiCards.shayanSub', isHi ? 'शयन आरती व पुष्प विसर्जन' : 'Night Flower Decoration & Shayan'),
      time: t('mandirSchedule.aartiCards.shayanTime', '08:30 PM'),
      icon: Moon,
      img: bgAarti4,
    },
  ];

  return (
    <section
      id="schedule-section"
      className="w-full bg-[#fcf8f2] py-14 sm:py-20 text-stone-900 font-sans border-t border-stone-200/60 relative overflow-hidden"
    >
      <span id="aarti-timings" className="absolute -top-24" aria-hidden="true" />

      {/* Decorative Hanging Golden Bells on Top-Left & Top-Right */}
      <HangingBells className="absolute -top-2 left-2 sm:left-6 lg:left-10 w-24 sm:w-32 lg:w-40 h-36 sm:h-48 z-10 opacity-90" />
      <HangingBells className="absolute -top-2 right-2 sm:right-6 lg:right-10 w-24 sm:w-32 lg:w-40 h-36 sm:h-48 z-10 opacity-90" flip />

      {/* Subtle Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center mb-10 sm:mb-12">
          
          {/* Top Chant: — ❖ ॥ Har Har Mahadev ॥ ❖ — */}
          <div className="flex items-center gap-2 text-[#842c2b] text-xs sm:text-[13px] font-hindi tracking-widest mb-1.5 font-semibold">
            <span className="w-6 sm:w-10 h-[1px] bg-[#c28227]/60" />
            <span className="text-[10px] text-[#c28227]">❖</span>
            <span>{isHi ? '॥ हर हर महादेव ॥' : '॥ Har Har Mahadev ॥'}</span>
            <span className="text-[10px] text-[#c28227]">❖</span>
            <span className="w-6 sm:w-10 h-[1px] bg-[#c28227]/60" />
          </div>

          {/* Section Title */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#5c1615] tracking-tight drop-shadow-xs ${
              isHi ? 'font-yatra' : 'font-cinzel'
            }`}
          >
            {t('mandirSchedule.title', isHi ? 'आरती एवं मंदिर समय' : 'Aarti & Temple Timings')}
          </h2>

          {/* Golden Trishul (Trident) & Filigree Divider */}
          <div className="flex items-center justify-center gap-2 mt-2 select-none text-[#c28227]">
            <div className="flex items-center gap-1.5">
              <span className="w-10 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-[#c28227]" />
              <span className="text-[10px]">❖</span>
            </div>
            
            {/* Sacred Trishul Symbol */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-[#c28227] fill-current drop-shadow-xs">
              <path d="M12 2L10 6H14L12 2Z" />
              <path d="M5 5C5 8.5 7.5 11 11 11.2V22H13V11.2C16.5 11 19 8.5 19 5H17C17 7.5 15 9.5 12.5 9.5H11.5C9 9.5 7 7.5 7 5H5Z" />
              <path d="M11 5H13V10H11V5Z" />
            </svg>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px]">❖</span>
              <span className="w-10 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-[#c28227]" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-stone-600 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto font-hindi leading-relaxed">
            {t(
              'mandirSchedule.subtitle',
              isHi
                ? 'भगवान के दिव्य दर्शन, दैनिक आरती एवं मंदिर खुलने व बंद होने की समय सारणी'
                : 'Daily schedule of divine Aarti ceremonies, temple opening and closing hours'
            )}
          </p>

        </div>

        {/* 2-Column Main Schedule Grid (Matching Exact Reference Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* Left Column: Temple Hours Card (Maroon Gradient + Sunrise Temple Spire Image) */}
          <div className="lg:col-span-5 flex">
            <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#dca64d]/60 shadow-xl flex flex-col justify-between p-6 sm:p-7 lg:p-8 text-white group min-h-[380px] sm:min-h-[420px]">
              
              {/* Background Temple Sunrise Image on Right */}
              <img
                src={templeSunriseBg}
                alt="Temple at Sunrise"
                className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700"
              />
              {/* Rich Maroon Gradient Overlay covering Left Side */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#440d12] via-[#4d0f15]/95 via-55% to-transparent" />

              {/* Ornate Vintage Corner Filigree in Top-Left */}
              <svg
                className="absolute top-3 left-3 w-8 h-8 text-amber-400/35 pointer-events-none"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
              >
                <path d="M 2 16 L 2 5 C 2 3.3 3.3 2 5 2 L 16 2" strokeWidth="1.5" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
                <path d="M 5 10 C 5 7.2 7.2 5 10 5" strokeWidth="1" />
              </svg>

              {/* Card Header Content */}
              <div className="relative z-10">
                <h3
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-100 tracking-wide drop-shadow-sm ${
                    isHi ? 'font-yatra' : 'font-cinzel'
                  }`}
                >
                  {t('mandirSchedule.hoursTitle', isHi ? 'मंदिर दर्शन समय' : 'Temple Hours')}
                </h3>

                <p className="text-xs sm:text-[13px] text-amber-100/80 font-hindi leading-relaxed mt-2.5 max-w-xs sm:max-w-sm">
                  {isHi
                    ? 'श्री गौरीशंकर वैकुंठनाथ धाम में दर्शन कर पुण्य लाभ प्राप्त करें। मंदिर नित्य दर्शन एवं आरती हेतु निर्धारित समय पर खुला रहता है।'
                    : 'Seek blessings at Shri Gaurishankar Baikunthnath Dham. The temple remains open daily for darshan and Aarti as per the following timings.'}
                </p>

                {/* Subtle Filigree Line */}
                <div className="flex items-center gap-2 my-4 opacity-40">
                  <span className="w-8 h-[1px] bg-amber-300" />
                  <span className="text-amber-300 text-xs">❖</span>
                  <span className="w-8 h-[1px] bg-amber-300" />
                </div>
              </div>

              {/* Timings List */}
              <div className="relative z-10 space-y-4 sm:space-y-5 my-auto">
                
                {/* Opening Time Item */}
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Golden Sun Medallion */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-400/60 bg-[#2d070b]/90 flex items-center justify-center shrink-0 shadow-md">
                    <Sun className="w-6 h-6 text-[#ffd700]" />
                  </div>
                  <div>
                    <span className="block text-[11px] sm:text-xs text-amber-200/85 uppercase tracking-wider font-medium">
                      {t('mandirSchedule.openingTime', isHi ? 'कपाट खुलने का समय' : 'Opening Time')}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#ffd700] font-cinzel leading-none mt-0.5 tracking-wide">
                      {t('mandirSchedule.openingTimeVal', '05:00 AM')}
                    </div>
                    <span className="block text-[11px] sm:text-xs text-stone-300 font-light mt-1">
                      {t('mandirSchedule.openingSub', isHi ? 'प्रातः कपाट उद्घाटन एवं मंगला आरती' : 'Morning door opening & Mangal Aarti')}
                    </span>
                  </div>
                </div>

                {/* Closing Time Item */}
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Golden Moon Medallion */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-400/60 bg-[#2d070b]/90 flex items-center justify-center shrink-0 shadow-md">
                    <Moon className="w-6 h-6 text-[#ffd700]" />
                  </div>
                  <div>
                    <span className="block text-[11px] sm:text-xs text-amber-200/85 uppercase tracking-wider font-medium">
                      {t('mandirSchedule.closingTime', isHi ? 'कपाट बंद होने का समय' : 'Closing Time')}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#ffd700] font-cinzel leading-none mt-0.5 tracking-wide">
                      {t('mandirSchedule.closingTimeVal', '09:00 PM')}
                    </div>
                    <span className="block text-[11px] sm:text-xs text-stone-300 font-light mt-1">
                      {t('mandirSchedule.closingSub', isHi ? 'रात्रि कपाट विश्राम एवं शयन समाधि' : 'Night door closing & Shayan Samadhi')}
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Subtle Mantra */}
              <div className="relative z-10 flex items-center gap-2 pt-3 border-t border-white/15 justify-start text-[11px] text-amber-200/70 font-hindi">
                <span>॥ ॐ नमः शिवाय • ॐ नमो नारायणाय ॥</span>
              </div>

            </div>
          </div>

          {/* Right Column: 4 Sacred Aarti Cards in 2x2 Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {aartiCards.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.id}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#dca64d]/60 shadow-md hover:shadow-2xl hover:border-[#ffd700] transition-all duration-300 group min-h-[190px] sm:min-h-[210px] flex flex-col justify-between p-4 sm:p-5 text-white"
                >
                  {/* Background Image */}
                  <img
                    src={c.img}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/65 to-black/35" />

                  {/* Top: Circular Golden Icon */}
                  <div className="relative z-10">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-400/50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center shadow-md mb-2 sm:mb-2.5">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                    </div>

                    {/* Title */}
                    <h4
                      className={`text-base sm:text-lg lg:text-xl font-bold text-white drop-shadow-md leading-snug ${
                        isHi ? 'font-yatra' : 'font-cinzel'
                      }`}
                    >
                      {c.title}
                    </h4>

                    {/* Subtitle */}
                    <p className="text-[11px] sm:text-xs text-amber-100/85 mt-1 font-hindi leading-snug">
                      {c.subtitle}
                    </p>
                  </div>

                  {/* Bottom: Warm Golden Time Pill Badge */}
                  <div className="relative z-10 mt-3 pt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#f6e7c7] border border-[#d4a853] text-[#5c1615] shadow-md group-hover:bg-[#fbf4e6] transition-colors">
                      <Clock className="w-3.5 h-3.5 text-[#842c2b] shrink-0" />
                      <span className="font-extrabold text-xs sm:text-[13px] font-cinzel tracking-wider text-[#5c1615]">
                        {c.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
