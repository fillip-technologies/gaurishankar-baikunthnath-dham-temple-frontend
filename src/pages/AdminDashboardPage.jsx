import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardSidebar from '../components/dashboard/sidebar/DashboardSidebar';
import DashboardHeader from '../components/dashboard/header/DashboardHeader';
import DashboardOverview from '../components/dashboard/overview/DashboardOverview';
import PoojaBookingManagement from '../components/dashboard/pooja-booking/PoojaBookingManagement';
import DonationManagement from '../components/dashboard/donation/DonationManagement';
import GalleryManagement from '../components/dashboard/gallery/GalleryManagement';
import UserManagement from '../components/dashboard/users/UserManagement';
import SystemConfig from '../components/dashboard/config/SystemConfig';

export default function AdminDashboardPage() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview':
        return isHi ? 'डैशबोर्ड सारांश' : 'Dashboard Overview';
      case 'pooja-booking':
        return isHi ? 'पूजा एवं अनुष्ठान बुकिंग' : 'Pooja Bookings';
      case 'donation':
        return isHi ? 'दान एवं सेवा प्रबंधन' : 'Donations & Seva Funds';
      case 'gallery':
        return isHi ? 'मीडिया एवं गैलरी' : 'Media & Gallery Management';
      case 'users':
        return isHi ? 'पुजारी, न्यास सदस्य एवं सेवक' : 'Devotees, Priests & Staff';
      case 'config':
        return isHi ? 'मंदिर एवं सिस्टम सेटिंग्स' : 'Mandir Settings & Config';
      default:
        return 'Admin Portal';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-stone-900 selection:bg-[#c28227] selection:text-white flex relative overflow-x-hidden font-sans">
      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Layout */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Admin Header */}
        <DashboardHeader
          setIsMobileOpen={setIsMobileOpen}
          activeTabTitle={getTabTitle()}
        />

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 relative z-10 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && <DashboardOverview setActiveTab={setActiveTab} />}
          {activeTab === 'pooja-booking' && <PoojaBookingManagement />}
          {activeTab === 'donation' && <DonationManagement />}
          {activeTab === 'gallery' && <GalleryManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'config' && <SystemConfig />}
        </main>
      </div>
    </div>
  );
}
