import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const themes = [
  {
    id: "cyan",
    name: "Cyan",
    description: "Fresh and professional",
    gradient: "bg-gradient-to-br from-cyan-50/80 to-cyan-100/80"
  },
  {
    id: "pink",
    name: "Pink",
    description: "Vibrant and energetic",
    gradient: "bg-gradient-to-br from-pink-50/80 to-pink-100/80"
  },
  {
    id: "blue",
    name: "Blue",
    description: "Classic and trustworthy",
    gradient: "bg-gradient-to-br from-blue-50/80 to-blue-100/80"
  },
  {
    id: "teal",
    name: "Teal",
    description: "Calm and balanced",
    gradient: "bg-gradient-to-br from-teal-50/80 to-teal-100/80"
  },
  {
    id: "purple",
    name: "Purple",
    description: "Elegant and creative",
    gradient: "bg-gradient-to-br from-purple-50/80 to-purple-100/80"
  },
  {
    id: "emerald",
    name: "Emerald",
    description: "Natural and harmonious",
    gradient: "bg-gradient-to-br from-emerald-50/80 to-emerald-100/80"
  },
  {
    id: "amber",
    name: "Amber",
    description: "Warm and welcoming",
    gradient: "bg-gradient-to-br from-amber-50/80 to-amber-100/80"
  },
  {
    id: "rose",
    name: "Rose",
    description: "Romantic and soft",
    gradient: "bg-gradient-to-br from-rose-50/80 to-rose-100/80"
  }
];

export const Appearance = () => {
  const [displayName, setDisplayName] = useState("Sarah's Fashion Picks");
  const [bio, setBio] = useState("Fashion enthusiast sharing my favorite outfits and accessories. All products linked below!");
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1649972904349-6e44c42644a7");
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Changes saved",
      description: "Your appearance settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Appearance</h2>
      <div className="max-w-2xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>PFP</AvatarFallback>
              </Avatar>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="avatar-upload"
                  onChange={handleImageUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                >
                  Change Image
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {themes.map((theme) => (
                <Card 
                  key={theme.id}
                  className={`cursor-pointer transition-colors ${
                    selectedTheme === theme.id ? 'border-primary' : 'hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedTheme(theme.id)}
                >
                  <CardContent className="p-3 flex gap-4 items-center">
                    <div className={`w-20 h-20 rounded ${theme.gradient}`} />
                    <div>
                      <h3 className="font-semibold">{theme.name}</h3>
                      <p className="text-sm text-gray-600">{theme.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSaveAppearance} className="w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );
};