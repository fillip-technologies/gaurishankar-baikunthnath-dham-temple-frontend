import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HeartHandshake,
  Search,
  Filter,
  PlusCircle,
  Download,
  Eye,
  Printer,
  Sparkles,
  DollarSign,
  TrendingUp,
  FileCheck,
  Building,
  Utensils,
  Sun,
  ShieldAlert,
  Flame
} from 'lucide-react';

export default function DonationManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [searchTerm, setSearchTerm] = useState('');
  const [causeFilter, setCauseFilter] = useState('ALL');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [donations, setDonations] = useState([
    {
      id: 'DN-2026-8801',
      donorName: 'Smt. Gayatri Devi',
      phone: '+91 98234 56789',
      panNumber: 'ABCDE1234F',
      address: 'Varanasi, Uttar Pradesh',
      causeEn: 'Temple Construction Nidhi',
      causeHi: 'मंदिर निर्माण निधि',
      amount: 51000,
      paymentMode: 'Bank Transfer (NEFT)',
      transactionRef: 'NEFT992384110',
      date: '2026-08-18',
      taxExemption80G: true,
      receiptGenerated: true,
    },
    {
      id: 'DN-2026-8802',
      donorName: 'Vikram & Ananya Rathore',
      phone: '+91 94123 45678',
      panNumber: 'FGHIJ5678K',
      address: 'Jaipur, Rajasthan',
      causeEn: 'Nitya Anna Daan Seva',
      causeHi: 'नित्य अन्नदान सेवा',
      amount: 11000,
      paymentMode: 'UPI / QR Code',
      transactionRef: 'UPI883920199',
      date: '2026-08-18',
      taxExemption80G: true,
      receiptGenerated: true,
    },
    {
      id: 'DN-2026-8803',
      donorName: 'Manoj Kumar Gupta',
      phone: '+91 99345 67890',
      panNumber: 'KLMNO9012P',
      address: 'Patna, Bihar',
      causeEn: 'Gau Seva & Chara Fund',
      causeHi: 'गौ सेवा एवं चारा कोष',
      amount: 5100,
      paymentMode: 'UPI / Online',
      transactionRef: 'UPI772819033',
      date: '2026-08-18',
      taxExemption80G: false,
      receiptGenerated: true,
    },
    {
      id: 'DN-2026-8804',
      donorName: 'Devendra Singhal',
      phone: '+91 98765 12345',
      panNumber: 'PQRST3456U',
      address: 'Delhi NCR',
      causeEn: 'Temple Gold Kalash Fund',
      causeHi: 'स्वर्ण कलश समर्पण',
      amount: 101000,
      paymentMode: 'Cheque / DD',
      transactionRef: 'CHQ-882910',
      date: '2026-08-17',
      taxExemption80G: true,
      receiptGenerated: true,
    },
    {
      id: 'DN-2026-8805',
      donorName: 'Shri Ratanlal Poddar',
      phone: '+91 91234 56780',
      panNumber: 'UVWXY7890Z',
      address: 'Kolkata, WB',
      causeEn: 'Vidyarthi Seva & Veda Pathshala',
      causeHi: 'वेद पाठशाला एवं विद्यार्थी सेवा',
      amount: 25000,
      paymentMode: 'Bank Transfer (RTGS)',
      transactionRef: 'RTGS66271920',
      date: '2026-08-16',
      taxExemption80G: true,
      receiptGenerated: true,
    },
  ]);

  const [formData, setFormData] = useState({
    donorName: '',
    phone: '',
    panNumber: '',
    address: '',
    cause: 'Temple Construction Nidhi',
    amount: '',
    paymentMode: 'UPI / Online',
    transactionRef: '',
    taxExemption80G: true,
  });

  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.includes(searchTerm) ||
      d.panNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCause = causeFilter === 'ALL' || d.causeEn === causeFilter;
    return matchesSearch && matchesCause;
  });

  const totalCollected = donations.reduce((sum, item) => sum + item.amount, 0);

  const handleCreateDonation = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `DN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      donorName: formData.donorName,
      phone: formData.phone,
      panNumber: formData.panNumber.toUpperCase() || 'N/A',
      address: formData.address || 'India',
      causeEn: formData.cause,
      causeHi: formData.cause,
      amount: Number(formData.amount) || 1000,
      paymentMode: formData.paymentMode,
      transactionRef: formData.transactionRef || `REF-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
      taxExemption80G: formData.taxExemption80G,
      receiptGenerated: true,
    };

    setDonations([newEntry, ...donations]);
    setIsAddModalOpen(false);
    setFormData({
      donorName: '',
      phone: '',
      panNumber: '',
      address: '',
      cause: 'Temple Construction Nidhi',
      amount: '',
      paymentMode: 'UPI / Online',
      transactionRef: '',
      taxExemption80G: true,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <HeartHandshake className="w-6 h-6 text-emerald-600" />
            <span>{isHi ? 'दान एवं समर्पण प्रबंधन (80G रसीदें)' : 'Donations & Seva Fund Management'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi
              ? 'मंदिर निर्माण, अन्नदान, गौसेवा एवं धार्मिक परियोजनाओं हेतु प्राप्त दान का बहीखाता।'
              : 'Maintain transparent devotee donation ledgers, 80G tax receipts, and seva funds.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isHi ? 'नया दान दर्ज करें' : 'Record New Donation'}</span>
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
            ₹ {totalCollected.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-medium">
            {isHi ? '80G आयकर छूट प्रमाण पत्र सहित' : 'Includes 80G Tax Deductible Receipts'}
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
            ₹ 1,52,000
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
            ₹ 41,100
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-medium">
            {isHi ? 'प्रतिदिन 500+ भक्तों का प्रसाद' : 'Daily Prasad for 500+ devotees'}
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
            placeholder={isHi ? 'दाता नाम, पैन नंबर या रसीद खोजें...' : 'Search by donor, PAN or Receipt ID...'}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'ALL', labelEn: 'All Causes', labelHi: 'सभी सेवाएं' },
            { id: 'Temple Construction Nidhi', labelEn: 'Temple Nirman', labelHi: 'मंदिर निर्माण' },
            { id: 'Nitya Anna Daan Seva', labelEn: 'Anna Daan', labelHi: 'अन्नदान' },
            { id: 'Gau Seva & Chara Fund', labelEn: 'Gau Seva', labelHi: 'गौ सेवा' },
          ].map((c) => (
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
                <th className="py-3 px-4 font-bold">{isHi ? 'रसीद संख्या' : 'Receipt No.'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दाता का नाम' : 'Donor Name'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'सेवा / प्रयोजन' : 'Seva Cause'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'राशि (₹)' : 'Amount'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'भुगतान विधि' : 'Mode & Ref'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? 'दिनांक' : 'Date'}</th>
                <th className="py-3 px-4 font-bold">{isHi ? '80G आयकर' : '80G Tax'}</th>
                <th className="py-3 px-4 font-bold text-right">{isHi ? 'रसीद' : 'Receipt'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-stone-400 font-medium">
                    {isHi ? 'कोई दान प्रविष्टि नहीं मिली।' : 'No donation records found.'}
                  </td>
                </tr>
              ) : (
                filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#965f16]">{d.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{d.donorName}</div>
                      <div className="text-[10px] text-stone-500 font-medium">{d.address}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-800">{isHi ? d.causeHi : d.causeEn}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-emerald-700 text-sm">₹ {d.amount.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-stone-800 font-bold">{d.paymentMode}</div>
                      <div className="text-[10px] font-mono text-stone-400 font-medium">{d.transactionRef}</div>
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-medium whitespace-nowrap">{d.date}</td>
                    <td className="py-3 px-4">
                      {d.taxExemption80G ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                          <FileCheck className="w-3 h-3" />
                          80G
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-400">-</span>
                      )}
                    </td>
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

      {/* View Donation Receipt Modal (Light Theme) */}
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
                  {isHi ? 'श्री वैकुंठनाथ मंदिर न्यास' : 'Shri Baikunthnath Mandir Trust'}
                </div>
                <div className="text-[10px] text-stone-500 font-medium mt-0.5">
                  Regd. Charitable Trust • 80G Exemption No: AAATB1234F/2024
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-500 font-medium block">{isHi ? 'रसीद संख्या' : 'Receipt No.'}</span>
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
                  <span className="text-stone-500 font-medium block">{isHi ? 'पैन नंबर' : 'PAN Number'}</span>
                  <span className="font-mono font-semibold text-stone-800">{selectedDonation.panNumber}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">{isHi ? 'पता' : 'Address'}</span>
                  <span className="text-stone-700 font-medium">{selectedDonation.address}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">{isHi ? 'समर्पण राशि' : 'Donated Amount'}</span>
                  <span className="text-base font-extrabold text-emerald-700">₹ {selectedDonation.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-stone-600 font-bold block">{isHi ? 'दान प्रयोजन:' : 'Seva Purpose:'}</span>
                <span className="text-[#965f16] font-extrabold">{isHi ? selectedDonation.causeHi : selectedDonation.causeEn}</span>
                <div className="text-[10px] text-stone-500 mt-1 font-medium">
                  Payment Reference: {selectedDonation.paymentMode} ({selectedDonation.transactionRef})
                </div>
              </div>

              <div className="text-[10px] text-stone-600 italic text-center pt-2 font-medium">
                "भगवान श्री वैकुंठनाथ आपके परिवार को सुख, शांति और समृद्धि प्रदान करें।"
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

      {/* Record Donation Modal (Light Theme) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <span>{isHi ? 'नया दान / समर्पण प्रविष्टि' : 'Record New Seva Donation'}</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDonation} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'दाता का नाम' : 'Donor Name'} *</label>
                  <input
                    type="text"
                    required
                    value={formData.donorName}
                    onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
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
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'पैन नंबर (80G छूट हेतु)' : 'PAN No. (For 80G)'}</label>
                  <input
                    type="text"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                    placeholder="ABCDE1234F"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 uppercase focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'शहर / राज्य' : 'City / State'}</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Varanasi, UP"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'दान प्रयोजन' : 'Seva Cause'}</label>
                <select
                  value={formData.cause}
                  onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                >
                  <option value="Temple Construction Nidhi">Temple Construction Nidhi (मंदिर निर्माण निधि)</option>
                  <option value="Nitya Anna Daan Seva">Nitya Anna Daan Seva (नित्य अन्नदान)</option>
                  <option value="Gau Seva & Chara Fund">Gau Seva & Chara Fund (गौ सेवा एवं चारा कोष)</option>
                  <option value="Temple Gold Kalash Fund">Temple Gold Kalash Fund (स्वर्ण कलश कोष)</option>
                  <option value="Vidyarthi Seva & Veda Pathshala">Vidyarthi Seva & Veda Pathshala (वेद पाठशाला)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'समर्पण राशि (₹)' : 'Amount (₹)'} *</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="e.g. 5100"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">{isHi ? 'भुगतान विधि' : 'Payment Mode'}</label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="UPI / Online">UPI / QR Code</option>
                    <option value="Bank Transfer (NEFT/RTGS)">Bank Transfer (NEFT/RTGS)</option>
                    <option value="Cheque / DD">Cheque / DD</option>
                    <option value="Cash at Counter">Cash at Counter</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'ट्रांजेक्शन संदर्भ / चेक संख्या' : 'Transaction Ref / Cheque No.'}</label>
                <input
                  type="text"
                  value={formData.transactionRef}
                  onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
                  placeholder="e.g. UPI1298374 or CHQ-991"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
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
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-sm transition"
                >
                  {isHi ? 'रसीद जनरेट करें' : 'Generate Receipt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
