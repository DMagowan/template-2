'use client';

import React from 'react';
import { FiGlobe, FiTwitter, FiSearch, FiTrendingUp, FiChevronDown } from 'react-icons/fi';
import MarketSignal from '@/components/overview/MarketSignal';
import FlowIntelligence from '@/components/overview/FlowIntelligence';

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#0B1426]">
      {/* Token Header */}
      <header className="bg-[#0B1221] border-b border-gray-800">
        <nav className="h-14 px-4 flex items-center justify-between border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-xl">₮</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-gray-200">USDT</h1>
              <span className="text-sm text-gray-400">2 days Old</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-300">
              <FiGlobe className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-300">
              <FiTwitter className="w-4 h-4" />
            </button>
            <div className="h-5 w-px bg-gray-800"></div>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-300 hover:text-gray-200">
              6H
              <FiChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-300 hover:text-gray-200">
              Details
              <FiChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-gray-200">
              <FiSearch className="w-4 h-4" />
              Search on X
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-gray-200">
              <FiTrendingUp className="w-4 h-4" />
              AI Analysis
            </button>
          </div>
        </nav>

        <div className="px-4 py-3">
          <div className="grid grid-cols-5 gap-6">
            <div>
              <div className="text-xs text-gray-400">Current Price</div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-gray-200">$0.9999</span>
                <span className="text-xs text-green-400">+0.04%</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-400">24H Volume</div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-gray-200">$1.23B</span>
                <span className="text-xs text-red-400">-0.04%</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-400">Market Cap</div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-gray-200">$1.23B</span>
                <span className="text-xs text-green-400">+0.04%</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-400">FDV</div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-gray-200">$1.23B</span>
                <span className="text-xs text-green-400">+0.04%</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-400">Liquidity</div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-gray-200">$137.43M</span>
                <span className="text-xs text-green-400">+0.04%</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Buy/Sell</span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-200">63%</span>
                <span className="text-xs text-gray-400">Buys</span>
                <span className="text-sm text-gray-200">47%</span>
                <span className="text-xs text-gray-400">Sells</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Supply Distribution</span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-200">$1.23B</span>
                <span className="text-xs text-green-400">+0.04%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Flow Intel</span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-200">Smart Money</span>
                <span className="text-sm text-gray-200">1,245</span>
                <span className="text-xs text-green-400">+$318.2</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <MarketSignal timeframe="1s" />
          <div className="col-span-2">
            <FlowIntelligence 
              marketCap={1.23} 
              flows={{
                smartMoney: {
                  count: 1245,
                  value: 318.2,
                  isPositive: true,
                  benchmark: {
                    percentile: 92,
                    status: 'exceptional',
                    context: '92nd percentile vs similar tokens'
                  }
                },
                exchange: {
                  count: null,
                  value: 18.2,
                  isPositive: false,
                  benchmark: {
                    percentile: 45,
                    status: 'normal',
                    context: 'Average exchange outflow'
                  }
                },
                topPNL: {
                  count: 263,
                  value: 234.2,
                  isPositive: true,
                  benchmark: {
                    percentile: 78,
                    status: 'high',
                    context: 'Higher than 78% of peers'
                  }
                },
                publicFigures: {
                  count: 869,
                  value: 128.2,
                  isPositive: true,
                  benchmark: {
                    percentile: 88,
                    status: 'high',
                    context: 'Strong influencer interest'
                  }
                },
                whales: {
                  count: 1122,
                  value: 148.2,
                  isPositive: false,
                  benchmark: {
                    percentile: 65,
                    status: 'normal',
                    context: 'Normal whale activity'
                  }
                },
                freshWallets: {
                  count: 693,
                  value: 181.2,
                  isPositive: true,
                  benchmark: {
                    percentile: 82,
                    status: 'high',
                    context: 'Strong new wallet growth'
                  }
                }
              }} 
            />
          </div>
        </div>
      </main>
    </div>
  );
} 