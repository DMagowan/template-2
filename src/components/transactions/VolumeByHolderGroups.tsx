'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const holderGroups = [
  { key: 'longTermHolders', name: 'Long-term Holders', color: '#10B981' },
  { key: 'shortTermHolders', name: 'Short-term Holders', color: '#3B82F6' },
  { key: 'snipers', name: 'Snipers', color: '#F59E0B' },
  { key: 'tokenSpecialists', name: 'Token Specialists', color: '#8B5CF6' },
  { key: 'funds', name: 'Funds', color: '#EC4899' },
  { key: 'smartMoney', name: 'Smart Money', color: '#6366F1' },
  { key: 'publicFigures', name: 'Public Figures', color: '#14B8A6' },
  { key: 'whales', name: 'Whales', color: '#F97316' },
  { key: 'minows', name: 'Minows', color: '#A855F7' },
  { key: 'dex', name: 'DEX', color: '#06B6D4' },
  { key: 'socialLabels', name: 'Social Labels', color: '#D946EF' },
  { key: 'rest', name: 'Rest', color: '#64748B' },
] as const;

type HolderGroup = typeof holderGroups[number]['key'];

interface DataPoint {
  timestamp: string;
  [key: string]: string | number;
}

const generateSampleData = (count: number): DataPoint[] => {
  return Array.from({ length: count }, (_, i) => {
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - i);
    
    const baseData: DataPoint = {
      timestamp: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    holderGroups.forEach((group) => {
      baseData[group.key] = Math.floor(Math.random() * 1000000);
    });

    return baseData;
  }).reverse();
};

const timeRangeOptions = [
  { label: '1H', value: 60, dataPoints: 12 },
  { label: '24H', value: 24 * 60, dataPoints: 24 },
  { label: '7D', value: 7 * 24 * 60, dataPoints: 28 },
];

export default function VolumeByHolderGroups() {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRangeOptions[1]);
  const [data] = useState(() => generateSampleData(selectedTimeRange.dataPoints));

  const formatValue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <div className="h-[500px] w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-200">Volume by Holder Groups</h2>
        <div className="flex gap-1">
          {timeRangeOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setSelectedTimeRange(option)}
              className={`px-3 py-1 rounded text-sm ${
                selectedTimeRange.label === option.label
                  ? 'bg-[#2D4263] text-blue-400'
                  : 'bg-[#1B2838] text-gray-400 hover:bg-[#2D4263]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="timestamp" 
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF' }}
              tickFormatter={formatValue}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1B2838',
                border: '1px solid #374151',
                borderRadius: '4px',
                color: '#E5E7EB'
              }}
              formatter={(value: number) => formatValue(value)}
            />
            <Legend 
              verticalAlign="bottom" 
              height={60}
              wrapperStyle={{ color: '#9CA3AF' }}
            />
            {holderGroups.map((group) => (
              <Bar
                key={group.key}
                dataKey={group.key}
                name={group.name}
                stackId="a"
                fill={group.color}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 

