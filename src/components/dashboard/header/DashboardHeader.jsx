import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  Search,
  Bell,
  Globe,
  ExternalLink,
  Sparkles,
  Radio,
  Clock,
  User,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function DashboardHeader({ setIsMobileOpen, activeTabTitle }) {
  const { user, logout } = useAuth();
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      type: 'booking',
      titleEn: 'New Pooja Booking Received',
      titleHi: 'नई पूजा बुकिंग प्राप्त हुई',
      descEn: 'Maha Rudrabhishek by Rajesh Sharma for tomorrow 07:00 AM',
      descHi: 'कल सुबह 07:00 बजे राजेश शर्मा द्वारा महारुद्राभिषेक',
      time: '5m ago',
      unread: true,
    },
    {
      id: 2,
      type: 'donation',
      titleEn: 'New Seva Donation: ₹21,000',
      titleHi: 'नया सेवा दान: ₹21,000',
      descEn: 'Received for Mandir Nirman Nidhi via UPI',
      descHi: 'यूपीआई द्वारा मंदिर निर्माण निधि के लिए प्राप्त',
      time: '35m ago',
      unread: true,
    },
    {
      id: 3,
      type: 'system',
      titleEn: 'Live Stream Darshan Active',
      titleHi: 'लाइव दर्शन प्रसारण सक्रिय है',
      descEn: 'Over 1,240 devotees currently watching live sanctum stream',
      descHi: '1,240 से अधिक श्रद्धालु वर्तमान में लाइव दर्शन कर रहे हैं',
      time: '1h ago',
      unread: true,
    },
  ];

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

      {/* Center section: Live Mandir Status Pill */}
      <div className="hidden md:flex items-center gap-3 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <Radio className="w-3.5 h-3.5" />
          <span className="font-semibold">{isHi ? 'लाइव दर्शन' : 'Darshan Live'}</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center gap-1.5 text-slate-600">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>{isHi ? 'अगली आरती: संध्या 06:30 PM' : 'Next: Sandhya Aarti 06:30 PM'}</span>
        </div>
      </div>

      {/* Right section: Lang, Public View, Notifications, Profile */}
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

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200/80 relative transition"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-sm text-slate-900">{isHi ? 'सूचनाएं' : 'Notifications'}</span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setUnreadCount(0)}
                    className="text-[11px] font-medium text-amber-600 hover:underline"
                  >
                    {isHi ? 'सभी को पढ़ा हुआ चिह्नित करें' : 'Mark all read'}
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl border transition ${
                      n.unread
                        ? 'bg-amber-50/50 border-amber-200/60'
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-slate-900">{isHi ? n.titleHi : n.titleEn}</h4>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">{isHi ? n.descHi : n.descEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
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
                <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">
                  {user?.role || 'Super Admin'}
                </span>
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
