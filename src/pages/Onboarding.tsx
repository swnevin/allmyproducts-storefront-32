import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JoinStep } from "@/components/onboarding/JoinStep";
import { UsernameInput } from "@/components/onboarding/UsernameInput";
import { TemplateSelection } from "@/components/onboarding/TemplateSelection";
import { SuccessScreen } from "@/components/onboarding/SuccessScreen";

const OnboardingSteps = {
  JOIN: 0,
  USERNAME: 1,
  THEME: 2,
  SUCCESS: 3,
} as const;

const Onboarding = () => {
  const [step, setStep] = useState(OnboardingSteps.JOIN);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const navigate = useNavigate();

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
            onContinue={() => setStep(OnboardingSteps.SUCCESS)}
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