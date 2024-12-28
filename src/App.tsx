import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AuthProvider } from "@/providers/AuthProvider";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "./integrations/supabase/client";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isNewUser } = useAuth();

  return (
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
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
};

export default App;