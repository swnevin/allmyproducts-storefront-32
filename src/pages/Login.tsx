import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/auth/LoginForm";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { session } = useSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Logo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default Login;