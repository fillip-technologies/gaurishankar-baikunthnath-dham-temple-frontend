import React from 'react';
import { useTranslation } from 'react-i18next';
import { Landmark, Heart, Flame, Shield, Sun, Sparkles } from 'lucide-react';

export default function AboutUsTrustInfo() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Landmark className="w-6 h-6 text-[#c28227]" />,
      title: "Sacred Shrine Heritage",
      desc: "Deeply rooted in ancient Vedic tradition and recognized across Bihar as a divine tirtha for devotees."
    },
    {
      icon: <Flame className="w-6 h-6 text-[#c28227]" />,
      title: "Nitya Aarti & Seva",
      desc: "Daily 4 sacred Aartis (Pratah, Rajbhog, Sandhya, Shayan) performed strictly following Agama Shastra."
    },
    {
      icon: <Heart className="w-6 h-6 text-[#c28227]" />,
      title: "Annadanam & Public Seva",
      desc: "Distribution of holy Mahaprasadam and organized charitable initiatives for visiting pilgrims and local community."
    },
    {
      icon: <Shield className="w-6 h-6 text-[#c28227]" />,
      title: "Mandir Trust Management",
      desc: "Managed by Shri Baikunthnath Mandir Trust dedicated to transparent governance and temple preservation."
    }
  ];

  return (
    <section className="w-full bg-stone-100 py-12 sm:py-16 text-stone-900 font-sans border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
            <Sparkles className="w-4 h-4 text-[#c28227]" />
            <span>॥ श्री वैकुण्ठनाथ मंदिर ट्रस्ट ॥</span>
            <Sparkles className="w-4 h-4 text-[#c28227]" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 font-cinzel">
            Trust & Divine Legacy
          </h2>
          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Preserving sanctity, uplifting spiritual values, and ensuring a peaceful, blissful pilgrimage experience for every devotee.
          </p>
        </div>

        {/* Grid of 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-bold text-base text-stone-900 font-hindi">
                {item.title}
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
