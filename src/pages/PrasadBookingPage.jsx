import React, { useState } from 'react';
import PrasadBookingHero from '../components/online-services/prasad-booking/PrasadBookingHero';
import PrasadCatalogue from '../components/online-services/prasad-booking/PrasadCatalogue';
import PrasadCheckout from '../components/online-services/prasad-booking/PrasadCheckout';

export default function PrasadBookingPage() {
  // null = catalogue view, object = checkout view
  const [selection, setSelection] = useState(null);

  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <PrasadBookingHero />
      {selection
        ? <PrasadCheckout selection={selection} onBack={() => setSelection(null)} />
        : <PrasadCatalogue onProceed={(sel) => setSelection(sel)} />
      }
    </main>
  );
}
