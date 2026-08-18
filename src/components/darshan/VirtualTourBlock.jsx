import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Compass, RotateCw, Maximize2, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import tourGarbha from '../../assets/home/herosection-3.png';
import tourGanga from '../../assets/home/herosection-2.png';
import tourCampus from '../../assets/home/herosection.png';

export default function VirtualTourBlock() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [activeSpotIndex, setActiveSpotIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const spots = [
    {
      id: 'garbhaGriha',
      name: t('darshanPage.tourSpots.garbhaGriha', 'Main Garbha Griha (Sanctum)'),
      image: tourGarbha,
      desc: 'Inner sanctum holding the sacred Hari-Hara composite Shivling worshipped with nitya aarti.'
    },
    {
      id: 'gangaGhat',
      name: t('darshanPage.tourSpots.gangaGhat', 'Holy Ganga Ghat Promenade'),
      image: tourGanga,
      desc: 'Sprawling paved Ganga ghat steps for mass evening Ganga Aarti and holy dips.'
    },
    {
      id: 'campus',
      name: t('darshanPage.tourSpots.campus', 'Temple Courtyard & Campus'),
      image: tourCampus,
      desc: 'Paved stone courtyard, ancient banyan tree, and serene parikrama walkway.'
    }
  ];

  const currentSpot = spots[activeSpotIndex];

  return (
    <section id="virtual-tour-block" className="w-full bg-stone-100 py-12 sm:py-16 text-stone-900 font-sans border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
            <Compass className="w-4 h-4 text-[#c28227]" />
            <span>॥ आभासी मन्दिर परिक्रमा • ३६०° टूर ॥</span>
            <Compass className="w-4 h-4 text-[#c28227]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight ${
            currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
          }`}>
            {t('darshanPage.virtualTitle', '360° Virtual Sanctum Tour')}
          </h2>

          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {t('darshanPage.virtualSubtitle', 'Explore the Sacred Shrine, Ganga Ghat, and Temple Campus Interactively')}
          </p>
        </div>

        {/* Spot Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {spots.map((spot, idx) => (
            <button
              key={spot.id}
              onClick={() => setActiveSpotIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeSpotIndex === idx
                  ? 'bg-[#c28227] text-white shadow-md scale-105'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{spot.name}</span>
            </button>
          ))}
        </div>

        {/* 360° Interactive Tour View Container */}
        <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c28227]/40 relative group">
          
          {/* Main Panorama Image */}
          <div className="relative h-[360px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden">
            <img 
              src={currentSpot.image} 
              alt={currentSpot.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-90" 
            />

            {/* Top Toolbar Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/30 text-white text-xs font-semibold flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>360° Interactive View</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className="bg-black/60 backdrop-blur-md p-2.5 rounded-full border border-amber-500/30 text-amber-300 hover:text-white transition-colors cursor-pointer"
                  title="Toggle Sacred Mantra Audio"
                >
                  {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                </button>
              </div>
            </div>

            {/* Center Interactive Rotation Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/50 backdrop-blur-md px-5 py-3 rounded-full border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-hindi flex items-center gap-2 shadow-2xl animate-pulse">
                <RotateCw className="w-4 h-4 text-amber-400" />
                <span>खींचें या स्पर्श करके ३६०° देखें</span>
              </div>
            </div>

            {/* Bottom Caption Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 sm:p-6 rounded-2xl border border-amber-500/20 text-white z-20 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-hindi">
                <ShieldCheck className="w-4 h-4" />
                <span>{currentSpot.name}</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-light">
                {currentSpot.desc}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
