import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CalendarCheck, HeartHandshake, Users, TrendingUp, ArrowUpRight,
  Flame, Clock, Loader2, AlertCircle, RefreshCw,
} from 'lucide-react';
import { getAllPoojaBookingsApi, getAllPaymentsApi } from '../../clientApi/allApi';
import { listAdminsApi } from '../../clientApi/adminApi';

const toRupees = (paise) => Math.round((Number(paise) || 0) / 100);
const todayStr = () => new Date().toISOString().split('T')[0];

const STATUS_COLOR = {
  confirmed: 'bg-blue-50 text-blue-700 border border-blue-200',
  completed:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled:  'bg-red-50 text-red-700 border border-red-200',
  pending:    'bg-amber-50 text-amber-700 border border-amber-200',
};

const AARTI_SCHEDULE = [
  { nameEn: 'Mangala Aarti',  nameHi: 'मंगला आरती',  time: '05:30 AM – 06:00 AM' },
  { nameEn: 'Bhog Aarti',     nameHi: 'भोग आरती',    time: '12:00 PM – 12:30 PM' },
  { nameEn: 'Sandhya Aarti',  nameHi: 'संध्या आरती', time: '06:30 PM – 07:15 PM' },
  { nameEn: 'Shayan Aarti',   nameHi: 'शयन आरती',    time: '09:00 PM – 09:30 PM' },
];

function getAartiStatus(time) {
  const now = new Date();
  const [startStr] = time.split('–');
  const [hm, period] = startStr.trim().split(' ');
  let [h, m] = hm.split(':').map(Number);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  const aartiStart = new Date(); aartiStart.setHours(h, m, 0, 0);
  const aartiEnd = new Date(aartiStart.getTime() + 45 * 60 * 1000);
  if (now >= aartiEnd) return 'done';
  if (now >= aartiStart) return 'live';
  return 'upcoming';
}

export default function DashboardOverview({ setActiveTab }) {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [bookings, setBookings]           = useState([]);
  const [payments, setPayments]           = useState([]);
  const [staffCount, setStaffCount]       = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [bookRes, payRes, staffRes] = await Promise.allSettled([
        getAllPoojaBookingsApi({ limit: 200 }),
        getAllPaymentsApi(),
        listAdminsApi(),
      ]);

      if (bookRes.status === 'fulfilled') {
        const data = bookRes.value?.data?.data;
        setBookings(Array.isArray(data?.bookings) ? data.bookings : []);
      }
      if (payRes.status === 'fulfilled') {
        const data = payRes.value?.data?.data;
        setPayments(Array.isArray(data) ? data : []);
      }
      if (staffRes.status === 'fulfilled') {
        const data = staffRes.value?.data?.data;
        setStaffCount(Array.isArray(data) ? data.length : 0);
      }
    } catch {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const today = todayStr();

  const totalBookings   = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending' || b.status === 'confirmed').length;

  const donations       = payments.filter((p) => p.purpose === 'donation' && p.status === 'successful');
  const totalDonations  = donations.reduce((s, p) => s + toRupees(p.amount), 0);

  const todayBookings = bookings
    .filter((b) => {
      const bd = b.bookingDate ? new Date(b.bookingDate).toISOString().split('T')[0] : '';
      return bd === today;
    })
    .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
    .slice(0, 5);

  const recentDonations = [...donations]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  // ── KPI cards ──────────────────────────────────────────────────────────────
  const stats = [
    {
      id: 'bookings',
      titleEn: 'Total Pooja Bookings',
      titleHi: 'कुल पूजा बुकिंग',
      value: loading ? '—' : totalBookings.toLocaleString('en-IN'),
      subEn: `${pendingBookings} active`,
      subHi: `${pendingBookings} सक्रिय`,
      icon: CalendarCheck,
      color: 'text-amber-600 bg-amber-50 border border-amber-100',
      tab: 'pooja-booking',
    },
    {
      id: 'donations',
      titleEn: 'Donations & Seva Fund',
      titleHi: 'प्राप्त सेवा दान',
      value: loading ? '—' : `₹ ${totalDonations.toLocaleString('en-IN')}`,
      subEn: `${donations.length} successful`,
      subHi: `${donations.length} सफल भुगतान`,
      icon: HeartHandshake,
      color: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
      tab: 'donation',
    },
    {
      id: 'today',
      titleEn: "Today's Pooja Bookings",
      titleHi: 'आज की पूजा बुकिंग',
      value: loading ? '—' : todayBookings.length.toLocaleString('en-IN'),
      subEn: 'scheduled for today',
      subHi: 'आज हेतु निर्धारित',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50 border border-blue-100',
      tab: 'pooja-booking',
    },
    {
      id: 'staff',
      titleEn: 'Active Admins & Staff',
      titleHi: 'सक्रिय प्रशासक एवं सेवक',
      value: loading ? '—' : staffCount !== null ? String(staffCount + 1) : '—',
      subEn: 'including superadmin',
      subHi: 'सुपरएडमिन सहित',
      icon: Users,
      color: 'text-orange-600 bg-orange-50 border border-orange-100',
      tab: 'users',
    },
  ];

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

      {/* Refresh button */}
      <div className="flex justify-end">
        <button onClick={fetchAll} disabled={loading} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 transition disabled:opacity-50">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {isHi ? 'ताज़ा करें' : 'Refresh'}
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.tab)}
              className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">{isHi ? item.titleHi : item.titleEn}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin text-stone-300 mt-1" /> : item.value}
                  </h3>
                </div>
                <div className={`p-2.5 rounded-xl ${item.color} shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                {isHi ? item.subHi : item.subEn}
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's bookings + Aarti schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Today's pooja bookings */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{isHi ? 'आज की पूजा बुकिंग' : "Today's Pooja Bookings"}</h3>
                <p className="text-[11px] text-slate-500">{isHi ? 'आज हेतु निर्धारित संकल्प' : 'Scheduled for today'}</p>
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
              {isHi ? 'आज कोई पूजा बुकिंग नहीं।' : 'No pooja bookings scheduled for today.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-500 bg-slate-50 border-b border-slate-100 text-[11px]">
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'समय' : 'Time'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'पूजा' : 'Pooja'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'यजमान' : 'Devotee'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'राशि' : 'Amount'}</th>
                    <th className="py-2.5 px-3 font-semibold text-right">{isHi ? 'स्थिति' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {todayBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {b.bookingDate ? new Date(b.bookingDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—'}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {b.pooja?.poojaName || '—'}
                        <div className="text-[10px] font-normal text-slate-400 font-mono">{b._id?.slice(-6).toUpperCase()}</div>
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

        {/* Aarti schedule — static temple timings */}
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
                const status = getAartiStatus(a.time);
                return (
                  <div
                    key={a.nameEn}
                    className={`p-2.5 rounded-xl flex items-center justify-between ${
                      status === 'live'
                        ? 'bg-amber-50/80 border border-amber-200 shadow-xs'
                        : 'bg-slate-50 border border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${status === 'live' ? 'bg-amber-500 animate-ping' : 'bg-slate-400'}`} />
                      <div>
                        <div className={`text-xs font-${status === 'live' ? 'bold' : 'semibold'} ${status === 'live' ? 'text-amber-900' : 'text-slate-800'}`}>
                          {isHi ? a.nameHi : a.nameEn}
                        </div>
                        <div className={`text-[10px] ${status === 'live' ? 'text-amber-700' : 'text-slate-400'}`}>{a.time}</div>
                      </div>
                    </div>
                    {status === 'done' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">{isHi ? 'सम्पन्न' : 'Done'}</span>
                    )}
                    {status === 'live' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold shadow-xs">{isHi ? 'अभी चल रही' : 'Live'}</span>
                    )}
                    {status === 'upcoming' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{isHi ? 'प्रतीक्षित' : 'Upcoming'}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button onClick={() => setActiveTab('daily-shringar')} className="flex-1 py-1.5 px-3 rounded-lg bg-[#c28227] hover:bg-[#a66d1e] text-white text-xs font-bold transition text-center shadow-xs">
              {isHi ? 'दैनिक शृंगार अपडेट' : 'Update Daily Shringar'}
            </button>
            <button onClick={() => setActiveTab('config')} className="py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition">
              {isHi ? 'समय' : 'Timings'}
            </button>
          </div>
        </div>
      </div>

      {/* Recent donations */}
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
            <span>{isHi ? 'विस्तृत दान सूची' : 'Full Ledger'}</span>
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
              <div key={p._id} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:bg-white transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-slate-400">{p.razorpayPaymentId?.slice(-8).toUpperCase() || p._id?.slice(-6).toUpperCase()}</span>
                    <span className="text-xs font-bold text-emerald-700">₹ {toRupees(p.amount).toLocaleString('en-IN')}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mt-1.5 truncate">{p.payer?.name || 'Anonymous Devotee'}</h4>
                  <p className="text-[11px] text-amber-700 mt-0.5 font-medium truncate">{p.notes?.cause || 'General Donation'}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400">
                  {new Date(p.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
