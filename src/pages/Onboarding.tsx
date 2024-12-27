import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { UsernameInput } from "@/components/onboarding/UsernameInput";
import { TemplateSelection } from "@/components/onboarding/TemplateSelection";
import { ProfileStep } from "@/components/onboarding/ProfileStep";
import { LinksStep } from "@/components/onboarding/LinksStep";
import { SuccessScreen } from "@/components/onboarding/SuccessScreen";
import { useToast } from "@/hooks/use-toast";

const OnboardingSteps = {
  USERNAME: 0,
  THEME: 1,
  PROFILE: 2,
  LINKS: 3,
  SUCCESS: 4,
} as const;

type OnboardingStep = typeof OnboardingSteps[keyof typeof OnboardingSteps];

type OnboardingData = {
  username: string;
  theme: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  social_links?: any[];
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const { toast } = useToast();
  const [step, setStep] = useState<OnboardingStep>(OnboardingSteps.USERNAME);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    username: "",
    theme: "",
  });

  useEffect(() => {
    if (!session?.user) {
      navigate("/");
    }
  }, [session, navigate]);

  const saveOnboardingData = async (data: Partial<OnboardingData>) => {
    if (!session?.user.id) return false;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...data
        })
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const handleStepComplete = async (stepData: any) => {
    let success = true;
    
    switch (step) {
      case OnboardingSteps.USERNAME:
        setOnboardingData(prev => ({ ...prev, username: stepData }));
        success = await saveOnboardingData({ username: stepData });
        if (success) setStep(OnboardingSteps.THEME);
        break;
      case OnboardingSteps.THEME:
        setOnboardingData(prev => ({ ...prev, theme: stepData }));
        success = await saveOnboardingData({ theme: stepData });
        if (success) setStep(OnboardingSteps.PROFILE);
        break;
      case OnboardingSteps.PROFILE:
        setOnboardingData(prev => ({ ...prev, ...stepData }));
        success = await saveOnboardingData(stepData);
        if (success) setStep(OnboardingSteps.LINKS);
        break;
      case OnboardingSteps.LINKS:
        setOnboardingData(prev => ({ ...prev, social_links: stepData }));
        success = await saveOnboardingData({ social_links: stepData });
        if (success) setStep(OnboardingSteps.SUCCESS);
        break;
      case OnboardingSteps.SUCCESS:
        navigate("/dashboard");
        break;
    }
  };

  const renderStep = () => {
    switch (step) {
      case OnboardingSteps.USERNAME:
        return (
          <UsernameInput 
            value={onboardingData.username}
            onChange={(value) => setOnboardingData(prev => ({ ...prev, username: value }))}
            onContinue={() => handleStepComplete(onboardingData.username)}
          />
        );

      case OnboardingSteps.THEME:
        return (
          <TemplateSelection 
            selectedTheme={onboardingData.theme}
            onSelect={(theme) => setOnboardingData(prev => ({ ...prev, theme }))}
            onContinue={() => handleStepComplete(onboardingData.theme)}
          />
        );

      case OnboardingSteps.PROFILE:
        return (
          <ProfileStep
            onContinue={handleStepComplete}
            skipText="I will do this later"
          />
        );

      case OnboardingSteps.LINKS:
        return (
          <LinksStep
            onContinue={handleStepComplete}
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