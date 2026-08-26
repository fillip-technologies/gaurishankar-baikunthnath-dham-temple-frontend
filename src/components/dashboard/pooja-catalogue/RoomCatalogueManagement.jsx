import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BedDouble,
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
} from 'lucide-react';
import {
  getAllRoomApi,
  addRoomApi,
  updateRoomApi,
  removeRoomApi,
} from '../../clientApi/allApi';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const PLACEHOLDER =
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=60&w=800';

const EMPTY_FORM = {
  roomType: '',
  description: '',
  facilities: '',
  price: '',
  totalRooms: '',
  file: null,
  filePreview: '',
  fileError: '',
  existingImage: '',
};

// Flattens a catalogue Room document into the shape this panel renders.
const normalize = (d) => ({
  id: d._id,
  roomType: d.roomType || '',
  description: d.description || '',
  facilities: Array.isArray(d.facilities) ? d.facilities : [],
  price: d.price ?? 0,
  totalRooms: d.totalRooms ?? 0,
  availableRooms: d.availableRooms ?? 0,
  image: d.imageUrl || '',
});

export default function RoomCatalogueManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const fileInputRef = useRef(null);

  // ── Data state ──────────────────────────────────────────────────────────────
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // ── Filter / view state ─────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // ── Modal state ─────────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);

  const fetchRooms = useCallback(() => {
    return getAllRoomApi()
      .then((res) => {
        setRooms((res?.data?.data ?? []).map(normalize));
        setError('');
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
          (isHi ? 'कक्ष सूची लोड करने में त्रुटि हुई।' : 'Failed to load rooms. Please try again.'),
        );
      })
      .finally(() => setIsLoading(false));
  }, [isHi]);

  useEffect(() => { fetchRooms(); }, [fetchRooms]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchRooms();
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredRooms = rooms.filter((r) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      r.roomType.toLowerCase().includes(term) ||
      r.description.toLowerCase().includes(term) ||
      r.facilities.some((f) => f.toLowerCase().includes(term))
    );
  });

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

  const handleOpenEditModal = (room) => {
    setEditing(room);
    setFormData({
      roomType: room.roomType,
      description: room.description,
      facilities: (room.facilities || []).join(', '),
      price: String(room.price ?? ''),
      totalRooms: String(room.totalRooms ?? ''),
      file: null,
      filePreview: '',
      fileError: '',
      existingImage: room.image || '',
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

    const roomType = formData.roomType.trim();
    const price = Number(formData.price);
    const totalRooms = Number(formData.totalRooms);
    if (roomType.length < 3) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'कक्ष प्रकार कम से कम 3 अक्षर का होना चाहिए।' : 'Room type must be at least 3 characters.' }));
      return;
    }
    if (!formData.price || Number.isNaN(price) || price <= 0) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'कृपया एक वैध मूल्य दर्ज करें।' : 'Please enter a valid price greater than 0.' }));
      return;
    }
    if (!formData.totalRooms || !Number.isInteger(totalRooms) || totalRooms <= 0) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'कुल कक्ष एक धनात्मक पूर्णांक होना चाहिए।' : 'Total rooms must be a positive whole number.' }));
      return;
    }
    // Description is optional, but the backend rejects a non-empty value under 3 chars.
    const description = formData.description.trim();
    if (description && description.length < 3) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'विवरण कम से कम 3 अक्षर का होना चाहिए।' : 'Description must be at least 3 characters.' }));
      return;
    }
    if (!editing && !formData.file) {
      setFormData((p) => ({ ...p, fileError: isHi ? 'कृपया एक छवि चुनें।' : 'Please select an image.' }));
      return;
    }

    const fd = new FormData();
    if (formData.file) fd.append('file', formData.file);
    fd.append('roomType', roomType);
    fd.append('price', String(price));
    fd.append('totalRooms', String(totalRooms));
    if (description) fd.append('description', description);
    // The backend accepts facilities as a comma/newline separated string.
    if (formData.facilities.trim()) fd.append('facilities', formData.facilities.trim());

    setIsSaving(true);
    try {
      if (editing) await updateRoomApi(editing.id, fd);
      else await addRoomApi(fd);
      showNotification(editing
        ? (isHi ? 'कक्ष सफलतापूर्वक अपडेट किया गया।' : 'Room updated successfully.')
        : (isHi ? 'नया कक्ष सफलतापूर्वक जोड़ा गया।' : 'Room added successfully.'));
      if (formData.filePreview) URL.revokeObjectURL(formData.filePreview);
      setFormData(EMPTY_FORM);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsModalOpen(false);
      await fetchRooms();
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
    if (!window.confirm(isHi ? 'क्या आप इस कक्ष प्रकार को हटाना चाहते हैं?' : 'Are you sure you want to delete this room type?')) return;
    setDeletingId(id);
    try {
      await removeRoomApi(id);
      showNotification(isHi ? 'कक्ष हटा दिया गया है।' : 'Room deleted successfully.');
      await fetchRooms();
    } catch (err) {
      showNotification(err?.response?.data?.message || (isHi ? 'हटाना विफल।' : 'Delete failed.'));
    } finally {
      setDeletingId(null);
    }
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
            <BedDouble className="w-4 h-4" />
            <span>{isHi ? 'कक्ष कैटलॉग प्रबंधन' : 'Room Catalogue Management'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {isHi ? 'बुक करने योग्य कक्ष' : 'Bookable Rooms'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
            {isHi
              ? 'अतिथियों को दिखने वाले कक्ष प्रकार, सुविधाएं, मूल्य एवं उपलब्धता का प्रबंधन करें।'
              : 'Add, edit, price, and manage the room types guests can book.'}
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
            onClick={handleOpenAddModal}
            className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>{isHi ? 'नया कक्ष जोड़ें' : 'Add Room'}</span>
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

      {/* Control Bar: Search + count + view toggle */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <BedDouble className="w-3.5 h-3.5" />
            {rooms.length} {isHi ? 'कक्ष प्रकार' : 'room types'}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isHi ? 'नाम / सुविधा खोजें...' : 'Search rooms...'}
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
          <p className="text-sm font-medium">{isHi ? 'लोड हो रहा है…' : 'Loading rooms…'}</p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-3">
            <BedDouble className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-stone-800">{isHi ? 'कोई कक्ष नहीं मिला' : 'No Rooms Found'}</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {rooms.length === 0
              ? (isHi ? 'अभी तक कोई कक्ष नहीं जोड़ा गया है।' : 'No rooms have been added yet.')
              : (isHi ? 'आपकी खोज से मेल खाता कोई कक्ष नहीं है।' : 'No rooms match your search.')}
          </p>
          {rooms.length === 0 ? (
            <button onClick={handleOpenAddModal} className="mt-4 px-4 py-2 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-semibold text-xs transition inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> {isHi ? 'पहला कक्ष जोड़ें' : 'Add your first room'}
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
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-40 w-full relative overflow-hidden bg-stone-950">
                  <img src={room.image || PLACEHOLDER} alt={room.roomType} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }} />
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow inline-flex items-center gap-0.5">
                    <IndianRupee className="w-3 h-3" />{room.price.toLocaleString('en-IN')}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    {room.availableRooms}/{room.totalRooms} {isHi ? 'उपलब्ध' : 'available'}
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 className="text-base font-bold text-stone-900 leading-snug line-clamp-1">{room.roomType}</h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed min-h-[2rem]">{room.description || (isHi ? 'कोई विवरण नहीं' : 'No description')}</p>
                  {room.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {room.facilities.slice(0, 3).map((f, idx) => (
                        <span key={idx} className="bg-stone-100 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-md border border-stone-200">{f}</span>
                      ))}
                      {room.facilities.length > 3 && (
                        <span className="text-[10px] text-stone-400 font-medium px-1 py-0.5">+{room.facilities.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="px-4 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-1.5">
                <button onClick={() => handleOpenEditModal(room)} className="p-1.5 rounded-lg text-stone-600 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer" title={isHi ? 'संपादित करें' : 'Edit'}>
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(room.id)} disabled={deletingId === room.id} className="p-1.5 rounded-lg text-stone-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50" title={isHi ? 'हटाएं' : 'Delete'}>
                  {deletingId === room.id ? <Loader2 className="w-4 h-4 animate-spin text-red-400" /> : <Trash2 className="w-4 h-4" />}
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
                  <th className="py-3 px-4">{isHi ? 'कक्ष प्रकार' : 'Room Type'}</th>
                  <th className="py-3 px-4">{isHi ? 'सुविधाएं' : 'Facilities'}</th>
                  <th className="py-3 px-4 whitespace-nowrap">{isHi ? 'मूल्य' : 'Price'}</th>
                  <th className="py-3 px-4 whitespace-nowrap">{isHi ? 'उपलब्धता' : 'Availability'}</th>
                  <th className="py-3 px-4 text-right">{isHi ? 'क्रियाएं' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <img src={room.image || PLACEHOLDER} alt={room.roomType} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200" onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }} />
                        <div className="min-w-0">
                          <span className="font-bold text-stone-900 line-clamp-1">{room.roomType}</span>
                          <span className="text-[11px] text-stone-500 line-clamp-1">{room.description || '—'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <span className="text-stone-600 line-clamp-2">{room.facilities.length ? room.facilities.join(', ') : '—'}</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-bold text-emerald-700">
                      <span className="inline-flex items-center gap-0.5"><IndianRupee className="w-3.5 h-3.5" />{room.price.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-700 font-semibold">{room.availableRooms}/{room.totalRooms}</td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleOpenEditModal(room)} className="p-1.5 rounded-lg text-stone-600 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(room.id)} disabled={deletingId === room.id} className="p-1.5 rounded-lg text-stone-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50" title="Delete">
                          {deletingId === room.id ? <Loader2 className="w-4 h-4 animate-spin text-red-400" /> : <Trash2 className="w-4 h-4" />}
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
                <BedDouble className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">
                  {editing ? (isHi ? 'कक्ष संपादित करें' : 'Edit Room') : (isHi ? 'नया कक्ष जोड़ें' : 'Add New Room')}
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
                  {isHi ? 'कक्ष छवि' : 'Room Image'} {editing ? '' : '*'}
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

              {/* Room type */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">{isHi ? 'कक्ष प्रकार *' : 'Room Type *'}</label>
                <input type="text" required placeholder="e.g. Deluxe AC" value={formData.roomType} onChange={(e) => setFormData({ ...formData, roomType: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 font-semibold focus:bg-white focus:border-amber-500 focus:outline-none" />
              </div>

              {/* Price & Total Rooms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">{isHi ? 'मूल्य / रात (₹) *' : 'Price / night (₹) *'}</label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="number" min="1" step="1" required placeholder="e.g. 1500" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">{isHi ? 'कुल कक्ष *' : 'Total Rooms *'}</label>
                  <input type="number" min="1" step="1" required placeholder="e.g. 10" value={formData.totalRooms} onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
                  {editing && (
                    <p className="text-[10px] text-stone-400 mt-1">
                      {isHi
                        ? `वर्तमान उपलब्ध: ${editing.availableRooms}. कुल बदलने पर उपलब्धता उसी अनुपात में समायोजित होगी।`
                        : `Currently ${editing.availableRooms} available; changing the total shifts availability by the same amount.`}
                    </p>
                  )}
                </div>
              </div>

              {/* Facilities */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isHi ? 'सुविधाएं' : 'Facilities'}
                  <span className="text-stone-400 font-normal ml-1">({isHi ? 'कॉमा से अलग करें' : 'comma separated'})</span>
                </label>
                <input type="text" placeholder="AC, Attached Bath, Hot Water, Wi-Fi" value={formData.facilities} onChange={(e) => setFormData({ ...formData, facilities: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none" />
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">{isHi ? 'विवरण' : 'Description'}
                  <span className="text-stone-400 font-normal ml-1">({isHi ? 'वैकल्पिक' : 'optional'})</span>
                </label>
                <textarea rows={3} placeholder={isHi ? 'कक्ष का संक्षिप्त विवरण...' : 'Brief description of the room...'} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:border-amber-500 focus:outline-none leading-relaxed" />
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
                  <span>{isSaving ? (isHi ? 'सहेजा जा रहा है…' : 'Saving…') : editing ? (isHi ? 'परिवर्तन सहेजें' : 'Save Changes') : (isHi ? 'कक्ष जोड़ें' : 'Add Room')}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
