import { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
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
  const [isDarshanDropdownOpen, setIsDarshanDropdownOpen] = useState(false);
  const [isMobileDarshanOpen, setIsMobileDarshanOpen] = useState(true);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState(true);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(true);
  const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);
  const [isMobileMembersOpen, setIsMobileMembersOpen] = useState(true);
  const [isDonateDropdownOpen, setIsDonateDropdownOpen] = useState(false);
  const [isMobileDonateOpen, setIsMobileDonateOpen] = useState(true);

  const currentLang = i18n.language || 'en';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
    setIsDarshanDropdownOpen(false);
    setIsGalleryDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsMembersDropdownOpen(false);
    setIsDonateDropdownOpen(false);
  };

  // Route navigation (via NavLink): close any open menus and reset scroll.
  const handleRouteNav = () => {
    closeAllMenus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll-only targets live as sections on the home page. From any other
  // route we must navigate home first, then scroll once the section mounts.
  const scrollToSection = (sectionId) => {
    closeAllMenus();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const aboutSubItems = [
    { key: 'ABOUT_US', label: t('nav.aboutUs', 'About Us'), to: '/about-us' },
    { key: 'HISTORY', label: t('nav.history', 'History'), to: '/history' },
    { key: 'CONSTRUCTION', label: t('nav.construction', 'Construction'), to: '/construction' },
  ];

  const darshanSubItems = [
    { key: 'DARSHAN_LIVE', label: t('nav.liveDarshan', 'Live Darshan'), to: '/darshan/live-darshan', aliases: ['/darshan'] },
    { key: 'DARSHAN_POOJA_AARTI', label: t('nav.poojaAarti', 'Pooja & Aarti'), to: '/darshan/pooja-aarti' },
    { key: 'DARSHAN_PANCHANG', label: t('nav.panchang', 'Vedic Panchang'), to: '/darshan/panchang', aliases: ['/panchang'] },
  ];

  const gallerySubItems = [
    { key: 'GALLERY_PHOTOS', label: t('nav.galleryPhotos', 'Photos'), to: '/gallery/photos' },
    { key: 'GALLERY_VIDEOS', label: t('nav.galleryVideos', 'Videos'), to: '/gallery/videos' },
    { key: 'GALLERY_WALLPAPERS', label: t('nav.galleryWallpapers', 'Wallpapers'), to: '/gallery/wallpapers' },
    { key: 'GALLERY_MEDIA', label: t('nav.galleryMedia', 'Media Coverage'), to: '/gallery/media' },
  ];

  const servicesSubItems = [
    { key: 'SERVICES_POOJA',   label: t('nav.servicePoojaBooking',   'Pooja Booking'),   to: '/online-services/pooja-booking'   },
    { key: 'SERVICES_ROOM',    label: t('nav.serviceRoomBooking',    'Room Booking'),    to: '/online-services/room-booking'    },
    { key: 'SERVICES_PRASAD',  label: t('nav.servicePrasadBooking',  'Prasad Booking'),  to: '/online-services/prasad-booking'  },
    { key: 'SERVICES_VOLUNTEERS', label: t('nav.serviceVolunteers',  'Volunteers'),      to: '/online-services/volunteers'      },
  ];

  const donateSubItems = [
    { key: 'DONATE_ONLINE', label: t('nav.donateOnline', 'Online Donation'), to: '/online-services/donation' },
    { key: 'DONATE_SEVA', label: t('nav.donateSeva', 'Seva Daan'), to: '/online-services/seva-daan' },
  ];

  const membersSubItems = [
    { key: 'MEMBERS_PRIEST', label: t('nav.memberPriest', 'Priest'), to: '/members/priest' },
    { key: 'MEMBERS_TRUST', label: t('nav.memberTrust', 'Trust Members'), to: '/members/trust-members' },
    { key: 'MEMBERS_MANAGEMENT', label: t('nav.memberManagement', 'Management'), sectionId: 'management-section' },
  ];

  const navLinks = [
    { key: 'HOME', label: t('nav.home'), to: '/' },
    { key: 'ABOUT', label: t('nav.about'), isDropdown: true, subItems: aboutSubItems },
    { key: 'DARSHAN', label: t('nav.darshan', 'Darshan'), isDropdown: true, subItems: darshanSubItems },
    { key: 'GALLERY', label: t('nav.gallery'), isDropdown: true, subItems: gallerySubItems },
    { key: 'ONLINE_SERVICES', label: t('nav.onlineServices', 'Online Services'), isDropdown: true, subItems: servicesSubItems },
    { key: 'DONATE', label: t('nav.donate'), isDropdown: true, subItems: donateSubItems },
    { key: 'MEMBERS', label: t('nav.members', 'Trust'), isDropdown: true, subItems: membersSubItems },
    { key: 'CONTACT', label: t('nav.contact'), sectionId: 'contact-section' },
  ];

  // A routed sub-item is active when the current path matches its `to`
  // (or nested under it), or exactly equals one of its aliases.
  const isSubActive = (sub) =>
    !!sub.to &&
    (location.pathname === sub.to ||
      location.pathname.startsWith(sub.to + '/') ||
      (sub.aliases?.includes(location.pathname) ?? false));

  const isDropdownActive = (link) => link.subItems?.some(isSubActive) ?? false;

  const getDropdownState = (key) => {
    if (key === 'ABOUT') return [isAboutDropdownOpen, setIsAboutDropdownOpen];
    if (key === 'DARSHAN') return [isDarshanDropdownOpen, setIsDarshanDropdownOpen];
    if (key === 'GALLERY') return [isGalleryDropdownOpen, setIsGalleryDropdownOpen];
    if (key === 'ONLINE_SERVICES') return [isServicesDropdownOpen, setIsServicesDropdownOpen];
    if (key === 'DONATE') return [isDonateDropdownOpen, setIsDonateDropdownOpen];
    if (key === 'MEMBERS') return [isMembersDropdownOpen, setIsMembersDropdownOpen];
    return [false, () => {}];
  };

  const getMobileDropdownState = (key) => {
    if (key === 'ABOUT') return [isMobileAboutOpen, setIsMobileAboutOpen];
    if (key === 'DARSHAN') return [isMobileDarshanOpen, setIsMobileDarshanOpen];
    if (key === 'GALLERY') return [isMobileGalleryOpen, setIsMobileGalleryOpen];
    if (key === 'ONLINE_SERVICES') return [isMobileServicesOpen, setIsMobileServicesOpen];
    if (key === 'DONATE') return [isMobileDonateOpen, setIsMobileDonateOpen];
    if (key === 'MEMBERS') return [isMobileMembersOpen, setIsMobileMembersOpen];
    return [false, () => {}];
  };

  return (
    <nav className="w-full bg-white border-b border-stone-200 shadow-sm py-1.5 sm:py-2 px-3 sm:px-5 lg:px-8 font-sans overflow-visible relative z-40">
      <div className="w-full flex items-center justify-between gap-3 sm:gap-6">

        {/* Left: Temple Logo & Branding */}
        <Link
          to="/"
          onClick={handleRouteNav}
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
              <span className={`text-[8.5px] sm:text-[10.5px] font-bold tracking-wider text-[#c28227] uppercase leading-tight mb-0.5 whitespace-nowrap ${
                currentLang === 'hi' ? 'font-rozha text-[9.5px] sm:text-xs' : 'font-cinzel'
              }`}>
                {t('brand.prefix')}
              </span>
            )}
            <h1 className={`text-xs sm:text-base md:text-lg lg:text-[18px] xl:text-[19px] font-bold tracking-normal text-stone-900 leading-tight whitespace-nowrap ${
              currentLang === 'hi' ? 'font-yatra tracking-wide' : 'font-cinzel'
            }`}>
              {t('brand.title')}
            </h1>

            {/* Golden Horizontal Divider Line */}
            <div className="w-full h-[1.5px] bg-[#c28227] my-0.5" />

            <span className={`text-[8.5px] sm:text-[10px] font-bold tracking-wider text-stone-600 uppercase leading-tight mt-0.5 whitespace-nowrap ${
              currentLang === 'hi' ? 'font-noto' : 'font-poppins'
            }`}>
              {t('brand.subtitle')}
            </span>
          </div>

        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6 shrink-0">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              const [isOpen, setIsOpen] = getDropdownState(link.key);
              const dropActive = isDropdownActive(link);

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
                    <span className={`text-xs xl:text-[14px] font-semibold tracking-wide whitespace-nowrap transition-colors ${dropActive ? 'text-[#c28227] font-bold' : 'text-stone-800 hover:text-[#c28227]'
                      }`}>
                      {link.label}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#c28227]' : 'text-stone-600 group-hover:text-[#c28227]'
                      }`} />
                  </button>

                  {/* Underline Bar for Active State */}
                  <span className={`h-[2px] w-full bg-[#c28227] mt-1 block transition-all duration-200 ${dropActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`} />

                  {/* Dropdown Card with Top-to-Bottom Fold Animation */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-0.5 w-56 bg-white rounded-b-xl shadow-2xl border border-stone-200/90 border-t-2 border-t-[#c28227] z-50 overflow-hidden animate-fold-down origin-top">
                      <div className="flex flex-col divide-y divide-stone-200/80">
                        {link.subItems.map((sub) => {
                          const subItemClass = (active) =>
                            `w-full text-left px-5 py-3 text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center justify-between cursor-pointer ${active
                              ? 'bg-amber-50 text-[#c28227] font-bold'
                              : 'text-stone-800 hover:bg-stone-50 hover:text-[#c28227]'
                            }`;

                          if (sub.to) {
                            const aliasActive = sub.aliases?.includes(location.pathname) ?? false;
                            return (
                              <NavLink
                                key={sub.key}
                                to={sub.to}
                                onClick={handleRouteNav}
                                className={({ isActive }) => subItemClass(isActive || aliasActive)}
                              >
                                <span>{sub.label}</span>
                              </NavLink>
                            );
                          }

                          return (
                            <button
                              key={sub.key}
                              onClick={() => scrollToSection(sub.sectionId)}
                              className={subItemClass(false)}
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

            if (link.to) {
              return (
                <NavLink
                  key={link.key}
                  to={link.to}
                  end
                  onClick={handleRouteNav}
                  className="flex flex-col items-center group py-1 cursor-pointer"
                >
                  {({ isActive }) => (
                    <>
                      <span className={`text-xs xl:text-[14px] font-semibold tracking-wide whitespace-nowrap transition-colors ${isActive ? 'text-[#c28227] font-bold' : 'text-stone-800 hover:text-[#c28227]'
                        }`}>
                        {link.label}
                      </span>
                      <span className={`h-[2px] w-full bg-[#c28227] mt-1 transition-all duration-200 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                        }`} />
                    </>
                  )}
                </NavLink>
              );
            }

            return (
              <button
                key={link.key}
                onClick={() => scrollToSection(link.sectionId)}
                className="flex flex-col items-center group py-1 cursor-pointer bg-transparent border-none"
              >
                <span className="text-xs xl:text-[14px] font-semibold tracking-wide whitespace-nowrap transition-colors text-stone-800 hover:text-[#c28227]">
                  {link.label}
                </span>

                {/* Underline Bar (hover only — scroll targets have no persistent route) */}
                <span className="h-[2px] w-full bg-[#c28227] mt-1 transition-all duration-200 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
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
                const [isMobileOpen, setIsMobileOpen] = getMobileDropdownState(link.key);
                const dropActive = isDropdownActive(link);

                return (
                  <div key={link.key} className="flex flex-col">
                    <button
                      onClick={() => setIsMobileOpen(!isMobileOpen)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors text-left w-full ${dropActive
                        ? 'bg-amber-50 text-[#c28227] font-bold border-l-4 border-[#c28227]'
                        : 'text-stone-800 hover:bg-stone-50 hover:text-[#c28227]'
                        }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isMobileOpen ? 'rotate-180 text-[#c28227]' : ''}`} />
                    </button>
                    {isMobileOpen && (
                      <div className="pl-4 pr-2 py-1 flex flex-col gap-1 border-l-2 border-stone-200 ml-3 my-1">
                        {link.subItems.map((sub) => {
                          const subItemClass = (active) =>
                            `flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold tracking-wide text-left w-full transition-colors ${active
                              ? 'bg-amber-50 text-[#c28227] font-bold'
                              : 'text-stone-700 hover:bg-stone-50 hover:text-[#c28227]'
                            }`;

                          if (sub.to) {
                            const aliasActive = sub.aliases?.includes(location.pathname) ?? false;
                            return (
                              <NavLink
                                key={sub.key}
                                to={sub.to}
                                onClick={handleRouteNav}
                                className={({ isActive }) => subItemClass(isActive || aliasActive)}
                              >
                                <span className="text-[#c28227]">❖</span>
                                <span>{sub.label}</span>
                              </NavLink>
                            );
                          }

                          return (
                            <button
                              key={sub.key}
                              onClick={() => scrollToSection(sub.sectionId)}
                              className={subItemClass(false)}
                            >
                              <span className="text-[#c28227]">❖</span>
                              <span>{sub.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              if (link.to) {
                return (
                  <NavLink
                    key={link.key}
                    to={link.to}
                    end
                    onClick={handleRouteNav}
                    className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors text-left w-full ${isActive
                      ? 'bg-amber-50 text-[#c28227] font-bold border-l-4 border-[#c28227]'
                      : 'text-stone-800 hover:bg-stone-50 hover:text-[#c28227]'
                      }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </NavLink>
                );
              }

              return (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.sectionId)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors text-left w-full text-stone-800 hover:bg-stone-50 hover:text-[#c28227]"
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
