import { Button } from "@/components/ui/button";

export const ProfileStep = ({ 
  onContinue,
  skipText
}: { 
  onContinue: () => void;
  skipText: string;
}) => {
  return (
    <div className="space-y-8 max-w-md w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Set up your profile</h1>
        <p className="text-gray-600">Add a photo and description to personalize your page</p>
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