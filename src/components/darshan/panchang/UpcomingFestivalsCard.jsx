import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { getPanchangam, Observer } from '@ishubhamx/panchangam-js';

export default function UpcomingFestivalsCard({ selectedDate, selectedCity, todayFestivals = [] }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  // Compute upcoming festivals for the next 45 days
  const upcomingList = useMemo(() => {
    const list = [];
    const obs = new Observer(selectedCity.lat, selectedCity.lon, selectedCity.elevation || 100);
    const seenEvents = new Set();

    const baseDate = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);

    for (let offset = 1; offset <= 45; offset++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + offset);

      try {
        const p = getPanchangam(d, obs, {
          timezoneOffset: selectedCity.tzOffset || 330,
          calendarType: 'purnimanta'
        });

        if (Array.isArray(p.festivals) && p.festivals.length > 0) {
          p.festivals.forEach((fest) => {
            // Skip redundant minor Parana duplicates if needed
            const eventKey = `${fest.name}-${d.toISOString().slice(0, 10)}`;
            if (!seenEvents.has(eventKey)) {
              seenEvents.add(eventKey);
              list.push({
                name: fest.name,
                category: fest.category || 'festival',
                description: fest.description || '',
                isFastingDay: fest.isFastingDay,
                observances: fest.observances || [],
                eventDate: new Date(d)
              });
            }
          });
        }
      } catch (err) {
        console.warn('Error calculating festival for day offset:', offset, err);
      }
    }

    return list.slice(0, 12); // Display top 12 upcoming festivals
  }, [selectedDate, selectedCity]);

  return (
    <section id="festivals-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight ${
          currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
        }`}>
          {currentLang === 'hi' ? 'व्रत, त्यौहार एवं पर्व' : 'Vrat, Tyohar & Divine Observances'}
        </h2>
        <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
        <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          {t('panchangPage.festivalsDesc', 'Upcoming sacred fasts, Ekadashi, Purnima, and divine festivals celebrated at the temple')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* =========================================================
            LEFT CARD: TODAY'S FESTIVALS & VRAT
           ========================================================= */}
        <div className="lg:col-span-5 bg-white border border-stone-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-100 text-[#c28227]">
                  <Flame className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base sm:text-lg font-cinzel text-stone-900">
                  {t('panchangPage.todayFestivals', 'Festivals & Vrat Today')}
                </h3>
              </div>
              <span className="px-3 py-0.5 rounded-full bg-amber-100 text-[#c28227] font-bold text-[10px] uppercase tracking-wider">
                TODAY
              </span>
            </div>

            {todayFestivals && todayFestivals.length > 0 ? (
              <div className="space-y-4">
                {todayFestivals.map((fest, idx) => (
                  <div key={idx} className="bg-[#fefaf0] border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-stone-900 font-cinzel">
                        {fest.name}
                      </h4>
                      {fest.isFastingDay && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#c28227] text-white text-[10px] font-bold shadow-xs">
                          {t('panchangPage.fastingDay', 'Vrat / Fasting')}
                        </span>
                      )}
                    </div>

                    {fest.description && (
                      <p className="text-xs text-stone-700 leading-relaxed font-medium">
                        {fest.description}
                      </p>
                    )}

                    {fest.observances && fest.observances.length > 0 && (
                      <div className="pt-2 border-t border-amber-200/60">
                        <span className="text-[11px] text-stone-500 block mb-1.5 font-semibold">
                          {t('panchangPage.observances', 'Observances')}:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {fest.observances.map((obs, oIdx) => (
                            <span key={oIdx} className="px-2.5 py-0.5 rounded-md bg-white text-stone-700 text-[10px] border border-amber-200 font-medium shadow-2xs">
                              {obs}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#fefaf0] border border-stone-200/80 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-stone-900 font-bold text-sm">
                  Regular Auspicious Day (सात्विक दिवस)
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  No restrictive fast scheduled today. Regular temple pooja, aartis, and nitya aradhana continue.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-stone-100 text-xs text-[#c28227] text-center font-bold font-hindi">
            ॥ धर्मो रक्षति रक्षितः • श्री हरि-हर विजयते ॥
          </div>
        </div>

        {/* =========================================================
            RIGHT CARD: UPCOMING FESTIVALS LIST (NEXT 45 DAYS)
           ========================================================= */}
        <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-[#c28227]">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base sm:text-lg font-cinzel text-stone-900">
                {t('panchangPage.upcomingFestivals', 'Upcoming Vrat & Festivals')}
              </h3>
            </div>
            <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider">
              NEXT 45 DAYS
            </span>
          </div>

          {upcomingList.length > 0 ? (
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {upcomingList.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#fefaf0] hover:bg-[#fcf5e5] border border-stone-200/80 hover:border-[#c28227]/50 rounded-2xl p-3.5 flex items-center justify-between gap-3 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    {/* Date Badge */}
                    <div className="w-12 h-12 rounded-xl bg-amber-100/90 text-[#c28227] border border-amber-300 flex flex-col items-center justify-center text-center shrink-0 shadow-2xs">
                      <span className="text-[9px] font-bold uppercase leading-none">
                        {item.eventDate.toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-base font-extrabold text-stone-900 leading-none mt-0.5">
                        {item.eventDate.getDate()}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm font-cinzel">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 font-medium">
                        {item.eventDate.toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-IN', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.isFastingDay && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#c28227] text-[10px] font-bold border border-amber-300">
                        Vrat
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded bg-white text-stone-600 text-[10px] uppercase border border-stone-200 font-bold shadow-2xs">
                      {item.category || 'Festival'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-stone-500 text-xs">
              No upcoming festivals detected in the current cycle.
            </div>
          )}
        </div>

      </div>

    </section>
  );
}
