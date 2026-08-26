import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Building2,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Check,
  Loader2,
  AlertCircle,
  RefreshCw,
  X,
  IndianRupee,
  BedDouble,
  Sparkles,
  CalendarCheck,
  Moon,
} from 'lucide-react';
import {
  getRoomAvailabilityApi,
  bookRoomApi,
  verifyRoomBookingApi,
} from '../../clientApi/allApi';
import { loadRazorpayScript } from '../../../utils/loadRazorpay';
import roomFallback from '../../../assets/home/herosection-3.png';

const EMPTY_PAYER = { name: '', email: '', phone: '' };

// Local date as YYYY-MM-DD (timezone-safe), for the date inputs' min + defaults.
const dateStr = (d) => {
  const x = new Date(d);
  x.setMinutes(x.getMinutes() - x.getTimezoneOffset());
  return x.toISOString().slice(0, 10);
};
const todayStr = () => dateStr(new Date());
const tomorrowStr = () => dateStr(new Date(Date.now() + 24 * 60 * 60 * 1000));

// Whole nights between two YYYY-MM-DD strings (checkout exclusive).
const nightsBetween = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.round(ms / (24 * 60 * 60 * 1000));
};

// Mirror the backend rules client-side for friendlier errors: name ≥ 3 chars,
// a valid email, a 10–14 digit phone, and a quantity within what's available.
function validateBooking(payer, quantity, available, isHi) {
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
  if (quantity > available) {
    return isHi ? `केवल ${available} कक्ष उपलब्ध हैं।` : `Only ${available} room(s) available.`;
  }
  return '';
}

export default function RoomList() {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const currentLang = i18n.language || 'en';

  // ── Stay date range (drives availability + pricing) ─────────────
  const [checkIn, setCheckIn] = useState(todayStr());
  const [checkOut, setCheckOut] = useState(tomorrowStr());
  const nights = nightsBetween(checkIn, checkOut);

  // ── Catalogue state ─────────────────────────────────────────────
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // ── Booking modal state ─────────────────────────────────────────
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [payer, setPayer] = useState(EMPTY_PAYER);
  const [formError, setFormError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const fetchRooms = useCallback(async (ci, co) => {
    // Availability needs a valid range; a bad one just clears the list.
    if (nightsBetween(ci, co) < 1) {
      setRooms([]);
      setError(isHi ? 'चेक-आउट, चेक-इन के बाद होना चाहिए।' : 'Check-out must be after check-in.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await getRoomAvailabilityApi({ checkIn: ci, checkOut: co });
      setRooms(res?.data?.data ?? []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        (isHi ? 'कक्ष सूची लोड करने में त्रुटि हुई।' : 'Failed to load the room list. Please try again.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [isHi]);

  // Reload availability whenever the date range changes (and on mount).
  useEffect(() => { fetchRooms(checkIn, checkOut); }, [fetchRooms, checkIn, checkOut]);

  // Keep the range valid: choosing a check-in on/after the current check-out
  // pushes check-out to the next day.
  const handleCheckInChange = (val) => {
    setCheckIn(val);
    if (nightsBetween(val, checkOut) < 1) {
      setCheckOut(dateStr(new Date(new Date(val).getTime() + 24 * 60 * 60 * 1000)));
    }
  };

  const openBooking = (room) => {
    setSelectedRoom(room);
    setQuantity(1);
    setPayer(EMPTY_PAYER);
    setFormError('');
    setConfirmation(null);
  };

  const closeModal = () => {
    if (isProcessing) return; // don't let the user close mid-payment
    setSelectedRoom(null);
    setConfirmation(null);
    setFormError('');
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const available = selectedRoom.available ?? 0;
    const validationError = validateBooking(payer, quantity, available, isHi);
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
      //    the order (paise) and enforces availability.
      const res = await bookRoomApi({
        roomId: selectedRoom._id,
        quantity,
        checkIn,
        checkOut,
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
        description: order.roomType,
        prefill: {
          name: order.payer?.name || payer.name.trim(),
          email: order.payer?.email || payer.email.trim(),
          contact: order.payer?.phone || payer.phone.replace(/\D/g, ''),
        },
        theme: { color: '#c28227' },
        // Razorpay returns snake_case fields; the backend expects camelCase.
        handler: async (response) => {
          try {
            await verifyRoomBookingApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setConfirmation({
              bookingId: order.bookingId,
              roomType: order.roomType,
              amount: order.amount,
              quantity,
              nights: order.nights,
            });
            // Availability changed on the server — refresh for the same range.
            fetchRooms(checkIn, checkOut);
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

  // Total = price × rooms × nights (must match the server's paise calc).
  const total = selectedRoom ? (selectedRoom.price || 0) * (quantity || 0) * (nights || 0) : 0;

  const rules = [
    t('roomBookingPage.rules.0', 'Valid original Government Photo ID (Aadhaar, Voter ID, Driving License, Passport) is mandatory during check-in for all guests.'),
    t('roomBookingPage.rules.1', 'Smoking, consumption of alcohol, non-vegetarian food, and narcotics are strictly prohibited inside temple premises.'),
    t('roomBookingPage.rules.2', 'Hot water facility is available during morning hours (5:00 AM to 10:00 AM).'),
    t('roomBookingPage.rules.3', 'Pre-booking is recommended during peak festivals like Shravan Somvar, Shivratri, and Chhath Puja.'),
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">

        {/* Check-in / Check-out Timing Info Bar */}
        <div className="bg-gradient-to-r from-[#2a080d] via-[#38060d] to-[#2a080d] text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 rounded-2xl bg-[#c28227] text-white shrink-0 hidden sm:block">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-amber-300 font-hindi">
                <span>{t('roomBookingPage.checkinCheckout.checkin', 'Check-in Time')}: <strong className="text-white font-sans">{t('roomBookingPage.checkinCheckout.checkinVal', '12:00 PM')}</strong></span>
                <span className="text-amber-500">|</span>
                <span>{t('roomBookingPage.checkinCheckout.checkout', 'Check-out Time')}: <strong className="text-white font-sans">{t('roomBookingPage.checkinCheckout.checkoutVal', '11:00 AM')}</strong></span>
              </div>
              <p className="text-xs text-amber-100/80 font-hindi mt-1">
                {t('roomBookingPage.checkinCheckout.idProof', 'Govt Photo ID Required (Aadhaar / Voter ID / Passport)')}
              </p>
            </div>
          </div>

          <div className="bg-[#c28227]/30 border border-[#c28227] px-4 py-2 rounded-full text-[#ffd700] text-xs font-bold font-hindi flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Spiritual Temple Stay</span>
          </div>
        </div>

        {/* Stay date range — availability + prices below reflect these dates */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex items-center gap-2 text-[#965f16] font-bold shrink-0">
            <CalendarCheck className="w-5 h-5 text-[#c28227]" />
            <span className="text-sm font-hindi">{isHi ? 'अपने ठहरने की तिथियां चुनें' : 'Select your stay dates'}</span>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">{isHi ? 'चेक-इन' : 'Check-in'}</label>
              <input
                type="date"
                value={checkIn}
                min={todayStr()}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">{isHi ? 'चेक-आउट' : 'Check-out'}</label>
              <input
                type="date"
                value={checkOut}
                min={dateStr(new Date(new Date(checkIn).getTime() + 24 * 60 * 60 * 1000))}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
            </div>
          </div>
          {nights > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-[#965f16] border border-amber-200 font-bold text-sm shrink-0 self-center sm:self-end">
              <Moon className="w-4 h-4" />
              {nights} {isHi ? (nights === 1 ? 'रात' : 'रातें') : (nights === 1 ? 'night' : 'nights')}
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-stone-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#c28227]" />
            <span className="text-sm font-medium">{isHi ? 'कक्ष सूची लोड हो रही है…' : 'Loading available rooms…'}</span>
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
              onClick={() => fetchRooms(checkIn, checkOut)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold text-xs hover:brightness-110 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isHi ? 'पुनः प्रयास करें' : 'Retry'}</span>
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && rooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-stone-500 gap-3">
            <BedDouble className="w-10 h-10 text-stone-300" />
            <p className="text-sm font-medium text-center">
              {isHi
                ? 'अभी ऑनलाइन बुकिंग के लिए कोई कक्ष उपलब्ध नहीं है। कृपया बाद में पुनः देखें।'
                : 'No rooms are available for online booking yet. Please check back soon.'}
            </p>
          </div>
        )}

        {/* Room Stay Grid (dynamic) */}
        {!isLoading && !error && rooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {rooms.map((room) => {
              // `available` comes from the availability endpoint for the chosen range.
              const available = room.available ?? 0;
              const soldOut = available <= 0;
              const facilities = Array.isArray(room.facilities) ? room.facilities : [];
              return (
                <div
                  key={room._id}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]"
                >
                  <div>
                    {/* Room Image Container */}
                    <div className="relative h-60 w-full overflow-hidden bg-stone-950">
                      <img
                        src={room.imageUrl || roomFallback}
                        alt={room.roomType}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => { e.target.onerror = null; e.target.src = roomFallback; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Top Availability Badge */}
                      <div className="absolute top-3 left-3 right-3 flex justify-end items-center z-10">
                        <span className={`backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 font-hindi ${
                          soldOut
                            ? 'bg-red-900/70 text-red-100 border-red-500/40'
                            : 'bg-black/70 text-amber-200 border-amber-500/30'
                        }`}>
                          <Users className="w-3.5 h-3.5 text-amber-400" />
                          <span>
                            {soldOut
                              ? (isHi ? 'उपलब्ध नहीं' : 'Sold Out')
                              : `${available}/${room.totalRooms ?? available} ${isHi ? 'उपलब्ध' : 'available'}`}
                          </span>
                        </span>
                      </div>

                      {/* Bottom Room Name overlay */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className={`text-xl font-bold text-[#ffd700] drop-shadow-md ${currentLang === 'hi' ? 'font-sans' : 'font-cinzel'}`}>
                          {room.roomType}
                        </h3>
                      </div>
                    </div>

                    {/* Description & Amenities */}
                    <div className="p-6 space-y-4">
                      {room.description && (
                        <p className="text-stone-600 text-xs sm:text-sm font-hindi leading-relaxed">
                          {room.description}
                        </p>
                      )}

                      {facilities.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {facilities.map((amenity, idx) => (
                            <span
                              key={idx}
                              className="bg-amber-50 text-[#c28227] text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-200/80 flex items-center gap-1 font-hindi"
                            >
                              <Check className="w-3 h-3 text-[#c28227]" />
                              <span>{amenity}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price Tariff Footer + Book */}
                  <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex flex-wrap justify-between items-center gap-3 bg-stone-50/60">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                        {isHi ? 'शुल्क / रात' : 'Tariff / night'}
                      </span>
                      <span className="inline-flex items-center text-xl sm:text-2xl font-extrabold text-[#c28227] font-sans">
                        <IndianRupee className="w-5 h-5" />
                        {room.price?.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      onClick={() => openBooking(room)}
                      disabled={soldOut}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-xs sm:text-sm hover:brightness-110 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <BedDouble className="w-4 h-4" />
                      <span>{soldOut ? (isHi ? 'उपलब्ध नहीं' : 'Sold Out') : (isHi ? 'बुक करें' : 'Book Now')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Guidelines & Rules Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
            <div className="p-2 rounded-xl bg-[#c28227] text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-hindi">
              {t('roomBookingPage.rulesTitle', 'Important Yatri Niwas Guidelines & Rules')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-700 font-hindi leading-relaxed">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-200/50">
                <CheckCircle2 className="w-4 h-4 text-[#c28227] shrink-0 mt-0.5" />
                <p>{rule}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Booking / Payment Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c28227]" />
                <span>{isHi ? 'कक्ष बुकिंग' : 'Room Booking'}</span>
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
                  {isHi ? 'आपका' : 'Your'}{' '}
                  <span className="font-bold text-[#965f16]">{confirmation.roomType}</span>{' '}
                  {isHi ? 'कक्ष बुकिंग की पुष्टि हो गई है। रसीद ईमेल पर भेजी जाएगी।'
                        : 'room booking is confirmed. A receipt will be emailed to you.'}
                </p>
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
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-[#965f16] text-sm font-hindi">{selectedRoom.roomType}</div>
                    <span className="text-[11px] font-bold text-emerald-700">
                      {selectedRoom.available} {isHi ? 'उपलब्ध' : 'available'}
                    </span>
                  </div>
                  <div className="text-stone-600 flex items-center gap-1.5 text-[11px]">
                    <CalendarCheck className="w-3.5 h-3.5 text-[#c28227]" />
                    <span className="font-semibold">{checkIn}</span>
                    <span>→</span>
                    <span className="font-semibold">{checkOut}</span>
                    <span className="text-stone-400">· {nights} {isHi ? (nights === 1 ? 'रात' : 'रातें') : (nights === 1 ? 'night' : 'nights')}</span>
                  </div>
                  <div className="text-stone-600 inline-flex items-center text-[11px]">
                    <IndianRupee className="w-3 h-3" />
                    {selectedRoom.price?.toLocaleString('en-IN')} {isHi ? '/ रात प्रति कक्ष' : '/ night per room'}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'अतिथि का नाम' : 'Full Name'} *</label>
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

                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'कक्षों की संख्या' : 'Number of Rooms'} *</label>
                  <input
                    type="number"
                    min={1}
                    max={selectedRoom.available || 1}
                    required
                    value={quantity}
                    onChange={(e) => {
                      const max = selectedRoom.available || 1;
                      const val = parseInt(e.target.value, 10) || 1;
                      setQuantity(Math.min(Math.max(1, val), max));
                    }}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
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
