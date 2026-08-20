import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronRight, ChevronDown, Languages } from 'lucide-react';
import templeLogo from '../../../assets/logo.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(true);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState(true);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(true);
  const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);
  const [isMobileMembersOpen, setIsMobileMembersOpen] = useState(true);
  const [isDonateDropdownOpen, setIsDonateDropdownOpen] = useState(false);
  const [isMobileDonateOpen, setIsMobileDonateOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('HOME');

  const currentLang = i18n.language || 'en';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleNavClick = (e, key, sectionId) => {
    if (e) e.preventDefault();
    setActiveNav(key);
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
    setIsGalleryDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsMembersDropdownOpen(false);
    setIsDonateDropdownOpen(false);

    if (key === 'ABOUT_US') {
      navigate('/about-us');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'HISTORY') {
      navigate('/history');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'CONSTRUCTION') {
      navigate('/construction');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'DARSHAN') {
      navigate('/darshan');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'GALLERY_PHOTOS') {
      navigate('/gallery/photos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'GALLERY_VIDEOS') {
      navigate('/gallery/videos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'GALLERY_WALLPAPERS') {
      navigate('/gallery/wallpapers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'GALLERY_MEDIA') {
      navigate('/gallery/media');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'SERVICES_POOJA') {
      navigate('/online-services/pooja-booking');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'SERVICES_ROOM') {
      navigate('/online-services/room-booking');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'SERVICES_VOLUNTEERS') {
      navigate('/online-services/volunteers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'MEMBERS_PRIEST') {
      navigate('/members/priest');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'MEMBERS_TRUST') {
      navigate('/members/trust-members');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (key === 'HOME') {
      if (location.pathname !== '/') {
        navigate('/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const aboutSubItems = [
    { key: 'ABOUT_US', label: t('nav.aboutUs', 'About Us'), sectionId: 'about-section' },
    { key: 'HISTORY', label: t('nav.history', 'History'), sectionId: 'history-section' },
    { key: 'CONSTRUCTION', label: t('nav.construction', 'Construction'), sectionId: 'construction-section' },
  ];

  const gallerySubItems = [
    { key: 'GALLERY_PHOTOS', label: t('nav.galleryPhotos', 'Photos'), sectionId: 'gallery-photos-section' },
    { key: 'GALLERY_VIDEOS', label: t('nav.galleryVideos', 'Videos'), sectionId: 'gallery-videos-section' },
    { key: 'GALLERY_WALLPAPERS', label: t('nav.galleryWallpapers', 'Wallpapers'), sectionId: 'gallery-wallpapers-section' },
    { key: 'GALLERY_MEDIA', label: t('nav.galleryMedia', 'Media Coverage'), sectionId: 'gallery-media-section' },
  ];

  const servicesSubItems = [
    { key: 'SERVICES_POOJA', label: t('nav.servicePoojaBooking', 'Pooja Booking'), sectionId: 'pooja-booking-section' },
    { key: 'SERVICES_ROOM', label: t('nav.serviceRoomBooking', 'Room Booking'), sectionId: 'room-booking-section' },
    { key: 'SERVICES_VOLUNTEERS', label: t('nav.serviceVolunteers', 'Volunteers'), sectionId: 'volunteers-section' },
  ];

  const donateSubItems = [
    { key: 'DONATE_ONLINE', label: t('nav.donateOnline', 'Online Donation'), sectionId: 'online-donation-section' },
    { key: 'DONATE_SEVA', label: t('nav.donateSeva', 'Seva Daan'), sectionId: 'seva-daan-section' },
  ];

  const membersSubItems = [
    { key: 'MEMBERS_PRIEST', label: t('nav.memberPriest', 'Priest'), sectionId: 'priest-section' },
    { key: 'MEMBERS_TRUST', label: t('nav.memberTrust', 'Trust Members'), sectionId: 'trust-members-section' },
    { key: 'MEMBERS_MANAGEMENT', label: t('nav.memberManagement', 'Management'), sectionId: 'management-section' },
  ];

  const navLinks = [
    { key: 'HOME', label: t('nav.home'), sectionId: 'hero-section' },
    { key: 'ABOUT', label: t('nav.about'), isDropdown: true, subItems: aboutSubItems },
    { key: 'DARSHAN', label: t('nav.darshan', 'Darshan'), sectionId: 'live-darshan-section' },
    { key: 'GALLERY', label: t('nav.gallery'), isDropdown: true, subItems: gallerySubItems },
    { key: 'ONLINE_SERVICES', label: t('nav.onlineServices', 'Online Services'), isDropdown: true, subItems: servicesSubItems },
    { key: 'DONATE', label: t('nav.donate'), isDropdown: true, subItems: donateSubItems },
    { key: 'MEMBERS', label: t('nav.members', 'Trust'), isDropdown: true, subItems: membersSubItems },
    { key: 'CONTACT', label: t('nav.contact'), sectionId: 'contact-section' },
  ];

  const isAboutActive = activeNav === 'ABOUT' || activeNav === 'ABOUT_US' || activeNav === 'HISTORY' || activeNav === 'CONSTRUCTION';
  const isGalleryActive = activeNav === 'GALLERY' || activeNav === 'GALLERY_PHOTOS' || activeNav === 'GALLERY_VIDEOS' || activeNav === 'GALLERY_WALLPAPERS' || activeNav === 'GALLERY_MEDIA';
  const isServicesActive = activeNav === 'ONLINE_SERVICES' || activeNav === 'SERVICES_POOJA' || activeNav === 'SERVICES_ROOM' || activeNav === 'SERVICES_VOLUNTEERS';
  const isDonateActive = activeNav === 'DONATE' || activeNav === 'DONATE_ONLINE' || activeNav === 'DONATE_SEVA';
  const isMembersActive = activeNav === 'MEMBERS' || activeNav === 'MEMBERS_PRIEST' || activeNav === 'MEMBERS_TRUST' || activeNav === 'MEMBERS_MANAGEMENT';

  return (
    <nav className="w-full bg-white border-b border-stone-200 shadow-sm py-1.5 sm:py-2 px-4 sm:px-8 lg:px-12 xl:px-16 font-sans overflow-visible relative z-40">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-3 sm:gap-6">

        {/* Left: Temple Logo & Branding */}
        <button
          onClick={(e) => handleNavClick(e, 'HOME')}
          className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 text-left cursor-pointer"
        >
          <img
            src={templeLogo}
            alt="Baikunth Dham Logo"
            className="h-10 sm:h-12 lg:h-[60px] w-auto object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
          />

          {/* Title & Subtitle Stack */}
          <div className="flex flex-col justify-center py-0.5 shrink-0">
            {t('brand.prefix') && (
              <span className={`text-[8.5px] sm:text-[10.5px] font-bold tracking-wider text-[#c28227] uppercase leading-tight mb-0.5 whitespace-nowrap ${currentLang === 'hi' ? 'font-sans text-[9px] sm:text-xs' : 'font-sans'
                }`}>
                {t('brand.prefix')}
              </span>
            )}
            <h1 className={`text-xs sm:text-base md:text-lg lg:text-[18px] xl:text-[19px] font-bold tracking-normal text-stone-900 leading-tight whitespace-nowrap ${currentLang === 'hi' ? 'font-sans font-extrabold' : 'font-cinzel'
              }`}>
              {t('brand.title')}
            </h1>

            {/* Golden Horizontal Divider Line */}
            <div className="w-full h-[1.5px] bg-[#c28227] my-0.5" />

            <span className="text-[8.5px] sm:text-[10px] font-bold tracking-wider text-stone-600 uppercase font-sans leading-tight mt-0.5 whitespace-nowrap">
              {t('brand.subtitle')}
            </span>
          </div>

        </button>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6 shrink-0">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              const isOpen = link.key === 'ABOUT' ? isAboutDropdownOpen : link.key === 'GALLERY' ? isGalleryDropdownOpen : link.key === 'ONLINE_SERVICES' ? isServicesDropdownOpen : link.key === 'DONATE' ? isDonateDropdownOpen : isMembersDropdownOpen;
              const setIsOpen = link.key === 'ABOUT' ? setIsAboutDropdownOpen : link.key === 'GALLERY' ? setIsGalleryDropdownOpen : link.key === 'ONLINE_SERVICES' ? setIsServicesDropdownOpen : link.key === 'DONATE' ? setIsDonateDropdownOpen : setIsMembersDropdownOpen;
              const isDropdownActive = link.key === 'ABOUT' ? isAboutActive : link.key === 'GALLERY' ? isGalleryActive : link.key === 'ONLINE_SERVICES' ? isServicesActive : link.key === 'DONATE' ? isDonateActive : isMembersActive;

              return (
                <div
                  key={link.key}
                  className="relative group py-1"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(!isOpen);
                    }}
                    className="flex items-center gap-1 cursor-pointer bg-transparent border-none focus:outline-none"
                  >
                    <span className={`text-xs xl:text-[14px] font-semibold tracking-wide whitespace-nowrap transition-colors ${isDropdownActive ? 'text-[#c28227] font-bold' : 'text-stone-800 hover:text-[#c28227]'
                      }`}>
                      {link.label}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#c28227]' : 'text-stone-600 group-hover:text-[#c28227]'
                      }`} />
                  </button>

                  {/* Underline Bar for Active State */}
                  <span className={`h-[2px] w-full bg-[#c28227] mt-1 block transition-all duration-200 ${isDropdownActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`} />

                  {/* Dropdown Card with Top-to-Bottom Fold Animation */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-0.5 w-56 bg-white rounded-b-xl shadow-2xl border border-stone-200/90 border-t-2 border-t-[#c28227] z-50 overflow-hidden animate-fold-down origin-top">
                      <div className="flex flex-col divide-y divide-stone-200/80">
                        {link.subItems.map((sub) => {
                          const isSubActive = activeNav === sub.key;
                          return (
                            <button
                              key={sub.key}
                              onClick={(e) => {
                                handleNavClick(e, sub.key, sub.sectionId);
                                setIsOpen(false);
                              }}
                              className={`w-full text-left px-5 py-3 text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center justify-between cursor-pointer ${isSubActive
                                ? 'bg-amber-50 text-[#c28227] font-bold'
                                : 'text-stone-800 hover:bg-stone-50 hover:text-[#c28227]'
                                }`}
                            >
                              <span>{sub.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const isActive = activeNav === link.key;
            return (
              <button
                key={link.key}
                onClick={(e) => handleNavClick(e, link.key, link.sectionId)}
                className="flex flex-col items-center group py-1 cursor-pointer bg-transparent border-none"
              >
                <span className={`text-xs xl:text-[14px] font-semibold tracking-wide whitespace-nowrap transition-colors ${isActive ? 'text-[#c28227] font-bold' : 'text-stone-800 hover:text-[#c28227]'
                  }`}>
                  {link.label}
                </span>

                {/* Underline Bar for Active State */}
                <span className={`h-[2px] w-full bg-[#c28227] mt-1 transition-all duration-200 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`} />
              </button>
            );
          })}
        </div>

        {/* Right: Language Switcher */}
        <div className="hidden lg:flex items-center">

          {/* Hindi / English Language Switcher Toggle */}
          <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-300 text-xs font-bold shadow-inner">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2.5 py-1 rounded-md transition-all ${currentLang === 'en'
                ? 'bg-[#c28227] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
                }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('hi')}
              className={`px-2.5 py-1 rounded-md transition-all ${currentLang === 'hi'
                ? 'bg-[#c28227] text-white shadow-sm font-hindi'
                : 'text-stone-600 hover:text-stone-900 font-hindi'
                }`}
            >
              हिंदी
            </button>
          </div>

        </div>

        {/* Mobile Hamburger Toggle & Language Switcher */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Quick Language Toggle */}
          <button
            onClick={() => changeLanguage(currentLang === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1.5 rounded-lg bg-stone-100 border border-stone-300 text-stone-800 text-xs font-bold flex items-center gap-1"
          >
            <Languages className="w-3.5 h-3.5 text-[#c28227]" />
            <span>{currentLang === 'en' ? 'हिंदी' : 'EN'}</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-stone-800 border border-stone-300 hover:bg-stone-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#c28227]" />
            ) : (
              <Menu className="w-6 h-6 text-stone-800" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white mt-3 px-4 py-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">

            {/* Language Selection in Mobile Drawer */}
            <div className="flex justify-between items-center px-3 py-2 bg-stone-50 rounded-lg border border-stone-200 mb-1">
              <span className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-[#c28227]" />
                Select Language / भाषा चुनें:
              </span>
              <div className="flex gap-1 text-xs font-bold">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1 rounded-md transition-all ${currentLang === 'en' ? 'bg-[#c28227] text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('hi')}
                  className={`px-3 py-1 rounded-md transition-all font-hindi ${currentLang === 'hi' ? 'bg-[#c28227] text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {navLinks.map((link) => {
              if (link.isDropdown) {
                const isMobileOpen = link.key === 'ABOUT' ? isMobileAboutOpen : link.key === 'GALLERY' ? isMobileGalleryOpen : link.key === 'ONLINE_SERVICES' ? isMobileServicesOpen : link.key === 'DONATE' ? isMobileDonateOpen : isMobileMembersOpen;
                const setIsMobileOpen = link.key === 'ABOUT' ? setIsMobileAboutOpen : link.key === 'GALLERY' ? setIsMobileGalleryOpen : link.key === 'ONLINE_SERVICES' ? setIsMobileServicesOpen : link.key === 'DONATE' ? setIsMobileDonateOpen : setIsMobileMembersOpen;
                const isDropdownActive = link.key === 'ABOUT' ? isAboutActive : link.key === 'GALLERY' ? isGalleryActive : link.key === 'ONLINE_SERVICES' ? isServicesActive : link.key === 'DONATE' ? isDonateActive : isMembersActive;

                return (
                  <div key={link.key} className="flex flex-col">
                    <button
                      onClick={() => setIsMobileOpen(!isMobileOpen)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors text-left w-full ${isDropdownActive
                        ? 'bg-amber-50 text-[#c28227] font-bold border-l-4 border-[#c28227]'
                        : 'text-stone-800 hover:bg-stone-50 hover:text-[#c28227]'
                        }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isMobileOpen ? 'rotate-180 text-[#c28227]' : ''}`} />
                    </button>
                    {isMobileOpen && (
                      <div className="pl-4 pr-2 py-1 flex flex-col gap-1 border-l-2 border-stone-200 ml-3 my-1">
                        {link.subItems.map((sub) => (
                          <button
                            key={sub.key}
                            onClick={(e) => {
                              handleNavClick(e, sub.key, sub.sectionId);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold tracking-wide text-left w-full transition-colors ${activeNav === sub.key
                              ? 'bg-amber-50 text-[#c28227] font-bold'
                              : 'text-stone-700 hover:bg-stone-50 hover:text-[#c28227]'
                              }`}
                          >
                            <span className="text-[#c28227]">❖</span>
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = activeNav === link.key;
              return (
                <button
                  key={link.key}
                  onClick={(e) => handleNavClick(e, link.key, link.sectionId)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors text-left w-full ${isActive
                    ? 'bg-amber-50 text-[#c28227] font-bold border-l-4 border-[#c28227]'
                    : 'text-stone-800 hover:bg-stone-50 hover:text-[#c28227]'
                    }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
