'use client';

import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiMinus, FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface MarketSignalProps {
  timeframe?: string;
}

type SignalLevel = 'Bearish' | 'Cautious' | 'Neutral' | 'Positive' | 'Bullish';

interface SignalData {
  level: SignalLevel;
  score: number;
  color: string;
  icon: React.ReactNode;
  description: string;
  factors: {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    value: string;
    weight: number;
    details: string;
  }[];
}

export default function MarketSignal({ timeframe = '1s' }: MarketSignalProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showTooltip, setShowTooltip] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // This would be replaced with real-time data from your API
  const signal: SignalData = {
    level: 'Positive',
    score: 82,
    color: 'rgb(34 197 94)',
    icon: <FiTrendingUp className="w-5 h-5" />,
    description: 'Multiple strong buy signals across technical and fundamental factors',
    factors: [
      {
        name: 'Security',
        impact: 'positive',
        value: 'Verified ✓',
        weight: 0.95,
        details: 'Liquidity locked, passed audits'
      },
      {
        name: 'Smart Money',
        impact: 'positive',
        value: 'Accumulating',
        weight: 0.9,
        details: '3 funds buying'
      },
      {
        name: 'Diamond Hands',
        impact: 'positive',
        value: '75% locked',
        weight: 0.85,
        details: '85+ days no movement'
      },
      {
        name: 'Supply Status',
        impact: 'positive',
        value: 'Fully Unlocked',
        weight: 0.85,
        details: 'No upcoming unlocks'
      },
      {
        name: 'Technical',
        impact: 'positive',
        value: 'MA Support',
        weight: 0.8,
        details: '10-day MA bounce'
      },
      {
        name: 'Top Traders',
        impact: 'positive',
        value: '+12.5%',
        weight: 0.8,
        details: 'Accumulation phase'
      },
      {
        name: 'Public Figures',
        impact: 'positive',
        value: '3 bought',
        weight: 0.75,
        details: 'Active marketing'
      },
      {
        name: 'Smart Followers',
        impact: 'positive',
        value: '+28%',
        weight: 0.75,
        details: 'Increasing rapidly'
      },
      {
        name: 'Market Condition',
        impact: 'neutral',
        value: 'Stable',
        weight: 0.7,
        details: 'Low volatility'
      },
      {
        name: 'Token Narrative',
        impact: 'positive',
        value: 'AI Sector',
        weight: 0.85,
        details: 'Strong market fit'
      },
      {
        name: 'Social Sentiment',
        impact: 'positive',
        value: 'Growing',
        weight: 0.65,
        details: 'Room for growth'
      },
      {
        name: 'Volume Trend',
        impact: 'positive',
        value: '+24.5%',
        weight: 0.7,
        details: '24h increase'
      }
    ]
  };

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = signal.score / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      if (step < steps) {
        current += increment;
        setAnimatedScore(Math.min(Math.round(current), signal.score));
        step++;
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [signal.score]);

  const getSignalColor = (level: SignalLevel) => {
    switch (level) {
      case 'Bullish': return 'rgb(34 197 94)';
      case 'Positive': return 'rgb(74 222 128)';
      case 'Neutral': return 'rgb(148 163 184)';
      case 'Cautious': return 'rgb(251 146 60)';
      case 'Bearish': return 'rgb(239 68 68)';
      default: return 'rgb(148 163 184)';
    }
  };

  const getImpactColor = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-gray-400';
    }
  };

  const getImpactIcon = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive': return <FiTrendingUp className="w-3.5 h-3.5" />;
      case 'negative': return <FiTrendingDown className="w-3.5 h-3.5" />;
      case 'neutral': return <FiMinus className="w-3.5 h-3.5" />;
    }
  };

  const getWeightBackground = (weight: number) => {
    return `linear-gradient(90deg, ${signal.color}20 ${weight * 100}%, transparent ${weight * 100}%)`;
  };

  return (
    <div className="bg-[#0B1221] rounded-lg">
      {/* Compact View */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-800/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium text-gray-300">Score</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-400">{timeframe}</span>
            </div>
          </div>
          {isExpanded ? (
            <FiChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <FiChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="w-16 h-16 -rotate-90 transform">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#1F2937"
                strokeWidth="6"
                className="opacity-20"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke={signal.color}
                strokeWidth="6"
                strokeDasharray={`${(animatedScore / 100) * 175.93} 175.93`}
                className="transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div 
                className="text-xl font-bold"
                style={{ color: signal.color }}
              >
                {animatedScore}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${signal.color}20`, color: signal.color }}
              >
                {signal.icon}
              </div>
              <span 
                className="text-base font-semibold"
                style={{ color: signal.color }}
              >
                {signal.level}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{signal.description}</p>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-800">
          <div className="pt-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Signal Analysis</h3>
            <div className="grid grid-cols-2 gap-2">
              {signal.factors.map((factor, index) => (
                <div 
                  key={index}
                  className="p-2.5 rounded bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-help"
                  onMouseEnter={() => setShowTooltip(`factor-${index}`)}
                  onMouseLeave={() => setShowTooltip('')}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`${getImpactColor(factor.impact)}`}>
                        {getImpactIcon(factor.impact)}
                      </div>
                      <span className="text-xs text-gray-300">{factor.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-medium ${getImpactColor(factor.impact)}`}>
                        {factor.value}
                      </span>
                    </div>
                  </div>
                  <div className="relative mt-1.5">
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          factor.impact === 'positive' ? 'bg-green-400' :
                          factor.impact === 'negative' ? 'bg-red-400' :
                          'bg-gray-400'
                        }`}
                        style={{ width: `${factor.weight * 100}%` }}
                      />
                    </div>
                    {showTooltip === `factor-${index}` && (
                      <div className="absolute left-0 -bottom-1 transform translate-y-full mt-1 z-10">
                        <div className="bg-gray-800 text-xs text-gray-300 rounded px-2 py-1 shadow-lg whitespace-nowrap">
                          {factor.details}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
