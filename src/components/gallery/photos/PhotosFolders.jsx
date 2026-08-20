import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Folder, FolderOpen, AlertCircle, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { galleryFoldersApi, GALLERY_DATATYPE_MAP } from '../../clientApi/allApi';

// Fallback cover when a folder has no usable cover image
const PLACEHOLDER = 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=60&w=800';

// Skeleton card for loading state
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm animate-pulse">
      <div className="h-56 sm:h-64 w-full bg-stone-200" />
    </div>
  );
}

export default function PhotosFolders({ onSelectFolder }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFolders = async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await galleryFoldersApi({ dataType: GALLERY_DATATYPE_MAP.PHOTOS });
      setFolders(res?.data?.data ?? []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        (currentLang === 'hi' ? 'फ़ोल्डर लोड करने में त्रुटि हुई।' : 'Failed to load folders. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">

      {/* Background Watermark Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="mb-8 flex items-center gap-3">
          <FolderOpen className="w-6 h-6 text-[#c28227]" />
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900">
            {currentLang === 'hi' ? 'फ़ोल्डर के अनुसार छायाचित्र' : 'Photo Albums'}
          </h2>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-8 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <p className="flex-1 text-sm font-medium">{error}</p>
            <button
              onClick={fetchFolders}
              className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {currentLang === 'hi' ? 'पुनः प्रयास' : 'Retry'}
            </button>
          </div>
        )}

        {/* Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Loading skeletons */}
          {isLoading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {/* Empty state */}
          {!isLoading && folders.length === 0 && !error && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <ImageIcon className="w-12 h-12 text-stone-300 mb-4" />
              <p className="text-stone-500 font-medium text-base">
                {currentLang === 'hi' ? 'अभी कोई फ़ोल्डर उपलब्ध नहीं है।' : 'No albums available yet.'}
              </p>
            </div>
          )}

          {/* Folder Cards */}
          {!isLoading && folders.map((item) => {
            const coverUrl = item.coverThumbUrl || PLACEHOLDER;
            const count = item.count ?? 0;

            return (
              <div
                key={item.folder}
                onClick={() => onSelectFolder(item.folder)}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
              >
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-950">
                  <img
                    src={coverUrl}
                    alt={item.folder}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                  {/* Count badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30">
                      {count} {currentLang === 'hi' ? 'चित्र' : (count === 1 ? 'item' : 'items')}
                    </span>
                  </div>

                  {/* Folder name + open icon */}
                  <div className="absolute bottom-3 left-4 right-4 text-white flex items-center gap-2">
                    <Folder className="w-4 h-4 text-[#ffd700] shrink-0" />
                    <h3 className="font-bold text-sm sm:text-base font-hindi text-[#ffd700] truncate">
                      {item.folder}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
