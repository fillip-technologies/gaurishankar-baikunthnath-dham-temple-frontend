import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  User, Phone, Mail, IndianRupee, CreditCard, MapPin, Building2,
  Globe, Hash, FileText, ShieldCheck, Loader2, CheckCircle2,
  AlertCircle, RefreshCw, HeartHandshake, CalendarDays, ChevronDown,
} from 'lucide-react';
import { createDonationOrderApi, verifyDonationApi } from '../../clientApi/allapi';
import { loadRazorpayScript } from '../../../utils/loadRazorpay';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

const QUICK_AMOUNTS = [501, 1100, 2100, 5100, 11000];

function makeCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b} = ?`, answer: String(a + b) };
}

const today = new Date().toISOString().split('T')[0];

const EMPTY = {
  // required
  name: '', mobile: '', email: '', amount: '',
  // optional
  donationDate: today, panNumber: '', country: 'India', state: '',
  city: '', landmark: '', address: '', zipCode: '', purpose: '',
  // controls
  captchaInput: '', termsAgreed: false,
};

const inputCls = 'w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c28227] focus:bg-white transition';
const selectCls = `${inputCls} appearance-none cursor-pointer`;

function Field({ label, required, children, error, hint }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-stone-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-[10px] text-red-600 font-medium">{error}</p>}
      {hint && !error && <p className="text-[10px] text-stone-400">{hint}</p>}
    </div>
  );
}

export default function DonationForm() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState(makeCaptcha);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const set = useCallback((field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((er) => ({ ...er, [field]: '' }));
  }, []);

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2)
      e.name = isHi ? 'कम से कम 2 अक्षर दर्ज करें।' : 'Enter at least 2 characters.';
    if (!/^\d{10,14}$/.test(form.mobile.replace(/\D/g, '')))
      e.mobile = isHi ? '10–14 अंकों का मोबाइल नंबर दर्ज करें।' : 'Enter a 10–14 digit mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = isHi ? 'वैध ईमेल दर्ज करें।' : 'Enter a valid email.';
    const amt = Number(form.amount);
    if (!Number.isFinite(amt) || amt < 1)
      e.amount = isHi ? 'राशि कम से कम ₹1 होनी चाहिए।' : 'Amount must be at least ₹1.';
    if (form.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.panNumber.trim().toUpperCase()))
      e.panNumber = isHi ? 'अमान्य PAN नंबर।' : 'Invalid PAN format (e.g. ABCDE1234F).';
    if (form.captchaInput.trim() !== captcha.answer)
      e.captchaInput = isHi ? 'गलत कैप्चा। पुनः प्रयास करें।' : 'Incorrect captcha. Try again.';
    if (!form.termsAgreed)
      e.termsAgreed = isHi ? 'नियम एवं शर्तें स्वीकार करें।' : 'Please accept the terms and conditions.';
    return e;
  };

  const refreshCaptcha = () => {
    setCaptcha(makeCaptcha());
    setForm((f) => ({ ...f, captchaInput: '' }));
    setErrors((er) => ({ ...er, captchaInput: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setApiError('');
    setIsProcessing(true);

    try {
      const ok = await loadRazorpayScript();
      if (!ok || !window.Razorpay)
        throw new Error(isHi ? 'भुगतान गेटवे लोड नहीं हो सका।' : 'Could not load payment gateway. Check your connection.');

      const rupees = Number(form.amount);

      const notes = { cause: form.purpose.trim() || 'General Donation' };
      if (form.panNumber.trim()) notes.pan = form.panNumber.trim().toUpperCase();
      if (form.state) notes.state = form.state;
      if (form.city.trim()) notes.city = form.city.trim();
      if (form.donationDate) notes.donationDate = form.donationDate;
      if (form.address.trim()) notes.address = form.address.trim();
      if (form.zipCode.trim()) notes.zipCode = form.zipCode.trim();

      const res = await createDonationOrderApi({
        amount: Math.round(rupees * 100),
        payer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.mobile.replace(/\D/g, ''),
        },
        notes,
      });

      const order = res?.data?.data;
      if (!order?.orderId)
        throw new Error(isHi ? 'दान आदेश बनाने में विफल।' : 'Failed to create donation order.');

      const rzp = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'श्री गौरी शंकर बैकुंठ धाम',
        description: form.purpose.trim() || 'Donation',
        prefill: {
          name: order.payer?.name || form.name.trim(),
          email: order.payer?.email || form.email.trim(),
          contact: order.payer?.phone || form.mobile.replace(/\D/g, ''),
        },
        theme: { color: '#c28227' },
        handler: async (response) => {
          try {
            await verifyDonationApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setConfirmation({
              name: form.name.trim(),
              amount: rupees,
              purpose: form.purpose.trim() || 'General Donation',
              paymentId: response.razorpay_payment_id,
              email: form.email.trim(),
            });
          } catch (err) {
            setApiError(err?.response?.data?.message || (isHi ? 'भुगतान सत्यापन विफल। कार्यालय से संपर्क करें।' : 'Payment verification failed. Please contact the temple office.'));
          } finally {
            setIsProcessing(false);
          }
        },
        modal: { ondismiss: () => setIsProcessing(false) },
      });

      rzp.on('payment.failed', (resp) => {
        setApiError(resp?.error?.description || (isHi ? 'भुगतान असफल। पुनः प्रयास करें।' : 'Payment failed. Please try again.'));
        setIsProcessing(false);
        refreshCaptcha();
      });

      rzp.open();
    } catch (err) {
      setApiError(err?.response?.data?.message || err?.message || (isHi ? 'कुछ गलत हो गया। पुनः प्रयास करें।' : 'Something went wrong. Please try again.'));
      setIsProcessing(false);
      refreshCaptcha();
    }
  };

  // ── Confirmation screen ────────────────────────────────────────────────────
  if (confirmation) {
    return (
      <section className="w-full bg-stone-50 py-16 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-stone-200 shadow-lg p-8 text-center space-y-5">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h2 className="text-xl font-extrabold text-stone-900">
            {isHi ? 'दान के लिए हार्दिक धन्यवाद!' : 'Thank You for Your Donation!'}
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            {isHi ? `${confirmation.name} जी, आपका ` : `Dear ${confirmation.name}, your `}
            <span className="font-bold text-emerald-700">₹{Number(confirmation.amount).toLocaleString('en-IN')}</span>
            {isHi
              ? ` का दान (${confirmation.purpose}) सफलतापूर्वक प्राप्त हुआ। रसीद ${confirmation.email} पर भेजी जाएगी।`
              : ` donation (${confirmation.purpose}) was received successfully. A receipt will be sent to ${confirmation.email}.`}
          </p>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-stone-500 font-medium">{isHi ? 'भुगतान आईडी' : 'Payment ID'}</span>
              <span className="font-mono font-bold text-[#965f16]">{confirmation.paymentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-medium">{isHi ? 'उद्देश्य' : 'Purpose'}</span>
              <span className="font-bold text-stone-800">{confirmation.purpose}</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-500 italic">
            "भगवान श्री गौरी शंकर आपके परिवार को सुख, शांति और समृद्धि प्रदान करें।"
          </p>
          <button
            onClick={() => { setConfirmation(null); setForm(EMPTY); setCaptcha(makeCaptcha()); }}
            className="w-full py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-sm hover:brightness-110 transition"
          >
            {isHi ? 'नया दान करें' : 'Make Another Donation'}
          </button>
        </div>
      </section>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <section className="w-full bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* Notices */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>
              {isHi
                ? 'भारत में श्री गौरी शंकर बैकुंठनाथ धाम ट्रस्ट को दान आयकर छूट (80G) के लिए पात्र है।'
                : 'Donation to Shri Gauri Shankar Baikunthnath Dham Trust is eligible for tax exemption (80G) only in India.'}
            </span>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium">
            <FileText className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
            <span>
              {isHi
                ? 'दान रसीद प्राप्त करने के लिए नीचे दिए गए विकल्प "80G रसीद के लिए अतिरिक्त विवरण" में जानकारी भरें।'
                : 'To receive a donation slip eligible for 80G tax deduction, expand "Additional Details for 80G Receipt" below.'}
            </span>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2.5 pb-5 border-b border-stone-100 mb-6">
            <HeartHandshake className="w-5 h-5 text-[#c28227]" />
            <h2 className="text-base font-extrabold text-stone-900">
              {isHi ? 'दान फ़ॉर्म' : 'Donation Form'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* ── Required fields ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={isHi ? 'नाम' : 'Name'} required error={errors.name}>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type="text" value={form.name} onChange={set('name')} placeholder={isHi ? 'पूरा नाम' : 'Enter Name'} className={`${inputCls} pl-8`} />
                </div>
              </Field>

              <Field label={isHi ? 'मोबाइल' : 'Mobile'} required error={errors.mobile}>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type="tel" value={form.mobile} onChange={set('mobile')} placeholder={isHi ? 'मोबाइल नंबर' : 'Enter Mobile'} className={`${inputCls} pl-8`} />
                </div>
              </Field>
            </div>

            <Field label={isHi ? 'ईमेल' : 'Email'} required error={errors.email}>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="email" value={form.email} onChange={set('email')} placeholder={isHi ? 'ईमेल दर्ज करें' : 'Enter Email'} className={`${inputCls} pl-8`} />
              </div>
            </Field>

            {/* Amount with quick picks */}
            <Field label={isHi ? 'राशि (₹)' : 'Amount (₹)'} required error={errors.amount}>
              <div className="flex flex-wrap gap-2 mb-2">
                {QUICK_AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => { setForm((f) => ({ ...f, amount: String(a) })); setErrors((er) => ({ ...er, amount: '' })); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      Number(form.amount) === a
                        ? 'bg-[#c28227] text-white border-[#c28227]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-[#c28227]'
                    }`}
                  >
                    ₹{a.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              <div className="relative">
                <IndianRupee className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="number" min={1} value={form.amount} onChange={set('amount')} placeholder={isHi ? 'अन्य राशि दर्ज करें' : 'Enter Amount'} className={`${inputCls} pl-8`} />
              </div>
            </Field>

            {/* ── Optional expandable section ── */}
            <div className="rounded-xl border border-stone-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowDetails((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 bg-stone-50 hover:bg-stone-100 transition text-left"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#c28227]" />
                  <span className="text-xs font-bold text-stone-700">
                    {isHi ? '80G रसीद के लिए अतिरिक्त विवरण (वैकल्पिक)' : 'Additional Details for 80G Receipt (Optional)'}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
              </button>

              {showDetails && (
                <div className="p-4 space-y-4 border-t border-stone-200">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={isHi ? 'दान दिनांक' : 'Donation Date'}>
                      <div className="relative">
                        <CalendarDays className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="date" value={form.donationDate} onChange={set('donationDate')} className={`${inputCls} pl-8`} />
                      </div>
                    </Field>

                    <Field label={isHi ? 'PAN नंबर' : 'PAN Number'} error={errors.panNumber} hint={isHi ? '80G छूट के लिए आवश्यक' : 'Required for 80G tax exemption'}>
                      <div className="relative">
                        <CreditCard className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="text" value={form.panNumber} onChange={set('panNumber')} placeholder="ABCDE1234F" maxLength={10} className={`${inputCls} pl-8 uppercase`} />
                      </div>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={isHi ? 'देश' : 'Country'}>
                      <div className="relative">
                        <Globe className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <select value={form.country} onChange={set('country')} className={`${selectCls} pl-8`}>
                          <option value="India">{isHi ? 'भारत' : 'India'}</option>
                          <option value="USA">USA</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="UAE">UAE</option>
                          <option value="Other">{isHi ? 'अन्य' : 'Other'}</option>
                        </select>
                      </div>
                    </Field>

                    <Field label={isHi ? 'राज्य' : 'State'}>
                      <select value={form.state} onChange={set('state')} className={selectCls}>
                        <option value="">{isHi ? '— राज्य चुनें —' : '— Select State —'}</option>
                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={isHi ? 'शहर' : 'City'}>
                      <div className="relative">
                        <Building2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="text" value={form.city} onChange={set('city')} placeholder={isHi ? 'शहर का नाम' : 'Enter City'} className={`${inputCls} pl-8`} />
                      </div>
                    </Field>

                    <Field label={isHi ? 'लैंडमार्क' : 'Landmark'}>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="text" value={form.landmark} onChange={set('landmark')} placeholder={isHi ? 'लैंडमार्क' : 'Enter Landmark'} className={`${inputCls} pl-8`} />
                      </div>
                    </Field>
                  </div>

                  <Field label={isHi ? 'पता' : 'Address'}>
                    <textarea rows={2} value={form.address} onChange={set('address')} placeholder={isHi ? 'पूरा पता दर्ज करें' : 'Enter Your Address'} className={`${inputCls} resize-none`} />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={isHi ? 'पिनकोड' : 'Zip / Postal Code'}>
                      <div className="relative">
                        <Hash className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="text" value={form.zipCode} onChange={set('zipCode')} placeholder={isHi ? 'पिनकोड' : 'Enter Zip / Postal Code'} maxLength={10} className={`${inputCls} pl-8`} />
                      </div>
                    </Field>

                    <Field label={isHi ? 'दान का उद्देश्य' : 'Purpose of Donation'}>
                      <input type="text" value={form.purpose} onChange={set('purpose')} placeholder={isHi ? 'उद्देश्य (वैकल्पिक)' : 'Enter Purpose of Donation'} className={inputCls} />
                    </Field>
                  </div>

                </div>
              )}
            </div>

            {/* ── Captcha ── */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <p className="text-xs font-bold text-stone-700">
                {isHi ? 'कैप्चा कोड' : 'Captcha Code'}<span className="text-red-500 ml-0.5">*</span>
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#2a080d] text-[#ffd700] font-mono font-extrabold text-base tracking-widest select-none min-w-[110px]">
                  {captcha.question}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-2 rounded-lg text-stone-500 hover:text-[#c28227] hover:bg-stone-200 transition"
                  title={isHi ? 'नया कैप्चा' : 'Refresh captcha'}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={form.captchaInput}
                  onChange={set('captchaInput')}
                  placeholder={isHi ? 'उत्तर दर्ज करें' : 'Enter Captcha Code'}
                  className={`${inputCls} flex-1`}
                  maxLength={3}
                />
              </div>
              {errors.captchaInput && <p className="text-[10px] text-red-600 font-medium">{errors.captchaInput}</p>}
            </div>

            {/* ── Terms ── */}
            <div className="space-y-1">
              <div className="flex items-start gap-2.5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={form.termsAgreed}
                  onChange={set('termsAgreed')}
                  className="mt-0.5 h-4 w-4 rounded border-stone-300 text-[#c28227] focus:ring-[#c28227] cursor-pointer shrink-0"
                />
                <label htmlFor="terms" className="text-xs text-stone-600 leading-relaxed cursor-pointer">
                  {isHi
                    ? 'मैंने नियम एवं शर्तें पढ़ी हैं और उनसे सहमत हूँ।'
                    : 'I have read the Terms and Conditions and hereby agree to the same.'}
                </label>
              </div>
              {errors.termsAgreed && <p className="text-[10px] text-red-600 font-medium pl-6">{errors.termsAgreed}</p>}
            </div>

            {/* ── API error ── */}
            {apiError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{apiError}</span>
              </div>
            )}

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#c28227] text-white font-extrabold text-sm hover:brightness-110 shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>{isHi ? 'प्रोसेसिंग…' : 'Processing…'}</span></>
              ) : (
                <><HeartHandshake className="w-4 h-4" /><span>
                  {Number(form.amount) > 0
                    ? (isHi ? `₹${Number(form.amount).toLocaleString('en-IN')} दान करें` : `Donate ₹${Number(form.amount).toLocaleString('en-IN')}`)
                    : (isHi ? 'दान करें' : 'Proceed to Donate')}
                </span></>
              )}
            </button>

            <p className="text-[10px] text-stone-400 text-center">
              {isHi
                ? 'भुगतान Razorpay द्वारा सुरक्षित रूप से संसाधित किया जाता है।'
                : 'Payments are securely processed by Razorpay.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
