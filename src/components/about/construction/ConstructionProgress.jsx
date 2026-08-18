import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hammer, Users, Compass, BookOpen } from 'lucide-react';

export default function ConstructionProgress() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Hammer className="w-6 h-6 text-[#ffd700]" />,
      number: t('constructionPage.stat1Number', '100%'),
      title: t('constructionPage.stat1Title', 'Vedic Nagara Style'),
      label: t('constructionPage.stat1Label', 'Shilpa Shastra Compliant Design')
    },
    {
      icon: <Users className="w-6 h-6 text-[#ffd700]" />,
      number: t('constructionPage.stat2Number', '50,000+'),
      title: t('constructionPage.stat2Title', 'Devotees Capacity'),
      label: t('constructionPage.stat2Label', 'Spacious Parikrama & Assembly Halls')
    },
    {
      icon: <Compass className="w-6 h-6 text-[#ffd700]" />,
      number: t('constructionPage.stat3Number', 'Ongoing'),
      title: t('constructionPage.stat3Title', 'Ganga Ghat Expansion'),
      label: t('constructionPage.stat3Label', 'Promenade & Aarti Platform Development')
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[#ffd700]" />,
      number: t('constructionPage.stat4Number', 'Planned'),
      title: t('constructionPage.stat4Title', 'Annakshetra & Yagnashala'),
      label: t('constructionPage.stat4Label', 'Free Meal Hall & Sacred Vedic Fire Altar')
    }
  ];

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Burgundy Stats Card */}
        <div className="bg-[#38060d] rounded-[28px] p-6 sm:p-8 text-white border border-amber-500/20 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-200 font-hindi">
              {t('constructionPage.progressTitle', 'Project Progress & Key Milestones')}
            </h3>
            <div className="w-20 h-[1.5px] bg-amber-400/40 mx-auto" />
            <p className="text-xs sm:text-sm text-amber-100/80 font-light">
              Building for future generations of pilgrims with devotion, stone craftsmanship, and structural excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {stats.map((item, idx) => (
              <div 
                key={idx}
                className="bg-amber-950/60 border border-amber-500/30 p-5 rounded-2xl flex flex-col items-center text-center space-y-2 hover:bg-amber-950/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#ffd700] font-hindi">
                  {item.number}
                </span>
                <h4 className="font-bold text-sm text-white font-hindi">
                  {item.title}
                </h4>
                <p className="text-xs text-amber-100/80 leading-relaxed font-light">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
