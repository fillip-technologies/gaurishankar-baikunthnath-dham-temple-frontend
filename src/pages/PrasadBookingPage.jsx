import React from 'react';
import PrasadBookingHero from '../components/online-services/prasad-booking/PrasadBookingHero';
import PrasadBookingForm from '../components/online-services/prasad-booking/PrasadBookingForm';

export default function PrasadBookingPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <PrasadBookingHero />
      <PrasadBookingForm />
    </main>
  );
}
