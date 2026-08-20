import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Sunrise, 
  Sun, 
  Flame, 
  Sunset, 
  Moon, 
  Clock, 
  Video, 
  Sparkles, 
  Bell, 
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

import heroAartiBg from '../../../assets/home/upcoming-festival.png';
import heroGangaBg from '../../../assets/home/herosection-2.png';
import heroShringarBg from '../../../assets/home/herosection-3.png';
import heroMandirBg from '../../../assets/home/herosection.png';

export default function DailyAartiTimings() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [activeAartiIndex, setActiveAartiIndex] = useState(0);

  const aartis = [
    {
      id: 'mangala',
      step: '01',
      name: currentLang === 'hi' ? 'मंगला आरती' : 'Mangala Aarti',
      time: '05:30 AM',
      period: currentLang === 'hi' ? 'ब्रह्म मुहूर्त' : 'Brahma Muhurta',
      icon: Sunrise,
      image: heroAartiBg,
      color: 'from-amber-600 to-orange-700',
      tag: currentLang === 'hi' ? 'प्रथम प्रातः आरती' : 'First Morning Aarti',
      description: currentLang === 'hi'
        ? 'प्रातः काल भगवान का पावन जागरण एवं अभिषेक। शंखनाद के साथ गर्भगृह के कपाट खुलते हैं और प्रथम मंगल दीप प्रज्वलित किया जाता है।'
        : 'The auspicious morning awakening ritual. The sanctum doors open with conch shell blowing, followed by holy snan and mangala deepam.',
      rituals: [
        { label: currentLang === 'hi' ? 'मुख्य अनुष्ठान' : 'Main Ritual', val: currentLang === 'hi' ? 'शंखनाद व पावन गंगाजल अभिषेक' : 'Conch blowing & Holy Ganga snan' },
        { label: currentLang === 'hi' ? 'दीप अर्पण' : 'Lamp Offering', val: currentLang === 'hi' ? 'पंचमुखी मंगल दीप प्रज्वलन' : '5-Wick Mangala Deepam' },
        { label: currentLang === 'hi' ? 'स्तोत्र पाठ' : 'Stotra Chant', val: currentLang === 'hi' ? 'प्रातः शिव-विष्णु स्तुति' : 'Morning Vedic Stutis' }
      ]
    },
    {
      id: 'shringar',
      step: '02',
      name: currentLang === 'hi' ? 'शृंगार आरती' : 'Shringar Aarti',
      time: '08:30 AM',
      period: currentLang === 'hi' ? 'पूर्वाह्न काल' : 'Morning Adornment',
      icon: Sun,
      image: heroShringarBg,
      color: 'from-yellow-500 to-amber-600',
      tag: currentLang === 'hi' ? 'दिव्य पुष्प अलंकार' : 'Sacred Floral Shringar',
      description: currentLang === 'hi'
        ? 'भगवान हरि-हर का सुगंधित कमल पुष्पों, १०८ बेलपत्र, मलयागिरि चंदन लेप, नवीन पीतांबर एवं स्वर्ण आभूषणों से अलौकिक शृंगार।'
        : 'Sacred ornamentation ceremony. The deity is adorned with fresh fragrant lotus, 108 Bilva leaves, Chandan tilak, and golden silks.',
      rituals: [
        { label: currentLang === 'hi' ? 'पुष्प अर्पण' : 'Flowers', val: currentLang === 'hi' ? 'ताजे कमल, गेंदा व श्वेत मंदार' : 'Fresh Lotus, Marigold & Jasmine' },
        { label: currentLang === 'hi' ? 'चंदन लेप' : 'Chandan', val: currentLang === 'hi' ? 'मलयागिरि केसरिया चंदन' : 'Malayagiri Saffron Chandan' },
        { label: currentLang === 'hi' ? 'नैवेद्य' : 'Offering', val: currentLang === 'hi' ? 'प्रातःकालीन बाल भोग' : 'Morning Sweet Bhog' }
      ]
    },
    {
      id: 'bhog',
      step: '03',
      name: currentLang === 'hi' ? 'मध्याह्न राजभोग आरती' : 'Madhyahna Rajbhog Aarti',
      time: '12:00 PM',
      period: currentLang === 'hi' ? 'मध्याह्न काल' : 'Afternoon Bhog',
      icon: Flame,
      image: heroMandirBg,
      color: 'from-orange-600 to-red-700',
      tag: currentLang === 'hi' ? '56 भोग महाप्रसाद' : 'Royal 56 Bhog',
      description: currentLang === 'hi'
        ? 'मंदिर के पवित्र अन्नक्षेत्र में गंगाजल से निर्मित शुद्ध सात्विक राजभोग का नैवेद्य अर्पण एवं मध्याह्न आरती। तत्पश्चात दोपहर विश्राम।'
        : 'Royal noon offering of pure sattvic Mahaprasad prepared in the temple kitchen with holy Ganga jal, followed by Madhyahna Aarti and sanctum rest.',
      rituals: [
        { label: currentLang === 'hi' ? 'राजभोग' : 'Mahaprasad', val: currentLang === 'hi' ? 'गंगाजल निर्मित सात्विक मिष्ठान्न व अन्न' : 'Sattvic Mahaprasad with Ganga jal' },
        { label: currentLang === 'hi' ? 'आरती दीप' : 'Aarti Lamp', val: currentLang === 'hi' ? 'पंच आरती एवं कपूर दीप' : 'Camphor Aarti & 5-Wick Lamp' },
        { label: currentLang === 'hi' ? 'कपाट' : 'Doors', val: currentLang === 'hi' ? 'दोपहर विश्राम (12:30 - 04:00 PM)' : 'Midday Rest (12:30 - 04:00 PM)' }
      ]
    },
    {
      id: 'sandhya',
      step: '04',
      name: currentLang === 'hi' ? 'संध्या महाआरती (गंगा घाट)' : 'Sandhya Maha Aarti (Ganga Deck)',
      time: '06:30 PM',
      period: currentLang === 'hi' ? 'संध्या काल' : 'Evening Ganga Ghat',
      icon: Sunset,
      image: heroGangaBg,
      color: 'from-amber-700 to-rose-900',
      isGrand: true,
      tag: currentLang === 'hi' ? '★ 108 दीप महाआरती' : '★ 108 Deepam Maha Aarti',
      description: currentLang === 'hi'
        ? 'गंगा तट पर 108 दीपों से संपन्न होने वाली भव्य महाआरती। डमरू, घड़ियाल और शंख ध्वनि के साथ अलौकिक दीपोत्सव का आयोजन।'
        : 'The grandeur evening Maha Aarti with 108 sacred lamps on the Ganga Ghat promenade accompanied by traditional bells, drums, and Vedic hymns.',
      rituals: [
        { label: currentLang === 'hi' ? 'दीपोत्सव' : 'Deepotsav', val: currentLang === 'hi' ? '108 दीप महाआरती व गंगा दीपदान' : '108 Sacred Lamps & Ganga Deep Daan' },
        { label: currentLang === 'hi' ? 'वाद्य ध्वनि' : 'Instruments', val: currentLang === 'hi' ? 'डमरू, घड़ियाल, झांझ व शंख' : 'Damru, Brass Bells & Conch' },
        { label: currentLang === 'hi' ? 'स्थान' : 'Venue', val: currentLang === 'hi' ? 'गंगा तट प्रांगण व मुख्य गर्भगृह' : 'Ganga Deck Promenade & Sanctum' }
      ]
    },
    {
      id: 'shayan',
      step: '05',
      name: currentLang === 'hi' ? 'शयन आरती' : 'Shayan Aarti',
      time: '08:45 PM',
      period: currentLang === 'hi' ? 'रात्रि काल' : 'Night Rest',
      icon: Moon,
      image: heroMandirBg,
      color: 'from-indigo-900 to-slate-950',
      tag: currentLang === 'hi' ? 'अंतिम दर्शन व शयन' : 'Final Darshan of the Day',
      description: currentLang === 'hi'
        ? 'दिव्य शयन आरती एवं लोरी स्तोत्र पाठ। भगवान के शयन के उपरांत रात्रि 09:00 बजे मंदिर के मुख्य कपाट विश्राम हेतु बंद होते हैं।'
        : 'The concluding night aarti with soothing lullaby stotras. The sanctum is prepared for night rest and temple gates close at 09:00 PM.',
      rituals: [
        { label: currentLang === 'hi' ? 'चामर सेवा' : 'Chamara Seva', val: currentLang === 'hi' ? 'भगवान को दिव्य चामर अर्पण' : 'Sacred Chamara waving' },
        { label: currentLang === 'hi' ? 'शयन स्तोत्र' : 'Lullaby Stuti', val: currentLang === 'hi' ? 'लोरी पाठ एवं भोग अर्पण' : 'Soothing Vedic Lullaby stotras' },
        { label: currentLang === 'hi' ? 'कपाट समापन' : 'Gates Close', val: currentLang === 'hi' ? 'रात्रि 09:00 बजे मुख्य कपाट बंद' : 'Temple Gates Close at 09:00 PM' }
      ]
    }
  ];

  const currentAarti = aartis[activeAartiIndex];
  const CurrentIcon = currentAarti.icon;

  return (
    <section className="w-full bg-[#fbf9f5] py-14 sm:py-20 text-stone-900 font-sans relative overflow-hidden border-b border-stone-200">
      
      {/* Subtle Sacred Motif Watermark */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c28227]" />
            <span>{currentLang === 'hi' ? 'नित्य सेवा व आरती सारणी' : 'Daily Temple Aarti Schedule'}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#c28227]" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {currentLang === 'hi' ? 'दैनिक आरती समय सारणी' : 'Daily Aarti Timings & Rituals'}
          </h2>

          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2.5" />

          <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed">
            {currentLang === 'hi'
              ? 'भगवान श्री गौरीशंकर एवं बैकुंठनाथ धाम में नित्य संपन्न होने वाली 5 पावन आरतियों का समय व अनुष्ठान विवरण'
              : 'Explore the timings, ritual sequence, and live darshan of the 5 daily Aartis performed for Lord Hari-Hara'}
          </p>
        </div>

        {/* Interactive 2-Column Schedule Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: 5 Aarti Selector List (5 Cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {aartis.map((aarti, idx) => {
              const Icon = aarti.icon;
              const isActive = activeAartiIndex === idx;

              return (
                <button
                  key={aarti.id}
                  onClick={() => setActiveAartiIndex(idx)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer shadow-xs group ${
                    isActive
                      ? 'bg-white border-[#c28227] ring-2 ring-amber-400/40 shadow-md scale-[1.02]'
                      : 'bg-white/80 border-stone-200/90 hover:bg-white hover:border-amber-300'
                  }`}
                >
                  
                  {/* Left: Icon + Timing + Name */}
                  <div className="flex items-center gap-3">
                    
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform shrink-0 ${
                      isActive 
                        ? 'bg-[#c28227] text-white shadow-xs scale-105' 
                        : 'bg-amber-50 text-[#c28227] group-hover:bg-amber-100'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-black tracking-tight font-mono ${
                          isActive ? 'text-stone-900' : 'text-stone-800'
                        }`}>
                          {aarti.time}
                        </span>
                        {aarti.isGrand && (
                          <span className="bg-rose-100 text-rose-800 text-[9.5px] font-bold px-2 py-0.2 rounded-full border border-rose-300">
                            ★ 108 दीप
                          </span>
                        )}
                      </div>

                      <h3 className={`text-xs sm:text-sm font-bold transition-colors ${
                        isActive ? 'text-[#c28227]' : 'text-stone-700 group-hover:text-[#c28227]'
                      }`}>
                        {aarti.name}
                      </h3>
                    </div>

                  </div>

                  {/* Right: Step Indicator */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-semibold text-stone-500 hidden sm:inline">
                      {aarti.period}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#c28227] translate-x-0.5' : 'text-stone-300 group-hover:text-stone-500'
                    }`} />
                  </div>

                </button>
              );
            })}

            {/* Temple Hours Quick Banner */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-amber-900 font-semibold mt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c28227]" />
                <span>{currentLang === 'hi' ? 'मंदिर दर्शन समय:' : 'Temple Hours:'}</span>
              </div>
              <span className="font-mono text-stone-900 font-bold">05:00 AM – 09:00 PM</span>
            </div>

          </div>

          {/* Right Column: Dynamic Featured Aarti Detail Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col justify-between">
            
            {/* Top Image Banner with Floating Details */}
            <div className="relative h-48 sm:h-56 bg-stone-950 overflow-hidden">
              <img
                src={currentAarti.image}
                alt={currentAarti.name}
                className="w-full h-full object-cover object-center filter brightness-90 transition-transform duration-700 hover:scale-105"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="bg-[#c28227] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {currentAarti.tag}
                </span>

                <div className="bg-black/60 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentAarti.time}</span>
                </div>
              </div>

              {/* Bottom Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
                  {currentAarti.period} • #{currentAarti.step}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow">
                  {currentAarti.name}
                </h3>
              </div>

            </div>

            {/* Bottom Content & Rituals Grid */}
            <div className="p-5 sm:p-6 space-y-4 bg-gradient-to-b from-white to-amber-50/20">
              
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {currentAarti.description}
              </p>

              {/* Rituals Key-Value Breakdown */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5 mb-1">
                  <Bell className="w-3.5 h-3.5 text-[#c28227]" />
                  <span>{currentLang === 'hi' ? 'आरती विधि एवं अनुष्ठान' : 'Aarti Rituals & Offerings'}</span>
                </span>

                {currentAarti.rituals.map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-xs border-b border-stone-200/60 last:border-0 pb-1.5 last:pb-0">
                    <span className="text-stone-500 font-medium">{r.label}:</span>
                    <span className="text-stone-900 font-bold">{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Live Darshan Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{currentLang === 'hi' ? 'गर्भगृह से 24x7 लाइव प्रसारण' : '24x7 Sanctum Live Broadcast'}</span>
                </div>

                <Link
                  to="/darshan/live-darshan"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer group"
                >
                  <Video className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{currentLang === 'hi' ? 'आरती लाइव देखें' : 'Watch Aarti Live'}</span>
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
