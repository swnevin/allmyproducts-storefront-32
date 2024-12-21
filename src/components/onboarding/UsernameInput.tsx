import { Input } from "@/components/ui/input";

export const UsernameInput = ({ value, onChange }: { 
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-6 max-w-md w-full">
      <h1 className="text-4xl font-bold">Choose your username</h1>
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            allmyproducts.com/
          </div>
          <Input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="username" 
            className="pl-[140px]"
          />
        </div>
        <p className="text-sm text-gray-500">
          This will be your unique URL
        </p>
      </div>
    </div>
  );
};