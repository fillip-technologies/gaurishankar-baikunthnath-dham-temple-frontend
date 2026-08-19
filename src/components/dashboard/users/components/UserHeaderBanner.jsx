import React from 'react';
import { UserPlus, Users, KeyRound } from 'lucide-react';

export default function UserHeaderBanner({
  isHi,
  activeSubTab,
  setActiveSubTab,
  totalUsers,
  onResetCreateForm,
  onOpenPasswordModal,
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-5 text-white shadow-lg border border-slate-700/60 relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
              <UserPlus className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {isHi ? 'प्रशासक निर्माण एवं प्रबंधन' : 'Admin Creation & Management'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl font-normal">
            {isHi
              ? 'नया व्यवस्थापक खाता बनाएं, पासवर्ड प्रबंधित करें और पंजीकृत व्यवस्थापकों की सूची देखें।'
              : 'Create system administrators, update access credentials, and manage registered admin accounts.'}
          </p>
        </div>

        {/* Action Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenPasswordModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition shadow-sm"
            title={isHi ? 'पासवर्ड बदलें' : 'Change Password'}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{isHi ? 'पासवर्ड बदलें' : 'Change Password'}</span>
          </button>

          <button
            onClick={() => {
              if (onResetCreateForm) onResetCreateForm();
              setActiveSubTab('create');
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-sm ${
              activeSubTab === 'create'
                ? 'bg-white text-slate-950 shadow-md'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>{isHi ? '+ व्यवस्थापक बनाएं' : '+ Create Admin'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('list')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition border ${
              activeSubTab === 'list'
                ? 'bg-slate-700/80 text-white border-slate-500'
                : 'bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 border-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isHi ? 'व्यवस्थापक सूची' : 'Admins List'} ({totalUsers})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
