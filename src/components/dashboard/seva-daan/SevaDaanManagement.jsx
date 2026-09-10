import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Flame, Search, Eye, Printer, Utensils, Sun, BookOpen,
  Loader2, AlertCircle, RefreshCw, FileCheck, IndianRupee,
} from 'lucide-react';
import { getAllPaymentsApi } from '../../clientApi/allApi';

const toRupees = (paise) => Math.round((Number(paise) || 0) / 100);

// Seva causes that belong to the Seva Daan module (excludes Temple Construction).
const SEVA_FILTERS = [
  { id: 'ALL',           labelEn: 'All Seva',              labelHi: 'सभी सेवाएं',            match: () => true,                              Icon: Flame },
  { id: 'anna',          labelEn: 'Anna Daan',             labelHi: 'अन्नदान सेवा',           match: (c) => /anna/i.test(c),                  Icon: Utensils },
  { id: 'gau',           labelEn: 'Gau Seva',              labelHi: 'गौ सेवा',                match: (c) => /gau/i.test(c),                   Icon: Sun },
  { id: 'veda',          labelEn: 'Veda Pathshala',        labelHi: 'वेद पाठशाला',           match: (c) => /veda|pathshala|vidyarthi/i.test(c), Icon: BookOpen },
  { id: 'general',       labelEn: 'General / Other',       labelHi: 'सामान्य दान',            match: (c) => !/construction|nirman|anna|gau|veda|pathshala|vidyarthi/i.test(c), Icon: Flame },
];

// Only seva-type causes — excludes construction/nirman.
const isSevaPayment = (p) =>
  p.purpose === 'donation' && !/construction|nirman/i.test(p.notes?.cause || '');

const toRow = (p) => ({
  id: p.razorpayPaymentId || p._id || '—',
  paymentDbId: p._id,
  donorName: p.payer?.name || 'Anonymous Devotee',
  phone: p.payer?.phone || '—',
  email: p.payer?.email || '—',
  cause: p.notes?.cause || 'General Donation',
  amount: toRupees(p.amount),
  status: p.status || 'created',
  date: p.createdAt ? new Date(p.createdAt).toISOString().split('T')[0] : '—',
  pan: p.notes?.pan || '',
  state: p.notes?.state || '',
  city: p.notes?.city || '',
});

const STATUS_STYLES = {
  successful: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  pending:    'bg-amber-100 text-amber-800 border-amber-300',
  created:    'bg-stone-100 text-stone-600 border-stone-300',
  failed:     'bg-red-100 text-red-700 border-red-300',
  refunded:   'bg-blue-100 text-blue-700 border-blue-300',
};

export default function SevaDaanManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [sevaList, setSevaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selected, setSelected] = useState(null);

  const fetchSeva = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getAllPaymentsApi();
      const all = Array.isArray(res?.data?.data) ? res.data.data : [];
      setSevaList(all.filter(isSevaPayment).map(toRow));
    } catch (err) {
      setError(err?.response?.data?.message || (isHi ? 'सेवा दान सूची लोड करने में त्रुटि।' : 'Failed to load seva donations. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  }, [isHi]);

  useEffect(() => { fetchSeva(); }, [fetchSeva]);

  const currentFilter = SEVA_FILTERS.find((f) => f.id === activeFilter) || SEVA_FILTERS[0];

  const filtered = sevaList.filter((d) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      d.donorName.toLowerCase().includes(term) ||
      d.id.toLowerCase().includes(term) ||
      d.phone.includes(searchTerm) ||
      d.email.toLowerCase().includes(term);
    return matchSearch && currentFilter.match(d.cause);
  });

  const stats = useMemo(() => {
    const settled = sevaList.filter((d) => d.status === 'successful');
    return {
      total:      settled.reduce((s, d) => s + d.amount, 0),
      annaDaan:   settled.filter((d) => /anna/i.test(d.cause)).reduce((s, d) => s + d.amount, 0),
      gauSeva:    settled.filter((d) => /gau/i.test(d.cause)).reduce((s, d) => s + d.amount, 0),
      veda:       settled.filter((d) => /veda|pathshala|vidyarthi/i.test(d.cause)).reduce((s, d) => s + d.amount, 0),
    };
  }, [sevaList]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-orange-500" />
            <span>{isHi ? 'सेवा दान प्रबंधन' : 'Seva Daan Management'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi
              ? 'अन्नदान, गौसेवा एवं वेद पाठशाला के लिए प्राप्त सेवा दान का लाइव बहीखाता।'
              : 'Live ledger of seva donations — Anna Daan, Gau Seva & Veda Pathshala.'}
          </p>
        </div>
        <button
          onClick={fetchSeva}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs sm:text-sm hover:bg-orange-600 shadow-sm transition disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isHi ? 'ताज़ा करें' : 'Refresh'}</span>
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: isHi ? 'कुल सेवा निधि' : 'Total Seva Funds',     value: stats.total,    color: 'text-orange-700',  bg: 'bg-orange-100', Icon: Flame    },
          { label: isHi ? 'नित्य अन्नदान'  : 'Anna Daan',           value: stats.annaDaan, color: 'text-amber-700',   bg: 'bg-amber-100',  Icon: Utensils },
          { label: isHi ? 'गौ सेवा'        : 'Gau Seva',            value: stats.gauSeva,  color: 'text-green-700',   bg: 'bg-green-100',  Icon: Sun      },
          { label: isHi ? 'वेद पाठशाला'   : 'Veda Pathshala',      value: stats.veda,     color: 'text-blue-700',    bg: 'bg-blue-100',   Icon: BookOpen },
        ].map(({ label, value, color, bg, Icon }) => (
          <div key={label} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider leading-tight">{label}</span>
              <div className={`p-1.5 rounded-lg ${bg}`}><Icon className={`w-4 h-4 ${color}`} /></div>
            </div>
            <div className={`text-xl sm:text-2xl font-extrabold ${color}`}>
              ₹ {value.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Filter + Search */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isHi ? 'दाता नाम, ईमेल या भुगतान ID...' : 'Search by donor, email or Payment ID...'}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {SEVA_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFilter === f.id
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {isHi ? f.labelHi : f.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">{isHi ? 'भुगतान आईडी' : 'Payment ID'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दाता' : 'Donor'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'सेवा प्रयोजन' : 'Seva Cause'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'राशि' : 'Amount'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'स्थिति' : 'Status'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दिनांक' : 'Date'}</th>
                <th className="py-3 px-4 font-bold text-right">{isHi ? 'रसीद' : 'Receipt'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {isLoading ? (
                <tr><td colSpan={7} className="py-10 text-center text-stone-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500" />
                  <span className="block mt-2 font-medium">{isHi ? 'सेवा दान लोड हो रहे हैं…' : 'Loading seva donations…'}</span>
                </td></tr>
              ) : error ? (
                <tr><td colSpan={7} className="py-10 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-red-700 font-medium"><AlertCircle className="w-5 h-5" /><span>{error}</span></div>
                    <button onClick={fetchSeva} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition">
                      <RefreshCw className="w-4 h-4" /><span>{isHi ? 'पुनः प्रयास करें' : 'Retry'}</span>
                    </button>
                  </div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-stone-400 font-medium">
                  {isHi ? 'कोई सेवा दान प्रविष्टि नहीं मिली।' : 'No seva donation records found.'}
                </td></tr>
              ) : filtered.map((d) => (
                <tr key={d.paymentDbId || d.id} className="hover:bg-stone-50/80 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#965f16] text-[11px]">{d.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900">{d.donorName}</div>
                    <div className="text-[10px] text-stone-500">{d.phone}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-stone-800">{d.cause}</td>
                  <td className="py-3 px-4 font-extrabold text-orange-700 text-sm">₹ {d.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${STATUS_STYLES[d.status] || STATUS_STYLES.created}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-600 font-medium whitespace-nowrap">{d.date}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelected(d)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isHi ? 'देखें' : 'View'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <h3 className="text-base font-extrabold text-stone-900">
                  {isHi ? 'सेवा दान रसीद' : 'Seva Daan Receipt'}
                </h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-stone-400 hover:text-stone-700 font-bold transition text-lg">✕</button>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-xs">
              <div className="text-center pb-3 border-b border-stone-200">
                <div className="text-base font-extrabold text-[#965f16]">
                  {isHi ? 'श्री गौरी शंकर बैकुंठ धाम न्यास' : 'Shri Gauri Shankar Baikunth Dham Trust'}
                </div>
                <div className="text-[10px] text-stone-500 font-medium mt-0.5">Regd. Charitable Trust · 80G Exemption</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  [isHi ? 'भुगतान आईडी' : 'Payment ID',  <span className="font-mono font-bold text-[#965f16]">{selected.id}</span>],
                  [isHi ? 'दिनांक'       : 'Date',        selected.date],
                  [isHi ? 'दाता का नाम'  : 'Donor Name',  selected.donorName],
                  [isHi ? 'फोन'          : 'Phone',        selected.phone],
                  [isHi ? 'ईमेल'         : 'Email',        <span className="break-all">{selected.email}</span>],
                  [isHi ? 'समर्पण राशि'  : 'Amount',      <span className="text-base font-extrabold text-orange-700">₹ {selected.amount.toLocaleString('en-IN')}</span>],
                  ...(selected.pan   ? [[isHi ? 'PAN नंबर' : 'PAN',   selected.pan]]   : []),
                  ...(selected.city  ? [[isHi ? 'शहर'      : 'City',  selected.city]]  : []),
                  ...(selected.state ? [[isHi ? 'राज्य'    : 'State', selected.state]] : []),
                ].map(([label, value], i) => (
                  <div key={i}>
                    <span className="text-stone-500 font-medium block">{label}</span>
                    <span className="font-bold text-stone-900">{value}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200">
                <span className="text-stone-600 font-bold block">{isHi ? 'सेवा प्रयोजन:' : 'Seva Purpose:'}</span>
                <span className="text-orange-700 font-extrabold">{selected.cause}</span>
                <div className="text-[10px] text-stone-500 mt-1 font-medium">
                  {isHi ? 'स्थिति:' : 'Status:'} <span className="capitalize font-bold">{selected.status}</span> · Razorpay
                </div>
              </div>

              {selected.status === 'successful' && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  <FileCheck className="w-3 h-3" />
                  {isHi ? '80G छूट योग्य' : '80G Tax Deductible'}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex justify-end gap-2 text-xs">
              <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold transition">
                {isHi ? 'बंद करें' : 'Close'}
              </button>
              <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 shadow-sm transition">
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
