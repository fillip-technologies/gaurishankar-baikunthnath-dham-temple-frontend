import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, User, Eye, EyeOff, ShieldCheck, LogIn, AlertCircle, CheckCircle2, Sparkles, KeyRound, ArrowLeft, Smartphone } from 'lucide-react';
import { loginApi, verifyOtpApi, resendOtpApi } from '../clientApi/allApi';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  // State
  const [step, setStep] = useState('login'); // 'login' | 'otp'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Timer countdown for OTP resend
  useEffect(() => {
    let timer;
    if (step === 'otp' && resendTimer > 0) {
      setIsResendDisabled(true);
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  // Step 1: Submit Login -> Backend either sends OTP (new device) or logs in directly (known device)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmedEmail = formData.email.trim().toLowerCase();
    if (!trimmedEmail || !formData.password.trim()) {
      setError(
        currentLang === 'hi'
          ? 'कृपया ईमेल और पासवर्ड दोनों दर्ज करें।'
          : 'Please enter both email and password.'
      );
      return;
    }

    if (formData.password.length < 6 || formData.password.length > 100) {
      setError(
        currentLang === 'hi'
          ? 'पासवर्ड 6 से 100 अक्षरों के बीच होना चाहिए।'
          : 'Password must be between 6 and 100 characters long.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginApi({
        email: trimmedEmail,
        password: formData.password,
      });

      setIsLoading(false);
      const data = res?.data;

      if (data?.data?.requiresOtp) {
        // New device -> OTP was sent to email, show OTP step
        setStep('otp');
        setResendTimer(30);
        setSuccess(
          data?.message ||
            (currentLang === 'hi'
              ? 'नया उपकरण। आपकी ईमेल पर ओटीपी भेजा गया है।'
              : 'New device detected. OTP sent to your email.')
        );
      } else if (data?.data?.user) {
        // Known device -> Logged in directly (no OTP needed)
        login(data.data.user, data?.data?.token);
        setSuccess(
          data?.message ||
            (currentLang === 'hi'
              ? 'लॉगिन सफल! पोर्टल पर पुनर्निर्देशित किया जा रहा है...'
              : 'Login successful! Redirecting to Admin Dashboard...')
        );
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        // Fallback: assume OTP step
        setStep('otp');
        setResendTimer(30);
        setSuccess(
          data?.message ||
            (currentLang === 'hi'
              ? 'ओटीपी आपकी ईमेल पर भेजा गया है।'
              : 'OTP sent to your email.')
        );
      }
    } catch (err) {
      setIsLoading(false);
      const msg =
        err.response?.data?.message ||
        err.message ||
        (currentLang === 'hi'
          ? 'लॉगिन विफल। कृपया क्रेडेंशियल या नेटवर्क कनेक्शन की जाँच करें।'
          : 'Login failed. Please check your credentials or network connection.');
      setError(msg);
    }
  };

  // OTP Inputs Handler
  const handleOtpChange = (element, index) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otpValues];
    newOtp[index] = element.value;
    setOtpValues(newOtp);
    if (error) setError('');

    // Focus next input
    if (element.value && element.nextSibling && element.nextSibling.tagName === 'INPUT') {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpValues[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  // Step 2: Submit OTP Verification via Backend API
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const enteredOtp = otpValues.join('');
    if (enteredOtp.length !== 6) {
      setError(
        currentLang === 'hi'
          ? 'कृपया पूरा 6 अंकों का ओटीपी कोड दर्ज करें।'
          : 'Please enter full 6-digit OTP code.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const res = await verifyOtpApi({ otp: enteredOtp });

      setIsLoading(false);
      const userPayload = res?.data?.data?.user || { email: formData.email, role: 'Super Admin' };
      const tokenPayload = res?.data?.data?.token;
      login(userPayload, tokenPayload);

      setSuccess(
        res?.data?.message ||
          (currentLang === 'hi'
            ? 'ओटीपी सत्यापित! व्यवस्थापक पोर्टल पर पुनर्निर्देशित किया जा रहा है...'
            : 'OTP Verified! Redirecting to Admin Dashboard...')
      );
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      const msg =
        err.response?.data?.message ||
        err.message ||
        (currentLang === 'hi'
          ? 'अमान्य ओटीपी कोड। कृपया पुनः प्रयास करें।'
          : 'Invalid OTP code. Please try again.');
      setError(msg);
    }
  };

  const handleResendOtp = async () => {
    setOtpValues(['', '', '', '', '', '']);
    setError('');
    setSuccess('');

    try {
      let res;
      try {
        res = await resendOtpApi({ email: formData.email.trim().toLowerCase() });
      } catch (apiErr) {
        // If dedicated resend endpoint isn't implemented (404), re-trigger OTP via login flow
        if (apiErr.response?.status === 404 && formData.password) {
          res = await loginApi({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          });
        } else {
          throw apiErr;
        }
      }

      setResendTimer(30);
      setIsResendDisabled(true);
      setSuccess(
        res?.data?.message ||
          (currentLang === 'hi'
            ? 'नया ओटीपी आपकी ईमेल पर भेज दिया गया है!'
            : 'New OTP sent successfully to your email!')
      );
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        (currentLang === 'hi'
          ? 'ओटीपी पुनः भेजने में विफलता।'
          : 'Failed to resend OTP.');
      setError(msg);
    }
  };

  const handleBackToLogin = () => {
    setStep('login');
    setError('');
    setSuccess('');
    setOtpValues(['', '', '', '', '', '']);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Login / OTP Card */}
      <div className="bg-stone-900/90 backdrop-blur-md border border-[#c28227]/40 shadow-2xl rounded-2xl p-6 sm:p-8 text-stone-100 relative overflow-hidden">
        
        {/* Subtle Decorative Golden Border Glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#c28227]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Sacred Mantra Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 text-[#ffd700] text-xs font-hindi tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>॥ श्री वैकुण्ठनाथ धाम ॥</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#c28227]/15 border border-[#c28227]/40 text-[#ffd700] mb-3 shadow-inner">
            {step === 'login' ? (
              <ShieldCheck className="w-7 h-7 text-[#ffd700]" />
            ) : (
              <Smartphone className="w-7 h-7 text-[#ffd700]" />
            )}
          </div>

          <h2 className={`text-2xl font-bold text-[#ffd700] tracking-wide ${
            currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
          }`}>
            {step === 'login'
              ? (currentLang === 'hi' ? 'प्रशासनिक प्रवेश' : 'Admin Portal Login')
              : (currentLang === 'hi' ? 'ओटीपी सत्यापन' : 'Enter Security OTP')}
          </h2>
          
          <p className="text-stone-400 text-xs mt-1">
            {step === 'login'
              ? (currentLang === 'hi'
                  ? 'प्रबंधन एवं मंदिर संचालन हेतु अधिकृत प्रवेश'
                  : 'Authorized Portal for Temple Administration')
              : (currentLang === 'hi'
                  ? `6 अंकों का ओटीपी ${formData.email} पर भेजा गया`
                  : `Enter 6-digit code sent for ${formData.email || 'Admin'}`)}
          </p>
        </div>

        {/* Divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c28227] to-transparent mx-auto mb-6" />

        {/* Alert Notifications */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{success}</span>
          </div>
        )}

        {/* Step 1: Login Form (Email & Password) */}
        {step === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                {currentLang === 'hi' ? 'ईमेल आईडी' : 'Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4 text-[#c28227]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={currentLang === 'hi' ? 'अपनी ईमेल आईडी दर्ज करें' : 'admin@example.com'}
                  autoComplete="email"
                  className="w-full bg-stone-950/80 border border-stone-700 focus:border-[#c28227] focus:ring-1 focus:ring-[#c28227] rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-100 placeholder-stone-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                {currentLang === 'hi' ? 'पासवर्ड' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4 text-[#c28227]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={currentLang === 'hi' ? 'पासवर्ड दर्ज करें' : 'Enter password'}
                  autoComplete="current-password"
                  className="w-full bg-stone-950/80 border border-stone-700 focus:border-[#c28227] focus:ring-1 focus:ring-[#c28227] rounded-lg pl-9 pr-10 py-2.5 text-xs text-stone-100 placeholder-stone-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-[#c28227] transition-colors focus:outline-none cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-stone-300 hover:text-stone-100 transition-colors">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-3.5 h-3.5 rounded bg-stone-950 border-stone-700 text-[#c28227] focus:ring-[#c28227] cursor-pointer"
                />
                <span>{currentLang === 'hi' ? 'मुझे याद रखें' : 'Remember me'}</span>
              </label>

              <button
                type="button"
                onClick={() => alert(currentLang === 'hi' ? 'पासवर्ड रीसेट करने के लिए कृपया मुख्य आईटी एडमिनिस्ट्रेटर से संपर्क करें।' : 'Please contact the primary IT Administrator for password reset.')}
                className="text-[#c28227] hover:text-amber-400 hover:underline transition-colors font-medium cursor-pointer"
              >
                {currentLang === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-[#c28227] via-amber-600 to-[#a3691c] hover:from-amber-600 hover:to-[#c28227] text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg hover:shadow-amber-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-amber-400/20 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{currentLang === 'hi' ? 'ओटीपी भेजा जा रहा है...' : 'Sending OTP...'}</span>
                </div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{currentLang === 'hi' ? 'लॉग इन करें' : 'Log In'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification Form */}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <label className="block text-center text-xs font-semibold text-stone-300 uppercase tracking-wider mb-3">
                {currentLang === 'hi' ? '6-अंकों का ओटीपी दर्ज करें' : 'Enter 6-Digit OTP Code'}
              </label>
              
              {/* 6-Digit OTP Inputs */}
              <div className="flex justify-between gap-2 max-w-xs mx-auto">
                {otpValues.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-10 h-12 text-center text-lg font-bold bg-stone-950/90 border border-stone-700 focus:border-[#c28227] focus:ring-2 focus:ring-[#c28227]/40 rounded-lg text-amber-400 outline-none transition-all shadow-inner"
                  />
                ))}
              </div>
            </div>

            {/* Resend & Countdown */}
            <div className="flex items-center justify-between text-xs px-1 pt-1">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#c28227]" />
                <span>{currentLang === 'hi' ? 'वापस जाएँ' : 'Back to Login'}</span>
              </button>

              <button
                type="button"
                disabled={isResendDisabled}
                onClick={handleResendOtp}
                className={`font-semibold transition-colors cursor-pointer ${
                  isResendDisabled
                    ? 'text-stone-500 cursor-not-allowed'
                    : 'text-[#c28227] hover:text-amber-400 hover:underline'
                }`}
              >
                {isResendDisabled
                  ? (currentLang === 'hi' ? `पुनः भेजें (${resendTimer}s)` : `Resend in ${resendTimer}s`)
                  : (currentLang === 'hi' ? 'ओटीपी पुनः भेजें' : 'Resend OTP')}
              </button>
            </div>

            {/* Submit OTP Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#c28227] via-amber-600 to-[#a3691c] hover:from-amber-600 hover:to-[#c28227] text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg hover:shadow-amber-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-amber-400/20 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{currentLang === 'hi' ? 'ओटीपी सत्यापित हो रहा है...' : 'Verifying OTP...'}</span>
                </div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{currentLang === 'hi' ? 'ओटीपी सत्यापित करें' : 'Verify OTP'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security Footer Notice */}
        <div className="mt-6 pt-4 border-t border-stone-800 text-center">
          <p className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
            <KeyRound className="w-3 h-3 text-[#c28227]" />
            <span>
              {currentLang === 'hi'
                ? 'सुरक्षित एवं एन्क्रिप्टेड 256-बिट व्यवस्थापक पोर्टल'
                : 'Secure 256-bit Encrypted Admin System'}
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
