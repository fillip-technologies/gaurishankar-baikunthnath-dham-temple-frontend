import React, { useEffect } from 'react';
import PoojaAartiHero from '../components/darshan/pooja-aarti/PoojaAartiHero';
import DailyAartiTimings from '../components/darshan/pooja-aarti/DailyAartiTimings';
import AajKaShringar from '../components/darshan/pooja-aarti/AajKaShringar';
import FullAartiLyrics from '../components/darshan/pooja-aarti/FullAartiLyrics';

export default function PoojaAartiPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <PoojaAartiHero />
      <DailyAartiTimings />
      <AajKaShringar />
      <FullAartiLyrics />
    </main>
  );
}
