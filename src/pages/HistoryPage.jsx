import React from 'react';
import HistoryHero from '../components/about/history/HistoryHero';
import HistoryOverview from '../components/about/history/HistoryOverview';
import HistoryTimeline from '../components/about/history/HistoryTimeline';
import HistoryHeritageCards from '../components/about/history/HistoryHeritageCards';

export default function HistoryPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <HistoryHero />
      <HistoryOverview />
      <HistoryTimeline />
      <HistoryHeritageCards />
    </main>
  );
}
