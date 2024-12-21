import { Card, CardContent } from "@/components/ui/card";

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
  }
];

export const TemplateSelection = ({ onSelect }: { onSelect: (theme: string) => void }) => {
  return (
    <div className="space-y-6 max-w-md w-full">
      <h1 className="text-4xl font-bold">Choose your theme</h1>
      <p className="text-gray-600">Select a background theme for your page - you can change it later</p>
      <div className="grid gap-4">
        {themes.map((theme) => (
          <Card 
            key={theme.id}
            className="cursor-pointer hover:border-red-600 transition-colors"
            onClick={() => onSelect(theme.id)}
          >
            <CardContent className="p-4 flex gap-4 items-center">
              <div className={`w-24 h-24 rounded ${theme.gradient}`} />
              <div>
                <h3 className="font-semibold">{theme.name}</h3>
                <p className="text-sm text-gray-600">{theme.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};