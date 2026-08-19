import React, { useState } from 'react';
import { Edit, Eye, EyeOff } from 'lucide-react';

export default function UserEditModal({
  isHi,
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Edit className="w-4 h-4 text-[#c28227]" />
            <span>{isHi ? 'उपयोगकर्ता संपादित करें' : 'Edit User Credentials'}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 font-bold transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              {isHi ? 'पूरा नाम (fullname)' : 'Full Name'} *
            </label>
            <input
              type="text"
              required
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              placeholder="Jane Doe"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                {isHi ? 'मोबाइल नंबर (mobile_number)' : 'Mobile Number'} *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                value={formData.mobile_number}
                onChange={(e) =>
                  setFormData({ ...formData, mobile_number: e.target.value.replace(/\D/g, '') })
                }
                placeholder="9876543210"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                {isHi ? 'ईमेल पता (email)' : 'Email Address'} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              {isHi ? 'पासवर्ड (password)' : 'Password'} *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="secret123"
                className="w-full px-3.5 pr-10 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#c28227]"
              >
                <option value="Admin">Admin (व्यवस्थापक)</option>
                <option value="Super Admin">Super Admin (मुख्य प्रशासक)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#c28227]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold text-xs transition"
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#c28227] text-white font-bold text-xs hover:brightness-110 shadow-sm transition"
            >
              {isHi ? 'अपडेट सहेजें' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
