import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Flower2, 
  Sparkles, 
  Calendar, 
  Clock, 
  Download, 
  Share2, 
  Maximize2, 
  X, 
  Check,
  Flame,
  CheckCircle2
} from 'lucide-react';

import todayShringarImg from '../../../assets/home/herosection-3.png';

export default function AajKaShringar() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const todayDateFormatted = new Date().toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const shringarData = {
    title: currentLang === 'hi' ? 'आज का शृंगार' : 'Aaj Ka Shringar',
    subtitle: currentLang === 'hi' ? 'भगवान श्री गौरीशंकर एवं बैकुंठनाथ जी का नित्य प्रातः शृंगार' : 'Daily Morning Adornment of Lord Hari-Hara',
    timeSlot: currentLang === 'hi' ? 'प्रातः 08:30 बजे' : '08:30 AM',
    image: todayShringarImg,
    chant: currentLang === 'hi' ? '॥ ॐ नमः शिवाय • ॐ नमो भगवते वासुदेवाय ॥' : '॥ Om Namah Shivaya • Om Namo Bhagavate Vasudevaya ॥',
    description: currentLang === 'hi'
      ? 'आज प्रातः काल भगवान श्री गौरीशंकर (शिव) और भगवान बैकुंठनाथ (विष्णु) का पावन गंगाजल व पंचामृत से महाभिषेक संपन्न हुआ। इसके उपरांत प्रभु को मलयागिरि के सुगंधित केसरिया चंदन, ताजे कमल पुष्प, १०८ बेलपत्र, तुलसी दल एवं विशेष पीतांबर रेशमी वस्त्रों से अलौकिक रूप से सुसज्जित किया गया है।'
      : 'This morning, sacred snan and abhishek of Lord Gaurishankar & Lord Baikunthnath was performed with holy Ganga water and Panchamrit. The sanctum deity is divinely adorned with Malayagiri saffron sandalwood paste, fresh lotus blossoms, 108 Bilva leaves, Tulsi, and auspicious golden silks.',
    details: [
      {
        label: currentLang === 'hi' ? 'पावन पुष्प' : 'Sacred Flowers',
        val: currentLang === 'hi' ? 'कमल, श्वेत मंदार, गेंदा एवं तुलसी दल' : 'Lotus, Jasmine, Marigold & Tulsi'
      },
      {
        label: currentLang === 'hi' ? 'चंदन व तिलक' : 'Chandan & Tilak',
        val: currentLang === 'hi' ? 'शुद्ध मलयागिरि केसरिया चंदन एवं भस्म' : 'Pure Saffron Sandalwood & Bhasma'
      },
      {
        label: currentLang === 'hi' ? 'दिव्य परिधान' : 'Holy Silks',
        val: currentLang === 'hi' ? 'पीतांबर रेशमी वस्त्र व स्वर्ण मुकुट' : 'Pitambar Golden Silks & Sacred Crown'
      },
      {
        label: currentLang === 'hi' ? 'दर्शन समय' : 'Darshan Hours',
        val: currentLang === 'hi' ? 'प्रातः 05:00 - 12:30 | सायं 04:00 - 09:00' : '05:00 AM - 12:30 PM | 04:00 PM - 09:00 PM'
      }
    ]
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shringarData.title,
        text: `${shringarData.title} - Shri Baikunthnath Dham (${todayDateFormatted})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = shringarData.image;
    link.download = `Aaj-Ka-Shringar-Baikunthnath-${todayDateFormatted.replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full bg-[#fdfbf7] py-14 sm:py-20 text-stone-900 font-sans relative overflow-hidden border-b border-stone-200">
      
      {/* Background Subtle Watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none translate-x-20 -translate-y-20 z-0">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Container: Left (Wider Landscape Image) | Right (Compact Description) */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* Left: Single Daily Shringar Image (7 cols - Wider & Sleek Height) */}
          <div className="lg:col-span-7 relative h-[260px] sm:h-[320px] lg:h-full min-h-[300px] lg:min-h-[360px] max-h-[420px] bg-stone-950 overflow-hidden group">
            
            <img
              src={shringarData.image}
              alt={shringarData.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Subtle Gradient Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

            {/* Bottom Overlay Info & Controls */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between z-20">
              
              <div className="text-white">
                <span className="text-[11px] font-semibold text-amber-300 block flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{todayDateFormatted}</span>
                </span>
                <span className="text-xs font-bold text-white drop-shadow">
                  {currentLang === 'hi' ? 'श्री गौरीशंकर बैकुंठनाथ धाम' : 'Shri Baikunthnath Sanctum'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#c28227] backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md"
                  title="Fullscreen View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleDownload}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#c28227] backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md"
                  title="Download HD Photo"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Right: Description & Shringar Details (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 lg:p-8 flex flex-col justify-center space-y-4 bg-gradient-to-b from-white to-amber-50/20">
            
            {/* Title */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {shringarData.title}
              </h2>
              <div className="w-16 h-[2px] bg-[#c28227] mt-2 mb-3" />
            </div>

            {/* Description */}
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {shringarData.description}
            </p>

            {/* Highlights Table / Specification */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c28227]" />
                <span>{currentLang === 'hi' ? 'शृंगार विवरण' : 'Adornment Details'}</span>
              </span>

              <div className="space-y-2 pt-1">
                {shringarData.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs border-b border-stone-200/60 last:border-0 pb-1.5 last:pb-0 gap-2">
                    <span className="text-stone-500 font-medium shrink-0">{detail.label}:</span>
                    <span className="text-stone-900 font-semibold text-right">{detail.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer z-50"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Download Button in Lightbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="absolute top-5 left-5 text-white/80 hover:text-white bg-white/10 hover:bg-[#c28227] px-3.5 py-2 rounded-full transition-colors cursor-pointer z-50 flex items-center gap-2 text-xs font-bold"
            title="Download Photo"
          >
            <Download className="w-4 h-4" />
            <span>{currentLang === 'hi' ? 'डाउनलोड' : 'Download'}</span>
          </button>

          <div 
            className="max-w-4xl max-h-[85vh] relative rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={shringarData.image}
              alt={shringarData.title}
              className="w-full h-full max-h-[78vh] object-contain mx-auto"
            />
            <div className="bg-stone-900/90 p-4 text-center text-white border-t border-stone-800">
              <span className="text-xs font-bold text-[#c28227] uppercase tracking-wider block">
                {todayDateFormatted} • {shringarData.timeSlot}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#ffd700] mt-0.5">{shringarData.title}</h3>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
