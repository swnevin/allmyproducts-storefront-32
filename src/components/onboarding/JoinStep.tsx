import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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
      <h1 className="text-4xl font-bold">Join allmyproducts</h1>
      <p className="text-gray-600">Sign up for free!</p>
      <Input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full" 
      />
      <div className="flex items-start space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to receive offers, news and updates from allmyproducts
        </label>
      </div>
      <Button 
        onClick={onContinue}
        className="w-full bg-red-600 hover:bg-red-700"
        disabled={!isValidEmail}
      >
        Continue
      </Button>
    </div>
  );
};