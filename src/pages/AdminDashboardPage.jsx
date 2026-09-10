import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import DashboardSidebar from '../components/dashboard/sidebar/DashboardSidebar';
import DashboardHeader from '../components/dashboard/header/DashboardHeader';
import DashboardOverview from '../components/dashboard/overview/DashboardOverview';
import DailyShringarManagement from '../components/dashboard/daily-shringar/DailyShringarManagement';
import PoojaBookingManagement from '../components/dashboard/pooja-booking/PoojaBookingManagement';
import RoomBookingManagement from '../components/dashboard/room-booking/RoomBookingManagement';
import PrasadBookingManagement from '../components/dashboard/prasad-booking/PrasadBookingManagement';
import CatalogueManagement from '../components/dashboard/pooja-catalogue/CatalogueManagement';
import PaymentHistory from '../components/dashboard/payments/PaymentHistory';
import DonationManagement from '../components/dashboard/donation/DonationManagement';
import SevaDaanManagement from '../components/dashboard/seva-daan/SevaDaanManagement';
import GalleryManagement from '../components/dashboard/gallery/GalleryManagement';
import MediaCoverageManagement from '../components/dashboard/media-coverage/MediaCoverageManagement';
import UserManagement from '../components/dashboard/users/UserManagement';
import SystemConfig from '../components/dashboard/config/SystemConfig';

// Every section the dashboard can render, and which roles may see it. The tab
// id doubles as the URL segment (/admin/<id>).
const ALL_TABS = ['overview', 'daily-shringar', 'pooja-booking', 'room-booking', 'prasad-booking', 'pooja-catalogue', 'payment-history', 'donation', 'seva-daan', 'gallery', 'media-coverage', 'users', 'config'];
const ADMIN_TABS = ['daily-shringar', 'pooja-booking', 'room-booking', 'prasad-booking', 'pooja-catalogue', 'gallery', 'media-coverage'];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const { tab } = useParams();
  const navigate = useNavigate();

  const userRoleStr = (user?.role || 'Super Admin').toLowerCase().replace(/[\s_-]/g, '');
  const isSuperAdmin = userRoleStr === 'superadmin';

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const defaultTab = isSuperAdmin ? 'overview' : 'daily-shringar';
  const permittedTabs = isSuperAdmin ? ALL_TABS : ADMIN_TABS;

  // The active section is derived from the URL, so a refresh (and browser
  // back/forward) keeps you where you were. `/admin` with no tab, an unknown
  // tab, or a tab this role can't see all fall back to the default section.
  const activeTab = tab || defaultTab;
  if (!permittedTabs.includes(activeTab)) {
    return <Navigate to={`/admin/${defaultTab}`} replace />;
  }

  // Selecting a section navigates to its route; passed to the sidebar and the
  // overview's shortcut cards in place of the old setState so they keep working.
  const setActiveTab = (tabId) => navigate(`/admin/${tabId}`);

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview':
        return isHi ? 'डैशबोर्ड सारांश' : 'Dashboard Overview';
      case 'daily-shringar':
        return isHi ? 'दैनिक शृंगार दर्शन प्रबंधन' : 'Daily Shringar Management';
      case 'pooja-booking':
        return isHi ? 'पूजा एवं अनुष्ठान बुकिंग' : 'Pooja Bookings';
      case 'room-booking':
        return isHi ? 'कक्ष बुकिंग' : 'Room Bookings';
      case 'prasad-booking':
        return isHi ? 'प्रसाद बुकिंग' : 'Prasad Bookings';
      case 'pooja-catalogue':
        return isHi ? 'कैटलॉग' : 'Catalogue';
      case 'payment-history':
        return isHi ? 'संपूर्ण भुगतान इतिहास' : 'Complete Payment History';
      case 'donation':
        return isHi ? 'दान एवं सेवा प्रबंधन' : 'Donations & Seva Funds';
      case 'seva-daan':
        return isHi ? 'सेवा दान प्रबंधन' : 'Seva Daan Management';
      case 'gallery':
        return isHi ? 'फोटो एवं वीडियो' : 'Photos & Videos Management';
      case 'media-coverage':
        return isHi ? 'मीडिया कवरेज प्रबंधन' : 'Media Coverage & Press';
      case 'users':
        return isHi ? 'उपयोगकर्ता निर्माण एवं प्रबंधन' : 'User Creation & Management';
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
          {activeTab === 'daily-shringar' && <DailyShringarManagement />}
          {activeTab === 'pooja-booking' && <PoojaBookingManagement />}
          {activeTab === 'room-booking' && <RoomBookingManagement />}
          {activeTab === 'prasad-booking' && <PrasadBookingManagement />}
          {activeTab === 'pooja-catalogue' && <CatalogueManagement />}
          {activeTab === 'payment-history' && <PaymentHistory />}
          {activeTab === 'donation' && <DonationManagement />}
          {activeTab === 'seva-daan' && <SevaDaanManagement />}
          {activeTab === 'gallery' && <GalleryManagement />}
          {activeTab === 'media-coverage' && <MediaCoverageManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'config' && <SystemConfig />}
        </main>
      </div>
    </div>
  );
}
