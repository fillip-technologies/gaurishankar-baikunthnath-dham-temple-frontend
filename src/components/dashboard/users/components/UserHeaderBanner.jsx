import React from 'react';
import { UserPlus, Users, Code, CheckCircle2 } from 'lucide-react';

export default function UserHeaderBanner({
  isHi,
  activeSubTab,
  setActiveSubTab,
  totalUsers,
  onResetCreateForm,
  onOpenPasswordModal,
  onRefreshAdmins,
  isLoadingAdmins,
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
              ? 'नया व्यवस्थापक बनाएं (POST /api/v1/auth/create_admin), पासवर्ड प्रबंधित करें और सर्वर से व्यवस्थापकों की सूची देखें।'
              : 'Create system admins via API, update credentials, and view registered administrators.'}
          </p>
        </div>

        {/* Action Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenPasswordModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition shadow-sm"
            title="Update Password"
          >
            <Code className="w-3.5 h-3.5" />
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

      {/* Schema / Status Footer */}
      <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
        <div className="flex items-center gap-2 font-mono bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-700">
          <Code className="w-3.5 h-3.5 text-amber-400" />
          <span>
            Schema: <span className="text-amber-300">fullname</span>,{' '}
            <span className="text-amber-300">mobile_number</span>,{' '}
            <span className="text-amber-300">email</span>,{' '}
            <span className="text-amber-300">password</span>
          </span>
        </div>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {isHi ? 'फ्रंटएंड तैयार - API इंटीग्रेशन हेतु तैयार' : 'Frontend Ready for API Integration'}
        </span>
      </div>
    </div>
  );
}
