import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider, useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

// Auth wrapper component to handle protected routes
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate('/login');
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return session ? <>{children}</> : null;
};

// Onboarding wrapper to check if user needs onboarding
const OnboardingWrapper = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('theme, username')
          .eq('id', session.user.id)
          .single();

        if (!profile?.theme || !profile?.username) {
          navigate('/onboarding');
        }
      }
    };

    checkProfile();
  }, [session, navigate]);

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={
                <AuthWrapper>
                  <Onboarding />
                </AuthWrapper>
              } />
              <Route path="/storefront" element={
                <AuthWrapper>
                  <OnboardingWrapper>
                    <Index />
                  </OnboardingWrapper>
                </AuthWrapper>
              } />
              <Route path="/dashboard/*" element={
                <AuthWrapper>
                  <OnboardingWrapper>
                    <Dashboard />
                  </OnboardingWrapper>
                </AuthWrapper>
              } />
              <Route path="/billing" element={
                <AuthWrapper>
                  <OnboardingWrapper>
                    <Billing />
                  </OnboardingWrapper>
                </AuthWrapper>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
};

export default App;