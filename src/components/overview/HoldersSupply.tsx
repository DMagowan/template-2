'use client';

import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiLock, FiUnlock, FiCalendar } from 'react-icons/fi';

interface HoldersSupplyProps {
  data: {
    holders: {
      value: number;
      change: number;
      isPositive: boolean;
    };
    supply: {
      circulating: {
        value: number;
        percentage: number;
        change: number;
      };
      unlockStatus: {
        current: number;
        locked: number;
      };
      nextUnlock: {
        date: string;
        percentage: number;
      };
    };
    distribution: {
      top10: number;
      top50: number;
      top100: number;
      retail: number;
    };
    concentration: {
      gini: number;
      status: 'Low' | 'Medium' | 'High';
      context: string;
    };
  };
}

export default function HoldersSupply({ data }: HoldersSupplyProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const getConcentrationColor = (status: string) => {
    switch (status) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Holders Overview */}
      <div className="bg-[#0B1221] rounded-lg p-4">
        <h2 className="text-sm font-medium text-gray-300 mb-4">Holders Overview</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Total Holders</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-medium text-gray-200">
                  {formatNumber(data.holders.value)}
                </span>
                <div className={data.holders.isPositive ? 'text-green-400' : 'text-red-400'}>
                  {data.holders.isPositive ? <FiTrendingUp className="w-4 h-4" /> : <FiTrendingDown className="w-4 h-4" />}
                  <span className="text-xs ml-1">{data.holders.change}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Top 10 Holders</span>
                  <span>{data.distribution.top10}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-400 rounded-full"
                    style={{ width: `${data.distribution.top10}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Top 50 Holders</span>
                  <span>{data.distribution.top50}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-400 rounded-full"
                    style={{ width: `${data.distribution.top50}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Top 100 Holders</span>
                  <span>{data.distribution.top100}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-400 rounded-full"
                    style={{ width: `${data.distribution.top100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Retail Holders</span>
                  <span>{data.distribution.retail}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: `${data.distribution.retail}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Concentration Score</span>
              <span className={`text-sm font-medium ${getConcentrationColor(data.concentration.status)}`}>
                {data.concentration.status}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {data.concentration.context}
            </div>
          </div>
        </div>
      </div>

      {/* Supply Distribution */}
      <div className="bg-[#0B1221] rounded-lg p-4">
        <h2 className="text-sm font-medium text-gray-300 mb-4">Supply Distribution</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Circulating Supply</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-medium text-gray-200">
                  {formatNumber(data.supply.circulating.value)}
                </span>
                <span className="text-green-400 text-xs">
                  +{data.supply.circulating.change}%
                </span>
              </div>
            </div>

            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-400 rounded-full"
                style={{ width: `${data.supply.circulating.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
              <span>{data.supply.circulating.percentage}% Circulating</span>
              <span>{100 - data.supply.circulating.percentage}% Reserved</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Unlock Status</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <FiLock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-200">{data.supply.unlockStatus.locked}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiUnlock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-200">{data.supply.unlockStatus.current}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Next Unlock</span>
                </div>
                <span className="text-sm text-gray-200">{data.supply.nextUnlock.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-400 rounded-full"
                    style={{ width: `${data.supply.nextUnlock.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-orange-400">{data.supply.nextUnlock.percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 