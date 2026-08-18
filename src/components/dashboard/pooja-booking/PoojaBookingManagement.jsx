import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CalendarCheck,
  Search,
  Filter,
  PlusCircle,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Calendar,
  Sparkles,
  ChevronDown,
  FileText,
  Printer,
  Edit
} from 'lucide-react';

export default function PoojaBookingManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [bookings, setBookings] = useState([
    {
      id: 'PB-9021',
      devoteeName: 'Rajesh Sharma',
      phone: '+91 98765 43210',
      email: 'rajesh.sharma@example.com',
      gotra: 'Kashyap',
      nakshatra: 'Rohini',
      poojaEn: 'Maha Rudrabhishek',
      poojaHi: 'महारुद्राभिषेक',
      date: '2026-08-19',
      timeSlot: '07:30 AM - 09:00 AM',
      priest: 'Pt. Ramachandra Shastri',
      amount: 2100,
      paymentStatus: 'Paid',
      paymentMode: 'Online (UPI)',
      status: 'Confirmed',
      notes: 'Family sankalp for peace & prosperity.',
    },
    {
      id: 'PB-9022',
      devoteeName: 'Amitabh Verma',
      phone: '+91 98111 22334',
      email: 'amitabh.v@example.com',
      gotra: 'Vatsa',
      nakshatra: 'Ashwini',
      poojaEn: 'Satyanarayan Vrat Katha',
      poojaHi: 'सत्यनारायण व्रत कथा',
      date: '2026-08-19',
      timeSlot: '10:30 AM - 12:00 PM',
      priest: 'Pt. Vidyadhar Joshi',
      amount: 1500,
      paymentStatus: 'Paid',
      paymentMode: 'Cash at Counter',
      status: 'Confirmed',
      notes: 'Gruha Pravesh Sankalp.',
    },
    {
      id: 'PB-9023',
      devoteeName: 'Kavita Singhania',
      phone: '+91 94567 89012',
      email: 'kavita.s@example.com',
      gotra: 'Bhardwaj',
      nakshatra: 'Pushya',
      poojaEn: 'Navagraha Shanti Pooja',
      poojaHi: 'नवग्रह शांति पूजा',
      date: '2026-08-20',
      timeSlot: '04:00 PM - 05:30 PM',
      priest: 'Pt. Harishanker Mishra',
      amount: 3500,
      paymentStatus: 'Paid',
      paymentMode: 'Card Payment',
      status: 'Confirmed',
      notes: 'Special havan included.',
    },
    {
      id: 'PB-9024',
      devoteeName: 'Devendra Patel',
      phone: '+91 99223 34455',
      email: 'devendra.p@example.com',
      gotra: 'Garg',
      nakshatra: 'Magha',
      poojaEn: 'Special Sandhya Aarti Seva',
      poojaHi: 'विशेष संध्या आरती सेवा',
      date: '2026-08-21',
      timeSlot: '06:30 PM - 07:30 PM',
      priest: 'Head Priest Team',
      amount: 5100,
      paymentStatus: 'Pending',
      paymentMode: 'Pay at Temple',
      status: 'Pending',
      notes: 'Prasad booking for 50 people.',
    },
    {
      id: 'PB-9025',
      devoteeName: 'Suresh Chandra',
      phone: '+91 97654 32198',
      email: 'suresh.c@example.com',
      gotra: 'Sandilya',
      nakshatra: 'Swati',
      poojaEn: 'Kaal Sarp Dosh Nivaran',
      poojaHi: 'कालसर्प दोष निवारण',
      date: '2026-08-22',
      timeSlot: '08:00 AM - 11:00 AM',
      priest: 'Pt. Ramachandra Shastri',
      amount: 4500,
      paymentStatus: 'Paid',
      paymentMode: 'Online (UPI)',
      status: 'Confirmed',
      notes: 'Full Vedic ritual with 3 priests.',
    },
  ]);

  const [formData, setFormData] = useState({
    devoteeName: '',
    phone: '',
    email: '',
    gotra: '',
    nakshatra: '',
    poojaName: 'Maha Rudrabhishek',
    date: '',
    timeSlot: '07:30 AM - 09:00 AM',
    priest: 'Pt. Ramachandra Shastri',
    amount: '2100',
    paymentMode: 'Online (UPI)',
    notes: '',
  });

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.devoteeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.poojaEn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status.toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    const newId = `PB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry = {
      id: newId,
      devoteeName: formData.devoteeName,
      phone: formData.phone,
      email: formData.email,
      gotra: formData.gotra || 'Kashyap',
      nakshatra: formData.nakshatra || 'N/A',
      poojaEn: formData.poojaName,
      poojaHi: formData.poojaName,
      date: formData.date || new Date().toISOString().split('T')[0],
      timeSlot: formData.timeSlot,
      priest: formData.priest,
      amount: Number(formData.amount) || 2100,
      paymentStatus: 'Paid',
      paymentMode: formData.paymentMode,
      status: 'Confirmed',
      notes: formData.notes || 'Direct counter booking',
    };

    setBookings([newEntry, ...bookings]);
    setIsAddModalOpen(false);
    setFormData({
      devoteeName: '',
      phone: '',
      email: '',
      gotra: '',
      nakshatra: '',
      poojaName: 'Maha Rudrabhishek',
      date: '',
      timeSlot: '07:30 AM - 09:00 AM',
      priest: 'Pt. Ramachandra Shastri',
      amount: '2100',
      paymentMode: 'Online (UPI)',
      notes: '',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <CalendarCheck className="w-6 h-6 text-[#c28227]" />
            <span>{isHi ? 'पूजा एवं अनुष्ठान बुकिंग प्रबंधन' : 'Pooja & Rituals Booking Management'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi
              ? 'श्रद्धालुओं द्वारा ऑनलाइन एवं काउंटर से बुक की गई सभी पूजाओं की सूची व संपादन।'
              : 'Review, schedule, approve, and manage devotee sankalp pooja appointments.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-xs sm:text-sm hover:brightness-110 shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isHi ? 'नई पूजा दर्ज करें' : 'Record New Pooja'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isHi ? 'नाम, फोन या आईडी खोजें...' : 'Search by name, phone or ID...'}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-[#c28227] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {st === 'ALL'
                ? isHi ? 'सभी' : 'All'
                : st === 'CONFIRMED'
                ? isHi ? 'स्वीकृत' : 'Confirmed'
                : st === 'PENDING'
                ? isHi ? 'प्रतीक्षारत' : 'Pending'
                : st === 'COMPLETED'
                ? isHi ? 'पूर्ण' : 'Completed'
                : isHi ? 'रद्द' : 'Cancelled'}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">{isHi ? 'बुकिंग आईडी' : 'Booking ID'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'यजमान विवरण' : 'Devotee Info'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'पूजा का नाम' : 'Pooja Name'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दिनांक एवं समय' : 'Date & Slot'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'आचार्य / पुरोहित' : 'Assigned Priest'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'शुल्क' : 'Amount'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'स्थिति' : 'Status'}</th>
                <th className="py-3 px-4 font-bold text-right">{isHi ? 'कार्रवाई' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-stone-400 font-medium">
                    {isHi ? 'कोई पूजा बुकिंग नहीं मिली।' : 'No pooja bookings found matching criteria.'}
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#965f16]">{b.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{b.devoteeName}</div>
                      <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5 font-medium">
                        <Phone className="w-3 h-3 text-stone-400" />
                        {b.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-800">{isHi ? b.poojaHi : b.poojaEn}</div>
                      <div className="text-[10px] text-stone-500 font-medium">
                        {isHi ? 'गोत्र:' : 'Gotra:'} {b.gotra}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-bold text-stone-700">{b.date}</div>
                      <div className="text-[10px] text-[#c28227] font-semibold">{b.timeSlot}</div>
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-medium">{b.priest}</td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-emerald-700">₹ {b.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-stone-500">{b.paymentMode}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : b.status === 'Pending'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : b.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-red-100 text-red-800 border-red-300'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 transition"
                        title={isHi ? 'विवरण देखें' : 'View Details'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View / Sankalp Details Modal (Light Theme) */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c28227]" />
                <h3 className="text-base font-extrabold text-stone-900">
                  {isHi ? 'पूजा संकल्प एवं रसीद विवरण' : 'Pooja Sankalp & Booking Slip'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-stone-400 hover:text-stone-700 font-bold transition text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'बुकिंग संदर्भ' : 'Reference ID'}</span>
                  <span className="font-mono font-bold text-[#965f16]">{selectedBooking.id}</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'वर्तमान स्थिति' : 'Status'}</span>
                  <span className="font-bold text-emerald-700">{selectedBooking.status}</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'यजमान नाम' : 'Devotee Name'}</span>
                  <span className="font-bold text-stone-900">{selectedBooking.devoteeName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'संपर्क नंबर' : 'Phone'}</span>
                  <span className="text-stone-700 font-semibold">{selectedBooking.phone}</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'गोत्र / नक्षत्र' : 'Gotra / Nakshatra'}</span>
                  <span className="text-stone-700 font-semibold">{selectedBooking.gotra} / {selectedBooking.nakshatra}</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'शुल्क / दक्षिणा' : 'Dakshina Amount'}</span>
                  <span className="font-extrabold text-emerald-700">₹ {selectedBooking.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-stone-600 font-bold block mb-1">{isHi ? 'अनुष्ठान विवरण' : 'Ritual Details'}</span>
                <div className="text-sm font-extrabold text-[#965f16]">{isHi ? selectedBooking.poojaHi : selectedBooking.poojaEn}</div>
                <div className="text-stone-700 mt-1 flex items-center gap-3 font-medium">
                  <span>📅 {selectedBooking.date}</span>
                  <span>⏰ {selectedBooking.timeSlot}</span>
                </div>
                <div className="text-stone-800 mt-1 font-bold">
                  🪔 {isHi ? 'प्रभारी आचार्य:' : 'Assigned Priest:'} {selectedBooking.priest}
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-600">
                  <span className="text-stone-500 block font-bold mb-0.5">{isHi ? 'विशेष टिप्पणी' : 'Devotee Notes'}</span>
                  <p>{selectedBooking.notes}</p>
                </div>
              )}

              {/* Status Update Buttons */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, 'Confirmed')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 font-bold transition"
                >
                  {isHi ? 'स्वीकृत करें' : 'Confirm'}
                </button>
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, 'Completed')}
                  className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200 font-bold transition"
                >
                  {isHi ? 'पूर्ण चिह्नित करें' : 'Mark Completed'}
                </button>
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, 'Cancelled')}
                  className="px-3 py-1.5 rounded-xl bg-red-100 text-red-800 border border-red-300 hover:bg-red-200 font-bold transition"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Booking Modal (Light Theme) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#c28227]" />
                <span>{isHi ? 'नई पूजा बुकिंग प्रविष्टि' : 'New Pooja Booking Entry'}</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'यजमान का नाम' : 'Devotee Name'} *</label>
                  <input
                    type="text"
                    required
                    value={formData.devoteeName}
                    onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'संपर्क नंबर' : 'Phone Number'} *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'गोत्र' : 'Gotra'}</label>
                  <input
                    type="text"
                    value={formData.gotra}
                    onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                    placeholder="e.g. Kashyap"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'नक्षत्र' : 'Nakshatra'}</label>
                  <input
                    type="text"
                    value={formData.nakshatra}
                    onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                    placeholder="e.g. Rohini"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'पूजा का प्रकार' : 'Pooja Type'}</label>
                <select
                  value={formData.poojaName}
                  onChange={(e) => setFormData({ ...formData, poojaName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                >
                  <option value="Maha Rudrabhishek">Maha Rudrabhishek (महारुद्राभिषेक)</option>
                  <option value="Satyanarayan Vrat Katha">Satyanarayan Vrat Katha (सत्यनारायण व्रत कथा)</option>
                  <option value="Navagraha Shanti Pooja">Navagraha Shanti Pooja (नवग्रह शांति पूजा)</option>
                  <option value="Special Sandhya Aarti Seva">Special Sandhya Aarti Seva (विशेष संध्या आरती)</option>
                  <option value="Kaal Sarp Dosh Nivaran">Kaal Sarp Dosh Nivaran (कालसर्प दोष निवारण)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'दिनांक' : 'Date'}</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'समय' : 'Slot'}</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  >
                    <option value="07:30 AM - 09:00 AM">07:30 AM - 09:00 AM</option>
                    <option value="10:30 AM - 12:00 PM">10:30 AM - 12:00 PM</option>
                    <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM</option>
                    <option value="06:30 PM - 07:30 PM">06:30 PM - 07:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'शुल्क (₹)' : 'Dakshina (₹)'}</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'भुगतान विधि' : 'Payment Mode'}</label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  >
                    <option value="Online (UPI)">Online (UPI)</option>
                    <option value="Cash at Counter">Cash at Counter</option>
                    <option value="Bank Card">Bank Card</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold transition"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold hover:brightness-110 shadow-sm transition"
                >
                  {isHi ? 'बुकिंग सहेजें' : 'Save Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
