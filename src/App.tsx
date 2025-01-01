import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider, useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import { supabase } from "./integrations/supabase/client";
import { ProductGallery } from "./components/ProductGallery";

const queryClient = new QueryClient();

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
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('theme, username')
            .eq('id', session.user.id)
            .single();

          // Only redirect to onboarding for new users who haven't completed their profile
          if (error || (!profile?.theme && !profile?.username)) {
            navigate('/onboarding');
          }
        } catch (error) {
          console.error('Error checking profile:', error);
        } finally {
          setIsChecking(false);
        }
      } else {
        setIsChecking(false);
      }
    };

    checkProfile();
  }, [session, navigate]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

// Route guard for public routes (landing, login, signup)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
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
              <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
              <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
              <Route path="/onboarding" element={
                <AuthWrapper>
                  <Onboarding />
                </AuthWrapper>
              } />
              <Route path="/demo" element={<ProductGallery />} />
              <Route path="/storefront/:userId" element={<ProductGallery />} />
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
