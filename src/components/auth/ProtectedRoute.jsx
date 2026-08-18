import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProtectedRoute({ allowedRoles, requiredPermission }) {
  const { isAuthenticated, hasRole, hasPermission, user } = useAuth();
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const roleAccess = allowedRoles ? hasRole(allowedRoles) : true;
  const permissionAccess = requiredPermission ? hasPermission(requiredPermission) : true;

  if (!roleAccess || !permissionAccess) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-stone-900/80 border border-amber-900/40 backdrop-blur-xl p-8 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-amber-100 mb-2">
            {isHi ? 'एक्सेस सीमित है' : 'Access Restricted'}
          </h2>

          <p className="text-stone-400 text-sm mb-6 leading-relaxed">
            {isHi
              ? `आपके वर्तमान रोल (${user?.role || 'Guest'}) के पास इस पृष्ठ को देखने की अनुमति नहीं है। केवल Super Admin ही इसे एक्सेस कर सकते हैं।`
              : `Your active role (${user?.role || 'Guest'}) does not have permission to view this module. Super Admin privileges are required.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/admin/dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c28227] to-amber-600 text-stone-950 font-semibold hover:brightness-110 transition shadow-lg text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {isHi ? 'डैशबोर्ड ओवरव्यू पर जाएं' : 'Back to Overview'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
