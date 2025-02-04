'use client';

import React, { useState } from 'react';
import { FiInfo, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface SparklineData {
  value: number;
  date: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  status: 'Good' | 'Warning' | 'Average';
  sparklineData: SparklineData[];
  subtitle?: string;
  info?: string;
}

interface TimeFilterProps {
  selected: string;
  onChange: (value: string) => void;
}

interface MetricRowProps {
  title: string;
  value: string;
  change: number;
  info: string;
  count?: number;
}

interface Holder {
  name: string;
  ownership: number;
  balance: string;
  change24h: number;
  change7d: number;
  change30d: number;
  received: string;
  sent: string;
}

const generateSparklineData = (trend: 'up' | 'down' | 'flat' = 'flat'): SparklineData[] => {
  const data: SparklineData[] = [];
  const points = 20;
  let baseValue = 50;

  for (let i = 0; i < points; i++) {
    if (trend === 'up') {
      baseValue += Math.random() * 4 - 1;
    } else if (trend === 'down') {
      baseValue -= Math.random() * 4 - 1;
    } else {
      baseValue += Math.random() * 4 - 2;
    }
    data.push({
      date: `2024-01-${i + 1}`,
      value: Math.max(0, Math.min(100, baseValue))
    });
  }
  return data;
};

const MetricCard = ({ title, value, change, status, sparklineData, subtitle, info }: MetricCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'text-green-400';
      case 'Warning':
        return 'text-red-400';
      case 'Average':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSparklineColor = (status: string) => {
    switch (status) {
      case 'Good':
        return '#4ADE80';
      case 'Warning':
        return '#F87171';
      case 'Average':
        return '#FBBF24';
      default:
        return '#9CA3AF';
    }
  };

  return (
    <div className="bg-[#0B1221] rounded-lg p-3">
      <div className="flex items-start gap-3">
        <div className="flex-grow">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs text-gray-400">{title}</span>
            {info && (
              <div className="group relative">
                <FiInfo className="w-3 h-3 text-gray-500 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 rounded text-[10px] text-gray-300 w-40 hidden group-hover:block z-10">
                  {info}
                </div>
              </div>
            )}
            <div className={`text-[10px] px-1.5 py-0.5 rounded-full ${getStatusColor(status)} bg-opacity-10`}>
              {status}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gray-200">{value}</span>
            <div className="flex items-center text-xs">
              {change >= 0 ? (
                <FiTrendingUp className="w-3 h-3 text-green-400" />
              ) : (
                <FiTrendingDown className="w-3 h-3 text-red-400" />
              )}
              <span className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
            </div>
          </div>
          {subtitle && (
            <div className="text-[10px] text-gray-500 mt-0.5">{subtitle}</div>
          )}
        </div>
        <div className="w-16 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`sparkline-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getSparklineColor(status)} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={getSparklineColor(status)} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={getSparklineColor(status)}
                fill={`url(#sparkline-${title})`}
                strokeWidth={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const MetricRow: React.FC<MetricRowProps> = ({ title, value, change, info, count }) => {
  return (
    <div className="flex items-center justify-between py-2 group">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-300">{title}</span>
        <div className="relative">
          <FiInfo className="w-3.5 h-3.5 text-gray-500 cursor-help opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm rounded-lg text-xs text-gray-300 w-64 hidden group-hover:block z-10 shadow-xl border border-gray-800">
            {info}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {count !== undefined && (
          <span className="text-xs text-gray-400">({count})</span>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-200">{value}</span>
          <div className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
            <span className="text-xs">
              {change >= 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800/50">
    <h3 className="text-sm font-semibold text-gray-200 tracking-wide">{title}</h3>
  </div>
);

const TimeFilter: React.FC<TimeFilterProps> = ({ selected, onChange }) => {
  return (
    <div className="flex items-center gap-1">
      {['24H', '7D', '30D'].map((period) => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={`px-2 py-1 text-xs rounded ${
            selected === period
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

const WalletValueFilter = ({ selected, onChange }: { selected: string; onChange: (value: string) => void }) => {
  const filters = ['ALL', '< $1k', '$1k-$10k', '> $10k'];
  return (
    <div className="flex items-center gap-1 bg-gray-900/50 rounded-lg p-0.5">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
            selected === filter
              ? 'bg-gray-800 text-gray-200'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const HolderGrowthChart: React.FC = () => {
  const [timeFilter, setTimeFilter] = React.useState('24H');
  const [walletFilter, setWalletFilter] = React.useState('ALL');
  
  const data = [
    { date: 'Jan 2024', less_than_1k: 20000, holding_1k_to_10k: 8000, holding_more_than_10k: 5000 },
    { date: 'Feb 2024', less_than_1k: 21000, holding_1k_to_10k: 8500, holding_more_than_10k: 5200 },
    { date: 'Mar 2024', less_than_1k: 25000, holding_1k_to_10k: 9000, holding_more_than_10k: 5500 },
    { date: 'Apr 2024', less_than_1k: 28000, holding_1k_to_10k: 10000, holding_more_than_10k: 6000 },
    { date: 'May 2024', less_than_1k: 30000, holding_1k_to_10k: 11000, holding_more_than_10k: 6500 },
    { date: 'Jun 2024', less_than_1k: 32000, holding_1k_to_10k: 12000, holding_more_than_10k: 7000 },
  ];

  return (
    <div className="bg-[#0B1221] rounded-lg p-4 border border-gray-800/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-200 tracking-wide">Holder Growth</h3>
        <div className="flex items-center gap-2">
          <WalletValueFilter selected={walletFilter} onChange={setWalletFilter} />
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">24H</span>
              <div className="flex items-center gap-1">
                <FiTrendingUp className="w-3 h-3 text-green-400/90" />
                <span className="text-sm font-medium text-green-400/90">+2.8%</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500">+168 holders</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">7D</span>
              <div className="flex items-center gap-1">
                <FiTrendingUp className="w-3 h-3 text-green-400/90" />
                <span className="text-sm font-medium text-green-400/90">+12.4%</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500">+892 holders</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">30D</span>
              <div className="flex items-center gap-1">
                <FiTrendingUp className="w-3 h-3 text-green-400/90" />
                <span className="text-sm font-medium text-green-400/90">+45.2%</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500">+3,847 holders</span>
          </div>
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} stackOffset="expand" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
              dy={8}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              dx={-8}
            />
            <Bar
              dataKey="less_than_1k"
              stackId="a"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              name="< $1k"
            />
            <Bar
              dataKey="holding_1k_to_10k"
              stackId="a"
              fill="#10B981"
              name="$1k - $10k"
            />
            <Bar
              dataKey="holding_more_than_10k"
              stackId="a"
              fill="#F59E0B"
              name="> $10k"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#3B82F6] bg-opacity-90"></div>
          <span className="text-gray-400">{'< $1k'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#10B981] bg-opacity-90"></div>
          <span className="text-gray-400">$1k - $10k</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#F59E0B] bg-opacity-90"></div>
          <span className="text-gray-400">{'> $10k'}</span>
        </div>
      </div>
    </div>
  );
};

const DecentralizationMetrics: React.FC = () => {
  const [timeFilter, setTimeFilter] = React.useState('24H');
  const metrics = [
    { title: 'Median Holder', value: '118', change: -58, info: 'Indicates the typical holding duration of token holders. Lower values suggest more active trading.' },
    { title: 'HHI', value: '43', change: 20, info: 'Herfindahl-Hirschman Index - Measures token concentration. Lower values indicate better decentralization.' },
    { title: 'Top 100 Holders', value: '8.0%', change: 3.0, info: 'Percentage of supply held by top 100 wallets. Lower values suggest better distribution.' },
    { title: 'Fresh Wallets', value: '68%', change: -2, info: 'Percentage of holders that are new wallets in the last 30 days.' }
  ];

  return (
    <div className="bg-[#0B1221] rounded-lg p-4 border border-gray-800/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-200 tracking-wide">Decentralization Metrics</h3>
        <TimeFilter selected={timeFilter} onChange={setTimeFilter} />
      </div>
      <div className="space-y-1">
        {metrics.map((metric) => (
          <MetricRow key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

const SignificantHolders: React.FC = () => {
  const [timeFilter, setTimeFilter] = React.useState('24H');
  const holders = [
    { title: 'Smart Money', value: '12.5%', change: 3.2, count: 28, info: 'Wallets identified as sophisticated investors with consistent profitable trades.' },
    { title: 'Public Figures', value: '8.3%', change: -0.7, count: 15, info: 'Known individuals or entities in the crypto space.' },
    { title: 'Whales', value: '25.4%', change: 1.8, count: 35, info: 'Wallets holding more than $100k worth of tokens.' },
    { title: 'Top PnL Traders', value: '15.2%', change: 4.5, count: 23, info: 'Most profitable traders in the last 30 days.' }
  ];

  return (
    <div className="bg-[#0B1221] rounded-lg p-4 border border-gray-800/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-200 tracking-wide">Significant Holders</h3>
        <TimeFilter selected={timeFilter} onChange={setTimeFilter} />
      </div>
      <div className="space-y-1">
        {holders.map((holder) => (
          <MetricRow 
            key={holder.title} 
            title={holder.title} 
            value={holder.value} 
            change={holder.change} 
            info={holder.info}
            count={holder.count}
          />
        ))}
      </div>
    </div>
  );
};

const TokenHolderList: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filterCategories = [
    {
      title: 'Smart Segment',
      options: [
        { label: 'Smart Traders', count: 4 },
        { label: 'Chain Specialist', count: 11 },
        { label: 'Sector Expert', count: 5 },
        { label: 'Other', count: 2 },
        { label: 'Funds', count: 1 }
      ]
    },
    {
      title: 'Label',
      options: [
        { label: 'Exchange', count: 3 },
        { label: 'DEX', count: 5 },
        { label: 'Protocol', count: 8 },
        { label: 'Whale', count: 12 }
      ]
    },
    {
      title: 'Balance',
      options: [
        { label: '> $100k', count: 15 },
        { label: '$10k - $100k', count: 45 },
        { label: '$1k - $10k', count: 120 },
        { label: '< $1k', count: 450 }
      ]
    }
  ];

  const holders: Holder[] = [
    {
      name: 'Raydium: SOL-JELLYJELLY LP',
      ownership: 2.15,
      balance: '21,528,115',
      change24h: 8944369,
      change7d: 21528115,
      change30d: 21528115,
      received: '730,093,735',
      sent: '708,565,620'
    },
    {
      name: 'JellyJelly Token Deployer',
      ownership: 1.80,
      balance: '18,037,076',
      change24h: 22189,
      change7d: 18037076,
      change30d: 18037076,
      received: '18,037,076',
      sent: '0'
    },
    {
      name: 'VINE Whale',
      ownership: 1.15,
      balance: '11,031,518',
      change24h: 8322924,
      change7d: 11031518,
      change30d: 11031518,
      received: '11,033,000',
      sent: '1,482'
    },
    {
      name: 'MEXC: Wallet',
      ownership: 0.92,
      balance: '9,195,050',
      change24h: 4808687,
      change7d: 9195050,
      change30d: 9195050,
      received: '10,589,068',
      sent: '1,394,018'
    },
    {
      name: 'Wintermute Market Making',
      ownership: 0.83,
      balance: '8,268,859',
      change24h: 8268859,
      change7d: 8268859,
      change30d: 8268859,
      received: '11,954,141',
      sent: '3,685,282'
    }
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="bg-[#0B1221] rounded-lg p-4 border border-gray-800/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold text-gray-200 tracking-wide">Token Holders</h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="text-xs px-3 py-1.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <span>Filter</span>
            {selectedFilters.length > 0 && (
              <span className="bg-blue-500/20 text-blue-400 px-1.5 rounded-full">
                {selectedFilters.length}
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs px-3 py-1.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800/50">
          <div className="grid grid-cols-3 gap-8">
            {filterCategories.map((category) => (
              <div key={category.title}>
                <h4 className="text-xs font-medium text-gray-400 mb-2">{category.title}</h4>
                <div className="space-y-1">
                  {category.options.map((option) => (
                    <label 
                      key={option.label} 
                      className="flex items-center justify-between group cursor-pointer py-1 px-2 rounded hover:bg-gray-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(option.label)}
                          onChange={() => toggleFilter(option.label)}
                          className="form-checkbox h-3 w-3 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-300">{option.label}</span>
                      </div>
                      <span className="text-xs text-gray-500">({option.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800/50">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {selectedFilters.length} filters selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedFilters([])}
                className="text-xs px-3 py-1.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Clear All
              </button>
              <button 
                className="text-xs px-3 py-1.5 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-800/30">
              <th className="text-left font-medium py-2">Holder</th>
              <th className="text-right font-medium py-2">Ownership</th>
              <th className="text-right font-medium py-2">Balance</th>
              <th className="text-right font-medium py-2">24h Change</th>
              <th className="text-right font-medium py-2">7d Change</th>
              <th className="text-right font-medium py-2">30d Change</th>
              <th className="text-right font-medium py-2">Total Received</th>
              <th className="text-right font-medium py-2">Total Sent</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((holder) => (
              <tr 
                key={holder.name}
                className="border-b border-gray-800/30 last:border-0 hover:bg-gray-800/20 transition-colors"
              >
                <td className="py-3 text-sm text-gray-300">{holder.name}</td>
                <td className="py-3 text-sm text-gray-300 text-right">{holder.ownership.toFixed(2)}%</td>
                <td className="py-3 text-sm text-gray-300 text-right">{holder.balance}</td>
                <td className="py-3 text-sm text-right">
                  <span className={holder.change24h >= 0 ? 'text-green-400/90' : 'text-red-400/90'}>
                    {holder.change24h >= 0 ? '+' : ''}{holder.change24h.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 text-sm text-right">
                  <span className={holder.change7d >= 0 ? 'text-green-400/90' : 'text-red-400/90'}>
                    {holder.change7d >= 0 ? '+' : ''}{holder.change7d.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 text-sm text-right">
                  <span className={holder.change30d >= 0 ? 'text-green-400/90' : 'text-red-400/90'}>
                    {holder.change30d >= 0 ? '+' : ''}{holder.change30d.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-300 text-right">{holder.received}</td>
                <td className="py-3 text-sm text-gray-300 text-right">{holder.sent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HolderSummaryGrid: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <HolderGrowthChart />
        <DecentralizationMetrics />
        <SignificantHolders />
      </div>
      <TokenHolderList />
    </div>
  );
};

export default HolderSummaryGrid; 
