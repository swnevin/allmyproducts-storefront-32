import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ProfileStep = ({ 
  onContinue,
  skipText
}: { 
  onContinue: (data: { title: string; bio: string; avatar_url?: string }) => void;
  skipText: string;
}) => {
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const dummyAvatars = [
    { id: 1, color: "bg-gradient-to-br from-blue-400 to-blue-600" },
    { id: 2, color: "bg-gradient-to-br from-red-400 to-purple-600" },
    { id: 3, color: "bg-gradient-to-br from-green-400 to-yellow-400" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setSelectedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      onContinue({
        title,
        bio,
        avatar_url: uploadedImage || undefined
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-md w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Add profile details</h1>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Select a profile image</h3>
          <div className="flex gap-4 justify-center">
            {dummyAvatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => {
                  setSelectedImage(avatar.id);
                  setUploadedImage(null);
                }}
                className={`w-16 h-16 rounded-full ${avatar.color} ${
                  selectedImage === avatar.id ? "ring-4 ring-primary ring-offset-2" : ""
                }`}
              />
            ))}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              className={`w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 ${
                uploadedImage ? "ring-4 ring-primary ring-offset-2" : ""
              }`}
            >
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                "+"
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Add title and bio</h3>
          <Input
            placeholder="Profile title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="relative">
            <Textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-[100px] resize-none pr-16"
              maxLength={80}
            />
            <span className="absolute bottom-2 right-2 text-sm text-gray-500">
              {bio.length}/80
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          onClick={handleContinue}
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Continue"}
        </Button>
        <Button
          variant="outline"
          onClick={() => onContinue({})}
          className="w-full"
          disabled={isLoading}
        >
          {skipText}
        </Button>
      </div>
    </div>
  );
};