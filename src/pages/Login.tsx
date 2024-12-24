import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AtSign } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle actual authentication
    toast({
      title: "Logged in successfully",
      description: "Welcome back!",
    });
    navigate("/dashboard");
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input 
                type="email" 
                placeholder="Email" 
                required
                className="w-full pl-10" 
              />
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
            <Input 
              type="password" 
              placeholder="Password" 
              required 
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Sign in
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;