import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  ShieldAlert, 
  PhoneCall, 
  ScrollText, 
  Car, 
  Heart, 
  Flame, 
  AlertTriangle,
  Award,
  CheckCircle2,
  Bike,
  Truck,
  Building2
} from 'lucide-react';

export default function PoojaList() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: currentLang === 'hi' ? 'सभी दर सूची' : 'All Fee Schedules', icon: ScrollText },
    { id: 'poojaSanskar', label: t('poojaBookingPage.categories.poojaSanskar', 'पूजा / संस्कार'), icon: Flame },
    { id: 'vehiclePooja', label: t('poojaBookingPage.categories.vehiclePooja', 'वाहन पूजा'), icon: Car },
    { id: 'marriage', label: t('poojaBookingPage.categories.marriage', 'शादी - विवाह'), icon: Heart },
    { id: 'notice', label: currentLang === 'hi' ? 'वैधानिक नियम' : 'Statutory Guidelines', icon: ShieldAlert },
  ];

  const poojaSanskarItems = [
    {
      id: 'rudrabhishek',
      name: t('poojaBookingPage.poojaSanskarItems.0.name', 'रुद्राभिषेक'),
      description: t('poojaBookingPage.poojaSanskarItems.0.description', 'पावन हरि-हर शिव लिंग पर जलाभिषेक व वेदमंत्रों के साथ विशेष पूजन'),
      amount: t('poojaBookingPage.poojaSanskarItems.0.amount', '500 / रुपया।'),
      tag: 'Most Sacred'
    },
    {
      id: 'mundan',
      name: t('poojaBookingPage.poojaSanskarItems.1.name', 'मुंडन'),
      description: t('poojaBookingPage.poojaSanskarItems.1.description', 'बच्चों का प्रथम मुंडन संस्कार अनुष्ठान (प्रति बच्चा)'),
      amount: t('poojaBookingPage.poojaSanskarItems.1.amount', '75 / रुपया (प्रति बच्चा)'),
      tag: 'Child Sanskar'
    },
    {
      id: 'satyanarayan',
      name: t('poojaBookingPage.poojaSanskarItems.2.name', 'सत्य नारायण कथा'),
      description: t('poojaBookingPage.poojaSanskarItems.2.description', 'पारंपरिक श्री सत्यनारायण स्वामी व्रत कथा पाठ व प्रसाद वितरण'),
      amount: t('poojaBookingPage.poojaSanskarItems.2.amount', '250 रुपया'),
      tag: 'Family Prosperity'
    },
    {
      id: 'janeu',
      name: t('poojaBookingPage.poojaSanskarItems.3.name', 'जनेऊ'),
      description: t('poojaBookingPage.poojaSanskarItems.3.description', 'पवित्र यज्ञोपवीत धारण (जनेऊ) संस्कार अनुष्ठान'),
      amount: t('poojaBookingPage.poojaSanskarItems.3.amount', '500 / रुपया।'),
      tag: 'Upanayana'
    }
  ];

  const vehiclePoojaItems = [
    {
      id: 'twoWheeler',
      name: t('poojaBookingPage.vehiclePoojaItems.0.name', 'दो चक्का वाहन'),
      description: t('poojaBookingPage.vehiclePoojaItems.0.description', 'साइकिल, मोटरसाइकिल, स्कूटर वाहन पूजन व रक्षा सूत्र'),
      amount: t('poojaBookingPage.vehiclePoojaItems.0.amount', '100 / रुपया'),
      icon: Bike
    },
    {
      id: 'threeWheeler',
      name: t('poojaBookingPage.vehiclePoojaItems.1.name', 'तीन चक्का वाहन'),
      description: t('poojaBookingPage.vehiclePoojaItems.1.description', 'ऑटो रिक्शा, ई-रिक्शा वाहन पूजन'),
      amount: t('poojaBookingPage.vehiclePoojaItems.1.amount', '200 / रुपया'),
      icon: Car
    },
    {
      id: 'fourWheeler',
      name: t('poojaBookingPage.vehiclePoojaItems.2.name', 'चार चक्का वाहन'),
      description: t('poojaBookingPage.vehiclePoojaItems.2.description', 'कार, जीप, एसयूवी, वैन वाहन पूजन'),
      amount: t('poojaBookingPage.vehiclePoojaItems.2.amount', '250 / रुपया'),
      icon: Car
    },
    {
      id: 'sixWheeler',
      name: t('poojaBookingPage.vehiclePoojaItems.3.name', 'छः चक्का वाहन'),
      description: t('poojaBookingPage.vehiclePoojaItems.3.description', 'ट्रक, बस व भारी कामर्शियल वाहन पूजन'),
      amount: t('poojaBookingPage.vehiclePoojaItems.3.amount', '300 / रुपया'),
      icon: Truck
    }
  ];

  const marriageItems = [
    {
      id: 'brideSide',
      name: t('poojaBookingPage.marriageItems.0.name', 'लड़की पक्ष'),
      description: t('poojaBookingPage.marriageItems.0.description', 'मंदिर परिसर में विवाह हेतु कन्या पक्ष पंजीयन शुल्क'),
      amount: t('poojaBookingPage.marriageItems.0.amount', '300 / रुपया'),
      tag: 'Bride Family'
    },
    {
      id: 'groomSide',
      name: t('poojaBookingPage.marriageItems.1.name', 'लड़का पक्ष'),
      description: t('poojaBookingPage.marriageItems.1.description', 'मंदिर परिसर में विवाह हेतु वर पक्ष पंजीयन शुल्क'),
      amount: t('poojaBookingPage.marriageItems.1.amount', '500 / रुपया।'),
      tag: 'Groom Family'
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
        
        {/* Sleek Top Banner Card */}
        <div className="bg-gradient-to-r from-[#2a080d] via-[#38060d] to-[#2a080d] text-white rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl relative overflow-hidden text-center space-y-3">
          
          <div className="absolute inset-0 bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          <div className="inline-flex items-center gap-2 bg-[#c28227]/30 border border-[#c28227] px-4 py-1.5 rounded-full text-[#ffd700] text-xs font-bold font-hindi tracking-widest">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{t('poojaBookingPage.trustHeader', 'श्री गौरी शंकर बैकुंठ नाथ धाम न्यास समिति')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffd700] font-hindi tracking-wide leading-tight drop-shadow-md">
            {t('poojaBookingPage.rateCardTitle', 'पूजन शुल्क तालिका')}
          </h2>

          <p className="text-amber-100 text-xs sm:text-sm font-hindi max-w-xl mx-auto opacity-90">
            {t('poojaBookingPage.trustLocation', 'खुसरूपुर पटना')} • {t('poojaBookingPage.subtitle', 'आधिकारिक पूजन, संस्कार एवं वाहन पूजन शुल्क')}
          </p>

        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  activeTab === cat.id
                    ? 'bg-[#c28227] text-white shadow-lg scale-105 border-2 border-amber-300'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300 shadow-sm'
                }`}
              >
                <IconComp className={`w-4 h-4 ${activeTab === cat.id ? 'text-amber-200' : 'text-[#c28227]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* -------------------------------------------------------------
            CATEGORY 1: POOJA & SANSKAR (पूजा / संस्कार)
           ------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'poojaSanskar') && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-[#c28227]/30 pb-3">
              <div className="p-2 rounded-xl bg-[#c28227] text-white">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-hindi">
                  {t('poojaBookingPage.categories.poojaSanskar', 'पूजा / संस्कार')}
                </h3>
                <p className="text-xs text-stone-500">Sacred Vedic Rituals & Sanskar Fees</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {poojaSanskarItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#c28227] transition-colors font-hindi">
                        {item.name}
                      </h4>
                      <span className="bg-amber-100 text-[#c28227] text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300 font-hindi shrink-0">
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 font-hindi leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Seva Fee:
                    </span>
                    <span className="text-xl font-extrabold text-[#c28227] font-sans bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200">
                      {item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            CATEGORY 2: VEHICLE POOJA (वाहन पूजा)
           ------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'vehiclePooja') && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-3 border-b-2 border-[#c28227]/30 pb-3">
              <div className="p-2 rounded-xl bg-[#38060d] text-[#ffd700]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-hindi">
                  {t('poojaBookingPage.categories.vehiclePooja', 'वाहन पूजा')}
                </h3>
                <p className="text-xs text-stone-500">Vehicle Blessing & Security Ritual Fees</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {vehiclePoojaItems.map((item) => {
                const VehicleIcon = item.icon;
                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#c28227] flex items-center justify-center border border-amber-200 group-hover:bg-[#c28227] group-hover:text-white transition-colors">
                        <VehicleIcon className="w-6 h-6" />
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#c28227] transition-colors font-hindi">
                        {item.name}
                      </h4>

                      <p className="text-xs text-stone-600 font-hindi leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-stone-400 uppercase">
                        Fee:
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-[#c28227] font-sans bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                        {item.amount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            CATEGORY 3: MARRIAGE / WEDDING (शादी - विवाह)
           ------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'marriage') && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-3 border-b-2 border-[#c28227]/30 pb-3">
              <div className="p-2 rounded-xl bg-[#c28227] text-white">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-hindi">
                  {t('poojaBookingPage.categories.marriage', 'शादी - विवाह')}
                </h3>
                <p className="text-xs text-stone-500">Temple Marriage & Ceremony Registration Fees</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {marriageItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#c28227] transition-colors font-hindi">
                        {item.name}
                      </h4>
                      <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-200 font-hindi shrink-0">
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 font-hindi leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-xs font-semibold text-stone-500 uppercase">
                      Registration Fee:
                    </span>
                    <span className="text-xl font-extrabold text-[#c28227] font-sans bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200">
                      {item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* -------------------------------------------------------------
            STATUTORY GUIDELINES & CHILD MARRIAGE PROHIBITION CARD
           ------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'notice') && (
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
        )}

      </div>
    </section>
  );
}
