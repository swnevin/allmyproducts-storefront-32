import { useState } from "react";
import { JoinStep } from "@/components/onboarding/JoinStep";
import { UsernameInput } from "@/components/onboarding/UsernameInput";
import { TemplateSelection } from "@/components/onboarding/TemplateSelection";
import { ProfileStep } from "@/components/onboarding/ProfileStep";
import { LinksStep } from "@/components/onboarding/LinksStep";
import { SuccessScreen } from "@/components/onboarding/SuccessScreen";

const OnboardingSteps = {
  JOIN: 0,
  USERNAME: 1,
  THEME: 2,
  PROFILE: 3,
  LINKS: 4,
  SUCCESS: 5,
} as const;

type OnboardingStep = typeof OnboardingSteps[keyof typeof OnboardingSteps];

const Onboarding = () => {
  const [step, setStep] = useState<OnboardingStep>(OnboardingSteps.JOIN);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");

  const renderStep = () => {
    switch (step) {
      case OnboardingSteps.JOIN:
        return (
          <JoinStep 
            email={email}
            setEmail={setEmail}
            onContinue={() => setStep(OnboardingSteps.USERNAME)}
          />
        );

      case OnboardingSteps.USERNAME:
        return (
          <UsernameInput 
            value={username}
            onChange={setUsername}
            onContinue={() => setStep(OnboardingSteps.THEME)}
          />
        );

      case OnboardingSteps.THEME:
        return (
          <TemplateSelection 
            selectedTheme={selectedTheme}
            onSelect={setSelectedTheme}
            onContinue={() => setStep(OnboardingSteps.PROFILE)}
          />
        );

      case OnboardingSteps.PROFILE:
        return (
          <ProfileStep
            onContinue={() => setStep(OnboardingSteps.LINKS)}
            skipText="I will do this later"
          />
        );

      case OnboardingSteps.LINKS:
        return (
          <LinksStep
            onContinue={() => setStep(OnboardingSteps.SUCCESS)}
            skipText="I will do this later"
          />
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