import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  Bell, 
  Share2,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function FullAartiLyrics() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState('base'); // 'sm' | 'base' | 'lg'
  const [activeTab, setActiveTab] = useState('shiv'); // 'shiv' | 'vishnu'
  const [bellRinging, setBellRinging] = useState(false);
  const [showVidhi, setShowVidhi] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Web Audio API Harmonic Temple Bell Sound
  const playTempleBell = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const freqs = [528, 1056, 1584, 2112];
      const now = ctx.currentTime;

      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = index === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        const initialGain = 0.25 / (index + 1);
        gain.gain.setValueAtTime(initialGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5 - index * 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 2.6);
      });

      setBellRinging(true);
      setTimeout(() => setBellRinging(false), 1200);
    } catch (e) {
      console.warn('Audio not supported:', e);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const shivAartiLyricsHindi = [
    {
      num: '01',
      lines: [
        'ॐ जय शिव ओंकारा, प्रभु जय शिव ओंकारा।',
        'ब्रह्मा विष्णु सदाशिव, अर्द्धांगी धारा ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      num: '02',
      lines: [
        'एकानन चतुरानन पंचानन राजे।',
        'हंसानन गरुड़सानन वृषवाहन साजे ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      num: '03',
      lines: [
        'दो भुज चार चतुर्भुज दस भुज अति सोहे।',
        'तीनों रूप निराला तीनों जन मोहे ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      num: '04',
      lines: [
        'अक्षमाला वनमाला मुण्डमाला धारी।',
        'चंदन मृगमद सोहै भाले शशि धारी ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      num: '05',
      lines: [
        'श्वेत पीत पितम्बर बाघंबर धारी।',
        'सनकादिक ब्रह्मादिक भूतादिक संहारी ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      num: '06',
      lines: [
        'कर के बीच कमण्डलु चक्र त्रिशूलकर्ता।',
        'सुखकर्ता दुखहर्ता जगपालन कर्ता ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      num: '07',
      lines: [
        'ब्रह्मा विष्णु सदाशिव जानत अविवेका।',
        'मधु-कैटभ दो मारत, प्रभू रूप अनेक ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    },
    {
      num: '08',
      lines: [
        'जानत जो कोई नर आरती शिवजी की गावत।',
        'कहत शिवानंद स्वामी, मनवांछित फल पावत ॥'
      ],
      chorus: 'ॐ हर हर हर महादेव...'
    }
  ];

  const vishnuAartiLyricsHindi = [
    {
      num: '01',
      lines: [
        'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।',
        'भक्त जनों के संकट, क्षण में दूर करे ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      num: '02',
      lines: [
        'जो ध्यावे फल पावे, दुःख बिनसे मन का।',
        'सुख सम्पति घर आवे, कष्ट मिटे तन का ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      num: '03',
      lines: [
        'मात-पिता तुम मेरे, शरण गहूं किसकी।',
        'तुम बिन और न दूजा, आस करूं जिसकी ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      num: '04',
      lines: [
        'तुम पूरण परमात्मा, तुम अन्तर्यामी।',
        'पारब्रह्म परमेश्वर, तुम सब के स्वामी ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      num: '05',
      lines: [
        'तुम करुणा के सागर, तुम पालनकर्ता।',
        'मैं मूरख खल कामी, कृपा करो भर्ता ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      num: '06',
      lines: [
        'दीनबंधु दुखहर्ता, तुम ठाकुर मेरे।',
        'अपने हाथ उठाओ, द्वार पड़ा तेरे ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      num: '07',
      lines: [
        'विषय विकार मिटाओ, पाप हरो देवा।',
        'श्रद्धा भक्ति बढ़ाओ, संतन की सेवा ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    },
    {
      num: '08',
      lines: [
        'तन मन धन सब है तेरा, स्वामी सब कुछ है तेरा।',
        'तेरा तुझको अर्पण, क्या लागे मेरा ॥'
      ],
      chorus: 'ॐ जय जगदीश हरे...'
    }
  ];

  const fullTextShiv = shivAartiLyricsHindi.map((v, i) => `[${v.num}]\n${v.lines.join('\n')}\n${v.chorus}`).join('\n\n');
  const fullTextVishnu = vishnuAartiLyricsHindi.map((v, i) => `[${v.num}]\n${v.lines.join('\n')}\n${v.chorus}`).join('\n\n');

  const handleCopy = () => {
    const textToCopy = activeTab === 'shiv' 
      ? `॥ श्री शिव जी की आरती (ॐ जय शिव ओंकारा) ॥\nरचयिता: स्वामी शिवानंद जी\n\n${fullTextShiv}\n\n॥ कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् । सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥`
      : `॥ श्री विष्णु जी की आरती (ॐ जय जगदीश हरे) ॥\nरचयिता: पं. श्रद्धाराम फिल्लौरी\n\n${fullTextVishnu}\n\n॥ ॐ नमो भगवते वासुदेवाय नमः ॥`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast(currentLang === 'hi' ? 'आरती सफलता पूर्वक कॉपी हो गई है!' : 'Aarti lyrics copied successfully!');
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = async () => {
    const shareTitle = activeTab === 'shiv' ? 'श्री शिव ओंकारा आरती - बैकुंठनाथ धाम' : 'श्री जगदीश हरे आरती - बैकुंठनाथ धाम';
    const shareText = activeTab === 'shiv' 
      ? 'ॐ जय शिव ओंकारा, प्रभु जय शिव ओंकारा... श्री गौरीशंकर बैकुंठनाथ धाम मंदिर पर पावन आरती का पाठ करें।'
      : 'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे... श्री गौरीशंकर बैकुंठनाथ धाम मंदिर पर पावन आरती का पाठ करें।';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const currentVerses = activeTab === 'shiv' ? shivAartiLyricsHindi : vishnuAartiLyricsHindi;

  return (
    <section className="w-full bg-[#fdfaf5] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden border-t border-b border-amber-900/10 select-text">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2b080c] text-amber-200 border border-amber-500/50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Background Sacred Floating Om Symbols in Multiple Locations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Top Left Floating Om */}
        <span className="absolute -top-6 -left-6 text-7xl sm:text-9xl text-amber-600/[0.045] font-serif font-black">ॐ</span>
        {/* Top Right Floating Om */}
        <span className="absolute top-10 -right-6 text-8xl sm:text-[140px] text-amber-600/[0.045] font-serif font-black">ॐ</span>
        {/* Mid Left Floating Om */}
        <span className="absolute top-1/3 -left-10 text-9xl sm:text-[180px] text-amber-700/[0.035] font-serif font-black">ॐ</span>
        {/* Mid Right Floating Om */}
        <span className="absolute top-1/2 -right-8 text-9xl sm:text-[180px] text-amber-700/[0.035] font-serif font-black">ॐ</span>
        {/* Bottom Left Floating Om */}
        <span className="absolute -bottom-10 -left-6 text-8xl sm:text-[160px] text-amber-600/[0.045] font-serif font-black">ॐ</span>
        {/* Bottom Right Floating Om */}
        <span className="absolute -bottom-12 -right-6 text-8xl sm:text-[160px] text-amber-600/[0.045] font-serif font-black">ॐ</span>

        {/* Scattered Divine Mini Om Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='40' y='48' font-family='serif' font-size='22' text-anchor='middle' fill='%23b45309' font-weight='bold'%3E%E0%A5%90%3C/text%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold uppercase tracking-widest mb-2.5 shadow-2xs">
            <span className="text-amber-600 font-serif">ॐ</span>
            <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>{currentLang === 'hi' ? 'सम्पूर्ण नित्य आरती पाठ' : 'Sacred Maha Aarti Stuti'}</span>
            <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="text-amber-600 font-serif">ॐ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2a080d] tracking-tight mb-2">
            {currentLang === 'hi' ? 'श्री हरि-हर पावन महाआरती' : 'Shri Hari-Hara Sacred Maha Aarti'}
          </h2>

          <div className="flex items-center justify-center gap-2.5 my-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-600" />
            <span className="text-xs text-amber-700 font-serif">॥ ॐ नमः शिवाय ॥</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-600" />
          </div>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            {currentLang === 'hi' 
              ? 'भगवान शिव (गौरीशंकर) एवं भगवान विष्णु (बैकुंठनाथ) की पावन नित्य आरती का भावपूर्ण पाठ'
              : 'Daily sacred verses of Lord Shiva & Lord Vishnu consecrated at Baikunthnath Dham'}
          </p>
        </div>

        {/* Sacred Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-7">
          
          {/* Shiv Tab */}
          <button
            onClick={() => setActiveTab('shiv')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-xs ${
              activeTab === 'shiv'
                ? 'bg-gradient-to-r from-[#8b2500] via-[#c28227] to-[#8b2500] text-white shadow-md ring-2 ring-amber-400/50 scale-[1.03]'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-300'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>{currentLang === 'hi' ? 'श्री शिव ओंकारा आरती' : 'Shri Shiv Omkara Aarti'}</span>
          </button>

          {/* Vishnu Tab */}
          <button
            onClick={() => setActiveTab('vishnu')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-xs ${
              activeTab === 'vishnu'
                ? 'bg-gradient-to-r from-[#1e1b4b] via-[#3730a3] to-[#1e1b4b] text-white shadow-md ring-2 ring-indigo-400/50 scale-[1.03]'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{currentLang === 'hi' ? 'श्री जगदीश हरे आरती' : 'Shri Jagdish Hare Aarti'}</span>
          </button>

        </div>

        {/* Single Seamless Aarti Page / Pothi Scroll */}
        <div className="bg-[#fffefb] rounded-3xl border-2 border-amber-500/40 shadow-xl overflow-hidden relative">
          
          {/* Top Sanctum Banner */}
          <div className="bg-gradient-to-r from-[#210609] via-[#3d0f15] to-[#210609] text-amber-100 px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-500/50 relative">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif font-bold text-base shadow-xs">
                ॐ
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#ffd700] tracking-wide">
                  {activeTab === 'shiv' ? '॥ श्री शिव जी की आरती (ॐ जय शिव ओंकारा) ॥' : '॥ श्री विष्णु जी की आरती (ॐ जय जगदीश हरे) ॥'}
                </h3>
                <span className="text-[11px] text-amber-200/80">
                  {activeTab === 'shiv' ? 'रचयिता: स्वामी शिवानंद जी' : 'रचयिता: पं. श्रद्धाराम फिल्लौरी'}
                </span>
              </div>
            </div>

            {/* Quick Actions (Font Size + Bell + Copy) */}
            <div className="flex items-center gap-2">
              
              {/* Temple Bell Sound Button */}
              <button
                onClick={playTempleBell}
                className={`p-1.5 px-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                  bellRinging 
                    ? 'bg-amber-400 text-stone-950 border-amber-300 scale-105 shadow-md shadow-amber-400/40' 
                    : 'bg-white/10 hover:bg-white/20 text-amber-200 border-amber-500/30'
                }`}
                title={currentLang === 'hi' ? 'मंदिर की घंटी बजाएं' : 'Ring Temple Bell'}
              >
                <Bell className={`w-3.5 h-3.5 ${bellRinging ? 'animate-bounce' : ''}`} />
                <span className="hidden sm:inline">{currentLang === 'hi' ? 'घंटी' : 'Bell'}</span>
              </button>

              {/* Font Size Selector */}
              <div className="bg-black/35 border border-amber-500/30 rounded-xl p-1 flex items-center gap-1 text-xs">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                    fontSize === 'sm' ? 'bg-amber-400 text-stone-950 shadow-xs' : 'text-amber-200 hover:text-white'
                  }`}
                  title="Small Text"
                >
                  अ
                </button>
                <button
                  onClick={() => setFontSize('base')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                    fontSize === 'base' ? 'bg-amber-400 text-stone-950 shadow-xs' : 'text-amber-200 hover:text-white'
                  }`}
                  title="Medium Text"
                >
                  अ+
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                    fontSize === 'lg' ? 'bg-amber-400 text-stone-950 shadow-xs' : 'text-amber-200 hover:text-white'
                  }`}
                  title="Large Text"
                >
                  अ++
                </button>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-500/30 p-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                title={currentLang === 'hi' ? 'शेयर करें' : 'Share'}
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="bg-[#c28227] hover:bg-[#a66d1e] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (currentLang === 'hi' ? 'कॉपी हो गया' : 'Copied') : (currentLang === 'hi' ? 'आरती कॉपी करें' : 'Copy Aarti')}</span>
              </button>

            </div>

          </div>

          {/* Single Continuous Aarti Page Body with Multiple Om Watermarks */}
          <div className="px-6 sm:px-14 py-10 sm:py-14 bg-gradient-to-b from-[#fffefc] via-[#fdfbf6] to-[#fffefc] relative">
            
            {/* Multiple Om Watermarks inside Page Background */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              <span className="absolute top-6 left-10 text-8xl text-amber-900/[0.025] font-serif font-black">ॐ</span>
              <span className="absolute top-1/4 right-12 text-9xl text-amber-900/[0.028] font-serif font-black">ॐ</span>
              <span className="absolute top-1/2 left-8 text-[130px] text-amber-900/[0.025] font-serif font-black">ॐ</span>
              <span className="absolute top-3/4 right-10 text-[140px] text-amber-900/[0.028] font-serif font-black">ॐ</span>
              <span className="absolute -bottom-6 left-1/3 text-[160px] text-amber-900/[0.025] font-serif font-black">ॐ</span>
            </div>

            {/* Continuous Verses List */}
            <div className="space-y-8 sm:space-y-10 relative z-10 text-center">
              {currentVerses.map((verse, index) => (
                <div key={index} className="space-y-3">
                  
                  {/* Standard Normal Digit Marker (e.g. 01, 02, 03...) */}
                  <div className="inline-flex items-center justify-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-b from-amber-100 to-amber-200/80 border border-amber-300/80 text-amber-900 font-extrabold text-xs font-sans shadow-xs">
                      {verse.num}
                    </span>
                  </div>

                  {/* Stanza Lines */}
                  <div className={`text-[#260a0e] font-bold leading-relaxed tracking-wide ${
                    fontSize === 'lg'
                      ? 'text-lg sm:text-2xl'
                      : fontSize === 'base'
                      ? 'text-base sm:text-xl'
                      : 'text-sm sm:text-lg'
                  }`}>
                    {verse.lines.map((line, lIdx) => (
                      <p key={lIdx} className="my-1 drop-shadow-2xs">
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Sacred Refrain Chorus */}
                  <p className={`font-extrabold text-[#c28227] tracking-wider pt-0.5 flex items-center justify-center gap-2 ${
                    fontSize === 'lg'
                      ? 'text-sm sm:text-lg'
                      : fontSize === 'base'
                      ? 'text-xs sm:text-base'
                      : 'text-xs sm:text-sm'
                  }`}>
                    <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0 inline" />
                    <span>{verse.chorus}</span>
                    <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0 inline" />
                  </p>

                  {/* Elegant Subtle Divider between stanzas */}
                  {index < currentVerses.length - 1 && (
                    <div className="pt-4 flex items-center justify-center gap-3 opacity-60">
                      <div className="h-[1px] w-12 bg-amber-200" />
                      <span className="text-xs text-amber-600 font-serif">ॐ</span>
                      <div className="h-[1px] w-12 bg-amber-200" />
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>

          {/* Expandable Aarti Vidhi Guidelines */}
          <div className="bg-[#fff9ef] border-t border-amber-200/80 px-6 py-3.5">
            <button
              onClick={() => setShowVidhi(!showVidhi)}
              className="w-full flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-800 flex items-center justify-center">
                  <Info className="w-3 h-3" />
                </div>
                <span className="text-xs font-bold text-amber-950 group-hover:text-amber-700 transition-colors">
                  {currentLang === 'hi' ? 'आरती करने के पावन नियम एवं विधि' : 'Aarti Ritual Guidelines & Significance'}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-800">
                {showVidhi ? (currentLang === 'hi' ? 'बंद करें ▲' : 'Close ▲') : (currentLang === 'hi' ? 'देखें ▼' : 'View ▼')}
              </span>
            </button>

            {showVidhi && (
              <div className="mt-3 pt-3 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
                  <h5 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    {currentLang === 'hi' ? 'आरती प्रदक्षिणा विधि' : 'Aarti Circumambulation'}
                  </h5>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {currentLang === 'hi' 
                      ? 'भगवान के श्री चरणों में 4 बार, नाभि में 2 बार, मुख मंडल पर 1 बार और सर्वांग पर 7 बार ॐ की आकृति में दीप घुमाएं।' 
                      : 'Rotate the deepam 4 times at the lotus feet, twice at the navel, once at the face, and 7 times around the complete deity.'}
                  </p>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
                  <h5 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    {currentLang === 'hi' ? 'आरती ग्रहण व आशीर्वाद' : 'Receiving Holy Light'}
                  </h5>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {currentLang === 'hi'
                      ? 'आरती के बाद दोनों हाथों से पावन ज्योति को स्पर्श कर अपने मस्तक व नेत्रों पर लगाएं, जिससे सकारात्मक ऊर्जा मिलती है।'
                      : 'Gently cup your hands over the sanctified flame and touch your forehead and eyes to receive divine grace.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Prayer Concluding Blessing */}
          <div className="bg-gradient-to-r from-[#210609] via-[#3d0f15] to-[#210609] text-amber-100 px-6 py-4 text-center text-xs sm:text-sm font-semibold border-t-2 border-amber-500/50">
            <span className="text-[#ffd700] font-serif">
              ॥ कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् । सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
