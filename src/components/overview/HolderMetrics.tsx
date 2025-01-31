'use client';

import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiAlertCircle, FiUsers, FiUserCheck, FiShield } from 'react-icons/fi';

interface TimeframeGrowth {
  value: number;
  percentage: number;
  isPositive: boolean;
}

interface HolderMetricsProps {
  data: {
    growth: {
      '24h': TimeframeGrowth;
      '7d': TimeframeGrowth;
      '30d': TimeframeGrowth;
    };
    medianHolderRank: {
      value: number;
      percentile: number;
      context: string;
    };
    hhi: {
      value: number;
      percentile: number;
      context: string;
    };
    freshWallets: {
      percentage: number;
      count: number;
      context: string;
      risk: 'Low' | 'Medium' | 'High';
    };
    top100Supply: {
      percentage: number;
      value: number;
      context: string;
    };
    institutionalHolders: {
      smartMoney: {
        count: number;
        value: number;
        percentage: number;
      };
      funds: {
        count: number;
        value: number;
        percentage: number;
      };
      publicFigures: {
        count: number;
        value: number;
        percentage: number;
      };
    };
  };
}

export default function HolderMetrics({ data }: HolderMetricsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toFixed(2);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-[#0B1221] rounded-lg p-4">
      <h2 className="text-sm font-medium text-gray-300 mb-4">Holder Analysis</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* Growth Metrics */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-gray-400 mb-2">Holder Growth</h3>
          {Object.entries(data.growth).map(([timeframe, growth]) => (
            <div key={timeframe} className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{timeframe}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-gray-200">
                  {formatNumber(growth.value)}
                </span>
                <div className={growth.isPositive ? 'text-green-400' : 'text-red-400'}>
                  {growth.isPositive ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                  <span className="text-xs ml-1">{growth.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Distribution Metrics */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Median Holder Rank</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-200">{data.medianHolderRank.value}</span>
                <span className="text-xs text-green-400">P{data.medianHolderRank.percentile}</span>
              </div>
            </div>
            <div className="text-[10px] text-gray-500">{data.medianHolderRank.context}</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">HHI Score</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-200">{data.hhi.value}</span>
                <span className="text-xs text-green-400">P{data.hhi.percentile}</span>
              </div>
            </div>
            <div className="text-[10px] text-gray-500">{data.hhi.context}</div>
          </div>
        </div>

        {/* Fresh Wallets & Top 100 */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Fresh Wallets</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-200">{data.freshWallets.percentage}%</span>
                <span className={`text-xs ${getRiskColor(data.freshWallets.risk)}`}>
                  {data.freshWallets.risk} Risk
                </span>
              </div>
            </div>
            <div className="text-[10px] text-gray-500">{data.freshWallets.context}</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Top 100 Supply</span>
              <span className="text-sm font-medium text-gray-200">{data.top100Supply.percentage}%</span>
            </div>
            <div className="text-[10px] text-gray-500">{data.top100Supply.context}</div>
          </div>
        </div>
      </div>

      {/* Institutional Holders */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <h3 className="text-xs font-medium text-gray-400 mb-3">Institutional Holders</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <FiShield className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-gray-300">Smart Money</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Holders</span>
                <span className="text-sm font-medium text-gray-200">
                  {formatNumber(data.institutionalHolders.smartMoney.count)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Value</span>
                <span className="text-sm font-medium text-gray-200">
                  ${formatNumber(data.institutionalHolders.smartMoney.value)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">% of Supply</span>
                <span className="text-sm font-medium text-blue-400">
                  {data.institutionalHolders.smartMoney.percentage}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <FiUsers className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-gray-300">Funds</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Holders</span>
                <span className="text-sm font-medium text-gray-200">
                  {formatNumber(data.institutionalHolders.funds.count)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Value</span>
                <span className="text-sm font-medium text-gray-200">
                  ${formatNumber(data.institutionalHolders.funds.value)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">% of Supply</span>
                <span className="text-sm font-medium text-purple-400">
                  {data.institutionalHolders.funds.percentage}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <FiUserCheck className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-gray-300">Public Figures</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Holders</span>
                <span className="text-sm font-medium text-gray-200">
                  {formatNumber(data.institutionalHolders.publicFigures.count)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Value</span>
                <span className="text-sm font-medium text-gray-200">
                  ${formatNumber(data.institutionalHolders.publicFigures.value)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">% of Supply</span>
                <span className="text-sm font-medium text-green-400">
                  {data.institutionalHolders.publicFigures.percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 