import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CalendarCheck, HeartHandshake, ArrowUpRight, Flame, Clock,
  Loader2, AlertCircle, RefreshCw, IndianRupee, Sparkles,
  BedDouble, Gift,
} from 'lucide-react';
import {
  getAllPoojaBookingsApi, getAllPaymentsApi,
  getAllRoomBookingsApi, getAllPrasadBookingsApi,
} from '../../clientApi/allApi';
import { formatDateTime } from '../../clientApi/format';

const toRupees = (paise) => Math.round((Number(paise) || 0) / 100);
const todayStr = () => new Date().toISOString().split('T')[0];

const STATUS_COLOR = {
  confirmed: 'bg-blue-50 text-blue-700 border border-blue-200',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled:  'bg-red-50 text-red-700 border border-red-200',
  pending:    'bg-amber-50 text-amber-700 border border-amber-200',
};

const TYPE_BADGE = {
  Pooja:  'bg-amber-100 text-amber-800',
  Room:   'bg-blue-100 text-blue-800',
  Prasad: 'bg-orange-100 text-orange-800',
};

const AARTI_SCHEDULE = [
  { nameEn: 'Mangala Aarti', nameHi: 'मंगला आरती',  time: '05:30 AM – 06:00 AM' },
  { nameEn: 'Bhog Aarti',    nameHi: 'भोग आरती',    time: '12:00 PM – 12:30 PM' },
  { nameEn: 'Sandhya Aarti', nameHi: 'संध्या आरती', time: '06:30 PM – 07:15 PM' },
  { nameEn: 'Shayan Aarti',  nameHi: 'शयन आरती',    time: '09:00 PM – 09:30 PM' },
];

function getAartiStatus(time) {
  const now = new Date();
  const [startStr] = time.split('–');
  const [hm, period] = startStr.trim().split(' ');
  let [h, m] = hm.split(':').map(Number);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  const start = new Date(); start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + 45 * 60 * 1000);
  if (now >= end) return 'done';
  if (now >= start) return 'live';
  return 'upcoming';
}

export default function DashboardOverview({ setActiveTab }) {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [poojaBookings,  setPoojaBookings]  = useState([]);
  const [roomBookings,   setRoomBookings]   = useState([]);
  const [prasadBookings, setPrasadBookings] = useState([]);
  const [payments,       setPayments]       = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError('');
    const [poojaRes, roomRes, prasadRes, payRes] = await Promise.allSettled([
      getAllPoojaBookingsApi({ limit: 200 }),
      getAllRoomBookingsApi({ limit: 200 }),
      getAllPrasadBookingsApi({ limit: 200 }),
      getAllPaymentsApi(),
    ]);
    if (poojaRes.status === 'fulfilled') {
      const d = poojaRes.value?.data?.data;
      setPoojaBookings(Array.isArray(d?.bookings) ? d.bookings : []);
    }
    if (roomRes.status === 'fulfilled') {
      const d = roomRes.value?.data?.data;
      setRoomBookings(Array.isArray(d?.bookings) ? d.bookings : []);
    }
    if (prasadRes.status === 'fulfilled') {
      const d = prasadRes.value?.data?.data;
      setPrasadBookings(Array.isArray(d?.bookings) ? d.bookings : []);
    }
    if (payRes.status === 'fulfilled') {
      const d = payRes.value?.data?.data;
      setPayments(Array.isArray(d) ? d : []);
    }
    if ([poojaRes, roomRes, prasadRes, payRes].every((r) => r.status === 'rejected')) {
      setError('Failed to load dashboard data.');
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Revenue (successful payments only) ────────────────────────────────────
  const settled = payments.filter((p) => p.status === 'successful');
  const poojaRevenue   = settled.filter((p) => p.reference?.model === 'PoojaBooking').reduce((s, p) => s + toRupees(p.amount), 0);
  const roomRevenue    = settled.filter((p) => p.reference?.model === 'RoomBooking').reduce((s, p) => s + toRupees(p.amount), 0);
  const prasadRevenue  = settled.filter((p) => p.reference?.model === 'PrasadBooking').reduce((s, p) => s + toRupees(p.amount), 0);
  const donationRevenue = settled.filter((p) => p.purpose === 'donation').reduce((s, p) => s + toRupees(p.amount), 0);
  const totalRevenue   = poojaRevenue + roomRevenue + prasadRevenue + donationRevenue;

  // ── Today's bookings — all types merged ──────────────────────────────────
  const today = todayStr();
  const todayBookings = [
    ...poojaBookings.map((b)  => ({ ...b, _type: 'Pooja',  _label: b.pooja?.poojaName  || 'Pooja',        _date: b.bookingDate })),
    ...roomBookings.map((b)   => ({ ...b, _type: 'Room',   _label: b.room?.roomType    || 'Room Booking',  _date: b.checkIn     })),
    ...prasadBookings.map((b) => ({ ...b, _type: 'Prasad', _label: b.prasad?.name      || 'Prasad',        _date: b.bookingDate })),
  ]
    .filter((b) => (b._date ? new Date(b._date).toISOString().split('T')[0] : '') === today)
    .sort((a, b) => new Date(a._date) - new Date(b._date))
    .slice(0, 6);

  // ── Recent donations ──────────────────────────────────────────────────────
  const recentDonations = [...settled.filter((p) => p.purpose === 'donation')]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-stone-500">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="font-medium">{error}</p>
        <button onClick={fetchAll} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c28227] text-white text-sm font-bold hover:brightness-110 transition">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">

      {/* Refresh */}
      <div className="flex justify-end">
        <button onClick={fetchAll} disabled={loading} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 transition disabled:opacity-50">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {isHi ? 'ताज़ा करें' : 'Refresh'}
        </button>
      </div>

      {/* ── Total Collection Banner ── */}
      <div className="rounded-2xl bg-gradient-to-r from-[#7b1a1a] via-[#a52020] to-[#7b1a1a] p-5 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              {isHi ? 'कुल संग्रह — सभी माध्यम' : 'Total Collection — All Modules'}
            </p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {loading ? '—' : `₹ ${totalRevenue.toLocaleString('en-IN')}`}
              </span>
              {loading && <Loader2 className="w-5 h-5 animate-spin text-amber-300 mb-1" />}
            </div>
            <p className="text-xs text-amber-200/70 mt-0.5">
              {isHi ? 'केवल सफल भुगतान सम्मिलित' : 'Successful payments only'}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/20">
            <IndianRupee className="w-7 h-7 text-amber-300" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { labelEn: 'Pooja Booking',  labelHi: 'पूजा बुकिंग',   value: poojaRevenue,    Icon: Sparkles,       tab: 'pooja-booking'  },
            { labelEn: 'Room Booking',   labelHi: 'कक्ष बुकिंग',   value: roomRevenue,     Icon: BedDouble,      tab: 'room-booking'   },
            { labelEn: 'Prasad',         labelHi: 'प्रसाद बुकिंग', value: prasadRevenue,   Icon: Gift,           tab: 'prasad-booking' },
            { labelEn: 'Donations',      labelHi: 'दान',            value: donationRevenue, Icon: HeartHandshake, tab: 'donation'       },
          ].map(({ labelEn, labelHi, value, Icon, tab }) => (
            <button
              key={labelEn}
              onClick={() => setActiveTab(tab)}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 transition text-left w-full"
            >
              <Icon className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-amber-200/80 font-semibold truncate">{isHi ? labelHi : labelEn}</p>
                <p className="text-sm font-extrabold text-white">
                  {loading ? '—' : `₹ ${value.toLocaleString('en-IN')}`}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Today's Bookings + Aarti ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Today's bookings — all types */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isHi ? 'आज की सभी बुकिंग' : "Today's Bookings"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {isHi ? 'पूजा · कक्ष · प्रसाद' : 'Pooja · Room · Prasad'}
                </p>
              </div>
            </div>
            <button onClick={() => setActiveTab('pooja-booking')} className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition">
              <span>{isHi ? 'सभी देखें' : 'View All'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10 text-stone-400">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span className="text-xs font-medium">{isHi ? 'लोड हो रहा है…' : 'Loading…'}</span>
            </div>
          ) : todayBookings.length === 0 ? (
            <div className="text-center py-10 text-xs text-stone-400 font-medium">
              {isHi ? 'आज कोई बुकिंग नहीं।' : 'No bookings scheduled for today.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-500 bg-slate-50 border-b border-slate-100 text-[11px]">
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'प्रकार' : 'Type'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'विवरण' : 'Details'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'नाम' : 'Name'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'राशि' : 'Amount'}</th>
                    <th className="py-2.5 px-3 font-semibold text-right">{isHi ? 'स्थिति' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {todayBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${TYPE_BADGE[b._type] || 'bg-slate-100 text-slate-700'}`}>
                          {b._type}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {b._label}
                        <div className="text-[10px] font-normal text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-amber-500" />
                          {b._date ? new Date(b._date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—'}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{b.payer?.name || '—'}</td>
                      <td className="py-3 px-3 font-bold text-emerald-700">
                        {b.amount ? `₹ ${toRupees(b.amount).toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold capitalize ${STATUS_COLOR[b.status] || STATUS_COLOR.pending}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Aarti schedule */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
              <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600 border border-orange-200/60">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{isHi ? 'दैनिक आरती समय सारिणी' : 'Sanctum Aarti Schedule'}</h3>
                <p className="text-[11px] text-slate-500">{isHi ? 'नित्य आरती समय' : 'Daily Mandir Timings'}</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {AARTI_SCHEDULE.map((a) => {
                const s = getAartiStatus(a.time);
                return (
                  <div key={a.nameEn} className={`p-2.5 rounded-xl flex items-center justify-between ${s === 'live' ? 'bg-amber-50/80 border border-amber-200 shadow-xs' : 'bg-slate-50 border border-slate-200/60'}`}>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${s === 'live' ? 'bg-amber-500 animate-ping' : 'bg-slate-400'}`} />
                      <div>
                        <div className={`text-xs ${s === 'live' ? 'font-bold text-amber-900' : 'font-semibold text-slate-800'}`}>{isHi ? a.nameHi : a.nameEn}</div>
                        <div className={`text-[10px] ${s === 'live' ? 'text-amber-700' : 'text-slate-400'}`}>{a.time}</div>
                      </div>
                    </div>
                    {s === 'done'     && <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">{isHi ? 'सम्पन्न' : 'Done'}</span>}
                    {s === 'live'     && <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold shadow-xs">{isHi ? 'अभी चल रही' : 'Live'}</span>}
                    {s === 'upcoming' && <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{isHi ? 'प्रतीक्षित' : 'Upcoming'}</span>}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button onClick={() => setActiveTab('daily-shringar')} className="flex-1 py-1.5 px-3 rounded-lg bg-[#c28227] hover:bg-[#a66d1e] text-white text-xs font-bold transition text-center shadow-xs">
              {isHi ? 'दैनिक शृंगार' : 'Update Shringar'}
            </button>
            <button onClick={() => setActiveTab('config')} className="py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition">
              {isHi ? 'समय' : 'Timings'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Recent Donations ── */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{isHi ? 'हाल के सेवा दान' : 'Recent Donations'}</h3>
              <p className="text-[11px] text-slate-500">{isHi ? 'नवीनतम सफल दान' : 'Latest successful transactions'}</p>
            </div>
          </div>
          <button onClick={() => setActiveTab('donation')} className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition">
            <span>{isHi ? 'विस्तृत सूची' : 'Full Ledger'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8 text-stone-400">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-xs font-medium">{isHi ? 'लोड हो रहा है…' : 'Loading…'}</span>
          </div>
        ) : recentDonations.length === 0 ? (
          <div className="text-center py-8 text-xs text-stone-400 font-medium">
            {isHi ? 'कोई दान प्राप्त नहीं हुआ।' : 'No donations received yet.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {recentDonations.map((p) => (
              <div key={p._id} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-white transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">{(p.razorpayPaymentId || p._id)?.slice(-8).toUpperCase()}</span>
                    <span className="text-xs font-bold text-emerald-700">₹ {toRupees(p.amount).toLocaleString('en-IN')}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mt-1.5 truncate">{p.payer?.name || 'Anonymous Devotee'}</h4>
                  <p className="text-[11px] text-amber-700 mt-0.5 font-medium truncate">{p.notes?.cause || 'General Donation'}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400">
                  {formatDateTime(p.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
