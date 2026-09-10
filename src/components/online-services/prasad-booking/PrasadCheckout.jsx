import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  User, Phone, Mail, MapPin, Hash, Building2, Globe,
  Loader2, AlertCircle, CheckCircle2, ArrowLeft, Gift, IndianRupee,
} from 'lucide-react';
import { bookPrasadApi, verifyPrasadBookingApi } from '../../clientApi/allApi';
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

export default function PrasadCheckout({ selection, onBack }) {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const { prasad, quantity, total } = selection;

  const [payer,   setPayer]   = useState(EMPTY_PAYER);
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [errors,  setErrors]  = useState({});
  const [formError, setFormError]   = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const set = (setter, field, errKey) => (e) => {
    setter((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [errKey || field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (payer.name.trim().length < 3)   e.name    = isHi ? 'कम से कम 3 अक्षरों का नाम दर्ज करें।' : 'Name must be at least 3 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payer.email.trim())) e.email = isHi ? 'वैध ईमेल दर्ज करें।' : 'Enter a valid email.';
    if (!/^\d{10,14}$/.test(payer.phone.replace(/\D/g, '')))    e.phone = isHi ? '10–14 अंकों का फोन नंबर।' : 'Phone must be 10–14 digits.';
    if (address.line1.trim().length < 3) e.line1   = isHi ? 'पता दर्ज करें।' : 'Enter delivery address.';
    if (address.city.trim().length < 2)  e.city    = isHi ? 'शहर दर्ज करें।' : 'Enter city.';
    if (!address.state)                  e.state   = isHi ? 'राज्य चुनें।' : 'Select state.';
    if (!/^\d{6}$/.test(address.pincode.trim())) e.pincode = isHi ? '6 अंकों का पिनकोड दर्ज करें।' : 'Enter a valid 6-digit pincode.';
    return e;
  };

  const handlePay = async (e) => {
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
        prasadId: prasad._id,
        quantity,
        payer: {
          name:  payer.name.trim(),
          email: payer.email.trim(),
          phone: payer.phone.replace(/\D/g, ''),
        },
        address: {
          line1:    address.line1.trim(),
          ...(address.landmark.trim() && { landmark: address.landmark.trim() }),
          city:     address.city.trim(),
          state:    address.state,
          pincode:  address.pincode.trim(),
        },
      });

      const order = res?.data?.data;
      if (!order?.orderId) throw new Error(isHi ? 'बुकिंग ऑर्डर बनाने में विफल।' : 'Failed to create booking order.');

      const rzp = new window.Razorpay({
        key:      order.key,
        amount:   order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name:     'श्री गौरी शंकर बैकुंठ धाम',
        description: `${prasad.prasadName} — ${quantity} kg`,
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
              prasadName: prasad.prasadName,
              quantity,
              total,
              paymentId: response.razorpay_payment_id,
              email: payer.email.trim(),
              name:  payer.name.trim(),
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
          <h2 className="text-xl font-extrabold text-stone-900">
            {isHi ? 'प्रसाद बुकिंग सफल!' : 'Prasad Booking Confirmed!'}
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            {isHi
              ? `${confirmation.name} जी, आपके ${confirmation.quantity} kg ${confirmation.prasadName} की बुकिंग हो गई। रसीद ${confirmation.email} पर भेजी जाएगी।`
              : `Dear ${confirmation.name}, your ${confirmation.quantity} kg of ${confirmation.prasadName} has been booked. A receipt will be sent to ${confirmation.email}.`}
          </p>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-left space-y-2">
            <div className="flex justify-between"><span className="text-stone-500">{isHi ? 'प्रसाद' : 'Prasad'}</span><span className="font-bold">{confirmation.prasadName} × {confirmation.quantity} kg</span></div>
            <div className="flex justify-between"><span className="text-stone-500">{isHi ? 'राशि' : 'Amount'}</span><span className="font-bold text-emerald-700">₹ {confirmation.total.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">{isHi ? 'भुगतान आईडी' : 'Payment ID'}</span><span className="font-mono font-bold text-[#965f16] text-[10px]">{confirmation.paymentId}</span></div>
          </div>
          <p className="text-[11px] text-stone-500 italic">"भगवान श्री गौरी शंकर आपके परिवार को सुख, शांति और समृद्धि प्रदान करें।"</p>
          <button onClick={() => window.location.reload()}
            className="w-full py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-sm hover:brightness-110 transition">
            {isHi ? 'नई बुकिंग करें' : 'Book Again'}
          </button>
        </div>
      </section>
    );
  }

  // ── Checkout form ───────────────────────────────────────────────────────────
  return (
    <section className="w-full bg-stone-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Back */}
        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition">
          <ArrowLeft className="w-4 h-4" />
          {isHi ? 'प्रसाद बदलें' : 'Change Prasad'}
        </button>

        {/* Order summary (read-only) */}
        <div className="bg-white rounded-2xl border border-[#c28227]/40 p-5 flex items-center gap-4 shadow-xs">
          {prasad.imageUrl
            ? <img src={prasad.imageUrl} alt={prasad.prasadName} className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0" />
            : <div className="w-16 h-16 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0"><Gift className="w-8 h-8 text-[#c28227]" /></div>
          }
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-stone-900">{prasad.prasadName}</p>
            <p className="text-xs text-stone-500 mt-0.5">{quantity} kg &nbsp;·&nbsp; ₹{prasad.pricePerKg}/kg</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-stone-400">{isHi ? 'कुल' : 'Total'}</p>
            <p className="text-lg font-extrabold text-emerald-700 flex items-center gap-0.5">
              <IndianRupee className="w-4 h-4" />{total.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handlePay} noValidate className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-xs font-extrabold text-stone-700 uppercase tracking-wider pb-1 border-b border-stone-100">
              {isHi ? 'संपर्क विवरण' : 'Contact Details'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={isHi ? 'नाम' : 'Full Name'} required error={errors.name}>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type="text" value={payer.name} onChange={set(setPayer, 'name')}
                    placeholder={isHi ? 'पूरा नाम' : 'Enter full name'} className={`${inputCls} pl-8`} />
                </div>
              </Field>

              <Field label={isHi ? 'फोन' : 'Phone'} required error={errors.phone}>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type="tel" value={payer.phone} onChange={set(setPayer, 'phone')}
                    placeholder="9876543210" className={`${inputCls} pl-8`} />
                </div>
              </Field>
            </div>

            <Field label={isHi ? 'ईमेल' : 'Email'} required error={errors.email}>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="email" value={payer.email} onChange={set(setPayer, 'email')}
                  placeholder="you@example.com" className={`${inputCls} pl-8`} />
              </div>
            </Field>
          </div>

          {/* Delivery address */}
          <div className="space-y-4">
            <p className="text-xs font-extrabold text-stone-700 uppercase tracking-wider pb-1 border-b border-stone-100">
              {isHi ? 'डिलीवरी पता' : 'Delivery Address'}
            </p>

            <Field label={isHi ? 'पता' : 'Address Line 1'} required error={errors.line1}>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="text" value={address.line1} onChange={set(setAddress, 'line1')}
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
                  <input type="text" value={address.city} onChange={set(setAddress, 'city')}
                    placeholder={isHi ? 'शहर' : 'City'} className={`${inputCls} pl-8`} />
                </div>
              </Field>

              <Field label={isHi ? 'राज्य' : 'State'} required error={errors.state}>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <select value={address.state} onChange={set(setAddress, 'state')}
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
                <input type="text" value={address.pincode} onChange={set(setAddress, 'pincode')}
                  placeholder="110001" maxLength={6} className={`${inputCls} pl-8`} />
              </div>
            </Field>
          </div>

          {formError && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <button type="submit" disabled={isProcessing}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#c28227] text-white font-extrabold text-sm hover:brightness-110 shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed">
            {isProcessing
              ? <><Loader2 className="w-4 h-4 animate-spin" /><span>{isHi ? 'प्रोसेसिंग…' : 'Processing…'}</span></>
              : <><Gift className="w-4 h-4" /><span>{isHi ? `₹ ${total.toLocaleString('en-IN')} — भुगतान करें` : `Pay ₹ ${total.toLocaleString('en-IN')}`}</span></>
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
