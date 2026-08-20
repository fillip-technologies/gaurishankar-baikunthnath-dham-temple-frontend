import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, X, ChevronLeft, ChevronRight, AlertCircle, RefreshCw, Video as VideoIcon } from 'lucide-react';
import { galleryGetApi, GALLERY_DATATYPE_MAP } from '../../clientApi/allApi';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=60&w=800';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm animate-pulse">
      <div className="h-64 sm:h-72 w-full bg-stone-200" />
    </div>
  );
}

export default function VideosGrid() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const sectionRef = useRef(null);

  // ── State ───────────────────────────────────────────────────────────────────
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchVideos = async (page) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await galleryGetApi({ page, dataType: GALLERY_DATATYPE_MAP.VIDEOS });
      const items = res?.data?.data ?? [];
      setVideos(items);
      setHasMore(items.length === 20);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        (currentLang === 'hi' ? 'वीडियो लोड करने में त्रुटि हुई।' : 'Failed to load videos. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
              onClick={() => fetchVideos(currentPage)}
              className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {currentLang === 'hi' ? 'पुनः प्रयास' : 'Retry'}
            </button>
          </div>
        )}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {isLoading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {!isLoading && videos.length === 0 && !error && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <VideoIcon className="w-12 h-12 text-stone-300 mb-4" />
              <p className="text-stone-500 font-medium text-base">
                {currentLang === 'hi' ? 'अभी कोई वीडियो उपलब्ध नहीं है।' : 'No videos available yet.'}
              </p>
            </div>
          )}

          {!isLoading && videos.map((video) => {
            const id = video._id || video.id;
            const thumbUrl = video.thumbUrl || video.imageUrl || PLACEHOLDER;
            const title = video.title || (currentLang === 'hi' ? 'मंदिर वीडियो' : 'Temple Video');
            const category = video.category || video.dataType || '';
            const videoUrl = video.videoUrl || video.imageUrl || '';

            return (
              <div
                key={id}
                onClick={() => setSelectedVideo({ id, thumbUrl, title, category, videoUrl })}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
                  <img
                    src={thumbUrl}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                  {/* Category badge */}
                  {category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30 capitalize">
                        {category}
                      </span>
                    </div>
                  )}

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#c28227] text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-red-600 transition-all duration-300 border-2 border-amber-200/50">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Title */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-bold text-sm sm:text-base font-hindi text-[#ffd700] truncate">
                      {title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Pagination Navigation Controls (Next & Back) ── */}
        {!isLoading && videos.length > 0 && (
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

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">

            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#c28227] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Player */}
            <div className="w-full aspect-video bg-black flex items-center justify-center">
              {selectedVideo.videoUrl ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={selectedVideo.thumbUrl}
                >
                  {currentLang === 'hi' ? 'आपका ब्राउज़र वीडियो का समर्थन नहीं करता।' : 'Your browser does not support the video tag.'}
                </video>
              ) : (
                <img src={selectedVideo.thumbUrl} alt={selectedVideo.title} className="max-h-full object-contain" />
              )}
            </div>

            <div className="p-4 sm:p-5 bg-[#2a080d] border-t border-amber-500/20 text-white flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-bold text-[#ffd700] font-hindi truncate">
                {selectedVideo.title}
              </h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-1.5 rounded-full bg-[#c28227] hover:bg-[#a66d1e] text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer shrink-0 ml-4"
              >
                {currentLang === 'hi' ? 'बंद करें' : 'Close Video'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
