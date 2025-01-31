'use client';

import React from 'react';
import TokenHolderList from '@/components/holders/TokenHolderList';
import HolderAnalysis from '@/components/holders/HolderAnalysis';
import { FilterProvider } from '@/contexts/FilterContext';

export default function HoldersPage() {
  return (
    <FilterProvider>
      <div className="space-y-6">
        <HolderAnalysis />
        <TokenHolderList />
      </div>
    </FilterProvider>
  );
} 
