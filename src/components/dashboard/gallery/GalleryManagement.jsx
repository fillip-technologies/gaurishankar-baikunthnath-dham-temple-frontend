import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Video,
  Film,
  Newspaper,
  UploadCloud,
  PlusCircle,
  Search,
  Trash2,
  Eye,
  Star,
  Sparkles,
  ExternalLink,
  Check
} from 'lucide-react';

export default function GalleryManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [activeType, setActiveType] = useState('PHOTOS');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [mediaItems, setMediaItems] = useState([
    {
      id: 'MED-101',
      type: 'PHOTOS',
      titleEn: 'Shri Baikunthnath Sanctum Shringar',
      titleHi: 'श्री वैकुंठनाथ गर्भगृह दिव्य श्रृंगार दर्शन',
      category: 'Darshan',
      url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800',
      views: '12.4k',
      date: '2026-08-15',
      featured: true,
    },
    {
      id: 'MED-102',
      type: 'PHOTOS',
      titleEn: 'Grand Janmashtami Utsav Celebrations',
      titleHi: 'भव्य श्रीकृष्ण जन्माष्टमी जन्मोत्सव',
      category: 'Festival',
      url: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?auto=format&fit=crop&q=80&w=800',
      views: '8.1k',
      date: '2026-08-10',
      featured: false,
    },
    {
      id: 'MED-103',
      type: 'VIDEOS',
      titleEn: 'Mangala Aarti Live Broadcast Recoding',
      titleHi: 'मंगला आरती दिव्य दर्शन एवं संकीर्तन',
      category: 'Aarti',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
      views: '24.9k',
      date: '2026-08-14',
      featured: true,
    },
    {
      id: 'MED-104',
      type: 'WALLPAPERS',
      titleEn: 'Devotee HD Wallpaper: Golden Temple Gopuram',
      titleHi: 'भक्ति वॉलपेपर: स्वर्ण मंदिर गोपुरम 4K',
      category: 'Architecture',
      url: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&q=80&w=800',
      views: '5.2k',
      date: '2026-08-01',
      featured: true,
    },
    {
      id: 'MED-105',
      type: 'MEDIA',
      titleEn: 'Dainik Jagran: Historic Temple Shikhara Consecration',
      titleHi: 'दैनिक जागरण: वैकुंठनाथ मंदिर शिखर का दिव्य प्राण प्रतिष्ठा समारोह',
      category: 'Press Coverage',
      url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=800',
      views: '3.6k',
      date: '2026-07-28',
      featured: false,
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    type: 'PHOTOS',
    category: 'Darshan',
    url: '',
  });

  const filteredItems = mediaItems.filter((m) => {
    const matchesType = m.type === activeType;
    const matchesSearch =
      m.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.titleHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleToggleFeatured = (id) => {
    setMediaItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, featured: !m.featured } : m))
    );
  };

  const handleDelete = (id) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `MED-${Math.floor(100 + Math.random() * 900)}`,
      type: formData.type,
      titleEn: formData.title,
      titleHi: formData.title,
      category: formData.category,
      url:
        formData.url ||
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800',
      views: '0',
      date: new Date().toISOString().split('T')[0],
      featured: false,
    };

    setMediaItems([newEntry, ...mediaItems]);
    setIsUploadModalOpen(false);
    setFormData({
      title: '',
      type: 'PHOTOS',
      category: 'Darshan',
      url: '',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <Image className="w-6 h-6 text-[#c28227]" />
            <span>{isHi ? 'मीडिया, चित्र एवं वीडियो गैलरी प्रबंधन' : 'Media & Gallery Content Management'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi
              ? 'दर्शन छायाचित्र, आरती वीडियो, 4K वॉलपेपर और प्रेस विज्ञप्ति अपलोड व व्यवस्थित करें।'
              : 'Upload and organize sanctum photos, video streams, wallpapers, and press articles.'}
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-xs sm:text-sm hover:brightness-110 shadow-sm transition"
        >
          <UploadCloud className="w-4 h-4" />
          <span>{isHi ? 'नया मीडिया अपलोड करें' : 'Upload New Media'}</span>
        </button>
      </div>

      {/* Media Type Tabs & Search */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Type Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'PHOTOS', icon: Image, labelEn: 'Photos', labelHi: 'छायाचित्र' },
            { id: 'VIDEOS', icon: Video, labelEn: 'Videos', labelHi: 'वीडियो' },
            { id: 'WALLPAPERS', icon: Film, labelEn: 'Wallpapers', labelHi: 'वॉलपेपर' },
            { id: 'MEDIA', icon: Newspaper, labelEn: 'Press Articles', labelHi: 'प्रेस कवरेज' },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveType(t.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  activeType === t.id
                    ? 'bg-[#c28227] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isHi ? t.labelHi : t.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isHi ? 'शीर्षक या श्रेणी खोजें...' : 'Search media by title...'}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c28227] focus:bg-white"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-12 text-center text-stone-400 font-medium rounded-2xl bg-white border border-stone-200">
            {isHi ? 'इस श्रेणी में कोई मीडिया नहीं मिला।' : 'No media items found in this section.'}
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#c28227]/50 transition duration-300 group flex flex-col justify-between"
            >
              {/* Media Preview Image */}
              <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    {item.category}
                  </span>
                </div>

                {/* Featured Toggle Button */}
                <button
                  onClick={() => handleToggleFeatured(item.id)}
                  className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md transition ${
                    item.featured
                      ? 'bg-[#c28227] text-white'
                      : 'bg-black/60 text-stone-300 hover:text-white'
                  }`}
                  title={item.featured ? 'Featured on Website' : 'Mark as Featured'}
                >
                  <Star className={`w-4 h-4 ${item.featured ? 'fill-white' : ''}`} />
                </button>

                {/* Views Pill */}
                <div className="absolute bottom-3 left-3 text-[10px] text-white font-medium flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  <Eye className="w-3 h-3 text-amber-300" />
                  <span>{item.views} views</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#c28227] transition line-clamp-2">
                    {isHi ? item.titleHi : item.titleEn}
                  </h3>
                  <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between font-medium">
                    <span>Uploaded: {item.date}</span>
                    <span className="font-mono text-[#965f16] font-bold">{item.id}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#c28227] hover:underline inline-flex items-center gap-1 font-bold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{isHi ? 'पूर्वावलोकन' : 'Preview'}</span>
                  </a>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition"
                    title={isHi ? 'हटाएं' : 'Delete'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Media Modal (Light Theme) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#c28227]" />
                <span>{isHi ? 'नया मीडिया अपलोड करें' : 'Upload New Media Item'}</span>
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'मीडिया शीर्षक' : 'Media Title'} *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Maha Aarti Divine Glimpse"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'प्रकार' : 'Media Type'}</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  >
                    <option value="PHOTOS">Photos (छायाचित्र)</option>
                    <option value="VIDEOS">Videos (वीडियो)</option>
                    <option value="WALLPAPERS">Wallpapers (वॉलपेपर)</option>
                    <option value="MEDIA">Press Media (प्रेस कवरेज)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'श्रेणी' : 'Category'}</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Darshan, Aarti"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'छवि / वीडियो लिंक (URL)' : 'Image / Video URL'}</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold transition"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold hover:brightness-110 shadow-sm transition"
                >
                  {isHi ? 'सहेजें व प्रकाशित करें' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
