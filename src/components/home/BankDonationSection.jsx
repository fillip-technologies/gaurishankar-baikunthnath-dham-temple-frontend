import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Building2,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Flame,
  HeartHandshake,
  Users,
  Sparkles,
  X,
  CreditCard,
  Smartphone,
  Globe,
  User,
  Landmark,
} from 'lucide-react';
import qrCodeImg from '../../assets/home/pnb_qr_code.png';
import fullScannerPoster from '../../assets/scanner.jpg';

export default function BankDonationSection({ onOpenOnlineModal, showTrustBar = false }) {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [copiedKey, setCopiedKey] = useState(null);
  const [showFullPoster, setShowFullPoster] = useState(false);

  const bankDetails = {
    accountName: 'Shree Gauri Shankar Baikunthnath Mandir',
    accountNameHi: 'श्री गौरीशंकर वैकुंठनाथ मंदिर न्यास',
    accountNumber: '34759816285',
    ifscCode: 'PUNB0000064',
    bankName: 'Punjab National Bank',
    bankNameHi: 'पंजाब नैशनल बैंक',
    branch: 'Baikathpur / Patna Branch',
    branchHi: 'बैकठपुर / पटना शाखा',
    upiId: '8809812938m@pnb',
  };

  const handleCopy = (text, key) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  return (
    <div className="w-full pt-10 sm:pt-14 space-y-8">
      {/* Decorative Section Divider / Header */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto pt-6 border-t border-[#e4cb9c]">
        <div className="flex items-center justify-center gap-3 text-[#c28227]">
          <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#c28227]" />
          <span className="font-mantra text-sm sm:text-base tracking-widest text-[#842c2b] font-bold">
            ॥ दानं परमं धर्मः ॥
          </span>
          <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#c28227]" />
        </div>
        <h3 className={`text-2xl sm:text-3xl lg:text-[30px] font-bold text-[#7a1615] ${
          isHi ? 'font-yatra' : 'font-cinzel'
        }`}>
          {isHi ? 'बैंक खाता एवं क्यूआर कोड द्वारा सीधा दान' : 'Direct Bank Transfer & QR Code'}
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 font-hindi leading-relaxed">
          {isHi
            ? 'आप मंदिर न्यास के अधिकृत बैंक खाते में सीधे NEFT / RTGS / IMPS या आधिकारिक UPI QR कोड स्कैन करके भी दान कर सकते हैं।'
            : 'You can also donate directly to the official Mandir Trust account via NEFT / RTGS / IMPS or by scanning the UPI QR code.'}
        </p>
      </div>

      {/* ─── 2-Card Main Grid (Bank & QR + Account Details) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch relative z-10">
        
        {/* ── CARD 1: Bank & QR Payment Card (lg:col-span-6) ── */}
        <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e4cb9c] shadow-xl bg-[#fffefb] text-stone-900 flex flex-col justify-between">
          
          {/* PNB Burgundy Top Header Banner */}
          <div className="bg-gradient-to-r from-[#7a0f1d] via-[#8c1424] to-[#6b0d19] text-white px-5 sm:px-6 py-3.5 flex items-center justify-between border-b-2 border-[#e5a83b] relative overflow-hidden">
            {/* Background Trishul Motif Watermark */}
            <div className="absolute right-3 -bottom-4 opacity-15 pointer-events-none">
              <svg className="w-24 h-24 text-amber-300 fill-current" viewBox="0 0 24 24">
                <path d="M11 2v4.07C8.6 6.55 6.64 8.24 6.13 10.5L3 10v2l3.13-.5c.51 2.26 2.47 3.95 4.87 4.43V22h2v-6.07c2.4-.48 4.36-2.17 4.87-4.43L21 12v-2l-3.13.5c-.51-2.26-2.47-3.95-4.87-4.43V2h-2zm1 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
              </svg>
            </div>

            {/* PNB Emblem & Bank Title */}
            <div className="flex items-center gap-3 relative z-10">
              {/* Official PNB Yellow Square Logo Badge */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#ffcb05] flex items-center justify-center shadow-md shrink-0 border border-amber-300">
                <span className="text-[#8c1424] font-black text-xl sm:text-2xl leading-none font-hindi">
                  पं
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base leading-tight font-hindi tracking-wide text-white">
                  पंजाब नैशनल बैंक
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-amber-200 tracking-wider uppercase font-sans">
                  punjab national bank
                </span>
              </div>
            </div>

            <div className="hidden sm:block text-right relative z-10">
              <span className="text-[9.5px] italic text-amber-200/90 tracking-wide font-sans block">
                ...the name you can BANK upon !
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Header text */}
            <p className="text-xs sm:text-[13px] font-semibold text-stone-800 font-hindi leading-snug">
              {isHi
                ? 'मंदिर न्यास समिति के खाते में दान करने के लिए अब अधिक आसान और सुरक्षित माध्यम:'
                : 'An easy, transparent and secure medium to donate directly to the Mandir Trust Account:'}
            </p>

            {/* Two-part layout: Left payment modes + Right QR Card */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              
              {/* Payment modes list (sm:col-span-5) */}
              <div className="sm:col-span-5 space-y-2.5">
                {[
                  { icon: ShieldCheck, title: 'NEFT / RTGS / UPI', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                  { icon: Globe, title: 'Online Banking', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
                  { icon: Smartphone, title: 'Mobile Banking', bg: 'bg-blue-50 text-blue-800 border-blue-200' },
                  { icon: QrCode, title: 'QR Scan Payment', bg: 'bg-rose-50 text-rose-800 border-rose-200' },
                ].map((mode, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold shadow-2xs transition-transform hover:translate-x-1 ${mode.bg}`}
                  >
                    <mode.icon className="w-4 h-4 shrink-0" />
                    <span className="font-sans whitespace-nowrap">{mode.title}</span>
                  </div>
                ))}

                {/* Direct CTA button to pay online via Razorpay Gateway */}
                {onOpenOnlineModal && (
                  <button
                    type="button"
                    onClick={onOpenOnlineModal}
                    className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#842c2b] to-[#6d1b1a] hover:from-[#6d1b1a] hover:to-[#551312] text-white text-[11px] font-bold shadow-sm transition cursor-pointer active:scale-95"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isHi ? 'ऑनलाइन गेटवे से दान करें' : 'Donate via Gateway'}</span>
                  </button>
                )}

                {/* Direct CTA button to view merchant poster */}
                <button
                  type="button"
                  onClick={() => setShowFullPoster(true)}
                  className="w-full mt-1.5 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#842c2b]/30 hover:bg-[#842c2b]/10 text-[#842c2b] text-[11px] font-bold shadow-2xs transition cursor-pointer active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isHi ? 'पूरा क्यूआर पोस्टर देखें' : 'View Full QR Poster'}</span>
                </button>
              </div>

              {/* QR Code Framed Card (sm:col-span-7) */}
              <div className="sm:col-span-7 bg-[#fffaf0] rounded-2xl border-2 border-dashed border-[#dca64d] p-3.5 flex flex-col items-center text-center shadow-sm relative group">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#842c2b] mb-1 font-sans">
                  — Scan & Donate —
                </span>

                {/* QR Code Image with center PNB emblem */}
                <div
                  onClick={() => setShowFullPoster(true)}
                  className="relative w-36 h-36 sm:w-40 sm:h-40 bg-white p-2 rounded-xl border border-stone-300 shadow-sm cursor-pointer group-hover:border-[#c28227] transition-all"
                  title={isHi ? 'बड़ा करने के लिए क्लिक करें' : 'Click to enlarge'}
                >
                  <img
                    src={qrCodeImg}
                    alt="PNB UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                  {/* PNB Center Logo on QR Code */}
                  <div className="absolute inset-0 m-auto w-7 h-7 rounded-md bg-[#ffcb05] border-2 border-white shadow flex items-center justify-center">
                    <span className="text-[#8c1424] font-black text-xs font-hindi leading-none">
                      पं
                    </span>
                  </div>
                </div>

                {/* Bank Name & UPI ID */}
                <div className="mt-2 space-y-0.5 w-full">
                  <p className="text-[11px] font-bold text-stone-800">Punjab National Bank</p>
                  <div className="flex items-center justify-center gap-1 bg-white px-2 py-1 rounded-lg border border-amber-200 shadow-2xs">
                    <span className="text-[10.5px] font-mono font-bold text-[#842c2b] select-all truncate max-w-[140px] sm:max-w-[160px]">
                      {bankDetails.upiId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(bankDetails.upiId, 'upi')}
                      className="p-1 hover:bg-amber-100 rounded text-stone-600 hover:text-[#842c2b] transition cursor-pointer shrink-0"
                      title={copiedKey === 'upi' ? 'Copied!' : 'Copy UPI ID'}
                    >
                      {copiedKey === 'upi' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Supported UPI Apps Badges */}
                <div className="mt-2.5 pt-2 border-t border-amber-200/70 w-full flex flex-col items-center gap-1">
                  <span className="text-[9.5px] font-bold text-stone-500 font-sans">
                    Scan with any UPI App
                  </span>
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
                    {/* PhonePe badge */}
                    <span className="px-1.5 py-0.5 rounded bg-[#5f259f] text-white text-[9px] font-bold">
                      PhonePe
                    </span>
                    {/* Google Pay badge */}
                    <span className="px-1.5 py-0.5 rounded bg-stone-900 text-white text-[9px] font-bold flex items-center gap-0.5">
                      <span className="text-blue-400">G</span>Pay
                    </span>
                    {/* Paytm badge */}
                    <span className="px-1.5 py-0.5 rounded bg-[#00b9f5] text-white text-[9px] font-bold">
                      Paytm
                    </span>
                    {/* BHIM badge */}
                    <span className="px-1.5 py-0.5 rounded bg-[#00843d] text-white text-[9px] font-bold">
                      BHIM
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-[#fcf8ef] px-5 py-2.5 border-t border-amber-200/80 text-center">
            <span className="text-[11px] font-semibold text-amber-900 font-hindi">
              {isHi
                ? 'दान उपरांत अपनी रसीद हेतु स्क्रीनशॉट मंदिर कार्यालय को प्रेषित करें।'
                : 'For receipt, kindly share the payment confirmation with the temple office.'}
            </span>
          </div>
        </div>

        {/* ── CARD 2: Bank Account Details Card (lg:col-span-6) ── */}
        <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e4cb9c] shadow-xl bg-[#fffefb] text-stone-900 flex flex-col justify-between">
          
          {/* Maroon Curved Header */}
          <div className="bg-gradient-to-r from-[#6b1615] via-[#842c2b] to-[#6b1615] text-white px-5 sm:px-6 py-4 flex items-center gap-3 border-b-2 border-[#e5a83b]">
            <div className="w-8 h-8 rounded-full bg-[#fcedc7] border border-[#d6a54d] flex items-center justify-center text-[#842c2b] shadow-sm shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-1.5 3-4.5 5.5-7 6.5 2 1.5 4.5 1.5 7-1 2.5 2.5 5 2.5 7 1-2.5-1-5.5-3.5-7-6.5zm-8.5 8c2.5 1 5 .5 7-1-1 3-3 5.5-6 6.5 0-2 .5-4-1-5.5zm17 0c-1.5 1.5-1 3.5-1 5.5-3-1-5-3.5-6-6.5 2 1.5 4.5 2 7 1zm-8.5 1.5c-2 2-4 2.5-6 2.5 1.5 2 3.5 3 6 4 2.5-1 4.5-2 6-4-2 0-4-.5-6-2.5z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg text-white font-hindi leading-tight">
                {isHi ? 'बैंक खाता विवरण' : 'Bank Account Details'}
              </h4>
              <span className="text-[10px] text-amber-200 tracking-wider uppercase font-sans">
                Official Trust Account
              </span>
            </div>
          </div>

          {/* Account Details List */}
          <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-center">
            
            {/* Field 1: Account Name */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#faf6ee] border border-amber-200/70 hover:bg-[#f6efe1] transition">
              <div className="w-9 h-9 rounded-full bg-[#fcedc7] border border-[#dca64d] text-[#842c2b] flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider block">
                  {isHi ? 'खाता धारक का नाम' : 'Account Name'}
                </span>
                <p className="text-xs sm:text-[13px] font-extrabold text-stone-900 leading-snug break-words">
                  {isHi ? bankDetails.accountNameHi : bankDetails.accountName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(bankDetails.accountName, 'accName')}
                className="p-1.5 rounded-lg hover:bg-amber-200 text-stone-600 hover:text-[#842c2b] transition cursor-pointer shrink-0"
                title={copiedKey === 'accName' ? 'Copied!' : 'Copy Name'}
              >
                {copiedKey === 'accName' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Field 2: Account Number */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf6ee] border border-amber-200/70 hover:bg-[#f6efe1] transition">
              <div className="w-9 h-9 rounded-full bg-[#fcedc7] border border-[#dca64d] text-[#842c2b] flex items-center justify-center shadow-xs shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider block">
                  {isHi ? 'खाता संख्या' : 'Account Number'}
                </span>
                <p className="text-sm sm:text-base font-black font-mono tracking-wider text-[#842c2b]">
                  {bankDetails.accountNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(bankDetails.accountNumber, 'accNo')}
                className="p-1.5 rounded-lg hover:bg-amber-200 text-stone-600 hover:text-[#842c2b] transition cursor-pointer shrink-0"
                title={copiedKey === 'accNo' ? 'Copied!' : 'Copy Account Number'}
              >
                {copiedKey === 'accNo' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Field 3: IFSC Code */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf6ee] border border-amber-200/70 hover:bg-[#f6efe1] transition">
              <div className="w-9 h-9 rounded-full bg-[#fcedc7] border border-[#dca64d] text-[#842c2b] flex items-center justify-center shadow-xs shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider block">
                  {isHi ? 'आईएफएससी कोड' : 'IFSC Code'}
                </span>
                <p className="text-sm sm:text-base font-black font-mono tracking-wider text-[#842c2b]">
                  {bankDetails.ifscCode}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(bankDetails.ifscCode, 'ifsc')}
                className="p-1.5 rounded-lg hover:bg-amber-200 text-stone-600 hover:text-[#842c2b] transition cursor-pointer shrink-0"
                title={copiedKey === 'ifsc' ? 'Copied!' : 'Copy IFSC'}
              >
                {copiedKey === 'ifsc' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Field 4: Bank Name & Branch */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#faf6ee] border border-amber-200/70 hover:bg-[#f6efe1] transition">
              <div className="w-9 h-9 rounded-full bg-[#fcedc7] border border-[#dca64d] text-[#842c2b] flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider block">
                  {isHi ? 'बैंक एवं शाखा' : 'Bank & Branch'}
                </span>
                <p className="text-xs sm:text-[13px] font-extrabold text-stone-900 leading-snug">
                  {isHi ? bankDetails.bankNameHi : bankDetails.bankName}
                </p>
                <span className="text-[11px] text-stone-600 block">
                  {isHi ? bankDetails.branchHi : bankDetails.branch}
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Reassurance Note with Diya */}
          <div className="bg-[#fcf8ef] p-4 border-t border-amber-200/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-2xs">
              <Flame className="w-4 h-4 animate-pulse" />
            </div>
            <p className="text-[11.5px] sm:text-xs text-stone-700 italic font-hindi leading-snug">
              {isHi
                ? 'आपका समर्पण मंदिर की निरंतर सेवा, पूजा एवं पवित्र परंपराओं को जीवंत रखता है।'
                : 'Your support keeps the temple service, rituals and sacred traditions alive.'}
            </p>
          </div>

        </div>

      </div>

      {/* ─── Bottom Trust & Transparency Bar (Golden Medallion Strip) ─── */}
      {showTrustBar && <TrustTransparencyBar />}

      {/* Lightbox Modal for Full Official Merchant Scanner Poster */}
      {showFullPoster && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden border-2 border-[#e5a83b] shadow-2xl flex flex-col items-center">
            
            {/* Modal Header */}
            <div className="w-full bg-[#8c1424] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#ffd700]" />
                <span className="font-bold text-sm sm:text-base font-hindi">
                  {isHi ? 'आधिकारिक मंदिर क्यूआर स्कैनर' : 'Official Temple QR Scanner'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowFullPoster(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Image */}
            <div className="p-4 sm:p-6 w-full max-h-[75vh] overflow-y-auto flex flex-col items-center">
              <img
                src={fullScannerPoster}
                alt="Shree Gauri Shankar Baikunthnath Mandir Official QR Scanner"
                className="w-full h-auto max-w-sm rounded-xl shadow-md border border-stone-200"
              />
            </div>

            {/* Modal Footer with UPI & Actions */}
            <div className="w-full bg-[#fdfaf3] border-t border-amber-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-600">UPI ID:</span>
                <span className="font-mono font-bold text-[#842c2b]">{bankDetails.upiId}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(bankDetails.upiId, 'modalUpi')}
                className="px-3 py-1.5 rounded-lg bg-[#842c2b] hover:bg-[#6b2221] text-white font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'modalUpi' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy UPI ID</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export function TrustTransparencyBar({ className = '' }) {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  return (
    <div className={`rounded-2xl sm:rounded-3xl border border-[#e4cb9c] bg-gradient-to-r from-[#fffcf5] via-[#fdf7ea] to-[#fffcf5] p-4 sm:p-5 shadow-md text-stone-900 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-amber-200/80">
        
        {/* Badge 1 */}
        <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#ffd778] via-[#e5a83b] to-[#b8781c] p-0.5 shadow-md shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#fbf5e6] flex items-center justify-center text-[#842c2b]">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-extrabold text-stone-900 leading-tight">
              {isHi ? '100% सुरक्षित भुगतान' : '100% Secure Transactions'}
            </p>
            <span className="text-[10px] sm:text-[11px] text-stone-600 font-hindi">
              {isHi ? 'सरकारी बैंक अधिकृत खाता' : 'Direct Verified Trust Account'}
            </span>
          </div>
        </div>

        {/* Badge 2 */}
        <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#ffd778] via-[#e5a83b] to-[#b8781c] p-0.5 shadow-md shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#fbf5e6] flex items-center justify-center text-[#842c2b]">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-extrabold text-stone-900 leading-tight">
              {isHi ? 'पारदर्शिता एवं विश्वास' : 'Transparency & Trust'}
            </p>
            <span className="text-[10px] sm:text-[11px] text-stone-600 font-hindi">
              {isHi ? '80G आयकर छूट प्राप्त' : 'Eligible for 80G Tax Exemption'}
            </span>
          </div>
        </div>

        {/* Badge 3 */}
        <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#ffd778] via-[#e5a83b] to-[#b8781c] p-0.5 shadow-md shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#fbf5e6] flex items-center justify-center text-[#842c2b]">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-extrabold text-stone-900 leading-tight">
              {isHi ? 'लाखों श्रद्धालुओं की सेवा' : 'Serving Millions'}
            </p>
            <span className="text-[10px] sm:text-[11px] text-stone-600 font-hindi">
              {isHi ? 'नित्य अन्नदान एवं गौ सेवा' : 'Daily Anna Daan & Gau Seva'}
            </span>
          </div>
        </div>

        {/* Badge 4 */}
        <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#ffd778] via-[#e5a83b] to-[#b8781c] p-0.5 shadow-md shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#fbf5e6] flex items-center justify-center text-[#842c2b]">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-extrabold text-stone-900 leading-tight">
              {isHi ? 'उज्ज्वल भविष्य का निर्माण' : 'Build a Better Tomorrow'}
            </p>
            <span className="text-[10px] sm:text-[11px] text-stone-600 font-hindi">
              {isHi ? 'सनातन संस्कृति का संवर्धन' : 'Sanatan Heritage & Education'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
