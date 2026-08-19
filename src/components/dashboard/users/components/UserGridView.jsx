import React from 'react';
import { Phone, Mail, KeyRound, Trash2 } from 'lucide-react';

export default function UserGridView({
  isHi,
  users,
  onToggleStatus,
  onOpenPasswordModal,
  onDeleteUser,
}) {
  if (users.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
        {isHi ? 'कोई व्यवस्थापक नहीं मिला' : 'No administrators found.'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((u, idx) => (
        <div
          key={u._id || u.id || idx}
          className="rounded-2xl bg-white border border-stone-200 p-5 shadow-xs hover:shadow-md hover:border-amber-300 transition flex flex-col justify-between group"
        >
          <div>
            {/* Card Top */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#c28227] to-amber-600 text-white font-bold text-base flex items-center justify-center shadow-xs">
                  {u.fullname.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 group-hover:text-[#c28227] transition">
                    {u.fullname}
                  </h4>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-[#c28227]/10 text-[#965f16] text-[10px] font-bold">
                    {u.role || 'Admin'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onToggleStatus(u._id || u.id)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                  u.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-stone-100 text-stone-500 border-stone-300'
                }`}
              >
                {u.status === 'Active' ? (isHi ? 'सक्रिय' : 'Active') : (isHi ? 'निष्क्रिय' : 'Inactive')}
              </button>
            </div>

            {/* Contact details */}
            <div className="mt-4 space-y-2 text-xs text-stone-600 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-mono">+91 {u.mobile_number}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="truncate">{u.email}</span>
              </div>
            </div>
          </div>

          {/* Card Bottom */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
            <span className="text-stone-400 text-[11px]">{u.createdAt}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenPasswordModal}
                className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition"
                title={isHi ? 'पासवर्ड बदलें' : 'Change Password'}
              >
                <KeyRound className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteUser(u._id || u.id, u.fullname, u)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition"
                title={isHi ? 'व्यवस्थापक हटाएं' : 'Remove Admin'}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
