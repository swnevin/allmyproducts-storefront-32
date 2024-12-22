import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <Button
            variant="ghost"
            onClick={() => navigate("/onboarding")}
          >
            Get Started
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to AllMyProducts</h1>
          <p className="text-lg text-gray-600">
            Create your own product showcase page in minutes.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/onboarding")}
            className="bg-primary hover:bg-primary/90"
          >
            Create Your Page
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Landing;