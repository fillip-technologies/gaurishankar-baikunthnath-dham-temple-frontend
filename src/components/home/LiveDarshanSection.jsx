import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LiveDarshanSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <section id="live-darshan-section" className="w-full bg-[#faf7f2] py-10 sm:py-16 text-stone-900 font-sans border-t border-stone-200/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title: Live Darshan */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight ${currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
            }`}>
            {t('liveDarshan.title')}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 w-32 mx-auto">
            <div className="h-[2px] bg-[#c28227]/40 flex-1 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-[#c28227]" />
            <div className="h-[2px] bg-[#c28227]/40 flex-1 rounded-full" />
          </div>
        </div>

        {/* Video iFrame Only */}
        <div className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 aspect-video bg-black">
          <iframe
            src="https://www.youtube.com/embed/pXXBuOyYi6I?si=lAWexJclo4opu__y"
            title="Baikunthnath Dham Live Darshan"
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/pXXBuOyYi6I?si=lAWexJclo4opu__y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

      </div>
    </section>
  );
}
