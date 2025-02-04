'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiInfo, FiTrendingUp, FiTrendingDown, FiMaximize2, FiLoader } from 'react-icons/fi';
import { useFilters } from '@/contexts/FilterContext';

interface HolderCategory {
  id: string;
  name: string;
  subcategories?: HolderCategory[];
  color?: string;
  description?: string;
  change24h?: number;
}

const holderCategories: HolderCategory[] = [
  {
    id: 'influential',
    name: 'Influential Wallets',
    subcategories: [
      {
        id: 'smart_money',
        name: 'Smart Money',
        color: '#34D399',
        description: 'Sophisticated investors with consistent profitable trades. Often early adopters with strong market influence.',
        change24h: 0.8
      },
      {
        id: 'top_pnl',
        name: 'Top 100 PnL Traders',
        color: '#10B981',
        description: 'Most successful traders by profit and loss metrics.',
        change24h: 1.2
      },
      {
        id: 'public_figures',
        name: 'Public Figures',
        color: '#3B82F6',
        description: 'Known individuals or entities in the crypto space.',
        change24h: -0.5
      },
      {
        id: 'whales',
        name: 'Whales',
        color: '#6366F1',
        description: 'Wallets holding more than 1% of total supply. Can significantly impact token price.',
        change24h: 0.2
      },
      {
        id: 'funds',
        name: 'Funds',
        color: '#8B5CF6',
        description: 'Investment funds and institutional investors.',
        change24h: 1.5
      }
    ]
  },
  {
    id: 'trading_styles',
    name: 'Trading Styles',
    subcategories: [
      {
        id: 'new_token_specialists',
        name: 'New Token Specialists',
        color: '#EC4899',
        description: 'Traders who frequently participate in new token launches.',
        change24h: 2.1
      },
      {
        id: 'snipers',
        name: 'Snipers',
        color: '#F43F5E',
        description: 'Quick entry and exit traders looking for short-term opportunities.',
        change24h: -1.8
      },
      {
        id: 'short_term',
        name: 'Short-term holders',
        color: '#F97316',
        description: 'Holders who have held tokens for 30-180 days.',
        change24h: -1.2
      },
      {
        id: 'long_term',
        name: 'Long-term holders',
        color: '#EAB308',
        description: 'Holders who have held tokens for more than 180 days.',
        change24h: 2.3
      }
    ]
  },
  {
    id: 'exchanges',
    name: 'Exchanges',
    subcategories: [
      {
        id: 'dex',
        name: 'DEX',
        color: '#14B8A6',
        description: 'Decentralized exchange liquidity pools.',
        change24h: -0.3
      },
      {
        id: 'cex',
        name: 'CEX',
        color: '#06B6D4',
        description: 'Centralized exchange wallets.',
        change24h: 0.5
      }
    ]
  },
  {
    id: 'staking',
    name: 'Staking Pools',
    subcategories: [
      {
        id: 'staking_pools',
        name: 'Staking Pools',
        color: '#A78BFA',
        description: 'Locked tokens in staking contracts.',
        change24h: 1.4
      }
    ]
  },
  {
    id: 'bridges',
    name: 'Bridges',
    subcategories: [
      {
        id: 'bridges',
        name: 'Bridges',
        color: '#2DD4BF',
        description: 'Cross-chain bridge contracts and related wallets.',
        change24h: 0.3
      }
    ]
  },
  {
    id: 'wallet_sizes',
    name: 'Wallet Sizes',
    subcategories: [
      {
        id: 'less_than_1k',
        name: 'Less than $1k',
        color: '#94A3B8',
        description: 'Small retail holders.',
        change24h: 3.2
      },
      {
        id: '1k_to_10k',
        name: '$1k to $10k',
        color: '#64748B',
        description: 'Medium-sized retail holders.',
        change24h: 1.8
      },
      {
        id: 'more_than_10k',
        name: 'More than $10k',
        color: '#475569',
        description: 'Large retail holders.',
        change24h: 0.9
      }
    ]
  },
  {
    id: 'team',
    name: 'Team Wallets',
    subcategories: [
      {
        id: 'dev',
        name: 'The Dev',
        color: '#F472B6',
        description: 'Main developer wallet.',
        change24h: 0
      },
      {
        id: 'initial_recipients',
        name: 'Initial Token Recipients',
        color: '#FB7185',
        description: 'Early token distribution recipients.',
        change24h: -0.1
      }
    ]
  },
  {
    id: 'little_activity',
    name: 'Little Activity Wallets',
    subcategories: [
      {
        id: 'fresh_wallets',
        name: 'Fresh Wallets',
        color: '#FB923C', // Orange
        description: 'New wallets that have received tokens in the last 7 days. May indicate new investor interest or potential airdrop farming.',
        change24h: 4.2
      },
      {
        id: 'unlabelled_wallets',
        name: 'Unlabelled Wallets',
        color: '#CBD5E1', // Slate
        description: 'Wallets with minimal transaction history and no clear categorization. Could be dormant holders or inactive wallets.',
        change24h: -0.5
      }
    ]
  },
  {
    id: 'custom',
    name: 'Custom Segments',
    subcategories: [
      {
        id: 'social_influencers',
        name: 'Social Influencers',
        color: '#C084FC',
        description: 'Wallets belonging to social media influencers.',
        change24h: 1.1
      },
      {
        id: 'governance',
        name: 'Governance Participants',
        color: '#A855F7',
        description: 'Active participants in governance voting.',
        change24h: 0.7
      }
    ]
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg p-3 shadow-xl">
        <p className="text-xs font-medium text-gray-400 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-300">{entry.name}</span>
            </div>
            <span className="text-gray-200 font-medium">{entry.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const MultiSelect = ({ 
  categories,
  selected,
  onChange,
  isLoading
}: { 
  categories: HolderCategory[];
  selected: string[];
  onChange: (ids: string[]) => void;
  isLoading: boolean;
}) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpanded(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSubcategory = (subcategoryId: string) => {
    onChange(
      selected.includes(subcategoryId)
        ? selected.filter(id => id !== subcategoryId)
        : [...selected, subcategoryId]
    );
  };

  const selectAllInCategory = (category: HolderCategory) => {
    const subcategoryIds = category.subcategories?.map(sub => sub.id) || [];
    const newSelected = new Set([...selected]);
    
    const allSelected = subcategoryIds.every(id => selected.includes(id));
    
    if (allSelected) {
      subcategoryIds.forEach(id => newSelected.delete(id));
    } else {
      subcategoryIds.forEach(id => newSelected.add(id));
    }
    
    onChange(Array.from(newSelected));
  };

  // Add loading overlay
  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-10">
          <FiLoader className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
        <div className="bg-gray-900/50 rounded-lg p-2 max-h-[400px] overflow-y-auto">
          {categories.map(category => (
            <div key={category.id} className="mb-2">
              <div 
                className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectAllInCategory(category);
                    }}
                    className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700"
                  >
                    {category.subcategories?.every(sub => selected.includes(sub.id))
                      ? 'Deselect All'
                      : 'Select All'}
                  </button>
                  <span className="text-sm font-medium text-gray-300">{category.name}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {category.subcategories?.filter(sub => selected.includes(sub.id)).length || 0}
                  /{category.subcategories?.length || 0}
                </div>
              </div>
              
              {expanded.includes(category.id) && category.subcategories && (
                <div className="ml-4 mt-1 space-y-1">
                  {category.subcategories.map(sub => (
                    <label 
                      key={sub.id}
                      className="flex items-center justify-between p-1.5 hover:bg-gray-800/30 rounded cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selected.includes(sub.id)}
                          onChange={() => toggleSubcategory(sub.id)}
                          className="form-checkbox h-3 w-3 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-0 focus:ring-offset-0"
                        />
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2.5 h-2.5 rounded-sm" 
                            style={{ backgroundColor: sub.color }}
                          ></div>
                          <span className="text-sm text-gray-300">{sub.name}</span>
                        </div>
                      </div>
                      {sub.change24h !== undefined && (
                        <div className="flex items-center gap-1.5">
                          {sub.change24h > 0 ? (
                            <FiTrendingUp className="w-3 h-3 text-green-400" />
                          ) : sub.change24h < 0 ? (
                            <FiTrendingDown className="w-3 h-3 text-red-400" />
                          ) : null}
                          <span className={`text-xs font-medium ${
                            sub.change24h > 0 ? 'text-green-400' : 
                            sub.change24h < 0 ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {sub.change24h > 0 ? '+' : ''}{sub.change24h}%
                          </span>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-900/50 rounded-lg p-2 max-h-[400px] overflow-y-auto">
      {categories.map(category => (
        <div key={category.id} className="mb-2">
          <div 
            className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded cursor-pointer"
            onClick={() => toggleCategory(category.id)}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectAllInCategory(category);
                }}
                className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700"
              >
                {category.subcategories?.every(sub => selected.includes(sub.id))
                  ? 'Deselect All'
                  : 'Select All'}
              </button>
              <span className="text-sm font-medium text-gray-300">{category.name}</span>
            </div>
            <div className="text-xs text-gray-500">
              {category.subcategories?.filter(sub => selected.includes(sub.id)).length || 0}
              /{category.subcategories?.length || 0}
            </div>
          </div>
          
          {expanded.includes(category.id) && category.subcategories && (
            <div className="ml-4 mt-1 space-y-1">
              {category.subcategories.map(sub => (
                <label 
                  key={sub.id}
                  className="flex items-center justify-between p-1.5 hover:bg-gray-800/30 rounded cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(sub.id)}
                      onChange={() => toggleSubcategory(sub.id)}
                      className="form-checkbox h-3 w-3 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2.5 h-2.5 rounded-sm" 
                        style={{ backgroundColor: sub.color }}
                      ></div>
                      <span className="text-sm text-gray-300">{sub.name}</span>
                    </div>
                  </div>
                  {sub.change24h !== undefined && (
                    <div className="flex items-center gap-1.5">
                      {sub.change24h > 0 ? (
                        <FiTrendingUp className="w-3 h-3 text-green-400" />
                      ) : sub.change24h < 0 ? (
                        <FiTrendingDown className="w-3 h-3 text-red-400" />
                      ) : null}
                      <span className={`text-xs font-medium ${
                        sub.change24h > 0 ? 'text-green-400' : 
                        sub.change24h < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {sub.change24h > 0 ? '+' : ''}{sub.change24h}%
                      </span>
                    </div>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface HolderAnalysisData {
  category: string;
  holders: number;
  holdersChange: number;
  supply: number;
  supplyChange: number;
  avgBalance: string;
  avgBalanceChange: number;
}

const analysisData: HolderAnalysisData[] = [
  {
    category: 'Smart Money',
    holders: 125,
    holdersChange: 12,
    supply: 15.2,
    supplyChange: 2.8,
    avgBalance: '$52,450',
    avgBalanceChange: 5.2
  },
  {
    category: 'Long-term Holders',
    holders: 892,
    holdersChange: -23,
    supply: 45.8,
    supplyChange: -1.2,
    avgBalance: '$28,750',
    avgBalanceChange: -2.1
  },
  {
    category: 'Active Traders',
    holders: 458,
    holdersChange: 89,
    supply: 12.5,
    supplyChange: 8.9,
    avgBalance: '$15,280',
    avgBalanceChange: 12.8
  },
  {
    category: 'Whales',
    holders: 35,
    holdersChange: 2,
    supply: 28.9,
    supplyChange: 1.5,
    avgBalance: '$458,920',
    avgBalanceChange: 3.2
  },
  {
    category: 'Fresh Wallets',
    holders: 1245,
    holdersChange: 458,
    supply: 8.2,
    supplyChange: 15.8,
    avgBalance: '$3,680',
    avgBalanceChange: -8.5
  }
];

export default function HolderAnalysis() {
  const {
    filters: { timeframe, selectedCategories },
    setTimeframe,
    setSelectedCategories,
    isLoading
  } = useFilters();
  
  const [showFilters, setShowFilters] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Get all subcategories flattened
  const allSubcategories = holderCategories.flatMap(cat => cat.subcategories || []);
  
  // Filter to only selected subcategories
  const selectedSubcategories = allSubcategories.filter(sub => 
    selectedCategories.includes(sub.id)
  );

  // Generate data for selected categories
  const data = React.useMemo(() => {
    const months = ['Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 
                   'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21'];
    
    return months.map(month => {
      const result: any = { date: month };
      selectedSubcategories.forEach(sub => {
        result[sub.name] = Math.random() * 20 + 10;
      });
      return result;
    });
  }, [selectedSubcategories]);

  return (
    <div className={`bg-[#0B1221] rounded-lg p-4 border border-gray-800/50 ${isExpanded ? 'fixed inset-4 z-50 overflow-auto' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-200">Holder Analysis</h3>
            <div className="group relative">
              <FiInfo className="w-3.5 h-3.5 text-gray-500 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm rounded-lg text-xs text-gray-300 w-64 hidden group-hover:block z-10 shadow-xl border border-gray-800">
                Detailed breakdown of token holders by category, showing distribution and changes over time.
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-xs px-3 py-1.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <span>Categories</span>
            <span className="bg-blue-500/20 text-blue-400 px-1.5 rounded-full">
              {selectedCategories.length}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-900/50 rounded-lg p-0.5">
            {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`text-xs px-2 py-1 rounded ${
                  timeframe === period
                    ? 'bg-gray-800 text-gray-200'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <FiMaximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6">
          <MultiSelect
            categories={holderCategories}
            selected={selectedCategories}
            onChange={setSelectedCategories}
            isLoading={isLoading}
          />
        </div>
      )}

      <div className={`relative ${isExpanded ? 'h-[600px]' : 'h-[300px]'}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-10">
            <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            stackOffset="expand"
          >
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            {selectedSubcategories.map((segment) => (
              <Area
                key={segment.id}
                type="monotone"
                dataKey={segment.name}
                stackId="1"
                stroke={segment.color}
                fill={segment.color}
                fillOpacity={0.8}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {selectedSubcategories.map((segment) => (
          <div key={segment.id} className={`group transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: segment.color }}></div>
                <span className="text-sm text-gray-300">{segment.name}</span>
              </div>
              {segment.change24h !== undefined && (
                <div className="flex items-center gap-1.5">
                  {segment.change24h > 0 ? (
                    <FiTrendingUp className="w-3 h-3 text-green-400" />
                  ) : segment.change24h < 0 ? (
                    <FiTrendingDown className="w-3 h-3 text-red-400" />
                  ) : null}
                  <span className={`text-xs font-medium ${
                    segment.change24h > 0 ? 'text-green-400' : 
                    segment.change24h < 0 ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {segment.change24h > 0 ? '+' : ''}{segment.change24h}%
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 hidden group-hover:block">
              {segment.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-800/30">
              <th className="text-left font-medium py-2">Category</th>
              <th className="text-right font-medium py-2">Holders</th>
              <th className="text-right font-medium py-2">24h Change</th>
              <th className="text-right font-medium py-2">Supply %</th>
              <th className="text-right font-medium py-2">24h Change</th>
              <th className="text-right font-medium py-2">Avg. Balance</th>
              <th className="text-right font-medium py-2">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {analysisData.map((row) => (
              <tr 
                key={row.category}
                className="border-b border-gray-800/30 last:border-0 hover:bg-gray-800/20 transition-colors"
              >
                <td className="py-3 text-sm text-gray-300">{row.category}</td>
                <td className="py-3 text-sm text-gray-300 text-right">{row.holders.toLocaleString()}</td>
                <td className="py-3 text-sm text-right">
                  <div className="flex items-center justify-end gap-1">
                    {row.holdersChange >= 0 ? (
                      <FiTrendingUp className="w-3 h-3 text-green-400/90" />
                    ) : (
                      <FiTrendingDown className="w-3 h-3 text-red-400/90" />
                    )}
                    <span className={row.holdersChange >= 0 ? 'text-green-400/90' : 'text-red-400/90'}>
                      {row.holdersChange >= 0 ? '+' : ''}{row.holdersChange}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-300 text-right">{row.supply.toFixed(1)}%</td>
                <td className="py-3 text-sm text-right">
                  <div className="flex items-center justify-end gap-1">
                    {row.supplyChange >= 0 ? (
                      <FiTrendingUp className="w-3 h-3 text-green-400/90" />
                    ) : (
                      <FiTrendingDown className="w-3 h-3 text-red-400/90" />
                    )}
                    <span className={row.supplyChange >= 0 ? 'text-green-400/90' : 'text-red-400/90'}>
                      {row.supplyChange >= 0 ? '+' : ''}{row.supplyChange.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-300 text-right">{row.avgBalance}</td>
                <td className="py-3 text-sm text-right">
                  <div className="flex items-center justify-end gap-1">
                    {row.avgBalanceChange >= 0 ? (
                      <FiTrendingUp className="w-3 h-3 text-green-400/90" />
                    ) : (
                      <FiTrendingDown className="w-3 h-3 text-red-400/90" />
                    )}
                    <span className={row.avgBalanceChange >= 0 ? 'text-green-400/90' : 'text-red-400/90'}>
                      {row.avgBalanceChange >= 0 ? '+' : ''}{row.avgBalanceChange.toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
