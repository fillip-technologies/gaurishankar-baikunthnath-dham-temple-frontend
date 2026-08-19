import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  Globe,
  ExternalLink,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function DashboardHeader({ setIsMobileOpen, activeTabTitle }) {
  const { user, logout } = useAuth();
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleLanguage = () => {
    const nextLang = isHi ? 'en' : 'hi';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all">
      {/* Left section: Hamburger & Clean Title */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {activeTabTitle}
          </h1>
        </div>
      </div>

      {/* Right section: Lang, Public View, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition"
          title={isHi ? 'Switch to English' : 'हिंदी में बदलें'}
        >
          <Globe className="w-3.5 h-3.5 text-amber-600" />
          <span>{isHi ? 'English' : 'हिंदी'}</span>
        </button>

        {/* Public Website Shortcut */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/70 text-amber-800 border border-amber-200 text-xs font-semibold transition"
          title={isHi ? 'मुख्य वेबसाइट देखें' : 'View Public Website'}
        >
          <span>{isHi ? 'मुख्य वेबसाइट' : 'View Site'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-lg hover:bg-slate-100 border border-slate-200/80 transition"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-[120px] truncate">
              {user?.name || 'Admin'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-2">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@baikunthnath.org'}</p>
                <div className="mt-1.5">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                    (user?.role || 'Super Admin') === 'Super Admin'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {user?.role || 'Super Admin'}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{isHi ? 'लॉगआउट करें' : 'Sign Out'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
