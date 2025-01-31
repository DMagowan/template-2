'use client';

import React from 'react';
import TradingViewChart from '@/components/TradingViewChart';
import MarketSignal from '@/components/overview/MarketSignal';
import FlowIntelligence from '@/components/overview/FlowIntelligence';
import HoldersSupply from '@/components/overview/HoldersSupply';
import HolderMetrics from '@/components/overview/HolderMetrics';

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#0B1426] p-4 space-y-6">
      {/* First Row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <TradingViewChart />
        </div>
        <MarketSignal timeframe="1s" />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <FlowIntelligence 
            marketCap={1.23} 
            flows={{
              smartMoney: {
                count: 1245,
                value: 318.2,
                isPositive: true,
                benchmark: {
                  percentile: 92,
                  status: 'exceptional',
                  context: '92nd percentile vs similar tokens'
                }
              },
              exchange: {
                count: null,
                value: 18.2,
                isPositive: false,
                benchmark: {
                  percentile: 45,
                  status: 'normal',
                  context: 'Average exchange outflow'
                }
              },
              topPNL: {
                count: 263,
                value: 234.2,
                isPositive: true,
                benchmark: {
                  percentile: 78,
                  status: 'high',
                  context: 'Higher than 78% of peers'
                }
              },
              publicFigures: {
                count: 869,
                value: 128.2,
                isPositive: true,
                benchmark: {
                  percentile: 88,
                  status: 'high',
                  context: 'Strong influencer interest'
                }
              },
              whales: {
                count: 1122,
                value: 148.2,
                isPositive: false,
                benchmark: {
                  percentile: 65,
                  status: 'normal',
                  context: 'Normal whale activity'
                }
              },
              freshWallets: {
                count: 693,
                value: 181.2,
                isPositive: true,
                benchmark: {
                  percentile: 82,
                  status: 'high',
                  context: 'Strong new wallet growth'
                }
              }
            }} 
          />
        </div>
        <HolderMetrics 
          data={{
            growth: {
              '24h': { value: 1245, percentage: 12.5, isPositive: true },
              '7d': { value: 8234, percentage: 28.3, isPositive: true },
              '30d': { value: 25789, percentage: 82.1, isPositive: true }
            },
            medianHolderRank: {
              value: 2345,
              percentile: 85,
              context: 'Higher than 85% of similar tokens'
            },
            hhi: {
              value: 0.12,
              percentile: 92,
              context: 'Indicates good decentralization'
            },
            freshWallets: {
              percentage: 15,
              count: 1234,
              context: 'Normal growth rate',
              risk: 'Low'
            },
            top100Supply: {
              percentage: 45,
              value: 450000,
              context: 'Moderate concentration'
            },
            institutionalHolders: {
              smartMoney: {
                count: 125,
                value: 12500000,
                percentage: 12.5
              },
              funds: {
                count: 45,
                value: 8900000,
                percentage: 8.9
              },
              publicFigures: {
                count: 78,
                value: 5600000,
                percentage: 5.6
              }
            }
          }}
        />
      </div>

      {/* Third Row */}
      <HoldersSupply 
        data={{
          holders: {
            value: 12345,
            change: 12.5,
            isPositive: true
          },
          supply: {
            circulating: {
              value: 1000000,
              percentage: 65,
              change: 2.3
            },
            unlockStatus: {
              current: 65,
              locked: 35
            },
            nextUnlock: {
              date: 'Mar 15, 2024',
              percentage: 15
            }
          },
          distribution: {
            top10: 25,
            top50: 45,
            top100: 60,
            retail: 40
          },
          concentration: {
            gini: 0.45,
            status: 'Medium',
            context: 'Moderate concentration with room for improvement'
          }
        }}
      />
    </div>
  );
} 