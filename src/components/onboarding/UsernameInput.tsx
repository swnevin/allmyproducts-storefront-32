import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const UsernameInput = ({ 
  value, 
  onChange,
  onContinue 
}: { 
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
}) => {
  return (
    <div className="space-y-8 max-w-md w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Choose your username</h1>
        <p className="text-gray-600">This will be your unique URL</p>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 bg-gray-100 rounded-l-md px-2 border-r h-full">
            allmyproducts.com/
          </div>
          <Input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="username" 
            className="pl-[155px]"
          />
        </div>
        <Button 
          onClick={onContinue}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};