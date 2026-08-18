import React from 'react';
import PriestHero from '../components/members/priest/PriestHero';
import PriestList from '../components/members/priest/PriestList';

export default function PriestPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <PriestHero />
      <PriestList />
    </main>
  );
}
