import React from 'react';
import { Phone, Mail, Code, Copy, KeyRound, Trash2, UserPlus } from 'lucide-react';

export default function UserTableView({
  isHi,
  users,
  totalUsersCount,
  onToggleStatus,
  onViewJson,
  onCopyPayload,
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
              <th className="py-3 px-4">{isHi ? 'उपयोगकर्ता (fullname)' : 'User (fullname)'}</th>
              <th className="py-3 px-4">{isHi ? 'मोबाइल (mobile_number)' : 'Contact (mobile_number)'}</th>
              <th className="py-3 px-4">{isHi ? 'ईमेल (email)' : 'Email (email)'}</th>
              <th className="py-3 px-4">{isHi ? 'भूमिका' : 'Role'}</th>
              <th className="py-3 px-4">{isHi ? 'स्थिति' : 'Status'}</th>
              <th className="py-3 px-4">{isHi ? 'रजिस्टर तिथि' : 'Created'}</th>
              <th className="py-3 px-4 text-right">{isHi ? 'क्रियाएं' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-stone-500">
                  {isHi ? 'कोई उपयोगकर्ता नहीं मिला' : 'No users found matching your criteria.'}
                </td>
              </tr>
            ) : (
              users.map((u, idx) => (
                <tr key={u._id || u.id || idx} className="hover:bg-amber-50/30 transition">
                  {/* User Avatar + Fullname + ID */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c28227] to-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                        {u.fullname ? u.fullname.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-stone-900 truncate">{u.fullname || 'Admin User'}</div>
                        <div className="font-mono text-[10px] text-stone-400 truncate max-w-[120px]">{u._id || u.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Mobile Number */}
                  <td className="py-3.5 px-4 font-mono font-medium text-stone-700 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>+91 {u.mobile_number}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-4 text-stone-600 font-medium whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate max-w-[180px]">{u.email}</span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#c28227]/10 text-[#965f16] border border-[#c28227]/20">
                      {u.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      onClick={() => onToggleStatus(u.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                        u.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                          : 'bg-stone-100 text-stone-500 border-stone-300 hover:bg-stone-200'
                      }`}
                      title="Click to toggle status"
                    >
                      {u.status}
                    </button>
                  </td>

                  {/* Created At */}
                  <td className="py-3.5 px-4 text-stone-500 text-[11px] whitespace-nowrap">
                    {u.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {/* View JSON / Details */}
                      <button
                        onClick={() => onViewJson(u)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
                        title="View User JSON Payload"
                      >
                        <Code className="w-3.5 h-3.5" />
                      </button>

                      {/* Copy API Payload */}
                      <button
                        onClick={() =>
                          onCopyPayload({
                            fullname: u.fullname,
                            mobile_number: u.mobile_number,
                            email: u.email,
                            password: u.password,
                          })
                        }
                        className="p-1.5 rounded-lg text-stone-400 hover:text-amber-700 hover:bg-amber-50 transition"
                        title="Copy API Payload"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Change Password */}
                      <button
                        onClick={onOpenPasswordModal}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition"
                        title={isHi ? 'पासवर्ड बदलें' : 'Change Password'}
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDeleteUser(u._id || u.id, u.fullname, u)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete Admin"
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
            ? `कुल ${users.length} उपयोगकर्ता प्रदर्शित`
            : `Showing ${users.length} of ${totalUsersCount} total registered users`}
        </span>

        <button
          onClick={onAddNewClick}
          className="font-bold text-[#c28227] hover:underline flex items-center gap-1"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>{isHi ? '+ नया उपयोगकर्ता जोड़ें' : '+ Add Another User'}</span>
        </button>
      </div>
    </div>
  );
}
