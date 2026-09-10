import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IndianRupee, Search, Eye, Printer, Sparkles, BedDouble, Gift,
  HeartHandshake, Loader2, AlertCircle, RefreshCw, FileCheck, X,
  Download, CalendarDays,
} from 'lucide-react';
import { getAllPaymentsApi } from '../../clientApi/allApi';
import { formatDate, formatDateTime } from '../../clientApi/format';
import { generatePaymentPDF } from '../../../utils/generatePaymentPDF';

const toRupees = (paise) => Math.round((Number(paise) || 0) / 100);

const MODULE_MAP = {
  PoojaBooking:  { labelEn: 'Pooja',   labelHi: 'पूजा',    Icon: Sparkles,       badge: 'bg-amber-100 text-amber-800 border-amber-300'  },
  RoomBooking:   { labelEn: 'Room',    labelHi: 'कक्ष',    Icon: BedDouble,      badge: 'bg-blue-100 text-blue-800 border-blue-300'     },
  PrasadBooking: { labelEn: 'Prasad',  labelHi: 'प्रसाद',  Icon: Gift,           badge: 'bg-orange-100 text-orange-800 border-orange-300'},
  donation:      { labelEn: 'Donation',labelHi: 'दान',     Icon: HeartHandshake, badge: 'bg-emerald-100 text-emerald-800 border-emerald-300'},
};

const STATUS_STYLE = {
  successful: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  pending:    'bg-amber-100 text-amber-800 border-amber-300',
  created:    'bg-stone-100 text-stone-600 border-stone-300',
  failed:     'bg-red-100 text-red-700 border-red-300',
  refunded:   'bg-blue-100 text-blue-700 border-blue-300',
};

const MODULE_FILTERS = [
  { id: 'ALL',     labelEn: 'All',     labelHi: 'सभी',      match: () => true },
  { id: 'pooja',   labelEn: 'Pooja',   labelHi: 'पूजा',     match: (p) => p.reference?.model === 'PoojaBooking' },
  { id: 'room',    labelEn: 'Room',    labelHi: 'कक्ष',     match: (p) => p.reference?.model === 'RoomBooking' },
  { id: 'prasad',  labelEn: 'Prasad',  labelHi: 'प्रसाद',   match: (p) => p.reference?.model === 'PrasadBooking' },
  { id: 'donation',labelEn: 'Donation',labelHi: 'दान',      match: (p) => p.purpose === 'donation' },
];

const STATUS_FILTERS = [
  { id: 'ALL',        labelEn: 'All Status',  labelHi: 'सभी' },
  { id: 'successful', labelEn: 'Successful',  labelHi: 'सफल' },
  { id: 'created',    labelEn: 'Pending',     labelHi: 'प्रतीक्षित' },
  { id: 'failed',     labelEn: 'Failed',      labelHi: 'असफल' },
  { id: 'refunded',   labelEn: 'Refunded',    labelHi: 'वापस' },
];

function getModule(p) {
  if (p.purpose === 'donation') return MODULE_MAP.donation;
  return MODULE_MAP[p.reference?.model] || { labelEn: 'General', labelHi: 'सामान्य', Icon: IndianRupee, badge: 'bg-stone-100 text-stone-700 border-stone-300' };
}

function toRow(p) {
  const mod = getModule(p);
  return {
    _id:        p._id,
    paymentId:  p.razorpayPaymentId || p._id,
    orderId:    p.razorpayOrderId,
    module:     mod,
    purpose:    p.purpose,
    refModel:   p.reference?.model || '',
    donorName:  p.payer?.name  || 'Anonymous',
    email:      p.payer?.email || '—',
    phone:      p.payer?.phone || '—',
    amount:     toRupees(p.amount),
    status:     p.status || 'created',
    cause:      p.notes?.cause || '',
    pan:        p.notes?.pan   || '',
    city:       p.notes?.city  || '',
    state:      p.notes?.state || '',
    date:       p.createdAt ? new Date(p.createdAt).toISOString().split('T')[0] : '—',
    createdAt:  p.createdAt,
  };
}

export default function PaymentHistory() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [rows,         setRows]         = useState([]);
  const [isLoading,    setIsLoading]    = useState(true);
  const [error,        setError]        = useState('');
  const [search,       setSearch]       = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [fromDate,     setFromDate]     = useState('');
  const [toDate,       setToDate]       = useState('');
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [selected,     setSelected]     = useState(null);

  const fetchPayments = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getAllPaymentsApi();
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setRows(data.map(toRow).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      setError(err?.response?.data?.message || (isHi ? 'भुगतान इतिहास लोड करने में त्रुटि।' : 'Failed to load payment history.'));
    } finally {
      setIsLoading(false);
    }
  }, [isHi]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  // ── Summary stats (successful only) ──────────────────────────────────────
  const stats = useMemo(() => {
    const s = rows.filter((r) => r.status === 'successful');
    return {
      total:   s.reduce((acc, r) => acc + r.amount, 0),
      pooja:   s.filter((r) => r.refModel === 'PoojaBooking').reduce((acc, r) => acc + r.amount, 0),
      room:    s.filter((r) => r.refModel === 'RoomBooking').reduce((acc, r) => acc + r.amount, 0),
      prasad:  s.filter((r) => r.refModel === 'PrasadBooking').reduce((acc, r) => acc + r.amount, 0),
      donation:s.filter((r) => r.purpose === 'donation').reduce((acc, r) => acc + r.amount, 0),
      count:   rows.length,
      settled: s.length,
    };
  }, [rows]);

  // ── Filtered rows ─────────────────────────────────────────────────────────
  const activeMod    = MODULE_FILTERS.find((f) => f.id === moduleFilter) || MODULE_FILTERS[0];
  const activeStatus = STATUS_FILTERS.find((f) => f.id === statusFilter) || STATUS_FILTERS[0];

  const filtered = rows.filter((r) => {
    const term = search.toLowerCase();
    const matchSearch =
      r.donorName.toLowerCase().includes(term) ||
      r.paymentId.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.phone.includes(search);
    const matchModule = activeMod.match(r);
    const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchFrom   = !fromDate || r.date >= fromDate;
    const matchTo     = !toDate   || r.date <= toDate;
    return matchSearch && matchModule && matchStatus && matchFrom && matchTo;
  });

  const handleExportPDF = () => {
    setIsPdfLoading(true);
    setTimeout(() => {
      try {
        generatePaymentPDF(filtered, {
          from:   fromDate,
          to:     toDate,
          module: isHi ? activeMod.labelHi    : activeMod.labelEn,
          status: isHi ? activeStatus.labelHi : activeStatus.labelEn,
        });
      } finally {
        setIsPdfLoading(false);
      }
    }, 50);
  };

  const fmt = (n) => `₹ ${n.toLocaleString('en-IN')}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <IndianRupee className="w-6 h-6 text-[#c28227]" />
            <span>{isHi ? 'संपूर्ण भुगतान इतिहास' : 'Complete Payment History'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi ? 'सभी माध्यमों के भुगतान — पूजा, कक्ष, प्रसाद एवं दान।' : 'Every payment across all modules — Pooja, Room, Prasad & Donations.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            disabled={isPdfLoading || isLoading || filtered.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 shadow-sm transition disabled:opacity-50"
          >
            {isPdfLoading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Download className="w-4 h-4" />}
            <span>{isHi ? 'PDF डाउनलोड' : 'Export PDF'}</span>
            {!isPdfLoading && filtered.length > 0 && (
              <span className="bg-white/20 rounded px-1.5 py-0.5 text-[10px] font-bold">{filtered.length}</span>
            )}
          </button>
          <button onClick={fetchPayments} disabled={isLoading} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-xs hover:brightness-110 shadow-sm transition disabled:opacity-60">
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isHi ? 'ताज़ा करें' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { labelEn: 'Total Collected', labelHi: 'कुल संग्रह',   value: stats.total,    color: 'text-[#c28227]',   bg: 'bg-amber-50'   },
          { labelEn: 'Pooja',          labelHi: 'पूजा',          value: stats.pooja,    color: 'text-amber-700',   bg: 'bg-amber-50'   },
          { labelEn: 'Room',           labelHi: 'कक्ष',          value: stats.room,     color: 'text-blue-700',    bg: 'bg-blue-50'    },
          { labelEn: 'Prasad',         labelHi: 'प्रसाद',        value: stats.prasad,   color: 'text-orange-700',  bg: 'bg-orange-50'  },
          { labelEn: 'Donations',      labelHi: 'दान',           value: stats.donation, color: 'text-emerald-700', bg: 'bg-emerald-50' },
        ].map(({ labelEn, labelHi, value, color, bg }) => (
          <div key={labelEn} className={`p-4 rounded-2xl bg-white border border-stone-200 shadow-xs`}>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">{isHi ? labelHi : labelEn}</p>
            <p className={`text-lg font-extrabold mt-1 ${color}`}>{fmt(value)}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isHi ? 'नाम, ईमेल या भुगतान ID से खोजें…' : 'Search by name, email or Payment ID…'}
            className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c28227] focus:bg-white"
          />
        </div>
        {/* Module + Status chips */}
        <div className="flex flex-wrap gap-2">
          {MODULE_FILTERS.map((f) => (
            <button key={f.id} onClick={() => setModuleFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${moduleFilter === f.id ? 'bg-[#c28227] text-white border-[#c28227]' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'}`}>
              {isHi ? f.labelHi : f.labelEn}
            </button>
          ))}
          <div className="w-px bg-stone-200 mx-1" />
          {STATUS_FILTERS.map((f) => (
            <button key={f.id} onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${statusFilter === f.id ? 'bg-stone-800 text-white border-stone-800' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'}`}>
              {isHi ? f.labelHi : f.labelEn}
            </button>
          ))}
        </div>
        {/* Date range */}
        <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-stone-100">
          <CalendarDays className="w-4 h-4 text-stone-400 shrink-0" />
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-stone-600">{isHi ? 'से' : 'From'}</label>
            <input
              type="date"
              value={fromDate}
              max={toDate || undefined}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c28227]"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-stone-600">{isHi ? 'तक' : 'To'}</label>
            <input
              type="date"
              value={toDate}
              min={fromDate || undefined}
              onChange={(e) => setToDate(e.target.value)}
              className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c28227]"
            />
          </div>
          {(fromDate || toDate) && (
            <button
              onClick={() => { setFromDate(''); setToDate(''); }}
              className="text-xs text-red-500 hover:text-red-700 font-bold underline transition"
            >
              {isHi ? 'साफ़ करें' : 'Clear'}
            </button>
          )}
        </div>

        <p className="text-[11px] text-stone-400 font-medium">
          {isHi ? `${filtered.length} भुगतान दिख रहे हैं (कुल ${stats.count})` : `Showing ${filtered.length} of ${stats.count} payments · ${stats.settled} settled`}
        </p>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">{isHi ? 'माध्यम' : 'Module'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'भुगतान आईडी' : 'Payment ID'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दाता / यजमान' : 'Payer'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'राशि' : 'Amount'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'स्थिति' : 'Status'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दिनांक' : 'Date'}</th>
                <th className="py-3 px-4 font-bold text-right">{isHi ? 'विवरण' : 'Details'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {isLoading ? (
                <tr><td colSpan={7} className="py-12 text-center text-stone-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#c28227]" />
                  <span className="block mt-2 font-medium text-xs">{isHi ? 'लोड हो रहा है…' : 'Loading payment history…'}</span>
                </td></tr>
              ) : error ? (
                <tr><td colSpan={7} className="py-10 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-red-700 font-medium text-xs"><AlertCircle className="w-5 h-5" /><span>{error}</span></div>
                    <button onClick={fetchPayments} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold text-xs hover:brightness-110 transition">
                      <RefreshCw className="w-4 h-4" />{isHi ? 'पुनः प्रयास' : 'Retry'}
                    </button>
                  </div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-10 text-center text-stone-400 font-medium text-xs">
                  {isHi ? 'कोई भुगतान नहीं मिला।' : 'No payments found.'}
                </td></tr>
              ) : filtered.map((r) => {
                const ModIcon = r.module.Icon;
                return (
                  <tr key={r._id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${r.module.badge}`}>
                        <ModIcon className="w-3 h-3" />
                        {isHi ? r.module.labelHi : r.module.labelEn}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#965f16] text-[11px]">{String(r.paymentId).slice(-14)}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{r.donorName}</div>
                      <div className="text-[10px] text-stone-400">{r.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-extrabold text-emerald-700 text-sm">₹ {r.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${STATUS_STYLE[r.status] || STATUS_STYLE.created}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-500 font-medium whitespace-nowrap">{formatDate(r.date)}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => setSelected(r)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold transition">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <selected.module.Icon className="w-5 h-5 text-[#c28227]" />
                <h3 className="text-base font-extrabold text-stone-900">
                  {isHi ? 'भुगतान विवरण' : 'Payment Detail'}
                </h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-stone-400 hover:text-stone-700 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
              <div className="text-center pb-3 border-b border-stone-200">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${selected.module.badge}`}>
                  <selected.module.Icon className="w-3.5 h-3.5" />
                  {isHi ? selected.module.labelHi : selected.module.labelEn}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  [isHi ? 'भुगतान आईडी' : 'Payment ID',   <span className="font-mono break-all text-[#965f16]">{selected.paymentId}</span>],
                  [isHi ? 'Razorpay Order'  : 'Order ID',    <span className="font-mono break-all text-stone-600 text-[10px]">{selected.orderId}</span>],
                  [isHi ? 'दिनांक'          : 'Date',         formatDate(selected.date)],
                  [isHi ? 'स्थिति'          : 'Status',       <span className={`capitalize px-2 py-0.5 rounded-full font-bold border ${STATUS_STYLE[selected.status] || STATUS_STYLE.created}`}>{selected.status}</span>],
                  [isHi ? 'नाम'             : 'Name',          selected.donorName],
                  [isHi ? 'फोन'             : 'Phone',         selected.phone],
                  [isHi ? 'ईमेल'            : 'Email',         <span className="break-all">{selected.email}</span>],
                  [isHi ? 'राशि'            : 'Amount',        <span className="text-base font-extrabold text-emerald-700">₹ {selected.amount.toLocaleString('en-IN')}</span>],
                  ...(selected.cause ? [[isHi ? 'उद्देश्य' : 'Purpose', selected.cause]] : []),
                  ...(selected.pan   ? [[isHi ? 'PAN' : 'PAN',           selected.pan]]   : []),
                  ...(selected.city  ? [[isHi ? 'शहर'  : 'City',         selected.city]]  : []),
                  ...(selected.state ? [[isHi ? 'राज्य': 'State',        selected.state]] : []),
                ].map(([label, value], i) => (
                  <div key={i}>
                    <span className="text-stone-400 font-medium block text-[10px]">{label}</span>
                    <span className="font-bold text-stone-900">{value}</span>
                  </div>
                ))}
              </div>

              {selected.status === 'successful' && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  <FileCheck className="w-3 h-3" /> {isHi ? 'भुगतान सत्यापित' : 'Payment Verified'}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex justify-end gap-2">
              <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold text-xs transition">
                {isHi ? 'बंद करें' : 'Close'}
              </button>
              <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold text-xs hover:brightness-110 shadow-sm transition">
                <Printer className="w-4 h-4" />
                <span>{isHi ? 'प्रिंट करें' : 'Print'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
