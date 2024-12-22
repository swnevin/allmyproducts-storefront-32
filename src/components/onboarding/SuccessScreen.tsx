import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import confetti from 'canvas-confetti';
import { useEffect, useState } from "react";
import { SharePage } from "@/components/SharePage";

export const SuccessScreen = () => {
  const navigate = useNavigate();
  const [isShareOpen, setIsShareOpen] = useState(false);

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
          onClick={() => navigate("/storefront")}
          className="flex-1"
        >
          Continue Editing
        </Button>
        <Button 
          onClick={() => setIsShareOpen(true)}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          Share Page
        </Button>
      </div>
      <SharePage 
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
      />
    </div>
  );
};