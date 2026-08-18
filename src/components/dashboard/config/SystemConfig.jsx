import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sliders,
  Clock,
  Radio,
  Building,
  CreditCard,
  Bell,
  Save,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Globe
} from 'lucide-react';

export default function SystemConfig() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [activeTab, setActiveTab] = useState('TIMINGS');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mandir Timings Configuration
  const [timings, setTimings] = useState({
    openingTime: '05:00 AM',
    closingTime: '09:30 PM',
    mangalaAarti: '05:30 AM - 06:00 AM',
    bhogAarti: '12:00 PM - 12:30 PM',
    sandhyaAarti: '06:30 PM - 07:15 PM',
    shayanAarti: '09:00 PM - 09:30 PM',
    afternoonPattClose: '01:00 PM - 04:00 PM',
  });

  // Live Stream Configuration
  const [liveStream, setLiveStream] = useState({
    isEnabled: true,
    platform: 'YouTube Live',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UC_baikunthnath',
    rtmpKey: 'live_bknt_sec_991823',
    backupStreamUrl: 'https://stream.baikunthnath.org/hls/live.m3u8',
  });

  // Trust & General Info Configuration
  const [generalInfo, setGeneralInfo] = useState({
    mandirNameEn: 'Shri Baikunthnath Mandir',
    mandirNameHi: 'श्री वैकुंठनाथ मंदिर',
    trustRegNo: 'TRUST/2020/BKNT/8812',
    tax80GNo: 'AAATB1234F/2024-25',
    contactEmail: 'contact@baikunthnath.org',
    helplinePhone: '+91 542 2233445',
    address: 'Baikunth Dham, Near Holy Ghats, Varanasi, Uttar Pradesh 221001',
    upiVpa: 'baikunthnath@sbi',
    bankAccount: '10293847560192',
    bankIfsc: 'SBIN0001234',
    bankBranch: 'Main Temple Ghat Branch',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-[#c28227]" />
            <span>{isHi ? 'मंदिर विन्यास एवं प्रणाली सेटिंग्स' : 'Mandir Operations & System Settings'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi
              ? 'दैनिक आरती समय, लाइव दर्शन प्रसारण लिंक, बैंक खाता एवं 80G विवरण व्यवस्थित करें।'
              : 'Configure sanctum darshan hours, YouTube live stream, 80G tax data, and temple accounts.'}
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isHi ? 'सेटिंग्स सफलतापूर्वक सहेजी गईं!' : 'Settings saved successfully!'}</span>
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-stone-200 shadow-xs">
        {[
          { id: 'TIMINGS', icon: Clock, labelEn: 'Aarti & Darshan Hours', labelHi: 'आरती एवं दर्शन समय' },
          { id: 'LIVESTREAM', icon: Radio, labelEn: 'Live Streaming Feed', labelHi: 'लाइव दर्शन प्रसारण' },
          { id: 'TRUST_BANK', icon: CreditCard, labelEn: '80G & Bank Accounts', labelHi: '80G एवं बैंक विवरण' },
          { id: 'MANDIR_INFO', icon: Building, labelEn: 'Temple Contact Info', labelHi: 'मंदिर संपर्क सूचना' },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-[#c28227] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{isHi ? tab.labelHi : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Content Area */}
      <form onSubmit={handleSave} className="rounded-2xl bg-white border border-stone-200 shadow-xs p-6 space-y-6">
        {/* Tab 1: Aarti & Timings */}
        {activeTab === 'TIMINGS' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-stone-900 pb-2 border-b border-stone-100">
              {isHi ? 'मंदिर कपाट एवं नित्य आरती समय सारिणी' : 'Daily Sanctum & Aarti Timings'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'प्रातः मंदिर कपाट उद्घाटन' : 'Temple Opening Time'}</label>
                <input
                  type="text"
                  value={timings.openingTime}
                  onChange={(e) => setTimings({ ...timings, openingTime: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'रात्रि कपाट शयन समय' : 'Temple Closing Time'}</label>
                <input
                  type="text"
                  value={timings.closingTime}
                  onChange={(e) => setTimings({ ...timings, closingTime: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'मंगला आरती समय' : 'Mangala Aarti Time'}</label>
                <input
                  type="text"
                  value={timings.mangalaAarti}
                  onChange={(e) => setTimings({ ...timings, mangalaAarti: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'भोग आरती समय' : 'Bhog Aarti Time'}</label>
                <input
                  type="text"
                  value={timings.bhogAarti}
                  onChange={(e) => setTimings({ ...timings, bhogAarti: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'संध्या महाआरती समय' : 'Sandhya Maha Aarti Time'}</label>
                <input
                  type="text"
                  value={timings.sandhyaAarti}
                  onChange={(e) => setTimings({ ...timings, sandhyaAarti: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'शयन आरती समय' : 'Shayan Aarti Time'}</label>
                <input
                  type="text"
                  value={timings.shayanAarti}
                  onChange={(e) => setTimings({ ...timings, shayanAarti: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Live Stream */}
        {activeTab === 'LIVESTREAM' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-stone-900 pb-2 border-b border-stone-100">
              {isHi ? 'लाइव दर्शन प्रसारण एवं कैमरा सेटिंग्स' : 'Sanctum Live Streaming Configuration'}
            </h3>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <input
                type="checkbox"
                id="enableLive"
                checked={liveStream.isEnabled}
                onChange={(e) => setLiveStream({ ...liveStream, isEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-[#c28227] focus:ring-[#c28227]"
              />
              <label htmlFor="enableLive" className="text-stone-900 font-bold cursor-pointer">
                {isHi ? 'सार्वजनिक वेबसाइट पर लाइव दर्शन सक्रिय रखें' : 'Enable Public Live Darshan Stream'}
              </label>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">{isHi ? 'यूट्यूब एम्बेड यूआरएल' : 'YouTube Live Embed URL'}</label>
              <input
                type="text"
                value={liveStream.streamUrl}
                onChange={(e) => setLiveStream({ ...liveStream, streamUrl: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">{isHi ? 'बैकअप HLS / M3U8 स्ट्रीम यूआरएल' : 'Backup HLS Stream URL'}</label>
              <input
                type="text"
                value={liveStream.backupStreamUrl}
                onChange={(e) => setLiveStream({ ...liveStream, backupStreamUrl: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* Tab 3: 80G & Bank Accounts */}
        {activeTab === 'TRUST_BANK' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-stone-900 pb-2 border-b border-stone-100">
              {isHi ? '80G आयकर छूट एवं आधिकारिक बैंक खाता' : '80G Exemption & Official Bank Ledger'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? '80G छूट प्रमाण पत्र संख्या' : '80G Registration Number'}</label>
                <input
                  type="text"
                  value={generalInfo.tax80GNo}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, tax80GNo: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'न्यास पंजीकरण संख्या' : 'Trust Reg. Number'}</label>
                <input
                  type="text"
                  value={generalInfo.trustRegNo}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, trustRegNo: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'आधिकारिक यूपीआई आईडी' : 'Temple UPI VPA'}</label>
                <input
                  type="text"
                  value={generalInfo.upiVpa}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, upiVpa: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'बैंक खाता संख्या' : 'Bank Account Number'}</label>
                <input
                  type="text"
                  value={generalInfo.bankAccount}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, bankAccount: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'बैंक आईएफएससी कोड' : 'IFSC Code'}</label>
                <input
                  type="text"
                  value={generalInfo.bankIfsc}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, bankIfsc: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'शाखा का नाम' : 'Bank Branch'}</label>
                <input
                  type="text"
                  value={generalInfo.bankBranch}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, bankBranch: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Mandir Info */}
        {activeTab === 'MANDIR_INFO' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-stone-900 pb-2 border-b border-stone-100">
              {isHi ? 'मंदिर आधिकारिक संपर्क एवं पता विवरण' : 'Temple Official Contact Details'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'मंदिर का नाम (English)' : 'Temple Name (EN)'}</label>
                <input
                  type="text"
                  value={generalInfo.mandirNameEn}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, mandirNameEn: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'मंदिर का नाम (हिंदी)' : 'Temple Name (HI)'}</label>
                <input
                  type="text"
                  value={generalInfo.mandirNameHi}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, mandirNameHi: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'हेल्पलाइन फोन नंबर' : 'Helpline Phone'}</label>
                <input
                  type="tel"
                  value={generalInfo.helplinePhone}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, helplinePhone: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'आधिकारिक ईमेल' : 'Official Contact Email'}</label>
                <input
                  type="email"
                  value={generalInfo.contactEmail}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">{isHi ? 'मंदिर का पूरा पता' : 'Full Temple Address'}</label>
              <textarea
                rows={2}
                value={generalInfo.address}
                onChange={(e) => setGeneralInfo({ ...generalInfo, address: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* Save Button Bar */}
        <div className="pt-4 border-t border-stone-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-xs sm:text-sm hover:brightness-110 shadow-sm transition"
          >
            <Save className="w-4 h-4" />
            <span>{isHi ? 'परिवर्तन सहेजें' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
