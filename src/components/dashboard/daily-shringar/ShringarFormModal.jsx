import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  UploadCloud,
  Flower2,
  Calendar,
  Clock,
  Sparkles,
  FileImage,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import todayShringarImg from '../../../assets/home/herosection-3.png';

const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

export default function ShringarFormModal({ isOpen, onClose, onSave, editingItem, isHi }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    timeSlot: '08:30 AM',
    titleEn: 'Aaj Ka Divya Shringar',
    titleHi: 'आज का दिव्य शृंगार',
    subtitleEn: 'Daily Morning Adornment of Lord Hari-Hara',
    subtitleHi: 'भगवान श्री गौरीशंकर एवं बैकुंठनाथ जी का नित्य प्रातः शृंगार',
    chant: '॥ ॐ नमः शिवाय • ॐ नमो भगवते वासुदेवाय ॥',
    descriptionEn: 'This morning, sacred snan and abhishek of Lord Gaurishankar & Lord Baikunthnath was performed with holy Ganga water and Panchamrit. The sanctum deity is divinely adorned with Malayagiri saffron sandalwood paste, fresh lotus blossoms, 108 Bilva leaves, Tulsi, and auspicious golden silks.',
    descriptionHi: 'आज प्रातः काल भगवान श्री गौरीशंकर (शिव) और भगवान बैकुंठनाथ (विष्णु) का पावन गंगाजल व पंचामृत से महाभिषेक संपन्न हुआ। इसके उपरांत प्रभु को मलयागिरि के सुगंधित केसरिया चंदन, ताजे कमल पुष्प, १०८ बेलपत्र, तुलसी दल एवं विशेष पीतांबर रेशमी वस्त्रों से अलौकिक रूप से सुसज्जित किया गया है।',
    flowers: 'Lotus, Jasmine, Marigold & Tulsi (कमल, श्वेत मंदार, गेंदा एवं तुलसी दल)',
    chandan: 'Pure Saffron Sandalwood & Bhasma (शुद्ध मलयागिरि केसरिया चंदन एवं भस्म)',
    silks: 'Pitambar Golden Silks & Sacred Crown (पीतांबर रेशमी वस्त्र व स्वर्ण मुकुट)',
    darshanHours: '05:00 AM - 12:30 PM | 04:00 PM - 09:00 PM',
    priestName: 'Pt. Ramakant Pandey (मुख्य पुजारी)',
    status: 'Published',
    image: todayShringarImg,
    imagePreview: '',
    imageError: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        id: editingItem.id,
        date: editingItem.date || new Date().toISOString().slice(0, 10),
        timeSlot: editingItem.timeSlot || '08:30 AM',
        titleEn: editingItem.titleEn || '',
        titleHi: editingItem.titleHi || '',
        subtitleEn: editingItem.subtitleEn || '',
        subtitleHi: editingItem.subtitleHi || '',
        chant: editingItem.chant || '',
        descriptionEn: editingItem.descriptionEn || '',
        descriptionHi: editingItem.descriptionHi || '',
        flowers: editingItem.flowers || '',
        chandan: editingItem.chandan || '',
        silks: editingItem.silks || '',
        darshanHours: editingItem.darshanHours || '05:00 AM - 12:30 PM | 04:00 PM - 09:00 PM',
        priestName: editingItem.priestName || '',
        status: editingItem.status || 'Published',
        image: editingItem.image || todayShringarImg,
        imagePreview: editingItem.image || '',
        imageError: '',
      });
    } else {
      setFormData({
        date: new Date().toISOString().slice(0, 10),
        timeSlot: '08:30 AM',
        titleEn: 'Aaj Ka Divya Shringar',
        titleHi: 'आज का दिव्य शृंगार',
        subtitleEn: 'Daily Morning Adornment of Lord Hari-Hara',
        subtitleHi: 'भगवान श्री गौरीशंकर एवं बैकुंठनाथ जी का नित्य प्रातः शृंगार',
        chant: '॥ ॐ नमः शिवाय • ॐ नमो भगवते वासुदेवाय ॥',
        descriptionEn: 'This morning, sacred snan and abhishek of Lord Gaurishankar & Lord Baikunthnath was performed with holy Ganga water and Panchamrit. The sanctum deity is divinely adorned with Malayagiri saffron sandalwood paste, fresh lotus blossoms, 108 Bilva leaves, Tulsi, and auspicious golden silks.',
        descriptionHi: 'आज प्रातः काल भगवान श्री गौरीशंकर (शिव) और भगवान बैकुंठनाथ (विष्णु) का पावन गंगाजल व पंचामृत से महाभिषेक संपन्न हुआ। इसके उपरांत प्रभु को मलयागिरि के सुगंधित केसरिया चंदन, ताजे कमल पुष्प, १०८ बेलपत्र, तुलसी दल एवं विशेष पीतांबर रेशमी वस्त्रों से अलौकिक रूप से सुसज्जित किया गया है।',
        flowers: 'Lotus, Jasmine, Marigold & Tulsi (कमल, श्वेत मंदार, गेंदा एवं तुलसी दल)',
        chandan: 'Pure Saffron Sandalwood & Bhasma (शुद्ध मलयागिरि केसरिया चंदन एवं भस्म)',
        silks: 'Pitambar Golden Silks & Sacred Crown (पीतांबर रेशमी वस्त्र व स्वर्ण मुकुट)',
        darshanHours: '05:00 AM - 12:30 PM | 04:00 PM - 09:00 PM',
        priestName: 'Pt. Ramakant Pandey (मुख्य पुजारी)',
        status: 'Published',
        image: todayShringarImg,
        imagePreview: todayShringarImg,
        imageError: '',
      });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormData((prev) => ({
        ...prev,
        imageError: isHi ? 'कृपया केवल छवि (JPG/PNG/WEBP) फाइल अपलोड करें।' : 'Please upload only an image file (JPG, PNG, WEBP).'
      }));
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setFormData((prev) => ({
        ...prev,
        imageError: isHi ? 'फाइल का आकार 15 MB से कम होना चाहिए।' : 'Image size must be less than 15 MB.'
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setFormData((prev) => ({
        ...prev,
        image: dataUrl,
        imagePreview: dataUrl,
        imageError: '',
        file
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const syntheticEvent = { target: { files: [file] } };
      handleFileChange(syntheticEvent);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titleEn && !formData.titleHi) {
      alert(isHi ? 'कृपया शृंगार शीर्षक दर्ज करें।' : 'Please provide Shringar Title.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSave({
        ...formData,
        id: formData.id || Date.now().toString(),
        updatedAt: new Date().toISOString()
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-4xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#2a080d] px-6 py-4 flex items-center justify-between text-white border-b border-amber-500/20">
          <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-bold tracking-wider uppercase font-sans">
            <Flower2 className="w-4 h-4 text-[#ffd700]" />
            <span>
              {editingItem
                ? isHi ? 'दैनिक शृंगार संपादित करें' : 'Edit Daily Shringar'
                : isHi ? 'नया दैनिक शृंगार अपडेट / अपलोड करें' : 'Update & Upload Today\'s Shringar'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Image Upload Zone */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              {isHi ? 'मुख्य शृंगार फोटो (Primary Deity Image) *' : 'Primary Shringar Photo *'}
            </label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                formData.imagePreview
                  ? 'border-[#c28227] bg-[#fefaf0]'
                  : 'border-stone-300 hover:border-[#c28227] bg-stone-50 hover:bg-amber-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {formData.imagePreview ? (
                <div className="relative group max-w-md mx-auto">
                  <img
                    src={formData.imagePreview}
                    alt="Shringar Preview"
                    className="w-full h-52 object-cover rounded-xl border border-amber-300 shadow-md"
                  />
                  <div className="mt-3 flex items-center justify-center gap-3 text-xs">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {isHi ? 'फोटो चयनित' : 'Photo Selected'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3 py-1 rounded-lg bg-[#c28227] text-white font-bold hover:bg-[#a66d1e] transition cursor-pointer"
                    >
                      {isHi ? 'फोटो बदलें' : 'Replace Photo'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#c28227] flex items-center justify-center mx-auto">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-stone-800">
                    {isHi ? 'भगवान की शृंगार फोटो यहाँ खींचें या क्लिक करें' : 'Drag & drop today\'s deity photo or click to browse'}
                  </p>
                  <p className="text-xs text-stone-500">
                    PNG, JPG, WEBP up to 15 MB. High-resolution landscape (16:9) recommended.
                  </p>
                </div>
              )}
            </div>

            {formData.imageError && (
              <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formData.imageError}
              </p>
            )}
          </div>

          {/* Section 2: Date & Aarti Session */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                {isHi ? 'शृंगार दिनांक (Date) *' : 'Shringar Date *'}
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                {isHi ? 'आरती समय खंड (Time Slot) *' : 'Aarti Time Slot *'}
              </label>
              <select
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#c28227]"
              >
                <option value="05:30 AM">05:30 AM (मंगला शृंगार - Mangala Aarti)</option>
                <option value="08:30 AM">08:30 AM (शृंगार आरती - Shringar Aarti)</option>
                <option value="12:00 PM">12:00 PM (राजभोग शृंगार - Rajbhog Aarti)</option>
                <option value="06:30 PM">06:30 PM (संध्या शृंगार - Sandhya Aarti)</option>
                <option value="08:30 PM">08:30 PM (शयन शृंगार - Shayan Aarti)</option>
                <option value="Special Utsav">Special Festival / Mahashivratri Utsav</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                {isHi ? 'स्थिति (Status) *' : 'Publish Status *'}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#c28227]"
              >
                <option value="Published">Published (Live on Website)</option>
                <option value="Draft">Draft (Only in Admin)</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Section 3: Titles & Subtitles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                Title (English)
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                placeholder="Aaj Ka Divya Shringar"
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                शीर्षक (हिंदी)
              </label>
              <input
                type="text"
                value={formData.titleHi}
                onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                placeholder="आज का दिव्य शृंगार"
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                Subtitle (English)
              </label>
              <input
                type="text"
                value={formData.subtitleEn}
                onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
                placeholder="Daily Morning Adornment of Lord Hari-Hara"
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                उपशीर्षक (हिंदी)
              </label>
              <input
                type="text"
                value={formData.subtitleHi}
                onChange={(e) => setFormData({ ...formData, subtitleHi: e.target.value })}
                placeholder="भगवान श्री गौरीशंकर एवं बैकुंठनाथ जी का नित्य प्रातः शृंगार"
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>
          </div>

          {/* Section 4: Sacred Chant */}
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
              {isHi ? 'दैनिक महामंत्र / श्लोक (Sacred Chant)' : 'Sacred Chant / Vedic Shloka'}
            </label>
            <input
              type="text"
              value={formData.chant}
              onChange={(e) => setFormData({ ...formData, chant: e.target.value })}
              placeholder="॥ ॐ नमः शिवाय • ॐ नमो भगवते वासुदेवाय ॥"
              className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#c28227]"
            />
          </div>

          {/* Section 5: Specific Offering Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#fefaf0] p-4 sm:p-5 rounded-2xl border border-amber-200/80">
            <div>
              <label className="text-[11px] font-bold text-[#c28227] uppercase tracking-wider block mb-1">
                {isHi ? 'पावन पुष्प (Sacred Flowers)' : 'Sacred Flowers'}
              </label>
              <input
                type="text"
                value={formData.flowers}
                onChange={(e) => setFormData({ ...formData, flowers: e.target.value })}
                placeholder="Lotus, Jasmine, Marigold & Tulsi"
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#c28227] uppercase tracking-wider block mb-1">
                {isHi ? 'चंदन व तिलक (Chandan & Tilak)' : 'Chandan & Tilak'}
              </label>
              <input
                type="text"
                value={formData.chandan}
                onChange={(e) => setFormData({ ...formData, chandan: e.target.value })}
                placeholder="Pure Saffron Sandalwood & Bhasma"
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#c28227] uppercase tracking-wider block mb-1">
                {isHi ? 'दिव्य परिधान (Holy Silks & Crown)' : 'Holy Silks & Crown'}
              </label>
              <input
                type="text"
                value={formData.silks}
                onChange={(e) => setFormData({ ...formData, silks: e.target.value })}
                placeholder="Pitambar Golden Silks & Sacred Crown"
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#c28227] uppercase tracking-wider block mb-1">
                {isHi ? 'मुख्य पुजारी का नाम (Head Priest)' : 'Head Priest / Sevak'}
              </label>
              <input
                type="text"
                value={formData.priestName}
                onChange={(e) => setFormData({ ...formData, priestName: e.target.value })}
                placeholder="Pt. Ramakant Pandey"
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>
          </div>

          {/* Section 6: Comprehensive Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                Description (English)
              </label>
              <textarea
                rows={3}
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                वर्णन (हिंदी)
              </label>
              <textarea
                rows={3}
                value={formData.descriptionHi}
                onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer"
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? (isHi ? 'सहेज रहे हैं...' : 'Saving...')
                  : (editingItem ? (isHi ? 'बदलाव सहेजें' : 'Save Changes') : (isHi ? 'शृंगार प्रकाशित करें' : 'Publish Shringar'))}
              </span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
