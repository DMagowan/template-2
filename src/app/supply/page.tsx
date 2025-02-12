import SupplySummaryGrid from '@/components/supply/SupplySummaryGrid';
import SupplyAnalysis from '@/components/supply/SupplyAnalysis';
import SupplyConcentration from '@/components/supply/SupplyConcentration';
import SupplyAgeDistribution from '@/components/supply/SupplyAgeDistribution';

export default function SupplyPage() {
  return (
    <div className="p-4 space-y-4 bg-[#0B1426] min-h-screen text-gray-100">
      <h1 className="text-xl font-semibold text-gray-100">Supply</h1>
      <div className="grid grid-cols-2 gap-4">
        <SupplyConcentration />
        <SupplyAgeDistribution />
      </div>
      <SupplySummaryGrid />
      <SupplyAnalysis />
    </div>
  );
} 
