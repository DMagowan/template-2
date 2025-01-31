'use client';

import React from 'react';
import { FiSearch, FiFilter, FiX, FiLoader } from 'react-icons/fi';
import { useFilters } from '@/contexts/FilterContext';

interface TokenHolder {
  address: string;
  balance: number;
  value: number;
  percentageOwned: number;
  lastActivity: string;
  labels: string[];
}

const mockHolders: TokenHolder[] = Array.from({ length: 100 }, (_, i) => ({
  address: `0x${Math.random().toString(16).slice(2, 42)}`,
  balance: Math.random() * 1000000,
  value: Math.random() * 1000000,
  percentageOwned: Math.random() * 100,
  lastActivity: '2024-01-21',
  labels: ['Smart Money', 'Whale', 'Long-term Holder'].slice(0, Math.floor(Math.random() * 3) + 1)
}));

export default function TokenHolderList() {
  const {
    filters: { searchQuery, selectedCategories, walletSizeFilter, page, itemsPerPage },
    setSearchQuery,
    setSelectedCategories,
    setWalletSizeFilter,
    setPage,
    setItemsPerPage,
    isLoading
  } = useFilters();

  const [showFilters, setShowFilters] = React.useState(false);

  // Filter holders based on current filters
  const filteredHolders = React.useMemo(() => {
    return mockHolders.filter(holder => {
      const matchesSearch = holder.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategories = selectedCategories.length === 0 || 
        holder.labels.some(label => selectedCategories.includes(label.toLowerCase().replace(' ', '_')));
      const matchesSize = walletSizeFilter === 'ALL' || 
        (walletSizeFilter === 'WHALE' && holder.balance > 500000) ||
        (walletSizeFilter === 'MEDIUM' && holder.balance <= 500000 && holder.balance > 50000) ||
        (walletSizeFilter === 'SMALL' && holder.balance <= 50000);
      
      return matchesSearch && matchesCategories && matchesSize;
    });
  }, [searchQuery, selectedCategories, walletSizeFilter]);

  const paginatedHolders = filteredHolders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredHolders.length / itemsPerPage);

  return (
    <div className="bg-[#0B1221] rounded-lg border border-gray-800/50">
      <div className="p-4 border-b border-gray-800/50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/50 text-gray-300 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
          >
            <FiFilter className="w-4 h-4" />
            <span className="text-sm">Filters</span>
            {selectedCategories.length > 0 && (
              <span className="bg-blue-500/20 text-blue-400 px-1.5 rounded-full text-xs">
                {selectedCategories.length}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Wallet Size</h4>
              <div className="flex items-center gap-2">
                {['ALL', 'WHALE', 'MEDIUM', 'SMALL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setWalletSizeFilter(size)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      walletSizeFilter === size
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-900/50 text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-10">
            <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}
        
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800/50">
              <th className="text-left p-4 text-xs font-medium text-gray-400">Address</th>
              <th className="text-right p-4 text-xs font-medium text-gray-400">Balance</th>
              <th className="text-right p-4 text-xs font-medium text-gray-400">Value</th>
              <th className="text-right p-4 text-xs font-medium text-gray-400">% Owned</th>
              <th className="text-right p-4 text-xs font-medium text-gray-400">Last Activity</th>
              <th className="text-left p-4 text-xs font-medium text-gray-400">Labels</th>
            </tr>
          </thead>
          <tbody className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            {paginatedHolders.map((holder, index) => (
              <tr key={holder.address} className="border-b border-gray-800/50 last:border-0">
                <td className="p-4">
                  <span className="text-sm text-gray-300 font-mono">
                    {holder.address.slice(0, 6)}...{holder.address.slice(-4)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-sm text-gray-300">
                    {holder.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-sm text-gray-300">
                    ${holder.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-sm text-gray-300">
                    {holder.percentageOwned.toFixed(2)}%
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-sm text-gray-300">{holder.lastActivity}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {holder.labels.map((label) => (
                      <span
                        key={label}
                        className="px-2 py-1 rounded-lg text-xs bg-gray-800/50 text-gray-300"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-800/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="bg-gray-900/50 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {[15, 30, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value} per page
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-400">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredHolders.length)} of {filteredHolders.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                page === pageNum
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-gray-900/50 text-gray-400 hover:text-gray-300'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 