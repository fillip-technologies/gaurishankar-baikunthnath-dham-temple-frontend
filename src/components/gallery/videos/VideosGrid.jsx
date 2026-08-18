import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, X, Sparkles, Clock } from 'lucide-react';
import thumbAarti from '../../../assets/home/herosection-3.png';
import thumbGanga from '../../../assets/home/herosection-2.png';
import thumbFestival from '../../../assets/home/upcoming-festival.png';
import thumbMandir from '../../../assets/home/herosection.png';

export default function VideosGrid() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const categories = [
    { id: 'all', label: t('videosPage.categories.all', 'All Videos') },
    { id: 'aarti', label: t('videosPage.categories.aarti', 'Daily Aarti & Rituals') },
    { id: 'festivals', label: t('videosPage.categories.festivals', 'Festivals & Utsav') },
    { id: 'bhajans', label: t('videosPage.categories.bhajans', 'Kirtan & Bhajans') },
    { id: 'documentary', label: t('videosPage.categories.documentary', 'Mandir Documentary') },
  ];

  const videoList = [
    {
      id: 1,
      category: 'aarti',
      image: thumbAarti,
      title: t('videosPage.videos.0.title', 'Shri Baikunthnath Pratah Mangal Aarti'),
      videoUrl: 'https://www.youtube.com/embed/pXXBuOyYi6I',
      duration: t('videosPage.videos.0.duration', '12:45')
    },
    {
      id: 2,
      category: 'festivals',
      image: thumbFestival,
      title: t('videosPage.videos.1.title', 'Grand Shravan Somvar Mahaganga Aarti'),
      videoUrl: 'https://www.youtube.com/embed/pXXBuOyYi6I',
      duration: t('videosPage.videos.1.duration', '18:20')
    },
    {
      id: 3,
      category: 'aarti',
      image: thumbGanga,
      title: t('videosPage.videos.2.title', 'Sandhya Aarti & Deepotsav at Baikathpur'),
      videoUrl: 'https://www.youtube.com/embed/pXXBuOyYi6I',
      duration: t('videosPage.videos.2.duration', '15:10')
    },
    {
      id: 4,
      category: 'documentary',
      image: thumbMandir,
      title: t('videosPage.videos.3.title', 'Glory of Shri Gaurishankar Baikunthnath Dham'),
      videoUrl: 'https://www.youtube.com/embed/pXXBuOyYi6I',
      duration: t('videosPage.videos.3.duration', '25:30')
    },
    {
      id: 5,
      category: 'festivals',
      image: thumbFestival,
      title: t('videosPage.videos.4.title', 'Shri Krishna Janmashtami Midnight Darshan'),
      videoUrl: 'https://www.youtube.com/embed/pXXBuOyYi6I',
      duration: t('videosPage.videos.4.duration', '14:15')
    },
    {
      id: 6,
      category: 'bhajans',
      image: thumbAarti,
      title: t('videosPage.videos.5.title', 'Divine Harihara Vedic Chanting & Kirtan'),
      videoUrl: 'https://www.youtube.com/embed/pXXBuOyYi6I',
      duration: t('videosPage.videos.5.duration', '20:00')
    }
  ];

  const filteredVideos = activeCategory === 'all'
    ? videoList
    : videoList.filter((item) => item.category === activeCategory);

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
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#c28227] text-white shadow-md scale-105'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Videos Grid Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-amber-200 text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{video.duration}</span>
                </div>

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#c28227] text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-red-600 transition-all duration-300 border-2 border-amber-200/50">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay Title Only */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-bold text-sm sm:text-base font-hindi text-[#ffd700] truncate">
                    {video.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#c28227] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* YouTube Video iFrame */}
            <div className="w-full aspect-video bg-black">
              <iframe
                src={`${selectedVideo.videoUrl}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Bottom Caption */}
            <div className="p-4 sm:p-5 bg-[#2a080d] border-t border-amber-500/20 text-white flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-bold text-[#ffd700] font-hindi truncate">
                {selectedVideo.title}
              </h3>

              <button
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-1.5 rounded-full bg-[#c28227] hover:bg-[#a66d1e] text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer shrink-0 ml-4"
              >
                Close Video
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
