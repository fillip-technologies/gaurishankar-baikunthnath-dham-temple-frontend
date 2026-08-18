import React from 'react';
import PhotosHero from '../components/gallery/photos/PhotosHero';
import PhotosGrid from '../components/gallery/photos/PhotosGrid';

export default function PhotosPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      {/* <PhotosHero /> */}
      <PhotosGrid />
    </main>
  );
}
