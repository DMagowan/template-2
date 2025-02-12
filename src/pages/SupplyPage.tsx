'use client';

import React from 'react';
import SupplySummaryGrid from '@/components/supply/SupplySummaryGrid';
import SupplyConcentration from '@/components/supply/SupplyConcentration';
import SupplyAgeDistribution from '@/components/supply/SupplyAgeDistribution';

export default function SupplyPage() {
  return (
    <div className="p-6 space-y-6 bg-[#0B1426] min-h-screen text-gray-100">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-100">Supply Analysis</h1>
      </div>
      
      {/* Unlock Progress and Events */}
      <div className="space-y-6">
        {/* Top Section - Supply Summary */}
        <SupplySummaryGrid />
        
        {/* Middle Section - Supply Distribution Analysis */}
        <div className="grid grid-cols-2 gap-6">
          <SupplyConcentration />
          <SupplyAgeDistribution />
        </div>
      </div>
    </div>
  );
} 