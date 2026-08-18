import React from 'react';
import PoojaBookingHero from '../components/online-services/pooja-booking/PoojaBookingHero';
import PoojaList from '../components/online-services/pooja-booking/PoojaList';

export default function PoojaBookingPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <PoojaBookingHero />
      <PoojaList />
    </main>
  );
}
