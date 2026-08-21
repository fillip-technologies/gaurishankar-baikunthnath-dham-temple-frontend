import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Sparkles, Clock } from 'lucide-react';
import { formatTimeSafe, isTimeInRange } from './panchangUtils';

const CHOGHADIYA_MEANINGS = {
  Amrit: {
    enMeaning: 'Best (Amrit - Immortality & Supreme Fruit)',
    hiMeaning: 'अमृत (सर्वोत्तम फल, शांति व सिद्धि)',
    type: 'good',
    badgeClass: 'bg-[#dcfce7] text-[#15803d] border-emerald-200',
    barColor: 'border-emerald-600'
  },
  Shubh: {
    enMeaning: 'Auspicious (Shubh - Good Luck & Ceremony)',
    hiMeaning: 'शुभ (उत्तम, मांगलिक कार्य व पूजा)',
    type: 'good',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    barColor: 'border-amber-500'
  },
  Labh: {
    enMeaning: 'Gain (Labh - Wealth & Business)',
    hiMeaning: 'लाभ (धन-धान्य वृद्धि व व्यापार)',
    type: 'good',
    badgeClass: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    barColor: 'border-yellow-500'
  },
  Chal: {
    enMeaning: 'Neutral (Chal / Char - Movement & Travel)',
    hiMeaning: 'चल / चर (सामान्य, यात्रा व गतिशीलता)',
    type: 'neutral',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    barColor: 'border-sky-500'
  },
  Udveg: {
    enMeaning: 'Inauspicious (Udveg - Anxiety & Stress)',
    hiMeaning: 'उद्वेग (चिंता, भय व तनाव कारक)',
    type: 'bad',
    badgeClass: 'bg-[#fee2e2] text-[#991b1b] border-rose-200',
    barColor: 'border-rose-500'
  },
  Rog: {
    enMeaning: 'Inauspicious (Rog - Disease & Delay)',
    hiMeaning: 'रोग (रोग व बाधा कारक)',
    type: 'bad',
    badgeClass: 'bg-[#fee2e2] text-[#991b1b] border-rose-200',
    barColor: 'border-rose-500'
  },
  Kaal: {
    enMeaning: 'Inauspicious (Kaal - Loss & Hazard)',
    hiMeaning: 'काल (हानि व संकट कारक)',
    type: 'bad',
    badgeClass: 'bg-[#fee2e2] text-[#991b1b] border-rose-200',
    barColor: 'border-rose-500'
  }
};

export default function ChoghadiyaGrid({ panchangData }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [activeTab, setActiveTab] = useState('day'); // 'day' | 'night'

  if (!panchangData?.choghadiya) return null;

  const dayList = panchangData.choghadiya.day || [];
  const nightList = panchangData.choghadiya.night || [];
  const currentList = activeTab === 'day' ? dayList : nightList;
  const now = new Date();

  return (
    <section id="choghadiya-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight ${
          currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
        }`}>
          {currentLang === 'hi' ? 'दैनिक चौघड़िया मुहूर्त' : 'Vedic Choghadiya Muhurat'}
        </h2>
        <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
        <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          {t('panchangPage.choghadiyaDesc', 'Traditional 8-period division of day and night to identify instant auspiciousness for daily activities')}
        </p>
      </div>

      {/* Day / Night Toggle Pill */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1.5 rounded-2xl border border-stone-200 flex items-center gap-2 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('day')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'day'
                ? 'bg-[#c28227] text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>{t('panchangPage.dayChoghadiya', 'Day Choghadiya')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('night')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'night'
                ? 'bg-stone-900 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>{t('panchangPage.nightChoghadiya', 'Night Choghadiya')}</span>
          </button>
        </div>
      </div>

      {/* Choghadiya Grid (8 slots) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentList.map((slot, index) => {
          const meaning = CHOGHADIYA_MEANINGS[slot.name] || CHOGHADIYA_MEANINGS.Chal;
          const isActive = isTimeInRange(slot.startTime, slot.endTime, now);

          return (
            <div
              key={index}
              className={`bg-[#fefaf0] hover:bg-[#fcf5e5] rounded-2xl p-5 border-l-4 ${meaning.barColor} border-t border-r border-b border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'ring-2 ring-[#c28227] shadow-lg scale-[1.02]'
                  : ''
              }`}
            >
              {/* Header: Slot Name & Number */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-stone-400">
                    Slot {index + 1}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${meaning.badgeClass}`}>
                    {slot.name}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-stone-900 mb-1 font-cinzel">
                  {slot.name}
                </h3>

                <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                  {currentLang === 'hi' ? meaning.hiMeaning : meaning.enMeaning}
                </p>
              </div>

              {/* Time Range & Active Indicator Footer */}
              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-stone-900 font-mono font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#c28227]" />
                  <span>{formatTimeSafe(slot.startTime)} - {formatTimeSafe(slot.endTime)}</span>
                </div>

                {isActive && (
                  <span className="px-2 py-0.5 text-[9px] font-extrabold rounded bg-[#c28227] text-white animate-pulse">
                    ACTIVE
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
