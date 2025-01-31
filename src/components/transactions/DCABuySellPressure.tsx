'use client';

import React from 'react';
import { FiArrowUp, FiArrowDown, FiClock, FiCheckCircle } from 'react-icons/fi';

interface DCABuySellPressureProps {
  timeframe: string;
  categories: string[];
}

export default function DCABuySellPressure({ timeframe, categories }: DCABuySellPressureProps) {
  // Sample data - replace with real API data
  const buyDCAData = {
    total: 9.53,
    orders: 71,
    complete: 3.75,
    pending: 5.78,
    change: 18.2,
    avgOrderSize: 134.2,
    nextExecution: '15min'
  };

  const sellDCAData = {
    total: 2.41,
    orders: 20,
    complete: 1.44,
    pending: 0.97,
    change: -5.4,
    avgOrderSize: 120.5,
    nextExecution: '28min'
  };

  const netDCAFlow = buyDCAData.total - sellDCAData.total;
  const netDCAPercentage = ((netDCAFlow / buyDCAData.total) * 100).toFixed(1);

  return (
    <div className="h-full text-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-sm font-medium text-gray-300">DCA Buy/Sell Pressure</h2>
        {categories.length > 0 && (
          <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">
            {categories.length} filters
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Buy DCA Stats */}
        <div className="bg-[#141E2C] rounded-lg p-3 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center">
                <FiArrowUp className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm text-gray-400">Buy DCA</span>
            </div>
            <span className="px-1.5 py-0.5 text-xs bg-green-900/30 text-green-400 rounded">
              {buyDCAData.orders} orders
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-lg font-semibold text-green-400">
              ${buyDCAData.total}M
            </div>
            <div className="text-xs text-green-400">
              +{buyDCAData.change}%
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gray-400">
                <FiCheckCircle className="w-3.5 h-3.5" />
                Complete
              </div>
              <span className="text-gray-300">${buyDCAData.complete}M</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <FiClock className="w-3.5 h-3.5" />
                  Pending
                </div>
                <span className="text-gray-300">${buyDCAData.pending}M</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${(buyDCAData.complete / buyDCAData.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Avg. Order Size</span>
              <span>${buyDCAData.avgOrderSize}K</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Next Execution</span>
              <span>in {buyDCAData.nextExecution}</span>
            </div>
          </div>
        </div>

        {/* Sell DCA Stats */}
        <div className="bg-[#141E2C] rounded-lg p-3 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center">
                <FiArrowDown className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-sm text-gray-400">Sell DCA</span>
            </div>
            <span className="px-1.5 py-0.5 text-xs bg-red-900/30 text-red-400 rounded">
              {sellDCAData.orders} orders
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-lg font-semibold text-red-400">
              ${sellDCAData.total}M
            </div>
            <div className="text-xs text-red-400">
              {sellDCAData.change}%
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gray-400">
                <FiCheckCircle className="w-3.5 h-3.5" />
                Complete
              </div>
              <span className="text-gray-300">${sellDCAData.complete}M</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <FiClock className="w-3.5 h-3.5" />
                  Pending
                </div>
                <span className="text-gray-300">${sellDCAData.pending}M</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-400 rounded-full transition-all duration-500"
                  style={{ width: `${(sellDCAData.complete / sellDCAData.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Avg. Order Size</span>
              <span>${sellDCAData.avgOrderSize}K</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Next Execution</span>
              <span>in {sellDCAData.nextExecution}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
