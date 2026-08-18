import React from 'react';
import ConstructionHero from '../components/about/construction/ConstructionHero';
import ConstructionOverview from '../components/about/construction/ConstructionOverview';
import ConstructionArchitecture from '../components/about/construction/ConstructionArchitecture';
import ConstructionProgress from '../components/about/construction/ConstructionProgress';

export default function ConstructionPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <ConstructionHero />
      <ConstructionOverview />
      <ConstructionArchitecture />
      <ConstructionProgress />
    </main>
  );
}
