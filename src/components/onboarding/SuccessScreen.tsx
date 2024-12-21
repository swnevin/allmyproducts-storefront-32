import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import confetti from 'canvas-confetti';
import { useEffect } from "react";

export const SuccessScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="space-y-6 max-w-md w-full text-center">
      <h1 className="text-4xl font-bold">🎉 Your AllMyProducts page is ready!</h1>
      <p className="text-xl text-gray-600">
        Time to share your amazing products with the world
      </p>
      <Button 
        onClick={() => navigate("/dashboard")}
        className="w-full bg-red-600 hover:bg-red-700"
      >
        Go to Dashboard
      </Button>
    </div>
  );
};