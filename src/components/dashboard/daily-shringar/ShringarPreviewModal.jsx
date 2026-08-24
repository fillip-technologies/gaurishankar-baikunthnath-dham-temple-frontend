import React from 'react';
import {
  X,
  Flower2,
  Calendar,
  Clock,
  Sparkles,
  Share2,
  Download,
  Flame,
  CheckCircle2,
  UserCheck
} from 'lucide-react';

export default function ShringarPreviewModal({ isOpen, onClose, shringarItem, isHi }) {
  if (!isOpen || !shringarItem) return null;

  const dateDisplay = new Date(shringarItem.date || Date.now()).toLocaleDateString(
    isHi ? 'hi-IN' : 'en-US',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fdfbf7] rounded-[32px] max-w-5xl w-full border border-amber-200/80 shadow-2xl overflow-hidden my-8 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header Bar */}
        <div className="bg-[#2a080d] px-6 py-4 flex items-center justify-between text-white border-b border-amber-500/20">
          <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-bold tracking-wider uppercase font-sans">
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span>{isHi ? 'सार्वजनिक वेबसाइट पूर्वावलोकन' : 'Public Website Live Preview'}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shringar Content Container */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main 2-Column Card Preview */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left Column: Shringar Image */}
            <div className="lg:col-span-7 relative group overflow-hidden bg-stone-900 flex items-center justify-center min-h-[380px] lg:min-h-[460px]">
              <img
                src={shringarItem.image}
                alt={shringarItem.titleEn || 'Aaj Ka Shringar'}
                className="w-full h-full object-cover object-center max-h-[520px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              {/* Top Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c28227] text-white text-xs font-bold shadow-md">
                  <Flower2 className="w-3.5 h-3.5" />
                  <span>{isHi ? 'दैनिक दिव्य शृंगार' : 'Daily Divya Shringar'}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-200 text-xs font-medium border border-white/20">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{shringarItem.timeSlot || '08:30 AM'}</span>
                </span>
              </div>

              {/* Bottom Image Info Banner */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{dateDisplay}</span>
                </div>
                <p className="text-xs text-stone-300 font-hindi">
                  {shringarItem.chant || '॥ ॐ नमः शिवाय • ॐ नमो भगवते वासुदेवाय ॥'}
                </p>
              </div>
            </div>

            {/* Right Column: Shringar Information */}
            <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-5 bg-white">
              
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-1 text-[#c28227] text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isHi ? 'श्री गौरीशंकर बैकुंठनाथ धाम' : 'Gaurishankar Baikunthnath Dham'}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-cinzel tracking-tight leading-tight">
                    {isHi ? shringarItem.titleHi || shringarItem.titleEn : shringarItem.titleEn}
                  </h3>

                  <p className="text-xs text-[#c28227] font-semibold mt-1 font-hindi">
                    {isHi ? shringarItem.subtitleHi || shringarItem.subtitleEn : shringarItem.subtitleEn}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                  {isHi ? shringarItem.descriptionHi || shringarItem.descriptionEn : shringarItem.descriptionEn}
                </p>

                {/* Offerings & Adornment Details */}
                <div className="space-y-2.5 pt-2 border-t border-stone-100">
                  <div className="bg-[#fefaf0] p-2.5 rounded-xl border border-amber-200/80 text-xs">
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">
                      {isHi ? 'पावन पुष्प' : 'Sacred Flowers'}
                    </span>
                    <span className="font-semibold text-stone-900">
                      {shringarItem.flowers || 'Lotus, Belpatra, Jasmine & Tulsi'}
                    </span>
                  </div>

                  <div className="bg-[#fefaf0] p-2.5 rounded-xl border border-amber-200/80 text-xs">
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">
                      {isHi ? 'चंदन व तिलक' : 'Chandan & Tilak'}
                    </span>
                    <span className="font-semibold text-stone-900">
                      {shringarItem.chandan || 'Pure Saffron Sandalwood & Bhasma'}
                    </span>
                  </div>

                  <div className="bg-[#fefaf0] p-2.5 rounded-xl border border-amber-200/80 text-xs">
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">
                      {isHi ? 'दिव्य परिधान' : 'Holy Silks & Crown'}
                    </span>
                    <span className="font-semibold text-stone-900">
                      {shringarItem.silks || 'Pitambar Golden Silks & Sacred Crown'}
                    </span>
                  </div>
                </div>

                {/* Head Priest Tag */}
                {shringarItem.priestName && (
                  <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
                    <UserCheck className="w-4 h-4 text-[#c28227]" />
                    <span>{isHi ? 'प्रधान अर्चक:' : 'Head Priest:'}</span>
                    <strong className="text-stone-900">{shringarItem.priestName}</strong>
                  </div>
                )}
              </div>

              {/* Footer actions inside card */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono">{shringarItem.darshanHours || '05:00 AM - 09:00 PM'}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                  {shringarItem.status || 'Published'}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition cursor-pointer"
          >
            {isHi ? 'बंद करें' : 'Close Preview'}
          </button>
        </div>

      </div>
    </div>
  );
}
