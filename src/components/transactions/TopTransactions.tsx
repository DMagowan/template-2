'use client';

import React, { useState } from 'react';
import { FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface TopTransactionsProps {
  timeframe: string;
  categories: string[];
}

interface Transaction {
  id: string;
  amount: string;
  amountValue: number;
  time: string;
  timestamp: string;
  fromWallet: string;
  toWallet: string;
  type: 'buy' | 'sell';
}

// Sample data - replace with real API data
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: '$1,250,000',
    amountValue: 1250000,
    time: '14:30',
    timestamp: '2024-03-10T14:30:00Z',
    fromWallet: 'Smart Money [7V...',
    toWallet: 'DEX Pool [L3q...',
    type: 'buy'
  },
  {
    id: '2',
    amount: '$960,000',
    amountValue: 960000,
    time: '15:45',
    timestamp: '2024-03-10T15:45:00Z',
    fromWallet: 'Whale [9xK...',
    toWallet: 'Fresh Wallet [2vN...',
    type: 'sell'
  },
  {
    id: '3',
    amount: '$725,000',
    amountValue: 725000,
    time: '16:20',
    timestamp: '2024-03-10T16:20:00Z',
    fromWallet: 'Public Figure [4rT...',
    toWallet: 'Smart Money [K7m...',
    type: 'buy'
  },
  {
    id: '4',
    amount: '$680,000',
    amountValue: 680000,
    time: '16:45',
    timestamp: '2024-03-10T16:45:00Z',
    fromWallet: 'Token Specialist [Cf8...',
    toWallet: 'DEX Pool [6tM...',
    type: 'sell'
  },
  {
    id: '5',
    amount: '$550,000',
    amountValue: 550000,
    time: '17:15',
    timestamp: '2024-03-10T17:15:00Z',
    fromWallet: 'Whale [2vN...',
    toWallet: 'Fresh Wallet [6tM...',
    type: 'buy'
  },
  {
    id: '6',
    amount: '$450,000',
    amountValue: 450000,
    time: '17:30',
    timestamp: '2024-03-10T17:30:00Z',
    fromWallet: 'Smart Money [9zc...',
    toWallet: 'DEX Pool [CtT...',
    type: 'sell'
  },
  {
    id: '7',
    amount: '$420,000',
    amountValue: 420000,
    time: '17:45',
    timestamp: '2024-03-10T17:45:00Z',
    fromWallet: 'Public Figure [CBu...',
    toWallet: 'Fresh Wallet [MAxE...',
    type: 'buy'
  }
];

export default function TopTransactions({ timeframe, categories }: TopTransactionsProps) {
  const [showAll, setShowAll] = useState(false);
  const [showTransfersOnly, setShowTransfersOnly] = useState(false);

  // Filter and sort transactions
  const filteredTransactions = sampleTransactions
    .filter(tx => !showTransfersOnly || (tx.type !== 'buy' && tx.type !== 'sell'))
    .sort((a, b) => b.amountValue - a.amountValue);

  const displayTransactions = showAll 
    ? filteredTransactions 
    : filteredTransactions.slice(0, 5);

  return (
    <div className="h-full text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-gray-300">Top Transactions</h2>
          {categories.length > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">
              {categories.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTransfersOnly(!showTransfersOnly)}
            className={`px-2 py-1 text-xs rounded ${
              showTransfersOnly 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-[#1B2838] text-gray-400 hover:text-gray-300'
            }`}
          >
            Transfers Only
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {displayTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 bg-[#141E2C] rounded-lg border border-gray-800"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type === 'buy' 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-red-900/30 text-red-400'
                }`}
              >
                <span className="text-lg">
                  {tx.type === 'buy' ? '↑' : '↓'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-200">{tx.amount}</p>
                <p className="text-sm text-gray-500">
                  {tx.fromWallet} → {tx.toWallet}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{tx.time}</span>
              <button className="text-blue-400 hover:text-blue-300">
                <FiExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-3 px-3 py-2 text-sm text-gray-400 hover:text-gray-300 flex items-center justify-center gap-1"
        >
          {showAll ? (
            <>
              Show Less <FiChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show More <FiChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
} 
