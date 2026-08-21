import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PanchangHero from '../components/darshan/panchang/PanchangHero';
import DailyPanchangCard from '../components/darshan/panchang/DailyPanchangCard';
import AuspiciousTimings from '../components/darshan/panchang/AuspiciousTimings';
import ChoghadiyaGrid from '../components/darshan/panchang/ChoghadiyaGrid';
import PlanetaryPositions from '../components/darshan/panchang/PlanetaryPositions';
import UpcomingFestivalsCard from '../components/darshan/panchang/UpcomingFestivalsCard';
import PanchangGuidance from '../components/darshan/panchang/PanchangGuidance';
import { SACRED_CITIES, calculateTemplePanchang } from '../components/darshan/panchang/panchangUtils';
import { Calendar, Clock, Star, Compass, Flame, BookOpen } from 'lucide-react';

export default function PanchangPage() {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedCity, setSelectedCity] = useState(() => SACRED_CITIES[0]);
  const [activeSection, setActiveSection] = useState('panchang-section');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compute panchang whenever date or city changes
  const panchangResult = useMemo(() => {
    return calculateTemplePanchang(selectedDate, selectedCity);
  }, [selectedDate, selectedCity]);

  const navTabs = [
    { id: 'panchang-section', label: t('panchangPage.tabs.panchang', 'Daily Panchanga'), icon: Calendar },
    { id: 'muhurat-section', label: t('panchangPage.tabs.muhurat', 'Shubh Muhurat'), icon: Clock },
    { id: 'choghadiya-section', label: t('panchangPage.tabs.choghadiya', 'Choghadiya'), icon: Star },
    { id: 'planets-section', label: t('panchangPage.tabs.planets', 'Navagraha'), icon: Compass },
    { id: 'festivals-section', label: t('panchangPage.tabs.festivals', 'Vrat & Festivals'), icon: Flame },
    { id: 'guidance-section', label: t('panchangPage.tabs.guidance', 'Vedic Guidance'), icon: BookOpen },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 160;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="w-full bg-[#fbf9f5] text-stone-900 min-h-screen relative overflow-hidden font-sans">
      
      {/* Hero Section with Date & Location Selector */}
      <PanchangHero
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* Sticky Quick-Jump Navigation Bar (Light Clean Theme) */}
      <div className="sticky top-[105px] z-30 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 py-3 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
          {navTabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-[#c28227] text-white border-[#c28227] shadow-md'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100 hover:border-[#c28227] hover:text-[#c28227]'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-[#c28227]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Panchanga Content Sections */}
      {panchangResult.success ? (
        <div className="space-y-6 relative z-10 py-6 pb-20">
          <DailyPanchangCard
            panchangData={panchangResult.data}
            dateObj={selectedDate}
          />

          <div className="max-w-6xl mx-auto px-4"><div className="h-[1px] bg-gradient-to-r from-transparent via-[#c28227]/20 to-transparent" /></div>

          <AuspiciousTimings
            panchangData={panchangResult.data}
          />

          <div className="max-w-6xl mx-auto px-4"><div className="h-[1px] bg-gradient-to-r from-transparent via-[#c28227]/20 to-transparent" /></div>

          <ChoghadiyaGrid
            panchangData={panchangResult.data}
          />

          <div className="max-w-6xl mx-auto px-4"><div className="h-[1px] bg-gradient-to-r from-transparent via-[#c28227]/20 to-transparent" /></div>

          <PlanetaryPositions
            panchangData={panchangResult.data}
          />

          <div className="max-w-6xl mx-auto px-4"><div className="h-[1px] bg-gradient-to-r from-transparent via-[#c28227]/20 to-transparent" /></div>

          <UpcomingFestivalsCard
            selectedDate={selectedDate}
            selectedCity={selectedCity}
            todayFestivals={panchangResult.festivals}
          />

          <div className="max-w-6xl mx-auto px-4"><div className="h-[1px] bg-gradient-to-r from-transparent via-[#c28227]/20 to-transparent" /></div>

          <PanchangGuidance
            panchangData={panchangResult.data}
          />
        </div>
      ) : (
        <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
          <p className="text-rose-600 font-semibold">
            Unable to calculate Panchang for this date.
          </p>
          <button
            type="button"
            onClick={() => setSelectedDate(new Date())}
            className="px-4 py-2 rounded-lg bg-[#c28227] text-white font-bold text-xs"
          >
            Reset to Today
          </button>
        </div>
      )}

    </main>
  );
}
