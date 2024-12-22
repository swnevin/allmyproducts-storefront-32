import { Store } from "lucide-react";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Store className="h-6 w-6 text-primary" />
      <span className="font-semibold text-lg">AllMyProducts</span>
    </div>
  );
};