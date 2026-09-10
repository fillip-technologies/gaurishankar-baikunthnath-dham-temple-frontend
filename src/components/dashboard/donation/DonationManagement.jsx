import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HeartHandshake,
  Search,
  Eye,
  Printer,
  DollarSign,
  Building,
  Utensils,
  FileCheck,
  Flame,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { getAllPaymentsApi } from '../../clientApi/allApi';
import { formatDate } from '../../clientApi/format';

// Payment amounts are stored in paise; the ledger shows rupees.
const toRupees = (paise) => Math.round((Number(paise) || 0) / 100);

// Cause filter chips. `match` tests the (English) cause string saved in the
// payment's `notes.cause` so a partial label still groups correctly.
const CAUSE_FILTERS = [
  { id: 'ALL', labelEn: 'All Causes', labelHi: 'सभी सेवाएं', match: () => true },
  { id: 'construction', labelEn: 'Temple Nirman', labelHi: 'मंदिर निर्माण', match: (c) => /construction|nirman/i.test(c) },
  { id: 'anna', labelEn: 'Anna Daan', labelHi: 'अन्नदान', match: (c) => /anna/i.test(c) },
  { id: 'gau', labelEn: 'Gau Seva', labelHi: 'गौ सेवा', match: (c) => /gau/i.test(c) },
];

// Map a raw Payment document to the row shape this ledger renders. Every field is
// defaulted to a safe string/number — payer subfields and notes are optional on
// the schema, so a missing one must never blank the whole table.
const toDonation = (p) => ({
  id: p.razorpayPaymentId || p._id || '—',
  paymentDbId: p._id,
  donorName: p.payer?.name || 'Anonymous Devotee',
  phone: p.payer?.phone || '—',
  email: p.payer?.email || '—',
  cause: p.notes?.cause || 'General Donation',
  amount: toRupees(p.amount),
  status: p.status || 'created',
  transactionRef: p.razorpayPaymentId || '—',
  date: formatDate(p.createdAt),
});

const STATUS_STYLES = {
  successful: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  pending: 'bg-amber-100 text-amber-800 border-amber-300',
  created: 'bg-stone-100 text-stone-600 border-stone-300',
  failed: 'bg-red-100 text-red-700 border-red-300',
  refunded: 'bg-blue-100 text-blue-700 border-blue-300',
};

export default function DonationManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [causeFilter, setCauseFilter] = useState('ALL');
  const [selectedDonation, setSelectedDonation] = useState(null);

  const fetchDonations = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getAllPaymentsApi();
      const payments = Array.isArray(res?.data?.data) ? res.data.data : [];
      // Only donations belong in this ledger; other purposes (bookings) are
      // filed elsewhere.
      const mapped = payments
        .filter((p) => p.purpose === 'donation')
        .map(toDonation);
      setDonations(mapped);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        (isHi ? 'दान सूची लोड करने में त्रुटि हुई।' : 'Failed to load donations. Please try again.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [isHi]);

  useEffect(() => { fetchDonations(); }, [fetchDonations]);

  const activeFilter = CAUSE_FILTERS.find((c) => c.id === causeFilter) || CAUSE_FILTERS[0];

  const filteredDonations = donations.filter((d) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      d.donorName.toLowerCase().includes(term) ||
      d.id.toLowerCase().includes(term) ||
      d.phone.includes(searchTerm) ||
      d.email.toLowerCase().includes(term);
    return matchesSearch && activeFilter.match(d.cause);
  });

  // Money-received totals count settled donations only — a "created" record is an
  // abandoned checkout and must not inflate the ledger.
  const { totalCollected, constructionTotal, annaGauTotal } = useMemo(() => {
    const settled = donations.filter((d) => d.status === 'successful');
    return {
      totalCollected: settled.reduce((sum, d) => sum + d.amount, 0),
      constructionTotal: settled
        .filter((d) => /construction|nirman/i.test(d.cause))
        .reduce((sum, d) => sum + d.amount, 0),
      annaGauTotal: settled
        .filter((d) => /anna|gau/i.test(d.cause))
        .reduce((sum, d) => sum + d.amount, 0),
    };
  }, [donations]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <HeartHandshake className="w-6 h-6 text-emerald-600" />
            <span>{isHi ? 'दान एवं समर्पण प्रबंधन' : 'Donations & Seva Fund Management'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi
              ? 'ऑनलाइन प्राप्त दान का सजीव बहीखाता (Razorpay द्वारा सत्यापित)।'
              : 'Live ledger of online donations received via the temple website (Razorpay verified).'}
          </p>
        </div>

        <button
          onClick={fetchDonations}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 shadow-sm transition disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isHi ? 'ताज़ा करें' : 'Refresh'}</span>
        </button>
      </div>

      {/* Fund Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isHi ? 'कुल प्राप्त समर्पण' : 'Total Seva Funds'}
            </span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">
            ₹ {totalCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-medium">
            {isHi ? 'केवल सफल भुगतान गिने गए हैं' : 'Counts successful payments only'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isHi ? 'मंदिर निर्माण निधि' : 'Temple Construction'}
            </span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#965f16] mt-2">
            ₹ {constructionTotal.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-medium">
            {isHi ? 'शिखर एवं गर्भगृह विस्तार' : 'Garbhagriha & Shikhar Project'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isHi ? 'नित्य अन्नदान एवं गौसेवा' : 'Anna Daan & Gau Seva'}
            </span>
            <div className="p-2 rounded-xl bg-orange-100 text-orange-700">
              <Utensils className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-700 mt-2">
            ₹ {annaGauTotal.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-medium">
            {isHi ? 'प्रतिदिन भक्तों का प्रसाद एवं गौसेवा' : 'Daily Prasad & Gau Seva funds'}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isHi ? 'दाता नाम, ईमेल या भुगतान आईडी खोजें...' : 'Search by donor, email or Payment ID...'}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CAUSE_FILTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCauseFilter(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                causeFilter === c.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {isHi ? c.labelHi : c.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Donations Table */}
      <div className="rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">{isHi ? 'भुगतान आईडी' : 'Payment ID'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दाता का नाम' : 'Donor Name'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'सेवा / प्रयोजन' : 'Seva Cause'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'राशि (₹)' : 'Amount'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'स्थिति' : 'Status'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दिनांक' : 'Date'}</th>
                <th className="py-3 px-4 font-bold text-right">{isHi ? 'रसीद' : 'Receipt'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-stone-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-600" />
                    <span className="block mt-2 font-medium">{isHi ? 'दान लोड हो रहे हैं…' : 'Loading donations…'}</span>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2 text-red-700 font-medium">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                      </div>
                      <button
                        onClick={fetchDonations}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>{isHi ? 'पुनः प्रयास करें' : 'Retry'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-stone-400 font-medium">
                    {isHi ? 'कोई दान प्रविष्टि नहीं मिली।' : 'No donation records found.'}
                  </td>
                </tr>
              ) : (
                filteredDonations.map((d) => (
                  <tr key={d.paymentDbId || d.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#965f16]">{d.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{d.donorName}</div>
                      <div className="text-[10px] text-stone-500 font-medium">{d.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-800">{d.cause}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-emerald-700 text-sm">₹ {d.amount.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${STATUS_STYLES[d.status] || STATUS_STYLES.created}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-medium whitespace-nowrap">{d.date}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedDonation(d)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isHi ? 'देखें' : 'View'}</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Donation Receipt Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#c28227]" />
                <h3 className="text-base font-extrabold text-stone-900">
                  {isHi ? 'आधिकारिक दान रसीद' : 'Official Seva Donation Receipt'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDonation(null)}
                className="text-stone-400 hover:text-stone-700 font-bold transition text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-xs">
              <div className="text-center pb-3 border-b border-stone-200">
                <div className="text-base font-extrabold text-[#965f16]">
                  {isHi ? 'श्री गौरी शंकर बैकुंठ धाम न्यास' : 'Shri Gauri Shankar Baikunth Dham Trust'}
                </div>
                <div className="text-[10px] text-stone-500 font-medium mt-0.5">
                  Regd. Charitable Trust • 80G Exemption No: AAATB1234F/2024
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-500 font-medium block">{isHi ? 'भुगतान आईडी' : 'Payment ID'}</span>
                  <span className="font-mono font-bold text-[#965f16]">{selectedDonation.id}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">{isHi ? 'दिनांक' : 'Date'}</span>
                  <span className="font-bold text-stone-800">{selectedDonation.date}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">{isHi ? 'दाता का नाम' : 'Donor Name'}</span>
                  <span className="font-bold text-stone-900">{selectedDonation.donorName}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">{isHi ? 'फोन' : 'Phone'}</span>
                  <span className="font-semibold text-stone-800">{selectedDonation.phone}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">{isHi ? 'ईमेल' : 'Email'}</span>
                  <span className="text-stone-700 font-medium break-all">{selectedDonation.email}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">{isHi ? 'समर्पण राशि' : 'Donated Amount'}</span>
                  <span className="text-base font-extrabold text-emerald-700">₹ {selectedDonation.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-stone-600 font-bold block">{isHi ? 'दान प्रयोजन:' : 'Seva Purpose:'}</span>
                <span className="text-[#965f16] font-extrabold">{selectedDonation.cause}</span>
                <div className="text-[10px] text-stone-500 mt-1 font-medium">
                  Payment Status: <span className="capitalize font-bold">{selectedDonation.status}</span> · Razorpay
                </div>
              </div>

              {selectedDonation.status === 'successful' ? (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  <FileCheck className="w-3 h-3" />
                  {isHi ? '80G छूट योग्य' : '80G Tax Deductible'}
                </div>
              ) : (
                <div className="text-[10px] text-amber-700 font-bold">
                  {isHi ? 'यह भुगतान अभी सफल नहीं हुआ है।' : 'This payment is not yet settled.'}
                </div>
              )}

              <div className="text-[10px] text-stone-600 italic text-center pt-2 font-medium">
                "भगवान श्री गौरी शंकर आपके परिवार को सुख, शांति और समृद्धि प्रदान करें।"
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedDonation(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold transition"
              >
                {isHi ? 'बंद करें' : 'Close'}
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold hover:brightness-110 shadow-sm transition"
              >
                <Printer className="w-4 h-4" />
                <span>{isHi ? 'रसीद प्रिंट करें' : 'Print Receipt'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
