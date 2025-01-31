'use client';

import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

// Sample data for top transfers (sorted by absolute value)
const sampleTransfers = [
  {
    id: 1,
    from: 'Top 100 on 🚀 TRUMP Leaderboard [C...',
    to: 'Active SOL Millionaire [8EJJEXn5]',
    amount: '-1,001,024',
    token: 'ARC',
    tokenLogo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ARCN6c3mxNKSVC4G846GY7LqGy7eHGwqZHsCQJ1xJvBw/logo.png',
    value: -393741,
    time: '4h ago'
  },
  {
    id: 2,
    from: 'Whale Wallet [9xKj2mN8]',
    to: 'DEX Liquidity Pool [L3qP5vR7]',
    amount: '250,000',
    token: 'USDC',
    tokenLogo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    value: 250000,
    time: '2h ago'
  },
  {
    id: 3,
    from: 'Smart Money Trader [4rTh8nB9]',
    to: 'Institutional Wallet [K7mW2xY5]',
    amount: '-156,789',
    token: 'SOL',
    tokenLogo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    value: -156789,
    time: '1h ago'
  },
  {
    id: 4,
    from: 'BidenBye Token Deployer [Cf8uaesD]',
    to: 'Top 100 on 🚀 TRUMP Leaderboard [C...',
    amount: '5,000',
    token: 'BONK',
    tokenLogo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png',
    value: 75000,
    time: '49m ago'
  },
  {
    id: 5,
    from: 'DeFi Protocol [2vN9pQ4]',
    to: 'Yield Farmer [6tM4wL8]',
    amount: '45,678',
    token: 'USDT',
    tokenLogo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
    value: 45678,
    time: '30m ago'
  }
];

// Helper function to format values to match the style
const formatValue = (value: number | null) => {
  if (value === null) return '-';
  return `$${Math.floor(Math.abs(value)).toLocaleString()}`;
};

// Add helper function to calculate relative width
const getRelativeWidth = (value: number, maxValue: number) => {
  return `${(Math.abs(value) / maxValue) * 100}%`;
};

export default function TopTransfers() {
  // Find max value for relative sizing
  const maxValue = Math.max(...sampleTransfers.map(transfer => Math.abs(transfer.value || 0)));

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-gray-300">Top Transfers</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400">
              <th className="text-left font-medium pb-2">From</th>
              <th className="text-left font-medium pb-2">To</th>
              <th className="text-right font-medium pb-2">Amount</th>
              <th className="text-left font-medium pb-2 pl-2">Token</th>
              <th className="text-right font-medium pb-2">Value</th>
              <th className="text-right font-medium pb-2">Time</th>
              <th className="text-right font-medium pb-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {sampleTransfers.map((transfer) => (
              <tr key={transfer.id} className="text-sm border-t border-gray-800/50 hover:bg-gray-800/20">
                <td className="py-2 text-gray-300">{transfer.from}</td>
                <td className="text-gray-300">{transfer.to}</td>
                <td className={`text-right ${
                  transfer.amount.startsWith('-') ? 'text-red-400' : 'text-green-400'
                }`}>
                  {transfer.amount}
                </td>
                <td className="text-left pl-2">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
                      {transfer.tokenLogo ? (
                        <Image src={transfer.tokenLogo} alt={transfer.token} width={16} height={16} className="rounded-full" />
                      ) : (
                        <span className="text-[10px] text-gray-400">{transfer.token.slice(0, 2)}</span>
                      )}
                    </div>
                    <span className="text-gray-300">{transfer.token}</span>
                  </div>
                </td>
                <td className={`text-right relative ${
                  transfer.value === null ? 'text-gray-400' : 
                  transfer.value < 0 ? 'text-red-400' : 'text-green-400'
                }`}>
                  <div className="relative z-10">
                    {formatValue(transfer.value)}
                  </div>
                  <div 
                    className="absolute inset-y-0 right-0 -z-0 bg-blue-500/10"
                    style={{ 
                      width: getRelativeWidth(transfer.value || 0, maxValue),
                    }}
                  />
                </td>
                <td className="text-right text-gray-400">{transfer.time}</td>
                <td className="text-right">
                  <button className="text-blue-400 hover:text-blue-300">
                    <FiExternalLink className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
