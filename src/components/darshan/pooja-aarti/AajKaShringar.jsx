import React, { useState, useEffect } from 'react';
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

import { shringarGetAllApi } from '../../clientApi/allapi';
import { formatDate } from '../../clientApi/format';
import todayShringarImg from '../../../assets/home/herosection-3.png';

const STORAGE_KEY = 'baikunth_daily_shringar_list';

export default function AajKaShringar() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);

  useEffect(() => {
    // 1. First attempt to fetch live from API (GET /api/v1/shringar/all)
    const loadShringar = async () => {
      try {
        const res = await shringarGetAllApi();
        if (res.status === 200 && Array.isArray(res.data?.data) && res.data.data.length > 0) {
          const first = res.data.data[0];
          setActiveRecord({
            ...first,
            title: first.title || 'Aaj Ka Divya Shringar',
            titleEn: first.title || first.titleEn || 'Aaj Ka Divya Shringar',
            titleHi: first.titleHi || first.title || 'आज का दिव्य शृंगार',
            image: first.file || first.url || first.secure_url || first.imageUrl || first.image || todayShringarImg,
            date: first.createdAt || first.date || new Date().toISOString()
          });
          return;
        }
      } catch (err) {
        console.warn('Could not fetch live shringar, falling back to cache:', err);
      }

      // 2. Fallback to localStorage
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const list = JSON.parse(saved);
          const active = list.find((item) => item.isTodayActive) || list[0];
          if (active) {
            setActiveRecord(active);
          }
        }
      } catch (err) {
        console.warn('Could not read saved shringar data:', err);
      }
    };

    loadShringar();
  }, []);

  const todayDateFormatted = formatDate(activeRecord?.date || new Date());

  const shringarData = {
    title: currentLang === 'hi'
      ? (activeRecord?.titleHi || activeRecord?.title || '')
      : (activeRecord?.titleEn || activeRecord?.title || ''),
    subtitle: currentLang === 'hi'
      ? (activeRecord?.subtitleHi || activeRecord?.subtitleEn || '')
      : (activeRecord?.subtitleEn || activeRecord?.subtitleHi || ''),
    timeSlot: currentLang === 'hi'
      ? (activeRecord?.timeSlot ? `प्रातः ${activeRecord.timeSlot}` : '')
      : (activeRecord?.timeSlot || ''),
    image: activeRecord?.image || todayShringarImg,
    chant: activeRecord?.chant || '',
    description: currentLang === 'hi'
      ? (activeRecord?.descriptionHi || activeRecord?.descriptionEn || '')
      : (activeRecord?.descriptionEn || activeRecord?.descriptionHi || ''),
    details: [
      activeRecord?.flowers   && { label: currentLang === 'hi' ? 'पावन पुष्प'    : 'Sacred Flowers',  val: activeRecord.flowers   },
      activeRecord?.chandan   && { label: currentLang === 'hi' ? 'चंदन व तिलक'  : 'Chandan & Tilak', val: activeRecord.chandan   },
      activeRecord?.silks     && { label: currentLang === 'hi' ? 'दिव्य परिधान' : 'Holy Silks',       val: activeRecord.silks     },
      activeRecord?.darshanHours && { label: currentLang === 'hi' ? 'दर्शन समय'  : 'Darshan Hours',   val: activeRecord.darshanHours },
    ].filter(Boolean)
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
          <div className="lg:col-span-7 relative group overflow-hidden bg-stone-900 flex items-center justify-center min-h-[380px] lg:min-h-[460px]">
            <img
              src={shringarData.image}
              alt={shringarData.title}
              className="w-full h-full object-cover object-center max-h-[520px] transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Top Left: Live Adornment Pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c28227] text-white text-xs font-bold shadow-md">
                <Flower2 className="w-3.5 h-3.5" />
                <span>{currentLang === 'hi' ? 'दैनिक दिव्य शृंगार' : 'Daily Divya Shringar'}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-200 text-xs font-medium border border-white/20">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{shringarData.timeSlot}</span>
              </span>
            </div>

            {/* Top Right: Lightbox & Fullscreen Icon */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-[#c28227] transition shadow-md cursor-pointer border border-white/20"
                title={currentLang === 'hi' ? 'बड़ी तस्वीर देखें' : 'View Fullscreen'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Overlay: Sacred Chant and Date on Image */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{todayDateFormatted}</span>
              </div>
              <p className="text-xs sm:text-sm font-medium tracking-wide text-stone-200 font-hindi drop-shadow-md">
                {shringarData.chant}
              </p>
            </div>
          </div>

          {/* Right: Concise Details & Actions (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-4 bg-white">
            
            {/* Header info */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-[#c28227] text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentLang === 'hi' ? 'श्री गौरीशंकर बैकुंठनाथ धाम' : 'Gaurishankar Baikunthnath Dham'}</span>
                </div>
                
                <h3 className={`text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight ${
                  currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
                }`}>
                  {shringarData.title}
                </h3>
                
                <p className="text-xs text-[#c28227] font-semibold mt-0.5 font-hindi">
                  {shringarData.subtitle}
                </p>
              </div>

              {/* Short Spiritual Description */}
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                {shringarData.description}
              </p>

              {/* Key Shringar Highlights Compact 2-col Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                {shringarData.details.map((item, idx) => (
                  <div key={idx} className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/70">
                    <span className="text-[11px] font-bold text-stone-500 block uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-xs font-semibold text-stone-800 line-clamp-2 mt-0.5">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions: Download HD Darshan & Share */}
            <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{currentLang === 'hi' ? 'HD दर्शन डाउनलोड' : 'Download Photo'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition cursor-pointer border border-stone-200 flex items-center gap-1.5"
                title="Share"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? (currentLang === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (currentLang === 'hi' ? 'शेयर' : 'Share')}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox / Fullscreen Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={shringarData.image}
              alt={shringarData.title}
              className="w-full h-full object-contain max-h-[80vh]"
            />
            <div className="bg-stone-900/90 text-white p-3 text-center text-xs">
              <span className="font-bold">{shringarData.title}</span> • {todayDateFormatted} • {shringarData.timeSlot}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
