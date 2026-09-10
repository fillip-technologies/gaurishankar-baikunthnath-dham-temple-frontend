import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Gift,
  Search,
  Eye,
  Phone,
  Loader2,
  AlertCircle,
  RefreshCw,
  IndianRupee,
  X,
} from 'lucide-react';
import { getAllPrasadBookingsApi } from '../../clientApi/allApi';
import { formatDate } from '../../clientApi/format';

const STATUS_LABEL = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  failed: 'Cancelled',
};

const fmtDate = (d) =>
  d ? formatDate(d) : '—';

// Normalizes a populated PrasadBooking document into the flat shape this table renders.
const normalizeBooking = (d) => {
  const payer = d.payment?.payer || {};
  return {
    id: d._id,
    devoteeName: payer.name || '—',
    phone: payer.phone || '—',
    email: payer.email || '',
    prasadName: d.prasad?.prasadName || '—',
    quantity: d.quantity,
    amount: (d.amount || 0) / 100,
    paymentMode: d.payment?.razorpayPaymentId ? 'Online (Razorpay)' : 'Online',
    status: STATUS_LABEL[d.status] || d.status,
    createdAt: fmtDate(d.createdAt),
  };
};

export default function PrasadBookingManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = useCallback(() => {
    return getAllPrasadBookingsApi()
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

  const handleRefresh = () => { setIsLoading(true); fetchBookings(); };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.devoteeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.prasadName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status.toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <Gift className="w-6 h-6 text-[#c28227]" />
            <span>{isHi ? 'प्रसाद बुकिंग प्रबंधन' : 'Prasad Booking Management'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi
              ? 'श्रद्धालुओं द्वारा ऑनलाइन बुक किए गए सभी प्रसाद की सूची।'
              : 'Review all prasad orders placed online by devotees.'}
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-stone-100 text-stone-700 border border-stone-200 font-bold text-xs sm:text-sm hover:bg-stone-200 transition disabled:opacity-50 w-fit"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isHi ? 'रिफ्रेश' : 'Refresh'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isHi ? 'नाम, फोन या प्रसाद खोजें...' : 'Search by name, phone or prasad...'}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-[#c28227] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {st === 'ALL' ? (isHi ? 'सभी' : 'All')
                : st === 'CONFIRMED' ? (isHi ? 'स्वीकृत' : 'Confirmed')
                : st === 'PENDING' ? (isHi ? 'प्रतीक्षारत' : 'Pending')
                : (isHi ? 'रद्द' : 'Cancelled')}
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
                <th className="py-3 px-4 font-bold">{isHi ? 'श्रद्धालु विवरण' : 'Devotee Info'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'प्रसाद' : 'Prasad'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'शुल्क' : 'Amount'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दिनांक' : 'Date'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'स्थिति' : 'Status'}</th>
                <th className="py-3 px-4 font-bold text-right">{isHi ? 'कार्रवाई' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {isLoading ? (
                <tr><td colSpan={7} className="py-10 text-center text-stone-400 font-medium">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#c28227]" />
                    {isHi ? 'बुकिंग लोड हो रही हैं…' : 'Loading bookings…'}
                  </span>
                </td></tr>
              ) : error ? (
                <tr><td colSpan={7} className="py-10 text-center">
                  <span className="inline-flex items-center gap-2 text-red-700 font-medium">
                    <AlertCircle className="w-4 h-4" />{error}
                  </span>
                </td></tr>
              ) : filteredBookings.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-stone-400 font-medium">
                  {isHi ? 'कोई प्रसाद बुकिंग नहीं मिली।' : 'No prasad bookings found.'}
                </td></tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#965f16]">{b.id.slice(-8)}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{b.devoteeName}</div>
                      <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5 font-medium">
                        <Phone className="w-3 h-3 text-stone-400" />{b.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-800">{b.prasadName}</div>
                      <div className="text-[10px] text-stone-500 font-medium">{isHi ? 'मात्रा:' : 'Qty:'} {b.quantity}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-emerald-700 inline-flex items-center"><IndianRupee className="w-3 h-3" />{b.amount.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-stone-500">{b.paymentMode}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-stone-600 font-semibold">{b.createdAt}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : b.status === 'Pending' ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-red-100 text-red-800 border-red-300'
                      }`}>{b.status}</span>
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

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#c28227]" />
                <h3 className="text-base font-extrabold text-stone-900">{isHi ? 'प्रसाद बुकिंग विवरण' : 'Prasad Booking Details'}</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-stone-400 hover:text-stone-700 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'संदर्भ आईडी' : 'Reference ID'}</span>
                  <span className="font-mono font-bold text-[#965f16]">{selectedBooking.id}</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'स्थिति' : 'Status'}</span>
                  <span className="font-bold text-emerald-700">{selectedBooking.status}</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'श्रद्धालु नाम' : 'Devotee Name'}</span>
                  <span className="font-bold text-stone-900">{selectedBooking.devoteeName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">{isHi ? 'संपर्क' : 'Phone'}</span>
                  <span className="text-stone-700 font-semibold">{selectedBooking.phone}</span>
                </div>
                {selectedBooking.email && (
                  <div className="col-span-2">
                    <span className="text-stone-500 block font-medium">{isHi ? 'ईमेल' : 'Email'}</span>
                    <span className="text-stone-700 font-semibold">{selectedBooking.email}</span>
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-stone-600 font-bold block mb-1">{isHi ? 'प्रसाद विवरण' : 'Prasad Details'}</span>
                <div className="text-sm font-extrabold text-[#965f16]">{selectedBooking.prasadName} × {selectedBooking.quantity}</div>
                <div className="text-stone-700 mt-1 font-bold inline-flex items-center"><IndianRupee className="w-3.5 h-3.5" />{selectedBooking.amount.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-stone-500 mt-1">{isHi ? 'भुगतान:' : 'Payment:'} {selectedBooking.paymentMode} · {isHi ? 'दिनांक:' : 'Date:'} {selectedBooking.createdAt}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
