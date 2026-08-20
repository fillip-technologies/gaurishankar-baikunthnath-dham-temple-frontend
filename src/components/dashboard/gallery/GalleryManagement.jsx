import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Video,
  Film,
  Newspaper,
  UploadCloud,
  Search,
  Trash2,
  Eye,
  Star,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  Loader2,
  FileImage,
  X,
  ChevronLeft,
  ChevronRight,
  Folder,
} from 'lucide-react';
import {
  galleryGetApi,
  galleryFoldersApi,
  galleryUploadApi,
  galleryDeleteApi,
  GALLERY_DATATYPE_MAP,
} from '../../clientApi/allApi';

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_FILE_SIZE_MB = 500; // must match backend multer limit
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ITEMS_PER_PAGE = 20; // matches backend pagination

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs animate-pulse">
      <div className="h-48 w-full bg-stone-200" />
      <div className="p-4 space-y-2">
        <div className="h-3.5 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-100 rounded w-1/2" />
        <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between">
          <div className="h-3 bg-stone-200 rounded w-16" />
          <div className="h-3 bg-stone-100 rounded w-8" />
        </div>
      </div>
    </div>
  );
}

// ─── Circular Upload Progress (WhatsApp-style ring) ─────────────────────────────
function ProgressRing({ progress = 0, size = 104, stroke = 8 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, progress));
  const offset = circumference - (clamped / 100) * circumference;
  const complete = clamped >= 100;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-stone-200"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-[#c28227] transition-[stroke-dashoffset] duration-200 ease-out"
        />
      </svg>
      <span className="absolute flex flex-col items-center text-stone-800">
        {complete
          ? <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          : <span className="text-lg font-extrabold">{clamped}%</span>}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GalleryManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const fileInputRef = useRef(null);

  // ── Tab / Search state ──────────────────────────────────────────────────────
  const [activeType, setActiveType] = useState('PHOTOS');
  const [searchTerm, setSearchTerm] = useState('');

  // ── Data state ──────────────────────────────────────────────────────────────
  const [mediaItems, setMediaItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // ── Loading / Error state ───────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false);       // initial / tab-switch fetch
  const [isLoadingMore, setIsLoadingMore] = useState(false); // "Load More" fetch
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);  // 0-100 during upload
  const [deletingId, setDeletingId] = useState(null);       // id currently being deleted
  const [error, setError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // ── Upload modal state ──────────────────────────────────────────────────────
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'PHOTOS',
    category: 'Darshan',
    folder: '',       // album/folder name (combobox: existing or new)
    file: null,       // File object
    filePreview: '',  // local object URL for preview
    fileError: '',    // client-side validation message
  });

  // Existing folder names for the current media type — powers the datalist combobox
  const [folderOptions, setFolderOptions] = useState([]);

  // ── Folder filter state ─────────────────────────────────────────────────────
  const [folderFilter, setFolderFilter] = useState('');     // '' = all folders
  const [filterFolders, setFilterFolders] = useState([]);   // [{ folder, count }] for active tab

  // ─────────────────────────────────────────────────────────────────────────────
  // Fetch gallery items whenever the active tab, page, or folder filter changes
  // ─────────────────────────────────────────────────────────────────────────────
  const fetchGallery = useCallback(async (type, page, folder = '') => {
    const apiDataType = GALLERY_DATATYPE_MAP[type];
    if (!apiDataType) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await galleryGetApi({ page, dataType: apiDataType, folder: folder || undefined });
      const items = res?.data?.data ?? [];
      setMediaItems(items);
      setHasMore(items.length === ITEMS_PER_PAGE);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        (isHi ? 'गैलरी लोड करने में त्रुटि हुई।' : 'Failed to load gallery. Please try again.');
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [isHi]);

  // Load the folder list for the active tab — powers the folder filter dropdown.
  const loadFilterFolders = useCallback(async (type) => {
    const apiDataType = GALLERY_DATATYPE_MAP[type];
    if (!apiDataType) return;
    try {
      const res = await galleryFoldersApi({ dataType: apiDataType });
      setFilterFolders(res?.data?.data ?? []);
    } catch {
      setFilterFolders([]);
    }
  }, []);

  // Tab switch: reset page + folder filter, then fetch items & folder list
  useEffect(() => {
    setCurrentPage(1);
    setFolderFilter('');
    fetchGallery(activeType, 1, '');
    loadFilterFolders(activeType);
  }, [activeType]); // eslint-disable-line react-hooks/exhaustive-deps

  // Folder filter change: reset to page 1 & refetch
  const handleFolderFilterChange = (folder) => {
    setFolderFilter(folder);
    setCurrentPage(1);
    fetchGallery(activeType, 1, folder);
  };

  // Load existing folder names whenever the upload modal opens or its media
  // type changes — these feed the datalist so admins can reuse a folder.
  useEffect(() => {
    if (!isUploadModalOpen) return;
    let active = true;
    (async () => {
      try {
        const apiDataType = GALLERY_DATATYPE_MAP[formData.type];
        const res = await galleryFoldersApi({ dataType: apiDataType });
        const names = (res?.data?.data ?? [])
          .map((f) => f.folder)
          .filter((name) => name && name !== 'Uncategorized');
        if (active) setFolderOptions(names);
      } catch {
        if (active) setFolderOptions([]);
      }
    })();
    return () => { active = false; };
  }, [isUploadModalOpen, formData.type]);

  // Page change
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
    fetchGallery(activeType, newPage, folderFilter);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // File picker handler — validates size & type
  // ─────────────────────────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Release previous object URL
    if (formData.filePreview) URL.revokeObjectURL(formData.filePreview);

    // Client-side size guard (backend also enforces 5 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFormData((prev) => ({
        ...prev,
        file: null,
        filePreview: '',
        fileError: isHi
          ? `फ़ाइल का आकार ${MAX_FILE_SIZE_MB}MB से अधिक नहीं होना चाहिए।`
          : `File size must not exceed ${MAX_FILE_SIZE_MB} MB.`,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file,
      filePreview: URL.createObjectURL(file),
      fileError: '',
    }));
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Upload handler
  // ─────────────────────────────────────────────────────────────────────────────
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadSuccess('');

    if (!formData.file) {
      setFormData((prev) => ({
        ...prev,
        fileError: isHi ? 'कृपया एक फ़ाइल चुनें।' : 'Please select a file to upload.',
      }));
      return;
    }

    const apiDataType = GALLERY_DATATYPE_MAP[formData.type];

    const fd = new FormData();
    fd.append('file', formData.file);
    fd.append('dataType', apiDataType);
    if (formData.title.trim()) {
      fd.append('title', formData.title.trim());
    }
    if (formData.folder.trim()) {
      fd.append('folder', formData.folder.trim());
    }

    setIsUploading(true);
    setUploadProgress(0);
    try {
      const res = await galleryUploadApi(fd, {
        onUploadProgress: (evt) => {
          if (evt.total) {
            setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
          }
        },
      });
      const newItem = res?.data?.data;

      // Prepend the returned item if it matches the current tab AND folder filter
      if (newItem && GALLERY_DATATYPE_MAP[activeType] === apiDataType) {
        const itemFolder = newItem.folder || '';
        const matchesFilter =
          folderFilter === '' ||
          (folderFilter === 'Uncategorized' ? itemFolder === '' : itemFolder === folderFilter);
        if (matchesFilter) {
          setMediaItems((prev) => [newItem, ...prev]);
        }
        // A brand-new folder may have been created — refresh the filter dropdown
        loadFilterFolders(activeType);
      }

      setUploadSuccess(
        res?.data?.message ||
          (isHi ? 'मीडिया सफलतापूर्वक अपलोड किया गया!' : 'Media uploaded successfully!')
      );

      // Reset form
      if (formData.filePreview) URL.revokeObjectURL(formData.filePreview);
      setFormData({ title: '', type: 'PHOTOS', category: 'Darshan', folder: '', file: null, filePreview: '', fileError: '' });
      if (fileInputRef.current) fileInputRef.current.value = '';

      setTimeout(() => {
        setIsUploadModalOpen(false);
        setUploadSuccess('');
      }, 1500);
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message;
      // 500 = Internal Server Error (backend issue, not frontend)
      const msg = status === 500
        ? (isHi
            ? 'सर्वर में आंतरिक त्रुटि हुई (500)। बैकएंड टीम से संपर्क करें।'
            : 'Server error (500): The backend encountered an issue. Please contact the server team.')
        : serverMsg ||
          err?.message ||
          (isHi ? 'अपलोड विफल। कृपया पुनः प्रयास करें।' : 'Upload failed. Please try again.');
      setFormData((prev) => ({ ...prev, fileError: msg }));
    } finally {
      setIsUploading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Delete handler — optimistic UI with rollback on error
  // ─────────────────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    // Snapshot for rollback
    const snapshot = [...mediaItems];
    // Optimistic remove
    setMediaItems((prev) => prev.filter((m) => m._id !== id));
    setDeletingId(id);

    try {
      await galleryDeleteApi(id);
      // A folder may now be empty — refresh the filter dropdown counts
      loadFilterFolders(activeType);
    } catch (err) {
      // Rollback on failure
      setMediaItems(snapshot);
      const msg =
        err?.response?.data?.message ||
        (isHi ? 'हटाना विफल। कृपया पुनः प्रयास करें।' : 'Delete failed. Please try again.');
      setError(msg);
    } finally {
      setDeletingId(null);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Close modal & cleanup object URL
  // ─────────────────────────────────────────────────────────────────────────────
  const handleCloseModal = () => {
    if (isUploading) return; // don't allow closing mid-upload
    if (formData.filePreview) URL.revokeObjectURL(formData.filePreview);
    setFormData({ title: '', type: 'PHOTOS', category: 'Darshan', folder: '', file: null, filePreview: '', fileError: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadSuccess('');
    setUploadProgress(0);
    setIsUploadModalOpen(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Filtered items (client-side search on loaded data)
  // ─────────────────────────────────────────────────────────────────────────────
  const filteredItems = mediaItems.filter((m) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (m.title || '').toLowerCase().includes(term) ||
      (m.category || '').toLowerCase().includes(term)
    );
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Tab definitions
  // ─────────────────────────────────────────────────────────────────────────────
  const TABS = [
    { id: 'PHOTOS', icon: Image, labelEn: 'Photos', labelHi: 'छायाचित्र' },
    { id: 'VIDEOS', icon: Video, labelEn: 'Videos', labelHi: 'वीडियो' },
    { id: 'WALLPAPERS', icon: Film, labelEn: 'Wallpapers', labelHi: 'वॉलपेपर' },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <Image className="w-6 h-6 text-[#c28227]" />
            <span>{isHi ? 'मीडिया, चित्र एवं वीडियो गैलरी प्रबंधन' : 'Media & Gallery Content Management'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi
              ? 'दर्शन छायाचित्र, आरती वीडियो, 4K वॉलपेपर अपलोड व व्यवस्थित करें।'
              : 'Upload and organize sanctum photos, video streams, and wallpapers.'}
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

      {/* ── Global Error Banner ─────────────────────────────────────────────── */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <div className="flex-1 text-xs font-medium">{error}</div>
          <button
            onClick={() => { setError(''); setCurrentPage(1); fetchGallery(activeType, 1, folderFilter); }}
            className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 transition shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {isHi ? 'पुनः प्रयास' : 'Retry'}
          </button>
        </div>
      )}

      {/* ── Tabs & Search Bar ───────────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Type Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => { setActiveType(t.id); setSearchTerm(''); }}
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

        {/* Folder filter + Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Folder Filter */}
          <div className="relative w-full sm:w-52">
            <Folder className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <select
              value={folderFilter}
              onChange={(e) => handleFolderFilterChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white transition appearance-none cursor-pointer"
            >
              <option value="">{isHi ? 'सभी फ़ोल्डर' : 'All folders'}</option>
              {filterFolders.map((f) => (
                <option key={f.folder} value={f.folder}>
                  {f.folder} ({f.count})
                </option>
              ))}
            </select>
            <ChevronRight className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-stone-400 pointer-events-none" />
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isHi ? 'शीर्षक या श्रेणी खोजें...' : 'Search by title or category...'}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
            />
          </div>
        </div>
      </div>

      {/* ── Media Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loading skeletons */}
        {isLoading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {/* Empty state */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center rounded-2xl bg-white border border-stone-200">
            <FileImage className="w-10 h-10 mx-auto text-stone-300 mb-3" />
            <p className="text-stone-400 font-medium text-sm">
              {searchTerm
                ? (isHi ? 'खोज के परिणाम नहीं मिले।' : 'No results match your search.')
                : (isHi ? 'इस श्रेणी में कोई मीडिया नहीं है।' : 'No media items in this section yet.')}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c28227] text-white text-xs font-bold hover:brightness-110 transition"
              >
                <UploadCloud className="w-4 h-4" />
                {isHi ? 'पहला मीडिया अपलोड करें' : 'Upload First Media'}
              </button>
            )}
          </div>
        )}

        {/* Media cards */}
        {!isLoading &&
          filteredItems.map((item) => {
            // Normalize real API shape: backend returns imageUrl, publicId, dataType etc.
            const id = item._id || item.id;
            const title = item.title || item.dataType || '';
            const url = item.imageUrl || item.url || item.mediaUrl || '';
            const thumbUrl = item.thumbUrl || url;
            const category = item.category || item.dataType || '';
            const folder = item.folder || '';
            const views = item.views ?? null;
            const date = item.createdAt
              ? new Date(item.createdAt).toLocaleDateString('en-IN')
              : (item.date || '');

            return (
              <div
                key={id}
                className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#c28227]/50 transition duration-300 group flex flex-col justify-between"
              >
                {/* Media Preview */}
                <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={thumbUrl || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=60&w=400'}
                    alt={title || 'Media'}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=60&w=400';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Category badge */}
                  {category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30">
                        {category}
                      </span>
                    </div>
                  )}

                  {/* Views pill */}
                  {views !== null && (
                    <div className="absolute bottom-3 left-3 text-[10px] text-white font-medium flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <Eye className="w-3 h-3 text-amber-300" />
                      <span>{views} views</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#c28227] transition line-clamp-2">
                      {title || (isHi ? 'शीर्षक नहीं' : 'Untitled')}
                    </h3>
                    {folder && (
                      <span className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-[#965f16]">
                        <FileImage className="w-3 h-3" />
                        {folder}
                      </span>
                    )}
                    <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between font-medium">
                      <span>{isHi ? 'अपलोड:' : 'Uploaded:'} {date}</span>
                      <span className="font-mono text-[#965f16] font-bold text-[10px] truncate max-w-[80px]">{id}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#c28227] hover:underline inline-flex items-center gap-1 font-bold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isHi ? 'पूर्वावलोकन' : 'Preview'}</span>
                    </a>

                    <button
                      onClick={() => handleDelete(id)}
                      disabled={deletingId === id}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title={isHi ? 'हटाएं' : 'Delete'}
                    >
                      {deletingId === id
                        ? <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                        : <Trash2 className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

      </div>

      {/* ── Pagination Navigation Controls (Next & Back) ── */}
      {!isLoading && mediaItems.length > 0 && (
        <div className="flex items-center justify-center gap-3 pt-6 pb-2 border-t border-stone-200">
          {/* Previous / Back Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isLoading}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              currentPage <= 1
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                : 'bg-white text-stone-800 hover:bg-[#c28227] hover:text-white border border-stone-200 hover:border-[#c28227] cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isHi ? 'पिछला पृष्ठ' : 'Previous'}</span>
          </button>

          {/* Page Number Badge */}
          <div className="px-3.5 py-1.5 rounded-xl bg-[#c28227]/15 border border-[#c28227]/40 text-[#c28227] font-bold text-xs shadow-xs">
            <span>{isHi ? `पृष्ठ ${currentPage}` : `Page ${currentPage}`}</span>
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasMore || isLoading}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              !hasMore
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                : 'bg-white text-stone-800 hover:bg-[#c28227] hover:text-white border border-stone-200 hover:border-[#c28227] cursor-pointer'
            }`}
          >
            <span>{isHi ? 'अगला पृष्ठ' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          UPLOAD MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#c28227]" />
                <span>{isHi ? 'नया मीडिया अपलोड करें' : 'Upload New Media Item'}</span>
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-stone-400 hover:text-stone-700 transition p-1 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Banner */}
            {uploadSuccess && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {uploadSuccess}
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-3.5 text-xs">

              {/* Media Title */}
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {isHi ? 'मीडिया शीर्षक' : 'Media Title'}
                  <span className="text-stone-400 font-normal ml-1">
                    ({isHi ? 'वैकल्पिक, न्यूनतम 3 अक्षर' : 'optional, min 3 chars'})
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={isHi ? 'जैसे: महा आरती दिव्य दर्शन' : 'e.g. Maha Aarti Divine Glimpse'}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
                />
              </div>

              {/* Media Type & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {isHi ? 'प्रकार' : 'Media Type'} *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
                  >
                    <option value="PHOTOS">Photos (छायाचित्र)</option>
                    <option value="VIDEOS">Videos (वीडियो)</option>
                    <option value="WALLPAPERS">Wallpapers (वॉलपेपर)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {isHi ? 'श्रेणी' : 'Category'}
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Darshan, Aarti"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Folder / Album — combobox: pick an existing folder or type a new one */}
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {isHi ? 'फ़ोल्डर / एल्बम' : 'Folder / Album'}
                  <span className="text-stone-400 font-normal ml-1">
                    ({isHi ? 'मौजूदा चुनें या नया लिखें' : 'pick existing or type new'})
                  </span>
                </label>
                <input
                  type="text"
                  list="gallery-folders"
                  value={formData.folder}
                  onChange={(e) => setFormData({ ...formData, folder: e.target.value })}
                  placeholder={isHi ? 'जैसे: दीपावली 2025' : 'e.g. Diwali 2025'}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
                />
                <datalist id="gallery-folders">
                  {folderOptions.map((name) => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>

              {/* File Picker */}
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {isHi ? 'फ़ाइल चुनें' : 'Select File'} *
                  <span className="text-stone-400 font-normal ml-1">
                    ({isHi ? 'अधिकतम 500MB' : 'max 500 MB'})
                  </span>
                </label>

                {/* Drop zone / file trigger */}
                <div
                  onClick={() => { if (!isUploading) fileInputRef.current?.click(); }}
                  className={`relative w-full rounded-xl border-2 border-dashed transition flex flex-col items-center justify-center py-6 px-4 text-center ${
                    isUploading ? 'cursor-default' : 'cursor-pointer'
                  } ${
                    formData.fileError
                      ? 'border-red-300 bg-red-50'
                      : formData.file
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-stone-200 bg-stone-50 hover:border-[#c28227] hover:bg-amber-50/30'
                  }`}
                >
                  {/* Upload progress overlay (WhatsApp-style ring) */}
                  {isUploading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl">
                      <ProgressRing progress={uploadProgress} />
                      <p className="text-[11px] font-bold text-stone-600">
                        {uploadProgress >= 100
                          ? (isHi ? 'प्रोसेस हो रहा है…' : 'Processing…')
                          : (isHi ? 'अपलोड हो रहा है…' : 'Uploading…')}
                      </p>
                    </div>
                  )}
                  {formData.filePreview ? (
                    <img
                      src={formData.filePreview}
                      alt="preview"
                      className="h-24 object-contain rounded-lg mb-2"
                    />
                  ) : (
                    <UploadCloud className="w-8 h-8 text-stone-400 mb-2" />
                  )}

                  <p className="text-[11px] font-semibold text-stone-600">
                    {formData.file
                      ? formData.file.name
                      : (isHi ? 'क्लिक करें और फ़ाइल चुनें' : 'Click to browse a file')}
                  </p>
                  {formData.file && (
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* File error */}
                {formData.fileError && (
                  <p className="mt-1.5 text-[11px] text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {formData.fileError}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold transition disabled:opacity-50"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !formData.file}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold hover:brightness-110 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {uploadProgress >= 100
                          ? (isHi ? 'प्रोसेस हो रहा है...' : 'Processing...')
                          : `${isHi ? 'अपलोड' : 'Uploading'} ${uploadProgress}%`}
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>{isHi ? 'सहेजें व प्रकाशित करें' : 'Save & Publish'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
