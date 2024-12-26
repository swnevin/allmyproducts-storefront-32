import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import { supabase } from "./integrations/supabase/client";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            await checkIfNewUser(session.user.id);
          }
          setSessionChecked(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (mounted) {
          setSessionChecked(true);
          setIsLoading(false);
        }
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkIfNewUser(session.user.id);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const checkIfNewUser = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('theme')
        .eq('id', userId)
        .single();
      
      setIsNewUser(!data?.theme);
    } catch (error) {
      console.error('Error checking if new user:', error);
      setIsNewUser(false);
    }
  };

  // Show loading spinner only during initial session check
  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  user ? (
                    isNewUser ? (
                      <Navigate to="/onboarding" replace />
                    ) : (
                      <Navigate to="/dashboard" replace />
                    )
                  ) : (
                    <Landing />
                  )
                } 
              />
              <Route 
                path="/login" 
                element={
                  user ? <Navigate to="/dashboard" replace /> : <Login />
                } 
              />
              <Route 
                path="/onboarding" 
                element={
                  user ? <Onboarding /> : <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/:username" 
                element={<Index />} 
              />
              <Route 
                path="/dashboard/*" 
                element={
                  user ? <Dashboard /> : <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/billing" 
                element={
                  user ? <Billing /> : <Navigate to="/" replace />
                } 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
};

export default App;