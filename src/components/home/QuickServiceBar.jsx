import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function QuickServiceBar() {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const location = useLocation();

  const services = [
    {
      id: 'live-darshan',
      labelEn: 'Live Darshan',
      labelHi: 'लाइव दर्शन',
      to: '#live-darshan',
      fallbackTo: '/darshan/live-darshan',
      icon: (
        // Exact Video Camera with lens & top button (Image 2 Match)
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#b7791f] group-hover:text-[#842c2b] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2.5" y="6.5" width="12" height="11" rx="3" />
          <path d="M14.5 10.5l5-3v9l-5-3" />
          <circle cx="8.5" cy="12" r="2.3" />
          <path d="M5.5 4h3" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      id: 'aarti-timings',
      labelEn: 'Aarti Timings',
      labelHi: 'आरती समय',
      to: '#schedule-section',
      fallbackTo: '/darshan/pooja-aarti',
      icon: (
        // Exact Sacred Diya with pointed flame (Image 2 Match)
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#b7791f] group-hover:text-[#842c2b] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Flame teardrop */}
          <path
            d="M12 2.5c-.8 2-2 3.6-2 5.5 0 1.8 1 2.8 2 2.8s2-1 2-2.8c0-1.9-1.2-3.5-2-5.5z"
            fill="#f59e0b"
            stroke="#b7791f"
            strokeWidth="1.5"
          />
          {/* Diya Cup */}
          <path d="M4.5 13.5c0 3 3.5 5 7.5 5s7.5-2 7.5-5H4.5z" fill="#fef3c7" stroke="currentColor" />
          {/* Diya Base */}
          <path d="M8 18.5l-1 2.5h10l-1-2.5" />
        </svg>
      ),
    },
    {
      id: 'book-pooja',
      labelEn: 'Book Pooja',
      labelHi: 'पूजा बुकिंग',
      to: '/online-services/pooja-booking',
      icon: (
        // Exact Sacred Lotus Flower (Image 2 Match)
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#b7791f] group-hover:text-[#842c2b] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Center Petal */}
          <path d="M12 4c-1.8 3.5-1.8 7.5 0 11 1.8-3.5 1.8-7.5 0-11z" fill="#fef3c7" stroke="currentColor" />
          {/* Left Petal */}
          <path d="M11 6.5C8 8.5 6.5 11.5 7 15c2.5 0 4.5-1.5 5-3.5" />
          {/* Right Petal */}
          <path d="M13 6.5C16 8.5 17.5 11.5 17 15c-2.5 0-4.5-1.5-5-3.5" />
          {/* Bottom Left Calyx */}
          <path d="M7 14c-2.5 1-4 3-4 5 3 0 5-1.5 6-3.5" />
          {/* Bottom Right Calyx */}
          <path d="M17 14c2.5 1 4 3 4 5-3 0-5-1.5-6-3.5" />
          {/* Base Stem */}
          <path d="M9 19.5c2 .6 4 .6 6 0" />
        </svg>
      ),
    },
    {
      id: 'make-donation',
      labelEn: 'Make a Donation',
      labelHi: 'दान / समर्पण',
      to: '#donate',
      fallbackTo: '/online-services/donation',
      icon: (
        // Exact Two Cupped Hands Holding Floating Heart (Image 2 Match)
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#b7791f] group-hover:text-[#842c2b] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Floating Heart */}
          <path
            d="M12 5.5c-.7-1.5-2.5-1.5-3.3 0-1 1.5.8 3 3.3 5 2.5-2 4.3-3.5 3.3-5-.8-1.5-2.6-1.5-3.3 0z"
            fill="#f59e0b"
            stroke="#b7791f"
            strokeWidth="1.3"
          />
          {/* Left Hand */}
          <path d="M4 14c1.2 0 2.8.5 4 1.5l3.5 3c-1.5 1.5-3.5 2-6 2-1 0-2-.5-2.5-1.2L2 17.5" />
          {/* Right Hand */}
          <path d="M20 14c-1.2 0-2.8.5-4 1.5L12.5 18.5c1.5 1.5 3.5 2 6 2 1 0 2-.5 2.5-1.2l1-1.8" />
          <path d="M7.5 12c-.8 0-1.8.6-2.2 1.5" />
          <path d="M16.5 12c.8 0 1.8.6 2.2 1.5" />
        </svg>
      ),
    },
    {
      id: 'temple-services',
      labelEn: 'Temple Services',
      labelHi: 'मंदिर सेवाएं',
      to: '/online-services/seva-daan',
      icon: (
        // Exact Hindu Temple Shikhara with Spire & Sanctum Arch (Image 2 Match)
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#b7791f] group-hover:text-[#842c2b] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Top Spire & Kalash */}
          <path d="M12 2v2M10.5 4h3" />
          {/* Tiered Shikhara Body */}
          <path d="M12 4c-3 3-4.5 7-4.5 11h9C16.5 11 15 7 12 4z" fill="#fef3c7" stroke="currentColor" />
          <path d="M9.5 8h5M8.5 11.5h7" />
          {/* Inner Arched Sanctum Doorway */}
          <path d="M10 19v-3c0-1.1.9-2 2-2s2 .9 2 2v3" stroke="#b7791f" />
          {/* Base Platform */}
          <path d="M5 19h14v2H5z" />
        </svg>
      ),
    },
    {
      id: 'visitor-info',
      labelEn: 'Visitor Information',
      labelHi: 'दर्शनार्थी जानकारी',
      to: '/about-us',
      icon: (
        // Exact Temple Sacred Hanging Bell (Image 2 Match)
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#b7791f] group-hover:text-[#842c2b] transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Top Ring */}
          <circle cx="12" cy="3.5" r="1.5" />
          {/* Bell Dome */}
          <path d="M17.5 16C17 10 15.5 6 12 6s-5 4-5.5 10h11z" fill="#fef3c7" stroke="currentColor" />
          {/* Flared Rim */}
          <path d="M5.5 16h13c.6 0 1 .4 1 1s-.4 1-1 1h-13c-.6 0-1-.4-1-1s.4-1 1-1z" />
          {/* Clapper */}
          <circle cx="12" cy="20" r="1.5" fill="#f59e0b" stroke="#b7791f" />
        </svg>
      ),
    },
  ];

  const handleNavClick = (e, item) => {
    if (item.to.startsWith('#')) {
      if (location.pathname === '/') {
        e.preventDefault();
        const targetEl = document.querySelector(item.to);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 lg:-mt-20 pointer-events-auto">
      {/* ── Outer Floating White/Ivory Container (Matching Reference Image 2) ── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_16px_45px_rgba(0,0,0,0.12)] border border-[#f0e7d6] p-3 sm:p-4 lg:p-5">
        
        {/* ── 6 Cards Grid (Matching Reference Image 2) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 lg:gap-4">
          {services.map((item) => {
            const isAnchor = item.to.startsWith('#');
            const targetUrl = isAnchor && location.pathname !== '/' ? (item.fallbackTo || '/') : item.to;

            const content = (
              <div className="w-full h-full rounded-2xl bg-[#fffdfa] border border-[#f2eadc] hover:border-[#c28227] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer">
                
                {/* Clean Golden Halo Circle (Exact Match: Soft Circle with No Harsh Border) */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#faedd0] flex items-center justify-center mb-2.5 shrink-0 group-hover:scale-105 group-hover:bg-[#fde7b8] transition-transform duration-200">
                  {item.icon}
                </div>

                {/* Service Label (Clean Single-Line Bold Sans Text) */}
                <span className="text-xs sm:text-[13px] font-bold text-stone-900 font-sans tracking-tight leading-tight group-hover:text-[#842c2b] transition-colors whitespace-nowrap">
                  {isHi ? item.labelHi : item.labelEn}
                </span>

              </div>
            );

            if (isAnchor && location.pathname === '/') {
              return (
                <a
                  key={item.id}
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item)}
                  className="block h-full cursor-pointer no-underline focus:outline-none"
                  title={isHi ? item.labelHi : item.labelEn}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={item.id}
                to={targetUrl}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block h-full cursor-pointer no-underline focus:outline-none"
                title={isHi ? item.labelHi : item.labelEn}
              >
                {content}
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
