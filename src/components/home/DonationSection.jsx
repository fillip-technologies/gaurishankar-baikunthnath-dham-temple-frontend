import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HeartHandshake,
  Building,
  Utensils,
  Sun,
  BookOpen,
  IndianRupee,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import { createDonationOrderApi, verifyDonationApi } from '../clientApi/allApi';
import { loadRazorpayScript } from '../../utils/loadRazorpay';
import BankDonationSection from './BankDonationSection';
import sacredDiyaBg from '../../assets/home/sacred_diya_temple_bg.jpg';

const EMPTY_PAYER = { name: '', email: '', phone: '' };

// Preset amounts (in rupees) offered as quick-select chips.
const QUICK_AMOUNTS = [501, 1100, 2100, 5100, 11000];

export const ALL_CAUSES = [
  { id: 'temple-construction', en: 'Temple Construction Nidhi', hi: 'मंदिर निर्माण निधि', Icon: Building },
  { id: 'anna-daan', en: 'Nitya Anna Daan Seva', hi: 'नित्य अन्नदान सेवा', Icon: Utensils },
  { id: 'gau-seva', en: 'Gau Seva & Chara Fund', hi: 'गौ सेवा एवं चारा कोष', Icon: Sun },
  { id: 'veda-pathshala', en: 'Vidyarthi Seva & Veda Pathshala', hi: 'वेद पाठशाला एवं विद्यार्थी सेवा', Icon: BookOpen },
];

// Mirror the backend rules client-side for friendlier errors: name ≥ 2 chars,
// a valid email, a 10–14 digit phone, and a donation of at least ₹1.
function validateDonation(payer, amount, isHi) {
  if (payer.name.trim().length < 2) {
    return isHi ? 'कृपया कम से कम 2 अक्षरों का नाम दर्ज करें।' : 'Please enter a name of at least 2 characters.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payer.email.trim())) {
    return isHi ? 'कृपया एक मान्य ईमेल दर्ज करें।' : 'Please enter a valid email address.';
  }
  if (!/^\d{10,14}$/.test(payer.phone.replace(/\D/g, ''))) {
    return isHi ? 'फोन नंबर में 10 से 14 अंक होने चाहिए।' : 'Phone number must contain 10–14 digits.';
  }
  if (!Number.isFinite(amount) || amount < 1) {
    return isHi ? 'दान राशि कम से कम ₹1 होनी चाहिए।' : 'Donation amount must be at least ₹1.';
  }
  return '';
}

export default function DonationSection({ causes = ALL_CAUSES }) {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [isOpen, setIsOpen] = useState(false);
  const [cause, setCause] = useState(causes[0]);
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState(EMPTY_PAYER);
  const [formError, setFormError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const openForm = (selectedCause) => {
    setCause(selectedCause || causes[0]);
    setAmount('');
    setPayer(EMPTY_PAYER);
    setFormError('');
    setConfirmation(null);
    setIsOpen(true);
  };

  const closeModal = () => {
    if (isProcessing) return; // don't let the user close mid-payment
    setIsOpen(false);
    setConfirmation(null);
    setFormError('');
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    const rupees = Number(amount);
    const validationError = validateDonation(payer, rupees, isHi);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError('');
    setIsProcessing(true);

    try {
      const ok = await loadRazorpayScript();
      if (!ok || !window.Razorpay) {
        throw new Error(
          isHi ? 'भुगतान गेटवे लोड नहीं हो सका। इंटरनेट कनेक्शन जांचें।'
               : 'Could not load the payment gateway. Check your connection and retry.',
        );
      }

      // 1. Create the Razorpay order + a "donation" Payment on the server. The donor
      //    chooses the amount, so we send it in paise (₹ × 100). The chosen cause
      //    rides along in `notes` and lands on the Payment record.
      const res = await createDonationOrderApi({
        amount: Math.round(rupees * 100),
        payer: {
          name: payer.name.trim(),
          email: payer.email.trim(),
          phone: payer.phone.replace(/\D/g, ''),
        },
        notes: { cause: cause.en },
      });
      const order = res?.data?.data;
      if (!order?.orderId) {
        throw new Error(isHi ? 'दान आदेश बनाने में विफल।' : 'Failed to create the donation order.');
      }

      // 2. Hand off to Razorpay Checkout. Pass the server's `amount` (paise)
      //    through untouched — do NOT recompute it here.
      const rzp = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'श्री गौरी शंकर बैकुंठ धाम',
        description: `${isHi ? 'दान' : 'Donation'} · ${isHi ? cause.hi : cause.en}`,
        prefill: {
          name: order.payer?.name || payer.name.trim(),
          email: order.payer?.email || payer.email.trim(),
          contact: order.payer?.phone || payer.phone.replace(/\D/g, ''),
        },
        theme: { color: '#c28227' },
        // Razorpay returns snake_case fields; the backend expects camelCase.
        handler: async (response) => {
          try {
            await verifyDonationApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setConfirmation({
              amount: rupees,
              cause: isHi ? cause.hi : cause.en,
              paymentId: response.razorpay_payment_id,
            });
          } catch (verifyErr) {
            setFormError(
              verifyErr?.response?.data?.message ||
              (isHi ? 'भुगतान सत्यापन विफल रहा। सहायता के लिए संपर्क करें।'
                    : 'Payment verification failed. Please contact the temple office.'),
            );
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      });

      rzp.on('payment.failed', (resp) => {
        setFormError(
          resp?.error?.description ||
          (isHi ? 'भुगतान असफल रहा। कृपया पुनः प्रयास करें।' : 'Payment failed. Please try again.'),
        );
        setIsProcessing(false);
      });

      rzp.open();
    } catch (err) {
      setFormError(
        err?.response?.data?.message || err?.message ||
        (isHi ? 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।' : 'Something went wrong. Please try again.'),
      );
      setIsProcessing(false);
    }
  };

  return (
    // Multiple ids so every donate entry point (Hero/TopNavbar #donate, Footer
    // #donate-section, Navbar online-donation-section / seva-daan-section) lands here.
    <section
      id="donate"
      className="w-full bg-gradient-to-b from-[#fdfbf6] via-[#f7efe0] to-[#f4e9d5] text-stone-900 py-14 sm:py-20 relative overflow-hidden border-y-2 border-[#dca64d] shadow-inner"
    >
      <span id="donate-section" className="absolute -top-24" aria-hidden="true" />
      <span id="online-donation-section" className="absolute -top-24" aria-hidden="true" />
      <span id="seva-daan-section" className="absolute -top-24" aria-hidden="true" />

      {/* ── Sacred Diya & Temple Watermark Background Artwork ── */}
      <div className="absolute left-0 bottom-0 top-0 w-full lg:w-1/2 opacity-35 sm:opacity-45 pointer-events-none overflow-hidden z-0">
        <img
          src={sacredDiyaBg}
          alt="Sacred Diya Background Art"
          className="w-full h-full object-cover object-left-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f7efe0]/70 to-[#f7efe0]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4e9d5] via-transparent to-[#fdfbf6]/70" />
      </div>

      {/* Subtle Background Sacred Mandir & Mandala Motif */}
      <div className="absolute top-0 right-0 w-[460px] h-[460px] opacity-10 pointer-events-none z-0 translate-x-20 -translate-y-20">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 -translate-x-20 translate-y-20">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#7a1615] drop-shadow-xs ${isHi ? 'font-yatra' : 'font-cinzel'}`}>
            {t('donation.title', isHi ? 'सेवा में सहभागी बनें' : 'Support the Temple')}
          </h2>
          <p className="text-sm sm:text-base text-stone-700 max-w-2xl mx-auto font-hindi leading-relaxed">
            {t(
              'donation.subtitle',
              isHi
                ? 'आपका समर्पण मंदिर निर्माण, नित्य अन्नदान, गौसेवा एवं वेद पाठशाला को समर्पित है। प्रत्येक दान 80G आयकर छूट हेतु पात्र है।'
                : 'Your contribution powers temple construction, daily Anna Daan, Gau Seva and the Veda Pathshala. Every donation is eligible for an 80G tax receipt.',
            )}
          </p>
        </div>

        {/* 4 Seva Cause Cards (Integrated Ivory & Golden Theme) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {causes.map((c) => (
            <div
              key={c.id}
              className="bg-white/95 rounded-2xl border border-[#e4cb9c] p-5 flex flex-col gap-3.5 shadow-md hover:shadow-xl hover:border-[#c28227] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd778] via-[#e5a83b] to-[#b8781c] p-0.5 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] bg-[#fbf5e6] flex items-center justify-center text-[#842c2b]">
                  <c.Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-extrabold text-stone-900 font-hindi text-sm sm:text-[15px] leading-snug group-hover:text-[#842c2b] transition-colors">
                {isHi ? c.hi : c.en}
              </h3>
              <button
                type="button"
                onClick={() => openForm(c)}
                className="mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#842c2b] to-[#6d1b1a] hover:from-[#6d1b1a] hover:to-[#551312] text-white font-bold text-xs shadow-md transition cursor-pointer active:scale-95"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>{isHi ? 'दान करें' : 'Donate'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Direct Bank Transfer & QR Code Section (Image 2 Reference UI) */}
        <BankDonationSection onOpenOnlineModal={() => openForm(causes[0])} />
      </div>

      {/* Donation / Payment Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-stone-900">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c28227]" />
                <span>{isHi ? 'दान / समर्पण' : 'Make a Donation'}</span>
              </h3>
              <button
                onClick={closeModal}
                disabled={isProcessing}
                className="text-stone-400 hover:text-stone-700 transition disabled:opacity-40"
                aria-label={isHi ? 'बंद करें' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Confirmation view */}
            {confirmation ? (
              <div className="text-center space-y-4 py-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-extrabold text-stone-900">
                  {isHi ? 'दान के लिए धन्यवाद!' : 'Thank you for your donation!'}
                </h4>
                <p className="text-sm text-stone-600">
                  {isHi ? 'आपका' : 'Your'}{' '}
                  <span className="font-bold text-emerald-700">₹{confirmation.amount.toLocaleString('en-IN')}</span>{' '}
                  {isHi ? `का समर्पण (${confirmation.cause}) प्राप्त हुआ। रसीद ईमेल पर भेजी जाएगी।`
                        : `donation for ${confirmation.cause} was received. A receipt will be emailed to you.`}
                </p>
                <div className="text-xs text-stone-500">
                  {isHi ? 'भुगतान आईडी:' : 'Payment ID:'}{' '}
                  <span className="font-mono font-bold text-stone-700">{confirmation.paymentId}</span>
                </div>
                <button
                  onClick={closeModal}
                  className="w-full py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-sm hover:brightness-110 transition"
                >
                  {isHi ? 'बंद करें' : 'Done'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonate} className="space-y-3.5 text-xs">
                {/* Cause selector */}
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'दान प्रयोजन' : 'Seva Cause'} *</label>
                  <select
                    value={cause.id}
                    onChange={(e) => setCause(causes.find((c) => c.id === e.target.value) || causes[0])}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  >
                    {causes.map((c) => (
                      <option key={c.id} value={c.id}>{isHi ? c.hi : c.en}</option>
                    ))}
                  </select>
                </div>

                {/* Quick amount chips */}
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'राशि चुनें' : 'Choose Amount'} (₹)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {QUICK_AMOUNTS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setAmount(String(a))}
                        className={`px-3 py-1.5 rounded-lg font-bold border transition ${
                          Number(amount) === a
                            ? 'bg-[#c28227] text-white border-[#c28227]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-[#c28227]'
                        }`}
                      >
                        ₹{a.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="number"
                      min={1}
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={isHi ? 'अन्य राशि दर्ज करें' : 'Enter an amount'}
                      className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'दाता का नाम' : 'Full Name'} *</label>
                  <input
                    type="text"
                    required
                    value={payer.name}
                    onChange={(e) => setPayer((p) => ({ ...p, name: e.target.value }))}
                    placeholder={isHi ? 'पूरा नाम' : 'e.g. Ramesh Chandra'}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">{isHi ? 'ईमेल' : 'Email'} *</label>
                    <input
                      type="email"
                      required
                      value={payer.email}
                      onChange={(e) => setPayer((p) => ({ ...p, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">{isHi ? 'फोन नंबर' : 'Phone'} *</label>
                    <input
                      type="tel"
                      required
                      value={payer.phone}
                      onChange={(e) => setPayer((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                    />
                  </div>
                </div>

                {formError && (
                  <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-sm hover:brightness-110 shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isHi ? 'प्रोसेसिंग…' : 'Processing…'}</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake className="w-4 h-4" />
                      <span>
                        {Number(amount) > 0
                          ? (isHi ? `दान करें ₹${Number(amount).toLocaleString('en-IN')}` : `Donate ₹${Number(amount).toLocaleString('en-IN')}`)
                          : (isHi ? 'दान करें' : 'Donate')}
                      </span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-stone-400 text-center">
                  {isHi ? 'भुगतान Razorpay द्वारा सुरक्षित रूप से संसाधित किया जाता है।'
                        : 'Payments are securely processed by Razorpay.'}
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
