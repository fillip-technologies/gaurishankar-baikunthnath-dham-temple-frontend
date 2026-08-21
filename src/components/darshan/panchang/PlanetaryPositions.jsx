import React from 'react';
import { useTranslation } from 'react-i18next';
import { Compass, Sparkles, Navigation, Globe } from 'lucide-react';

const PLANET_NAMES = {
  sun: { en: 'Surya (Sun)', hi: 'सूर्य' },
  moon: { en: 'Chandra (Moon)', hi: 'चंद्र' },
  mars: { en: 'Mangal (Mars)', hi: 'मंगल' },
  mercury: { en: 'Budha (Mercury)', hi: 'बुध' },
  jupiter: { en: 'Guru (Jupiter)', hi: 'बृहस्पति / गुरु' },
  venus: { en: 'Shukra (Venus)', hi: 'शुक्र' },
  saturn: { en: 'Shani (Saturn)', hi: 'शनि' },
  rahu: { en: 'Rahu (North Node)', hi: 'राहु' },
  ketu: { en: 'Ketu (South Node)', hi: 'केतु' }
};

const RASHI_HINDI = {
  Aries: 'मेष',
  Taurus: 'वृषभ',
  Gemini: 'मिथुन',
  Cancer: 'कर्क',
  Leo: 'सिंह',
  Virgo: 'कन्या',
  Libra: 'तुला',
  Scorpio: 'वृश्चिक',
  Sagittarius: 'धनु',
  Capricorn: 'मकर',
  Aquarius: 'कुंभ',
  Pisces: 'मीन'
};

const DISHA_REMEDIES = {
  East: { en: 'Consume Ghee / Curd before travel', hi: 'यात्रा पूर्व घी या दही का सेवन करें' },
  West: { en: 'Consume Jaggery / Barley before travel', hi: 'यात्रा पूर्व गुड़ या जौ का सेवन करें' },
  North: { en: 'Consume Milk / Fennel before travel', hi: 'यात्रा पूर्व दूध या सौंफ का सेवन करें' },
  South: { en: 'Consume Mustard seeds / Jaggery before travel', hi: 'यात्रा पूर्व राई या गुड़ का सेवन करें' }
};

function formatDegrees(degVal) {
  if (degVal == null) return '--';
  const deg = Math.floor(degVal);
  const min = Math.floor((degVal - deg) * 60);
  return `${deg}° ${String(min).padStart(2, '0')}'`;
}

export default function PlanetaryPositions({ panchangData }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  if (!panchangData?.planetaryPositions) return null;

  const planets = panchangData.planetaryPositions;
  const planetKeys = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];
  const dishaShoola = panchangData.dishaShoola;
  const inauspiciousDir = dishaShoola?.inauspiciousDirection || 'West';
  const remedyObj = DISHA_REMEDIES[inauspiciousDir] || DISHA_REMEDIES.West;

  return (
    <section id="planets-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight ${
          currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
        }`}>
          {currentLang === 'hi' ? 'ग्रह स्थिति एवं दिशा शूल' : 'Graha Sthiti & Disha Shoola'}
        </h2>
        <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
        <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          {t('panchangPage.navagrahaDesc', 'Precise sidereal positions of all nine celestial bodies and directional guidance')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navagraha Table (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-stone-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
            <div className="flex items-center gap-2 text-stone-900">
              <div className="p-1.5 rounded-lg bg-amber-100 text-[#c28227]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base sm:text-lg font-cinzel">
                {t('panchangPage.navagrahaTitle', 'Navagraha Planetary Positions')}
              </h3>
            </div>
            <span className="px-3 py-0.5 rounded-full bg-amber-100 text-[#c28227] font-bold text-[10px] uppercase tracking-wider">
              NIRAYANA
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#fefaf0] border-b border-stone-200 text-stone-700 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3 px-3.5 rounded-l-lg">{t('panchangPage.planet', 'Graha')}</th>
                  <th className="py-3 px-3.5">{t('panchangPage.sign', 'Rashi')}</th>
                  <th className="py-3 px-3.5">{t('panchangPage.longitude', 'Degree')}</th>
                  <th className="py-3 px-3.5">{t('panchangPage.nakshatraTitle', 'Nakshatra')}</th>
                  <th className="py-3 px-3.5">{t('panchangPage.pada', 'Pada')}</th>
                  <th className="py-3 px-3.5 text-right rounded-r-lg">{t('panchangPage.status', 'Status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
                {planetKeys.map((key) => {
                  const p = planets[key];
                  if (!p) return null;
                  const nameObj = PLANET_NAMES[key] || { en: key, hi: key };
                  const rashiHindi = RASHI_HINDI[p.rashiName] || p.rashiName;

                  let dignityBadge = null;
                  if (p.dignity === 'exalted') {
                    dignityBadge = <span className="px-2 py-0.5 rounded bg-[#dcfce7] text-[#15803d] text-[10px] font-bold">Exalted</span>;
                  } else if (p.dignity === 'debilitated') {
                    dignityBadge = <span className="px-2 py-0.5 rounded bg-[#fee2e2] text-[#991b1b] text-[10px] font-bold">Debilitated</span>;
                  } else if (p.dignity === 'own') {
                    dignityBadge = <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">Own Sign</span>;
                  }

                  return (
                    <tr key={key} className="hover:bg-[#fefaf0] transition-colors">
                      <td className="py-3 px-3.5 font-bold text-stone-900">
                        {currentLang === 'hi' ? nameObj.hi : nameObj.en}
                      </td>
                      <td className="py-3 px-3.5 font-semibold text-[#c28227]">
                        {currentLang === 'hi' ? rashiHindi : p.rashiName}
                      </td>
                      <td className="py-3 px-3.5 font-mono text-stone-700">
                        {formatDegrees(p.degree)}
                      </td>
                      <td className="py-3 px-3.5 text-stone-700">
                        {p.nakshatra}
                      </td>
                      <td className="py-3 px-3.5 font-mono text-stone-500">
                        {p.pada}
                      </td>
                      <td className="py-3 px-3.5 text-right space-x-1">
                        {p.isRetrograde && (
                          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                            {t('panchangPage.retrograde', 'Vakri')}
                          </span>
                        )}
                        {dignityBadge}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disha Shoola & Travel Remedy Card (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-stone-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-stone-900">
                <div className="p-1.5 rounded-lg bg-amber-100 text-[#c28227]">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base sm:text-lg font-cinzel">
                  {t('panchangPage.dishaShoolaTitle', 'Disha Shoola')}
                </h3>
              </div>
              <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px] uppercase tracking-wider">
                TRAVEL
              </span>
            </div>

            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              {t('panchangPage.dishaShoolaDesc', 'Traditional direction to avoid embarking upon long travels on this day of the week')}
            </p>

            <div className="bg-[#fefaf0] border-l-4 border-rose-500 border-t border-r border-b border-stone-200/80 rounded-2xl p-4 mb-4 text-center">
              <span className="text-xs text-rose-700 block uppercase tracking-wider mb-1 font-bold">
                {t('panchangPage.forbiddenDirection', 'Avoid Traveling Towards')}
              </span>
              <span className="text-2xl font-extrabold text-stone-900 font-cinzel">
                {inauspiciousDir} (दिशा)
              </span>
            </div>

            <div className="bg-[#fefaf0] border border-stone-200/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-[#c28227] font-bold">
                <Navigation className="w-3.5 h-3.5" />
                <span>{t('panchangPage.remedy', 'Nivaran / Remedy')}:</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {currentLang === 'hi' ? remedyObj.hi : remedyObj.en}
              </p>
              <p className="text-[11px] text-stone-500 italic pt-1">
                {t('panchangPage.remedyDesc', 'Chant Gayatri Mantra or Mahamrityunjaya Mantra before stepping out.')}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500 text-center font-medium">
            Calculated according to Parashara Hora Shastra
          </div>
        </div>

      </div>

    </section>
  );
}
