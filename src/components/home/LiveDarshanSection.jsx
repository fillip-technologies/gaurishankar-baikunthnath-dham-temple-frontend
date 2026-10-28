import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, ArrowRight, CheckCircle2, X } from 'lucide-react';
import templeSunsetImg from '../../assets/home/herosection-3.png';

export default function LiveDarshanSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isHi = currentLang === 'hi';
  const [isPlaying, setIsPlaying] = useState(false);

  const handleScheduleClick = (e) => {
    e.preventDefault();
    const scheduleEl = document.getElementById('schedule-section');
    if (scheduleEl) {
      scheduleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="live-darshan-section" 
      className="w-full bg-[#38060d] bg-gradient-to-r from-[#3e080f] via-[#2f050b] to-[#3e080f] py-14 sm:py-18 lg:py-20 text-white font-sans border-y border-amber-500/20 relative overflow-hidden"
    >
      <span id="live-darshan" className="absolute -top-24" aria-hidden="true" />

      {/* ── Left Subtle Sacred Mandala Vector Watermark ── */}
      <div className="absolute top-1/2 -left-28 sm:-left-36 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 opacity-10 pointer-events-none select-none text-amber-300">
        <svg viewBox="0 0 400 400" className="w-full h-full fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M 200 20 C 220 70, 220 130, 200 200 C 180 130, 180 70, 200 20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </svg>
      </div>

      {/* ── Right Subtle Sacred Mandala Vector Watermark ── */}
      <div className="absolute top-1/2 -right-28 sm:-right-36 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 opacity-10 pointer-events-none select-none text-amber-300">
        <svg viewBox="0 0 400 400" className="w-full h-full fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M 200 20 C 220 70, 220 130, 200 200 C 180 130, 180 70, 200 20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── Left Column: Tagline, Title, Description & Action Buttons ── */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            
            {/* Tagline / Overline */}
            <span className="text-[#e5a83b] text-xs font-semibold tracking-[0.2em] uppercase font-sans mb-3">
              {t('liveDarshan.tagline', 'EXPERIENCE DIVINE BLESSINGS')}
            </span>

            {/* Main Title */}
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4 ${
              isHi ? 'font-yatra' : 'font-cinzel'
            }`}>
              {t('liveDarshan.title', 'Live Darshan')}
            </h2>

            {/* Description */}
            <p className="text-stone-300/90 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-light">
              {t('liveDarshan.desc', 'Be a part of the daily aartis and experience the divine presence of Lord Vishnu from anywhere in the world.')}
            </p>

            {/* Action Buttons: Watch Live Darshan & Darshan Schedule */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              
              {/* Button 1: Watch Live Darshan */}
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-[#e5a83b] hover:bg-[#d89726] text-[#240e06] font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl sm:rounded-2xl transition-all shadow-[0_4px_20px_rgba(229,168,59,0.3)] hover:shadow-[0_6px_25px_rgba(229,168,59,0.45)] flex items-center gap-2.5 group cursor-pointer active:scale-95"
              >
                <span className="w-5 h-5 rounded-full bg-[#240e06] flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 text-[#e5a83b] fill-[#e5a83b] ml-0.5" />
                </span>
                <span>{t('liveDarshan.watchLive', 'Watch Live Darshan')}</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: Darshan Schedule */}
              <button
                onClick={handleScheduleClick}
                className="border border-white/40 hover:border-white bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl sm:rounded-2xl transition-all flex items-center gap-2 cursor-pointer active:scale-95 backdrop-blur-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-white/90 shrink-0" />
                <span>{t('liveDarshan.schedule', 'Darshan Schedule')}</span>
              </button>

            </div>

          </div>

          {/* ── Right Column: Live Stream Video Preview Card ── */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.55)] aspect-video w-full bg-black group">
              
              {!isPlaying ? (
                // ── Preview Mode: Temple Sunset Image with Live Badges & Play Button ──
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="w-full h-full relative cursor-pointer"
                >
                  <img
                    src={templeSunsetImg}
                    alt={isHi ? "श्री बैकुंठनाथ धाम मंदिर लाइव दर्शन" : "Shri Baikunthnath Dham Live Darshan"}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay for Text & Button Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/35 pointer-events-none" />

                  {/* Top-Left: Red ● LIVE Badge */}
                  <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md sm:rounded-lg bg-[#ef4444] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>LIVE</span>
                  </div>

                  {/* Center: Prominent Circular Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/45 backdrop-blur-md border-2 border-white/80 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-[#c28227]/90 group-hover:border-white transition-all duration-300">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white ml-1" />
                    </div>
                  </div>

                </div>
              ) : (
                // ── Active Mode: Autoplaying Live Stream Embed ──
                <div className="w-full h-full relative">
                  <iframe
                    src="https://www.youtube.com/embed/pXXBuOyYi6I?autoplay=1&rel=0"
                    title="Baikunthnath Dham Live Darshan"
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Close / Return to Preview Button */}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/75 hover:bg-black text-white transition-all shadow-md cursor-pointer hover:scale-105"
                    title="Close Video"
                    aria-label="Close Live Stream"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
