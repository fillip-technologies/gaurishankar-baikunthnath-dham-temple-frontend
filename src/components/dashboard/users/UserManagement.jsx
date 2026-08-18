import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  Search,
  Filter,
  PlusCircle,
  Shield,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  UserCheck,
  Award,
  Flame
} from 'lucide-react';

export default function UserManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 'USR-101',
      name: 'Pt. Ramachandra Shastri',
      role: 'Head Priest',
      roleHi: 'प्रधान पुजारी',
      email: 'ramachandra.shastri@baikunthnath.org',
      phone: '+91 98321 00101',
      duties: 'Garbhagriha Nitya Pooja, Maha Rudrabhishek',
      status: 'Active',
      joinedDate: '2018-05-12',
    },
    {
      id: 'USR-102',
      name: 'Pt. Vidyadhar Joshi',
      role: 'Senior Acharya',
      roleHi: 'वरिष्ठ आचार्य',
      email: 'vidyadhar.j@baikunthnath.org',
      phone: '+91 98321 00102',
      duties: 'Vedic Havan, Satyanarayan Vrat Katha',
      status: 'Active',
      joinedDate: '2020-02-15',
    },
    {
      id: 'USR-103',
      name: 'Shri Ramakant Tripathi',
      role: 'Trustee',
      roleHi: 'न्यास सदस्य',
      email: 'ramakant.trust@baikunthnath.org',
      phone: '+91 98100 44556',
      duties: 'Trust Committee & Finance Oversight',
      status: 'Active',
      joinedDate: '2015-01-10',
    },
    {
      id: 'USR-104',
      name: 'Manish Pandey',
      role: 'Volunteer Lead',
      roleHi: 'सेवादार प्रमुख',
      email: 'manish.p@baikunthnath.org',
      phone: '+91 97711 22334',
      duties: 'Crowd & Queue Management, Anna Daan Distribution',
      status: 'Active',
      joinedDate: '2022-09-01',
    },
    {
      id: 'USR-105',
      name: 'Dr. Sunita Agrawal',
      role: 'Super Admin',
      roleHi: 'मुख्य प्रशासक',
      email: 'admin@baikunthnath.org',
      phone: '+91 98888 11223',
      duties: 'System Security, Online Portals, Audit',
      status: 'Active',
      joinedDate: '2021-06-20',
    },
    {
      id: 'USR-106',
      name: 'Pt. Harishanker Mishra',
      role: 'Priest',
      roleHi: 'पुजारी',
      email: 'harishanker.m@baikunthnath.org',
      phone: '+91 98321 00106',
      duties: 'Navagraha Pooja & Sandhya Aarti',
      status: 'Active',
      joinedDate: '2023-01-18',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Priest',
    email: '',
    phone: '',
    duties: '',
  });

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || u.role.toUpperCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
      )
    );
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      role: formData.role,
      roleHi: formData.role,
      email: formData.email,
      phone: formData.phone,
      duties: formData.duties || 'General Temple Seva',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setUsers([newEntry, ...users]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      role: 'Priest',
      email: '',
      phone: '',
      duties: '',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#c28227]" />
            <span>{isHi ? 'पुजारी, न्यास सदस्य एवं सेवक प्रबंधन' : 'Priests, Trustees & Staff Directory'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
            {isHi
              ? 'मंदिर के आचार्यों, न्यासियों, सेवादारों एवं प्रशासकों का विवरण एवं अधिकार प्रबंधन।'
              : 'Manage role assignments, contact details, daily duties, and portal access.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c28227] text-white font-bold text-xs sm:text-sm hover:brightness-110 shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isHi ? 'नया सदस्य जोड़ें' : 'Add New Member'}</span>
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
            placeholder={isHi ? 'नाम, ईमेल या फोन खोजें...' : 'Search by name, email or phone...'}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c28227] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['ALL', 'HEAD PRIEST', 'PRIEST', 'TRUSTEE', 'VOLUNTEER LEAD', 'SUPER ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                roleFilter === r
                  ? 'bg-[#c28227] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUsers.map((u) => (
          <div
            key={u.id}
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-[#c28227]/40 shadow-xs hover:shadow-md flex flex-col justify-between transition duration-200 group"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#c28227] to-amber-600 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#c28227] transition">
                      {u.name}
                    </h3>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-[#c28227]/15 text-[#965f16] text-[10px] font-bold">
                      {isHi ? u.roleHi || u.role : u.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleStatus(u.id)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                    u.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-stone-100 text-stone-600 border-stone-300'
                  }`}
                  title="Toggle Active Status"
                >
                  {u.status}
                </button>
              </div>

              <div className="mt-4 space-y-2 text-xs text-stone-600 font-medium">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{u.phone}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{u.email}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 mt-2 text-[11px]">
                  <span className="text-[#965f16] font-bold block">{isHi ? 'दायित्व / सेवा:' : 'Assigned Duties:'}</span>
                  <span className="text-stone-700 leading-snug">{u.duties}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <span>Joined: {u.joinedDate}</span>
              <span className="font-mono text-[#965f16] font-bold">{u.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal (Light Theme) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#c28227]" />
                <span>{isHi ? 'नया मंदिर सदस्य / सेवक जोड़ें' : 'Add New Temple Member'}</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'पूरा नाम' : 'Full Name'} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Pt. Ramesh Mishra"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'भूमिका / पद' : 'Role'} *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                >
                  <option value="Head Priest">Head Priest (प्रधान पुजारी)</option>
                  <option value="Senior Acharya">Senior Acharya (वरिष्ठ आचार्य)</option>
                  <option value="Priest">Priest (पुजारी)</option>
                  <option value="Trustee">Trustee (न्यास सदस्य)</option>
                  <option value="Volunteer Lead">Volunteer Lead (सेवादार प्रमुख)</option>
                  <option value="Super Admin">Super Admin (व्यवस्थापक)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'ईमेल पता' : 'Email Address'} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@baikunthnath.org"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'मोबाइल नंबर' : 'Phone Number'} *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 00000"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">{isHi ? 'मुख्य दायित्व / सेवा' : 'Assigned Duties'}</label>
                <textarea
                  rows={2}
                  value={formData.duties}
                  onChange={(e) => setFormData({ ...formData, duties: e.target.value })}
                  placeholder="Daily rituals, evening aarti, volunteer coordination..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#c28227] focus:bg-white"
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
                  className="px-4 py-2 rounded-xl bg-[#c28227] text-white font-bold hover:brightness-110 shadow-sm transition"
                >
                  {isHi ? 'सदस्य जोड़ें' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
