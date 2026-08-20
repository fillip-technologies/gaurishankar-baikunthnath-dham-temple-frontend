import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MediaDetail from '../components/gallery/media/MediaDetail';

export default function MediaDetailPage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <MediaDetail articleId={id} />
    </main>
  );
}
