import React from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Header from './components/partials/header/Header';
import Footer from './components/partials/footer/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import HistoryPage from './pages/HistoryPage';
import ConstructionPage from './pages/ConstructionPage';
import DarshanPage from './pages/DarshanPage';
import PhotosPage from './pages/PhotosPage';
import VideosPage from './pages/VideosPage';
import WallpapersPage from './pages/WallpapersPage';
import MediaPage from './pages/MediaPage';
import MediaDetailPage from './pages/MediaDetailPage';
import PoojaBookingPage from './pages/PoojaBookingPage';
import RoomBookingPage from './pages/RoomBookingPage';
import VolunteersPage from './pages/VolunteersPage';
import PriestPage from './pages/PriestPage';
import TrustMembersPage from './pages/TrustMembersPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AskNandiChatbot from './components/common/AskNandiChatbot';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 selection:bg-[#c28227] selection:text-white flex flex-col justify-between relative">
      <Header />
      <Outlet />
      <AskNandiChatbot />
      <Footer />
    </div>
  );
}

function AdminLoginWrapper() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return <AdminLoginPage />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Devotee Pages with Public Header & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/construction" element={<ConstructionPage />} />
        <Route path="/darshan" element={<DarshanPage />} />

        <Route path="/gallery/photos" element={<PhotosPage />} />
        <Route path="/gallery/videos" element={<VideosPage />} />
        <Route path="/gallery/wallpapers" element={<WallpapersPage />} />
        <Route path="/gallery/media" element={<MediaPage />} />
        <Route path="/gallery/media/:id" element={<MediaDetailPage />} />

        <Route path="/online-services/pooja-booking" element={<PoojaBookingPage />} />
        <Route path="/online-services/room-booking" element={<RoomBookingPage />} />
        <Route path="/online-services/volunteers" element={<VolunteersPage />} />

        <Route path="/members/priest" element={<PriestPage />} />
        <Route path="/members/trust-members" element={<TrustMembersPage />} />

        {/* Public Admin Login Route */}
        <Route path="/admin/login" element={<AdminLoginWrapper />} />
      </Route>

      {/* Protected Admin Portal with Dedicated Admin Layout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
