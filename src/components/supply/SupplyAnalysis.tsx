'use client';

import React from 'react';
import { FiInfo, FiTrendingUp, FiTrendingDown, FiMaximize2, FiLoader, FiLock, FiUnlock } from 'react-icons/fi';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface VestingSchedule {
  recipient: string;
  totalAllocation: number;
  released: number;
  nextUnlock: {
    date: string;
    amount: number;
  };
  soldAmount: number;
  currentlyHeld: number;
  category: 'Team' | 'Investors' | 'Contributors' | 'Community' | 'Treasury';
}

const vestingData: VestingSchedule[] = [
  {
    recipient: 'Core Team',
    totalAllocation: 225000000,
    released: 45000000,
    nextUnlock: {
      date: 'Mar 15, 2024',
      amount: 45000000
    },
    soldAmount: 30000000,
    currentlyHeld: 15000000,
    category: 'Team'
  },
  {
    recipient: 'Early Investors',
    totalAllocation: 300000000,
    released: 150000000,
    nextUnlock: {
      date: 'Apr 1, 2024',
      amount: 75000000
    },
    soldAmount: 120000000,
    currentlyHeld: 30000000,
    category: 'Investors'
  },
  {
    recipient: 'Strategic Partners',
    totalAllocation: 150000000,
    released: 75000000,
    nextUnlock: {
      date: 'Mar 15, 2024',
      amount: 30000000
    },
    soldAmount: 45000000,
    currentlyHeld: 30000000,
    category: 'Contributors'
  },
  {
    recipient: 'Community Airdrop',
    totalAllocation: 375000000,
    released: 375000000,
    nextUnlock: {
      date: 'Fully Unlocked',
      amount: 0
    },
    soldAmount: 225000000,
    currentlyHeld: 150000000,
    category: 'Community'
  },
  {
    recipient: 'Treasury',
    totalAllocation: 300000000,
    released: 60000000,
    nextUnlock: {
      date: 'Jun 15, 2024',
      amount: 60000000
    },
    soldAmount: 0,
    currentlyHeld: 60000000,
    category: 'Treasury'
  },
  {
    recipient: 'Development Fund',
    totalAllocation: 150000000,
    released: 30000000,
    nextUnlock: {
      date: 'May 1, 2024',
      amount: 30000000
    },
    soldAmount: 0,
    currentlyHeld: 30000000,
    category: 'Treasury'
  }
];

export default function SupplyAnalysis() {
  const [timeframe, setTimeframe] = React.useState('3M');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const formatNumber = (num: number) => {
    return (num / 1000000).toFixed(1) + 'M';
  };

  const formatPercentage = (part: number, total: number) => {
    return ((part / total) * 100).toFixed(1) + '%';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Team: '#3B82F6',
      Investors: '#10B981',
      Contributors: '#F59E0B',
      Community: '#8B5CF6',
      Treasury: '#EF4444'
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  };

  const filteredData = selectedCategory
    ? vestingData.filter(item => item.category === selectedCategory)
    : vestingData;

  return (
    <div className={`bg-[#0B1221] rounded-lg p-4 border border-gray-800/50 ${isExpanded ? 'fixed inset-4 z-50 overflow-auto' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-200">Token Vesting & Distribution Analysis</h3>
            <div className="group relative">
              <FiInfo className="w-3.5 h-3.5 text-gray-500 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm rounded-lg text-xs text-gray-300 w-64 hidden group-hover:block z-10 shadow-xl border border-gray-800">
                Detailed breakdown of token distribution, vesting schedules, and holder behavior.
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {['Team', 'Investors', 'Contributors', 'Community', 'Treasury'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`text-xs px-3 py-1 rounded-full ${
                  selectedCategory === category
                    ? 'bg-gray-800 text-gray-200'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? getCategoryColor(category) + '20' : '',
                  color: selectedCategory === category ? getCategoryColor(category) : ''
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <FiMaximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-800/30">
              <th className="text-left font-medium py-2">Recipient</th>
              <th className="text-right font-medium py-2">Total Allocation</th>
              <th className="text-right font-medium py-2">Released</th>
              <th className="text-right font-medium py-2">Next Unlock</th>
              <th className="text-right font-medium py-2">Sold Amount</th>
              <th className="text-right font-medium py-2">Currently Held</th>
              <th className="text-right font-medium py-2">Selling Behavior</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr 
                key={row.recipient}
                className="border-b border-gray-800/30 last:border-0 hover:bg-gray-800/20 transition-colors"
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCategoryColor(row.category) }}
                    />
                    <span className="text-sm text-gray-300">{row.recipient}</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-300 text-right">
                  {formatNumber(row.totalAllocation)}
                  <div className="text-xs text-gray-500">
                    {formatPercentage(row.totalAllocation, 1500000000)}
                  </div>
                </td>
                <td className="py-3 text-sm text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-gray-300">
                      {formatNumber(row.released)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatPercentage(row.released, row.totalAllocation)}
                  </div>
                </td>
                <td className="py-3 text-sm text-right">
                  <div className="text-gray-300">{row.nextUnlock.date}</div>
                  <div className="text-xs text-gray-500">
                    {row.nextUnlock.amount > 0 ? formatNumber(row.nextUnlock.amount) : '-'}
                  </div>
                </td>
                <td className="py-3 text-sm text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className={row.soldAmount > 0 ? 'text-red-400' : 'text-gray-300'}>
                      {formatNumber(row.soldAmount)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatPercentage(row.soldAmount, row.released)}
                  </div>
                </td>
                <td className="py-3 text-sm text-right">
                  <span className="text-green-400">
                    {formatNumber(row.currentlyHeld)}
                  </span>
                  <div className="text-xs text-gray-500">
                    {formatPercentage(row.currentlyHeld, row.released)}
                  </div>
                </td>
                <td className="py-3 text-sm text-right">
                  <div className="flex items-center justify-end gap-1">
                    {row.soldAmount / row.released > 0.7 ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">High Selling</span>
                    ) : row.soldAmount / row.released > 0.3 ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">Moderate</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Low Selling</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 