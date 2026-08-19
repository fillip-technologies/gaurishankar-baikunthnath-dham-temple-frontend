import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  CalendarCheck,
  HeartHandshake,
  Image,
  Users,
  UserPlus,
  Sliders,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  ShieldCheck,
  Flame,
  Globe,
  Bell,
  Home
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import templeLogo from '../../../assets/logo.png';

export default function DashboardSidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const { user, logout, switchRole } = useAuth();
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const menuItems = [
    {
      id: 'overview',
      labelEn: 'Dashboard Overview',
      labelHi: 'डैशबोर्ड ओवरव्यू',
      icon: LayoutDashboard,
      roles: ['Super Admin'], // Super Admin Only
    },
    {
      id: 'pooja-booking',
      labelEn: 'Pooja Bookings',
      labelHi: 'पूजा बुकिंग',
      icon: CalendarCheck,
      roles: ['Super Admin', 'Admin'],
    },
    {
      id: 'donation',
      labelEn: 'Donations & Seva',
      labelHi: 'दान एवं सेवा',
      icon: HeartHandshake,
      roles: ['Super Admin'], // Super Admin Only
    },
    {
      id: 'gallery',
      labelEn: 'Media Gallery',
      labelHi: 'मीडिया एवं गैलरी',
      icon: Image,
      roles: ['Super Admin', 'Admin'],
    },
    {
      id: 'users',
      labelEn: 'User Management',
      labelHi: 'उपयोगकर्ता प्रबंधन',
      icon: UserPlus,
      roles: ['Super Admin'], // Super Admin Only
    },
    {
      id: 'config',
      labelEn: 'Mandir Settings',
      labelHi: 'मंदिर सेटिंग्स',
      icon: Sliders,
      roles: ['Super Admin'], // Super Admin Only
    },
  ];

  const userRoleStr = (user?.role || 'Super Admin').toLowerCase().replace(/[\s_-]/g, '');
  const isSuperAdmin = userRoleStr === 'superadmin';
  const currentRole = isSuperAdmin ? 'Super Admin' : 'Admin';

  const visibleMenuItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(currentRole)
  );

  const handleSelect = (tabId) => {
    setActiveTab(tabId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Professional Dark Navy / Slate Sidebar with Gold Accents */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between bg-[#0f172a] text-slate-300 border-r border-slate-800 shadow-xl transition-all duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Top Header / Branding */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 p-1 flex items-center justify-center shadow-md shrink-0">
                <img
                  src={templeLogo}
                  alt="Baikunthnath Temple Logo"
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-white tracking-tight truncate">
                    {isHi ? 'वैकुंठनाथ मंदिर' : 'Baikunthnath'}
                  </span>
                  <span className="text-[10px] font-semibold text-amber-400 tracking-wider uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    {currentRole === 'Super Admin'
                      ? (isHi ? 'मुख्य प्रशासक पोर्टल' : 'Super Admin Portal')
                      : (isHi ? 'व्यवस्थापक पोर्टल' : 'Admin Portal')}
                  </span>
                </div>
              )}
            </div>

            {/* Collapse Button (Desktop) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between ${isCollapsed ? 'text-center' : ''}`}>
              <span>{isCollapsed ? '•••' : (isHi ? 'प्रशासन' : 'Management')}</span>
              {!isCollapsed && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400/90 font-mono font-normal">
                  {currentRole === 'Super Admin' ? 'SUPER' : 'ADMIN'}
                </span>
              )}
            </div>

            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-150 group relative ${
                    isActive
                      ? 'bg-slate-800/90 text-white font-bold border border-slate-700 shadow-xs'
                      : 'text-white hover:text-white hover:bg-slate-800/70 border border-transparent'
                  }`}
                  title={isCollapsed ? (isHi ? item.labelHi : item.labelEn) : undefined}
                >
                  <Icon
                    className={`w-4 h-4 transition shrink-0 ${
                      isActive ? 'text-amber-400' : 'text-slate-300 group-hover:text-amber-300'
                    }`}
                  />

                  {!isCollapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate text-white">{isHi ? item.labelHi : item.labelEn}</span>
                      {item.roles?.length === 1 && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Super
                        </span>
                      )}
                    </div>
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-amber-400 rounded-r" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Footer, Role Switcher & Logout */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 space-y-2">
          {/* User Profile Card with Role Toggle */}
          <div className={`p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold text-xs shadow-xs shrink-0">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</div>
                  <div className="mt-1">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      currentRole === 'Super Admin'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {currentRole}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={logout}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isHi ? 'लॉगआउट' : 'Sign Out'}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>{isHi ? 'लॉगआउट' : 'Sign Out'}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
