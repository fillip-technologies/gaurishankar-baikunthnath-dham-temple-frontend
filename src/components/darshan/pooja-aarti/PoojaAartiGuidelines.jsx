import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Heart,
  Info
} from 'lucide-react';

export default function PoojaAartiGuidelines() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const guidelineSections = [
    {
      title: currentLang === 'hi' ? 'हरि-हर पूजन हेतु पावन सामग्री' : 'Sacred Offerings for Hari-Hara',
      icon: Sparkles,
      color: 'bg-amber-500/10 text-amber-700 border-amber-300',
      items: currentLang === 'hi' ? [
        'भगवान शिव हेतु ताजे बेलपत्र, धतूरा, श्वेत मंदार एवं भस्म',
        'भगवान विष्णु हेतु सुगंधित तुलसी दल, पीले पुष्प एवं पीतांबर',
        'शुद्ध गंगाजल, गोदुग्ध, मधु (शहद) एवं पंचामृत',
        'केसरिया चंदन, इत्र एवं शुद्ध भीमसेनी कपूर'
      ] : [
        'Fresh Bilva (Belpatra) leaves & Dhatura for Lord Shiva',
        'Fragrant Tulsi leaves & yellow flowers for Lord Vishnu',
        'Pure Ganga jal, cow milk, and organic honey',
        'Chandan (Sandalwood paste), Itra, and pure Camphor'
      ]
    },
    {
      title: currentLang === 'hi' ? 'दर्शन व पूजा समय सारणी' : 'Pooja Timings & Protocol',
      icon: Clock,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
      items: currentLang === 'hi' ? [
        'प्रातः कालीन गर्भगृह दर्शन: 05:00 AM – 12:30 PM',
        'संध्या कालीन गर्भगृह दर्शन: 04:00 PM – 09:00 PM',
        'विशेष अभिषेक में भाग लेने वाले भक्त निर्धारित समय से 15 मिनट पूर्व पहुंचें',
        'रुद्राभिषेक एवं हवन हेतु पूर्व ऑनलाइन बुकिंग की अनुशंसा की जाती है'
      ] : [
        'Morning Sanctum Darshan: 05:00 AM – 12:30 PM',
        'Evening Sanctum Darshan: 04:00 PM – 09:00 PM',
        'Devotees attending special Abhishek should arrive 15 minutes before scheduled time',
        'Prior online booking is recommended for Rudrabhishek & Havan'
      ]
    },
    {
      title: currentLang === 'hi' ? 'वेशभूषा एवं मंदिर मर्यादा' : 'Dress Code & Sanctity',
      icon: ShieldCheck,
      color: 'bg-blue-500/10 text-blue-700 border-blue-300',
      items: currentLang === 'hi' ? [
        'पारंपरिक परिधान (पुरुषों हेतु धोती/कुर्ता-पायजामा, महिलाओं हेतु साड़ी/सूट)',
        'गर्भगृह में प्रवेश करने वाले श्रद्धालु स्नान के पश्चात शुद्ध वस्त्र धारण करें',
        'आरती एवं मंत्रोच्चार के समय गर्भगृह में मोबाइल फोन शांत (साइलेंट) रखें',
        'चलती आरती के दौरान गर्भगृह के आंतरिक भाग की फोटोग्राफी वर्जित है'
      ] : [
        'Traditional Indian attire (Dhoti/Kurta or Pyjama for men; Saree/Salwar for women)',
        'Devotees entering the inner sanctum must observe ceremonial snan purity',
        'Mobile phones must be switched to silent mode inside the sanctum mandap',
        'Photography of the inner sanctum during ongoing Aarti is prohibited'
      ]
    }
  ];

  return (
    <section className="w-full bg-[#fdfbf7] py-14 sm:py-20 text-stone-900 font-sans relative overflow-hidden border-t border-stone-200">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[#c28227] text-xs font-bold uppercase tracking-wider mb-2">
            <Info className="w-4 h-4" />
            <span>{currentLang === 'hi' ? 'तीर्थयात्री दिशानिर्देश' : 'Pilgrim Guidelines'}</span>
            <Info className="w-4 h-4" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t('poojaAartiPage.guidelines.title', 'Temple Offerings & Devotee Guidelines')}
          </h2>

          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2.5" />

          <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed">
            {t('poojaAartiPage.guidelines.subtitle', 'Important guidance to ensure a spiritually enriching pilgrimage')}
          </p>
        </div>

        {/* 3 Guideline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guidelineSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${sec.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {sec.title}
                  </h3>
                </div>

                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-stone-600">
                  {sec.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#c28227] font-bold shrink-0 mt-0.5">❖</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
