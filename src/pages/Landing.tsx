import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AtSign } from "lucide-react";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async () => {
    if (!email) return;
    
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/onboarding`,
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your email",
        description: "We sent you a magic link to sign in",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome to AllMyProducts</h1>
            <p className="text-lg text-gray-600">
              Create your own product showcase page in minutes.
            </p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
            <Button
              onClick={handleSignIn}
              disabled={!email || isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Sending..." : "Get Started"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;