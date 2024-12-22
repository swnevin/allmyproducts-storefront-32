import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export const ProfileStep = ({ 
  onContinue,
  skipText
}: { 
  onContinue: () => void;
  skipText: string;
}) => {
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const dummyAvatars = [
    { id: 1, color: "bg-gradient-to-br from-blue-400 to-blue-600" },
    { id: 2, color: "bg-gradient-to-br from-red-400 to-purple-600" },
    { id: 3, color: "bg-gradient-to-br from-green-400 to-yellow-400" },
  ];

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
                onClick={() => setSelectedImage(avatar.id)}
                className={`w-16 h-16 rounded-full ${avatar.color} ${
                  selectedImage === avatar.id ? "ring-4 ring-primary ring-offset-2" : ""
                }`}
              />
            ))}
            <button
              onClick={() => setSelectedImage(null)}
              className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400"
            >
              +
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
          <Button
            variant="outline"
            size="sm"
            className="w-auto inline-flex gap-2"
            onClick={() => setBio("AI generated bio coming soon!")}
          >
            <Sparkles className="h-4 w-4" />
            Write my bio
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          onClick={onContinue}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Continue
        </Button>
        <Button
          variant="outline"
          onClick={onContinue}
          className="w-full"
        >
          {skipText}
        </Button>
      </div>
    </div>
  );
};