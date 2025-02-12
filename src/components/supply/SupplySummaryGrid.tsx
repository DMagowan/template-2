'use client';

import React, { useState } from 'react';
import { FiInfo, FiTrendingUp, FiTrendingDown, FiLock, FiUnlock, FiCalendar, FiClock, FiDollarSign, FiPercent } from 'react-icons/fi';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface UnlockEvent {
  type: 'previous' | 'upcoming' | 'following';
  date: string;
  time: string;
  amount: string;
  amountLabel: string;
  value: string;
  percentageOfSupply: string;
  countdown?: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  category?: string;
  allocations?: number;
}

interface AllocationItem {
  category: string;
  value: number;
  color: string;
  description: string;
}

const CirculatingSupplyChart: React.FC = () => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  
  const data = [
    { date: 'Jan 2024', supply: 850000000, totalSupply: 1500000000 },
    { date: 'Feb 2024', supply: 875000000, totalSupply: 1500000000 },
    { date: 'Mar 2024', supply: 900000000, totalSupply: 1500000000 },
    { date: 'Apr 2024', supply: 925000000, totalSupply: 1500000000 },
    { date: 'May 2024', supply: 950000000, totalSupply: 1500000000 },
    { date: 'Jun 2024', supply: 975000000, totalSupply: 1500000000 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-200">Circulating Supply</h3>
          <div className="flex items-center gap-2 px-2 py-1 bg-blue-500/10 rounded-full">
            <FiPercent className="w-3 h-3 text-blue-400" />
            <span className="text-xs font-medium text-blue-400">65% of Total</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 rounded-full">
          <FiTrendingUp className="w-3 h-3 text-green-400" />
          <span className="text-xs font-medium text-green-400">+2.8%</span>
        </div>
      </div>

      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} onMouseMove={(e) => e?.activeLabel && setHoveredDate(e.activeLabel)}>
            <defs>
              <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />
            <Tooltip 
              cursor={{ stroke: '#374151', strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: '#1B2838',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: any) => [
                `${(Number(value) / 1000000).toFixed(1)}M`,
                'Supply'
              ]}
              labelStyle={{ color: '#9CA3AF', marginBottom: '4px' }}
            />
            <Area
              type="monotone"
              dataKey="supply"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#colorSupply)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/40 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <FiDollarSign className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Current Supply</div>
              <div className="text-sm font-medium text-gray-200">975M</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">$19.5M Total Value</div>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/40 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <FiPercent className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Total Supply</div>
              <div className="text-sm font-medium text-gray-200">1.5B</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">$30M Total Value</div>
        </div>
      </div>
    </div>
  );
};

const UnlockSchedule: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  
  const unlockData: UnlockEvent[] = [
    {
      type: 'previous',
      date: '14 OCT 24',
      time: '01:10 PM UTC',
      amount: '9.25M',
      amountLabel: 'AXS',
      value: '$47.38m',
      percentageOfSupply: '6.04% of Cir. supply',
      allocations: 3
    },
    {
      type: 'upcoming',
      date: '13 NOV 24',
      time: '01:10 PM UTC',
      amount: '815.63k',
      amountLabel: 'AXS',
      value: '$4.18m',
      percentageOfSupply: '0.53% of Cir. supply',
      countdown: {
        days: 0,
        hours: 6,
        minutes: 55,
        seconds: 4
      },
      category: 'Staking Rewards'
    },
    {
      type: 'following',
      date: '13 DEC 24',
      time: '01:10 PM UTC',
      amount: '815.63k',
      amountLabel: 'AXS',
      value: '$4.18m',
      percentageOfSupply: '0.53% of Cir. supply',
      countdown: {
        days: 30,
        hours: 6,
        minutes: 55,
        seconds: 4
      },
      category: 'Staking Rewards'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
          Total Unlock Progress
          <div className="group relative">
            <FiInfo className="w-3.5 h-3.5 text-gray-500 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm rounded-lg text-xs text-gray-300 w-64 hidden group-hover:block z-10 shadow-xl border border-gray-800">
              Track the progress of token unlocks and upcoming events
            </div>
          </div>
        </h3>
        <div className="flex items-center gap-8">
          <div className="relative w-32 h-32 group">
            <svg className="w-full h-full transform transition-transform group-hover:scale-105" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#1F2937"
                strokeWidth="3"
                className="transition-all"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                strokeDasharray={`${92.46 * 2.83}, 283`}
                className="transition-all duration-1000 ease-out"
              />
              <text x="18" y="18" textAnchor="middle" dy=".3em" className="text-xl font-bold fill-gray-200">
                {92.46}%
              </text>
              <text x="18" y="23" textAnchor="middle" dy=".3em" className="text-xs fill-gray-400">
                Unlocked
              </text>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 animate-pulse rounded-full" />
          </div>
          <div className="space-y-3 flex-1">
            <div className="p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiLock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Total Locked</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-200">20.35M AXS</span>
                  <div className="text-xs text-gray-500">7.54%</div>
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiUnlock className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">Unlocked</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-200">249.65M AXS</span>
                  <div className="text-xs text-gray-500">92.46%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-200">Unlock Events</h3>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg hover:bg-gray-700/30 transition-colors group">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-1.5 rounded-lg hover:bg-gray-700/30 transition-colors group">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {unlockData.map((event, index) => (
            <div 
              key={index}
              className={`rounded-lg p-4 cursor-pointer transform transition-all duration-200 ${
                selectedEvent === index ? 'scale-[1.02]' : ''
              } ${
                event.type === 'upcoming' 
                  ? 'bg-pink-600/10 border border-pink-600/20 hover:border-pink-600/40' 
                  : 'bg-gray-800/30 hover:bg-gray-800/40'
              }`}
              onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <FiCalendar className="w-3.5 h-3.5 text-gray-400" />
                    {event.date}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                    <FiClock className="w-3 h-3" />
                    {event.time}
                  </div>
                </div>
                {event.type === 'previous' && (
                  <span className="text-xs font-medium text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                    Unlocked
                  </span>
                )}
              </div>

              {event.countdown && (
                <div className="text-sm text-gray-200 mb-3 bg-gray-900/30 rounded-lg p-2 flex items-center justify-center gap-2">
                  <div className="px-2 py-1 bg-gray-800/50 rounded">
                    <span className="font-medium">{event.countdown.days}</span>
                    <span className="text-xs text-gray-400 ml-1">D</span>
                  </div>
                  <div className="px-2 py-1 bg-gray-800/50 rounded">
                    <span className="font-medium">{event.countdown.hours}</span>
                    <span className="text-xs text-gray-400 ml-1">H</span>
                  </div>
                  <div className="px-2 py-1 bg-gray-800/50 rounded">
                    <span className="font-medium">{event.countdown.minutes}</span>
                    <span className="text-xs text-gray-400 ml-1">M</span>
                  </div>
                  <div className="px-2 py-1 bg-gray-800/50 rounded">
                    <span className="font-medium">{event.countdown.seconds}</span>
                    <span className="text-xs text-gray-400 ml-1">S</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-pink-600/20 rounded-lg flex items-center justify-center">
                  <FiUnlock className="w-4 h-4 text-pink-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-200">{event.amount} {event.amountLabel}</div>
                  <div className="text-xs text-gray-400">{event.percentageOfSupply}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-200">{event.value}</div>
                </div>
              </div>

              {event.allocations && (
                <div className="flex items-center gap-2 mt-3 bg-gray-900/30 rounded-lg p-2">
                  <div className="flex -space-x-2">
                    {[...Array(event.allocations)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-600 ring-2 ring-gray-900/30"/>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-400">{event.allocations} Allocations</span>
                </div>
              )}

              {event.category && (
                <div className="flex items-center gap-2 mt-3 bg-gray-900/30 rounded-lg p-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"/>
                  <span className="text-xs font-medium text-gray-400">{event.category}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InitialAllocation: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  const allocationData: AllocationItem[] = [
    { category: 'Community', value: 16.0, color: '#3B82F6', description: 'Allocated for community initiatives and growth' },
    { category: 'Community Treasury', value: 29.0, color: '#10B981', description: 'Reserved for ecosystem development' },
    { category: 'Private Investors', value: 28.5, color: '#F97316', description: 'Early-stage investors and partners' },
    { category: 'Founder / Team', value: 25.5, color: '#8B5CF6', description: 'Core team and founder allocation' }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-200">Initial Token Allocation</h3>
          <div className="text-xs text-gray-400 px-2 py-1 bg-gray-800/50 rounded-full">
            Last updated: 07/10/24 10:40 AM
          </div>
        </div>
      </div>
      <div className="space-y-3 flex-1">
        {allocationData.map((item) => (
          <div 
            key={item.category} 
            className="bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/40 transition-all cursor-pointer relative group"
            onMouseEnter={() => setHoveredCategory(item.category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full transition-all duration-200 group-hover:scale-125"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-300 group-hover:text-gray-100">{item.category}</span>
              </div>
              <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                {item.value}%
              </span>
            </div>
            <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
              <div 
                className="h-2 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: hoveredCategory === item.category ? '100%' : `${item.value}%`,
                  backgroundColor: item.color,
                  opacity: hoveredCategory === item.category ? 0.8 : 0.6
                }}
              />
            </div>
            <div className="absolute left-3 right-3 -bottom-8 bg-gray-900/95 rounded-lg p-2 border border-gray-700/50 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-10">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SupplySummaryGrid() {
  const unlockData: UnlockEvent[] = [
    {
      type: 'previous',
      date: '14 OCT 24',
      time: '01:10 PM UTC',
      amount: '9.25M',
      amountLabel: 'AXS',
      value: '$47.38m',
      percentageOfSupply: '6.04% of Cir. supply',
      allocations: 3
    },
    {
      type: 'upcoming',
      date: '13 NOV 24',
      time: '01:10 PM UTC',
      amount: '815.63k',
      amountLabel: 'AXS',
      value: '$4.18m',
      percentageOfSupply: '0.53% of Cir. supply',
      countdown: {
        days: 0,
        hours: 6,
        minutes: 55,
        seconds: 4
      },
      category: 'Staking Rewards'
    },
    {
      type: 'following',
      date: '13 DEC 24',
      time: '01:10 PM UTC',
      amount: '815.63k',
      amountLabel: 'AXS',
      value: '$4.18m',
      percentageOfSupply: '0.53% of Cir. supply',
      countdown: {
        days: 30,
        hours: 6,
        minutes: 55,
        seconds: 4
      },
      category: 'Staking Rewards'
    }
  ];

  return (
    <div className="bg-[#0B1426] rounded-xl p-6">
      <div className="grid grid-cols-[300px_1fr] gap-8">
        {/* Left side - Progress Circle */}
        <div className="space-y-6">
          <h2 className="text-base font-medium text-gray-200">Total Unlock Progress</h2>
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1B2838"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#22C55E"
                strokeWidth="10"
                strokeDasharray={`${92.46 * 2.83}, 283`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-semibold text-gray-200">92%</span>
              <span className="text-sm text-gray-400">Unlocked</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-500 rounded-sm" />
                <span className="text-sm text-gray-400">Total Locked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-200">20.35M</span>
                <span className="text-xs px-1.5 py-0.5 bg-gray-800 rounded text-gray-400">AXS</span>
                <span className="text-sm text-gray-400">7.54%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
                <span className="text-sm text-gray-400">Unlocked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-200">249.65M</span>
                <span className="text-xs px-1.5 py-0.5 bg-gray-800 rounded text-gray-400">AXS</span>
                <span className="text-sm text-gray-400">92.46%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-600 rounded-sm" />
                <span className="text-sm text-gray-400">Untracked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-200">--</span>
                <span className="text-xs px-1.5 py-0.5 bg-gray-800 rounded text-gray-400">AXS</span>
                <span className="text-sm text-gray-400">--</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Unlock Events */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-medium text-gray-200">Unlock Events</h2>
            <div className="flex gap-2">
              <button className="p-1 rounded hover:bg-gray-800">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-1 rounded hover:bg-gray-800">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {unlockData.map((event, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 ${
                  event.type === 'upcoming'
                    ? 'bg-pink-500/10 border border-pink-500/20'
                    : 'bg-[#1B2838]'
                }`}
              >
                <div className="flex flex-col gap-1 mb-4">
                  <div className="text-sm font-medium text-gray-200">{
                    event.type === 'previous' ? 'Previous Event' :
                    event.type === 'upcoming' ? 'Upcoming Event' : 'Following Event'
                  }</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-200">{event.date}</span>
                    <span className="text-xs text-gray-400">{event.time}</span>
                  </div>
                </div>

                {event.type === 'previous' && (
                  <div className="text-sm text-gray-400 mb-4">Unlocked</div>
                )}

                {event.countdown && (
                  <div className="flex items-center gap-1 mb-4">
                    <div className="px-2 py-1 bg-[#0B1426] rounded">
                      <span className="text-sm font-medium text-gray-200">{event.countdown.days}</span>
                      <span className="text-xs text-gray-400 ml-1">D</span>
                    </div>
                    <div className="px-2 py-1 bg-[#0B1426] rounded">
                      <span className="text-sm font-medium text-gray-200">{event.countdown.hours}</span>
                      <span className="text-xs text-gray-400 ml-1">H</span>
                    </div>
                    <div className="px-2 py-1 bg-[#0B1426] rounded">
                      <span className="text-sm font-medium text-gray-200">{event.countdown.minutes}</span>
                      <span className="text-xs text-gray-400 ml-1">M</span>
                    </div>
                    <div className="px-2 py-1 bg-[#0B1426] rounded">
                      <span className="text-sm font-medium text-gray-200">{event.countdown.seconds}</span>
                      <span className="text-xs text-gray-400 ml-1">S</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FiLock className="w-4 h-4 text-pink-400" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-200">{event.amount}</span>
                        <span className="text-xs bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">{event.amountLabel}</span>
                      </div>
                      <div className="text-xs text-gray-400">{event.percentageOfSupply}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-200">{event.value}</div>
                </div>

                {event.allocations && (
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex -space-x-1.5">
                      {[...Array(event.allocations)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border-2 border-[#0B1426]" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">{event.allocations} Allocations</span>
                  </div>
                )}

                {event.category && (
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-sm text-gray-400">{event.category}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 

