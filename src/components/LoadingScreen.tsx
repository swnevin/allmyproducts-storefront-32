import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
      <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      <p className="mt-4 text-sm text-gray-600">Loading your experience...</p>
    </div>
  );
};