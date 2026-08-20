import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Newspaper,
  Tv,
  Globe,
  Plus,
  Search,
  Trash2,
  Edit3,
  Eye,
  Calendar,
  Sparkles,
  CheckCircle2,
  X,
  Clock,
  LayoutGrid,
  List,
  AlertCircle,
  UploadCloud,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import {
  mediaGetAllApi,
  mediaCreateApi,
  mediaUpdateApi,
  mediaDeleteApi,
} from '../../clientApi/allApi';
import { formatMediaDate, toDateInputValue } from '../../clientApi/format';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const PLACEHOLDER = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=60&w=800';

const EMPTY_FORM = {
  title: '',
  category: 'print',
  source: '',
  publicationDate: '',
  author: '',
  location: 'Baikathpur (Khusrupur), Patna',
  readTime: '3 min read',
  description: '',
  quote: '',
  quoteAuthor: '',
  tags: '',
  highlights: '',
  status: 'Published',
  file: null,
  filePreview: '',
  fileError: '',
  existingImage: '',
};

export default function MediaCoverageManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const lang = isHi ? 'hi' : 'en';
  const fileInputRef = useRef(null);

  // ── Data state ──────────────────────────────────────────────────────────────
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // ── Filter / view state ─────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // ── Modal state ─────────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Normalize a backend document into the shape the UI renders.
  const normalize = useCallback((d) => ({
    id: d._id,
    image: d.imageUrl,
    source: d.source || '',
    category: d.category || 'print',
    title: d.title || '',
    description: d.description || '',
    publicationDate: d.publicationDate || '',
    date: formatMediaDate(d.publicationDate, lang),
    tags: d.tags || [],
    highlights: d.highlights || [],
    author: d.author || '',
    location: d.location || '',
    readTime: d.readTime || '',
    quote: d.quote || '',
    quoteAuthor: d.quoteAuthor || '',
    status: d.status || 'Published',
  }), [lang]);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await mediaGetAllApi();
      setArticles((res?.data?.data ?? []).map(normalize));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        (isHi ? 'मीडिया कवरेज लोड करने में त्रुटि हुई।' : 'Failed to load media coverage. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  }, [normalize, isHi]);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  // ── Category config ─────────────────────────────────────────────────────────
  const categories = [
    { id: 'all', labelEn: 'All Media', labelHi: 'सभी मीडिया', icon: Sparkles },
    { id: 'print', labelEn: 'Print Newspapers', labelHi: 'प्रिंट मीडिया (अखबार)', icon: Newspaper },
    { id: 'tv', labelEn: 'TV & Video Coverage', labelHi: 'टीवी व वीडियो रिपोर्ट', icon: Tv },
    { id: 'digital', labelEn: 'Digital News', labelHi: 'डिजिटल समाचार', icon: Globe },
  ];

  const filteredArticles = articles.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term ||
      item.title.toLowerCase().includes(term) ||
      item.source.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.tags.some((tag) => tag.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  const stats = {
    total: articles.length,
    print: articles.filter((a) => a.category === 'print').length,
    tv: articles.filter((a) => a.category === 'tv').length,
    digital: articles.filter((a) => a.category === 'digital').length,
  };

  // ── Image picker ────────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (formData.filePreview) URL.revokeObjectURL(formData.filePreview);
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setFormData((p) => ({ ...p, file: null, filePreview: '', fileError: isHi ? 'छवि 10MB से अधिक नहीं होनी चाहिए।' : 'Image must be under 10 MB.' }));
      return;
    }
    setFormData((p) => ({ ...p, file, filePreview: URL.createObjectURL(file), fileError: '' }));
  };

  // ── Modal open/close ────────────────────────────────────────────────────────
  const handleOpenAddModal = () => {
    setEditingArticle(null);
    setFormData(EMPTY_FORM);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      source: article.source,
      publicationDate: toDateInputValue(article.publicationDate),
      author: article.author,
      location: article.location,
      readTime: article.readTime || '3 min read',
      description: article.description,
      quote: article.quote,
      quoteAuthor: article.quoteAuthor,
      tags: (article.tags || []).join(', '),
      highlights: (article.highlights || []).join('\n'),
      status: article.status || 'Published',
      file: null,
      filePreview: '',
      fileError: '',
      existingImage: article.image || '',
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSaving) return;
    if (formData.filePreview) URL.revokeObjectURL(formData.filePreview);
    setFormData(EMPTY_FORM);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsModalOpen(false);
  };

  // ── Save (create / update) ──────────────────────────────────────────────────
  const handleSaveArticle = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.source.trim() || !formData.description.trim()) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'कृपया शीर्षक, स्रोत और विवरण भरें।' : 'Please fill title, source, and description.' }));
      return;
    }
    if (!editingArticle && !formData.file) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'कृपया एक छवि चुनें।' : 'Please select an image.' }));
      return;
    }

    const fd = new FormData();
    if (formData.file) fd.append('file', formData.file);
    fd.append('title', formData.title.trim());
    fd.append('source', formData.source.trim());
    fd.append('category', formData.category);
    fd.append('description', formData.description.trim());
    if (formData.publicationDate) fd.append('publicationDate', formData.publicationDate);
    if (formData.tags.trim()) fd.append('tags', formData.tags.trim());
    if (formData.highlights.trim()) fd.append('highlights', formData.highlights.trim());
    ['author', 'location', 'readTime', 'quote', 'quoteAuthor', 'status'].forEach((k) => {
      if (formData[k] && formData[k].trim()) fd.append(k, formData[k].trim());
    });

    setIsSaving(true);
    try {
      if (editingArticle) await mediaUpdateApi(editingArticle.id, fd);
      else await mediaCreateApi(fd);
      showNotification(editingArticle
        ? (isHi ? 'समाचार आलेख सफलतापूर्वक अपडेट किया गया।' : 'Media article updated successfully.')
        : (isHi ? 'नया समाचार आलेख सफलतापूर्वक जोड़ा गया।' : 'New media article added successfully.'));
      if (formData.filePreview) URL.revokeObjectURL(formData.filePreview);
      setFormData(EMPTY_FORM);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsModalOpen(false);
      await fetchArticles();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message ||
        (isHi ? 'सहेजना विफल। पुनः प्रयास करें।' : 'Save failed. Please try again.');
      setFormData((p) => ({ ...p, fileError: msg }));
    } finally {
      setIsSaving(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDeleteArticle = async (id) => {
    if (!window.confirm(isHi ? 'क्या आप इस समाचार आलेख को हटाना चाहते हैं?' : 'Are you sure you want to delete this media article?')) return;
    setDeletingId(id);
    try {
      await mediaDeleteApi(id);
      showNotification(isHi ? 'आलेख हटा दिया गया है।' : 'Article deleted successfully.');
      await fetchArticles();
    } catch (err) {
      showNotification(err?.response?.data?.message || (isHi ? 'हटाना विफल।' : 'Delete failed.'));
    } finally {
      setDeletingId(null);
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
              : 'Categorize and manage Print Newspapers, TV & Video Reports, and Digital News'}
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

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <div className="flex-1 text-xs font-medium">{error}</div>
          <button onClick={fetchArticles} className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 transition shrink-0">
            <RefreshCw className="w-3.5 h-3.5" />
            {isHi ? 'पुनः प्रयास' : 'Retry'}
          </button>
        </div>
      )}

      {/* 3 Category Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'print', icon: Newspaper, en: 'Print Newspapers', hi: 'प्रिंट अखबार (Print Newspapers)', unitEn: 'articles', unitHi: 'प्रकाशित आलेख', active: 'border-amber-500 ring-2 ring-amber-500/20', box: 'bg-amber-50 text-amber-700 border-amber-200', num: 'text-amber-700' },
          { id: 'tv', icon: Tv, en: 'TV & Video Coverage', hi: 'टीवी एवं वीडियो (TV & Video)', unitEn: 'broadcasts', unitHi: 'प्रसारण रिपोर्ट्स', active: 'border-emerald-500 ring-2 ring-emerald-500/20', box: 'bg-emerald-50 text-emerald-700 border-emerald-200', num: 'text-emerald-700' },
          { id: 'digital', icon: Globe, en: 'Digital News', hi: 'डिजिटल समाचार (Digital News)', unitEn: 'coverage links', unitHi: 'डिजिटल पोर्टल्स', active: 'border-blue-500 ring-2 ring-blue-500/20', box: 'bg-blue-50 text-blue-700 border-blue-200', num: 'text-blue-700' },
        ].map((c) => {
          const Icon = c.icon;
          const isActive = activeCategory === c.id;
          return (
            <div
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white shadow-xs hover:shadow-md ${isActive ? c.active : 'border-stone-200 hover:border-stone-300'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{isHi ? c.hi.split('(')[0] : c.en}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${c.box}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-bold text-stone-900">{isHi ? c.hi : c.en}</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-2xl font-black ${c.num}`}>{stats[c.id]}</span>
                  <span className="text-xs text-stone-500">{isHi ? c.unitHi : c.unitEn}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Bar: Category Filter & Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive ? 'bg-slate-900 text-white shadow-md' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isHi ? cat.labelHi : cat.labelEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-amber-400 text-slate-950 font-black' : 'bg-stone-300/80 text-stone-700'}`}>
                  {cat.id === 'all' ? stats.total : stats[cat.id]}
                </span>
              </button>
            );
          })}
        </div>

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
              <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`} title="Grid View">
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`} title="Table View">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-16 flex flex-col items-center justify-center text-stone-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#c28227] mb-3" />
          <p className="text-sm font-medium">{isHi ? 'लोड हो रहा है…' : 'Loading media coverage…'}</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-3">
            <Newspaper className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-stone-800">{isHi ? 'कोई समाचार आलेख नहीं मिला' : 'No Media Articles Found'}</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {articles.length === 0
              ? (isHi ? 'अभी तक कोई आलेख नहीं जोड़ा गया है।' : 'No articles have been added yet.')
              : (isHi ? 'चयनित श्रेणी या खोज के लिए कोई आलेख नहीं है।' : 'No articles match your selected category or search filter.')}
          </p>
          <button onClick={() => { setActiveCategory('all'); setSearchTerm(''); }} className="mt-4 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition">
            {isHi ? 'फ़िल्टर हटाएं' : 'Clear Filters'}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArticles.map((article) => {
            const catInfo = categories.find((c) => c.id === article.category) || categories[1];
            const CategoryIcon = catInfo.icon;
            return (
              <div key={article.id} className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="h-44 w-full relative overflow-hidden bg-stone-950">
                    <img src={article.image || PLACEHOLDER} alt={article.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow">
                      <CategoryIcon className="w-3 h-3 text-amber-400" />
                      <span>{isHi ? catInfo.labelHi : catInfo.labelEn}</span>
                    </div>
                    {article.source && (
                      <div className="absolute bottom-3 left-3 bg-[#c28227] text-white text-xs font-bold px-3 py-0.5 rounded-full shadow">{article.source}</div>
                    )}
                    {article.date && (
                      <div className="absolute bottom-3 right-3 text-white/90 text-[11px] font-medium flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-[#c28227] transition-colors leading-snug line-clamp-2">{article.title}</h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{article.description}</p>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {article.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="bg-stone-100 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-md border border-stone-200">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{article.readTime || '—'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Link to={`/gallery/media/${article.id}`} target="_blank" className="p-1.5 rounded-lg text-stone-600 hover:text-amber-600 hover:bg-amber-50 transition" title={isHi ? 'लाइव देखें' : 'View Single Article'}>
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleOpenEditModal(article)} className="p-1.5 rounded-lg text-stone-600 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer" title={isHi ? 'संपादित करें' : 'Edit Article'}>
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteArticle(article.id)} disabled={deletingId === article.id} className="p-1.5 rounded-lg text-stone-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50" title={isHi ? 'हटाएं' : 'Delete Article'}>
                      {deletingId === article.id ? <Loader2 className="w-4 h-4 animate-spin text-red-400" /> : <Trash2 className="w-4 h-4" />}
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
                  const catInfo = categories.find((c) => c.id === article.category) || categories[1];
                  const CategoryIcon = catInfo.icon;
                  return (
                    <tr key={article.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <img src={article.image || PLACEHOLDER} alt={article.title} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200" onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }} />
                          <div className="min-w-0">
                            <span className="font-bold text-stone-900 line-clamp-1 hover:text-[#c28227]">{article.title}</span>
                            <span className="text-[11px] text-stone-500 line-clamp-1">{article.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                          <CategoryIcon className="w-3 h-3 text-[#c28227]" />
                          <span>{isHi ? catInfo.labelHi : catInfo.labelEn}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-[#c28227]">{article.source}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-stone-500">{article.date}</td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/gallery/media/${article.id}`} target="_blank" className="p-1.5 rounded-lg text-stone-600 hover:text-amber-600 hover:bg-amber-50 transition" title="View Single Article">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleOpenEditModal(article)} className="p-1.5 rounded-lg text-stone-600 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer" title="Edit">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteArticle(article.id)} disabled={deletingId === article.id} className="p-1.5 rounded-lg text-stone-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50" title="Delete">
                            {deletingId === article.id ? <Loader2 className="w-4 h-4 animate-spin text-red-400" /> : <Trash2 className="w-4 h-4" />}
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Newspaper className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">
                  {editingArticle ? (isHi ? 'समाचार आलेख संपादित करें' : 'Edit Media Article') : (isHi ? 'नया समाचार आलेख जोड़ें' : 'Add New Media Article')}
                </h3>
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">

              {/* Category */}
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">{isHi ? 'मीडिया श्रेणी *' : 'Media Category *'}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'print', label: 'Print Newspapers', icon: Newspaper },
                    { id: 'tv', label: 'TV & Video Coverage', icon: Tv },
                    { id: 'digital', label: 'Digital News', icon: Globe },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button key={cat.id} type="button" onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center font-bold transition-all cursor-pointer ${isSelected ? 'bg-amber-50 border-[#c28227] text-[#c28227] ring-1 ring-[#c28227]' : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'}`}>
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] leading-tight">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image picker */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isHi ? 'आलेख छवि' : 'Article Image'} {editingArticle ? '' : '*'}
                  <span className="text-stone-400 font-normal ml-1">({isHi ? 'अधिकतम 10MB' : 'max 10 MB'})</span>
                </label>
                <div onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer w-full rounded-xl border-2 border-dashed transition flex flex-col items-center justify-center py-5 px-4 text-center ${formData.fileError ? 'border-red-300 bg-red-50' : (formData.filePreview || formData.existingImage) ? 'border-emerald-300 bg-emerald-50' : 'border-stone-200 bg-stone-50 hover:border-[#c28227]'}`}>
                  {(formData.filePreview || formData.existingImage) ? (
                    <img src={formData.filePreview || formData.existingImage} alt="preview" className="h-24 object-contain rounded-lg mb-2" />
                  ) : (
                    <UploadCloud className="w-8 h-8 text-stone-400 mb-2" />
                  )}
                  <p className="text-[11px] font-semibold text-stone-600">
                    {formData.file ? formData.file.name : (editingArticle ? (isHi ? 'नई छवि चुनने के लिए क्लिक करें (वैकल्पिक)' : 'Click to replace image (optional)') : (isHi ? 'क्लिक करें और छवि चुनें' : 'Click to browse an image'))}
                  </p>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
              </div>

              {/* Source & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">{isHi ? 'प्रकाशन / चैनल का नाम *' : 'Newspaper / Channel Name *'}</label>
                  <input type="text" required placeholder="e.g. Dainik Jagran / DD News" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">{isHi ? 'प्रकाशन दिनांक' : 'Date of Publication'}</label>
                  <input type="date" value={formData.publicationDate} onChange={(e) => setFormData({ ...formData, publicationDate: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">{isHi ? 'समाचार मुख्य शीर्षक *' : 'Article Headline / Title *'}</label>
                <input type="text" required placeholder="Enter full headline..." value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 font-semibold focus:bg-white focus:border-amber-500 focus:outline-none" />
              </div>

              {/* Author & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">{isHi ? 'रिपोर्टर / लेखक का नाम' : 'Author / Reporter Name'}</label>
                  <input type="text" placeholder="e.g. Special Correspondent" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">{isHi ? 'स्थान' : 'Location / Bureau'}</label>
                  <input type="text" placeholder="e.g. Baikathpur (Khusrupur), Patna" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">{isHi ? 'संक्षिप्त विवरण *' : 'Lead Summary / Description *'}</label>
                <textarea rows={3} required placeholder="Brief summary of the media coverage..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none leading-relaxed" />
              </div>

              {/* Highlights */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isHi ? 'मुख्य बिंदु (Highlights)' : 'Key Highlights'}
                  <span className="text-stone-400 font-normal ml-1">({isHi ? 'प्रत्येक बिंदु नई पंक्ति में' : 'one per line'})</span>
                </label>
                <textarea rows={3} placeholder={"First key point\nSecond key point\nThird key point"} value={formData.highlights} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none leading-relaxed" />
              </div>

              {/* Quote */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">{isHi ? 'प्रमुख उद्धरण (Quote)' : 'Highlight Quote'}</label>
                  <input type="text" placeholder="“Sacred quote...”" value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">{isHi ? 'उद्धरणकर्ता' : 'Quote Author'}</label>
                  <input type="text" placeholder="e.g. — Mandir Trust" value={formData.quoteAuthor} onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">{isHi ? 'टैग (कॉमा से अलग करें)' : 'Tags (Comma separated)'}</label>
                <input type="text" placeholder="Renovation, Ganga Ghat, Heritage" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
              </div>

              {/* Inline error */}
              {formData.fileError && (
                <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {formData.fileError}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button type="button" onClick={handleCloseModal} disabled={isSaving} className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition disabled:opacity-50">
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-bold transition shadow-md cursor-pointer disabled:opacity-50">
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isSaving ? (isHi ? 'सहेजा जा रहा है…' : 'Saving…') : editingArticle ? (isHi ? 'परिवर्तन सहेजें' : 'Save Changes') : (isHi ? 'आलेख जोड़ें' : 'Add Article')}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
