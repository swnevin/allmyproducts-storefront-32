import { Card, CardContent } from "@/components/ui/card";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focused on your content",
    image: "/placeholder.svg"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Perfect for businesses and personal brands",
    image: "/placeholder.svg"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with a unique and artistic layout",
    image: "/placeholder.svg"
  }
];

export const TemplateSelection = ({ onSelect }: { onSelect: (template: string) => void }) => {
  return (
    <div className="space-y-6 max-w-md w-full">
      <h1 className="text-4xl font-bold">Choose your template</h1>
      <p className="text-gray-600">Select a template to get started - you can customize it later</p>
      <div className="grid gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className="cursor-pointer hover:border-red-600 transition-colors"
            onClick={() => onSelect(template.id)}
          >
            <CardContent className="p-4 flex gap-4 items-center">
              <img 
                src={template.image} 
                alt={template.name} 
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};