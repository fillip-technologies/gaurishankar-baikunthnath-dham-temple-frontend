import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatTimeSafe, isTimeInRange } from './panchangUtils';

export default function AuspiciousTimings({ panchangData }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  if (!panchangData) return null;

  const {
    brahmaMuhurta,
    abhijitMuhurta,
    sunset,
    sunrise,
    rahuKalamStart,
    rahuKalamEnd,
    yamagandaKalam,
    gulikaKalam,
    durMuhurta = [],
    varjyam = []
  } = panchangData;

  const now = new Date();

  // 1. Calculate Godhuli (approx 24 mins before to 24 mins after sunset)
  let godhuliStart = null;
  let godhuliEnd = null;
  if (sunset) {
    const sDate = new Date(sunset);
    godhuliStart = new Date(sDate.getTime() - 24 * 60 * 1000);
    godhuliEnd = new Date(sDate.getTime() + 24 * 60 * 1000);
  }

  // 2. Calculate Nishita Kaal (Mahanisha - 48 mins centered around solar midnight)
  let nishitaStart = null;
  let nishitaEnd = null;
  if (sunset) {
    const sDate = new Date(sunset);
    // Middle of night is approximately sunset + 6 hours
    const midnightApprox = new Date(sDate.getTime() + 6 * 60 * 60 * 1000);
    nishitaStart = new Date(midnightApprox.getTime() - 24 * 60 * 1000);
    nishitaEnd = new Date(midnightApprox.getTime() + 24 * 60 * 1000);
  }

  // 3. Primary Varjyam interval
  const primaryVarjyam = varjyam.find((item) => {
    const s = new Date(item.start);
    const todayStr = new Date(panchangData.sunrise).toDateString();
    return s.toDateString() === todayStr;
  }) || varjyam[varjyam.length - 1] || null;

  // Check if Abhijit overlaps with Rahu Kalam (creating conflict)
  const isAbhijitConflict = isTimeInRange(abhijitMuhurta?.start, abhijitMuhurta?.end, new Date(rahuKalamStart || 0));

  // Format Durmuhurta timings
  const durMuhurtaStr = durMuhurta.length > 0
    ? durMuhurta.map(d => `${formatTimeSafe(d.start)} - ${formatTimeSafe(d.end)}`).join(' • ')
    : 'Not Applicable';

  const auspiciousItems = [
    {
      nameEn: 'Brahma Muhurta',
      nameHi: 'ब्रह्म मुहूर्त',
      timeStr: brahmaMuhurta?.start ? `${formatTimeSafe(brahmaMuhurta.start)} - ${formatTimeSafe(brahmaMuhurta.end)}` : '--',
      tag: 'AUSPICIOUS',
      tagType: 'auspicious',
      barColor: 'border-emerald-600',
      isActive: isTimeInRange(brahmaMuhurta?.start, brahmaMuhurta?.end, now)
    },
    {
      nameEn: 'Abhijit Muhurta',
      nameHi: 'अभिजित मुहूर्त',
      timeStr: abhijitMuhurta?.start ? `${formatTimeSafe(abhijitMuhurta.start)} - ${formatTimeSafe(abhijitMuhurta.end)}` : '--',
      tag: isAbhijitConflict ? 'CONFLICT' : 'AUSPICIOUS',
      tagType: isAbhijitConflict ? 'conflict' : 'auspicious',
      barColor: isAbhijitConflict ? 'border-amber-500' : 'border-emerald-600',
      isActive: isTimeInRange(abhijitMuhurta?.start, abhijitMuhurta?.end, now)
    },
    {
      nameEn: 'Godhuli Muhurta',
      nameHi: 'गोधूलि मुहूर्त',
      timeStr: godhuliStart ? `${formatTimeSafe(godhuliStart)} - ${formatTimeSafe(godhuliEnd)}` : '--',
      tag: 'AUSPICIOUS',
      tagType: 'auspicious',
      barColor: 'border-emerald-600',
      isActive: isTimeInRange(godhuliStart, godhuliEnd, now)
    },
    {
      nameEn: 'Nishita Kaal',
      nameHi: 'निशीथ काल',
      timeStr: nishitaStart ? `${formatTimeSafe(nishitaStart)} - ${formatTimeSafe(nishitaEnd)}` : '--',
      tag: 'RITUAL',
      tagType: 'ritual',
      barColor: 'border-slate-500',
      isActive: isTimeInRange(nishitaStart, nishitaEnd, now)
    },
    {
      nameEn: 'Sunrise',
      nameHi: 'सूर्योदय',
      timeStr: formatTimeSafe(sunrise),
      tag: '–',
      tagType: 'neutral',
      barColor: 'border-slate-400',
      isActive: false
    },
    {
      nameEn: 'Sunset',
      nameHi: 'सूर्यास्त',
      timeStr: formatTimeSafe(sunset),
      tag: '–',
      tagType: 'neutral',
      barColor: 'border-slate-400',
      isActive: false
    }
  ];

  const inauspiciousItems = [
    {
      nameEn: 'Rahu Kalam',
      nameHi: 'राहु काल',
      timeStr: rahuKalamStart ? `${formatTimeSafe(rahuKalamStart)} - ${formatTimeSafe(rahuKalamEnd)}` : '--',
      tag: 'INAUSPICIOUS',
      isActive: isTimeInRange(rahuKalamStart, rahuKalamEnd, now)
    },
    {
      nameEn: 'Yamaganda',
      nameHi: 'यमगण्ड',
      timeStr: yamagandaKalam?.start ? `${formatTimeSafe(yamagandaKalam.start)} - ${formatTimeSafe(yamagandaKalam.end)}` : '--',
      tag: 'INAUSPICIOUS',
      isActive: isTimeInRange(yamagandaKalam?.start, yamagandaKalam?.end, now)
    },
    {
      nameEn: 'Gulikai Kalam',
      nameHi: 'गुलिक काल',
      timeStr: gulikaKalam?.start ? `${formatTimeSafe(gulikaKalam.start)} - ${formatTimeSafe(gulikaKalam.end)}` : '--',
      tag: 'INAUSPICIOUS',
      isActive: isTimeInRange(gulikaKalam?.start, gulikaKalam?.end, now)
    },
    {
      nameEn: 'Durmuhurta',
      nameHi: 'दुर्मुहूर्त',
      timeStr: durMuhurtaStr,
      tag: 'INAUSPICIOUS',
      isActive: durMuhurta.some(d => isTimeInRange(d.start, d.end, now))
    },
    {
      nameEn: 'Varjyam',
      nameHi: 'वर्ज्यम्',
      timeStr: primaryVarjyam?.start ? `${formatTimeSafe(primaryVarjyam.start)} - ${formatTimeSafe(primaryVarjyam.end)}` : '--',
      tag: 'INAUSPICIOUS',
      isActive: isTimeInRange(primaryVarjyam?.start, primaryVarjyam?.end, now)
    }
  ];

  return (
    <section id="muhurat-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* =========================================================
            LEFT CARD: AUSPICIOUS TIMES (SHUBH)
           ========================================================= */}
        <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-stone-200/80">
          
          {/* Card Top Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl sm:text-[26px] font-bold text-stone-900 font-cinzel tracking-tight">
                Auspicious Times
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-medium">
                Shubh Muhurat • Today
              </p>
            </div>
            
            <span className="px-3.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] font-bold text-[11px] tracking-wider uppercase">
              SHUBH
            </span>
          </div>

          {/* List of Auspicious Timings */}
          <div className="space-y-3">
            {auspiciousItems.map((item, idx) => {
              let tagClasses = 'bg-[#dcfce7] text-[#15803d]';
              if (item.tagType === 'conflict') {
                tagClasses = 'bg-[#fef3c7] text-[#92400e]';
              } else if (item.tagType === 'ritual') {
                tagClasses = 'bg-[#f1f5f9] text-[#475569]';
              } else if (item.tagType === 'neutral') {
                tagClasses = 'bg-stone-100 text-stone-400';
              }

              return (
                <div
                  key={idx}
                  className={`bg-[#fefaf0] hover:bg-[#fcf5e5] rounded-xl px-4 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 border-l-4 ${item.barColor} transition-all duration-200 ${
                    item.isActive ? 'ring-2 ring-emerald-500/40 shadow-sm' : ''
                  }`}
                >
                  {/* Left: Name + Hindi Subtitle */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm sm:text-[15px] font-bold text-stone-900 font-cinzel">
                      {item.nameEn}
                    </span>
                    <span className="text-xs text-stone-500 font-hindi">
                      {item.nameHi}
                    </span>
                  </div>

                  {/* Right: Time + Tag Badge */}
                  <div className="flex items-center gap-2.5 shrink-0 ml-auto">
                    <span className="text-xs sm:text-[13px] font-bold text-stone-800 font-mono tracking-tight">
                      {item.timeStr}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${tagClasses}`}>
                      {item.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* =========================================================
            RIGHT CARD: INAUSPICIOUS TIMES (ASHUBH)
           ========================================================= */}
        <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-stone-200/80">
          
          {/* Card Top Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl sm:text-[26px] font-bold text-stone-900 font-cinzel tracking-tight">
                Inauspicious Times
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-medium">
                Avoid • Today
              </p>
            </div>
            
            <span className="px-3.5 py-1 rounded-full bg-[#ffe4e6] text-[#be123c] font-bold text-[11px] tracking-wider uppercase">
              ASHUBH
            </span>
          </div>

          {/* List of Inauspicious Timings */}
          <div className="space-y-3">
            {inauspiciousItems.map((item, idx) => (
              <div
                key={idx}
                className={`bg-[#fefaf0] hover:bg-[#fcf5e5] rounded-xl px-4 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 border-l-4 border-rose-500 transition-all duration-200 ${
                  item.isActive ? 'ring-2 ring-rose-500/40 shadow-sm' : ''
                }`}
              >
                {/* Left: Name + Hindi Subtitle */}
                <div className="flex items-baseline gap-2">
                  <span className="text-sm sm:text-[15px] font-bold text-stone-900 font-cinzel">
                    {item.nameEn}
                  </span>
                  <span className="text-xs text-stone-500 font-hindi">
                    {item.nameHi}
                  </span>
                </div>

                {/* Right: Time + Tag Badge */}
                <div className="flex items-center gap-2.5 shrink-0 ml-auto">
                  <span className="text-xs sm:text-[13px] font-bold text-stone-800 font-mono tracking-tight">
                    {item.timeStr}
                  </span>

                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#fee2e2] text-[#991b1b]">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
