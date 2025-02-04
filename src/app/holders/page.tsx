'use client';

import React from 'react';
import HolderSummaryGrid from '@/components/holders/HolderSummaryGrid';
import HolderAnalysis from '@/components/holders/HolderAnalysis';
import { FilterProvider } from '@/contexts/FilterContext';

export default function HoldersPage() {
  return (
    <FilterProvider>
      <div className="p-4 space-y-4 bg-[#0B1426] min-h-screen text-gray-100">
        <h1 className="text-xl font-semibold text-gray-100">Holders</h1>
        <HolderAnalysis />
        <HolderSummaryGrid />
      </div>
    </FilterProvider>
  );
} 
