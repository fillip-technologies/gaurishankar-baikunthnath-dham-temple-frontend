import React from 'react';
import VideosHero from '../components/gallery/videos/VideosHero';
import VideosGrid from '../components/gallery/videos/VideosGrid';

export default function VideosPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      {/* <VideosHero /> */}
      <VideosGrid />
    </main>
  );
}
