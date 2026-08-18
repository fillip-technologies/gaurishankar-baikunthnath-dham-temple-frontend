import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Clock, Sparkles, Phone, HeartHandshake } from 'lucide-react';

export default function TopNavbar() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#a86e1e] text-white border-b border-[#8c5914] text-[11px] sm:text-xs py-1.5 px-2.5 sm:px-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        
        {/* Left Info - Aarti Timings */}
        <div className="flex items-center gap-2 sm:gap-4 font-medium text-amber-100 shrink-0">
          <span className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            <span>{t('topbar.pratahAarti')}: <strong className="text-white">5:30 AM</strong></span>
          </span>
          <span className="hidden md:inline opacity-40">|</span>
          <span className="hidden md:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-200" />
            <span>{t('topbar.hours')}: <strong className="text-white">{t('topbar.hoursTime')}</strong></span>
          </span>
        </div>

        {/* Center Sacred Chant */}
        <div className="hidden lg:flex items-center gap-2 text-amber-100 font-hindi tracking-wider text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>{t('topbar.chant')}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
        </div>

        {/* Right Info - Helpdesk & Donation */}
        <div className="flex items-center gap-2 sm:gap-4 text-amber-100 text-[11px] sm:text-xs shrink-0">
          <a 
            href="tel:+919876543210" 
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-200" />
            <span>+91 98765 43210</span>
          </a>
          <span className="opacity-40">|</span>
          <a 
            href="#donate" 
            className="text-white font-semibold hover:underline flex items-center gap-1.5"
          >
            <HeartHandshake className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-200" />
            <span>{t('topbar.eDonation')}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
