import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Video,
  Flame,
  CalendarDays,
  Utensils,
  Building2,
  HeartHandshake,
  Image,
  Users,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export default function QuickLinksSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isHi = currentLang === 'hi';

  const quickLinks = [
    {
      id: 'live-darshan',
      to: '/darshan/live-darshan',
      titleEn: 'LIVE DARSHAN & DAILY AARTI',
      titleHi: 'लाइव दर्शन एवं नित्य आरती',
      icon: Video,
    },
    {
      id: 'pooja-booking',
      to: '/online-services/pooja-booking',
      titleEn: 'ONLINE POOJA & SANKALP',
      titleHi: 'विशेष पूजा एवं अनुष्ठान',
      icon: Flame,
    },
    {
      id: 'panchang',
      to: '/panchang',
      titleEn: 'DAINIK PANCHANG & MUHURAT',
      titleHi: 'दैनिक पंचांग व शुभ मुहूर्त',
      icon: CalendarDays,
    },
    {
      id: 'prasad-booking',
      to: '/online-services/prasad-booking',
      titleEn: 'MAHAPRASAD SEVA BOOKING',
      titleHi: 'पवित्र महाप्रसाद सेवा',
      icon: Utensils,
    },
    {
      id: 'room-booking',
      to: '/online-services/room-booking',
      titleEn: 'YATRI NIWAS / ROOM BOOKING',
      titleHi: 'धर्मशाला व कक्ष आरक्षण',
      icon: Building2,
    },
    {
      id: 'donation-seva',
      to: '/online-services/seva-daan',
      titleEn: 'DONATION & SEVA FUND',
      titleHi: 'दान एवं सेवा सहयोग',
      icon: HeartHandshake,
    },
    {
      id: 'gallery',
      to: '/gallery/photos',
      titleEn: 'DIVINE PHOTOS & WALLPAPERS',
      titleHi: 'दर्शन दीर्घा व वॉलपेपर',
      icon: Image,
    },
    {
      id: 'volunteers',
      to: '/online-services/volunteers',
      titleEn: 'MANDIR VOLUNTEER SEVA',
      titleHi: 'स्वयंसेवक सेवा पंजीकरण',
      icon: Users,
    },
    {
      id: 'history',
      to: '/history',
      titleEn: 'HISTORY & SACRED HERITAGE',
      titleHi: 'इतिहास एवं पावन धरोहर',
      icon: BookOpen,
    },
  ];

  return (
    <section
      id="quick-links-section"
      className="w-full bg-gradient-to-b from-[#fcf8f2] via-[#f7efe0] to-[#fbf6ee] py-12 sm:py-16 text-stone-900 font-sans border-t-2 border-[#e8d5b5]/80 relative overflow-hidden"
    >
      <span id="quick-links" className="absolute -top-24" aria-hidden="true" />

      {/* Decorative Background Vedic Mandala Accents */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-24 -translate-y-24 text-[#c28227]">
        <svg viewBox="0 0 400 400" className="w-full h-full fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="95" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none z-0 -translate-x-24 translate-y-24 text-[#842c2b]">
        <svg viewBox="0 0 400 400" className="w-full h-full fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center">
          
          {/* Top Sacred Chant */}
          <div className="flex items-center gap-2 text-[#842c2b] text-xs font-hindi tracking-widest mb-1.5 font-semibold">
            <span>✦</span>
            <span>
              {t(
                'quickLinks.chant',
                isHi
                  ? '॥ श्री गौरीशंकर बैकुंठनाथ धाम • सुलभ तीर्थ सेवाएं एवं त्वरित लिंक ॥'
                  : '॥ Shri Gaurishankar Baikunthnath Dham • Devotee Quick Services & Portals ॥'
              )}
            </span>
            <span>✦</span>
          </div>

          {/* Section Title with Traditional Filigree */}
          <div className="flex items-center gap-3">
            <span className="text-[#c28227] text-lg sm:text-2xl font-hindi select-none">─── ༺ 🕉️ ༻ ───</span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#7a1615] tracking-tight drop-shadow-xs ${
                isHi ? 'font-yatra' : 'font-cinzel'
              }`}
            >
              {t('quickLinks.title', isHi ? 'त्वरित सेवाएं एवं लिंक' : 'Quick Links & Services')}
            </h2>
            <span className="text-[#c28227] text-lg sm:text-2xl font-hindi select-none">─── ༺ 🕉️ ༻ ───</span>
          </div>

          {/* Subtitle */}
          <p className="text-stone-700 text-xs sm:text-sm sm:max-w-2xl mx-auto mt-2.5 font-hindi leading-relaxed">
            {t(
              'quickLinks.subtitle',
              isHi
                ? 'श्रद्धालुओं की सुविधा हेतु ऑनलाइन पूजा संकल्प, दैनिक पंचांग, महाप्रसाद, धर्मशाला आरक्षण एवं दान सहयोग की त्वरित सेवाएं।'
                : 'Direct one-touch access to temple pooja bookings, live aarti streaming, daily panchang, prasad delivery, and pilgrim accommodations.'
            )}
          </p>

        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.to}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-[#fffdf7] hover:bg-white rounded-2xl border-2 border-[#edd8ab] hover:border-[#c28227] p-3 sm:p-3.5 lg:p-4 flex items-center justify-between gap-3 shadow-[0_4px_16px_rgba(194,130,39,0.06)] hover:shadow-[0_12px_28px_rgba(194,130,39,0.18)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                {/* Left: Golden Circular Medallion with White Icon */}
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#ffd778] via-[#d49938] to-[#99600e] p-[2px] shadow-[0_4px_12px_rgba(191,126,29,0.3)] shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#e5a83b] via-[#bf7e1d] to-[#8c5208] flex items-center justify-center shadow-inner">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" strokeWidth={1.9} />
                  </div>
                </div>

                {/* Center: Title / Name Only (Bold Cinzel / Yatra Serif) */}
                <div className="flex-1 min-w-0 px-1 sm:px-2 text-left">
                  <h3
                    className={`font-extrabold text-stone-900 group-hover:text-[#842c2b] transition-colors text-xs sm:text-[13px] lg:text-[14px] leading-snug tracking-wider uppercase ${
                      isHi ? 'font-yatra' : 'font-cinzel'
                    }`}
                  >
                    {isHi ? item.titleHi : item.titleEn}
                  </h3>
                </div>

                {/* Right: Circular Golden Arrow Button */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#dca64d] bg-white/90 group-hover:bg-[#842c2b] group-hover:border-[#842c2b] flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 group-hover:scale-105">
                  <ArrowRight
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c28227] group-hover:text-white transition-colors"
                    strokeWidth={2.2}
                  />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
