import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Sparkles, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import heroBg from '../../../assets/home/herosection-2.png';
import { SACRED_CITIES, formatFullDate } from './panchangUtils';

export default function PanchangHero({ selectedDate, setSelectedDate, selectedCity, setSelectedCity }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDateChange = (e) => {
    if (!e.target.value) return;
    const [year, month, day] = e.target.value.split('-').map(Number);
    const newD = new Date(year, month - 1, day, 12, 0, 0);
    setSelectedDate(newD);
  };

  const shiftDays = (offset) => {
    const newD = new Date(selectedDate);
    newD.setDate(newD.getDate() + offset);
    setSelectedDate(newD);
  };

  const setToday = () => {
    setSelectedDate(new Date());
  };

  const dateInputVal = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const isToday = new Date().toDateString() === selectedDate.toDateString();

  return (
    <div className="w-full text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-[#c28227]/40 relative overflow-hidden">
      {/* Background Image */}
      <img
        src={heroBg}
        alt="Shri Baikunthnath Dham Panchang Hero"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
      />

      {/* Warm Sacred Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-[#2a080d]/75 to-black/85 z-10" />

      {/* Decorative Gold Grid Watermark */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:24px_24px] z-15" />

      <div className="max-w-6xl mx-auto relative z-20 space-y-6">
        
        {/* Sacred Top Chant */}
        <div className="flex items-center justify-center gap-2 text-[#ffd700] text-xs sm:text-sm font-hindi tracking-widest text-center">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{t('panchangPage.chant', '॥ ॐ नमः शिवाय • ॐ नमो भगवते वासुदेवाय • ॐ सूर्याय नमः ॥')}</span>
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffd700] tracking-wider drop-shadow-lg font-cinzel">
            {t('panchangPage.title', 'Daily Vedic Panchang')}
          </h1>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#c28227] to-transparent mx-auto my-2" />
          <p className="text-amber-100/90 text-xs sm:text-base max-w-2xl mx-auto font-medium leading-relaxed drop-shadow">
            {t('panchangPage.subtitle', 'Sacred celestial calculations, Auspicious Muhurats, Choghadiya & Daily Panchanga computed with Vedic precision')}
          </p>
        </div>

        {/* Interactive Control Panel: Date Selector & Location Picker */}
        <div className="bg-white/95 backdrop-blur-md text-stone-900 border border-amber-200/80 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Date Navigation & Picker (7 cols) */}
            <div className="md:col-span-7 space-y-2">
              <label className="text-[11px] sm:text-xs font-bold tracking-wider text-[#c28227] uppercase flex items-center gap-1.5 font-sans">
                <Calendar className="w-3.5 h-3.5 text-[#c28227]" />
                {t('panchangPage.selectDate', 'Select Date')}
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {/* Prev Day button */}
                <button
                  type="button"
                  onClick={() => shiftDays(-1)}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-amber-100 border border-stone-300 text-stone-700 transition cursor-pointer"
                  title="Previous Day"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Native Date Input */}
                <input
                  type="date"
                  value={dateInputVal}
                  onChange={handleDateChange}
                  className="bg-white text-stone-900 border border-stone-300 hover:border-[#c28227] focus:border-[#c28227] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold focus:outline-none transition cursor-pointer shadow-sm"
                />

                {/* Next Day button */}
                <button
                  type="button"
                  onClick={() => shiftDays(1)}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-amber-100 border border-stone-300 text-stone-700 transition cursor-pointer"
                  title="Next Day"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Today Quick Button */}
                <button
                  type="button"
                  onClick={setToday}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                    isToday
                      ? 'bg-[#c28227] text-white border-[#c28227] shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
                  }`}
                >
                  {t('panchangPage.today', 'Today')}
                </button>
              </div>
            </div>

            {/* Location Selector (5 cols) */}
            <div className="md:col-span-5 space-y-2">
              <label className="text-[11px] sm:text-xs font-bold tracking-wider text-[#c28227] uppercase flex items-center gap-1.5 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#c28227]" />
                {t('panchangPage.selectLocation', 'Location / Temple')}
              </label>
              <select
                value={selectedCity.id}
                onChange={(e) => {
                  const c = SACRED_CITIES.find((item) => item.id === e.target.value);
                  if (c) setSelectedCity(c);
                }}
                className="w-full bg-white text-stone-900 border border-stone-300 hover:border-[#c28227] focus:border-[#c28227] rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none transition cursor-pointer shadow-sm"
              >
                {SACRED_CITIES.map((city) => (
                  <option key={city.id} value={city.id} className="text-stone-900">
                    {currentLang === 'hi' ? city.hindiName : city.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Current Selection & Live Time Summary Footer Bar */}
          <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-700">
            <div className="flex items-center gap-2 font-semibold">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>
                {formatFullDate(selectedDate, currentLang)} • {currentLang === 'hi' ? selectedCity.hindiName : selectedCity.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#c28227] font-mono font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{liveTime.toLocaleTimeString('en-IN', { hour12: true })} IST</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
