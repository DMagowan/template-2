'use client';

import React, { useState } from 'react';
import { FiInfo, FiClock, FiDownload } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TimeRangeData {
  label: string;
  percentage: number;
  wallets: string;
  avgHold: string;
  supply: string;
}

type TimeRange = 'days' | 'months';

export default function SupplyAgeDistribution() {
  const [timeRange, setTimeRange] = useState<TimeRange>('months');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const monthsData: TimeRangeData[] = [
    { label: '1+ Month', percentage: 85.2, wallets: '3.2k', avgHold: '58d', supply: '85.2%' },
    { label: '3+ Months', percentage: 72.4, wallets: '2.2k', avgHold: '112d', supply: '72.4%' },
    { label: '6+ Months', percentage: 58.6, wallets: '1.5k', avgHold: '201d', supply: '58.6%' },
    { label: '1+ Year', percentage: 32.8, wallets: '845', avgHold: '384d', supply: '32.8%' }
  ];

  const daysData: TimeRangeData[] = [
    { label: '1+ Day', percentage: 92.4, wallets: '4.5k', avgHold: '22h', supply: '92.4%' },
    { label: '3+ Days', percentage: 85.2, wallets: '3.2k', avgHold: '58h', supply: '85.2%' },
    { label: '7+ Days', percentage: 72.4, wallets: '2.2k', avgHold: '112h', supply: '72.4%' },
    { label: '14+ Days', percentage: 58.6, wallets: '1.5k', avgHold: '201h', supply: '58.6%' }
  ];

  const data = timeRange === 'months' ? monthsData : daysData;

  return (
    <div className="bg-[#0B1426] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-medium text-gray-200">Supply Age Distribution</h2>
          <div className="group relative">
            <FiInfo className="w-3.5 h-3.5 text-gray-500 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm rounded-lg text-xs text-gray-300 w-64 hidden group-hover:block z-10 shadow-xl border border-gray-800">
              Analysis of token holding periods showing diamond hand behavior
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="bg-gray-800/50 text-gray-200 text-sm rounded-lg px-3 py-1.5 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="days">Days (New Token)</option>
            <option value="months">Months (Established)</option>
          </select>
        </div>
      </div>

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
                  const data = payload[0].payload as TimeRangeData;
                  return (
                    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 border border-gray-800/50 shadow-xl">
                      <div className="text-sm font-medium text-gray-200 mb-1">{data.label}</div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>Supply: {data.supply}</div>
                        <div>Wallets: {data.wallets}</div>
                        <div>Avg. Hold: {data.avgHold}</div>
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
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {data.map((item) => (
          <div 
            key={item.label}
            className={`p-4 rounded-lg transition-all duration-200 ${
              hoveredBar === item.label
                ? 'bg-blue-500/20 ring-1 ring-blue-500/30'
                : 'bg-gray-800/30 hover:bg-gray-800/50'
            }`}
            onMouseEnter={() => setHoveredBar(item.label)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FiClock className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-200">{item.label}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiDownload className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-400">{item.supply}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Wallets</span>
                <span className="text-sm font-medium text-gray-200">{item.wallets}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Avg Hold</span>
                <span className="text-sm font-medium text-gray-200">{item.avgHold}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 