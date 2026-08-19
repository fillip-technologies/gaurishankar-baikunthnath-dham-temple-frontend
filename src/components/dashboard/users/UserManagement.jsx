import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import {
  createAdminApi,
  listAdminsApi,
} from '../../clientApi/adminApi';

// Subcomponents
import UserHeaderBanner from './components/UserHeaderBanner';
import UserCreateForm from './components/UserCreateForm';
import UserFilterBar from './components/UserFilterBar';
import UserTableView from './components/UserTableView';
import UserGridView from './components/UserGridView';
import UserPasswordModal from './components/UserPasswordModal';
import UserDeleteModal from './components/UserDeleteModal';

export default function UserManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  // Navigation & View
  const [activeSubTab, setActiveSubTab] = useState('list'); // 'list' | 'create'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Form State
  const [formData, setFormData] = useState({
    fullname: '',
    mobile_number: '',
    email: '',
    password: '',
    role: 'Admin',
    status: 'Active',
  });

  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Modals & Active Selections
  const [toastMessage, setToastMessage] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);

  const [users, setUsers] = useState([]);

  // Toast Notification Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // 1. Fetch Admins from API (GET /api/v1/auth/admins)
  const fetchAdmins = useCallback(async () => {
    setIsLoadingAdmins(true);
    setFetchError(null);
    try {
      const res = await listAdminsApi();
      if (res.data?.success && Array.isArray(res.data.data)) {
        const mappedUsers = res.data.data.map((admin, idx) => ({
          id: admin._id || `ADM-${idx + 1}`,
          _id: admin._id,
          fullname: admin.fullname || admin.name || 'Admin User',
          mobile_number: admin.mobile_number || admin.phone || 'N/A',
          email: admin.email || 'N/A',
          password: '••••••••',
          role: admin.role === 'superadmin' ? 'Super Admin' : 'Admin',
          status: admin.status || 'Active',
          createdAt: admin.createdAt
            ? new Date(admin.createdAt).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          ...admin,
        }));
        setUsers(mappedUsers);
      } else if (res.data?.data && res.data.data.length === 0) {
        setUsers([]);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setFetchError(
          isHi
            ? 'व्यवस्थापक सूची देखने के लिए सुपर एडमिन अनुमतियां आवश्यक हैं।'
            : 'Superadmin permissions required to fetch admin list.'
        );
      }
    } finally {
      setIsLoadingAdmins(false);
    }
  }, [isHi]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // Generate strong password
  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
    let generated = '';
    for (let i = 0; i < 10; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password: generated }));
    showToast(isHi ? 'मजबूत पासवर्ड जनरेट किया गया' : 'Generated strong password');
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullname.trim()) {
      errors.fullname = isHi ? 'पूरा नाम आवश्यक है' : 'Full name is required';
    }
    if (!formData.mobile_number.trim()) {
      errors.mobile_number = isHi ? 'मोबाइल नंबर आवश्यक है' : 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile_number.replace(/\D/g, ''))) {
      errors.mobile_number = isHi ? '10 अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim()) {
      errors.email = isHi ? 'ईमेल पता आवश्यक है' : 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = isHi ? 'वैध ईमेल पता दर्ज करें' : 'Enter a valid email address';
    }
    if (!formData.password.trim()) {
      errors.password = isHi ? 'पासवर्ड आवश्यक है' : 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = isHi ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए' : 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 2. Handle Create Admin (POST /api/v1/auth/create_admin)
  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setApiError(null);
    if (!validateForm()) return;

    const payload = {
      fullname: formData.fullname.trim(),
      mobile_number: formData.mobile_number.replace(/\D/g, ''),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    setIsSubmitting(true);
    try {
      const res = await createAdminApi(payload);
      const successMessage =
        res.data?.message ||
        (isHi
          ? 'व्यवस्थापक सफलतापूर्वक बनाया गया! लॉगिन विवरण ईमेल कर दिया गया है।'
          : 'Admin created successfully. Login credentials have been emailed.');

      showToast(successMessage);
      await fetchAdmins();

      // Reset form
      setFormData({
        fullname: '',
        mobile_number: '',
        email: '',
        password: '',
        role: 'Admin',
        status: 'Active',
      });
      setFormErrors({});
      setActiveSubTab('list');
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        (isHi ? 'व्यवस्थापक बनाने में त्रुटि' : 'Failed to create admin');
      setApiError(errorMsg);
      showToast(`Error: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle active / inactive status
  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id || u._id === id
          ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
          : u
      )
    );
    showToast(isHi ? 'उपयोगकर्ता स्थिति बदली गई' : 'User status updated');
  };

  // Delete User (Opens Delete Confirmation Modal)
  const handleDeleteUser = (id, name, fullUserObj = null) => {
    const target =
      fullUserObj ||
      users.find((u) => u.id === id || u._id === id) || {
        id,
        _id: id,
        fullname: name,
        email: name,
      };
    setSelectedUserForDelete(target);
    setIsDeleteModalOpen(true);
  };

  const handleAdminDeletedSuccess = async (msg, deletedUser) => {
    showToast(msg);
    setUsers((prev) =>
      prev.filter((u) => u.id !== deletedUser.id && u._id !== deletedUser._id)
    );
    await fetchAdmins();
  };

  // Filtered Directory List
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.mobile_number || '').includes(searchTerm) ||
      (u.id || u._id || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === 'ALL' ||
      (u.role || '').toUpperCase() === roleFilter.toUpperCase();
    const matchesStatus =
      statusFilter === 'ALL' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-500/40 text-xs font-semibold animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Banner & Actions */}
      <UserHeaderBanner
        isHi={isHi}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        totalUsers={users.length}
        onResetCreateForm={() => {
          setApiError(null);
          setFormData({
            fullname: '',
            mobile_number: '',
            email: '',
            password: '',
            role: 'Admin',
            status: 'Active',
          });
          setFormErrors({});
        }}
        onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
      />

      {/* Fetch Error Notice */}
      {fetchError && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{fetchError}</span>
          </div>
          <button
            onClick={fetchAdmins}
            className="text-amber-800 font-bold hover:underline flex items-center gap-1 text-[11px]"
          >
            <RefreshCw className={`w-3 h-3 ${isLoadingAdmins ? 'animate-spin' : ''}`} />
            <span>{isHi ? 'पुनः प्रयास करें' : 'Retry'}</span>
          </button>
        </div>
      )}

      {/* 2. Create User View */}
      {activeSubTab === 'create' && (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
          <UserCreateForm
            isHi={isHi}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            onSubmit={handleSubmitUser}
            onCancel={() => setActiveSubTab('list')}
            onGeneratePassword={handleGeneratePassword}
            isSubmitting={isSubmitting}
            apiError={apiError}
          />
        </div>
      )}

      {/* 3. Users Directory List View */}
      {activeSubTab === 'list' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <UserFilterBar
              isHi={isHi}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>

          {isLoadingAdmins && users.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 flex flex-col items-center justify-center gap-3 text-xs text-stone-500">
              <Loader2 className="w-6 h-6 animate-spin text-[#c28227]" />
              <span>
                {isHi
                  ? 'व्यवस्थापक सूची लोड हो रही है...'
                  : 'Fetching registered admins from server...'}
              </span>
            </div>
          ) : viewMode === 'table' ? (
            <UserTableView
              isHi={isHi}
              users={filteredUsers}
              totalUsersCount={users.length}
              onToggleStatus={handleToggleStatus}
              onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
              onDeleteUser={handleDeleteUser}
              onAddNewClick={() => {
                setApiError(null);
                setFormData({
                  fullname: '',
                  mobile_number: '',
                  email: '',
                  password: '',
                  role: 'Admin',
                  status: 'Active',
                });
                setActiveSubTab('create');
              }}
            />
          ) : (
            <UserGridView
              isHi={isHi}
              users={filteredUsers}
              onToggleStatus={handleToggleStatus}
              onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
              onDeleteUser={handleDeleteUser}
            />
          )}
        </div>
      )}

      {/* 4. Change Password Modal */}
      <UserPasswordModal
        isHi={isHi}
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccessToast={showToast}
      />

      {/* 5. Remove Admin Modal */}
      <UserDeleteModal
        isHi={isHi}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUserForDelete(null);
        }}
        targetUser={selectedUserForDelete}
        onSuccess={handleAdminDeletedSuccess}
      />
    </div>
  );
}
