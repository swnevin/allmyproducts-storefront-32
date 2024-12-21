import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">
          allmyproducts
        </h1>
        <p className="text-xl text-gray-600 max-w-xl mx-auto">
          Create your own storefront and share all your products in one place
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
            className="text-lg px-8 py-6"
          >
            Log in
          </Button>
          <Button
            onClick={() => navigate("/onboarding")}
            className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700"
          >
            Sign up for free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;