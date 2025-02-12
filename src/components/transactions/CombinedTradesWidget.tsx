import React, { useState } from 'react';
import { FiExternalLink, FiArrowUp, FiArrowDown, FiClock, FiActivity } from 'react-icons/fi';
import Image from 'next/image';
import DCABuySellPressure from '@/components/transactions/DCABuySellPressure';

// Import sample data from both components
const sampleTrades = [
  {
    id: 1,
    trader: '#love Token Deployer [5fWkLJIo]',
    buyAmount: '2.98',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellAmount: '1,146,957',
    sellToken: 'LIME',
    sellTokenLogo: '/token-logos/lime.png',
    value: 718,
    time: '2m ago',
    txHash: '0x123...abc',
    type: 'sell'
  },
  {
    id: 2,
    trader: 'Smart Trader [ESwd8uCf]',
    buyAmount: '33,097',
    buyToken: 'ZACKWAT',
    buyTokenLogo: '/token-logos/zackwat.png',
    sellAmount: '2.5',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    value: 595,
    time: '2m ago',
    txHash: '0x456...def',
    type: 'buy'
  },
  {
    id: 3,
    trader: 'Memecoin Expert [MPxQu4os]',
    buyAmount: '188,055',
    buyToken: 'DRFM',
    buyTokenLogo: '/token-logos/drfm.png',
    sellAmount: '25',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    value: 5888,
    time: '3m ago',
    txHash: '0x789...ghi',
    type: 'buy'
  },
  {
    id: 4,
    trader: 'Whale Wallet [9xKp2Mnt]',
    buyAmount: '450,000',
    buyToken: 'USDC',
    buyTokenLogo: '/token-logos/usdc.png',
    sellAmount: '185.5',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    value: 44520,
    time: '4m ago',
    txHash: '0xabc...123',
    type: 'sell'
  },
  {
    id: 5,
    trader: 'DeFi Degen [Kr4kenX]',
    buyAmount: '75.2',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellAmount: '1,825,500',
    sellToken: 'BONK',
    sellTokenLogo: '/token-logos/bonk.png',
    value: 18255,
    time: '5m ago',
    txHash: '0xdef...456',
    type: 'buy'
  },
  {
    id: 6,
    trader: 'Smart Money [Wh4leX]',
    buyAmount: '925,000',
    buyToken: 'USDT',
    buyTokenLogo: '/token-logos/usdt.png',
    sellAmount: '380.8',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    value: 92500,
    time: '6m ago',
    txHash: '0xghi...789',
    type: 'sell'
  },
  {
    id: 7,
    trader: 'Token Sniper [Sn1perZ]',
    buyAmount: '55.4',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellAmount: '2,450,000',
    sellToken: 'MEME',
    sellTokenLogo: '/token-logos/meme.png',
    value: 13475,
    time: '7m ago',
    txHash: '0xjkl...012',
    type: 'buy'
  },
  {
    id: 8,
    trader: 'Arbitrage Bot [Arb1tr4ge]',
    buyAmount: '150,000',
    buyToken: 'USDC',
    buyTokenLogo: '/token-logos/usdc.png',
    sellAmount: '62.5',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    value: 15000,
    time: '8m ago',
    txHash: '0xmno...345',
    type: 'sell'
  }
];

const sampleOrders = [
  {
    id: 1,
    wallet: 'Top 100 on SWARMS Leaderboard [7V...]',
    buyToken: 'SOL',
    buyTokenLogo: '/token-logos/sol.png',
    sellToken: 'USDC',
    sellTokenLogo: '/token-logos/usdc.png',
    progress: 75.5,
    depositValue: 20353,
    lastSwap: '12m ago',
    status: 'Active',
  },
  {
    id: 2,
    wallet: 'GMGN Trading Bot User [2y7ZaFt7]',
    buyToken: 'USDT',
    buyTokenLogo: '/token-logos/usdt.png',
    sellToken: 'SOL',
    sellTokenLogo: '/token-logos/sol.png',
    progress: 45.8,
    depositValue: 43207,
    lastSwap: '45m ago',
    status: 'Active',
  }
];

// Add sample transaction data
const sampleTransactions = [
  {
    id: 1,
    from: 'Top 100 on 🚀 TRUMP Leaderboard [C...',
    to: 'Active SOL Millionaire [8EJJEXn5]',
    amount: '-1,001,024',
    token: 'ARC',
    tokenLogo: '/token-logos/arc.png',
    value: -393741,
    time: '4h ago',
    type: 'transfer'
  },
  {
    id: 2,
    from: 'Whale Wallet [9xKj2mN8]',
    to: 'DEX Pool [L3qP5vR7]',
    amount: '250,000',
    token: 'USDC',
    tokenLogo: '/token-logos/usdc.png',
    value: 250000,
    time: '2h ago',
    type: 'transfer'
  },
  {
    id: 3,
    from: 'Smart Money Trader [4rTh8nB9]',
    to: 'Institutional Wallet [K7mW2xY5]',
    amount: '-156,789',
    token: 'SOL',
    tokenLogo: '/token-logos/sol.png',
    value: -156789,
    time: '1h ago',
    type: 'transfer'
  },
  {
    id: 4,
    from: 'BidenBye Token Deployer [Cf8uaesD]',
    to: 'Top 100 on 🚀 TRUMP Leaderboard [C...',
    amount: '5,000',
    token: 'BONK',
    tokenLogo: '/token-logos/bonk.png',
    value: 75000,
    time: '49m ago',
    type: 'transfer'
  },
  {
    id: 5,
    from: 'DeFi Protocol [2vN9pQ4]',
    to: 'Yield Farmer [6tM4wL8]',
    amount: '45,678',
    token: 'USDT',
    tokenLogo: '/token-logos/usdt.png',
    value: 45678,
    time: '30m ago',
    type: 'transfer'
  }
];

interface CombinedTradesWidgetProps {
  timeframe?: string;
  categories?: string[];
}

const formatValue = (value: number) => {
  return `$${Math.floor(value).toLocaleString()}`;
};

const getRelativeWidth = (value: number, maxValue: number) => {
  return `${(value / maxValue) * 100}%`;
};

export default function CombinedTradesWidget({ timeframe = '24h', categories = [] }: CombinedTradesWidgetProps) {
  const [activeTab, setActiveTab] = useState<'trades' | 'transactions' | 'dca'>('trades');
  const maxValue = Math.max(...sampleTrades.map(trade => trade.value));
  const maxTransactionValue = Math.max(...sampleTransactions.map(tx => Math.abs(tx.value)));
  const maxDepositValue = Math.max(...sampleOrders.map(order => order.depositValue));

  // Calculate trade summary metrics
  const tradeSummary = {
    inflow: sampleTrades.filter(t => t.type === 'buy').reduce((sum, t) => sum + t.value, 0),
    outflow: sampleTrades.filter(t => t.type === 'sell').reduce((sum, t) => sum + t.value, 0),
    buyCount: sampleTrades.filter(t => t.type === 'buy').length,
    sellCount: sampleTrades.filter(t => t.type === 'sell').length,
  };

  const netFlow = tradeSummary.inflow - tradeSummary.outflow;
  const flowChange = ((netFlow / tradeSummary.outflow) * 100).toFixed(1);

  return (
    <div className="h-full">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('trades')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'trades'
                ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <FiActivity className="w-4 h-4" />
            <span className="text-sm font-medium">Live DEX Trades</span>
            {activeTab === 'trades' && (
              <span className="px-1.5 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full ml-2">Live</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'transactions'
                ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <FiActivity className="w-4 h-4" />
            <span className="text-sm font-medium">Transactions</span>
          </button>
          <button
            onClick={() => setActiveTab('dca')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'dca'
                ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
            }`}
          >
            <FiClock className="w-4 h-4" />
            <span className="text-sm font-medium">DCA Orders</span>
            {activeTab === 'dca' && (
              <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full ml-2">91</span>
            )}
          </button>
        </div>
        <button className="px-4 py-2 text-sm bg-[#2D4263] text-blue-400 rounded-lg hover:bg-[#3D5273] transition-colors ring-1 ring-blue-500/30">
          Filter
        </button>
      </div>

      {/* Live DEX Trades Table */}
      {activeTab === 'trades' && (
        <div>
          {/* Enhanced Trade Summary Section */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#141E2C] rounded-xl p-4 border border-gray-800/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center">
                  <FiArrowUp className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Total Inflow</div>
                  <div className="text-xl font-semibold text-green-400">
                    ${(tradeSummary.inflow / 1000).toFixed(2)}K
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{tradeSummary.buyCount} buy trades</span>
                <span className="text-green-400">+{((tradeSummary.inflow / (tradeSummary.inflow + tradeSummary.outflow)) * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="bg-[#141E2C] rounded-xl p-4 border border-gray-800/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center">
                  <FiArrowDown className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Total Outflow</div>
                  <div className="text-xl font-semibold text-red-400">
                    ${(tradeSummary.outflow / 1000).toFixed(2)}K
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{tradeSummary.sellCount} sell trades</span>
                <span className="text-red-400">-{((tradeSummary.outflow / (tradeSummary.inflow + tradeSummary.outflow)) * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="bg-[#141E2C] rounded-xl p-4 border border-gray-800/50">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-full ${netFlow >= 0 ? 'bg-green-900/30' : 'bg-red-900/30'} flex items-center justify-center`}>
                  {netFlow >= 0 ? (
                    <FiArrowUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <FiArrowDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Net Flow</div>
                  <div className={`text-xl font-semibold ${netFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${(Math.abs(netFlow) / 1000).toFixed(2)}K
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Last {timeframe}</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${netFlow >= 0 ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className={netFlow >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {netFlow >= 0 ? 'Positive' : 'Negative'} flow
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#141E2C] rounded-xl p-4 border border-gray-800/50">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-full ${parseFloat(flowChange) >= 0 ? 'bg-green-900/30' : 'bg-red-900/30'} flex items-center justify-center`}>
                  {parseFloat(flowChange) >= 0 ? (
                    <FiArrowUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <FiArrowDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Flow Change</div>
                  <div className={`text-xl font-semibold ${parseFloat(flowChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {flowChange}%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">vs previous {timeframe}</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${parseFloat(flowChange) >= 0 ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className={parseFloat(flowChange) >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {Math.abs(parseFloat(flowChange))}% {parseFloat(flowChange) >= 0 ? 'increase' : 'decrease'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="bg-[#141E2C] rounded-xl border border-gray-800/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800/30">
                    <th className="text-left font-medium py-3 px-4 text-xs text-gray-400">Trader</th>
                    <th className="text-right font-medium py-3 px-4 text-xs text-gray-400">Amount</th>
                    <th className="text-left font-medium py-3 px-4 text-xs text-gray-400">Bought</th>
                    <th className="text-right font-medium py-3 px-4 text-xs text-gray-400">Amount</th>
                    <th className="text-left font-medium py-3 px-4 text-xs text-gray-400">Sold</th>
                    <th className="text-right font-medium py-3 px-4 text-xs text-gray-400">Value ($)</th>
                    <th className="text-right font-medium py-3 px-4 text-xs text-gray-400">Time</th>
                    <th className="text-right font-medium py-3 px-4 text-xs text-gray-400">TX Details</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleTrades.map((trade) => (
                    <tr 
                      key={trade.id} 
                      className="border-t border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${
                            trade.type === 'buy' ? 'bg-green-900/30' : 'bg-red-900/30'
                          } flex items-center justify-center`}>
                            {trade.type === 'buy' ? (
                              <FiArrowUp className="w-4 h-4 text-green-400" />
                            ) : (
                              <FiArrowDown className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <span className="text-gray-300">{trade.trader}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-300">{trade.buyAmount}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center p-1">
                            <Image src={trade.buyTokenLogo} alt={trade.buyToken} width={16} height={16} className="rounded-full" />
                          </div>
                          <span className="text-gray-300">{trade.buyToken}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-300">{trade.sellAmount}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center p-1">
                            <Image src={trade.sellTokenLogo} alt={trade.sellToken} width={16} height={16} className="rounded-full" />
                          </div>
                          <span className="text-gray-300">{trade.sellToken}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right relative">
                        <div 
                          className={`absolute inset-y-0 right-0 ${
                            trade.type === 'buy' ? 'bg-green-500/10' : 'bg-red-500/10'
                          }`}
                          style={{ width: `${(trade.value / maxValue) * 100}%` }}
                        />
                        <span className="relative z-10 text-gray-300">${trade.value.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-400">
                          {trade.time}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors group">
                          <FiExternalLink className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      {activeTab === 'transactions' && (
        <div className="bg-[#141E2C] rounded-xl border border-gray-800/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/30">
                  <th className="text-left font-medium py-3 px-4 text-xs text-gray-400">From</th>
                  <th className="text-left font-medium py-3 px-4 text-xs text-gray-400">To</th>
                  <th className="text-right font-medium py-3 px-4 text-xs text-gray-400">Amount</th>
                  <th className="text-left font-medium py-3 px-4 text-xs text-gray-400">Token</th>
                  <th className="text-right font-medium py-3 px-4 text-xs text-gray-400">Value</th>
                  <th className="text-right font-medium py-3 px-4 text-xs text-gray-400">Time</th>
                  <th className="text-right font-medium py-3 px-4 text-xs text-gray-400">Details</th>
                </tr>
              </thead>
              <tbody>
                {sampleTransactions.map((tx) => (
                  <tr 
                    key={tx.id} 
                    className="border-t border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-300">{tx.from}</td>
                    <td className="py-3 px-4 text-gray-300">{tx.to}</td>
                    <td className={`py-3 px-4 text-right ${
                      tx.amount.startsWith('-') ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {tx.amount}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center p-1">
                          <Image src={tx.tokenLogo} alt={tx.token} width={16} height={16} className="rounded-full" />
                        </div>
                        <span className="text-gray-300">{tx.token}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right relative">
                      <div 
                        className="absolute inset-y-0 right-0 bg-blue-500/10"
                        style={{ width: `${(Math.abs(tx.value) / maxTransactionValue) * 100}%` }}
                      />
                      <span className={`relative z-10 ${
                        tx.value < 0 ? 'text-red-400' : 'text-green-400'
                      }`}>
                        ${Math.abs(tx.value).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-400">
                        {tx.time}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors group">
                        <FiExternalLink className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DCA Orders Table */}
      {activeTab === 'dca' && (
        <div>
          {/* Add DCA Buy/Sell Pressure Widget */}
          <div className="mb-6">
            <DCABuySellPressure 
              timeframe={timeframe} 
              categories={categories} 
            />
          </div>

          {/* DCA Orders Table Header */}
          <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,0.5fr] gap-4 px-4 py-2 text-xs text-gray-400">
            <div>Wallet</div>
            <div>Buying Token</div>
            <div>Selling Token</div>
            <div>Progress</div>
            <div className="text-right">Deposit Value ($)</div>
            <div className="text-right">Last Swap</div>
            <div className="text-right">Status</div>
          </div>
          <div className="space-y-1">
            {sampleOrders.map((order) => (
              <div key={order.id} 
                   className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,0.5fr] gap-4 px-4 py-3 text-sm border-t border-gray-800/50 hover:bg-gray-800/20">
                <div className="text-gray-300">{order.wallet}</div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
                    <Image src={order.buyTokenLogo} alt={order.buyToken} width={16} height={16} className="rounded-full" />
                  </div>
                  <span className="text-gray-300">{order.buyToken}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
                    <Image src={order.sellTokenLogo} alt={order.sellToken} width={16} height={16} className="rounded-full" />
                  </div>
                  <span className="text-gray-300">{order.sellToken}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{order.progress}%</span>
                </div>
                <div className="text-right text-gray-300 relative">
                  <div className="relative z-10">
                    {formatValue(order.depositValue)}
                  </div>
                  <div 
                    className="absolute inset-y-0 right-0 bg-blue-500/10 -z-0"
                    style={{ width: getRelativeWidth(order.depositValue, maxDepositValue) }}
                  />
                </div>
                <div className="text-right text-gray-400">{order.lastSwap}</div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    order.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
