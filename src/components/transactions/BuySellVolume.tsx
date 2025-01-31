'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface BuySellVolumeProps {
  timeframe: string;
  categories: string[];
}

// Sample data - replace with real API data
const sampleData = [
  { time: '06:00', buyVolume: 15.2, sellVolume: 8.7, netVolume: 6.5 },
  { time: '09:00', buyVolume: 42.5, sellVolume: 12.3, netVolume: 30.2 },
  { time: '12:00', buyVolume: 35.8, sellVolume: 15.6, netVolume: 20.2 },
  { time: '15:00', buyVolume: 38.2, sellVolume: 18.4, netVolume: 19.8 },
  { time: '18:00', buyVolume: 25.1, sellVolume: 10.2, netVolume: 14.9 },
].map(item => ({
  ...item,
  time: new Date(`2024-03-10T${item.time}:00Z`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}));

export default function BuySellVolume({ timeframe, categories }: BuySellVolumeProps) {
  // Calculate totals
  const [totalBuyVolume, totalSellVolume] = sampleData.reduce(
    ([buy, sell], item) => [buy + item.buyVolume, sell + item.sellVolume],
    [0, 0]
  );

  const netVolume = totalBuyVolume - totalSellVolume;
  const netVolumePercentage = ((netVolume / totalBuyVolume) * 100).toFixed(1);

  // Sample transaction counts
  const buyTransactions = 1234;
  const sellTransactions = 987;

  return (
    <div className="h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-sm font-medium text-gray-300">Buy/Sell Volume</h2>
            {categories.length > 0 && (
              <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">
                {categories.length} filters
              </span>
            )}
          </div>
          <div className="text-2xl font-semibold text-gray-200">
            ${(totalBuyVolume + totalSellVolume).toFixed(1)}M
            <span className="ml-2 text-sm font-normal text-gray-400">
              24h volume
            </span>
          </div>
        </div>
        <div className="flex items-start gap-6">
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Net Volume</div>
            <div className={`text-lg font-semibold ${netVolume >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {netVolume >= 0 ? '+' : ''}{netVolume.toFixed(1)}M
            </div>
            <div className={`text-xs ${netVolume >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {netVolumePercentage}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Total Trades</div>
            <div className="text-lg font-semibold text-gray-200">
              {(buyTransactions + sellTransactions).toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">
              {timeframe} period
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Buy Volume Stats */}
        <div className="bg-[#141E2C] rounded-lg p-3 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center">
                <FiArrowUp className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm text-gray-400">Buy Volume</span>
            </div>
            <span className="text-xs text-gray-500">{buyTransactions.toLocaleString()} trades</span>
          </div>
          <div className="text-lg font-semibold text-green-400">
            ${totalBuyVolume.toFixed(1)}M
          </div>
          <div className="text-xs text-green-400">
            {((totalBuyVolume / (totalBuyVolume + totalSellVolume)) * 100).toFixed(1)}% of total
          </div>
        </div>

        {/* Sell Volume Stats */}
        <div className="bg-[#141E2C] rounded-lg p-3 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center">
                <FiArrowDown className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-sm text-gray-400">Sell Volume</span>
            </div>
            <span className="text-xs text-gray-500">{sellTransactions.toLocaleString()} trades</span>
          </div>
          <div className="text-lg font-semibold text-red-400">
            ${totalSellVolume.toFixed(1)}M
          </div>
          <div className="text-xs text-red-400">
            {((totalSellVolume / (totalBuyVolume + totalSellVolume)) * 100).toFixed(1)}% of total
          </div>
        </div>
      </div>

      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData} barGap={0} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickMargin={8}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickFormatter={(value) => `$${value}M`}
              tickMargin={8}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1B2838',
                border: '1px solid #374151',
                borderRadius: '4px',
                color: '#E5E7EB',
                padding: '8px 12px',
                fontSize: '12px'
              }}
              formatter={(value: number, name: string) => [
                `$${value.toFixed(1)}M`,
                name === 'buyVolume' ? 'Buy Volume' : 'Sell Volume'
              ]}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Bar 
              dataKey="buyVolume" 
              fill="#059669" 
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            />
            <Bar 
              dataKey="sellVolume" 
              fill="#DC2626" 
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 