import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CalendarCheck,
  Search,
  PlusCircle,
  Eye,
  Phone,
  Sparkles,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import {
  getAllPoojaBookingsApi,
  getAllPoojaApi,
  createManualPoojaBookingApi,
  updatePoojaBookingStatusApi,
} from '../../clientApi/allApi';
import { formatDate } from '../../clientApi/format';

// Maps the backend booking status to the label the dashboard renders. `failed`
// (payment failed) and `cancelled` (admin-cancelled) both display as "Cancelled"
// — the admin doesn't need to distinguish the two.
const STATUS_LABEL = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
  failed: 'Cancelled',
};

// Normalizes a populated PoojaBooking document into the flat shape this table
// renders. Fields the backend does not capture (gotra, priest, slot, …) are
// left blank rather than faked.
const normalizeBooking = (d) => {
  // Online bookings carry the payer on the linked Payment; manual (counter)
  // bookings have no Payment and keep the payer snapshot on the booking itself.
  const payer = d.payment?.payer || d.payer || {};
  const isManual = d.source === 'manual';
  return {
    id: d._id,
    devoteeName: payer.name || '—',
    phone: payer.phone || '—',
    email: payer.email || '',
    gotra: '—',
    nakshatra: '—',
    poojaEn: d.pooja?.poojaName || '—',
    poojaHi: d.pooja?.poojaName || '—',
    date: d.bookingDate ? formatDate(d.bookingDate) : '—',
    timeSlot: '',
    priest: '—',
    amount: (d.amount || 0) / 100,
    quantity: d.quantity,
    paymentStatus: d.status === 'confirmed' ? 'Paid' : d.status === 'failed' ? 'Failed' : 'Pending',
    paymentMode: isManual
      ? d.paymentMode || 'Counter'
      : d.payment?.razorpayPaymentId
      ? 'Online (Razorpay)'
      : 'Online',
    status: STATUS_LABEL[d.status] || d.status,
    notes: d.quantity ? `Quantity: ${d.quantity}` : '',
  };
};

export default function PoojaBookingManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Pure loader: all state updates live inside the promise callbacks (never
  // synchronous), so the mount effect below doesn't trip
  // react-hooks/set-state-in-effect. `isLoading` starts true, so the initial
  // load already shows the spinner without a synchronous setState here.
  const fetchBookings = useCallback(() => {
    return getAllPoojaBookingsApi()
      .then((res) => {
        setBookings((res?.data?.data?.bookings ?? []).map(normalizeBooking));
        setError('');
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
          (isHi ? 'बुकिंग लोड करने में त्रुटि हुई।' : 'Failed to load bookings. Please try again.'),
        );
      })
      .finally(() => setIsLoading(false));
  }, [isHi]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  // Manual refresh from the header button — safe to flip the spinner on here
  // because it runs in an event handler, not inside an effect.
  const handleRefresh = () => {
    setIsLoading(true);
    fetchBookings();
  };

  // Bookable pooja catalogue — powers the "Pooja Type" select in the add modal.
  // The manual route needs a real pooja _id, so we can't hardcode names anymore.
  const [poojas, setPoojas] = useState([]);
  useEffect(() => {
    getAllPoojaApi()
      .then((res) => setPoojas(res?.data?.data ?? []))
      .catch(() => setPoojas([]));
  }, []);

  const EMPTY_FORM = {
    devoteeName: '',
    phone: '',
    email: '',
    poojaId: '',
    quantity: '1',
    date: '',
    amount: '',
    paymentMode: 'Cash at Counter',
  };
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.devoteeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.poojaEn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status.toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // `status` is a backend code (confirmed|completed|cancelled). The API stores
  // the code; local state stores the label form (STATUS_LABEL[code]) that the
  // badge colours and the status filter both key off.
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [statusError, setStatusError] = useState('');

  const handleStatusChange = async (id, status) => {
    setStatusError('');
    setStatusUpdatingId(id);
    try {
      await updatePoojaBookingStatusApi(id, status);
      const label = STATUS_LABEL[status] || status;
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: label } : b))
      );
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking((prev) => ({ ...prev, status: label }));
      }
    } catch (err) {
      setStatusError(
        err?.response?.data?.message ||
        (isHi ? 'स्थिति अपडेट करने में त्रुटि हुई।' : 'Failed to update status. Please try again.'),
      );
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.poojaId) {
      setFormError(isHi ? 'कृपया पूजा चुनें।' : 'Please select a pooja.');
      return;
    }

    setIsSaving(true);
    try {
      await createManualPoojaBookingApi({
        poojaId: formData.poojaId,
        quantity: Number(formData.quantity) || 1,
        bookingDate: formData.date || new Date().toISOString().split('T')[0],
        amount: formData.amount === '' ? undefined : Number(formData.amount),
        paymentMode: formData.paymentMode,
        payer: {
          name: formData.devoteeName.trim(),
          phone: formData.phone.trim(),
          ...(formData.email.trim() ? { email: formData.email.trim() } : {}),
        },
      });

      setIsAddModalOpen(false);
      setFormData(EMPTY_FORM);
      // Reload from the server so the new record shows with its real _id/amount.
      await fetchBookings();
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
        (isHi ? 'बुकिंग सहेजने में त्रुटि हुई।' : 'Failed to save booking. Please try again.'),
      );
    } finally {
      setIsSaving(false);
    }
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

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-stone-100 text-stone-700 border border-stone-200 font-bold text-xs sm:text-sm hover:bg-stone-200 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isHi ? 'रिफ्रेश' : 'Refresh'}</span>
          </button>
          <button
            onClick={() => { setFormError(''); setFormData(EMPTY_FORM); setIsAddModalOpen(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-xs sm:text-sm hover:brightness-110 shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isHi ? 'नई पूजा दर्ज करें' : 'Record New Pooja'}</span>
          </button>
        </div>
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
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-stone-400 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#c28227]" />
                      {isHi ? 'बुकिंग लोड हो रही हैं…' : 'Loading bookings…'}
                    </span>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center">
                    <span className="inline-flex items-center gap-2 text-red-700 font-medium">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </span>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
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
                        onClick={() => { setStatusError(''); setSelectedBooking(b); }}
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

              {statusError && (
                <div className="flex items-center gap-2 text-red-700 font-medium pt-1">
                  <AlertCircle className="w-4 h-4" />
                  {statusError}
                </div>
              )}

              {/* Status Update Buttons */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-2 justify-end">
                {(() => {
                  const busy = statusUpdatingId === selectedBooking.id;
                  return (
                    <>
                      <button
                        disabled={busy}
                        onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 font-bold transition disabled:opacity-50"
                      >
                        {isHi ? 'स्वीकृत करें' : 'Confirm'}
                      </button>
                      <button
                        disabled={busy}
                        onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
                        className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200 font-bold transition disabled:opacity-50"
                      >
                        {isHi ? 'पूर्ण चिह्नित करें' : 'Mark Completed'}
                      </button>
                      <button
                        disabled={busy}
                        onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                        className="px-3 py-1.5 rounded-xl bg-red-100 text-red-800 border border-red-300 hover:bg-red-200 font-bold transition disabled:opacity-50"
                      >
                        {isHi ? 'रद्द करें' : 'Cancel'}
                      </button>
                    </>
                  );
                })()}
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
                    placeholder="9876500000"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {isHi ? 'ईमेल (रसीद हेतु)' : 'Email (for receipt)'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={isHi ? 'वैकल्पिक — रसीद ईमेल के लिए' : 'Optional — emails a receipt if provided'}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'पूजा का प्रकार' : 'Pooja Type'} *</label>
                <select
                  required
                  value={formData.poojaId}
                  onChange={(e) => setFormData({ ...formData, poojaId: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                >
                  <option value="" disabled>
                    {isHi ? '— पूजा चुनें —' : '— Select a pooja —'}
                  </option>
                  {poojas.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.poojaName} (₹{p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'दिनांक' : 'Date'} *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'मात्रा' : 'Quantity'} *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {isHi ? 'शुल्क अधिभावी (₹)' : 'Amount Override (₹)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder={isHi ? 'खाली = सूची मूल्य' : 'Blank = catalogue price'}
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
                    <option value="Cash at Counter">Cash at Counter</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank Card">Bank Card</option>
                  </select>
                </div>
              </div>

              {formError && (
                <div className="flex items-center gap-2 text-red-700 font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {formError}
                </div>
              )}

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
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold hover:brightness-110 shadow-sm transition disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
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
