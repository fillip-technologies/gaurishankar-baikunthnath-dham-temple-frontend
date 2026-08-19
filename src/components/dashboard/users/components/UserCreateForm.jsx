import React, { useState } from 'react';
import {
  UserPlus,
  Users,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  Sparkles,
  Send,
  AlertCircle,
  RotateCcw
} from 'lucide-react';

export default function UserCreateForm({
  isHi,
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  onSubmit,
  onCancel,
  onFillSample,
  onGeneratePassword,
  isEditing,
  isSubmitting,
  apiError,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900">
              {isHi ? 'नया व्यवस्थापक खाता बनाएं' : 'Create Admin Account'}
            </h3>
            <p className="text-xs text-stone-500">
              {isHi
                ? 'व्यवस्थापक की जानकारी और सुरक्षित लॉगिन पासवर्ड दर्ज करें।'
                : 'Enter the administrator\'s profile information and login credentials.'}
            </p>
          </div>
        </div>
      </div>

      {apiError && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span className="font-medium">{apiError}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Fullname Field */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              {isHi ? 'पूरा नाम (fullname)' : 'Full Name'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={(e) => {
                  setFormData({ ...formData, fullname: e.target.value });
                  if (formErrors.fullname) setFormErrors({ ...formErrors, fullname: null });
                }}
                placeholder="Jane Doe"
                className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white transition ${
                  formErrors.fullname
                    ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400'
                    : 'border-stone-200 focus:border-[#c28227]'
                }`}
              />
            </div>
            {formErrors.fullname && (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {formErrors.fullname}
              </p>
            )}
          </div>

          {/* Mobile Number Field */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              {isHi ? 'मोबाइल नंबर (mobile_number)' : 'Mobile Number'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="tel"
                name="mobile_number"
                maxLength={10}
                value={formData.mobile_number}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, mobile_number: val });
                  if (formErrors.mobile_number) setFormErrors({ ...formErrors, mobile_number: null });
                }}
                placeholder="9876543210"
                className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white transition ${
                  formErrors.mobile_number
                    ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400'
                    : 'border-stone-200 focus:border-[#c28227]'
                }`}
              />
            </div>
            {formErrors.mobile_number && (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {formErrors.mobile_number}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              {isHi ? 'ईमेल पता (email)' : 'Email Address'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                }}
                placeholder="jane@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white transition ${
                  formErrors.email
                    ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400'
                    : 'border-stone-200 focus:border-[#c28227]'
                }`}
              />
            </div>
            {formErrors.email && (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {formErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-stone-800">
                {isHi ? 'पासवर्ड (password)' : 'Password'} <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={onGeneratePassword}
                className="text-[10px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 transition"
              >
                <KeyRound className="w-3 h-3" />
                <span>{isHi ? 'पासवर्ड जनरेट करें' : 'Generate Strong'}</span>
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (formErrors.password) setFormErrors({ ...formErrors, password: null });
                }}
                placeholder="secret123"
                className={`w-full pl-10 pr-10 py-2.5 bg-stone-50 border rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white transition ${
                  formErrors.password
                    ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400'
                    : 'border-stone-200 focus:border-[#c28227]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition"
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {formErrors.password}
              </p>
            )}
          </div>
        </div>

        {/* Role & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              {isHi ? 'उपयोगकर्ता भूमिका / पद' : 'User Role / Permission'}
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
            >
              <option value="Admin">Admin (व्यवस्थापक)</option>
              <option value="Super Admin">Super Admin (मुख्य प्रशासक)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              {isHi ? 'खाता स्थिति' : 'Account Status'}
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
            >
              <option value="Active">Active (सक्रिय)</option>
              <option value="Inactive">Inactive (निष्क्रिय)</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setFormData({
                fullname: '',
                mobile_number: '',
                email: '',
                password: '',
                role: 'Admin',
                status: 'Active',
              });
              setFormErrors({});
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold text-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isHi ? 'फॉर्म साफ़ करें' : 'Reset Form'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold text-xs transition"
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#c28227] hover:brightness-110 text-white font-bold text-xs shadow-md transition disabled:opacity-60"
            >
              <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>
                {isSubmitting
                  ? (isHi ? 'बनाया जा रहा है...' : 'Creating Admin...')
                  : isEditing
                  ? (isHi ? 'व्यवस्थापक अपडेट करें' : 'Update Admin')
                  : (isHi ? 'व्यवस्थापक बनाएं (Create Admin)' : 'Create Admin')}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
