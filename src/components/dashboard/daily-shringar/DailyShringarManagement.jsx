import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Flower2,
  Sparkles,
  Calendar,
  Clock,
  Plus,
  Search,
  Trash2,
  Edit3,
  Eye,
  Download,
  Share2,
  CheckCircle2,
  LayoutGrid,
  List,
  AlertCircle,
  FileImage,
  RefreshCw,
  UserCheck,
  Flame,
  Star,
  ExternalLink
} from 'lucide-react';
import ShringarFormModal from './ShringarFormModal';
import ShringarPreviewModal from './ShringarPreviewModal';
import todayShringarImg from '../../../assets/home/herosection-3.png';
import altShringarImg1 from '../../../assets/home/herosection-2.png';
import altShringarImg2 from '../../../assets/home/upcoming-festival.png';
import altShringarImg3 from '../../../assets/home/herosection.png';

const STORAGE_KEY = 'baikunth_daily_shringar_list';

const DEFAULT_SHRINGAR_LIST = [
  {
    id: 'shringar-today',
    isTodayActive: true,
    date: new Date().toISOString().slice(0, 10),
    timeSlot: '08:30 AM',
    titleEn: 'Aaj Ka Divya Shringar',
    titleHi: 'आज का दिव्य शृंगार',
    subtitleEn: 'Daily Morning Adornment of Lord Hari-Hara',
    subtitleHi: 'भगवान श्री गौरीशंकर एवं बैकुंठनाथ जी का नित्य प्रातः शृंगार',
    chant: '॥ ॐ नमः शिवाय • ॐ नमो भगवते वासुदेवाय ॥',
    descriptionEn: 'This morning, sacred snan and abhishek of Lord Gaurishankar & Lord Baikunthnath was performed with holy Ganga water and Panchamrit. The sanctum deity is divinely adorned with Malayagiri saffron sandalwood paste, fresh lotus blossoms, 108 Bilva leaves, Tulsi, and auspicious golden silks.',
    descriptionHi: 'आज प्रातः काल भगवान श्री गौरीशंकर (शिव) और भगवान बैकुंठनाथ (विष्णु) का पावन गंगाजल व पंचामृत से महाभिषेक संपन्न हुआ। इसके उपरांत प्रभु को मलयागिरि के सुगंधित केसरिया चंदन, ताजे कमल पुष्प, १०८ बेलपत्र, तुलसी दल एवं विशेष पीतांबर रेशमी वस्त्रों से अलौकिक रूप से सुसज्जित किया गया है।',
    flowers: 'Lotus, Jasmine, Marigold & Tulsi',
    chandan: 'Pure Saffron Sandalwood & Bhasma',
    silks: 'Pitambar Golden Silks & Sacred Crown',
    darshanHours: '05:00 AM - 12:30 PM | 04:00 PM - 09:00 PM',
    priestName: 'Pt. Ramakant Pandey',
    status: 'Published',
    viewsCount: 1420,
    downloadsCount: 380,
    image: todayShringarImg,
  },
  {
    id: 'shringar-yesterday',
    isTodayActive: false,
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    timeSlot: '08:30 AM',
    titleEn: 'Shravan Somvaar Mahashringar',
    titleHi: 'श्रावण सोमवार महाशृंगार',
    subtitleEn: 'Special Bilva & Ganga Snan Alankar',
    subtitleHi: 'विशेष बेलपत्र एवं गंगा स्नान अलंकार',
    chant: '॥ कर्पूरगौरं करुणावतारं संसारसारम् ॥',
    descriptionEn: 'Special Monday sacred adornment adorned with fresh fragrant champak, bilva patra garlands, and chandan bindi.',
    descriptionHi: 'श्रावण सोमवार के पावन अवसर पर १०००८ बेलपत्रों, गुलाब माला एवं केवड़े के इत्र से प्रभु का महाशृंगार किया गया।',
    flowers: 'Belpatra, Champak & White Roses',
    chandan: 'White Chandan & Bhasma Tripund',
    silks: 'Pure Silver Border Silks',
    darshanHours: '05:00 AM - 10:00 PM',
    priestName: 'Acharya Vidyadhar Jha',
    status: 'Published',
    viewsCount: 3250,
    downloadsCount: 910,
    image: altShringarImg1,
  },
  {
    id: 'shringar-ekadashi',
    isTodayActive: false,
    date: new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10),
    timeSlot: '05:30 AM',
    titleEn: 'Ekadashi Mangala Shringar',
    titleHi: 'पवित्रा एकादशी मंगला शृंगार',
    subtitleEn: 'Maha Vishnu Pitambar & Tulsi Garland Shringar',
    subtitleHi: 'महाविष्णु पीतांबर एवं तुलसी माला शृंगार',
    chant: '॥ ॐ नमो नारायणाय ॥',
    descriptionEn: 'Divinely adorned for auspicious Ekadashi with thousand Tulsi leaves, yellow carnations and gold ornaments.',
    descriptionHi: 'पवित्र एकादशी व्रत के उपलक्ष्य में भगवान विष्णु को पीतांबर वस्त्र, कस्तूरी तिलक एवं तुलसी माला से सुसज्जित किया गया।',
    flowers: 'Tulsi Dal, Yellow Marigold & Orchids',
    chandan: 'Kasturi Chandan Tilak',
    silks: 'Vibrant Yellow Banarasi Silks',
    darshanHours: '05:00 AM - 09:30 PM',
    priestName: 'Pt. Ramakant Pandey',
    status: 'Published',
    viewsCount: 2890,
    downloadsCount: 760,
    image: altShringarImg2,
  },
  {
    id: 'shringar-pradosh',
    isTodayActive: false,
    date: new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10),
    timeSlot: '06:30 PM',
    titleEn: 'Pradosh Sandhya Shringar',
    titleHi: 'प्रदोष संध्या शृंगार',
    subtitleEn: 'Evening Deepotsav & Pushpa Alankar',
    subtitleHi: 'संध्या दीपोत्सव एवं पुष्प अलंकार',
    chant: '॥ ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ॥',
    descriptionEn: 'Evening Aarti Shringar illuminated with 108 ghee lamps and white Parijat flowers.',
    descriptionHi: 'संध्या प्रदोष वेला में भगवान शिव को पारिजात पुष्पों व १०८ घृत दीपों की आभा में सुसज्जित किया गया।',
    flowers: 'Parijat, Hibiscus & Lotus',
    chandan: 'Rakta Chandan & Bhasma',
    silks: 'Crimson Red Silks',
    darshanHours: '04:00 PM - 09:00 PM',
    priestName: 'Pt. Shambhu Nath Mishra',
    status: 'Published',
    viewsCount: 1980,
    downloadsCount: 520,
    image: altShringarImg3,
  }
];

export default function DailyShringarManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  // Load shringar list from localStorage or fallback
  const [shringarList, setShringarList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SHRINGAR_LIST;
    } catch {
      return DEFAULT_SHRINGAR_LIST;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [activeSubTab, setActiveSubTab] = useState('today'); // 'today' | 'archive'

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shringarList));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  }, [shringarList]);

  // Show auto-dismissing toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Find the active today's shringar
  const todayActiveShringar = shringarList.find((item) => item.isTodayActive) || shringarList[0];

  // Save handler for Create / Edit
  const handleSaveShringar = (savedData) => {
    if (editingItem) {
      // Update existing
      setShringarList((prev) =>
        prev.map((item) => (item.id === savedData.id ? { ...item, ...savedData } : item))
      );
      showToast(isHi ? 'दैनिक शृंगार सफलतापूर्वक अपडेट किया गया!' : 'Daily Shringar updated successfully!');
    } else {
      // Create new: make it the active one
      const newItem = {
        ...savedData,
        id: `shringar-${Date.now()}`,
        isTodayActive: true,
        viewsCount: 0,
        downloadsCount: 0,
      };

      setShringarList((prev) => [
        newItem,
        ...prev.map((item) => ({ ...item, isTodayActive: false }))
      ]);
      showToast(isHi ? 'नया दैनिक शृंगार सफलतापूर्वक प्रकाशित हुआ!' : 'Today\'s Shringar published successfully!');
    }
    setEditingItem(null);
  };

  // Set as Active Shringar
  const handleSetActive = (id) => {
    setShringarList((prev) =>
      prev.map((item) => ({
        ...item,
        isTodayActive: item.id === id
      }))
    );
    showToast(isHi ? 'चयनित शृंगार को मुख्य शृंगार के रूप में सेट किया गया!' : 'Set as today\'s active shringar!');
  };

  // Delete Shringar item
  const handleDelete = (id) => {
    if (window.confirm(isHi ? 'क्या आप इस शृंगार रिकॉर्ड को हटाना चाहते हैं?' : 'Are you sure you want to delete this Shringar record?')) {
      setShringarList((prev) => prev.filter((item) => item.id !== id));
      showToast(isHi ? 'शृंगार रिकॉर्ड हटाया गया।' : 'Shringar record deleted.');
    }
  };

  // Filtered Archive List
  const filteredList = shringarList.filter((item) => {
    const q = searchQuery.toLowerCase();
    const titleMatch = (item.titleEn || '').toLowerCase().includes(q) || (item.titleHi || '').toLowerCase().includes(q);
    const flowerMatch = (item.flowers || '').toLowerCase().includes(q);
    const dateMatch = (item.date || '').includes(q);
    return titleMatch || flowerMatch || dateMatch;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-amber-200 px-5 py-3 rounded-2xl shadow-2xl border border-[#c28227] flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Actions */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#c28227] text-xs font-bold uppercase tracking-wider mb-1">
            <Flower2 className="w-4 h-4" />
            <span>{isHi ? 'नित्य दिव्य दर्शन प्रबंधन' : 'Daily Sanctum Adornment'}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 font-cinzel tracking-tight">
            {isHi ? 'दैनिक शृंगार प्रबंधन' : 'Daily Shringar Management'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isHi
              ? 'प्रतिदिन भगवान श्री गौरीशंकर व बैकुंठनाथ जी के प्रातः शृंगार की फोटो व विवरण अपडेट करें'
              : 'Upload and manage daily sanctum darshan photos, alankar details, and rituals'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Live Preview Button */}
          {todayActiveShringar && (
            <button
              type="button"
              onClick={() => setPreviewItem(todayActiveShringar)}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition flex items-center gap-2 border border-stone-300 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#c28227]" />
              <span>{isHi ? 'वेबसाइट पूर्वावलोकन' : 'Live Website Preview'}</span>
            </button>
          )}

          {/* Update / Upload Button */}
          <button
            type="button"
            onClick={() => {
              setEditingItem(null);
              setIsFormOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isHi ? 'आज का शृंगार अपडेट करें' : '+ Update Today\'s Shringar'}</span>
          </button>
        </div>
      </div>

      {/* Quick Statistics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Current Status */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              {isHi ? 'आज का शृंगार' : 'Today\'s Status'}
            </span>
            <span className="text-lg font-extrabold text-stone-900 font-cinzel mt-0.5 block">
              {todayActiveShringar?.status === 'Published' ? 'Live Published' : 'Draft'}
            </span>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {todayActiveShringar?.timeSlot || '08:30 AM'} Aarti
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#c28227] border border-amber-200 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 2: Total Archive Records */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              {isHi ? 'कुल शृंगार आर्काइव' : 'Total Archive Photos'}
            </span>
            <span className="text-2xl font-extrabold text-stone-900 font-sans mt-0.5 block">
              {shringarList.length}
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {isHi ? 'सहेजे गए दैनिक दर्शन' : 'Archived Darshan days'}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
            <FileImage className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 3: Devotee Views */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              {isHi ? 'आज के दर्शनार्थी' : 'Today\'s Darshan Views'}
            </span>
            <span className="text-2xl font-extrabold text-stone-900 font-sans mt-0.5 block">
              {(todayActiveShringar?.viewsCount || 1420).toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
              +24% vs yesterday
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 4: Head Priest on Duty */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              {isHi ? 'अर्चक / मुख्य पुजारी' : 'Priest on Duty'}
            </span>
            <span className="text-sm font-extrabold text-stone-900 mt-0.5 block truncate max-w-[140px]">
              {todayActiveShringar?.priestName || 'Pt. Ramakant Pandey'}
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">
              Sanctum In-Charge
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sub-Tabs: Today's Active Spotlight vs Archive History */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('today')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'today'
                ? 'bg-[#c28227] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Flower2 className="w-4 h-4" />
            <span>{isHi ? 'वर्तमान सक्रिय शृंगार (Active Today)' : 'Current Active Shringar'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('archive')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'archive'
                ? 'bg-[#c28227] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{isHi ? 'पूर्व शृंगार आर्काइव (Archive & History)' : 'Archive & Past History'} ({shringarList.length})</span>
          </button>
        </div>

        {activeSubTab === 'archive' && (
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* =========================================================
          TAB 1: TODAY'S ACTIVE SHRINGAR SPOTLIGHT
         ========================================================= */}
      {activeSubTab === 'today' && todayActiveShringar && (
        <div className="bg-white rounded-[28px] border border-stone-200/90 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* Left Column: Image Spotlight (7 cols) */}
          <div className="lg:col-span-7 relative bg-stone-950 flex items-center justify-center min-h-[420px] overflow-hidden group">
            <img
              src={todayActiveShringar.image}
              alt="Today Shringar"
              className="w-full h-full object-cover object-center max-h-[560px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#c28227] text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                <Flower2 className="w-3.5 h-3.5" />
                <span>{isHi ? 'आज का लाइव शृंगार' : 'Active Today'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-mono font-bold border border-white/20">
                {todayActiveShringar.timeSlot || '08:30 AM'}
              </span>
            </div>

            {/* Bottom Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <div className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(todayActiveShringar.date).toLocaleDateString(isHi ? 'hi-IN' : 'en-US', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-xs text-stone-200 font-hindi font-medium">
                {todayActiveShringar.chant}
              </p>
            </div>
          </div>

          {/* Right Column: Controls & Information (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-5 bg-white">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-[#c28227] uppercase tracking-wider block">
                    {isHi ? 'मुख्य गर्भगृह दर्शन' : 'Main Sanctum Darshan'}
                  </span>
                  <h3 className="text-2xl font-bold text-stone-900 font-cinzel">
                    {isHi ? todayActiveShringar.titleHi || todayActiveShringar.titleEn : todayActiveShringar.titleEn}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                  {todayActiveShringar.status}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {isHi ? todayActiveShringar.descriptionHi || todayActiveShringar.descriptionEn : todayActiveShringar.descriptionEn}
              </p>

              {/* Offerings Summary */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="bg-[#fefaf0] p-2.5 rounded-xl border border-amber-200/80 text-xs">
                  <span className="text-stone-400 block text-[10px] font-bold uppercase">
                    {isHi ? 'पावन पुष्प' : 'Sacred Flowers'}
                  </span>
                  <span className="font-semibold text-stone-900">
                    {todayActiveShringar.flowers}
                  </span>
                </div>

                <div className="bg-[#fefaf0] p-2.5 rounded-xl border border-amber-200/80 text-xs">
                  <span className="text-stone-400 block text-[10px] font-bold uppercase">
                    {isHi ? 'चंदन व तिलक' : 'Chandan & Tilak'}
                  </span>
                  <span className="font-semibold text-stone-900">
                    {todayActiveShringar.chandan}
                  </span>
                </div>

                <div className="bg-[#fefaf0] p-2.5 rounded-xl border border-amber-200/80 text-xs">
                  <span className="text-stone-400 block text-[10px] font-bold uppercase">
                    {isHi ? 'दिव्य परिधान' : 'Holy Silks & Crown'}
                  </span>
                  <span className="font-semibold text-stone-900">
                    {todayActiveShringar.silks}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-stone-100 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(todayActiveShringar);
                    setIsFormOpen(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition flex items-center justify-center gap-1.5 border border-stone-300 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#c28227]" />
                  <span>{isHi ? 'विवरण संपादित करें' : 'Edit Details'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewItem(todayActiveShringar)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#c28227] hover:bg-[#a66d1e] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isHi ? 'लाइव प्रीव्यू' : 'Live Preview'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span>Darshan: {todayActiveShringar.darshanHours}</span>
                <span>Priest: {todayActiveShringar.priestName}</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================
          TAB 2: ARCHIVE & PAST SHRINGAR HISTORY
         ========================================================= */}
      {activeSubTab === 'archive' && (
        <div className="space-y-4">
          
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHi ? 'दिनांक, शीर्षक या पुष्प द्वारा खोजें...' : 'Search by date, title, or flower...'}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#c28227]"
              />
            </div>

            <span className="text-xs text-stone-500 font-medium">
              Showing {filteredList.length} of {shringarList.length} records
            </span>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredList.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-lg flex flex-col justify-between group ${
                    item.isTodayActive ? 'border-2 border-[#c28227] ring-2 ring-amber-300/40' : 'border-stone-200/80 hover:border-[#c28227]'
                  }`}
                >
                  {/* Photo Container */}
                  <div className="relative h-52 bg-stone-900 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {item.isTodayActive && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#c28227] text-white text-[10px] font-extrabold shadow-sm">
                          ACTIVE TODAY
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-200 text-[10px] font-mono border border-white/20">
                        {item.timeSlot}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] text-amber-300 font-bold block">
                        {new Date(item.date).toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <h4 className="font-bold text-sm truncate font-cinzel">
                        {isHi ? item.titleHi || item.titleEn : item.titleEn}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2 flex-1">
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {isHi ? item.descriptionHi || item.descriptionEn : item.descriptionEn}
                    </p>

                    <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                      <div>
                        <strong className="text-stone-700">Flowers:</strong> {item.flowers}
                      </div>
                      <div>
                        <strong className="text-stone-700">Priest:</strong> {item.priestName}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-1">
                    {!item.isTodayActive && (
                      <button
                        type="button"
                        onClick={() => handleSetActive(item.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-[#c28227] text-[#c28227] hover:text-white font-bold text-[10px] transition cursor-pointer"
                        title="Set as Today's Active Shringar"
                      >
                        Set Active
                      </button>
                    )}

                    <div className="flex items-center gap-1 ml-auto">
                      <button
                        type="button"
                        onClick={() => setPreviewItem(item)}
                        className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingItem(item);
                          setIsFormOpen(true);
                        }}
                        className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 font-bold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Preview</th>
                      <th className="py-3 px-4">Date & Slot</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Flowers & Offerings</th>
                      <th className="py-3 px-4">Priest</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
                    {filteredList.map((item) => (
                      <tr key={item.id} className="hover:bg-amber-50/40 transition">
                        <td className="py-3 px-4">
                          <img
                            src={item.image}
                            alt={item.titleEn}
                            className="w-14 h-10 object-cover rounded-lg border border-stone-200"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-stone-900 font-mono">
                            {item.date}
                          </div>
                          <span className="text-[10px] text-stone-500 font-semibold">{item.timeSlot}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-stone-900 font-cinzel">
                            {isHi ? item.titleHi || item.titleEn : item.titleEn}
                          </div>
                          {item.isTodayActive && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-amber-100 text-[#c28227] text-[9px] font-extrabold">
                              ACTIVE TODAY
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-stone-600 max-w-[200px] truncate">
                          {item.flowers}
                        </td>
                        <td className="py-3 px-4 text-stone-700">
                          {item.priestName}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            type="button"
                            onClick={() => setPreviewItem(item)}
                            className="p-1 rounded hover:bg-stone-200 text-stone-700 transition"
                            title="Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItem(item);
                              setIsFormOpen(true);
                            }}
                            className="p-1 rounded hover:bg-stone-200 text-stone-700 transition"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Shringar Form Modal (Create / Edit) */}
      <ShringarFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveShringar}
        editingItem={editingItem}
        isHi={isHi}
      />

      {/* Shringar Public Preview Modal */}
      <ShringarPreviewModal
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        shringarItem={previewItem}
        isHi={isHi}
      />

    </div>
  );
}
