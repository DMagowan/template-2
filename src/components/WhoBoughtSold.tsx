'use client';

import React, { useState, useEffect } from 'react';
import { FiInfo, FiChevronLeft, FiChevronRight, FiStar, FiAlertCircle, FiTrendingUp, FiEye } from 'react-icons/fi';

interface WalletData {
  name: string;
  costBasis: { value: number; change: number; isPositive: boolean };
  amount: { value: number; unit: string; isPositive: boolean };
  value: number;
  category: string;
  smartMoneyScore?: number;
  tradingStyle?: string;
  profitLoss?: { value: number; isPositive: boolean };
  tradeCount?: number;
  successRate?: number;
  isNotable?: boolean;
  relatedWallets?: string[];
}

interface CategoryData {
  id: string;
  label: string;
  count: number;
  description: string;
  avgSuccess: number;
  totalValue: string;
}

// Sample data - replace with real API data
const sampleData: {
  bought: { total: string; wallets: WalletData[] };
  sold: { total: string; wallets: WalletData[] };
} = {
  bought: {
    total: '$9.53M',
    wallets: [
      {
        name: '[Gh4WFMLe]',
        costBasis: { value: 1.14, change: 27, isPositive: true },
        amount: { value: 31.4, unit: 'K', isPositive: true },
        value: 2851358,
        category: 'Smart Money',
        smartMoneyScore: 92,
        tradingStyle: 'Position Trader',
        profitLoss: { value: 285000, isPositive: true },
        tradeCount: 47,
        successRate: 76,
        isNotable: true,
        relatedWallets: ['[CryptoSage]', '[TokenMaster]']
      },
      {
        name: '[Fazokh] ⭐',
        costBasis: { value: 1.08, change: 31, isPositive: true },
        amount: { value: 1.41, unit: 'M', isPositive: true },
        value: 1663089,
        category: 'Public Figures',
        smartMoneyScore: 88,
        tradingStyle: 'Swing Trader',
        profitLoss: { value: 180000, isPositive: true },
        tradeCount: 32,
        successRate: 81,
        isNotable: true,
        relatedWallets: ['[Crypto_VIP]']
      },
      {
        name: '[LCtsizj1]',
        costBasis: { value: 1.34, change: 33, isPositive: true },
        amount: { value: 1.34, unit: 'K', isPositive: true },
        value: 956245,
        category: 'Whales'
      },
      {
        name: '[Krypto_King]',
        costBasis: { value: 1.22, change: 25, isPositive: true },
        amount: { value: 850, unit: 'K', isPositive: true },
        value: 892000,
        category: 'Sector Specialists'
      },
      {
        name: '[DevWallet]',
        costBasis: { value: 1.15, change: 28, isPositive: true },
        amount: { value: 750, unit: 'K', isPositive: true },
        value: 785000,
        category: 'The Dev'
      },
      {
        name: '[WhaleAlert]',
        costBasis: { value: 1.19, change: 22, isPositive: true },
        amount: { value: 2.1, unit: 'M', isPositive: true },
        value: 2350000,
        category: 'Whales'
      },
      {
        name: '[CryptoSage]',
        costBasis: { value: 1.11, change: 29, isPositive: true },
        amount: { value: 425, unit: 'K', isPositive: true },
        value: 450000,
        category: 'Smart Money'
      },
      {
        name: '[Fresh_0x42]',
        costBasis: { value: 1.25, change: 20, isPositive: true },
        amount: { value: 180, unit: 'K', isPositive: true },
        value: 215000,
        category: 'Fresh Wallets'
      },
      {
        name: '[TokenMaster]',
        costBasis: { value: 1.17, change: 24, isPositive: true },
        amount: { value: 920, unit: 'K', isPositive: true },
        value: 1050000,
        category: 'Sector Specialists'
      },
      {
        name: '[Crypto_VIP]',
        costBasis: { value: 1.28, change: 18, isPositive: true },
        amount: { value: 1.8, unit: 'M', isPositive: true },
        value: 2150000,
        category: 'Public Figures'
      },
      {
        name: '[0xWhale]',
        costBasis: { value: 1.21, change: 23, isPositive: true },
        amount: { value: 1.5, unit: 'M', isPositive: true },
        value: 1750000,
        category: 'Whales'
      },
      {
        name: '[SmartTrader]',
        costBasis: { value: 1.16, change: 26, isPositive: true },
        amount: { value: 650, unit: 'K', isPositive: true },
        value: 725000,
        category: 'Smart Money'
      },
      {
        name: '[NewWallet_1]',
        costBasis: { value: 1.23, change: 21, isPositive: true },
        amount: { value: 275, unit: 'K', isPositive: true },
        value: 325000,
        category: 'Fresh Wallets'
      },
      {
        name: '[DeFi_Expert]',
        costBasis: { value: 1.13, change: 30, isPositive: true },
        amount: { value: 1.2, unit: 'M', isPositive: true },
        value: 1350000,
        category: 'Sector Specialists'
      },
      {
        name: '[AlphaSeeker]',
        costBasis: { value: 1.18, change: 25, isPositive: true },
        amount: { value: 950, unit: 'K', isPositive: true },
        value: 1100000,
        category: 'Smart Money'
      }
    ]
  },
  sold: {
    total: '$5.82M',
    wallets: [
      {
        name: '[0xProfit]',
        costBasis: { value: 0.95, change: 15, isPositive: false },
        amount: { value: 750, unit: 'K', isPositive: false },
        value: 682500,
        category: 'Smart Money',
        smartMoneyScore: 85,
        tradingStyle: 'Scalper',
        profitLoss: { value: 125000, isPositive: true },
        tradeCount: 156,
        successRate: 72,
        isNotable: true,
        relatedWallets: []
      },
      {
        name: '[WhaleOut]',
        costBasis: { value: 0.92, change: 18, isPositive: false },
        amount: { value: 1.2, unit: 'M', isPositive: false },
        value: 1104000,
        category: 'Whales'
      },
      {
        name: '[ExitMaster]',
        costBasis: { value: 0.88, change: 22, isPositive: false },
        amount: { value: 500, unit: 'K', isPositive: false },
        value: 440000,
        category: 'Sector Specialists'
      },
      {
        name: '[Trader_Pro]',
        costBasis: { value: 0.91, change: 19, isPositive: false },
        amount: { value: 850, unit: 'K', isPositive: false },
        value: 773500,
        category: 'Smart Money'
      },
      {
        name: '[SellSignal]',
        costBasis: { value: 0.94, change: 16, isPositive: false },
        amount: { value: 1.5, unit: 'M', isPositive: false },
        value: 1410000,
        category: 'Public Figures'
      },
      {
        name: '[Fresh_0x99]',
        costBasis: { value: 0.89, change: 21, isPositive: false },
        amount: { value: 320, unit: 'K', isPositive: false },
        value: 284800,
        category: 'Fresh Wallets'
      },
      {
        name: '[TokenSeller]',
        costBasis: { value: 0.93, change: 17, isPositive: false },
        amount: { value: 980, unit: 'K', isPositive: false },
        value: 911400,
        category: 'Sector Specialists'
      },
      {
        name: '[0xDump]',
        costBasis: { value: 0.90, change: 20, isPositive: false },
        amount: { value: 1.8, unit: 'M', isPositive: false },
        value: 1620000,
        category: 'Whales'
      },
      {
        name: '[ExitLiquidity]',
        costBasis: { value: 0.87, change: 23, isPositive: false },
        amount: { value: 420, unit: 'K', isPositive: false },
        value: 365400,
        category: 'Smart Money'
      },
      {
        name: '[PaperHands]',
        costBasis: { value: 0.96, change: 14, isPositive: false },
        amount: { value: 250, unit: 'K', isPositive: false },
        value: 240000,
        category: 'Fresh Wallets'
      },
      {
        name: '[BearWhale]',
        costBasis: { value: 0.92, change: 18, isPositive: false },
        amount: { value: 2.1, unit: 'M', isPositive: false },
        value: 1932000,
        category: 'Whales'
      },
      {
        name: '[ShortKing]',
        costBasis: { value: 0.89, change: 21, isPositive: false },
        amount: { value: 680, unit: 'K', isPositive: false },
        value: 605200,
        category: 'Sector Specialists'
      },
      {
        name: '[Profit_Taker]',
        costBasis: { value: 0.94, change: 16, isPositive: false },
        amount: { value: 890, unit: 'K', isPositive: false },
        value: 836600,
        category: 'Smart Money'
      },
      {
        name: '[NewExit_2]',
        costBasis: { value: 0.91, change: 19, isPositive: false },
        amount: { value: 350, unit: 'K', isPositive: false },
        value: 318500,
        category: 'Fresh Wallets'
      },
      {
        name: '[SellTheNews]',
        costBasis: { value: 0.93, change: 17, isPositive: false },
        amount: { value: 1.1, unit: 'M', isPositive: false },
        value: 1023000,
        category: 'Public Figures'
      }
    ]
  }
};

const categories: CategoryData[] = [
  { 
    id: 'all', 
    label: 'All', 
    count: 91,
    description: 'All tracked wallets',
    avgSuccess: 68,
    totalValue: '$15.3M'
  },
  { 
    id: 'smart-money', 
    label: 'Smart Money', 
    count: 15,
    description: 'Consistently profitable traders',
    avgSuccess: 82,
    totalValue: '$5.2M'
  },
  { 
    id: 'public-figures', 
    label: 'Public Figures', 
    count: 8,
    description: 'Known crypto personalities',
    avgSuccess: 65,
    totalValue: '$2.8M'
  },
  { 
    id: 'whales', 
    label: 'Whales', 
    count: 24,
    description: 'Large volume traders',
    avgSuccess: 75,
    totalValue: '$8.4M'
  },
  { 
    id: 'sector-specialists', 
    label: 'Sector Specialists', 
    count: 12,
    description: 'Token sector experts',
    avgSuccess: 71,
    totalValue: '$3.2M'
  },
  { 
    id: 'the-dev', 
    label: 'The Dev', 
    count: 1,
    description: 'Project developer wallet',
    avgSuccess: 88,
    totalValue: '$785K'
  },
  { 
    id: 'fresh-wallets', 
    label: 'Fresh Wallets', 
    count: 45,
    description: 'New wallets < 30 days',
    avgSuccess: 45,
    totalValue: '$1.2M'
  }
];

const timeframes = ['6H', '12H', '24H', '7D', 'Custom'];

// Add sample trade data for each wallet
const walletTrades = {
  '[Gh4WFMLe]': [
    { time: '2024-01-25', price: 0.98, type: 'buy', amount: '31.4K USDT' },
    { time: '2024-01-26', price: 1.02, type: 'buy', amount: '15.2K USDT' },
    { time: '2024-01-28', price: 1.14, type: 'buy', amount: '22.8K USDT' }
  ],
  '[Fazokh] ⭐': [
    { time: '2024-01-24', price: 0.95, type: 'buy', amount: '500K USDT' },
    { time: '2024-01-27', price: 1.08, type: 'buy', amount: '910K USDT' }
  ],
  '[0xProfit]': [
    { time: '2024-01-23', price: 0.92, type: 'buy', amount: '750K USDT' },
    { time: '2024-01-26', price: 1.05, type: 'sell', amount: '450K USDT' },
    { time: '2024-01-28', price: 1.12, type: 'sell', amount: '300K USDT' }
  ],
  '[WhaleOut]': [
    { time: '2024-01-22', price: 0.89, type: 'buy', amount: '1.2M USDT' },
    { time: '2024-01-25', price: 1.01, type: 'sell', amount: '800K USDT' },
    { time: '2024-01-27', price: 1.10, type: 'sell', amount: '400K USDT' }
  ]
};

export default function WhoBoughtSold() {
  const [view, setView] = useState<'bought' | 'sold'>('bought');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24H');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'amount' | 'value' | 'costBasis' | 'change'>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sampleData[view].wallets.length / itemsPerPage);

  const handleSort = (field: 'amount' | 'value' | 'costBasis' | 'change') => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const handleRowHover = (walletName: string) => {
    const trades = walletTrades[walletName as keyof typeof walletTrades];
    if (trades && (window as any).showTradesOnChart) {
      (window as any).showTradesOnChart(trades);
    }
  };

  const handleRowLeave = () => {
    if ((window as any).showTradesOnChart) {
      (window as any).showTradesOnChart([]);
    }
  };

  return (
    <div className="bg-[#1B2838] rounded-lg p-6 border border-gray-800/50">
      {/* Summary Stats */}
      <div className="flex items-center gap-8 mb-6">
        <div className="space-y-0.5">
          <div className="text-xs text-gray-400 font-medium">Net Buys</div>
          <div className="text-2xl font-semibold text-green-400">+{sampleData.bought.total}</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">{sampleData.bought.wallets.length} wallets</span>
            <span className="text-green-400 font-medium">+18.2%</span>
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="text-xs text-gray-400 font-medium">Net Sells</div>
          <div className="text-2xl font-semibold text-red-400">-{sampleData.sold.total}</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">{sampleData.sold.wallets.length} wallets</span>
            <span className="text-red-400 font-medium">-5.4%</span>
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="text-xs text-gray-400 font-medium">Net Flow</div>
          <div className="text-2xl font-semibold text-blue-400">
            ${(parseFloat(sampleData.bought.total.replace(/[^0-9.-]+/g, "")) - 
               parseFloat(sampleData.sold.total.replace(/[^0-9.-]+/g, ""))).toFixed(2)}M
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">Last {selectedTimeframe}</span>
            <span className="text-green-400 font-medium">+12.8%</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-medium text-gray-200">Who {view === 'bought' ? 'Bought' : 'Sold'}?</h2>
          <FiInfo className="w-4 h-4 text-gray-400 cursor-help" title="Track wallet trading activity" />
        </div>
        <div className="flex items-center gap-3">
          {/* Buy/Sell Toggle */}
          <div className="flex rounded-md overflow-hidden bg-[#1B2838] border border-gray-800">
            <button
              onClick={() => setView('bought')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                view === 'bought'
                  ? 'bg-green-500/10 text-green-400 border-r border-gray-800'
                  : 'bg-transparent text-gray-400 hover:text-gray-300 border-r border-gray-800'
              }`}
            >
              Bought
            </button>
            <button
              onClick={() => setView('sold')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                view === 'sold'
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Sold
            </button>
          </div>

          {/* Labels Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#1B2838] text-gray-300 text-sm rounded px-3 py-1.5 border border-gray-800 focus:outline-none focus:border-gray-700"
          >
            <optgroup label="Labels" className="bg-[#1B2838]">
              <option value="all">All Wallets</option>
              <option value="smart-money">Smart Money</option>
              <option value="public-figures">Public Figures</option>
              <option value="whales">Whales</option>
              <option value="sector-specialists">Sector Specialists</option>
              <option value="the-dev">The Dev</option>
              <option value="fresh-wallets">Fresh Wallets</option>
            </optgroup>
          </select>

          {/* Timeframe Selector */}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-[#1B2838] text-gray-300 text-sm rounded px-3 py-1.5 border border-gray-800 focus:outline-none focus:border-gray-700"
          >
            {timeframes.map(tf => (
              <option key={tf} value={tf}>{tf}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto -mx-6">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-800/50">
              <th className="text-left font-medium px-6 pb-3">Name</th>
              <th className="text-right font-medium px-6 pb-3 cursor-pointer" onClick={() => handleSort('costBasis')}>
                Cost Basis
              </th>
              <th className="text-right font-medium px-6 pb-3 cursor-pointer" onClick={() => handleSort('amount')}>
                Amount
              </th>
              <th className="text-right font-medium px-6 pb-3 cursor-pointer" onClick={() => handleSort('value')}>
                Value
              </th>
              <th className="text-center font-medium px-6 pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleData[view].wallets.map((wallet, index) => (
              <tr 
                key={index} 
                className={`text-sm hover:bg-gray-800/20 cursor-pointer transition-colors
                  ${wallet.isNotable ? 'bg-blue-500/5' : ''}`}
                onMouseEnter={() => handleRowHover(wallet.name)}
                onMouseLeave={handleRowLeave}
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    {wallet.isNotable && (
                      <FiStar className="w-3 h-3 text-yellow-400" />
                    )}
                    <span className="text-gray-300">{wallet.name}</span>
                  </div>
                  {wallet.smartMoneyScore && wallet.smartMoneyScore > 80 && (
                    <div className="text-xs text-blue-400 mt-0.5">Smart Money Score: {wallet.smartMoneyScore}</div>
                  )}
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="text-gray-300">${wallet.costBasis.value}</div>
                  <div className={`text-xs ${wallet.costBasis.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {wallet.costBasis.isPositive ? '+' : '-'}{wallet.costBasis.change}%
                  </div>
                </td>
                <td className="px-6 py-3 text-right">
                  <div className={`${wallet.amount.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {wallet.amount.isPositive ? '↑' : '↓'} {wallet.amount.value}{wallet.amount.unit}
                  </div>
                </td>
                <td className="px-6 py-3 text-right text-gray-300">
                  ${wallet.value.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button 
                      className="p-1 text-gray-400 hover:text-gray-300"
                      onClick={() => setSelectedWallets(prev => 
                        prev.includes(wallet.name) 
                          ? prev.filter(w => w !== wallet.name)
                          : [...prev, wallet.name]
                      )}
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 px-6">
        <div className="text-sm text-gray-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sampleData[view].wallets.length)} of {sampleData[view].wallets.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-1 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-1 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 
