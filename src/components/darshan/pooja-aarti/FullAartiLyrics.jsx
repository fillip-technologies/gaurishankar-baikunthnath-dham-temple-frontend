import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Heart,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

export default function FullAartiLyrics() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState('base'); // 'base' | 'lg' | 'xl'
  const [activeTab, setActiveTab] = useState('shiv'); // 'shiv' | 'vishnu'

  const shivAartiLyricsHindi = [
    {
      lines: [
        'ॐ जय शिव ओंकारा, प्रभु जय शिव ओंकारा।',
        'ब्रह्मा विष्णु सदाशिव, अर्द्धांगी धारा ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      lines: [
        'एकानन चतुरानन पंचानन राजे।',
        'हंसानन गरुड़सानन वृषवाहन साजे ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      lines: [
        'दो भुज चार चतुर्भुज दस भुज अति सोहे।',
        'तीनों रूप निराला तीनों जन मोहे ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      lines: [
        'अक्षमाला वनमाला मुण्डमाला धारी।',
        'चंदन मृगमद सोहै भाले शशि धारी ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      lines: [
        'श्वेत पीत पितम्बर बाघंबर धारी।',
        'सनकादिक ब्रह्मादिक भूतादिक संहारी ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      lines: [
        'कर के बीच कमण्डलु चक्र त्रिशूलकर्ता।',
        'सुखकर्ता दुखहर्ता जगपालन कर्ता ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      lines: [
        'ब्रह्मा विष्णु सदाशिव जानत अविवेका।',
        'मधु-कैटभ दो मारत, प्रभू रूप अनेक ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      lines: [
        'जानत जो कोई नर Aarti शिवजी की गावत।',
        'कहत शिवानंद स्वामी, मनवांछित फल पावत ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    }
  ];

  const vishnuAartiLyricsHindi = [
    {
      lines: [
        'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।',
        'भक्त जनों के संकट, क्षण में दूर करे ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      lines: [
        'जो ध्यावे फल पावे, दुःख बिनसे मन का।',
        'सुख सम्पति घर आवे, कष्ट मिटे तन का ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      lines: [
        'मात-पिता तुम मेरे, शरण गहूं किसकी।',
        'तुम बिन और न दूजा, आस करूं जिसकी ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      lines: [
        'तुम पूरण परमात्मा, तुम अन्तर्यामी।',
        'पारब्रह्म परमेश्वर, तुम सब के स्वामी ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      lines: [
        'तुम करुणा के सागर, तुम पालनकर्ता।',
        'मैं मूरख खल कामी, कृपा करो भर्ता ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      lines: [
        'दीनबंधु दुखहर्ता, तुम ठाकुर मेरे।',
        'अपने हाथ उठाओ, द्वार पड़ा तेरे ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      lines: [
        'विषय विकार मिटाओ, पाप हरो देवा।',
        'श्रद्धा भक्ति बढ़ाओ, संतन की सेवा ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      lines: [
        'तन मन धन सब है तेरा, स्वामी सब कुछ है तेरा।',
        'तेरा तुझको अर्पण, क्या लागे मेरा ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    }
  ];

  const fullTextShiv = shivAartiLyricsHindi.map(v => `${v.lines.join('\n')}\n${v.chorus}`).join('\n\n');
  const fullTextVishnu = vishnuAartiLyricsHindi.map(v => `${v.lines.join('\n')}\n${v.chorus}`).join('\n\n');

  const handleCopy = () => {
    const textToCopy = activeTab === 'shiv' ? fullTextShiv : fullTextVishnu;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentVerses = activeTab === 'shiv' ? shivAartiLyricsHindi : vishnuAartiLyricsHindi;

  return (
    <section className="w-full bg-[#faf7f2] py-14 sm:py-20 text-stone-900 font-sans relative overflow-hidden border-b border-stone-200">
      
      {/* Background Sacred Motif Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:20px_20px] z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[#c28227] text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>{currentLang === 'hi' ? 'सम्पूर्ण नित्य आरती पाठ' : 'Complete Sacred Aarti Stuti'}</span>
            <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {currentLang === 'hi' ? 'श्री हरि-हर पावन महाआरती' : 'Shri Hari-Hara Sacred Maha Aarti'}
          </h2>

          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2.5" />

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {currentLang === 'hi' 
              ? 'भगवान शिव (गौरीशंकर) एवं भगवान विष्णु (बैकुंठनाथ) की पावन नित्य आरती का पाठ करें व पुण्य लाभ प्राप्त करें'
              : 'Recite the sacred daily Aartis of Lord Shiva & Lord Vishnu consecrated at Baikunthnath Dham'}
          </p>
        </div>

        {/* Tab Switcher (Shiv Omkara / Jagdish Hare) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('shiv')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              activeTab === 'shiv'
                ? 'bg-[#c28227] text-white shadow-md ring-2 ring-amber-400/50 scale-105'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>{currentLang === 'hi' ? 'श्री शिव ओंकारा आरती' : 'Shri Shiv Omkara Aarti'}</span>
          </button>

          <button
            onClick={() => setActiveTab('vishnu')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              activeTab === 'vishnu'
                ? 'bg-[#c28227] text-white shadow-md ring-2 ring-amber-400/50 scale-105'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{currentLang === 'hi' ? 'श्री जगदीश हरे आरती' : 'Shri Jagdish Hare Aarti'}</span>
          </button>
        </div>

        {/* Main Aarti Frame Container */}
        <div className="bg-white rounded-3xl border-2 border-amber-500/30 shadow-xl overflow-hidden relative">
          
          {/* Top Frame Banner */}
          <div className="bg-gradient-to-r from-[#2a080d] via-[#451017] to-[#2a080d] text-amber-100 px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-500/50">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#ffd700]">
                  {activeTab === 'shiv' ? '॥ श्री शिव जी की आरती (ॐ जय शिव ओंकारा) ॥' : '॥ श्री विष्णु जी की आरती (ॐ जय जगदीश हरे) ॥'}
                </h3>
                <span className="text-[11px] text-amber-200/80">
                  {activeTab === 'shiv' ? 'रचयिता: स्वामी शिवानंद जी' : 'रचयिता: पं. श्रद्धाराम फिल्लौरी'}
                </span>
              </div>
            </div>

            {/* Quick Actions (Font Size + Copy) */}
            <div className="flex items-center gap-2">
              
              {/* Font Size Selector */}
              <div className="bg-black/30 border border-amber-500/30 rounded-xl p-1 flex items-center gap-1 text-xs">
                <button
                  onClick={() => setFontSize('base')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                    fontSize === 'base' ? 'bg-amber-500 text-stone-900' : 'text-amber-200 hover:text-white'
                  }`}
                  title="Normal Text"
                >
                  अ
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                    fontSize === 'lg' ? 'bg-amber-500 text-stone-900' : 'text-amber-200 hover:text-white'
                  }`}
                  title="Medium Text"
                >
                  अ+
                </button>
                <button
                  onClick={() => setFontSize('xl')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                    fontSize === 'xl' ? 'bg-amber-500 text-stone-900' : 'text-amber-200 hover:text-white'
                  }`}
                  title="Large Text"
                >
                  अ++
                </button>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="bg-[#c28227] hover:bg-[#a66d1e] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (currentLang === 'hi' ? 'कॉपी हो गया' : 'Copied') : (currentLang === 'hi' ? 'आरती कॉपी करें' : 'Copy Aarti')}</span>
              </button>

            </div>

          </div>

          {/* Verses Container */}
          <div className="p-6 sm:p-10 space-y-6 sm:space-y-8 bg-gradient-to-b from-amber-50/20 via-white to-amber-50/30">
            {currentVerses.map((verse, index) => (
              <div 
                key={index} 
                className="text-center space-y-2.5 pb-6 border-b border-amber-100 last:border-b-0 last:pb-0 group"
              >
                {/* Verse Number Pill */}
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold font-mono shadow-xs mb-1">
                  0{index + 1}
                </div>

                {/* Verse Lines */}
                <div className={`text-stone-800 font-semibold leading-relaxed tracking-wide ${
                  fontSize === 'xl' 
                    ? 'text-lg sm:text-2xl' 
                    : fontSize === 'lg' 
                    ? 'text-base sm:text-xl' 
                    : 'text-sm sm:text-lg'
                }`}>
                  {verse.lines.map((line, lIdx) => (
                    <p key={lIdx} className="my-1 text-stone-900 drop-shadow-2xs">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Chorus Accent Line */}
                <p className={`font-bold text-[#c28227] tracking-wider pt-1 flex items-center justify-center gap-2 ${
                  fontSize === 'xl' 
                    ? 'text-base sm:text-xl' 
                    : fontSize === 'lg' 
                    ? 'text-sm sm:text-lg' 
                    : 'text-xs sm:text-base'
                }`}>
                  <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0 inline" />
                  <span>{verse.chorus}</span>
                  <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0 inline" />
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Prayer Concluding Blessing */}
          <div className="bg-amber-50/80 border-t border-amber-200 px-6 py-4 text-center text-xs text-amber-900 font-medium">
            <span className="text-[#c28227] font-bold">॥ कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् । सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥</span>
          </div>

        </div>

      </div>

    </section>
  );
}
