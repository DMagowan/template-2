'use client';

import React, { useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiAlertCircle, FiClock, FiChevronDown } from 'react-icons/fi';

interface FlowData {
  value: number;
  count: number | null;
  isPositive: boolean;
  benchmark: {
    percentile: number; // 0-100
    status: 'low' | 'normal' | 'high' | 'exceptional';
    context: string;
  };
}

interface FlowIntelligenceProps {
  marketCap: number;
  flows: {
    smartMoney: FlowData;
    exchange: FlowData;
    topPNL: FlowData;
    publicFigures: FlowData;
    whales: FlowData;
    freshWallets: FlowData;
  };
}

type TimeFilter = '1h' | '4h' | '6h' | '24h' | '7d' | '30d';

export default function FlowIntelligence({ marketCap, flows }: FlowIntelligenceProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('24h');
  const [showTimeFilter, setShowTimeFilter] = useState(false);

  const timeFilters: TimeFilter[] = ['1h', '4h', '6h', '24h', '7d', '30d'];

  // Sample data - in production, this would come from your API
  const sampleFlows = {
    smartMoney: {
      value: 318.2,
      count: 1245,
      isPositive: true,
      benchmark: {
        percentile: 92,
        status: 'exceptional',
        context: 'Outperforming 92% of tokens in similar market cap range ($1B-2B). Smart money inflow significantly higher than usual.'
      }
    },
    exchange: {
      value: 18.2,
      count: null,
      isPositive: false,
      benchmark: {
        percentile: 25,
        status: 'low',
        context: 'Exchange outflow in bottom 25% compared to tokens with similar market cap ($1B-2B). May indicate reduced selling pressure.'
      }
    },
    topPNL: {
      value: 234.2,
      count: 263,
      isPositive: true,
      benchmark: {
        percentile: 78,
        status: 'high',
        context: 'Top traders accumulation exceeds 78% of comparable market cap tokens ($1B-2B). Strong confidence signal.'
      }
    },
    publicFigures: {
      value: 128.2,
      count: 869,
      isPositive: true,
      benchmark: {
        percentile: 88,
        status: 'high',
        context: 'Influencer activity in top 12% among tokens with similar market cap ($1B-2B). Notable increase in public interest.'
      }
    },
    whales: {
      value: 148.2,
      count: 1122,
      isPositive: false,
      benchmark: {
        percentile: 65,
        status: 'normal',
        context: 'Whale activity aligned with median levels for tokens in $1B-2B market cap range. No unusual movements detected.'
      }
    },
    freshWallets: {
      value: 181.2,
      count: 693,
      isPositive: true,
      benchmark: {
        percentile: 25,
        status: 'low',
        context: 'Low fresh wallet creation rate (bottom 25%) compared to tokens in similar market cap range ($1B-2B). Indicates genuine user interest rather than artificial growth.'
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceptional': return 'text-purple-400';
      case 'high': return 'text-green-400';
      case 'normal': return 'text-gray-400';
      case 'low': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'exceptional': return 'bg-purple-400/10';
      case 'high': return 'bg-green-400/10';
      case 'normal': return 'bg-gray-400/10';
      case 'low': return 'bg-orange-400/10';
      default: return 'bg-gray-400/10';
    }
  };

  const formatValue = (value: number) => {
    return `$${value.toFixed(1)}k`;
  };

  const formatKey = (key: string) => {
    // First, split by capital letters and join with space
    const withSpaces = key.replace(/([A-Z])/g, ' $1').trim();
    // Then capitalize each word
    return withSpaces.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-[#0B1221] rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-medium text-gray-300">Flow Intelligence</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowTimeFilter(!showTimeFilter)}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 bg-gray-800/50 rounded"
          >
            <FiClock className="w-3 h-3" />
            {timeFilter}
            <FiChevronDown className="w-3 h-3" />
          </button>
          
          {showTimeFilter && (
            <div className="absolute right-0 top-full mt-1 bg-gray-800 rounded shadow-lg z-20">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-700 ${
                    filter === timeFilter ? 'text-gray-200' : 'text-gray-400'
                  }`}
                  onClick={() => {
                    setTimeFilter(filter);
                    setShowTimeFilter(false);
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Object.entries(sampleFlows).map(([key, flow]) => (
          <div 
            key={key}
            className="p-2 rounded bg-gray-800/30 hover:bg-gray-800/50 transition-colors relative"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-gray-400 font-medium">
                {formatKey(key)}
              </span>
              <div 
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${getStatusBg(flow.benchmark.status)} ${getStatusColor(flow.benchmark.status)}`}
              >
                {flow.benchmark.status}
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-200">
                    {formatValue(flow.value)}
                  </span>
                  <div className={flow.isPositive ? 'text-green-400' : 'text-red-400'}>
                    {flow.isPositive ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                  </div>
                </div>
                {flow.count && (
                  <div className="text-[10px] text-gray-500">
                    {flow.count.toLocaleString()} {flow.count === 1 ? 'wallet' : 'wallets'}
                  </div>
                )}
              </div>

              <div className="relative group">
                <FiAlertCircle className="w-3 h-3 text-gray-500 hover:text-gray-300 transition-colors cursor-help" />
                <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-800 text-[11px] text-gray-300 rounded px-3 py-2 shadow-lg min-w-[280px] leading-relaxed whitespace-normal">
                    {flow.benchmark.context}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-1.5 h-0.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  flow.benchmark.status === 'exceptional' ? 'bg-purple-400' :
                  flow.benchmark.status === 'high' ? 'bg-green-400' :
                  flow.benchmark.status === 'low' ? 'bg-orange-400' :
                  'bg-gray-400'
                }`}
                style={{ width: `${flow.benchmark.percentile}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
