import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AtSign } from "lucide-react";

export const JoinStep = ({ 
  email,
  setEmail,
  onContinue 
}: { 
  email: string;
  setEmail: (value: string) => void;
  onContinue: () => void;
}) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="space-y-6 max-w-md w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Join allmyproducts</h1>
        <p className="text-gray-600">Sign up for free!</p>
      </div>
      <div className="relative">
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10" 
        />
        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to receive offers, news and updates from allmyproducts
        </label>
      </div>
      <Button 
        onClick={onContinue}
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!isValidEmail}
      >
        Continue
      </Button>
      {email && !isValidEmail && (
        <p className="text-sm text-red-500 text-center">Please enter a valid email address</p>
      )}
    </div>
  );
};