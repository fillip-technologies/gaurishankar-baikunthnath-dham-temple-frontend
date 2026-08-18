import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Heart, Sparkles, Navigation, ShieldCheck } from 'lucide-react';
import templeLogo from '../../../assets/logo.png';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <footer className="w-full bg-[#a86e1e] text-white border-t-2 border-[#8c5914] pt-14 pb-8 font-sans relative overflow-hidden z-20">
      
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Sacred Mantra Banner */}
        <div className="text-center pb-10 border-b border-[#8c5914]/60 mb-10">
          <p className="text-amber-100 text-sm sm:text-base font-hindi tracking-widest flex items-center justify-center gap-3">
            <span>─── ༺</span>
            <span className="text-white font-bold">॥ ॐ नमो भगवते वासुदेवाय • ॐ नमः शिवाय ॥</span>
            <span>༻ ───</span>
          </p>
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          
          {/* Column 1: Brand & Sacred Mandir Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={templeLogo} 
                alt="Shri Baikunthnath Dham Logo" 
                className="h-14 sm:h-16 w-auto object-contain shrink-0 drop-shadow" 
              />
              <div>
                <h3 className={`font-bold text-lg sm:text-xl text-white tracking-wider ${
                  currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
                }`}>
                  {t('brand.title')}
                </h3>
                <p className="text-xs text-amber-100/90 font-hindi font-medium">
                  {t('brand.subtitle')}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-normal">
              {t('about.desc1', 'Shri Gaurishankar Baikunthnath Dham is a sacred pilgrimage shrine situated on the holy banks of Mother Ganga, uniting devotion, sadhana, and Vedic traditions.')}
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-amber-200 font-hindi">
              <ShieldCheck className="w-4 h-4 text-amber-200" />
              <span>श्री वैकुण्ठनाथ मंदिर ट्रस्ट द्वारा संचालित</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-sm font-bold text-white tracking-widest uppercase border-b border-[#8c5914]/60 pb-2.5 flex items-center gap-2 ${
              currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
            }`}>
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{t('nav.home', 'Navigation')}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white text-amber-100 transition-colors duration-200 flex items-center gap-2">
                  <span className="text-amber-200">❖</span>
                  <span>{t('nav.home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white text-amber-100 transition-colors duration-200 flex items-center gap-2">
                  <span className="text-amber-200">❖</span>
                  <span>{t('nav.aboutUs', 'About Us')}</span>
                </Link>
              </li>
              <li>
                <Link to="/darshan" className="hover:text-white text-amber-100 transition-colors duration-200 flex items-center gap-2">
                  <span className="text-amber-200">❖</span>
                  <span>{t('nav.darshan', 'Live Darshan')}</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery/photos" className="hover:text-white text-amber-100 transition-colors duration-200 flex items-center gap-2">
                  <span className="text-amber-200">❖</span>
                  <span>{t('nav.gallery', 'Gallery')}</span>
                </Link>
              </li>
              <li>
                <Link to="/online-services/pooja-booking" className="hover:text-white text-amber-100 transition-colors duration-200 flex items-center gap-2">
                  <span className="text-amber-200">❖</span>
                  <span>{t('nav.servicePoojaBooking', 'Pooja Booking')}</span>
                </Link>
              </li>
              <li>
                <Link to="/online-services/volunteers" className="hover:text-white text-amber-100 transition-colors duration-200 flex items-center gap-2">
                  <span className="text-amber-200">❖</span>
                  <span>{t('nav.serviceVolunteers', 'Volunteers')}</span>
                </Link>
              </li>
              <li>
                <a href="#donate-section" className="hover:text-white text-amber-100 transition-colors duration-200 flex items-center gap-2">
                  <span className="text-amber-200">❖</span>
                  <span>{t('nav.donate', 'Donation')}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Daily Aarti Timings */}
          <div className="space-y-4">
            <h4 className={`text-sm font-bold text-white tracking-widest uppercase border-b border-[#8c5914]/60 pb-2.5 flex items-center gap-2 ${
              currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
            }`}>
              <Clock className="w-4 h-4 text-amber-200" />
              <span>{t('mandirSchedule.title', 'Aarti Timings')}</span>
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1 border-b border-[#8c5914]/50">
                <span className="text-amber-100">{t('mandirSchedule.aartiCards.pratah', 'Pratah Aarti')}</span>
                <span className="text-white font-semibold">05:30 AM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#8c5914]/50">
                <span className="text-amber-100">{t('mandirSchedule.aartiCards.rajbhog', 'Rajbhog Aarti')}</span>
                <span className="text-white font-semibold">12:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#8c5914]/50">
                <span className="text-amber-100">{t('mandirSchedule.aartiCards.sandhya', 'Sandhya Aarti')}</span>
                <span className="text-white font-semibold">06:30 PM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#8c5914]/50">
                <span className="text-amber-100">{t('mandirSchedule.aartiCards.shayan', 'Shayan Aarti')}</span>
                <span className="text-white font-semibold">08:30 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className={`text-sm font-bold text-white tracking-widest uppercase border-b border-[#8c5914]/60 pb-2.5 flex items-center gap-2 ${
              currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
            }`}>
              <Navigation className="w-4 h-4 text-amber-200" />
              <span>{t('nav.contact', 'Contact Us')}</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-amber-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                <span>बैकुंठपुर (खुसरूपुर), पटना, बिहार - 803202</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-200 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-200 shrink-0" />
                <span>info@baikunthnathmandir.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar / Copyright */}
        <div className="border-t border-[#8c5914]/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-amber-100/80">
          <p>© {new Date().getFullYear()} {t('brand.title')} {t('brand.subtitle')}. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 text-amber-100">
            <span>Made with devotion for devotees</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          </div>
        </div>

      </div>
    </footer>
  );
}
