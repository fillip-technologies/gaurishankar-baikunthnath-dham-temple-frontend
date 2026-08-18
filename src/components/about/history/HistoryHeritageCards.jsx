import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flame, Compass, ShieldCheck, Heart } from 'lucide-react';

export default function HistoryHeritageCards() {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: <Flame className="w-6 h-6 text-[#ffd700]" />,
      title: "Hari-Hara Consecration",
      desc: "Unique combined deity of Lord Shiva & Lord Vishnu worshipped in a single sanctum since ancient times."
    },
    {
      icon: <Compass className="w-6 h-6 text-[#ffd700]" />,
      title: "Sacred Ganga Ghat Shrine",
      desc: "Located directly on the holy banks of Mother Ganga at Baikathpur, attracting pilgrims for holy dip and tarpan."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#ffd700]" />,
      title: "Raja Man Singh Heritage",
      desc: "Historical stone architecture built during the Mughal era under the patronage of Raja Man Singh."
    },
    {
      icon: <Heart className="w-6 h-6 text-[#ffd700]" />,
      title: "Unbroken Seva Traditions",
      desc: "Centuries of continuous daily 4-time Aarti, Vedic chanting, and bhandara prasad distribution."
    }
  ];

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Burgundy Banner Card */}
        <div className="bg-[#38060d] rounded-[28px] p-6 sm:p-8 text-white border border-amber-500/20 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-200 font-hindi">
              Sacred Pillars of Baikunthnath Heritage
            </h3>
            <div className="w-20 h-[1.5px] bg-amber-400/40 mx-auto" />
            <p className="text-xs sm:text-sm text-amber-100/80 font-light">
              Centuries of spiritual devotion, architectural excellence, and uninterrupted Vedic seva traditions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {highlights.map((item, idx) => (
              <div 
                key={idx}
                className="bg-amber-950/60 border border-amber-500/30 p-5 rounded-2xl flex flex-col items-center text-center space-y-2.5 hover:bg-amber-950/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm text-[#ffd700] font-hindi">
                  {item.title}
                </h4>
                <p className="text-xs text-amber-100/80 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
