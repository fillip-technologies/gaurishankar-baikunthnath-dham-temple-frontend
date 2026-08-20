import React, { useState } from 'react';
import PhotosHero from '../components/gallery/photos/PhotosHero';
import PhotosFolders from '../components/gallery/photos/PhotosFolders';
import PhotosGrid from '../components/gallery/photos/PhotosGrid';

export default function PhotosPage() {
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      {/* <PhotosHero /> */}
      {selectedFolder === null ? (
        <PhotosFolders onSelectFolder={setSelectedFolder} />
      ) : (
        <PhotosGrid folder={selectedFolder} onBack={() => setSelectedFolder(null)} />
      )}
    </main>
  );
}
