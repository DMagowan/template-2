'use client';

import React, { useState } from 'react';
import { FiExternalLink, FiFilter, FiX } from 'react-icons/fi';
import Image from 'next/image';

// Filter options
const walletTypes = [
  { id: 'smart-money', label: 'Smart Money' },
  { id: 'public-figures', label: 'Public Figures' },
  { id: 'whales', label: 'Whales' },
  { id: 'sector-specialists', label: 'Sector Specialists' },
  { id: 'the-dev', label: 'The Dev' },
  { id: 'fresh-wallets', label: 'Fresh Wallets' },
  { id: 'snipers', label: 'Snipers' }
];

// Sample data for DCA orders
const sampleOrders = [
  {
    id: 1,
    wallet: 'Top 100 on SWARMS Leaderboard [7V...]',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellToken: 'USDC',
    sellTokenLogo: '/token-logos/usdc.png',
    progress: 75.5,
    depositValue: 20353,
    lastSwap: '12m ago',
    status: 'Active',
  },
  {
    id: 2,
    wallet: 'GMGN Trading Bot User [2y7ZaFt7]',
    buyToken: 'USDT',
    buyTokenLogo: '/token-logos/usdt.png',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    progress: 45.8,
    depositValue: 43207,
    lastSwap: '45m ago',
    status: 'Active',
  },
  {
    id: 3,
    wallet: 'Magic Eden User [tpnNoAVU]',
    buyToken: 'BONK',
    buyTokenLogo: '/token-logos/bonk.png',
    sellToken: 'USDC',
    sellTokenLogo: '/token-logos/usdc.png',
    progress: 100,
    depositValue: 60046,
    lastSwap: '48m ago',
    status: 'Closed',
  },
  {
    id: 4,
    wallet: 'High Balance [6FcXx79F]',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellToken: 'USDT',
    sellTokenLogo: '/token-logos/usdt.png',
    progress: 65.3,
    depositValue: 125231,
    lastSwap: '1h ago',
    status: 'Active',
  },
  {
    id: 5,
    wallet: '[69iS9zYb]',
    buyToken: 'BONK',
    buyTokenLogo: '/token-logos/bonk.png',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    progress: 82.7,
    depositValue: 32341,
    lastSwap: '2h ago',
    status: 'Active',
  },
  {
    id: 6,
    wallet: '[CBuRhWsJ]',
    buyToken: 'USDC',
    buyTokenLogo: '/token-logos/usdc.png',
    sellToken: 'BONK',
    sellTokenLogo: '/token-logos/bonk.png',
    progress: 100,
    depositValue: 63426,
    lastSwap: '2h ago',
    status: 'Closed',
  },
  {
    id: 7,
    wallet: 'Top 100 on MEW Leaderboard [9zc..]',
    buyToken: 'USDT',
    buyTokenLogo: '/token-logos/usdt.png',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    progress: 33.3,
    depositValue: 87894,
    lastSwap: '2h ago',
    status: 'Active',
  },
  {
    id: 8,
    wallet: 'ansemisgoat.sol [CtTzcR4q]',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellToken: 'USDC',
    sellTokenLogo: '/token-logos/usdc.png',
    progress: 100,
    depositValue: 92999,
    lastSwap: '2h ago',
    status: 'Closed',
  },
  {
    id: 9,
    wallet: '[CBuRhWsJ]',
    buyToken: 'BONK',
    buyTokenLogo: '/token-logos/bonk.png',
    sellToken: 'USDT',
    sellTokenLogo: '/token-logos/usdt.png',
    progress: 55.5,
    depositValue: 126853,
    lastSwap: '2h ago',
    status: 'Active',
  },
  {
    id: 10,
    wallet: 'Former Smart Trader [MAxEjjnC]',
    buyToken: 'USDC',
    buyTokenLogo: '/token-logos/usdc.png',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    progress: 25.8,
    depositValue: 219457,
    lastSwap: '2h ago',
    status: 'Active',
  }
];

// Summary data
const summary = {
  totalBuyDCA: {
    count: 71,
    value: 9.53,
    complete: 3.75,
    pending: 5.78
  },
  totalSellDCA: {
    count: 20,
    value: 2.41,
    complete: 1.44,
    pending: 0.97
  }
};

// Helper function to format values to match the style
const formatValue = (value: number) => {
  return `$${Math.floor(value).toLocaleString()}`;
};

// Add this helper function to calculate relative width
const getRelativeWidth = (value: number, maxValue: number) => {
  return `${(value / maxValue) * 100}%`;
};

interface DCAOrdersProps {
  timeframe: string;
  categories: string[];
}

export default function DCAOrders({ timeframe, categories }: DCAOrdersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Find max deposit value for relative sizing
  const maxDepositValue = Math.max(...sampleOrders.map(order => order.depositValue));

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-gray-300">Jupiter DCA Orders</h2>
          <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">91</span>
        </div>
        <button className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
          Filter
        </button>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,0.5fr] gap-4 px-4 py-2 text-xs text-gray-400">
        <div>Wallet</div>
        <div>Buying Token</div>
        <div>Selling Token</div>
        <div>Progress</div>
        <div className="text-right">Deposit Value ($)</div>
        <div className="text-right">Last Swap</div>
        <div className="text-right">Status</div>
      </div>

      {/* Table Content */}
      <div className="space-y-1">
        {sampleOrders.map((order) => (
          <div key={order.id} 
               className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,0.5fr] gap-4 px-4 py-3 text-sm border-t border-gray-800/50 hover:bg-gray-800/20">
            <div className="text-gray-300">{order.wallet}</div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
                <img src={order.buyTokenLogo} alt={order.buyToken} className="w-4 h-4 rounded-full" />
              </div>
              <span className="text-gray-300">{order.buyToken}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
                <img src={order.sellTokenLogo} alt={order.sellToken} className="w-4 h-4 rounded-full" />
              </div>
              <span className="text-gray-300">{order.sellToken}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-400 rounded-full"
                  style={{ width: `${order.progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">{order.progress}%</span>
            </div>
            <div className="text-right text-gray-300 relative">
              <div className="relative z-10">
                {formatValue(order.depositValue)}
              </div>
              <div 
                className="absolute inset-y-0 right-0 bg-blue-500/10 -z-0"
                style={{ width: getRelativeWidth(order.depositValue, maxDepositValue) }}
              />
            </div>
            <div className="text-right text-gray-400">{order.lastSwap}</div>
            <div className="text-right">
              <span className={`text-xs px-2 py-0.5 rounded ${
                order.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
