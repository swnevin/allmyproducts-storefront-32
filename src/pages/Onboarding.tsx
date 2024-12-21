import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const OnboardingSteps = {
  JOIN: 0,
  USERNAME: 1,
  GOAL: 2,
  PLATFORMS: 3,
  LINKS: 4,
  PROFILE: 5,
};

const Onboarding = () => {
  const [step, setStep] = useState(OnboardingSteps.JOIN);
  const navigate = useNavigate();

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
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Continue
            </Button>
          </div>
        );

      case OnboardingSteps.USERNAME:
        return (
          <div className="space-y-6 max-w-md w-full">
            <h1 className="text-4xl font-bold">Welcome to allmyproducts!</h1>
            <p className="text-gray-600">Choose your allmyproducts username. You can always change it later.</p>
            <Input type="text" placeholder="Username" className="w-full" />
            <Button 
              onClick={() => setStep(OnboardingSteps.GOAL)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Continue
            </Button>
          </div>
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
                  onClick={() => setStep(OnboardingSteps.PLATFORMS)}
                  className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case OnboardingSteps.PLATFORMS:
        return (
          <div className="space-y-6 max-w-md w-full">
            <h1 className="text-4xl font-bold">Which platforms are you on?</h1>
            <p className="text-gray-600">Pick up to five to get started. You can update at any time.</p>
            <div className="grid grid-cols-3 gap-4">
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
                <button
                  key={platform}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {platform}
                </button>
              ))}
            </div>
            <Button 
              onClick={() => setStep(OnboardingSteps.LINKS)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Continue
            </Button>
          </div>
        );

      case OnboardingSteps.LINKS:
        return (
          <div className="space-y-6 max-w-md w-full">
            <h1 className="text-4xl font-bold">Add your links</h1>
            <p className="text-gray-600">Complete the fields below to add your content.</p>
            <div className="space-y-4">
              <Input placeholder="TikTok username" />
              <Input placeholder="YouTube username" />
              <h3 className="font-semibold mt-6">Add your own links</h3>
              <Input placeholder="Website URL" />
              <Input placeholder="Website URL" />
              <Input placeholder="Website URL" />
            </div>
            <Button 
              onClick={() => setStep(OnboardingSteps.PROFILE)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Continue
            </Button>
          </div>
        );

      case OnboardingSteps.PROFILE:
        return (
          <div className="space-y-6 max-w-md w-full">
            <h1 className="text-4xl font-bold">Add profile details</h1>
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"
                  />
                ))}
                <button className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  +
                </button>
              </div>
              <Input placeholder="Profile title" />
              <Textarea placeholder="Bio" className="h-24" />
              <div className="flex justify-between items-center">
                <button className="text-sm text-purple-600">✨ Write my bio</button>
                <span className="text-sm text-gray-500">0/80</span>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/dashboard")}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Continue
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="w-full max-w-xs mb-8 bg-gray-200 h-2 rounded-full">
          <div 
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(step + 1) * (100 / Object.keys(OnboardingSteps).length)}%` }}
          />
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;