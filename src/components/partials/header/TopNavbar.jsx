import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Phone, HeartHandshake } from 'lucide-react';

export default function TopNavbar() {
  const { t } = useTranslation();

  const noticeText = t(
    'topbar.noticeText',
    'The Mandir Trust and Temple Committee do not authorize any third-party agents or external websites for Puja, Rudra Abhishek, VIP Darshan, or Room Bookings. Please book only through the official temple portal or counter. • Mandir Hours: 5:00 AM - 9:00 PM • Morning Aarti: 5:30 AM • Evening Maha Aarti: 7:00 PM • Helpline: +91 98765 43210'
  );

  return (
    <div className="bg-master text-white border-b border-master-dark text-[11px] sm:text-xs py-1.5 px-3 sm:px-5 lg:px-8 font-sans overflow-hidden">
      <div className="w-full flex items-center justify-between gap-3">
        
        {/* Left / Center: Scrolling Updates Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 overflow-hidden">
          
          {/* UPDATES Pill Badge */}
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#5a1c1b] border border-amber-400/30 text-white shadow-sm select-none">
            <Bell className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 animate-bounce" />
            <span className="font-extrabold tracking-wider text-[10px] sm:text-[11.5px] uppercase">
              {t('topbar.updates', 'UPDATES')}
            </span>
          </div>

          {/* Continuous Scrolling Marquee Ticker */}
          <div className="flex-1 overflow-hidden relative flex items-center">
            <div className="animate-marquee-updates font-medium text-amber-100 tracking-wide text-[11px] sm:text-xs whitespace-nowrap cursor-default">
              <span className="shrink-0 px-6">
                {noticeText}
              </span>
              <span className="shrink-0 px-6">
                {noticeText}
              </span>
            </div>
          </div>

        </div>

        {/* Right Info - Helpdesk & Donation (visible on desktop) */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-amber-100 text-[11px] sm:text-xs shrink-0 pl-3 border-l border-white/15">
          <a 
            href="tel:+919876543210" 
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            title={t('topbar.helpdesk', 'Helpdesk')}
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
            <span className="font-semibold">+91 98765 43210</span>
          </a>
          <span className="opacity-30">|</span>
          <a 
            href="#donate" 
            className="text-white font-semibold hover:text-amber-200 transition-colors flex items-center gap-1.5"
          >
            <HeartHandshake className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
            <span>{t('topbar.eDonation', 'e-Donation')}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
