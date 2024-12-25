import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { JoinStep } from "@/components/onboarding/JoinStep";
import { UsernameInput } from "@/components/onboarding/UsernameInput";
import { TemplateSelection } from "@/components/onboarding/TemplateSelection";
import { ProfileStep } from "@/components/onboarding/ProfileStep";
import { LinksStep } from "@/components/onboarding/LinksStep";
import { SuccessScreen } from "@/components/onboarding/SuccessScreen";
import { useToast } from "@/hooks/use-toast";

const OnboardingSteps = {
  JOIN: 0,
  USERNAME: 1,
  THEME: 2,
  PROFILE: 3,
  LINKS: 4,
  SUCCESS: 5,
} as const;

type OnboardingStep = typeof OnboardingSteps[keyof typeof OnboardingSteps];

type OnboardingData = {
  username: string;
  theme: string;
  title: string;
  bio: string;
  avatar_url: string;
  social_links: any[];
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const { toast } = useToast();
  const [step, setStep] = useState<OnboardingStep>(OnboardingSteps.USERNAME);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [profileData, setProfileData] = useState<Partial<OnboardingData>>({});
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  const saveOnboardingData = async () => {
    if (!session?.user.id) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          theme: selectedTheme,
          title: profileData.title,
          bio: profileData.bio,
          avatar_url: profileData.avatar_url,
          social_links: socialLinks,
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

  const handleStepComplete = async (stepData?: any) => {
    switch (step) {
      case OnboardingSteps.USERNAME:
        setUsername(stepData);
        setStep(OnboardingSteps.THEME);
        break;
      case OnboardingSteps.THEME:
        setSelectedTheme(stepData);
        setStep(OnboardingSteps.PROFILE);
        break;
      case OnboardingSteps.PROFILE:
        setProfileData(stepData);
        setStep(OnboardingSteps.LINKS);
        break;
      case OnboardingSteps.LINKS:
        setSocialLinks(stepData);
        const saved = await saveOnboardingData();
        if (saved) {
          setStep(OnboardingSteps.SUCCESS);
        }
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
            value={username}
            onChange={setUsername}
            onContinue={() => handleStepComplete(username)}
          />
        );

      case OnboardingSteps.THEME:
        return (
          <TemplateSelection 
            selectedTheme={selectedTheme}
            onSelect={setSelectedTheme}
            onContinue={() => handleStepComplete(selectedTheme)}
          />
        );

      case OnboardingSteps.PROFILE:
        return (
          <ProfileStep
            onContinue={(data) => handleStepComplete(data)}
            skipText="I will do this later"
          />
        );

      case OnboardingSteps.LINKS:
        return (
          <LinksStep
            onContinue={(links) => handleStepComplete(links)}
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