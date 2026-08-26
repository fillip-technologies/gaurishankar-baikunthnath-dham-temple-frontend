import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Plus,
  Search,
  Trash2,
  Edit3,
  X,
  IndianRupee,
  AlertCircle,
  UploadCloud,
  Loader2,
  RefreshCw,
  CheckCircle2,
  LayoutGrid,
  List,
  Tag,
  FolderCog,
} from 'lucide-react';
import {
  getAllPoojaApi,
  addPoojaApi,
  updatePoojaApi,
  removePoojaApi,
  getPoojaCategoriesApi,
} from '../../clientApi/allApi';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const PLACEHOLDER =
  'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?auto=format&fit=crop&q=60&w=800';

const EMPTY_FORM = {
  poojaName: '',
  description: '',
  price: '',
  category: '',      // existing category id
  categoryName: '',  // OR a new category name to create on save
  file: null,
  filePreview: '',
  fileError: '',
  existingImage: '',
};

// Flattens a catalogue Pooja document into the shape this panel renders. The
// backend populates `category` to a { _id, name } sub-doc (or null for legacy
// poojas created before categories existed).
const normalize = (d) => ({
  id: d._id,
  poojaName: d.poojaName || '',
  description: d.description || '',
  price: d.price ?? 0,
  image: d.imageUrl || '',
  categoryId: d.category?._id || '',
  categoryName: d.category?.name || '',
});

export default function PoojaCatalogueManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const fileInputRef = useRef(null);

  // ── Data state ──────────────────────────────────────────────────────────────
  const [poojas, setPoojas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // ── Category state ──────────────────────────────────────────────────────────
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'none' | <categoryId>
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  // ── Filter / view state ─────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // ── Modal state ─────────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);

  const fetchPoojas = useCallback(() => {
    return getAllPoojaApi()
      .then((res) => {
        setPoojas((res?.data?.data ?? []).map(normalize));
        setError('');
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
          (isHi ? 'पूजा सूची लोड करने में त्रुटि हुई।' : 'Failed to load poojas. Please try again.'),
        );
      })
      .finally(() => setIsLoading(false));
  }, [isHi]);

  const fetchCategories = useCallback(() => {
    return getPoojaCategoriesApi()
      .then((res) => setCategories(res?.data?.data ?? []))
      .catch(() => { /* non-fatal: the pooja list still renders without filters */ });
  }, []);

  useEffect(() => { fetchPoojas(); fetchCategories(); }, [fetchPoojas, fetchCategories]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchPoojas();
    fetchCategories();
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredPoojas = poojas.filter((p) => {
    if (categoryFilter === 'none' && p.categoryId) return false;
    if (categoryFilter !== 'all' && categoryFilter !== 'none' && p.categoryId !== categoryFilter) return false;
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      p.poojaName.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.categoryName.toLowerCase().includes(term)
    );
  });

  // How many poojas have no category — surfaces legacy items that need one.
  const uncategorizedCount = poojas.filter((p) => !p.categoryId).length;

  // ── Image picker ────────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (formData.filePreview) URL.revokeObjectURL(formData.filePreview);
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setFormData((p) => ({
        ...p,
        file: null,
        filePreview: '',
        fileError: isHi ? 'छवि 10MB से अधिक नहीं होनी चाहिए।' : 'Image must be under 10 MB.',
      }));
      return;
    }
    setFormData((p) => ({ ...p, file, filePreview: URL.createObjectURL(file), fileError: '' }));
  };

  // ── Modal open/close ────────────────────────────────────────────────────────
  const handleOpenAddModal = () => {
    setEditing(null);
    setFormData(EMPTY_FORM);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (pooja) => {
    setEditing(pooja);
    setFormData({
      poojaName: pooja.poojaName,
      description: pooja.description,
      price: String(pooja.price ?? ''),
      category: pooja.categoryId || '',
      categoryName: '',
      file: null,
      filePreview: '',
      fileError: '',
      existingImage: pooja.image || '',
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
  const handleSave = async (e) => {
    e.preventDefault();

    const name = formData.poojaName.trim();
    const price = Number(formData.price);
    if (name.length < 3) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'पूजा का नाम कम से कम 3 अक्षर का होना चाहिए।' : 'Pooja name must be at least 3 characters.' }));
      return;
    }
    if (!formData.price || Number.isNaN(price) || price <= 0) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'कृपया एक वैध मूल्य दर्ज करें।' : 'Please enter a valid price greater than 0.' }));
      return;
    }
    // Description is optional, but the backend rejects a non-empty value under 3 chars.
    const description = formData.description.trim();
    if (description && description.length < 3) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'विवरण कम से कम 3 अक्षर का होना चाहिए।' : 'Description must be at least 3 characters.' }));
      return;
    }
    // A category is required: either an existing one is picked, or a new name is
    // typed (created on the server together with the pooja).
    const newCategory = formData.categoryName.trim();
    if (!formData.category && !newCategory) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'कृपया एक श्रेणी चुनें या नई जोड़ें।' : 'Please select a category or add a new one.' }));
      return;
    }
    if (newCategory && newCategory.length < 2) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'श्रेणी नाम कम से कम 2 अक्षर का होना चाहिए।' : 'Category name must be at least 2 characters.' }));
      return;
    }
    if (!editing && !formData.file) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'कृपया एक छवि चुनें।' : 'Please select an image.' }));
      return;
    }

    const fd = new FormData();
    if (formData.file) fd.append('file', formData.file);
    fd.append('poojaName', name);
    fd.append('price', String(price));
    // A freshly-typed category name wins over the dropdown selection.
    if (newCategory) fd.append('categoryName', newCategory);
    else fd.append('category', formData.category);
    if (description) fd.append('description', description);

    setIsSaving(true);
    try {
      if (editing) await updatePoojaApi(editing.id, fd);
      else await addPoojaApi(fd);
      showNotification(editing
        ? (isHi ? 'पूजा सफलतापूर्वक अपडेट की गई।' : 'Pooja updated successfully.')
        : (isHi ? 'नई पूजा सफलतापूर्वक जोड़ी गई।' : 'Pooja added successfully.'));
      if (formData.filePreview) URL.revokeObjectURL(formData.filePreview);
      setFormData(EMPTY_FORM);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsModalOpen(false);
      await fetchPoojas();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message ||
        (isHi ? 'सहेजना विफल। पुनः प्रयास करें।' : 'Save failed. Please try again.');
      setFormData((p) => ({ ...p, fileError: msg }));
    } finally {
      setIsSaving(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm(isHi ? 'क्या आप इस पूजा को हटाना चाहते हैं?' : 'Are you sure you want to delete this pooja?')) return;
    setDeletingId(id);
    try {
      await removePoojaApi(id);
      showNotification(isHi ? 'पूजा हटा दी गई है।' : 'Pooja deleted successfully.');
      await fetchPoojas();
    } catch (err) {
      showNotification(err?.response?.data?.message || (isHi ? 'हटाना विफल।' : 'Delete failed.'));
    } finally {
      setDeletingId(null);
    }
  };

  // ── Categories ────────────────────────────────────────────────────────────
  // "+ New category" toggle inside the add/edit form. It does NOT hit the server
  // — the typed name is held in formData.categoryName and created together with
  // the pooja on save (categories are born with poojas). Selecting the dropdown
  // clears the pending name and vice-versa, so exactly one wins.
  const [showInlineCat, setShowInlineCat] = useState(false);

  const pickExistingCategory = (id) =>
    setFormData((p) => ({ ...p, category: id, categoryName: '', fileError: '' }));

  const typeNewCategory = (val) =>
    setFormData((p) => ({ ...p, categoryName: val, category: val.trim() ? '' : p.category, fileError: '' }));

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
            <Sparkles className="w-4 h-4" />
            <span>{isHi ? 'पूजा कैटलॉग प्रबंधन' : 'Pooja Catalogue Management'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {isHi ? 'बुक करने योग्य पूजाएं' : 'Bookable Poojas'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
            {isHi
              ? 'श्रद्धालुओं को दिखने वाली पूजाओं, उनके मूल्य एवं छवि का प्रबंधन करें।'
              : 'Add, edit, price, and remove the poojas devotees can book online.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs hover:bg-slate-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isHi ? 'रिफ्रेश' : 'Refresh'}</span>
          </button>
          <button
            onClick={() => setIsCatModalOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs hover:bg-slate-700 transition"
          >
            <FolderCog className="w-4 h-4" />
            <span className="hidden sm:inline">{isHi ? 'श्रेणियां' : 'Categories'}</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>{isHi ? 'नई पूजा जोड़ें' : 'Add Pooja'}</span>
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <div className="flex-1 text-xs font-medium">{error}</div>
          <button onClick={handleRefresh} className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 transition shrink-0">
            <RefreshCw className="w-3.5 h-3.5" />
            {isHi ? 'पुनः प्रयास' : 'Retry'}
          </button>
        </div>
      )}

      {/* Category filter tabs */}
      <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider px-1">
          <Tag className="w-3.5 h-3.5" />
          {isHi ? 'श्रेणी' : 'Category'}
        </span>
        {[{ id: 'all', name: isHi ? 'सभी' : 'All', count: poojas.length }, ...categories.map((c) => ({ id: c._id, name: c.name, count: poojas.filter((p) => p.categoryId === c._id).length }))]
          .concat(uncategorizedCount > 0 ? [{ id: 'none', name: isHi ? 'अवर्गीकृत' : 'Uncategorized', count: uncategorizedCount }] : [])
          .map((c) => {
            const isActive = categoryFilter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 ${
                  isActive ? 'bg-[#c28227] text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                } ${c.id === 'none' ? 'italic' : ''}`}
              >
                <span>{c.name}</span>
                <span className={`text-[10px] px-1.5 rounded-full ${isActive ? 'bg-white/25' : 'bg-stone-300/70 text-stone-700'}`}>{c.count}</span>
              </button>
            );
          })}
      </div>

      {/* Control Bar: Search + count + view toggle */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            {poojas.length} {isHi ? 'पूजाएं' : 'poojas'}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isHi ? 'नाम / विवरण खोजें...' : 'Search poojas...'}
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
          <p className="text-sm font-medium">{isHi ? 'लोड हो रहा है…' : 'Loading poojas…'}</p>
        </div>
      ) : filteredPoojas.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-3">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-stone-800">{isHi ? 'कोई पूजा नहीं मिली' : 'No Poojas Found'}</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {poojas.length === 0
              ? (isHi ? 'अभी तक कोई पूजा नहीं जोड़ी गई है।' : 'No poojas have been added yet.')
              : (isHi ? 'आपकी खोज से मेल खाती कोई पूजा नहीं है।' : 'No poojas match your search.')}
          </p>
          {poojas.length === 0 ? (
            <button onClick={handleOpenAddModal} className="mt-4 px-4 py-2 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-semibold text-xs transition inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> {isHi ? 'पहली पूजा जोड़ें' : 'Add your first pooja'}
            </button>
          ) : (
            <button onClick={() => setSearchTerm('')} className="mt-4 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition">
              {isHi ? 'खोज हटाएं' : 'Clear Search'}
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPoojas.map((pooja) => (
            <div key={pooja.id} className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-40 w-full relative overflow-hidden bg-stone-950">
                  <img src={pooja.image || PLACEHOLDER} alt={pooja.poojaName} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }} />
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow inline-flex items-center gap-0.5">
                    <IndianRupee className="w-3 h-3" />{pooja.price.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-stone-900 leading-snug line-clamp-1">{pooja.poojaName}</h3>
                  </div>
                  {pooja.categoryName ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      <Tag className="w-2.5 h-2.5" />{pooja.categoryName}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 border border-stone-200 italic">
                      {isHi ? 'अवर्गीकृत' : 'Uncategorized'}
                    </span>
                  )}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed min-h-[2rem]">{pooja.description || (isHi ? 'कोई विवरण नहीं' : 'No description')}</p>
                </div>
              </div>
              <div className="px-4 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-1.5">
                <button onClick={() => handleOpenEditModal(pooja)} className="p-1.5 rounded-lg text-stone-600 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer" title={isHi ? 'संपादित करें' : 'Edit'}>
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(pooja.id)} disabled={deletingId === pooja.id} className="p-1.5 rounded-lg text-stone-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50" title={isHi ? 'हटाएं' : 'Delete'}>
                  {deletingId === pooja.id ? <Loader2 className="w-4 h-4 animate-spin text-red-400" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold border-b border-slate-800">
                  <th className="py-3 px-4">{isHi ? 'पूजा' : 'Pooja'}</th>
                  <th className="py-3 px-4">{isHi ? 'श्रेणी' : 'Category'}</th>
                  <th className="py-3 px-4">{isHi ? 'विवरण' : 'Description'}</th>
                  <th className="py-3 px-4 whitespace-nowrap">{isHi ? 'मूल्य' : 'Price'}</th>
                  <th className="py-3 px-4 text-right">{isHi ? 'क्रियाएं' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredPoojas.map((pooja) => (
                  <tr key={pooja.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <img src={pooja.image || PLACEHOLDER} alt={pooja.poojaName} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200" onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }} />
                        <span className="font-bold text-stone-900 line-clamp-1">{pooja.poojaName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {pooja.categoryName ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          <Tag className="w-3 h-3" />{pooja.categoryName}
                        </span>
                      ) : (
                        <span className="text-[11px] text-stone-400 italic">{isHi ? 'अवर्गीकृत' : 'Uncategorized'}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <span className="text-stone-600 line-clamp-2">{pooja.description || '—'}</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-bold text-emerald-700">
                      <span className="inline-flex items-center gap-0.5"><IndianRupee className="w-3.5 h-3.5" />{pooja.price.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleOpenEditModal(pooja)} className="p-1.5 rounded-lg text-stone-600 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(pooja.id)} disabled={deletingId === pooja.id} className="p-1.5 rounded-lg text-stone-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50" title="Delete">
                          {deletingId === pooja.id ? <Loader2 className="w-4 h-4 animate-spin text-red-400" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">
                  {editing ? (isHi ? 'पूजा संपादित करें' : 'Edit Pooja') : (isHi ? 'नई पूजा जोड़ें' : 'Add New Pooja')}
                </h3>
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">

              {/* Image picker */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isHi ? 'पूजा छवि' : 'Pooja Image'} {editing ? '' : '*'}
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
                    {formData.file ? formData.file.name : (editing ? (isHi ? 'नई छवि चुनने के लिए क्लिक करें (वैकल्पिक)' : 'Click to replace image (optional)') : (isHi ? 'क्लिक करें और छवि चुनें' : 'Click to browse an image'))}
                  </p>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">{isHi ? 'पूजा का नाम *' : 'Pooja Name *'}</label>
                <input type="text" required placeholder="e.g. Maha Rudrabhishek" value={formData.poojaName} onChange={(e) => setFormData({ ...formData, poojaName: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 font-semibold focus:bg-white focus:border-amber-500 focus:outline-none" />
              </div>

              {/* Price */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">{isHi ? 'मूल्य (₹) *' : 'Price (₹) *'}</label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="number" min="1" step="1" required placeholder="e.g. 2100" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
                </div>
              </div>

              {/* Category (required): pick an existing one, or type a new name
                  that is created together with the pooja on save. */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-stone-700">{isHi ? 'श्रेणी *' : 'Category *'}</label>
                  <button
                    type="button"
                    onClick={() => { const next = !showInlineCat; setShowInlineCat(next); if (!next) typeNewCategory(''); }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#c28227] hover:text-[#a66d1e] transition"
                  >
                    <Plus className="w-3 h-3" />{showInlineCat ? (isHi ? 'मौजूदा चुनें' : 'Pick existing') : (isHi ? 'नई श्रेणी' : 'New category')}
                  </button>
                </div>

                {showInlineCat ? (
                  <input
                    type="text"
                    autoFocus
                    value={formData.categoryName}
                    onChange={(e) => typeNewCategory(e.target.value)}
                    placeholder={isHi ? 'नई श्रेणी का नाम (सहेजने पर बनेगी)' : 'New category name (created on save)'}
                    className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                ) : (
                  <select
                    value={formData.category}
                    onChange={(e) => pickExistingCategory(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="" disabled>{isHi ? '— श्रेणी चुनें —' : '— Select a category —'}</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">{isHi ? 'विवरण' : 'Description'}
                  <span className="text-stone-400 font-normal ml-1">({isHi ? 'वैकल्पिक' : 'optional'})</span>
                </label>
                <textarea rows={3} placeholder={isHi ? 'पूजा का संक्षिप्त विवरण...' : 'Brief description of the pooja...'} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none leading-relaxed" />
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
                  <span>{isSaving ? (isHi ? 'सहेजा जा रहा है…' : 'Saving…') : editing ? (isHi ? 'परिवर्तन सहेजें' : 'Save Changes') : (isHi ? 'पूजा जोड़ें' : 'Add Pooja')}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Manage Categories Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FolderCog className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">{isHi ? 'श्रेणी प्रबंधन' : 'Manage Categories'}</h3>
              </div>
              <button onClick={() => setIsCatModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Read-only list. Categories can't be added or deleted here — they
                  are created when you add a pooja under a new name, and removed
                  automatically when their last pooja is deleted. */}
              <div className="divide-y divide-stone-100 rounded-xl border border-stone-200 overflow-hidden">
                {categories.length === 0 ? (
                  <div className="p-6 text-center text-stone-400">{isHi ? 'अभी तक कोई श्रेणी नहीं।' : 'No categories yet.'}</div>
                ) : (
                  categories.map((c) => {
                    const count = poojas.filter((p) => p.categoryId === c._id).length;
                    return (
                      <div key={c._id} className="flex items-center justify-between px-4 py-2.5 hover:bg-stone-50">
                        <div className="flex items-center gap-2 min-w-0">
                          <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="font-bold text-stone-800 truncate">{c.name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-stone-500 bg-stone-100 border border-stone-200 rounded-full px-2 py-0.5 shrink-0">
                          {count} {isHi ? 'पूजाएं' : count === 1 ? 'pooja' : 'poojas'}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
              <p className="text-[11px] text-stone-400 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                {isHi
                  ? 'श्रेणियां पूजा जोड़ने पर बनती हैं और उनकी अंतिम पूजा हटने पर स्वतः हट जाती हैं।'
                  : 'Categories are created when you add a pooja under a new name, and removed automatically when their last pooja is deleted.'}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
