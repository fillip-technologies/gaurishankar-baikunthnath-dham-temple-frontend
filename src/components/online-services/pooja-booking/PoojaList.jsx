import React from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneCall, AlertTriangle, CheckCircle2 } from 'lucide-react';

// The bookable pooja fee list now lives in the live "Book Online" section
// (PoojaBookingForm), which pulls the real catalogue from the API. This section
// keeps only the statutory child-marriage-prohibition notice, which is legal
// public information rather than a bookable item.
export default function PoojaList() {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* -------------------------------------------------------------
            STATUTORY GUIDELINES & CHILD MARRIAGE PROHIBITION CARD
           ------------------------------------------------------------- */}
        <div className="bg-gradient-to-br from-red-900 via-red-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 border border-red-500/30 shadow-2xl space-y-6 relative overflow-hidden">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-red-800/80 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-red-800 text-amber-300 px-3 py-1 rounded-full text-xs font-bold font-hindi uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>वैधानिक जन-सूचना</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-hindi">
                {t('poojaBookingPage.notice.title', 'श्री गौरी शंकर बैकुंठ धाम मंदिर में बाल विवाह पर प्रतिबंध')}
              </h3>
            </div>

            {/* Emergency Call Action Buttons */}
            <div className="flex flex-wrap gap-2 shrink-0">
              <a href="tel:1098" className="bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold px-3.5 py-1.5 rounded-lg text-xs font-sans transition-colors shadow flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>CHL=1098</span>
              </a>
              <a href="tel:181" className="bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold px-3.5 py-1.5 rounded-lg text-xs font-sans transition-colors shadow flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WHL=181</span>
              </a>
              <a href="tel:112" className="bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold px-3.5 py-1.5 rounded-lg text-xs font-sans transition-colors shadow flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>ERSS=112</span>
              </a>
            </div>
          </div>

          {/* Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-hindi leading-relaxed text-stone-200">
            <div className="bg-red-900/40 p-4 rounded-xl border border-red-700/50 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p>{t('poojaBookingPage.notice.rule1', 'बाल विवाह प्रतिबंध अधिनियम 2006 के तहत बाल विवाह दंडनीय अपराध है।')}</p>
            </div>

            <div className="bg-red-900/40 p-4 rounded-xl border border-red-700/50 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p>{t('poojaBookingPage.notice.rule2', '18 वर्ष से कम उम्र की लड़की और 21 वर्ष से कम उम्र के लड़के का विवाह गैरकानूनी है।')}</p>
            </div>

            <div className="bg-red-900/40 p-4 rounded-xl border border-red-700/50 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p>{t('poojaBookingPage.notice.rule3', 'बाल विवाह करने या सहायता करने वालों को 2 वर्ष की सजा एवं ₹ 1 लाख तक का जुर्माना हो सकता है।')}</p>
            </div>

            <div className="bg-red-900/40 p-4 rounded-xl border border-red-700/50 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p>{t('poojaBookingPage.notice.rule6', 'सूचना हेतु जिला बाल संरक्षण इकाई, स्थानीय थाना, ग्राम पंचायत सचिव एवं CDPO को भी सूचित कर सकते हैं।')}</p>
            </div>
          </div>

          <p className="text-center font-hindi text-xs text-amber-200/80 font-medium italic pt-2">
            {t('poojaBookingPage.notice.appeal', 'इस मंदिर में आने वाले श्रद्धालुओं से इस व्यवस्था में सहयोग की अपील है।')}
          </p>

        </div>
      </div>
    </section>
  );
}
