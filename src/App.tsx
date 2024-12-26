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

  useEffect(() => {
    let mounted = true;

    // Function to check if user is new
    const checkIfNewUser = async (userId: string) => {
      if (!mounted) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('theme')
          .eq('id', userId)
          .single();
        
        if (!mounted) return;
        if (error) throw error;
        
        setIsNewUser(!data?.theme);
      } catch (error) {
        console.error('Error checking if new user:', error);
        if (mounted) {
          setIsNewUser(false);
        }
      }
    };

    // Initial session check
    const initializeSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkIfNewUser(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing session:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Start initialization
    initializeSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkIfNewUser(session.user.id);
      } else {
        setIsNewUser(false);
      }
      setIsLoading(false);
    });

    // Cleanup function
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
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