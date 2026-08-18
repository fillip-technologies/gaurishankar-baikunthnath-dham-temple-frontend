import React from 'react';
import { useTranslation } from 'react-i18next';
import { Landmark, Clock, Sparkles } from 'lucide-react';

export default function HistoryTimeline() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const timelines = [
    {
      icon: <Landmark className="w-6 h-6 text-[#c28227]" />,
      title: t('historyPage.timeline1Title', 'Ancient Vedic Roots'),
      subtitle: t('historyPage.timeline1Sub', 'Pre-16th Century'),
      desc: t('historyPage.timeline1Desc')
    },
    {
      icon: <Clock className="w-6 h-6 text-[#c28227]" />,
      title: t('historyPage.timeline2Title', 'Royal Construction & Revival'),
      subtitle: t('historyPage.timeline2Sub', '16th Century (Raja Man Singh Era)'),
      desc: t('historyPage.timeline2Desc')
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#c28227]" />,
      title: t('historyPage.timeline3Title', 'Modern Era & Trust Governance'),
      subtitle: t('historyPage.timeline3Sub', 'Present Day'),
      desc: t('historyPage.timeline3Desc')
    }
  ];

  return (
    <section className="w-full bg-stone-100 py-12 sm:py-16 text-stone-900 font-sans border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
            <span>✦</span>
            <span>{t('historyPage.subtitle', 'Centuries of Divine Legacy')}</span>
            <span>✦</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 ${
            currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
          }`}>
            {t('historyPage.timelineTitle', 'Key Eras in Temple History')}
          </h2>
          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
        </div>

        {/* 3 Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timelines.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                
                <span className="inline-block text-[11px] font-bold text-[#c28227] uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  {item.subtitle}
                </span>

                <h3 className="font-bold text-lg text-stone-900 font-hindi">
                  {item.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 mt-4 flex items-center gap-2 text-xs text-[#c28227] font-semibold">
                <span>❖</span>
                <span>Divine Heritage</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
