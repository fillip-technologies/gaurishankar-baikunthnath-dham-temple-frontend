import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Gift, Loader2, AlertCircle, CheckCircle2, RefreshCw,
  User, Phone, Mail, MapPin, Hash, Building2, Globe, Minus, Plus,
  IndianRupee,
} from 'lucide-react';
import { getAllPrasadApi, bookPrasadApi, verifyPrasadBookingApi } from '../../clientApi/allApi';
import { loadRazorpayScript } from '../../../utils/loadRazorpay';

const EMPTY_PAYER   = { name: '', email: '', phone: '' };
const EMPTY_ADDRESS = { line1: '', landmark: '', city: '', state: '', pincode: '' };

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan',
  'Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu',
  'Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry',
];

const inputCls = 'w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c28227] focus:bg-white transition';

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-stone-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-[10px] text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export default function PrasadBookingForm() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [prasadList, setPrasadList]     = useState([]);
  const [isCatalogueLoading, setIsCatalogueLoading] = useState(true);
  const [catalogueError, setCatalogueError]         = useState('');

  const [selectedPrasad, setSelectedPrasad] = useState(null);
  const [quantity, setQuantity]             = useState(0.5);  // kg
  const [payer, setPayer]                   = useState(EMPTY_PAYER);
  const [address, setAddress]               = useState(EMPTY_ADDRESS);
  const [errors, setErrors]                 = useState({});
  const [formError, setFormError]           = useState('');
  const [isProcessing, setIsProcessing]     = useState(false);
  const [confirmation, setConfirmation]     = useState(null);

  const fetchPrasad = useCallback(async () => {
    setIsCatalogueLoading(true);
    setCatalogueError('');
    try {
      const res = await getAllPrasadApi();
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setPrasadList(list);
      if (list.length > 0) setSelectedPrasad(list[0]);
    } catch {
      setCatalogueError(isHi ? 'प्रसाद सूची लोड नहीं हो सकी।' : 'Could not load prasad catalogue. Please try again.');
    } finally {
      setIsCatalogueLoading(false);
    }
  }, [isHi]);

  useEffect(() => { fetchPrasad(); }, [fetchPrasad]);

  const total = selectedPrasad ? (selectedPrasad.pricePerKg * quantity) : 0;

  const setQ = (val) => {
    const v = Math.min(5, Math.max(0.5, Math.round(val * 4) / 4));
    setQuantity(v);
  };

  const validate = () => {
    const e = {};
    if (!selectedPrasad) e.prasad = isHi ? 'प्रसाद चुनें।' : 'Select a prasad.';
    if (payer.name.trim().length < 3) e.name = isHi ? 'कम से कम 3 अक्षरों का नाम दर्ज करें।' : 'Name must be at least 3 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payer.email.trim())) e.email = isHi ? 'वैध ईमेल दर्ज करें।' : 'Enter a valid email.';
    if (!/^\d{10,14}$/.test(payer.phone.replace(/\D/g, ''))) e.phone = isHi ? '10–14 अंकों का फोन नंबर।' : 'Phone must be 10–14 digits.';
    if (address.line1.trim().length < 3) e.line1 = isHi ? 'पता दर्ज करें।' : 'Enter delivery address.';
    if (address.city.trim().length < 2) e.city = isHi ? 'शहर दर्ज करें।' : 'Enter city.';
    if (!address.state) e.state = isHi ? 'राज्य चुनें।' : 'Select state.';
    if (!/^\d{6}$/.test(address.pincode.trim())) e.pincode = isHi ? '6 अंकों का पिनकोड दर्ज करें।' : 'Enter a valid 6-digit pincode.';
    return e;
  };

  const handleBook = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFormError('');
    setIsProcessing(true);

    try {
      const ok = await loadRazorpayScript();
      if (!ok || !window.Razorpay)
        throw new Error(isHi ? 'भुगतान गेटवे लोड नहीं हो सका।' : 'Could not load payment gateway. Check your connection.');

      const res = await bookPrasadApi({
        prasadId: selectedPrasad._id,
        quantity,
        payer: { name: payer.name.trim(), email: payer.email.trim(), phone: payer.phone.replace(/\D/g, '') },
        address: {
          line1: address.line1.trim(),
          ...(address.landmark.trim() && { landmark: address.landmark.trim() }),
          city: address.city.trim(),
          state: address.state,
          pincode: address.pincode.trim(),
        },
      });

      const order = res?.data?.data;
      if (!order?.orderId) throw new Error(isHi ? 'बुकिंग ऑर्डर बनाने में विफल।' : 'Failed to create booking order.');

      const rzp = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'श्री गौरी शंकर बैकुंठ धाम',
        description: `${selectedPrasad.prasadName} — ${quantity} kg`,
        prefill: {
          name:    order.payer?.name    || payer.name.trim(),
          email:   order.payer?.email   || payer.email.trim(),
          contact: order.payer?.phone   || payer.phone.replace(/\D/g, ''),
        },
        theme: { color: '#c28227' },
        handler: async (response) => {
          try {
            await verifyPrasadBookingApi({
              razorpayOrderId:   response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setConfirmation({
              prasadName: selectedPrasad.prasadName,
              quantity,
              amount:    total,
              paymentId: response.razorpay_payment_id,
              email:     payer.email.trim(),
            });
          } catch (err) {
            setFormError(err?.response?.data?.message || (isHi ? 'भुगतान सत्यापन विफल। मंदिर कार्यालय से संपर्क करें।' : 'Payment verification failed. Please contact the temple office.'));
          } finally {
            setIsProcessing(false);
          }
        },
        modal: { ondismiss: () => setIsProcessing(false) },
      });

      rzp.on('payment.failed', (resp) => {
        setFormError(resp?.error?.description || (isHi ? 'भुगतान असफल। पुनः प्रयास करें।' : 'Payment failed. Please try again.'));
        setIsProcessing(false);
      });

      rzp.open();
    } catch (err) {
      setFormError(err?.response?.data?.message || err?.message || (isHi ? 'कुछ गलत हो गया।' : 'Something went wrong. Please try again.'));
      setIsProcessing(false);
    }
  };

  // ── Confirmation ────────────────────────────────────────────────────────────
  if (confirmation) {
    return (
      <section className="w-full bg-stone-50 py-16 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-stone-200 shadow-lg p-8 text-center space-y-5">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h2 className="text-xl font-extrabold text-stone-900">{isHi ? 'प्रसाद बुकिंग सफल!' : 'Prasad Booking Confirmed!'}</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            {isHi
              ? `आपके ${confirmation.quantity} kg ${confirmation.prasadName} की बुकिंग सफलतापूर्वक हो गई। रसीद ${confirmation.email} पर भेजी जाएगी।`
              : `Your ${confirmation.quantity} kg of ${confirmation.prasadName} has been booked. A receipt will be sent to ${confirmation.email}.`}
          </p>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-left space-y-1.5">
            <div className="flex justify-between"><span className="text-stone-500">{isHi ? 'प्रसाद' : 'Prasad'}</span><span className="font-bold">{confirmation.prasadName} × {confirmation.quantity} kg</span></div>
            <div className="flex justify-between"><span className="text-stone-500">{isHi ? 'राशि' : 'Amount'}</span><span className="font-bold text-emerald-700">₹ {confirmation.amount.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">{isHi ? 'भुगतान आईडी' : 'Payment ID'}</span><span className="font-mono font-bold text-[#965f16] text-[10px]">{confirmation.paymentId}</span></div>
          </div>
          <p className="text-[11px] text-stone-500 italic">"भगवान श्री गौरी शंकर आपके परिवार को सुख, शांति और समृद्धि प्रदान करें।"</p>
          <button
            onClick={() => { setConfirmation(null); setPayer(EMPTY_PAYER); setAddress(EMPTY_ADDRESS); setQuantity(0.5); }}
            className="w-full py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-sm hover:brightness-110 transition"
          >
            {isHi ? 'नई बुकिंग करें' : 'Book Again'}
          </button>
        </div>
      </section>
    );
  }

  // ── Catalogue loading ───────────────────────────────────────────────────────
  if (isCatalogueLoading) {
    return (
      <section className="w-full bg-stone-50 py-20 flex flex-col items-center gap-3 text-stone-400">
        <Loader2 className="w-7 h-7 animate-spin text-[#c28227]" />
        <span className="text-sm font-medium">{isHi ? 'प्रसाद सूची लोड हो रही है…' : 'Loading prasad catalogue…'}</span>
      </section>
    );
  }

  if (catalogueError) {
    return (
      <section className="w-full bg-stone-50 py-16 flex flex-col items-center gap-4 text-stone-500">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-sm font-medium">{catalogueError}</p>
        <button onClick={fetchPrasad} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c28227] text-white text-sm font-bold hover:brightness-110 transition">
          <RefreshCw className="w-4 h-4" /> {isHi ? 'पुनः प्रयास करें' : 'Retry'}
        </button>
      </section>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <section className="w-full bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Prasad selector cards */}
        <div>
          <h2 className="text-sm font-extrabold text-stone-800 mb-3">{isHi ? 'प्रसाद चुनें' : 'Select Prasad'}<span className="text-red-500 ml-0.5">*</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prasadList.map((p) => (
              <button
                key={p._id}
                type="button"
                onClick={() => { setSelectedPrasad(p); setErrors((e) => ({ ...e, prasad: '' })); }}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition ${
                  selectedPrasad?._id === p._id
                    ? 'border-[#c28227] bg-amber-50 shadow-sm'
                    : 'border-stone-200 bg-white hover:border-[#c28227]'
                }`}
              >
                {p.imageUrl
                  ? <img src={p.imageUrl} alt={p.prasadName} className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0" />
                  : <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center shrink-0"><Gift className="w-7 h-7 text-[#c28227]" /></div>
                }
                <div>
                  <p className="text-sm font-extrabold text-stone-900">{p.prasadName}</p>
                  <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">{p.description}</p>
                  <p className="text-xs font-bold text-[#c28227] mt-1 flex items-center gap-0.5">
                    <IndianRupee className="w-3 h-3" />{p.pricePerKg.toLocaleString('en-IN')} / kg
                  </p>
                </div>
              </button>
            ))}
          </div>
          {errors.prasad && <p className="text-[10px] text-red-600 font-medium mt-1">{errors.prasad}</p>}
        </div>

        <form onSubmit={handleBook} noValidate className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">

          {/* Quantity stepper */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">
              {isHi ? 'मात्रा (kg)' : 'Quantity (kg)'}<span className="text-red-500 ml-0.5">*</span>
              <span className="text-stone-400 font-normal ml-2">{isHi ? '(न्यूनतम 500g, अधिकतम 5kg, 250g के चरण)' : '(min 500g, max 5kg, steps of 250g)'}</span>
            </label>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => setQ(quantity - 0.25)} disabled={quantity <= 0.5}
                className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold transition disabled:opacity-40">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-extrabold text-stone-900 min-w-[60px] text-center">{quantity} kg</span>
              <button type="button" onClick={() => setQ(quantity + 0.25)} disabled={quantity >= 5}
                className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold transition disabled:opacity-40">
                <Plus className="w-4 h-4" />
              </button>
              {selectedPrasad && (
                <span className="ml-auto text-base font-extrabold text-emerald-700">
                  ₹ {total.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Payer details */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <p className="text-xs font-extrabold text-stone-700 uppercase tracking-wider">{isHi ? 'संपर्क विवरण' : 'Contact Details'}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={isHi ? 'नाम' : 'Full Name'} required error={errors.name}>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type="text" value={payer.name} onChange={(e) => { setPayer((p) => ({ ...p, name: e.target.value })); setErrors((er) => ({ ...er, name: '' })); }}
                    placeholder={isHi ? 'पूरा नाम' : 'Enter full name'} className={`${inputCls} pl-8`} />
                </div>
              </Field>

              <Field label={isHi ? 'फोन' : 'Phone'} required error={errors.phone}>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type="tel" value={payer.phone} onChange={(e) => { setPayer((p) => ({ ...p, phone: e.target.value })); setErrors((er) => ({ ...er, phone: '' })); }}
                    placeholder="9876543210" className={`${inputCls} pl-8`} />
                </div>
              </Field>
            </div>

            <Field label={isHi ? 'ईमेल' : 'Email'} required error={errors.email}>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="email" value={payer.email} onChange={(e) => { setPayer((p) => ({ ...p, email: e.target.value })); setErrors((er) => ({ ...er, email: '' })); }}
                  placeholder="you@example.com" className={`${inputCls} pl-8`} />
              </div>
            </Field>
          </div>

          {/* Delivery address */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <p className="text-xs font-extrabold text-stone-700 uppercase tracking-wider">{isHi ? 'डिलीवरी पता' : 'Delivery Address'}</p>

            <Field label={isHi ? 'पता (पंक्ति 1)' : 'Address Line 1'} required error={errors.line1}>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="text" value={address.line1} onChange={(e) => { setAddress((a) => ({ ...a, line1: e.target.value })); setErrors((er) => ({ ...er, line1: '' })); }}
                  placeholder={isHi ? 'मकान नं., गली, मोहल्ला' : 'House no., Street, Area'} className={`${inputCls} pl-8`} />
              </div>
            </Field>

            <Field label={isHi ? 'लैंडमार्क (वैकल्पिक)' : 'Landmark (Optional)'}>
              <input type="text" value={address.landmark} onChange={(e) => setAddress((a) => ({ ...a, landmark: e.target.value }))}
                placeholder={isHi ? 'नजदीकी लैंडमार्क' : 'Nearby landmark'} className={inputCls} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={isHi ? 'शहर' : 'City'} required error={errors.city}>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type="text" value={address.city} onChange={(e) => { setAddress((a) => ({ ...a, city: e.target.value })); setErrors((er) => ({ ...er, city: '' })); }}
                    placeholder={isHi ? 'शहर' : 'City'} className={`${inputCls} pl-8`} />
                </div>
              </Field>

              <Field label={isHi ? 'राज्य' : 'State'} required error={errors.state}>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <select value={address.state} onChange={(e) => { setAddress((a) => ({ ...a, state: e.target.value })); setErrors((er) => ({ ...er, state: '' })); }}
                    className={`${inputCls} pl-8 appearance-none`}>
                    <option value="">{isHi ? '— राज्य चुनें —' : '— Select State —'}</option>
                    {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </Field>
            </div>

            <Field label={isHi ? 'पिनकोड' : 'Pincode'} required error={errors.pincode}>
              <div className="relative">
                <Hash className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="text" value={address.pincode} onChange={(e) => { setAddress((a) => ({ ...a, pincode: e.target.value })); setErrors((er) => ({ ...er, pincode: '' })); }}
                  placeholder="110001" maxLength={6} className={`${inputCls} pl-8`} />
              </div>
            </Field>
          </div>

          {/* Order summary */}
          {selectedPrasad && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
              <p className="font-bold text-stone-800 text-sm">{isHi ? 'ऑर्डर सारांश' : 'Order Summary'}</p>
              <div className="flex justify-between text-stone-600"><span>{selectedPrasad.prasadName}</span><span>× {quantity} kg</span></div>
              <div className="flex justify-between text-stone-600"><span>{isHi ? 'मूल्य' : 'Rate'}</span><span>₹ {selectedPrasad.pricePerKg}/kg</span></div>
              <div className="flex justify-between font-extrabold text-emerald-700 text-sm border-t border-amber-200 pt-1.5">
                <span>{isHi ? 'कुल राशि' : 'Total'}</span><span>₹ {total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {formError && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <button type="submit" disabled={isProcessing || !selectedPrasad}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#c28227] text-white font-extrabold text-sm hover:brightness-110 shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed">
            {isProcessing
              ? <><Loader2 className="w-4 h-4 animate-spin" /><span>{isHi ? 'प्रोसेसिंग…' : 'Processing…'}</span></>
              : <><Gift className="w-4 h-4" /><span>{selectedPrasad ? (isHi ? `₹ ${total.toLocaleString('en-IN')} — प्रसाद बुक करें` : `Book Prasad — ₹ ${total.toLocaleString('en-IN')}`) : (isHi ? 'प्रसाद बुक करें' : 'Book Prasad')}</span></>
            }
          </button>

          <p className="text-[10px] text-stone-400 text-center">
            {isHi ? 'भुगतान Razorpay द्वारा सुरक्षित रूप से संसाधित किया जाता है।' : 'Payments are securely processed by Razorpay.'}
          </p>
        </form>
      </div>
    </section>
  );
}
