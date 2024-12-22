import { Button } from "@/components/ui/button";

export const LinksStep = ({ 
  onContinue,
  skipText
}: { 
  onContinue: () => void;
  skipText: string;
}) => {
  return (
    <div className="space-y-8 max-w-md w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Add your links</h1>
        <p className="text-gray-600">Connect your social media accounts and other links</p>
      </div>
      <div className="space-y-4">
        <Button 
          onClick={onContinue}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          Continue
        </Button>
        <Button
          variant="outline"
          onClick={onContinue}
          className="w-full"
        >
          {skipText}
        </Button>
      </div>
    </div>
  );
};