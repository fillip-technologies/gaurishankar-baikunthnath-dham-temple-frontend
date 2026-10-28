import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';
import shivlingImg from '../../assets/home/sacred_shivling_abhishek.jpg';
import templeHeroImg from '../../assets/home/about-reference-bg.jpg';
import diyaImg from '../../assets/home/sacred_diya_temple_bg.jpg';
import herosection3Img from '../../assets/home/herosection-3.png';

/* ─── Static Event Data ─────────────────────────────────────────────────── */
const EVENTS = [
  {
    id: 1,
    day: '07', month: 'AUG', year: '2026', calDay: 7,
    title: 'Shri Krishna Janmashtami',
    description: 'Join us for the sacred celebration of Shri Krishna Janmashtami with special puja, bhajans, cultural programs, and divine darshan at the temple.',
    time: '05:00 AM onwards',
    date: '07 August 2026 (Friday)',
    location: 'Shri Gaurishankar Baikunthnath Dham',
    badgeBg: 'linear-gradient(160deg, #92400e, #451a03)',
    image: shivlingImg,
    icon: '🪔',
  },
  {
    id: 2,
    day: '11', month: 'AUG', year: '2026', calDay: 11,
    title: 'Shravan Somvar Vishesh Puja',
    description: 'A divine Monday Puja dedicated to Lord Shiva during the sacred month of Shravan. Special abhishek and aarti will be performed for devotees.',
    time: '06:30 AM onwards',
    date: '11 August 2026 (Monday)',
    location: 'Baikunthnath Dham',
    badgeBg: 'linear-gradient(160deg, #1e3a5f, #0c1a2e)',
    image: diyaImg,
    icon: '🔱',
  },
  {
    id: 3,
    day: '15', month: 'AUG', year: '2026', calDay: 15,
    title: 'Independence Day Samaroh',
    description: "Celebrate the 78th Independence Day with a grand flag-hoisting ceremony, cultural programs, and special puja for the nation's prosperity.",
    time: '08:00 AM onwards',
    date: '15 August 2026 (Saturday)',
    location: 'Baikunthnath Dham',
    badgeBg: 'linear-gradient(160deg, #166534, #052e16)',
    image: templeHeroImg,
    icon: '🇮🇳',
  },
  {
    id: 4,
    day: '26', month: 'AUG', year: '2026', calDay: 26,
    title: 'Maha Rudrabhishek',
    description: 'A grand Maha Rudrabhishek ceremony with 1008 bilva patra offerings, vedic chanting, and divine blessings for all devotees.',
    time: '05:00 AM onwards',
    date: '26 August 2026 (Wednesday)',
    location: 'Baikunthnath Dham',
    badgeBg: 'linear-gradient(160deg, #5b21b6, #2e1065)',
    image: herosection3Img,
    icon: '🕉️',
  },
];

/* ─── Calendar strip dates — full August 2026 (1–30) ───────────────────── */
const CALENDAR_DAYS = [
  { d: 1,  w: 'SAT' }, { d: 2,  w: 'SUN' }, { d: 3,  w: 'MON' },
  { d: 4,  w: 'TUE' }, { d: 5,  w: 'WED' }, { d: 6,  w: 'THU' },
  { d: 7,  w: 'FRI' }, { d: 8,  w: 'SAT' }, { d: 9,  w: 'SUN' },
  { d: 10, w: 'MON' }, { d: 11, w: 'TUE' }, { d: 12, w: 'WED' },
  { d: 13, w: 'THU' }, { d: 14, w: 'FRI' }, { d: 15, w: 'SAT' },
  { d: 16, w: 'SUN' }, { d: 17, w: 'MON' }, { d: 18, w: 'TUE' },
  { d: 19, w: 'WED' }, { d: 20, w: 'THU' }, { d: 21, w: 'FRI' },
  { d: 22, w: 'SAT' }, { d: 23, w: 'SUN' }, { d: 24, w: 'MON' },
  { d: 25, w: 'TUE' }, { d: 26, w: 'WED' }, { d: 27, w: 'THU' },
  { d: 28, w: 'FRI' }, { d: 29, w: 'SAT' }, { d: 30, w: 'SUN' },
];

export default function UpcomingEvents() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = EVENTS[activeIndex];
  const eventDays = EVENTS.map((e) => parseInt(e.day, 10));

  const goNext = () => setActiveIndex((prev) => (prev + 1) % EVENTS.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + EVENTS.length) % EVENTS.length);

  const calendarRef = useRef(null);
  const scrollCal = (dir) => {
    if (calendarRef.current) {
      calendarRef.current.scrollBy({ left: dir === 'left' ? -160 : 160, behavior: 'smooth' });
    }
  };

  return (
    <section id="events-section" className="w-full bg-[#faf7f2] text-stone-900 overflow-hidden">

      {/* ── TOP PANEL ─────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_320px] gap-5 lg:gap-8 items-stretch">

          {/* Col 1: Title & CTA */}
          <div className="flex flex-col lg:justify-between py-1">
            <div>
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <span
                  className="text-[10px] font-bold tracking-[0.2em] text-[#8b1a1a] uppercase"
                  style={{ fontFamily: 'var(--font-cinzel, serif)' }}
                >
                  ✦ Events
                </span>
                {/* Mobile-only View All Events pill button in header */}
                <a
                  href="/events"
                  className="lg:hidden inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                  style={{ background: '#8b1a1a' }}
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <h2
                className="text-2xl sm:text-4xl font-extrabold leading-tight lg:leading-[1.1] text-stone-900 mb-2 lg:mb-3"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                <span className="lg:block">{t('upcomingEvents.titleLine1', 'Upcoming')} </span>
                <span className="text-[#c28227]">{t('upcomingEvents.titleLine2', 'Events')}</span>
              </h2>

              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-full lg:max-w-[200px]">
                {t('upcomingEvents.subtitle', 'Be part of the divine celebrations and special events at Shri Gaurishankar Baikunthnath Dham.')}
              </p>
            </div>

            {/* Desktop View All Events button */}
            <a
              href="/events"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95 w-fit mt-4"
              style={{ background: '#8b1a1a' }}
            >
              View All Events <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Wrapper for Featured Event on Mobile (Single cohesive card on phone, transparent contents on desktop) */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-stone-200/80 lg:contents">

            {/* Col 2: Featured Image */}
            <div className="relative w-full h-[210px] sm:h-[270px] lg:h-[360px] lg:rounded-2xl overflow-hidden lg:shadow-xl group">
              <img
                key={activeEvent.id}
                src={activeEvent.image}
                alt={activeEvent.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Date Badge */}
              <div
                className="absolute top-3 left-3 sm:top-4 sm:left-4 text-white text-center rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2.5 min-w-[54px] sm:min-w-[62px] shadow-lg"
                style={{ background: activeEvent.badgeBg }}
              >
                <div className="text-xl sm:text-2xl font-bold leading-none">{activeEvent.day}</div>
                <div className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mt-0.5 opacity-90">{activeEvent.month}</div>
                <div className="text-[9px] sm:text-[10px] opacity-70 mt-0.5">{activeEvent.year}</div>
              </div>

              {/* Icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 backdrop-blur-sm bg-white/10 flex items-center justify-center text-xl sm:text-2xl shadow-sm">
                  {activeEvent.icon}
                </div>
              </div>

              {/* Prev/Next */}
              <button
                onClick={goPrev}
                className="absolute left-3 bottom-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all cursor-pointer active:scale-90"
                aria-label="Previous event"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goNext}
                className="absolute left-13 sm:left-14 bottom-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all cursor-pointer active:scale-90"
                aria-label="Next event"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Col 3: Event Details */}
            <div className="p-4 sm:p-5 lg:p-0 flex flex-col justify-between gap-4 lg:py-1">
              {/* Top: badge + title + description */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-[10px] sm:text-[11px] font-bold tracking-wider w-fit">
                  <span>👑</span> MAJOR EVENT
                </div>

                <h3
                  className="text-lg sm:text-2xl font-bold text-stone-900 leading-snug"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {activeEvent.title}
                </h3>

                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {activeEvent.description}
                </p>
              </div>

              {/* Bottom: meta + actions */}
              <div className="flex flex-col gap-3">
                {/* Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-600 border-t border-stone-200 pt-3">
                  <div className="flex items-center sm:flex-col sm:items-start gap-2 sm:gap-1">
                    <Calendar className="w-4 h-4 text-[#8b1a1a] shrink-0" />
                    <span className="font-medium leading-tight text-stone-700">{activeEvent.date}</span>
                  </div>
                  <div className="flex items-center sm:flex-col sm:items-start gap-2 sm:gap-1">
                    <Clock className="w-4 h-4 text-[#8b1a1a] shrink-0" />
                    <span className="font-medium leading-tight text-stone-700">{activeEvent.time}</span>
                  </div>
                  <div className="flex items-center sm:flex-col sm:items-start gap-2 sm:gap-1">
                    <MapPin className="w-4 h-4 text-[#8b1a1a] shrink-0" />
                    <span className="font-medium leading-tight text-stone-700 line-clamp-1">{activeEvent.location}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-fit px-4 py-2.5 rounded-xl sm:rounded-lg text-white text-xs sm:text-sm font-semibold transition-all hover:opacity-90 active:scale-95 shadow-sm"
                    style={{ background: '#8b1a1a' }}
                  >
                    View Event Details <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── CALENDAR STRIP ──────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-4">
        <div className="flex items-center gap-2 sm:gap-3 border-t border-b border-stone-200 py-2.5 sm:py-3 bg-white/70 rounded-xl px-2.5 sm:px-4">
          <button className="flex items-center gap-1 text-[11px] sm:text-sm font-bold text-stone-800 whitespace-nowrap hover:text-[#8b1a1a] transition-colors shrink-0 cursor-pointer">
            AUG 2026 <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
          </button>

          <div ref={calendarRef} className="flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-1 sm:gap-1.5 min-w-max">
              {CALENDAR_DAYS.map(({ d, w }) => {
                const isEvent = eventDays.includes(d);
                const isActive = parseInt(activeEvent.day, 10) === d;
                return (
                  <button
                    key={d}
                    onClick={() => {
                      const idx = EVENTS.findIndex((e) => parseInt(e.day, 10) === d);
                      if (idx !== -1) setActiveIndex(idx);
                    }}
                    className={`flex flex-col items-center justify-center w-8 sm:w-9 h-10 sm:h-11 rounded-lg transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#8b1a1a] text-white shadow-md'
                        : isEvent
                        ? 'bg-amber-100 text-[#8b1a1a] border border-amber-300'
                        : w === 'SUN'
                        ? 'text-red-400 hover:bg-stone-100'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                    aria-label={`${d} ${w}`}
                  >
                    <span className="text-[11px] font-bold leading-none">{d < 10 ? `0${d}` : d}</span>
                    <span className="text-[8px] sm:text-[9px] mt-0.5 opacity-80">{w}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => scrollCal('left')}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => scrollCal('right')}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM EVENT CARDS ─────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {EVENTS.map((event, idx) => (
            <button
              key={event.id}
              onClick={() => setActiveIndex(idx)}
              className={`text-left rounded-xl overflow-hidden shadow-sm border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group bg-white ${
                activeIndex === idx ? 'ring-2 ring-[#8b1a1a] border-[#8b1a1a]' : 'border-stone-200'
              }`}
            >
              <div className="relative h-24 sm:h-36 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div
                  className="absolute top-2 left-2 text-white text-center rounded-lg px-1.5 py-1 sm:px-2 sm:py-1.5 min-w-[38px] sm:min-w-[44px] shadow-md"
                  style={{ background: event.badgeBg }}
                >
                  <div className="text-xs sm:text-sm font-bold leading-none">{event.day}</div>
                  <div className="tracking-wide uppercase opacity-90 text-[8px] sm:text-[9px]">{event.month}</div>
                  <div className="opacity-70 text-[7px] sm:text-[8px]">{event.year}</div>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 bg-white">
                <h4 className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-[#8b1a1a] transition-colors">
                  {event.title}
                </h4>
                <div className="flex flex-col gap-1 text-[10px] sm:text-[11px] text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#8b1a1a] shrink-0" />
                    <span className="line-clamp-1">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#8b1a1a] shrink-0" />
                    <span className="line-clamp-1">Baikunthnath Dham</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white transition-all ${
                    activeIndex === idx ? 'bg-[#8b1a1a]' : 'bg-stone-200 group-hover:bg-[#8b1a1a]'
                  }`}>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

    </section>
  );
}
