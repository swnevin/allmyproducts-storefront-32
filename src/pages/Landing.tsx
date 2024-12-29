import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-pink-50">
      <header className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Showcase Your Products Like Never Before
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create beautiful, interactive product showcases that engage your audience and drive conversions.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-primary/90"
              >
                Create Your Page <ArrowRight className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/storefront")}
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose AllMyProducts?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Showcases</h3>
                <p className="text-gray-600">
                  Create engaging product displays with interactive hotspots and detailed information.
                </p>
              </div>
              <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                <p className="text-gray-600">
                  Your data is safe with our enterprise-grade security and reliable hosting.
                </p>
              </div>
              <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Optimized performance ensures your products load instantly for visitors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600">
              Join thousands of creators who trust AllMyProducts to showcase their work.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="bg-primary hover:bg-primary/90"
            >
              Create Your Page Now
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            © {new Date().getFullYear()} AllMyProducts. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;