import React from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/auth/LoginForm';

export default function AdminLoginPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <main className="w-full bg-stone-950 text-white min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Radial Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:24px_24px] z-0" />
      
      {/* Golden Glowing Radial Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amber-600/10 via-[#c28227]/15 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto relative z-10 my-auto">
        <LoginForm />
      </div>
    </main>
  );
}
