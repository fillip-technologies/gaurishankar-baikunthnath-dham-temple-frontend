import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sun,
  Moon,
  Compass,
  Star,
  Flame,
  Sparkles,
  CalendarDays,
  Zap
} from 'lucide-react';
import {
  formatTimeSafe,
  TITHI_DEITIES,
  VARA_DETAILS
} from './panchangUtils';

export default function DailyPanchangCard({ panchangData, dateObj }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  if (!panchangData) {
    return (
      <div className="w-full text-center py-12 text-stone-600">
        Loading Vedic Panchang calculations...
      </div>
    );
  }

  const {
    tithi,
    tithis = [],
    nakshatra,
    nakshatras = [],
    yoga,
    yogas = [],
    karana,
    karanas = [],
    vara,
    sunrise,
    sunset,
    moonrise,
    moonset,
    masa,
    paksha,
    ritu,
    ayana,
    samvat,
    moonRashi,
    sunRashi,
    nakshatraPada
  } = panchangData;

  // Active or primary Tithi details
  const primaryTithiObj = tithis[0] || {};
  const nextTithiObj = tithis[1] || null;
  const tithiDeity = TITHI_DEITIES[tithi] || TITHI_DEITIES[1] || { en: 'Vedic Deva', hi: 'वैदिक देव' };

  // Primary Nakshatra details
  const primaryNakshatraObj = nakshatras[0] || {};
  const nextNakshatraObj = nakshatras[1] || null;

  // Primary Yoga
  const primaryYogaObj = yogas[0] || {};
  const nextYogaObj = yogas[1] || null;

  // Karana details
  const primaryKaranaObj = karanas[0] || {};
  const nextKaranaObj = karanas[1] || null;

  // Vara (Weekday) details
  const varaObj = VARA_DETAILS[vara] || VARA_DETAILS[0];

  return (
    <section id="panchang-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight ${
          currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
        }`}>
          {currentLang === 'hi' ? 'दैनिक पंचांग विवरण' : "Today's Core Panchanga"}
        </h2>
        <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
        <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          {t('panchangPage.panchangamDesc', 'The five foundational pillars of Vedic timekeeping aligning mortal actions with cosmic rhythms')}
        </p>
      </div>

      {/* 5 Core Limbs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. TITHI */}
        <div className="bg-white rounded-[24px] p-5 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c28227] bg-[#fefaf0] px-2.5 py-0.5 rounded-full border border-amber-200">
                1. {t('panchangPage.tithi', 'Tithi')}
              </span>
              <div className="p-1.5 rounded-lg bg-[#fefaf0] text-[#c28227]">
                <Moon className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-0.5 group-hover:text-[#c28227] transition-colors font-cinzel">
              {primaryTithiObj.name || `Tithi ${tithi}`}
            </h3>
            <p className="text-xs text-[#c28227] font-semibold mb-3">
              {paksha} Paksha
            </p>
          </div>

          <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
            {primaryTithiObj.endTime && (
              <div className="text-stone-700">
                <span className="text-stone-400">{t('panchangPage.endsAt', 'Ends at')}:</span>{' '}
                <span className="font-bold text-stone-900 font-mono">{formatTimeSafe(primaryTithiObj.endTime)}</span>
              </div>
            )}
            {nextTithiObj && (
              <div className="text-[11px] text-stone-500">
                <span>Then {nextTithiObj.name}</span>
              </div>
            )}
            <div className="text-[11px] text-stone-600 pt-1">
              <span className="text-stone-400">{t('panchangPage.rulingDeity', 'Deity')}:</span>{' '}
              <span className="text-[#c28227] font-semibold">{currentLang === 'hi' ? tithiDeity.hi : tithiDeity.en}</span>
            </div>
          </div>
        </div>

        {/* 2. NAKSHATRA */}
        <div className="bg-white rounded-[24px] p-5 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c28227] bg-[#fefaf0] px-2.5 py-0.5 rounded-full border border-amber-200">
                2. {t('panchangPage.nakshatra', 'Nakshatra')}
              </span>
              <div className="p-1.5 rounded-lg bg-[#fefaf0] text-[#c28227]">
                <Star className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-0.5 group-hover:text-[#c28227] transition-colors font-cinzel">
              {primaryNakshatraObj.name || `Nakshatra ${nakshatra}`}
            </h3>
            <p className="text-xs text-[#c28227] font-semibold mb-3">
              Pada {nakshatraPada || 1}
            </p>
          </div>

          <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
            {primaryNakshatraObj.endTime && (
              <div className="text-stone-700">
                <span className="text-stone-400">{t('panchangPage.endsAt', 'Ends at')}:</span>{' '}
                <span className="font-bold text-stone-900 font-mono">{formatTimeSafe(primaryNakshatraObj.endTime)}</span>
              </div>
            )}
            {nextNakshatraObj && (
              <div className="text-[11px] text-stone-500">
                <span>Then {nextNakshatraObj.name}</span>
              </div>
            )}
            <div className="text-[11px] text-stone-600 pt-1">
              <span className="text-stone-400">{t('panchangPage.moonRashi', 'Moon Sign')}:</span>{' '}
              <span className="text-[#c28227] font-semibold">{moonRashi?.name || 'Chandra Rashi'}</span>
            </div>
          </div>
        </div>

        {/* 3. YOGA */}
        <div className="bg-white rounded-[24px] p-5 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c28227] bg-[#fefaf0] px-2.5 py-0.5 rounded-full border border-amber-200">
                3. {t('panchangPage.yoga', 'Yoga')}
              </span>
              <div className="p-1.5 rounded-lg bg-[#fefaf0] text-[#c28227]">
                <Zap className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-0.5 group-hover:text-[#c28227] transition-colors font-cinzel">
              {primaryYogaObj.name || `Yoga ${yoga}`}
            </h3>
            <p className="text-xs text-[#c28227] font-semibold mb-3">
              Vedic Combination
            </p>
          </div>

          <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
            {primaryYogaObj.endTime && (
              <div className="text-stone-700">
                <span className="text-stone-400">{t('panchangPage.endsAt', 'Ends at')}:</span>{' '}
                <span className="font-bold text-stone-900 font-mono">{formatTimeSafe(primaryYogaObj.endTime)}</span>
              </div>
            )}
            {nextYogaObj && (
              <div className="text-[11px] text-stone-500">
                <span>Then {nextYogaObj.name}</span>
              </div>
            )}
            <div className="text-[11px] text-stone-600 pt-1">
              <span className="text-stone-400">Nature:</span>{' '}
              <span className="text-[#c28227] font-semibold">Cosmic Alignment</span>
            </div>
          </div>
        </div>

        {/* 4. KARANA */}
        <div className="bg-white rounded-[24px] p-5 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c28227] bg-[#fefaf0] px-2.5 py-0.5 rounded-full border border-amber-200">
                4. {t('panchangPage.karana', 'Karana')}
              </span>
              <div className="p-1.5 rounded-lg bg-[#fefaf0] text-[#c28227]">
                <Flame className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-0.5 group-hover:text-[#c28227] transition-colors font-cinzel">
              {primaryKaranaObj.name || `Karana ${karana}`}
            </h3>
            <p className="text-xs text-[#c28227] font-semibold mb-3">
              Half Tithi Division
            </p>
          </div>

          <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
            {primaryKaranaObj.endTime && (
              <div className="text-stone-700">
                <span className="text-stone-400">{t('panchangPage.endsAt', 'Ends at')}:</span>{' '}
                <span className="font-bold text-stone-900 font-mono">{formatTimeSafe(primaryKaranaObj.endTime)}</span>
              </div>
            )}
            {nextKaranaObj && (
              <div className="text-[11px] text-stone-500">
                <span>Next: {nextKaranaObj.name} ({formatTimeSafe(nextKaranaObj.endTime)})</span>
              </div>
            )}
            <div className="text-[11px] text-stone-600 pt-1">
              <span className="text-stone-400">Action:</span>{' '}
              <span className="text-[#c28227] font-semibold">Sacred Deeds</span>
            </div>
          </div>
        </div>

        {/* 5. VARA (WEEKDAY) */}
        <div className="bg-white rounded-[24px] p-5 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c28227] bg-[#fefaf0] px-2.5 py-0.5 rounded-full border border-amber-200">
                5. {t('panchangPage.vara', 'Vara')}
              </span>
              <div className="p-1.5 rounded-lg bg-[#fefaf0] text-[#c28227]">
                <Compass className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-0.5 group-hover:text-[#c28227] transition-colors font-cinzel">
              {currentLang === 'hi' ? varaObj.hiName : varaObj.enName}
            </h3>
            <p className="text-xs text-[#c28227] font-semibold mb-3">
              {currentLang === 'hi' ? varaObj.planetHi : varaObj.planetEn}
            </p>
          </div>

          <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
            <div className="text-stone-700">
              <span className="text-stone-400">{t('panchangPage.rulingDeity', 'Deity')}:</span>{' '}
              <span className="font-bold text-stone-900">{currentLang === 'hi' ? varaObj.deityHi : varaObj.deityEn}</span>
            </div>
            <div className="text-[11px] text-stone-600 pt-1">
              <span className="text-stone-400">Duration:</span>{' '}
              <span className="text-[#c28227] font-semibold">{t('panchangPage.throughoutDay', 'Full Day')}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Celestial Sun & Moon Timings + Vedic Samvat Banner */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sun & Moon Timings (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-4 text-stone-900 border-b border-stone-100 pb-3">
            <div className="p-1.5 rounded-lg bg-amber-100 text-[#c28227]">
              <Sun className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-base font-cinzel">
              {t('panchangPage.celestialInfo', 'Sun & Moon Timings')}
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Sunrise */}
            <div className="bg-[#fefaf0] border border-amber-200/80 rounded-2xl p-3.5 text-center">
              <div className="text-[#c28227] text-xs font-bold mb-1 flex items-center justify-center gap-1">
                <Sun className="w-3.5 h-3.5" />
                {t('panchangPage.sunrise', 'Sunrise')}
              </div>
              <div className="text-base sm:text-lg font-extrabold text-stone-900 font-mono">
                {formatTimeSafe(sunrise)}
              </div>
            </div>

            {/* Sunset */}
            <div className="bg-[#fefaf0] border border-orange-200/80 rounded-2xl p-3.5 text-center">
              <div className="text-orange-700 text-xs font-bold mb-1 flex items-center justify-center gap-1">
                <Sun className="w-3.5 h-3.5 rotate-180" />
                {t('panchangPage.sunset', 'Sunset')}
              </div>
              <div className="text-base sm:text-lg font-extrabold text-stone-900 font-mono">
                {formatTimeSafe(sunset)}
              </div>
            </div>

            {/* Moonrise */}
            <div className="bg-[#fefaf0] border border-sky-200/80 rounded-2xl p-3.5 text-center">
              <div className="text-sky-800 text-xs font-bold mb-1 flex items-center justify-center gap-1">
                <Moon className="w-3.5 h-3.5" />
                {t('panchangPage.moonrise', 'Moonrise')}
              </div>
              <div className="text-base sm:text-lg font-extrabold text-stone-900 font-mono">
                {formatTimeSafe(moonrise)}
              </div>
            </div>

            {/* Moonset */}
            <div className="bg-[#fefaf0] border border-indigo-200/80 rounded-2xl p-3.5 text-center">
              <div className="text-indigo-800 text-xs font-bold mb-1 flex items-center justify-center gap-1">
                <Moon className="w-3.5 h-3.5 opacity-70" />
                {t('panchangPage.moonset', 'Moonset')}
              </div>
              <div className="text-base sm:text-lg font-extrabold text-stone-900 font-mono">
                {formatTimeSafe(moonset)}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
            <div className="text-stone-600">
              <span className="text-stone-400">{t('panchangPage.sunRashi', 'Sun Sign')}:</span>{' '}
              <span className="font-bold text-stone-900">{sunRashi?.name || 'Surya Rashi'}</span>
            </div>
            <div className="text-stone-600">
              <span className="text-stone-400">{t('panchangPage.moonRashi', 'Moon Sign')}:</span>{' '}
              <span className="font-bold text-stone-900">{moonRashi?.name || 'Chandra Rashi'}</span>
            </div>
          </div>
        </div>

        {/* Samvat Era & Month Metadata (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 text-stone-900 border-b border-stone-100 pb-3">
              <div className="p-1.5 rounded-lg bg-amber-100 text-[#c28227]">
                <CalendarDays className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base font-cinzel">
                {t('panchangPage.samvatEra', 'Vedic Calendar Era')}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-[#fefaf0] p-3 rounded-xl border border-stone-200/80">
                <span className="text-stone-500 block text-[11px]">{t('panchangPage.vikramSamvat', 'Vikram Samvat')}</span>
                <span className="text-sm font-bold text-stone-900">{samvat?.vikram || '2083'} ({samvat?.samvatsara || 'Parabhava'})</span>
              </div>
              <div className="bg-[#fefaf0] p-3 rounded-xl border border-stone-200/80">
                <span className="text-stone-500 block text-[11px]">{t('panchangPage.shakaSamvat', 'Shaka Samvat')}</span>
                <span className="text-sm font-bold text-stone-900">{samvat?.shaka || '1948'}</span>
              </div>
              <div className="bg-[#fefaf0] p-3 rounded-xl border border-stone-200/80">
                <span className="text-stone-500 block text-[11px]">{t('panchangPage.masa', 'Month (Masa)')}</span>
                <span className="text-sm font-bold text-[#c28227]">{masa?.name || 'Shravana'} {masa?.isAdhika ? '(Adhik)' : ''}</span>
              </div>
              <div className="bg-[#fefaf0] p-3 rounded-xl border border-stone-200/80">
                <span className="text-stone-500 block text-[11px]">{t('panchangPage.paksha', 'Paksha')}</span>
                <span className="text-sm font-bold text-stone-900">{paksha} Paksha</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <div>
              <span className="text-stone-400">{t('panchangPage.ritu', 'Ritu')}:</span>{' '}
              <span className="text-stone-900 font-bold">{ritu || 'Varsha'}</span>
            </div>
            <div>
              <span className="text-stone-400">{t('panchangPage.ayana', 'Ayana')}:</span>{' '}
              <span className="text-stone-900 font-bold">{ayana || 'Dakshinayana'}</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
