import React from 'react';
import { useTranslation } from 'react-i18next';
import { Video, Clock, Eye, Sparkles, Flame } from 'lucide-react';

export default function LiveDarshanBlock() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const aartiSchedule = [
    { name: t('mandirSchedule.aartiCards.pratah', 'Pratah Aarti'), time: '05:30 AM', desc: 'Morning Mangal Aarti & Alankar' },
    { name: t('mandirSchedule.aartiCards.rajbhog', 'Rajbhog Aarti'), time: '12:00 PM', desc: 'Midday Bhog Offering & Mahaprasad' },
    { name: t('mandirSchedule.aartiCards.sandhya', 'Sandhya Aarti'), time: '06:30 PM', desc: 'Evening Ganga Aarti & Deepotsav' },
    { name: t('mandirSchedule.aartiCards.shayan', 'Shayan Aarti'), time: '08:30 PM', desc: 'Night Shayan Aarti & Pushpa Seva' }
  ];

  return (
    <section id="live-darshan-block" className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Background Subtle Watermark */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
            <Sparkles className="w-4 h-4 text-[#c28227]" />
            <span>{t('liveDarshan.chant', '॥ श्री गौरीशंकर बैकुंठनाथ धाम • प्रत्यक्ष दर्शन ॥')}</span>
            <Sparkles className="w-4 h-4 text-[#c28227]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight ${
            currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
          }`}>
            {t('darshanPage.liveTitle', '24x7 Main Sanctum Live Streaming')}
          </h2>

          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {t('darshanPage.liveSubtitle', 'Direct Live Broadcast from Garbha Griha & Ganga Aarti Deck')}
          </p>
        </div>

        {/* Live Stream Container */}
        <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c28227]/40 relative mb-12">
          
          {/* Header Bar over Video */}
          <div className="bg-[#2a080d] px-4 sm:px-6 py-3 border-b border-amber-500/20 flex flex-wrap justify-between items-center gap-2 text-white text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="font-bold tracking-wider text-red-400 uppercase font-sans text-xs">
                LIVE NOW
              </span>
              <span className="hidden sm:inline text-amber-200/40">|</span>
              <span className="font-medium text-amber-100 font-hindi truncate">
                Shri Baikunthnath Dham Main Sanctum
              </span>
            </div>

            <div className="flex items-center gap-2 text-amber-200 text-xs font-semibold bg-black/40 px-3 py-1 rounded-full border border-amber-500/20">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>2,450 Devotees Online</span>
            </div>
          </div>

          {/* YouTube Video iFrame */}
          <div className="w-full aspect-video bg-black">
            <iframe
              src="https://www.youtube.com/embed/pXXBuOyYi6I?si=lAWexJclo4opu__y&autoplay=1&mute=1"
              title="Baikunthnath Dham Live Darshan"
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

        </div>

        {/* Daily Aarti Schedule Cards */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-hindi flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-[#c28227]" />
              <span>Daily Live Aarti Schedule</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aartiSchedule.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#c28227] uppercase tracking-wider font-hindi">
                      {item.name}
                    </span>
                    <Flame className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-2xl font-extrabold text-stone-900 font-sans">
                    {item.time}
                  </p>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
