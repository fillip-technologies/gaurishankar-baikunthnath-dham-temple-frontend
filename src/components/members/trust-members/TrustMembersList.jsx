import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import member1 from '../../../assets/home/herosection-3.png';
import member2 from '../../../assets/home/upcoming-festival.png';
import member3 from '../../../assets/home/herosection-2.png';
import member4 from '../../../assets/home/herosection.png';

export default function TrustMembersList() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const members = [
    {
      id: 1,
      image: member1,
      name: t('trustMembersPage.members.0.name', 'Dr. Vijay Kumar Singh alias Shyam Nath Singh'),
      designation: t('trustMembersPage.members.0.designation', 'Treasurer (कोषाध्यक्ष)')
    },
    {
      id: 2,
      image: member2,
      name: t('trustMembersPage.members.1.name', 'Raja Ram Singh'),
      designation: t('trustMembersPage.members.1.designation', 'Secretary (सचिव)')
    },
    {
      id: 3,
      image: member3,
      name: t('trustMembersPage.members.2.name', 'Pt. Shambhuth Nath Shastri'),
      designation: t('trustMembersPage.members.2.designation', 'Trustee & Senior Patron')
    },
    {
      id: 4,
      image: member4,
      name: t('trustMembersPage.members.3.name', 'Brijesh Kumar Sinha'),
      designation: t('trustMembersPage.members.3.designation', 'Executive Trustee')
    },
    {
      id: 5,
      image: member1,
      name: t('trustMembersPage.members.4.name', 'Sunil Kumar Gupta'),
      designation: t('trustMembersPage.members.4.designation', 'Trust Board Member')
    },
    {
      id: 6,
      image: member2,
      name: t('trustMembersPage.members.5.name', 'Prof. Harishchandra Verma'),
      designation: t('trustMembersPage.members.5.designation', 'Honorary Advisor & Trustee')
    }
  ];

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Background Watermark Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#c28227] text-xs font-hindi tracking-widest">
            <Sparkles className="w-4 h-4 text-[#c28227]" />
            <span>॥ श्री गौरी शंकर बैकुंठ नाथ धाम न्यास समिति ॥</span>
            <Sparkles className="w-4 h-4 text-[#c28227]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight ${
            currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
          }`}>
            Nyas Samiti & Trust Board Members
          </h2>

          <div className="w-24 h-[2px] bg-[#c28227] mx-auto my-2" />
        </div>

        {/* 3-Column Trust Members Grid (Single Row of 3 on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {members.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 hover:border-[#c28227] flex flex-col justify-between"
            >
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                

              </div>

              {/* Member Name Section */}
              <div className="p-5 text-center bg-white space-y-1">
                <p className="text-xs font-bold text-[#c28227] uppercase tracking-wider font-hindi">
                  {member.designation}
                </p>

                <h3 className={`text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#c28227] transition-colors leading-snug ${
                  currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
                }`}>
                  {member.name}
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
