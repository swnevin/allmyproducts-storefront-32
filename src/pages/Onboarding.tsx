import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { TemplateSelection } from "@/components/onboarding/TemplateSelection";
import { SuccessScreen } from "@/components/onboarding/SuccessScreen";
import { UsernameInput } from "@/components/onboarding/UsernameInput";

const OnboardingSteps = {
  JOIN: 0,
  USERNAME: 1,
  THEME: 2,
  GOAL: 3,
  GOAL_CONFIRMATION: 4,
  PLATFORMS: 5,
  LINKS: 6,
  PROFILE: 7,
  SUCCESS: 8,
};

const Onboarding = () => {
  const [step, setStep] = useState(OnboardingSteps.JOIN);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStep = () => {
    switch (step) {
      case OnboardingSteps.JOIN:
        return (
          <div className="space-y-6 max-w-md w-full">
            <h1 className="text-4xl font-bold">Join allmyproducts</h1>
            <p className="text-gray-600">Sign up for free!</p>
            <Input type="email" placeholder="Email" className="w-full" />
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to receive offers, news and updates from allmyproducts
              </label>
            </div>
            <Button 
              onClick={() => setStep(OnboardingSteps.USERNAME)}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Continue
            </Button>
          </div>
        );

      case OnboardingSteps.USERNAME:
        return (
          <UsernameInput 
            value={username}
            onChange={setUsername}
          />
        );

      case OnboardingSteps.THEME:
        return (
          <TemplateSelection 
            onSelect={(theme) => {
              setSelectedTheme(theme);
              setStep(OnboardingSteps.GOAL);
            }}
          />
        );

      case OnboardingSteps.GOAL:
        return (
          <div className="space-y-6 max-w-md w-full">
            <h1 className="text-4xl font-bold">Which best describes your goal?</h1>
            <p className="text-gray-600">This helps us personalize your experience.</p>
            <div className="space-y-4">
              {[
                {
                  title: "Creator",
                  description: "Build my following and explore ways to monetize my audience."
                },
                {
                  title: "Business",
                  description: "Grow my business and reach more customers."
                },
                {
                  title: "Personal",
                  description: "Share links with my friends and acquaintances."
                }
              ].map((option) => (
                <button
                  key={option.title}
                  onClick={() => {
                    setSelectedGoal(option.title);
                    setStep(OnboardingSteps.GOAL_CONFIRMATION);
                  }}
                  className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case OnboardingSteps.GOAL_CONFIRMATION:
        return (
          <div className="space-y-6 max-w-md w-full text-center">
            <h1 className="text-4xl font-bold">Awesome!</h1>
            <p className="text-xl text-gray-600">
              {selectedGoal} is a great use case for allmyproducts
            </p>
            <Button 
              onClick={() => setStep(OnboardingSteps.PLATFORMS)}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Continue
            </Button>
          </div>
        );

      case OnboardingSteps.PLATFORMS:
        return (
          <div className="space-y-6 max-w-md w-full">
            <h1 className="text-4xl font-bold">Which platforms are you on?</h1>
            <p className="text-gray-600">Pick your platforms - you can update these later</p>
            <ToggleGroup 
              type="multiple"
              className="grid grid-cols-3 gap-4"
              value={selectedPlatforms}
              onValueChange={setSelectedPlatforms}
            >
              {[
                "Instagram",
                "YouTube",
                "TikTok",
                "WhatsApp",
                "Website",
                "Amazon",
                "Spotify",
                "Facebook",
                "X",
                "SoundCloud",
                "Snapchat",
                "Pinterest"
              ].map((platform) => (
                <ToggleGroupItem
                  key={platform}
                  value={platform}
                  className="p-4 border rounded-lg data-[state=on]:bg-red-100 data-[state=on]:border-red-600"
                >
                  {platform}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={() => setStep(OnboardingSteps.PROFILE)}
                className="w-full"
              >
                Skip
              </Button>
              <Button 
                onClick={() => setStep(OnboardingSteps.LINKS)}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case OnboardingSteps.LINKS:
        return (
          <div className="space-y-6 max-w-md w-full">
            <h1 className="text-4xl font-bold">Add your links</h1>
            <p className="text-gray-600">Add your social media profiles</p>
            <div className="space-y-4">
              {selectedPlatforms.map((platform) => (
                <Input 
                  key={platform}
                  placeholder={`Your ${platform} username or URL`}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={() => setStep(OnboardingSteps.PROFILE)}
                className="w-full"
              >
                Skip
              </Button>
              <Button 
                onClick={() => setStep(OnboardingSteps.PROFILE)}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case OnboardingSteps.PROFILE:
        return (
          <div className="space-y-6 max-w-md w-full">
            <h1 className="text-4xl font-bold">Add profile details</h1>
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>
                    {avatarUrl ? "..." : "+"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <Label 
                    htmlFor="picture" 
                    className="cursor-pointer text-red-600 hover:text-red-700"
                  >
                    Upload picture
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
              <Input placeholder="Profile title" />
              <Textarea 
                placeholder="Tell the world about yourself" 
                className="h-24" 
              />
            </div>
            <Button 
              onClick={() => setStep(OnboardingSteps.SUCCESS)}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Continue
            </Button>
          </div>
        );

      case OnboardingSteps.SUCCESS:
        return <SuccessScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="w-full max-w-xs mb-8 bg-gray-200 h-2 rounded-full">
          <div 
            className="h-full bg-red-600 rounded-full transition-all duration-300"
            style={{ width: `${(step + 1) * (100 / Object.keys(OnboardingSteps).length)}%` }}
          />
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;