import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Loader2,
  AlertCircle,
  RefreshCw,
  CalendarCheck,
  CheckCircle2,
  X,
  IndianRupee,
  Tag,
} from 'lucide-react';
import {
  getAllPoojaApi,
  bookPoojaApi,
  verifyPoojaBookingApi,
} from '../../clientApi/allApi';
import { loadRazorpayScript } from '../../../utils/loadRazorpay';

const EMPTY_PAYER = { name: '', email: '', phone: '' };

// Local "today" as YYYY-MM-DD, used as the earliest selectable booking date.
const todayStr = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// The backend requires a 10–14 digit phone with no spaces/symbols and a name of
// at least 3 characters — mirror those rules client-side for a friendlier error.
function validateBooking(payer, quantity, bookingDate, isHi) {
  if (payer.name.trim().length < 3) {
    return isHi ? 'कृपया कम से कम 3 अक्षरों का नाम दर्ज करें।' : 'Please enter a name of at least 3 characters.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payer.email.trim())) {
    return isHi ? 'कृपया एक मान्य ईमेल दर्ज करें।' : 'Please enter a valid email address.';
  }
  if (!/^\d{10,14}$/.test(payer.phone.replace(/\D/g, ''))) {
    return isHi ? 'फोन नंबर में 10 से 14 अंक होने चाहिए।' : 'Phone number must contain 10–14 digits.';
  }
  if (!Number.isFinite(quantity) || quantity < 1) {
    return isHi ? 'मात्रा कम से कम 1 होनी चाहिए।' : 'Quantity must be at least 1.';
  }
  if (!bookingDate) {
    return isHi ? 'कृपया पूजा की तिथि चुनें।' : 'Please select a date for the pooja.';
  }
  if (bookingDate < todayStr()) {
    return isHi ? 'पूजा की तिथि भूतकाल की नहीं हो सकती।' : 'The pooja date cannot be in the past.';
  }
  return '';
}

export default function PoojaBookingForm() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  // ── Catalogue state ─────────────────────────────────────────────
  const [poojas, setPoojas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // ── Booking modal state ─────────────────────────────────────────
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [payer, setPayer] = useState(EMPTY_PAYER);
  const [formError, setFormError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const fetchPoojas = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getAllPoojaApi();
      setPoojas(res?.data?.data ?? []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        (isHi ? 'पूजा सूची लोड करने में त्रुटि हुई।' : 'Failed to load the pooja list. Please try again.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [isHi]);

  useEffect(() => { fetchPoojas(); }, [fetchPoojas]);

  // ── Group the catalogue under its category ──────────────────────
  // The backend populates `category` to { _id, name }; legacy poojas without one
  // fall into an "Other" bucket. Order follows first appearance in the list.
  const [activeCat, setActiveCat] = useState('all');

  const groups = useMemo(() => {
    const map = new Map();
    for (const p of poojas) {
      const id = p.category?._id || 'uncategorized';
      const name = p.category?.name || (isHi ? 'अन्य' : 'Other');
      if (!map.has(id)) map.set(id, { id, name, items: [] });
      map.get(id).items.push(p);
    }
    return Array.from(map.values());
  }, [poojas, isHi]);

  const visibleGroups =
    activeCat === 'all' ? groups : groups.filter((g) => g.id === activeCat);

  const openBooking = (pooja) => {
    setSelectedPooja(pooja);
    setQuantity(1);
    setBookingDate('');
    setPayer(EMPTY_PAYER);
    setFormError('');
    setConfirmation(null);
  };

  const closeModal = () => {
    if (isProcessing) return; // don't let the user close mid-payment
    setSelectedPooja(null);
    setConfirmation(null);
    setFormError('');
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedPooja) return;

    const validationError = validateBooking(payer, quantity, bookingDate, isHi);
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

      // 1. Create the booking + Razorpay order on the server. The server prices
      //    the order and returns the checkout handshake (amount is in paise).
      const res = await bookPoojaApi({
        poojaId: selectedPooja._id,
        quantity,
        bookingDate,
        payer: {
          name: payer.name.trim(),
          email: payer.email.trim(),
          phone: payer.phone.replace(/\D/g, ''),
        },
      });
      const order = res?.data?.data;
      if (!order?.orderId) {
        throw new Error(isHi ? 'बुकिंग बनाने में विफल।' : 'Failed to create the booking.');
      }

      // 2. Hand off to Razorpay Checkout. Pass the server's `amount` (paise)
      //    through untouched — do NOT recompute it here.
      const rzp = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'श्री गौरी शंकर बैकुंठ धाम',
        description: order.poojaName,
        prefill: {
          name: order.payer?.name || payer.name.trim(),
          email: order.payer?.email || payer.email.trim(),
          contact: order.payer?.phone || payer.phone.replace(/\D/g, ''),
        },
        theme: { color: '#c28227' },
        // Razorpay returns snake_case fields; the backend expects camelCase.
        handler: async (response) => {
          try {
            await verifyPoojaBookingApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setConfirmation({
              bookingId: order.bookingId,
              poojaName: order.poojaName,
              amount: order.amount,
              bookingDate,
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
          // The user dismissed the checkout without paying — re-enable the form.
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

  const total = selectedPooja ? selectedPooja.price * (quantity || 0) : 0;

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#c28227]/15 border border-[#c28227]/40 px-4 py-1.5 rounded-full text-[#965f16] text-xs font-bold tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>{isHi ? 'ऑनलाइन पूजा बुकिंग' : 'Book Online'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-hindi">
            {isHi ? 'ऑनलाइन पूजा एवं सेवा बुक करें' : 'Book a Pooja Online'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
            {isHi
              ? 'नीचे उपलब्ध पूजाओं में से चुनें और सुरक्षित भुगतान के साथ अपनी सेवा बुक करें।'
              : 'Choose from the poojas below and confirm your seva with a secure online payment.'}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-stone-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#c28227]" />
            <span className="text-sm font-medium">{isHi ? 'पूजा सूची लोड हो रही है…' : 'Loading available poojas…'}</span>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center py-14 gap-4">
            <div className="flex items-center gap-2 text-red-700 font-medium text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchPoojas}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold text-xs hover:brightness-110 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isHi ? 'पुनः प्रयास करें' : 'Retry'}</span>
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && poojas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-stone-500 gap-3">
            <CalendarCheck className="w-10 h-10 text-stone-300" />
            <p className="text-sm font-medium text-center">
              {isHi
                ? 'अभी ऑनलाइन बुकिंग के लिए कोई पूजा उपलब्ध नहीं है। कृपया बाद में पुनः देखें।'
                : 'No poojas are available for online booking yet. Please check back soon.'}
            </p>
          </div>
        )}

        {/* Category filter chips (shown when there's more than one category) */}
        {!isLoading && !error && groups.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCat('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition inline-flex items-center gap-1.5 ${
                activeCat === 'all'
                  ? 'bg-[#c28227] text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-[#c28227]'
              }`}
            >
              {isHi ? 'सभी' : 'All'}
              <span className={`text-[10px] px-1.5 rounded-full ${activeCat === 'all' ? 'bg-white/25' : 'bg-stone-100 text-stone-600'}`}>{poojas.length}</span>
            </button>
            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveCat(g.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition inline-flex items-center gap-1.5 font-hindi ${
                  activeCat === g.id
                    ? 'bg-[#c28227] text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-[#c28227]'
                }`}
              >
                {g.name}
                <span className={`text-[10px] px-1.5 rounded-full ${activeCat === g.id ? 'bg-white/25' : 'bg-stone-100 text-stone-600'}`}>{g.items.length}</span>
              </button>
            ))}
          </div>
        )}

        {/* Catalogue grouped by category — each pooja appears only under its own
            category heading. */}
        {!isLoading && !error && poojas.length > 0 && (
          <div className="space-y-10">
            {visibleGroups.map((group) => (
              <div key={group.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 text-[#965f16] font-hindi">
                    <Tag className="w-4 h-4 text-[#c28227]" />
                    <h3 className="text-lg sm:text-xl font-extrabold">{group.name}</h3>
                  </div>
                  <span className="text-xs font-bold text-stone-400">
                    {group.items.length} {isHi ? 'पूजाएं' : group.items.length === 1 ? 'pooja' : 'poojas'}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#c28227]/40 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((pooja) => (
                    <div
                      key={pooja._id}
                      className="bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1 hover:border-[#c28227]"
                    >
                      {pooja.imageUrl && (
                        <div className="h-40 w-full overflow-hidden bg-stone-100">
                          <img
                            src={pooja.imageUrl}
                            alt={pooja.poojaName}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#c28227] transition-colors font-hindi">
                          {pooja.poojaName}
                        </h3>
                        {pooja.description && (
                          <p className="text-xs text-stone-600 mt-1.5 leading-relaxed line-clamp-3 flex-1">
                            {pooja.description}
                          </p>
                        )}
                        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                          <span className="inline-flex items-center text-lg font-extrabold text-[#c28227]">
                            <IndianRupee className="w-4 h-4" />
                            {pooja.price?.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => openBooking(pooja)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold text-xs hover:brightness-110 shadow-sm transition"
                          >
                            <CalendarCheck className="w-4 h-4" />
                            <span>{isHi ? 'बुक करें' : 'Book Now'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking / Payment Modal */}
      {selectedPooja && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c28227]" />
                <span>{isHi ? 'पूजा बुकिंग' : 'Pooja Booking'}</span>
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
                  {isHi ? 'बुकिंग सफल रही!' : 'Booking Confirmed!'}
                </h4>
                <p className="text-sm text-stone-600">
                  {isHi ? 'आपकी पूजा' : 'Your'}{' '}
                  <span className="font-bold text-[#965f16]">{confirmation.poojaName}</span>{' '}
                  {isHi ? 'बुकिंग की पुष्टि हो गई है। रसीद ईमेल पर भेजी जाएगी।'
                        : 'booking is confirmed. A receipt will be emailed to you.'}
                </p>
                {confirmation.bookingDate && (
                  <div className="text-xs text-stone-500">
                    {isHi ? 'पूजा तिथि:' : 'Pooja Date:'}{' '}
                    <span className="font-bold text-stone-700">{confirmation.bookingDate}</span>
                  </div>
                )}
                <div className="text-xs text-stone-500">
                  {isHi ? 'बुकिंग आईडी:' : 'Booking ID:'}{' '}
                  <span className="font-mono font-bold text-stone-700">{confirmation.bookingId}</span>
                </div>
                <button
                  onClick={closeModal}
                  className="w-full py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-sm hover:brightness-110 transition"
                >
                  {isHi ? 'बंद करें' : 'Done'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-3.5 text-xs">
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                  <div className="font-extrabold text-[#965f16] text-sm font-hindi">{selectedPooja.poojaName}</div>
                  <div className="text-stone-600 mt-0.5 inline-flex items-center">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {selectedPooja.price?.toLocaleString('en-IN')} {isHi ? '/ प्रति' : '/ each'}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'यजमान का नाम' : 'Full Name'} *</label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">{isHi ? 'पूजा की तिथि' : 'Pooja Date'} *</label>
                    <input
                      type="date"
                      required
                      min={todayStr()}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">{isHi ? 'मात्रा' : 'Quantity'} *</label>
                    <input
                      type="number"
                      min={1}
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-600">{isHi ? 'कुल राशि' : 'Total'}</span>
                  <span className="inline-flex items-center text-lg font-extrabold text-emerald-700">
                    <IndianRupee className="w-4 h-4" />
                    {total.toLocaleString('en-IN')}
                  </span>
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
                      <IndianRupee className="w-4 h-4" />
                      <span>{isHi ? `भुगतान करें ₹${total.toLocaleString('en-IN')}` : `Pay ₹${total.toLocaleString('en-IN')}`}</span>
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
