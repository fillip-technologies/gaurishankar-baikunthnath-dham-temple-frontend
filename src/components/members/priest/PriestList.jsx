import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import priest1 from '../../../assets/home/herosection-3.png';
import priest2 from '../../../assets/home/herosection-2.png';
import priest3 from '../../../assets/home/upcoming-festival.png';
import priest4 from '../../../assets/home/herosection.png';

export default function PriestList() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const priests = [
    {
      id: 1,
      image: priest1,
      name: t('priestPage.priests.0.name', 'Acharya Pt. Rameshwar Jha Shastri'),
      title: t('priestPage.priests.0.title', 'Mukhya Pujari (Head Priest)')
    },
    {
      id: 2,
      image: priest2,
      name: t('priestPage.priests.1.name', 'Pt. Vidyanand Pandey Vedacharya'),
      title: t('priestPage.priests.1.title', 'Senior Vedic Scholar & Hawan Acharya')
    },
    {
      id: 3,
      image: priest3,
      name: t('priestPage.priests.2.name', 'Pt. Shivkumar Tripathi Jyotishacharya'),
      title: t('priestPage.priests.2.title', 'Katha Acharya & Ritual Priest')
    },
    {
      id: 4,
      image: priest4,
      name: t('priestPage.priests.3.name', 'Pt. Harivansh Mishra Shastri'),
      title: t('priestPage.priests.3.title', 'Aarti & Annakshetra Priest')
    }
  ];

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Background Watermark Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
            <Sparkles className="w-4 h-4 text-[#c28227]" />
            <span>॥ पावन वैदिक विद्वत परंपरा ॥</span>
            <Sparkles className="w-4 h-4 text-[#c28227]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight ${
            currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
          }`}>
            Vedic Acharyas & Mukhya Pujari Vrind
          </h2>

          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
        </div>

        {/* 3-Column Priests Grid (Single Row of 3 on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {priests.map((priest) => (
            <div 
              key={priest.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 hover:border-[#c28227] flex flex-col justify-between"
            >
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
                <img
                  src={priest.image}
                  alt={priest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              </div>

              {/* Priest Name Section */}
              <div className="p-5 text-center bg-white space-y-1">
                <h3 className={`text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#c28227] transition-colors leading-snug ${
                  currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
                }`}>
                  {priest.name}
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
