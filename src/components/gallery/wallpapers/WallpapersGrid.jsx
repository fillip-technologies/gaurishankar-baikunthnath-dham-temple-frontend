import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Maximize2, X, ChevronLeft, ChevronRight, AlertCircle, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { galleryGetApi, GALLERY_DATATYPE_MAP } from '../../clientApi/allApi';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&q=60&w=800';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm animate-pulse">
      <div className="h-64 sm:h-72 w-full bg-stone-200" />
    </div>
  );
}

export default function WallpapersGrid() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const sectionRef = useRef(null);

  // ── State ───────────────────────────────────────────────────────────────────
  const [wallpapers, setWallpapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // { url, title }
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchWallpapers = async (page) => {
    setIsLoading(true);
    setError('');

    try {
      // API uses "wallpaper" (singular) for this dataType
      const res = await galleryGetApi({ page, dataType: GALLERY_DATATYPE_MAP.WALLPAPERS });
      const items = res?.data?.data ?? [];
      setWallpapers(items);
      setHasMore(items.length === 20);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        (currentLang === 'hi' ? 'वॉलपेपर लोड करने में त्रुटि हुई।' : 'Failed to load wallpapers. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWallpapers(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ── Download handler ────────────────────────────────────────────────────────
  const handleDownload = (e, imageUrl, title) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title || 'baikunthnath-dham-wallpaper'}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">

      {/* Background Watermark Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Error Banner */}
        {error && (
          <div className="mb-8 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <p className="flex-1 text-sm font-medium">{error}</p>
            <button
              onClick={() => fetchWallpapers(currentPage)}
              className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {currentLang === 'hi' ? 'पुनः प्रयास' : 'Retry'}
            </button>
          </div>
        )}

        {/* Wallpapers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {isLoading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {!isLoading && wallpapers.length === 0 && !error && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <ImageIcon className="w-12 h-12 text-stone-300 mb-4" />
              <p className="text-stone-500 font-medium text-base">
                {currentLang === 'hi' ? 'अभी कोई वॉलपेपर उपलब्ध नहीं है।' : 'No wallpapers available yet.'}
              </p>
            </div>
          )}

          {!isLoading && wallpapers.map((item) => {
            const id = item._id || item.id;
            const imageUrl = item.imageUrl || PLACEHOLDER;
            const title = item.title || 'Baikunthnath Dham Wallpaper';

            return (
              <div
                key={id}
                onClick={() => setSelectedImage({ url: imageUrl, title })}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Download Button */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <button
                      onClick={(e) => handleDownload(e, imageUrl, title)}
                      className="w-11 h-11 rounded-full bg-[#c28227] hover:bg-[#a66d1e] text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all border-2 border-white/80 cursor-pointer"
                      title={currentLang === 'hi' ? 'HD वॉलपेपर डाउनलोड करें' : 'Download HD Wallpaper'}
                    >
                      <Download className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-amber-300 flex items-center justify-center border border-amber-500/30">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Pagination Navigation Controls (Next & Back) ── */}
        {!isLoading && wallpapers.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-12 pt-6 border-t border-stone-300/60">
            {/* Previous / Back Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || isLoading}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                currentPage <= 1
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-200'
                  : 'bg-white text-stone-800 hover:bg-[#c28227] hover:text-white border border-stone-300 hover:border-[#c28227] cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{currentLang === 'hi' ? 'पिछला पृष्ठ' : 'Previous'}</span>
            </button>

            {/* Page Number Badge */}
            <div className="px-4 py-2 rounded-full bg-[#c28227]/15 border border-[#c28227]/40 text-[#c28227] font-bold text-xs sm:text-sm shadow-xs">
              <span>{currentLang === 'hi' ? `पृष्ठ ${currentPage}` : `Page ${currentPage}`}</span>
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasMore || isLoading}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                !hasMore
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-200'
                  : 'bg-white text-stone-800 hover:bg-[#c28227] hover:text-white border border-stone-300 hover:border-[#c28227] cursor-pointer'
              }`}
            >
              <span>{currentLang === 'hi' ? 'अगला पृष्ठ' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl flex flex-col items-center">

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#c28227] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Full Image */}
            <div className="relative max-h-[75vh] overflow-hidden flex items-center justify-center bg-black w-full p-2">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Bottom Bar */}
            <div className="w-full p-4 bg-[#2a080d] border-t border-amber-500/20 text-white flex justify-between items-center">
              <span className="text-xs font-bold text-amber-300 font-hindi truncate max-w-xs">
                {selectedImage.title}
              </span>
              <button
                onClick={(e) => handleDownload(e, selectedImage.url, selectedImage.title)}
                className="px-5 py-2 rounded-full bg-[#c28227] hover:bg-[#a66d1e] text-white text-xs font-bold tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-lg shrink-0 ml-4"
              >
                <Download className="w-4 h-4" />
                <span>{currentLang === 'hi' ? 'डाउनलोड करें' : 'Download Wallpaper'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
