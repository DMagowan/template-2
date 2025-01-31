'use client';

import React, { useState } from 'react';
import BuySellVolume from '@/components/transactions/BuySellVolume';
import DCABuySellPressure from '@/components/transactions/DCABuySellPressure';
import TopTransactions from '@/components/transactions/TopTransactions';
import LiveDexTrades from '@/components/transactions/LiveDexTrades';
import DCAOrders from '@/components/transactions/DCAOrders';

// Trader categories for filtering
const TRADER_CATEGORIES = [
  { id: 'long-term-holders', label: 'Long-term Holders' },
  { id: 'short-term-holders', label: 'Short-term Holders' },
  { id: 'snipers', label: 'Snipers' },
  { id: 'token-specialists', label: 'New Token Specialists' },
  { id: 'funds', label: 'Funds' },
  { id: 'smart-money', label: 'Smart Money' },
  { id: 'public-figures', label: 'Public Figures' },
  { id: 'whales', label: 'Whales' },
  { id: 'minows', label: 'Minows' },
  { id: 'fresh-wallets', label: 'Fresh Wallets' },
  { id: 'dex', label: 'DEX' },
  { id: 'social-labels', label: 'Social Labels' }
] as const;

// Time periods for filtering
const TIME_PERIODS = [
  { id: '24h', label: '24H' },
  { id: '7d', label: '7D' },
  { id: '30d', label: '30D' },
  { id: 'custom', label: 'Custom' }
] as const;

export default function TransactionsPage() {
  // Global filter state
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('24h');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Handler for clearing all filters
  const clearFilters = () => {
    setSelectedTimeframe('24h');
    setSelectedCategories([]);
  };

  // Handler for toggling category filters
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="p-4 space-y-4 bg-[#0B1426] min-h-screen text-gray-100">
      {/* Header with Global Filters */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-100">Transactions</h1>
        <div className="flex items-center gap-3">
          {/* Time Period Filter */}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-[#1B2838] text-gray-300 text-sm rounded px-3 py-1.5 border border-gray-800"
          >
            {TIME_PERIODS.map(period => (
              <option key={period.id} value={period.id}>{period.label}</option>
            ))}
          </select>

          {/* Category Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-1.5 text-sm rounded flex items-center gap-2
              ${showFilters ? 'bg-[#2D4263] text-blue-400' : 'bg-[#1B2838] text-gray-300'}`}
          >
            Filter
            {selectedCategories.length > 0 && (
              <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 rounded">
                {selectedCategories.length}
              </span>
            )}
          </button>

          {/* Clear Filters Button */}
          {(selectedCategories.length > 0 || selectedTimeframe !== '24h') && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm bg-[#1B2838] text-gray-300 rounded hover:bg-[#2D4263]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Dropdown */}
      {showFilters && (
        <div className="bg-[#1B2838] rounded-lg p-4 border border-gray-800/50 mb-4">
          <div className="grid grid-cols-3 gap-2">
            {TRADER_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-3 py-2 text-sm rounded text-left
                  ${selectedCategories.includes(category.id)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-300 hover:bg-[#2D4263]'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Above the Fold Widgets */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Buy/Sell Volume Widget */}
        <div className="col-span-2 bg-[#0B1221] rounded-lg p-4">
          <BuySellVolume 
            timeframe={selectedTimeframe} 
            categories={selectedCategories} 
          />
        </div>
        {/* Top Transactions Widget */}
        <div className="bg-[#0B1221] rounded-lg p-4">
          <TopTransactions 
            timeframe={selectedTimeframe}
            categories={selectedCategories}
          />
        </div>
      </div>

      {/* Live DEX Trades Table */}
      <div className="bg-[#1B2838] rounded-lg p-4 border border-gray-800/50 mb-4">
        <LiveDexTrades 
          timeframe={selectedTimeframe}
          categories={selectedCategories}
        />
      </div>

      {/* Combined DCA Widget */}
      <div className="bg-[#1B2838] rounded-lg p-4 border border-gray-800/50">
        <div className="mb-6">
          <DCABuySellPressure 
            timeframe={selectedTimeframe} 
            categories={selectedCategories} 
          />
        </div>
        <DCAOrders 
          timeframe={selectedTimeframe}
          categories={selectedCategories}
        />
      </div>
    </div>
  );
} 