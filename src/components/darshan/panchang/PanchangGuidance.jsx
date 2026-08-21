import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sparkles, HeartHandshake, Flame, BookOpen, ArrowRight } from 'lucide-react';
import { VARA_DETAILS } from './panchangUtils';

const DAY_RITUALS = {
  0: { // Sunday
    ritualEn: 'Surya Arghya at sunrise with copper vessel, offering red flowers, and Aditya Hridaya Stotram recitation.',
    ritualHi: 'तांबे के पात्र से सूर्य को अर्घ्य, लाल पुष्प अर्पण एवं आदित्य हृदय स्तोत्र का पाठ।',
    daanEn: 'Wheat, Jaggery, Ruby/Copper items, and Red cloth.',
    daanHi: 'गेहूं, गुड़, तांबे के पात्र एवं लाल वस्त्र का दान।',
    mantra: '॥ ॐ ह्रीं ह्रीं सूर्याय नमः ॥'
  },
  1: { // Monday
    ritualEn: 'Shivling Abhishek with raw milk, water, honey, Bilva leaves, and chanting Om Namah Shivaya 108 times.',
    ritualHi: 'कच्चे दूध, जल व बेलपत्र से शिवलिंग अभिषेक एवं "ॐ नमः शिवाय" महामंत्र का १०८ बार जप।',
    daanEn: 'White rice, Milk, Sugar, Silver, and White sweets.',
    daanHi: 'चावल, दूध, चीनी, चांदी व श्वेत मिष्ठान्न का दान।',
    mantra: '॥ ॐ नमः शिवाय • ॐ सोम सोमाय नमः ॥'
  },
  2: { // Tuesday
    ritualEn: 'Hanuman Chalisa recitation, offering Sindoor and Jasmine oil, and Sundarkand path for courage & protection.',
    ritualHi: 'हनुमान चालीसा व सुंदरकांड पाठ, श्री हनुमान जी को सिन्दूर व चमेली का तेल अर्पण।',
    daanEn: 'Red lentils (Masoor Dal), Jaggery, and Pomegranate.',
    daanHi: 'मसूर दाल, गुड़, अनार एवं लाल फल का दान।',
    mantra: '॥ ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥'
  },
  3: { // Wednesday
    ritualEn: 'Lord Ganesha worship with 21 Durva grass blades, offering Modak, and Vishnu Sahasranama path for intellect.',
    ritualHi: 'श्री गणेश जी को २१ दूर्वा व मोदक अर्पण एवं श्री विष्णु सहस्रनाम का पाठ।',
    daanEn: 'Green gram (Moong Dal), Green vegetables, and stationery/books.',
    daanHi: 'हरी मूंग दाल, हरी सब्जियां एवं विद्या दान/पुस्तकें।',
    mantra: '॥ ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः ॥'
  },
  4: { // Thursday
    ritualEn: 'Lord Vishnu & Brihaspati worship with yellow flowers, Chana dal, lighting pure cow ghee lamp, and Tulsi puja.',
    ritualHi: 'भगवान श्री हरि विष्णु जी की पीले पुष्पों, चना दाल व तुलसी दल से पूजा एवं शुद्ध गाय के घी का दीप।',
    daanEn: 'Yellow lentils (Chana Dal), Turmeric, Gram flour, and religious books.',
    daanHi: 'चना दाल, हल्दी, पीले वस्त्र व धार्मिक ग्रंथ का दान।',
    mantra: '॥ ॐ नमो भगवते वासुदेवाय • ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः ॥'
  },
  5: { // Friday
    ritualEn: 'Maha Lakshmi Aradhana, offering lotus / white flowers, reciting Sri Suktam for abundance and family peace.',
    ritualHi: 'माँ महालक्ष्मी की कमल पुष्प व खीर से आराधना एवं श्री सूक्त का सस्वर पाठ।',
    daanEn: 'Kheer, White clothes, Ghee, and perfume/fragrant flowers.',
    daanHi: 'खीर, श्वेत वस्त्र, घी एवं सुगंधित वस्तुओं का दान।',
    mantra: '॥ ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः ॥'
  },
  6: { // Saturday
    ritualEn: 'Shani Dev worship with mustard oil lamp under Peepal tree, Hanuman worship, and Maha Mrityunjaya Japa.',
    ritualHi: 'पीपल के वृक्ष के समीप सरसों के तेल का दीपक, शनि देव पूजन एवं महामृत्युंजय मंत्र जप।',
    daanEn: 'Black sesame (Til), Mustard oil, Black umbrella/footwear, and Iron items.',
    daanHi: 'काले तिल, सरसों का तेल, काला छाता व अन्न का दान।',
    mantra: '॥ ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥'
  }
};

export default function PanchangGuidance({ panchangData }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  if (!panchangData) return null;

  const vara = panchangData.vara != null ? panchangData.vara : 0;
  const varaObj = VARA_DETAILS[vara] || VARA_DETAILS[0];
  const ritualInfo = DAY_RITUALS[vara] || DAY_RITUALS[0];

  return (
    <section id="guidance-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight ${
          currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
        }`}>
          {currentLang === 'hi' ? 'आध्यात्मिक मार्गदर्शन एवं नित्य धर्म' : 'Spiritual Guidance & Daily Dharma'}
        </h2>
        <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
        <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          {t('panchangPage.guidanceDesc', 'Sacred deeds, mantras, and seva recommended at Shri Gaurishankar Baikunthnath Dham')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Presiding Deity & Ritual */}
        <div className="bg-white border border-stone-200/80 hover:border-[#c28227] rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#c28227] border border-amber-200 flex items-center justify-center mb-4 shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold text-[#c28227] uppercase tracking-wider block">
              {t('panchangPage.deityOfTheDay', 'Presiding Deity of the Day')}
            </span>
            <h3 className="text-xl font-bold text-stone-900 font-cinzel mt-1">
              {currentLang === 'hi' ? varaObj.deityHi : varaObj.deityEn}
            </h3>
          </div>

          <div className="bg-[#fefaf0] border border-stone-200/80 rounded-2xl p-4 space-y-1.5 text-xs text-stone-600">
            <span className="font-bold text-stone-900 block text-[13px]">
              {t('panchangPage.recommendedRitual', 'Recommended Ritual')}:
            </span>
            <p className="leading-relaxed font-medium">
              {currentLang === 'hi' ? ritualInfo.ritualHi : ritualInfo.ritualEn}
            </p>
          </div>
        </div>

        {/* 2. Auspicious Charity / Daan */}
        <div className="bg-white border border-stone-200/80 hover:border-[#c28227] rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#c28227] border border-amber-200 flex items-center justify-center mb-4 shadow-2xs">
              <HeartHandshake className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold text-[#c28227] uppercase tracking-wider block">
              {t('panchangPage.auspiciousDonation', 'Auspicious Daan (Charity)')}
            </span>
            <h3 className="text-xl font-bold text-stone-900 font-cinzel mt-1">
              {currentLang === 'hi' ? 'पुण्य फलदायी दान' : 'Virtuous Offerings'}
            </h3>
          </div>

          <div className="bg-[#fefaf0] border border-stone-200/80 rounded-2xl p-4 space-y-1.5 text-xs text-stone-600">
            <span className="font-bold text-stone-900 block text-[13px]">
              {currentLang === 'hi' ? 'आज दान करने योग्य वस्तुएं:' : 'Items to Donate Today:'}
            </span>
            <p className="leading-relaxed font-medium">
              {currentLang === 'hi' ? ritualInfo.daanHi : ritualInfo.daanEn}
            </p>
          </div>
        </div>

        {/* 3. Sacred Daily Chant & Temple Seva CTA */}
        <div className="bg-white border border-stone-200/80 hover:border-[#c28227] rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#c28227] border border-amber-200 flex items-center justify-center mb-4 shadow-2xs">
              <Flame className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold text-[#c28227] uppercase tracking-wider block">
              {t('panchangPage.dailyMantra', 'Sacred Daily Chant')}
            </span>
            <div className="mt-2 p-3.5 bg-[#fefaf0] border border-amber-300/80 rounded-2xl text-center shadow-inner">
              <p className="text-sm sm:text-base font-bold text-stone-900 font-hindi">
                {ritualInfo.mantra}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100">
            <Link
              to="/online-services/pooja-booking"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg cursor-pointer"
            >
              <span>Book Special Pooja at Temple</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
