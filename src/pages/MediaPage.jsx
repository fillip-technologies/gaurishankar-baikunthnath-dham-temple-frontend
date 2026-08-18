import React from 'react';
import MediaHero from '../components/gallery/media/MediaHero';
import MediaArticlesList from '../components/gallery/media/MediaArticlesList';

export default function MediaPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      {/* <MediaHero /> */}
      <MediaArticlesList />
    </main>
  );
}
