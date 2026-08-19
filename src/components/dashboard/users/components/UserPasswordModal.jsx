import React, { useState } from 'react';
import { KeyRound, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { updatePasswordApi } from '../../../clientApi/adminApi';

export default function UserPasswordModal({ isHi, isOpen, onClose, onSuccessToast }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!currentPassword.trim()) {
      setErrorMsg(isHi ? 'वर्तमान पासवर्ड आवश्यक है' : 'Current password is required');
      return;
    }
    if (!newPassword.trim()) {
      setErrorMsg(isHi ? 'नया पासवर्ड आवश्यक है' : 'New password is required');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg(isHi ? 'नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए' : 'New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg(isHi ? 'नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते' : 'New password and confirm password do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await updatePasswordApi({
        current_password: currentPassword,
        newpassword: newPassword,
      });

      const message = res.data?.message || (isHi ? 'पासवर्ड सफलतापूर्वक बदल दिया गया!' : 'Password successfully changed');
      if (onSuccessToast) onSuccessToast(message);

      // Reset and close
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    } catch (err) {
      console.error('Password update error:', err);
      const msg = err.response?.data?.message || err.message || (isHi ? 'पासवर्ड अपडेट करने में विफल' : 'Failed to update password');
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {isHi ? 'पासवर्ड बदलें' : 'Change Password'}
              </h3>
              <p className="text-xs text-stone-500">
                {isHi ? 'अपने खाते का पासवर्ड अपडेट करें' : 'Update your administrator password'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 font-bold transition"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              {isHi ? 'वर्तमान पासवर्ड' : 'Current Password'} *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              {isHi ? 'नया पासवर्ड' : 'New Password'} *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showNew ? 'text' : 'password'}
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              {isHi ? 'नए पासवर्ड की पुष्टि करें' : 'Confirm New Password'} *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="newpass123"
                className="w-full pl-9 pr-9 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold text-xs transition"
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#c28227] text-white font-bold text-xs hover:brightness-110 shadow-sm transition disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{loading ? (isHi ? 'अपडेट हो रहा है...' : 'Updating...') : (isHi ? 'पासवर्ड बदलें' : 'Change Password')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
