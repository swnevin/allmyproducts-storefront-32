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
      <div className="flex gap-4">
        <Button 
          variant="outline"
          onClick={() => navigate("/edit")}
          className="flex-1"
        >
          Continue Editing
        </Button>
        <Button 
          onClick={() => navigate("/share")}
          className="flex-1 bg-red-600 hover:bg-red-700"
        >
          Share Page
        </Button>
      </div>
    </div>
  );
};