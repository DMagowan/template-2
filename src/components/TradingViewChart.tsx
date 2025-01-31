'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FiCheck, FiChevronDown, FiBarChart2, FiLoader } from 'react-icons/fi';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface DisplayOption {
  id: string;
  label: string;
  isActive: boolean;
}

interface FlowIndicator {
  id: string;
  label: string;
  color: string;
  isActive: boolean;
}

interface IndicatorOption {
  id: string;
  label: string;
  category: 'display' | 'flow';
  isActive: boolean;
}

export default function TradingViewChart() {
  const widgetRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showIndicators, setShowIndicators] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('6H');
  const [isLoading, setIsLoading] = useState(true);
  
  const timeframes = ['1H', '4H', '6H', '1D', '1W'];

  const [indicators, setIndicators] = useState<IndicatorOption[]>([
    // Display Options
    { id: 'limitOrders', label: 'Limit Orders', category: 'display', isActive: true },
    { id: 'breakevenPrice', label: 'Breakeven Price', category: 'display', isActive: true },
    { id: 'historicalTrades', label: 'Historical Trades', category: 'display', isActive: true },
    { id: 'devTrades', label: 'Dev Trades', category: 'display', isActive: true },
    { id: 'sniperTrades', label: 'Sniper Trades', category: 'display', isActive: true },
    // Flow Indicators
    { id: 'smartMoney', label: 'Smart Money', category: 'flow', isActive: true },
    { id: 'exchange', label: 'Exchange Flows', category: 'flow', isActive: true },
    { id: 'topPNL', label: 'Top PnL Traders', category: 'flow', isActive: true },
    { id: 'publicFigures', label: 'Public Figures', category: 'flow', isActive: true },
    { id: 'whales', label: 'Whales', category: 'flow', isActive: true },
    { id: 'freshWallets', label: 'Fresh Wallets', category: 'flow', isActive: true }
  ]);

  const [flowIndicators] = useState([
    { id: 'smartMoney', label: 'Smart Money', color: 'rgb(34 197 94)' },
    { id: 'exchange', label: 'Exchange', color: 'rgb(239 68 68)' },
    { id: 'topPNL', label: 'Top PNL', color: 'rgb(168 85 247)' },
    { id: 'publicFigures', label: 'Public Figures', color: 'rgb(59 130 246)' },
    { id: 'whales', label: 'Whales', color: 'rgb(234 179 8)' },
    { id: 'freshWallets', label: 'Fresh Wallets', color: 'rgb(14 165 233)' }
  ]);

  const showTrades = (trades: any[]) => {
    if (widgetRef.current) {
      // Clear existing markers
      widgetRef.current.chart().removeAllShapes();
      
      // Add new markers for each trade
      trades.forEach((trade) => {
        widgetRef.current.chart().createShape({
          time: trade.time,
          price: trade.price,
          shape: trade.type === 'buy' ? 'arrow_up' : 'arrow_down',
          text: `${trade.type === 'buy' ? 'Buy' : 'Sell'} ${trade.amount}`,
          overrides: {
            backgroundColor: trade.type === 'buy' ? '#22c55e' : '#ef4444',
            borderColor: trade.type === 'buy' ? '#22c55e' : '#ef4444',
            textColor: '#ffffff'
          }
        });
      });
    }
  };

  const toggleIndicator = (id: string) => {
    setIndicators(current =>
      current.map(indicator =>
        indicator.id === id ? { ...indicator, isActive: !indicator.isActive } : indicator
      )
    );
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const loadTradingViewScript = async () => {
      try {
        // Check if script is already loaded
        if (typeof window.TradingView !== 'undefined') {
          initializeWidget();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        
        script.onload = () => {
          initializeWidget();
        };

        script.onerror = () => {
          console.error('Failed to load TradingView widget');
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading TradingView widget:', error);
        setIsLoading(false);
      }
    };

    const initializeWidget = () => {
      if (typeof window.TradingView !== 'undefined' && containerRef.current) {
        widgetRef.current = new window.TradingView.widget({
          container_id: 'tradingview_chart',
          symbol: 'BINANCE:USDTUSDC',
          interval: '60',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#0B1221',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          backgroundColor: '#0B1221',
          gridColor: '#1a2332',
          height: '100%',
          width: '100%',
          loading_screen: {
            backgroundColor: '#0B1221',
            foregroundColor: '#2563eb'
          },
          disabled_features: [
            'header_symbol_search',
            'symbol_search_hot_key',
            'header_compare',
            'header_undo_redo',
            'header_screenshot',
            'header_saveload'
          ],
          enabled_features: [
            'hide_left_toolbar_by_default'
          ]
        });

        // Make showTrades available globally
        (window as any).showTradesOnChart = showTrades;

        // Set loading to false when widget is ready
        widgetRef.current.onChartReady(() => {
          setIsLoading(false);
        });
      }
    };

    loadTradingViewScript();

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (e) {
          console.error('Error removing TradingView widget:', e);
        }
      }
    };
  }, []);

  return (
    <div className="bg-[#0B1221] rounded-lg border border-gray-800/50">
      {/* Chart Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIndicators(!showIndicators)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-gray-200 bg-gray-800/50 rounded"
            >
              <FiBarChart2 className="w-4 h-4" />
              Indicators
              <FiChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1.5 text-sm rounded ${
                  selectedTimeframe === tf 
                    ? 'bg-gray-800 text-gray-200' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {showIndicators && (
          <div className="mt-4 bg-gray-800 rounded shadow-lg">
            <div className="py-2">
              <div className="px-3 py-1.5 text-xs text-gray-400 font-medium">Display Options</div>
              {indicators.filter(i => i.category === 'display').map((option) => (
                <button
                  key={option.id}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left hover:bg-gray-700"
                  onClick={() => toggleIndicator(option.id)}
                >
                  <span className={option.isActive ? 'text-gray-200' : 'text-gray-400'}>
                    {option.label}
                  </span>
                  {option.isActive && <FiCheck className="w-4 h-4 text-green-400" />}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-700 py-2">
              <div className="px-3 py-1.5 text-xs text-gray-400 font-medium">Flow Indicators</div>
              {indicators.filter(i => i.category === 'flow').map((option) => (
                <button
                  key={option.id}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left hover:bg-gray-700"
                  onClick={() => toggleIndicator(option.id)}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: flowIndicators.find(f => f.id === option.id)?.color,
                        opacity: option.isActive ? 1 : 0.5 
                      }}
                    />
                    <span className={option.isActive ? 'text-gray-200' : 'text-gray-400'}>
                      {option.label}
                    </span>
                  </div>
                  {option.isActive && <FiCheck className="w-4 h-4 text-green-400" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chart Area */}
      <div className="relative h-[500px]">
        {isLoading && (
          <div className="absolute inset-0 bg-[#0B1221] flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
              <span className="text-sm text-gray-400">Loading chart...</span>
            </div>
          </div>
        )}
        <div ref={containerRef}>
          <div id="tradingview_chart" className="w-full h-full" />
        </div>
      </div>

      {/* Active Flow Indicators */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex flex-wrap gap-2">
          {indicators
            .filter(i => i.category === 'flow' && i.isActive)
            .map((indicator) => {
              const flowInfo = flowIndicators.find(f => f.id === indicator.id)!;
              return (
                <div
                  key={indicator.id}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-gray-800"
                  style={{ color: flowInfo.color }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: flowInfo.color }}
                  />
                  {flowInfo.label}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
} 
