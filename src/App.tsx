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
    let ignore = false;

    // Handle hash fragment for magic links
    const handleHashFragment = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (session) {
            window.location.hash = '';
            return session;
          }
        } catch (error) {
          console.error('Error handling hash fragment:', error);
        }
      }
      return null;
    };

    const initSession = async () => {
      try {
        console.log('Initializing session...');
        
        // First check for magic link authentication
        const magicSession = await handleHashFragment();
        if (magicSession && !ignore) {
          console.log('Magic link session found:', magicSession.user);
          setUser(magicSession.user);
          setIsLoading(false);
          return;
        }

        // Then check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          if (!ignore) {
            setIsLoading(false);
            setUser(null);
          }
          return;
        }

        if (session?.user && !ignore) {
          console.log('Existing session found:', session.user);
          setUser(session.user);
          
          try {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('theme')
              .eq('id', session.user.id)
              .single();
            
            if (!ignore) setIsNewUser(!profileData?.theme);
          } catch (error) {
            console.error('Error checking user profile:', error);
          }
        }
      } catch (error) {
        console.error('Session initialization error:', error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (!ignore) {
        if (session?.user) {
          setUser(session.user);
          try {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('theme')
              .eq('id', session.user.id)
              .single();
            
            setIsNewUser(!profileData?.theme);
          } catch (error) {
            console.error('Error checking user profile:', error);
          }
        } else {
          setUser(null);
          setIsNewUser(false);
        }
        setIsLoading(false);
      }
    });

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (!ignore && isLoading) {
        console.log('Session initialization timed out');
        setIsLoading(false);
        setUser(null);
      }
    }, 5000); // 5 second timeout

    return () => {
      ignore = true;
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  // Show loading spinner for maximum 5 seconds
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