'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiArrowUp, FiArrowDown, FiInfo } from 'react-icons/fi';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  subValue?: string;
  icon: React.ReactNode;
}

// Generate sample data for the chart
const generateChartData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: 1.5 + Math.random() * 0.5,
    stPosition: 80 + Math.random() * 40,
    ltPosition: 120 + Math.random() * 60
  }));
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, subValue, icon }) => (
  <div className="bg-[#141E2C] rounded-lg p-3 border border-gray-800">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-gray-400">{title}</span>
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <div className="text-lg font-semibold text-gray-200">{value}</div>
      <div className={`text-xs ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </div>
    </div>
    {subValue && (
      <div className="text-xs text-gray-500 mt-1">{subValue}</div>
    )}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg p-3 shadow-xl">
        <p className="text-xs font-medium text-gray-400 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-300">
                {entry.dataKey === 'stPosition' ? 'Short-term Position' :
                 entry.dataKey === 'ltPosition' ? 'Long-term Position' :
                 'Price'}
              </span>
            </div>
            <span className="text-gray-200 font-medium">
              {entry.dataKey === 'price' ? '$' : ''}{entry.value.toFixed(2)}
              {entry.dataKey !== 'price' ? '%' : ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function UnrealizedPnLAnalysis() {
  const [timeRange, setTimeRange] = useState('7D');
  const chartData = generateChartData();

  return (
    <div className="bg-[#0B1221] rounded-lg p-4 border border-gray-800/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-gray-300">Unrealized PnL Analysis</h2>
          <div className="group relative">
            <FiInfo className="w-3.5 h-3.5 text-gray-500 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm rounded-lg text-xs text-gray-300 w-64 hidden group-hover:block z-10 shadow-xl border border-gray-800">
              Analysis of unrealized profits/losses for different holder groups
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {['24H', '7D', '30D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm ${
                timeRange === range
                  ? 'bg-[#2D4263] text-blue-400'
                  : 'bg-[#1B2838] text-gray-400 hover:bg-[#2D4263]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="ST Holders Cost Basis"
          value="$1.42"
          change={-24.6}
          subValue="68% of holders"
          icon={<FiArrowDown className="w-4 h-4 text-red-400" />}
        />
        <MetricCard
          title="LT Holders Cost Basis"
          value="$0.95"
          change={-3.8}
          subValue="82% of holders"
          icon={<FiArrowUp className="w-4 h-4 text-green-400" />}
        />
        <MetricCard
          title="ST Unrealized Position"
          value="100.4%"
          change={2.5}
          subValue="5.2 days avg hold"
          icon={<FiArrowUp className="w-4 h-4 text-green-400" />}
        />
        <MetricCard
          title="LT Unrealized Position"
          value="510.2%"
          change={8.3}
          subValue="47.5 days avg hold"
          icon={<FiArrowUp className="w-4 h-4 text-green-400" />}
        />
      </div>

      <div className="relative h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="stGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ltGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="stPosition"
              stroke="#10B981"
              fill="url(#stGradient)"
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="ltPosition"
              stroke="#3B82F6"
              fill="url(#ltGradient)"
              strokeWidth={2}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="price"
              stroke="#8B5CF6"
              fill="none"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-[#141E2C] rounded-lg p-4 border border-gray-800">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Short-term Holder Insights</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Unrealized Profits</span>
              <span className="text-sm text-green-400">+100.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Avg. Hold Time</span>
              <span className="text-sm text-gray-300">5.2 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Profit Taking Level</span>
              <span className="text-sm text-orange-400">High</span>
            </div>
          </div>
        </div>

        <div className="bg-[#141E2C] rounded-lg p-4 border border-gray-800">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Long-term Holder Insights</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Unrealized Profits</span>
              <span className="text-sm text-green-400">+510.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Avg. Hold Time</span>
              <span className="text-sm text-gray-300">47.5 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Profit Taking Level</span>
              <span className="text-sm text-green-400">Moderate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
