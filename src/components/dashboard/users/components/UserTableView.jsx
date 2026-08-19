import React from 'react';
import { Phone, Mail, KeyRound, Trash2, UserPlus } from 'lucide-react';

export default function UserTableView({
  isHi,
  users,
  totalUsersCount,
  onToggleStatus,
  onOpenPasswordModal,
  onDeleteUser,
  onAddNewClick,
}) {
  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-600 text-[11px] font-bold">
              <th className="py-3.5 px-4">{isHi ? 'व्यवस्थापक का नाम' : 'Admin Name'}</th>
              <th className="py-3.5 px-4">{isHi ? 'मोबाइल नंबर' : 'Mobile Number'}</th>
              <th className="py-3.5 px-4">{isHi ? 'ईमेल पता' : 'Email Address'}</th>
              <th className="py-3.5 px-4">{isHi ? 'भूमिका' : 'Role'}</th>
              <th className="py-3.5 px-4">{isHi ? 'स्थिति' : 'Status'}</th>
              <th className="py-3.5 px-4">{isHi ? 'पंजीकरण तिथि' : 'Created Date'}</th>
              <th className="py-3.5 px-4 text-right">{isHi ? 'कार्रवाई' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-stone-500">
                  {isHi ? 'कोई व्यवस्थापक नहीं मिला' : 'No administrators found.'}
                </td>
              </tr>
            ) : (
              users.map((u, idx) => (
                <tr key={u._id || u.id || idx} className="hover:bg-amber-50/30 transition">
                  {/* User Avatar + Fullname */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c28227] to-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                        {u.fullname ? u.fullname.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-stone-900 truncate">{u.fullname || 'Admin User'}</div>
                      </div>
                    </div>
                  </td>

                  {/* Mobile Number */}
                  <td className="py-3.5 px-4 font-medium text-stone-700 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>+91 {u.mobile_number}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-4 text-stone-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{u.email}</span>
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        u.role === 'Super Admin'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}
                    >
                      {u.role || 'Admin'}
                    </span>
                  </td>

                  {/* Status Toggle Button */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      onClick={() => onToggleStatus(u._id || u.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition ${
                        u.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          u.status === 'Active' ? 'bg-emerald-500' : 'bg-stone-400'
                        }`}
                      />
                      <span>{u.status === 'Active' ? (isHi ? 'सक्रिय' : 'Active') : (isHi ? 'निष्क्रिय' : 'Inactive')}</span>
                    </button>
                  </td>

                  {/* Created Date */}
                  <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap text-[11px]">
                    {u.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {/* Change Password */}
                      <button
                        onClick={onOpenPasswordModal}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition"
                        title={isHi ? 'पासवर्ड बदलें' : 'Change Password'}
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDeleteUser(u._id || u.id, u.fullname, u)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50 transition"
                        title={isHi ? 'व्यवस्थापक हटाएं' : 'Remove Admin'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 bg-stone-50/60 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <span>
          {isHi
            ? `कुल ${users.length} व्यवस्थापक प्रदर्शित`
            : `Showing ${users.length} of ${totalUsersCount} total registered administrators`}
        </span>

        <button
          onClick={onAddNewClick}
          className="font-bold text-[#c28227] hover:underline flex items-center gap-1"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>{isHi ? '+ नया व्यवस्थापक जोड़ें' : '+ Add New Administrator'}</span>
        </button>
      </div>
    </div>
  );
}
