import React, { useState } from 'react';
import { Trash2, Lock, Eye, EyeOff, AlertTriangle, Loader2 } from 'lucide-react';
import { removeAdminApi } from '../../../clientApi/adminApi';

export default function UserDeleteModal({
  isHi,
  isOpen,
  onClose,
  targetUser,
  onSuccess,
}) {
  const [superAdminPassword, setSuperAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen || !targetUser) return null;

  const handleDelete = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!superAdminPassword.trim()) {
      setErrorMsg(
        isHi
          ? 'व्यवस्थापक को हटाने के लिए मुख्य प्रशासक का पासवर्ड आवश्यक है।'
          : 'Super Admin password is required to delete this administrator.'
      );
      return;
    }

    try {
      setIsDeleting(true);
      const res = await removeAdminApi({
        adminEmail: targetUser.email,
        superAdminPassword: superAdminPassword.trim(),
      });

      const successMsg = res.data?.message || (isHi ? 'व्यवस्थापक सफलतापूर्वक हटा दिया गया' : 'Admin deleted successfully');
      setSuperAdminPassword('');
      if (onSuccess) onSuccess(successMsg, targetUser);
      onClose();
    } catch (err) {
      console.error('removeAdminApi error:', err);
      const msg = err.response?.data?.message || err.message || (isHi ? 'व्यवस्थापक हटाने में त्रुटि' : 'Failed to delete admin');
      setErrorMsg(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {isHi ? 'व्यवस्थापक हटाएं' : 'Remove Administrator'}
              </h3>
              <p className="text-xs text-stone-500">
                {isHi ? 'इस व्यवस्थापक खाते को स्थायी रूप से हटाएं' : 'Permanently remove this administrator account'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="text-stone-400 hover:text-stone-700 font-bold transition"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleDelete} className="space-y-4 text-xs">
          {/* Target User Info Card */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-[11px] text-stone-500 font-bold uppercase tracking-wider mb-1">
              {isHi ? 'हटाया जाने वाला खाता:' : 'Target Account:'}
            </div>
            <div className="font-bold text-stone-900 text-sm">{targetUser.fullname}</div>
            <div className="font-mono text-stone-600 text-xs mt-0.5">{targetUser.email}</div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                {targetUser.role || 'Admin'}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <span className="font-bold">{isHi ? 'सुरक्षा सत्यापन:' : 'Security Verification:'}</span>{' '}
            {isHi
              ? 'इस कार्रवाई को पूरा करने के लिए अपना सुपर एडमिन पासवर्ड दर्ज करें।'
              : 'Please enter your Super Admin password to authenticate this action.'}
          </div>

          {/* Super Admin Password Field */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              {isHi ? 'सुपर एडमिन पासवर्ड' : 'Super Admin Password'} *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={superAdminPassword}
                onChange={(e) => setSuperAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-red-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold text-xs transition"
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition disabled:opacity-50"
            >
              {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isDeleting ? (isHi ? 'हटाया जा रहा है...' : 'Deleting...') : (isHi ? 'खाता हटाएं' : 'Confirm Delete')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
