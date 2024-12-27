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

  const checkNewUserStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('theme')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error checking user status:', error);
        return false;
      }

      return !data?.theme;
    } catch (error) {
      console.error('Error in checkNewUserStatus:', error);
      return false;
    }
  };

  useEffect(() => {
    let ignore = false;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!ignore) {
          if (session?.user) {
            setUser(session.user);
            const isNew = await checkNewUserStatus(session.user.id);
            setIsNewUser(isNew);
          } else {
            setUser(null);
            setIsNewUser(false);
          }
        }
      } catch (error) {
        console.error('Error in initializeAuth:', error);
        if (!ignore) {
          setUser(null);
          setIsNewUser(false);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    // Initialize auth state
    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (!ignore) {
        if (session?.user) {
          setUser(session.user);
          const isNew = await checkNewUserStatus(session.user.id);
          setIsNewUser(isNew);
        } else {
          setUser(null);
          setIsNewUser(false);
        }
      }
    });

    // Cleanup function
    return () => {
      ignore = true;
      subscription?.unsubscribe();
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