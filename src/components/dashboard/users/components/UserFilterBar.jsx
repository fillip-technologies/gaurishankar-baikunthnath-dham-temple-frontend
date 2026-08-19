import React from 'react';
import { Search, List, LayoutGrid } from 'lucide-react';

export default function UserFilterBar({
  isHi,
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
}) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={isHi ? 'नाम, ईमेल या फोन खोजें...' : 'Search by name, email, phone...'}
          className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c28227] focus:bg-white transition"
        />
      </div>

      {/* Filter Dropdowns and View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between md:justify-end gap-2.5 w-full md:w-auto">
        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-none focus:border-[#c28227]"
        >
          <option value="ALL">{isHi ? 'सभी भूमिकाएं' : 'All Roles'}</option>
          <option value="SUPER ADMIN">Super Admin (मुख्य प्रशासक)</option>
          <option value="ADMIN">Admin (व्यवस्थापक)</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-none focus:border-[#c28227]"
        >
          <option value="ALL">{isHi ? 'सभी स्थिति' : 'All Status'}</option>
          <option value="Active">Active (सक्रिय)</option>
          <option value="Inactive">Inactive (निष्क्रिय)</option>
        </select>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg transition ${
              viewMode === 'table'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition ${
              viewMode === 'grid'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="Grid Cards View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
