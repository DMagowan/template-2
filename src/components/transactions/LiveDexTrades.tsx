'use client';

import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

// Sample data structure with more realistic data
const sampleTrades = [
  {
    id: 1,
    trader: '#love Token Deployer [5fWkLJIo]',
    buyAmount: '2.98',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellAmount: '1,146,957',
    sellToken: 'LIME',
    sellTokenLogo: '/token-logos/lime.png',
    value: 718,
    time: '2m ago',
    txHash: '0x123...abc'
  },
  {
    id: 2,
    trader: 'Smart Trader [ESwd8uCf]',
    buyAmount: '33,097',
    buyToken: 'ZACKWAT',
    buyTokenLogo: '/token-logos/zackwat.png',
    sellAmount: '2.5',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    value: 595,
    time: '2m ago',
    txHash: '0x456...def'
  },
  {
    id: 3,
    trader: 'Memecoin Expert [MPxQu4os]',
    buyAmount: '188,055',
    buyToken: 'DRFM',
    buyTokenLogo: '/token-logos/drfm.png',
    sellAmount: '25',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    value: 5888,
    time: '2m ago',
    txHash: '0x789...ghi'
  },
  {
    id: 4,
    trader: '#love Token Deployer [5fWkLJIo]',
    buyAmount: '2.75',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellAmount: '1,215,295',
    sellToken: 'LIME',
    sellTokenLogo: '/token-logos/lime.png',
    value: 653,
    time: '2m ago',
    txHash: '0xabc...123'
  },
  {
    id: 5,
    trader: 'Memecoin Expert [MPxQu4os]',
    buyAmount: '35',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellAmount: '9,769,942',
    sellToken: 'NOVA',
    sellTokenLogo: '/token-logos/nova.png',
    value: 9362,
    time: '2m ago',
    txHash: '0xdef...456'
  },
  {
    id: 6,
    trader: '$MINRVA Token Deployer [5M7dX9...]',
    buyAmount: '7,500,601',
    buyToken: '6ivmd...ypump',
    buyTokenLogo: '/token-logos/pump.png',
    sellAmount: '.75',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    value: 178,
    time: '2m ago',
    txHash: '0xghi...789'
  }
];

const maxValue = Math.max(...sampleTrades.map(trade => trade.value));

interface LiveDexTradesProps {
  timeframe?: string;
  categories?: string[];
}

export default function LiveDexTrades({ timeframe = '24h', categories = [] }: LiveDexTradesProps) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-gray-300">Live DEX Trades</h2>
          <span className="px-1.5 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">Live</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-xs bg-[#1B2838] text-gray-300 rounded hover:bg-[#2D4263] transition-colors">
            All Caps
          </button>
          <button className="px-3 py-1 text-xs bg-[#2D4263] text-blue-400 rounded hover:bg-[#3D5273] transition-colors">
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400">
              <th className="text-left font-medium pb-2">Trader</th>
              <th className="text-right font-medium pb-2">Amount</th>
              <th className="text-left font-medium pb-2 pl-2">Bought</th>
              <th className="text-right font-medium pb-2">Amount</th>
              <th className="text-left font-medium pb-2 pl-2">Sold</th>
              <th className="text-right font-medium pb-2">Value ($)</th>
              <th className="text-right font-medium pb-2">Time</th>
              <th className="text-right font-medium pb-2">TX Details</th>
            </tr>
          </thead>
          <tbody>
            {sampleTrades.map((trade) => (
              <tr key={trade.id} className="text-sm border-t border-gray-800/50 hover:bg-gray-800/20">
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-xs text-orange-400">👤</span>
                    </div>
                    <span className="text-gray-300">{trade.trader}</span>
                  </div>
                </td>
                <td className="text-right text-gray-300">{trade.buyAmount}</td>
                <td className="text-left pl-2">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
                      {trade.buyTokenLogo ? (
                        <Image src={trade.buyTokenLogo} alt={trade.buyToken} width={16} height={16} className="rounded-full" />
                      ) : (
                        <span className="text-[10px] text-gray-400">{trade.buyToken.slice(0, 2)}</span>
                      )}
                    </div>
                    <span className="text-gray-300">{trade.buyToken}</span>
                  </div>
                </td>
                <td className="text-right text-gray-300">{trade.sellAmount}</td>
                <td className="text-left pl-2">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
                      {trade.sellTokenLogo ? (
                        <Image src={trade.sellTokenLogo} alt={trade.sellToken} width={16} height={16} className="rounded-full" />
                      ) : (
                        <span className="text-[10px] text-gray-400">{trade.sellToken.slice(0, 2)}</span>
                      )}
                    </div>
                    <span className="text-gray-300">{trade.sellToken}</span>
                  </div>
                </td>
                <td className="text-right relative pr-8">
                  <div 
                    className="absolute inset-y-0 right-0 bg-blue-500/20 z-0"
                    style={{ width: `${(trade.value / maxValue) * 100}%` }}
                  />
                  <span className="relative z-10 text-gray-300">${trade.value.toLocaleString()}</span>
                </td>
                <td className="text-right text-gray-400">{trade.time}</td>
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
