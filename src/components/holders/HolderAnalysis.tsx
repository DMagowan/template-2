'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUsers, FiActivity, FiTrendingUp, FiTrendingDown, FiMaximize2, FiLoader } from 'react-icons/fi';
import { useFilters } from '@/contexts/FilterContext';

interface HolderCategory {
  id: string;
  name: string;
  subcategories?: HolderCategory[];
  color?: string;
  description?: string;
  change24h?: number;
}

// Sample analysis data
const analysisData = [
  {
    category: 'Smart Money',
    holders: 1245,
    holdersChange24h: 5.2,
    holdersChange7d: 45.2,
    holdersChange30d: 125.4,
    supply: 8.2,
    avgBalance: 3680,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: 3000 + Math.random() * 1000
    }))
  },
  {
    category: 'Public Figures',
    holders: 892,
    holdersChange24h: 2.8,
    holdersChange7d: 15.6,
    holdersChange30d: 85.2,
    supply: 5.4,
    avgBalance: 2450,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: 2000 + Math.random() * 1000
    }))
  },
  {
    category: 'Whales',
    holders: 156,
    holdersChange24h: -1.2,
    holdersChange7d: 8.4,
    holdersChange30d: 45.8,
    supply: 15.8,
    avgBalance: 12580,
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: 10000 + Math.random() * 5000
    }))
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg p-3 shadow-xl">
        <p className="text-xs font-medium text-gray-400 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <span className="text-gray-300">{entry.name}</span>
            <span className="text-gray-200 font-medium">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function HolderAnalysis() {
  const {
    filters: { timeframe },
    setTimeframe,
    isLoading
  } = useFilters();
  
  const [activeTab, setActiveTab] = useState<'holders' | 'analysis'>('holders');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <div className={`bg-[#0B1221] rounded-lg p-4 border border-gray-800/50 ${isExpanded ? 'fixed inset-4 z-50 overflow-auto' : ''}`}>
        {/* Header with Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('holders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'holders'
                  ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <FiUsers className="w-4 h-4" />
              <span className="text-sm font-medium">Token Holders</span>
            </button>

            <button
              onClick={() => setActiveTab('analysis')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'analysis'
                  ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <FiActivity className="w-4 h-4" />
              <span className="text-sm font-medium">Holder Analysis</span>
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <FiMaximize2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Token Holders Tab */}
        {activeTab === 'holders' && (
          <div className="text-sm text-gray-400">Select analysis tab to view holder metrics</div>
        )}

        {/* Holder Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-4">
              {analysisData.map((category) => (
                <div
                  key={category.category}
                  className={`bg-gray-800/30 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCategory === category.category ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.category)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-300">{category.category}</span>
                    <span className="text-xs text-gray-400">{category.holders.toLocaleString()} holders</span>
                  </div>
                  
                  <div className="h-[100px] -mx-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={category.chartData}>
                        <defs>
                          <linearGradient id={`gradient-${category.category}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#3B82F6"
                          fill={`url(#gradient-${category.category})`}
                          strokeWidth={1.5}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-gray-400">24H</div>
                      <div className={`text-sm font-medium ${
                        category.holdersChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {category.holdersChange24h >= 0 ? '+' : ''}{category.holdersChange24h}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">7D</div>
                      <div className={`text-sm font-medium ${
                        category.holdersChange7d >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {category.holdersChange7d >= 0 ? '+' : ''}{category.holdersChange7d}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">30D</div>
                      <div className={`text-sm font-medium ${
                        category.holdersChange30d >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {category.holdersChange30d >= 0 ? '+' : ''}{category.holdersChange30d}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 border-b border-gray-800/30">
                    <th className="text-left font-medium py-2">Category</th>
                    <th className="text-right font-medium py-2">Holders</th>
                    <th className="text-right font-medium py-2">24H</th>
                    <th className="text-right font-medium py-2">7D</th>
                    <th className="text-right font-medium py-2">30D</th>
                    <th className="text-right font-medium py-2">Supply %</th>
                    <th className="text-right font-medium py-2">Avg. Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.map((row) => (
                    <tr 
                      key={row.category}
                      className="border-b border-gray-800/30 last:border-0 hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="py-3 text-sm text-gray-300">{row.category}</td>
                      <td className="py-3 text-sm text-gray-300 text-right">{row.holders.toLocaleString()}</td>
                      <td className="py-3 text-sm text-right">
                        <div className="flex items-center justify-end gap-1">
                          {row.holdersChange24h >= 0 ? (
                            <FiTrendingUp className="w-3 h-3 text-green-400/90" />
                          ) : (
                            <FiTrendingDown className="w-3 h-3 text-red-400/90" />
                          )}
                          <span className={row.holdersChange24h >= 0 ? 'text-green-400/90' : 'text-red-400/90'}>
                            {row.holdersChange24h >= 0 ? '+' : ''}{row.holdersChange24h}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-right">
                        <div className="flex items-center justify-end gap-1">
                          {row.holdersChange7d >= 0 ? (
                            <FiTrendingUp className="w-3 h-3 text-green-400/90" />
                          ) : (
                            <FiTrendingDown className="w-3 h-3 text-red-400/90" />
                          )}
                          <span className={row.holdersChange7d >= 0 ? 'text-green-400/90' : 'text-red-400/90'}>
                            {row.holdersChange7d >= 0 ? '+' : ''}{row.holdersChange7d}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-right">
                        <div className="flex items-center justify-end gap-1">
                          {row.holdersChange30d >= 0 ? (
                            <FiTrendingUp className="w-3 h-3 text-green-400/90" />
                          ) : (
                            <FiTrendingDown className="w-3 h-3 text-red-400/90" />
                          )}
                          <span className={row.holdersChange30d >= 0 ? 'text-green-400/90' : 'text-red-400/90'}>
                            {row.holdersChange30d >= 0 ? '+' : ''}{row.holdersChange30d}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-300 text-right">{row.supply}%</td>
                      <td className="py-3 text-sm text-gray-300 text-right">${row.avgBalance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
