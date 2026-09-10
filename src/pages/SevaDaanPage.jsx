import React from 'react';
import { Sun, Utensils, BookOpen } from 'lucide-react';
import SevaDaanHero from '../components/online-services/seva-daan/SevaDaanHero';
import DonationSection from '../components/home/DonationSection';

const SEVA_CAUSES = [
  { id: 'anna-daan', en: 'Nitya Anna Daan Seva', hi: 'नित्य अन्नदान सेवा', Icon: Utensils },
  { id: 'gau-seva', en: 'Gau Seva & Chara Fund', hi: 'गौ सेवा एवं चारा कोष', Icon: Sun },
  { id: 'veda-pathshala', en: 'Vidyarthi Seva & Veda Pathshala', hi: 'वेद पाठशाला एवं विद्यार्थी सेवा', Icon: BookOpen },
];

export default function SevaDaanPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <SevaDaanHero />
      <DonationSection causes={SEVA_CAUSES} />
    </main>
  );
}
