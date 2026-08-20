import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function ChantTickerBar() {
  const [isMuted, setIsMuted] = useState(true);

  const chantSegment = "॥ ॐ नमः शिवाय • श्री शिवाय नमस्तुभ्यम् • श्री गौरीशङ्कर-वैकुण्ठनाथौ विजयतेतराम् ॥ ❁ ";

  return (
    <div className="bg-gradient-to-r from-stone-950 via-[#1e1307] to-stone-950 text-amber-200 border-b border-amber-900/50 py-1.5 px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-3 sm:gap-4 overflow-hidden text-xs sm:text-sm font-hindi shadow-md relative z-30">
      
      {/* Continuous Seamless Animated Marquee Ticker */}
      <div className="flex-1 overflow-hidden relative flex items-center">
        <div className="animate-marquee-continuous font-medium tracking-wider text-[#ffd700] drop-shadow-md whitespace-nowrap">
          <span className="shrink-0 px-4">
            {chantSegment} {chantSegment}
          </span>
          <span className="shrink-0 px-4">
            {chantSegment} {chantSegment}
          </span>
        </div>
      </div>

      {/* Audio Mute/Unmute Toggle Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 rounded-full bg-[#c28227] hover:bg-[#a86e1e] text-white text-[11px] sm:text-xs font-semibold shadow-md transition-all border border-amber-400/40 cursor-pointer active:scale-95"
        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-3.5 h-3.5 text-amber-100" />
            <span className="font-sans">Sound Off</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="font-sans">Sound On</span>
          </>
        )}
      </button>
    </div>
  );
}
