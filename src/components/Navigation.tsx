'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[#1B2838] border-b border-gray-800/50">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center h-14">
          <div className="flex items-center space-x-8">
            <div className="text-lg font-semibold text-gray-100">
              Token God Mode
            </div>
            <div className="flex space-x-4">
              <Link
                href="/overview"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/overview')
                    ? 'bg-[#2D4263] text-blue-400'
                    : 'text-gray-300 hover:bg-[#2D4263] hover:text-gray-100'
                }`}
              >
                Overview
              </Link>
              <Link
                href="/holders"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/holders')
                    ? 'bg-[#2D4263] text-blue-400'
                    : 'text-gray-300 hover:bg-[#2D4263] hover:text-gray-100'
                }`}
              >
                Holders
              </Link>
              <Link
                href="/transactions"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/transactions')
                    ? 'bg-[#2D4263] text-blue-400'
                    : 'text-gray-300 hover:bg-[#2D4263] hover:text-gray-100'
                }`}
              >
                Transactions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 