'use client';

import React, { useState } from 'react';
import { FiInfo, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TopWalletData {
  label: string;
  percentage: number;
  wallets: number;
  avgHolding: string;
}

export default function SupplyConcentration() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const data: TopWalletData[] = [
    { label: 'Top 5', percentage: 15, wallets: 5, avgHolding: '3.2M AXS' },
    { label: 'Top 10', percentage: 25, wallets: 10, avgHolding: '2.5M AXS' },
    { label: 'Top 50', percentage: 45, wallets: 50, avgHolding: '900K AXS' },
    { label: 'Top 100', percentage: 60, wallets: 100, avgHolding: '600K AXS' }
  ];

  return (
    <div className="bg-[#0B1426] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-medium text-gray-200">Supply Concentration</h2>
          <div className="group relative">
            <FiInfo className="w-3.5 h-3.5 text-gray-500 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm rounded-lg text-xs text-gray-300 w-64 hidden group-hover:block z-10 shadow-xl border border-gray-800">
              Distribution of token supply among top wallet holders
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2 py-1 bg-blue-500/10 rounded-full">
            <FiUsers className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-medium text-blue-400">12.5k Total Holders</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 rounded-full">
            <FiTrendingUp className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-medium text-green-400">+2.8% 24h</span>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-medium text-gray-200 mb-4">Top Wallets Distribution</h3>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={0}>
            <XAxis 
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <Tooltip
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as TopWalletData;
                  return (
                    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 border border-gray-800/50 shadow-xl">
                      <div className="text-sm font-medium text-gray-200 mb-1">{data.label}</div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>Supply: {data.percentage}%</div>
                        <div>Wallets: {data.wallets}</div>
                        <div>Avg. Holding: {data.avgHolding}</div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="percentage"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              onMouseEnter={(data) => setHoveredBar(data.label)}
              onMouseLeave={() => setHoveredBar(null)}
              className="transition-all duration-300"
              style={{
                opacity: (data) => hoveredBar === null || hoveredBar === data.label ? 1 : 0.6
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {data.map((item) => (
          <div 
            key={item.label}
            className={`p-3 rounded-lg transition-all duration-200 ${
              hoveredBar === item.label
                ? 'bg-blue-500/20 ring-1 ring-blue-500/30'
                : 'bg-gray-800/30 hover:bg-gray-800/50'
            }`}
            onMouseEnter={() => setHoveredBar(item.label)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <div className="text-sm font-medium text-gray-200 mb-1">{item.label}</div>
            <div className="text-lg font-semibold text-gray-100">{item.percentage}%</div>
            <div className="text-xs text-gray-400 mt-1">
              {item.wallets} wallets · Avg. {item.avgHolding}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 