import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const themes = [
  {
    id: "cyan",
    name: "Cyan",
    description: "Fresh and professional",
    gradient: "bg-gradient-to-br from-cyan-50 to-cyan-100"
  },
  {
    id: "pink",
    name: "Pink",
    description: "Vibrant and energetic",
    gradient: "bg-gradient-to-br from-pink-50 to-pink-100"
  },
  {
    id: "blue",
    name: "Blue",
    description: "Classic and trustworthy",
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100"
  },
  {
    id: "teal",
    name: "Teal",
    description: "Calm and balanced",
    gradient: "bg-gradient-to-br from-teal-50 to-teal-100"
  },
  {
    id: "purple",
    name: "Purple",
    description: "Elegant and creative",
    gradient: "bg-gradient-to-br from-purple-50 to-purple-100"
  },
  {
    id: "emerald",
    name: "Emerald",
    description: "Natural and harmonious",
    gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100"
  },
  {
    id: "amber",
    name: "Amber",
    description: "Warm and welcoming",
    gradient: "bg-gradient-to-br from-amber-50 to-amber-100"
  },
  {
    id: "rose",
    name: "Rose",
    description: "Romantic and soft",
    gradient: "bg-gradient-to-br from-rose-50 to-rose-100"
  }
];

export const TemplateSelection = ({ 
  onSelect,
  selectedTheme,
  onContinue 
}: { 
  onSelect: (theme: string) => void;
  selectedTheme: string;
  onContinue: () => void;
}) => {
  return (
    <div className="space-y-4 max-w-md w-full">
      <h1 className="text-4xl font-bold">Choose your theme</h1>
      <p className="text-gray-600">Select a background theme for your page - you can change it later</p>
      <div className="grid gap-3">
        {themes.map((theme) => (
          <Card 
            key={theme.id}
            className={`cursor-pointer transition-colors ${
              selectedTheme === theme.id ? 'border-primary' : 'hover:border-primary/30'
            }`}
            onClick={() => onSelect(theme.id)}
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
      <Button 
        onClick={onContinue}
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!selectedTheme}
      >
        Continue
      </Button>
    </div>
  );
};