'use client';

import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface InfluentialGroup {
  id: string;
  name: string;
  icon: string;
  holders: number;
  totalValue: number;
  percentageSupply: number;
  change24h: number;
  avgBalance: number;
}

const sampleGroups: InfluentialGroup[] = [
  {
    id: 'smart-money',
    name: 'Smart Money',
    icon: '🧠',
    holders: 156,
    totalValue: 25000000,
    percentageSupply: 12.5,
    change24h: 2.3,
    avgBalance: 160256.41
  },
  {
    id: 'public-figures',
    name: 'Public Figures',
    icon: '🎭',
    holders: 42,
    totalValue: 8500000,
    percentageSupply: 4.25,
    change24h: -1.2,
    avgBalance: 202380.95
  },
  {
    id: 'whales',
    name: 'Whales',
    icon: '🐋',
    holders: 85,
    totalValue: 50000000,
    percentageSupply: 25,
    change24h: 0.8,
    avgBalance: 588235.29
  },
  {
    id: 'fresh-wallets',
    name: 'Fresh Wallets',
    icon: '🆕',
    holders: 1250,
    totalValue: 3500000,
    percentageSupply: 1.75,
    change24h: 5.6,
    avgBalance: 2800
  },
  {
    id: 'top-pnl',
    name: 'Top PnL Traders',
    icon: '📈',
    holders: 320,
    totalValue: 15000000,
    percentageSupply: 7.5,
    change24h: 3.2,
    avgBalance: 46875
  },
  {
    id: 'exchanges',
    name: 'Exchanges',
    icon: '🏦',
    holders: 28,
    totalValue: 35000000,
    percentageSupply: 17.5,
    change24h: -0.5,
    avgBalance: 1250000
  }
];

export default function InfluentialGroups() {
  return (
    <div className="bg-[#0B1221] rounded-lg p-4 border border-gray-800/50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-200 tracking-wide">Influential Groups</h3>
        <span className="text-xs text-gray-400">{sampleGroups.length} Groups</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {sampleGroups.map((group) => (
          <div
            key={group.id}
            className="bg-[#0F1A2E] rounded-lg p-2 border border-gray-800/30 hover:border-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">{group.icon}</span>
              <div>
                <div className="text-sm font-medium text-gray-200">{group.name}</div>
                <div className="text-xs text-gray-500">{group.holders.toLocaleString()} holders</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-400">Total Value</div>
                <div className="text-gray-300">${(group.totalValue / 1000000).toFixed(1)}M</div>
              </div>
              <div>
                <div className="text-gray-400">Supply</div>
                <div className="text-gray-300">{group.percentageSupply}%</div>
              </div>
              <div>
                <div className="text-gray-400">24h Change</div>
                <div className={`flex items-center gap-1 ${group.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {group.change24h >= 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                  <span>{Math.abs(group.change24h)}%</span>
                </div>
              </div>
              <div>
                <div className="text-gray-400">Avg Balance</div>
                <div className="text-gray-300">${(group.avgBalance / 1000).toFixed(1)}k</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
