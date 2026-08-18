import React from 'react';
import WallpapersHero from '../components/gallery/wallpapers/WallpapersHero';
import WallpapersGrid from '../components/gallery/wallpapers/WallpapersGrid';

export default function WallpapersPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      {/* <WallpapersHero /> */}
      <WallpapersGrid />
    </main>
  );
}
