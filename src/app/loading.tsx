export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1426] text-gray-100">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
} 