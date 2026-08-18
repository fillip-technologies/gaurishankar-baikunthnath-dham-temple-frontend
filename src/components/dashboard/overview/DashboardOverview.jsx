import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CalendarCheck,
  HeartHandshake,
  Users,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Download,
  Flame,
  Radio,
  FileText,
  CreditCard,
  Calendar,
  Layers
} from 'lucide-react';

export default function DashboardOverview({ setActiveTab }) {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const stats = [
    {
      id: 'bookings',
      titleEn: 'Total Pooja Bookings',
      titleHi: 'कुल पूजा बुकिंग',
      value: '248',
      growth: '+18.4%',
      growthTextEn: 'vs last month',
      growthTextHi: 'पिछले माह से',
      icon: CalendarCheck,
      color: 'text-amber-600 bg-amber-50 border border-amber-100',
      tab: 'pooja-booking',
    },
    {
      id: 'donations',
      titleEn: 'Donations & Seva Fund',
      titleHi: 'प्राप्त सेवा दान',
      value: '₹ 4,82,500',
      growth: '+24.1%',
      growthTextEn: 'vs last month',
      growthTextHi: 'पिछले माह से',
      icon: HeartHandshake,
      color: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
      tab: 'donation',
    },
    {
      id: 'darshan',
      titleEn: 'Today Darshan Devotees',
      titleHi: 'आज दर्शनार्थी संख्या',
      value: '3,450',
      growth: '+12.0%',
      growthTextEn: 'peak at 07:00 PM',
      growthTextHi: 'उच्चतम 07:00 PM',
      icon: Eye,
      color: 'text-blue-600 bg-blue-50 border border-blue-100',
      tab: 'overview',
    },
    {
      id: 'priests',
      titleEn: 'Active Priests & Staff',
      titleHi: 'सक्रिय पुजारी एवं सेवक',
      value: '18',
      growth: '100%',
      growthTextEn: 'on duty today',
      growthTextHi: 'आज उपस्थित',
      icon: Users,
      color: 'text-orange-600 bg-orange-50 border border-orange-100',
      tab: 'users',
    },
  ];

  const todayPoojas = [
    {
      id: 'PB-9021',
      poojaEn: 'Maha Rudrabhishek',
      poojaHi: 'महारुद्राभिषेक',
      devotee: 'Rajesh & Sunita Sharma',
      time: '07:30 AM',
      priest: 'Pt. Ramachandra Shastri',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      amount: '₹ 2,100',
    },
    {
      id: 'PB-9022',
      poojaEn: 'Satyanarayan Vrat Katha',
      poojaHi: 'सत्यनारायण व्रत कथा',
      devotee: 'Amitabh Verma',
      time: '10:30 AM',
      priest: 'Pt. Vidyadhar Joshi',
      status: 'Ongoing',
      statusColor: 'bg-amber-50 text-amber-700 border border-amber-200',
      amount: '₹ 1,500',
    },
    {
      id: 'PB-9023',
      poojaEn: 'Navagraha Shanti Pooja',
      poojaHi: 'नवग्रह शांति पूजा',
      devotee: 'Kavita Singhania',
      time: '04:00 PM',
      priest: 'Pt. Harishanker Mishra',
      status: 'Confirmed',
      statusColor: 'bg-blue-50 text-blue-700 border border-blue-200',
      amount: '₹ 3,500',
    },
    {
      id: 'PB-9024',
      poojaEn: 'Special Sandhya Aarti Seva',
      poojaHi: 'विशेष संध्या आरती सेवा',
      devotee: 'Devendra Patel',
      time: '06:30 PM',
      priest: 'Head Priest Team',
      status: 'Confirmed',
      statusColor: 'bg-blue-50 text-blue-700 border border-blue-200',
      amount: '₹ 5,100',
    },
  ];

  const recentDonations = [
    {
      id: 'DN-4401',
      donor: 'Smt. Gayatri Devi',
      causeEn: 'Temple Construction Nidhi',
      causeHi: 'मंदिर निर्माण निधि',
      amount: '₹ 51,000',
      mode: 'Bank Transfer (NEFT)',
      date: 'Today, 11:20 AM',
    },
    {
      id: 'DN-4402',
      donor: 'Vikram & Ananya Rathore',
      causeEn: 'Nitya Anna Daan Seva',
      causeHi: 'नित्य अन्नदान सेवा',
      amount: '₹ 11,000',
      mode: 'UPI / QR Code',
      date: 'Today, 09:45 AM',
    },
    {
      id: 'DN-4403',
      donor: 'Manoj Kumar Gupta',
      causeEn: 'Gau Seva & Chara Fund',
      causeHi: 'गौ सेवा एवं चारा कोष',
      amount: '₹ 5,100',
      mode: 'UPI / Online',
      date: 'Today, 08:15 AM',
    },
    {
      id: 'DN-4404',
      donor: 'Anonymous Devotee',
      causeEn: 'Daily Sandhya Deep Daan',
      causeHi: 'दैनिक संध्या दीपदान',
      amount: '₹ 2,500',
      mode: 'Cash Receipt',
      date: 'Yesterday, 06:50 PM',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.tab)}
              className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition duration-150 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    {isHi ? item.titleHi : item.titleEn}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
                    {item.value}
                  </h3>
                </div>
                <div className={`p-2.5 rounded-xl ${item.color} shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3" />
                  {item.growth}
                </span>
                <span className="text-slate-400 text-[11px] truncate">{isHi ? item.growthTextHi : item.growthTextEn}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Today's Poojas & Aarti Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Pooja Schedule Table (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isHi ? 'आज की मुख्य पूजा अनुसूची' : "Today's Scheduled Rituals & Poojas"}
                  </h3>
                  <p className="text-[11px] text-slate-500">{isHi ? 'दैनिक संकल्प पूजाएं' : 'Devotee sankalp poojas'}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('pooja-booking')}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition"
              >
                <span>{isHi ? 'सभी देखें' : 'View All'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-500 bg-slate-50 border-b border-slate-100 text-[11px]">
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'समय' : 'Time'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'पूजा नाम' : 'Pooja Name'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'यजमान' : 'Devotee'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'आचार्य' : 'Priest'}</th>
                    <th className="py-2.5 px-3 font-semibold text-right">{isHi ? 'स्थिति' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {todayPoojas.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {p.time}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {isHi ? p.poojaHi : p.poojaEn}
                        <div className="text-[10px] font-normal text-slate-400">{p.id}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{p.devotee}</td>
                      <td className="py-3 px-3 text-slate-500">{p.priest}</td>
                      <td className="py-3 px-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${p.statusColor}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{isHi ? '4 अनुष्ठान आज हेतु निर्धारित' : '4 scheduled poojas for today'}</span>
            <span className="text-amber-700 font-bold">{isHi ? 'कुल संकल्प राशि: ₹ 12,200' : 'Total Sankalp: ₹ 12,200'}</span>
          </div>
        </div>

        {/* Sanctum Aarti Schedule */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
              <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600 border border-orange-200/60">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isHi ? 'दैनिक आरती समय सारिणी' : 'Sanctum Aarti Schedule'}
                </h3>
                <p className="text-[11px] text-slate-500">{isHi ? 'नित्य आरती समय' : 'Daily Mandir Timings'}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{isHi ? 'मंगला आरती' : 'Mangala Aarti'}</div>
                    <div className="text-[10px] text-slate-400">05:30 AM - 06:00 AM</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                  {isHi ? 'सम्पन्न' : 'Done'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{isHi ? 'भोग आरती' : 'Bhog Aarti'}</div>
                    <div className="text-[10px] text-slate-400">12:00 PM - 12:30 PM</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                  {isHi ? 'सम्पन्न' : 'Done'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <div>
                    <div className="text-xs font-bold text-amber-900">{isHi ? 'संध्या आरती' : 'Sandhya Aarti'}</div>
                    <div className="text-[10px] text-amber-700">06:30 PM - 07:15 PM</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold shadow-xs">
                  {isHi ? 'अगली आरती' : 'Up Next'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{isHi ? 'शयन आरती' : 'Shayan Aarti'}</div>
                    <div className="text-[10px] text-slate-400">09:00 PM - 09:30 PM</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                  {isHi ? 'प्रतीक्षित' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('config')}
              className="w-full py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition text-center"
            >
              {isHi ? 'आरती समय सम्पादित करें' : 'Edit Mandir Timings'}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Donations Ledger */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isHi ? 'हाल के सेवा दान एवं समर्पण' : 'Recent Seva Contributions & Donations'}
              </h3>
              <p className="text-[11px] text-slate-500">{isHi ? 'अद्यतन प्राप्त दान रसीदें' : 'Latest transaction ledger'}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('donation')}
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition"
          >
            <span>{isHi ? 'विस्तृत दान सूची' : 'Full Ledger'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {recentDonations.map((dn) => (
            <div
              key={dn.id}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:bg-white transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-slate-400">{dn.id}</span>
                  <span className="text-xs font-bold text-emerald-700">{dn.amount}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 mt-1.5 truncate">{dn.donor}</h4>
                <p className="text-[11px] text-amber-700 mt-0.5 font-medium">{isHi ? dn.causeHi : dn.causeEn}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>{dn.mode}</span>
                <span>{dn.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
