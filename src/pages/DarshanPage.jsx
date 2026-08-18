import React from 'react';
import DarshanHero from '../components/darshan/DarshanHero';
import LiveDarshanBlock from '../components/darshan/LiveDarshanBlock';
import VirtualTourBlock from '../components/darshan/VirtualTourBlock';

export default function DarshanPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <DarshanHero />
      <LiveDarshanBlock />
      <VirtualTourBlock />
    </main>
  );
}
