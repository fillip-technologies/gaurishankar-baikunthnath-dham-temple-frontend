import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import {
  Newspaper,
  Tv,
  Globe,
  Plus,
  Search,
  Trash2,
  Edit3,
  Eye,
  ExternalLink,
  Calendar,
  Sparkles,
  Filter,
  CheckCircle2,
  X,
  Clock,
  MapPin,
  FileText,
  Tag,
  LayoutGrid,
  List,
  AlertCircle
} from 'lucide-react';
import mediaImg1 from '../../../assets/home/herosection-3.png';
import mediaImg2 from '../../../assets/home/herosection-2.png';
import mediaImg3 from '../../../assets/home/upcoming-festival.png';
import mediaImg4 from '../../../assets/home/herosection.png';

export default function MediaCoverageManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const navigate = useNavigate();

  // Initial Frontend Articles Data Categorized by Print, TV, Digital
  const [articles, setArticles] = useState([
    {
      id: 1,
      category: 'print',
      categoryLabel: 'Print Newspapers',
      categoryLabelHi: 'प्रिंट मीडिया (अखबार)',
      source: 'Dainik Jagran',
      date: '14 August 2026',
      readTime: '4 min read',
      author: 'Special Correspondent, Patna Bureau',
      location: 'Baikathpur (Khusrupur), Patna',
      title: 'Grand Renovation & Sandstone Carvings Unveiled at Baikathpur Dham',
      description: 'State dignitaries and Vedic scholars gathered at Shri Gaurishankar Baikunthnath Dham for the inauguration of renovated stone mandaps and newly paved Ganga Ghat promenade.',
      quote: '“This grand restoration at Baikunthnath Dham is a sacred pledge to preserve our timeless Sanatan heritage.”',
      quoteAuthor: '— Shri Gaurishankar Baikunthnath Dham Nyas Samiti',
      image: mediaImg1,
      status: 'Published',
      tags: ['Renovation', 'Sandstone', 'Ganga Ghat', 'Dainik Jagran']
    },
    {
      id: 2,
      category: 'tv',
      categoryLabel: 'TV & Video Coverage',
      categoryLabelHi: 'टीवी व वीडियो रिपोर्ट',
      source: 'DD Bihar Live',
      date: '02 August 2026',
      readTime: '3 min read',
      author: 'Doordarshan Special Broadcast Unit',
      location: 'Ganga Deck, Baikathpur',
      title: 'Live Broadcast of Shravani Somvar Deepotsav at Baikathpur Ganga Deck',
      description: 'Over 50,000 devotees participated in the sacred evening Ganga Aarti broadcast live on national television from Baikathpur.',
      quote: '“The Shravani Deepotsav at Baikunthnath Ganga Ghat is an unparalleled confluence of supreme devotion and peace.”',
      quoteAuthor: '— Chief Acharya, Baikunthnath Dham',
      image: mediaImg2,
      status: 'Published',
      tags: ['Shravani Deepotsav', 'Ganga Aarti', 'Live Broadcast', 'DD Bihar']
    },
    {
      id: 3,
      category: 'print',
      categoryLabel: 'Print Newspapers',
      categoryLabelHi: 'प्रिंट मीडिया (अखबार)',
      source: 'Hindustan Samachar',
      date: '20 July 2026',
      readTime: '5 min read',
      author: 'History & Heritage Desk',
      location: 'Patna, Bihar',
      title: 'Historical 16th-Century Heritage of Raja Man Singh Revived',
      description: 'Historical researchers publish special feature on the ancient Hari-Hara composite deity consecrated during 16th-century royal expedition in Patna district.',
      quote: '“The Hari-Hara form at Baikathpur is living testament to the sublime unity and harmony of Indian Vedic philosophy.”',
      quoteAuthor: '— Bihar Archaeological Heritage Society',
      image: mediaImg3,
      status: 'Published',
      tags: ['Heritage', 'Raja Man Singh', 'Hari-Hara', 'Hindustan']
    },
    {
      id: 4,
      category: 'digital',
      categoryLabel: 'Digital News',
      categoryLabelHi: 'डिजिटल समाचार',
      source: 'Prabhat Khabar Digital',
      date: '10 June 2026',
      readTime: '3 min read',
      author: 'Digital Tech & Media Correspondent',
      location: 'Baikathpur Digital Center',
      title: '24x7 Live Sanctum Streaming Launched for Global Pilgrims',
      description: 'Shri Baikunthnath Mandir Trust launches high-definition live streaming portal for NRI devotees across 40 countries.',
      quote: '“Through modern technology, the divine grace of Lord Baikunthnath now reaches every corner of the world.”',
      quoteAuthor: '— IT & Digital Communications Cell',
      image: mediaImg4,
      status: 'Published',
      tags: ['Live Streaming', 'Digital Darshan', 'NRI Devotees', 'Prabhat Khabar']
    }
  ]);

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal State for Add / Edit Article
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [notification, setNotification] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'print',
    source: '',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    author: '',
    location: 'Baikathpur (Khusrupur), Patna',
    readTime: '3 min read',
    description: '',
    quote: '',
    quoteAuthor: '',
    tags: 'Mandir, Heritage, Press',
    image: mediaImg1,
    status: 'Published'
  });

  // Category Configuration
  const categories = [
    { id: 'all', labelEn: 'All Media', labelHi: 'सभी मीडिया', icon: Sparkles },
    { id: 'print', labelEn: 'Print Newspapers', labelHi: 'प्रिंट मीडिया (अखबार)', icon: Newspaper, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
    { id: 'tv', labelEn: 'TV & Video Coverage', labelHi: 'टीवी व वीडियो रिपोर्ट', icon: Tv, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
    { id: 'digital', labelEn: 'Digital News', labelHi: 'डिजिटल समाचार', icon: Globe, color: 'text-blue-500 bg-blue-500/10 border-blue-500/30' },
  ];

  // Filter logic
  const filteredArticles = articles.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || 
      item.title.toLowerCase().includes(term) ||
      item.source.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.tags.some(tag => tag.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  // Stat Counts
  const stats = {
    total: articles.length,
    print: articles.filter(a => a.category === 'print').length,
    tv: articles.filter(a => a.category === 'tv').length,
    digital: articles.filter(a => a.category === 'digital').length,
  };

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      category: 'print',
      source: '',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: '',
      location: 'Baikathpur (Khusrupur), Patna',
      readTime: '3 min read',
      description: '',
      quote: '',
      quoteAuthor: '',
      tags: 'Mandir, Press',
      image: mediaImg1,
      status: 'Published'
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      source: article.source,
      date: article.date,
      author: article.author || '',
      location: article.location || '',
      readTime: article.readTime || '3 min read',
      description: article.description,
      quote: article.quote || '',
      quoteAuthor: article.quoteAuthor || '',
      tags: article.tags ? article.tags.join(', ') : '',
      image: article.image || mediaImg1,
      status: article.status || 'Published'
    });
    setIsModalOpen(true);
  };

  // Save Form (Add or Edit)
  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.source.trim() || !formData.description.trim()) {
      alert(isHi ? 'कृपया शीर्षक, स्रोत और विवरण भरें।' : 'Please enter title, source, and description.');
      return;
    }

    const tagArray = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : ['Press', 'Mandir'];

    const categoryObj = categories.find(c => c.id === formData.category) || categories[1];

    if (editingArticle) {
      // Update existing
      setArticles(prev => prev.map(art => {
        if (art.id === editingArticle.id) {
          return {
            ...art,
            ...formData,
            categoryLabel: categoryObj.labelEn,
            categoryLabelHi: categoryObj.labelHi,
            tags: tagArray
          };
        }
        return art;
      }));
      showNotification(isHi ? 'समाचार आलेख सफलतापूर्वक अपडेट किया गया।' : 'Media article updated successfully.');
    } else {
      // Add new
      const newArticle = {
        id: Date.now(),
        ...formData,
        categoryLabel: categoryObj.labelEn,
        categoryLabelHi: categoryObj.labelHi,
        tags: tagArray
      };
      setArticles(prev => [newArticle, ...prev]);
      showNotification(isHi ? 'नया समाचार आलेख सफलतापूर्वक जोड़ा गया।' : 'New media article added successfully.');
    }

    setIsModalOpen(false);
  };

  // Delete Article
  const handleDeleteArticle = (id) => {
    if (window.confirm(isHi ? 'क्या आप इस समाचार आलेख को हटाना चाहते हैं?' : 'Are you sure you want to delete this media article?')) {
      setArticles(prev => prev.filter(a => a.id !== id));
      showNotification(isHi ? 'आलेख हटा दिया गया है।' : 'Article deleted successfully.');
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Top Banner & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 rounded-3xl text-white border border-slate-700/80 shadow-md">
        <div>
          <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4" />
            <span>{isHi ? 'प्रेस एवं मीडिया कवरेज प्रबंधन' : 'Media Coverage & Press Releases'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {isHi ? 'मीडिया कवरेज श्रेणियां एवं आलेख' : 'Media Articles by Category'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
            {isHi 
              ? 'प्रिंट मीडिया, टीवी प्रसारण एवं डिजिटल समाचारों का सुव्यवस्थित प्रबंधन'
              : 'Categorize and manage Print Newspapers, TV & Video Reports, and Digital News'
            }
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 shrink-0 cursor-pointer active:scale-95 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>{isHi ? 'नया समाचार आलेख जोड़ें' : 'Add Media Article'}</span>
        </button>
      </div>

      {/* 3 Main Category Cards (Stats Counter) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* 1. Print Newspapers */}
        <div 
          onClick={() => setActiveCategory('print')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white shadow-xs hover:shadow-md ${
            activeCategory === 'print' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-stone-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isHi ? 'प्रिंट मीडिया' : 'Category 1'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-bold text-stone-900">
              {isHi ? 'प्रिंट अखबार (Print Newspapers)' : 'Print Newspapers'}
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-amber-700">{stats.print}</span>
              <span className="text-xs text-stone-500">{isHi ? 'प्रकाशित आलेख' : 'articles'}</span>
            </div>
          </div>
        </div>

        {/* 2. TV & Video Coverage */}
        <div 
          onClick={() => setActiveCategory('tv')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white shadow-xs hover:shadow-md ${
            activeCategory === 'tv' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-stone-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isHi ? 'टीवी प्रसारण' : 'Category 2'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Tv className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-bold text-stone-900">
              {isHi ? 'टीवी एवं वीडियो (TV & Video)' : 'TV & Video Coverage'}
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700">{stats.tv}</span>
              <span className="text-xs text-stone-500">{isHi ? 'प्रसारण रिपोर्ट्स' : 'broadcasts'}</span>
            </div>
          </div>
        </div>

        {/* 3. Digital News */}
        <div 
          onClick={() => setActiveCategory('digital')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white shadow-xs hover:shadow-md ${
            activeCategory === 'digital' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-stone-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isHi ? 'डिजिटल न्यूज़' : 'Category 3'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-bold text-stone-900">
              {isHi ? 'डिजिटल समाचार (Digital News)' : 'Digital News'}
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-blue-700">{stats.digital}</span>
              <span className="text-xs text-stone-500">{isHi ? 'डिजिटल पोर्टल्स' : 'coverage links'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Control Bar: Categories Filter & Search Input */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isHi ? cat.labelHi : cat.labelEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-amber-400 text-slate-950 font-black' : 'bg-stone-300/80 text-stone-700'
                }`}>
                  {cat.id === 'all' ? stats.total : stats[cat.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isHi ? 'शीर्षक / स्रोत खोजें...' : 'Search articles...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Articles List Content */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-3">
            <Newspaper className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-stone-800">
            {isHi ? 'कोई समाचार आलेख नहीं मिला' : 'No Media Articles Found'}
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {isHi ? 'चयनित श्रेणी या खोज शब्द के लिए कोई आलेख उपलब्ध नहीं है।' : 'No articles match your selected category or search filter.'}
          </p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchTerm(''); }}
            className="mt-4 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition"
          >
            {isHi ? 'फ़िल्टर हटाएं' : 'Clear Filters'}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArticles.map((article) => {
            const catInfo = categories.find(c => c.id === article.category) || categories[1];
            const CategoryIcon = catInfo.icon;

            return (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Article Card Image Header */}
                  <div className="h-44 w-full relative overflow-hidden bg-stone-950">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow">
                      <CategoryIcon className="w-3 h-3 text-amber-400" />
                      <span>{isHi ? catInfo.labelHi : catInfo.labelEn}</span>
                    </div>

                    {/* Source Pill */}
                    <div className="absolute bottom-3 left-3 bg-[#c28227] text-white text-xs font-bold px-3 py-0.5 rounded-full shadow">
                      {article.source}
                    </div>

                    <div className="absolute bottom-3 right-3 text-white/90 text-[11px] font-medium flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-[#c28227] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {article.description}
                    </p>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {article.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="bg-stone-100 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-md border border-stone-200">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{article.readTime}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* View Live Article */}
                    <Link
                      to={`/gallery/media/${article.id}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-stone-600 hover:text-amber-600 hover:bg-amber-50 transition"
                      title={isHi ? 'लाइव देखें' : 'View Single Article'}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {/* Edit Article */}
                    <button
                      onClick={() => handleOpenEditModal(article)}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                      title={isHi ? 'संपादित करें' : 'Edit Article'}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete Article */}
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                      title={isHi ? 'हटाएं' : 'Delete Article'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold border-b border-slate-800">
                  <th className="py-3 px-4">{isHi ? 'आलेख विवरण' : 'Article'}</th>
                  <th className="py-3 px-4">{isHi ? 'श्रेणी' : 'Category'}</th>
                  <th className="py-3 px-4">{isHi ? 'स्रोत (अखबार/चैनल)' : 'Source'}</th>
                  <th className="py-3 px-4">{isHi ? 'दिनांक' : 'Date'}</th>
                  <th className="py-3 px-4 text-right">{isHi ? 'क्रियाएं' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredArticles.map((article) => {
                  const catInfo = categories.find(c => c.id === article.category) || categories[1];
                  const CategoryIcon = catInfo.icon;

                  return (
                    <tr key={article.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-stone-900 line-clamp-1 hover:text-[#c28227]">
                              {article.title}
                            </span>
                            <span className="text-[11px] text-stone-500 line-clamp-1">
                              {article.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                          <CategoryIcon className="w-3 h-3 text-[#c28227]" />
                          <span>{isHi ? catInfo.labelHi : catInfo.labelEn}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-[#c28227]">
                        {article.source}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-stone-500">
                        {article.date}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/gallery/media/${article.id}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-stone-600 hover:text-amber-600 hover:bg-amber-50 transition"
                            title="View Single Article"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEditModal(article)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Newspaper className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">
                  {editingArticle 
                    ? (isHi ? 'समाचार आलेख संपादित करें' : 'Edit Media Article')
                    : (isHi ? 'नया समाचार आलेख जोड़ें' : 'Add New Media Article')
                  }
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveArticle} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              
              {/* Category Select (Print, TV, Digital) */}
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  {isHi ? 'मीडिया श्रेणी *' : 'Media Category *'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'print', label: 'Print Newspapers', icon: Newspaper },
                    { id: 'tv', label: 'TV & Video Coverage', icon: Tv },
                    { id: 'digital', label: 'Digital News', icon: Globe },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50 border-[#c28227] text-[#c28227] ring-1 ring-[#c28227]'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] leading-tight">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Source & Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {isHi ? 'प्रकाशन / चैनल का नाम *' : 'Source / Publication Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dainik Jagran / DD News"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {isHi ? 'प्रकाशन दिनांक' : 'Release / Publish Date'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 14 August 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Article Headline Title */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isHi ? 'समाचार मुख्य शीर्षक *' : 'Article Headline / Title *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full headline..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 font-semibold focus:bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Author & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {isHi ? 'रिपोर्टर / लेखक का नाम' : 'Author / Reporter Name'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Special Correspondent"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {isHi ? 'स्थान' : 'Location / Bureau'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Baikathpur (Khusrupur), Patna"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Lead Summary Description */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isHi ? 'संक्षिप्त विवरण (Lead Summary) *' : 'Lead Summary / Excerpt *'}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief summary of the media coverage..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Highlight Quote */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {isHi ? 'प्रमुख उद्धरण (Highlight Quote)' : 'Highlight Quote'}
                  </label>
                  <input
                    type="text"
                    placeholder="“Sacred quote...”"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {isHi ? 'उद्धरणकर्ता (Quote Author)' : 'Quote Author'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. — Mandir Trust"
                    value={formData.quoteAuthor}
                    onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isHi ? 'टैग (कॉमा से अलग करें)' : 'Tags (Comma separated)'}
                </label>
                <input
                  type="text"
                  placeholder="Renovation, Ganga Ghat, Heritage"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-bold transition shadow-md cursor-pointer"
                >
                  {editingArticle ? (isHi ? 'परिवर्तन सहेजें' : 'Save Changes') : (isHi ? 'आलेख जोड़ें' : 'Add Article')}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
