import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Clock, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export default function SpecialPoojaRituals() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const poojaList = [
    {
      id: 'rudrabhishek',
      name: currentLang === 'hi' ? 'श्री रुद्राभिषेक महापूजा' : 'Shri Rudrabhishek Mahapooja',
      category: currentLang === 'hi' ? 'भगवान शिव सेवा' : 'Lord Shiva Seva',
      duration: currentLang === 'hi' ? '90 मिनट' : '90 mins',
      idealDay: currentLang === 'hi' ? 'सोमवार, प्रदोष एवं महाशिवरात्रि' : 'Mondays, Pradosh & Shivratri',
      description: currentLang === 'hi'
        ? 'पवित्र गंगाजल, गाय के दूध, शहद, गन्ने के रस और पंचामृत सहित 11 पावन द्रव्यों से हरि-हर शिवलिंग का वैदिक रुद्राष्टाध्यायी मंत्रोच्चार के साथ महाभिषेक।'
        : 'Elaborate abhishek of the sacred Hari-Hara composite Shivling with 11 holy dravyas including Ganga jal, cow milk, honey, sugarcane juice, and panchamrit amidst Rudra Suktam chantings.',
      benefits: currentLang === 'hi'
        ? 'समस्त ग्रह दोषों का निवारण, सुख-समृद्धि, उत्तम स्वास्थ्य एवं आध्यात्मिक शांति की प्राप्ति।'
        : 'Removes negative planetary influences, brings peace, health, and spiritual upliftment.'
    },
    {
      id: 'ganga-aarti',
      name: currentLang === 'hi' ? 'गंगा महाआरती एवं दीपदान' : 'Ganga Maha Aarti & Deep Daan',
      category: currentLang === 'hi' ? 'मां गंगा सेवा' : 'Ganga Seva',
      duration: currentLang === 'hi' ? '60 मिनट' : '60 mins',
      idealDay: currentLang === 'hi' ? 'प्रतिदिन संध्या एवं पूर्णिमा' : 'Daily Evening & Purnima',
      description: currentLang === 'hi'
        ? 'बैकतपुर के नवनिर्मित गंगा घाट पर अपने परिवार के नाम से विशेष संकल्प लेकर 108 दीपों की महाआरती में सहभागिता एवं गंगा जी में दीपदान।'
        : 'Participate in personalized evening Ganga Aarti on the newly paved stone ghats with holy sankalp, 108-lamp deepotsav, and floating floral diyas.',
      benefits: currentLang === 'hi'
        ? 'पूर्वजों की सद्गति, आत्मिक शांति एवं परिवार में दिव्य प्रकाश व सकारात्मक ऊर्जा का संचार।'
        : 'Purifies karma, blesses the family with divine light, prosperity, and mental tranquility.'
    },
    {
      id: 'mahamrityunjaya',
      name: currentLang === 'hi' ? 'महामृत्युंजय अनुष्ठान एवं हवन' : 'Maha Mrityunjaya Anushthan',
      category: currentLang === 'hi' ? 'आरोग्य व सुरक्षा' : 'Health & Protection',
      duration: currentLang === 'hi' ? '120 मिनट' : '120 mins',
      idealDay: currentLang === 'hi' ? 'कोई भी शुभ दिन / जन्मदिवस' : 'Any auspicious day',
      description: currentLang === 'hi'
        ? 'दीर्घायु, उत्तम स्वास्थ्य एवं असाध्य व्याधियों से मुक्ति हेतु 1,100 महामृत्युंजय मंत्रों का विधिवत जाप एवं विशेष औषधीय समिधाओं से पवित्र हवन।'
        : 'Sacred recitation of 1,100 Maha Mrityunjaya mantras with special havan oblations for health, longevity, and liberation from chronic obstacles.',
      benefits: currentLang === 'hi'
        ? 'आरोग्य लाभ, नकारात्मक शक्तियों से सुरक्षा एवं दीर्घायु का वरदान।'
        : 'Bestows divine healing, vitality, and invincible spiritual protection.'
    },
    {
      id: 'satyanarayan',
      name: currentLang === 'hi' ? 'श्री सत्यनारायण व्रत कथा' : 'Shri Satyanarayan Vrat Katha',
      category: currentLang === 'hi' ? 'भगवान विष्णु सेवा' : 'Lord Vishnu Seva',
      duration: currentLang === 'hi' ? '75 मिनट' : '75 mins',
      idealDay: currentLang === 'hi' ? 'पूर्णिमा, एकादशी एवं गुरुवार' : 'Purnima, Ekadashi & Thursdays',
      description: currentLang === 'hi'
        ? 'श्री सत्यनारायण भगवान की पांचों अध्यायों की कथा का सस्वर पाठ, पंचामृत व पंजीरी महाप्रसाद अर्पण तथा श्री विष्णु सहस्रनाम अर्चना।'
        : 'Traditional Vedic recitation of the five chapters of Sri Satyanarayan Katha with panchamrit, banana prasad, panjiri, and Vishnu Sahasranama archana.',
      benefits: currentLang === 'hi'
        ? 'पारिवारिक सौहार्द, कार्य-व्यवसाय में उन्नति तथा मनोकामनाओं की पूर्णता।'
        : 'Brings familial harmony, financial abundance, and fulfillment of heartfelt wishes.'
    },
    {
      id: 'navagraha',
      name: currentLang === 'hi' ? 'नवग्रह शांति एवं वैदिक हवन' : 'Navagraha Shanti & Havan',
      category: currentLang === 'hi' ? 'ग्रह शांति' : 'Astrological Peace',
      duration: currentLang === 'hi' ? '100 मिनट' : '100 mins',
      idealDay: currentLang === 'hi' ? 'शनिवार / ग्रह गोचर काल' : 'Saturdays / Planetary transit days',
      description: currentLang === 'hi'
        ? 'कुंडली के प्रतिकूल ग्रहों की शांति हेतु नवग्रह समिधा, घृत एवं विशेष वैदिक मंत्रों द्वारा पावन यज्ञवेदी में हवन।'
        : 'Sacred Vedic fire ritual appeasing the nine cosmic deities (Navagrahas) with specific samagri, ghee oblations, and planetary stotras.',
      benefits: currentLang === 'hi'
        ? 'ग्रह बाधा निवारण, मानसिक एकाग्रता एवं कार्यों में आने वाली रुकावटों का अंत।'
        : 'Neutralizes planetary doshas, brings professional success, and clears obstacles.'
    },
    {
      id: 'hari-hara-archana',
      name: currentLang === 'hi' ? 'हरि-हर सहस्रनाम महाअर्चना' : 'Hari-Hara Sahasranama Archana',
      category: currentLang === 'hi' ? 'विशेष स्वरूप अर्चना' : 'Special Deity Archana',
      duration: currentLang === 'hi' ? '45 मिनट' : '45 mins',
      idealDay: currentLang === 'hi' ? 'प्रतिदिन प्रातः एवं पर्व' : 'Daily morning & festivals',
      description: currentLang === 'hi'
        ? 'भगवान शिव और भगवान विष्णु के 1,008 पावन नामों का पाठ करते हुए 108 बेलपत्र और 108 तुलसी दलों द्वारा विशेष संयुक्त अर्चन।'
        : 'Continuous chanting of 1,008 divine names of Lord Shiva and Lord Vishnu offered with sacred bilva leaves, fresh tulsi, and chandan.',
      benefits: currentLang === 'hi'
        ? 'हरि (विष्णु) और हर (शिव) दोनों का एक साथ अनंत आशीर्वाद प्राप्त होता है।'
        : 'Unifies the blessings of both Hari (Vishnu) and Hara (Shiva) for holistic wellbeing.'
    }
  ];

  return (
    <section className="w-full bg-[#f5eee6] py-14 sm:py-20 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[#c28227] text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4" />
            <span>{currentLang === 'hi' ? 'वैदिक अनुष्ठान' : 'Vedic Rituals'}</span>
            <Flame className="w-4 h-4" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t('poojaAartiPage.poojaSection.title', 'Sacred Vedic Poojas & Anushthan')}
          </h2>

          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2.5" />

          <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed">
            {t('poojaAartiPage.poojaSection.subtitle', 'Book personalized Vedic Poojas performed by learned temple priests according to your Gotra and Sankalp')}
          </p>
        </div>

        {/* Poojas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poojaList.map((pooja) => (
            <div
              key={pooja.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Category & Duration Badge */}
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="bg-amber-100 text-[#c28227] px-3 py-1 rounded-full border border-amber-300/80">
                    {pooja.category}
                  </span>

                  <span className="text-stone-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{pooja.duration}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#c28227] transition-colors leading-snug">
                  {pooja.name}
                </h3>

                {/* Ideal Day */}
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium bg-amber-50 px-2.5 py-1 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-[#c28227]" />
                  <span><strong>{currentLang === 'hi' ? 'शुभ समय:' : 'Auspicious:'}</strong> {pooja.idealDay}</span>
                </div>

                {/* Description */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {pooja.description}
                </p>

                {/* Benefits Pill */}
                <div className="pt-2 border-t border-stone-100">
                  <p className="text-xs text-stone-700 leading-relaxed">
                    <span className="font-bold text-[#c28227]">{currentLang === 'hi' ? '✦ फल/लाभ: ' : '✦ Benefits: '}</span>
                    {pooja.benefits}
                  </p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-stone-100">
                <Link
                  to="/online-services/pooja-booking"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg cursor-pointer"
                >
                  <span>{t('poojaAartiPage.poojaSection.bookButton', 'Book This Pooja')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
