'use client';

import React from 'react';

export default function HoldersPage() {
  return (
    <div className="p-4 space-y-6 bg-[#0B1426] min-h-screen text-gray-100">
      <h1 className="text-xl font-semibold text-gray-100">Holders</h1>
      
      {/* Summary Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Metric Cards */}
        {['Total Holders', 'New Holders (24h)', 'Avg. Hold Time', 'Holder Growth'].map((metric) => (
          <div key={metric} className="bg-[#1B2838] p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">{metric}</h3>
            <div className="text-xl font-semibold">12,345</div>
            <div className="text-sm text-green-400">+2.5%</div>
          </div>
        ))}
      </div>

      {/* Holder Distribution */}
      <div className="bg-[#1B2838] p-4 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Holder Distribution</h2>
        <div className="space-y-4">
          {['Top 10', 'Top 50', 'Top 100', 'Retail'].map((category) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{category}</span>
                <span className="text-gray-200">45%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: '45%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Holder Categories */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1B2838] p-4 rounded-lg">
          <h2 className="text-lg font-medium mb-4">Holder Categories</h2>
          <div className="space-y-4">
            {['Smart Money', 'Institutions', 'Retail', 'Others'].map((category) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-gray-400">{category}</span>
                <div className="text-right">
                  <div className="text-gray-200">2,345</div>
                  <div className="text-sm text-green-400">+1.2%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1B2838] p-4 rounded-lg">
          <h2 className="text-lg font-medium mb-4">Hold Time Distribution</h2>
          <div className="space-y-4">
            {['< 1 month', '1-3 months', '3-6 months', '> 6 months'].map((period) => (
              <div key={period} className="flex justify-between items-center">
                <span className="text-gray-400">{period}</span>
                <div className="text-right">
                  <div className="text-gray-200">3,456</div>
                  <div className="text-sm text-blue-400">25%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holder List */}
      <div className="bg-[#1B2838] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Top Holders</h2>
          <input
            type="text"
            placeholder="Search holders..."
            className="px-3 py-1.5 bg-gray-800 rounded text-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="pb-3">Holder</th>
                <th className="pb-3">Balance</th>
                <th className="pb-3">Value</th>
                <th className="pb-3">% Supply</th>
                <th className="pb-3">24h Change</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t border-gray-800">
                  <td className="py-3">0x1234...5678</td>
                  <td className="py-3">1,234,567</td>
                  <td className="py-3">$123,456</td>
                  <td className="py-3">2.5%</td>
                  <td className="py-3 text-green-400">+1.2%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
